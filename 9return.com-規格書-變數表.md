# 9return.com 九回房地 — 完整規格書 ＆ 變數表

> 用途：作為全站樣式、主題、元件、響應式與導覽的**唯一參考依據**，方便直接修改。
> 目錄：`D:\_WWW_325_public\9return.com`　線上：`https://9return.com/`
> 最後更新：2026-10-04

---

## 1. 專案概覽

- **性質**：九回房地「全臺不動產知識整合站」入口（portal），把實價行情成交資料庫、全臺租金地圖與試算、都市更新投資報酬、營建土地開發流程、不動產×財務試算、世界建築史等主題收攏為單一專業入口。
- **技術**：純靜態 HTML + CSS + JavaScript，無後端、無追蹤碼；中文走 `miaoda.feishu.cn` 載入 Noto Serif TC / Noto Sans TC 網路字型。
- **作者／版權**：`張書欣`；頁尾聯絡為舒安境工作室（Line: 331.today／Tel: 0968-222201／`10return.com@gmail.com`）。
- **theme-color**：`#14120e`。
- **全站風格基調**：暖米白底（`#f7f4ec`）、深墨綠主色（`#2f4a35`）、古銅金點綴（`#b08a4a`）、襯線標題 + 無襯線內文，整體專業沉穩。

---

## 2. 檔案／目錄結構

大型入口站（83 個 HTML、3 個獨立 CSS、12 個子目錄）。此規格書聚焦**站級主結構與主題變數**，不窮舉每個知識子頁。

```
9return.com/
├── index.html                        首頁入口（9return.com/，內嵌 :root 主題）
├── 姊妹站_不動產知識百科.html          不動產知識百科（姊妹站總覽）
├── recalc/                           九回算算網（不動產×財務試算，含 assets/css/main.css）
├── architecture-atlas/               世界建築史（含 css/style.css + knowledge/ 約30篇）
├── classic-architecture/             中國經典建築 10 案例 + sitemap
├── counties/                         8 縣市行情頁（臺北/新北/桃園/臺中/臺南/高雄/新竹/嘉義/彰化）
├── hongloumeng/                      紅樓夢主題（index + about）
├── jiuhui-realestate-calc/           不動產試算工具站（含 assets/css/main.css，日夜主題）
├── land-development-handbook/         土地開發流程百科（含 articles/ 3 篇）
├── rent-map-calculator/              全臺租金地圖（含 articles/ 3 篇）
├── transaction-price-database/       實價行情成交資料庫（含 articles/ 3 篇）
├── urban-renewal-roi-calculator/     都市更新 ROI（含 articles/ 3 篇 + LandVol*.html）
└── assets/                           首頁圖檔（bg.webp、hero-portal.webp、card-*.webp、arch.webp 等）
```

**根首頁 6 大主題卡（JS `SITES` 陣列渲染）：**

| 序 | 分類 | 主題站名 | 連結 |
|---|---|---|---|
| No.1 | 土地都更與開發 | 營建土地開發流程百科 | `land-development-handbook/` |
| No.2 | 建築 | 世界建築史 Architecture Atlas | `architecture-atlas/` |
| — | 試算工具 | 九回算算網 | `recalc/` |
| — | 市場與交易 | 不動產區段行情成交資料庫 | `transaction-price-database/` |
| — | 市場與交易 | 全臺租金行情地圖與試算 | `rent-map-calculator/` |
| — | 土地都更與開發 | 都市更新投資報酬分析 | `urban-renewal-roi-calculator/` |

---

## 3. 主題機制總表

| 區塊 | 主題機制 | 預設 | 切換方式 | 變數所在 |
|---|---|---|---|---|
| 根首頁 index.html | 僅淺色（無切換） | 白天暖米 | — | 內嵌 `<style>:root` |
| recalc/ 九回算算網 | `:root[data-theme="light"/"dark"]` | 白天 | `.theme-switch` 按鈕切 `html[data-theme]` | `assets/css/main.css` |
| jiuhui-realestate-calc/ | `:root` ＋ `html[data-theme="dark"]`（跟隨系統） | 白天 | 切 `html[data-theme]` | `assets/css/main.css` |
| architecture-atlas/ | 基礎 `:root`，主題由 theme.js 依 combo+mode 注入（6 狀態＝3 組合×日夜） | 由 theme.js 決定 | 介面切換 | `css/style.css` |
| 其他子目錄 | 多沿用根站暖米綠色系內嵌樣式 | 白天 | — | 各頁內嵌 |

