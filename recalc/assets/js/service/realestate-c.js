/* ============================================================
   service/realestate-c.js — RE-C 代理產出（16 支引擎）
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

  var M = g.RECalcMath;
  var F = g.RECalcFormat;

  /* 稅務類通用免責聲明 */
  var TAX_DISCLAIMER = '以上採簡化模型試算，實際金額依稅籍、年度與主管機關認定為準。';

  /* ============================================================
     1. 房屋稅試算
     ============================================================ */
  g.RECalcEngine.register('re_house_tax', function (inputs) {
    var houseValue = inputs.houseValue;
    var ratePct = inputs.rate;
    if (!(houseValue >= 0)) throw new Error('房屋現值不可為負數。');
    if (!(ratePct > 0)) throw new Error('稅率必須大於 0。');

    var rate = ratePct / 100;
    var tax = houseValue * rate;
    var monthly = tax / 12;

    /* 不同用途稅額比較（以同一房屋現值） */
    var types = [
      { label: '自住住家用', r: 1.2 },
      { label: '非自住住家用', r: 1.5 },
      { label: '非住家非營業', r: 2.0 },
      { label: '營業用', r: 3.0 }
    ];
    var cats = types.map(function (t) { return t.label; });
    var data = types.map(function (t) { return houseValue * t.r / 100; });

    return {
      cards: [
        { label: '每年應納房屋稅', value: tax, format: 'currency', emphasis: true, sub: '稅率 ' + ratePct.toFixed(2) + '%' },
        { label: '每月稅額分攤', value: monthly, format: 'currency' },
        { label: '房屋現值', value: houseValue, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '不同用途別之房屋稅額比較',
        unit: '元',
        scale: 10000,
        yName: '稅額（萬元）',
        categories: cats,
        series: [{ name: '年應納稅額', data: data, color: 'primary' }]
      },
      notes: [
        '房屋稅＝房屋現值 × 適用稅率；自住住家用稅率 1.2%、非自住住家用約 1.5%、營業用 3%。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     2. 地價稅試算
     ============================================================ */
  g.RECalcEngine.register('re_land_value_tax', function (inputs) {
    var unitPrice = inputs.unitPrice;
    var areaM2 = inputs.areaM2;
    var ratePct = inputs.rate;
    if (!(unitPrice > 0)) throw new Error('請輸入大於 0 的申報地價。');
    if (!(areaM2 > 0)) throw new Error('請輸入大於 0 的持有面積。');
    if (!(ratePct > 0)) throw new Error('稅率必須大於 0。');

    var landValue = unitPrice * areaM2;
    var rate = ratePct / 100;
    var tax = landValue * rate;
    var monthly = tax / 12;

    /* 一般 vs 自用 比較 */
    var generalTax = landValue * 0.01;
    var selfTax = landValue * 0.002;

    return {
      cards: [
        { label: '核定地價總額', value: landValue, format: 'currency', sub: unitPrice.toLocaleString('zh-TW') + ' 元/平方公尺 × ' + areaM2 + ' 平方公尺' },
        { label: '每年應納地價稅', value: tax, format: 'currency', emphasis: true, sub: '稅率 ' + ratePct.toFixed(2) + '%' },
        { label: '每月稅額分攤', value: monthly, format: 'currency' },
        { label: '自用住宅優惠稅額', value: selfTax, format: 'currency', sub: '較一般用地節省 ' + F.currency(generalTax - selfTax) }
      ],
      chart: {
        type: 'bar',
        title: '一般用地 vs 自用住宅稅額',
        unit: '元',
        scale: 10000,
        yName: '稅額（萬元）',
        categories: ['一般用地（1%）', '自用住宅（0.2%）'],
        series: [{ name: '年應納稅額', data: [generalTax, selfTax], color: 'teal' }]
      },
      notes: [
        '地價稅＝申報地價總額 × 適用稅率；一般用地基本稅率 10‰，自用住宅優惠稅率 2‰。',
        '實際地價稅採累進稅率，超過累進起點地價時會提高稅率，本試算未做累進級距換算。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     3. 契稅試算
     ============================================================ */
  g.RECalcEngine.register('re_deed_tax', function (inputs) {
    var houseValue = inputs.houseValue;
    var deedType = inputs.deedType;
    if (!(houseValue >= 0)) throw new Error('房屋現值不可為負數。');

    var rateMap = { buy: 6, gift: 6, mortgageRight: 4, division: 2, occupy: 6 };
    var nameMap = { buy: '買賣', gift: '贈與', mortgageRight: '典權', division: '分割', occupy: '占有' };
    var ratePct = rateMap[deedType] == null ? 6 : rateMap[deedType];
    var rate = ratePct / 100;
    var tax = houseValue * rate;

    /* 各移轉類別比較 */
    var keys = ['buy', 'gift', 'mortgageRight', 'division', 'occupy'];
    var cats = keys.map(function (k) { return nameMap[k] + '（' + rateMap[k] + '%）'; });
    var data = keys.map(function (k) { return houseValue * rateMap[k] / 100; });

    return {
      cards: [
        { label: '應納契稅', value: tax, format: 'currency', emphasis: true, sub: nameMap[deedType] + '移轉' },
        { label: '適用稅率', value: rate, format: 'percent' },
        { label: '房屋現值', value: houseValue, format: 'currency' },
        { label: '契稅占房屋現值比', value: tax / (houseValue || 1), format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '不同移轉類別契稅比較',
        unit: '元',
        scale: 10000,
        yName: '契稅額（萬元）',
        categories: cats,
        series: [{ name: '契稅額', data: data, color: 'plum' }]
      },
      notes: [
        '契稅＝房屋現值 × 移轉類別稅率；買賣、贈與、占有為 6%、典權 4%、分割 2%。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     4. 印花稅試算
     ============================================================ */
  g.RECalcEngine.register('re_stamp_duty', function (inputs) {
    var amount = inputs.amount;
    var dutyType = inputs.dutyType;
    var copies = inputs.copies;
    if (!(amount >= 0)) throw new Error('憑證金額不可為負數。');
    if (!(copies >= 1)) throw new Error('憑證份數至少 1 份。');

    var perTax, totalTax, rate;
    if (dutyType === 'contract') {
      perTax = 12;
      totalTax = perTax * copies;
      rate = 0;
    } else {
      rate = 0.004;
      perTax = amount * rate;
      totalTax = perTax * copies;
    }

    /* 兩類型比較 */
    var receiptTax = amount * 0.004 * copies;
    var contractTax = 12 * copies;

    return {
      cards: [
        { label: '應納印花稅', value: totalTax, format: 'currency', emphasis: true, sub: dutyType === 'receipt' ? '銀錢收據' : '不動產買賣契約' },
        { label: '單份稅額', value: perTax, format: 'currency' },
        { label: '憑證份數', value: copies, format: 'number' },
        { label: '憑證金額合計', value: amount * copies, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '銀錢收據 vs 不動產買賣契約稅額',
        unit: '元',
        categories: ['銀錢收據（0.4%）', '不動產買賣契約（12 元/件）'],
        series: [{ name: '應納印花稅', data: [receiptTax, contractTax], color: 'gold' }]
      },
      notes: [
        '銀錢收據按金額 4‰（0.4%）貼用；不動產買賣契約按件 12 元貼用。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     5. 仲介服務費試算
     ============================================================ */
  g.RECalcEngine.register('re_agent_fee', function (inputs) {
    var price = inputs.price;
    var buyerRatePct = inputs.buyerRate;
    var sellerRatePct = inputs.sellerRate;
    if (!(price > 0)) throw new Error('請輸入大於 0 的成交總價。');
    if (!(buyerRatePct >= 0) || !(sellerRatePct >= 0)) throw new Error('費率不可為負數。');

    var buyerRate = buyerRatePct / 100;
    var sellerRate = sellerRatePct / 100;
    var buyerFee = price * buyerRate;
    var sellerFee = price * sellerRate;
    var total = buyerFee + sellerFee;
    var totalRate = total / price;

    return {
      cards: [
        { label: '買方應付仲介費', value: buyerFee, format: 'currency', sub: '費率 ' + buyerRatePct.toFixed(1) + '%' },
        { label: '賣方應付仲介費', value: sellerFee, format: 'currency', sub: '費率 ' + sellerRatePct.toFixed(1) + '%' },
        { label: '仲介費合計', value: total, format: 'currency', emphasis: true, sub: '合計費率 ' + (totalRate * 100).toFixed(2) + '%' }
      ],
      chart: {
        type: 'donut',
        title: '仲介費負擔結構',
        unit: '元',
        series: [{
          name: '仲介費',
          data: [
            { name: '買方負擔', value: buyerFee },
            { name: '賣方負擔', value: sellerFee }
          ]
        }]
      },
      notes: [
        '買賣雙方仲介費合計上限約為成交價的 6%（內政部不動產仲介業定型化契約應記載事項）。',
        '實際費率依仲介公司議定為準，本試算不含代書費、稅費等其他交易成本。'
      ]
    };
  });

  /* ============================================================
     6. 代書費試算
     ============================================================ */
  g.RECalcEngine.register('re_notary_fee', function (inputs) {
    var price = inputs.price;
    var loanAmt = inputs.loanAmt;
    var serviceType = inputs.serviceType;
    if (!(price >= 0)) throw new Error('買賣價金不可為負數。');
    if (!(loanAmt >= 0)) throw new Error('貸款金額不可為負數。');

    /* 行情：過戶約 15,000、抵押權設定約 10,000（簡化） */
    var transferFee = 15000;
    var mortgageFee = 10000;
    var total;
    if (serviceType === 'transfer') total = transferFee;
    else if (serviceType === 'mortgage_only') total = mortgageFee;
    else total = transferFee + mortgageFee;

    var hasTransfer = (serviceType === 'transfer' || serviceType === 'transfer_mortgage');
    var hasMortgage = (serviceType === 'mortgage_only' || serviceType === 'transfer_mortgage');

    return {
      cards: [
        { label: '代書服務費', value: total, format: 'currency', emphasis: true, sub: '行情估算' },
        { label: '所有權過戶費', value: hasTransfer ? transferFee : 0, format: 'currency' },
        { label: '抵押權設定費', value: hasMortgage ? mortgageFee : 0, format: 'currency' },
        { label: '占成交價比例', value: total / (price || 1), format: 'percent' }
      ],
      chart: {
        type: 'stackedBar',
        title: '代書費用結構',
        unit: '元',
        categories: ['本案件'],
        series: [
          { name: '所有權過戶', data: [hasTransfer ? transferFee : 0], color: 'teal' },
          { name: '抵押權設定', data: [hasMortgage ? mortgageFee : 0], color: 'gold' }
        ]
      },
      notes: [
        '行情參考：所有權過戶約 12,000~18,000 元、抵押權設定約 8,000~12,000 元，實際依代書事務所議定。',
        '本試算為行情簡化估算，未含土地增值稅、契稅、印花稅等法定稅費。'
      ]
    };
  });

  /* ============================================================
     7. 房屋持有成本試算
     ============================================================ */
  g.RECalcEngine.register('re_holding_cost', function (inputs) {
    var houseValue = inputs.houseValue;
    var landValue = inputs.landValue;
    var mgmtFeeM = inputs.mgmtFeeMonthly;
    var repairM = inputs.repairMonthly;
    var insM = inputs.insuranceMonthly;
    if (!(houseValue >= 0) || !(landValue >= 0)) throw new Error('房屋與土地現值不可為負數。');

    /* 簡化：房屋稅 1.2%、地價稅 1% */
    var houseTaxY = houseValue * 0.012;
    var landTaxY = landValue * 0.01;
    var mgmtY = mgmtFeeM * 12;
    var repairY = repairM * 12;
    var insY = insM * 12;
    var totalY = houseTaxY + landTaxY + mgmtY + repairY + insY;
    var totalM = totalY / 12;

    var assetBase = houseValue + landValue;

    return {
      cards: [
        { label: '每年持有成本', value: totalY, format: 'currency', emphasis: true },
        { label: '每月持有成本', value: totalM, format: 'currency' },
        { label: '年持有成本占資產比', value: assetBase > 0 ? totalY / assetBase : 0, format: 'percent', sub: '占房屋＋土地現值' },
        { label: '房屋稅年繳', value: houseTaxY, format: 'currency' },
        { label: '地價稅年繳', value: landTaxY, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '年度持有成本結構',
        unit: '元',
        series: [{
          name: '持有成本',
          data: [
            { name: '房屋稅', value: houseTaxY },
            { name: '地價稅', value: landTaxY },
            { name: '管理費', value: mgmtY },
            { name: '修繕提列', value: repairY },
            { name: '保險費', value: insY }
          ]
        }]
      },
      notes: [
        '房屋稅以住家用 1.2%、地價稅以一般用地 1% 簡化估算，未採累進級距。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     8. 土地增值稅試算
     ============================================================ */
  g.RECalcEngine.register('re_land_appreciation', function (inputs) {
    var prevValue = inputs.prevValue;
    var currValue = inputs.currValue;
    var priceIndex = inputs.priceIndex;
    var useType = inputs.useType;
    if (!(prevValue >= 0) || !(currValue >= 0)) throw new Error('前次與本次現值不可為負數。');
    if (!(priceIndex > 0)) throw new Error('物價指數必須大於 0。');

    var adjustedPrev = prevValue * (priceIndex / 100);
    var appreciation = currValue - adjustedPrev;
    if (appreciation < 0) appreciation = 0;

    var tax, effRate, noteLines;
    if (useType === 'self') {
      tax = appreciation * 0.10;
      effRate = appreciation > 0 ? tax / currValue : 0;
      noteLines = ['自用住宅優惠稅率 10%（需符合自用住宅用地要件）。'];
    } else {
      /* 累進：漲價總數額 ≤ 1 倍原地價 20%；1~2 倍部分 30%；超過 2 倍部分 40% */
      var base = adjustedPrev > 0 ? adjustedPrev : 1;
      var t1 = Math.min(appreciation, base) * 0.20;
      var over1 = Math.max(0, appreciation - base);
      var t2 = Math.min(over1, base) * 0.30;
      var over2 = Math.max(0, appreciation - base * 2);
      var t3 = over2 * 0.40;
      tax = t1 + t2 + t3;
      effRate = currValue > 0 ? tax / currValue : 0;
      noteLines = [
        '累進級距：漲價總數額在原地價 1 倍以內課 20%、1~2 倍部分課 30%、超過 2 倍部分課 40%。'
      ];
    }

    return {
      cards: [
        { label: '物價指數調整後前次現值', value: adjustedPrev, format: 'currency', sub: '前次現值 × ' + priceIndex + '/100' },
        { label: '土地漲價總數額', value: appreciation, format: 'currency' },
        { label: '應納土地增值稅', value: tax, format: 'currency', emphasis: true },
        { label: '有效稅率', value: effRate, format: 'percent' }
      ],
      chart: {
        type: 'stackedBar',
        title: useType === 'self' ? '自用住宅：10% 優惠稅額' : '一般用地：累進稅額結構',
        unit: '元',
        scale: 10000,
        yName: '稅額（萬元）',
        categories: ['本案件'],
        series: useType === 'self'
          ? [{ name: '自用優惠稅額（10%）', data: [tax], color: 'teal' }]
          : [
              { name: '20% 級距稅額', data: [Math.min(appreciation, adjustedPrev > 0 ? adjustedPrev : 1) * 0.20], color: 'teal' },
              { name: '30% 級距稅額', data: [Math.min(Math.max(0, appreciation - (adjustedPrev > 0 ? adjustedPrev : 1)), adjustedPrev > 0 ? adjustedPrev : 1) * 0.30], color: 'gold' },
              { name: '40% 級距稅額', data: [Math.max(0, appreciation - (adjustedPrev > 0 ? adjustedPrev : 1) * 2) * 0.40], color: 'coral' }
            ]
      },
      notes: noteLines.concat([TAX_DISCLAIMER])
    };
  });

  /* ============================================================
     9. 房地合一稅試算
     ============================================================ */
  g.RECalcEngine.register('re_house_income_tax', function (inputs) {
    var sellPrice = inputs.sellPrice;
    var cost = inputs.cost;
    var expense = inputs.expense;
    var holdYears = inputs.holdYears;
    var selfUse = inputs.selfUse;
    if (!(sellPrice >= 0) || !(cost >= 0)) throw new Error('價格與成本不可為負數。');
    if (!(holdYears >= 0)) throw new Error('持有年數不可為負數。');

    var gain = sellPrice - cost - expense;
    if (gain < 0) gain = 0;

    var rate;
    if (holdYears <= 2) rate = 0.45;
    else if (holdYears <= 5) rate = 0.35;
    else if (holdYears <= 10) rate = 0.20;
    else rate = 0.15;

    var exempt = 0;
    var taxableGain = gain;
    if (selfUse === 'yes') {
      exempt = 4000000;
      taxableGain = Math.max(0, gain - exempt);
    }
    var tax = taxableGain * rate;

    /* 不同持有年限稅負比較（同一 gain） */
    var yearBuckets = [
      { label: '2 年以內', r: 0.45 },
      { label: '2~5 年', r: 0.35 },
      { label: '5~10 年', r: 0.20 },
      { label: '10 年以上', r: 0.15 }
    ];
    var cats = yearBuckets.map(function (b) { return b.label; });
    var data = yearBuckets.map(function (b) { return taxableGain * b.r; });

    return {
      cards: [
        { label: '交易所得', value: gain, format: 'currency', sub: '成交價－成本－費用' },
        { label: '適用稅率', value: rate, format: 'percent', sub: '持有 ' + holdYears + ' 年' },
        { label: '應納房地合一稅', value: tax, format: 'currency', emphasis: true, sub: selfUse === 'yes' ? '已扣 400 萬免稅額' : '一般用途' },
        { label: '實際有效稅率', value: gain > 0 ? tax / gain : 0, format: 'percent' }
      ],
      chart: {
        type: 'bar',
        title: '不同持有年限稅額比較',
        unit: '元',
        scale: 10000,
        yName: '稅額（萬元）',
        categories: cats,
        series: [{ name: '應納稅額', data: data, color: 'plum' }]
      },
      notes: [
        '房地合一稅率級距：2 年內 45%、2~5 年 35%、5~10 年 20%、10 年以上 15%。',
        selfUse === 'yes' ? '自用住宅適用 400 萬免稅額（需符合持有六年內等條件）。' : '未套用自用住宅 400 萬免稅額。',
        TAX_DISCLAIMER
      ]
    };
  });

  /* ============================================================
     10. 社區管理費試算
     ============================================================ */
  g.RECalcEngine.register('re_mgmt_fee', function (inputs) {
    var ping = inputs.ping;
    var feePerPing = inputs.feePerPing;
    var parkingCount = inputs.parkingCount;
    var parkingFee = inputs.parkingFee;
    if (!(ping > 0)) throw new Error('請輸入大於 0 的坪數。');
    if (!(feePerPing >= 0) || !(parkingFee >= 0)) throw new Error('管理費不可為負數。');
    if (!(parkingCount >= 0)) throw new Error('車位數不可為負數。');

    var houseFee = ping * feePerPing;
    var parkingTotal = parkingCount * parkingFee;
    var monthly = houseFee + parkingTotal;
    var yearly = monthly * 12;

    return {
      cards: [
        { label: '每月管理費', value: monthly, format: 'currency', emphasis: true },
        { label: '每年管理費', value: yearly, format: 'currency' },
        { label: '本宅管理費（月）', value: houseFee, format: 'currency', sub: ping + ' 坪 × ' + feePerPing + ' 元' },
        { label: '車位管理費（月）', value: parkingTotal, format: 'currency', sub: parkingCount + ' 個車位' }
      ],
      chart: {
        type: 'donut',
        title: '每月管理費結構',
        unit: '元',
        series: [{
          name: '管理費',
          data: [
            { name: '本宅管理費', value: houseFee },
            { name: '車位管理費', value: parkingTotal }
          ]
        }]
      },
      notes: [
        '管理費＝房屋坪數 × 每坪單價＋車位數 × 車位管理費。',
        '實際管理費依社區規約與當年度決算為準。'
      ]
    };
  });

  /* ============================================================
     11. 物業管理費試算
     ============================================================ */
  g.RECalcEngine.register('re_property_mgmt', function (inputs) {
    var ping = inputs.ping;
    var level = inputs.level;
    if (!(ping > 0)) throw new Error('請輸入大於 0 的坪數。');

    var rateMap = { general: 60, premium: 120, hotel: 250 };
    var nameMap = { general: '一般級', premium: '精緻級', hotel: '飯店級' };
    var unit = rateMap[level] == null ? 60 : rateMap[level];
    var monthly = ping * unit;
    var yearly = monthly * 12;

    var levels = ['general', 'premium', 'hotel'];
    var cats = levels.map(function (k) { return nameMap[k]; });
    var data = levels.map(function (k) { return ping * rateMap[k] * 12; });

    return {
      cards: [
        { label: '每月物管費', value: monthly, format: 'currency', emphasis: true, sub: nameMap[level] + '：' + unit + ' 元/坪' },
        { label: '每年物管費', value: yearly, format: 'currency' },
        { label: '每坪單價', value: unit, format: 'currency', sub: '元/坪/月' }
      ],
      chart: {
        type: 'bar',
        title: '不同服務等級年物管費比較',
        unit: '元',
        scale: 10000,
        yName: '年費（萬元）',
        categories: cats,
        series: [{ name: '年物管費', data: data, color: 'sky' }]
      },
      notes: [
        '行情參考：一般級約 50~80 元/坪、精緻級約 100~150 元/坪、飯店級約 200~300 元/坪。',
        '實際費率依物業公司報價與服務內容議定。'
      ]
    };
  });

  /* ============================================================
     12. 住宅火險保費試算
     ============================================================ */
  g.RECalcEngine.register('re_house_insurance', function (inputs) {
    var sumInsured = inputs.sumInsured;
    var structure = inputs.structure;
    if (!(sumInsured > 0)) throw new Error('請輸入大於 0 的保險金額。');

    var rateMap = { rc: 0.8, brick: 1.2, steel: 0.6 };  /* ‰ */
    var nameMap = { rc: '鋼筋混凝土', brick: '加強磚造', steel: '鋼骨鋼筋' };
    var ratePerMille = rateMap[structure] == null ? 0.8 : rateMap[structure];
    var premium = sumInsured * ratePerMille / 1000;
    var monthly = premium / 12;

    var structures = ['rc', 'brick', 'steel'];
    var cats = structures.map(function (k) { return nameMap[k]; });
    var data = structures.map(function (k) { return sumInsured * rateMap[k] / 1000; });

    return {
      cards: [
        { label: '年繳保費', value: premium, format: 'currency', emphasis: true, sub: nameMap[structure] },
        { label: '每月保費分攤', value: monthly, format: 'currency' },
        { label: '保險金額', value: sumInsured, format: 'currency' },
        { label: '適用費率', value: ratePerMille / 1000, format: 'percent', sub: ratePerMille.toFixed(1) + '‰' }
      ],
      chart: {
        type: 'bar',
        title: '不同結構火險保費比較',
        unit: '元',
        categories: cats,
        series: [{ name: '年保費', data: data, color: 'coral' }]
      },
      notes: [
        '住宅火險費率依建物結構與危險係數訂定，鋼筋混凝土約 0.6~0.9‰、加強磚造約 1.0~1.5‰。',
        '實際保費依保險公司核保與附加險為準。'
      ]
    };
  });

  /* ============================================================
     13. 地震險保費試算
     ============================================================ */
  g.RECalcEngine.register('re_earthquake_ins', function (inputs) {
    var sumInsured = inputs.sumInsured;
    var floor = inputs.floor;
    if (!(sumInsured > 0)) throw new Error('請輸入大於 0 的保險金額。');

    /* 政策性住宅地震保險：基本保額 150 萬、年保費約 1,450 元（全國統一）
       樓層簡化係數：低樓層 1.0、中樓層 1.2、高樓層 1.5 */
    var baseSum = 1500000;
    var basePremium = 1450;
    var factorMap = { low: 1.0, mid: 1.2, high: 1.5 };
    var nameMap = { low: '低樓層（1~3 樓）', mid: '中樓層（4~14 樓）', high: '高樓層（15 樓以上）' };
    var factor = factorMap[floor] == null ? 1.0 : factorMap[floor];

    var premium = basePremium * (sumInsured / baseSum) * factor;
    var monthly = premium / 12;

    var floors = ['low', 'mid', 'high'];
    var cats = floors.map(function (k) { return nameMap[k]; });
    var data = floors.map(function (k) { return basePremium * (sumInsured / baseSum) * factorMap[k]; });

    return {
      cards: [
        { label: '年繳保費', value: premium, format: 'currency', emphasis: true, sub: nameMap[floor] },
        { label: '每月保費分攤', value: monthly, format: 'currency' },
        { label: '保險金額', value: sumInsured, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '不同樓層地震險保費比較',
        unit: '元',
        categories: cats,
        series: [{ name: '年保費', data: data, color: 'gold' }]
      },
      notes: [
        '政策性住宅地震保險由住宅地震保險基金統一承保，基本保額約 150 萬元、年保費約 1,450 元。',
        '高樓層或高風險地區實際費率依保險公司核保為準。'
      ]
    };
  });

  /* ============================================================
     14. 淹水險保費試算
     ============================================================ */
  g.RECalcEngine.register('re_flood_ins', function (inputs) {
    var buildingValue = inputs.buildingValue;
    var contentValue = inputs.contentValue;
    var risk = inputs.risk;
    if (!(buildingValue >= 0) || !(contentValue >= 0)) throw new Error('損失限額不可為負數。');

    var rateMap = { low: 1.0, mid: 2.5, high: 5.0 };  /* ‰ */
    var nameMap = { low: '市區一般', mid: '沿海或河岸區', high: '低窪易淹地區' };
    var ratePerMille = rateMap[risk] == null ? 1.0 : rateMap[risk];

    var totalValue = buildingValue + contentValue;
    var premium = totalValue * ratePerMille / 1000;
    var buildingPrem = buildingValue * ratePerMille / 1000;
    var contentPrem = contentValue * ratePerMille / 1000;

    var risks = ['low', 'mid', 'high'];
    var cats = risks.map(function (k) { return nameMap[k]; });
    var data = risks.map(function (k) { return totalValue * rateMap[k] / 1000; });

    return {
      cards: [
        { label: '年繳保費', value: premium, format: 'currency', emphasis: true, sub: nameMap[risk] + '：' + ratePerMille.toFixed(1) + '‰' },
        { label: '建物保費（年）', value: buildingPrem, format: 'currency' },
        { label: '動產保費（年）', value: contentPrem, format: 'currency' },
        { label: '每月保費分攤', value: premium / 12, format: 'currency' }
      ],
      chart: {
        type: 'bar',
        title: '不同地區風險等級保費比較',
        unit: '元',
        categories: cats,
        series: [{ name: '年保費', data: data, color: 'sky' }]
      },
      notes: [
        '淹水險費率依地區歷史淹水紀錄與海拔訂定，一般約 1‰~5‰。',
        '實際保費依保險公司核保與附加條款為準。'
      ]
    };
  });

  /* ============================================================
     15. 房屋修繕準備金試算
     ============================================================ */
  g.RECalcEngine.register('re_maintenance_fund', function (inputs) {
    var target = inputs.target;
    var years = inputs.years;
    var inflation = inputs.inflation;
    if (!(target > 0)) throw new Error('請輸入大於 0 的目標修繕總額。');
    if (!(years > 0)) throw new Error('準備期間至少 1 年。');
    if (!(inflation >= 0)) throw new Error('通膨率不可為負數。');

    /* 通膨調整後目標（名目金額） */
    var inflateTarget = M.simpleFV(target, inflation / 100, years);
    var n = M.yearToMonth(years);
    /* 假設提撥金存放於無息儲存（保守估算） */
    var monthly = inflateTarget / n;
    var yearly = monthly * 12;

    /* 逐年累積曲線（直線累積到 inflateTarget） */
    var cats = [], data = [];
    for (var y = 1; y <= years; y++) {
      cats.push('第 ' + y + ' 年');
      data.push(yearly * y);
    }

    return {
      cards: [
        { label: '今日目標修繕總額', value: target, format: 'currency' },
        { label: '通膨後目標金額', value: inflateTarget, format: 'currency', sub: years + ' 年後，通膨 ' + inflation.toFixed(1) + '%' },
        { label: '每月應提撥', value: monthly, format: 'currency', emphasis: true },
        { label: '每年應提撥', value: yearly, format: 'currency' }
      ],
      chart: {
        type: 'line',
        title: '修繕準備金逐年累積',
        unit: '元',
        scale: 10000,
        yName: '累積金額（萬元）',
        categories: cats,
        series: [{ name: '累積準備金', data: data, color: 'teal' }]
      },
      notes: [
        '假設修繕費用每年依通膨率上漲，提撥金額存放於無息儲存。',
        '若提撥金額有投資報酬，每月應提撥金額可進一步降低。'
      ]
    };
  });

  /* ============================================================
     16. 房屋持有月成本總覽
     ============================================================ */
  g.RECalcEngine.register('re_holding_monthly', function (inputs) {
    var mortgagePay = inputs.mortgagePay;
    var mgmtFee = inputs.mgmtFee;
    var houseTaxY = inputs.houseTaxY;
    var landTaxY = inputs.landTaxY;
    var insuranceY = inputs.insuranceY;
    var repairM = inputs.repairM;
    var all = [mortgagePay, mgmtFee, houseTaxY, landTaxY, insuranceY, repairM];
    for (var i = 0; i < all.length; i++) {
      if (!(all[i] >= 0)) throw new Error('輸入金額不可為負數。');
    }

    var houseTaxM = houseTaxY / 12;
    var landTaxM = landTaxY / 12;
    var insuranceM = insuranceY / 12;

    var monthlyTotal = mortgagePay + mgmtFee + houseTaxM + landTaxM + insuranceM + repairM;
    var yearlyTotal = monthlyTotal * 12;
    var mortRatio = monthlyTotal > 0 ? mortgagePay / monthlyTotal : 0;

    return {
      cards: [
        { label: '每月持有成本', value: monthlyTotal, format: 'currency', emphasis: true },
        { label: '每年持有成本', value: yearlyTotal, format: 'currency' },
        { label: '房貸月付占比', value: mortRatio, format: 'percent' },
        { label: '稅費保險月攤', value: houseTaxM + landTaxM + insuranceM, format: 'currency' }
      ],
      chart: {
        type: 'donut',
        title: '每月持有成本結構',
        unit: '元',
        series: [{
          name: '月成本',
          data: [
            { name: '房貸月付', value: mortgagePay },
            { name: '管理費', value: mgmtFee },
            { name: '房屋稅（月攤）', value: houseTaxM },
            { name: '地價稅（月攤）', value: landTaxM },
            { name: '保險（月攤）', value: insuranceM },
            { name: '修繕提列', value: repairM }
          ]
        }]
      },
      notes: [
        '年繳稅費與保險以 12 個月平均攤提至每月。',
        '實際現金流出仍以各年度繳款通知為準，本試算僅作月度規劃參考。'
      ]
    };
  });

})(typeof window !== 'undefined' ? window : globalThis);
