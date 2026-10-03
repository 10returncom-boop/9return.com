/* ============================================================
   service/engine.js — 引擎註冊器
   - register(id, fn)：fn(inputs) → {cards, table?, chart?, notes?}
   - run(id, inputs)：執行並做基本結構檢查
   ============================================================ */
(function (g) {
  'use strict';

  var engines = {};

  function register(id, fn) {
    if (typeof fn !== 'function') throw new Error('引擎「' + id + '」必須為函式。');
    engines[id] = fn;
  }

  function get(id) { return engines[id]; }
  function has(id) { return !!engines[id]; }

  function run(id, inputs) {
    var fn = engines[id];
    if (!fn) throw new Error('找不到試算引擎：「' + id + '」，請確認引擎檔案已載入。');
    var res = fn(inputs || {});
    if (!res || typeof res !== 'object') throw new Error('引擎回傳格式錯誤（必須為物件）。');
    if (!res.cards || !res.cards.length) throw new Error('引擎未回傳任何結果（cards 為空）。');
    if (res.chart && res.chart.type === 'pie' && !(res.chart.series && res.chart.series[0] && res.chart.series[0].data)) {
      throw new Error('pie 圖表必須提供 series[0].data（{name, value} 陣列）。');
    }
    return res;
  }

  /* 清理結果欄位（renderer 使用） */
  function sanitize(res) {
    var out = { cards: [], table: null, chart: null, notes: [] };
    out.cards = (res.cards || []).map(function (c) {
      return {
        label: c.label || '',
        value: c.value,
        format: c.format || 'text',
        sub: c.sub || '',
        emphasis: !!c.emphasis
      };
    });
    if (res.table) {
      out.table = {
        caption: res.table.caption || '',
        cols: res.table.cols || [],
        colFormats: res.table.colFormats || [],
        colWidths: res.table.colWidths || null,
        rows: res.table.rows || []
      };
    }
    if (res.chart) out.chart = res.chart;
    out.notes = (res.notes || []).map(function (s) { return String(s); });
    return out;
  }

  g.RECalcEngine = { register: register, get: get, has: has, run: run, sanitize: sanitize };
})(typeof window !== 'undefined' ? window : globalThis);
