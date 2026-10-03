/* ============================================================
   service/math.js — 財務數學核心（所有引擎共用，勿重複實作）
   - 利率：一律小數（引擎自行將 % 除以 100）
   - 期數：月數
   ============================================================ */
(function (g) {
  'use strict';

  function clamp(x, lo, hi) { return Math.min(hi, Math.max(lo, x)); }
  function round2(x) { return Math.round(x * 100) / 100; }
  function yearToMonth(y) { return Math.round(y * 12); }

  /* 等額本息月付金（r 月利率、n 期數、pv 現值） */
  function pmt(r, n, pv) {
    if (!isFinite(r) || !isFinite(n) || !isFinite(pv)) return NaN;
    if (r === 0) return n > 0 ? pv / n : NaN;
    var p = Math.pow(1 + r, n);
    return (pv * r * p) / (p - 1);
  }

  /* 第 k 期後剩餘本金 */
  function balance(r, n, pv, k) {
    if (r === 0) return pv * (1 - k / n);
    var m = pmt(r, n, pv);
    return pv * Math.pow(1 + r, k) - (m * (Math.pow(1 + r, k) - 1)) / r;
  }

  /* 第 per 期利息／本金 */
  function ipmt(r, n, pv, per) { return balance(r, n, pv, per - 1) * r; }
  function ppmt(r, n, pv, per) { return pmt(r, n, pv) - ipmt(r, n, pv, per); }

  /* 終值：fv = pv(1+r)^n + pmt * ((1+r)^n - 1)/r （pmt 於期末支付） */
  function fv(r, n, pmtAmt, pvAmt) {
    if (r === 0) return pvAmt + pmtAmt * n;
    var p = Math.pow(1 + r, n);
    return pvAmt * p + pmtAmt * ((p - 1) / r);
  }

  /* 現值：由 pmt 與終值反推 */
  function pv(r, n, pmtAmt, fvAmt) {
    if (r === 0) return fvAmt - pmtAmt * n;
    var p = Math.pow(1 + r, n);
    return (fvAmt - pmtAmt * ((p - 1) / r)) / p;
  }

  /* 還清所需期數（n = -ln(1 - r·pv/pmt) / ln(1+r)；pmt ≤ r·pv 時無法還清） */
  function nper(r, pmtAmt, pvAmt) {
    if (r === 0) return pmtAmt !== 0 ? pvAmt / pmtAmt : NaN;
    if (pmtAmt <= 0) return Infinity;
    var x = 1 - (r * pvAmt) / pmtAmt;
    if (x <= 0) return Infinity;
    return -Math.log(x) / Math.log(1 + r);
  }

  /* 複利終值（freq：每年複利次數） */
  function compoundFV(pvAmt, annualRate, years, freq) {
    freq = freq || 12;
    return pvAmt * Math.pow(1 + annualRate / freq, freq * years);
  }

  function effectiveRate(annualRate, freq) {
    return Math.pow(1 + annualRate / freq, freq) - 1;
  }

  function simpleFV(pvAmt, annualRate, years) { return pvAmt * (1 + annualRate * years); }
  function simpleInterest(pvAmt, annualRate, years) { return pvAmt * annualRate * years; }

  /* NPV：flows[0] 為第 0 期 */
  function npv(rate, flows) {
    var sum = 0;
    for (var i = 0; i < flows.length; i++) {
      if (!isFinite(flows[i])) return NaN;
      sum += flows[i] / Math.pow(1 + rate, i);
    }
    return sum;
  }

  /* IRR：Newton-Raphson + 二分法後備 */
  function irr(flows, guess) {
    if (!flows || flows.length < 2) return NaN;
    var npvFn = function (r) { return npv(r, flows); };
    var r = (typeof guess === 'number' && isFinite(guess)) ? guess : 0.1;
    for (var i = 0; i < 80; i++) {
      var f = npvFn(r);
      var d = 1e-6;
      var df = (npvFn(r + d) - npvFn(r - d)) / (2 * d);
      if (!isFinite(df) || Math.abs(df) < 1e-12) break;
      var nr = r - f / df;
      if (!isFinite(nr)) break;
      if (Math.abs(nr - r) < 1e-9) return nr;
      r = nr;
    }
    /* 二分法：在 [-0.9999, 1000] 找根 */
    var lo = -0.9999, hi = 1000, flo = npvFn(lo);
    if (flo * npvFn(hi) > 0) return r; /* 無法包圍 → 回傳牛頓結果 */
    for (var j = 0; j < 240; j++) {
      var mid = (lo + hi) / 2;
      var fm = npvFn(mid);
      if (!isFinite(fm)) break;
      if (Math.abs(fm) < 1e-10) return mid;
      if (flo * fm < 0) { hi = mid; } else { lo = mid; flo = fm; }
    }
    return (lo + hi) / 2;
  }

  function mean(arr) {
    if (!arr || !arr.length) return NaN;
    var s = 0;
    for (var i = 0; i < arr.length; i++) s += arr[i];
    return s / arr.length;
  }

  /* 樣本標準差 */
  function stdev(arr) {
    if (!arr || arr.length < 2) return NaN;
    var m = mean(arr), s = 0;
    for (var i = 0; i < arr.length; i++) s += (arr[i] - m) * (arr[i] - m);
    return Math.sqrt(s / (arr.length - 1));
  }

  function annualizedReturn(final, initial, years) {
    if (initial <= 0 || years <= 0) return NaN;
    return Math.pow(final / initial, 1 / years) - 1;
  }

  function inflationAdjusted(fvAmt, inflationRate, years) {
    return fvAmt / Math.pow(1 + inflationRate, years);
  }

  /* 面積換算（台灣 1 坪 = 3.305785 平方公尺 ≈ 35.583 平方英尺） */
  function pingFromM2(m2) { return m2 / 3.305785; }
  function m2FromPing(ping) { return ping * 3.305785; }
  function pingFromSqFt(ft) { return ft / 35.5833; }
  function sqFtFromPing(ping) { return ping * 35.5833; }

  g.RECalcMath = {
    clamp: clamp, round2: round2, yearToMonth: yearToMonth,
    pmt: pmt, balance: balance, ipmt: ipmt, ppmt: ppmt,
    fv: fv, pv: pv, nper: nper,
    compoundFV: compoundFV, effectiveRate: effectiveRate, simpleFV: simpleFV, simpleInterest: simpleInterest,
    npv: npv, irr: irr, mean: mean, stdev: stdev,
    annualizedReturn: annualizedReturn, inflationAdjusted: inflationAdjusted,
    pingFromM2: pingFromM2, m2FromPing: m2FromPing, pingFromSqFt: pingFromSqFt, sqFtFromPing: sqFtFromPing
  };
})(typeof window !== 'undefined' ? window : globalThis);
