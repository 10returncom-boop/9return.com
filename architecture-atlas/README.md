# 世界建築史 · Architecture Atlas

> 最強大・最專業・功能最多 —— 100 篇專業內文 · 30 種建築風格 · 60 大功能 · 全站繁體中文

- **版本**：V2.0（2026-10-03 重建）
- **站點編號**：S005
- **位置**：`D:\_WWW_325_public\S005_世界建築史_Architecture_Atlas\`
- **入口**：`index.html`（雙擊即可開啟，全靜態、可離線）

---

## 一、資料夾結構（模組化 config / service / utils）

```
S005_世界建築史_Architecture_Atlas\
├─ index.html              主站入口（含全部檢視、文章閱讀器、60 功能）
├─ css/
│  └─ style.css            6 主題狀態、RWD、Breathe Clamp、全部 UI 元件樣式
├─ js/
│  ├─ config/
│  │  └─ site.js           站點設定、7 大分類、6 區域、6 主題預設、60 功能清單
│  ├─ data/
│  │  ├─ styles.js         30 種建築風格資料
│  │  └─ articles.js       100 篇專業內文（title/en/style/region/cat/era/
│  │                       summary/body/buildings/architects/terms/keywords/img）
│  ├─ utils/
│  │  └─ helpers.js        通用工具：el/debounce/throttle/toast/BreatheClamp/滾動揭示
│  └─ service/
│     ├─ storage.js        localStorage（設定/最愛/歷史）
│     ├─ theme.js          6 主題狀態套用、字級、密度、語言
│     ├─ data.js           搜尋/篩選/統計/排序/相關推薦
│     └─ export.js         匯出 CSV/JSON、列印、複製、分享
├─ images/                 30 張風格縮圖 + hero + 100 張每篇專屬題圖（2026-10-03 新增）
├─ sitemap.xml             SEO 網站地圖
├─ robots.txt              SEO 爬蟲設定
├─ ReadyZone_舊站備份_261003/   舊版站點備份（未覆蓋）
└─ README.md               本檔
```

---

## 二、60 大功能（依分組）

**A. 主題與外觀（6）**
1. 日夜主題切換　2. 跟隨系統主題　3. 6 主題狀態（米紙/岩板/松柏 × 日夜，localStorage 記憶）
4. 自訂強調色　5. 字級調整（A-/A+）　6. 版面密度（舒適/緊湊）

**B. 檢視模式（4）**
7. 卡片檢視　8. 清單檢視　9. 網站地圖檢視　10. 時間軸檢視

**C. 導覽與搜尋（11）**
11. 全站即時搜尋　12. 分類篩選　13. 風格篩選　14. 區域篩選　15. 年代篩選
16. 我的最愛　17. 最近造訪　18. 快速跳轉　19. 隨機文章　20. 麵包屑　21. 鍵盤快捷鍵（/ R F Esc ← → Q）

**D. 資料工具（8）**
22. 分類統計　23. 匯出 CSV　24. 匯出 JSON　25. 列印友好　26. 複製文章
27. 閱讀進度條　28. 字數/閱讀分鐘　29. 相關文章推薦

**E. 文章閱讀（8）**
30. 文章目錄 TOC　31. 名詞註釋（手風琴）　32. 圖片燈箱　33. 代表建築清單
34. 建築師檔案　35. 內文結構化　36. 建築資訊表格　37. 上一篇/下一篇

**F. UI 元件（10）**
38. Breathe Clamp　39. Toast　40. Modal　41. Tooltip（名詞）　42. Accordion　43. Tabs（檢視）
44. Carousel（規劃）　45. 回到頂部　46. 側邊欄　47. Badge 標籤

**G. 互動體驗（7）**
48. 滾動揭示　49. 卡片收藏鈕　50. 分享按鈕　51. 熱門/名稱/年代排序　52. 閱讀計時
53. 平滑捲動　54. 深色自動套用

**H. 系統與後設（6）**
55. RWD 響應式　56. 防複製保護（可切換）　57. UTF-8 編碼　58. 繁中/English 雙語
59. localStorage 記憶　60. SEO 後設 + JSON-LD + sitemap/robots

---

## 三、100 篇專業內文分佈

| 分類 | 篇數 | 代表 |
|---|---|---|
| 古文明建築 | 16 | 吉薩金字塔、帕德嫩神廟、羅馬競技場、馬丘比丘 |
| 中世紀建築 | 14 | 聖索菲亞、巴黎聖母院、科隆大教堂、蒙聖米歇爾 |
| 文藝復興與巴洛克 | 12 | 聖母百花大教堂、聖彼得大教堂、凡爾賽宮 |
| 近現代建築 | 20 | 聖家堂、包浩斯、雪梨歌劇院、蓬皮杜中心 |
| 東亞傳統 | 14 | 北京故宮、天壇、法隆寺、鹿港龍山寺 |
| 伊斯蘭建築 | 12 | 圓頂清真寺、泰姬瑪哈陵、阿爾罕布拉宮 |
| 當代與未來 | 12 | 畢爾包古根漢、哈里發塔、台北101、阿利耶夫中心 |

每篇含：時代脈絡（3 段專業內文）、代表建築、相關建築師、專業名詞、關鍵字、風格/區域/年代/分類。

---

## 四、技術規格

- **6 主題狀態**：3 組合（米紙/岩板/松柏）× 日夜（含跟隨系統），localStorage 記憶
- **雙語**：繁中 / English 一鍵切換
- **防複製**：可切換，關閉右鍵與複製
- **RWD**：手機/平板/桌機完整適配
- **Breathe Clamp 組件**：多行摘要收合＋「展開/收合」按鈕（摘要、相關文章卡使用）
- **模組化**：config（site.js）/ data / service / utils 分離
- **純靜態無外部依賴**：直接開啟 `index.html` 即可使用（字型走自託管 CDN，缺網時自動退回系統字型）

---

## 五、圖片/影片素材提示詞（供日後生成）

網站沿用既有 30 張風格插畫（images/s01–s30.webp，flat illustration 風格，風格一致），並已為 100 篇文章各生成 1 張專屬題圖（見「六、100 張專屬題圖素材記錄」，已寫入 articles.js）。如需其他素材，可依以下方向生成（建議比例 16:9，Alt 文字 40–90 字）：

- **主視覺 Hero**：世界地標剪影群像——金字塔、帕德嫩、羅馬競技場、哥德教堂、摩天樓於一幅橫幅，米色暖調，扁平插畫風，乾淨輪廓，零文字。
- **風格縮圖（每種風格）**：該風格的代表建築特寫，扁平手繪插畫風，米白背景，圓潤線條。

## 六、100 張專屬題圖素材記錄（中英對照）

> 2026-10-03 新增：為 100 篇文章各生成 1 張專屬題圖，沿用站內極簡扁平插畫風格
> （米白暖色漸變背景、幾何簡化形體、零文字、16:9、webp）。檔名依「4 組英文 SEO 關鍵字、
> 底線分隔」規則命名，並已寫入 `js/data/articles.js` 每篇的 `img` 欄位。

| id | 中文標題 | English | 圖檔名 |
|---|---|---|---|
| 1 | 吉薩金字塔群 | Giza Pyramid Complex | `images/giza_pyramid_ancient_egypt.webp` |
| 2 | 卡納克神廟 | Karnak Temple Complex | `images/karnak_temple_complex_egypt.webp` |
| 3 | 阿布辛貝神廟 | Abu Simbel Temples | `images/abu_simbel_rock_temple.webp` |
| 4 | 薩卡拉階梯金字塔 | Step Pyramid of Djoser | `images/djoser_step_pyramid_saqqara.webp` |
| 5 | 人面獅身像 | Great Sphinx of Giza | `images/giza_sphinx_limestone_guardian.webp` |
| 6 | 美索不達米亞塔廟 | Mesopotamian Ziggurat | `images/mesopotamian_ziggurat_ancient_ur.webp` |
| 7 | 巴比倫城與空中花園 | Babylon & Hanging Gardens | `images/babylon_hanging_gardens_legend.webp` |
| 8 | 帕德嫩神廟 | Parthenon | `images/parthenon_acropolis_athens_greece.webp` |
| 9 | 埃皮達魯斯劇場 | Theatre of Epidaurus | `images/epidaurus_theatre_ancient_greece.webp` |
| 10 | 奧林匹亞宙斯神廟 | Temple of Zeus at Olympia | `images/olympia_temple_zeus_greece.webp` |
| 11 | 羅馬競技場 | Colosseum | `images/colosseum_rome_arena_amphitheatre.webp` |
| 12 | 萬神殿 | Pantheon | `images/pantheon_rome_dome_oculus.webp` |
| 13 | 塞哥維亞水道橋 | Aqueduct of Segovia | `images/segovia_aqueduct_roman_arches.webp` |
| 14 | 卡拉卡拉浴場 | Baths of Caracalla | `images/caracalla_baths_ancient_rome.webp` |
| 15 | 奇琴伊察 | Chichen Itza | `images/chichen_itza_kukulkan_maya.webp` |
| 16 | 馬丘比丘 | Machu Picchu | `images/machu_picchu_inca_citadel.webp` |
| 17 | 聖索菲亞大教堂 | Hagia Sophia | `images/hagia_sophia_istanbul_dome.webp` |
| 18 | 聖馬可大教堂 | St Mark's Basilica | `images/st_marks_basilica_venice.webp` |
| 19 | 聖維塔萊教堂 | Basilica of San Vitale | `images/san_vitale_ravenna_mosaic.webp` |
| 20 | 比薩主教座堂建築群 | Piazza dei Miracoli | `images/pisa_cathedral_leaning_tower.webp` |
| 21 | 施佩耶爾主教座堂 | Speyer Cathedral | `images/speyer_cathedral_romanesque_germany.webp` |
| 22 | 聖德尼教堂 | Basilica of Saint-Denis | `images/saint_denis_basilica_gothic.webp` |
| 23 | 巴黎聖母院 | Notre-Dame de Paris | `images/notre_dame_paris_cathedral.webp` |
| 24 | 夏特主教座堂 | Chartres Cathedral | `images/chartres_cathedral_gothic_glass.webp` |
| 25 | 科隆大教堂 | Cologne Cathedral | `images/cologne_cathedral_twin_spires.webp` |
| 26 | 米蘭大教堂 | Milan Cathedral | `images/milan_cathedral_marble_gothic.webp` |
| 27 | 亞眠主教座堂 | Amiens Cathedral | `images/amiens_cathedral_gothic_france.webp` |
| 28 | 威尼斯總督宮 | Doge's Palace | `images/doges_palace_venice_gothic.webp` |
| 29 | 蒙聖米歇爾修道院 | Mont-Saint-Michel | `images/mont_saint_michel_abbey.webp` |
| 30 | 亞琛大教堂 | Aachen Cathedral | `images/aachen_cathedral_charlemagne_octagon.webp` |
| 31 | 聖母百花大教堂 | Florence Cathedral Dome | `images/florence_cathedral_brunelleschi_dome.webp` |
| 32 | 布魯內萊斯基育嬰院 | Ospedale degli Innocenti | `images/ospedale_degli_innocenti_florence.webp` |
| 33 | 聖彼得大教堂 | St Peter's Basilica | `images/st_peters_basilica_vatican.webp` |
| 34 | 圓廳別墅 | Villa Rotonda | `images/villa_rotonda_palladio_symmetry.webp` |
| 35 | 維琴察巴西利卡 | Basilica Palladiana | `images/palladiana_basilica_vicenza_arcade.webp` |
| 36 | 凡爾賽宮 | Palace of Versailles | `images/versailles_palace_hall_mirrors.webp` |
| 37 | 聖保羅大教堂 | St Paul's Cathedral | `images/st_pauls_cathedral_london.webp` |
| 38 | 布蘭登堡門 | Brandenburg Gate | `images/brandenburg_gate_berlin_classical.webp` |
| 39 | 美國國會大廈 | United States Capitol | `images/us_capitol_washington_dome.webp` |
| 40 | 巴黎先賢祠 | Panthéon Paris | `images/pantheon_paris_neoclassical_dome.webp` |
| 41 | 大英博物館 | British Museum | `images/british_museum_greek_revival.webp` |
| 42 | 冬宮 | Winter Palace | `images/winter_palace_petersburg_baroque.webp` |
| 43 | 水晶宮 | Crystal Palace | `images/crystal_palace_iron_glass.webp` |
| 44 | 艾菲爾鐵塔 | Eiffel Tower | `images/eiffel_tower_paris_landmark.webp` |
| 45 | 布魯克林大橋 | Brooklyn Bridge | `images/brooklyn_bridge_suspension_steel.webp` |
| 46 | 巴黎歌劇院 | Palais Garnier | `images/palais_garnier_opera_paris.webp` |
| 47 | 聖家堂 | Sagrada Família | `images/sagrada_familia_barcelona_gaudi.webp` |
| 48 | 米拉之家 | Casa Milà | `images/casa_mila_barcelona_gaudi.webp` |
| 49 | 奎爾公園 | Park Güell | `images/park_guell_barcelona_mosaic.webp` |
| 50 | 克萊斯勒大樓 | Chrysler Building | `images/chrysler_building_art_deco.webp` |
| 51 | 帝國大廈 | Empire State Building | `images/empire_state_building_skyscraper.webp` |
| 52 | 芝加哥論壇報大樓 | Tribune Tower | `images/tribune_tower_chicago_gothic.webp` |
| 53 | 包浩斯校舍 | Bauhaus Dessau | `images/bauhaus_dessau_gropius_functionalism.webp` |
| 54 | 薩伏伊別墅 | Villa Savoye | `images/villa_savoye_le_corbusier.webp` |
| 55 | 落水山莊 | Fallingwater | `images/fallingwater_organic_house_waterfall.webp` |
| 56 | 古根漢美術館（紐約） | Guggenheim Museum NY | `images/guggenheim_new_york_spiral.webp` |
| 57 | 巴西利亞大教堂 | Cathedral of Brasília | `images/brasilia_cathedral_niemeyer_concrete.webp` |
| 58 | 雪梨歌劇院 | Sydney Opera House | `images/sydney_opera_house_shell.webp` |
| 59 | 馬賽公寓 | Unité d'Habitation | `images/unite_habitation_marseille_brutalism.webp` |
| 60 | 蓬皮杜中心 | Centre Pompidou | `images/centre_pompidou_high_tech.webp` |
| 61 | 西格拉姆大廈 | Seagram Building | `images/seagram_building_glass_tower.webp` |
| 62 | 泰特現代美術館 | Tate Modern | `images/tate_modern_power_station.webp` |
| 63 | 北京故宮 | Forbidden City | `images/forbidden_city_beijing_palace.webp` |
| 64 | 天壇祈年殿 | Temple of Heaven | `images/temple_of_heaven_beijing.webp` |
| 65 | 應縣木塔 | Yingxian Wooden Pagoda | `images/yingxian_wooden_pagoda_liao.webp` |
| 66 | 佛光寺東大殿 | Foguang Temple | `images/foguang_temple_tang_dynasty.webp` |
| 67 | 蘇州園林 | Suzhou Classical Gardens | `images/suzhou_garden_rockery_literati.webp` |
| 68 | 萬里長城 | Great Wall of China | `images/great_wall_china_fortress.webp` |
| 69 | 京都金閣寺 | Kinkaku-ji | `images/kinkakuji_golden_pavilion_kyoto.webp` |
| 70 | 平等院鳳凰堂 | Byōdō-in Phoenix Hall | `images/byodoin_phoenix_hall_kyoto.webp` |
| 71 | 法隆寺 | Hōryū-ji | `images/horyuji_five_story_pagoda.webp` |
| 72 | 姬路城 | Himeji Castle | `images/himeji_castle_white_heron.webp` |
| 73 | 伊勢神宮 | Ise Grand Shrine | `images/ise_grand_shrine_shinto.webp` |
| 74 | 桂離宮 | Katsura Imperial Villa | `images/katsura_imperial_villa_kyoto.webp` |
| 75 | 慶州石窟庵 | Seokguram Grotto | `images/seokguram_grotto_gyeongju_buddha.webp` |
| 76 | 鹿港龍山寺 | Lukang Longshan Temple | `images/longshan_temple_lukang_taiwan.webp` |
| 77 | 圓頂清真寺 | Dome of the Rock | `images/dome_of_rock_jerusalem.webp` |
| 78 | 泰姬瑪哈陵 | Taj Mahal | `images/taj_mahal_agra_mausoleum.webp` |
| 79 | 科爾多瓦大清真寺 | Great Mosque of Córdoba | `images/great_mosque_cordoba_arches.webp` |
| 80 | 蘇萊曼尼耶清真寺 | Süleymaniye Mosque | `images/suleymaniye_mosque_istanbul_sinan.webp` |
| 81 | 藍色清真寺 | Sultan Ahmed Mosque | `images/blue_mosque_istanbul_tiles.webp` |
| 82 | 阿爾罕布拉宮 | Alhambra | `images/alhambra_granada_court_lions.webp` |
| 83 | 撒馬爾罕雷吉斯坦 | Registan of Samarkand | `images/registan_samarkand_madrasa_blue.webp` |
| 84 | 伊瑪目清真寺 | Imam Mosque of Isfahan | `images/imam_mosque_isfahan_dome.webp` |
| 85 | 蘇丹哈桑清真寺 | Mosque-Madrasa of Sultan Hassan | `images/sultan_hassan_mosque_cairo.webp` |
| 86 | 波伊卡隆 | Po-i-Kalyan | `images/kalyan_minaret_bukhara_uzbekistan.webp` |
| 87 | 希巴姆土城 | Shibam Hadhramaut | `images/shibam_mudbrick_tower_yemen.webp` |
| 88 | 卡魯因清真寺 | Karaouine Mosque | `images/karaouine_mosque_fez_morocco.webp` |
| 89 | 畢爾包古根漢美術館 | Guggenheim Museum Bilbao | `images/guggenheim_bilbao_titanium_gehry.webp` |
| 90 | 北京鳥巢 | Beijing National Stadium | `images/birds_nest_stadium_beijing.webp` |
| 91 | 水立方 | Water Cube | `images/water_cube_beijing_natatorium.webp` |
| 92 | 廣州塔 | Canton Tower | `images/canton_tower_guangzhou_twist.webp` |
| 93 | 上海中心大廈 | Shanghai Tower | `images/shanghai_tower_gensler_supertall.webp` |
| 94 | 哈里發塔 | Burj Khalifa | `images/burj_khalifa_dubai_tower.webp` |
| 95 | 濱海灣金沙 | Marina Bay Sands | `images/marina_bay_sands_skypark.webp` |
| 96 | 香港中銀大廈 | Bank of China Tower | `images/bank_of_china_tower.webp` |
| 97 | 台北101 | Taipei 101 | `images/taipei_101_tower_taiwan.webp` |
| 98 | 華特·迪士尼音樂廳 | Walt Disney Concert Hall | `images/walt_disney_concert_hall.webp` |
| 99 | 阿利耶夫文化中心 | Heydar Aliyev Center | `images/heydar_aliyev_center_baku.webp` |
| 100 | 銀河SOHO | Galaxy SOHO | `images/galaxy_soho_beijing_hadid.webp` |

---

## 七、連結

- 主站：`./index.html`
- 回 325 入口：`../Portal_index.html`（依實際位置）

---

## 八、建築知識庫（knowledge/）

`knowledge\` 收錄**30 篇**獨立自包含的系統性知識文章（繁體中文、純文字、零圖片、零 emoji），每篇以 h1/h2/h3 結構化編排並含 SEO／AEO／GEO 後設，適合爬蟲與 AI 引擎解析。

### 8.1 分類總覽

| 分類 | 篇數 | 說明 |
|---|---|---|
| 柱式、結構與建築語法 | 4 | 古典柱式 1 + 結構體系 3 |
| 建築風格 | 9 | 風格總覽與古典復興 4 + 現代與當代 5 |
| 建築大師與理論 | 8 | 理論與文藝復興 2 + 現代與當代大師 6 |
| 跨文明建築比較 | 5 | 東亞 2 + 伊斯蘭與印度 2 + 宗教比較 1 |
| 材料、永續與城市 | 4 | 材料與技術 2 + 永續與城市 2 |

首頁：`knowledge\index.html`（kbCount 顯示 30+，依分類 .cat 區塊組織）。

### 8.2 文章清單（29 篇）

**結構體系（3）**
- `structural-systems.html` 建築五種基本結構體系：梁柱、拱券、穹頂、桁架與薄膜
- `vaults-and-domes.html` 拱與穹頂：從羅馬萬神殿到現代
- `structure-and-force.html` 力與形：材料力學如何決定建築形體

**建築風格（9）**
- `architecture-style-timeline.html` 建築風格五百年變遷總覽：從文藝復興到參數化
- `gothic-architecture-guide.html` 哥德式建築完全指南：飛扶壁、尖拱與玫瑰窗
- `renaissance-architecture.html` 文藝復興建築：比例、透視與人文精神
- `baroque-rococo.html` 巴洛克與洛可可：戲劇、光與奢華
- `modernism-guide.html` 現代主義建築：功能決定形式
- `brutalism-concrete.html` 粗獷主義：混凝土的誠實與力量
- `high-tech-architecture.html` 高技術建築：結構即美學
- `deconstructivism-guide.html` 解構主義：破碎、斜線與重建
- `parametric-architecture.html` 參數化建築：演算法生成形態

**建築大師與理論（8）**
- `vitruvius-ten-books.html` 維特魯威與《建築十書》：西方建築理論的原點
- `palladio-villas.html` 帕拉迪奧：影響西方五百年的別墅之父
- `gaudi-organic.html` 高第：仿生、馬賽克與奇想
- `le-corbusier.html` 柯比意與現代建築五大點
- `mies-van-der-rohe.html` 密斯·凡德羅：少即是多
- `frank-lloyd-wright.html` 萊特：有機建築與草原住宅
- `pei-geometry-light.html` 貝聿銘：幾何與光
- `zaha-hadid.html` 扎哈·哈迪德：流體建築的先鋒

**跨文明比較（5）**
- `chinese-timber-architecture.html` 中國木構建築：為何千年不倒
- `japanese-architecture-guide.html` 日本建築：和風、枯山水與間（Ma）
- `islamic-architecture-guide.html` 伊斯蘭建築：幾何、書法與光影
- `indian-architecture.html` 印度建築：從石窟到泰姬瑪哈陵
- `sacred-architecture-comparison.html` 宗教建築跨文明比較

**材料、永續與城市（4）**
- `materials-history.html` 石材、磚與混凝土：建築材料史
- `steel-glass-skyscrapers.html` 鋼鐵與玻璃：摩天大樓的誕生
- `sustainable-architecture.html` 綠色與永續建築：從被動式到碳中和
- `urban-planning-history.html` 從衛城到天際線：城市規劃簡史

> 既有範例：`classical-orders-guide.html` 西方古典五大柱式完全指南。

### 8.3 SEO／AEO／GEO 做法

- **SEO**：每篇 `<title>` 含主關鍵字＋品牌尾綴「｜世界建築史知識庫」；`meta description` 約 150 字；`meta keywords`；`robots`；`canonical`（relative path）；OG 四項（type/title/description/site_name）。
- **AEO（答案引擎）**：開頭 lead 前兩句直接給答案；全篇事實性、結構化；FAQ 以 `<details>/<summary>` 手風琴呈現，問答文字與 JSON-LD FAQPage 一一對應。
- **GEO（生成式引擎）**：每篇 `<head>` 內嵌三份 JSON-LD——Article、BreadcrumbList（三層）、FAQPage；h1/h2/h3 語意層級清楚；表格以 `<table>`＋`colgroup` 明列欄寬（總和 100%），方便 AI 抽取比對。
- 內文每篇 800–1500 字，採「先概念→分類/沿革→案例→延伸」的系統性結構，至少一張對照表；專有名詞一律「中文（English）」中英對照。
