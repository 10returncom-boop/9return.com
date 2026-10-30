/* ============================================================
   config/tools-fin-b.js — 財務管理 FIN-B 工具規格（27 支）
   投資理財 12 + 財務分析 11 + 稅務試算 4
   負責工具 id：
     fin_asset_alloc, fin_etf, fin_stock, fin_pe, fin_dividend_yield,
     fin_dividend, fin_bond, fin_forex, fin_foreign_currency, fin_gold,
     fin_stock_fee, fin_stock_tax,
     fin_irr, fin_npv, fin_dcf, fin_roe, fin_eps, fin_roi, fin_sharpe,
     fin_volatility, fin_risk_tolerance, fin_stop_loss, fin_take_profit,
     fin_income_tax, fin_payroll_tax, fin_estate_tax, fin_supplementary_premium
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    /* ============ 投資理財 cat_fin_invest ============ */
    {
      id: 'fin_asset_alloc',
      name: '資產配置試算',
      cat: 'cat_fin_invest',
      icon: 'chart2',
      desc: '輸入總資產與各資產類別配置比例，自動換算金額並以環圖呈現配置結構，做為資產配置檢視。',
      keywords: ['資產配置', '股票', '債券', '現金', '黃金', '基金', '比例'],
      fields: [
        { key: 'totalAssets', label: '總資產規模', type: 'number', default: 1000000, unit: '元', min: 1, step: 10000 },
        { key: 'stockPct', label: '股票占比', type: 'number', default: 60, unit: '%', min: 0, max: 100, step: 1 },
        { key: 'bondPct', label: '債券占比', type: 'number', default: 20, unit: '%', min: 0, max: 100, step: 1 },
        { key: 'cashPct', label: '現金占比', type: 'number', default: 10, unit: '%', min: 0, max: 100, step: 1 },
        { key: 'goldPct', label: '黃金占比', type: 'number', default: 5, unit: '%', min: 0, max: 100, step: 1 },
        { key: 'fundPct', label: '基金占比', type: 'number', default: 5, unit: '%', min: 0, max: 100, step: 1 }
      ]
    },
    {
      id: 'fin_etf',
      name: 'ETF 投資試算',
      cat: 'cat_fin_invest',
      icon: 'trend',
      desc: '以定期定額投資 ETF 為前提，考量年化報酬率與總費用率，推估期末累積資產與投入本金成長曲線。',
      keywords: ['ETF', '定期定額', '指數', '累積', '報酬率', '費用率'],
      fields: [
        { key: 'monthly', label: '每月定期定額', type: 'number', default: 10000, unit: '元', min: 1, step: 1000 },
        { key: 'years', label: '投資年限', type: 'number', default: 20, unit: '年', min: 1, max: 60 },
        { key: 'ret', label: '預期年化報酬率', type: 'number', default: 6, unit: '%', min: 0, max: 30, step: 0.1 },
        { key: 'fee', label: 'ETF 總費用率', type: 'number', default: 0.3, unit: '%', min: 0, max: 3, step: 0.01 }
      ]
    },
    {
      id: 'fin_stock',
      name: '股票投資損益試算',
      cat: 'cat_fin_invest',
      icon: 'chart',
      desc: '輸入買進與賣出股價、股數，計入手續費與賣出證交稅，算出實際損益與報酬率。',
      keywords: ['股票', '損益', '手續費', '證交稅', '買進', '賣出'],
      fields: [
        { key: 'buyPrice', label: '買進股價', type: 'number', default: 30, unit: '元', min: 0.01, step: 0.1 },
        { key: 'shares', label: '股數', type: 'number', default: 1000, unit: '股', min: 1, step: 100 },
        { key: 'sellPrice', label: '賣出股價', type: 'number', default: 35, unit: '元', min: 0.01, step: 0.1 },
        { key: 'feeRate', label: '手續費率', type: 'number', default: 0.1425, unit: '%', min: 0, max: 1, step: 0.0005, hint: '一般為 0.1425%，買賣雙向收取' },
        { key: 'taxRate', label: '賣出證交稅率', type: 'number', default: 0.3, unit: '%', min: 0, max: 1, step: 0.01, hint: '賣出時課徵 0.3%' }
      ]
    },
    {
      id: 'fin_pe',
      name: '本益比試算',
      cat: 'cat_fin_invest',
      icon: 'percent',
      desc: '以現價、每股盈餘與盈餘成長率計算本益比與 PEG，並推估合理股價，做為評估股價高低的參考。',
      keywords: ['本益比', 'PE', 'PEG', '每股盈餘', '合理股價', '成長率'],
      fields: [
        { key: 'price', label: '目前股價', type: 'number', default: 50, unit: '元', min: 0.01, step: 0.1 },
        { key: 'eps', label: '每股盈餘（EPS）', type: 'number', default: 3, unit: '元', min: 0.01, step: 0.1 },
        { key: 'growth', label: '盈餘年成長率', type: 'number', default: 10, unit: '%', min: 0, max: 100, step: 0.5 }
      ]
    },
    {
      id: 'fin_dividend_yield',
      name: '殖利率試算',
      cat: 'cat_fin_invest',
      icon: 'coins',
      desc: '以現價與每年每股股利計算現金殖利率，並推估持有股票的每年現金股利收入。',
      keywords: ['殖利率', '股利', '現金股利', '配息', '股息'],
      fields: [
        { key: 'price', label: '目前股價', type: 'number', default: 30, unit: '元', min: 0.01, step: 0.1 },
        { key: 'dps', label: '每年每股股利', type: 'number', default: 1.5, unit: '元', min: 0, step: 0.1 },
        { key: 'shares', label: '持股數', type: 'number', default: 1000, unit: '股', min: 1, step: 100 }
      ]
    },
    {
      id: 'fin_dividend',
      name: '股利試算',
      cat: 'cat_fin_invest',
      icon: 'cash',
      desc: '依每股股利、持股數與股利年成長率，推估多年間每年股利收入與累計股利總額。',
      keywords: ['股利', '現金股利', '配息', '股息', '累計股利'],
      fields: [
        { key: 'dps', label: '目前每股股利', type: 'number', default: 2, unit: '元', min: 0, step: 0.1 },
        { key: 'shares', label: '持股數', type: 'number', default: 30000, unit: '股', min: 1, step: 1000 },
        { key: 'growth', label: '股利年成長率', type: 'number', default: 2, unit: '%', min: 0, max: 30, step: 0.1 },
        { key: 'years', label: '預估領取年數', type: 'number', default: 20, unit: '年', min: 1, max: 60 }
      ]
    },
    {
      id: 'fin_bond',
      name: '債券投資試算',
      cat: 'cat_fin_invest',
      icon: 'bank',
      desc: '輸入債券面額、票面利率、買進價格與持有年期，計算每期利息、到期償還與總投資報酬率。',
      keywords: ['債券', '票面利率', '利息', '面額', '到期'],
      fields: [
        { key: 'face', label: '債券面額', type: 'number', default: 1000000, unit: '元', min: 1, step: 10000 },
        { key: 'coupon', label: '票面年利率', type: 'number', default: 1.5, unit: '%', min: 0, max: 20, step: 0.05 },
        { key: 'years', label: '持有年期', type: 'number', default: 5, unit: '年', min: 1, max: 30 },
        { key: 'buyPrice', label: '買進價格', type: 'number', default: 980000, unit: '元', min: 1, step: 1000 }
      ]
    },
    {
      id: 'fin_forex',
      name: '匯率換算',
      cat: 'cat_fin_invest',
      icon: 'swap',
      desc: '輸入新台幣金額與兌換匯率，換算可得外幣金額，並檢視不同匯率下可換外幣的變化。',
      keywords: ['匯率', '換匯', '外幣', '美金', '台幣'],
      fields: [
        { key: 'twd', label: '新台幣金額', type: 'number', default: 100000, unit: '元', min: 0, step: 1000 },
        { key: 'rate', label: '兌換匯率（每單位外幣兌新台幣）', type: 'number', default: 31.5, unit: '元', min: 0.01, step: 0.05, hint: '例如美金兌換匯率 31.5 代表 1 美元換 31.5 元新台幣' }
      ]
    },
    {
      id: 'fin_foreign_currency',
      name: '外幣定存試算',
      cat: 'cat_fin_invest',
      icon: 'wallet',
      desc: '輸入外幣本金、外幣利率與新台幣匯率，計算外幣定存本利和並換算回新台幣。',
      keywords: ['外幣定存', '美元定存', '外幣', '匯率', '利息'],
      fields: [
        { key: 'fcAmount', label: '外幣本金', type: 'number', default: 3000, unit: '外幣', min: 1, step: 100 },
        { key: 'fcRate', label: '外幣年利率', type: 'number', default: 4, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'years', label: '存續年期', type: 'number', default: 1, unit: '年', min: 1, max: 10 },
        { key: 'twdRate', label: '新台幣兌換匯率', type: 'number', default: 31.5, unit: '元', min: 0.01, step: 0.05 }
      ]
    },
    {
      id: 'fin_gold',
      name: '黃金投資試算',
      cat: 'cat_fin_invest',
      icon: 'coins',
      desc: '輸入黃金公克數與買進、賣出每公克單價，計算買進成本、賣出所得與投資損益。',
      keywords: ['黃金', '黃存', '公克', '金飾', '損益'],
      fields: [
        { key: 'grams', label: '黃金公克數', type: 'number', default: 10, unit: '公克', min: 0.01, step: 0.5 },
        { key: 'buyPrice', label: '每公克買進價格', type: 'number', default: 2000, unit: '元', min: 1, step: 10 },
        { key: 'sellPrice', label: '每公克賣出價格', type: 'number', default: 2150, unit: '元', min: 1, step: 10 }
      ]
    },
    {
      id: 'fin_stock_fee',
      name: '股票手續費試算',
      cat: 'cat_fin_invest',
      icon: 'calc',
      desc: '依成交金額、手續費率與券商折扣計算實際股票交易手續費，並保留最低手續費門檻。',
      keywords: ['手續費', '股票', '券商', '折扣', '交易成本'],
      fields: [
        { key: 'amount', label: '成交金額', type: 'number', default: 500000, unit: '元', min: 0, step: 1000 },
        { key: 'feeRate', label: '手續費率', type: 'number', default: 0.1425, unit: '%', min: 0, max: 1, step: 0.0005 },
        { key: 'discount', label: '券商折扣（折數百分比）', type: 'number', default: 28, unit: '%', min: 1, max: 100, step: 1, hint: '例如 28 代表 2.8 折，即收標準手續費的 28%' }
      ]
    },
    {
      id: 'fin_stock_tax',
      name: '證交稅試算',
      cat: 'cat_fin_invest',
      icon: 'scale',
      desc: '依賣出成交金額與證交稅率計算賣出時應繳的證交稅，並推估賣出後實際淨收入。',
      keywords: ['證交稅', '證券交易稅', '賣出', '稅金', '股票'],
      fields: [
        { key: 'sellAmount', label: '賣出成交金額', type: 'number', default: 500000, unit: '元', min: 0, step: 1000 },
        { key: 'taxRate', label: '證交稅率', type: 'number', default: 0.3, unit: '%', min: 0, max: 1, step: 0.01, hint: '股票賣出時課徵 0.3%' }
      ]
    },

    /* ============ 財務分析 cat_fin_analysis ============ */
    {
      id: 'fin_irr',
      name: 'IRR 內部報酬率試算',
      cat: 'cat_fin_analysis',
      icon: 'calc',
      desc: '輸入各期現金流（第一筆通常為負數代表投入），計算內部報酬率 IRR，並檢視各期現金流。',
      keywords: ['IRR', '內部報酬率', '現金流', '投資評估', '折現'],
      fields: [
        { key: 'flows', label: '現金流（負數為流出，逗號或換行分隔）', type: 'textarea', default: '-100000, 25000, 30000, 35000, 40000, 45000', rows: 3, placeholder: '-100000, 30000, 40000, 50000' }
      ]
    },
    {
      id: 'fin_npv',
      name: 'NPV 淨現值試算',
      cat: 'cat_fin_analysis',
      icon: 'chart',
      desc: '輸入折現率與各期現金流，計算淨現值 NPV，做為投資案是否值得進行的判斷依據。',
      keywords: ['NPV', '淨現值', '折現率', '現金流', '投資評估'],
      fields: [
        { key: 'rate', label: '折現率', type: 'number', default: 5, unit: '%', min: 0, max: 50, step: 0.1 },
        { key: 'flows', label: '現金流（負數為流出，逗號或換行分隔）', type: 'textarea', default: '-100000, 30000, 40000, 50000', rows: 3, placeholder: '-100000, 30000, 40000, 50000' }
      ]
    },
    {
      id: 'fin_dcf',
      name: '現金流折現評估（DCF）',
      cat: 'cat_fin_analysis',
      icon: 'chart2',
      desc: '推估預測期自由現金流與永續價值，以折現率計算企業價值，再換算每股合理股價。',
      keywords: ['DCF', '現金流折現', '企業價值', '永續價值', '合理股價'],
      fields: [
        { key: 'fcf1', label: '第一年自由現金流', type: 'number', default: 1000000, unit: '元', min: 1, step: 10000 },
        { key: 'growth', label: '預估現金流成長率', type: 'number', default: 5, unit: '%', min: 0, max: 50, step: 0.5 },
        { key: 'years', label: '明顯預測期數', type: 'number', default: 5, unit: '年', min: 1, max: 20 },
        { key: 'disc', label: '折現率', type: 'number', default: 10, unit: '%', min: 0, max: 50, step: 0.5 },
        { key: 'tg', label: '永續成長率', type: 'number', default: 2, unit: '%', min: 0, max: 10, step: 0.1 },
        { key: 'shares', label: '流通在外股數', type: 'number', default: 10000000, unit: '股', min: 1, step: 100000 }
      ]
    },
    {
      id: 'fin_roe',
      name: 'ROE 股東權益報酬率試算',
      cat: 'cat_fin_analysis',
      icon: 'trend',
      desc: '以稅後淨利除以股東權益計算 ROE，評估公司運用股東資金創造獲利的能力。',
      keywords: ['ROE', '股東權益報酬率', '淨利', '權益', '獲利能力'],
      fields: [
        { key: 'ni', label: '稅後淨利', type: 'number', default: 50000000, unit: '元', min: 0, step: 100000 },
        { key: 'equity', label: '股東權益', type: 'number', default: 400000000, unit: '元', min: 1, step: 1000000 }
      ]
    },
    {
      id: 'fin_eps',
      name: 'EPS 每股盈餘試算',
      cat: 'cat_fin_analysis',
      icon: 'coins',
      desc: '扣除特別股股利後的稅後淨利除以流通股數，計算每股盈餘 EPS。',
      keywords: ['EPS', '每股盈餘', '淨利', '股數', '特別股'],
      fields: [
        { key: 'ni', label: '稅後淨利', type: 'number', default: 50000000, unit: '元', min: 0, step: 100000 },
        { key: 'shares', label: '流通在外股數', type: 'number', default: 10000000, unit: '股', min: 1, step: 100000 },
        { key: 'pref', label: '特別股股利', type: 'number', default: 0, unit: '元', min: 0, step: 10000 }
      ]
    },
    {
      id: 'fin_roi',
      name: '投資報酬率試算（ROI）',
      cat: 'cat_fin_analysis',
      icon: 'trend',
      desc: '輸入投資成本與最終價值，計算總投資報酬率並換算年化投資報酬率。',
      keywords: ['ROI', '投資報酬率', '年化報酬', '獲利', '成本'],
      fields: [
        { key: 'cost', label: '投資成本', type: 'number', default: 500000, unit: '元', min: 1, step: 10000 },
        { key: 'final', label: '最終價值', type: 'number', default: 750000, unit: '元', min: 0, step: 10000 },
        { key: 'years', label: '投資年期', type: 'number', default: 3, unit: '年', min: 1, max: 50 }
      ]
    },
    {
      id: 'fin_sharpe',
      name: '夏普比率試算',
      cat: 'cat_fin_analysis',
      icon: 'spark',
      desc: '以預期報酬率減無風險利率，除以報酬率標準差，計算夏普比率評估每單位風險的超額報酬。',
      keywords: ['夏普比率', 'Sharpe', '風險', '超額報酬', '波動'],
      fields: [
        { key: 'ret', label: '預期年化報酬率', type: 'number', default: 8, unit: '%', min: 0, max: 50, step: 0.5 },
        { key: 'rf', label: '無風險利率', type: 'number', default: 1.5, unit: '%', min: 0, max: 10, step: 0.1 },
        { key: 'vol', label: '報酬率標準差（年化）', type: 'number', default: 12, unit: '%', min: 0.1, max: 100, step: 0.5 }
      ]
    },
    {
      id: 'fin_volatility',
      name: '標準差與波動率試算',
      cat: 'cat_fin_analysis',
      icon: 'chart2',
      desc: '輸入一段期間的報酬率序列，計算平均報酬、樣本標準差與年化波動率，並繪出報酬率走勢。',
      keywords: ['標準差', '波動率', '風險', '報酬率', '年化'],
      fields: [
        { key: 'returns', label: '各期報酬率序列（%，逗號或換行分隔）', type: 'textarea', default: '5, -2, 8, 3, -6, 10, 4, -3', rows: 4, placeholder: '5, -2, 8, 3, -6, 10' }
      ]
    },
    {
      id: 'fin_risk_tolerance',
      name: '風險承受度評估',
      cat: 'cat_fin_analysis',
      icon: 'shield',
      desc: '以年齡、投資期限、虧損反應與收入穩定性等情境題計分，推估適合的投資風險屬性。',
      keywords: ['風險承受度', '投資屬性', '保守', '穩健', '積極', '評估'],
      fields: [
        { key: 'q_age', label: '你的年齡層', type: 'select', default: 3,
          options: [
            { value: 4, label: '30 歲以下' },
            { value: 3, label: '30~50 歲' },
            { value: 2, label: '50~65 歲' },
            { value: 1, label: '65 歲以上' }
          ] },
        { key: 'q_horizon', label: '這筆錢預計多久不用', type: 'select', default: 4,
          options: [
            { value: 4, label: '10 年以上' },
            { value: 3, label: '5~10 年' },
            { value: 2, label: '3~5 年' },
            { value: 1, label: '3 年以內' }
          ] },
        { key: 'q_loss', label: '若投資短期下跌 20%，你會', type: 'select', default: 3,
          options: [
            { value: 4, label: '趁機加碼買進' },
            { value: 3, label: '抱牢不動等待' },
            { value: 2, label: '賣出一半降低風險' },
            { value: 1, label: '全部賣出避免再虧' }
          ] },
        { key: 'q_income', label: '你的收入穩定性', type: 'select', default: 3,
          options: [
            { value: 4, label: '非常穩定' },
            { value: 3, label: '大致穩定' },
            { value: 2, label: '較不穩定' }
          ] }
      ]
    },
    {
      id: 'fin_stop_loss',
      name: '停損點試算',
      cat: 'cat_fin_analysis',
      icon: 'alert',
      desc: '輸入買進價、持股數與可承受停損比例，計算停損價位與預估最大虧損金額。',
      keywords: ['停損', '停損點', '風險管理', '最大虧損', '出場'],
      fields: [
        { key: 'buyPrice', label: '買進價格', type: 'number', default: 50, unit: '元', min: 0.01, step: 0.1 },
        { key: 'shares', label: '持股數', type: 'number', default: 1000, unit: '股', min: 1, step: 100 },
        { key: 'pct', label: '可承受停損比例', type: 'number', default: 8, unit: '%', min: 1, max: 50, step: 0.5 }
      ]
    },
    {
      id: 'fin_take_profit',
      name: '獲利了結目標試算',
      cat: 'cat_fin_analysis',
      icon: 'star',
      desc: '輸入買進價、持股數與目標報酬率，計算目標價位與預估獲利金額，做為出場計畫參考。',
      keywords: ['獲利了結', '目標價', '停利', '報酬率', '出場'],
      fields: [
        { key: 'buyPrice', label: '買進價格', type: 'number', default: 50, unit: '元', min: 0.01, step: 0.1 },
        { key: 'shares', label: '持股數', type: 'number', default: 1000, unit: '股', min: 1, step: 100 },
        { key: 'pct', label: '目標報酬率', type: 'number', default: 20, unit: '%', min: 1, max: 200, step: 1 }
      ]
    },

    /* ============ 稅務試算 cat_fin_tax ============ */
    {
      id: 'fin_income_tax',
      name: '綜合所得稅試算',
      cat: 'cat_fin_tax',
      icon: 'scale',
      desc: '輸入綜合所得總額、扶養人數與扣除額，依現行級距簡化計算應納綜合所得稅額。',
      keywords: ['綜合所得稅', '所得稅', '級距', '免稅額', '扣除額', '報稅'],
      fields: [
        { key: 'gross', label: '全年綜合所得總額', type: 'number', default: 1200000, unit: '元', min: 0, step: 10000 },
        { key: 'people', label: '扶養人數（含本人）', type: 'number', default: 1, unit: '人', min: 1, max: 20 },
        { key: 'ded', label: '扣除額合計（標準或列舉）', type: 'number', default: 124000, unit: '元', min: 0, step: 1000 },
        { key: 'year', label: '試算年度', type: 'select', default: '2024',
          options: [
            { value: '2024', label: '2024 年度' },
            { value: '2025', label: '2025 年度' }
          ] }
      ]
    },
    {
      id: 'fin_payroll_tax',
      name: '薪資所得扣繳試算',
      cat: 'cat_fin_tax',
      icon: 'doc',
      desc: '以每月薪資按簡化扣繳率推估每月與全年薪資所得扣繳稅額，做為扣繳參考。',
      keywords: ['薪資所得', '扣繳', '薪資', '所得稅', '每月'],
      fields: [
        { key: 'monthly', label: '每月薪資', type: 'number', default: 60000, unit: '元', min: 0, step: 1000 },
        { key: 'rate', label: '薪資扣繳率（簡化）', type: 'number', default: 5, unit: '%', min: 0, max: 20, step: 0.5, hint: '實務上扣繳率依扶養親屬人數與所得級距而不同，此處為簡化模型' }
      ]
    },
    {
      id: 'fin_estate_tax',
      name: '遺產稅試算',
      cat: 'cat_fin_tax',
      icon: 'shield',
      desc: '輸入遺產總額、被繼合債務與扣除項目，扣除免稅額後依級距簡化計算遺產稅額。',
      keywords: ['遺產稅', '遺產', '免稅額', '級距', '繼承'],
      fields: [
        { key: 'estate', label: '遺產總額', type: 'number', default: 30000000, unit: '元', min: 0, step: 100000 },
        { key: 'debt', label: '被繼合人遺有債務', type: 'number', default: 1000000, unit: '元', min: 0, step: 100000 },
        { key: 'ded', label: '其他可扣除項目', type: 'number', default: 0, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 'fin_supplementary_premium',
      name: '二代健保補充保費試算',
      cat: 'cat_fin_tax',
      icon: 'umbrella',
      desc: '輸入單筆高額給付金額，依二代健保補充保費費率計算應扣補充保費與實領金額。',
      keywords: ['二代健保', '補充保費', '健保', '獎金', '費率'],
      fields: [
        { key: 'amount', label: '單筆給付金額', type: 'number', default: 50000, unit: '元', min: 0, step: 1000 },
        { key: 'rate', label: '補充保費費率', type: 'number', default: 2.11, unit: '%', min: 0, max: 10, step: 0.01, hint: '二代健保補充保費費率現行為 2.11%' }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);
