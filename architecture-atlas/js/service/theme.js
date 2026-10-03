/* ============================================================
   theme.js — 主題服務 service
   世界建築史 · Architecture Atlas
   6 主題狀態：3 組合 × 日夜；含跟隨系統、自訂強調色、字級、密度
   ============================================================ */
window.ThemeService = (function () {
  'use strict';
  var C = window.SiteConfig;
  var root = document.documentElement;

  function resolveMode (mode) {
    if (mode === 'system') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  }

  /* 套用主題：combo + mode -> 6 種狀態之一 */
  function applyTheme (combo, mode) {
    var presets = C.themePresets[combo] || C.themePresets.paper;
    var m = resolveMode(mode);
    var vars = presets[m] || presets.light;
    root.style.setProperty('--bg', vars.bg);
    root.style.setProperty('--surface', vars.surface);
    root.style.setProperty('--surface2', vars.surface2);
    root.style.setProperty('--ink', vars.ink);
    root.style.setProperty('--ink2', vars.ink2);
    root.style.setProperty('--accent', vars.accent);
    root.style.setProperty('--accent2', vars.accent2);
    root.style.setProperty('--border', vars.border);
    root.setAttribute('data-theme', m);
    root.setAttribute('data-combo', combo);
  }

  /* 自訂強調色 */
  function applyAccent (hex) {
    if (hex && /^#[0-9a-fA-F]{3,8}$/.test(hex)) {
      root.style.setProperty('--accent', hex);
    } else {
      root.style.removeProperty('--accent');
    }
  }

  /* 字級 */
  function applyFontSize (size) {
    size = Math.max(C.fontSize.min, Math.min(C.fontSize.max, size));
    root.style.setProperty('--fs-base', size + 'px');
  }

  /* 密度 */
  function applyDensity (d) {
    root.setAttribute('data-density', d === 'compact' ? 'compact' : 'comfort');
  }

  /* 語言（html lang + 主要文字，由 app 處理 i18n 文本） */
  function applyLang (lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hant';
  }

  function init () {
    var s = window.StorageService.getSettings();
    applyTheme(s.themeCombo, s.themeMode);
    applyAccent(s.accent);
    applyFontSize(s.fontSize);
    applyDensity(s.density);
    applyLang(s.lang);
    /* 跟隨系統變化 */
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        var cur = window.StorageService.getSettings();
        if (cur.themeMode === 'system') applyTheme(cur.themeCombo, 'system');
      });
    }
  }

  return {
    init: init,
    applyTheme: applyTheme,
    applyAccent: applyAccent,
    applyFontSize: applyFontSize,
    applyDensity: applyDensity,
    applyLang: applyLang,
    resolveMode: resolveMode
  };
})();
