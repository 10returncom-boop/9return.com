/* ============================================================
   site.js — 站點全域設定 config
   世界建築史 · Architecture Atlas
   模組化：設定集中於此，供 service / app 讀取
   ============================================================ */
window.SiteConfig = {
  name: '世界建築史',
  nameEN: 'Architecture Atlas',
  tagline: '從巨石到參數化 · 一座建築即一部文明史',
  version: 'V2.0',
  versionDate: '2026-10-03',
  lang: 'zh-Hant',
  themeStorageKey: 'archatlas.theme',
  settingsStorageKey: 'archatlas.settings',
  favStorageKey: 'archatlas.favs',
  historyStorageKey: 'archatlas.history',

  /* 站點分類（用於統計與篩選） */
  categories: [
    { id: 'ancient',   zh: '古文明建築', en: 'Ancient',   icon: 'pyramid' },
    { id: 'medieval',  zh: '中世紀建築', en: 'Medieval',  icon: 'castle' },
    { id: 'renbaroque',zh: '文藝復興與巴洛克', en: 'Renaissance & Baroque', icon: 'dome' },
    { id: 'modern',    zh: '近現代建築', en: 'Modern',    icon: 'tower' },
    { id: 'east',      zh: '東亞傳統',   en: 'East Asian', icon: 'pavilion' },
    { id: 'islamic',   zh: '伊斯蘭建築', en: 'Islamic',   icon: 'minaret' },
    { id: 'contemp',   zh: '當代與未來', en: 'Contemporary', icon: 'parametric' }
  ],

  /* 區域 */
  regions: [
    { id: 'africa',  zh: '非洲', en: 'Africa' },
    { id: 'europe',  zh: '歐洲', en: 'Europe' },
    { id: 'asia',    zh: '亞洲', en: 'Asia' },
    { id: 'america', zh: '美洲', en: 'America' },
    { id: 'middleeast', zh: '中東', en: 'Middle East' },
    { id: 'oceania', zh: '大洋洲', en: 'Oceania' }
  ],

  /* 主題組合 × 日夜 = 6 主題狀態
     combo: paper(米紙)/slate(岩板)/forest(松柏) × light/dark */
  themePresets: {
    paper: {
      light: { bg:'#f5efe3', surface:'#fffdf7', surface2:'#efe6d2', ink:'#2b2418', ink2:'#7a6a50', accent:'#8b5a2b', accent2:'#b8860b', border:'rgba(120,90,40,.18)' },
      dark:  { bg:'#191510', surface:'#231d15', surface2:'#2d251b', ink:'#efe7d6', ink2:'#b3a78e', accent:'#d9a05b', accent2:'#e6c07a', border:'rgba(220,190,130,.16)' }
    },
    slate: {
      light: { bg:'#eef1f4', surface:'#fbfcfe', surface2:'#e2e7ee', ink:'#1c2733', ink2:'#5c6b7a', accent:'#2c5f8a', accent2:'#4a90c2', border:'rgba(44,95,138,.18)' },
      dark:  { bg:'#10161d', surface:'#18222c', surface2:'#203040', ink:'#e6eef6', ink2:'#9fb2c4', accent:'#7fb2dd', accent2:'#a8d1ef', border:'rgba(130,180,215,.18)' }
    },
    forest: {
      light: { bg:'#eef3ea', surface:'#fbfdf8', surface2:'#e2ebdc', ink:'#22301f', ink2:'#5c6f52', accent:'#3f6b3a', accent2:'#6f9e63', border:'rgba(63,107,58,.18)' },
      dark:  { bg:'#11170f', surface:'#1a2417', surface2:'#26351f', ink:'#e8f0e2', ink2:'#a4b89a', accent:'#94c288', accent2:'#b6dba6', border:'rgba(150,195,135,.18)' }
    }
  },

  /* 字級範圍（clamp 用） */
  fontSize: { min: 12, max: 22, step: 1, default: 16 },

  /* 60 大功能清單（功能地圖） */
  features: [
    /* A 主題與外觀 */
    { id:'f01', grp:'主題與外觀', zh:'日夜主題切換', en:'Day/Night Theme',  desc:'淺色／深色一鍵切換' },
    { id:'f02', grp:'主題與外觀', zh:'跟隨系統主題', en:'Follow System',    desc:'自動偵測作業系統明暗偏好' },
    { id:'f03', grp:'主題與外觀', zh:'6 主題狀態',   en:'6 Theme States',   desc:'米紙/岩板/松柏 × 日夜，localStorage 記憶' },
    { id:'f04', grp:'主題與外觀', zh:'自訂強調色',   en:'Accent Color',     desc:'調色盤自訂站點強調色' },
    { id:'f05', grp:'主題與外觀', zh:'字級調整',     en:'Font Size',        desc:'A- / A+ 即時縮放全文' },
    { id:'f06', grp:'主題與外觀', zh:'版面密度',     en:'Layout Density',   desc:'舒適／緊湊兩種排版密度' },
    /* B 檢視模式 */
    { id:'f07', grp:'檢視模式', zh:'卡片檢視', en:'Card View',   desc:'圖文卡片瀑布流' },
    { id:'f08', grp:'檢視模式', zh:'清單檢視', en:'List View',   desc:'精簡條列式' },
    { id:'f09', grp:'檢視模式', zh:'網站地圖檢視', en:'Sitemap View', desc:'分類樹狀總覽' },
    { id:'f10', grp:'檢視模式', zh:'時間軸檢視', en:'Timeline',   desc:'依年代橫向時間軸' },
    /* C 導覽與搜尋 */
    { id:'f11', grp:'導覽與搜尋', zh:'全站即時搜尋', en:'Live Search', desc:'輸入即篩，含英文關鍵字' },
    { id:'f12', grp:'導覽與搜尋', zh:'分類篩選', en:'Category Filter', desc:'7 大分類過濾' },
    { id:'f13', grp:'導覽與搜尋', zh:'風格篩選', en:'Style Filter', desc:'30 種建築風格過濾' },
    { id:'f14', grp:'導覽與搜尋', zh:'區域篩選', en:'Region Filter', desc:'依世界區域過濾' },
    { id:'f15', grp:'導覽與搜尋', zh:'年代篩選', en:'Era Filter', desc:'依年代帶過濾' },
    { id:'f16', grp:'導覽與搜尋', zh:'我的最愛', en:'Favorites', desc:'收藏建築與文章' },
    { id:'f17', grp:'導覽與搜尋', zh:'最近造訪', en:'Recent Visits', desc:'自動記錄瀏覽歷史' },
    { id:'f18', grp:'導覽與搜尋', zh:'快速跳轉', en:'Quick Jump', desc:'下拉式定位任何文章' },
    { id:'f19', grp:'導覽與搜尋', zh:'建築知識庫', en:'Knowledge Base', desc:'系統性建築知識文章庫（SEO/AEO/GEO）' },
    { id:'f20', grp:'導覽與搜尋', zh:'麵包屑導航', en:'Breadcrumb', desc:'清楚所在位置' },
    { id:'f21', grp:'導覽與搜尋', zh:'鍵盤快捷鍵', en:'Shortcuts', desc:'/ 搜尋 · K 知識庫 · F 最愛 · Esc 關閉 · ←→ 翻頁' },
    /* D 資料工具 */
    { id:'f22', grp:'資料工具', zh:'分類統計', en:'Category Stats', desc:'各分類篇數即時統計' },
    { id:'f23', grp:'資料工具', zh:'匯出 CSV', en:'Export CSV', desc:'匯出文章清單 CSV' },
    { id:'f24', grp:'資料工具', zh:'匯出 JSON', en:'Export JSON', desc:'匯出結構化資料' },
    { id:'f25', grp:'資料工具', zh:'列印友好', en:'Print Friendly', desc:'乾淨列印版式' },
    { id:'f26', grp:'資料工具', zh:'複製文章', en:'Copy Article', desc:'一鍵複製全文' },
    { id:'f27', grp:'資料工具', zh:'閱讀進度條', en:'Reading Progress', desc:'頂部閱讀進度' },
    { id:'f28', grp:'資料工具', zh:'字數統計', en:'Word Count', desc:'文章字數／閱讀分鐘' },
    { id:'f29', grp:'資料工具', zh:'相關文章', en:'Related Articles', desc:'同分類智慧推薦' },
    /* E 文章閱讀 */
    { id:'f30', grp:'文章閱讀', zh:'文章目錄 TOC', en:'Table of Contents', desc:'章節錨點導航' },
    { id:'f31', grp:'文章閱讀', zh:'名詞註釋', en:'Glossary Tooltip', desc:'術語懸浮即時解說' },
    { id:'f32', grp:'文章閱讀', zh:'圖片燈箱', en:'Lightbox', desc:'點圖放大檢視' },
    { id:'f33', grp:'文章閱讀', zh:'代表建築', en:'Key Buildings', desc:'文章內代表建築清單' },
    { id:'f34', grp:'文章閱讀', zh:'建築師檔案', en:'Architects', desc:'相關建築師資料' },
    { id:'f35', grp:'文章閱讀', zh:'內文時間軸', en:'Inline Timeline', desc:'重要年代事件' },
    { id:'f36', grp:'文章閱讀', zh:'資料表格', en:'Data Tables', desc:'關鍵數據對照表' },
    { id:'f37', grp:'文章閱讀', zh:'上一則／下一則', en:'Prev/Next', desc:'連續閱讀導航' },
    /* F UI 元件 */
    { id:'f38', grp:'UI 元件', zh:'Breathe Clamp', en:'Breathe Clamp', desc:'多行文字收合＋展開按鈕' },
    { id:'f39', grp:'UI 元件', zh:'Toast 通知', en:'Toast', desc:'輕量操作回饋' },
    { id:'f40', grp:'UI 元件', zh:'Modal 彈窗', en:'Modal', desc:'聚焦式對話窗' },
    { id:'f41', grp:'UI 元件', zh:'Tooltip', en:'Tooltip', desc:'懸浮提示' },
    { id:'f42', grp:'UI 元件', zh:'Accordion 手風琴', en:'Accordion', desc:'折疊式內容區' },
    { id:'f43', grp:'UI 元件', zh:'Tabs 頁籤', en:'Tabs', desc:'分頁式內容' },
    { id:'f44', grp:'UI 元件', zh:'Carousel 輪播', en:'Carousel', desc:'重點建築輪播' },
    { id:'f45', grp:'UI 元件', zh:'回到頂部', en:'Back to Top', desc:'浮動返回按鈕' },
    { id:'f46', grp:'UI 元件', zh:'側邊欄', en:'Sidebar', desc:'可收合側邊導覽' },
    { id:'f47', grp:'UI 元件', zh:'Badge 標籤', en:'Badge', desc:'分類／年代標籤' },
    /* G 互動體驗 */
    { id:'f48', grp:'互動體驗', zh:'滾動揭示', en:'Scroll Reveal', desc:'進入視區淡入動畫' },
    { id:'f49', grp:'互動體驗', zh:'卡片收藏鈕', en:'Card Favorite', desc:'卡片即時收藏' },
    { id:'f50', grp:'互動體驗', zh:'分享按鈕', en:'Share', desc:'複製連結分享' },
    { id:'f51', grp:'互動體驗', zh:'熱門排序', en:'Sort', desc:'名稱／年代／精選排序' },
    { id:'f52', grp:'互動體驗', zh:'閱讀計時', en:'Read Timer', desc:'本頁停留計時' },
    { id:'f53', grp:'互動體驗', zh:'平滑捲動', en:'Smooth Scroll', desc:'錨點平滑過渡' },
    { id:'f54', grp:'互動體驗', zh:'深色自動應用', en:'Auto Dark', desc:'夜間自動套用深色' },
    /* H 系統與後設 */
    { id:'f55', grp:'系統後設', zh:'RWD 響應式', en:'Responsive', desc:'手機／平板／桌機完整適配' },
    { id:'f56', grp:'系統後設', zh:'防複製保護', en:'Copy Protect', desc:'可切換的複製保護' },
    { id:'f57', grp:'系統後設', zh:'UTF-8 編碼', en:'UTF-8', desc:'全站 UTF-8，繁中無亂碼' },
    { id:'f58', grp:'系統後設', zh:'繁中／English 雙語', en:'Bilingual', desc:'介面即時雙語切換' },
    { id:'f59', grp:'系統後設', zh:'localStorage 記憶', en:'Persistence', desc:'設定、最愛、歷史自動保存' },
    { id:'f60', grp:'系統後設', zh:'SEO 後設與結構', en:'SEO & Sitemap', desc:'Meta／JSON-LD／sitemap/robots' }
  ]
};
