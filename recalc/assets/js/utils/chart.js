/* ============================================================
   utils/chart.js — ECharts 封裝
   - 主題感知：由 CSS 變數取色，recalc:theme 事件時重繪
   - chartSpec 契約（引擎回傳）：{type, title, unit, scale, yName, categories, series}
   ============================================================ */
(function (g) {
  'use strict';

  var instances = [];

  function cssVar(name) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name);
    return v ? v.trim() : '';
  }

  function palette() {
    return ['--c1', '--c2', '--c3', '--c4', '--c5', '--c6', '--c7', '--c8'].map(cssVar);
  }

  function semanticColor(key) {
    var map = { primary: '--primary', gold: '--gold', teal: '--teal', plum: '--c4', coral: '--c5', sky: '--c6', forest: '--c8', slate: '--c7' };
    return cssVar(map[key] || '--c1');
  }

  function scaled(v, scale) { return scale ? v / scale : v; }

  function fmtVal(v, scale, unit) {
    var x = scaled(v, scale);
    var s = (Math.abs(x) >= 100)
      ? Math.round(x).toLocaleString('zh-TW')
      : String(Math.round(x * 100) / 100);
    return s + (unit ? ' ' + unit : '');
  }

  function buildOption(spec) {
    var type = spec.type || 'bar';
    var isPie = type === 'pie' || type === 'donut';
    /* 專案 chart type → ECharts 原生 series type（stackedBar/stackedArea/area 需對映，否則被 ECharts 靜默忽略） */
    var ECH_TYPE = { bar: 'bar', line: 'line', area: 'line', stackedBar: 'bar', stackedArea: 'line', scatter: 'scatter' };
    var echType = ECH_TYPE[type] || 'bar';
    var opt = {
      color: palette(),
      textStyle: { color: cssVar('--chart-text') },
      tooltip: {
        trigger: isPie ? 'item' : 'axis',
        triggerOn: 'mousemove|click',
        renderMode: 'richText',
        confine: true,
        valueFormatter: function (v) { return fmtVal(v, spec.scale, spec.unit); }
      }
    };

    if (isPie) {
      var items = (spec.series && spec.series[0] && spec.series[0].data) || [];
      opt.title = spec.title
        ? { text: spec.title, left: 14, top: 8, textStyle: { fontSize: 14, fontWeight: 700, color: cssVar('--chart-text') } }
        : undefined;
      opt.legend = {
        show: true, bottom: 4, icon: 'circle', itemWidth: 12, itemHeight: 12,
        textStyle: { fontSize: 11, color: cssVar('--chart-text') },
        type: items.length > 4 ? 'scroll' : 'plain'
      };
      opt.series = [{
        name: spec.title || '',
        type: 'pie',
        radius: type === 'donut' ? ['42%', '70%'] : '70%',
        center: ['50%', '50%'],
        data: items.map(function (it) {
          return {
            name: it.name,
            value: scaled(it.value, spec.scale),
            itemStyle: it.color ? { color: semanticColor(it.color) } : undefined
          };
        }),
        label: { fontSize: 11, color: cssVar('--chart-text'), formatter: '{b}\n{d}%' },
        labelLine: { length: 12, length2: 10 },
        emphasis: { label: { fontWeight: 700 } }
      }];
      return opt;
    }

    var hasLegend = spec.series && spec.series.length > 1;
    opt.title = spec.title
      ? { text: spec.title, left: 12, top: 8, textStyle: { fontSize: 14, fontWeight: 700, color: cssVar('--chart-text') } }
      : undefined;
    opt.legend = hasLegend
      ? {
          show: true, top: 30, left: 10,
          icon: 'circle', itemWidth: 12, itemHeight: 12,
          textStyle: { fontSize: 11, color: cssVar('--chart-text') },
          type: spec.series.length > 4 ? 'scroll' : 'plain'
        }
      : undefined;
    opt.grid = { left: 14, right: 18, top: hasLegend ? 58 : 40, bottom: 6, containLabel: true };

    var cats = spec.categories || [];
    opt.xAxis = {
      type: 'category',
      data: cats,
      axisLine: { lineStyle: { color: cssVar('--chart-grid') } },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 11, color: cssVar('--chart-text'),
        interval: 0, rotate: cats.length > 12 ? 30 : 0, hideOverlap: true
      },
      splitLine: { show: false }
    };
    opt.yAxis = {
      type: 'value',
      name: spec.yName || '',
      nameTextStyle: { fontSize: 11, color: cssVar('--chart-text') },
      axisLabel: { fontSize: 11, color: cssVar('--chart-text') },
      splitLine: { lineStyle: { color: cssVar('--chart-grid') } }
    };

    opt.series = (spec.series || []).map(function (s, i) {
      var base = {
        name: s.name,
        type: s.type || echType,
        data: (s.data || []).map(function (v) { return v === null || v === undefined ? null : scaled(v, spec.scale); }),
        itemStyle: {},
        emphasis: { focus: 'series' }
      };
      if (s.color) base.itemStyle.color = semanticColor(s.color);
      if (type === 'line' || type === 'area') {
        base.smooth = true; base.symbolSize = 7; base.lineStyle = { width: 2 };
      }
      if (type === 'area') base.areaStyle = { opacity: 0.16 };
      if (type === 'stackedArea') {
        base.stack = 'total'; base.smooth = true; base.symbolSize = 6; base.lineStyle = { width: 2 };
        base.areaStyle = { opacity: 0.5 };
      }
      if (type === 'stackedBar') { base.stack = 'total'; base.barMaxWidth = 34; }
      if (type === 'bar') base.barMaxWidth = 36;
      if (type === 'scatter') { base.symbolSize = 9; base.itemStyle.opacity = 0.65; }
      return base;
    });
    return opt;
  }

  function disposeEl(el) {
    for (var i = instances.length - 1; i >= 0; i--) {
      if (instances[i].el === el) {
        try { instances[i].chart.dispose(); } catch (e) { /* 已釋放 */ }
        if (el.__ro) { try { el.__ro.disconnect(); } catch (e) { /* 忽略 */ } el.__ro = null; }
        instances.splice(i, 1);
      }
    }
  }

  function render(el, spec) {
    disposeEl(el);
    if (!g.echarts) {
      el.innerHTML = '<div style="padding:48px 0;text-align:center;color:var(--text-3)">圖表引擎載入失敗，請重新整理頁面</div>';
      return null;
    }
    var chart = echarts.init(el, null, { renderer: 'canvas' });
    chart.setOption(buildOption(spec));
    instances.push({ el: el, chart: chart, spec: spec });
    if (!el.__ro) {
      try {
        el.__ro = new ResizeObserver(function () { chart.resize(); });
        el.__ro.observe(el);
      } catch (e) {
        window.addEventListener('resize', function () { chart.resize(); });
      }
    }
    return chart;
  }

  function disposeAll() {
    while (instances.length) {
      var it = instances.pop();
      try { it.chart.dispose(); } catch (e) { /* 忽略 */ }
    }
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('recalc:theme', function () {
      instances.forEach(function (it) {
        try { it.chart.setOption(buildOption(it.spec), true); } catch (e) { /* 忽略 */ }
      });
    });
  }

  g.RECalcChart = { render: render, disposeEl: disposeEl, disposeAll: disposeAll, buildOption: buildOption };
})(typeof window !== 'undefined' ? window : globalThis);
