# 台中重劃區與建案指南 — 建置規格（PATTERN）

本文件是全站子代理的共同建置規範。**動手前完整讀完本文件**，並 Read 以下檔案：
- 主骨架（重劃區頁）：`zones/_TEMPLATE_ZONE.html`（含全站 22 區 mega/drawer/footer，已凍結）
- 主骨架（建案頁）：`projects/_TEMPLATE_PROJECT.html`
- 參考範例（完整成品，可讀不可複製共享檔）：`D:\_WWW_325\taiwan_redevelopment_zone_guide\zones\taichung_shuinan_park.html`
- 共享設計系統：`css/main.css`、`js/main.js`（由 Shell 代理改版，內容代理只需按骨架引用路徑）
- 圖片工具：`docs/tools/img_proc.py`；圖片風格：`docs/image-prompts/台中市.md`
- 圖片生成 Skill（必讀）：`C:\Users\SUSI\AppData\Local\Doubao\User Data\Profile 1\.doubao\agent_mode\workspace\.skills\doubao-creative-design`（先讀 SKILL.md）
- 自檢截圖工具：`C:\Users\SUSI\AppData\Local\Doubao\User Data\Profile 1\.doubao\agent_mode\workspace\.skills\html\scripts\shot.py`

---

## 0. 修正記錄（2026-10-07 建置首版）

