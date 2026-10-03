/* ============================================================
   config/categories.js — 分類定義（14 大分類）
   - g.RECalcConfig 陣列於此初始化（工具切片檔 push 於此之後）
   ============================================================ */
(function (g) {
  'use strict';

  g.RECalcConfig = g.RECalcConfig || [];
  g.RECalcCategories = [
    { id: 'cat_re_mortgage', name: '房貸試算', domain: 're', icon: 'key', desc: '本息均攤、本金平均、寬限期、利率比較、提前還款與房貸總成本。' },
    { id: 'cat_re_purchase', name: '購屋規劃', domain: 're', icon: 'home', desc: '購屋能力、頭期款、租屋 vs 購屋、租金投報率與資本化率。' },
    { id: 'cat_re_invest', name: '投資槓桿', domain: 're', icon: 'trend', desc: '槓桿倍數、轉售報酬、翻修、法拍屋、店面、商用與多套房現金流。' },
    { id: 'cat_re_tax', name: '稅務費用', domain: 're', icon: 'doc', desc: '房屋稅、地價稅、契稅、印花稅、土地增值稅與房地合一稅。' },
    { id: 'cat_re_area', name: '坪數建物', domain: 're', icon: 'ruler', desc: '坪數換算、公設比、陽台登記、預售屋付款、裝潢與建材估價。' },
    { id: 'cat_re_holding', name: '持有管理', domain: 're', icon: 'shield', desc: '社區管理費、物業管理費、火險、地震險、淹水險與持有成本總覽。' },
    { id: 'cat_fin_saving', name: '存款儲蓄', domain: 'fin', icon: 'piggy', desc: '單利、複利、定期定額、儲蓄目標、定存、通膨與購買力。' },
    { id: 'cat_fin_budget', name: '預算記帳', domain: 'fin', icon: 'wallet', desc: '預算規劃、50/30/20 記帳分配與支出比率分析。' },
    { id: 'cat_fin_debt', name: '貸款負債', domain: 'fin', icon: 'card', desc: '車貸、信貸、學貸、卡債循環利息、分期付款與負債比率。' },
    { id: 'cat_fin_ins', name: '保險規劃', domain: 'fin', icon: 'umbrella', desc: '定期壽險、終身壽險、醫療險與儲蓄險的保障與成本試算。' },
    { id: 'cat_fin_retire', name: '退休規劃', domain: 'fin', icon: 'flag', desc: '退休金需求、年金、勞退新制、財務自由（FIRE）與被動收入。' },
    { id: 'cat_fin_invest', name: '投資理財', domain: 'fin', icon: 'chart', desc: '資產配置、ETF、股票、本益比、殖利率、債券、匯率與黃金。' },
    { id: 'cat_fin_analysis', name: '財務分析', domain: 'fin', icon: 'calc', desc: 'IRR、NPV、DCF、ROE、EPS、夏普比率、波動率與停損獲利管理。' },
    { id: 'cat_fin_tax', name: '稅務試算', domain: 'fin', icon: 'scale', desc: '綜合所得稅、薪資扣繳、遺產稅與二代健保補充保費。' }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
