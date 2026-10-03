/* ============================================================
   service/finance-b.js — 財務管理 FIN-B 引擎（27 支）
   投資理財 12 + 財務分析 11 + 稅務試算 4
   ============================================================ */
(function (g) {
  'use strict';

  var M = g.RECalcMath;
  var P = g.RECalcParse;

  function need(v, msg) {
    if (v === null || v === undefined || !isFinite(Number(v))) throw new Error(msg);
    return Number(v);
  }

  /* 級距遞進稅額計算：brackets = [[上限, 稅率], ...]（最後上限 Infinity） */
  function progressiveTax(taxable, brackets) {
    var tax = 0, prev = 0;
    for (var i = 0; i < brackets.length; i++) {
      var lim = brackets[i][0], rate = brackets[i][1];
      var upper = (lim === Infinity) ? taxable : Math.min(lim, taxable);
      if (upper > prev) tax += (upper - prev) * rate;
      if (taxable <= lim) break;
      prev = lim;
    }
    return tax;
  }

  /* ============ 投資理財 ============ */

  /* 資產配置 */
  g.RECalcEngine.register('fin_asset_alloc', function (inputs) {
    var total = need(inputs.totalAssets, '請輸入總資產規模。');
    if (total <= 0) throw new Error('總資產規模必須大於 0。');
    var items = [
      { name: '股票', pct: Number(inputs.stockPct) / 100, color: 'teal' },
      { name: '債券', pct: Number(inputs.bondPct) / 100, color: 'sky' },
      { name: '現金', pct: Number(inputs.cashPct) / 100, color: 'gold' },
      { name: '黃金', pct: Number(inputs.goldPct) / 100, color: 'plum' },
      { name: '基金', pct: Number(inputs.fundPct) / 100, color: 'coral' }
    ];
    var sumPct = 0;
    items.forEach(function (it) {
      it.amount = total * it.pct;
      sumPct += it.pct;
    });
    return {
      cards: [
        { label: '總資產規模', value: total, format: 'currency', emphasis: true },
        { label: '股票配置金額', value: items[0].amount, format: 'currency' },
        { label: '債券配置金額', value: items[1].amount, format: 'currency' },
        { label: '配置比例合計', value: sumPct, format: 'percent', sub: '應為 100%' }
      ],
      chart: {
        type: 'donut',
        title: '資產配置結構',
        unit: '元',
        categories: items.map(function (it) { return it.name; }),
        series: [{
          name: '配置',
          data: items.map(function (it) { return { name: it.name, value: Math.round(it.amount) }; })
        }]
      },
      notes: [
        '環圖數值為各資產類別應配置的金額。',
        '配置比例合計建議為 100%；若不足或超過，請依自身風險屬性微調。'
      ]
    };
  });

  /* ETF 定期定額 */
  g.RECalcEngine.register('fin_etf', function (inputs) {
    var monthly = need(inputs.monthly, '請輸入每月定期定額金額。');
    var years = need(inputs.years, '請輸入投資年限。');
    var ret = Number(inputs.ret) / 100;
    var fee = Number(inputs.fee) / 100;
    if (monthly <= 0 || years <= 0) throw new Error('定期定額與投資年限必須大於 0。');
    var net = Math.max(ret - fee, 0);
    var n = Math.round(years * 12);
    var r = net / 12;
    var finalAmt = M.fv(r, n, monthly, 0);
    var totalIn = monthly * n;
    var profit = finalAmt - totalIn;

    var cats = [], sA = [], sB = [];
    for (var y = 1; y <= years; y++) {
      var ny = Math.round(y * 12);
      cats.push('第 ' + y + ' 年');
      sA.push(M.fv(r, ny, monthly, 0));
      sB.push(monthly * ny);
    }
    return {
      cards: [
        { label: '期末累積資產', value: finalAmt, format: 'currency', emphasis: true, sub: '淨報酬率 ' + (net * 100).toFixed(2) + '%' },
        { label: '累積投入本金', value: totalIn, format: 'currency' },
        { label: '累積報酬', value: profit, format: 'currency' },
        { label: '報酬倍數', value: totalIn > 0 ? finalAmt / totalIn : 0, format: 'ratio' }
      ],
      chart: {
        type: 'line',
        title: '定期定額累積資產 vs 投入本金',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '累積資產', data: sA, color: 'teal' },
          { name: '投入本金', data: sB, color: 'gold' }
        ]
      },
      notes: [
        '假設每月月底扣款、年報酬率固定，並已扣除總費用率。',
        '實際 ETF 報酬率具波動性，本試算為理想化情境。'
      ]
    };
  });

  /* 股票損益 */
  g.RECalcEngine.register('fin_stock', function (inputs) {
    var buy = need(inputs.buyPrice, '請輸入買進股價。');
    var shares = need(inputs.shares, '請輸入股數。');
    var sell = need(inputs.sellPrice, '請輸入賣出股價。');
    var feeR = Number(inputs.feeRate) / 100;
    var taxR = Number(inputs.taxRate) / 100;
    if (buy <= 0 || shares <= 0 || sell <= 0) throw new Error('股價與股數必須大於 0。');
    var buyAmt = buy * shares;
    var sellAmt = sell * shares;
    var buyFee = Math.max(buyAmt * feeR, 20);
    var sellFee = Math.max(sellAmt * feeR, 20);
    var sellTax = sellAmt * taxR;
    var cost = buyAmt + buyFee;
    var proceeds = sellAmt - sellFee - sellTax;
    var profit = proceeds - cost;
    var roi = cost > 0 ? profit / cost : 0;
    return {
      cards: [
        { label: '買進總成本', value: cost, format: 'currency', sub: '含買入手續費 ' + Math.round(buyFee) + ' 元' },
        { label: '賣出實領淨額', value: proceeds, format: 'currency', sub: '已扣手續費與證交稅' },
        { label: '投資損益', value: profit, format: 'currency', emphasis: true },
        { label: '報酬率', value: roi, format: 'percent', emphasis: true }
      ],
      chart: {
        type: 'bar',
        title: '買進成本 vs 賣出淨額 vs 損益',
        unit: '元',
        categories: ['買進成本', '賣出淨額', '損益'],
        series: [{ name: '金額', data: [Math.round(cost), Math.round(proceeds), Math.round(profit)], color: 'primary' }]
      },
      notes: [
        '手續費買賣雙向收取，最低 20 元；證交稅僅於賣出時課徵 0.3%。',
        '實際券商折扣與交易稅率以券商及主管機關規定為準。'
      ]
    };
  });

  /* 本益比 */
  g.RECalcEngine.register('fin_pe', function (inputs) {
    var price = need(inputs.price, '請輸入目前股價。');
    var eps = need(inputs.eps, '請輸入每股盈餘。');
    var growth = Number(inputs.growth);
    if (price <= 0 || eps <= 0) throw new Error('股價與每股盈餘必須大於 0。');
    var pe = price / eps;
    var peg = growth > 0 ? pe / growth : 0;
    var fairPe = growth > 0 ? growth : pe;
    var fairPrice = eps * fairPe;
    var diff = price - fairPrice;
    return {
      cards: [
        { label: '本益比（PE）', value: pe, format: 'number2', emphasis: true },
        { label: 'PEG（PE÷成長率）', value: peg, format: 'number2' },
        { label: '合理股價（PEG=1）', value: fairPrice, format: 'currency' },
        { label: '目前股價偏離', value: diff, format: 'currency2' }
      ],
      chart: {
        type: 'bar',
        title: '目前股價 vs 合理股價',
        unit: '元',
        categories: ['目前股價', '合理股價'],
        series: [{ name: '股價', data: [price, Math.round(fairPrice * 100) / 100], color: 'teal' }]
      },
      notes: [
        '合理股價以 PEG=1（本益比約當盈餘成長率）做為簡化假設。',
        '本益比受產業循環與景氣影響，僅供評估參考。'
      ]
    };
  });

  /* 殖利率 */
  g.RECalcEngine.register('fin_dividend_yield', function (inputs) {
    var price = need(inputs.price, '請輸入目前股價。');
    var dps = Number(inputs.dps);
    var shares = need(inputs.shares, '請輸入持股數。');
    if (price <= 0 || shares <= 0) throw new Error('股價與持股數必須大於 0。');
    var yld = price > 0 ? dps / price : 0;
    var annualDiv = dps * shares;
    var cats = [], ys = [];
    for (var p = 20; p <= 40; p += 4) {
      cats.push(p + ' 元');
      ys.push(dps / p);
    }
    return {
      cards: [
        { label: '現金殖利率', value: yld, format: 'percent', emphasis: true },
        { label: '每年現金股利', value: annualDiv, format: 'currency' },
        { label: '持股數', value: shares, format: 'number' },
        { label: '投入成本', value: price * shares, format: 'currency' }
      ],
      chart: {
        type: 'line',
        title: '不同買進股價下的殖利率',
        unit: '%',
        yName: '殖利率',
        categories: cats,
        series: [{ name: '殖利率', data: ys.map(function (v) { return Math.round(v * 10000) / 10000; }), color: 'gold' }]
      },
      notes: ['殖利率＝每年每股股利÷買進股價；實際配息金額依公司董事會決議為準。']
    };
  });

  /* 股利試算 */
  g.RECalcEngine.register('fin_dividend', function (inputs) {
    var dps = Number(inputs.dps);
    var shares = need(inputs.shares, '請輸入持股數。');
    var g = Number(inputs.growth) / 100;
    var years = need(inputs.years, '請輸入預估年數。');
    if (shares <= 0 || years <= 0) throw new Error('持股數與年數必須大於 0。');
    var cats = [], annual = [], cum = [];
    var sum = 0;
    for (var y = 1; y <= years; y++) {
      var d = dps * Math.pow(1 + g, y - 1);
      var a = d * shares;
      sum += a;
      cats.push('第 ' + y + ' 年');
      annual.push(a);
      cum.push(sum);
    }
    var first = dps * shares;
    var last = dps * Math.pow(1 + g, years - 1) * shares;
    return {
      cards: [
        { label: '首年現金股利', value: first, format: 'currency' },
        { label: '末年現金股利', value: last, format: 'currency' },
        { label: years + ' 年累計股利', value: sum, format: 'currency', emphasis: true }
      ],
      chart: {
        type: 'stackedArea',
        title: '每年股利與累計股利',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '當年股利', data: annual.map(Math.round), color: 'gold' },
          { name: '累計股利', data: cum.map(Math.round), color: 'teal' }
        ]
      },
      notes: ['假設股利每年固定成長、持股不變且均以現金股利發放；實際配息以公司公告為準。']
    };
  });

  /* 債券投資 */
  g.RECalcEngine.register('fin_bond', function (inputs) {
    var face = need(inputs.face, '請輸入債券面額。');
    var coupon = Number(inputs.coupon) / 100;
    var years = need(inputs.years, '請輸入持有年期。');
    var buyPrice = need(inputs.buyPrice, '請輸入買進價格。');
    if (face <= 0 || years <= 0 || buyPrice <= 0) throw new Error('面額、年期與買進價格必須大於 0。');
    var yearlyInt = face * coupon;
    var totalInt = yearlyInt * years;
    var totalReturn = face - buyPrice + totalInt;
    var roi = buyPrice > 0 ? totalReturn / buyPrice : 0;
    var cats = [], bal = [];
    for (var y = 0; y <= years; y++) {
      cats.push('第 ' + y + ' 年');
      bal.push(buyPrice + yearlyInt * y);
    }
    return {
      cards: [
        { label: '每年票息收入', value: yearlyInt, format: 'currency' },
        { label: '期滿累計利息', value: totalInt, format: 'currency' },
        { label: '到期償還面額', value: face, format: 'currency' },
        { label: '總投資報酬率', value: roi, format: 'percent', emphasis: true }
      ],
      chart: {
        type: 'line',
        title: '債券累計價值（買進價＋累計利息）',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [{ name: '累計價值', data: bal.map(Math.round), color: 'teal' }]
      },
      notes: ['此為持有到期的簡化模型，未考慮折溢價攤銷與市場利率變動；實際收益率以市場報價為準。']
    };
  });

  /* 匯率換算 */
  g.RECalcEngine.register('fin_forex', function (inputs) {
    var twd = Number(inputs.twd);
    var rate = need(inputs.rate, '請輸入兌換匯率。');
    if (rate <= 0) throw new Error('匯率必須大於 0。');
    var foreign = twd / rate;
    var cats = [], vals = [];
    for (var i = 28; i <= 35; i++) {
      cats.push(i.toFixed(1));
      vals.push(Math.round(twd / i * 100) / 100);
    }
    return {
      cards: [
        { label: '新台幣金額', value: twd, format: 'currency' },
        { label: '可換外幣金額', value: foreign, format: 'currency2', emphasis: true },
        { label: '適用匯率', value: rate, format: 'currency2', sub: '每單位外幣兌新台幣' }
      ],
      chart: {
        type: 'line',
        title: '不同匯率下可換外幣金額',
        unit: '外幣',
        yName: '可換外幣',
        categories: cats,
        series: [{ name: '外幣金額', data: vals, color: 'sky' }]
      },
      notes: ['銀行換匯含買賣匯價差，實際可換金額以銀行牌告為準。']
    };
  });

  /* 外幣定存 */
  g.RECalcEngine.register('fin_foreign_currency', function (inputs) {
    var fc = need(inputs.fcAmount, '請輸入外幣本金。');
    var fcRate = Number(inputs.fcRate) / 100;
    var years = need(inputs.years, '請輸入存續年期。');
    var twdRate = need(inputs.twdRate, '請輸入新台幣匯率。');
    if (fc <= 0 || years <= 0 || twdRate <= 0) throw new Error('外幣本金、年期與匯率必須大於 0。');
    var interest = fc * fcRate * years;
    var fcTotal = fc + interest;
    var twdTotal = fcTotal * twdRate;
    var twdPrincipal = fc * twdRate;
    var cats = [], vals = [];
    for (var y = 0; y <= years; y++) {
      cats.push('第 ' + y + ' 年');
      vals.push(fc * (1 + fcRate * y));
    }
    return {
      cards: [
        { label: '外幣本利和', value: fcTotal, format: 'currency2', emphasis: true },
        { label: '外幣利息', value: interest, format: 'currency2' },
        { label: '折合新台幣', value: twdTotal, format: 'currency' },
        { label: '本金折合新台幣', value: twdPrincipal, format: 'currency' }
      ],
      chart: {
        type: 'line',
        title: '外幣定存累積（單利）',
        unit: '外幣',
        yName: '外幣金額',
        categories: cats,
        series: [{ name: '外幣本利和', data: vals.map(function (v) { return Math.round(v * 100) / 100; }), color: 'teal' }]
      },
      notes: ['假設單利計息、匯率維持不變；實際兌換損益受匯率波動影響。']
    };
  });

  /* 黃金投資 */
  g.RECalcEngine.register('fin_gold', function (inputs) {
    var grams = need(inputs.grams, '請輸入黃金公克數。');
    var buy = need(inputs.buyPrice, '請輸入每公克買進價格。');
    var sell = need(inputs.sellPrice, '請輸入每公克賣出價格。');
    if (grams <= 0 || buy <= 0 || sell <= 0) throw new Error('公克數與單價必須大於 0。');
    var cost = grams * buy;
    var proceeds = grams * sell;
    var profit = proceeds - cost;
    var roi = cost > 0 ? profit / cost : 0;
    return {
      cards: [
        { label: '買進成本', value: cost, format: 'currency' },
        { label: '賣出所得', value: proceeds, format: 'currency' },
        { label: '投資損益', value: profit, format: 'currency', emphasis: true },
        { label: '報酬率', value: roi, format: 'percent', emphasis: true }
      ],
      chart: {
        type: 'bar',
        title: '買進成本 vs 賣出所得',
        unit: '元',
        categories: ['買進成本', '賣出所得'],
        series: [{ name: '金額', data: [Math.round(cost), Math.round(proceeds)], color: 'gold' }]
      },
      notes: ['未含買賣工本與儲存成本；金價隨國際行情波動。']
    };
  });

  /* 股票手續費 */
  g.RECalcEngine.register('fin_stock_fee', function (inputs) {
    var amount = Number(inputs.amount);
    var feeR = Number(inputs.feeRate) / 100;
    var discount = Number(inputs.discount) / 100;
    if (discount <= 0) throw new Error('券商折扣必須大於 0。');
    var full = amount * feeR;
    var discounted = full * discount;
    var fee = Math.max(discounted, 20);
    return {
      cards: [
        { label: '成交金額', value: amount, format: 'currency' },
        { label: '標準手續費', value: full, format: 'currency2' },
        { label: '折扣後實付手續費', value: fee, format: 'currency2', emphasis: true },
        { label: '實際費率', value: amount > 0 ? fee / amount : 0, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '標準手續費 vs 折扣後手續費',
        unit: '元',
        categories: ['標準手續費', '折扣後'],
        series: [{ name: '手續費', data: [Math.round(full * 100) / 100, Math.round(fee * 100) / 100], color: 'sky' }]
      },
      notes: ['手續費最低 20 元；券商折扣依各家約定，實際以券商報價為準。']
    };
  });

  /* 證交稅 */
  g.RECalcEngine.register('fin_stock_tax', function (inputs) {
    var sell = Number(inputs.sellAmount);
    var taxR = Number(inputs.taxRate) / 100;
    var tax = sell * taxR;
    var net = sell - tax;
    return {
      cards: [
        { label: '賣出成交金額', value: sell, format: 'currency' },
        { label: '應繳證交稅', value: tax, format: 'currency', emphasis: true },
        { label: '賣出實領（未計手續費）', value: net, format: 'currency' },
        { label: '有效稅率', value: sell > 0 ? taxR : 0, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '賣出金額 vs 證交稅 vs 實領',
        unit: '元',
        categories: ['賣出金額', '證交稅', '實領'],
        series: [{ name: '金額', data: [Math.round(sell), Math.round(tax), Math.round(net)], color: 'coral' }]
      },
      notes: ['證交稅僅於賣出時課徵；此試算未另計手續費。']
    };
  });

  /* ============ 財務分析 ============ */

  /* IRR */
  g.RECalcEngine.register('fin_irr', function (inputs) {
    var flows = P.list(inputs.flows);
    flows = flows.filter(function (v) { return isFinite(v); });
    if (flows.length < 2) throw new Error('請至少輸入兩期現金流（第一筆為投入）。');
    var irr = M.irr(flows);
    if (!isFinite(irr)) throw new Error('此現金流無法計算 IRR。');
    var cats = [], data = [], cum = [];
    var c = 0;
    flows.forEach(function (v, i) {
      cats.push('第 ' + i + ' 期');
      data.push(Math.round(v));
      c += v;
      cum.push(Math.round(c));
    });
    return {
      cards: [
        { label: 'IRR 內部報酬率', value: irr, format: 'percent', emphasis: true },
        { label: '現金流期數', value: flows.length, format: 'number' },
        { label: '未折現合計', value: c, format: 'currency' }
      ],
      table: {
        caption: '各期現金流與累計',
        cols: ['期數', '現金流', '累計現金流'],
        colFormats: ['number', 'currency', 'currency'],
        rows: flows.map(function (v, i) { return [i, Math.round(v), 0]; }).map(function (row, i) {
          row[2] = Math.round(flows.slice(0, i + 1).reduce(function (a, b) { return a + b; }, 0));
          return row;
        })
      },
      chart: {
        type: 'bar',
        title: '各期現金流',
        unit: '元',
        categories: cats,
        series: [{ name: '現金流', data: data, color: 'teal' }]
      },
      notes: ['第一筆現金流為負數代表初始投入；IRR 為使淨現值為 0 的折現率。']
    };
  });

  /* NPV */
  g.RECalcEngine.register('fin_npv', function (inputs) {
    var rate = Number(inputs.rate) / 100;
    var flows = P.list(inputs.flows).filter(function (v) { return isFinite(v); });
    if (flows.length < 2) throw new Error('請至少輸入兩期現金流。');
    var npv = M.npv(rate, flows);
    if (!isFinite(npv)) throw new Error('無法計算淨現值，請檢查現金流與折現率。');
    var cats = [], data = [];
    flows.forEach(function (v, i) {
      cats.push('第 ' + i + ' 期');
      data.push(Math.round(v / Math.pow(1 + rate, i)));
    });
    var rawSum = flows.reduce(function (a, b) { return a + b; }, 0);
    return {
      cards: [
        { label: 'NPV 淨現值', value: npv, format: 'currency', emphasis: true },
        { label: '未折現現金流合計', value: rawSum, format: 'currency' },
        { label: '折現率', value: rate, format: 'percent' }
      ],
      table: {
        caption: '各期現金流折現',
        cols: ['期數', '原始現金流', '折現後現值'],
        colFormats: ['number', 'currency', 'currency'],
        rows: flows.map(function (v, i) {
          return [i, Math.round(v), Math.round(v / Math.pow(1 + rate, i))];
        })
      },
      chart: {
        type: 'bar',
        title: '各期折現後現值',
        unit: '元',
        categories: cats,
        series: [{ name: '折現現值', data: data, color: 'plum' }]
      },
      notes: ['NPV 大於 0 代表投資案在該折現率下具創造價值能力；折現率應反映資金成本與風險。']
    };
  });

  /* DCF */
  g.RECalcEngine.register('fin_dcf', function (inputs) {
    var fcf1 = need(inputs.fcf1, '請輸入第一年自由現金流。');
    var g = Number(inputs.growth) / 100;
    var years = Math.round(need(inputs.years, '請輸入預測期數。'));
    var disc = Number(inputs.disc) / 100;
    var tg = Number(inputs.tg) / 100;
    var shares = need(inputs.shares, '請輸入流通股數。');
    if (fcf1 <= 0 || years < 1 || shares <= 0) throw new Error('自由現金流、預測期數與股數必須合理輸入。');
    if (disc <= tg) throw new Error('折現率必須大於永續成長率。');
    var cats = [], pvData = [], fcfData = [];
    var pvSum = 0;
    var lastFcf = 0;
    for (var i = 1; i <= years; i++) {
      var fcf = fcf1 * Math.pow(1 + g, i - 1);
      var pv = fcf / Math.pow(1 + disc, i);
      pvSum += pv;
      lastFcf = fcf;
      cats.push('第 ' + i + ' 年');
      fcfData.push(Math.round(fcf));
      pvData.push(Math.round(pv));
    }
    var tv = lastFcf * (1 + tg) / (disc - tg);
    var pvTv = tv / Math.pow(1 + disc, years);
    var ev = pvSum + pvTv;
    var fair = ev / shares;
    return {
      cards: [
        { label: '預測期現值合計', value: pvSum, format: 'currency' },
        { label: '永續價值現值', value: pvTv, format: 'currency' },
        { label: '企業價值', value: ev, format: 'currency' },
        { label: '每股合理股價', value: fair, format: 'currency2', emphasis: true }
      ],
      table: {
        caption: '明顯預測期自由現金流折現',
        cols: ['年度', '自由現金流', '折現現值'],
        colFormats: ['number', 'currency', 'currency'],
        rows: fcfData.map(function (f, i) { return [i + 1, f, pvData[i]]; })
      },
      chart: {
        type: 'line',
        title: '預測期自由現金流與折現現值',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '自由現金流', data: fcfData, color: 'teal' },
          { name: '折現現值', data: pvData, color: 'gold' }
        ]
      },
      notes: [
        'DCF 為簡化模型：明顯預測期現金流固定成長，期末以戈登成長模型估計永續價值。',
        '結果對折現率與永續成長率高度敏感，實際評價應併同其他方法交叉驗證。'
      ]
    };
  });

  /* ROE */
  g.RECalcEngine.register('fin_roe', function (inputs) {
    var ni = Number(inputs.ni);
    var equity = need(inputs.equity, '請輸入股東權益。');
    if (equity <= 0) throw new Error('股東權益必須大於 0。');
    var roe = ni / equity;
    return {
      cards: [
        { label: 'ROE 股東權益報酬率', value: roe, format: 'percent', emphasis: true },
        { label: '稅後淨利', value: ni, format: 'currency' },
        { label: '股東權益', value: equity, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: 'ROE 與常見門檻比較',
        unit: '%',
        categories: ['本公司 ROE', '好公司門檻 15%', '一般門檻 10%'],
        series: [{ name: 'ROE', data: [Math.round(roe * 10000) / 100, 15, 10], color: 'teal' }]
      },
      notes: ['ROE＝稅後淨利÷股東權益；長期高 ROE 代表公司運用股東資金效率佳。']
    };
  });

  /* EPS */
  g.RECalcEngine.register('fin_eps', function (inputs) {
    var ni = Number(inputs.ni);
    var shares = need(inputs.shares, '請輸入流通股數。');
    var pref = Number(inputs.pref) || 0;
    if (shares <= 0) throw new Error('流通股數必須大於 0。');
    var avail = ni - pref;
    var eps = avail / shares;
    return {
      cards: [
        { label: 'EPS 每股盈餘', value: eps, format: 'currency2', emphasis: true },
        { label: '可用盈餘（扣特別股股利）', value: avail, format: 'currency' },
        { label: '流通股數', value: shares, format: 'number' }
      ],
      chart: {
        type: 'bar',
        title: '淨利與每股盈餘',
        unit: '元',
        categories: ['稅後淨利（萬元）', '每股盈餘'],
        series: [{ name: '金額', data: [Math.round(ni / 10000), Math.round(eps * 100) / 100], color: 'gold' }]
      },
      notes: ['EPS＝（稅後淨利－特別股股利）÷流通在外普通股加權平均股數。']
    };
  });

  /* ROI */
  g.RECalcEngine.register('fin_roi', function (inputs) {
    var cost = need(inputs.cost, '請輸入投資成本。');
    var final = Number(inputs.final);
    var years = need(inputs.years, '請輸入投資年期。');
    if (cost <= 0 || years <= 0) throw new Error('投資成本與年期必須大於 0。');
    var profit = final - cost;
    var roi = profit / cost;
    var annual = M.annualizedReturn(final, cost, years);
    var cats = [], vals = [];
    for (var y = 0; y <= years; y++) {
      cats.push('第 ' + y + ' 年');
      vals.push(cost + (final - cost) * (y / years));
    }
    return {
      cards: [
        { label: '總投資損益', value: profit, format: 'currency' },
        { label: '總投資報酬率 ROI', value: roi, format: 'percent', emphasis: true },
        { label: '年化投資報酬率', value: isFinite(annual) ? annual : 0, format: 'percent', emphasis: true }
      ],
      chart: {
        type: 'line',
        title: '投資價值變化（線性近似）',
        unit: '元',
        scale: 10000,
        yName: '價值（萬元）',
        categories: cats,
        series: [{ name: '投資價值', data: vals.map(Math.round), color: 'teal' }]
      },
      notes: ['總 ROI＝（最終價值－成本）÷成本；年化報酬率以複利方式換算。']
    };
  });

  /* 夏普比率 */
  g.RECalcEngine.register('fin_sharpe', function (inputs) {
    var ret = Number(inputs.ret) / 100;
    var rf = Number(inputs.rf) / 100;
    var vol = Number(inputs.vol) / 100;
    if (vol <= 0) throw new Error('報酬率標準差必須大於 0。');
    var sharpe = (ret - rf) / vol;
    return {
      cards: [
        { label: '夏普比率', value: sharpe, format: 'number2', emphasis: true },
        { label: '超額報酬（報酬率－無風險利率）', value: ret - rf, format: 'percent' },
        { label: '年化波動率', value: vol, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '報酬率組成',
        unit: '%',
        categories: ['無風險利率', '超額報酬'],
        series: [{ name: '占比', data: [Math.round(rf * 10000) / 100, Math.round((ret - rf) * 10000) / 100], color: 'sky' }]
      },
      notes: ['夏普比率越高，代表每承擔一單位總風險所獲得的超額報酬越佳。']
    };
  });

  /* 波動率 */
  g.RECalcEngine.register('fin_volatility', function (inputs) {
    var arr = P.list(inputs.returns).filter(function (v) { return isFinite(v); }).map(function (v) { return v / 100; });
    if (arr.length < 2) throw new Error('請至少輸入兩期報酬率。');
    var m = M.mean(arr);
    var sd = M.stdev(arr);
    if (!isFinite(sd)) throw new Error('無法計算標準差，請檢查輸入。');
    var annual = sd * Math.sqrt(12);
    var cats = arr.map(function (_, i) { return '第 ' + (i + 1) + ' 期'; });
    return {
      cards: [
        { label: '樣本期數', value: arr.length, format: 'number' },
        { label: '平均每期報酬率', value: m, format: 'percent' },
        { label: '每期波動率（標準差）', value: sd, format: 'percent' },
        { label: '年化波動率（月資料×√12）', value: annual, format: 'percent', emphasis: true }
      ],
      table: {
        caption: '各期報酬率',
        cols: ['期數', '報酬率'],
        colFormats: ['number', 'percent'],
        rows: arr.map(function (v, i) { return [i + 1, v]; })
      },
      chart: {
        type: 'line',
        title: '報酬率走勢',
        unit: '%',
        yName: '報酬率',
        categories: cats,
        series: [{ name: '報酬率', data: arr.map(function (v) { return Math.round(v * 10000) / 100; }), color: 'coral' }]
      },
      notes: ['此預設將輸入視為月報酬率並乘以√12換算年化；若為季報酬率應改乘√4。']
    };
  });

  /* 風險承受度 */
  g.RECalcEngine.register('fin_risk_tolerance', function (inputs) {
    var score = Number(inputs.q_age) + Number(inputs.q_horizon) + Number(inputs.q_loss) + Number(inputs.q_income);
    var level, alloc;
    if (score >= 14) { level = '積極型'; alloc = '股票 70%／債券 25%／現金 5%'; }
    else if (score >= 10) { level = '穩健型'; alloc = '股票 50%／債券 40%／現金 10%'; }
    else if (score >= 7) { level = '保守型'; alloc = '股票 25%／債券 55%／現金 20%'; }
    else { level = '非常保守型'; alloc = '股票 10%／債券 60%／現金 30%'; }
    return {
      cards: [
        { label: '風險分數', value: score, format: 'number', emphasis: true, sub: level },
        { label: '建議配置分數參考', value: score, format: 'text', sub: alloc }
      ],
      chart: {
        type: 'bar',
        title: '風險分數與分級區間',
        unit: '分',
        categories: ['非常保守(4-6)', '保守(7-9)', '穩健(10-13)', '積極(14-16)', '你的分數'],
        series: [{ name: '分數', data: [5, 8, 11, 15, score], color: 'primary' }]
      },
      notes: [
        '你的風險屬性：' + level + '。',
        '建議資產配置方向：' + alloc + '。',
        '本評估為情境式簡易問卷，僅供參考，實際投資仍應諮詢專業人員。'
      ]
    };
  });

  /* 停損點 */
  g.RECalcEngine.register('fin_stop_loss', function (inputs) {
    var buy = need(inputs.buyPrice, '請輸入買進價格。');
    var shares = need(inputs.shares, '請輸入持股數。');
    var pct = Number(inputs.pct) / 100;
    if (buy <= 0 || shares <= 0) throw new Error('買進價與持股數必須大於 0。');
    var stop = buy * (1 - pct);
    var maxLoss = (buy - stop) * shares;
    var cats = ['買進價', '停損價'];
    return {
      cards: [
        { label: '停損價位', value: stop, format: 'currency2', emphasis: true },
        { label: '最大可承受虧損', value: maxLoss, format: 'currency' },
        { label: '停損比例', value: pct, format: 'percent' },
        { label: '投入成本', value: buy * shares, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '買進價 vs 停損價',
        unit: '元',
        categories: cats,
        series: [{ name: '股價', data: [buy, Math.round(stop * 100) / 100], color: 'coral' }]
      },
      notes: ['停損為風險管理紀律，實際應配合個股技術面與持續跟踪。']
    };
  });

  /* 獲利了結 */
  g.RECalcEngine.register('fin_take_profit', function (inputs) {
    var buy = need(inputs.buyPrice, '請輸入買進價格。');
    var shares = need(inputs.shares, '請輸入持股數。');
    var pct = Number(inputs.pct) / 100;
    if (buy <= 0 || shares <= 0) throw new Error('買進價與持股數必須大於 0。');
    var target = buy * (1 + pct);
    var profit = (target - buy) * shares;
    return {
      cards: [
        { label: '目標價位', value: target, format: 'currency2', emphasis: true },
        { label: '預期獲利', value: profit, format: 'currency' },
        { label: '目標報酬率', value: pct, format: 'percent' },
        { label: '投入成本', value: buy * shares, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '買進價 vs 目標價',
        unit: '元',
        categories: ['買進價', '目標價'],
        series: [{ name: '股價', data: [buy, Math.round(target * 100) / 100], color: 'teal' }]
      },
      notes: ['獲利了結目標應搭配出場紀律與交易成本一併評估。']
    };
  });

  /* ============ 稅務試算 ============ */

  /* 綜合所得稅 */
  g.RECalcEngine.register('fin_income_tax', function (inputs) {
    var gross = Number(inputs.gross);
    var people = Math.max(1, Math.round(Number(inputs.people)));
    var ded = Number(inputs.ded) || 0;
    var year = String(inputs.year);
    var exemptPer = (year === '2025') ? 93000 : 92000;
    var brackets = [
      [560000, 0.05],
      [1260000, 0.12],
      [2520000, 0.20],
      [4720000, 0.30],
      [Infinity, 0.40]
    ];
    var exempt = exemptPer * people;
    var taxable = Math.max(0, gross - exempt - ded);
    var tax = progressiveTax(taxable, brackets);
    var eff = gross > 0 ? tax / gross : 0;
    return {
      cards: [
        { label: '免稅額合計', value: exempt, format: 'currency' },
        { label: '課稅所得額', value: taxable, format: 'currency' },
        { label: '應納綜合所得稅額', value: tax, format: 'currency', emphasis: true },
        { label: '有效稅率', value: eff, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '綜合所得稅各級距稅率',
        unit: '%',
        categories: ['5%', '12%', '20%', '30%', '40%'],
        series: [{ name: '稅率', data: [5, 12, 20, 30, 40], color: 'gold' }]
      },
      notes: [
        '本試算為現行法令簡化模型：免稅額 2024 年每人 9.2 萬、2025 年 9.3 萬；扣除額由使用者輸入。',
        '未考慮特別扣除額、股東可扣抵稅額、投資抵減與累進差額等。',
        '實際應納稅額以國稅局核定申報結果為準。'
      ]
    };
  });

  /* 薪資扣繳 */
  g.RECalcEngine.register('fin_payroll_tax', function (inputs) {
    var monthly = Number(inputs.monthly);
    var rate = Number(inputs.rate) / 100;
    var monthTax = monthly * rate;
    var yearSalary = monthly * 12;
    var yearTax = monthTax * 12;
    return {
      cards: [
        { label: '每月薪資', value: monthly, format: 'currency' },
        { label: '每月扣繳稅額', value: monthTax, format: 'currency', emphasis: true },
        { label: '全年薪資', value: yearSalary, format: 'currency' },
        { label: '全年累計扣繳稅額', value: yearTax, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '每月薪資 vs 每月扣繳稅額',
        unit: '元',
        categories: ['每月薪資', '每月扣繳稅額'],
        series: [{ name: '金額', data: [Math.round(monthly), Math.round(monthTax)], color: 'sky' }]
      },
      notes: [
        '本試算為簡化模型，假設每月依固定扣繳率扣繳。',
        '實務上薪資所得扣繳率依扶養親屬人數、是否填報免稅額申報表而不同，實際以扣繳單位與國稅局規定為準。'
      ]
    };
  });

  /* 遺產稅 */
  g.RECalcEngine.register('fin_estate_tax', function (inputs) {
    var estate = Number(inputs.estate);
    var debt = Number(inputs.debt) || 0;
    var ded = Number(inputs.ded) || 0;
    var exempt = 13330000;   // 免稅額（簡化 2024）
    var funeral = 123000;    // 喪葬費定額扣除
    var brackets = [
      [50000000, 0.10],
      [100000000, 0.15],
      [Infinity, 0.20]
    ];
    var taxable = Math.max(0, estate - exempt - funeral - debt - ded);
    var tax = progressiveTax(taxable, brackets);
    var eff = estate > 0 ? tax / estate : 0;
    return {
      cards: [
        { label: '免稅額與扣除', value: exempt + funeral + debt + ded, format: 'currency' },
        { label: '課稅遺產淨額', value: taxable, format: 'currency' },
        { label: '應納遺產稅額', value: tax, format: 'currency', emphasis: true },
        { label: '有效稅率', value: eff, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '遺產稅各級距稅率',
        unit: '%',
        categories: ['10%（5,000 萬以下）', '15%（5,000 萬~1 億）', '20%（1 億以上）'],
        series: [{ name: '稅率', data: [10, 15, 20], color: 'plum' }]
      },
      notes: [
        '本試算為現行法令簡化模型：免稅額 1,333 萬、喪葬費定額 12.3 萬；級距為 10%／15%／20%。',
        '未考慮配偶剩餘財產差額分配、农耕用地扣除、公益性質遺產扣除與相關抵減。',
        '實際應納稅額以國稅局核定為準。'
      ]
    };
  });

  /* 二代健保補充保費 */
  g.RECalcEngine.register('fin_supplementary_premium', function (inputs) {
    var amount = Number(inputs.amount);
    var rate = Number(inputs.rate) / 100;
    var premium = amount * rate;
    var net = amount - premium;
    return {
      cards: [
        { label: '單筆給付金額', value: amount, format: 'currency' },
        { label: '應扣補充保費', value: premium, format: 'currency', emphasis: true },
        { label: '實領金額', value: net, format: 'currency' },
        { label: '補充保費費率', value: rate, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '單筆給付 vs 補充保費 vs 實領',
        unit: '元',
        categories: ['給付金額', '補充保費', '實領金額'],
        series: [{ name: '金額', data: [Math.round(amount), Math.round(premium), Math.round(net)], color: 'gold' }]
      },
      notes: [
        '二代健保補充保費費率現行為 2.11%，適用於高額年終獎金、股利、執行業務收入等單筆給付。',
        '本試算為簡化模型，未考量投保金額上限、免扣條件與補充保費計費級距。',
        '實際應扣金額以健保署及扣繳單位計算為準。'
      ]
    };
  });

})(typeof window !== 'undefined' ? window : globalThis);
