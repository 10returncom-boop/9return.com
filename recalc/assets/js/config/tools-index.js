/* ============================================================
   config/tools-index.js — 工具彙總索引
   - 彙整所有 config 切片 → RECalc.tools / byId / categories / domains
   - 若工具 id 重複會直接拋錯（載入期即發現）
   ============================================================ */
(function (g) {
  'use strict';

  var config = g.RECalcConfig || (g.RECalcConfig = []);
  var catDefs = g.RECalcCategories || [];

  var byId = {};
  var tools = [];
  config.forEach(function (t) {
    if (byId[t.id]) throw new Error('工具 id 重複：' + t.id);
    byId[t.id] = t;
    tools.push(t);
  });

  /* 依分類＋名稱排序 */
  tools.sort(function (a, b) {
    var ka = a.cat + '|' + a.name, kb = b.cat + '|' + b.name;
    return ka < kb ? -1 : (ka > kb ? 1 : 0);
  });

  var catCounts = {};
  tools.forEach(function (t) { catCounts[t.cat] = (catCounts[t.cat] || 0) + 1; });

  var categories = catDefs.map(function (c) {
    return {
      id: c.id, name: c.name, domain: c.domain, icon: c.icon, desc: c.desc,
      count: catCounts[c.id] || 0,
      tools: tools.filter(function (t) { return t.cat === c.id; })
    };
  });

  var domains = {
    re: { key: 're', name: '不動產類', count: 0, cats: [] },
    fin: { key: 'fin', name: '財務管理類', count: 0, cats: [] }
  };
  categories.forEach(function (c) {
    domains[c.domain].count += c.count;
    domains[c.domain].cats.push(c);
  });

  var RECalc = {
    tools: tools,
    byId: byId,
    categories: categories,
    domains: domains,
    total: tools.length,
    hot: ['re_mortgage_equal', 'fin_compound', 're_afford', 're_rent_yield', 'fin_regular_saving', 'fin_fire', 'fin_income_tax', 're_rent_vs_buy']
  };

  g.RECalc = RECalc;
})(typeof window !== 'undefined' ? window : globalThis);
