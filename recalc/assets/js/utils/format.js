/* ============================================================
   utils/format.js — 數字格式化與解析（純函式，無 DOM 依賴）
   ============================================================ */
(function (g) {
  'use strict';

  /* ---- 解析 ---- */
  function num(s) {
    if (typeof s === 'number') return s;
    if (s === null || s === undefined || s === '') return NaN;
    var t = String(s)
      .replace(/[$,，\s\u00A0%％]/g, '')
      .replace(/NT\$|新臺幣|台幣|元/g, '');
    return parseFloat(t);
  }

  /* 百分比字串（或數值）→ 小數；數值視為百分比值（2.2 → 0.022） */
  function pct(s) {
    if (typeof s === 'number') return s / 100;
    var t = String(s == null ? '' : s).replace(/%/g, '').trim();
    return parseFloat(t) / 100;
  }

  /* 逗號／空白／換行分隔的文字 → 數字陣列（現金流用） */
  function list(s) {
    if (Array.isArray(s)) return s.map(num);
    var t = String(s == null ? '' : s);
    var parts = t.split(/[\s,，、;；\n\r]+/).filter(function (x) { return x !== ''; });
    return parts.map(num);
  }

  /* ---- 格式化 ---- */
  function n(x, d) {
    if (!isFinite(x)) return '—';
    return x.toLocaleString('zh-TW', {
      maximumFractionDigits: d == null ? 0 : d,
      minimumFractionDigits: 0
    });
  }
  function n2(x) { return n(x, 2); }

  function currency(x) { return 'NT$' + n(x, 0); }
  function currency2(x) { return 'NT$' + n(x, 2); }

  function percent(x) {
    if (!isFinite(x)) return '—';
    return (x * 100).toLocaleString('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
  }
  function percent1(x) {
    if (!isFinite(x)) return '—';
    return (x * 100).toLocaleString('zh-TW', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }
  function ratio(x) { return n(x, 2) + ' 倍'; }
  function wan(x) { return n(x / 10000, 1) + ' 萬元'; }
  function ping(x) { return n(x, 2) + ' 坪'; }
  function m2(x) { return n(x, 2) + ' 平方公尺'; }
  function year(x) { return n(x, 0) + ' 年'; }
  function month(x) { return n(x, 0) + ' 個月'; }
  function day(x) { return n(x, 0) + ' 天'; }
  function text(x) { return (x === null || x === undefined || x === '') ? '—' : String(x); }

  function fmt(x, format) {
    switch (format) {
      case 'currency': return currency(x);
      case 'currency2': return currency2(x);
      case 'number': return n(x, 0);
      case 'number2': return n(x, 2);
      case 'percent': return percent(x);
      case 'percent1': return percent1(x);
      case 'ratio': return ratio(x);
      case 'wan': return wan(x);
      case 'ping': return ping(x);
      case 'm2': return m2(x);
      case 'year': return year(x);
      case 'month': return month(x);
      case 'day': return day(x);
      default: return text(x);
    }
  }

  /* 大數簡寫（億／萬）— 圖表軸或註記用 */
  function numShort(x) {
    if (!isFinite(x)) return '—';
    var ax = Math.abs(x);
    if (ax >= 1e8) return n(x / 1e8, 2) + ' 億';
    if (ax >= 1e4) return n(x / 1e4, 1) + ' 萬';
    return n(x, 0);
  }

  g.RECalcFormat = { num: num, pct: pct, list: list, n: n, n2: n2, currency: currency, currency2: currency2, percent: percent, percent1: percent1, ratio: ratio, wan: wan, ping: ping, m2: m2, year: year, month: month, day: day, text: text, fmt: fmt, numShort: numShort };
  g.RECalcParse = { num: num, pct: pct, list: list };
})(typeof window !== 'undefined' ? window : globalThis);
