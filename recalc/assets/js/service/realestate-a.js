/* ============================================================
   service/realestate-a.js — RE-A 代理引擎（26 支不動產試算）
   涵蓋：房貸試算 9 + 購屋規劃 8 + 坪數建物 9
   數學一律呼叫 RECalcMath；利率輸入為 %，引擎內除以 100
   ============================================================ */
(function (g) {
  'use strict';

  var M = g.RECalcMath;

  function need(v, msg) {
    if (!(v > 0) || !isFinite(v)) throw new Error(msg);
  }

  /* ================= 房貸試算 ================= */

  /* 1. 本金平均攤還 */
  g.RECalcEngine.register('re_mortgage_principal', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rate = inputs.rate / 100;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');

    var n = M.yearToMonth(years), r = rate / 12;
    var pP = loan / n;
    var firstPay = pP + loan * r;
    var lastPay = pP + pP * r;
    var totalInt = r * loan * (n + 1) / 2;

    var rows = [];
    var show = Math.min(24, n);
    for (var i = 1; i <= show; i++) {
      var balBefore = loan - (i - 1) * pP;
      var int = balBefore * r;
      rows.push([i, pP + int, pP, int, loan - i * pP]);
    }
    if (n > show) {
      rows.push([n, lastPay, pP, pP * r, 0]);
    }

    var cats = [], sP = [], sI = [];
    var ny = Math.ceil(n / 12);
    for (var y = 1; y <= ny; y++) {
      var m1 = (y - 1) * 12 + 1, m2 = Math.min(y * 12, n), sp = 0, si = 0;
      for (var m = m1; m <= m2; m++) {
        sp += pP;
        si += (loan - (m - 1) * pP) * r;
      }
      cats.push('第 ' + y + ' 年'); sP.push(sp); sI.push(si);
    }

    return {
      cards: [
        { label: '首月月付金額', value: firstPay, format: 'currency', emphasis: true, sub: '本金平均攤還' },
        { label: '末月月付金額', value: lastPay, format: 'currency' },
        { label: '每月償還本金', value: pP, format: 'currency' },
        { label: '總繳利息', value: totalInt, format: 'currency' },
        { label: '總繳金額', value: loan + totalInt, format: 'currency' }
      ],
      table: {
        caption: '還款明細（前 24 期與末期）',
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
      },
      notes: [
        '本金平均攤還每月償還固定本金，利息隨剩餘本金逐月遞減。',
        '假設利率固定、每月月底還款；實際金額以銀行報價為準。'
      ]
    };
  });

  /* 2. 寬限期 */
  g.RECalcEngine.register('re_mortgage_grace', function (inputs) {
    var loan = inputs.loan, years = inputs.years, graceYears = inputs.graceYears, rate = inputs.rate / 100;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');

    var nTotal = M.yearToMonth(years);
    var nGrace = Math.max(0, M.yearToMonth(graceYears));
    var nAmort = nTotal - nGrace;
    if (nAmort <= 0) throw new Error('寬限期必須短於貸款年限。');
    var r = rate / 12;

    var monthlyGrace = loan * r;
    var payAfter = M.pmt(r, nAmort, loan);
    var totalInt = nGrace * monthlyGrace + (payAfter * nAmort - loan);

    var rows = [];
    for (var i = 1; i <= Math.min(nGrace, 12); i++) {
      rows.push([i, '寬限期', monthlyGrace, 0, monthlyGrace, loan]);
    }
    for (var j = 1; j <= Math.min(nAmort, 12); j++) {
      var per = nGrace + j;
      rows.push([per, '攤還期', payAfter, M.ppmt(r, nAmort, loan, j), M.ipmt(r, nAmort, loan, j), M.balance(r, nAmort, loan, j)]);
    }

    var cats = [], sP = [], sI = [];
    var ny = Math.ceil(nTotal / 12);
    for (var y = 1; y <= ny; y++) {
      cats.push('第 ' + y + ' 年');
      if (y <= graceYears) {
        sP.push(0); sI.push(loan * r * 12);
      } else {
        var ay = y - Math.round(graceYears);
        var a1 = (ay - 1) * 12 + 1, a2 = Math.min(ay * 12, nAmort), sp = 0, si = 0;
        for (var m = a1; m <= a2; m++) { sp += M.ppmt(r, nAmort, loan, m); si += M.ipmt(r, nAmort, loan, m); }
        sP.push(sp); sI.push(si);
      }
    }

    return {
      cards: [
        { label: '寬限期每月應繳', value: monthlyGrace, format: 'currency', emphasis: true, sub: '只繳利息' },
        { label: '寬限期滿每月月付', value: payAfter, format: 'currency' },
        { label: '寬限期月數', value: nGrace, format: 'month' },
        { label: '總繳利息', value: totalInt, format: 'currency' }
      ],
      table: {
        caption: '前 12 期寬限期與前 12 期攤還明細',
        cols: ['期數', '階段', '每期還款', '償還本金', '償還利息', '剩餘本金'],
        colFormats: ['number', 'text', 'currency', 'currency', 'currency', 'currency'],
        colWidths: [10, 14, 18, 18, 18, 22],
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
      },
      notes: [
        '寬限期內只繳利息，寬限期滿後剩餘本金按一般本息均攤計算。',
        '部分銀行寬限期最長 3 至 5 年，實際條件依銀行核准為準。'
      ]
    };
  });

  /* 3. 方案利率比較 */
  g.RECalcEngine.register('re_mortgage_compare', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rA = inputs.rateA / 100, rB = inputs.rateB / 100;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rA >= 0 && rB >= 0)) throw new Error('年利率不可為負數。');

    var n = M.yearToMonth(years);
    var payA = M.pmt(rA / 12, n, loan), payB = M.pmt(rB / 12, n, loan);
    var intA = payA * n - loan, intB = payB * n - loan;

    return {
      cards: [
        { label: '方案 A 月付', value: payA, format: 'currency', sub: '年利率 ' + inputs.rateA + '%' },
        { label: '方案 B 月付', value: payB, format: 'currency', sub: '年利率 ' + inputs.rateB + '%' },
        { label: '月付差異（B - A）', value: payB - payA, format: 'currency', emphasis: true },
        { label: '方案 A 總繳利息', value: intA, format: 'currency' },
        { label: '方案 B 總繳利息', value: intB, format: 'currency' },
        { label: '全期利息差異', value: intB - intA, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '兩方案總成本比較',
        unit: '萬元', scale: 10000, yName: '金額（萬元）',
        categories: ['每月月付', '總繳利息', '總繳金額'],
        series: [
          { name: '方案 A（' + inputs.rateA + '%）', data: [payA, intA, payA * n], color: 'teal' },
          { name: '方案 B（' + inputs.rateB + '%）', data: [payB, intB, payB * n], color: 'coral' }
        ]
      },
      notes: [
        '兩方案皆以本息均攤、固定利率、同一年限計算。',
        '未計入開辦費與帳管費，實際成本請以銀行報價為準。'
      ]
    };
  });

  /* 4. 月負擔比率 */
  g.RECalcEngine.register('re_mortgage_burden', function (inputs) {
    var income = inputs.income, loan = inputs.loan, years = inputs.years,
        rate = inputs.rate / 100, otherDebt = inputs.otherDebt;
    need(income, '請輸入大於 0 的月收入。');
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');
    if (!(otherDebt >= 0)) throw new Error('其他負債不可為負數。');

    var n = M.yearToMonth(years), r = rate / 12;
    var pay = M.pmt(r, n, loan);
    var ratio = pay / income;
    var totalRatio = (pay + otherDebt) / income;
    var spare = Math.max(0, income - pay - otherDebt);

    return {
      cards: [
        { label: '每月房貸月付', value: pay, format: 'currency' },
        { label: '房貸負擔比率', value: ratio, format: 'percent', emphasis: true },
        { label: '含其他負債總負擔比', value: totalRatio, format: 'percent' },
        { label: '扣掉負債後可用餘額', value: spare, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '每月收入分配',
        unit: '元',
        categories: ['房貸月付', '其他負債', '可用餘額'],
        series: [{
          name: '收入分配',
          data: [
            { name: '房貸月付', value: pay },
            { name: '其他負債', value: otherDebt },
            { name: '可用餘額', value: spare }
          ]
        }]
      },
      notes: [
        '銀行通常要求房貸月付佔月收入 30% 至 40% 以內。',
        '總負擔比若超過 40%，建議降低貸款金額或延長年限。'
      ]
    };
  });

  /* 5. 提前還款效益 */
  g.RECalcEngine.register('re_mortgage_early', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rate = inputs.rate / 100,
        afterYear = inputs.afterYear, early = inputs.earlyAmount, strategy = inputs.strategy;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');

    var n = M.yearToMonth(years), r = rate / 12;
    var pay = M.pmt(r, n, loan);
    var k = M.yearToMonth(afterYear);
    if (k <= 0 || k >= n) throw new Error('提前還款時點需介於貸款期間之內。');
    var balK = M.balance(r, n, loan, k);
    if (!(early > 0)) throw new Error('請輸入大於 0 的提前還款金額。');
    if (early >= balK) throw new Error('提前還款金額需小於當時貸款餘額。');
    var newBal = balK - early;

    var baselineRemInt = pay * (n - k) - balK;
    var newPay, newMonths, saved, monthsSaved;
    if (strategy === 'reduce') {
      newMonths = n - k;
      newPay = M.pmt(r, newMonths, newBal);
      saved = baselineRemInt - (newPay * newMonths - newBal);
      monthsSaved = 0;
    } else {
      newMonths = M.nper(r, pay, newBal);
      if (!isFinite(newMonths) || newMonths <= 0) throw new Error('目前月付金額無法清償剩餘本金，請提高月付。');
      newPay = pay;
      saved = baselineRemInt - (pay * newMonths - newBal);
      monthsSaved = (n - k) - newMonths;
    }

    var cats = [], baseTraj = [], newTraj = [];
    var remainYears = Math.ceil((n - k) / 12);
    for (var y = 0; y <= remainYears && y <= 30; y++) {
      var mm = Math.min(y * 12, n - k);
      cats.push(y === 0 ? '現在' : '第 ' + y + ' 年');
      baseTraj.push(M.balance(r, n, loan, k + mm));
      var nn = Math.min(y * 12, newMonths);
      newTraj.push(M.balance(r, newMonths, newBal, nn));
    }

    return {
      cards: [
        { label: '提前還款當下餘額', value: balK, format: 'currency' },
        { label: '還款後剩餘本金', value: newBal, format: 'currency' },
        { label: '調整後月付', value: newPay, format: 'currency' },
        { label: '估計節省利息', value: saved, format: 'currency', emphasis: true },
        { label: '縮短還款月數', value: monthsSaved, format: 'month' }
      ],
      chart: {
        type: 'line',
        title: '剩餘本金下降軌跡比較',
        unit: '萬元', scale: 10000, yName: '剩餘本金（萬元）',
        categories: cats,
        series: [
          { name: '原方案', data: baseTraj, color: 'slate' },
          { name: '提前還款後', data: newTraj, color: 'teal' }
        ]
      },
      notes: [
        '提前還款通常需滿約定償還年限，並可能支付違約金，請先確認銀行規定。',
        '縮短年限方案保持原月付；降低月付方案保持剩餘年限。'
      ]
    };
  });

  /* 6. 轉貸省息 */
  g.RECalcEngine.register('re_mortgage_refinance', function (inputs) {
    var bal = inputs.remainBalance, oldRate = inputs.oldRate / 100, oldYears = inputs.oldYears,
        newRate = inputs.newRate / 100, newYears = inputs.newYears, refiCost = inputs.refiCost;
    need(bal, '請輸入大於 0 的貸款餘額。');
    need(oldYears, '請輸入正確的舊貸剩餘年限。');
    need(newYears, '請輸入正確的新貸年限。');
    if (!(oldRate >= 0 && newRate >= 0)) throw new Error('年利率不可為負數。');
    if (!(refiCost >= 0)) throw new Error('轉貸成本不可為負數。');

    var nOld = M.yearToMonth(oldYears), nNew = M.yearToMonth(newYears);
    var payOld = M.pmt(oldRate / 12, nOld, bal);
    var payNew = M.pmt(newRate / 12, nNew, bal);
    var intOld = payOld * nOld - bal, intNew = payNew * nNew - bal;
    var monthlySave = payOld - payNew;
    var netSave = intOld - intNew - refiCost;
    var breakEven = monthlySave > 0 ? refiCost / monthlySave : 0;

    return {
      cards: [
        { label: '舊貸月付', value: payOld, format: 'currency' },
        { label: '新貸月付', value: payNew, format: 'currency' },
        { label: '每月可省', value: monthlySave, format: 'currency', emphasis: true },
        { label: '全期總省息（扣成本）', value: netSave, format: 'currency' },
        { label: '損益平衡月數', value: breakEven, format: 'month' }
      ],
      chart: {
        type: 'bar',
        title: '舊貸 vs 新貸總成本',
        unit: '萬元', scale: 10000, yName: '金額（萬元）',
        categories: ['總繳利息', '含成本總支出'],
        series: [
          { name: '舊貸案', data: [intOld, payOld * nOld], color: 'slate' },
          { name: '新貸案', data: [intNew, payNew * nNew + refiCost], color: 'teal' }
        ]
      },
      notes: [
        '轉貸成本包含開辦費、塗銷設定費與代書費等。',
        '若新貸年限拉長，雖月付降低，總利息可能反而增加，請一併評估。'
      ]
    };
  });

  /* 7. 到期還本型 */
  g.RECalcEngine.register('re_mortgage_balloon', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rate = inputs.rate / 100, br = inputs.balloonRatio / 100;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');
    if (!(br >= 0 && br <= 1)) throw new Error('到期償還比例不合理。');

    var n = M.yearToMonth(years), r = rate / 12;
    var monthlyInt = loan * r;
    var balloon = loan * br;
    var totalInt = monthlyInt * n;

    return {
      cards: [
        { label: '每月繳息金額', value: monthlyInt, format: 'currency', emphasis: true, sub: '只繳利息' },
        { label: '到期償還本金（氣球款）', value: balloon, format: 'currency' },
        { label: '期間累計繳息', value: totalInt, format: 'currency' },
        { label: '到期當期現金流出', value: balloon + monthlyInt, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '貸款總支出結構',
        unit: '元',
        categories: ['到期償還本金', '期間利息合計'],
        series: [{
          name: '支出結構',
          data: [
            { name: '到期償還本金', value: balloon },
            { name: '期間利息合計', value: totalInt }
          ]
        }]
      },
      notes: [
        '假設貸款期間每月只繳利息，到期一次償還約定比例本金。',
        '未約定到期償還的本金請於期滿前規劃續貸或轉貸，避免資金缺口。'
      ]
    };
  });

  /* 8. 房貸總成本 */
  g.RECalcEngine.register('re_mortgage_total', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rate = inputs.rate / 100,
        initFee = inputs.initFee, yearFee = inputs.yearFee;
    need(loan, '請輸入大於 0 的貸款金額。');
    need(years, '請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');
    if (!(initFee >= 0 && yearFee >= 0)) throw new Error('費用不可為負數。');

    var n = M.yearToMonth(years), r = rate / 12;
    var pay = M.pmt(r, n, loan);
    var totalInt = pay * n - loan;
    var fees = initFee + yearFee * years;
    var totalCost = loan + totalInt + fees;

    return {
      cards: [
        { label: '每月還款金額', value: pay, format: 'currency' },
        { label: '總繳利息', value: totalInt, format: 'currency' },
        { label: '手續費與帳管費合計', value: fees, format: 'currency' },
        { label: '房貸總成本', value: totalCost, format: 'currency', emphasis: true }
      ],
      chart: {
        type: 'donut',
        title: '房貸總成本結構',
        unit: '元',
        categories: ['償還本金', '總繳利息', '手續費與帳管費'],
        series: [{
          name: '成本結構',
          data: [
            { name: '償還本金', value: loan },
            { name: '總繳利息', value: totalInt },
            { name: '手續費與帳管費', value: fees }
          ]
        }]
      },
      notes: [
        '總成本包含償還本金、利息、開辦費與每年帳管費。',
        '未計入信用保險、房屋火險等自選費用。'
      ]
    };
  });

  /* 9. 利息抵稅 */
  g.RECalcEngine.register('re_interest_deduct', function (inputs) {
    var interest = inputs.annualInterest, taxRate = inputs.taxRate / 100, cap = inputs.cap;
    if (!(interest >= 0)) throw new Error('每年繳息不可為負數。');
    if (!(taxRate > 0 && taxRate < 1)) throw new Error('適用稅率不合理。');
    if (!(cap >= 0)) throw new Error('扣除上限不可為負數。');

    var deductible = Math.min(interest, cap);
    var taxSaved = deductible * taxRate;
    var after = interest - taxSaved;

    return {
      cards: [
        { label: '每年繳息金額', value: interest, format: 'currency' },
        { label: '可列舉扣除額', value: deductible, format: 'currency' },
        { label: '估計每年省稅額', value: taxSaved, format: 'currency', emphasis: true },
        { label: '扣除後實際利息負擔', value: after, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '繳息、扣除與自付金額',
        unit: '元',
        categories: ['每年繳息', '可扣除額', '扣除後自付'],
        series: [{ name: '金額', data: [interest, deductible, after], color: 'teal' }]
      },
      notes: [
        '購屋借款利息扣除需為自住住宅、辦妥戶籍登記，且一屋以一戶為限。',
        '列舉扣除需與租金支出擇一適用，並受當年度法定上限規範。'
      ]
    };
  });

  /* ================= 購屋規劃 ================= */

  /* 10. 頭期款與自備款 */
  g.RECalcEngine.register('re_downpayment', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100,
        miscRatio = inputs.miscRatio / 100, reno = inputs.renovation;
    need(price, '請輸入大於 0 的房屋總價。');
    if (!(downRatio >= 0 && downRatio < 1)) throw new Error('頭期款比例不合理。');
    if (!(miscRatio >= 0)) throw new Error('規費比例不可為負數。');
    if (!(reno >= 0)) throw new Error('裝潢預算不可為負數。');

    var down = price * downRatio;
    var misc = price * miscRatio;
    var ready = down + misc + reno;
    var loan = price - down;

    return {
      cards: [
        { label: '頭期款', value: down, format: 'currency' },
        { label: '規費與雜費', value: misc, format: 'currency' },
        { label: '裝潢預算', value: reno, format: 'currency' },
        { label: '自備款合計', value: ready, format: 'currency', emphasis: true },
        { label: '銀行貸款金額', value: loan, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '自備款結構',
        unit: '元',
        categories: ['頭期款', '規費雜費', '裝潢預算'],
        series: [{
          name: '自備款結構',
          data: [
            { name: '頭期款', value: down },
            { name: '規費雜費', value: misc },
            { name: '裝潢預算', value: reno }
          ]
        }]
      },
      notes: [
        '規費包含契稅、代書費、印花稅與仲介服務費等，實際金額依物件而定。',
        '新建案另需準備訂金、簽約金與工程期款，請一併納入現金需求。'
      ]
    };
  });

  /* 11. 租屋 vs 購屋損益平衡 */
  g.RECalcEngine.register('re_rent_vs_buy', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100, rate = inputs.rate / 100,
        loanYears = inputs.loanYears, rent = inputs.rent,
        rentGrowth = inputs.rentGrowth / 100, houseGrowth = inputs.houseGrowth / 100,
        hold = inputs.holdMonthly;
    need(price, '請輸入大於 0 的房屋總價。');
    need(loanYears, '請輸入正確的房貸年限。');
    if (!(rate >= 0)) throw new Error('房貸利率不可為負數。');
    if (!(rent >= 0 && hold >= 0)) throw new Error('租金與持有成本不可為負數。');

    var down = price * downRatio;
    var loan = price - down;
    var n = M.yearToMonth(loanYears), r = rate / 12;
    var pay = M.pmt(r, n, loan);

    var cats = [], buyTraj = [], rentTraj = [];
    var cumRent = 0, breakEven = 0;
    var years = 30;
    for (var y = 1; y <= years; y++) {
      var annualRent = rent * 12 * Math.pow(1 + rentGrowth, y - 1);
      cumRent += annualRent;
      var houseValue = price * Math.pow(1 + houseGrowth, y);
      var cumPay = pay * 12 * Math.min(y, loanYears) + hold * 12 * y;
      var buyNet = down + cumPay - (houseValue - price);
      cats.push('第 ' + y + ' 年');
      buyTraj.push(buyNet);
      rentTraj.push(cumRent);
      if (breakEven === 0 && buyNet < cumRent) breakEven = y;
    }

    return {
      cards: [
        { label: '損益平衡年數', value: breakEven || years, format: 'year', emphasis: true, sub: breakEven ? '購屋開始較划算' : '30 年內未平衡' },
        { label: '購屋每月房貸月付', value: pay, format: 'currency' },
        { label: '目前租金與月付差距', value: pay - rent, format: 'currency' },
        { label: '第 30 年購屋累計淨成本', value: buyTraj[buyTraj.length - 1], format: 'currency' },
        { label: '第 30 年租屋累計支出', value: rentTraj[rentTraj.length - 1], format: 'currency' }
      ],
      chart: {
        type: 'line',
        title: '租屋 vs 購屋累計成本',
        unit: '萬元', scale: 10000, yName: '累計金額（萬元）',
        categories: cats,
        series: [
          { name: '購屋累計淨成本', data: buyTraj, color: 'teal' },
          { name: '租屋累計支出', data: rentTraj, color: 'gold' }
        ]
      },
      notes: [
        '購屋累計成本＝頭期款＋歷年月付與持有成本－房價增值。',
        '本試算為簡化模型，未計入交易稅費、通膨與貸款利率變動，僅供方向參考。'
      ]
    };
  });

  /* 12. 購屋總費用 */
  g.RECalcEngine.register('re_buy_cost', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100,
        agentRate = inputs.agentRate / 100, other = inputs.otherFees, reno = inputs.renovation;
    need(price, '請輸入大於 0 的房屋總價。');
    if (!(downRatio >= 0 && downRatio < 1)) throw new Error('頭期款比例不合理。');
    if (!(agentRate >= 0)) throw new Error('仲介費率不可為負數。');
    if (!(other >= 0 && reno >= 0)) throw new Error('費用不可為負數。');

    var down = price * downRatio;
    var agent = price * agentRate;
    var total = down + agent + other + reno;
    var loan = price - down;

    return {
      cards: [
        { label: '頭期款', value: down, format: 'currency' },
        { label: '仲介服務費', value: agent, format: 'currency' },
        { label: '規費與代書印花', value: other, format: 'currency' },
        { label: '裝潢預算', value: reno, format: 'currency' },
        { label: '購屋當下自備總額', value: total, format: 'currency', emphasis: true },
        { label: '需辦理貸款', value: loan, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '購屋自備費用結構',
        unit: '元',
        categories: ['頭期款', '仲介費', '規費代書', '裝潢'],
        series: [{
          name: '費用結構',
          data: [
            { name: '頭期款', value: down },
            { name: '仲介費', value: agent },
            { name: '規費代書', value: other },
            { name: '裝潢', value: reno }
          ]
        }]
      },
      notes: [
        '仲介服務費實際約定為買賣雙方議定，常見為總價 2% 上下。',
        '成屋交易另有契稅、印花稅、代書費與貸款設定費，請依實報實銷估算。'
      ]
    };
  });

  /* 13. 租金投報率 */
  g.RECalcEngine.register('re_rent_yield', function (inputs) {
    var price = inputs.price, rent = inputs.rent;
    need(price, '請輸入大於 0 的房屋總價。');
    if (!(rent >= 0)) throw new Error('租金不可為負數。');

    var annual = rent * 12;
    var yield_ = annual / price;
    var payback = annual > 0 ? price / annual : 0;

    return {
      cards: [
        { label: '每月租金收入', value: rent, format: 'currency' },
        { label: '每年租金收入', value: annual, format: 'currency' },
        { label: '毛租金投報率', value: yield_, format: 'percent', emphasis: true },
        { label: '成本回收年限', value: payback, format: 'year' }
      ],
      chart: {
        type: 'bar',
        title: '投報率比較',
        unit: '%',
        categories: ['本物件毛投報率', '銀行定存約 1.5%'],
        series: [{ name: '年化報酬率', data: [yield_, 0.015], color: 'teal' }]
      },
      notes: [
        '毛投報率未扣除管理費、空房率、稅費與修繕，實際淨報酬較低。',
        '銀行定存利率僅為比較基準，會隨央行政策調整。'
      ]
    };
  });

  /* 14. 淨租金收益率 */
  g.RECalcEngine.register('re_net_yield', function (inputs) {
    var price = inputs.price, rent = inputs.rent, mgmtRatio = inputs.mgmtRatio / 100,
        tax = inputs.taxYear, repair = inputs.repairYear;
    need(price, '請輸入大於 0 的房屋總價。');
    if (!(rent >= 0 && mgmtRatio >= 0 && tax >= 0 && repair >= 0)) throw new Error('費用不可為負數。');

    var annual = rent * 12;
    var mgmt = annual * mgmtRatio;
    var cost = mgmt + tax + repair;
    var net = annual - cost;
    var netYield = net / price;

    return {
      cards: [
        { label: '年租金收入', value: annual, format: 'currency' },
        { label: '年營運成本', value: cost, format: 'currency' },
        { label: '年淨租金收益', value: net, format: 'currency' },
        { label: '淨租金收益率', value: netYield, format: 'percent', emphasis: true }
      ],
      chart: {
        type: 'donut',
        title: '年租金分配結構',
        unit: '元',
        categories: ['管理與空房', '稅費', '修繕', '淨收益'],
        series: [{
          name: '租金分配',
          data: [
            { name: '管理與空房', value: mgmt },
            { name: '稅費', value: tax },
            { name: '修繕', value: repair },
            { name: '淨收益', value: net }
          ]
        }]
      },
      notes: [
        '管理與空房率已含社區管理費與出租空置期的租金損失。',
        '長期持有需預留更換管線、屋頂等大型修繕支出。'
      ]
    };
  });

  /* 15. 資本化率 */
  g.RECalcEngine.register('re_cap_rate', function (inputs) {
    var rent = inputs.annualRent, opex = inputs.opex, value = inputs.value;
    need(value, '請輸入大於 0 的房屋現值。');
    if (!(rent >= 0 && opex >= 0)) throw new Error('收支金額不可為負數。');

    var noi = rent - opex;
    var cap = noi / value;
    var v3 = noi / 0.03, v4 = noi / 0.04, v5 = noi / 0.05;

    return {
      cards: [
        { label: '年淨營運收入（NOI）', value: noi, format: 'currency' },
        { label: '目前資本化率', value: cap, format: 'percent', emphasis: true },
        { label: '目前房屋現值', value: value, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '不同資本化率下的合理房價',
        unit: '萬元', scale: 10000, yName: '合理房價（萬元）',
        categories: ['Cap 3%', 'Cap 4%', 'Cap 5%'],
        series: [{ name: '合理房價', data: [v3, v4, v5], color: 'primary' }]
      },
      notes: [
        '資本化率＝淨營運收入（NOI）÷ 不動產價值，為收益法估值的核心指標。',
        'Cap rate 越高代表風險與報酬越高，商用物件通常高於住宅。'
      ]
    };
  });

  /* 16. 租金負擔能力 */
  g.RECalcEngine.register('re_rent_budget', function (inputs) {
    var income = inputs.income, ratio = inputs.ratio / 100;
    need(income, '請輸入大於 0 的月收入。');
    if (!(ratio > 0 && ratio < 1)) throw new Error('租金占比不合理。');

    var maxRent = income * ratio;
    var annual = maxRent * 12;
    var living = income * 0.5;
    var save = Math.max(0, income - maxRent - living);

    return {
      cards: [
        { label: '每月可負擔租金', value: maxRent, format: 'currency', emphasis: true },
        { label: '每年租金預算', value: annual, format: 'currency' },
        { label: '扣租金後月可運用', value: income - maxRent, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '月收入分配建議',
        unit: '元',
        categories: ['租金上限', '生活開銷', '儲蓄理財'],
        series: [{
          name: '收入分配',
          data: [
            { name: '租金上限', value: maxRent },
            { name: '生活開銷', value: living },
            { name: '儲蓄理財', value: save }
          ]
        }]
      },
      notes: [
        '常見口訣為房租不超過月收入三分之一，保留生活與緊急預備金。',
        '若租金占比過高，可考慮分租或選擇較遠區域分攤成本。'
      ]
    };
  });

  /* 17. 租金 vs 房貸月付 */
  g.RECalcEngine.register('re_rent_compare', function (inputs) {
    var price = inputs.price, downRatio = inputs.downRatio / 100, years = inputs.years,
        rate = inputs.rate / 100, rent = inputs.rent;
    need(price, '請輸入大於 0 的房屋總價。');
    need(years, '請輸入正確的房貸年限。');
    if (!(rate >= 0)) throw new Error('房貸利率不可為負數。');
    if (!(rent >= 0)) throw new Error('租金不可為負數。');

    var loan = price * (1 - downRatio);
    var n = M.yearToMonth(years), r = rate / 12;
    var pay = M.pmt(r, n, loan);

    return {
      cards: [
        { label: '房貸月付金額', value: pay, format: 'currency', emphasis: true },
        { label: '目前每月租金', value: rent, format: 'currency' },
        { label: '每月現金差距', value: pay - rent, format: 'currency' },
        { label: '租金佔房貸月付比', value: rent / pay, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '租金與房貸月付比較',
        unit: '元',
        categories: ['目前租金', '房貸月付'],
        series: [{ name: '每月金額', data: [rent, pay], color: 'teal' }]
      },
      notes: [
        '房貸月付以本息均攤、頭期款比例下的貸款額計算。',
        '購屋另需準備頭期款、規費與裝潢，請一併評估長期持有成本。'
      ]
    };
  });

  /* ================= 坪數建物 ================= */

  /* 18. 坪數換算 */
  g.RECalcEngine.register('re_ping_convert', function (inputs) {
    var ping = inputs.ping;
    if (!(ping >= 0)) throw new Error('坪數不可為負數。');
    var m2 = M.m2FromPing(ping);
    var sqft = M.sqFtFromPing(ping);

    return {
      cards: [
        { label: '坪數', value: ping, format: 'ping', emphasis: true },
        { label: '平方公尺', value: m2, format: 'm2' },
        { label: '平方英尺', value: sqft, format: 'number' }
      ],
      notes: [
        '台灣 1 坪＝3.305785 平方公尺≈35.583 平方英尺。',
        '建物登記坪數與室內實際使用坪數通常有落差，請以權狀為準。'
      ]
    };
  });

  /* 19. 公設比 */
  g.RECalcEngine.register('re_common_ratio', function (inputs) {
    var reg = inputs.regPing, ratio = inputs.commonRatio / 100;
    if (!(reg >= 0)) throw new Error('登記坪數不可為負數。');
    if (!(ratio >= 0 && ratio < 1)) throw new Error('公設比不合理。');

    var common = reg * ratio;
    var usable = reg - common;

    return {
      cards: [
        { label: '登記總坪數', value: reg, format: 'ping' },
        { label: '公設坪數', value: common, format: 'ping' },
        { label: '實際使用坪數', value: usable, format: 'ping', emphasis: true },
        { label: '公設比', value: ratio, format: 'percent' }
      ],
      chart: {
        type: 'donut',
        title: '登記坪數組成',
        unit: '坪',
        categories: ['實際使用', '公設'],
        series: [{
          name: '坪數組成',
          data: [
            { name: '實際使用', value: usable },
            { name: '公設', value: common }
          ]
        }]
      },
      notes: [
        '新北市新建案公設比常見 30% 至 38%，過高則室內空間被壓縮。',
        '公設比越高，每坪實用單價相對越高，購屋時應一併檢視。'
      ]
    };
  });

  /* 20. 陽台與附屬建物登記 */
  g.RECalcEngine.register('re_balcony', function (inputs) {
    var main = inputs.mainPing, balc = inputs.balcPing, ratio = inputs.commonRatio / 100;
    if (!(main >= 0 && balc >= 0)) throw new Error('坪數不可為負數。');
    if (!(ratio >= 0 && ratio < 1)) throw new Error('公設比不合理。');

    var mainPlus = main + balc;
    var common = mainPlus * ratio / (1 - ratio);
    var total = mainPlus + common;

    return {
      cards: [
        { label: '主建物登記坪數', value: main, format: 'ping' },
        { label: '陽台等附屬建物', value: balc, format: 'ping' },
        { label: '公設坪數', value: common, format: 'ping' },
        { label: '建物登記總坪數', value: total, format: 'ping', emphasis: true }
      ],
      chart: {
        type: 'donut',
        title: '登記坪數組成',
        unit: '坪',
        categories: ['主建物', '陽台附屬', '公設'],
        series: [{
          name: '坪數組成',
          data: [
            { name: '主建物', value: main },
            { name: '陽台附屬', value: balc },
            { name: '公設', value: common }
          ]
        }]
      },
      notes: [
        '公設比＝公設÷（主建物＋附屬建物＋公設），故公設＝主附建物×公設比÷（1－公設比）。',
        '陽台若為後續增建，登記上可能未計入權狀，購屋前應確認建物謄本。'
      ]
    };
  });

  /* 21. 預售屋付款 */
  g.RECalcEngine.register('re_presale', function (inputs) {
    var price = inputs.price, d = inputs.depositPct / 100, c = inputs.contractPct / 100,
        con = inputs.constructPct / 100, f = inputs.finalPct / 100;
    need(price, '請輸入大於 0 的房屋總價。');
    [d, c, con, f].forEach(function (x) { if (!(x >= 0)) throw new Error('付款比例不可為負數。'); });

    var deposit = price * d, contract = price * c, construct = price * con, final = price * f;
    var total = deposit + contract + construct + final;

    return {
      cards: [
        { label: '訂金', value: deposit, format: 'currency' },
        { label: '簽約金', value: contract, format: 'currency' },
        { label: '工程期款合計', value: construct, format: 'currency' },
        { label: '交屋款', value: final, format: 'currency' },
        { label: '自備款合計', value: total, format: 'currency', emphasis: true }
      ],
      table: {
        caption: '預售屋分期明細',
        cols: ['階段', '占總價比例', '金額'],
        colFormats: ['text', 'percent', 'currency'],
        colWidths: [40, 30, 30],
        rows: [
          ['訂金', d, deposit],
          ['簽約金', c, contract],
          ['工程期款', con, construct],
          ['交屋款', f, final]
        ]
      },
      chart: {
        type: 'donut',
        title: '預售屋付款結構',
        unit: '元',
        categories: ['訂金', '簽約金', '工程期款', '交屋款'],
        series: [{
          name: '付款結構',
          data: [
            { name: '訂金', value: deposit },
            { name: '簽約金', value: contract },
            { name: '工程期款', value: construct },
            { name: '交屋款', value: final }
          ]
        }]
      },
      notes: [
        '各期比例僅為常見範例，實際依建案契約為準。',
        '剩餘成屋價額通常於交屋時以房屋貸款支應，請留意工程進度與履約擔保。'
      ]
    };
  });

  /* 22. 工程期款 */
  g.RECalcEngine.register('re_construction_pay', function (inputs) {
    var price = inputs.price, pct = inputs.constructPct / 100, months = inputs.months;
    need(price, '請輸入大於 0 的房屋總價。');
    need(months, '請輸入大於 0 的施工月數。');
    if (!(pct >= 0)) throw new Error('工程期款比例不可為負數。');

    var total = price * pct;
    var monthly = total / months;

    var cats = [], cum = [];
    var acc = 0;
    for (var m = 1; m <= months; m++) {
      acc += monthly;
      cats.push('第 ' + m + ' 月');
      cum.push(acc);
    }

    return {
      cards: [
        { label: '工程期款總額', value: total, format: 'currency' },
        { label: '每月應繳工程款', value: monthly, format: 'currency', emphasis: true },
        { label: '施工月數', value: months, format: 'month' }
      ],
      chart: {
        type: 'area',
        title: '累計工程期款繳納進度',
        unit: '萬元', scale: 10000, yName: '累計金額（萬元）',
        categories: cats,
        series: [{ name: '累計工程款', data: cum, color: 'primary' }]
      },
      notes: [
        '工程期款通常依工程進度分段收取，非每月平均。',
        '實際繳款時程請以建商施工進度表與契約為準。'
      ]
    };
  });

  /* 23. 換屋資金 */
  g.RECalcEngine.register('re_exchange', function (inputs) {
    var oldPrice = inputs.oldPrice, oldLoan = inputs.oldLoan, sellFee = inputs.sellFee,
        newPrice = inputs.newPrice, downRatio = inputs.newDownRatio / 100, newFees = inputs.newFees;
    need(newPrice, '請輸入大於 0 的新屋總價。');
    if (!(oldPrice >= 0 && oldLoan >= 0 && sellFee >= 0 && newFees >= 0)) throw new Error('金額不可為負數。');
    if (!(downRatio >= 0 && downRatio < 1)) throw new Error('頭期款比例不合理。');

    var oldNet = oldPrice - oldLoan - sellFee;
    var newDown = newPrice * downRatio;
    var needTotal = newDown + newFees;
    var gap = needTotal - oldNet;

    return {
      cards: [
        { label: '賣舊屋實拿款', value: oldNet, format: 'currency' },
        { label: '新屋自備需求', value: needTotal, format: 'currency' },
        { label: '資金缺口（需增準備）', value: gap, format: 'currency', emphasis: true },
        { label: '新屋需貸款額', value: newPrice - newDown, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '換屋資金來源與需求',
        unit: '萬元', scale: 10000, yName: '金額（萬元）',
        categories: ['賣屋實拿', '新屋自備需求'],
        series: [{ name: '金額', data: [oldNet, needTotal], color: 'teal' }]
      },
      notes: [
        '資金缺口為正代表賣舊屋款不足以支付新屋自備，需另行增準備。',
        '出售舊屋另需預留土地增值稅、仲介費與提前還款違約金。'
      ]
    };
  });

  /* 24. 裝潢預算 */
  g.RECalcEngine.register('re_renovation_budget', function (inputs) {
    var ping = inputs.ping, level = inputs.level;
    if (!(ping >= 0)) throw new Error('坪數不可為負數。');
    var perPing = level === 'luxury' ? 250000 : (level === 'basic' ? 80000 : 150000);
    var total = ping * perPing;

    var items = [
      { name: '衛浴設備', r: 0.15 },
      { name: '廚具系統', r: 0.15 },
      { name: '木作櫃體', r: 0.25 },
      { name: '水電配線', r: 0.20 },
      { name: '地板油漆', r: 0.25 }
    ];
    var donutData = items.map(function (it) { return { name: it.name, value: total * it.r }; });

    return {
      cards: [
        { label: '裝潢總預算', value: total, format: 'currency', emphasis: true },
        { label: '每坪裝潢單價', value: perPing, format: 'currency' },
        { label: '室內坪數', value: ping, format: 'ping' }
      ],
      chart: {
        type: 'donut',
        title: '裝潢預算分配',
        unit: '元',
        categories: items.map(function (it) { return it.name; }),
        series: [{ name: '項目', data: donutData }]
      },
      notes: [
        '每坪單價為市場常見區間，實際報價會因屋況、材質與設計複雜度而異。',
        '舊屋翻新常需追加管線更新與壁癌處理，建議預留 10% 至 20% 預備金。'
      ]
    };
  });

  /* 25. 建材估價 */
  g.RECalcEngine.register('re_material_estimate', function (inputs) {
    var floorPing = inputs.floorPing, floorPrice = inputs.floorPrice,
        paintM2 = inputs.paintM2, paintPrice = inputs.paintPrice;
    if (!(floorPing >= 0 && floorPrice >= 0 && paintM2 >= 0 && paintPrice >= 0)) throw new Error('面積與單價不可為負數。');

    var floor = floorPing * floorPrice;
    var paint = paintM2 * paintPrice;
    var total = floor + paint;

    return {
      cards: [
        { label: '地板工程費', value: floor, format: 'currency' },
        { label: '油漆工程費', value: paint, format: 'currency' },
        { label: '材料與工程估價合計', value: total, format: 'currency', emphasis: true }
      ],
      chart: {
        type: 'bar',
        title: '主要工程項目估價',
        unit: '元',
        categories: ['地板工程', '油漆工程'],
        series: [{ name: '金額', data: [floor, paint], color: 'primary' }]
      },
      notes: [
        '本試算僅粗估主要材料與工程，未含設計費、管線變更與拆除運廢。',
        '實際報價應請水電、木地板與油漆廠商到場丈量後報價。'
      ]
    };
  });

  /* 26. 每坪單價 */
  g.RECalcEngine.register('re_price_per_ping', function (inputs) {
    var total = inputs.totalPrice, ping = inputs.ping;
    need(total, '請輸入大於 0 的房屋總價。');
    if (!(ping > 0)) throw new Error('坪數需大於 0。');

    var perPing = total / ping;
    var perM2 = perPing / 3.305785;

    return {
      cards: [
        { label: '每坪單價', value: perPing, format: 'currency', emphasis: true },
        { label: '每平方公尺單價', value: perM2, format: 'currency' },
        { label: '房屋總價', value: total, format: 'currency' }
      ],
      notes: [
        '每坪單價為總價除以登記坪數；含公設坪數則會稀釋室內實質單價。',
        '比較物件時建議一併換算為室內實用坪數單價，以免誤判。'
      ]
    };
  });

  /* ============================================================
     RE-A 實作工具 id 清單（26 支）：
     房貸試算：re_mortgage_principal / re_mortgage_grace / re_mortgage_compare /
               re_mortgage_burden / re_mortgage_early / re_mortgage_refinance /
               re_mortgage_balloon / re_mortgage_total / re_interest_deduct
     購屋規劃：re_downpayment / re_rent_vs_buy / re_buy_cost / re_rent_yield /
               re_net_yield / re_cap_rate / re_rent_budget / re_rent_compare
     坪數建物：re_ping_convert / re_common_ratio / re_balcony / re_presale /
               re_construction_pay / re_exchange / re_renovation_budget /
               re_material_estimate / re_price_per_ping
     ============================================================ */
})(typeof window !== 'undefined' ? window : globalThis);