- 本站為全新專案，**嚴禁修改** `D:\_WWW_325\taiwan_redevelopment_zone_guide\`（模板，唯讀參考）。
- 架構依兩份豆包技術手冊：≥50 頁知識庫採 **Sub-folder 子資料夾**分類（`zones/`＋`projects/`），每子資料夾有 `index.html` pillar page，URL 深度 ≤3 層，`robots.txt`/`sitemap.xml` 置根目錄，內鏈全部直連不依賴 301。
- 生成層：`data/zones-<片>.json`＋`data/projects-<片>.json` 為單一資料來源 → `build.py` 產生 `js/search-index.js`、`zones/index.html`、`projects/index.html`、`sitemap.xml`、`robots.txt` 並做全站驗證（由 Shell 代理撰寫，主持人最後統整執行）。
- 既有 5 區（七期/水湳/單元二/十四期/烏日高鐵）模板已含完整 8 段內容：**複製主骨架後，把模板對應頁的 8 段內容貼入並改版**（品牌、canonical、JSON-LD、麵包屑、hero 檔名沿用既有圖），再深化（核對數字信源、補充 2025–26 最新進展、補足 3–5 個建案頁）。

## 1. 專案位置與目錄

```
D:\_WWW_325\taichung_redevelopment_guide\
├── index.html                 首頁（根目錄，總覽＋篩選＋卡片圖文）
├── all_zone_search.html       全站搜尋＋多面向篩選（根目錄）
├── favorite_zone_list.html    收藏清單（根目錄）
├── about_rezone_guide.html    關於本站＋訂閱註冊聯絡（根目錄）
├── robots.txt / sitemap.xml   根目錄（build.py 產生）
├── zones\                     ← 重劃區頁（22 區）＋ index.html 分類索引
├── projects\                  ← 建案頁（約 50 頁）＋ index.html 分類索引
├── css\main.css               共享 CSS（Shell 改版，凍結）
├── js\main.js                 共享 JS（Shell 改版，凍結）
├── js\search-index.js         build.py 由 data\ 產生（凍結）
├── images\                    壓縮後圖片（SEO 命名，全部 16:9）
├── data\zones-<片>.json       ← 各片代理登記重劃區資料（本文件 §8）
├── data\projects-<片>.json    ← 各片代理登記建案資料（本文件 §8）
├── docs\PATTERN.md            本文件
├── docs\image-prompts\台中市.md  ← 每張圖的完整提示詞記錄（必寫）
├── docs\tools\img_proc.py     圖片下載壓縮腳本
└── README.md                  （Shell 代理負責）
```

**路徑規則**：
- `zones/` 與 `projects/` 內頁：CSS/JS 用 `../css/main.css`、`../js/search-index.js`、`../js/main.js`；圖片用 `../images/xxx.jpg`；首頁用 `../index.html`；同資料夾內互連（zones 內互連）不用前綴；跨資料夾（zones↔projects）一律 `../`。
- 根目錄頁：CSS/JS 用 `css/main.css`；圖片 `images/xxx.jpg`。
- mega 選單／抽屜／footer 的連結都須符合上述相對路徑（主骨架已寫好，勿改）。

## 2. 凍結清單與分工邊界

- 凍結（禁止修改，只許回報）：`css/main.css`、`js/main.js`、`js/search-index.js`（Shell 代理產出後全站共用）、`zones/_TEMPLATE_ZONE.html`、`projects/_TEMPLATE_PROJECT.html` 的共享部分（mega/drawer/footer/fab/script 載入）。
- **內容代理只能動**：自己分片的 `zones/<檔名>.html`、`projects/<檔名>.html`、`images/<新圖>`、`docs/image-prompts/台中市.md`（append）、`data/zones-<片>.json`、`data/projects-<片>.json`（新建/append）。**不得改**其他片的檔案、共享檔案、骨架共享部分、根目錄任何檔案、模板專案任何檔案。
- 主骨架裡的 `{{ZONE_ID}}`、`{{ZONE_NAME}}`、`{{ZONE_FILE}}`、`{{IMG}}` 等佔位符與「每頁替換」註解區＝該頁專屬，可改。

## 3. 頁面模板

每個重劃區頁 = **複製 `zones/_TEMPLATE_ZONE.html`**，只替換：`<head>`（title/description/canonical/OG/JSON-LD，JSON-LD 的 FAQ 3 題須與頁面 FAQ 手風琴一致）、麵包屑（首頁 → 台中市重劃區 `index.html` → 區名）、hero（img/alt/overlay/credit「示意圖（AI 生成，非實景照片）」）、tags＋收藏鈕（`data-fav="<zone_id>"`）、main 內 8 段、`data-related="<zone_id>"`、`data-current="<zone_id>"`。mega/drawer/footer/fab/script 保持不動。
- 每個建案頁 = 複製 `projects/_TEMPLATE_PROJECT.html`，同樣只換 head/麵包屑/hero/內容/`data-current`。
- 所有互動都用 data 屬性由 main.js 自動掛上，**頁內勿另寫重複 JS**；`href="#"` 一律禁止。

## 4. 重劃區頁內容結構（每頁 8 段，順序固定）

| # | section id | 內容要求 |
|---|---|---|
| 1 | (無) | `summary-box` 快速摘要：6 行 `summary-list`（它是誰/在哪裡/多大/怎麼開發/交通/一句話） |
| 2 | `profile` | 基本資料表 `table.tbl`＋`colgroup`（28%＋72%）。欄位：行政區/開發方式/總面積/範圍/核心機能/大眾運輸/發展狀態（可依區增減欄位） |
| 3 | `location` | 位置與交通：2–3 段＋條列＋1 個 `callout` |
| 4 | `history` | 開發歷程：`div.timeline > div.tl-row`×N（三欄：時間/軸/內容），每節點＝時間＋事件名＋一句話＋來源上標；不確定寫「估算/待補」 |
| 5 | `life` | 機能與生活：`tabs`（3 頁籤，依區調整） |
| 6 | `housing` | 房市觀察：`stats-row`（2–3 個有來源數字卡，沒可靠數字用「待補」卡）＋`callout-warn`＋1–2 段＋`accordion data-single`（2–3 題） |
| 7 | `who` | 適合誰＋注意事項：`accordion data-single`（2 題） |
| 8 | `faq` | 常見問題：`accordion data-single`（3 題，與 JSON-LD FAQPage 逐題一致）＋`sources` ol（來源名＋發布/更新時間＋URL）＋聲明（查閱日 2026-10-06、非投資建議、示意圖聲明） |

- 每頁至少 1 個 `callout` 與 1 個 `callout-warn`；段落用大白話、主動語態；標題 `h2[id]`（供 TOC）。

## 5. 建案頁內容結構（每頁 7 段，順序固定）

| # | section id | 內容要求 |
|---|---|---|
| 1 | (無) | `summary-box`：6 行（它是誰/在哪裡/基地多大/誰蓋的/開價或成交/一句話） |
| 2 | `profile` | 基本資料表（28%＋72%）：行政區/所在重劃區/建商/基地面積/樓層規劃/戶數/房型/開價或成交/完工年份/大眾運輸/發展狀態 |
| 3 | `base` | 基地與規劃：2–3 段＋1 個 `callout`（地段/街廓/公設/規劃亮點） |
| 4 | `layout` | 房型與格局：條列＋1–2 段（主力坪數、格局、戶數分配；無可靠資料標「待補」） |
| 5 | `price` | 開價與成交：`stats-row`（2–3 個數字卡，如開價/成交均價/歷史最高單價，皆需來源）＋`callout-warn`（統計口徑說明：開價 vs 成交、行政區 vs 個案、樣本數）＋1–2 段分析 |
| 6 | `area` | 周邊機能：2–3 段＋條列（交通/商圈/學區/綠地） |
| 7 | `sources` | 資料來源與聲明：`sources` ol＋聲明（同 §4） |

## 6. 數字與來源規則（硬性）

- **每個數字必須有信源**：文中 `<sup>[n]</sup>` 上標，文末 `sources` ol 對應（來源名＋發布/更新時間＋URL）。優先：政府單位（台中市政府地政局/內政部）、實價登錄、新聞媒體、樂居/591/好房網等房地產平台、維基。查閱日統一 2026-10-06。
- **沒有信源就標「估算/待補」**，絕對禁止憑記憶編房價、漲幅、面積、完工年份。留空誠實 > 編造漂亮。
- 房價數字要標註統計口徑（行政區 vs 重劃區內、平均 vs 個案、開價 vs 成交、樣本筆數）。
- 每一區的 `area`（總面積）要有來源；查不到就「待補」。

## 7. 圖片工作流（每區頁至少 1 張 hero；每建案頁 1 張 hero）

1. **先讀** `doubao-creative-design` skill 的 `SKILL.md`（通用視覺任務流程）→ 依 skill 判定此專案圖片均為「純畫面」無文字插畫、無事實性內容 → 用 `image_gen`，`model_version=seedream_4.5`。
2. **風格必須統一**（見 `docs/image-prompts/台中市.md` 開頭）：橫版 16:9（2048×1152）、扁平現代都市計畫示意插畫、米白紙面底、墨綠＋青綠主色、暖赭屋頂點綴、無任何文字/招牌/地標名稱、柔和日間頂光。每張圖依區/建案特性換主體。
3. **每張生成後立即單獨 `present_files` 一次**（skill 硬性要求），再下載壓縮。
4. 下載＋壓縮：`python docs/tools/img_proc.py one <URL> images\<3-4關鍵字_後綴>.jpg 1600 82`（→1600px、JPEG q82）。檔名＝3–4 個英文 SEO 關鍵字底線分隔，例 `qiqi_luxury_highrise_hero.jpg`、`shuinan_park_green_tower.jpg`。**不得把 image_gen 原始 URL 直接寫進 html**。
5. 每張圖 alt 40–90 字（中文），描述畫面主體＋該區/該案特色；hero alt 格式見主骨架範例。
6. **把每張圖的完整中文 prompt 記錄到** `docs/image-prompts/台中市-<片>.md`（你自己的片檔，格式見 `docs/image-prompts/台中市.md` 開頭範例；各片檔最後由主持人合併進 `台中市.md`）。

## 8. 資料登記（data schema，必填）

每片代理完成頁面後，把每區/每案登記進自己的 JSON（新建 `data/zones-<片>.json`、`data/projects-<片>.json`，UTF-8）。schema：

```json
// data/zones-<片>.json
[
  {
    "id": "taichung_qiqi_district",
    "url": "zones/taichung_qiqi_district.html",
    "district": "xitun", "districtLabel": "西屯區",
    "title": "台中七期重劃區全解析｜豪宅聚落、百貨商圈與市政核心",
    "h1": "七期重劃區（台中市）",
    "dev": "自辦市地重劃", "status": "已開發成熟",
    "tags": ["商業核心", "豪宅聚落", "百貨商圈", "捷運宅"],
    "desc": "台中市政核心與豪宅聚落，新光三越、大遠百與捷運綠線串聯的商業軸心。",
    "keywords": ["七期重劃區", "七期", "台中市政", "台中豪宅"],
    "img": "qiqi_district_hero.jpg", "area": "約 353 公頃"
  }
]

