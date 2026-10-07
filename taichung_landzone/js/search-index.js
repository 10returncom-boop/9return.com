/* ============================================================
   台中重劃區與建案指南 — 全站單一資料來源（由 build.py 產生，勿手改）
   搜尋索引／相關文章／前後篇／收藏／樹狀圖／知識圖譜／建案卡片共用
   部署時請將 RZ_BASE_URL 換成正式網域。
   ============================================================ */
const RZ_BASE_URL = "https://example.com/taichung-redevelopment-guide/";

const RZ_SITE = {
  "name": "台中重劃區與建案指南",
  "shortName": "台中重劃區",
  "slogan": "一區一頁、一建案一頁，大白話看懂台中重劃區",
  "version": "1.0.0",
  "org": "台中重劃區與建案指南編輯部",
  "lang": "zh-Hant-TW",
  "themeColor": "#0E6B5C"
};

const RZ_COUNTIES = [
  {
    "key": "xitun",
    "label": "西屯區"
  },
  {
    "key": "nantun",
    "label": "南屯區"
  },
  {
    "key": "beitun",
    "label": "北屯區"
  },
  {
    "key": "south",
    "label": "南區"
  },
  {
    "key": "east",
    "label": "東區"
  },
  {
    "key": "wuri",
    "label": "烏日區"
  },
  {
    "key": "taiping",
    "label": "太平區"
  },
  {
    "key": "dali",
    "label": "大里區"
  },
  {
    "key": "shalu",
    "label": "沙鹿區"
  },
  {
    "key": "fengyuan",
    "label": "豐原區"
  }
];

const RZ_DEV_TYPES = [
  "公辦市地重劃",
  "自辦市地重劃",
  "區段徵收",
  "新市鎮開發",
  "特定區計畫",
  "都市更新"
];

const RZ_ZONES = [
  {
    "id": "taichung_qiqi_district",
    "url": "zones/taichung_qiqi_district.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中七期重劃區全解析｜豪宅聚落、百貨商圈與市政核心",
    "h1": "七期重劃區（台中市）",
    "dev": "自辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "商業核心",
      "豪宅聚落",
      "百貨商圈",
      "捷運宅"
    ],
    "desc": "台中新市政中心與豪宅聚落，新光三越、大遠百、國家歌劇院與捷運綠線串聯的商業軸心。",
    "keywords": [
      "七期重劃區",
      "七期",
      "新市政中心",
      "台中豪宅",
      "惠來重劃"
    ],
    "img": "qiqi_district_hero.jpg",
    "area": "約 353 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_shuinan_park",
    "url": "zones/taichung_shuinan_park.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中水湳經貿園區全解析｜中央公園、會展與轉運新核心",
    "h1": "水湳經貿園區（台中市）",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "生態公園",
      "會展文化",
      "新市政核心",
      "轉運接駁"
    ],
    "desc": "水湳機場舊址改建的智慧城，約 67 公頃中央生態公園、國際會展中心與水湳轉運中心。",
    "keywords": [
      "水湳經貿園區",
      "水湳",
      "中央公園",
      "台中國際會展中心",
      "水湳轉運中心"
    ],
    "img": "shuinan_park_hero.jpg",
    "area": "約 254 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_phase12_zone",
    "url": "zones/taichung_phase12_zone.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中十二期重劃區全解析｜西屯住宅重劃、緊鄰七期與水湳",
    "h1": "十二期重劃區（台中市）",
    "dev": "市地重劃",
    "status": "已大量進駐",
    "tags": [
      "住宅重劃",
      "新古屋聚落",
      "雙商圈生活圈",
      "中科通勤"
    ],
    "desc": "西屯區介於七期與水湳之間的住宅型重劃區，被西屯路分成北十二期與南十二期，享雙商圈外溢。",
    "keywords": [
      "十二期重劃區",
      "台中十二期",
      "西屯十二期",
      "北十二期",
      "南十二期"
    ],
    "img": "phase12_zone_hero.jpg",
    "area": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_phase8_zone",
    "url": "zones/taichung_phase8_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中八期重劃區全解析｜豐樂公園、文心森林公園與南屯成熟機能",
    "h1": "八期重劃區",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "綠地公園",
      "文教特區",
      "捷運宅",
      "成熟商圈"
    ],
    "desc": "八期又稱豐樂市地重劃，約148公頃，南屯區核心，豐樂雕塑公園、文心森林公園、Costco與中捷綠線G10a至G12站環繞。",
    "keywords": [
      "八期重劃區",
      "豐樂重劃",
      "豐樂雕塑公園",
      "文心森林公園",
      "台中南屯重劃"
    ],
    "img": "phase8_fengle_park_hero.jpg",
    "area": "約 148 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_phase13_zone",
    "url": "zones/taichung_phase13_zone.html",
    "district": "south",
    "districtLabel": "南區",
    "title": "台中十三期重劃區全解析｜大慶雙鐵、229公頃公辦與新八期發展",
    "h1": "十三期重劃區",
    "dev": "公辦市地重劃",
    "status": "開發中",
    "tags": [
      "交通樞紐",
      "綠地公園",
      "新重劃區",
      "雙鐵共構"
    ],
    "desc": "十三期大慶市地重劃約229公頃，南屯為主跨南區，自辦單元六七整併為公辦，雙鐵共構大慶站、G13捷運、舊南屯溪景觀帶。",
    "keywords": [
      "十三期重劃區",
      "大慶重劃",
      "新八期",
      "台中大慶火車站",
      "麻糍埔遺址"
    ],
    "img": "phase13_daqing_metro_hero.jpg",
    "area": "約 229 公頃",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "taichung_unit2_zone",
    "url": "zones/taichung_unit2_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元二重劃區全解析｜黎明自辦重劃、低密度豪宅與七期後花園",
    "h1": "單元二重劃區",
    "dev": "自辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "豪宅聚落",
      "生態宜居",
      "低密度",
      "近七期"
    ],
    "desc": "單元二又稱黎明自辦市地重劃，約186公頃，前身黎明新村，低建蔽低密度純住宅，緊鄰七期百貨商圈，近一年成交均價約66.74萬/坪。",
    "keywords": [
      "單元二",
      "黎明重劃區",
      "台中重劃區",
      "自辦市地重劃",
      "黎明新村"
    ],
    "img": "unit2_zone_hero.jpg",
    "area": "約 186 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit6_zone",
    "url": "zones/taichung_unit6_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元六重劃區全解析｜楓溪、樂田段低密純住宅與舊南屯溪",
    "h1": "單元六重劃區",
    "dev": "自辦市地重劃",
    "status": "開發中",
    "tags": [
      "綠地公園",
      "靜巷純住宅",
      "新重劃區",
      "溪景住宅"
    ],
    "desc": "整體開發地區單元六（與七）位於南屯大慶一帶，自辦重劃後併入十三期，範圍約在西川一路、環中路、南屯溪、文心南七路、建國北路之間，以楓溪、樂田段低密純住宅與舊南屯溪景觀帶為特色。",
    "keywords": [
      "單元六重劃區",
      "楓溪段",
      "樂田段",
      "舊南屯溪",
      "台中自辦重劃"
    ],
    "img": "unit6_fengxi_creek_hero.jpg",
    "area": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit14_zone",
    "url": "zones/taichung_unit14_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "十四期重劃區",
    "h1": "十四期重劃區（美和庄）",
    "dev": "公辦市地重劃",
    "status": "發展中",
    "tags": [
      "洲際棒球場",
      "漢神洲際",
      "台中巨蛋",
      "新興重劃區"
    ],
    "desc": "十四期（美和庄）是台中近40年最大的公辦市地重劃區，約403.89公頃，擁有洲際棒球場、2026年開幕的漢神洲際購物廣場與目標2030年完工的台中巨蛋，是北台中新興發展熱區。",
    "keywords": [
      "十四期重劃區",
      "美和庄",
      "洲際棒球場",
      "漢神洲際",
      "台中巨蛋",
      "北屯重劃區"
    ],
    "img": "unit14_zone_hero.jpg",
    "area": "約403.89公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_phase11_zone",
    "url": "zones/taichung_phase11_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "十一期重劃區",
    "h1": "十一期重劃區（崇德・昌平商圈）",
    "dev": "公辦市地重劃",
    "status": "發展成熟",
    "tags": [
      "小天母",
      "崇德商圈",
      "八二三紀念公園",
      "學區宅"
    ],
    "desc": "十一期於民國82年發布公辦市地重劃，約141.02公頃，範圍涵蓋北屯崇德、昌平商圈，有「小天母」之稱，擁有八二三紀念公園、馬禮遜與衛道等學區，並鄰捷運文心崇德站與台鐵松竹站。",
    "keywords": [
      "十一期重劃區",
      "崇德商圈",
      "昌平商圈",
      "小天母",
      "八二三紀念公園",
      "北屯"
    ],
    "img": "phase11_zone_hero.jpg",
    "area": "約141.02公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_beitun_mrt_area",
    "url": "zones/taichung_beitun_mrt_area.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "北屯機捷特區",
    "h1": "北屯機捷特區",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "捷運綠線",
      "北屯機廠",
      "Costco",
      "軌道導向"
    ],
    "desc": "北屯機捷特區配合台中捷運綠線北屯機廠、北屯總站G0與舊社站G3，於民國100年以區段徵收開發，約103.43公頃，擁有三座捷運站、兩座台鐵站、Costco好市多與台74線匝道，是北台中首購熱區。",
    "keywords": [
      "北屯機捷特區",
      "北屯機廠",
      "台中捷運綠線",
      "北屯總站",
      "舊社站",
      "Costco北屯"
    ],
    "img": "beitun_mrt_area_hero.jpg",
    "area": "約103.43公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_phase9_zone",
    "url": "zones/taichung_phase9_zone.html",
    "district": "east",
    "districtLabel": "東區",
    "title": "台中九期重劃區全解析｜旱溪市地重劃、低密度透天與東區生活圈",
    "h1": "九期重劃區（旱溪）",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "低密度",
      "綠地公園",
      "水岸住宅"
    ],
    "desc": "九期旱溪市地重劃位於台中市東區，約120公頃、1994年完成，第一種住宅區低密度透天為主，旱溪與大里溪流經。",
    "keywords": [
      "九期重劃區",
      "旱溪市地重劃",
      "東區重劃",
      "九期"
    ],
    "img": "phase9_hanxi_villa_zone.jpg",
    "area": "約 120 公頃",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "taichung_phase10_zone",
    "url": "zones/taichung_phase10_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "台中十期重劃區全解析｜軍功水景市地重劃、太原路綠園道與大坑山景",
    "h1": "十期重劃區（軍功水景）",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "低密度",
      "綠地公園",
      "運動休閒"
    ],
    "desc": "十期軍功水景市地重劃位於台中市北屯區，約221公頃、2000年完成，50米太原路綠園道與大坑風景區為特色。",
    "keywords": [
      "十期重劃區",
      "軍功水景",
      "軍功市地重劃",
      "北屯重劃",
      "太原路綠園道"
    ],
    "img": "phase10_jungong_hillside.jpg",
    "area": "約 221 公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_unit8_zone",
    "url": "zones/taichung_unit8_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "台中單元八重劃區全解析｜水湳東側自辦住宅區、敦化路生活圈與房價",
    "h1": "單元八重劃區",
    "dev": "自辦市地重劃",
    "status": "發展中",
    "tags": [
      "綠地公園",
      "生態宜居",
      "市郊新城"
    ],
    "desc": "單元八是水湳經貿園區東側的自辦市地重劃，隔經貿路與文商段相望，生活機能發展最快，敦化路南北側房價約67至80萬/坪；實際跨西屯與北屯交界。",
    "keywords": [
      "單元八重劃區",
      "單元八",
      "水湳單元八",
      "經貿路重劃",
      "敦化路重劃"
    ],
    "img": "unit8_shuinan_residential.jpg",
    "area": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_unit1_zone",
    "url": "zones/taichung_unit1_zone.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中單元一重劃區（安和自辦）全解析｜西屯55.89公頃純住宅街廓",
    "h1": "單元一重劃區（安和自辦）",
    "dev": "自辦市地重劃",
    "status": "已完成重劃",
    "tags": [
      "住宅區",
      "低密度",
      "綠地公園"
    ],
    "desc": "台中西屯安和自辦市地重劃，55.89公頃、933名所有權人共同持分開發，朝馬路與安和路一帶的方正純住宅街廓。",
    "keywords": [
      "單元一重劃區",
      "安和自辦",
      "西屯重劃",
      "朝馬路",
      "安和路"
    ],
    "img": "unit1_zone_hero.jpg",
    "area": "約 55.89 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_unit3_zone",
    "url": "zones/taichung_unit3_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元三重劃區全解析｜五權西路林蔭大道、逾5萬坪綠覆",
    "h1": "單元三重劃區",
    "dev": "自辦市地重劃",
    "status": "發展成熟",
    "tags": [
      "住宅區",
      "低密度",
      "綠地公園"
    ],
    "desc": "台中南屯單元三重劃區，五權西路二段與向上路三段一帶，林蔭大道、逾5萬坪綠覆，串聯五期公益路與八期好市多商圈。",
    "keywords": [
      "單元三重劃區",
      "南屯重劃",
      "五權西路",
      "向上路三段",
      "林蔭大道"
    ],
    "img": "unit3_zone_hero.jpg",
    "area": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit5_zone",
    "url": "zones/taichung_unit5_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元五重劃區（高鐵新市鎮）全解析｜70.18公頃純住宅、生態公園與足球園區",
    "h1": "單元五重劃區（高鐵新市鎮）",
    "dev": "自辦市地重劃",
    "status": "已完成重劃",
    "tags": [
      "住宅區",
      "低密度",
      "生態宜居",
      "綠地公園",
      "運動休閒"
    ],
    "desc": "台中南屯高鐵新市鎮自辦市地重劃，70.18公頃純住宅，擁約1.3萬坪生態公園與斥資15億的足球運動休閒園區，近捷運高鐵與74號快速道路。",
    "keywords": [
      "單元五重劃區",
      "高鐵新市鎮",
      "南屯重劃",
      "生態公園",
      "足球園區"
    ],
    "img": "unit5_zone_hero.jpg",
    "area": "約 70.18 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_lingdong_area",
    "url": "zones/taichung_lingdong_area.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中嶺東特區全解析｜嶺東科大與台中精密機械園區、彩虹眷村所在",
    "h1": "嶺東特區",
    "dev": "特定區計畫",
    "status": "發展中",
    "tags": [
      "產業園區",
      "文教特區",
      "住宅區"
    ],
    "desc": "台中南屯春社里嶺東一帶，嶺東科技大學春安校區與約124公頃台中精密機械科技創新園區所在，山腳大學城與彩虹眷村生活圈。",
    "keywords": [
      "嶺東特區",
      "嶺東科技大學",
      "台中精密機械園區",
      "春安里",
      "彩虹眷村"
    ],
    "img": "lingdong_area_hero.jpg",
    "area": "約 124 公頃（精密機械園區）",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_wuri_hsr_area",
    "url": "zones/taichung_wuri_hsr_area.html",
    "district": "wuri",
    "districtLabel": "烏日區",
    "title": "烏日高鐵特區",
    "h1": "烏日高鐵特區",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "高鐵台中站",
      "三鐵共構",
      "D-ONE第一大天地",
      "凱賓斯基",
      "站前重劃"
    ],
    "desc": "烏日高鐵特區約273.35公頃，以區段徵收開發，擁有高鐵台中站、台鐵新烏日站與捷運綠線G17站三鐵共構，並有投資約260億、商場營業約10.6萬坪的D-ONE第一大天地（高鐵娛樂購物城），第一期預計2026年底完工、引進台灣首間凱賓斯基酒店，是中台灣重要的門戶開發。",
    "keywords": [
      "烏日高鐵特區",
      "高鐵台中站",
      "三鐵共構",
      "D-ONE第一大天地",
      "高鐵娛樂購物城",
      "凱賓斯基",
      "烏日重劃區"
    ],
    "img": "wuri_hsr_area_hero.jpg",
    "area": "約273.35公頃",
    "county": "wuri",
    "countyLabel": "烏日區"
  },
  {
    "id": "taichung_taiping_xinguang_area",
    "url": "zones/taichung_taiping_xinguang_area.html",
    "district": "taiping",
    "districtLabel": "太平區",
    "title": "太平新光特區",
    "h1": "太平新光特區（新光區段徵收）",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "新光國小",
      "新光國中",
      "9年學區",
      "台74太原匝道",
      "純住宅"
    ],
    "desc": "太平新光特區為新光區段徵收案，約209公頃，以純住宅與公共設施為主，最重要的建設是新光國小與新光國中形成的9年一貫學區，並鄰台74線太原匝道聯外，是太平區新的家庭導向住宅重劃區。",
    "keywords": [
      "太平新光特區",
      "新光區段徵收",
      "新光國小",
      "新光國中",
      "太平重劃區",
      "台74太原匝道"
    ],
    "img": "taiping_xinguang_area_hero.jpg",
    "area": "約209公頃",
    "county": "taiping",
    "countyLabel": "太平區"
  },
  {
    "id": "taichung_dali_area",
    "url": "zones/taichung_dali_area.html",
    "district": "dali",
    "districtLabel": "大里區",
    "title": "大里重劃區",
    "h1": "大里重劃區（第15期大里杙市地重劃）",
    "dev": "市地重劃",
    "status": "發展中",
    "tags": [
      "第15期",
      "大里杙",
      "跨區市地重劃",
      "興大生活圈",
      "全國首例"
    ],
    "desc": "大里重劃區指第15期大里杙市地重劃，約6.96公頃，是全國首例跨區辦理的市地重劃案，緊鄰中興大學生活圈，以整齊街廓與新穎住宅供給大里相對整齊的居住選擇，與舊市區成熟機能互補。",
    "keywords": [
      "大里重劃區",
      "第15期",
      "大里杙",
      "市地重劃",
      "跨區重劃",
      "興大",
      "大里區"
    ],
    "img": "dali_area_hero.jpg",
    "area": "約6.96公頃",
    "county": "dali",
    "countyLabel": "大里區"
  },
  {
    "id": "taichung_shalu_area",
    "url": "zones/taichung_shalu_area.html",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "台中沙鹿重劃區全解析｜新光田特區、中科二期與向上路生活圈",
    "h1": "沙鹿重劃區（台中市）",
    "dev": "都市計畫零星開發",
    "status": "發展中",
    "tags": [
      "市郊新城",
      "產業園區",
      "住宅區"
    ],
    "desc": "台中海線沙鹿的新興生活圈，以新光田特區（向上路、正德路一帶）為核心，受新光田醫院與中科二期帶動，新屋電梯華廈陸續進駐。",
    "keywords": [
      "沙鹿重劃區",
      "沙鹿",
      "新光田特區",
      "光田醫院",
      "中科二期"
    ],
    "img": "shalu_xinguangtian_hero.jpg",
    "area": "待補",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "taichung_fengyuan_area",
    "url": "zones/taichung_fengyuan_area.html",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "台中豐原重劃區全解析｜豐南生活圈、豐原大道與舊縣城新發展",
    "h1": "豐原重劃區（台中市）",
    "dev": "都市計畫擴大發展",
    "status": "已發展成熟",
    "tags": [
      "市郊新城",
      "文教特區",
      "住宅區"
    ],
    "desc": "台中舊縣城、現為北部衛星城市，新屋集中在豐原大道沿線的豐南生活圈，廟東夜市與車站機能成熟，成交均價約35.4萬/坪。",
    "keywords": [
      "豐原重劃區",
      "豐原",
      "豐南生活圈",
      "豐原大道",
      "廟東夜市"
    ],
    "img": "fengyuan_fengnan_hero.jpg",
    "area": "待補",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  }
];

