# 台中重劃區與建案指南

一個知識整理性質的靜態示範網站：把台中市主要重劃區與代表性新建案，用「一頁一區、一建案一頁、大白話」的方式講清楚開發方式、歷史、交通、生活機能與房市觀察。全站繁體中文，無後端、無資料庫，以 Sub-folder 架構＋一支 build.py 組裝而成。

- **版本**：v1.0.0
- **建置日期**：2026-10-07
- **品牌主色**：#0E6B5C（墨綠）
- **內容範圍**：台中市 10 個行政區、22 個主要重劃區、58 個代表性新建案

> 本站為示範性質的知識整理網站，**非不動產經紀業、非投資建議**；所有數字皆標註來源或標記「待補」，購屋前請以內政部實價登錄與現場看屋為準。

---

## 功能清單

- **日夜主題跟隨系統**：淺色／深色／跟隨系統三段切換，選擇存於瀏覽器本機。
- **側邊欄**：桌面端樹狀導覽（依行政區分組的重劃區樹）＋行動端抽屜（drawer）選單＋漢堡鈕。
- **麵包屑**：每頁皆有，層級為 首頁 →（分類索引）→ 當頁。
- **RWD 響應式**：桌機／平板／手機單一程式碼，卡片牆自動換行、表格可橫滑。
- **防複製**：正文區禁止右鍵選單與文字複製（示範性）。
- **全站搜尋**：頂框即時搜尋（輸入即跳結果），`all_zone_search.html` 提供完整搜尋結果與分頁。
- **收藏**：每頁星號收藏鈕，`favorite_zone_list.html` 集中管理；收藏存於瀏覽器 localStorage。
- **多面向篩選**：依行政區（county/district 別名）、開發方式、標籤篩選重劃區卡片；建案卡片依行政區／所屬重劃區篩選。
- **相關文章**：區頁依同行政區帶出相關重劃區。
- **時間軸**：區頁「開發歷程」以時間軸呈現。
- **Accordion**：FAQ、注意事項等摺疊區塊（單開模式）。
- **JSON-LD / AEO**：每頁內嵌結構化資料（WebSite / CollectionPage / BreadcrumbList / ItemList / Article / FAQPage）。
- **其他**：回到頂部／回首頁／回上頁浮動鈕、context menu、tag cloud、知識圖譜（KG）、treemap 行政區分布。

---

## 架構

採 **Sub-folder（每分類一個資料夾）＋ build.py 組裝**的純靜態架構：

```
taichung_redevelopment_guide/
├── index.html                 # 首頁（hero／[data-cards]／facet／樹狀側欄／KG／tagcloud／latest）
├── all_zone_search.html       # 全站搜尋與篩選結果頁
├── favorite_zone_list.html    # 我的收藏清單
├── about_rezone_guide.html    # 關於本站、訂閱／註冊／聯絡表單、FAQ、免責聲明
├── build.py                   # 組裝腳本（讀 data/*.json → 產生搜尋索引與驗證）
├── README.md
├── robots.txt                 # build.py 產生
├── sitemap.xml                # build.py 產生
├── css/
│   └── main.css               # 全站樣式（含 10 行政區＋建案配色變數 light/dark）
├── js/
│   ├── search-index.js         # build.py 產生（勿手改）：RZ_ZONES / TC_PROJECTS / RZ_COUNTIES …
│   └── main.js                 # 全站互動（搜尋／篩選／收藏／卡片渲染／KG／主題）
├── data/                      # 內容代理產生的原始資料（唯讀合併）
│   ├── zones-t1.json … zones-t7.json
│   └── projects-t1.json … projects-t7.json
├── zones/
│   ├── index.html              # 重劃區索引 pillar（hero＋[data-cards]＋行政區篩選）
│   ├── _TEMPLATE_ZONE.html     # 重劃區頁主骨架（共享頭尾標準）
│   └── taichung_*.html        # 22 個重劃區內容頁
├── projects/
│   ├── index.html              # 建案索引（hero＋[data-pcards]＋依重劃區篩選）
│   ├── _TEMPLATE_PROJECT.html # 建案頁主骨架
│   └── *.html                  # 58 個建案內容頁
├── images/                     # 全站圖片（hero／卡片縮圖，已壓縮 <400KB）
└── docs/
    ├── PATTERN.md              # 全站規格（目錄／資料 schema／22 區命名與行政區鍵值）
    ├── tools/img_proc.py       # 圖片下載＋壓縮工具
    └── image-prompts/          # 圖片提示詞記錄（見下）
```

