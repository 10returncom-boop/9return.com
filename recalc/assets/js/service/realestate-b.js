/* ============================================================
   service/realestate-b.js — 投資槓桿（cat_re_invest）16 支引擎
   負責代理：RE-B
   ============================================================ */
(function (g) {
  'use strict';

  var M = g.RECalcMath;

  /* ---------- 1. 財務槓桿倍數 ---------- */
  g.RECalcEngine.register('re_leverage', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100,
        growth = inputs.growth / 100, rate = inputs.loanRate / 100, years = inputs.years;
    if (!(price > 0)) throw new Error('請輸入大於 0 的房屋總價。');
    if (!(downRatio > 0 && downRatio < 1)) throw new Error('頭期款比例需介於 1 至 99 之間。');
    if (!(rate >= 0)) throw new Error('房貸利率不可為負數。');
    if (!(years > 0)) throw new Error('持有年數需大於 0。');

    var equity = price * downRatio;
    var loan = price - equity;
    var lev = price / equity;
    var pEnd = M.compoundFV(price, growth, years, 1);
    var interestTotal = loan * rate * years;
    var equityEnd = pEnd - loan;
    var netEquity = equityEnd - interestTotal;
    var leverROE = M.annualizedReturn(netEquity, equity, years);
    var unlevROE = M.annualizedReturn(pEnd, price, years);

    var cats = [], sL = [];
    for (var k = -2; k <= 8; k += 1) {
      var gg = k / 100;
      var pp = M.compoundFV(price, gg, years, 1);
      var ee = pp - loan - loan * rate * years;
      cats.push(k + '%');
      sL.push(M.annualizedReturn(ee, equity, years) * 100);
    }

    return {
      cards: [
        { label: '財務槓桿倍數', value: lev, format: 'ratio', emphasis: true, sub: '總價 ÷ 自備款' },
        { label: '自備頭期款', value: equity, format: 'currency' },
        { label: '貸款金額', value: loan, format: 'currency' },
        { label: '持有 ' + years + ' 年總利息', value: interestTotal, format: 'currency', sub: '只繳息假設' },
        { label: '槓桿後年化報酬率', value: leverROE, format: 'percent' },
        { label: '無槓桿年化報酬率', value: unlevROE, format: 'percent' }
      ],
      chart: {
        type: 'line',
        title: '不同房價年漲幅下的槓桿年化報酬率',
        unit: '%',
        yName: '年化報酬率（%）',
        categories: cats,
        series: [{ name: '槓桿後年化報酬率', data: sL, color: 'primary' }]
      },
      notes: [
        '假設房貸為只繳息型，持有期間利息全數支付、期末一次償還本金。',
        '未計入交易稅費、租金收入與物價波動，實際績效會因市場行情而不同。'
      ]
    };
  });

  /* ---------- 2. 槓桿投資報酬率 ---------- */
  g.RECalcEngine.register('re_leverage_return', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100,
        rate = inputs.loanRate / 100, years = inputs.years,
        rent = inputs.monthlyRent, exp = inputs.expenses;
    if (!(price > 0)) throw new Error('請輸入大於 0 的房屋總價。');
    if (!(downRatio > 0 && downRatio < 1)) throw new Error('頭期款比例不合理。');
    if (!(years > 0)) throw new Error('貸款年限需大於 0。');
    if (!(rate >= 0)) throw new Error('利率不可為負數。');

    var equity = price * downRatio;
    var loan = price - equity;
    var n = M.yearToMonth(years);
    var rm = rate / 12;
    var pmtM = M.pmt(rm, n, loan);
    var annualGross = rent * 12;
    var annualNOI = (rent - exp) * 12;
    var annualDebt = pmtM * 12;
    var annualCF = annualNOI - annualDebt;
    var monthlyCF = rent - exp - pmtM;
    var grossY = annualGross / price;
    var netY = annualNOI / price;
    var coc = equity > 0 ? annualCF / equity : 0;

    return {
      cards: [
        { label: '每月現金淨流', value: monthlyCF, format: 'currency', emphasis: true, sub: '租金 − 費用 − 月付金' },
        { label: '自備頭期款', value: equity, format: 'currency' },
        { label: '貸款金額', value: loan, format: 'currency' },
        { label: '每月房貸月付', value: pmtM, format: 'currency' },
        { label: '租金毛投報率', value: grossY, format: 'percent' },
        { label: '租金淨投報率', value: netY, format: 'percent' },
        { label: '現金投報率（CoC）', value: coc, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '各階段投報率比較',
        unit: '%',
        yName: '投報率（%）',
        categories: ['租金毛投報率', '租金淨投報率', '現金投報率'],
        series: [{
          name: '投報率',
          data: [grossY * 100, netY * 100, coc * 100],
          color: 'primary'
        }]
      },
      notes: [
        '租金淨投報率＝（月租金−月費用）×12 ÷ 房屋總價。',
        '現金投報率（CoC）＝年淨現金流 ÷ 自備頭期款，未計入房價增值與本金攤還。'
      ]
    };
  });

  /* ---------- 3. 轉售投資報酬 ---------- */
  g.RECalcEngine.register('re_flip_roi', function (inputs) {
    var buy = inputs.buyPrice, reno = inputs.renovation, sell = inputs.sellPrice,
        buyFee = inputs.buyFeeRate / 100, sellFee = inputs.sellFeeRate / 100,
        months = inputs.holdingMonths, hold = inputs.monthlyHolding;
    if (!(buy > 0)) throw new Error('請輸入大於 0 的買進價格。');
    if (!(sell > 0)) throw new Error('請輸入大於 0 的賣出價格。');
    if (!(months > 0)) throw new Error('持有月數需大於 0。');

    var buyFeeAmt = buy * buyFee;
    var sellFeeAmt = sell * sellFee;
    var holdAmt = hold * months;
    var totalOut = buy + reno + buyFeeAmt + holdAmt;
    var netProceed = sell - sellFeeAmt;
    var profit = netProceed - totalOut;
    var roi = profit / totalOut;
    var years = months / 12;
    var ann = M.annualizedReturn(totalOut + profit, totalOut, years);

    return {
      cards: [
        { label: '轉售獲利', value: profit, format: 'currency', emphasis: true, sub: '賣出淨收入 − 總投入' },
        { label: '總投入成本', value: totalOut, format: 'currency' },
        { label: '賣出淨收入', value: netProceed, format: 'currency' },
        { label: '總投資報酬率', value: roi, format: 'percent' },
        { label: '年化報酬率', value: ann, format: 'percent' }
      ],
      chart: {
        type: 'donut',
        title: '總投入成本結構',
        unit: '元',
        series: [{
          name: '成本結構',
          data: [
            { name: '買進價格', value: buy },
            { name: '翻修成本', value: reno },
            { name: '買入規費', value: buyFeeAmt },
            { name: '持有成本', value: holdAmt }
          ]
        }]
      },
      notes: [
        '賣出費用已依售價乘以費用率扣除，包含仲介費與房地合一稅。',
        '本試算未計入貸款利息的稅率差異，實際獲利以會計帳務為準。'
      ]
    };
  });

  /* ---------- 4. 翻修投資報酬率 ---------- */
  g.RECalcEngine.register('re_reno_roi', function (inputs) {
    var cost = inputs.renoCost, added = inputs.valueAdded, rentInc = inputs.rentIncrease;
    if (!(cost > 0)) throw new Error('請輸入大於 0 的翻修預算。');

    var sellROI = (added - cost) / cost;
    var bcRatio = added / cost;
    var annualRentInc = rentInc * 12;
    var payback = rentInc > 0 ? cost / rentInc : null;

    var cats = [], sCum = [], sCost = [];
    for (var y = 0; y <= 10; y++) {
      cats.push('第 ' + y + ' 年');
      sCum.push(annualRentInc * y);
      sCost.push(cost);
    }

    return {
      cards: [
        { label: '翻修總預算', value: cost, format: 'currency' },
        { label: '預估售價提升', value: added, format: 'currency' },
        { label: '售屋投報率', value: sellROI, format: 'percent', emphasis: true, sub: '（售價提升−成本）÷ 成本' },
        { label: '成本效益比', value: bcRatio, format: 'ratio' },
        payback != null
          ? { label: '租金回收月數', value: payback, format: 'month' }
          : { label: '租金回收月數', value: '未提高租金，無法估算', format: 'text' }
      ],
      chart: {
        type: 'line',
        title: '出租角度：每年租金累計增益 vs 翻修成本',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '累計租金增益', data: sCum, color: 'teal' },
          { name: '翻修成本', data: sCost, color: 'coral' }
        ]
      },
      notes: [
        '售屋投報率以翻修後預估售價提升扣除翻修成本計算，未計入仲介與稅費。',
        '租金回收月數＝翻修成本 ÷ 每月租金提升，未計入空置與租金調整風險。'
      ]
    };
  });

  /* ---------- 5. 法拍屋成本 ---------- */
  g.RECalcEngine.register('re_foreclosure', function (inputs) {
    var bid = inputs.bidPrice, mkt = inputs.marketPrice, reno = inputs.renovation,
        extra = inputs.extraCosts, fee = inputs.feeRate / 100;
    if (!(bid > 0)) throw new Error('請輸入大於 0 的拍定價格。');
    if (!(mkt > 0)) throw new Error('請輸入大於 0 的週邊市價。');

    var feeAmt = bid * fee;
    var totalCost = bid + reno + extra + feeAmt;
    var discount = 1 - bid / mkt;
    var sellFee = mkt * 0.05;
    var profit = mkt - sellFee - totalCost;
    var roi = profit / totalCost;

    return {
      cards: [
        { label: '市價折扣率', value: discount, format: 'percent', emphasis: true, sub: '1 − 拍定價 ÷ 市價' },
        { label: '拍定價格', value: bid, format: 'currency' },
        { label: '週邊市價', value: mkt, format: 'currency' },
        { label: '總取得成本', value: totalCost, format: 'currency' },
        { label: '立即轉售估計獲利', value: profit, format: 'currency' },
        { label: '投報率', value: roi, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '取得成本 vs 週邊市價',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: ['總取得成本', '週邊市價'],
        series: [{ name: '金額', data: [totalCost, mkt], color: 'primary' }]
      },
      notes: [
        '賣出費用以市價 5% 概估（仲介費＋房地合一稅），實際依交易條件計算。',
        '法拍屋需自行承擔點交風險、前手遺留稅費與查封狀態，投資前務必詳查。'
      ]
    };
  });

  /* ---------- 6. 停車位投資 ---------- */
  g.RECalcEngine.register('re_parking', function (inputs) {
    var price = inputs.price, rent = inputs.monthlyRent, vac = inputs.vacancyRate / 100,
        exp = inputs.expenses, app = inputs.appreciation / 100;
    if (!(price > 0)) throw new Error('請輸入大於 0 的停車位價格。');

    var annualGross = rent * 12 * (1 - vac);
    var annualNet = annualGross - exp * 12;
    var grossY = annualGross / price;
    var netY = annualNet / price;
    var payback = annualNet > 0 ? price / annualNet : null;

    var cats = [], sVal = [], sCum = [];
    for (var y = 0; y <= 10; y++) {
      cats.push('第 ' + y + ' 年');
      sVal.push(M.compoundFV(price, app, y, 1));
      sCum.push(annualNet * y);
    }

    return {
      cards: [
        { label: '淨投報率', value: netY, format: 'percent', emphasis: true, sub: '年淨收入 ÷ 價格' },
        { label: '停車位價格', value: price, format: 'currency' },
        { label: '年租金收入', value: annualGross, format: 'currency' },
        { label: '年淨收入', value: annualNet, format: 'currency' },
        { label: '毛投報率', value: grossY, format: 'percent' },
        payback != null ? { label: '回收年限', value: payback, format: 'year' } : { label: '回收年限', value: '年淨收入小於零', format: 'text' }
      ],
      chart: {
        type: 'stackedArea',
        title: '停車位價值與累計淨現金（10 年）',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '停車位價值', data: sVal, color: 'teal' },
          { name: '累計淨現金', data: sCum, color: 'gold' }
        ]
      },
      notes: [
        '空置率已反應在年租金收入，未另計租金調整風險。',
        '停車位流動性低、交易稅負與社區規則需自行確認。'
      ]
    };
  });

  /* ---------- 7. 店面租金 ---------- */
  g.RECalcEngine.register('re_shop_rent', function (inputs) {
    var price = inputs.shopPrice, rent = inputs.monthlyRent, ping = inputs.ping,
        vac = inputs.vacancyRate / 100, expRate = inputs.expensesRate / 100;
    if (!(price > 0)) throw new Error('請輸入大於 0 的店面總價。');
    if (!(ping > 0)) throw new Error('店面坪數需大於 0。');

    var perPing = rent / ping;
    var annualGross = rent * 12 * (1 - vac);
    var annualNet = annualGross * (1 - expRate);
    var grossY = annualGross / price;
    var netY = annualNet / price;
    var payback = annualNet > 0 ? price / annualNet : null;
    var vacLoss = rent * 12 - annualGross;
    var opCost = annualGross * expRate;

    return {
      cards: [
        { label: '淨投報率', value: netY, format: 'percent', emphasis: true },
        { label: '店面總價', value: price, format: 'currency' },
        { label: '月租金', value: rent, format: 'currency' },
        { label: '每坪月租金', value: perPing, format: 'currency' },
        { label: '年淨收入', value: annualNet, format: 'currency' },
        { label: '毛投報率', value: grossY, format: 'percent' },
        payback != null ? { label: '回收年限', value: payback, format: 'year' } : { label: '回收年限', value: '年淨收入小於零', format: 'text' }
      ],
      chart: {
        type: 'donut',
        title: '年有效租金分配',
        unit: '元',
        series: [{
          name: '租金分配',
          data: [
            { name: '淨收益', value: annualNet },
            { name: '營運成本', value: opCost },
            { name: '空置損失', value: vacLoss }
          ]
        }]
      },
      notes: [
        '店面空置風險通常高於住宅，實際出租率依商圈與租約而定。',
        '營運成本率已含房屋稅、地價稅、管理費與修繕分攤。'
      ]
    };
  });

  /* ---------- 8. 商用不動產收益 ---------- */
  g.RECalcEngine.register('re_commercial', function (inputs) {
    var price = inputs.price, noi = inputs.noi, loanRatio = inputs.loanRatio / 100,
        rate = inputs.loanRate / 100, years = inputs.years;
    if (!(price > 0)) throw new Error('請輸入大於 0 的不動產總價。');
    if (!(noi >= 0)) throw new Error('NOI 不可為負數。');
    if (!(loanRatio >= 0 && loanRatio < 1)) throw new Error('貸款成數不合理。');
    if (!(years > 0)) throw new Error('貸款年限需大於 0。');

    var cap = noi / price;
    var loan = price * loanRatio;
    var equity = price - loan;
    var n = M.yearToMonth(years);
    var rm = rate / 12;
    var pmtM = M.pmt(rm, n, loan);
    var ads = pmtM * 12;
    var dscr = ads > 0 ? noi / ads : null;
    var cf = noi - ads;
    var coc = equity > 0 ? cf / equity : 0;

    return {
      cards: [
        { label: '資本化率（Cap Rate）', value: cap, format: 'percent', emphasis: true, sub: 'NOI ÷ 總價' },
        { label: '不動產總價', value: price, format: 'currency' },
        { label: '年淨營運收入（NOI）', value: noi, format: 'currency' },
        { label: '自備款', value: equity, format: 'currency' },
        dscr != null ? { label: '還本付息保障倍數（DSCR）', value: dscr, format: 'ratio' } : { label: 'DSCR', value: '無貸款', format: 'text' },
        { label: '年稅前現金流', value: cf, format: 'currency' },
        { label: '現金投報率（CoC）', value: coc, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '關鍵比率比較',
        unit: '%',
        yName: '百分比（%）',
        categories: ['資本化率', '房貸利率', '現金投報率'],
        series: [{
          name: '比率',
          data: [cap * 100, rate * 100, coc * 100],
          color: 'primary'
        }]
      },
      notes: [
        'Cap Rate＝淨營運收入 ÷ 不動產價格，反應不動產本身的獲利能力。',
        'DSCR＝NOI ÷ 年還本付息，銀行通常要求至少 1.2 倍以上。'
      ]
    };
  });

  /* ---------- 9. 農地投資 ---------- */
  g.RECalcEngine.register('re_farm_land', function (inputs) {
    var price = inputs.landPrice, ping = inputs.areaPing, rent = inputs.annualRent,
        tax = inputs.annualTax, app = inputs.appreciation / 100, years = inputs.holdYears;
    if (!(price > 0)) throw new Error('請輸入大於 0 的農地總價。');
    if (!(ping > 0)) throw new Error('坪數需大於 0。');
    if (!(years > 0)) throw new Error('持有年數需大於 0。');

    var perPing = price / ping;
    var net = rent - tax;
    var y = net / price;
    var endValue = M.compoundFV(price, app, years, 1);
    var totalRent = net * years;
    var totalReturn = (endValue + totalRent - price) / price;

    var cats = [], sLand = [], sRent = [];
    for (var yr = 0; yr <= years; yr++) {
      cats.push('第 ' + yr + ' 年');
      sLand.push(M.compoundFV(price, app, yr, 1));
      sRent.push(net * yr);
    }

    return {
      cards: [
        { label: '農地總價', value: price, format: 'currency' },
        { label: '每坪單價', value: perPing, format: 'currency' },
        { label: '年淨租金收入', value: net, format: 'currency' },
        { label: '淨投報率', value: y, format: 'percent', emphasis: true },
        { label: years + ' 年後預估土地價值', value: endValue, format: 'currency' },
        { label: years + ' 年總報酬率（租金＋增值）', value: totalReturn, format: 'percent' }
      ],
      chart: {
        type: 'stackedArea',
        title: '土地價值與累計租金淨收益',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '土地價值', data: sLand, color: 'teal' },
          { name: '累計租金淨收益', data: sRent, color: 'gold' }
        ]
      },
      notes: [
        '農地使用須符合農業發展條例，不能任意變更使用或興建農舍。',
        '增值率為假設值，實際公告現值與市價會受區段與重劃影響。'
      ]
    };
  });

  /* ---------- 10. 容積率與建蔽率 ---------- */
  g.RECalcEngine.register('re_far_bcr', function (inputs) {
    var ping = inputs.landPing, far = inputs.far / 100, bcr = inputs.bcr / 100;
    if (!(ping > 0)) throw new Error('土地面積需大於 0。');
    if (!(far >= 0)) throw new Error('容積率不可為負數。');
    if (!(bcr >= 0 && bcr <= 1)) throw new Error('建蔽率需介於 0 至 100 之間。');

    var bldgArea = ping * bcr;
    var floorArea = ping * far;
    var floors = bcr > 0 ? Math.floor(far / bcr) : 0;

    return {
      cards: [
        { label: '土地面積', value: ping, format: 'ping' },
        { label: '容積率', value: far, format: 'percent' },
        { label: '建蔽率', value: bcr, format: 'percent' },
        { label: '最大建築面積', value: bldgArea, format: 'ping', emphasis: true, sub: '土地面積 × 建蔽率' },
        { label: '總樓地板面積', value: floorArea, format: 'ping', sub: '土地面積 × 容積率' },
        { label: '估計可建樓層', value: floors, format: 'number', sub: '容積率 ÷ 建蔽率' }
      ],
      chart: {
        type: 'bar',
        title: '最大建築面積 vs 總樓地板面積',
        unit: '坪',
        yName: '坪數',
        categories: ['最大建築面積', '總樓地板面積'],
        series: [{ name: '坪數', data: [bldgArea, floorArea], color: 'primary' }]
      },
      notes: [
        '實際可建面積還需扣除騎樓、退縮、停車空間與消防等法定要求。',
        '容積率與建蔽率依都市計畫土地使用分區而定，本試算未計入容積移轉與減項。'
      ]
    };
  });

  /* ---------- 11. 土地坪價 ---------- */
  g.RECalcEngine.register('re_land_price', function (inputs) {
    var total = inputs.totalPrice, ping = inputs.areaPing;
    if (!(total > 0)) throw new Error('請輸入大於 0 的土地總價。');
    if (!(ping > 0)) throw new Error('坪數需大於 0。');

    var perPing = total / ping;
    var m2Price = total / M.m2FromPing(ping);

    var cats = [], sTotal = [];
    for (var p = 10; p <= 100; p += 10) {
      cats.push(p + ' 坪');
      sTotal.push(perPing * p);
    }

    return {
      cards: [
        { label: '土地總價', value: total, format: 'currency' },
        { label: '每坪單價', value: perPing, format: 'currency', emphasis: true },
        { label: '每平方公尺單價', value: m2Price, format: 'currency' },
        { label: '土地坪數', value: ping, format: 'ping' }
      ],
      chart: {
        type: 'line',
        title: '每坪單價固定下，坪數與總價關係',
        unit: '元',
        scale: 10000,
        yName: '總價（萬元）',
        categories: cats,
        series: [{ name: '總價', data: sTotal, color: 'primary' }]
      },
      notes: [
        '1 坪＝3.305785 平方公尺，為台灣常見土地面積換算。',
        '實際地價受區段、臨路條件、使用分區與公告現值影響。'
      ]
    };
  });

  /* ---------- 12. 多套房現金流 ---------- */
  g.RECalcEngine.register('re_multiple_units', function (inputs) {
    var units = inputs.unitCount, pUnit = inputs.pricePerUnit, rUnit = inputs.rentPerUnit,
        vac = inputs.vacancyRate / 100, expUnit = inputs.expensesPerUnit,
        lr = inputs.loanRatio / 100, rate = inputs.loanRate / 100, years = inputs.years;
    if (!(units > 0)) throw new Error('戶數需大於 0。');
    if (!(pUnit > 0)) throw new Error('每戶總價需大於 0。');
    if (!(lr >= 0 && lr < 1)) throw new Error('貸款成數不合理。');
    if (!(years > 0)) throw new Error('貸款年限需大於 0。');

    var totalPrice = units * pUnit;
    var loan = totalPrice * lr;
    var equity = totalPrice - loan;
    var n = M.yearToMonth(years);
    var rm = rate / 12;
    var pmtM = M.pmt(rm, n, loan);
    var grossM = units * rUnit * (1 - vac);
    var expM = units * expUnit;
    var cfM = grossM - expM - pmtM;
    var annualCF = cfM * 12;
    var coc = equity > 0 ? annualCF / equity : 0;

    var rows = [
      ['房屋總價', pUnit, totalPrice],
      ['月租金（滿租）', rUnit, units * rUnit],
      ['月管銷費用', expUnit, expM],
      ['房貸月付金', pmtM / units, pmtM],
      ['月淨現金流', cfM / units, cfM]
    ];

    var cats = [], sCumCF = [], sCumPrin = [];
    for (var y = 0; y <= 10; y++) {
      cats.push('第 ' + y + ' 年');
      sCumCF.push(annualCF * y);
      var prin = 0;
      for (var m = (y - 1) * 12 + 1; m <= y * 12; m++) {
        if (m >= 1 && m <= n) prin += M.ppmt(rm, n, loan, m);
      }
      sCumPrin.push(prin);
    }

    return {
      cards: [
        { label: '每月淨現金流', value: cfM, format: 'currency', emphasis: true },
        { label: '總購置成本', value: totalPrice, format: 'currency' },
        { label: '自備頭期款', value: equity, format: 'currency' },
        { label: '每月房貸月付', value: pmtM, format: 'currency' },
        { label: '月租金收入（扣空置）', value: grossM, format: 'currency' },
        { label: '年現金流', value: annualCF, format: 'currency' },
        { label: '現金投報率（CoC）', value: coc, format: 'percent' }
      ],
      table: {
        caption: '單戶與全棟合計比較',
        cols: ['項目', '單戶', '全棟合計'],
        colFormats: ['text', 'currency', 'currency'],
        colWidths: [40, 30, 30],
        rows: rows
      },
      chart: {
        type: 'line',
        title: '10 年累計現金流與累計償還本金',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '累計淨現金流', data: sCumCF, color: 'teal' },
          { name: '累計償還本金', data: sCumPrin, color: 'gold' }
        ]
      },
      notes: [
        '空置率已反應在月租金收入，未計入不定期修繕與租金調整。',
        '現金投報率未計入房價增值與本金攤還帶來的權益累積。'
      ]
    };
  });

  /* ---------- 13. REITs 配息 ---------- */
  g.RECalcEngine.register('re_reit', function (inputs) {
    var price = inputs.price, div = inputs.dividendPerShare, shares = inputs.shares,
        years = inputs.years, g = inputs.growth / 100;
    if (!(price > 0)) throw new Error('請輸入大於 0 的每單位股價。');
    if (!(shares > 0)) throw new Error('持有單位數需大於 0。');
    if (!(years > 0)) throw new Error('持有年數需大於 0。');

    var invest = price * shares;
    var y1 = div * shares;
    var yld = div / price;
    var totalDiv = 0;
    var cats = [], sYr = [], sCum = [];
    for (var y = 1; y <= years; y++) {
      var d = y1 * Math.pow(1 + g, y - 1);
      totalDiv += d;
      cats.push('第 ' + y + ' 年');
      sYr.push(d);
      sCum.push(totalDiv);
    }
    var divYieldTotal = totalDiv / invest;

    return {
      cards: [
        { label: '現金殖利率', value: yld, format: 'percent', emphasis: true, sub: '每年配息 ÷ 股價' },
        { label: '投資總額', value: invest, format: 'currency' },
        { label: '首年配息金額', value: y1, format: 'currency' },
        { label: years + ' 年累計配息', value: totalDiv, format: 'currency' },
        { label: '累計配息占投資比', value: divYieldTotal, format: 'percent' }
      ],
      chart: {
        type: 'stackedArea',
        title: '每年配息與累計配息',
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '當年配息', data: sYr, color: 'gold' },
          { name: '累計配息', data: sCum, color: 'teal' }
        ]
      },
      notes: [
        '假設配息依固定年成長率逐年成長，且股價不變、配息再投入另計。',
        'REITs 股價會隨市場波動，總報酬需另計資本利得或損失。'
      ]
    };
  });

  /* ---------- 14. 不動產淨值 ---------- */
  g.RECalcEngine.register('re_net_equity', function (inputs) {
    var mv = inputs.marketValue, orig = inputs.originalPrice,
        loan = inputs.loanBalance, origLoan = inputs.originalLoan;
    if (!(mv > 0)) throw new Error('請輸入大於 0 的目前市價。');

    var net = mv - loan;
    var netRatio = net / mv;
    var ltv = loan / mv;
    var paperGain = mv - orig;
    var equityBuilt = net - (orig - origLoan);

    return {
      cards: [
        { label: '不動產淨值', value: net, format: 'currency', emphasis: true, sub: '市價 − 剩餘貸款' },
        { label: '目前市價', value: mv, format: 'currency' },
        { label: '剩餘貸款餘額', value: loan, format: 'currency' },
        { label: '淨值比率', value: netRatio, format: 'percent' },
        { label: '貸款成數（LTV）', value: ltv, format: 'percent' },
        { label: '較原購屋帳面增值', value: paperGain, format: 'currency' },
        { label: '累計權益增加', value: equityBuilt, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '目前資產組成',
        unit: '元',
        series: [{
          name: '資產組成',
          data: [
            { name: '不動產淨值', value: net },
            { name: '貸款餘額', value: loan }
          ]
        }]
      },
      notes: [
        '淨值＝市價 − 剩餘貸款餘額，未考慮交易成本與土地增值稅。',
        '實際可變現淨值需扣除仲介費、代書費與稅負。'
      ]
    };
  });

  /* ---------- 15. 出租管理收支 ---------- */
  g.RECalcEngine.register('re_rental_manage', function (inputs) {
    var price = inputs.price, rent = inputs.monthlyRent, vacDays = inputs.vacancyDays,
        mgmtRate = inputs.mgmtFeeRate / 100, repair = inputs.repairYearly,
        tax = inputs.taxYearly, ins = inputs.insuranceYearly;
    if (!(price > 0)) throw new Error('請輸入大於 0 的房屋總價。');
    if (!(vacDays >= 0 && vacDays <= 365)) throw new Error('空置天數需介於 0 至 365 之間。');

    var annualRentGross = rent * 12;
    var vacLoss = annualRentGross * vacDays / 365;
    var annualRent = annualRentGross - vacLoss;
    var mgmt = annualRentGross * mgmtRate;
    var totalExp = mgmt + repair + tax + ins;
    var net = annualRent - totalExp;
    var y = net / price;
    var monthlyAvg = net / 12;

    var rows = [
      ['有效租金收入', annualRent],
      ['管理費', mgmt],
      ['修繕準備', repair],
      ['房屋稅與地價稅', tax],
      ['保險費', ins],
      ['年總支出', totalExp],
      ['年淨收入', net]
    ];

    return {
      cards: [
        { label: '淨投報率', value: y, format: 'percent', emphasis: true },
        { label: '年有效租金收入', value: annualRent, format: 'currency' },
        { label: '年總支出', value: totalExp, format: 'currency' },
        { label: '年淨收入', value: net, format: 'currency' },
        { label: '月均淨收入', value: monthlyAvg, format: 'currency' }
      ],
      table: {
        caption: '年度收支明細',
        cols: ['項目', '年金額'],
        colFormats: ['text', 'currency'],
        colWidths: [50, 50],
        rows: rows
      },
      chart: {
        type: 'donut',
        title: '年支出與空置損失結構',
        unit: '元',
        series: [{
          name: '支出結構',
          data: [
            { name: '管理費', value: mgmt },
            { name: '修繕準備', value: repair },
            { name: '稅費', value: tax },
            { name: '保險費', value: ins },
            { name: '空置損失', value: vacLoss }
          ]
        }]
      },
      notes: [
        '空置損失＝月租 × 12 × 空置天數 ÷ 365，未計入重裝修期間。',
        '修繕準備為平均提列，實際大修年度支出可能高於此值。'
      ]
    };
  });

  /* ---------- 16. 房價租金比 ---------- */
  g.RECalcEngine.register('re_hold_rent_ratio', function (inputs) {
    var price = inputs.price, rent = inputs.monthlyRent;
    if (!(price > 0)) throw new Error('請輸入大於 0 的房屋總價。');
    if (!(rent > 0)) throw new Error('請輸入大於 0 的月租金。');

    var annual = rent * 12;
    var ratio = price / annual;
    var y = annual / price;

    var cats = [], sRatio = [];
    for (var r = 15000; r <= 35000; r += 5000) {
      cats.push((r / 1000) + ' 千');
      sRatio.push(price / (r * 12));
    }

    return {
      cards: [
        { label: '房價租金比（回本年限）', value: ratio, format: 'year', emphasis: true, sub: '總價 ÷ 年租金' },
        { label: '房屋總價', value: price, format: 'currency' },
        { label: '年租金收入', value: annual, format: 'currency' },
        { label: '租金報酬率', value: y, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '不同月租金下的回本年限',
        unit: '年',
        yName: '回本年限（年）',
        categories: cats,
        series: [{ name: '回本年限', data: sRatio, color: 'primary' }]
      },
      notes: [
        '房價租金比越低代表相對租金負擔越低、投報率越高。',
        '本試算未扣管理費、稅費、修繕與空置，實際淨投報率會更低。'
      ]
    };
  });

})(typeof window !== 'undefined' ? window : globalThis);

/*
 * RE-B 負責引擎 id 清單（16 支）：
 * re_leverage, re_leverage_return, re_flip_roi, re_reno_roi, re_foreclosure,
 * re_parking, re_shop_rent, re_commercial, re_farm_land, re_far_bcr,
 * re_land_price, re_multiple_units, re_reit, re_net_equity, re_rental_manage,
 * re_hold_rent_ratio
 */