> 根首頁本身**沒有日夜切換**，固定暖米淺色；日夜主題只出現在 recalc 與 jiuhui 兩個試算子站。

---

## 4. 全站變數表（CSS Custom Properties）

### 4.1 根首頁 index.html（白天暖米綠，20 個變數）

變數來源：index.html 內嵌 `<style>` 的 `:root{…}`。

| 變數 | 值 | 用途 |
|---|---|---|
| `--bg` | `#f7f4ec` | 頁面主背景（暖米） |
| `--surface` | `#fffdf7` | 卡片／面板表面 |
| `--surface2` | `#efe9db` | 次要表面（hover、按鈕底） |
| `--ink` | `#243028` | 主要文字（深墨綠） |
| `--muted` | `#6d776d` | 次要文字 |
| `--faint` | `#9aa49a` | 弱化文字 |
| `--line` | `#e2dccd` | 邊框線 |
| `--line2` | `#d5cdbb` | 強邊框（按鈕、輸入框） |
| `--accent` | `#2f4a35` | **主色（深墨綠）** |
| `--accent2` | `#3d5c44` | 主色亮階（brand 漸層、hover） |
| `--gold` | `#b08a4a` | 古銅金（標籤字、徽章） |
| `--gold-soft` | `#d9c9a6` | 金淺底（hero eyebrow） |
| `--serif` | `'Noto Serif TC',Georgia,'Songti TC',serif` | 標題字型 |
| `--sans` | `'Noto Sans TC','Microsoft JhengHei',system-ui,sans-serif` | 內文字型 |
| `--shadow` | `0 1px 2px rgba(40,50,40,.05),0 10px 30px rgba(40,50,40,.07)` | 卡片陰影 |
| `--shadow-lg` | `0 20px 50px rgba(40,50,40,.12)` | 浮層／下拉陰影 |
| `--radius` | `14px` | 卡片圓角 |
| `--maxw` | `1180px` | 內容最大寬度 |

### 4.2 architecture-atlas／世界建築史（暖棕，基礎 :root）

變數來源：`architecture-atlas/css/style.css` 的 `:root{…}`；主題色由 `theme.js` 依 combo+mode 注入覆寫。

| 變數 | 值 | 用途 |
|---|---|---|
| `--bg` | `#f5efe3` | 主背景（米色） |
| `--surface` | `#fffdf7` | 表面 |
| `--surface2` | `#efe6d2` | 次表面 |
| `--ink` | `#2b2418` | 主要文字 |
| `--ink2` | `#7a6a50` | 次要文字 |
| `--accent` | `#8b5a2b` | 主色（赭棕） |
| `--accent2` | `#b8860b` | 次強調（暗金） |
| `--border` | `rgba(120,90,40,.18)` | 邊框 |
| `--fs-base` | `16px` | 基礎字級 |
| `--radius` | `14px` | 圓角 |
| `--shadow` | `0 6px 24px rgba(0,0,0,.08)` | 陰影 |
| `--shadow-lg` | `0 14px 40px rgba(0,0,0,.14)` | 強陰影 |
| `--serif` | `'Noto Serif TC',serif,'Microsoft JhengHei',system-ui,sans-serif` | 標題字型 |
| `--sans` | `'Noto Sans TC',sans-serif,'Microsoft JhengHei',system-ui` | 內文字型 |

密度變數（`[data-density]`）：

| 狀態 | 變數值 |
|---|---|
| `[data-density="compact"]` | `--pad-lg:14px; --pad-md:10px; --gap:10px; --card-pad:12px; --card-img-h:110px` |
| `[data-density="comfort"]` | `--pad-lg:26px; --pad-md:18px; --gap:18px; --card-pad:18px; --card-img-h:150px` |

### 4.3 jiuhui-realestate-calc／不動產試算（日夜雙主題）

