/* ============================================================
   config/tools-re-a.js — RE-A 代理產出（26 支不動產工具規格）
   涵蓋：房貸試算 9 + 購屋規劃 8 + 坪數建物 9
   注意：re_mortgage_equal、re_afford 已由框架實作，本檔不含
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    /* ---------- 房貸試算（cat_re_mortgage） ---------- */
    {
      id: 're_mortgage_principal',
      name: '房貸本金平均攤還試算',
      cat: 'cat_re_mortgage',
      icon: 'key',
      desc: '本金平均攤還：每月償還固定本金，利息隨本金遞減，首月月付最高、逐月下降。',
      keywords: ['房貸', '本金平均攤還', '月付金', '攤還', '利息遞減'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 're_mortgage_grace',
      name: '房貸寬限期試算',
      cat: 'cat_re_mortgage',
      icon: 'piggy',
      desc: '寬限期內只繳利息、月付較輕，寬限期滿後再按月攤還本金，評估前期現金壓力。',
      keywords: ['房貸', '寬限期', '只繳息', '月付', '青安'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'graceYears', label: '寬限期', type: 'number', default: 3, unit: '年', min: 0, max: 10 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 're_mortgage_compare',
      name: '房貸方案利率比較',
      cat: 'cat_re_mortgage',
      icon: 'scale',
      desc: '兩種利率方案的月付金與總繳利息比較，量化利率差異對長期還款的影響。',
      keywords: ['房貸', '利率比較', '方案比較', '總利息', '月付金'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rateA', label: '方案 A 年利率', type: 'number', default: 1.8, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'rateB', label: '方案 B 年利率', type: 'number', default: 2.5, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 're_mortgage_burden',
      name: '房貸月負擔比率試算',
      cat: 'cat_re_mortgage',
      icon: 'wallet',
      desc: '計算房貸月付與其他負債佔月收入的比例，檢視是否過度槓桿。',
      keywords: ['房貸', '負擔比率', '月收入', '負債比', '333'],
      fields: [
        { key: 'income', label: '月收入', type: 'number', default: 80000, unit: '元', min: 1, step: 5000 },
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'otherDebt', label: '其他每月負債', type: 'number', default: 10000, unit: '元', min: 0, step: 1000 }
      ]
    },
    {
      id: 're_mortgage_early',
      name: '提前還款效益試算',
      cat: 'cat_re_mortgage',
      icon: 'refresh',
      desc: '評估某日提前償還一筆本金的省息效果，可選擇縮短年限或降低月付。',
      keywords: ['提前還款', '房貸', '節省利息', '縮短年限', '還本'],
      fields: [
        { key: 'loan', label: '原始貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'afterYear', label: '貸款幾年後提前還款', type: 'number', default: 5, unit: '年', min: 1, max: 35 },
        { key: 'earlyAmount', label: '提前還款金額', type: 'number', default: 500000, unit: '元', min: 1, step: 10000 },
        { key: 'strategy', label: '提前還款後方式', type: 'select', default: 'shorten',
          options: [
            { value: 'shorten', label: '縮短年限（月付不變）' },
            { value: 'reduce', label: '降低月付（年限不變）' }
          ] }
      ]
    },
    {
      id: 're_mortgage_refinance',
      name: '轉貸省息效益試算',
      cat: 'cat_re_mortgage',
      icon: 'swap',
      desc: '比較新舊貸款方案的月付與總利息，並考量轉貸成本計算損益平衡點。',
      keywords: ['轉貸', '房貸', '省息', '轉增貸', '損益平衡'],
      fields: [
        { key: 'remainBalance', label: '目前貸款餘額', type: 'number', default: 8000000, unit: '元', min: 1, step: 100000 },
        { key: 'oldRate', label: '舊貸年利率', type: 'number', default: 2.6, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'oldYears', label: '舊貸剩餘年限', type: 'number', default: 25, unit: '年', min: 1, max: 40 },
        { key: 'newRate', label: '新貸年利率', type: 'number', default: 1.8, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'newYears', label: '新貸還款年限', type: 'number', default: 25, unit: '年', min: 1, max: 40 },
        { key: 'refiCost', label: '轉貸相關成本', type: 'number', default: 20000, unit: '元', min: 0, step: 1000 }
      ]
    },
    {
      id: 're_mortgage_balloon',
      name: '到期還本型房貸試算',
      cat: 'cat_re_mortgage',
      icon: 'box',
      desc: '期間只繳利息、到期一次償還約定本金（氣球款），適用資金週期規畫。',
      keywords: ['氣球貸款', '到期還本', '只繳息', '房貸', '圓滿貸'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 10, unit: '年', min: 1, max: 30 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'balloonRatio', label: '到期償還本金比例', type: 'number', default: 15, unit: '%', min: 0, max: 100, step: 1 }
      ]
    },
    {
      id: 're_mortgage_total',
      name: '房貸總成本分析',
      cat: 'cat_re_mortgage',
      icon: 'bank',
      desc: '將利息、開辦費與每年帳管費一併計入，檢視房貸的完整持有成本。',
      keywords: ['房貸成本', '開辦費', '帳管費', '總利息', '貸款成本'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'initFee', label: '開辦費/帳務費', type: 'number', default: 5000, unit: '元', min: 0, step: 500 },
        { key: 'yearFee', label: '每年帳管費', type: 'number', default: 600, unit: '元', min: 0, step: 100 }
      ]
    },
    {
      id: 're_interest_deduct',
      name: '房貸利息抵稅試算',
      cat: 'cat_re_mortgage',
      icon: 'gift',
      desc: '依購屋借款利息列舉扣除上限與適用稅率，估算綜合所得稅可節省的稅額。',
      keywords: ['購屋借款利息', '抵稅', '列舉扣除', '綜合所得稅', '自住'],
      fields: [
        { key: 'annualInterest', label: '每年繳息金額', type: 'number', default: 150000, unit: '元', min: 0, step: 1000 },
        { key: 'taxRate', label: '適用稅率', type: 'number', default: 12, unit: '%', min: 5, max: 40, step: 1, hint: '綜合所得稅邊際稅率，例如 12%' },
        { key: 'cap', label: '購屋借款利息扣除上限', type: 'number', default: 300000, unit: '元', min: 0, step: 10000 }
      ]
    },

    /* ---------- 購屋規劃（cat_re_purchase） ---------- */
    {
      id: 're_downpayment',
      name: '頭期款與自備款試算',
      cat: 'cat_re_purchase',
      icon: 'wallet',
      desc: '估算買屋所需的頭期款、規費與裝潢預算，抓出真正要準備的自備金。',
      keywords: ['頭期款', '自備款', '購屋', '簽約金', '裝潢'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'miscRatio', label: '規費雜費比例', type: 'number', default: 5, unit: '%', min: 0, max: 20, step: 0.5, hint: '契稅、代書、仲介等約占總價比例' },
        { key: 'renovation', label: '裝潢預算', type: 'number', default: 1000000, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 're_rent_vs_buy',
      name: '租屋 vs 購屋損益平衡',
      cat: 'cat_re_purchase',
      icon: 'scale',
      desc: '在房價與租金成長假設下，模擬租屋與購屋的累計成本，找出損益平衡年數。',
      keywords: ['租屋', '購屋', '損益平衡', '以租代購', '換算'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'rate', label: '房貸年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'loanYears', label: '房貸年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rent', label: '每月租金', type: 'number', default: 20000, unit: '元', min: 0, step: 1000 },
        { key: 'rentGrowth', label: '租金每年漲幅', type: 'number', default: 2, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'houseGrowth', label: '房價每年漲幅', type: 'number', default: 1.5, unit: '%', min: -10, max: 20, step: 0.1 },
        { key: 'holdMonthly', label: '每月持有成本', type: 'number', default: 6000, unit: '元', min: 0, step: 500, hint: '房屋稅、地價稅、管理費等分攤' }
      ]
    },
    {
      id: 're_buy_cost',
      name: '購屋總費用試算',
      cat: 'cat_re_purchase',
      icon: 'doc',
      desc: '加總頭期款、仲介費、規費與裝潢，一次看清買屋當下要掏出的全部費用。',
      keywords: ['購屋費用', '仲介費', '契稅', '代書', '自備款'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'agentRate', label: '仲介服務費率', type: 'number', default: 2, unit: '%', min: 0, max: 6, step: 0.1 },
        { key: 'otherFees', label: '規費與代書印花', type: 'number', default: 30000, unit: '元', min: 0, step: 5000 },
        { key: 'renovation', label: '裝潢預算', type: 'number', default: 800000, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 're_rent_yield',
      name: '租金投報率試算',
      cat: 'cat_re_purchase',
      icon: 'coins',
      desc: '以每月租金換算年化毛租金投報率與回本年限，快速評估物件收租潛力。',
      keywords: ['租金投報率', '以租養房', '回本年限', '購屋', '收租'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'rent', label: '每月租金', type: 'number', default: 15000, unit: '元', min: 0, step: 1000 }
      ]
    },
    {
      id: 're_net_yield',
      name: '淨租金收益率試算',
      cat: 'cat_re_purchase',
      icon: 'chart2',
      desc: '扣除管理費、空房率、房屋稅與修繕支出後，計算真正到手的淨收益率。',
      keywords: ['淨投報率', '租金', '持有成本', '修繕', '稅費'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 },
        { key: 'rent', label: '每月租金', type: 'number', default: 15000, unit: '元', min: 0, step: 1000 },
        { key: 'mgmtRatio', label: '管理費與空房率', type: 'number', default: 10, unit: '%', min: 0, max: 40, step: 1 },
        { key: 'taxYear', label: '每年房屋稅地價稅', type: 'number', default: 30000, unit: '元', min: 0, step: 1000 },
        { key: 'repairYear', label: '每年修繕提列', type: 'number', default: 20000, unit: '元', min: 0, step: 1000 }
      ]
    },
    {
      id: 're_cap_rate',
      name: '資本化率試算',
      cat: 'cat_re_purchase',
      icon: 'trend',
      desc: '以淨營運收入除以不動產價值得到資本化率，並反推不同 cap rate 下的合理房價。',
      keywords: ['資本化率', 'cap rate', 'NOI', '不動產估值', '投資'],
      fields: [
        { key: 'annualRent', label: '年租金收入', type: 'number', default: 200000, unit: '元', min: 0, step: 5000 },
        { key: 'opex', label: '年營運費用', type: 'number', default: 30000, unit: '元', min: 0, step: 5000 },
        { key: 'value', label: '房屋現值', type: 'number', default: 10000000, unit: '元', min: 1, step: 100000 }
      ]
    },
    {
      id: 're_rent_budget',
      name: '租金負擔能力試算',
      cat: 'cat_re_purchase',
      icon: 'home',
      desc: '依月收入與可接受的租金占比，推算每月可負擔的房租上限與年度預算。',
      keywords: ['租金預算', '負擔能力', '月收入', '租房', '30%'],
      fields: [
        { key: 'income', label: '月收入', type: 'number', default: 60000, unit: '元', min: 1, step: 5000 },
        { key: 'ratio', label: '租金占收入上限', type: 'number', default: 30, unit: '%', min: 10, max: 60, step: 1 }
      ]
    },
    {
      id: 're_rent_compare',
      name: '租金 vs 房貸月付比較',
      cat: 'cat_re_purchase',
      icon: 'chart',
      desc: '把預算買屋的房貸月付與現在繳的租金直接對照，看每月現金差距多大。',
      keywords: ['租金', '房貸月付', '購屋比較', '以租養房', '月付'],
      fields: [
        { key: 'price', label: '目標房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'downRatio', label: '頭期款比例', type: 'number', default: 30, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'years', label: '房貸年限', type: 'number', default: 30, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '房貸年利率', type: 'number', default: 2.2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'rent', label: '目前每月租金', type: 'number', default: 20000, unit: '元', min: 0, step: 1000 }
      ]
    },

    /* ---------- 坪數建物（cat_re_area） ---------- */
    {
      id: 're_ping_convert',
      name: '房屋坪數換算',
      cat: 'cat_re_area',
      icon: 'ruler',
      desc: '在坪、平方公尺與平方英尺之間換算，快速對應各國房屋面積表述。',
      keywords: ['坪數', '平方公尺', '平方英尺', '換算', '面積'],
      fields: [
        { key: 'ping', label: '坪數', type: 'number', default: 25, unit: '坪', min: 0, step: 0.5 }
      ]
    },
    {
      id: 're_common_ratio',
      name: '公設比試算',
      cat: 'cat_re_area',
      icon: 'grid',
      desc: '從登記坪數與公設比推算實際室內使用坪數，檢視公設是否偏高。',
      keywords: ['公設比', '坪數', '使用坪數', '登記坪數', '建物'],
      fields: [
        { key: 'regPing', label: '登記總坪數', type: 'number', default: 35, unit: '坪', min: 0, step: 0.5 },
        { key: 'commonRatio', label: '公設比', type: 'number', default: 35, unit: '%', min: 0, max: 80, step: 1 }
      ]
    },
    {
      id: 're_balcony',
      name: '陽台與附屬建物登記試算',
      cat: 'cat_re_area',
      icon: 'home',
      desc: '由主建物、陽台等附屬建物與公設比，回推建物登記的總坪數組成。',
      keywords: ['陽台', '附屬建物', '公設', '登記坪數', '主建物'],
      fields: [
        { key: 'mainPing', label: '主建物坪數', type: 'number', default: 20, unit: '坪', min: 0, step: 0.5 },
        { key: 'balcPing', label: '陽台等附屬建物坪數', type: 'number', default: 3, unit: '坪', min: 0, step: 0.5 },
        { key: 'commonRatio', label: '公設比', type: 'number', default: 35, unit: '%', min: 0, max: 80, step: 1 }
      ]
    },
    {
      id: 're_presale',
      name: '預售屋付款試算',
      cat: 'cat_re_area',
      icon: 'building',
      desc: '依訂金、簽約、工程期款與交屋款比例，拆解預售屋各階段應付金額。',
      keywords: ['預售屋', '訂金', '簽約金', '工程期款', '交屋款'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'depositPct', label: '訂金比例', type: 'number', default: 2, unit: '%', min: 0, max: 100, step: 0.5 },
        { key: 'contractPct', label: '簽約金比例', type: 'number', default: 5, unit: '%', min: 0, max: 100, step: 0.5 },
        { key: 'constructPct', label: '工程期款比例', type: 'number', default: 75, unit: '%', min: 0, max: 100, step: 0.5 },
        { key: 'finalPct', label: '交屋款比例', type: 'number', default: 18, unit: '%', min: 0, max: 100, step: 0.5 }
      ]
    },
    {
      id: 're_construction_pay',
      name: '工程期款試算',
      cat: 'cat_re_area',
      icon: 'lot',
      desc: '把預售屋工程期款總額按月數分攤，估算施工期間每月要準備的工程款。',
      keywords: ['工程期款', '預售屋', '每月付款', '營建', '分期'],
      fields: [
        { key: 'price', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'constructPct', label: '工程期款比例', type: 'number', default: 75, unit: '%', min: 0, max: 100, step: 0.5 },
        { key: 'months', label: '施工月數', type: 'number', default: 24, unit: '月', min: 1, max: 120 }
      ]
    },
    {
      id: 're_exchange',
      name: '換屋資金試算',
      cat: 'cat_re_area',
      icon: 'swap',
      desc: '賣掉舊屋扣除貸款與費用後，實拿的錢是否足以支應新屋自備與規費。',
      keywords: ['換屋', '賣舊買新', '資金缺口', '頭期款', '以房換房'],
      fields: [
        { key: 'oldPrice', label: '舊屋售價', type: 'number', default: 12000000, unit: '元', min: 0, step: 100000 },
        { key: 'oldLoan', label: '舊屋貸款餘額', type: 'number', default: 3000000, unit: '元', min: 0, step: 100000 },
        { key: 'sellFee', label: '出售仲介與稅費', type: 'number', default: 300000, unit: '元', min: 0, step: 10000 },
        { key: 'newPrice', label: '新屋總價', type: 'number', default: 20000000, unit: '元', min: 1, step: 100000 },
        { key: 'newDownRatio', label: '新屋頭期款比例', type: 'number', default: 30, unit: '%', min: 0, max: 90, step: 1 },
        { key: 'newFees', label: '新屋規費與裝潢', type: 'number', default: 500000, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 're_renovation_budget',
      name: '裝潢預算試算',
      cat: 'cat_re_area',
      icon: 'paint',
      desc: '依坪數與裝潢等級估算總預算，並拆分為衛浴、廚具、木作等項目分配。',
      keywords: ['裝潢', '預算', '坪數', '衛浴', '木作'],
      fields: [
        { key: 'ping', label: '室內坪數', type: 'number', default: 25, unit: '坪', min: 0, step: 0.5 },
        { key: 'level', label: '裝潢等級', type: 'select', default: 'mid',
          options: [
            { value: 'basic', label: '基本整理（每坪約 8 萬）' },
            { value: 'mid', label: '中等品味（每坪約 15 萬）' },
            { value: 'luxury', label: '高級規格（每坪約 25 萬）' }
          ] }
      ]
    },
    {
      id: 're_material_estimate',
      name: '建材估價試算',
      cat: 'cat_re_area',
      icon: 'box',
      desc: '以地坪與牆面油漆面積乘以單價，快速粗估裝修主要材料與工程款。',
      keywords: ['建材', '估價', '地板', '油漆', '工程'],
      fields: [
        { key: 'floorPing', label: '地坪坪數', type: 'number', default: 25, unit: '坪', min: 0, step: 0.5 },
        { key: 'floorPrice', label: '地板每坪單價', type: 'number', default: 12000, unit: '元/坪', min: 0, step: 1000 },
        { key: 'paintM2', label: '油漆牆面積', type: 'number', default: 100, unit: '平方公尺', min: 0, step: 5 },
        { key: 'paintPrice', label: '油漆每平方公尺單價', type: 'number', default: 300, unit: '元/平方公尺', min: 0, step: 50 }
      ]
    },
    {
      id: 're_price_per_ping',
      name: '每坪單價試算',
      cat: 'cat_re_area',
      icon: 'percent',
      desc: '從房屋總價與坪數換算每坪單價，並換算為每平方公尺單價方便比較。',
      keywords: ['每坪單價', '單價', '總價', '坪數', '換算'],
      fields: [
        { key: 'totalPrice', label: '房屋總價', type: 'number', default: 15000000, unit: '元', min: 1, step: 100000 },
        { key: 'ping', label: '登記坪數', type: 'number', default: 25, unit: '坪', min: 0.01, step: 0.5 }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);