const TC_PROJECTS = [
  {
    "id": "qiqi_baohui_qiuhonggu",
    "url": "projects/qiqi_baohui_qiuhonggu.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "寶輝秋紅谷｜台中七期豪宅建案解析：基地、房型與成交行情",
    "h1": "寶輝秋紅谷",
    "builder": "寶輝建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "公園第一排"
    ],
    "desc": "七期緊鄰秋紅谷的 SC 豪宅大樓，約 146 戶，近一年成交均價約 72.4 萬/坪。",
    "keywords": [
      "寶輝秋紅谷",
      "七期豪宅",
      "寶輝建設"
    ],
    "img": "qiqi_baohui_qiuhonggu_hero.jpg",
    "price": "約 72.4 萬/坪",
    "year": "屋齡約 11 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_baoxi_tianrui",
    "url": "projects/qiqi_baoxi_tianrui.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "寶璽天睿｜台中七期指標豪宅建案解析：基地、房型與成交行情",
    "h1": "寶璽天睿",
    "builder": "寶璽建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "指標地標"
    ],
    "desc": "七期細高挺拔的指標豪宅，近期成交約 89.5 萬/坪，長期位居台中豪宅前段班。",
    "keywords": [
      "寶璽天睿",
      "七期豪宅",
      "台中豪宅"
    ],
    "img": "qiqi_baoxi_tianrui_hero.jpg",
    "price": "約 89.5 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_dibao",
    "url": "projects/qiqi_dibao.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中帝寶｜七期惠文學區豪宅建案解析：基地、房型與開價",
    "h1": "台中帝寶",
    "builder": "國泰建設（台中帝寶）",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "惠文學區"
    ],
    "desc": "七期惠文學區大器豪宅社區，對稱華廈圍繞中庭花園，開價約 58–70 萬/坪。",
    "keywords": [
      "台中帝寶",
      "七期豪宅",
      "惠文學區"
    ],
    "img": "qiqi_dibao_hero.jpg",
    "price": "開價約 58–70 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_bokelai",
    "url": "projects/qiqi_bokelai.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "博克萊｜南七期大型社區建案解析：基地、房型與成交行情",
    "h1": "博克萊",
    "builder": "富宇建設（博克萊）",
    "status": "已完工",
    "tags": [
      "南七期",
      "大型社區",
      "大坪數"
    ],
    "desc": "南七期圍合式大型綠意社區，中央花園與泳池，均價約 59 萬/坪、823 筆成交。",
    "keywords": [
      "博克萊",
      "南七期",
      "七期社區"
    ],
    "img": "qiqi_bokelai_hero.jpg",
    "price": "約 59 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_lianju_baohe",
    "url": "projects/qiqi_lianju_baohe.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "聯聚保和大廈｜七期 39 層 SRC 豪宅解析：基地、房型與行情",
    "h1": "聯聚保和大廈",
    "builder": "聯聚建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "SRC細塔"
    ],
    "desc": "聯聚建設七期 39 層 SRC 細塔，基地約 761 坪、僅 69 戶、公設比約 34.8%。",
    "keywords": [
      "聯聚保和",
      "七期豪宅",
      "聯聚建設"
    ],
    "img": "qiqi_lianju_baohe_hero.jpg",
    "price": "待補",
    "year": "屋齡約 10 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_fengyi_parkone",
    "url": "projects/shuinan_fengyi_parkone.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "豐邑 PARK ONE｜水湳中央公園第一排豪宅解析：基地、房型與成交行情",
    "h1": "豐邑 PARK ONE",
    "builder": "豐邑機構",
    "status": "興建中",
    "tags": [
      "水湳",
      "豪宅",
      "中央公園第一排"
    ],
    "desc": "水湳中央公園第一排指標豪宅，188 戶、53–74 坪，近一年均價約 80.5 萬/坪。",
    "keywords": [
      "豐邑PARK ONE",
      "水湳豪宅",
      "中央公園"
    ],
    "img": "shuinan_fengyi_parkone_hero.jpg",
    "price": "約 80.5 萬/坪",
    "year": "預計 2027 Q4",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_farglory_huishanhang",
    "url": "projects/shuinan_farglory_huishanhang.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "遠雄洄山行｜水湳遠雄新成屋住宅解析：基地、房型與成交行情",
    "h1": "遠雄洄山行",
    "builder": "遠雄建設",
    "status": "新成屋",
    "tags": [
      "水湳",
      "住宅",
      "遠雄建設"
    ],
    "desc": "遠雄建設水湳新成屋，148 戶、24–48 坪，成交均價約 68.6 萬/坪，2026 年 8 月完工。",
    "keywords": [
      "遠雄洄山行",
      "水湳住宅",
      "遠雄建設"
    ],
    "img": "shuinan_farglory_huishanhang_hero.jpg",
    "price": "約 68.6 萬/坪",
    "year": "約 2026-08",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_runlong_dangdai",
    "url": "projects/shuinan_runlong_dangdai.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "潤隆當代首馥｜水湳大坪數住宅解析：基地、房型與成交行情",
    "h1": "潤隆當代首馥",
    "builder": "潤隆建設",
    "status": "興建中",
    "tags": [
      "水湳",
      "大坪數",
      "換屋"
    ],
    "desc": "潤隆建設水湳大坪數住宅，320 戶、46–52 坪，成交均價約 69.48 萬/坪。",
    "keywords": [
      "潤隆當代首馥",
      "水湳住宅",
      "潤隆建設"
    ],
    "img": "shuinan_runlong_dangdai_hero.jpg",
    "price": "約 69.48 萬/坪",
    "year": "預計 2030-12",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_taiyu_sky",
    "url": "projects/shuinan_taiyu_sky.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "泰御 Sky Island｜水湳精品住宅解析：基地、房型與成交行情",
    "h1": "泰御 Sky Island",
    "builder": "泰御建設",
    "status": "興建中",
    "tags": [
      "水湳",
      "精品住宅",
      "精華位"
    ],
    "desc": "水湳精華位中高層精品住宅，154 戶、23–32 坪，成交均價約 86.37 萬/坪。",
    "keywords": [
      "泰御Sky Island",
      "水湳住宅",
      "精品住宅"
    ],
    "img": "shuinan_taiyu_sky_hero.jpg",
    "price": "約 86.37 萬/坪",
    "year": "預計 2030 上半年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_dali_chuangshiji",
    "url": "projects/shuinan_dali_chuangshiji.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "達麗創世紀｜水湳大型自住社區解析：基地、房型與成交行情",
    "h1": "達麗創世紀",
    "builder": "達麗建設",
    "status": "已完工",
    "tags": [
      "水湳",
      "大型社區",
      "首購"
    ],
    "desc": "達麗建設水湳大型自住社區，639 戶、21–26 坪，成交均價約 57.63 萬/坪。",
    "keywords": [
      "達麗創世紀",
      "水湳住宅",
      "達麗建設"
    ],
    "img": "shuinan_dali_chuangshiji_hero.jpg",
    "price": "約 57.63 萬/坪",
    "year": "屋齡約 2 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase12_dacheng_langyun",
    "url": "projects/phase12_dacheng_langyun.html",
    "zone": "taichung_phase12_zone",
    "zoneLabel": "十二期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "大城朗雲｜十二期大坪數豪宅華廈解析：基地、房型與行情",
    "h1": "大城朗雲",
    "builder": "大城建設",
    "status": "已完工",
    "tags": [
      "十二期",
      "大坪數",
      "豪宅"
    ],
    "desc": "大城建設十二期青海路二段大坪數豪宅，約 20 層、36 戶、96–112 坪。",
    "keywords": [
      "大城朗雲",
      "十二期豪宅",
      "大城建設"
    ],
    "img": "phase12_dacheng_langyun_hero.jpg",
    "price": "待補",
    "year": "屋齡約 12 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase12_shenyang_chiwenhua",
    "url": "projects/phase12_shenyang_chiwenhua.html",
    "zone": "taichung_phase12_zone",
    "zoneLabel": "十二期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "昇揚四季文華｜十二期地標華廈解析：基地、房型與成交行情",
    "h1": "昇揚四季文華",
    "builder": "昇揚開發",
    "status": "已完工",
    "tags": [
      "十二期",
      "地標華廈",
      "新成屋"
    ],
    "desc": "昇揚開發十二期臨大道地標華廈，約 88 戶、28.5–42 坪，成交均價約 47.8 萬/坪。",
    "keywords": [
      "昇揚四季文華",
      "十二期",
      "昇揚開發"
    ],
    "img": "phase12_shenyang_chiwenhua_hero.jpg",
    "price": "約 47.8 萬/坪",
    "year": "屋齡約 2 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase8_huiyu_chenfeng",
    "url": "projects/phase8_huiyu_chenfeng.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "惠宇澄峰｜八期豐樂公園第一排28層豪宅，成交均價約30.3萬/坪",
    "h1": "惠宇澄峰",
    "builder": "惠宇建設",
    "status": "成屋",
    "tags": [
      "八期",
      "公園首席",
      "大坪數豪宅"
    ],
    "desc": "八期文心南五路一段330號、54戶28層、119–137坪、公設比34.26%、屋齡約15年，591成交均價約30.3萬/坪。",
    "keywords": [
      "惠宇澄峰",
      "八期重劃區",
      "豐樂公園豪宅",
      "惠宇建設"
    ],
    "img": "phase8_huiyu_chenfeng_hero.jpg",
    "price": "約 30.3 萬/坪",
    "year": "屋齡約 15 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase8_huiyu_fongger",
    "url": "projects/phase8_huiyu_fongger.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "惠宇豐閣｜八期南屯惠宇電梯大樓，銷售均價約47.4萬/坪",
    "h1": "惠宇豐閣",
    "builder": "惠宇建設",
    "status": "成屋",
    "tags": [
      "八期",
      "南屯住宅",
      "成熟機能"
    ],
    "desc": "八期南屯惠宇電梯大樓，591銷售均價約47.4萬/坪、在售約75筆；確切門牌與規格待補。",
    "keywords": [
      "惠宇豐閣",
      "八期重劃區",
      "南屯電梯大樓",
      "惠宇建設"
    ],
    "img": "phase8_huiyu_fongger_hero.jpg",
    "price": "銷售約 47.4 萬/坪",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase8_dengyang_yifan",
    "url": "projects/phase8_dengyang_yifan.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "登陽一凡峰｜八期近捷運豐樂公園站的登陽建設住宅",
    "h1": "登陽一凡峰",
    "builder": "登陽建設",
    "status": "成屋",
    "tags": [
      "八期",
      "捷運宅",
      "南屯住宅"
    ],
    "desc": "八期近中捷G12豐樂公園站的登陽建設電梯住宅；規格與成交均價待補，以實價登錄為準。",
    "keywords": [
      "登陽一凡峰",
      "八期重劃區",
      "豐樂公園捷運站",
      "登陽建設"
    ],
    "img": "phase8_dengyang_yifan_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase13_huiyu_daran",
    "url": "projects/phase13_huiyu_daran.html",
    "zone": "taichung_phase13_zone",
    "zoneLabel": "十三期重劃區",
    "district": "south",
    "districtLabel": "南區",
    "title": "惠宇大然｜十三期大慶段指標預售，132戶38–52坪，成交均價約69.37萬/坪",
    "h1": "惠宇大然",
    "builder": "惠宇建設",
    "status": "預售／施工中",
    "tags": [
      "十三期",
      "雙鐵宅",
      "預售屋"
    ],
    "desc": "十三期大慶段、132戶38–52坪、2028年1月完工，樂居成交均價約69.37萬/坪、最高71.57萬/坪。",
    "keywords": [
      "惠宇大然",
      "十三期重劃區",
      "大慶段",
      "惠宇建設"
    ],
    "img": "phase13_huiyu_daran_hero.jpg",
    "price": "約 69.37 萬/坪",
    "year": "預計 2028-01",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "phase13_guoju_zhishang",
    "url": "projects/phase13_guoju_zhishang.html",
    "zone": "taichung_phase13_zone",
    "zoneLabel": "十三期重劃區",
    "district": "south",
    "districtLabel": "南區",
    "title": "國聚之尚｜十三期大慶段大型社區，242戶37–46坪，成交均價約63.69萬/坪",
    "h1": "國聚之尚",
    "builder": "國聚建設",
    "status": "預售／施工中",
    "tags": [
      "十三期",
      "雙鐵宅",
      "大型社區"
    ],
    "desc": "十三期大慶段、242戶37–46坪、2028上半年完工，樂居成交均價約63.69萬/坪、最高67.61萬/坪。",
    "keywords": [
      "國聚之尚",
      "十三期重劃區",
      "大慶段",
      "國聚建設"
    ],
    "img": "phase13_guoju_zhishang_hero.jpg",
    "price": "約 63.69 萬/坪",
    "year": "預計 2028 H1",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "unit2_jingrui_bo",
    "url": "projects/unit2_jingrui_bo.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "精銳博｜單元二龍富十路20層公園首席大樓，成交均價約56.49萬/坪",
    "h1": "精銳博",
    "builder": "悅騰建設",
    "status": "成屋",
    "tags": [
      "單元二",
      "公園首席",
      "大基地"
    ],
    "desc": "單元二龍富十路100號、152戶20層、基地約2377坪、建坪50–100坪、公設比32.8%、屋齡約8年，成交均價約56.49萬/坪、最高61.17萬/坪。",
    "keywords": [
      "精銳博",
      "單元二重劃區",
      "龍富十路",
      "悅騰建設"
    ],
    "img": "unit2_jingrui_bo_hero.jpg",
    "price": "約 56.49 萬/坪",
    "year": "屋齡約 8 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit2_shuang1812",
    "url": "projects/unit2_shuang1812.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "雙橡園1812｜單元二精品中層電梯大樓，屋齡約5年、最高單價約63.07萬/坪",
    "h1": "雙橡園1812",
    "builder": "雙橡園開發",
    "status": "成屋",
    "tags": [
      "單元二",
      "精品住宅",
      "低密度"
    ],
    "desc": "單元二雙橡園開發、110戶、屋齡約5年、精品中層電梯，歷史最高單價約63.07萬/坪。",
    "keywords": [
      "雙橡園1812",
      "單元二重劃區",
      "雙橡園開發",
      "台中精品住宅"
    ],
    "img": "unit2_shuang1812_hero.jpg",
    "price": "最高約 63.07 萬/坪",
    "year": "屋齡約 5 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit2_shuang2279",
    "url": "projects/unit2_shuang2279.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "雙橡園2279｜單元二現代中高層大樓，180戶屋齡約1年，成交均價約78.32萬/坪",
    "h1": "雙橡園2279",
    "builder": "特區開發建設",
    "status": "新成屋",
    "tags": [
      "單元二",
      "新成屋",
      "大棟距"
    ],
    "desc": "單元二特區開發、180戶、屋齡約1年、現代中高層大樓，成交均價約78.32萬/坪、最高81.13萬/坪。",
    "keywords": [
      "雙橡園2279",
      "單元二重劃區",
      "特區開發建設",
      "南屯新成屋"
    ],
    "img": "unit2_shuang2279_hero.jpg",
    "price": "約 78.32 萬/坪",
    "year": "屋齡約 1 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit6_yuanbao_duqing",
    "url": "projects/unit6_yuanbao_duqing.html",
    "zone": "taichung_unit6_zone",
    "zoneLabel": "單元六重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "圓堡墪青｜單元六楓溪段小而美社區，25戶25–31坪，成交均價約70.67萬/坪",
    "h1": "圓堡墪青",
    "builder": "待補",
    "status": "預售／施工中",
    "tags": [
      "單元六",
      "溪景住宅",
      "小坪數"
    ],
    "desc": "單元六楓溪段、25戶25–31坪、2027 Q4完工，臨舊南屯溪景觀帶，成交均價約70.67萬/坪、最高75.84萬/坪。",
    "keywords": [
      "圓堡墪青",
      "單元六重劃區",
      "楓溪段",
      "十三期"
    ],
    "img": "unit6_yuanbao_duqing_hero.jpg",
    "price": "約 70.67 萬/坪",
    "year": "預計 2027 Q4",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit6_qiyou_zhishan",
    "url": "projects/unit6_qiyou_zhishan.html",
    "zone": "taichung_unit6_zone",
    "zoneLabel": "單元六重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "齊又新執善｜單元六樂田段中層社區，38戶26–34坪，成交均價約68.42萬/坪",
    "h1": "齊又新執善",
    "builder": "待補",
    "status": "預售／施工中",
    "tags": [
      "單元六",
      "近捷運",
      "中層社區"
    ],
    "desc": "單元六樂田段、38戶26–34坪、2028上半年完工，成交均價約68.42萬/坪、歷史最高83.80萬/坪。",
    "keywords": [
      "齊又新執善",
      "單元六重劃區",
      "樂田段",
      "十三期"
    ],
    "img": "unit6_qiyou_zhishan_hero.jpg",
    "price": "約 68.42 萬/坪",
    "year": "預計 2028 H1",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit14_huyu_hemu",
    "url": "projects/unit14_huyu_hemu.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "惠宇建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "中大坪數",
      "十四期"
    ],
    "desc": "惠宇和慕為惠宇建設在十四期重劃區推出的中大坪數預售住宅，規劃112戶、38–52坪，公開開價約64–69萬元/坪，預計2028年2月完工。",
    "keywords": [
      "惠宇和慕",
      "惠宇建設",
      "十四期重劃區",
      "北屯預售屋"
    ],
    "img": "unit14_huyu_hemu_hero.jpg",
    "price": "開價約64–69萬元/坪",
    "year": "預計2028年2月完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_huyu_mypark",
    "url": "projects/unit14_huyu_mypark.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "惠宇建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "公園宅",
      "十四期"
    ],
    "desc": "惠宇MY PARK為惠宇建設在十四期推出、主打臨公園綠景的預售住宅，規劃130戶、32–52坪，近一年成交均價約76.03萬元/坪，預計2028年第三季完工。",
    "keywords": [
      "惠宇MY PARK",
      "惠宇建設",
      "十四期重劃區",
      "臨公園宅"
    ],
    "img": "unit14_huyu_mypark_hero.jpg",
    "price": "成交均價約76.03萬元/坪",
    "year": "預計2028年第三季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_shuntian_kingsroad",
    "url": "projects/unit14_shuntian_kingsroad.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "順天建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "換屋首選",
      "十四期"
    ],
    "desc": "順天KING'S ROAD為順天建設在十四期推出的臨林蔭大道中大坪數換屋宅，規劃140戶、48–54坪，近一年成交均價約70.18萬元/坪，預計2027年第三季完工。",
    "keywords": [
      "順天KING'S ROAD",
      "順天建設",
      "十四期重劃區",
      "換屋宅"
    ],
    "img": "unit14_shuntian_kingsroad_hero.jpg",
    "price": "成交均價約70.18萬元/坪",
    "year": "預計2027年第三季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_hongrui_inter",
    "url": "projects/unit14_hongrui_inter.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "泓瑞建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "首購首選",
      "小坪數",
      "十四期"
    ],
    "desc": "泓瑞洲際之森為泓瑞建設在十四期推出的小坪數首購型住宅，鄰近洲際棒球場，規劃100戶、26–35坪，近一年成交均價約56.04萬元/坪，預計2026年第四季完工。",
    "keywords": [
      "泓瑞洲際之森",
      "泓瑞建設",
      "十四期重劃區",
      "小坪數首購"
    ],
    "img": "unit14_hongrui_inter_hero.jpg",
    "price": "成交均價約56.04萬元/坪",
    "year": "預計2026年第四季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_cathay_mostplus",
    "url": "projects/unit14_cathay_mostplus.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "國泰建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "品牌大社區",
      "十四期"
    ],
    "desc": "國泰MOST+為國泰建設在十四期推出的大型成屋社區，206戶、37–55坪，近一年成交均價約61.23萬元/坪，目前為成屋（屋齡約1年）。",
    "keywords": [
      "國泰MOST+",
      "國泰建設",
      "十四期重劃區",
      "品牌社區"
    ],
    "img": "unit14_cathay_mostplus_hero.jpg",
    "price": "成交均價約61.23萬元/坪",
    "year": "成屋，屋齡約1年",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase11_yuancheng_chungte",
    "url": "projects/phase11_yuancheng_chungte.html",
    "zone": "taichung_phase11_zone",
    "zoneLabel": "十一期重劃區",
    "district": "beitun",
    "builder": "元城建設",
    "status": "銷售中",
    "tags": [
      "電梯大樓",
      "公園宅",
      "十一期"
    ],
    "desc": "元城崇德苑位於北屯昌平東二路，元城建設推出，基地約316坪、44戶、46–49坪，臨八二三紀念公園與仁美國小，公設比約32.9%；個案開價與成交均價待補。",
    "keywords": [
      "元城崇德苑",
      "元城建設",
      "十一期重劃區",
      "八二三紀念公園"
    ],
    "img": "phase11_yuancheng_chungte_hero.jpg",
    "price": "待補",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase11_funjia_jia",
    "url": "projects/phase11_funjia_jia.html",
    "zone": "taichung_phase11_zone",
    "zoneLabel": "十一期重劃區",
    "district": "beitun",
    "builder": "馥家建設",
    "status": "銷售中",
    "tags": [
      "電梯大樓",
      "空中花園",
      "十一期"
    ],
    "desc": "馥家JIA位於北屯昌平三街，馥家建設推出，基地約262坪電梯大樓，公設含健身房與空中花園；個案坪數、開價與成交均價待補。",
    "keywords": [
      "馥家JIA",
      "馥家建設",
      "十一期重劃區",
      "昌平商圈"
    ],
    "img": "phase11_funjia_jia_hero.jpg",
    "price": "待補",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "mrt_fuyu_platinum",
    "url": "projects/mrt_fuyu_platinum.html",
    "zone": "taichung_beitun_mrt_area",
    "zoneLabel": "北屯機捷特區",
    "district": "beitun",
    "builder": "富宇建設",
    "status": "銷售中",
    "tags": [
      "新成屋",
      "捷運宅",
      "大型社區",
      "機捷特區"
    ],
    "desc": "富宇鉑金大苑為富宇建設在北屯機捷特區推出的大型首購社區，鄰近捷運綠線，711戶、2–3房21–40坪，近一年成交均價約59.51萬元/坪。",
    "keywords": [
      "富宇鉑金大苑",
      "富宇建設",
      "北屯機捷特區",
      "捷運宅"
    ],
    "img": "mrt_fuyu_platinum_hero.jpg",
    "price": "成交均價約59.51萬元/坪",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "mrt_juhong_gcasa",
    "url": "projects/mrt_juhong_gcasa.html",
    "zone": "taichung_beitun_mrt_area",
    "zoneLabel": "北屯機捷特區",
    "district": "beitun",
    "builder": "鉅虹建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "捷運宅",
      "精品小宅",
      "機捷特區"
    ],
    "desc": "鉅虹GCASA為鉅虹建設在北屯機捷特區推出的精緻2–3房小宅，68戶、27–35坪，屋齡約6年，近一年成交均價約52.43萬元/坪。",
    "keywords": [
      "鉅虹GCASA",
      "鉅虹建設",
      "北屯機捷特區",
      "精品小宅"
    ],
    "img": "mrt_juhong_gcasa_hero.jpg",
    "price": "成交均價約52.43萬元/坪",
    "year": "成屋，屋齡約6年",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase9_xinzhonghui",
    "url": "projects/phase9_xinzhonghui.html",
    "zone": "taichung_phase9_zone",
    "zoneLabel": "九期重劃區",
    "district": "east",
    "districtLabel": "東區",
    "title": "新中匯｜勝麗建設在台中九期旱溪的電梯大樓解析（基地/房型/成交）",
    "h1": "新中匯",
    "builder": "勝麗建設",
    "status": "已完工",
    "tags": [
      "電梯大樓",
      "成熟機能"
    ],
    "desc": "勝麗建設在東區旱溪市地重劃內的地上15層電梯大樓，119戶、建坪37~52坪3~4房，2017年完工。",
    "keywords": [
      "新中匯",
      "勝麗建設",
      "九期重劃",
      "東區旱溪",
      "台中電梯大樓"
    ],
    "img": "phase9_xinzhonghui_tower.jpg",
    "price": "近期約33~35.5萬/坪（全期均價約17.6萬/坪）",
    "year": "2017-07",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "phase9_leye_shuangxin",
    "url": "projects/phase9_leye_shuangxin.html",
    "zone": "taichung_phase9_zone",
    "zoneLabel": "九期重劃區",
    "district": "east",
    "districtLabel": "東區",
    "title": "樂業雙心｜敦陽開發在台中九期旱溪的電梯別墅解析（基地/地坪）",
    "h1": "樂業雙心",
    "builder": "敦陽開發",
    "status": "成屋",
    "tags": [
      "電梯別墅",
      "低密度"
    ],
    "desc": "敦陽開發在東區旱溪街19巷的微型電梯別墅，僅2戶、地上6層、地坪53~58坪、建坪154~159坪。",
    "keywords": [
      "樂業雙心",
      "敦陽開發",
      "九期重劃",
      "東區旱溪",
      "電梯別墅"
    ],
    "img": "phase9_leye_villa.jpg",
    "price": "待補",
    "year": "待補",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "phase10_jiafu_qianyi",
    "url": "projects/phase10_jiafu_qianyi.html",
    "zone": "taichung_phase10_zone",
    "zoneLabel": "十期重劃區",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "佳福謙邑｜佳福建設在台中十期軍功的三棟式社區大樓解析",
    "h1": "佳福謙邑",
    "builder": "佳福建設",
    "status": "已完銷",
    "tags": [
      "電梯大樓",
      "綠地公園"
    ],
    "desc": "佳福建設在北屯新十期軍福十三路的三棟式社區大樓，基地約1064坪、199戶、建坪43~60坪3~4房，寶之林公園旁。",
    "keywords": [
      "佳福謙邑",
      "佳福建設",
      "十期重劃",
      "軍功市地重劃",
      "三棟式社區"
    ],
    "img": "phase10_jiafu_community.jpg",
    "price": "成交單價待補（車位平面約110萬、機械約55萬起）",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "phase10_yousong_qianjing",
    "url": "projects/phase10_yousong_qianjing.html",
    "zone": "taichung_phase10_zone",
    "zoneLabel": "十期重劃區",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "佑崧千境｜佑崧營造在台中十期太原路綠園道的電梯別墅解析",
    "h1": "佑崧千境",
    "builder": "佑崧營造",
    "status": "已完工",
    "tags": [
      "電梯別墅",
      "運動休閒"
    ],
    "desc": "佑崧營造在新十期太原路綠園道、大坑第一排的電梯別墅聚落，基地約1551坪、51戶、建坪54~116坪。",
    "keywords": [
      "佑崧千境",
      "佑崧營造",
      "十期重劃",
      "太原路綠園道",
      "電梯別墅"
    ],
    "img": "phase10_yousong_villa.jpg",
    "price": "總價約1388萬~1988萬起",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit8_huaku_dinghui",
    "url": "projects/unit8_huaku_dinghui.html",
    "zone": "taichung_unit8_zone",
    "zoneLabel": "單元八",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "華固頂滙｜華固建設在台中單元八水湳旁的27層雙塔地標解析",
    "h1": "華固頂滙",
    "builder": "華固建設",
    "status": "興建中",
    "tags": [
      "電梯大樓",
      "綠地公園"
    ],
    "desc": "華固建設在單元八北側的A/B雙塔高樓地標，基地約3243坪、地上27層、260戶住家，均價約80萬/坪。",
    "keywords": [
      "華固頂滙",
      "華固建設",
      "單元八",
      "水湳建案",
      "鑫港尾段"
    ],
    "img": "unit8_huaku_landmark.jpg",
    "price": "約80萬/坪",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit8_zongtai_zhixu",
    "url": "projects/unit8_zongtai_zhixu.html",
    "zone": "taichung_unit8_zone",
    "zoneLabel": "單元八",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "總太之序｜總太營造在台中單元八敦化路南側的20層住宅解析",
    "h1": "總太之序",
    "builder": "總太營造",
    "status": "興建中",
    "tags": [
      "電梯大樓",
      "成熟機能"
    ],
    "desc": "富華創新建設、總太營造在單元八南側敦化路二段的地上20層住宅，190戶、3房47.6/52坪，開價約70~75萬/坪。",
    "keywords": [
      "總太之序",
      "總太營造",
      "富華創新",
      "單元八",
      "敦化路重劃"
    ],
    "img": "unit8_zongtai_residence.jpg",
    "price": "開價約70~75萬/坪（近一年均價約69.54萬/坪）",
    "year": "預計2027Q4",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit1_dexin_xiehe",
    "url": "projects/unit1_dexin_xiehe.html",
    "zone": "taichung_unit1_zone",
    "zoneLabel": "單元一重劃區（安和自辦）",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "德鑫協和｜台中單元一建案解析：朝馬路2303坪基地、131戶與開價",
    "h1": "德鑫協和",
    "builder": "德鑫建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元一",
      "德鑫"
    ],
    "desc": "德鑫建設於西屯單元一朝馬路安和西路口推出，基地約2303坪、131戶，二房30坪到三房37至40坪，開價58至64萬/坪。",
    "keywords": [
      "德鑫協和",
      "德鑫建設",
      "單元一建案",
      "朝馬路",
      "安和路"
    ],
    "img": "unit1_dexin_xiehe_hero.jpg",
    "price": "開價 58–64 萬/坪",
    "year": "預計 2027 年第四季完工",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit1_kunlianfa_zhongkehui",
    "url": "projects/unit1_kunlianfa_zhongkehui.html",
    "zone": "taichung_unit1_zone",
    "zoneLabel": "單元一重劃區（安和自辦）",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "坤聯發中科匯｜台中單元一建案解析：安和路實價成交約57萬/坪",
    "h1": "坤聯發中科匯",
    "builder": "坤聯發建設",
    "status": "成屋",
    "tags": [
      "住宅區",
      "單元一",
      "坤聯發"
    ],
    "desc": "坤聯發建設於西屯安和路169號推出，591實價51筆，成交約57.1萬/坪（114-10案13樓），為3房約46.4坪格局。",
    "keywords": [
      "坤聯發中科匯",
      "坤聯發建設",
      "單元一建案",
      "安和路",
      "中科匯"
    ],
    "img": "unit1_kunlianfa_zhongkehui_hero.jpg",
    "price": "實價成交約 57.1 萬/坪（51筆）",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit3_fongyi_gtower",
    "url": "projects/unit3_fongyi_gtower.html",
    "zone": "taichung_unit3_zone",
    "zoneLabel": "單元三重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑G TOWER｜台中單元三建案解析：五權西路27樓地標、總價3158萬起",
    "h1": "豐邑G TOWER",
    "builder": "豐邑建設",
    "status": "新成屋",
    "tags": [
      "住宅區",
      "單元三",
      "豐邑"
    ],
    "desc": "豐邑建設於南屯五權西路二段1027號推出，基地約1828坪、地上27樓，3至4房45至60坪，總價3158萬/戶、車位270萬。",
    "keywords": [
      "豐邑G TOWER",
      "豐邑建設",
      "單元三建案",
      "五權西路",
      "27樓"
    ],
    "img": "unit3_fongyi_gtower_hero.jpg",
    "price": "總價 3158 萬/戶、車位 270 萬",
    "year": "新成屋（隨時交屋）",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit3_fongyi_dajingfengyi",
    "url": "projects/unit3_fongyi_dajingfengyi.html",
    "zone": "taichung_unit3_zone",
    "zoneLabel": "單元三重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑大境豐藝｜台中單元三建案解析：向上路三段96戶24F均價約37萬/坪",
    "h1": "豐邑大境豐藝",
    "builder": "豐邑建設",
    "status": "成屋",
    "tags": [
      "住宅區",
      "單元三",
      "豐邑"
    ],
    "desc": "豐邑建設於南屯向上路三段113號推出，96戶、總樓層24F一層四戶兩梯ABCD四棟，591實價108筆均價約37.3萬/坪。",
    "keywords": [
      "豐邑大境豐藝",
      "豐邑建設",
      "單元三建案",
      "向上路三段",
      "24F"
    ],
    "img": "unit3_fongyi_dajingfengyi_hero.jpg",
    "price": "實價均價約 37.3 萬/坪（108筆）",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit5_luhe_changyuso",
    "url": "projects/unit5_luhe_changyuso.html",
    "zone": "taichung_unit5_zone",
    "zoneLabel": "單元五重劃區（高鐵新市鎮）",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "陸禾誠寓所｜台中單元五建案解析：43戶1至2房、近一年均價約57萬/坪",
    "h1": "陸禾誠寓所",
    "builder": "陸禾建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元五",
      "陸禾"
    ],
    "desc": "陸禾建設於南屯單元五高鐵新市鎮推出，43戶、1至2房18至32坪，591開價52至59萬/坪，近一年均價約56.93萬/坪，預計2026年第四季完工。",
    "keywords": [
      "陸禾誠寓所",
      "陸禾建設",
      "單元五建案",
      "高鐵新市鎮",
      "首購小宅"
    ],
    "img": "unit5_luhe_changyuso_hero.jpg",
    "price": "開價 52–59 萬/坪、近一年均價 56.93 萬/坪",
    "year": "預計 2026 年第四季完工",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit5_fongqian_zhide",
    "url": "projects/unit5_fongqian_zhide.html",
    "zone": "taichung_unit5_zone",
    "zoneLabel": "單元五重劃區（高鐵新市鎮）",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐謙植得｜台中單元五建案解析：93戶3至4房、近一年均價約64.5萬/坪",
    "h1": "豐謙植得",
    "builder": "豐謙建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元五",
      "豐謙"
    ],
    "desc": "豐謙建設於南屯單元五高鐵新市鎮推出，93戶、3至4房37至44坪，近一年均價約64.50萬/坪、歷史最高約67.20萬/坪，預計2027年第二季完工。",
    "keywords": [
      "豐謙植得",
      "豐謙建設",
      "單元五建案",
      "高鐵新市鎮",
      "換屋大樓"
    ],
    "img": "unit5_fongqian_zhide_hero.jpg",
    "price": "近一年均價約 64.50 萬/坪、歷史最高約 67.20",
    "year": "預計 2027 年第二季完工",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "lingdong_mutang_yushu",
    "url": "projects/lingdong_mutang_yushu.html",
    "zone": "taichung_lingdong_area",
    "zoneLabel": "嶺東特區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "睦唐與樹｜台中嶺東特區建案解析：春安一街12層、總價1198萬起",
    "h1": "睦唐與樹",
    "builder": "待補",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "嶺東特區",
      "大學生活圈"
    ],
    "desc": "嶺東特區預售案，位南屯春安一街與春安路57巷口，12層、二房27至33坪三房36至39坪，每坪約40萬、總價1198萬起。",
    "keywords": [
      "睦唐與樹",
      "嶺東建案",
      "春安一街",
      "嶺東特區",
      "預售小宅"
    ],
    "img": "lingdong_mutang_yushu_hero.jpg",
    "price": "約 40 萬/坪、總價 1198 萬起",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "lingdong_fongyi_jingkecheng",
    "url": "projects/lingdong_fongyi_jingkecheng.html",
    "zone": "taichung_lingdong_area",
    "zoneLabel": "嶺東特區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑菁科城｜台中嶺東特區建案解析：春安路536戶大型社區",
    "h1": "豐邑菁科城",
    "builder": "豐邑建設",
    "status": "成屋",
    "tags": [
      "大型社區",
      "嶺東特區",
      "豐邑",
      "大學生活圈"
    ],
    "desc": "豐邑建設於南屯春安路113號推出，536戶大型電梯社區，公設含中庭花園、視聽中心、遊戲室、交誼廳、會議室與屋頂花園，緊鄰嶺東科大。",
    "keywords": [
      "豐邑菁科城",
      "豐邑建設",
      "嶺東建案",
      "春安路",
      "536戶"
    ],
    "img": "lingdong_fongyi_jingkecheng_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "wuri_dengyang_futurehills",
    "url": "projects/wuri_dengyang_futurehills.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "登陽建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "高鐵宅",
      "三鐵共構",
      "烏日"
    ],
    "desc": "登陽未來之丘位於烏日高鐵東路397號，登陽建設推出，約414戶、26–45坪2–3房，新成屋，近一年成交均價約45.74萬元/坪、歷史最高約60.46萬元/坪，是烏日高鐵特區少數已進入成屋市場交易的指標大樓。",
    "keywords": [
      "登陽未來之丘",
      "登陽建設",
      "烏日高鐵特區",
      "高鐵東路",
      "新成屋"
    ],
    "img": "wuri_dengyang_futurehills_hero.jpg",
    "price": "成交均價約45.74萬元/坪",
    "year": "新成屋（約0年）",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_dahua_zongheng",
    "url": "projects/wuri_dahua_zongheng.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "大華建設",
    "status": "預售",
    "tags": [
      "站前大案",
      "千戶社區",
      "三鐵共構",
      "烏日"
    ],
    "desc": "大華縱橫位於烏日高鐵台中站站前，大華建設推出，約1153戶、22–43坪，與達麗白天鵝合計總銷約340億元，近一年成交均價約55.45萬元/坪、歷史最高約60.18萬元/坪，預計2026年第三季完工。",
    "keywords": [
      "大華縱橫",
      "大華建設",
      "烏日高鐵特區",
      "高鐵站前",
      "預售屋"
    ],
    "img": "wuri_dahua_zongheng_hero.jpg",
    "price": "成交均價約55.45萬元/坪",
    "year": "預計2026年第三季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_dali_whiteswan",
    "url": "projects/wuri_dali_whiteswan.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "達麗建設",
    "status": "預售",
    "tags": [
      "站前大案",
      "千戶社區",
      "高單價",
      "烏日"
    ],
    "desc": "達麗白天鵝位於烏日高鐵特區，達麗建設推出，約1229戶、22–46坪，與大華縱橫合計總銷約340億元，近一年成交均價約58.71萬元/坪、歷史最高約62.28萬元/坪，為烏日單價前段班，預計2027年第三季完工。",
    "keywords": [
      "達麗白天鵝",
      "達麗建設",
      "烏日高鐵特區",
      "預售屋",
      "高單價"
    ],
    "img": "wuri_dali_whiteswan_hero.jpg",
    "price": "成交均價約58.71萬元/坪",
    "year": "預計2027年第三季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_sakura_dazan",
    "url": "projects/wuri_sakura_dazan.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "櫻花建設",
    "status": "預售",
    "tags": [
      "中庭社區",
      "高鐵宅",
      "小坪數",
      "烏日"
    ],
    "desc": "櫻花大綻位於烏日高鐵特區，櫻花建設推出，約428戶、19–48坪，走精緻中庭路線，近一年成交均價約46.38萬元/坪、歷史最高約49.57萬元/坪，是相對務實的高鐵特區進門票，預計2028年第一季完工。",
    "keywords": [
      "櫻花大綻",
      "櫻花建設",
      "烏日高鐵特區",
      "預售屋",
      "首購"
    ],
    "img": "wuri_sakura_dazan_hero.jpg",
    "price": "成交均價約46.38萬元/坪",
    "year": "預計2028年第一季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_menghuancheng",
    "url": "projects/wuri_menghuancheng.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "待補",
    "status": "成屋",
    "tags": [
      "千戶社區",
      "成屋",
      "烏日"
    ],
    "desc": "夢幻誠位於烏日高鐵特區，約1674戶大型成屋造鎮社區、22–34坪，屋齡約3年，已進入二手市場流通，近一年成交均價約44.88萬元/坪、歷史最高約55.55萬元/坪；建商資訊待補。",
    "keywords": [
      "夢幻誠",
      "烏日高鐵特區",
      "千戶大社區",
      "成屋",
      "實價登錄"
    ],
    "img": "wuri_menghuancheng_hero.jpg",
    "price": "成交均價約44.88萬元/坪",
    "year": "成屋，屋齡約3年",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "taiping_fuyu_ledele",
    "url": "projects/taiping_fuyu_ledele.html",
    "zone": "taichung_taiping_xinguang_area",
    "zoneLabel": "太平新光特區",
    "district": "taiping",
    "builder": "富宇建設",
    "status": "成屋",
    "tags": [
      "學區宅",
      "大坪數",
      "成屋",
      "太平"
    ],
    "desc": "富宇讀樂樂位於太平區新福路876號，富宇建設推出，約164戶、37–72坪3–4房，平面車位約243個，緊鄰新光國小與新光國中9年學區，近約成交均價約35–39萬元/坪（不同平台口徑），屋齡約6年。",
    "keywords": [
      "富宇讀樂樂",
      "富宇建設",
      "太平新光特區",
      "新光學區",
      "新福路"
    ],
    "img": "taiping_fuyu_ledele_hero.jpg",
    "price": "成交均價約35–39萬元/坪",
    "year": "成屋，屋齡約6年",
    "districtLabel": "西屯區",
    "county": "taiping",
    "countyLabel": "西屯區"
  },
  {
    "id": "taiping_shinguang_heyuan",
    "url": "projects/taiping_shinguang_heyuan.html",
    "zone": "taichung_taiping_xinguang_area",
    "zoneLabel": "太平新光特區",
    "district": "taiping",
    "builder": "明產建設",
    "status": "成屋",
    "tags": [
      "店住大樓",
      "成屋",
      "太平"
    ],
    "desc": "新光和園位於太平區祥順路一段，明產建設推出，基地約900坪電梯店住大樓、房型29.5–38坪、公設比約29.4%；本案成交均價待補，區域2025年後大樓行情約29萬元/坪僅供參考。",
    "keywords": [
      "新光和園",
      "明產建設",
      "太平新光特區",
      "祥順路",
      "店住大樓"
    ],
    "img": "taiping_shinguang_heyuan_hero.jpg",
    "price": "待補",
    "year": "成屋",
    "districtLabel": "西屯區",
    "county": "taiping",
    "countyLabel": "西屯區"
  },
  {
    "id": "dali_yunjiang_kanghuo",
    "url": "projects/dali_yunjiang_kanghuo.html",
    "zone": "taichung_dali_area",
    "zoneLabel": "大里重劃區",
    "district": "dali",
    "builder": "允將建設",
    "status": "成屋",
    "tags": [
      "興大生活圈",
      "成屋",
      "大里"
    ],
    "desc": "允將康活位於大里區祥興路529號興大旁，允將建設推出，約176戶，平面車位約103個＋機械約88個，屋齡約7年，近一年成交均價約40.0萬元/坪、累計約248筆實價成交。",
    "keywords": [
      "允將康活",
      "允將建設",
      "大里重劃區",
      "興大",
      "祥興路"
    ],
    "img": "dali_yunjiang_kanghuo_hero.jpg",
    "price": "成交均價約40.0萬元/坪",
    "year": "成屋，屋齡約7年",
    "districtLabel": "西屯區",
    "county": "dali",
    "countyLabel": "西屯區"
  },
  {
    "id": "dali_shuntian_dadi",
    "url": "projects/dali_shuntian_dadi.html",
    "zone": "taichung_dali_area",
    "zoneLabel": "大里重劃區",
    "district": "dali",
    "builder": "待補",
    "status": "成屋",
    "tags": [
      "成熟社區",
      "低總價",
      "大里"
    ],
    "desc": "順天大邸位於大里區中興路二段151號，大里舊市區成熟電梯大廈社區，成交均價約20.2萬元/坪、累計約82筆實價成交；建商、戶數與坪數帶待補。",
    "keywords": [
      "順天大邸",
      "大里重劃區",
      "中興路二段",
      "成熟社區",
      "低總價"
    ],
    "img": "dali_shuntian_dadi_hero.jpg",
    "price": "成交均價約20.2萬元/坪",
    "year": "成熟社區（待補）",
    "districtLabel": "西屯區",
    "county": "dali",
    "countyLabel": "西屯區"
  },
  {
    "id": "shalu_kunyue_muguangdi",
    "url": "projects/shalu_kunyue_muguangdi.html",
    "zone": "taichung_shalu_area",
    "zoneLabel": "沙鹿重劃區",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "坤悅沐光邸｜沙鹿新光田特區預售華廈建案解析：基地、房型與行情",
    "h1": "坤悅沐光邸",
    "builder": "坤悅建設",
    "status": "興建中",
    "tags": [
      "沙鹿",
      "預售屋",
      "電梯華廈"
    ],
    "desc": "坤悅建設沙鹿正德路預售電梯華廈，2–3房、26.87–34.34坪，總價1018萬/戶起，預計2026下半年完工。",
    "keywords": [
      "坤悅沐光邸",
      "沙鹿建案",
      "新光田特區",
      "坤悅建設"
    ],
    "img": "shalu_kunyue_muguangdi_hero.jpg",
    "price": "總價1018萬/戶起",
    "year": "預計2026下半年",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "shalu_shidai_yijing",
    "url": "projects/shalu_shidai_yijing.html",
    "zone": "taichung_shalu_area",
    "zoneLabel": "沙鹿重劃區",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "時代一景｜沙鹿新光田特區自立路大樓建案解析：基地、房型與行情",
    "h1": "時代一景",
    "builder": "待補",
    "status": "已落成",
    "tags": [
      "沙鹿",
      "住宅大樓",
      "新光田特區"
    ],
    "desc": "沙鹿自立路社區大樓，地上7層地下2層、2–3房、28–34.2坪、約132戶、基地約1500坪。",
    "keywords": [
      "時代一景",
      "沙鹿建案",
      "自立路",
      "新光田特區"
    ],
    "img": "shalu_shidai_yijing_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "fengyuan_kunyue_junpin",
    "url": "projects/fengyuan_kunyue_junpin.html",
    "zone": "taichung_fengyuan_area",
    "zoneLabel": "豐原重劃區",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "坤悅君品｜豐原豐南保康路指標住宅大樓解析：基地、房型與成交行情",
    "h1": "坤悅君品",
    "builder": "坤悅建設",
    "status": "已落成",
    "tags": [
      "豐原",
      "住宅大樓",
      "豐南生活圈"
    ],
    "desc": "坤悅建設豐原豐南保康路指標大樓，110戶、屋齡約10年，近1年成交均價約36.5萬/坪、188筆成交。",
    "keywords": [
      "坤悅君品",
      "豐原建案",
      "豐南生活圈",
      "保康路"
    ],
    "img": "fengyuan_kunyue_junpin_hero.jpg",
    "price": "約36.5萬/坪",
    "year": "屋齡約10年",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  },
  {
    "id": "fengyuan_dalai_fengzuan",
    "url": "projects/fengyuan_dalai_fengzuan.html",
    "zone": "taichung_fengyuan_area",
    "zoneLabel": "豐原重劃區",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "大錸豐鑽｜豐原豐田路巷內社區大樓解析：成交行情與地段價差",
    "h1": "大錸豐鑽",
    "builder": "待補",
    "status": "已落成",
    "tags": [
      "豐原",
      "住宅大樓",
      "豐南生活圈"
    ],
    "desc": "豐原豐田路巷內社區大樓，成交均價約20.5萬/坪、21筆成交，對照豐南生活圈約35.4萬/坪看地段價差。",
    "keywords": [
      "大錸豐鑽",
      "豐原建案",
      "豐田路",
      "豐南生活圈"
    ],
    "img": "fengyuan_dalai_fengzuan_hero.jpg",
    "price": "約20.5萬/坪",
    "year": "待補",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  }
];

