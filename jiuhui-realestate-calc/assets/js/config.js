/* ============================================================
   九回房地 算算不動產 — 站點設定 config
   ============================================================ */
window.SITE = {
  brand: '九回房地 算算不動產',
  brandEn: 'REAL ESTATE · CALC',
  tagline: '算算網 × 都更危老 × 不動產開發 × 房屋買賣',
  contact: {
    name: '張書欣',
    line: '331.today',
    tel: '0968-222201',
    email: 'contact@9return.com',
    address: '台灣'
  },
  // 分主題多頁下拉導航
  nav: [
    { t: '首頁', url: 'index.html', icon: '⌂' },
    { t: '算算網', url: 'recalc.html', icon: '▤', sub: [
      { t: '房貸試算', url: 'recalc.html#mortgage' },
      { t: '購屋能力', url: 'recalc.html#afford' },
      { t: '稅務試算', url: 'recalc.html#tax' },
      { t: '投資報酬', url: 'recalc.html#roi' },
      { t: '儲蓄退休', url: 'recalc.html#save' }
    ]},
    { t: '都更危老網', url: 'urban-renewal.html', icon: '◧', sub: [
      { t: '都市更新', url: 'urban-renewal.html#urban' },
      { t: '危老重建', url: 'urban-renewal.html#danger' },
      { t: '投報分析', url: 'urban-renewal.html#roi' },
      { t: '容積獎勵', url: 'urban-renewal.html#bonus' },
      { t: '流程與時程', url: 'urban-renewal.html#process' }
    ]},
    { t: '不動產開發', url: 'development.html', icon: '▦', sub: [
      { t: '土地取得', url: 'development.html#acquire' },
      { t: '規劃設計', url: 'development.html#plan' },
      { t: '融資財報', url: 'development.html#finance' },
      { t: '營建施工', url: 'development.html#build' },
      { t: '銷售去化', url: 'development.html#sales' }
    ]},
    { t: '房屋買賣', url: 'home-buying.html', icon: '⌂', sub: [
      { t: '買賣流程', url: 'home-buying.html#flow' },
      { t: '契約與文件', url: 'home-buying.html#contract' },
      { t: '稅費成本', url: 'home-buying.html#tax' },
      { t: '風險檢查', url: 'home-buying.html#risk' },
      { t: '名詞速查', url: 'home-buying.html#terms' }
    ]},
    { t: '網站地圖', url: 'sitemap.html', icon: '≣' }
  ],
  footerLinks: [
    { h: '主題站', links: [
      { t: '算算網', u: 'recalc.html' }, { t: '都更危老網', u: 'urban-renewal.html' },
      { t: '不動產開發', u: 'development.html' }, { t: '房屋買賣', u: 'home-buying.html' }
    ]},
    { h: '資訊', links: [
      { t: '網站地圖', u: 'sitemap.html' }, { t: '首頁', u: 'index.html' }, { t: '關於本站', u: 'sitemap.html#about' }
    ]}
  ],
  tags: ['房貸試算','都市更新','危老重建','實價登錄','租金行情','土地開發','買賣流程','稅費','投資報酬','營建'],
  latestPosts: [
    { t: '112-114 年度房貸利率走勢總整理', d: '2026-10-02' },
    { t: '都更 vs 危老：重建方式一次看懂', d: '2026-09-28' },
    { t: '購屋稅費試算：契稅、土增稅、代書費', d: '2026-09-20' },
    { t: '不動產開發五大階段財務要點', d: '2026-09-12' }
  ]
};
