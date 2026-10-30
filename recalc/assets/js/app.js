/* ============================================================
   app.js — 應用主程式（hash 路由 / 側欄 / 麵包屑 / 試算渲染）
   ============================================================ */
(function (g) {
  'use strict';

  var RECalc = g.RECalc;
  var D = g.RECalcDom;
  var F = g.RECalcFormat;
  var CH = g.RECalcChart;
  var TH = g.RECalcTheme;

  var $view = document.getElementById('view');
  var $nav = document.getElementById('sidebarNav');
  var $crumb = document.getElementById('breadcrumb');
  var $search = document.getElementById('globalSearch');
  var $menuBtn = document.getElementById('menuBtn');
  var $backdrop = document.getElementById('sidebarBackdrop');
  var $sidebar = document.getElementById('sidebar');
  var $stat = document.getElementById('sidebarStat');

  var state = { page: 'home', cat: null, tool: null, search: '' };
  var lastResult = null; /* 供複製結果使用 */

  /* ---------- 小工具 ---------- */
  function iconHtml(key, cls) {
    return '<svg viewBox="0 0 24 24" class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + key + '"></use></svg>';
  }
  function matches(t, q) {
    q = q.trim().toLowerCase();
    if (!q) return true;
    var hay = (t.name + ' ' + (t.desc || '') + ' ' + (t.keywords || []).join(' ')).toLowerCase();
    return hay.indexOf(q) !== -1;
  }
  function findTool(id) { return RECalc.byId[id]; }
  function findCat(id) {
    for (var i = 0; i < RECalc.categories.length; i++) {
      if (RECalc.categories[i].id === id) return RECalc.categories[i];
    }
    return null;
  }
  function formatCell(v, fmt) {
    if (v === null || v === undefined || v === '') return '—';
    return F.fmt(v, fmt || 'text');
  }

  /* ---------- 路由 ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, '');
    var parts = h.split('/').filter(Boolean);
    if (parts[0] === 'tool' && parts[1]) return { page: 'tool', tool: parts[1] };
    if (parts[0] === 'cat' && parts[1]) return { page: 'cat', cat: parts[1] };
    if (parts[0] === 'list') return { page: 'list' };
    return { page: 'home' };
  }

  function pageTitle() {
    if (state.page === 'tool') {
      var t = findTool(state.tool);
      return (t ? t.name : '工具') + '｜九回算算網';
    }
    if (state.page === 'list') return '全部工具清單｜九回算算網';
    if (state.page === 'cat') {
      var c = findCat(state.cat);
      return (c ? c.name : '分類') + '｜九回算算網';
    }
    return '九回算算網｜' + RECalc.total + ' 種專業試算工具';
  }

  function route() {
    var r = parseHash();
    state.page = r.page;
    state.tool = r.tool || null;
    state.cat = r.cat || null;

    var tool = state.tool ? findTool(state.tool) : null;
    if (state.tool && !tool) { state.page = 'home'; state.tool = null; D.toast('找不到此工具，已返回首頁。', 'err'); }
    if (state.cat && !findCat(state.cat)) { state.page = 'list'; state.cat = null; }

    document.title = pageTitle();
    renderBreadcrumb();
    renderView();
    renderSidebar();
    closeSidebar();
    window.scrollTo(0, 0);
  }

  function renderBreadcrumb() {
    D.clear($crumb);
    function sep() { return D.el('span', { class: 'sep', text: '›' }); }
    var home = D.el('a', { href: '#/', text: '首頁' });
    $crumb.appendChild(home);
    if (state.page === 'list') {
      $crumb.appendChild(sep());
      $crumb.appendChild(D.el('span', { class: 'cur', text: '全部工具' }));
    } else if (state.page === 'cat') {
      var c = findCat(state.cat);
      $crumb.appendChild(sep());
      $crumb.appendChild(D.el('a', { href: '#/list', text: '全部工具' }));
      $crumb.appendChild(sep());
      $crumb.appendChild(D.el('span', { class: 'cur', text: c ? c.name : '' }));
    } else if (state.page === 'tool') {
      var t = findTool(state.tool);
      var c2 = t ? findCat(t.cat) : null;
      $crumb.appendChild(sep());
      $crumb.appendChild(D.el('a', { href: '#/list', text: '全部工具' }));
      $crumb.appendChild(sep());
      if (c2) {
        $crumb.appendChild(D.el('a', { href: '#/cat/' + c2.id, text: c2.name }));
        $crumb.appendChild(sep());
      }
      $crumb.appendChild(D.el('span', { class: 'cur', text: t ? t.name : '' }));
    }
  }

  /* ---------- 側欄 ---------- */
  function renderSidebar() {
    D.clear($nav);
    if ($stat) $stat.textContent = RECalc.total + ' 種工具 · 14 大分類';

    var allLink = D.el('a', {
      class: 'tool-link tl-top' + (state.page === 'list' ? ' active' : ''),
      href: '#/list'
    }, [D.icon('grid', 'tl-ic'), D.el('span', { class: 'tl-name', text: '全部工具清單' })]);
    $nav.appendChild(allLink);

    ['re', 'fin'].forEach(function (domKey) {
      var dom = RECalc.domains[domKey];
      var group = D.el('div', { class: 'domain-group domain-' + domKey });
      var title = D.el('div', { class: 'domain-title' }, [
        D.el('span', { class: 'dot' }),
        D.el('span', { text: dom.name + '（' + dom.count + ' 種）' })
      ]);
      group.appendChild(title);
      dom.cats.forEach(function (cat) {
        var details = D.el('details', { open: true });
        var sumBtn = D.el('summary', { class: 'cat-title' }, [
          D.icon(cat.icon, 'cat-ic'),
          D.el('span', { class: 'cat-name', text: cat.name }),
          D.el('span', { class: 'cat-count', text: String(cat.count) }),
          D.icon('chevron', 'cat-chev')
        ]);
        details.appendChild(sumBtn);
        var list = D.el('div', { class: 'cat-tools' });
        cat.tools.forEach(function (t) {
          if (state.search && !matches(t, state.search)) return;
          var link = D.el('a', {
            class: 'tool-link' + (state.page === 'tool' && state.tool === t.id ? ' active' : ''),
            href: '#/tool/' + t.id
          }, [D.icon(t.icon, 'tl-ic'), D.el('span', { class: 'tl-name', text: t.name })]);
          list.appendChild(link);
        });
        details.appendChild(list);
        group.appendChild(details);
      });
      $nav.appendChild(group);
    });
  }

  function openSidebar() {
    $sidebar.classList.add('open');
    $backdrop.hidden = false;
  }
  function closeSidebar() {
    $sidebar.classList.remove('open');
    $backdrop.hidden = true;
  }

  /* ---------- 檢視 ---------- */
  function renderView() {
    CH.disposeAll();
    D.clear($view);
    if (state.page === 'home') renderHome();
    else if (state.page === 'list') renderList();
    else if (state.page === 'cat') renderCat();
    else if (state.page === 'tool') renderTool();
  }

  /* ===== 首頁 ===== */
  function renderHome() {
    var doms = RECalc.domains;

    var hero = D.el('section', { class: 'hero' }, [
      D.el('div', { class: 'hero-inner' }, [
        D.el('span', { class: 'kicker' }, [D.icon('spark'), '史上最完整 · 專業試算工具箱']),
        D.el('h1', { html: '不動產 × 財務管理<br><span class="accent">113 種專業試算工具</span>一次擁有' }),
        D.el('p', { class: 'lead', text: '從房貸攤還、購屋能力、稅務計算到複利成長、退休規劃與財務分析，每一支工具都是真實可計算的互動表單，輸入參數立即得到結果與圖表視覺化。' }),
        D.el('div', { class: 'hero-search' }, [
          D.icon('search'),
          D.el('input', { id: 'heroSearch', type: 'search', placeholder: '搜尋工具名稱，例如「房貸」「複利」「所得稅」…', autocomplete: 'off' }),
          D.el('button', { class: 'btn btn-primary', text: '搜尋', onclick: goListFromHero })
        ])
      ])
    ]);
    $view.appendChild(hero);

    /* 領域入口 */
    var sec = section('兩大領域', '不動產規劃與財務管理，一次搞定');
    var dc = D.el('div', { class: 'domain-cards' }, [
      domainCard('re'),
      domainCard('fin')
    ]);
    sec.appendChild(dc);
    $view.appendChild(sec);

    /* 熱門工具 */
    var sec2 = section('熱門工具', '最多人使用的試算工具');
    var chips = D.el('div', { class: 'hot-chips' });
    RECalc.hot.forEach(function (id) {
      var t = findTool(id);
      if (!t) return;
      chips.appendChild(D.el('a', { class: 'hot-chip', href: '#/tool/' + t.id }, [D.icon(t.icon), t.name]));
    });
    sec2.appendChild(chips);
    $view.appendChild(sec2);

    /* 分類總覽 */
    var sec3 = section('分類總覽', '14 大分類，快速找到你要的工具');
    var cg = D.el('div', { class: 'cat-grid' });
    RECalc.categories.forEach(function (c) {
      cg.appendChild(catCard(c));
    });
    sec3.appendChild(cg);
    $view.appendChild(sec3);

    /* 使用方式 */
    var sec4 = section('怎麼使用', '三步驟開始試算');
    var how = D.el('div', { class: 'howto' }, [
      howCard('1', '選擇工具', '從側邊欄或分類總覽，挑選你要試算的項目。'),
      howCard('2', '輸入參數', '填入金額、利率、年限等條件，預設值即為示範情境。'),
      howCard('3', '取得結果', '按下「開始計算」，立即獲得數字結果、明細表與圖表。')
    ]);
    sec4.appendChild(how);
    $view.appendChild(sec4);

    /* 特色 */
    var sec5 = section('網站特色', '專業、視覺化、離線可用');
    var feat = D.el('div', { class: 'feat-strip' }, [
      featItem('check', '超過 110 種真實可計算的互動試算表單'),
      featItem('chart2', '結果圖表視覺化（ECharts）'),
      featItem('monitor', '日夜主題切換，支援跟隨系統'),
      featItem('grid', '分類目錄、麵包屑、全站搜尋'),
      featItem('wheel', '響應式設計，手機電腦皆可用'),
      featItem('bolt', '離線可用，雙擊即可開啟')
    ]);
    sec5.appendChild(feat);
    $view.appendChild(sec5);

    var hs = document.getElementById('heroSearch');
    if (hs) hs.addEventListener('keydown', function (e) { if (e.key === 'Enter') goListFromHero(); });

    function section(title, note) {
      var s = D.el('section', { class: 'section' }, [
        D.el('div', { class: 'section-head' }, [
          D.el('h2', { text: title }),
          D.el('span', { class: 'sh-note', text: note })
        ])
      ]);
      $view.appendChild(s);
      return s;
    }
    function domainCard(key) {
      var dom = RECalc.domains[key];
      var c = D.el('a', {
        class: 'domain-card ' + (key === 're' ? 're' : 'fin'),
        href: '#/list'
      }, [
        D.el('div', { class: 'dc-top' }, [
          D.el('span', { class: 'dc-ic' }, [D.icon(key === 're' ? 'home' : 'piggy')]),
          D.el('div', {}, [
            D.el('div', { class: 'dc-name', text: dom.name }),
            D.el('div', { class: 'dc-count', text: dom.count + ' 種工具 · ' + dom.cats.length + ' 大分類' })
          ])
        ]),
        D.el('p', { class: 'dc-desc', text: key === 're'
          ? '房貸試算、購屋能力、稅務費用、投資槓桿、坪數建物與持有管理，一次看懂不動產投資的每個數字。'
          : '儲蓄、預算、貸款、保險、退休、投資理財與財務分析，用數據掌握你的財務未來。' }),
        D.el('span', { class: 'dc-go' }, ['前往工具清單', D.icon('arrowR')])
      ]);
      return c;
    }
    function catCard(c) {
      var samples = c.tools.slice(0, 3);
      var card = D.el('a', { class: 'cat-card', href: '#/cat/' + c.id }, [
        D.el('div', { class: 'cc-top' }, [
          D.el('span', { class: 'cc-ic' }, [D.icon(c.icon)]),
          D.el('span', { class: 'cc-name', text: c.name }),
          D.el('span', { class: 'cc-count', text: c.count + ' 種' })
        ]),
        D.el('p', { class: 'cc-desc', text: c.desc }),
        D.el('div', { class: 'cc-samples' }, samples.map(function (t) {
          return D.el('span', { class: 'cc-sample', text: t.name });
        }))
      ]);
      return card;
    }
    function howCard(num, title, p) {
      return D.el('div', { class: 'howto-card' }, [
        D.el('span', { class: 'hc-num', text: num }),
        D.el('h3', { text: title }),
        D.el('p', { text: p })
      ]);
    }
    function featItem(ic, text) {
      return D.el('div', { class: 'feat-item' }, [D.icon(ic), D.el('span', { text: text })]);
    }
  }

  function goListFromHero() {
    var hs = document.getElementById('heroSearch');
    state.search = hs ? hs.value : '';
    if (location.hash === '#/list') { renderList(); renderSidebar(); }
    else location.hash = '#/list';
  }

  /* ===== 全部工具清單 ===== */
  function renderList() {
    var head = D.el('div', { class: 'list-head' }, [
      D.el('h1', { text: '全部工具清單' }),
      D.el('p', { text: '共 ' + RECalc.total + ' 種工具，分屬 ' + RECalc.categories.length + ' 大分類。搜尋或點擊分類，立即開始試算。' }),
      D.el('div', { class: 'list-search' }, [
        D.icon('search'),
        D.el('input', { id: 'listSearch', type: 'search', placeholder: '篩選工具…', value: state.search })
      ])
    ]);
    $view.appendChild(head);

    var ls = document.getElementById('listSearch');
    if (ls) {
      ls.addEventListener('input', function () {
        state.search = ls.value;
        renderSidebar();
        /* 只重建清單區塊 */
        var groups = document.getElementById('listGroups');
        if (groups) { D.clear(groups); buildListGroups(groups); }
      });
    }

    var groups = D.el('div', { id: 'listGroups' });
    $view.appendChild(groups);
    buildListGroups(groups);
  }

  function buildListGroups(container) {
    var q = state.search.trim().toLowerCase();
    var shown = 0;
    RECalc.categories.forEach(function (c) {
      var list = c.tools.filter(function (t) { return matches(t, q); });
      if (!list.length && q) return;
      shown += list.length;
      var grp = D.el('div', { class: 'list-group' }, [
        D.el('div', { class: 'list-group-title' }, [
          D.el('span', { class: 'lg-ic' }, [D.icon(c.icon)]),
          D.el('span', { text: c.name }),
          D.el('span', { class: 'lg-count', text: list.length + ' 種' })
        ]),
        D.el('div', { class: 'tool-rows' }, list.map(function (t) {
          return D.el('a', { class: 'tool-row', href: '#/tool/' + t.id }, [
            D.el('span', { class: 'tr-ic' }, [D.icon(t.icon)]),
            D.el('span', { class: 'tr-main' }, [
              D.el('span', { class: 'tr-name', text: t.name }),
              D.el('span', { class: 'tr-desc', text: t.desc })
            ]),
            D.el('span', { class: 'tr-go' }, [D.icon('arrowR')])
          ]);
        }))
      ]);
      container.appendChild(grp);
    });
    if (!shown) {
      container.appendChild(D.el('div', { class: 'empty-state', text: '沒有符合「' + state.search + '」的工具，請換個關鍵字試試。' }));
    }
  }

  /* ===== 單一分類 ===== */
  function renderCat() {
    var c = findCat(state.cat);
    if (!c) { location.hash = '#/list'; return; }
    var head = D.el('div', { class: 'list-head' }, [
      D.el('h1', { html: iconHtml(c.icon) + ' ' + D.esc(c.name) }),
      D.el('p', { text: c.desc })
    ]);
    $view.appendChild(head);
    var rows = D.el('div', { class: 'tool-rows' }, c.tools.map(function (t) {
      return D.el('a', { class: 'tool-row', href: '#/tool/' + t.id }, [
        D.el('span', { class: 'tr-ic' }, [D.icon(t.icon)]),
        D.el('span', { class: 'tr-main' }, [
          D.el('span', { class: 'tr-name', text: t.name }),
          D.el('span', { class: 'tr-desc', text: t.desc })
        ]),
        D.el('span', { class: 'tr-go' }, [D.icon('arrowR')])
      ]);
    }));
    $view.appendChild(rows);
  }

  /* ===== 工具試算頁 ===== */
  function renderTool() {
    var t = findTool(state.tool);
    if (!t) { location.hash = '#/list'; return; }

    var head = D.el('div', { class: 'page-head' }, [
      D.el('span', { class: 'ph-ic' }, [D.icon(t.icon)]),
      D.el('div', {}, [
        D.el('h1', { text: t.name }),
        D.el('p', { class: 'ph-desc', text: t.desc }),
        D.el('div', { class: 'ph-tags' }, (t.keywords || []).slice(0, 4).map(function (k) {
          return D.el('span', { class: 'ph-tag', text: k });
        }))
      ])
    ]);
    $view.appendChild(head);

    /* 表單 */
    var formCard = D.el('section', { class: 'card' });
    formCard.appendChild(D.el('div', { class: 'section-title' }, [D.icon('calc'), D.el('span', { text: '輸入參數' })]));

    var grid = D.el('div', { class: 'field-grid' });
    var fieldWraps = {};
    var lastGroup = null;
    (t.fields || []).forEach(function (f) {
      if (f.group && f.group !== lastGroup) {
        grid.appendChild(D.el('div', { class: 'field-group-title', text: f.group }));
        lastGroup = f.group;
      }
      var w = buildField(f);
      fieldWraps[f.key] = w;
      grid.appendChild(w);
    });
    formCard.appendChild(grid);

    var resultBox = D.el('div', { id: 'resultBox' });
    var actions = D.el('div', { class: 'form-actions' }, [
      D.el('button', { class: 'btn btn-primary', text: '開始計算', onclick: function () { submitCalc(true); } }),
      D.el('button', { class: 'btn btn-ghost', text: '重設參數', onclick: function () {
        (t.fields || []).forEach(function (f) { resetField(f); });
        D.toast('參數已重設為預設值。');
      } }),
      D.el('span', { class: 'spacer' }),
      D.el('button', { class: 'btn btn-ghost', html: iconHtml('copy') + '<span>複製結果</span>', onclick: copyResult })
    ]);
    formCard.appendChild(actions);
    formCard.appendChild(resultBox);
    $view.appendChild(formCard);

    /* 自動示範試算（預設值） */
    submitCalc(false);

    /* ---------- 欄位建構 ---------- */
    function buildField(f) {
      var wrap = D.el('div', { class: 'field' });
      var labelRow = D.el('div', { class: 'field-label' }, [
        D.el('span', { text: f.label }),
        f.unit ? D.el('span', { class: 'unit', text: f.unit }) : null,
        f.hint ? D.el('span', { class: 'hint-ic', title: f.hint }, [D.icon('info')]) : null
      ]);
      var err = D.el('div', { class: 'field-err' });
      var ctl;

      if (f.type === 'select') {
        ctl = D.el('select', { class: 'select' });
        (f.options || []).forEach(function (o) {
          ctl.appendChild(D.el('option', { value: o.value, text: o.label }));
        });
        ctl.value = String(f.default == null ? '' : f.default);
        wrap.appendChild(labelRow); wrap.appendChild(ctl); wrap.appendChild(err);
      } else if (f.type === 'textarea') {
        ctl = D.el('textarea', { class: 'textarea', rows: f.rows || 3, placeholder: f.placeholder || '' });
        ctl.value = f.default == null ? '' : String(f.default);
        wrap.appendChild(labelRow); wrap.appendChild(ctl); wrap.appendChild(err);
      } else if (f.type === 'text') {
        ctl = D.el('input', { class: 'input', type: 'text' });
        ctl.value = f.default == null ? '' : String(f.default);
        wrap.appendChild(labelRow); wrap.appendChild(ctl); wrap.appendChild(err);
      } else {
        /* number：步進鈕 */
        var input = D.el('input', { class: 'input', type: 'text', inputmode: 'decimal' });
        input.value = String(f.default == null ? '' : f.default);
        var minus = D.el('button', { class: 'stepper minus', text: '−', type: 'button' });
        var plus = D.el('button', { class: 'stepper plus', text: '+', type: 'button' });
        var row = D.el('div', { class: 'input-row' }, [minus, input, plus]);

        function curVal() { var v = F.num(input.value); return isFinite(v) ? v : NaN; }
        function updateStepState() {
          var v = curVal();
          minus.disabled = isFinite(f.min) && (!isFinite(v) || v <= f.min);
          plus.disabled = isFinite(f.max) && (!isFinite(v) || v >= f.max);
        }
        function step(dir) {
          var v = curVal();
          if (!isFinite(v)) v = (isFinite(f.min) ? f.min : 0);
          var st = f.step || 1;
          var nv = Math.round((v + dir * st) * 100) / 100;
          if (isFinite(f.min) && nv < f.min - 1e-9) return;
          if (isFinite(f.max) && nv > f.max + 1e-9) return;
          input.value = String(nv);
          updateStepState();
        }
        minus.addEventListener('click', function () { step(-1); });
        plus.addEventListener('click', function () { step(1); });
        input.addEventListener('input', updateStepState);
        updateStepState();
        ctl = input;
        wrap.appendChild(labelRow); wrap.appendChild(row); wrap.appendChild(err);
      }
      wrap.__ctl = ctl;
      wrap.__err = err;
      return wrap;
    }

    function resetField(f) {
      var w = fieldWraps[f.key];
      if (!w) return;
      if (f.type === 'number') {
        w.__ctl.value = String(f.default == null ? '' : f.default);
      } else if (f.type === 'select') {
        w.__ctl.value = String(f.default == null ? '' : f.default);
      } else {
        w.__ctl.value = f.default == null ? '' : String(f.default);
      }
      w.classList.remove('invalid');
      w.__err.textContent = '';
    }

    function collect() {
      var values = {}, errors = [];
      (t.fields || []).forEach(function (f) {
        var w = fieldWraps[f.key];
        if (!w) return;
        var raw = w.__ctl.value;
        var ok = true;
        if (f.type === 'number') {
          var v = F.num(raw);
          if (raw === '' || !isFinite(v)) {
            errors.push(f.label + '：請輸入有效數字'); ok = false;
          } else if (isFinite(f.min) && v < f.min) {
            errors.push(f.label + '：不可小於 ' + f.min); ok = false;
          } else if (isFinite(f.max) && v > f.max) {
            errors.push(f.label + '：不可大於 ' + f.max); ok = false;
          } else values[f.key] = v;
        } else if (f.type === 'select') {
          values[f.key] = raw;
        } else {
          values[f.key] = raw;
        }
        w.classList.toggle('invalid', !ok);
        w.__err.textContent = ok ? '' : errors[errors.length - 1];
      });
      return { ok: errors.length === 0, values: values, errors: errors };
    }

    function submitCalc(scroll) {
      var c = collect();
      if (!c.ok) {
        D.toast('請先修正欄位中的錯誤。', 'err');
        return;
      }
      var res;
      try {
        res = RECalcEngine.run(t.id, c.values);
      } catch (e) {
        D.clear(resultBox);
        resultBox.appendChild(D.el('div', { class: 'err-card' }, [D.icon('alert'), D.el('span', { text: e.message || '計算發生錯誤。' })]));
        lastResult = null;
        return;
      }
      renderResults(res);
      lastResult = buildResultText(res);
      if (scroll && resultBox) {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    function renderResults(res) {
      D.clear(resultBox);
      var s = RECalcEngine.sanitize(res);

      /* 結果卡 */
      var cards = D.el('div', { class: 'result-cards' });
      s.cards.forEach(function (c) {
        cards.appendChild(D.el('div', { class: 'stat-card' + (c.emphasis ? ' emphasis' : '') }, [
          D.el('div', { class: 'stat-label', text: c.label }),
          D.el('div', { class: 'stat-value num', text: F.fmt(c.value, c.format) }),
          c.sub ? D.el('div', { class: 'stat-sub', text: c.sub }) : null
        ]));
      });
      resultBox.appendChild(D.el('section', { class: 'card' }, [
        D.el('div', { class: 'section-title' }, [D.icon('check'), D.el('span', { text: '試算結果' })]),
        cards
      ]));

      /* 圖表 */
      if (s.chart) {
        var chartCard = D.el('section', { class: 'card' }, [
          D.el('div', { class: 'section-title' }, [D.icon('chart2'), D.el('span', { text: '視覺化分析' })]),
          D.el('div', { class: 'chart-box', id: 'chartBox' })
        ]);
        resultBox.appendChild(chartCard);
        var chartEl = document.getElementById('chartBox');
        CH.render(chartEl, s.chart);
      }

      /* 表格 */
      if (s.table && s.table.rows && s.table.rows.length) {
        resultBox.appendChild(buildTable(s.table));
      }

      /* 註記 */
      if (s.notes && s.notes.length) {
        var notesCard = D.el('section', { class: 'card' }, [
          D.el('div', { class: 'section-title' }, [D.icon('info'), D.el('span', { text: '計算假設與提醒' })]),
          D.el('ul', { class: 'notes-list' }, s.notes.map(function (n) {
            return D.el('li', {}, [D.icon('check'), D.el('span', { text: n })]);
          }))
        ]);
        resultBox.appendChild(notesCard);
      }
    }

    function buildTable(spec) {
      var box = D.el('div', { class: 'table-box' });
      var table = D.el('table', { class: 'calc-table' });
      var nCols = spec.cols.length || 1;
      var colgroup = D.el('colgroup');
      if (spec.colWidths && spec.colWidths.length === nCols) {
        spec.colWidths.forEach(function (w) { colgroup.appendChild(D.el('col', { style: 'width:' + w + '%' })); });
      } else {
        var w = 100 / nCols;
        for (var i = 0; i < nCols; i++) colgroup.appendChild(D.el('col', { style: 'width:' + w.toFixed(2) + '%' }));
      }
      var thead = D.el('thead');
      var hr = D.el('tr');
      spec.cols.forEach(function (c) { hr.appendChild(D.el('th', { text: c })); });
      thead.appendChild(hr);
      var tbody = D.el('tbody');
      spec.rows.forEach(function (r) {
        var tr = D.el('tr');
        for (var j = 0; j < nCols; j++) {
          tr.appendChild(D.el('td', { text: formatCell(r[j], spec.colFormats[j]) }));
        }
        tbody.appendChild(tr);
      });
      table.appendChild(colgroup);
      table.appendChild(thead);
      table.appendChild(tbody);
      box.appendChild(table);
      return box;
    }

    function buildResultText(res) {
      var lines = [];
      lines.push('【' + t.name + '】試算結果');
      res.cards.forEach(function (c) {
        lines.push(c.label + '：' + F.fmt(c.value, c.format || 'text') + (c.sub ? '（' + c.sub + '）' : ''));
      });
      if (res.notes && res.notes.length) {
        lines.push('—');
        res.notes.forEach(function (n) { lines.push('・' + n); });
      }
      return lines.join('\n');
    }

    function copyResult() {
      if (!lastResult) { D.toast('尚無可複製的結果。', 'err'); return; }
      var done = function () { D.toast('結果已複製到剪貼簿。', 'ok'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lastResult).then(done, function () { fallbackCopy(done); });
      } else fallbackCopy(done);
    }
    function fallbackCopy(done) {
      var ta = document.createElement('textarea');
      ta.value = lastResult;
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { D.toast('複製失敗，請手動選取。', 'err'); }
      document.body.removeChild(ta);
    }
  }

  /* ---------- 事件 ---------- */
  window.addEventListener('hashchange', route);

  $menuBtn.addEventListener('click', openSidebar);
  $backdrop.addEventListener('click', closeSidebar);

  /* 頂欄搜尋：即時篩選側欄 */
  var searchTimer = null;
  $search.addEventListener('input', function () {
    var q = $search.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.search = q;
      renderSidebar();
    }, 120);
  });

  /* 主題切換：單一手動日夜切換（預設白天，不跟隨系統） */
  var themeToggle = document.getElementById('themeToggle');
  function syncThemeUI() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', TH.current() === 'dark' ? 'true' : 'false');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      TH.set(TH.current() === 'dark' ? 'light' : 'dark');
      syncThemeUI();
    });
  }
  document.addEventListener('recalc:theme', syncThemeUI);

  /* 鍵盤：Esc 關閉側欄 */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  /* 啟動 */
  if (!location.hash) {
    /* 首頁：不寫 hash，直接渲染 */
    route();
  } else {
    route();
  }
})(typeof window !== 'undefined' ? window : globalThis);
