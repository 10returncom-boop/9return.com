/* ============================================================
   service/seed.js — 種子引擎（3 支，模式範本）
   子代理實作前必讀：此檔示範 cards／table／chart／notes 完整回傳結構
   ============================================================ */
(function (g) {
  'use strict';

  var M = g.RECalcMath;
  var F = g.RECalcFormat;

  /* ---------- 房貸本息均攤 ---------- */
  g.RECalcEngine.register('re_mortgage_equal', function (inputs) {
    var loan = inputs.loan, years = inputs.years, rate = inputs.rate / 100;
    if (!(loan > 0)) throw new Error('請輸入大於 0 的貸款金額。');
    if (!(years > 0)) throw new Error('請輸入正確的貸款年限。');
    if (!(rate >= 0)) throw new Error('年利率不可為負數。');

    var n = M.yearToMonth(years);
    var r = rate / 12;
    var pay = M.pmt(r, n, loan);
    var totalPay = pay * n;
    var totalInt = totalPay - loan;

    /* 每月明細：前 24 期 + 末期 */
    var rows = [];
    var show = Math.min(24, n);
    for (var i = 1; i <= show; i++) {
      rows.push([i, pay, M.ppmt(r, n, loan, i), M.ipmt(r, n, loan, i), M.balance(r, n, loan, i)]);
    }
    if (n > show) {
      rows.push([n, pay, M.ppmt(r, n, loan, n), M.ipmt(r, n, loan, n), 0]);
    }

    /* 按年彙總（圖表） */
    var cats = [], sP = [], sI = [];
    var ny = Math.ceil(n / 12);
    for (var y = 1; y <= ny; y++) {
      var y1 = (y - 1) * 12 + 1, y2 = Math.min(y * 12, n);
      var sp = 0, si = 0;
      for (var m = y1; m <= y2; m++) { sp += M.ppmt(r, n, loan, m); si += M.ipmt(r, n, loan, m); }
      cats.push('第 ' + y + ' 年');
      sP.push(sp); sI.push(si);
    }

    return {
      cards: [
        { label: '每月還款金額', value: pay, format: 'currency', emphasis: true, sub: '本息均攤' },
        { label: '貸款年限', value: years, format: 'year', sub: '共 ' + n + ' 期' },
        { label: '總繳利息', value: totalInt, format: 'currency' },
        { label: '總繳金額', value: totalPay, format: 'currency' },
        { label: '利息佔比', value: totalInt / totalPay, format: 'percent' }
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
        unit: '元',
        scale: 10000,
        yName: '金額（萬元）',
        categories: cats,
        series: [
          { name: '償還本金', data: sP, color: 'teal' },
          { name: '償還利息', data: sI, color: 'gold' }
        ]
      },
      notes: [
        '假設利率固定、每月月底還款（期末年金）。',
        '實際貸款利率、開辦費與帳管費依銀行報價為準，本試算不含其餘費用。'
      ]
    };
  });

  /* ---------- 購屋能力（可負擔房價） ---------- */
  g.RECalcEngine.register('re_afford', function (inputs) {
    var income = inputs.income, payRatio = inputs.payRatio / 100,
        downRatio = inputs.downRatio / 100, years = inputs.years, rate = inputs.rate / 100;
    if (!(income > 0)) throw new Error('請輸入大於 0 的月收入。');
    if (!(payRatio > 0 && payRatio < 1)) throw new Error('房貸支出上限比例不合理。');
    if (!(downRatio >= 0 && downRatio < 1)) throw new Error('頭期款比例不合理。');

    var n = M.yearToMonth(years);
    var r = rate / 12;
    var maxPay = income * payRatio;
    /* 可負擔貸款額 = 月付上限之年金現值 */
    var loan = (r === 0) ? maxPay * n : maxPay * (1 - Math.pow(1 + r, -n)) / r;
    var price = loan / (1 - downRatio);
    var down = price - loan;

    /* 利率敏感度：2.0% ~ 5.0% 下的可負擔房價 */
    var cats = [], prices = [];
    for (var k = 0; k <= 6; k++) {
      var rr = (2 + k * 0.5) / 100 / 12;
      var pctTxt = (2 + k * 0.5).toFixed(1) + '%';
      cats.push(pctTxt);
      prices.push((rr === 0) ? maxPay * n / (1 - downRatio) : (maxPay * (1 - Math.pow(1 + rr, -n)) / rr) / (1 - downRatio));
    }

    return {
      cards: [
        { label: '可負擔房價', value: price, format: 'currency', emphasis: true, sub: '頭期款 ' + (downRatio * 100).toFixed(0) + '%' },
        { label: '可負擔貸款額', value: loan, format: 'currency' },
        { label: '頭期款金額', value: down, format: 'currency' },
        { label: '每月房貸上限', value: maxPay, format: 'currency', sub: '佔月收入 ' + (payRatio * 100).toFixed(0) + '%' },
        { label: '房價為年收入倍數', value: price / (income * 12), format: 'ratio' }
      ],
      chart: {
        type: 'line',
        title: '不同利率下的可負擔房價',
        unit: '萬元',
        scale: 10000,
        yName: '可負擔房價（萬元）',
        categories: cats,
        series: [{ name: '可負擔房價', data: prices, color: 'primary' }]
      },
      notes: [
        '房貸支出上限為每月房貸月付金佔月收入的比例（本息均攤）。',
        '實際可貸金額仍需依銀行核貸條件（收入證明、信用狀況）為準。'
      ]
    };
  });

  /* ---------- 複利 ---------- */
  g.RECalcEngine.register('fin_compound', function (inputs) {
    var principal = inputs.principal, rate = inputs.rate / 100,
        years = inputs.years, freq = Number(inputs.freq) || 12;
    if (!(principal > 0)) throw new Error('請輸入大於 0 的本金。');
    if (!(rate >= 0)) throw new Error('年報酬率不可為負數。');
    if (!(years > 0)) throw new Error('請輸入正確的投資年限。');

    var finalAmt = M.compoundFV(principal, rate, years, freq);
    var interest = finalAmt - principal;
    var simple = M.simpleFV(principal, rate, years);
    var eff = M.effectiveRate(rate, freq);

    var cats = [], sC = [], sS = [];
    for (var y = 1; y <= years; y++) {
      cats.push('第 ' + y + ' 年');
      sC.push(M.compoundFV(principal, rate, y, freq));
      sS.push(M.simpleFV(principal, rate, y));
    }

    return {
      cards: [
        { label: '期末本利和', value: finalAmt, format: 'currency', emphasis: true, sub: '複利' },
        { label: '複利利息', value: interest, format: 'currency' },
        { label: '單利對照', value: simple, format: 'currency', sub: '單利利息 ' + F.currency(simple - principal) },
        { label: '複利倍數', value: finalAmt / principal, format: 'ratio' },
        { label: '有效年利率', value: eff, format: 'percent', sub: '每年複利 ' + freq + ' 次' }
      ],
      chart: {
        type: 'line',
        title: '複利 vs 單利成長曲線',
        unit: '元',
        scale: 10000,
        yName: '本利和（萬元）',
        categories: cats,
        series: [
          { name: '複利', data: sC, color: 'teal' },
          { name: '單利', data: sS, color: 'gold' }
        ]
      },
      notes: [
        '複利頻率為每年複利次數；年報酬率固定且利息不取出（滾入本金）。',
        '實際投資報酬率具波動性，本試算為理想化情境。'
      ]
    };
  });

})(typeof window !== 'undefined' ? window : globalThis);
