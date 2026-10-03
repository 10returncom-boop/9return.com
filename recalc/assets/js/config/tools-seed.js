/* ============================================================
   config/tools-seed.js — 種子工具規格（3 支，模式範本）
   子代理實作前必讀：此檔示範欄位規格、group、select、textarea 用法
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    {
      id: 're_mortgage_equal',
      name: '房貸本息均攤試算',
      cat: 'cat_re_mortgage',
      icon: 'key',
      desc: '輸入貸款金額、年限與利率，計算每月還款金額、總繳利息，並以圖表呈現歷年本金與利息結構。',
      keywords: ['房貸', '本息均攤', '月付金', '利息', '攤還'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01, hint: '依銀行報價輸入，例如 2.2 代表年利率 2.2%' }
      ]
    },
    {
      id: 're_afford',
      name: '購屋能力試算（可負擔房價）',
      cat: 'cat_re_purchase',
      icon: 'home',
      desc: '依月收入、房貸條件與頭期款比例，推算可負擔的貸款額與房價上限，並比較不同利率下的差異。',
      keywords: ['購屋能力', '可負擔房價', '貸款', '頭期款', '收入'],
      fields: [
        { key: 'income', label: '月收入', type: 'number', default: 80000, unit: '元', min: 1, step: 5000 },
        { key: 'payRatio', label: '房貸支出上限', type: 'number', default: 30, unit: '%', min: 5, max: 60, step: 1, hint: '每月房貸支出佔月收入的比例上限（銀行常見上限約 30%~40%）' },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 20, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 'fin_compound',
      name: '複利試算',
      cat: 'cat_fin_saving',
      icon: 'coins',
      desc: '計算單筆本金在固定年報酬率與複利頻率下的期末本利和，並與單利結果比較成長曲線。',
      keywords: ['複利', '單利', '本利和', '投資', '成長'],
      fields: [
        { key: 'principal', label: '本金', type: 'number', default: 100000, unit: '元', min: 1, step: 10000 },
        { key: 'rate', label: '年報酬率', type: 'number', default: 5, unit: '%', min: 0, max: 30, step: 0.1 },
        { key: 'years', label: '投資年限', type: 'number', default: 20, unit: '年', min: 1, max: 60 },
        { key: 'freq', label: '複利頻率', type: 'select', default: 12,
          options: [
            { value: 12, label: '每月複利' },
            { value: 4, label: '每季複利' },
            { value: 2, label: '每半年複利' },
            { value: 1, label: '每年複利' }
          ] }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);
