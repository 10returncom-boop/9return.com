# 台中市政路600號 企業總部 銷售網站

## 版本
- v1.1 · 2026-10-04
- v1.0 建置完成後，新增「實景照片」圖庫區塊：加入 22 張現況/周邊實拍（解析度優化轉 webp，附圖說），並於導覽列加入「實景照片」錨點。
- 用途：台中市西屯區市政路 600 號（市政路第一排企業總部）銷售行銷頁
- 主檔：`市政路600號企業總部_銷售.html`（單檔自包含，含內聯 CSS / JS）
- 模板：沿用「龍井乙工地_工業地銷售.html」版型，配色改為深藍＋金（七期商辦質感）

## 物件資料來源
- 地政電子謄本＋使用執照：4 份 PDF（`市政路600號2026-10-3 20.52.pdf`、`市政路600.pdf`、`台中西屯區市政路企業總部全部.pdf`）
- 主要數值：
  - 土地：西屯區惠泰段 0287-0000，639.92 ㎡ ≈ 193.58 坪（1/1）
  - 公告土地現值：158,166 元/㎡（民國115年01月）
  - 使用分區：第二種住宅區（已開發為辦公室／集合住宅）
  - 建物：1 棟地上5層地下1層、6 戶，鋼筋混凝土造
  - 建物總面積：2,983.51 ㎡ ＝ 902.51 坪（含共有持分）
  - 總樓地板面積：1,996.35 ㎡（依使用執照）
  - 建蔽率 58.52%／容積率 218.38%／建物高度 19.10m／法定空地 255.97㎡
  - 使用執照：089 中工建使字第 00589 號；建築完成 89/08/11
  - 所有權人：賴＊＊，1/1；權狀 095 中興字第 026802 號
  - 他項設定：聯邦商業銀行 最高限額 1.2 億
  - 物件編號：OC20018

## 圖片素材（webp 系列，可整批替換）
> 佔位圖皆為「示意圖」，正式使用請以真實實拍／現勘照替換「同名 webp」即可，無需改 HTML。

| 檔名（images/ 下） | 用途 | 生成提示詞（示意） |
|---|---|---|
| `taichung_shizhenglu_corporate_hq_hero.webp` | Hero 主視覺（市政路天際線） | 高空鳥瞰台中七期市政路，兩側玻璃帷幕商辦，五層辦公大樓第一排 |
| `shizhenglu_headquarters_building_exterior.webp` | 建築外觀（示意） | 市政路第一排五層企業總部外觀，玻璃帷幕＋石材，低角度仰拍 |
| `taichung_sevenqi_premium_commercial_district.webp` | 地段（七期商圈夜景） | 七期新光三越、大遠百商圈夜景，摩天樓與百貨燈火 |
| `taichung_city_center_road_transport.webp` | 區位交通（示意） | 台灣大道與市政路交會處高空俯瞰，市中心交通樞紐 |

命名規則：4 組英文 SEO 關鍵字（底線分隔，`.webp` 強制）。替換時維持同名即可。

## 實景照片圖庫（22 張，images/ 下，附圖說）
> v1.1 新增「實景照片」區塊，皆為現況／周邊實拍，解析度已優化並轉 webp。

| 檔名（images/） | 圖說 |
|---|---|
| `shizhenglu_qise_night_skyline.webp` | 七期・市政路夜間天際線 |
| `dayuanbai_mall_building_photo.webp` | 鄰近旗艦百貨・大遠百（Mega City） |
| `shizhenglu_road_daytime_street.webp` | 市政路日間街景 |
| `shizhenglu_extension_road_route_map.webp` | 市政路延伸工程區位圖 |
| `shizhenglu_land_parcel_boundary_map.webp` | 地籍圖・600號基地 |
| `shizhenglu_cadastral_inquiry_result.webp` | 地籍查詢結果（639.92㎡＝193.57坪） |
| `shizhenglu_site_aerial_cbd_view.webp` | 基地位置高空空拍（CBD） |
| `shizhenglu_building_street_context_view.webp` | 市政路街景・本棟建築（紅框） |
| `shizhenglu_headquarters_building_front.webp` | 市政路600號建築外觀 |
| `shizhenglu_office_interior_workspace.webp` | 辦公室內部 |
| `shizhenglu_lobby_reception_hall.webp` | 接待大廳／會議空間 |
| `shizhenglu_office_storage_room.webp` | 辦公／儲藏空間 |
| `shizhenglu_elevator_hall_entrance.webp` | 玄關與電梯廳 |
| `shizhenglu_vintage_wooden_room.webp` | 室內木作空間（復古風格） |
| `shizhenglu_luxury_elevator_hall.webp` | 電梯廳（豪華木作） |
| `shizhenglu_interior_wooden_staircase.webp` | 室內木質樓梯 |
| `shizhenglu_ktv_entertainment_room.webp` | 交誼娛樂空間（KTV包廂） |
| `shizhenglu_indoor_parking_garage.webp` | 室內停車場 |
| `shizhenglu_basement_storage_area.webp` | 地下倉儲／停車空間 |
| `shizhenglu_old_garage_space.webp` | 地下空間（可倉儲或再規劃） |
| `shizhenglu_mechanical_parking_lift.webp` | 機械式升降停車設備 |
| `shizhenglu_mechanical_parking_structure.webp` | 機械式立體停車設備 |

## 網站功能
- 日夜主題切換（含跟隨系統，localStorage 記憶）
- 黏性導覽列 ＋ 麵包屑 ＋ 行動版漢堡選單
- Hero 主視覺 ＋ 關鍵數據帶
- 物件基本資料卡（土地標示／建物標示）
- 樓層規劃表（依使用執照）
- 建築外觀與地段價值區（示意圖）
- 實景照片圖庫（22 張現況／周邊實拍，附圖說）
- 區位與交通、投資亮點
- 電話 CTA（tel: 0968 222 201）＋ LINE 諮詢按鈕（佔位，可填入真實連結）
- RWD 響應式、錨點平滑、滾動揭示、回到頂部、Toast、favicon、SEO meta、Open Graph
- 全程繁體中文

## 待填／可調項目
- **開價**：目前以「開價 · 歡迎來電洽詢」呈現，如需具體金額，可於 `<section class="contact">` 標題或 hero 改為實際開價。
- **聯絡人／電話**：沿用九回房地／張書欣 0968 222 201；如本案由其他單位（例如深耕不動產或豐禾企劃）承接，請全域替換。
- **LINE 連結**：`#lineCta` 目前為提示佔位，可改為真實 LINE 連結。
- **真實照片**：將 `images/` 下同名 webp 換成實拍即可。既有舊專案 `D:\_WWW_325\市政路600企業總部\assets\` 內有部分實拍圖（shizheng600_building_exterior_01.jpg 等），如需改用請告知，我幫您搬入此 images 並調整命名。

## 相關資料夾
- 舊專案（未動）：`D:\_WWW_325\市政路600企業總部\`（含舊版 HTML 與 assets 實拍圖）
- 本專案：`D:\_WWW_325\市政路600號企業總部\`
