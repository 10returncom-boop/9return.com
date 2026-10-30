/* ============================================================
   storage.js — localStorage 持久化 service
   世界建築史 · Architecture Atlas
   ============================================================ */
window.StorageService = (function () {
  'use strict';
  var C = window.SiteConfig;

  function safeGet (key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function safeSet (key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  /* ---- 設定 ---- */
  function getSettings () {
    return Object.assign({
      themeCombo: 'paper',   // paper/slate/forest
      themeMode: 'light',    // light/dark/system
      accent: '',            // 自訂強調色
      fontSize: 16,
      density: 'comfort',    // comfort/compact
      lang: 'zh',            // zh/en
      copyProtect: true,
      view: 'card'           // card/list/map/timeline
    }, safeGet(C.settingsStorageKey, {}));
  }
  function saveSettings (patch) {
    var s = getSettings();
    var next = Object.assign(s, patch);
    safeSet(C.settingsStorageKey, next);
    return next;
  }

  /* ---- 我的最愛 ---- */
  function getFavs () { return safeGet(C.favStorageKey, []); }
  function toggleFav (id) {
    var favs = getFavs();
    var i = favs.indexOf(id);
    if (i >= 0) { favs.splice(i, 1); }
    else { favs.unshift(id); }
    safeSet(C.favStorageKey, favs);
    return favs.indexOf(id) >= 0;
  }
  function isFav (id) { return getFavs().indexOf(id) >= 0; }

  /* ---- 最近造訪 ---- */
  function getHistory () { return safeGet(C.historyStorageKey, []); }
  function recordVisit (id) {
    var h = getHistory().filter(function (x) { return x !== id; });
    h.unshift(id);
    if (h.length > 30) h = h.slice(0, 30);
    safeSet(C.historyStorageKey, h);
    return h;
  }
  function clearHistory () { safeSet(C.historyStorageKey, []); }

  return {
    getSettings: getSettings,
    saveSettings: saveSettings,
    getFavs: getFavs,
    toggleFav: toggleFav,
    isFav: isFav,
    getHistory: getHistory,
    recordVisit: recordVisit,
    clearHistory: clearHistory,
    _safeSet: safeSet
  };
})();
