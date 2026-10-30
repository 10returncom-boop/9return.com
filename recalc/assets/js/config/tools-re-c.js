/* ============================================================
   config/tools-re-c.js — RE-C 代理產出（16 支工具）
   分類：cat_re_tax 稅務費用（9 支）＋ cat_re_holding 持有管理（7 支）
   工具 id 清單：
     re_house_tax / re_land_value_tax / re_deed_tax / re_stamp_duty /
     re_agent_fee / re_notary_fee / re_holding_cost / re_land_appreciation /
     re_house_income_tax / re_mgmt_fee / re_property_mgmt /
     re_house_insurance / re_earthquake_ins / re_flood_ins /
     re_maintenance_fund / re_holding_monthly
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    /* ---------- 稅務費用 cat_re_tax ---------- */
    {
      id: 're_house_tax',
      name: '房屋稅試算',
      cat: 'cat_re_tax',
      icon: 'doc',
      desc: '輸入房屋現值與使用用途，依稅率級距試算每年應繳納的房屋稅額，並比較不同用途的稅務差異。',
      keywords: ['房屋稅', '房屋現值', '住家用', '營業用', '稅率'],
      fields: [
        { key: 'houseValue', label: '房屋現值（評定現值）', type: 'number', default: 5000000, unit: '元', min: 1, step: 100000 },
        {
          key: 'useType', label: '使用用途', type: 'select', default: 'self',
          options: [
            { value: 'self', label: '自住住家用（1.2%）' },
            { value: 'home', label: '非自住住家用（1.5%）' },
            { value: 'nonbiz', label: '非住家非營業（2%）' },
            { value: 'biz', label: '營業用（3%）' }
          ]
        },
        { key: 'rate', label: '實際適用稅率', type: 'number', default: 1.2, unit: '%', min: 0.1, max: 6, step: 0.05, hint: '可依各縣市稅單微調，例如自住住家用 1.2%' }
      ]
    },
    {
      id: 're_land_value_tax',
      name: '地價稅試算',
      cat: 'cat_re_tax',
      icon: 'land',
      desc: '輸入申報地價與持有面積，試算每年地價稅額，並比較一般用地與自用住宅優惠稅率的差異。',
      keywords: ['地價稅', '申報地價', '自用住宅', '累進稅率', '土地'],
      fields: [
        { key: 'unitPrice', label: '申報地價（每平方公尺）', type: 'number', default: 12000, unit: '元/平方公尺', min: 1, step: 500 },
        { key: 'areaM2', label: '持有土地面積', type: 'number', default: 50, unit: '平方公尺', min: 1, step: 1 },
        {
          key: 'useType', label: '使用別', type: 'select', default: 'general',
          options: [
            { value: 'general', label: '一般用地（基本稅率 1%）' },
            { value: 'self', label: '自用住宅優惠（0.2%）' }
          ]
        },
        { key: 'rate', label: '實際適用稅率', type: 'number', default: 1.0, unit: '%', min: 0.1, max: 5, step: 0.05, hint: '一般用地基本稅率 10‰、自用住宅優惠 2‰，累進超過時會再提高' }
      ]
    },
    {
      id: 're_deed_tax',
      name: '契稅試算',
      cat: 'cat_re_tax',
      icon: 'doc',
      desc: '依房屋現值與移轉類別（買賣、贈與、典權、分割等），試算應繳納的契稅稅額。',
      keywords: ['契稅', '房屋移轉', '買賣', '贈與', '代書'],
      fields: [
        { key: 'houseValue', label: '房屋現值（申報契約價格）', type: 'number', default: 6000000, unit: '元', min: 1, step: 100000 },
        {
          key: 'deedType', label: '移轉類別', type: 'select', default: 'buy',
          options: [
            { value: 'buy', label: '買賣（6%）' },
            { value: 'gift', label: '贈與（6%）' },
            { value: 'mortgageRight', label: '典權（4%）' },
            { value: 'division', label: '分割（2%）' },
            { value: 'occupy', label: '占有（6%）' }
          ]
        }
      ]
    },
    {
      id: 're_stamp_duty',
      name: '印花稅試算',
      cat: 'cat_re_tax',
      icon: 'doc',
      desc: '依憑證金額與憑證類型（銀錢收據、不動產買賣契約等），試算應貼用的印花稅額。',
      keywords: ['印花稅', '收據', '不動產契約', '憑證'],
      fields: [
        { key: 'amount', label: '憑證金額', type: 'number', default: 3000000, unit: '元', min: 0, step: 100000 },
        {
          key: 'dutyType', label: '憑證類型', type: 'select', default: 'receipt',
          options: [
            { value: 'receipt', label: '銀錢收據（0.4%）' },
            { value: 'contract', label: '不動產買賣契約（12 元/件）' }
          ]
        },
        { key: 'copies', label: '憑證份數', type: 'number', default: 1, unit: '份', min: 1, max: 50 }
      ]
    },
    {
      id: 're_agent_fee',
      name: '仲介服務費試算',
      cat: 'cat_re_tax',
      icon: 'swap',
      desc: '輸入成交總價與買賣雙方費率，試算仲介服務費用，並提醒買賣雙方合計費率上限。',
      keywords: ['仲介費', '服務費', '成交價', '買方', '賣方'],
      fields: [
        { key: 'price', label: '成交總價', type: 'number', default: 12000000, unit: '元', min: 1, step: 100000 },
        { key: 'buyerRate', label: '買方費率', type: 'number', default: 2, unit: '%', min: 0, max: 6, step: 0.1 },
        { key: 'sellerRate', label: '賣方費率', type: 'number', default: 4, unit: '%', min: 0, max: 6, step: 0.1 }
      ]
    },
    {
      id: 're_notary_fee',
      name: '代書費試算',
      cat: 'cat_re_tax',
      icon: 'doc',
      desc: '依買賣價金、貸款金額與服務項目（過戶、設定抵押權），試算常見的代書服務費行情。',
      keywords: ['代書費', '過戶', '抵押權設定', '土地登記', '買賣'],
      fields: [
        { key: 'price', label: '買賣價金', type: 'number', default: 12000000, unit: '元', min: 1, step: 100000 },
        { key: 'loanAmt', label: '貸款金額', type: 'number', default: 8000000, unit: '元', min: 0, step: 100000 },
        {
          key: 'serviceType', label: '服務項目', type: 'select', default: 'transfer_mortgage',
          options: [
            { value: 'transfer', label: '僅辦理所有權過戶' },
            { value: 'transfer_mortgage', label: '過戶＋抵押權設定（常見）' },
            { value: 'mortgage_only', label: '僅辦理抵押權設定' }
          ]
        }
      ]
    },
    {
      id: 're_holding_cost',
      name: '房屋持有成本試算',
      cat: 'cat_re_tax',
      icon: 'wallet',
      desc: '彙整房屋稅、地價稅、管理費、保險與修繕提列，計算每年及每月的房屋持有成本結構。',
      keywords: ['持有成本', '房屋稅', '地價稅', '管理費', '修繕'],
      fields: [
        { key: 'houseValue', label: '房屋現值', type: 'number', default: 5000000, unit: '元', min: 0, step: 100000 },
        { key: 'landValue', label: '土地申報地價總額', type: 'number', default: 3000000, unit: '元', min: 0, step: 100000 },
        { key: 'mgmtFeeMonthly', label: '每月管理費', type: 'number', default: 6000, unit: '元', min: 0, step: 500 },
        { key: 'repairMonthly', label: '每月修繕提列', type: 'number', default: 3000, unit: '元', min: 0, step: 500 },
        { key: 'insuranceMonthly', label: '每月保險分攤', type: 'number', default: 500, unit: '元', min: 0, step: 100 }
      ]
    },
    {
      id: 're_land_appreciation',
      name: '土地增值稅試算',
      cat: 'cat_re_tax',
      icon: 'trend',
      desc: '依前次移轉現值、本次公告現值與物價指數，試算土地漲價總數額及應繳納的土地增值稅。',
      keywords: ['土地增值稅', '漲價總數額', '公告現值', '物價指數', '自用住宅'],
      fields: [
        { key: 'prevValue', label: '前次移轉現值', type: 'number', default: 3000000, unit: '元', min: 0, step: 100000 },
        { key: 'currValue', label: '本次公告現值', type: 'number', default: 6000000, unit: '元', min: 0, step: 100000 },
        { key: 'priceIndex', label: '物價指數（前期＝100）', type: 'number', default: 130, unit: '', min: 100, step: 1, hint: '例如 130 代表物價較前次移轉時上漲 30%' },
        {
          key: 'useType', label: '適用稅率', type: 'select', default: 'general',
          options: [
            { value: 'general', label: '一般用地（累進 20%／30%／40%）' },
            { value: 'self', label: '自用住宅優惠（10%）' }
          ]
        }
      ]
    },
    {
      id: 're_house_income_tax',
      name: '房地合一稅試算',
      cat: 'cat_re_tax',
      icon: 'percent',
      desc: '輸入成交價、取得成本與持有年數，依房地合一稅率級距試算出售不動產的應納稅額。',
      keywords: ['房地合一稅', '不動產交易', '交易所得', '持有年限', '自住房'],
      fields: [
        { key: 'sellPrice', label: '成交總價', type: 'number', default: 15000000, unit: '元', min: 0, step: 100000 },
        { key: 'cost', label: '取得成本（含買價與修繕）', type: 'number', default: 10000000, unit: '元', min: 0, step: 100000 },
        { key: 'expense', label: '取得及移轉費用', type: 'number', default: 300000, unit: '元', min: 0, step: 10000 },
        { key: 'holdYears', label: '持有年數', type: 'number', default: 8, unit: '年', min: 0, max: 50, step: 1 },
        {
          key: 'selfUse', label: '是否為自住房', type: 'select', default: 'no',
          options: [
            { value: 'no', label: '一般用途' },
            { value: 'yes', label: '自用住宅（享 400 萬免稅額）' }
          ]
        }
      ]
    },

    /* ---------- 持有管理 cat_re_holding ---------- */
    {
      id: 're_mgmt_fee',
      name: '社區管理費試算',
      cat: 'cat_re_holding',
      icon: 'building',
      desc: '依房屋坪數、每坪管理費與車位數，試算每月與每年應繳納的社區管理費用。',
      keywords: ['管理費', '社區', '大樓', '車位', '公設'],
      fields: [
        { key: 'ping', label: '房屋坪數', type: 'number', default: 25, unit: '坪', min: 1, step: 1 },
        { key: 'feePerPing', label: '每坪管理費', type: 'number', default: 60, unit: '元/坪/月', min: 0, step: 5 },
        { key: 'parkingCount', label: '車位數', type: 'number', default: 1, unit: '個', min: 0, max: 10 },
        { key: 'parkingFee', label: '車位管理費（每個）', type: 'number', default: 1500, unit: '元/月', min: 0, step: 100 }
      ]
    },
    {
      id: 're_property_mgmt',
      name: '物業管理費試算',
      cat: 'cat_re_holding',
      icon: 'shield',
      desc: '依房屋坪數與服務等級（一般、精緻、飯店級），試算物業管理公司的每月委託費用。',
      keywords: ['物業管理', '物管費', '守衛', '清潔', '委託'],
      fields: [
        { key: 'ping', label: '房屋坪數', type: 'number', default: 30, unit: '坪', min: 1, step: 1 },
        {
          key: 'level', label: '服務等級', type: 'select', default: 'general',
          options: [
            { value: 'general', label: '一般級（60 元/坪）' },
            { value: 'premium', label: '精緻級（120 元/坪）' },
            { value: 'hotel', label: '飯店級（250 元/坪）' }
          ]
        }
      ]
    },
    {
      id: 're_house_insurance',
      name: '住宅火險保費試算',
      cat: 'cat_re_holding',
      icon: 'umbrella',
      desc: '依建物保險金額與結構別，試算住宅火險的年繳保費，並比較不同結構的費率差異。',
      keywords: ['火險', '住宅保險', '建物保險', '費率'],
      fields: [
        { key: 'sumInsured', label: '建物保險金額', type: 'number', default: 5000000, unit: '元', min: 1, step: 100000 },
        {
          key: 'structure', label: '建物結構', type: 'select', default: 'rc',
          options: [
            { value: 'rc', label: '鋼筋混凝土（0.8‰）' },
            { value: 'brick', label: '加強磚造（1.2‰）' },
            { value: 'steel', label: '鋼骨鋼筋（0.6‰）' }
          ]
        }
      ]
    },
    {
      id: 're_earthquake_ins',
      name: '地震險保費試算',
      cat: 'cat_re_holding',
      icon: 'bolt',
      desc: '輸入房屋樓層別與保險金額，試算政策性住宅地震保險的年繳保費。',
      keywords: ['地震險', '住宅地震保險', '政策性保險', '樓層'],
      fields: [
        { key: 'sumInsured', label: '保險金額', type: 'number', default: 1500000, unit: '元', min: 1, step: 100000, hint: '政策性住宅地震保險基本保額約 150 萬元' },
        {
          key: 'floor', label: '樓層別', type: 'select', default: 'low',
          options: [
            { value: 'low', label: '低樓層（1~3 樓）' },
            { value: 'mid', label: '中樓層（4~14 樓）' },
            { value: 'high', label: '高樓層（15 樓以上）' }
          ]
        }
      ]
    },
    {
      id: 're_flood_ins',
      name: '淹水險保費試算',
      cat: 'cat_re_holding',
      icon: 'drop',
      desc: '依地區風險等級與建物、動產損失限額，試算住宅淹水（水災）險的年繳保費。',
      keywords: ['淹水險', '水災險', ' flood', '財物損失', '低窪地區'],
      fields: [
        { key: 'buildingValue', label: '建物損失限額', type: 'number', default: 1000000, unit: '元', min: 0, step: 100000 },
        { key: 'contentValue', label: '動產（設備家具）損失限額', type: 'number', default: 500000, unit: '元', min: 0, step: 100000 },
        {
          key: 'risk', label: '地區風險等級', type: 'select', default: 'low',
          options: [
            { value: 'low', label: '市區一般（1‰）' },
            { value: 'mid', label: '沿海或河岸區（2.5‰）' },
            { value: 'high', label: '低窪易淹地區（5‰）' }
          ]
        }
      ]
    },
    {
      id: 're_maintenance_fund',
      name: '房屋修繕準備金試算',
      cat: 'cat_re_holding',
      icon: 'paint',
      desc: '設定目標修繕總額與準備期間，試算在考慮通膨下每月應提撥的修繕準備金。',
      keywords: ['修繕', '準備金', '老房翻新', '遲修', '每月提撥'],
      fields: [
        { key: 'target', label: '目標修繕總額', type: 'number', default: 600000, unit: '元', min: 1, step: 10000 },
        { key: 'years', label: '準備期間', type: 'number', default: 10, unit: '年', min: 1, max: 40 },
        { key: 'inflation', label: '通膨率', type: 'number', default: 1.5, unit: '%', min: 0, max: 10, step: 0.1, hint: '假設修繕費用每年通膨上漲率' }
      ]
    },
    {
      id: 're_holding_monthly',
      name: '房屋持有月成本總覽',
      cat: 'cat_re_holding',
      icon: 'wallet',
      desc: '彙整房貸月付、管理費、房屋稅、地價稅、保險與修繕提列，一覽房屋每月與每年持有成本結構。',
      keywords: ['月成本', '持有總覽', '房貸', '稅費', '管理費'],
      fields: [
        { key: 'mortgagePay', label: '房貸月付金', type: 'number', default: 32000, unit: '元/月', min: 0, step: 1000 },
        { key: 'mgmtFee', label: '每月管理費', type: 'number', default: 6000, unit: '元/月', min: 0, step: 500 },
        { key: 'houseTaxY', label: '房屋稅年繳', type: 'number', default: 60000, unit: '元/年', min: 0, step: 1000 },
        { key: 'landTaxY', label: '地價稅年繳', type: 'number', default: 30000, unit: '元/年', min: 0, step: 1000 },
        { key: 'insuranceY', label: '保險年繳（火險＋地震險）', type: 'number', default: 8000, unit: '元/年', min: 0, step: 500 },
        { key: 'repairM', label: '每月修繕提列', type: 'number', default: 3000, unit: '元/月', min: 0, step: 500 }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);