### 重新建置步驟

每當 `data/zones-*.json`、`data/projects-*.json` 或任何 `zones/*.html`、`projects/*.html` 內容頁有更動後，於**根目錄**執行：

```powershell
python build.py
```

build.py 會：
1. 讀取 `data/zones-*.json`＋`data/projects-*.json`，合併產生 `js/search-index.js`（`RZ_SITE`／`RZ_COUNTIES`／`RZ_DEV_TYPES`／`RZ_ZONES`／`TC_PROJECTS`／`RZ_SEARCH_INDEX`／`RZ_ORDER`）。
2. 產生 `sitemap.xml` 與 `robots.txt`。
3. 掃描全站本地連結與圖片，做 404／缺圖驗證，輸出問題清單（`BUILD DONE ok=False` 代表有待修項目，需判斷是「內容尚未齊」或「頁面真錯誤」）。

> 產生 `search-index.js` 後，全站每頁的搜尋、相關文章、前後篇與收藏即自動生效，無需逐頁手改。

---

## 行政區與分類

全站行政區 10 鍵（CSS 變數前綴 `--c-*`）：

| 鍵 | 行政區 | 變數色 |
|---|---|---|
| xitun | 西屯區 | #1F7A5C |
| nantun | 南屯區 | #3E8E6E |
| beitun | 北屯區 | #0E6B5C |
| south | 南區 | #2E8B7A |
| east | 東區 | #5A8F6E |
| wuri | 烏日區 | #4A9078 |
| taiping | 太平區 | #B0713B |
| dali | 大里區 | #A85E3C |
| shalu | 沙鹿區 | #C08A4A |
| fengyuan | 豐原區 | #9A6B3F |
| —（建案） | projects | #D98E4A |

> 分類備註：**單元六**屬南屯區（大慶地區，自辦單元已併入十三期）；**九期＝九期旱溪市地重劃**屬東區（旱溪、大里溪流域）。行政區鍵同時接受網址參數 `?county=` 與別名 `?district=`。

---

## 圖片風格與提示詞

全站 hero／卡片插畫統一風格：**橫版等角鳥瞰扁平都市計畫插畫、米白泛黃紙面底色、墨綠＋青綠主色、暖赭橘屋頂點綴、中性灰道路、柔和日間頂光、扁平矢量、畫面無任何文字**。所有插畫皆為 AI 生成的示意圖，非實景照片。

提示詞記錄位置：

- `docs/image-prompts/台中市.md` —— 全站統一風格基準與內容代理產生的區頁／建案頁提示詞。
- `docs/image-prompts/台中市-shell.md` —— Shell 代理（骨架層）為分類索引頁產生的 hero 提示詞（`zones_index_hero.jpg`、`projects_index_hero.jpg`）。

產圖流程：以 seedream 模型文生圖（2048×1152）後，用 `docs/tools/img_proc.py one <圖URL> images/<檔名>.jpg 1600 82` 下載並壓縮至約 1600×900、<400KB。

---

## 數字來源規則

- **每個數字都要來源**：面積、年份、房價等皆標註出處（政府都市計畫公開資訊、實價登錄、公開新聞或維基），以 `<sup>[n]</sup>`＋文末來源清單呈現。
- **沒有來源就寫「待補」**：寧可留空誠實，不憑印象編造數字。
- **講清楚口徑**：房價標明是行政區或重劃區內、平均或個案、開價或成交。
- 全站數字查閱日統一為 **2026-10-07**，市場資訊隨時變動，實際行情以官方實價登錄逐筆查詢為準。

---

*本 README 由 Shell 代理產生；內容頁與資料由內容代理維護。修改 `data/*.json` 或內容頁後，請記得重新執行 `python build.py`。*
