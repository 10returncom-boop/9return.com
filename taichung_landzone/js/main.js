/* ============================================================
   台中重劃區與建案指南 — 全站互動（唯一 JS，合併所有頁面）
   依賴：search-index.js 提供的 RZ_SITE/RZ_COUNTIES/RZ_ZONES/TC_PROJECTS/RZ_SEARCH_INDEX/RZ_ORDER
   純原生 JS，無框架、無外部 CDN；file:// 下可全功能運作。
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 工具 ---------- */
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var LS = window.localStorage;
  var getLS = function (k, d) { try { var v = LS.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
  var setLS = function (k, v) { try { LS.setItem(k, JSON.stringify(v)); } catch (e) { } };
  /* 是否位於 zones/ 或 projects/ 子目錄（含各 index.html） */
  var inSub = location.pathname.indexOf('/zones/') !== -1 || location.pathname.indexOf('/projects/') !== -1;
  /* 圖片基準路徑：子目錄頁用 ../images/，根目錄頁用 images/ */
  var IMG_BASE = inSub ? '../images/' : 'images/';

  /* 站內目標路徑：子目錄頁面需 ../ 前綴，根目錄頁不需 */
  var ZPRE = inSub ? '../' : '';
  /* 正規化圖片路徑：容許資料裡誤帶的 leading "images/"，再統一接上 IMG_BASE */
  function imgSrc(img) {
    if (!img) return '';
    if (img.indexOf('http') === 0) return img;
    return IMG_BASE + img.replace(/^images\//, '');
  }
  function zh(u) {
    if (!ZPRE) return u;
    if (u.indexOf('zones/') === 0 || u.indexOf('projects/') === 0 ||
        u === 'index.html' || u === 'all_zone_search.html' || u === 'favorite_zone_list.html' ||
        u === 'about_rezone_guide.html') return ZPRE + u;
    return u;
  }

  /* ---------- Toast ---------- */
  var toastWrap = null;
  function toast(msg, ms) {
    if (!toastWrap) { toastWrap = document.createElement('div'); toastWrap.className = 'toast-wrap'; document.body.appendChild(toastWrap); }
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
    toastWrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 250); }, ms || 2400);
  }

  /* ---------- 主題（白天預設／夜晚／跟隨系統，localStorage 記憶） ---------- */
  var THEME_KEY = 'rz-theme';
  function applyTheme(mode) {
    var real = mode;
    if (mode === 'system') { real = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
    document.documentElement.setAttribute('data-theme', real);
    var m = $('meta[name="theme-color"]');
    if (m) { m.setAttribute('content', real === 'dark' ? '#14181D' : (RZ_SITE ? RZ_SITE.themeColor : '#0E6B5C')); }
    $$('[data-theme-btn]').forEach(function (b) {
      var v = b.getAttribute('data-theme-btn');
      b.setAttribute('aria-checked', String(v === mode));
      b.classList.toggle('on', v === mode);
    });
  }
  function initTheme() {
    var saved = getLS(THEME_KEY, null);
    var mode = saved === 'dark' || saved === 'light' || saved === 'system' ? saved : 'light';
    applyTheme(mode);
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (getLS(THEME_KEY, 'light') === 'system') applyTheme('system');
      });
    }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-theme-btn]');
    if (b) { var v = b.getAttribute('data-theme-btn'); setLS(THEME_KEY, v); applyTheme(v); toast(v === 'light' ? '已切換為白天模式' : v === 'dark' ? '已切換為夜晚模式' : '已切換為跟隨系統'); }
  });
  initTheme();

  /* ---------- Mega 選單／下拉／浮層 ---------- */
  document.addEventListener('click', function (e) {
    var mega = e.target.closest('.mega');
    if (mega) {
      if (e.target.closest('[data-mega-trigger], .mega-trigger')) { var wasOpen = mega.classList.contains('open'); $$('.mega.open').forEach(function (m) { m.classList.remove('open'); }); if (!wasOpen) mega.classList.add('open'); return; }
      if (e.target.closest('.mega-panel')) return;
    }
    var dd = e.target.closest('.dd');
    if (dd) {
      if (e.target.closest('[data-dd-toggle]')) { var was = dd.classList.contains('open'); $$('.dd.open').forEach(function (d) { d.classList.remove('open'); }); if (!was) dd.classList.add('open'); return; }
      if (e.target.closest('.dd-panel')) return;
    }
    var pp = e.target.closest('[data-popover-trigger]');
    if (pp) {
      var panel = document.getElementById(pp.getAttribute('aria-controls'));
      if (panel) {
        var open = panel.classList.contains('open');
        $$('.popover.open').forEach(function (p) { p.classList.remove('open'); });
        if (!open) {
          panel.classList.add('open');
          var r = pp.getBoundingClientRect();
          panel.style.left = Math.min(r.left, window.innerWidth - panel.offsetWidth - 10) + 'px';
          panel.style.top = (r.bottom + 6) + 'px';
        }
        return;
      }
    }
    /* 點外部關閉所有浮層 */
    if (!e.target.closest('.mega') && !e.target.closest('.dd') && !e.target.closest('.popover')) {
      $$('.mega.open').forEach(function (m) { m.classList.remove('open'); });
      $$('.dd.open').forEach(function (d) { d.classList.remove('open'); });
      $$('.popover.open').forEach(function (p) { p.classList.remove('open'); });
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { $$('.mega.open,.dd.open,.popover.open,.drawer.open').forEach(function (n) { n.classList.remove('open'); }); closeDrawer(); }
  });

  /* ---------- 漢堡選單／抽屜 ---------- */
  var drawer = $('.drawer'), backdrop = $('.drawer-backdrop');
  function closeDrawer() { if (drawer) drawer.classList.remove('open'); if (backdrop) backdrop.classList.remove('open'); }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.hamburger')) { var open = drawer && drawer.classList.contains('open'); if (drawer) drawer.classList.toggle('open', !open); if (backdrop) backdrop.classList.toggle('open', !open); }
    if (e.target.closest('.drawer-backdrop')) closeDrawer();
    if (e.target.closest('.drawer a')) closeDrawer();
  });

  /* ---------- 手風琴 ---------- */
  function initAccordion(root) {
    $$('.acc-item', root).forEach(function (item) {
      var head = $('.acc-head', item);
      if (!head) return;
      head.setAttribute('aria-expanded', String(item.classList.contains('open')));
      head.addEventListener('click', function () {
        var body = $('.acc-body', item);
        var acc = item.closest('.accordion');
        var single = acc && acc.hasAttribute('data-single');
        var isOpen = item.classList.contains('open');
        if (single) { $$('.acc-item.open', acc).forEach(function (o) { o.classList.remove('open'); var b = $('.acc-body', o); if (b) b.style.maxHeight = null; var h = $('.acc-head', o); if (h) h.setAttribute('aria-expanded', 'false'); }); }
        item.classList.toggle('open', !isOpen);
        head.setAttribute('aria-expanded', String(!isOpen));
        if (body) body.style.maxHeight = !isOpen ? body.scrollHeight + 'px' : null;
      });
      var body = $('.acc-body', item);
      if (body && item.classList.contains('open')) body.style.maxHeight = body.scrollHeight + 'px';
    });
  }
  initAccordion(document);

  /* ---------- 頁籤 ---------- */
  $$('.tabs').forEach(function (tabs) {
    var btns = $$('.tab-btn', tabs), panels = $$('.tab-panel', tabs);
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () {
        btns.forEach(function (x, j) { x.setAttribute('aria-selected', String(j === i)); });
        panels.forEach(function (p, j) { p.hidden = j !== i; });
      });
    });
  });

  /* ---------- 樹狀圖 ---------- */
  $$('.tree-branch').forEach(function (br) {
    var tg = $('.tree-toggle', br);
    if (tg) tg.addEventListener('click', function () { br.classList.toggle('collapsed'); tg.setAttribute('aria-expanded', String(!br.classList.contains('collapsed'))); });
  });

  /* ---------- TOC（側欄目錄＋滾動偵測） ---------- */
  $$('[data-toc]').forEach(function (toc) {
    var scope = $(toc.getAttribute('data-toc')) || document;
    var list = $('ul', toc);
    if (!list) return;
    var items = $$('h2[id], h3[id]', scope);
    items.forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      if (h.tagName === 'H3') { a.className = 'toc-h3'; li.className = 'toc-li3'; }
      li.appendChild(a); list.appendChild(li);
    });
    var links = $$('a', list);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
          }
        });
      }, { rootMargin: '-70px 0px -65% 0px' });
      items.forEach(function (h) { io.observe(h); });
    }
  });

  /* ---------- 全站搜尋＋自動完成 ---------- */
  var suggestCache = {};
  function matchIndex(q) {
    if (!q) return [];
    q = q.trim().toLowerCase();
    if (suggestCache[q]) return suggestCache[q];
    var hits = RZ_SEARCH_INDEX.filter(function (z) {
      var hay = (z.title + ' ' + z.desc + ' ' + (z.keywords || []).join(' ') + ' ' + (z.tags || []).join(' ') + ' ' + z.countyLabel).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    suggestCache[q] = hits;
    return hits;
  }
  $$('[data-search]').forEach(function (input) {
    var box = input.closest('.searchbox') || input.parentElement;
    var sug = document.createElement('div'); sug.className = 'suggest'; box.appendChild(sug);
    var activeIdx = -1, lastQ = '';
    function close() { sug.classList.remove('open'); activeIdx = -1; }
    input.addEventListener('focus', function () { if (lastQ && matchIndex(lastQ).length) { sug.classList.add('open'); } });
    input.addEventListener('input', function () {
      var q = input.value; lastQ = q;
      var hits = matchIndex(q).slice(0, 7);
      if (!hits.length) { close(); return; }
      sug.innerHTML = '';
      hits.forEach(function (z, i) {
        var d = document.createElement('div');
        d.className = 'suggest-item' + (i === activeIdx ? ' active' : '');
        d.setAttribute('data-url', zh(z.url));
        d.innerHTML = '<span class="s-t"></span><span class="s-d"></span>';
        $('.s-t', d).textContent = z.h1 || z.title;
        $('.s-d', d).textContent = (z.countyLabel ? z.countyLabel + ' · ' : '') + z.desc;
        d.addEventListener('mousedown', function (ev) { ev.preventDefault(); window.location.href = zh(z.url); });
        d.addEventListener('mouseenter', function () { $$('.suggest-item', sug).forEach(function (x, j) { x.classList.toggle('active', j === i); }); activeIdx = i; });
        sug.appendChild(d);
      });
      sug.classList.add('open');
    });
    input.addEventListener('keydown', function (e) {
      var items = $$('.suggest-item', sug);
      if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, items.length - 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); }
      else if (e.key === 'Enter') {
        if (activeIdx >= 0 && items[activeIdx]) { window.location.href = items[activeIdx].getAttribute('data-url'); return; }
        e.preventDefault();
        var q = encodeURIComponent(input.value.trim());
        window.location.href = zh('all_zone_search.html') + (q ? '?q=' + q : '');
        return;
      } else if (e.key === 'Escape') { close(); return; }
      items.forEach(function (x, j) { x.classList.toggle('active', j === activeIdx); });
      if (items[activeIdx]) items[activeIdx].scrollIntoView({ block: 'nearest' });
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) close(); });
  });

  /* ---------- 多面向篩選（首頁卡片 + 搜尋頁共用） ---------- */
  function zoneFilters() {
    var params = new URLSearchParams(window.location.search);
    var f = {
      q: params.get('q') || '',
      county: params.get('county') || params.get('district') || '',
      dev: params.get('dev') || '',
      tag: params.get('tag') || '',
      zone: params.get('zone') || ''
    };
    return f;
  }
  function filterMatches(z, f) {
    if (f.q) { var hay = (z.title + ' ' + z.desc + ' ' + (z.keywords || []).join(' ') + ' ' + (z.tags || []).join(' ') + ' ' + (z.countyLabel || '') + ' ' + (z.zoneLabel || '')).toLowerCase(); if (hay.indexOf(f.q.toLowerCase()) === -1) return false; }
    if (f.county && z.county !== f.county) return false;
    if (f.dev && z.dev !== f.dev) return false;
    if (f.tag && (z.tags || []).indexOf(f.tag) === -1) return false;
    if (f.zone && z.zone !== f.zone) return false;
    return true;
  }
  /* 把目前篩選狀態寫回網址列（county 為主，district 為別名） */
  function syncFilterUrl(f) {
    var url = new URL(window.location.href);
    ['q', 'dev', 'tag', 'zone'].forEach(function (k) { if (f[k]) url.searchParams.set(k, f[k]); else url.searchParams.delete(k); });
    if (f.county) { url.searchParams.set('county', f.county); url.searchParams.delete('district'); }
    else { url.searchParams.delete('county'); }
    history.replaceState(null, '', url);
  }
  /* 重劃區卡片（卡面：img／行政區徽章＋開發方式／標題／摘要／標籤） */
  function zoneCardEl(z) {
    var a = document.createElement('a'); a.className = 'card-zone'; a.href = zh(z.url);
    var tags = (z.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    a.innerHTML = '<div class="card-media"><img src="' + imgSrc(z.img) + '" alt="" loading="lazy"></div>' +
      '<div class="card-body"><div class="flex"><span class="county-badge tag"></span><span class="dev-badge tag"></span></div>' +
      '<h3 class="card-title"></h3><p class="card-desc"></p><div class="card-meta">' + tags + '</div></div>';
    $('.card-media img', a).alt = z.desc || z.h1 || '';
    $('.county-badge', a).textContent = z.countyLabel || '台中市';
    $('.dev-badge', a).textContent = z.dev || '重劃區';
    $('.card-title', a).textContent = z.h1 || z.title;
    $('.card-desc', a).textContent = z.desc || '';
    return a;
  }
  /* 建案卡片（卡面：img／所屬重劃區徽章＋建商／標題／摘要／標籤） */
  function projCardEl(p) {
    var a = document.createElement('a'); a.className = 'card-zone'; a.href = zh(p.url);
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    a.innerHTML = '<div class="card-media"><img src="' + imgSrc(p.img) + '" alt="" loading="lazy"></div>' +
      '<div class="card-body"><div class="flex"><span class="county-badge tag"></span><span class="dev-badge tag"></span></div>' +
      '<h3 class="card-title"></h3><p class="card-desc"></p><div class="card-meta">' + tags + '</div></div>';
    $('.card-media img', a).alt = p.desc || p.h1 || '';
    $('.county-badge', a).textContent = p.zoneLabel || '建案';
    $('.dev-badge', a).textContent = p.builder || p.countyLabel || '';
    $('.card-title', a).textContent = p.h1 || p.title;
    $('.card-desc', a).textContent = p.desc || '';
    return a;
  }
  /* 重劃區卡片牆（首頁 / zones 索引）：由 RZ_ZONES 動態渲染 + 篩選 */
  var cardGrid = $('[data-cards]');
  if (cardGrid) {
    var f = zoneFilters();
    function renderCards() {
      cardGrid.innerHTML = '';
      var hits = RZ_ZONES.filter(function (z) { return filterMatches(z, f); });
      hits.forEach(function (z) { cardGrid.appendChild(zoneCardEl(z)); });
      var ec = $('.empty-state', cardGrid.parentElement);
      if (ec) ec.hidden = hits.length !== 0;
    }
    document.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-facet]');
      if (chip) {
        var k = chip.getAttribute('data-facet'), v = chip.getAttribute('data-value');
        f[k] = f[k] === v ? '' : v;
        syncFilterUrl(f); renderCards();
        return;
      }
      var cl = e.target.closest('[data-facet-clear]');
      if (cl) { f = { q: f.q, county: '', dev: '', tag: '', zone: '' }; $$('[data-facet]', cardGrid.parentElement).forEach(function (c) { c.classList.remove('on'); }); history.replaceState(null, '', window.location.pathname); renderCards(); }
    });
    $$('[data-facet]', cardGrid.parentElement).forEach(function (c) {
      var k = c.getAttribute('data-facet'), v = c.getAttribute('data-value');
      if ((k === 'county' && v === f.county) || (k === 'dev' && v === f.dev) || (k === 'tag' && v === f.tag)) c.classList.add('on');
    });
    renderCards();
  }
  /* 建案卡片牆（projects 索引）：由 TC_PROJECTS 動態渲染 + 篩選（county=行政區／tag／zone=所屬重劃區） */
  var pcardGrid = $('[data-pcards]');
  if (pcardGrid) {
    var pf = zoneFilters();
    function projMatches(p) {
      if (pf.q) { var hay = (p.title + ' ' + p.desc + ' ' + (p.keywords || []).join(' ') + ' ' + (p.tags || []).join(' ') + ' ' + (p.zoneLabel || '') + ' ' + (p.countyLabel || '')).toLowerCase(); if (hay.indexOf(pf.q.toLowerCase()) === -1) return false; }
      if (pf.county && p.county !== pf.county) return false;
      if (pf.tag && (p.tags || []).indexOf(pf.tag) === -1) return false;
      if (pf.zone && p.zone !== pf.zone) return false;
      return true;
    }
    function renderPcards() {
      pcardGrid.innerHTML = '';
      var hits = TC_PROJECTS.filter(projMatches);
      hits.forEach(function (p) { pcardGrid.appendChild(projCardEl(p)); });
      var ec = $('.empty-state', pcardGrid.parentElement);
      if (ec) ec.hidden = hits.length !== 0;
    }
    document.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-facet]');
      if (chip) {
        var k = chip.getAttribute('data-facet'), v = chip.getAttribute('data-value');
        pf[k] = pf[k] === v ? '' : v;
        syncFilterUrl(pf); renderPcards();
        return;
      }
      var cl = e.target.closest('[data-facet-clear]');
      if (cl) { pf = { q: pf.q, county: '', dev: '', tag: '', zone: '' }; $$('[data-facet]', pcardGrid.parentElement).forEach(function (c) { c.classList.remove('on'); }); history.replaceState(null, '', window.location.pathname); renderPcards(); }
    });
    $$('[data-facet]', pcardGrid.parentElement).forEach(function (c) {
      var k = c.getAttribute('data-facet'), v = c.getAttribute('data-value');
      if ((k === 'county' && v === pf.county) || (k === 'tag' && v === pf.tag) || (k === 'zone' && v === pf.zone)) c.classList.add('on');
    });
    renderPcards();
  }

  /* ---------- 相關文章 / 前後篇 / 最新文章 / 標籤雲 ---------- */
  $$('[data-related]').forEach(function (box) {
    var cur = box.getAttribute('data-related');
    var z = RZ_ZONES.filter(function (x) { return x.id === cur; })[0];
    if (!z) return;
    var pool = RZ_ZONES.filter(function (x) { return x.id !== cur; });
    var same = pool.filter(function (x) { return x.county === z.county; });
    var scored = same.map(function (x) {
      var s = 1 + (x.tags || []).filter(function (t) { return (z.tags || []).indexOf(t) !== -1; }).length * 2;
      return { x: x, s: s };
    }).sort(function (a, b) { return b.s - a.s; }).map(function (o) { return o.x; });
    var rest = pool.filter(function (x) { return same.indexOf(x) === -1; });
    var picks = scored.concat(rest).slice(0, 3);
    box.innerHTML = '';
    picks.forEach(function (p) {
      var a = document.createElement('a'); a.className = 'mini-card'; a.href = zh(p.url);
      a.innerHTML = '<div class="mc-img"><img src="' + imgSrc(p.img) + '" alt="' + (p.desc || '') + '" loading="lazy"></div><div class="mc-body"><div class="mc-t"></div><div class="mc-m"></div></div>';
      $('.mc-t', a).textContent = p.h1;
      $('.mc-m', a).textContent = p.countyLabel + ' · ' + p.dev;
      box.appendChild(a);
    });
  });
  function findOrderIdx(id) { var i = RZ_ORDER.indexOf(id); return i; }
  $$('[data-prev][data-next]').forEach(function (wrap) {
    var id = wrap.getAttribute('data-current');
    var prevA = $('[data-prev]', wrap), nextA = $('[data-next]', wrap);
    var zi = findOrderIdx(id);
    if (zi !== -1) {
      /* 重劃區頁：在 RZ_ZONES 順序中前後切換 */
      if (prevA) {
        if (zi > 0) { var p = RZ_ZONES[zi - 1]; prevA.href = zh(p.url); $('.pn-title', prevA).textContent = p.h1; }
        else { prevA.href = zh('index.html'); $('.pn-title', prevA).textContent = '回首頁｜重劃區總覽'; }
      }
      if (nextA) {
        if (zi < RZ_ZONES.length - 1) { var n = RZ_ZONES[zi + 1]; nextA.href = zh(n.url); $('.pn-title', nextA).textContent = n.h1; }
        else { nextA.href = zh('all_zone_search.html'); $('.pn-title', nextA).textContent = '全站搜尋下一站'; }
      }
    } else {
      /* 建案頁：在 TC_PROJECTS 順序中前後切換，頭尾接建案總覽 */
      var pi = (typeof TC_PROJECTS !== 'undefined') ? TC_PROJECTS.findIndex(function (x) { return x.id === id; }) : -1;
      if (prevA) {
        if (pi > 0) { var pp = TC_PROJECTS[pi - 1]; prevA.href = zh(pp.url); $('.pn-title', prevA).textContent = pp.h1; }
        else { prevA.href = zh('projects/index.html'); $('.pn-title', prevA).textContent = '建案總覽'; }
      }
      if (nextA) {
        if (pi >= 0 && pi < TC_PROJECTS.length - 1) { var nn = TC_PROJECTS[pi + 1]; nextA.href = zh(nn.url); $('.pn-title', nextA).textContent = nn.h1; }
        else { nextA.href = zh('projects/index.html'); $('.pn-title', nextA).textContent = '建案總覽'; }
      }
    }
  });
  $$('[data-latest]').forEach(function (box) {
    var n = parseInt(box.getAttribute('data-latest'), 10) || 8;
    box.innerHTML = '';
    RZ_ZONES.slice(0, n).forEach(function (z) {
      var li = document.createElement('li');
      li.innerHTML = '<img class="ll-img" src="' + imgSrc(z.img) + '" alt="" loading="lazy"><div><a href="' + zh(z.url) + '"></a><span class="ll-meta"></span></div>';
      $('a', li).textContent = z.h1;
      $('.ll-meta', li).textContent = z.countyLabel + ' · ' + z.dev;
      box.appendChild(li);
    });
  });
  $$('[data-tagcloud]').forEach(function (box) {
    var counts = {};
    RZ_ZONES.forEach(function (z) { (z.tags || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; }); });
    var sorted = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; });
    box.innerHTML = '';
    sorted.forEach(function (t) {
      var a = document.createElement('a');
      a.className = 'tag' + (counts[t] >= 4 ? ' tag-lg' : '');
      a.href = zh('index.html') + '?tag=' + encodeURIComponent(t);
      a.textContent = t + ' ' + counts[t];
      box.appendChild(a);
    });
  });

  /* ---------- Treemap（SVG，縣市→重劃區） ---------- */
  $$('[data-treemap]').forEach(function (box) {
    var w = 260, h = 340;
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', '台中重劃區行政區分布圖');
    var groups = RZ_COUNTIES.map(function (c) { return { c: c, zones: RZ_ZONES.filter(function (z) { return z.county === c.key; }) }; });
    var top = 0;
    groups.forEach(function (g) {
      var gh = g.zones.length === 0 ? 34 : 34 + g.zones.length * 44;
      var rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', 0); rect.setAttribute('y', top); rect.setAttribute('width', w); rect.setAttribute('height', gh - 6);
      rect.setAttribute('rx', '4'); rect.setAttribute('fill', 'var(--c-' + g.c.key + ')'); rect.setAttribute('opacity', '0.16');
      svg.appendChild(rect);
      var label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', 8); label.setAttribute('y', top + 21); label.setAttribute('font-size', '12'); label.setAttribute('font-weight', '700');
      label.setAttribute('fill', 'var(--c-' + g.c.key + ')');
      label.textContent = g.c.label + '（' + g.zones.length + ' 區）';
      svg.appendChild(label);
      g.zones.forEach(function (z, i) {
        var cy = top + 34 + i * 44;
        var cell = document.createElementNS(svgNS, 'g');
        cell.setAttribute('class', 'tm-cell');
        cell.setAttribute('tabindex', '0');
        cell.setAttribute('role', 'link');
        cell.setAttribute('aria-label', z.h1);
        var cr = document.createElementNS(svgNS, 'rect');
        cr.setAttribute('x', 8); cr.setAttribute('y', cy - 10); cr.setAttribute('width', w - 16); cr.setAttribute('height', 34);
        cr.setAttribute('rx', '5'); cr.setAttribute('fill', 'var(--c-' + g.c.key + ')'); cr.setAttribute('opacity', '0.32');
        cell.appendChild(cr);
        var t = document.createElementNS(svgNS, 'text');
        t.setAttribute('x', 16); t.setAttribute('y', cy + 10); t.setAttribute('font-size', '11.5'); t.setAttribute('fill', '#fff');
        t.textContent = z.h1;
        cell.appendChild(t);
        cell.addEventListener('click', function () { window.location.href = zh(z.url); });
        cell.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = zh(z.url); });
        svg.appendChild(cell);
      });
      top += gh;
    });
    box.appendChild(svg);
  });

  /* ---------- 知識圖譜（SVG：台中重劃區→9 行政區→各重劃區，另含建案節點） ---------- */
  $$('[data-kg]').forEach(function (box) {
    var w = 960, h = 440;
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', '台中重劃區知識圖譜');
    var cx = w / 2, cy = 56;
    var center = document.createElementNS(svgNS, 'g');
    var cc = document.createElementNS(svgNS, 'circle');
    cc.setAttribute('cx', cx); cc.setAttribute('cy', cy); cc.setAttribute('r', '26'); cc.setAttribute('fill', 'var(--accent)');
    center.appendChild(cc);
    var ct = document.createElementNS(svgNS, 'text');
    ct.setAttribute('x', cx); ct.setAttribute('y', cy + 4); ct.setAttribute('text-anchor', 'middle'); ct.setAttribute('font-size', '10.5'); ct.setAttribute('font-weight', '700'); ct.setAttribute('fill', 'var(--accent-ink)');
    ct.textContent = '台中\n重劃區';
    center.appendChild(ct);
    svg.appendChild(center);
    var countyPos = {
      xitun: { x: 90, y: 150 }, nantun: { x: 250, y: 150 }, beitun: { x: 410, y: 150 },
      south: { x: 560, y: 150 }, east: { x: 660, y: 150 }, wuri: { x: 760, y: 150 },
      taiping: { x: 130, y: 300 }, dali: { x: 290, y: 300 }, shalu: { x: 450, y: 300 },
      fengyuan: { x: 610, y: 300 }, projects: { x: 790, y: 300 }
    };
    RZ_COUNTIES.forEach(function (c) {
      var p = countyPos[c.key];
      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy); line.setAttribute('x2', p.x); line.setAttribute('y2', p.y);
      line.setAttribute('stroke', 'var(--c-' + c.key + ')'); line.setAttribute('stroke-width', '1.4'); line.setAttribute('opacity', '0.55');
      svg.appendChild(line);
      var g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'kg-node');
      g.setAttribute('role', 'link'); g.setAttribute('tabindex', '0');
      g.setAttribute('aria-label', c.label);
      var circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y); circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'var(--c-' + c.key + ')'); circle.setAttribute('stroke', 'var(--surface)'); circle.setAttribute('stroke-width', '2');
      g.appendChild(circle);
      var t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', p.y + 4); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '10'); t.setAttribute('fill', '#fff');
      t.textContent = c.label;
      g.appendChild(t);
      g.addEventListener('click', function () { window.location.href = zh('index.html') + '?county=' + c.key; });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = zh('index.html') + '?county=' + c.key; });
      svg.appendChild(g);
      var zones = RZ_ZONES.filter(function (z) { return z.county === c.key; });
      zones.forEach(function (z, i) {
        var zx = p.x + (i - (zones.length - 1) / 2) * 62;
        var zy = p.y + 46;
        var zline = document.createElementNS(svgNS, 'line');
        zline.setAttribute('x1', p.x); zline.setAttribute('y1', p.y + 18); zline.setAttribute('x2', zx); zline.setAttribute('y2', zy - 9);
        zline.setAttribute('stroke', 'var(--line)'); zline.setAttribute('stroke-width', '1');
        svg.appendChild(zline);
        var zg = document.createElementNS(svgNS, 'g');
        zg.setAttribute('class', 'kg-node'); zg.setAttribute('role', 'link'); zg.setAttribute('tabindex', '0'); zg.setAttribute('aria-label', z.h1);
        var zc = document.createElementNS(svgNS, 'circle');
        zc.setAttribute('cx', zx); zc.setAttribute('cy', zy); zc.setAttribute('r', '9');
        zc.setAttribute('fill', 'var(--c-' + c.key + ')'); zc.setAttribute('opacity', '0.8');
        zg.appendChild(zc);
        zg.addEventListener('click', function () { window.location.href = zh(z.url); });
        zg.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = zh(z.url); });
        svg.appendChild(zg);
      });
    });
    /* 建案節點：接往建案總覽 */
    (function () {
      var p = countyPos.projects;
      var line = document.createElementNS(svgNS, 'line');
      line.setAttribute('x1', cx); line.setAttribute('y1', cy); line.setAttribute('x2', p.x); line.setAttribute('y2', p.y);
      line.setAttribute('stroke', 'var(--c-projects)'); line.setAttribute('stroke-width', '1.4'); line.setAttribute('opacity', '0.55');
      svg.appendChild(line);
      var g = document.createElementNS(svgNS, 'g');
      g.setAttribute('class', 'kg-node'); g.setAttribute('role', 'link'); g.setAttribute('tabindex', '0'); g.setAttribute('aria-label', '建案總覽');
      var circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y); circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'var(--c-projects)'); circle.setAttribute('stroke', 'var(--surface)'); circle.setAttribute('stroke-width', '2');
      g.appendChild(circle);
      var t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', p.x); t.setAttribute('y', p.y + 4); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', '10'); t.setAttribute('fill', '#fff');
      t.textContent = '建案';
      g.appendChild(t);
      g.addEventListener('click', function () { window.location.href = zh('projects/index.html'); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter') window.location.href = zh('projects/index.html'); });
      svg.appendChild(g);
    })();
    box.appendChild(svg);
  });

  /* ---------- 收藏清單 ---------- */
  var FAV_KEY = 'rz-favs';
  function getFavs() { return getLS(FAV_KEY, []); }
  function saveFavs(v) { setLS(FAV_KEY, v); }
  function favOf(id) { return getFavs().indexOf(id) !== -1; }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-fav]');
    if (!b) return;
    var id = b.getAttribute('data-fav');
    var favs = getFavs();
    var on = favs.indexOf(id) === -1;
    if (on) { favs.push(id); saveFavs(favs); toast('已加入收藏清單'); }
    else { saveFavs(favs.filter(function (x) { return x !== id; })); toast('已從收藏移除'); }
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', String(on));
    var n = $('[data-fav-count]');
    if (n) n.textContent = favs.length;
    var ev = new CustomEvent('rz:favchange', { detail: favs });
    document.dispatchEvent(ev);
  });
  $$('[data-fav]').forEach(function (b) {
    var on = favOf(b.getAttribute('data-fav'));
    b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on));
  });
  var favCountEl = $('[data-fav-count]');
  if (favCountEl) favCountEl.textContent = getFavs().length;
  /* 收藏清單頁 */
  var favList = $('[data-favlist]');
  if (favList) {
    function renderFavs() {
      var favs = getFavs();
      favList.innerHTML = '';
      if (!favs.length) {
        favList.innerHTML = '<div class="empty-state"><div class="es-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/></svg></div><p>還沒有收藏任何重劃區或建案。<br>在每個重劃區／建案頁面點「收藏」按鈕，就會出現在這裡。</p><a class="btn btn-accent" href="index.html">去逛台中重劃區</a></div>';
        return;
      }
      favs.forEach(function (id) {
        var z = RZ_ZONES.filter(function (x) { return x.id === id; })[0];
        var p = z ? null : (typeof TC_PROJECTS !== 'undefined' ? TC_PROJECTS.filter(function (x) { return x.id === id; })[0] : null);
        if (!z && !p) return;
        var item = z || p;
        var a = document.createElement('a'); a.className = 'mini-card'; a.href = zh(item.url);
        a.innerHTML = '<div class="mc-img"><img src="' + imgSrc(item.img) + '" alt="" loading="lazy"></div><div class="mc-body"><div class="mc-t"></div><div class="mc-m"></div></div>';
        $('.mc-t', a).textContent = item.h1;
        $('.mc-m', a).textContent = z ? (z.countyLabel + ' · ' + z.dev) : (item.zoneLabel + ' · ' + (item.builder || '建案'));
        var row = document.createElement('div'); row.className = 'flex spread';
        var cell = document.createElement('div');
        row.appendChild(a);
        var rm = document.createElement('button'); rm.className = 'btn btn-sm btn-ghost'; rm.type = 'button'; rm.textContent = '移除';
        rm.addEventListener('click', function () { saveFavs(getFavs().filter(function (x) { return x !== id; })); renderFavs(); toast('已移除收藏'); });
        cell.appendChild(rm);
        row.appendChild(cell);
        favList.appendChild(row);
      });
    }
    renderFavs();
    document.addEventListener('rz:favchange', renderFavs);
  }

  /* ---------- 自訂右鍵選單（Context Menu）＋防複製 ---------- */
  function copyFallback(cb) {
    var ta = document.createElement('textarea');
    ta.value = window.location.href; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) { }
    ta.remove(); cb && cb();
  }
  var ctx = $('.context-menu');
  if (ctx) {
    var COPY_PROTECT_KEY = 'rz-copynotice';
    document.addEventListener('contextmenu', function (e) {
      if (e.target.closest('input, textarea, select, .context-menu')) return;
      e.preventDefault();
      var x = e.clientX, y = e.clientY;
      ctx.innerHTML = '';
      var items = [
        { label: '收藏此頁', act: function () { var fav = $('[data-fav]'); if (fav) fav.click(); else toast('此頁無法收藏'); } },
        { label: '複製本頁網址', act: function () {
          var done = function () { toast('網址已複製'); };
          if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(window.location.href).then(done, function () { copyFallback(done); }); } else { copyFallback(done); }
        } },
        { label: '回上頁', act: function () { history.back(); } },
        { label: '回首頁', act: function () { window.location.href = zh('index.html'); } }
      ];
      items.forEach(function (it) {
        var b = document.createElement('button'); b.type = 'button'; b.textContent = it.label;
        b.addEventListener('click', function () { ctx.classList.remove('open'); it.act(); });
        ctx.appendChild(b);
      });
      var r = ctx.getBoundingClientRect();
      ctx.style.left = Math.min(x, window.innerWidth - r.width - 8) + 'px';
      ctx.style.top = Math.min(y, window.innerHeight - r.height - 8) + 'px';
      ctx.classList.add('open');
    });
    document.addEventListener('click', function () { ctx.classList.remove('open'); });
    document.addEventListener('copy', function (e) {
      var p = $('.protected');
      if (p && p.contains(e.target)) {
        if (!getLS(COPY_PROTECT_KEY, false)) { setLS(COPY_PROTECT_KEY, true); toast('本站內容受保護，僅供個人參考閱讀'); }
        e.preventDefault();
      }
    });
  }

  /* ---------- FAB 群（回上頁／回首頁／回到頂部） ---------- */
  var backTop = $('[data-backtop]');
  var fabBack = $('[data-fab-back]');
  var fabHome = $('[data-fab-home]');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (backTop) backTop.hidden = y < 600;
    var h = $('.site-header');
    if (h) h.classList.toggle('scrolled', y > 4);
  }
  if (backTop) backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  if (fabBack) fabBack.addEventListener('click', function () { if (history.length > 1) history.back(); else window.location.href = zh('index.html'); });
  if (fabHome) fabHome.addEventListener('click', function () { window.location.href = zh('index.html'); });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 漸現／圖片淡入（lazy-load-adv） ---------- */
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    $$('.reveal').forEach(function (el) { ro.observe(el); });
    var imgWrap = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var img = $('img', en.target);
          if (img && img.getAttribute('data-src')) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
          en.target.classList.add('loaded'); imgWrap.unobserve(en.target);
        }
      });
    }, { rootMargin: '120px' });
    $$('.img-lazy').forEach(function (el) { imgWrap.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    $$('.img-lazy img[data-src]').forEach(function (img) { img.src = img.getAttribute('data-src'); });
  }

  /* ---------- 表單（訂閱／註冊／聯絡，真實 handler＋toast） ---------- */
  $$('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', form).forEach(function (f) {
        var field = f.closest('.field');
        var val = f.value.trim();
        var bad = !val || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
        if (field) field.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) { toast('請檢查必填欄位'); return; }
      var type = form.getAttribute('data-form');
      var recs = getLS('rz-forms', []);
      recs.push({ type: type, at: new Date().toISOString(), email: ($('[type="email"]', form) || { value: '' }).value });
      setLS('rz-forms', recs);
      form.reset();
      toast(type === 'subscribe' ? '訂閱成功（靜態示範，未連接後端）' : type === 'register' ? '註冊已送出（靜態示範）' : '訊息已送出（靜態示範，未連接後端）');
    });
  });

  /* ---------- 頁面內目標錨點平滑捲動 ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a) {
      var id = a.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); history.replaceState(null, '', '#' + id); }
    }
  });

  /* ---------- 搜尋結果頁（all_zone_search.html） ---------- */
  var resultsBox = $('[data-results]');
  if (resultsBox) {
    var PER = 9, page = 1;
    var state = zoneFilters();
    var facetCounty = $('[data-facet-county]'), facetDev = $('[data-facet-dev]');
    if (facetCounty) facetCounty.value = state.county;
    if (facetDev) facetDev.value = state.dev;
    var qInput = $('[data-search-q]');
    if (qInput) qInput.value = state.q;
    function render() {
      var hits = RZ_SEARCH_INDEX.filter(function (z) { return filterMatches(z, state); });
      var total = hits.length;
      var pages = Math.max(1, Math.ceil(total / PER));
      page = Math.min(page, pages);
      var slice = hits.slice((page - 1) * PER, page * PER);
      resultsBox.innerHTML = '';
      var cnt = $('.result-count');
      if (cnt) cnt.textContent = '找到 ' + total + ' 筆結果';
      if (!total) { resultsBox.innerHTML = '<div class="empty-state"><div class="es-ico"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></div><p>沒有符合條件的重劃區或建案，試試放寬行政區或關鍵字。</p></div>'; }
      slice.forEach(function (z) {
        var row = document.createElement('article'); row.className = 'card-zone result-row';
        row.innerHTML = '<div class="rr-img"><img src="' + imgSrc(z.img) + '" alt="" loading="lazy"></div>' +
          '<div class="card-body"><div class="flex"><span class="county-badge tag"></span><span class="dev-badge tag"></span></div><h3 class="card-title"><a href="' + zh(z.url) + '"></a></h3><p class="card-desc"></p>' +
          '<div class="card-meta"></div></div>';
        $('.county-badge', row).textContent = z.countyLabel || z.zoneLabel || '本站';
        $('.dev-badge', row).textContent = z.dev || z.zoneLabel || '建案';
        $('.card-title a', row).textContent = z.h1;
        $('.card-desc', row).textContent = z.desc;
        $('.card-meta', row).innerHTML = (z.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
        resultsBox.appendChild(row);
      });
      var pg = $('[data-pagination]');
      if (pg) {
        pg.innerHTML = '';
        var mk = function (label, p, disabled, current) {
          var b = document.createElement('button'); b.className = 'page-btn'; b.type = 'button';
          b.textContent = label; if (disabled) b.disabled = true; if (current) b.setAttribute('aria-current', 'page');
          b.addEventListener('click', function () { page = p; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
          pg.appendChild(b);
        };
        mk('‹ 上一頁', page - 1, page === 1);
        for (var p = 1; p <= pages; p++) mk(String(p), p, false, p === page);
        mk('下一頁 ›', page + 1, page === pages);
      }
      var url = new URL(window.location.href);
      ['q', 'dev', 'tag'].forEach(function (k) { if (state[k]) url.searchParams.set(k, state[k]); else url.searchParams.delete(k); });
      if (state.county) { url.searchParams.set('county', state.county); url.searchParams.delete('district'); }
      else { url.searchParams.delete('county'); }
      history.replaceState(null, '', url);
    }
    if (facetCounty) facetCounty.addEventListener('change', function () { state.county = facetCounty.value; page = 1; render(); });
    if (facetDev) facetDev.addEventListener('change', function () { state.dev = facetDev.value; page = 1; render(); });
    if (qInput) qInput.addEventListener('input', function () { state.q = qInput.value; page = 1; render(); });
    document.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-tagfacet]');
      if (chip) { state.tag = state.tag === chip.getAttribute('data-tagfacet') ? '' : chip.getAttribute('data-tagfacet'); page = 1; render(); }
      var cl = e.target.closest('[data-clearall]');
      if (cl) { state = { q: '', county: '', dev: '', tag: '' }; if (facetCounty) facetCounty.value = ''; if (facetDev) facetDev.value = ''; if (qInput) qInput.value = ''; page = 1; render(); }
    });
    render();
  }
})();