// data/projects-<片>.json
[
  {
    "id": "qiqi_lianju_yupin",
    "url": "projects/qiqi_lianju_yupin.html",
    "zone": "taichung_qiqi_district", "zoneLabel": "七期重劃區",
    "district": "xitun", "districtLabel": "西屯區",
    "title": "聯聚玉品｜台中七期豪宅建案解析：基地、房型與成交行情",
    "h1": "聯聚玉品",
    "builder": "聯聚建設", "status": "已完工",
    "tags": ["豪宅", "七期", "聯聚"],
    "desc": "聯聚建設七期代表作之一，市政核心地段的中大坪數豪宅。",
    "keywords": ["聯聚玉品", "七期豪宅", "聯聚建設"],
    "img": "qiqi_lianju_yupin_hero.jpg", "price": "待補", "year": "待補"
  }
]
```

- district 鍵值：`xitun`西屯區/`nantun`南屯區/`beitun`北屯區/`south`南區/`east`東區/`wuri`烏日區/`taiping`太平區/`dali`大里區/`shalu`沙鹿區/`fengyuan`豐原區（2026-10-07 整合修正：新增 `east` 東區——九期旱溪市地重劃經研究確認位於東區，非北屯）。
- `dev` 統一詞彙：公辦市地重劃/自辦市地重劃/區段徵收/新市鎮開發/特定區計畫/都市更新（如研究發現不同，回報主持人統一）。
- tags 盡量沿用統一詞彙：商業核心/豪宅聚落/百貨商圈/捷運宅/綠地公園/生態宜居/低密度/交通樞紐/高鐵特區/會展產業/文教特區/產業園區/水岸住宅/市郊新城/運動休閒/科技園區。
- `price`/`year` 有來源就填數字＋註明口徑，沒有就「待補」（與頁面一致）。

## 9. 自檢清單（交付前逐頁跑）

1. `python "<html skill>\scripts\shot.py" <頁面路徑>` 跑桌面＋手機截圖，看 lint 報告與兩張圖（html skill 規定）。
2. 無殭屍按鈕：每個可點元素都有行為；`href="#"` 一律禁止。
3. 表格都有 colgroup 28%＋72%；時間軸三欄對齊。
4. 所有圖片：alt 40–90 字、路徑正確（`../images/`）、已壓縮 <400KB。
5. JSON-LD 結構正確（肉眼檢查無未閉合引號）。
6. 檔名與 `data/*.json` 的 `url` 一致；每區/每案都能從首頁、搜尋、mega、相關文章串到。
7. 頁面標題/描述含 SEO 關鍵詞；H1 唯一；h2 依序不跳級。

## 10. 交付回報格式（每份工作回報必須含）

1. 完成的檔案絕對路徑清單（html＋images＋prompts md）。
2. 每頁關鍵數字＋對應來源 URL（一句話即可）。
3. 標註為「估算/待補」的欄位清單（誠實列出）。
4. 發現的共享檔案問題（如有）。
5. 自檢結果摘要（shot.py 是否通過、有無殘留問題）。

## 11. 站點地圖與命名對照（22 區，全站統一）

| 行政區 | 重劃區 | 檔名（zones/） | dev（研究確認，可回報修正） | tags 建議 |
|---|---|---|---|---|
| 西屯區 | 七期重劃區 | taichung_qiqi_district.html ✅既有深化 | 自辦市地重劃 | 商業核心/豪宅聚落/百貨商圈/捷運宅 |
| 西屯區 | 水湳經貿園區 | taichung_shuinan_park.html ✅既有深化 | 區段徵收 | 會展產業/文教特區/生態宜居/綠地公園 |
| 西屯區 | 十二期重劃區 | taichung_phase12_zone.html | 公辦市地重劃（研究確認） | 住宅區/捷運宅/低密度 |
| 西屯區 | 單元一 | taichung_unit1_zone.html | 自辦市地重劃（研究確認） | 住宅區/低密度/綠地公園 |
| 西屯區 | 單元六 | taichung_unit6_zone.html | 自辦市地重劃（研究確認） | 住宅區/低密度/綠地公園 |
| 南屯區 | 單元二 | taichung_unit2_zone.html ✅既有深化 | 自辦市地重劃 | 豪宅聚落/生態宜居/低密度 |
| 南屯區 | 八期重劃區 | taichung_phase8_zone.html | 公辦市地重劃（研究確認） | 文教特區/綠地公園/住宅區 |
| 南屯區 | 單元三 | taichung_unit3_zone.html | 自辦市地重劃（研究確認） | 住宅區/低密度/綠地公園 |
| 南屯區 | 單元五 | taichung_unit5_zone.html | 自辦市地重劃（研究確認） | 住宅區/低密度 |
| 南屯區 | 嶺東特區 | taichung_lingdong_area.html | 區段徵收/公辦（研究確認） | 產業園區/文教特區/住宅區 |
| 北屯區 | 十四期重劃區 | taichung_unit14_zone.html ✅既有深化 | 公辦市地重劃 | 豪宅聚落/綠地公園/商業核心 |
| 北屯區 | 十一期重劃區 | taichung_phase11_zone.html | 公辦市地重劃（研究確認） | 住宅區/商圈/捷運宅 |
| 北屯區 | 北屯機捷特區 | taichung_beitun_mrt_area.html | 區段徵收（研究確認） | 交通樞紐/捷運宅/住宅區 |
| 北屯區 | 九期重劃區 | taichung_phase9_zone.html | 公辦市地重劃（研究確認） | 住宅區/運動休閒 |
| 北屯區 | 十期重劃區 | taichung_phase10_zone.html | 公辦市地重劃（研究確認） | 住宅區/低密度/運動休閒 |
| 北屯區 | 單元八 | taichung_unit8_zone.html | 自辦市地重劃（研究確認） | 住宅區/低密度 |
| 南區 | 十三期重劃區 | taichung_phase13_zone.html | 公辦市地重劃（研究確認） | 住宅區/交通樞紐/綠地公園 |
| 烏日區 | 烏日高鐵特區 | taichung_wuri_hsr_area.html ✅既有深化 | 區段徵收 | 高鐵特區/交通樞紐/會展產業 |
| 太平區 | 太平新光特區 | taichung_taiping_xinguang_area.html | 區段徵收（研究確認） | 產業園區/住宅區/市郊新城 |
| 大里區 | 大里重劃區 | taichung_dali_area.html | 區段徵收/公辦（研究確認） | 文教特區/住宅區/交通樞紐 |
| 沙鹿區 | 沙鹿重劃區 | taichung_shalu_area.html | 公辦/自辦（研究確認） | 市郊新城/海線/住宅區 |
| 豐原區 | 豐原重劃區 | taichung_fengyuan_area.html | 區段徵收/公辦（研究確認） | 市郊新城/文教特區/住宅區 |

> dev 分類以研究為準：研究若發現與本表不符，按事實填寫並在回報中標註「已修正 dev」，主持人統一收斂。行政區歸屬同樣以研究為準（跨區開發標註主要行政區）。

## 12. 分片分工

| 子代理 | 片名 | 負責重劃區頁 | 建案頁數 |
|---|---|---|---|
| T1 | 市中心核心A | 七期✅、水湳✅、十二期 | 5＋5＋2＝12 |
| T2 | 市中心核心B | 八期、十三期、單元二✅、單元六 | 3＋2＋3＋2＝10 |
| T3 | 北屯A | 十四期✅、十一期、北屯機捷特區 | 5＋2＋2＝9 |
| T4 | 北屯B | 九期、十期、單元八 | 2＋2＋2＝6 |
| T5 | 南屯單元 | 單元一、單元三、單元五、嶺東特區 | 2＋2＋2＋2＝8 |
| T6 | 海線衛星A | 烏日高鐵✅、太平新光、大里 | 5＋2＋2＝9 |
| T7 | 海線衛星B | 沙鹿、豐原 | 2＋2＝4 |
| Shell | 全站骨架 | index/all_zone_search/favorite/about＋zones與projects索引＋build.py＋robots/sitemap＋README | — |

全站合計：22 區深度頁＋58 建案頁。每片代理端到端負責自己的片（研究→內容→生圖→壓縮→命名→寫頁→資料登記→自檢→回報）。**不得改其他片、不得碰共享檔案與骨架共享部分、不得碰模板專案。**