變數來源：`jiuhui-realestate-calc/assets/css/main.css`。

**白天 `:root`（預設）：**

| 變數 | 值 |
|---|---|
| `--bg` | `#f6f3ea` |
| `--surface` | `#ffffff` |
| `--surface2` | `#efe9db` |
| `--surface3` | `#e7dfcd` |
| `--text` | `#2b2b28` |
| `--text2` | `#6b6a63` |
| `--accent` | `#2f4a35` |
| `--accent2` | `#b08a4a` |
| `--accent-soft` | `#d9c9a6` |
| `--gold` | `#b08a4a` |
| `--line` | `#e2dccd` |
| `--line2` | `#d5cdbb` |
| `--danger` | `#a43a2e` |
| `--ok` | `#3a7a4a` |
| `--shadow` | `0 2px 12px rgba(40,35,25,.10)` |
| `--shadow2` | `0 6px 24px rgba(40,35,25,.14)` |
| `--header-bg` | `rgba(246,243,234,.92)` |
| `--code-bg` | `#efe9db` |

**夜晚 `html[data-theme="dark"]`：**

| 變數 | 值 |
|---|---|
| `--bg` | `#161a16` |
| `--surface` | `#1e241d` |
| `--surface2` | `#272e25` |
| `--surface3` | `#2f382c` |
| `--text` | `#e8e6dc` |
| `--text2` | `#a8a99f` |
| `--accent` | `#7fae88` |
| `--accent2` | `#d3b375` |
| `--accent-soft` | `#4a5c41` |
| `--gold` | `#d3b375` |
| `--line` | `#333c30` |
| `--line2` | `#404a3c` |
| `--danger` | `#d77a6a` |
| `--ok` | `#7fca8f` |
| `--shadow` | `0 2px 14px rgba(0,0,0,.35)` |
| `--shadow2` | `0 8px 28px rgba(0,0,0,.45)` |
| `--header-bg` | `rgba(22,26,22,.9)` |
| `--code-bg` | `#272e25` |

### 4.4 recalc／九回算算網（藍灰專業試算，日夜雙主題）

變數來源：`recalc/assets/css/main.css`。

**白天 `:root, :root[data-theme="light"]`（預設）：**

| 變數 | 值 | 用途 |
|---|---|---|
| `--bg` | `#F3F5F7` | 主背景（冷灰） |
| `--bg-2` | `#EAEEF2` | 次背景 |
| `--surface` | `#FFFFFF` | 表面 |
| `--surface-2` | `#F7F9FB` | 次表面 |
| `--surface-3` | `#EEF2F6` | 第三層表面 |
| `--border` | `#DCE2E9` | 邊框 |
| `--border-strong` | `#C3CDD7` | 強邊框 |
| `--divider` | `#E7EBF0` | 分隔線 |
| `--text` | `#182331` | 主要文字 |
| `--text-2` | `#45566B` | 次要文字 |
| `--text-3` | `#7C8DA0` | 弱化文字 |
| `--primary` | `#0D5C7A` | **主色（深青藍）** |
| `--primary-strong` | `#0A4B66` | 深青藍 |
| `--primary-soft` | `rgba(13,92,122,0.10)` | 主色淺底 |
| `--primary-softer` | `rgba(13,92,122,0.06)` | 主色更淺底 |
| `--gold` | `#B98A2F` | 金 |
| `--gold-soft` | `rgba(185,138,47,0.13)` | 金淺底 |
| `--teal` | `#0E7A6C` | 青綠 |
| `--teal-soft` | `rgba(14,122,108,0.12)` | 青綠淺底 |
| `--danger` | `#C24141` | 警示紅 |
| `--danger-soft` | `rgba(194,65,65,0.10)` | 紅淺底 |
| `--success` | `#2E7D5B` | 成功綠 |
| `--success-soft` | `rgba(46,125,91,0.12)` | 綠淺底 |
| `--shadow-sm/md/lg` | `0 1px 2px …/0 6px 18px …/0 16px 40px …` | 三級陰影 |
| `--topbar-bg` | `rgba(243,245,247,0.86)` | 頂欄半透明底 |
| `--hero-grid` | `rgba(13,92,122,0.07)` | hero 網格紋 |
| `--c1`～`--c8` | `#0D5C7A/#B98A2F/#0E7A6C/#7A5BB8/#C24141/#3E7FA8/#C98A4B/#5B8C4A` | 圖表 8 色 |
| `--chart-text` | `#45566B` | 圖表文字 |
| `--chart-grid` | `#E3E9EF` | 圖表格線 |