const RZ_SEARCH_INDEX = [
  {
    "id": "taichung_qiqi_district",
    "url": "zones/taichung_qiqi_district.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中七期重劃區全解析｜豪宅聚落、百貨商圈與市政核心",
    "h1": "七期重劃區（台中市）",
    "dev": "自辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "商業核心",
      "豪宅聚落",
      "百貨商圈",
      "捷運宅"
    ],
    "desc": "台中新市政中心與豪宅聚落，新光三越、大遠百、國家歌劇院與捷運綠線串聯的商業軸心。",
    "keywords": [
      "七期重劃區",
      "七期",
      "新市政中心",
      "台中豪宅",
      "惠來重劃"
    ],
    "img": "qiqi_district_hero.jpg",
    "area": "約 353 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_shuinan_park",
    "url": "zones/taichung_shuinan_park.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中水湳經貿園區全解析｜中央公園、會展與轉運新核心",
    "h1": "水湳經貿園區（台中市）",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "生態公園",
      "會展文化",
      "新市政核心",
      "轉運接駁"
    ],
    "desc": "水湳機場舊址改建的智慧城，約 67 公頃中央生態公園、國際會展中心與水湳轉運中心。",
    "keywords": [
      "水湳經貿園區",
      "水湳",
      "中央公園",
      "台中國際會展中心",
      "水湳轉運中心"
    ],
    "img": "shuinan_park_hero.jpg",
    "area": "約 254 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_phase12_zone",
    "url": "zones/taichung_phase12_zone.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中十二期重劃區全解析｜西屯住宅重劃、緊鄰七期與水湳",
    "h1": "十二期重劃區（台中市）",
    "dev": "市地重劃",
    "status": "已大量進駐",
    "tags": [
      "住宅重劃",
      "新古屋聚落",
      "雙商圈生活圈",
      "中科通勤"
    ],
    "desc": "西屯區介於七期與水湳之間的住宅型重劃區，被西屯路分成北十二期與南十二期，享雙商圈外溢。",
    "keywords": [
      "十二期重劃區",
      "台中十二期",
      "西屯十二期",
      "北十二期",
      "南十二期"
    ],
    "img": "phase12_zone_hero.jpg",
    "area": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_phase8_zone",
    "url": "zones/taichung_phase8_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中八期重劃區全解析｜豐樂公園、文心森林公園與南屯成熟機能",
    "h1": "八期重劃區",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "綠地公園",
      "文教特區",
      "捷運宅",
      "成熟商圈"
    ],
    "desc": "八期又稱豐樂市地重劃，約148公頃，南屯區核心，豐樂雕塑公園、文心森林公園、Costco與中捷綠線G10a至G12站環繞。",
    "keywords": [
      "八期重劃區",
      "豐樂重劃",
      "豐樂雕塑公園",
      "文心森林公園",
      "台中南屯重劃"
    ],
    "img": "phase8_fengle_park_hero.jpg",
    "area": "約 148 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_phase13_zone",
    "url": "zones/taichung_phase13_zone.html",
    "district": "south",
    "districtLabel": "南區",
    "title": "台中十三期重劃區全解析｜大慶雙鐵、229公頃公辦與新八期發展",
    "h1": "十三期重劃區",
    "dev": "公辦市地重劃",
    "status": "開發中",
    "tags": [
      "交通樞紐",
      "綠地公園",
      "新重劃區",
      "雙鐵共構"
    ],
    "desc": "十三期大慶市地重劃約229公頃，南屯為主跨南區，自辦單元六七整併為公辦，雙鐵共構大慶站、G13捷運、舊南屯溪景觀帶。",
    "keywords": [
      "十三期重劃區",
      "大慶重劃",
      "新八期",
      "台中大慶火車站",
      "麻糍埔遺址"
    ],
    "img": "phase13_daqing_metro_hero.jpg",
    "area": "約 229 公頃",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "taichung_unit2_zone",
    "url": "zones/taichung_unit2_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元二重劃區全解析｜黎明自辦重劃、低密度豪宅與七期後花園",
    "h1": "單元二重劃區",
    "dev": "自辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "豪宅聚落",
      "生態宜居",
      "低密度",
      "近七期"
    ],
    "desc": "單元二又稱黎明自辦市地重劃，約186公頃，前身黎明新村，低建蔽低密度純住宅，緊鄰七期百貨商圈，近一年成交均價約66.74萬/坪。",
    "keywords": [
      "單元二",
      "黎明重劃區",
      "台中重劃區",
      "自辦市地重劃",
      "黎明新村"
    ],
    "img": "unit2_zone_hero.jpg",
    "area": "約 186 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit6_zone",
    "url": "zones/taichung_unit6_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元六重劃區全解析｜楓溪、樂田段低密純住宅與舊南屯溪",
    "h1": "單元六重劃區",
    "dev": "自辦市地重劃",
    "status": "開發中",
    "tags": [
      "綠地公園",
      "靜巷純住宅",
      "新重劃區",
      "溪景住宅"
    ],
    "desc": "整體開發地區單元六（與七）位於南屯大慶一帶，自辦重劃後併入十三期，範圍約在西川一路、環中路、南屯溪、文心南七路、建國北路之間，以楓溪、樂田段低密純住宅與舊南屯溪景觀帶為特色。",
    "keywords": [
      "單元六重劃區",
      "楓溪段",
      "樂田段",
      "舊南屯溪",
      "台中自辦重劃"
    ],
    "img": "unit6_fengxi_creek_hero.jpg",
    "area": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit14_zone",
    "url": "zones/taichung_unit14_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "十四期重劃區",
    "h1": "十四期重劃區（美和庄）",
    "dev": "公辦市地重劃",
    "status": "發展中",
    "tags": [
      "洲際棒球場",
      "漢神洲際",
      "台中巨蛋",
      "新興重劃區"
    ],
    "desc": "十四期（美和庄）是台中近40年最大的公辦市地重劃區，約403.89公頃，擁有洲際棒球場、2026年開幕的漢神洲際購物廣場與目標2030年完工的台中巨蛋，是北台中新興發展熱區。",
    "keywords": [
      "十四期重劃區",
      "美和庄",
      "洲際棒球場",
      "漢神洲際",
      "台中巨蛋",
      "北屯重劃區"
    ],
    "img": "unit14_zone_hero.jpg",
    "area": "約403.89公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_phase11_zone",
    "url": "zones/taichung_phase11_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "十一期重劃區",
    "h1": "十一期重劃區（崇德・昌平商圈）",
    "dev": "公辦市地重劃",
    "status": "發展成熟",
    "tags": [
      "小天母",
      "崇德商圈",
      "八二三紀念公園",
      "學區宅"
    ],
    "desc": "十一期於民國82年發布公辦市地重劃，約141.02公頃，範圍涵蓋北屯崇德、昌平商圈，有「小天母」之稱，擁有八二三紀念公園、馬禮遜與衛道等學區，並鄰捷運文心崇德站與台鐵松竹站。",
    "keywords": [
      "十一期重劃區",
      "崇德商圈",
      "昌平商圈",
      "小天母",
      "八二三紀念公園",
      "北屯"
    ],
    "img": "phase11_zone_hero.jpg",
    "area": "約141.02公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_beitun_mrt_area",
    "url": "zones/taichung_beitun_mrt_area.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "北屯機捷特區",
    "h1": "北屯機捷特區",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "捷運綠線",
      "北屯機廠",
      "Costco",
      "軌道導向"
    ],
    "desc": "北屯機捷特區配合台中捷運綠線北屯機廠、北屯總站G0與舊社站G3，於民國100年以區段徵收開發，約103.43公頃，擁有三座捷運站、兩座台鐵站、Costco好市多與台74線匝道，是北台中首購熱區。",
    "keywords": [
      "北屯機捷特區",
      "北屯機廠",
      "台中捷運綠線",
      "北屯總站",
      "舊社站",
      "Costco北屯"
    ],
    "img": "beitun_mrt_area_hero.jpg",
    "area": "約103.43公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_phase9_zone",
    "url": "zones/taichung_phase9_zone.html",
    "district": "east",
    "districtLabel": "東區",
    "title": "台中九期重劃區全解析｜旱溪市地重劃、低密度透天與東區生活圈",
    "h1": "九期重劃區（旱溪）",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "低密度",
      "綠地公園",
      "水岸住宅"
    ],
    "desc": "九期旱溪市地重劃位於台中市東區，約120公頃、1994年完成，第一種住宅區低密度透天為主，旱溪與大里溪流經。",
    "keywords": [
      "九期重劃區",
      "旱溪市地重劃",
      "東區重劃",
      "九期"
    ],
    "img": "phase9_hanxi_villa_zone.jpg",
    "area": "約 120 公頃",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "taichung_phase10_zone",
    "url": "zones/taichung_phase10_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "台中十期重劃區全解析｜軍功水景市地重劃、太原路綠園道與大坑山景",
    "h1": "十期重劃區（軍功水景）",
    "dev": "公辦市地重劃",
    "status": "已開發成熟",
    "tags": [
      "低密度",
      "綠地公園",
      "運動休閒"
    ],
    "desc": "十期軍功水景市地重劃位於台中市北屯區，約221公頃、2000年完成，50米太原路綠園道與大坑風景區為特色。",
    "keywords": [
      "十期重劃區",
      "軍功水景",
      "軍功市地重劃",
      "北屯重劃",
      "太原路綠園道"
    ],
    "img": "phase10_jungong_hillside.jpg",
    "area": "約 221 公頃",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_unit8_zone",
    "url": "zones/taichung_unit8_zone.html",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "台中單元八重劃區全解析｜水湳東側自辦住宅區、敦化路生活圈與房價",
    "h1": "單元八重劃區",
    "dev": "自辦市地重劃",
    "status": "發展中",
    "tags": [
      "綠地公園",
      "生態宜居",
      "市郊新城"
    ],
    "desc": "單元八是水湳經貿園區東側的自辦市地重劃，隔經貿路與文商段相望，生活機能發展最快，敦化路南北側房價約67至80萬/坪；實際跨西屯與北屯交界。",
    "keywords": [
      "單元八重劃區",
      "單元八",
      "水湳單元八",
      "經貿路重劃",
      "敦化路重劃"
    ],
    "img": "unit8_shuinan_residential.jpg",
    "area": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "taichung_unit1_zone",
    "url": "zones/taichung_unit1_zone.html",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中單元一重劃區（安和自辦）全解析｜西屯55.89公頃純住宅街廓",
    "h1": "單元一重劃區（安和自辦）",
    "dev": "自辦市地重劃",
    "status": "已完成重劃",
    "tags": [
      "住宅區",
      "低密度",
      "綠地公園"
    ],
    "desc": "台中西屯安和自辦市地重劃，55.89公頃、933名所有權人共同持分開發，朝馬路與安和路一帶的方正純住宅街廓。",
    "keywords": [
      "單元一重劃區",
      "安和自辦",
      "西屯重劃",
      "朝馬路",
      "安和路"
    ],
    "img": "unit1_zone_hero.jpg",
    "area": "約 55.89 公頃",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "taichung_unit3_zone",
    "url": "zones/taichung_unit3_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元三重劃區全解析｜五權西路林蔭大道、逾5萬坪綠覆",
    "h1": "單元三重劃區",
    "dev": "自辦市地重劃",
    "status": "發展成熟",
    "tags": [
      "住宅區",
      "低密度",
      "綠地公園"
    ],
    "desc": "台中南屯單元三重劃區，五權西路二段與向上路三段一帶，林蔭大道、逾5萬坪綠覆，串聯五期公益路與八期好市多商圈。",
    "keywords": [
      "單元三重劃區",
      "南屯重劃",
      "五權西路",
      "向上路三段",
      "林蔭大道"
    ],
    "img": "unit3_zone_hero.jpg",
    "area": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_unit5_zone",
    "url": "zones/taichung_unit5_zone.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中單元五重劃區（高鐵新市鎮）全解析｜70.18公頃純住宅、生態公園與足球園區",
    "h1": "單元五重劃區（高鐵新市鎮）",
    "dev": "自辦市地重劃",
    "status": "已完成重劃",
    "tags": [
      "住宅區",
      "低密度",
      "生態宜居",
      "綠地公園",
      "運動休閒"
    ],
    "desc": "台中南屯高鐵新市鎮自辦市地重劃，70.18公頃純住宅，擁約1.3萬坪生態公園與斥資15億的足球運動休閒園區，近捷運高鐵與74號快速道路。",
    "keywords": [
      "單元五重劃區",
      "高鐵新市鎮",
      "南屯重劃",
      "生態公園",
      "足球園區"
    ],
    "img": "unit5_zone_hero.jpg",
    "area": "約 70.18 公頃",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_lingdong_area",
    "url": "zones/taichung_lingdong_area.html",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "台中嶺東特區全解析｜嶺東科大與台中精密機械園區、彩虹眷村所在",
    "h1": "嶺東特區",
    "dev": "特定區計畫",
    "status": "發展中",
    "tags": [
      "產業園區",
      "文教特區",
      "住宅區"
    ],
    "desc": "台中南屯春社里嶺東一帶，嶺東科技大學春安校區與約124公頃台中精密機械科技創新園區所在，山腳大學城與彩虹眷村生活圈。",
    "keywords": [
      "嶺東特區",
      "嶺東科技大學",
      "台中精密機械園區",
      "春安里",
      "彩虹眷村"
    ],
    "img": "lingdong_area_hero.jpg",
    "area": "約 124 公頃（精密機械園區）",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "taichung_wuri_hsr_area",
    "url": "zones/taichung_wuri_hsr_area.html",
    "district": "wuri",
    "districtLabel": "烏日區",
    "title": "烏日高鐵特區",
    "h1": "烏日高鐵特區",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "高鐵台中站",
      "三鐵共構",
      "D-ONE第一大天地",
      "凱賓斯基",
      "站前重劃"
    ],
    "desc": "烏日高鐵特區約273.35公頃，以區段徵收開發，擁有高鐵台中站、台鐵新烏日站與捷運綠線G17站三鐵共構，並有投資約260億、商場營業約10.6萬坪的D-ONE第一大天地（高鐵娛樂購物城），第一期預計2026年底完工、引進台灣首間凱賓斯基酒店，是中台灣重要的門戶開發。",
    "keywords": [
      "烏日高鐵特區",
      "高鐵台中站",
      "三鐵共構",
      "D-ONE第一大天地",
      "高鐵娛樂購物城",
      "凱賓斯基",
      "烏日重劃區"
    ],
    "img": "wuri_hsr_area_hero.jpg",
    "area": "約273.35公頃",
    "county": "wuri",
    "countyLabel": "烏日區"
  },
  {
    "id": "taichung_taiping_xinguang_area",
    "url": "zones/taichung_taiping_xinguang_area.html",
    "district": "taiping",
    "districtLabel": "太平區",
    "title": "太平新光特區",
    "h1": "太平新光特區（新光區段徵收）",
    "dev": "區段徵收",
    "status": "發展中",
    "tags": [
      "新光國小",
      "新光國中",
      "9年學區",
      "台74太原匝道",
      "純住宅"
    ],
    "desc": "太平新光特區為新光區段徵收案，約209公頃，以純住宅與公共設施為主，最重要的建設是新光國小與新光國中形成的9年一貫學區，並鄰台74線太原匝道聯外，是太平區新的家庭導向住宅重劃區。",
    "keywords": [
      "太平新光特區",
      "新光區段徵收",
      "新光國小",
      "新光國中",
      "太平重劃區",
      "台74太原匝道"
    ],
    "img": "taiping_xinguang_area_hero.jpg",
    "area": "約209公頃",
    "county": "taiping",
    "countyLabel": "太平區"
  },
  {
    "id": "taichung_dali_area",
    "url": "zones/taichung_dali_area.html",
    "district": "dali",
    "districtLabel": "大里區",
    "title": "大里重劃區",
    "h1": "大里重劃區（第15期大里杙市地重劃）",
    "dev": "市地重劃",
    "status": "發展中",
    "tags": [
      "第15期",
      "大里杙",
      "跨區市地重劃",
      "興大生活圈",
      "全國首例"
    ],
    "desc": "大里重劃區指第15期大里杙市地重劃，約6.96公頃，是全國首例跨區辦理的市地重劃案，緊鄰中興大學生活圈，以整齊街廓與新穎住宅供給大里相對整齊的居住選擇，與舊市區成熟機能互補。",
    "keywords": [
      "大里重劃區",
      "第15期",
      "大里杙",
      "市地重劃",
      "跨區重劃",
      "興大",
      "大里區"
    ],
    "img": "dali_area_hero.jpg",
    "area": "約6.96公頃",
    "county": "dali",
    "countyLabel": "大里區"
  },
  {
    "id": "taichung_shalu_area",
    "url": "zones/taichung_shalu_area.html",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "台中沙鹿重劃區全解析｜新光田特區、中科二期與向上路生活圈",
    "h1": "沙鹿重劃區（台中市）",
    "dev": "都市計畫零星開發",
    "status": "發展中",
    "tags": [
      "市郊新城",
      "產業園區",
      "住宅區"
    ],
    "desc": "台中海線沙鹿的新興生活圈，以新光田特區（向上路、正德路一帶）為核心，受新光田醫院與中科二期帶動，新屋電梯華廈陸續進駐。",
    "keywords": [
      "沙鹿重劃區",
      "沙鹿",
      "新光田特區",
      "光田醫院",
      "中科二期"
    ],
    "img": "shalu_xinguangtian_hero.jpg",
    "area": "待補",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "taichung_fengyuan_area",
    "url": "zones/taichung_fengyuan_area.html",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "台中豐原重劃區全解析｜豐南生活圈、豐原大道與舊縣城新發展",
    "h1": "豐原重劃區（台中市）",
    "dev": "都市計畫擴大發展",
    "status": "已發展成熟",
    "tags": [
      "市郊新城",
      "文教特區",
      "住宅區"
    ],
    "desc": "台中舊縣城、現為北部衛星城市，新屋集中在豐原大道沿線的豐南生活圈，廟東夜市與車站機能成熟，成交均價約35.4萬/坪。",
    "keywords": [
      "豐原重劃區",
      "豐原",
      "豐南生活圈",
      "豐原大道",
      "廟東夜市"
    ],
    "img": "fengyuan_fengnan_hero.jpg",
    "area": "待補",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  },
  {
    "id": "qiqi_baohui_qiuhonggu",
    "url": "projects/qiqi_baohui_qiuhonggu.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "寶輝秋紅谷｜台中七期豪宅建案解析：基地、房型與成交行情",
    "h1": "寶輝秋紅谷",
    "builder": "寶輝建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "公園第一排"
    ],
    "desc": "七期緊鄰秋紅谷的 SC 豪宅大樓，約 146 戶，近一年成交均價約 72.4 萬/坪。",
    "keywords": [
      "寶輝秋紅谷",
      "七期豪宅",
      "寶輝建設"
    ],
    "img": "qiqi_baohui_qiuhonggu_hero.jpg",
    "price": "約 72.4 萬/坪",
    "year": "屋齡約 11 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_baoxi_tianrui",
    "url": "projects/qiqi_baoxi_tianrui.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "寶璽天睿｜台中七期指標豪宅建案解析：基地、房型與成交行情",
    "h1": "寶璽天睿",
    "builder": "寶璽建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "指標地標"
    ],
    "desc": "七期細高挺拔的指標豪宅，近期成交約 89.5 萬/坪，長期位居台中豪宅前段班。",
    "keywords": [
      "寶璽天睿",
      "七期豪宅",
      "台中豪宅"
    ],
    "img": "qiqi_baoxi_tianrui_hero.jpg",
    "price": "約 89.5 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_dibao",
    "url": "projects/qiqi_dibao.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "台中帝寶｜七期惠文學區豪宅建案解析：基地、房型與開價",
    "h1": "台中帝寶",
    "builder": "國泰建設（台中帝寶）",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "惠文學區"
    ],
    "desc": "七期惠文學區大器豪宅社區，對稱華廈圍繞中庭花園，開價約 58–70 萬/坪。",
    "keywords": [
      "台中帝寶",
      "七期豪宅",
      "惠文學區"
    ],
    "img": "qiqi_dibao_hero.jpg",
    "price": "開價約 58–70 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_bokelai",
    "url": "projects/qiqi_bokelai.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "博克萊｜南七期大型社區建案解析：基地、房型與成交行情",
    "h1": "博克萊",
    "builder": "富宇建設（博克萊）",
    "status": "已完工",
    "tags": [
      "南七期",
      "大型社區",
      "大坪數"
    ],
    "desc": "南七期圍合式大型綠意社區，中央花園與泳池，均價約 59 萬/坪、823 筆成交。",
    "keywords": [
      "博克萊",
      "南七期",
      "七期社區"
    ],
    "img": "qiqi_bokelai_hero.jpg",
    "price": "約 59 萬/坪",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "qiqi_lianju_baohe",
    "url": "projects/qiqi_lianju_baohe.html",
    "zone": "taichung_qiqi_district",
    "zoneLabel": "七期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "聯聚保和大廈｜七期 39 層 SRC 豪宅解析：基地、房型與行情",
    "h1": "聯聚保和大廈",
    "builder": "聯聚建設",
    "status": "已完工",
    "tags": [
      "七期",
      "豪宅",
      "SRC細塔"
    ],
    "desc": "聯聚建設七期 39 層 SRC 細塔，基地約 761 坪、僅 69 戶、公設比約 34.8%。",
    "keywords": [
      "聯聚保和",
      "七期豪宅",
      "聯聚建設"
    ],
    "img": "qiqi_lianju_baohe_hero.jpg",
    "price": "待補",
    "year": "屋齡約 10 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_fengyi_parkone",
    "url": "projects/shuinan_fengyi_parkone.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "豐邑 PARK ONE｜水湳中央公園第一排豪宅解析：基地、房型與成交行情",
    "h1": "豐邑 PARK ONE",
    "builder": "豐邑機構",
    "status": "興建中",
    "tags": [
      "水湳",
      "豪宅",
      "中央公園第一排"
    ],
    "desc": "水湳中央公園第一排指標豪宅，188 戶、53–74 坪，近一年均價約 80.5 萬/坪。",
    "keywords": [
      "豐邑PARK ONE",
      "水湳豪宅",
      "中央公園"
    ],
    "img": "shuinan_fengyi_parkone_hero.jpg",
    "price": "約 80.5 萬/坪",
    "year": "預計 2027 Q4",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_farglory_huishanhang",
    "url": "projects/shuinan_farglory_huishanhang.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "遠雄洄山行｜水湳遠雄新成屋住宅解析：基地、房型與成交行情",
    "h1": "遠雄洄山行",
    "builder": "遠雄建設",
    "status": "新成屋",
    "tags": [
      "水湳",
      "住宅",
      "遠雄建設"
    ],
    "desc": "遠雄建設水湳新成屋，148 戶、24–48 坪，成交均價約 68.6 萬/坪，2026 年 8 月完工。",
    "keywords": [
      "遠雄洄山行",
      "水湳住宅",
      "遠雄建設"
    ],
    "img": "shuinan_farglory_huishanhang_hero.jpg",
    "price": "約 68.6 萬/坪",
    "year": "約 2026-08",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_runlong_dangdai",
    "url": "projects/shuinan_runlong_dangdai.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "潤隆當代首馥｜水湳大坪數住宅解析：基地、房型與成交行情",
    "h1": "潤隆當代首馥",
    "builder": "潤隆建設",
    "status": "興建中",
    "tags": [
      "水湳",
      "大坪數",
      "換屋"
    ],
    "desc": "潤隆建設水湳大坪數住宅，320 戶、46–52 坪，成交均價約 69.48 萬/坪。",
    "keywords": [
      "潤隆當代首馥",
      "水湳住宅",
      "潤隆建設"
    ],
    "img": "shuinan_runlong_dangdai_hero.jpg",
    "price": "約 69.48 萬/坪",
    "year": "預計 2030-12",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_taiyu_sky",
    "url": "projects/shuinan_taiyu_sky.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "泰御 Sky Island｜水湳精品住宅解析：基地、房型與成交行情",
    "h1": "泰御 Sky Island",
    "builder": "泰御建設",
    "status": "興建中",
    "tags": [
      "水湳",
      "精品住宅",
      "精華位"
    ],
    "desc": "水湳精華位中高層精品住宅，154 戶、23–32 坪，成交均價約 86.37 萬/坪。",
    "keywords": [
      "泰御Sky Island",
      "水湳住宅",
      "精品住宅"
    ],
    "img": "shuinan_taiyu_sky_hero.jpg",
    "price": "約 86.37 萬/坪",
    "year": "預計 2030 上半年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "shuinan_dali_chuangshiji",
    "url": "projects/shuinan_dali_chuangshiji.html",
    "zone": "taichung_shuinan_park",
    "zoneLabel": "水湳經貿園區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "達麗創世紀｜水湳大型自住社區解析：基地、房型與成交行情",
    "h1": "達麗創世紀",
    "builder": "達麗建設",
    "status": "已完工",
    "tags": [
      "水湳",
      "大型社區",
      "首購"
    ],
    "desc": "達麗建設水湳大型自住社區，639 戶、21–26 坪，成交均價約 57.63 萬/坪。",
    "keywords": [
      "達麗創世紀",
      "水湳住宅",
      "達麗建設"
    ],
    "img": "shuinan_dali_chuangshiji_hero.jpg",
    "price": "約 57.63 萬/坪",
    "year": "屋齡約 2 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase12_dacheng_langyun",
    "url": "projects/phase12_dacheng_langyun.html",
    "zone": "taichung_phase12_zone",
    "zoneLabel": "十二期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "大城朗雲｜十二期大坪數豪宅華廈解析：基地、房型與行情",
    "h1": "大城朗雲",
    "builder": "大城建設",
    "status": "已完工",
    "tags": [
      "十二期",
      "大坪數",
      "豪宅"
    ],
    "desc": "大城建設十二期青海路二段大坪數豪宅，約 20 層、36 戶、96–112 坪。",
    "keywords": [
      "大城朗雲",
      "十二期豪宅",
      "大城建設"
    ],
    "img": "phase12_dacheng_langyun_hero.jpg",
    "price": "待補",
    "year": "屋齡約 12 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase12_shenyang_chiwenhua",
    "url": "projects/phase12_shenyang_chiwenhua.html",
    "zone": "taichung_phase12_zone",
    "zoneLabel": "十二期重劃區",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "昇揚四季文華｜十二期地標華廈解析：基地、房型與成交行情",
    "h1": "昇揚四季文華",
    "builder": "昇揚開發",
    "status": "已完工",
    "tags": [
      "十二期",
      "地標華廈",
      "新成屋"
    ],
    "desc": "昇揚開發十二期臨大道地標華廈，約 88 戶、28.5–42 坪，成交均價約 47.8 萬/坪。",
    "keywords": [
      "昇揚四季文華",
      "十二期",
      "昇揚開發"
    ],
    "img": "phase12_shenyang_chiwenhua_hero.jpg",
    "price": "約 47.8 萬/坪",
    "year": "屋齡約 2 年",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase8_huiyu_chenfeng",
    "url": "projects/phase8_huiyu_chenfeng.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "惠宇澄峰｜八期豐樂公園第一排28層豪宅，成交均價約30.3萬/坪",
    "h1": "惠宇澄峰",
    "builder": "惠宇建設",
    "status": "成屋",
    "tags": [
      "八期",
      "公園首席",
      "大坪數豪宅"
    ],
    "desc": "八期文心南五路一段330號、54戶28層、119–137坪、公設比34.26%、屋齡約15年，591成交均價約30.3萬/坪。",
    "keywords": [
      "惠宇澄峰",
      "八期重劃區",
      "豐樂公園豪宅",
      "惠宇建設"
    ],
    "img": "phase8_huiyu_chenfeng_hero.jpg",
    "price": "約 30.3 萬/坪",
    "year": "屋齡約 15 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase8_huiyu_fongger",
    "url": "projects/phase8_huiyu_fongger.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "惠宇豐閣｜八期南屯惠宇電梯大樓，銷售均價約47.4萬/坪",
    "h1": "惠宇豐閣",
    "builder": "惠宇建設",
    "status": "成屋",
    "tags": [
      "八期",
      "南屯住宅",
      "成熟機能"
    ],
    "desc": "八期南屯惠宇電梯大樓，591銷售均價約47.4萬/坪、在售約75筆；確切門牌與規格待補。",
    "keywords": [
      "惠宇豐閣",
      "八期重劃區",
      "南屯電梯大樓",
      "惠宇建設"
    ],
    "img": "phase8_huiyu_fongger_hero.jpg",
    "price": "銷售約 47.4 萬/坪",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase8_dengyang_yifan",
    "url": "projects/phase8_dengyang_yifan.html",
    "zone": "taichung_phase8_zone",
    "zoneLabel": "八期重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "登陽一凡峰｜八期近捷運豐樂公園站的登陽建設住宅",
    "h1": "登陽一凡峰",
    "builder": "登陽建設",
    "status": "成屋",
    "tags": [
      "八期",
      "捷運宅",
      "南屯住宅"
    ],
    "desc": "八期近中捷G12豐樂公園站的登陽建設電梯住宅；規格與成交均價待補，以實價登錄為準。",
    "keywords": [
      "登陽一凡峰",
      "八期重劃區",
      "豐樂公園捷運站",
      "登陽建設"
    ],
    "img": "phase8_dengyang_yifan_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "phase13_huiyu_daran",
    "url": "projects/phase13_huiyu_daran.html",
    "zone": "taichung_phase13_zone",
    "zoneLabel": "十三期重劃區",
    "district": "south",
    "districtLabel": "南區",
    "title": "惠宇大然｜十三期大慶段指標預售，132戶38–52坪，成交均價約69.37萬/坪",
    "h1": "惠宇大然",
    "builder": "惠宇建設",
    "status": "預售／施工中",
    "tags": [
      "十三期",
      "雙鐵宅",
      "預售屋"
    ],
    "desc": "十三期大慶段、132戶38–52坪、2028年1月完工，樂居成交均價約69.37萬/坪、最高71.57萬/坪。",
    "keywords": [
      "惠宇大然",
      "十三期重劃區",
      "大慶段",
      "惠宇建設"
    ],
    "img": "phase13_huiyu_daran_hero.jpg",
    "price": "約 69.37 萬/坪",
    "year": "預計 2028-01",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "phase13_guoju_zhishang",
    "url": "projects/phase13_guoju_zhishang.html",
    "zone": "taichung_phase13_zone",
    "zoneLabel": "十三期重劃區",
    "district": "south",
    "districtLabel": "南區",
    "title": "國聚之尚｜十三期大慶段大型社區，242戶37–46坪，成交均價約63.69萬/坪",
    "h1": "國聚之尚",
    "builder": "國聚建設",
    "status": "預售／施工中",
    "tags": [
      "十三期",
      "雙鐵宅",
      "大型社區"
    ],
    "desc": "十三期大慶段、242戶37–46坪、2028上半年完工，樂居成交均價約63.69萬/坪、最高67.61萬/坪。",
    "keywords": [
      "國聚之尚",
      "十三期重劃區",
      "大慶段",
      "國聚建設"
    ],
    "img": "phase13_guoju_zhishang_hero.jpg",
    "price": "約 63.69 萬/坪",
    "year": "預計 2028 H1",
    "county": "south",
    "countyLabel": "南區"
  },
  {
    "id": "unit2_jingrui_bo",
    "url": "projects/unit2_jingrui_bo.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "精銳博｜單元二龍富十路20層公園首席大樓，成交均價約56.49萬/坪",
    "h1": "精銳博",
    "builder": "悅騰建設",
    "status": "成屋",
    "tags": [
      "單元二",
      "公園首席",
      "大基地"
    ],
    "desc": "單元二龍富十路100號、152戶20層、基地約2377坪、建坪50–100坪、公設比32.8%、屋齡約8年，成交均價約56.49萬/坪、最高61.17萬/坪。",
    "keywords": [
      "精銳博",
      "單元二重劃區",
      "龍富十路",
      "悅騰建設"
    ],
    "img": "unit2_jingrui_bo_hero.jpg",
    "price": "約 56.49 萬/坪",
    "year": "屋齡約 8 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit2_shuang1812",
    "url": "projects/unit2_shuang1812.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "雙橡園1812｜單元二精品中層電梯大樓，屋齡約5年、最高單價約63.07萬/坪",
    "h1": "雙橡園1812",
    "builder": "雙橡園開發",
    "status": "成屋",
    "tags": [
      "單元二",
      "精品住宅",
      "低密度"
    ],
    "desc": "單元二雙橡園開發、110戶、屋齡約5年、精品中層電梯，歷史最高單價約63.07萬/坪。",
    "keywords": [
      "雙橡園1812",
      "單元二重劃區",
      "雙橡園開發",
      "台中精品住宅"
    ],
    "img": "unit2_shuang1812_hero.jpg",
    "price": "最高約 63.07 萬/坪",
    "year": "屋齡約 5 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit2_shuang2279",
    "url": "projects/unit2_shuang2279.html",
    "zone": "taichung_unit2_zone",
    "zoneLabel": "單元二重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "雙橡園2279｜單元二現代中高層大樓，180戶屋齡約1年，成交均價約78.32萬/坪",
    "h1": "雙橡園2279",
    "builder": "特區開發建設",
    "status": "新成屋",
    "tags": [
      "單元二",
      "新成屋",
      "大棟距"
    ],
    "desc": "單元二特區開發、180戶、屋齡約1年、現代中高層大樓，成交均價約78.32萬/坪、最高81.13萬/坪。",
    "keywords": [
      "雙橡園2279",
      "單元二重劃區",
      "特區開發建設",
      "南屯新成屋"
    ],
    "img": "unit2_shuang2279_hero.jpg",
    "price": "約 78.32 萬/坪",
    "year": "屋齡約 1 年",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit6_yuanbao_duqing",
    "url": "projects/unit6_yuanbao_duqing.html",
    "zone": "taichung_unit6_zone",
    "zoneLabel": "單元六重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "圓堡墪青｜單元六楓溪段小而美社區，25戶25–31坪，成交均價約70.67萬/坪",
    "h1": "圓堡墪青",
    "builder": "待補",
    "status": "預售／施工中",
    "tags": [
      "單元六",
      "溪景住宅",
      "小坪數"
    ],
    "desc": "單元六楓溪段、25戶25–31坪、2027 Q4完工，臨舊南屯溪景觀帶，成交均價約70.67萬/坪、最高75.84萬/坪。",
    "keywords": [
      "圓堡墪青",
      "單元六重劃區",
      "楓溪段",
      "十三期"
    ],
    "img": "unit6_yuanbao_duqing_hero.jpg",
    "price": "約 70.67 萬/坪",
    "year": "預計 2027 Q4",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit6_qiyou_zhishan",
    "url": "projects/unit6_qiyou_zhishan.html",
    "zone": "taichung_unit6_zone",
    "zoneLabel": "單元六重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "齊又新執善｜單元六樂田段中層社區，38戶26–34坪，成交均價約68.42萬/坪",
    "h1": "齊又新執善",
    "builder": "待補",
    "status": "預售／施工中",
    "tags": [
      "單元六",
      "近捷運",
      "中層社區"
    ],
    "desc": "單元六樂田段、38戶26–34坪、2028上半年完工，成交均價約68.42萬/坪、歷史最高83.80萬/坪。",
    "keywords": [
      "齊又新執善",
      "單元六重劃區",
      "樂田段",
      "十三期"
    ],
    "img": "unit6_qiyou_zhishan_hero.jpg",
    "price": "約 68.42 萬/坪",
    "year": "預計 2028 H1",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit14_huyu_hemu",
    "url": "projects/unit14_huyu_hemu.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "惠宇建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "中大坪數",
      "十四期"
    ],
    "desc": "惠宇和慕為惠宇建設在十四期重劃區推出的中大坪數預售住宅，規劃112戶、38–52坪，公開開價約64–69萬元/坪，預計2028年2月完工。",
    "keywords": [
      "惠宇和慕",
      "惠宇建設",
      "十四期重劃區",
      "北屯預售屋"
    ],
    "img": "unit14_huyu_hemu_hero.jpg",
    "price": "開價約64–69萬元/坪",
    "year": "預計2028年2月完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_huyu_mypark",
    "url": "projects/unit14_huyu_mypark.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "惠宇建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "公園宅",
      "十四期"
    ],
    "desc": "惠宇MY PARK為惠宇建設在十四期推出、主打臨公園綠景的預售住宅，規劃130戶、32–52坪，近一年成交均價約76.03萬元/坪，預計2028年第三季完工。",
    "keywords": [
      "惠宇MY PARK",
      "惠宇建設",
      "十四期重劃區",
      "臨公園宅"
    ],
    "img": "unit14_huyu_mypark_hero.jpg",
    "price": "成交均價約76.03萬元/坪",
    "year": "預計2028年第三季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_shuntian_kingsroad",
    "url": "projects/unit14_shuntian_kingsroad.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "順天建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "換屋首選",
      "十四期"
    ],
    "desc": "順天KING'S ROAD為順天建設在十四期推出的臨林蔭大道中大坪數換屋宅，規劃140戶、48–54坪，近一年成交均價約70.18萬元/坪，預計2027年第三季完工。",
    "keywords": [
      "順天KING'S ROAD",
      "順天建設",
      "十四期重劃區",
      "換屋宅"
    ],
    "img": "unit14_shuntian_kingsroad_hero.jpg",
    "price": "成交均價約70.18萬元/坪",
    "year": "預計2027年第三季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_hongrui_inter",
    "url": "projects/unit14_hongrui_inter.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "泓瑞建設",
    "status": "預售",
    "tags": [
      "預售屋",
      "首購首選",
      "小坪數",
      "十四期"
    ],
    "desc": "泓瑞洲際之森為泓瑞建設在十四期推出的小坪數首購型住宅，鄰近洲際棒球場，規劃100戶、26–35坪，近一年成交均價約56.04萬元/坪，預計2026年第四季完工。",
    "keywords": [
      "泓瑞洲際之森",
      "泓瑞建設",
      "十四期重劃區",
      "小坪數首購"
    ],
    "img": "unit14_hongrui_inter_hero.jpg",
    "price": "成交均價約56.04萬元/坪",
    "year": "預計2026年第四季完工",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit14_cathay_mostplus",
    "url": "projects/unit14_cathay_mostplus.html",
    "zone": "taichung_unit14_zone",
    "zoneLabel": "十四期重劃區",
    "district": "beitun",
    "builder": "國泰建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "品牌大社區",
      "十四期"
    ],
    "desc": "國泰MOST+為國泰建設在十四期推出的大型成屋社區，206戶、37–55坪，近一年成交均價約61.23萬元/坪，目前為成屋（屋齡約1年）。",
    "keywords": [
      "國泰MOST+",
      "國泰建設",
      "十四期重劃區",
      "品牌社區"
    ],
    "img": "unit14_cathay_mostplus_hero.jpg",
    "price": "成交均價約61.23萬元/坪",
    "year": "成屋，屋齡約1年",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase11_yuancheng_chungte",
    "url": "projects/phase11_yuancheng_chungte.html",
    "zone": "taichung_phase11_zone",
    "zoneLabel": "十一期重劃區",
    "district": "beitun",
    "builder": "元城建設",
    "status": "銷售中",
    "tags": [
      "電梯大樓",
      "公園宅",
      "十一期"
    ],
    "desc": "元城崇德苑位於北屯昌平東二路，元城建設推出，基地約316坪、44戶、46–49坪，臨八二三紀念公園與仁美國小，公設比約32.9%；個案開價與成交均價待補。",
    "keywords": [
      "元城崇德苑",
      "元城建設",
      "十一期重劃區",
      "八二三紀念公園"
    ],
    "img": "phase11_yuancheng_chungte_hero.jpg",
    "price": "待補",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase11_funjia_jia",
    "url": "projects/phase11_funjia_jia.html",
    "zone": "taichung_phase11_zone",
    "zoneLabel": "十一期重劃區",
    "district": "beitun",
    "builder": "馥家建設",
    "status": "銷售中",
    "tags": [
      "電梯大樓",
      "空中花園",
      "十一期"
    ],
    "desc": "馥家JIA位於北屯昌平三街，馥家建設推出，基地約262坪電梯大樓，公設含健身房與空中花園；個案坪數、開價與成交均價待補。",
    "keywords": [
      "馥家JIA",
      "馥家建設",
      "十一期重劃區",
      "昌平商圈"
    ],
    "img": "phase11_funjia_jia_hero.jpg",
    "price": "待補",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "mrt_fuyu_platinum",
    "url": "projects/mrt_fuyu_platinum.html",
    "zone": "taichung_beitun_mrt_area",
    "zoneLabel": "北屯機捷特區",
    "district": "beitun",
    "builder": "富宇建設",
    "status": "銷售中",
    "tags": [
      "新成屋",
      "捷運宅",
      "大型社區",
      "機捷特區"
    ],
    "desc": "富宇鉑金大苑為富宇建設在北屯機捷特區推出的大型首購社區，鄰近捷運綠線，711戶、2–3房21–40坪，近一年成交均價約59.51萬元/坪。",
    "keywords": [
      "富宇鉑金大苑",
      "富宇建設",
      "北屯機捷特區",
      "捷運宅"
    ],
    "img": "mrt_fuyu_platinum_hero.jpg",
    "price": "成交均價約59.51萬元/坪",
    "year": "待補",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "mrt_juhong_gcasa",
    "url": "projects/mrt_juhong_gcasa.html",
    "zone": "taichung_beitun_mrt_area",
    "zoneLabel": "北屯機捷特區",
    "district": "beitun",
    "builder": "鉅虹建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "捷運宅",
      "精品小宅",
      "機捷特區"
    ],
    "desc": "鉅虹GCASA為鉅虹建設在北屯機捷特區推出的精緻2–3房小宅，68戶、27–35坪，屋齡約6年，近一年成交均價約52.43萬元/坪。",
    "keywords": [
      "鉅虹GCASA",
      "鉅虹建設",
      "北屯機捷特區",
      "精品小宅"
    ],
    "img": "mrt_juhong_gcasa_hero.jpg",
    "price": "成交均價約52.43萬元/坪",
    "year": "成屋，屋齡約6年",
    "districtLabel": "西屯區",
    "county": "beitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "phase9_xinzhonghui",
    "url": "projects/phase9_xinzhonghui.html",
    "zone": "taichung_phase9_zone",
    "zoneLabel": "九期重劃區",
    "district": "east",
    "districtLabel": "東區",
    "title": "新中匯｜勝麗建設在台中九期旱溪的電梯大樓解析（基地/房型/成交）",
    "h1": "新中匯",
    "builder": "勝麗建設",
    "status": "已完工",
    "tags": [
      "電梯大樓",
      "成熟機能"
    ],
    "desc": "勝麗建設在東區旱溪市地重劃內的地上15層電梯大樓，119戶、建坪37~52坪3~4房，2017年完工。",
    "keywords": [
      "新中匯",
      "勝麗建設",
      "九期重劃",
      "東區旱溪",
      "台中電梯大樓"
    ],
    "img": "phase9_xinzhonghui_tower.jpg",
    "price": "近期約33~35.5萬/坪（全期均價約17.6萬/坪）",
    "year": "2017-07",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "phase9_leye_shuangxin",
    "url": "projects/phase9_leye_shuangxin.html",
    "zone": "taichung_phase9_zone",
    "zoneLabel": "九期重劃區",
    "district": "east",
    "districtLabel": "東區",
    "title": "樂業雙心｜敦陽開發在台中九期旱溪的電梯別墅解析（基地/地坪）",
    "h1": "樂業雙心",
    "builder": "敦陽開發",
    "status": "成屋",
    "tags": [
      "電梯別墅",
      "低密度"
    ],
    "desc": "敦陽開發在東區旱溪街19巷的微型電梯別墅，僅2戶、地上6層、地坪53~58坪、建坪154~159坪。",
    "keywords": [
      "樂業雙心",
      "敦陽開發",
      "九期重劃",
      "東區旱溪",
      "電梯別墅"
    ],
    "img": "phase9_leye_villa.jpg",
    "price": "待補",
    "year": "待補",
    "county": "east",
    "countyLabel": "東區"
  },
  {
    "id": "phase10_jiafu_qianyi",
    "url": "projects/phase10_jiafu_qianyi.html",
    "zone": "taichung_phase10_zone",
    "zoneLabel": "十期重劃區",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "佳福謙邑｜佳福建設在台中十期軍功的三棟式社區大樓解析",
    "h1": "佳福謙邑",
    "builder": "佳福建設",
    "status": "已完銷",
    "tags": [
      "電梯大樓",
      "綠地公園"
    ],
    "desc": "佳福建設在北屯新十期軍福十三路的三棟式社區大樓，基地約1064坪、199戶、建坪43~60坪3~4房，寶之林公園旁。",
    "keywords": [
      "佳福謙邑",
      "佳福建設",
      "十期重劃",
      "軍功市地重劃",
      "三棟式社區"
    ],
    "img": "phase10_jiafu_community.jpg",
    "price": "成交單價待補（車位平面約110萬、機械約55萬起）",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "phase10_yousong_qianjing",
    "url": "projects/phase10_yousong_qianjing.html",
    "zone": "taichung_phase10_zone",
    "zoneLabel": "十期重劃區",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "佑崧千境｜佑崧營造在台中十期太原路綠園道的電梯別墅解析",
    "h1": "佑崧千境",
    "builder": "佑崧營造",
    "status": "已完工",
    "tags": [
      "電梯別墅",
      "運動休閒"
    ],
    "desc": "佑崧營造在新十期太原路綠園道、大坑第一排的電梯別墅聚落，基地約1551坪、51戶、建坪54~116坪。",
    "keywords": [
      "佑崧千境",
      "佑崧營造",
      "十期重劃",
      "太原路綠園道",
      "電梯別墅"
    ],
    "img": "phase10_yousong_villa.jpg",
    "price": "總價約1388萬~1988萬起",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit8_huaku_dinghui",
    "url": "projects/unit8_huaku_dinghui.html",
    "zone": "taichung_unit8_zone",
    "zoneLabel": "單元八",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "華固頂滙｜華固建設在台中單元八水湳旁的27層雙塔地標解析",
    "h1": "華固頂滙",
    "builder": "華固建設",
    "status": "興建中",
    "tags": [
      "電梯大樓",
      "綠地公園"
    ],
    "desc": "華固建設在單元八北側的A/B雙塔高樓地標，基地約3243坪、地上27層、260戶住家，均價約80萬/坪。",
    "keywords": [
      "華固頂滙",
      "華固建設",
      "單元八",
      "水湳建案",
      "鑫港尾段"
    ],
    "img": "unit8_huaku_landmark.jpg",
    "price": "約80萬/坪",
    "year": "待補",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit8_zongtai_zhixu",
    "url": "projects/unit8_zongtai_zhixu.html",
    "zone": "taichung_unit8_zone",
    "zoneLabel": "單元八",
    "district": "beitun",
    "districtLabel": "北屯區",
    "title": "總太之序｜總太營造在台中單元八敦化路南側的20層住宅解析",
    "h1": "總太之序",
    "builder": "總太營造",
    "status": "興建中",
    "tags": [
      "電梯大樓",
      "成熟機能"
    ],
    "desc": "富華創新建設、總太營造在單元八南側敦化路二段的地上20層住宅，190戶、3房47.6/52坪，開價約70~75萬/坪。",
    "keywords": [
      "總太之序",
      "總太營造",
      "富華創新",
      "單元八",
      "敦化路重劃"
    ],
    "img": "unit8_zongtai_residence.jpg",
    "price": "開價約70~75萬/坪（近一年均價約69.54萬/坪）",
    "year": "預計2027Q4",
    "county": "beitun",
    "countyLabel": "北屯區"
  },
  {
    "id": "unit1_dexin_xiehe",
    "url": "projects/unit1_dexin_xiehe.html",
    "zone": "taichung_unit1_zone",
    "zoneLabel": "單元一重劃區（安和自辦）",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "德鑫協和｜台中單元一建案解析：朝馬路2303坪基地、131戶與開價",
    "h1": "德鑫協和",
    "builder": "德鑫建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元一",
      "德鑫"
    ],
    "desc": "德鑫建設於西屯單元一朝馬路安和西路口推出，基地約2303坪、131戶，二房30坪到三房37至40坪，開價58至64萬/坪。",
    "keywords": [
      "德鑫協和",
      "德鑫建設",
      "單元一建案",
      "朝馬路",
      "安和路"
    ],
    "img": "unit1_dexin_xiehe_hero.jpg",
    "price": "開價 58–64 萬/坪",
    "year": "預計 2027 年第四季完工",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit1_kunlianfa_zhongkehui",
    "url": "projects/unit1_kunlianfa_zhongkehui.html",
    "zone": "taichung_unit1_zone",
    "zoneLabel": "單元一重劃區（安和自辦）",
    "district": "xitun",
    "districtLabel": "西屯區",
    "title": "坤聯發中科匯｜台中單元一建案解析：安和路實價成交約57萬/坪",
    "h1": "坤聯發中科匯",
    "builder": "坤聯發建設",
    "status": "成屋",
    "tags": [
      "住宅區",
      "單元一",
      "坤聯發"
    ],
    "desc": "坤聯發建設於西屯安和路169號推出，591實價51筆，成交約57.1萬/坪（114-10案13樓），為3房約46.4坪格局。",
    "keywords": [
      "坤聯發中科匯",
      "坤聯發建設",
      "單元一建案",
      "安和路",
      "中科匯"
    ],
    "img": "unit1_kunlianfa_zhongkehui_hero.jpg",
    "price": "實價成交約 57.1 萬/坪（51筆）",
    "year": "待補",
    "county": "xitun",
    "countyLabel": "西屯區"
  },
  {
    "id": "unit3_fongyi_gtower",
    "url": "projects/unit3_fongyi_gtower.html",
    "zone": "taichung_unit3_zone",
    "zoneLabel": "單元三重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑G TOWER｜台中單元三建案解析：五權西路27樓地標、總價3158萬起",
    "h1": "豐邑G TOWER",
    "builder": "豐邑建設",
    "status": "新成屋",
    "tags": [
      "住宅區",
      "單元三",
      "豐邑"
    ],
    "desc": "豐邑建設於南屯五權西路二段1027號推出，基地約1828坪、地上27樓，3至4房45至60坪，總價3158萬/戶、車位270萬。",
    "keywords": [
      "豐邑G TOWER",
      "豐邑建設",
      "單元三建案",
      "五權西路",
      "27樓"
    ],
    "img": "unit3_fongyi_gtower_hero.jpg",
    "price": "總價 3158 萬/戶、車位 270 萬",
    "year": "新成屋（隨時交屋）",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit3_fongyi_dajingfengyi",
    "url": "projects/unit3_fongyi_dajingfengyi.html",
    "zone": "taichung_unit3_zone",
    "zoneLabel": "單元三重劃區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑大境豐藝｜台中單元三建案解析：向上路三段96戶24F均價約37萬/坪",
    "h1": "豐邑大境豐藝",
    "builder": "豐邑建設",
    "status": "成屋",
    "tags": [
      "住宅區",
      "單元三",
      "豐邑"
    ],
    "desc": "豐邑建設於南屯向上路三段113號推出，96戶、總樓層24F一層四戶兩梯ABCD四棟，591實價108筆均價約37.3萬/坪。",
    "keywords": [
      "豐邑大境豐藝",
      "豐邑建設",
      "單元三建案",
      "向上路三段",
      "24F"
    ],
    "img": "unit3_fongyi_dajingfengyi_hero.jpg",
    "price": "實價均價約 37.3 萬/坪（108筆）",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit5_luhe_changyuso",
    "url": "projects/unit5_luhe_changyuso.html",
    "zone": "taichung_unit5_zone",
    "zoneLabel": "單元五重劃區（高鐵新市鎮）",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "陸禾誠寓所｜台中單元五建案解析：43戶1至2房、近一年均價約57萬/坪",
    "h1": "陸禾誠寓所",
    "builder": "陸禾建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元五",
      "陸禾"
    ],
    "desc": "陸禾建設於南屯單元五高鐵新市鎮推出，43戶、1至2房18至32坪，591開價52至59萬/坪，近一年均價約56.93萬/坪，預計2026年第四季完工。",
    "keywords": [
      "陸禾誠寓所",
      "陸禾建設",
      "單元五建案",
      "高鐵新市鎮",
      "首購小宅"
    ],
    "img": "unit5_luhe_changyuso_hero.jpg",
    "price": "開價 52–59 萬/坪、近一年均價 56.93 萬/坪",
    "year": "預計 2026 年第四季完工",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "unit5_fongqian_zhide",
    "url": "projects/unit5_fongqian_zhide.html",
    "zone": "taichung_unit5_zone",
    "zoneLabel": "單元五重劃區（高鐵新市鎮）",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐謙植得｜台中單元五建案解析：93戶3至4房、近一年均價約64.5萬/坪",
    "h1": "豐謙植得",
    "builder": "豐謙建設",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "單元五",
      "豐謙"
    ],
    "desc": "豐謙建設於南屯單元五高鐵新市鎮推出，93戶、3至4房37至44坪，近一年均價約64.50萬/坪、歷史最高約67.20萬/坪，預計2027年第二季完工。",
    "keywords": [
      "豐謙植得",
      "豐謙建設",
      "單元五建案",
      "高鐵新市鎮",
      "換屋大樓"
    ],
    "img": "unit5_fongqian_zhide_hero.jpg",
    "price": "近一年均價約 64.50 萬/坪、歷史最高約 67.20",
    "year": "預計 2027 年第二季完工",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "lingdong_mutang_yushu",
    "url": "projects/lingdong_mutang_yushu.html",
    "zone": "taichung_lingdong_area",
    "zoneLabel": "嶺東特區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "睦唐與樹｜台中嶺東特區建案解析：春安一街12層、總價1198萬起",
    "h1": "睦唐與樹",
    "builder": "待補",
    "status": "預售屋",
    "tags": [
      "住宅區",
      "嶺東特區",
      "大學生活圈"
    ],
    "desc": "嶺東特區預售案，位南屯春安一街與春安路57巷口，12層、二房27至33坪三房36至39坪，每坪約40萬、總價1198萬起。",
    "keywords": [
      "睦唐與樹",
      "嶺東建案",
      "春安一街",
      "嶺東特區",
      "預售小宅"
    ],
    "img": "lingdong_mutang_yushu_hero.jpg",
    "price": "約 40 萬/坪、總價 1198 萬起",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "lingdong_fongyi_jingkecheng",
    "url": "projects/lingdong_fongyi_jingkecheng.html",
    "zone": "taichung_lingdong_area",
    "zoneLabel": "嶺東特區",
    "district": "nantun",
    "districtLabel": "南屯區",
    "title": "豐邑菁科城｜台中嶺東特區建案解析：春安路536戶大型社區",
    "h1": "豐邑菁科城",
    "builder": "豐邑建設",
    "status": "成屋",
    "tags": [
      "大型社區",
      "嶺東特區",
      "豐邑",
      "大學生活圈"
    ],
    "desc": "豐邑建設於南屯春安路113號推出，536戶大型電梯社區，公設含中庭花園、視聽中心、遊戲室、交誼廳、會議室與屋頂花園，緊鄰嶺東科大。",
    "keywords": [
      "豐邑菁科城",
      "豐邑建設",
      "嶺東建案",
      "春安路",
      "536戶"
    ],
    "img": "lingdong_fongyi_jingkecheng_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "nantun",
    "countyLabel": "南屯區"
  },
  {
    "id": "wuri_dengyang_futurehills",
    "url": "projects/wuri_dengyang_futurehills.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "登陽建設",
    "status": "成屋",
    "tags": [
      "新成屋",
      "高鐵宅",
      "三鐵共構",
      "烏日"
    ],
    "desc": "登陽未來之丘位於烏日高鐵東路397號，登陽建設推出，約414戶、26–45坪2–3房，新成屋，近一年成交均價約45.74萬元/坪、歷史最高約60.46萬元/坪，是烏日高鐵特區少數已進入成屋市場交易的指標大樓。",
    "keywords": [
      "登陽未來之丘",
      "登陽建設",
      "烏日高鐵特區",
      "高鐵東路",
      "新成屋"
    ],
    "img": "wuri_dengyang_futurehills_hero.jpg",
    "price": "成交均價約45.74萬元/坪",
    "year": "新成屋（約0年）",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_dahua_zongheng",
    "url": "projects/wuri_dahua_zongheng.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "大華建設",
    "status": "預售",
    "tags": [
      "站前大案",
      "千戶社區",
      "三鐵共構",
      "烏日"
    ],
    "desc": "大華縱橫位於烏日高鐵台中站站前，大華建設推出，約1153戶、22–43坪，與達麗白天鵝合計總銷約340億元，近一年成交均價約55.45萬元/坪、歷史最高約60.18萬元/坪，預計2026年第三季完工。",
    "keywords": [
      "大華縱橫",
      "大華建設",
      "烏日高鐵特區",
      "高鐵站前",
      "預售屋"
    ],
    "img": "wuri_dahua_zongheng_hero.jpg",
    "price": "成交均價約55.45萬元/坪",
    "year": "預計2026年第三季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_dali_whiteswan",
    "url": "projects/wuri_dali_whiteswan.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "達麗建設",
    "status": "預售",
    "tags": [
      "站前大案",
      "千戶社區",
      "高單價",
      "烏日"
    ],
    "desc": "達麗白天鵝位於烏日高鐵特區，達麗建設推出，約1229戶、22–46坪，與大華縱橫合計總銷約340億元，近一年成交均價約58.71萬元/坪、歷史最高約62.28萬元/坪，為烏日單價前段班，預計2027年第三季完工。",
    "keywords": [
      "達麗白天鵝",
      "達麗建設",
      "烏日高鐵特區",
      "預售屋",
      "高單價"
    ],
    "img": "wuri_dali_whiteswan_hero.jpg",
    "price": "成交均價約58.71萬元/坪",
    "year": "預計2027年第三季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_sakura_dazan",
    "url": "projects/wuri_sakura_dazan.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "櫻花建設",
    "status": "預售",
    "tags": [
      "中庭社區",
      "高鐵宅",
      "小坪數",
      "烏日"
    ],
    "desc": "櫻花大綻位於烏日高鐵特區，櫻花建設推出，約428戶、19–48坪，走精緻中庭路線，近一年成交均價約46.38萬元/坪、歷史最高約49.57萬元/坪，是相對務實的高鐵特區進門票，預計2028年第一季完工。",
    "keywords": [
      "櫻花大綻",
      "櫻花建設",
      "烏日高鐵特區",
      "預售屋",
      "首購"
    ],
    "img": "wuri_sakura_dazan_hero.jpg",
    "price": "成交均價約46.38萬元/坪",
    "year": "預計2028年第一季完工",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "wuri_menghuancheng",
    "url": "projects/wuri_menghuancheng.html",
    "zone": "taichung_wuri_hsr_area",
    "zoneLabel": "烏日高鐵特區",
    "district": "wuri",
    "builder": "待補",
    "status": "成屋",
    "tags": [
      "千戶社區",
      "成屋",
      "烏日"
    ],
    "desc": "夢幻誠位於烏日高鐵特區，約1674戶大型成屋造鎮社區、22–34坪，屋齡約3年，已進入二手市場流通，近一年成交均價約44.88萬元/坪、歷史最高約55.55萬元/坪；建商資訊待補。",
    "keywords": [
      "夢幻誠",
      "烏日高鐵特區",
      "千戶大社區",
      "成屋",
      "實價登錄"
    ],
    "img": "wuri_menghuancheng_hero.jpg",
    "price": "成交均價約44.88萬元/坪",
    "year": "成屋，屋齡約3年",
    "districtLabel": "西屯區",
    "county": "wuri",
    "countyLabel": "西屯區"
  },
  {
    "id": "taiping_fuyu_ledele",
    "url": "projects/taiping_fuyu_ledele.html",
    "zone": "taichung_taiping_xinguang_area",
    "zoneLabel": "太平新光特區",
    "district": "taiping",
    "builder": "富宇建設",
    "status": "成屋",
    "tags": [
      "學區宅",
      "大坪數",
      "成屋",
      "太平"
    ],
    "desc": "富宇讀樂樂位於太平區新福路876號，富宇建設推出，約164戶、37–72坪3–4房，平面車位約243個，緊鄰新光國小與新光國中9年學區，近約成交均價約35–39萬元/坪（不同平台口徑），屋齡約6年。",
    "keywords": [
      "富宇讀樂樂",
      "富宇建設",
      "太平新光特區",
      "新光學區",
      "新福路"
    ],
    "img": "taiping_fuyu_ledele_hero.jpg",
    "price": "成交均價約35–39萬元/坪",
    "year": "成屋，屋齡約6年",
    "districtLabel": "西屯區",
    "county": "taiping",
    "countyLabel": "西屯區"
  },
  {
    "id": "taiping_shinguang_heyuan",
    "url": "projects/taiping_shinguang_heyuan.html",
    "zone": "taichung_taiping_xinguang_area",
    "zoneLabel": "太平新光特區",
    "district": "taiping",
    "builder": "明產建設",
    "status": "成屋",
    "tags": [
      "店住大樓",
      "成屋",
      "太平"
    ],
    "desc": "新光和園位於太平區祥順路一段，明產建設推出，基地約900坪電梯店住大樓、房型29.5–38坪、公設比約29.4%；本案成交均價待補，區域2025年後大樓行情約29萬元/坪僅供參考。",
    "keywords": [
      "新光和園",
      "明產建設",
      "太平新光特區",
      "祥順路",
      "店住大樓"
    ],
    "img": "taiping_shinguang_heyuan_hero.jpg",
    "price": "待補",
    "year": "成屋",
    "districtLabel": "西屯區",
    "county": "taiping",
    "countyLabel": "西屯區"
  },
  {
    "id": "dali_yunjiang_kanghuo",
    "url": "projects/dali_yunjiang_kanghuo.html",
    "zone": "taichung_dali_area",
    "zoneLabel": "大里重劃區",
    "district": "dali",
    "builder": "允將建設",
    "status": "成屋",
    "tags": [
      "興大生活圈",
      "成屋",
      "大里"
    ],
    "desc": "允將康活位於大里區祥興路529號興大旁，允將建設推出，約176戶，平面車位約103個＋機械約88個，屋齡約7年，近一年成交均價約40.0萬元/坪、累計約248筆實價成交。",
    "keywords": [
      "允將康活",
      "允將建設",
      "大里重劃區",
      "興大",
      "祥興路"
    ],
    "img": "dali_yunjiang_kanghuo_hero.jpg",
    "price": "成交均價約40.0萬元/坪",
    "year": "成屋，屋齡約7年",
    "districtLabel": "西屯區",
    "county": "dali",
    "countyLabel": "西屯區"
  },
  {
    "id": "dali_shuntian_dadi",
    "url": "projects/dali_shuntian_dadi.html",
    "zone": "taichung_dali_area",
    "zoneLabel": "大里重劃區",
    "district": "dali",
    "builder": "待補",
    "status": "成屋",
    "tags": [
      "成熟社區",
      "低總價",
      "大里"
    ],
    "desc": "順天大邸位於大里區中興路二段151號，大里舊市區成熟電梯大廈社區，成交均價約20.2萬元/坪、累計約82筆實價成交；建商、戶數與坪數帶待補。",
    "keywords": [
      "順天大邸",
      "大里重劃區",
      "中興路二段",
      "成熟社區",
      "低總價"
    ],
    "img": "dali_shuntian_dadi_hero.jpg",
    "price": "成交均價約20.2萬元/坪",
    "year": "成熟社區（待補）",
    "districtLabel": "西屯區",
    "county": "dali",
    "countyLabel": "西屯區"
  },
  {
    "id": "shalu_kunyue_muguangdi",
    "url": "projects/shalu_kunyue_muguangdi.html",
    "zone": "taichung_shalu_area",
    "zoneLabel": "沙鹿重劃區",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "坤悅沐光邸｜沙鹿新光田特區預售華廈建案解析：基地、房型與行情",
    "h1": "坤悅沐光邸",
    "builder": "坤悅建設",
    "status": "興建中",
    "tags": [
      "沙鹿",
      "預售屋",
      "電梯華廈"
    ],
    "desc": "坤悅建設沙鹿正德路預售電梯華廈，2–3房、26.87–34.34坪，總價1018萬/戶起，預計2026下半年完工。",
    "keywords": [
      "坤悅沐光邸",
      "沙鹿建案",
      "新光田特區",
      "坤悅建設"
    ],
    "img": "shalu_kunyue_muguangdi_hero.jpg",
    "price": "總價1018萬/戶起",
    "year": "預計2026下半年",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "shalu_shidai_yijing",
    "url": "projects/shalu_shidai_yijing.html",
    "zone": "taichung_shalu_area",
    "zoneLabel": "沙鹿重劃區",
    "district": "shalu",
    "districtLabel": "沙鹿區",
    "title": "時代一景｜沙鹿新光田特區自立路大樓建案解析：基地、房型與行情",
    "h1": "時代一景",
    "builder": "待補",
    "status": "已落成",
    "tags": [
      "沙鹿",
      "住宅大樓",
      "新光田特區"
    ],
    "desc": "沙鹿自立路社區大樓，地上7層地下2層、2–3房、28–34.2坪、約132戶、基地約1500坪。",
    "keywords": [
      "時代一景",
      "沙鹿建案",
      "自立路",
      "新光田特區"
    ],
    "img": "shalu_shidai_yijing_hero.jpg",
    "price": "待補",
    "year": "待補",
    "county": "shalu",
    "countyLabel": "沙鹿區"
  },
  {
    "id": "fengyuan_kunyue_junpin",
    "url": "projects/fengyuan_kunyue_junpin.html",
    "zone": "taichung_fengyuan_area",
    "zoneLabel": "豐原重劃區",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "坤悅君品｜豐原豐南保康路指標住宅大樓解析：基地、房型與成交行情",
    "h1": "坤悅君品",
    "builder": "坤悅建設",
    "status": "已落成",
    "tags": [
      "豐原",
      "住宅大樓",
      "豐南生活圈"
    ],
    "desc": "坤悅建設豐原豐南保康路指標大樓，110戶、屋齡約10年，近1年成交均價約36.5萬/坪、188筆成交。",
    "keywords": [
      "坤悅君品",
      "豐原建案",
      "豐南生活圈",
      "保康路"
    ],
    "img": "fengyuan_kunyue_junpin_hero.jpg",
    "price": "約36.5萬/坪",
    "year": "屋齡約10年",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  },
  {
    "id": "fengyuan_dalai_fengzuan",
    "url": "projects/fengyuan_dalai_fengzuan.html",
    "zone": "taichung_fengyuan_area",
    "zoneLabel": "豐原重劃區",
    "district": "fengyuan",
    "districtLabel": "豐原區",
    "title": "大錸豐鑽｜豐原豐田路巷內社區大樓解析：成交行情與地段價差",
    "h1": "大錸豐鑽",
    "builder": "待補",
    "status": "已落成",
    "tags": [
      "豐原",
      "住宅大樓",
      "豐南生活圈"
    ],
    "desc": "豐原豐田路巷內社區大樓，成交均價約20.5萬/坪、21筆成交，對照豐南生活圈約35.4萬/坪看地段價差。",
    "keywords": [
      "大錸豐鑽",
      "豐原建案",
      "豐田路",
      "豐南生活圈"
    ],
    "img": "fengyuan_dalai_fengzuan_hero.jpg",
    "price": "約20.5萬/坪",
    "year": "待補",
    "county": "fengyuan",
    "countyLabel": "豐原區"
  }
];

const RZ_ORDER = [
  "taichung_qiqi_district",
  "taichung_shuinan_park",
  "taichung_phase12_zone",
  "taichung_phase8_zone",
  "taichung_phase13_zone",
  "taichung_unit2_zone",
  "taichung_unit6_zone",
  "taichung_unit14_zone",
  "taichung_phase11_zone",
  "taichung_beitun_mrt_area",
  "taichung_phase9_zone",
  "taichung_phase10_zone",
  "taichung_unit8_zone",
  "taichung_unit1_zone",
  "taichung_unit3_zone",
  "taichung_unit5_zone",
  "taichung_lingdong_area",
  "taichung_wuri_hsr_area",
  "taichung_taiping_xinguang_area",
  "taichung_dali_area",
  "taichung_shalu_area",
  "taichung_fengyuan_area"
];

