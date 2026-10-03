# 九回房地 · 全臺不動產知識整合站（主站 Portal）

版本：v1.0　|　語言：繁體中文（台灣）　|　編碼：UTF-8　|　部署：GitHub Pages → https://9return.com/

## 定位

九回房地（REAL ESTATE · TAIWAN）主站入口，以專業白天模式彙整全臺不動產知識與工具，串聯五大主題子站與姊妹站。設計走暖米白紙感底色 × 墨綠襯線標題 × 細發絲線的商務質感，避免模板化的 AI 介面破綻。

## 功能

- **頂欄 Header**：品牌標誌 + 錨點導覽（首頁 / 主題目錄 / 網站地圖 / 姊妹站 / 前往主題站）
- **麵包屑 Breadcrumb**：首頁 › 主題總覽 › 全臺不動產知識整合站
- **Hero**：建築背景大圖 + 品牌眉標 + 主標 + 五個主題 chip
- **主題目錄**：5 張子站卡片（各配專屬題圖、分類徽章、描述、開啟按鈕）+ 即時搜尋建議（dropdown）
- **網站地圖 Sitemap**：依分類（試算工具 / 市場與交易 / 土地都更與開發）分組的導覽清單
- **主題橫幅 Banner**：專屬 webp 背景 + CTA
- **姊妹站**：webp 背景 + 文案 + 前往按鈕
- **Footer**：品牌介紹 + 主題連結 + 導覽 + 統一 credit（規劃設計開發：張書欣 · Line：331.today · 📱 0968-222201）
- **浮動 Dropdown 控制台**：目前位置（breadcrumb）＋功能控制台（回到頂部／列印／全螢幕／隨機主題）＋站內導覽
- **RWD**：900 / 640 / 480 三斷點，卡片 2→1 欄、字級 clamp 縮放、觸控目標優化
- **SEO/AEO/GEO**：meta description、OG、favicon SVG、語意化標籤

## 移除統計區

本版已移除舊主站的 56/5/6 統計列（用戶指定）。

## 檔案結構

```
D:\_WWW_325_public_9return.com\
├── index.html           主站入口（自包含單檔）
├── recalc\              九回算算網（不動產 × 財務管理試算工具大全，113 種）
├── assets\
│   ├── bg.webp          Hero 背景（建築夜景）
│   ├── hero-portal.webp 主題橫幅背景（城市住宅天際線）
│   ├── hero-sibling.webp 姊妹站背景
│   ├── card-recalc.svg  試算卡片題圖：九回算算網
│   ├── card-market.webp 子站題圖：不動產區段行情
│   ├── card-rent.webp   子站題圖：全臺租金地圖
│   ├── card-urban.webp  子站題圖：都市更新投資報酬
│   └── card-land.webp   子站題圖：營建土地開發
└── _shots\              自檢截圖（非交付物）
```

## 圖影素材提示詞

| 資產 | 用途 | 提示詞要點 |
|---|---|---|
| bg.webp | Hero 背景 | 城市建築夜景，深綠與米白調性 |
| hero-portal.webp | 主題橫幅 | 台灣都會住宅大樓群，清晨自然光，暖米白淡綠，無文字 |
| card-recalc.svg | 試算卡片 | 墨綠底 × 米白計算機造型，品牌「九回算算網」，113 種試算 |
| card-market.webp | 行情卡片 | 城市天際線住宅群，廣角，無文字 |
| card-rent.webp | 租金卡片 | 高空俯瞰都市住宅區，棋盤式街道與綠地，無文字 |
| card-urban.webp | 都更卡片 | 老舊建物與嶄新高樓對比，無文字 |
| card-land.webp | 土地開發卡片 | 平整土地＋施工吊車，無文字 |

## 子站網址

- https://9return.com/recalc/
- https://9return.com/transaction-price-database/
- https://9return.com/rent-map-calculator/
- https://9return.com/urban-renewal-roi-calculator/
- https://9return.com/land-development-handbook/

## 部署

repo：https://github.com/10returncom-boop/9return.com　（CNAME = 9return.com）