**夜晚 `:root[data-theme="dark"]`：**

| 變數 | 值 |
|---|---|
| `--bg` | `#0D1319` |
| `--bg-2` | `#10171F` |
| `--surface` | `#141C25` |
| `--surface-2` | `#18212C` |
| `--surface-3` | `#1E2835` |
| `--border` | `#26323F` |
| `--border-strong` | `#34424F` |
| `--divider` | `#202B37` |
| `--text` | `#E6EDF4` |
| `--text-2` | `#A9B9C9` |
| `--text-3` | `#718397` |
| `--primary` | `#3E9CC4` |
| `--primary-strong` | `#57AFD4` |
| `--primary-soft` | `rgba(62,156,196,0.16)` |
| `--primary-softer` | `rgba(62,156,196,0.08)` |
| `--gold` | `#D9A64A` |
| `--gold-soft` | `rgba(217,166,74,0.16)` |
| `--teal` | `#3BBFAE` |
| `--teal-soft` | `rgba(59,191,174,0.16)` |
| `--danger` | `#E06C6C` |
| `--danger-soft` | `rgba(224,108,108,0.14)` |
| `--success` | `#5BB98C` |
| `--success-soft` | `rgba(91,185,140,0.16)` |
| `--topbar-bg` | `rgba(13,19,25,0.86)` |
| `--hero-grid` | `rgba(62,156,196,0.08)` |
| `--c1`～`--c8` | `#3E9CC4/#D9A64A/#3BBFAE/#A78BEA/#E06C6C/#5FA8C4/#C98A4B/#7CB87A` |
| `--chart-text` | `#A9B9C9` |
| `--chart-grid` | `#26323F` |

---

## 5. 元件規格

### 5.1 頂欄與品牌（.topbar / .brand）
- `.topbar`：`position:sticky; top:0; z-index:100; background:rgba(247,244,236,.86); backdrop-filter:blur(10px)`。
- `.brand .mark`：38×38、圓角 10px、`background:linear-gradient(145deg,var(--accent),var(--accent2))`、字色 `#f4efe2`。
- `.brand .t`：`--serif`、19px、weight 900；小字 10.5px、letter-spacing .22em。

### 5.2 下拉選單（.nav-dd）
- `.nav-dd-btn`：1px 邊框、`--surface2` 底、hover 轉 `--accent` 底 `#f4efe2` 字。
- `.nav-dd-menu`：絕對定位、`--surface` 底、`--shadow-lg`、預設隱藏，`.open` 時 `display:flex` 下拉。

### 5.3 Hero（.hero）
- `.hero-bg`：`background:url('assets/bg.webp') center/cover`。
- `.hero-veil`：`linear-gradient(100deg,rgba(25,38,28,.86) 0%,rgba(25,38,28,.55) 48%,rgba(25,38,28,.25) 100%)`。
- `.hero h1`：`--serif`、`clamp(30px,5.2vw,52px)`、weight 900。
- `.chip`：`background:#2f4a35; color:#fff; border-radius:30px; border:1px solid rgba(255,255,255,.28)`；hover 轉 `#3f6b4a` 上移 2px。

### 5.4 主題卡片（.card）
- `.cards`：`grid-template-columns:repeat(2,1fr); gap:22px`。
- `.card`：白底、`var(--radius)` 圓角、`var(--shadow)`、hover 上移 4px＋`--shadow-lg`。
- 縮圖 `.th`：高 160px，依 class 換 `assets/card-market.webp`／`card-rent.webp`／`card-urban.webp`／`card-land.webp`／`card-recalc.webp`／`arch.webp`。
- `.card .no`：右上金漸層徽章 `linear-gradient(135deg,#b08a4a,#8a5a2e)`。

