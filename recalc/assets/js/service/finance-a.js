/* ============================================================
   service/finance-a.js — 財務管理引擎（FIN-A，25 支）
   存款儲蓄 7＋預算記帳 3＋貸款負債 6＋保險規劃 4＋退休規劃 5
   數學一律呼叫 RECalcMath；金額以元、利率以小數（% 於此除以 100）
   ============================================================ */
(function (g) {
  'use strict';

  var M = g.RECalcMath;

  function needFinite(x, msg) {
    if (typeof x !== 'number' || !isFinite(x)) throw new Error(msg || '計算結果異常，請檢查輸入數值。');
    return x;
  }

  /* 本息均攤共用：回傳 cards／table／chart（車貸、信貸、學貸共用） */
  function amortize(loan, years, rate) {
    if (!(loan > 0)) throw new Error('請輸入大於 0 的貸款金額。');
    if (!(years > 0)) throw new Error('請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');

    var n = M.yearToMonth(years);
    var r = rate / 12;
    var pay = M.pmt(r, n, loan);
    needFinite(pay, '月付金額計算異常，請調整利率或年限。');
    var totalPay = pay * n;
    var totalInt = totalPay - loan;

    var rows = [];
    var show = Math.min(24, n);
    for (var i = 1; i <= show; i++) {
      rows.push([i, pay, M.ppmt(r, n, loan, i), M.ipmt(r, n, loan, i), M.balance(r, n, loan, i)]);
    }
    if (n > show) rows.push([n, pay, M.ppmt(r, n, loan, n), M.ipmt(r, n, loan, n), 0]);

    var cats = [], sP = [], sI = [];
    var ny = Math.ceil(n / 12);
    for (var y = 1; y <= ny; y++) {
      var y1 = (y - 1) * 12 + 1, y2 = Math.min(y * 12, n);
      var sp = 0, si = 0;
      for (var m = y1; m <= y2; m++) { sp += M.ppmt(r, n, loan, m); si += M.ipmt(r, n, loan, m); }
      cats.push('第 ' + y + ' 年'); sP.push(sp); sI.push(si);
    }

    return {
      cards: [
        { label: '每月月付金額', value: pay, format: 'currency', emphasis: true, sub: '本息均攤' },
        { label: '總繳利息', value: totalInt, format: 'currency' },
        { label: '總繳金額', value: totalPay, format: 'currency' },
        { label: '利息占總額比', value: totalInt / totalPay, format: 'percent' }
      ],
      table: {
        caption: '攤還明細（前 24 期與末期）',
        cols: ['期數', '每期還款', '償還本金', '償還利息', '剩餘本金'],
        colFormats: ['number', 'currency', 'currency', 'currency', 'currency'],
        colWidths: [12, 22, 22, 22, 22],
        rows: rows
      },
      chart: {
        type: 'stackedBar',
        title: '歷年本金與利息結構',
        unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '償還本金', data: sP, color: 'teal' },
          { name: '償還利息', data: sI, color: 'gold' }
        ]
      }
    };
  }

  /* ============ 存款儲蓄 ============ */

  /* 單利 */
  g.RECalcEngine.register('fin_simple_interest', function (inputs) {
    var p = inputs.principal, r = inputs.rate / 100, y = inputs.years;
    if (!(p > 0)) throw new Error('請輸入大於 0 的本金。');
    if (!(y > 0)) throw new Error('請輸入正確的存放期間。');
    var interest = M.simpleInterest(p, r, y);
    var final = M.simpleFV(p, r, y);

    var cats = [], data = [];
    for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); data.push(M.simpleFV(p, r, i)); }

    return {
      cards: [
        { label: '單利利息', value: interest, format: 'currency', emphasis: true },
        { label: '到期本利和', value: final, format: 'currency' },
        { label: '原始本金', value: p, format: 'currency' },
        { label: '年利率', value: r, format: 'percent' }
      ],
      chart: {
        type: 'line', title: '歷年本利和成長', unit: '元', scale: 10000, yName: '本利和（萬元）',
        categories: cats, series: [{ name: '本利和', data: data, color: 'teal' }]
      },
      notes: ['單利計息＝本金 × 年利率 × 年數，利息不滾入本金。', '實際銀行牌告利率與計息方式（月結／年結）以銀行規定為準。']
    };
  });

  /* 定期定額 */
  g.RECalcEngine.register('fin_regular_saving', function (inputs) {
    var m = inputs.monthly, rate = inputs.rate / 100, y = inputs.years;
    if (!(m > 0)) throw new Error('請輸入大於 0 的每月投入金額。');
    if (!(y > 0)) throw new Error('請輸入正確的投入年限。');
    var r = rate / 12, n = M.yearToMonth(y);
    var fv = M.fv(r, n, m, 0); needFinite(fv);
    var totalIn = m * n, gain = fv - totalIn;

    var cats = [], sIn = [], sGain = [];
    for (var i = 1; i <= y; i++) {
      var v = M.fv(r, i * 12, m, 0), contributed = m * 12 * i;
      cats.push('第 ' + i + ' 年'); sIn.push(contributed); sGain.push(v - contributed);
    }

    return {
      cards: [
        { label: '期末累積金額', value: fv, format: 'currency', emphasis: true },
        { label: '投入本金合計', value: totalIn, format: 'currency' },
        { label: '累積投資報酬', value: gain, format: 'currency' },
        { label: '資產成長倍數', value: fv / totalIn, format: 'ratio' }
      ],
      chart: {
        type: 'stackedArea', title: '投入本金與投資報酬累積', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '投入本金', data: sIn, color: 'sky' },
          { name: '投資報酬', data: sGain, color: 'teal' }
        ]
      },
      notes: ['假設每月月底投入、年報酬率固定且全數再投入。', '實際投資報酬具波動性，本試算為理想化情境。']
    };
  });

  /* 儲蓄目標 */
  g.RECalcEngine.register('fin_saving_goal', function (inputs) {
    var goal = inputs.goal, rate = inputs.rate / 100, y = inputs.years;
    if (!(goal > 0)) throw new Error('請輸入大於 0 的目標金額。');
    if (!(y > 0)) throw new Error('請輸入正確的達成年限。');
    var r = rate / 12, n = M.yearToMonth(y);
    var pmt = (r === 0) ? goal / n : goal * r / (Math.pow(1 + r, n) - 1);
    needFinite(pmt);
    var totalIn = pmt * n, interest = goal - totalIn;

    var cats = [], data = [];
    for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); data.push(M.fv(r, i * 12, pmt, 0)); }

    return {
      cards: [
        { label: '每月需儲蓄', value: pmt, format: 'currency', emphasis: true, sub: '於 ' + y + ' 年內達成' },
        { label: '目標金額', value: goal, format: 'currency' },
        { label: '總投入本金', value: totalIn, format: 'currency' },
        { label: '預計累計利息', value: interest, format: 'currency' }
      ],
      chart: {
        type: 'line', title: '每月定存下的餘額成長路徑', unit: '元', scale: 10000, yName: '累積金額（萬元）',
        categories: cats, series: [{ name: '累積金額', data: data, color: 'teal' }]
      },
      notes: ['以期末年金計算（每月月底存入），年報酬率固定。', '若中途利率或投入金額變動，實際達成時間會隨之改變。']
    };
  });

  /* 緊急備用金 */
  g.RECalcEngine.register('fin_emergency_fund', function (inputs) {
    var me = inputs.monthlyExpense, mo = inputs.months, ms = inputs.monthlySaving;
    if (!(me > 0)) throw new Error('請輸入大於 0 的每月必要支出。');
    if (!(mo > 0)) throw new Error('請輸入正確的預備月數。');
    if (!(ms > 0)) throw new Error('請輸入大於 0 的每月可提存金額。');
    var needed = me * mo;
    var buildMonths = needed / ms;
    var yrs = buildMonths / 12;

    var cats = [], data = [];
    var steps = Math.min(Math.ceil(buildMonths), 36);
    for (var i = 1; i <= steps; i++) {
      var label = (i % 12 === 0) ? ('第 ' + (i / 12) + ' 年') : ('第 ' + i + ' 個月');
      cats.push(label); data.push(Math.min(ms * i, needed));
    }

    return {
      cards: [
        { label: '建議緊急備用金', value: needed, format: 'currency', emphasis: true, sub: '約 ' + mo + ' 個月支出' },
        { label: '每月可提存', value: ms, format: 'currency' },
        { label: '預計存滿時間', value: Math.ceil(buildMonths), format: 'month' },
        { label: '折合所需年數', value: yrs, format: 'number2', sub: '年' }
      ],
      chart: {
        type: 'area', title: '備用金累積進度', unit: '元', scale: 10000, yName: '累積金額（萬元）',
        categories: cats, series: [{ name: '累積備用金', data: data, color: 'teal' }]
      },
      notes: ['一般建議備足 3～6 個月必要支出；收入波動大者可提高至 6～12 個月。', '本試算未計提存利息，備用金建議放置於高流動性、低風險工具。']
    };
  });

  /* 定存三模式 */
  g.RECalcEngine.register('fin_deposit', function (inputs) {
    var mode = inputs.mode;
    var amount = inputs.amount, rate = inputs.rate / 100, y = inputs.years;
    if (!(amount > 0)) throw new Error('請輸入大於 0 的金額。');
    if (!(y > 0)) throw new Error('請輸入正確的存續期間。');

    var cats = [], data = [], cards = [], modeName = '';

    if (mode === 'zero') {
      modeName = '零存整付';
      var r = rate / 12, n = M.yearToMonth(y);
      var fv = M.fv(r, n, amount, 0); needFinite(fv);
      var totalIn = amount * n;
      cards = [
        { label: '到期一次領回', value: fv, format: 'currency', emphasis: true },
        { label: '每月存入', value: amount, format: 'currency' },
        { label: '存入本金合計', value: totalIn, format: 'currency' },
        { label: '合計利息', value: fv - totalIn, format: 'currency' }
      ];
      for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); data.push(M.fv(r, i * 12, amount, 0)); }
    } else if (mode === 'interest') {
      modeName = '存本取息';
      var monthlyInt = amount * rate / 12;
      var totalInt = monthlyInt * M.yearToMonth(y);
      cards = [
        { label: '每月可領利息', value: monthlyInt, format: 'currency', emphasis: true },
        { label: '利息合計', value: totalInt, format: 'currency' },
        { label: '到期領回本金', value: amount, format: 'currency' },
        { label: '本金', value: amount, format: 'currency' }
      ];
      for (var j = 1; j <= y; j++) { cats.push('第 ' + j + ' 年'); data.push(monthlyInt * 12 * j); }
    } else {
      modeName = '整存整付';
      var final = M.compoundFV(amount, rate, y, 1);
      cards = [
        { label: '到期本利和', value: final, format: 'currency', emphasis: true },
        { label: '本金', value: amount, format: 'currency' },
        { label: '合計利息', value: final - amount, format: 'currency' },
        { label: '年利率', value: rate, format: 'percent' }
      ];
      for (var k = 1; k <= y; k++) { cats.push('第 ' + k + ' 年'); data.push(M.compoundFV(amount, rate, k, 1)); }
    }

    return {
      cards: cards,
      chart: {
        type: 'line', title: modeName + '金額變化', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats, series: [{ name: modeName, data: data, color: 'teal' }]
      },
      notes: ['整存整付以每年複利一次估算；零存整付為每月月底存入、期末一次領回。', '存本取息按月領息、本金於到期一次返還。實際以銀行牌告及約定為準。']
    };
  });

  /* 通膨與購買力 */
  g.RECalcEngine.register('fin_inflation', function (inputs) {
    var amt = inputs.amount, infl = inputs.inflation / 100, y = inputs.years;
    if (!(amt > 0)) throw new Error('請輸入大於 0 的金額。');
    if (!(y > 0)) throw new Error('請輸入正確的經過年數。');
    var futurePrice = amt * Math.pow(1 + infl, y);
    var purchasing = M.inflationAdjusted(amt, infl, y);
    var loss = 1 - purchasing / amt;

    var cats = [], buy = [];
    for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); buy.push(M.inflationAdjusted(amt, infl, i)); }

    return {
      cards: [
        { label: y + ' 年後等值物價', value: futurePrice, format: 'currency', emphasis: true, sub: '今日 ' + amt + ' 元的購買力' },
        { label: '今日金額的實質購買力', value: purchasing, format: 'currency' },
        { label: '購買力縮水比例', value: loss, format: 'percent' },
        { label: '物價膨脹倍數', value: futurePrice / amt, format: 'ratio' }
      ],
      chart: {
        type: 'area', title: '實質購買力隨時間衰減', unit: '元', scale: 10000, yName: '今日幣值金額（萬元）',
        categories: cats, series: [{ name: '實質購買力', data: buy, color: 'gold' }]
      },
      notes: ['以固定通膨率連續複利估算，未來實際通膨率會波動。', '購買力＝今日名目金額依通膨率折回今日幣值。']
    };
  });

  /* 複利 vs 單利 */
  g.RECalcEngine.register('fin_compound_vs_simple', function (inputs) {
    var p = inputs.principal, rate = inputs.rate / 100, y = inputs.years;
    if (!(p > 0)) throw new Error('請輸入大於 0 的本金。');
    if (!(y > 0)) throw new Error('請輸入正確的投資年限。');
    var cf = M.compoundFV(p, rate, y, 12);
    var sf = M.simpleFV(p, rate, y);

    var cats = [], sc = [], ss = [];
    for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); sc.push(M.compoundFV(p, rate, i, 12)); ss.push(M.simpleFV(p, rate, i)); }

    return {
      cards: [
        { label: '複利終值', value: cf, format: 'currency', emphasis: true },
        { label: '單利終值', value: sf, format: 'currency' },
        { label: '複利多出的金額', value: cf - sf, format: 'currency' },
        { label: '複利成長倍數', value: cf / p, format: 'ratio' }
      ],
      chart: {
        type: 'line', title: '複利 vs 單利成長曲線', unit: '元', scale: 10000, yName: '本利和（萬元）',
        categories: cats,
        series: [
          { name: '複利', data: sc, color: 'teal' },
          { name: '單利', data: ss, color: 'gold' }
        ]
      },
      notes: ['複利以每月複利一次估算，利息全數滾入本金。', '時間越長，複利與單利的差距越明顯。']
    };
  });

  /* ============ 預算記帳 ============ */

  /* 預算規劃 */
  g.RECalcEngine.register('fin_budget', function (inputs) {
    var inc = inputs.income, fixed = inputs.fixed || 0, living = inputs.living || 0, fun = inputs.fun || 0;
    if (!(inc > 0)) throw new Error('請輸入大於 0 的每月收入。');
    var totalExp = fixed + living + fun;
    var surplus = inc - totalExp;
    var surplusRate = surplus / inc;

    return {
      cards: [
        { label: '每月收入', value: inc, format: 'currency' },
        { label: '每月總支出', value: totalExp, format: 'currency' },
        { label: '每月結餘', value: surplus, format: 'currency', emphasis: true, sub: '結餘率 ' + (surplusRate * 100).toFixed(1) + '%' },
        { label: '結餘率', value: surplusRate, format: 'percent' }
      ],
      chart: {
        type: 'donut', title: '每月收支分配', unit: '元',
        categories: ['固定支出', '生活費', '休閒娛樂', '結餘'],
        series: [{
          name: '分配',
          data: [
            { name: '固定支出', value: Math.max(0, fixed) },
            { name: '生活費', value: Math.max(0, living) },
            { name: '休閒娛樂', value: Math.max(0, fun) },
            { name: '結餘', value: Math.max(0, surplus) }
          ]
        }]
      },
      notes: ['結餘為負數代表入不敷出，建議檢視支出結構。', '健康理財通常建議結餘率維持在 20% 以上。']
    };
  });

  /* 50/30/20 */
  g.RECalcEngine.register('fin_accounting', function (inputs) {
    var inc = inputs.income;
    var need = inputs.needPct, want = inputs.wantPct, save = inputs.savePct;
    if (!(inc > 0)) throw new Error('請輸入大於 0 的每月收入。');
    var total = need + want + save;
    if (!(total > 0)) throw new Error('三項比例合計需大於 0。');
    /* 正規化為 100% */
    var needV = inc * need / total, wantV = inc * want / total, saveV = inc * save / total;

    return {
      cards: [
        { label: '必要支出', value: needV, format: 'currency', emphasis: true, sub: (need / total * 100).toFixed(0) + '%（食衣住行、帳單）' },
        { label: '想要花費', value: wantV, format: 'currency', sub: (want / total * 100).toFixed(0) + '%（休閒、升級）' },
        { label: '儲蓄投資', value: saveV, format: 'currency', sub: (save / total * 100).toFixed(0) + '%' },
        { label: '儲蓄率', value: save / total, format: 'percent' }
      ],
      chart: {
        type: 'pie', title: '50／30／20 記帳分配', unit: '元',
        categories: ['必要支出', '想要花費', '儲蓄投資'],
        series: [{
          name: '分配',
          data: [
            { name: '必要支出', value: needV },
            { name: '想要花費', value: wantV },
            { name: '儲蓄投資', value: saveV }
          ]
        }]
      },
      notes: ['50/30/20 法則為常見現金流分配參考：50% 必要、30% 想要、20% 儲蓄投資。', '三項比例若未等於 100%，系統會依比例自動正規化。']
    };
  });

  /* 支出比率分析 */
  g.RECalcEngine.register('fin_expense_ratio', function (inputs) {
    var inc = inputs.income, housing = inputs.housing || 0, living = inputs.living || 0, debt = inputs.debtPay || 0;
    if (!(inc > 0)) throw new Error('請輸入大於 0 的每月收入。');
    var totalExp = housing + living + debt;
    var surplus = inc - totalExp;
    var hRatio = housing / inc, eRatio = totalExp / inc, sRate = surplus / inc;

    return {
      cards: [
        { label: '房貸房租占收入比', value: hRatio, format: 'percent', emphasis: true, sub: '建議 < 30%～40%' },
        { label: '總支出率', value: eRatio, format: 'percent' },
        { label: '儲蓄率', value: sRate, format: 'percent' },
        { label: '每月結餘', value: surplus, format: 'currency' }
      ],
      chart: {
        type: 'bar', title: '各項目占月收入比例', unit: '%', scale: 1, yName: '占收入比例',
        categories: ['房貸房租', '生活費', '其他負債', '結餘'],
        series: [{
          name: '占收入比',
          data: [hRatio, living / inc, debt / inc, sRate],
          color: 'teal'
        }]
      },
      notes: ['房貸房租支出建議控制在月收入的 30%～40% 以內。', '儲蓄率為負代表每月透支，需優先調整支出。']
    };
  });

  /* ============ 貸款負債 ============ */

  g.RECalcEngine.register('fin_car_loan', function (inputs) {
    return amortize(inputs.loan, inputs.years, inputs.rate / 100);
  });
  g.RECalcEngine.register('fin_personal_loan', function (inputs) {
    return amortize(inputs.loan, inputs.years, inputs.rate / 100);
  });
  g.RECalcEngine.register('fin_student_loan', function (inputs) {
    return amortize(inputs.loan, inputs.years, inputs.rate / 100);
  });

  /* 卡債循環利息 */
  g.RECalcEngine.register('fin_credit_card', function (inputs) {
    var bal = inputs.balance, rate = inputs.rate / 100, pay = inputs.pay;
    if (!(bal > 0)) throw new Error('請輸入大於 0 的卡債餘額。');
    if (!(pay > 0)) throw new Error('請輸入大於 0 的每月還款金額。');
    var r = rate / 12;
    var monthInt = bal * r;

    /* 還清期數封閉式：k = log(pay/(pay-r*bal))/log(1+r) */
    var principalPart = pay - bal * r;
    if (principalPart <= 0) {
      throw new Error('每月還款不足以支付循環利息，卡債永遠無法還清，請提高每月還款金額。');
    }
    var n = Math.log(pay / principalPart) / Math.log(1 + r);
    var months = Math.ceil(n);
    /* 實際總繳：逐月模擬 */
    var b = bal, totalPaid = 0, cats = [], series = [];
    var maxStep = Math.min(months, 60);
    for (var i = 1; i <= maxStep; i++) {
      var interest = b * r;
      var principal = pay - interest;
      if (principal >= b) { totalPaid += b + interest; b = 0; cats.push('第 ' + i + ' 月'); series.push(0); break; }
      b -= principal; totalPaid += pay;
      cats.push('第 ' + i + ' 月'); series.push(Math.max(0, b));
    }
    if (b > 0) totalPaid += b;
    var totalInt = totalPaid - bal;

    return {
      cards: [
        { label: '當月循環利息', value: monthInt, format: 'currency', emphasis: true, sub: '餘額 ' + bal + ' 元 × 月利率' },
        { label: '預計還清月數', value: months, format: 'month' },
        { label: '總繳利息', value: totalInt, format: 'currency' },
        { label: '總繳金額', value: bal + totalInt, format: 'currency' }
      ],
      chart: {
        type: 'line', title: '卡債餘額遞減（前 ' + cats.length + ' 期）', unit: '元', scale: 1000, yName: '餘額（千元）',
        categories: cats, series: [{ name: '卡債餘額', data: series, color: 'coral' }]
      },
      notes: ['循環利息以每月月底結算，每月還款先抵扣當期利息再還本金。', '卡債循環利率通常偏高，建議全額繳清或改辦低利信貸降低利息。']
    };
  });

  /* 分期付款 */
  g.RECalcEngine.register('fin_installment', function (inputs) {
    var amt = inputs.amount, periods = inputs.periods, feePct = inputs.feePct / 100;
    if (!(amt > 0)) throw new Error('請輸入大於 0 的商品原價。');
    if (!(periods > 0)) throw new Error('請輸入正確的分期期數。');
    var fee = amt * feePct;
    var total = amt + fee;
    var monthly = total / periods;

    return {
      cards: [
        { label: '每期應繳', value: monthly, format: 'currency', emphasis: true, sub: periods + ' 期' },
        { label: '分期手續費', value: fee, format: 'currency' },
        { label: '分期總金額', value: total, format: 'currency' },
        { label: '手續費占原價比', value: feePct, format: 'percent' }
      ],
      chart: {
        type: 'bar', title: '一次付清 vs 分期總負擔', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: ['一次付清', '分期總額'],
        series: [{ name: '總金額', data: [amt, total], color: 'gold' }]
      },
      notes: ['手續費為總費率估算，實際分期利率／手續費率依銀行或分期廠商公告為準。', '分期「零利率」仍可能收手續費，結帳前務必確認總金額。']
    };
  });

  /* 負債比率 */
  g.RECalcEngine.register('fin_debt_ratio', function (inputs) {
    var inc = inputs.income, mDebt = inputs.monthlyDebt || 0,
        assets = inputs.assets || 0, liab = inputs.liabilities || 0;
    if (!(inc > 0)) throw new Error('請輸入大於 0 的每月收入。');
    var dti = mDebt / inc;
    var atr = assets > 0 ? liab / assets : 0;
    var netWorth = assets - liab;

    return {
      cards: [
        { label: '負債收入比 DTI', value: dti, format: 'percent', emphasis: true, sub: '建議 < 40%' },
        { label: '資產負債比', value: atr, format: 'percent' },
        { label: '每月負債繳款', value: mDebt, format: 'currency' },
        { label: '淨資產', value: netWorth, format: 'currency' }
      ],
      chart: {
        type: 'bar', title: '負債相關比率', unit: '%', scale: 1, yName: '比率',
        categories: ['負債收入比 DTI', '資產負債比'],
        series: [{ name: '比率', data: [dti, atr], color: 'coral' }]
      },
      notes: ['DTI＝每月負債繳款 ÷ 每月收入，銀行常用來評估還款能力。', '資產負債比為總負債 ÷ 總資產，數字越低代表財務越穩健。']
    };
  });

  /* ============ 保險規劃（簡化模型） ============ */

  /* 定期壽險 */
  g.RECalcEngine.register('fin_ins_term', function (inputs) {
    var age = inputs.age, sa = inputs.sumAssured, y = inputs.years;
    if (!(sa > 0)) throw new Error('請輸入大於 0 的保額。');
    /* 每千元年保費（新台幣）分級，簡化模型 */
    var ratePerK = age < 30 ? 0.6 : age < 40 ? 0.9 : age < 50 ? 1.6 : 3.0;
    var annual = sa / 1000 * ratePerK;
    var monthly = annual / 12;
    var total = annual * y;

    return {
      cards: [
        { label: '估計年繳保費', value: annual, format: 'currency', emphasis: true, sub: '年齡 ' + age + ' 歲級距' },
        { label: '折合月繳保費', value: monthly, format: 'currency' },
        { label: '保障年期', value: y, format: 'year' },
        { label: '保障期內累計保費', value: total, format: 'currency' }
      ],
      chart: {
        type: 'bar', title: '各年齡級距每萬元保額年保費參考', unit: '元', scale: 1, yName: '年保費（元／萬元保額）',
        categories: ['<30 歲', '30～39 歲', '40～49 歲', '50 歲以上'],
        series: [{ name: '每萬元保額年保費', data: [ratePerK * 10, ratePerK < 0.9 ? 9 : 9, 16, 30], color: 'primary' }]
      },
      notes: ['此為簡化估算模型，未考慮性別、職業等級、健康告知與體況加費。', '實際保費請以保險公司正式報價為準。']
    };
  });

  /* 終身壽險 */
  g.RECalcEngine.register('fin_ins_whole', function (inputs) {
    var age = inputs.age, sa = inputs.sumAssured, payY = inputs.payYears;
    if (!(sa > 0)) throw new Error('請輸入大於 0 的保額。');
    /* 簡化：每千元保費約 2.5 + 年齡 × 0.08 */
    var ratePerK = 2.5 + age * 0.08;
    var annual = sa / 1000 * ratePerK;
    var monthly = annual / 12;
    var total = annual * payY;

    return {
      cards: [
        { label: '估計年繳保費', value: annual, format: 'currency', emphasis: true },
        { label: '折合月繳保費', value: monthly, format: 'currency' },
        { label: '累計已繳保費', value: total, format: 'currency', sub: payY + ' 年繳費' },
        { label: '保障保額', value: sa, format: 'currency' }
      ],
      chart: {
        type: 'stackedArea', title: '累計保費繳納進度', unit: '元', scale: 10000, yName: '累計保費（萬元）',
        categories: (function () {
          var c = []; for (var i = 1; i <= payY; i++) c.push('第 ' + i + ' 年'); return c;
        })(),
        series: [{
          name: '累計已繳保費',
          data: (function () {
            var d = []; for (var i = 1; i <= payY; i++) d.push(annual * i); return d;
          })(),
          color: 'gold'
        }]
      },
      notes: ['終身壽險保費含保障與儲蓄成分，本試算為簡化估算。', '實際現金價值、紅利與保費請以保單條款為準。']
    };
  });

  /* 醫療險保障 */
  g.RECalcEngine.register('fin_ins_medical', function (inputs) {
    var mm = inputs.monthlyMedical || 0, inc = inputs.income || 0;
    var annualMed = mm * 12;
    var medCover = annualMed * 3;
    var ciCover = inc * 5;

    return {
      cards: [
        { label: '年度醫療支出估算', value: annualMed, format: 'currency', emphasis: true },
        { label: '建議實支實付醫療保額', value: medCover, format: 'currency', sub: '約 3 年醫療準備' },
        { label: '建議重大傷病保障', value: ciCover, format: 'currency', sub: '約 5 倍年收入' },
        { label: '醫療支出占年收入比', value: inc > 0 ? annualMed / inc : 0, format: 'percent' }
      ],
      chart: {
        type: 'donut', title: '醫療保障建議配置', unit: '元',
        categories: ['實支實付醫療', '重大傷病保障'],
        series: [{
          name: '保額建議',
          data: [
            { name: '實支實付醫療', value: medCover },
            { name: '重大傷病保障', value: ciCover }
          ]
        }]
      },
      notes: ['實支實付保額建議約為 3 年個人醫療支出。', '重大傷病保障建議約為 3～5 倍年收入，實際仍需依家庭結構調整。']
    };
  });

  /* 儲蓄險 */
  g.RECalcEngine.register('fin_ins_saving', function (inputs) {
    var mp = inputs.monthlyPremium, y = inputs.years, rate = inputs.rate / 100;
    if (!(mp > 0)) throw new Error('請輸入大於 0 的每月保費。');
    if (!(y > 0)) throw new Error('請輸入正確的繳費年期。');
    var r = rate / 12, n = M.yearToMonth(y);
    var fv = M.fv(r, n, mp, 0); needFinite(fv);
    var total = mp * n;
    var gain = fv - total;

    var cats = [], sIn = [], sGain = [];
    for (var i = 1; i <= y; i++) {
      var v = M.fv(r, i * 12, mp, 0), contributed = mp * 12 * i;
      cats.push('第 ' + i + ' 年'); sIn.push(contributed); sGain.push(v - contributed);
    }

    return {
      cards: [
        { label: '估計滿期金', value: fv, format: 'currency', emphasis: true },
        { label: '總繳保費', value: total, format: 'currency' },
        { label: '累計儲蓄收益', value: gain, format: 'currency' },
        { label: '內部累積報酬率', value: total > 0 ? gain / total : 0, format: 'percent' }
      ],
      chart: {
        type: 'stackedArea', title: '已繳保費與累積價值', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '已繳保費', data: sIn, color: 'sky' },
          { name: '累積價值增益', data: sGain, color: 'teal' }
        ]
      },
      notes: ['儲蓄險滿期金可能含保證與非保證部分，本試算以固定預定利率估算。', '提早解約可能損及本金，實際請以保單條款為準。']
    };
  });

  /* ============ 退休規劃 ============ */

  /* 退休規劃 */
  g.RECalcEngine.register('fin_retire', function (inputs) {
    var cAge = inputs.currentAge, rAge = inputs.retireAge;
    var exp = inputs.annualExpense, infl = inputs.inflation / 100, ret = inputs.investReturn / 100;
    var curSave = inputs.currentSaving || 0;
    var yrs = rAge - cAge;
    if (!(yrs > 0)) throw new Error('退休年齡需大於目前年齡。');
    if (!(exp > 0)) throw new Error('請輸入大於 0 的退休後年支出。');

    /* 退休時的當時幣值年支出 */
    var expAtRetire = exp * Math.pow(1 + infl, yrs);
    /* 實質折現率：(1+nominal)/(1+infl)-1 */
    var realR = (1 + ret) / (1 + infl) - 1;
    var retireYears = 30;
    var nestEgg;
    if (realR === 0) nestEgg = expAtRetire * retireYears;
    else nestEgg = expAtRetire * (1 - Math.pow(1 + realR, -retireYears)) / realR;

    var curFV = M.compoundFV(curSave, ret, yrs, 12);
    var gap = Math.max(0, nestEgg - curFV);

    var r = ret / 12, n = M.yearToMonth(yrs);
    var needMonthly;
    if (r === 0) needMonthly = gap / n;
    else needMonthly = gap * r / (Math.pow(1 + r, n) - 1);
    needFinite(needMonthly);

    var cats = [], sCur = [], sNeed = [];
    for (var i = 1; i <= yrs; i++) {
      cats.push('第 ' + i + ' 年');
      sCur.push(M.compoundFV(curSave, ret, i, 12) + M.fv(r, i * 12, needMonthly, 0));
      sNeed.push(nestEgg);
    }

    return {
      cards: [
        { label: '退休時所需本金', value: nestEgg, format: 'currency', emphasis: true, sub: '當時幣值' },
        { label: '現有準備退休時價值', value: curFV, format: 'currency' },
        { label: '資金缺口', value: gap, format: 'currency' },
        { label: '每月需提撥', value: needMonthly, format: 'currency' }
      ],
      chart: {
        type: 'line', title: '累積資產 vs 退休目標', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '累積資產', data: sCur, color: 'teal' },
          { name: '退休目標', data: sNeed, color: 'gold' }
        ]
      },
      notes: ['退休後生活年數假設為 30 年，未列入社會保險或房產變現。', '採用實質折現法：以通膨調整後的真實報酬率折現退休支出。實際請依個人情況調整。']
    };
  });

  /* 年金現值 */
  g.RECalcEngine.register('fin_pension', function (inputs) {
    var ap = inputs.annualPension, y = inputs.years, rate = inputs.rate / 100;
    if (!(ap > 0)) throw new Error('請輸入大於 0 的每年年金給付。');
    if (!(y > 0)) throw new Error('請輸入正確的領取年數。');
    var pv;
    if (rate === 0) pv = ap * y;
    else pv = ap * (1 - Math.pow(1 + rate, -y)) / rate;
    needFinite(pv);
    var monthly = pv / y / 12;

    var cats = [], cum = [];
    for (var i = 1; i <= y; i++) { cats.push('第 ' + i + ' 年'); cum.push(ap * i); }

    return {
      cards: [
        { label: '年金現值總額', value: pv, format: 'currency', emphasis: true, sub: '折現率 ' + (rate * 100).toFixed(1) + '%' },
        { label: '每年給付', value: ap, format: 'currency' },
        { label: '折合每月金額', value: monthly, format: 'currency' },
        { label: '給付總額（未折現）', value: ap * y, format: 'currency' }
      ],
      chart: {
        type: 'area', title: '歷年累計給付（名目）', unit: '元', scale: 10000, yName: '累計金額（萬元）',
        categories: cats, series: [{ name: '累計給付', data: cum, color: 'teal' }]
      },
      notes: ['年金現值為未來給付依折現率折回今日價值。', '折現率越高，未來年金的現值越低。']
    };
  });

  /* 勞退新制 */
  g.RECalcEngine.register('fin_labor_pension', function (inputs) {
    var sal = inputs.monthlySalary, y = inputs.years, rate = inputs.rate / 100;
    if (!(sal > 0)) throw new Error('請輸入大於 0 的月投保薪資。');
    if (!(y > 0)) throw new Error('請輸入正確的提繳年資。');
    var monthly = sal * 0.06;
    var r = rate / 12, n = M.yearToMonth(y);
    var fv = M.fv(r, n, monthly, 0); needFinite(fv);
    var total = monthly * n, gain = fv - total;

    var cats = [], sIn = [], sGain = [];
    for (var i = 1; i <= y; i++) {
      var v = M.fv(r, i * 12, monthly, 0), contributed = monthly * 12 * i;
      cats.push('第 ' + i + ' 年'); sIn.push(contributed); sGain.push(v - contributed);
    }

    return {
      cards: [
        { label: '退休時勞退金試估', value: fv, format: 'currency', emphasis: true },
        { label: '雇主每月提繳', value: monthly, format: 'currency', sub: '薪資 6%' },
        { label: '總提繳金額', value: total, format: 'currency' },
        { label: '運用累計收益', value: gain, format: 'currency' }
      ],
      chart: {
        type: 'stackedArea', title: '提繳本金與運用收益', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '提繳本金', data: sIn, color: 'sky' },
          { name: '運用收益', data: sGain, color: 'teal' }
        ]
      },
      notes: ['勞退新制雇主每月提繳薪資 6% 至勞保局個人專戶。', '本試算採固定報酬率簡化模型，實際以勞保局年度決算及核定給付為準。']
    };
  });

  /* FIRE */
  g.RECalcEngine.register('fin_fire', function (inputs) {
    var exp = inputs.annualExpense, wr = inputs.withdrawRate / 100;
    if (!(exp > 0)) throw new Error('請輸入大於 0 的年度總支出。');
    if (!(wr > 0)) throw new Error('請輸入大於 0 的安全提領率。');
    var target = exp / wr;
    var multiple = target / exp;

    return {
      cards: [
        { label: '財務自由目標金額', value: target, format: 'currency', emphasis: true },
        { label: '年度支出基準', value: exp, format: 'currency' },
        { label: '提領倍數', value: multiple, format: 'ratio', sub: '1 ÷ 提領率' },
        { label: '對應每月被動收入需求', value: exp / 12, format: 'currency' }
      ],
      chart: {
        type: 'bar', title: '不同提領率下的目標金額', unit: '萬元', scale: 10000, yName: '目標資產（萬元）',
        categories: ['3%', '3.5%', '4%', '4.5%', '5%'],
        series: [{
          name: '目標資產',
          data: [exp / 0.03, exp / 0.035, exp / 0.04, exp / 0.045, exp / 0.05],
          color: 'gold'
        }]
      },
      notes: ['4% 法則（Trinity Study）為常見 FIRE 估算：目標資產＝年支出 ÷ 提領率。', '提領率越低目標越高但越安全；實際仍需考慮通膨與投資波動。']
    };
  });

  /* 被動收入 */
  g.RECalcEngine.register('fin_passive_income', function (inputs) {
    var assets = inputs.assets || 0, yld = inputs.yield / 100, exp = inputs.annualExpense || 0;
    var annual = assets * yld;
    var monthly = annual / 12;
    var cover = exp > 0 ? annual / exp : 0;

    return {
      cards: [
        { label: '年被動收入', value: annual, format: 'currency', emphasis: true },
        { label: '月被動收入', value: monthly, format: 'currency' },
        { label: '覆蓋年度支出比', value: cover, format: 'percent' },
        { label: '距年支出缺口', value: Math.max(0, exp - annual), format: 'currency' }
      ],
      chart: {
        type: 'bar', title: '被動收入 vs 年度生活支出', unit: '元', scale: 10000, yName: '金額（萬元）',
        categories: ['年被動收入', '年生活支出'],
        series: [{ name: '金額', data: [annual, exp], color: 'teal' }]
      },
      notes: ['被動收入＝可收益資產 × 預期年殖利率。', '殖利率來源包含股息、利息、房租等，實際收益會隨市場波動。']
    };
  });

})(typeof window !== 'undefined' ? window : globalThis);
