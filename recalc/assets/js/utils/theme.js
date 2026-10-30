/* ============================================================
   utils/theme.js — 日夜主題（預設白天模式，手動切換）
   - localStorage 鍵：recalc-theme（light | dark）
   - 預設白天（light），不跟隨系統自動轉換
   - 變更時於 document 觸發 'recalc:theme' 事件（chart.js 監聽重繪）
   ============================================================ */
(function (g) {
  'use strict';

  var KEY = 'recalc-theme';
  var state = { pref: 'light' };

  /* 僅支援 light / dark；任何其他值一律回退為白天 */
  function resolve(p) {
    return (p === 'dark' || p === 'light') ? p : 'light';
  }

  function load() {
    try { state.pref = localStorage.getItem(KEY) || 'light'; }
    catch (e) { state.pref = 'light'; }
  }

  function current() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function apply() {
    var t = resolve(state.pref);
    document.documentElement.setAttribute('data-theme', t);
    if (typeof document.dispatchEvent === 'function') {
      try { document.dispatchEvent(new CustomEvent('recalc:theme', { detail: { theme: t } })); }
      catch (e) { /* 舊瀏覽器忽略 */ }
    }
  }

  function set(p) {
    state.pref = (p === 'dark' || p === 'light') ? p : 'light';
    try { localStorage.setItem(KEY, state.pref); } catch (e) { /* 隱私模式忽略 */ }
    apply();
  }

  function getPref() { return state.pref; }

  load();
  apply();

  g.RECalcTheme = { set: set, get: getPref, current: current, apply: apply };
})(typeof window !== 'undefined' ? window : globalThis);
