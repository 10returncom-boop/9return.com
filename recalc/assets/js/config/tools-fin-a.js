/* ============================================================
   config/tools-fin-a.js — 財務管理工具切片（FIN-A，25 支）
   分類：存款儲蓄 7＋預算記帳 3＋貸款負債 6＋保險規劃 4＋退休規劃 5
   注意：fin_compound 複利試算已由種子實作，本檔不重複
   ============================================================ */
(function (g) {
  'use strict';

  var tools = [
    /* ============ 存款儲蓄 cat_fin_saving ============ */
    {
      id: 'fin_simple_interest',
      name: '單利試算',
      cat: 'cat_fin_saving',
      icon: 'coins',
      desc: '輸入本金、年利率與存放期間，計算單利利息與本利和，並以折線圖呈現歷年本利和成長。',
      keywords: ['單利', '利息', '本利和', '本金', '存款'],
      fields: [
        { key: 'principal', label: '本金', type: 'number', default: 100000, unit: '元', min: 1, step: 10000 },
        { key: 'rate', label: '年利率', type: 'number', default: 2, unit: '%', min: 0, max: 20, step: 0.01 },
        { key: 'years', label: '存放期間', type: 'number', default: 3, unit: '年', min: 1, max: 30 }
      ]
    },
    {
      id: 'fin_regular_saving',
      name: '定期定額試算',
      cat: 'cat_fin_saving',
      icon: 'piggy',
      desc: '每月固定投入一筆金額，在固定年報酬率下計算期末累積金額，並區分投入本金與投資報酬。',
      keywords: ['定期定額', '定投', '累積', '年金', '存錢'],
      fields: [
        { key: 'monthly', label: '每月投入金額', type: 'number', default: 10000, unit: '元', min: 1, step: 1000 },
        { key: 'rate', label: '年報酬率', type: 'number', default: 5, unit: '%', min: 0, max: 30, step: 0.1 },
        { key: 'years', label: '投入年限', type: 'number', default: 10, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 'fin_saving_goal',
      name: '儲蓄目標試算',
      cat: 'cat_fin_saving',
      icon: 'flag',
      desc: '設定預定目標金額與達成年限，反推每月需要存多少錢，並模擬餘額成長路徑。',
      keywords: ['儲蓄目標', '目標金額', '每月存多少', '存錢', '達成'],
      fields: [
        { key: 'goal', label: '目標金額', type: 'number', default: 1000000, unit: '元', min: 1, step: 100000 },
        { key: 'rate', label: '年報酬率', type: 'number', default: 3, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'years', label: '達成年限', type: 'number', default: 5, unit: '年', min: 1, max: 40 }
      ]
    },
    {
      id: 'fin_emergency_fund',
      name: '緊急備用金試算',
      cat: 'cat_fin_saving',
      icon: 'shield',
      desc: '依每月必要支出與建議月數，估算應準備的緊急備用金，以及每月固定提存多久能存滿。',
      keywords: ['緊急備用金', '緊急預備金', '安全現金', '失業', '預備'],
      fields: [
        { key: 'monthlyExpense', label: '每月必要支出', type: 'number', default: 30000, unit: '元', min: 1, step: 1000 },
        { key: 'months', label: '建議預備月數', type: 'number', default: 6, unit: '個月', min: 1, max: 24 },
        { key: 'monthlySaving', label: '每月可提存金額', type: 'number', default: 10000, unit: '元', min: 1, step: 1000 }
      ]
    },
    {
      id: 'fin_deposit',
      name: '定存試算',
      cat: 'cat_fin_saving',
      icon: 'bank',
      desc: '支援整存整付、零存整付、存本取息三種銀行定存模式，分別計算利息與到期金額。',
      keywords: ['定存', '整存整付', '零存整付', '存本取息', '銀行'],
      fields: [
        { key: 'mode', label: '定存模式', type: 'select', default: 'lump',
          options: [
            { value: 'lump', label: '整存整付' },
            { value: 'zero', label: '零存整付' },
            { value: 'interest', label: '存本取息' }
          ] },
        { key: 'amount', label: '金額（整存整付為本金／零存整付為每月存入）', type: 'number', default: 1000000, unit: '元', min: 1, step: 10000 },
        { key: 'rate', label: '年利率', type: 'number', default: 1.5, unit: '%', min: 0, max: 10, step: 0.01 },
        { key: 'years', label: '存續期間', type: 'number', default: 1, unit: '年', min: 1, max: 10 }
      ]
    },
    {
      id: 'fin_inflation',
      name: '通膨與購買力試算',
      cat: 'cat_fin_saving',
      icon: 'trend',
      desc: '在固定通膨率下，估算未來物價水準與現在一筆錢經過多年後的實質購買力縮水。',
      keywords: ['通膨', '購買力', '物價', '貶值', '貨幣'],
      fields: [
        { key: 'amount', label: '目前金額或每月生活費', type: 'number', default: 1000000, unit: '元', min: 1, step: 10000 },
        { key: 'inflation', label: '通膨率', type: 'number', default: 2, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'years', label: '經過年數', type: 'number', default: 20, unit: '年', min: 1, max: 50 }
      ]
    },
    {
      id: 'fin_compound_vs_simple',
      name: '複利 vs 單利比較',
      cat: 'cat_fin_saving',
      icon: 'chart',
      desc: '同一筆本金在相同報酬率下，並排比較複利與單利的期末金額差距與成長曲線。',
      keywords: ['複利', '單利', '比較', '利滾利', '成長'],
      fields: [
        { key: 'principal', label: '本金', type: 'number', default: 100000, unit: '元', min: 1, step: 10000 },
        { key: 'rate', label: '年報酬率', type: 'number', default: 6, unit: '%', min: 0, max: 30, step: 0.1 },
        { key: 'years', label: '投資年限', type: 'number', default: 20, unit: '年', min: 1, max: 40 }
      ]
    },

    /* ============ 預算記帳 cat_fin_budget ============ */
    {
      id: 'fin_budget',
      name: '預算規劃試算',
      cat: 'cat_fin_budget',
      icon: 'wallet',
      desc: '依月收入與各類支出項目，計算每月結餘與各項目占比，以圓餅圖檢視預算分配。',
      keywords: ['預算', '記帳', '結餘', '收支', '分配'],
      fields: [
        { key: 'income', label: '每月收入', type: 'number', default: 50000, unit: '元', min: 1, step: 1000 },
        { key: 'fixed', label: '固定支出（房貸房租／保險／車貸）', type: 'number', default: 20000, unit: '元', min: 0, step: 1000 },
        { key: 'living', label: '生活費（餐飲／交通／日用品）', type: 'number', default: 15000, unit: '元', min: 0, step: 1000 },
        { key: 'fun', label: '休閒娛樂', type: 'number', default: 5000, unit: '元', min: 0, step: 1000 }
      ]
    },
    {
      id: 'fin_accounting',
      name: '記帳分配法試算（50/30/20）',
      cat: 'cat_fin_budget',
      icon: 'chart2',
      desc: '依理財常用的 50／30／20 法則，把月收入分成必要支出、想要花費與儲蓄投資。',
      keywords: ['50/30/20', '記帳法則', '预算分配', '必要支出', '儲蓄'],
      fields: [
        { key: 'income', label: '每月收入', type: 'number', default: 50000, unit: '元', min: 1, step: 1000 },
        { key: 'needPct', label: '必要支出比例', type: 'number', default: 50, unit: '%', min: 0, max: 100 },
        { key: 'wantPct', label: '想要花費比例', type: 'number', default: 30, unit: '%', min: 0, max: 100 },
        { key: 'savePct', label: '儲蓄投資比例', type: 'number', default: 20, unit: '%', min: 0, max: 100 }
      ]
    },
    {
      id: 'fin_expense_ratio',
      name: '支出比率分析',
      cat: 'cat_fin_budget',
      icon: 'calc',
      desc: '計算房貸房租占收入比、總支出率與儲蓄率，檢視是否落在健康的理財區間。',
      keywords: ['支出比率', '負擔比', '儲蓄率', '房貸占比', '財務健康'],
      fields: [
        { key: 'income', label: '每月收入', type: 'number', default: 50000, unit: '元', min: 1, step: 1000 },
        { key: 'housing', label: '每月房貸或房租', type: 'number', default: 15000, unit: '元', min: 0, step: 1000 },
        { key: 'living', label: '每月生活費', type: 'number', default: 18000, unit: '元', min: 0, step: 1000 },
        { key: 'debtPay', label: '其他每月負債繳款', type: 'number', default: 3000, unit: '元', min: 0, step: 1000 }
      ]
    },

    /* ============ 貸款負債 cat_fin_debt ============ */
    {
      id: 'fin_car_loan',
      name: '車貸試算',
      cat: 'cat_fin_debt',
      icon: 'car',
      desc: '輸入車貸金額、年限與利率，計算每月月付金額、總繳利息，並附攤還明細。',
      keywords: ['車貸', '汽車貸款', '月付', '利息', '攤還'],
      fields: [
        { key: 'loan', label: '車貸金額', type: 'number', default: 800000, unit: '元', min: 1, step: 10000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 5, unit: '年', min: 1, max: 10 },
        { key: 'rate', label: '年利率', type: 'number', default: 3.5, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 'fin_personal_loan',
      name: '信用貸款試算',
      cat: 'cat_fin_debt',
      icon: 'cash',
      desc: '計算信用貸款的每月應攤還金額、總利息成本與歷年本金利息結構。',
      keywords: ['信用貸款', '信貸', '小額貸款', '月付', '利息'],
      fields: [
        { key: 'loan', label: '貸款金額', type: 'number', default: 300000, unit: '元', min: 1, step: 10000 },
        { key: 'years', label: '貸款年限', type: 'number', default: 3, unit: '年', min: 1, max: 7 },
        { key: 'rate', label: '年利率', type: 'number', default: 6, unit: '%', min: 0, max: 20, step: 0.01 }
      ]
    },
    {
      id: 'fin_student_loan',
      name: '學貸試算',
      cat: 'cat_fin_debt',
      icon: 'book',
      desc: '依學貸金額、年限與優惠利率，估算畢業後每月應還金額與總利息。',
      keywords: ['學貸', '助學貸款', '教育貸款', '還款', '利息'],
      fields: [
        { key: 'loan', label: '學貸金額', type: 'number', default: 500000, unit: '元', min: 1, step: 10000 },
        { key: 'years', label: '還款年限', type: 'number', default: 10, unit: '年', min: 1, max: 20 },
        { key: 'rate', label: '年利率', type: 'number', default: 1.5, unit: '%', min: 0, max: 10, step: 0.01 }
      ]
    },
    {
      id: 'fin_credit_card',
      name: '卡債循環利息試算',
      cat: 'cat_fin_debt',
      icon: 'card',
      desc: '輸入卡債餘額與循環利率，估算每月循環利息，並推估固定每月還多久能還清。',
      keywords: ['卡債', '循環利息', '信用卡', '遲繳', '還清'],
      fields: [
        { key: 'balance', label: '卡債餘額', type: 'number', default: 50000, unit: '元', min: 1, step: 1000 },
        { key: 'rate', label: '循環年利率', type: 'number', default: 15, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'pay', label: '每月擬固定還款', type: 'number', default: 5000, unit: '元', min: 1, step: 500 }
      ]
    },
    {
      id: 'fin_installment',
      name: '分期付款試算',
      cat: 'cat_fin_debt',
      icon: 'swap',
      desc: '計算分期總金額、手續費成本與每期應繳，並比較一次付清與分期的總負擔差異。',
      keywords: ['分期', '分期付款', '手續費', '零利率分期', '每期'],
      fields: [
        { key: 'amount', label: '商品原價', type: 'number', default: 30000, unit: '元', min: 1, step: 1000 },
        { key: 'periods', label: '分期期數', type: 'number', default: 12, unit: '期', min: 1, max: 60 },
        { key: 'feePct', label: '分期手續費總費率', type: 'number', default: 3, unit: '%', min: 0, max: 20, step: 0.1 }
      ]
    },
    {
      id: 'fin_debt_ratio',
      name: '負債比率試算',
      cat: 'cat_fin_debt',
      icon: 'scale',
      desc: '計算每月負債繳款占收入比（DTI）與總資產負債比，評估整體財務負債健康度。',
      keywords: ['負債比率', 'DTI', '負債比', '財務健康', '淨資產'],
      fields: [
        { key: 'income', label: '每月收入', type: 'number', default: 50000, unit: '元', min: 1, step: 1000 },
        { key: 'monthlyDebt', label: '每月負債繳款合計', type: 'number', default: 18000, unit: '元', min: 0, step: 1000 },
        { key: 'assets', label: '總資產', type: 'number', default: 3000000, unit: '元', min: 0, step: 100000 },
        { key: 'liabilities', label: '總負債', type: 'number', default: 2000000, unit: '元', min: 0, step: 100000 }
      ]
    },

    /* ============ 保險規劃 cat_fin_ins ============ */
    {
      id: 'fin_ins_term',
      name: '定期壽險試算',
      cat: 'cat_fin_ins',
      icon: 'umbrella',
      desc: '依年齡與保額估算定期壽險的年繳、月繳保費區間，作為保障規劃的初步參考。',
      keywords: ['定期壽險', '壽險', '保障', '保費', '保額'],
      fields: [
        { key: 'age', label: '投保年齡', type: 'number', default: 30, unit: '歲', min: 18, max: 80 },
        { key: 'sumAssured', label: '身故保額', type: 'number', default: 5000000, unit: '元', min: 100000, step: 100000 },
        { key: 'years', label: '保障年期', type: 'number', default: 20, unit: '年', min: 5, max: 30 }
      ]
    },
    {
      id: 'fin_ins_whole',
      name: '終身壽險試算',
      cat: 'cat_fin_ins',
      icon: 'shield',
      desc: '以簡化模型估算終身壽險的年繳保費與累計已繳保費，比較與定期壽險的成本概念。',
      keywords: ['終身壽險', '壽險', '儲蓄型壽險', '保費', '繳費'],
      fields: [
        { key: 'age', label: '投保年齡', type: 'number', default: 30, unit: '歲', min: 18, max: 80 },
        { key: 'sumAssured', label: '身故保額', type: 'number', default: 2000000, unit: '元', min: 100000, step: 100000 },
        { key: 'payYears', label: '繳費年期', type: 'number', default: 20, unit: '年', min: 5, max: 30 }
      ]
    },
    {
      id: 'fin_ins_medical',
      name: '醫療險保障試算',
      cat: 'cat_fin_ins',
      icon: 'heart',
      desc: '依個人醫療支出估算建議的實支實付醫療險與重大傷病保障保額，作為投保參考。',
      keywords: ['醫療險', '實支實付', '重大傷病', '保額', '保障'],
      fields: [
        { key: 'monthlyMedical', label: '每月預估醫療支出', type: 'number', default: 3000, unit: '元', min: 0, step: 500 },
        { key: 'income', label: '年收入', type: 'number', default: 720000, unit: '元', min: 0, step: 10000 }
      ]
    },
    {
      id: 'fin_ins_saving',
      name: '儲蓄險試算',
      cat: 'cat_fin_ins',
      icon: 'gift',
      desc: '輸入月繳保費、繳費年期與預定利率，估算儲蓄險滿期金、總繳保費與內部累積報酬。',
      keywords: ['儲蓄險', '滿期金', '生存保險金', '保費', '報酬'],
      fields: [
        { key: 'monthlyPremium', label: '每月繳保費', type: 'number', default: 10000, unit: '元', min: 1, step: 1000 },
        { key: 'years', label: '繳費／儲存年期', type: 'number', default: 6, unit: '年', min: 1, max: 20 },
        { key: 'rate', label: '預定利率', type: 'number', default: 1.5, unit: '%', min: 0, max: 6, step: 0.05 }
      ]
    },

    /* ============ 退休規劃 cat_fin_retire ============ */
    {
      id: 'fin_retire',
      name: '退休規劃試算',
      cat: 'cat_fin_retire',
      icon: 'flag',
      desc: '估算退休時需要準備的退休金本金、現有資產成長後價值，以及每月需提撥的金額。',
      keywords: ['退休', '退休金', '退休規劃', '養老', '提撥'],
      fields: [
        { key: 'currentAge', label: '目前年齡', type: 'number', default: 30, unit: '歲', min: 20, max: 70 },
        { key: 'retireAge', label: '預計退休年齡', type: 'number', default: 65, unit: '歲', min: 40, max: 80 },
        { key: 'annualExpense', label: '退休後年支出（今日幣值）', type: 'number', default: 1200000, unit: '元', min: 1, step: 100000 },
        { key: 'inflation', label: '通膨率', type: 'number', default: 2, unit: '%', min: 0, max: 10, step: 0.1 },
        { key: 'investReturn', label: '投資年報酬率', type: 'number', default: 5, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'currentSaving', label: '現有退休準備', type: 'number', default: 500000, unit: '元', min: 0, step: 100000 }
      ]
    },
    {
      id: 'fin_pension',
      name: '年金現值試算',
      cat: 'cat_fin_retire',
      icon: 'wallet',
      desc: '把未來一連串每年領取的年金，依折現率換算成今天的總現值，並折合每月金額。',
      keywords: ['年金', '現值', '折現', '退休給付', '保險年金'],
      fields: [
        { key: 'annualPension', label: '每年年金給付', type: 'number', default: 600000, unit: '元', min: 1, step: 10000 },
        { key: 'years', label: '領取年數', type: 'number', default: 20, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '折現率', type: 'number', default: 2, unit: '%', min: 0, max: 15, step: 0.1 }
      ]
    },
    {
      id: 'fin_labor_pension',
      name: '勞退新制試算',
      cat: 'cat_fin_retire',
      icon: 'bank',
      desc: '以勞退新制雇主每月提繳薪資 6％ 為基礎，估算退休時的勞退金累積與運用收益。',
      keywords: ['勞退', '勞工退休金', '勞保', '6％', '老年給付'],
      fields: [
        { key: 'monthlySalary', label: '月投保薪資', type: 'number', default: 45000, unit: '元', min: 1, step: 1000 },
        { key: 'years', label: '提繳年資', type: 'number', default: 35, unit: '年', min: 1, max: 40 },
        { key: 'rate', label: '帳戶運用年報酬率', type: 'number', default: 2, unit: '%', min: 0, max: 10, step: 0.1 }
      ]
    },
    {
      id: 'fin_fire',
      name: '財務自由數字試算（FIRE）',
      cat: 'cat_fin_retire',
      icon: 'fire',
      desc: '依年度支出與安全提領率（常見 4％），算出達到財務自由所需的目標資產水位。',
      keywords: ['FIRE', '財務自由', '4%法則', '被動收入', '提早退休'],
      fields: [
        { key: 'annualExpense', label: '年度總支出', type: 'number', default: 1200000, unit: '元', min: 1, step: 100000 },
        { key: 'withdrawRate', label: '安全提領率', type: 'number', default: 4, unit: '%', min: 1, max: 10, step: 0.5 }
      ]
    },
    {
      id: 'fin_passive_income',
      name: '被動收入試算',
      cat: 'cat_fin_retire',
      icon: 'trend',
      desc: '依可產生收益的資產與預期殖利率，估算每年與每月被動收入，並檢視能否覆蓋生活支出。',
      keywords: ['被動收入', '殖利率', '股息', '房租', '現金流'],
      fields: [
        { key: 'assets', label: '可收益資產', type: 'number', default: 10000000, unit: '元', min: 0, step: 100000 },
        { key: 'yield', label: '預期年殖利率', type: 'number', default: 4, unit: '%', min: 0, max: 20, step: 0.1 },
        { key: 'annualExpense', label: '年度生活支出', type: 'number', default: 1200000, unit: '元', min: 0, step: 100000 }
      ]
    }
  ];

  g.RECalcConfig.push.apply(g.RECalcConfig, tools);
})(typeof window !== 'undefined' ? window : globalThis);
