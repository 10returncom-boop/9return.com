/* ============================================================
   config/tools-re-b.js — 投資槓桿（cat_re_invest）16 支工具規格
   負責代理：RE-B
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    {
      id: 're_leverage',
      name: '財務槓桿倍數試算',
      cat: 'cat_re_invest',
      icon: 'trend',
      desc: '輸入房屋總價、頭期款比例與房貸利率，計算財務槓桿倍數，並比較有無槓桿下的年化報酬率差異。',
      keywords: ['財務槓桿', '槓桿倍數', '頭期款', '權益報酬率', 'LOE'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 1, max: 90, step: 1, hint: '自備款占總價比例，例如 30 代表三成自備' },
        { key: 'growth', label: '房價年漲幅', type: 'number', default: 3, unit: '%', min: -10, max: 30, step: 0.1 },
        { key: 'loanRate', label: '房貸年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'years', label: '持有年數', type: 'number', default: 5, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 're_leverage_return',
      name: '槓桿投資報酬率試算',
      cat: 'cat_re_invest',
      icon: 'chart',
      desc: '估算貸款購屋出租後的租金毛投報率、淨投報率與現金投報率（Cash-on-Cash），評估槓桿效益。',
      keywords: ['槓桿', '現金投報率', 'Cash-on-Cash', '租金', '房貸月付'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 12000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 1, max: 90, step: 1 },
        { key: 'loanRate', label: '房貸年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'years', label: '貸款年限', type: 'number', default: 20, unit: '年', min: 1, max: 40 },
        { key: 'monthlyRent', label: '月租金', type: 'number', default: 25000, unit: '元', min: 0, step: 1000 },
        { key: 'expenses', label: '每月持有費用', type: 'number', default: 4000, unit: '元', min: 0, step: 500, hint: '管理費、房屋稅、修繕分攤等每月固定支出' }
      ]
    },
    {
      id: 're_flip_roi',
      name: '轉售投資報酬試算',
      cat: 'cat_re_invest',
      icon: 'swap',
      desc: '計算買進、翻修、短期轉售的總成本、賣出淨收入與最終轉售獲利及年化報酬率。',
      keywords: ['轉售', 'flip', '短進短出', '獲利', '投資報酬率'],
      fields: [
        { key: 'buyPrice', label: '買進價格', type: 'number', default: 8000000, unit: '元', min: 1, step: 100000 },
        { key: 'renovation', label: '翻修成本', type: 'number', default: 1500000, unit: '元', min: 0, step: 100000 },
        { key: 'sellPrice', label: '預計賣出價格', type: 'number', default: 11000000, unit: '元', min: 1, step: 100000 },
        { key: 'buyFeeRate', label: '買入相關費用率', type: 'number', default: 6, unit: '%', min: 0, max: 15, step: 0.5, hint: '契稅、代書、仲介等購入階段費用占買價比例' },
        { key: 'sellFeeRate', label: '賣出相關費用率', type: 'number', default: 5, unit: '%', min: 0, max: 20, step: 0.5, hint: '仲介費、房地合一稅等占售價比例' },
        { key: 'holdingMonths', label: '持有月數', type: 'number', default: 6, unit: '月', min: 1, max: 60 },
        { key: 'monthlyHolding', label: '每月持有支出', type: 'number', default: 12000, unit: '元', min: 0, step: 1000, hint: '房貸利息、管理費、地價稅等持有期間每月支出' }
      ]
    },
    {
      id: 're_reno_roi',
      name: '翻修投資報酬率試算',
      cat: 'cat_re_invest',
      icon: 'paint',
      desc: '比較翻修成本與售價提升效益，並估算提高租金後的成本回收月數。',
      keywords: ['翻修', '裝潢', '報酬率', '成本效益', '回收月數'],
      fields: [
        { key: 'renoCost', label: '翻修總預算', type: 'number', default: 800000, unit: '元', min: 1, step: 50000 },
        { key: 'valueAdded', label: '翻修後預估售價提升', type: 'number', default: 1500000, unit: '元', min: 0, step: 50000 },
        { key: 'rentIncrease', label: '每月租金提升', type: 'number', default: 3000, unit: '元', min: 0, step: 500 }
      ]
    },
    {
      id: 're_foreclosure',
      name: '法拍屋成本試算',
      cat: 'cat_re_invest',
      icon: 'scale',
      desc: '計算法拍標的拍定價、市價折扣、取得總成本與立即轉售的估計獲利。',
      keywords: ['法拍屋', '拍定價', '市價折扣', '強制執行', '成本'],
      fields: [
        { key: 'bidPrice', label: '拍定價格', type: 'number', default: 6000000, unit: '元', min: 1, step: 100000 },
        { key: 'marketPrice', label: '週邊市價', type: 'number', default: 9000000, unit: '元', min: 1, step: 100000 },
        { key: 'renovation', label: '點交修繕預估', type: 'number', default: 500000, unit: '元', min: 0, step: 100000 },
        { key: 'extraCosts', label: '額外成本', type: 'number', default: 200000, unit: '元', min: 0, step: 50000, hint: '強制執行、清潔、搬家、代墊房貸等額外支出' },
        { key: 'feeRate', label: '購入規費率', type: 'number', default: 6, unit: '%', min: 0, max: 15, step: 0.5 }
      ]
    },
    {
      id: 're_parking',
      name: '停車位投資評估',
      cat: 'cat_re_invest',
      icon: 'car',
      desc: '依停車位價格、月租金、空置率與增值率，估算年淨收益、淨投報率與回收年限。',
      keywords: ['停車位', '車位', '租金', '投報率', '回收年限'],
      fields: [
        { key: 'price', label: '停車位價格', type: 'number', default: 1500000, unit: '元', min: 1, step: 100000 },
        { key: 'monthlyRent', label: '月租金', type: 'number', default: 4000, unit: '元', min: 0, step: 500 },
        { key: 'vacancyRate', label: '空置率', type: 'number', default: 5, unit: '%', min: 0, max: 50, step: 1 },
        { key: 'expenses', label: '每月管理費攤提', type: 'number', default: 500, unit: '元', min: 0, step: 100 },
        { key: 'appreciation', label: '年增值率', type: 'number', default: 1, unit: '%', min: -10, max: 20, step: 0.1 }
      ]
    },
    {
      id: 're_shop_rent',
      name: '店面租金評估',
      cat: 'cat_re_invest',
      icon: 'store',
      desc: '估算店面每坪租金、年有效租金收入、扣除空置與營運成本後的淨投報率。',
      keywords: ['店面', '店面租金', '每坪租金', '投報率', '空置率'],
      fields: [
        { key: 'shopPrice', label: '店面總價', type: 'number', default: 20000000, unit: '元', min: 1, step: 500000 },
        { key: 'monthlyRent', label: '月租金', type: 'number', default: 80000, unit: '元', min: 0, step: 5000 },
        { key: 'ping', label: '店面坪數', type: 'number', default: 20, unit: '坪', min: 1, step: 1 },
        { key: 'vacancyRate', label: '空置率', type: 'number', default: 10, unit: '%', min: 0, max: 60, step: 1 },
        { key: 'expensesRate', label: '營運成本率', type: 'number', default: 15, unit: '%', min: 0, max: 60, step: 1, hint: '房屋稅、地價稅、管理費、修繕占有效租金比例' }
      ]
    },
    {
      id: 're_commercial',
      name: '商用不動產收益評估',
      cat: 'cat_re_invest',
      icon: 'office',
      desc: '以淨營運收入（NOI）計算資本化率、還本付息保障倍數（DSCR）與貸款後現金投報率。',
      keywords: ['商用不動產', 'NOI', '資本化率', 'DSCR', '現金投報率'],
      fields: [
        { key: 'price', label: '不動產總價', type: 'number', default: 30000000, unit: '元', min: 1, step: 1000000 },
        { key: 'noi', label: '年淨營運收入（NOI）', type: 'number', default: 1800000, unit: '元', min: 0, step: 100000 },
        { key: 'loanRatio', label: '貸款成數', type: 'number', default: 50, unit: '%', min: 0, max: 80, step: 1 },
        { key: 'loanRate', label: '房貸年利率', type: 'number', default: 2.5, unit: '%', min: 0, max: 15, step: 0.01 },
        { key: 'years', label: '貸款年限', type: 'number', default: 20, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 're_farm_land',
      name: '農地投資評估',
      cat: 'cat_re_invest',
      icon: 'farm',
      desc: '估算農地每坪單價、年租金淨收益、長期增值與租金加值的總報酬率。',
      keywords: ['農地', '農地投資', '每坪單價', '租金', '增值'],
      fields: [
        { key: 'landPrice', label: '農地總價', type: 'number', default: 3000000, unit: '元', min: 1, step: 100000 },
        { key: 'areaPing', label: '土地坪數', type: 'number', default: 500, unit: '坪', min: 1, step: 50 },
        { key: 'annualRent', label: '年租金收入', type: 'number', default: 15000, unit: '元', min: 0, step: 1000 },
        { key: 'annualTax', label: '年地價稅與相關費用', type: 'number', default: 2000, unit: '元', min: 0, step: 500 },
        { key: 'appreciation', label: '年增值率', type: 'number', default: 2, unit: '%', min: -10, max: 20, step: 0.1 },
        { key: 'holdYears', label: '持有年數', type: 'number', default: 10, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 're_far_bcr',
      name: '容積率與建蔽率試算',
      cat: 'cat_re_invest',
      icon: 'ruler',
      desc: '依土地坪數、容積率與建蔽率，計算最大建築面積、總樓地板面積與估計可建樓層。',
      keywords: ['容積率', '建蔽率', '建築面積', '樓地板面積', '建築'],
      fields: [
        { key: 'landPing', label: '土地面積', type: 'number', default: 30, unit: '坪', min: 0.1, step: 1 },
        { key: 'far', label: '容積率', type: 'number', default: 300, unit: '%', min: 0, max: 1000, step: 10, hint: '例如 300 代表容積率 300%' },
        { key: 'bcr', label: '建蔽率', type: 'number', default: 50, unit: '%', min: 0, max: 100, step: 1 }
      ]
    },
    {
      id: 're_land_price',
      name: '土地坪價試算',
      cat: 'cat_re_invest',
      icon: 'land',
      desc: '由土地總價與坪數計算每坪單價與每平方公尺單價，並呈現坪數與總價的關係。',
      keywords: ['土地', '每坪單價', '坪價', '平方公尺', '地價'],
      fields: [
        { key: 'totalPrice', label: '土地總價', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'areaPing', label: '土地坪數', type: 'number', default: 50, unit: '坪', min: 0.1, step: 1 }
      ]
    },
    {
      id: 're_multiple_units',
      name: '多套房現金流試算',
      cat: 'cat_re_invest',
      icon: 'grid',
      desc: '一次計算多戶出租物業的總購置成本、月租金收入、房貸月付與每月淨現金流。',
      keywords: ['多套房', '整層', '現金流', '出租', '現金投報率'],
      fields: [
        { key: 'unitCount', label: '戶數', type: 'number', default: 4, unit: '戶', min: 1, max: 50 },
        { key: 'pricePerUnit', label: '每戶總價', type: 'number', default: 6000000, unit: '元', min: 1, step: 100000 },
        { key: 'rentPerUnit', label: '每戶月租金', type: 'number', default: 18000, unit: '元', min: 0, step: 1000 },
        { key: 'vacancyRate', label: '空置率', type: 'number', default: 5, unit: '%', min: 0, max: 60, step: 1 },
        { key: 'expensesPerUnit', label: '每戶月管銷費用', type: 'number', default: 3000, unit: '元', min: 0, step: 500 },
        { key: 'loanRatio', label: '貸款成數', type: 'number', default: 60, unit: '%', min: 0, max: 80, step: 1 },
        { key: 'loanRate', label: '房貸年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 15, step: 0.01 },
        { key: 'years', label: '貸款年限', type: 'number', default: 25, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 're_reit',
      name: 'REITs 配息試算',
      cat: 'cat_re_invest',
      icon: 'coins',
      desc: '輸入 REITs 股價、每年配息與持股數，估算現金殖利率與多年累計配息總額。',
      keywords: ['REITs', '不動產信託', '配息', '殖利率', '股息'],
      fields: [
        { key: 'price', label: '每單位股價', type: 'number', default: 20, unit: '元', min: 0.01, step: 0.1 },
        { key: 'dividendPerShare', label: '每年每單位配息', type: 'number', default: 1.2, unit: '元', min: 0, step: 0.1 },
        { key: 'shares', label: '持有單位數', type: 'number', default: 10000, unit: '單位', min: 1, step: 1000 },
        { key: 'years', label: '持有年數', type: 'number', default: 10, unit: '年', min: 1, max: 40 },
        { key: 'growth', label: '配息年成長率', type: 'number', default: 2, unit: '%', min: -20, max: 20, step: 0.5 }
      ]
    },
    {
      id: 're_net_equity',
      name: '不動產淨值試算',
      cat: 'cat_re_invest',
      icon: 'wallet',
      desc: '由目前市價與剩餘貸款計算不動產淨值、淨值比率，並與原始購入條件比較帳面增值。',
      keywords: ['不動產淨值', '淨值', 'LTV', '貸款成數', '資產'],
      fields: [
        { key: 'marketValue', label: '目前市價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'loanBalance', label: '剩餘貸款餘額', type: 'number', default: 6000000, unit: '元', min: 0, step: 100000 },
        { key: 'originalPrice', label: '原始購入價格', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'originalLoan', label: '原始貸款金額', type: 'number', default: 8000000, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 're_rental_manage',
      name: '出租管理收支試算',
      cat: 'cat_re_invest',
      icon: 'key',
      desc: '估算出租物業年有效租金、各項持有支出與淨收益，並計算扣除成本後的淨投報率。',
      keywords: ['出租', '租金管理', '收支', '淨投報率', '空置'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 8000000, unit: '元', min: 1, step: 100000 },
        { key: 'monthlyRent', label: '月租金', type: 'number', default: 25000, unit: '元', min: 0, step: 1000 },
        { key: 'vacancyDays', label: '每年空置天數', type: 'number', default: 15, unit: '天', min: 0, max: 365 },
        { key: 'mgmtFeeRate', label: '管理費占租金比例', type: 'number', default: 5, unit: '%', min: 0, max: 30, step: 0.5 },
        { key: 'repairYearly', label: '每年修繕準備', type: 'number', default: 6000, unit: '元', min: 0, step: 1000 },
        { key: 'taxYearly', label: '年稅費（房屋稅＋地價稅）', type: 'number', default: 8000, unit: '元', min: 0, step: 1000 },
        { key: 'insuranceYearly', label: '年保險費', type: 'number', default: 3000, unit: '元', min: 0, step: 500 }
      ]
    },
    {
      id: 're_hold_rent_ratio',
      name: '房價租金比試算',
      cat: 'cat_re_invest',
      icon: 'scale',
      desc: '由房屋總價與月租金計算房價租金比（回本年限）與租金報酬率，判斷合理度。',
      keywords: ['房價租金比', '租售比', '回本年限', '租金報酬率'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 12000000, unit: '元', min: 1, step: 100000 },
        { key: 'monthlyRent', label: '月租金', type: 'number', default: 22000, unit: '元', min: 0, step: 1000 }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);

/*
 * RE-B 負責工具 id 清單（16 支）：
 * re_leverage, re_leverage_return, re_flip_roi, re_reno_roi, re_foreclosure,
 * re_parking, re_shop_rent, re_commercial, re_farm_land, re_far_bcr,
 * re_land_price, re_multiple_units, re_reit, re_net_equity, re_rental_manage,
 * re_hold_rent_ratio
 */
