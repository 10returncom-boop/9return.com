# 九回房地 算算不動產

> 全臺不動產知識與工具入口｜分主題多頁網站

## 版本
v1.0（2026-10-03）｜規劃 設計 開發 整合：張書欣（LINE: 331.today · TEL: 0968-222201）

## 站點位置
`D:\www\九回房地算算不動產\`

## 頁面結構（分主題多頁＋下拉導航）
| 頁面 | 檔名 | 內容 |
|---|---|---|
| 首頁 | index.html | Hero、統計、主題卡片、Tabs、FAQ Accordion、訂閱 |
| 算算網 | recalc.html | 試算分類、房貸試算表單（可計算）、時間軸 |
| 都更危老網 | urban-renewal.html | 都更/危老/容積 Tabs、投報 Accordion、流程時間軸 |
| 不動產開發 | development.html | Dashboard layout＋Sidebar、五大階段、成本表、時間軸、相關/前後篇 |
| 房屋買賣 | home-buying.html | 買賣流程時間軸、契約文件、稅費表、風險檢查清單、名詞 Tree-view、註冊表單 |
| 網站地圖 | sitemap.html | Tree-view 全站地圖、主題分類、關於本站、聯絡表單 |

## 元件（對應需求清單）
menu／網站地圖／首頁／算算網／都更危老網／不動產開發／房屋買賣
- 導航類：dropdown-menu、sticky-nav、top-nav、hamburger、mobile-menu、sidebar、breadcrumb、header、footer
- 內容類：accordion、tab、time-line、tag-cloud、social-icons、contact-info、latest-posts、tree-view、related-post、prev-next、category
- 互動類：back-to-top、fab、context-menu、popover、ui-dropdown、favorite、register-form、subscribe、email-sub、form-submit
- 手機導航：浮動站內導覽 dock（每頁：站內導覽 dropdown＋回上一頁＋首頁，RWD 全裝置顯示）
- SEO/效能/保護：canonical、favicon、theme-color、meta-viewport、meta-utf8、lazy-load-adv、anti-copy、protection
- 佈局/響應：dashboard-layout、RWD、hover

## 主題
- 日夜主題切換（手動按鈕 ☀/☾），含「跟隨系統」，localStorage 記憶（key: `9r-theme`）
- 白天：暖米白＋深墨綠＋金；夜晚：深綠黑底

## 圖影素材提示詞
| 資產 | 用途 | 提示詞要點 |
|---|---|---|
| assets/img/favicon.svg | 站點 icon | 「算」字，深綠→金漸層圓角方 |
| assets/css/main.css | 全域樣式 | 日夜主題變數、全部元件、RWD |

## 技術
- 純靜態 HTML/CSS/JS，無後端依賴
- 模組化拆分：`config.js`（站點設定/導航/頁尾資料）＋ `app.js`（元件行為）＋ `main.css`
- 房貸試算、風險檢查、主題切換、收藏、表單驗證皆為可執行示範

---

## 圖影素材提示詞（卡片質感圖 webp）

| 卡片 | 檔案 | 提示詞（簡述） |
|---|---|---|
| 算算網 | assets/img/card-recalc.webp | 現代住宅＋計算器財務柱狀圖＋金色房子印章，深綠→暖黃漸層，扁平質感插畫 |
| 都更危老網 | assets/img/card-urban.webp | 舊樓經黃色塔吊吊裝更新為新高樓＋規劃圖＋安全帽，深綠→暖橙漸層 |
| 不動產開發 | assets/img/card-land.webp | 土地上的藍色建築藍圖＋圓規卷尺＋樹苗＋塔吊剪影，深綠→暖黃漸層 |
| 房屋買賣 | assets/img/card-buy.webp | 現代住宅前懸掛金鑰匙＋房契＋握手印章＋小星，深綠→暖金漸層 |

- 全部：16:9、扁平質感插畫、畫面零文字、1200×675 webp (quality 88)。