### 5.5 浮動控制台（.fdd）
- 位置：`position:fixed; right:20px; bottom:22px; z-index:900`。
- `.fdd-fab`：54×54 圓鈕、深綠漸層底、白字。
- 面板內含「回到頂部／列印／全螢幕／隨機主題」四鈕與站內導覽連結。

### 5.6 浮動站內導覽（.floating-nav）
- 位置：`position:fixed; left:16px; bottom:16px; z-index:9999`。
- `.fn-toggle`：56×56 圓鈕、白底漸層、標「導覽」。
- 面板 `.fn-panel`：寬 252px，列出 6 主題＋「回首頁」＋「上一頁」。

---

## 6. 響應式／手機規格

根首頁斷點（index.html 內嵌 `<style>`）：

| 斷點 | 規則 |
|---|---|
| `@media(max-width:900px)` | `.cards` 維持 2 欄；`.foot-in` 改 2 欄；導覽連結觸控目標 min-height 44px |
| `@media(max-width:640px)` | `.cards` 改 1 欄；頂欄換行、導覽橫向捲動；搜尋框滿寬；`.foot-in` 改 1 欄；`.banner` 高 200px；浮動面板縮為 `min(88vw,290px)` |
| `@media(max-width:480px)` | `.wrap` 左右padding 16px；hero padding 縮減；`.sec-head` 直排；卡片縮圖 `.th` 高 128px；浮動導覽面板寬 210px |
| `@media(max-width:640px)`（.nav-dd-menu） | 下拉選單改左對齊、寬 `min(88vw,300px)` |

各子站斷點：

| 子站 | 斷點 |
|---|---|
| architecture-atlas | `1020px`／`640px`／`print` |
| jiuhui-realestate-calc | `900px`／`880px`／`600px`／`560px`／`520px` |
| recalc | `1024px`／`760px`／`420px`／`prefers-reduced-motion`／`print` |

---

## 7. 導覽／連結規格

- `canonical`／`og:url`：`https://9return.com/`。
- `og:site_name`：`9return.com`；`og:image`：`https://9return.com/assets/hero-portal.webp`。
- 姊妹站連結：`姊妹站_不動產知識百科.html`。
- 6 大主題站連結（首頁卡片＋選單＋浮動導覽一致）：
  - `land-development-handbook/`、`architecture-atlas/`、`recalc/`、`transaction-price-database/`、`rent-map-calculator/`、`urban-renewal-roi-calculator/`。
- 浮動站內導覽：「回首頁」→ `index.html`；「上一頁」→ `history.back()`。
- 頁尾聯絡信箱：`10return.com@gmail.com`。

---

## 8. 修改指引（速查）

- **改全站主色**：改根首頁 `:root` 的 `--accent`／`--accent2`；試算子站改 `jiuhui` 或 `recalc` 各自 `main.css` 的 `--accent`／`--primary`。
- **改卡片縮圖**：替換 `assets/card-*.webp`（market／rent／urban／land／recalc）與 `arch.webp`。
- **改 hero 背景**：替換 `assets/bg.webp`（首頁 hero）與 `assets/hero-portal.webp`（主題橫幅）。
- **改日夜主題**：recalc／jiuhui 改各自 CSS 的 `:root` 與 `[data-theme="dark"]` 兩段；根首頁無切換、固定白天。
- **改手機顯示**：改第 6 節對應 `@media` 區塊。
- **加新主題卡**：在 index.html 的 JS `SITES` 陣列新增一筆（no／cat／name／desc／cls／href／tags），卡片、搜尋、sitemap、頁尾連結會自動同步渲染。

---

## 9. 已知事項／待決

- 大型入口站（83 HTML），本規格書僅收錄站級主結構與 3 個集中 CSS 的主題變數；各知識子頁（knowledge/、articles/、counties/ 等）沿用母站樣式，未逐頁列舉。
- architecture-atlas 的主題色由 `theme.js` 依 combo+mode 動態注入（6 主題狀態），`css/style.css` 的 `:root` 僅為基礎預設值。
- 根首頁無日夜切換；日夜主題僅在 recalc 與 jiuhui-realestate-calc 兩個試算子站提供。
- 依你的規則，本機改動未經確認不執行 `git push`。
