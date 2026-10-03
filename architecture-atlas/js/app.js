/* ============================================================
   app.js — 世界建築史 · Architecture Atlas 主應用
   整合：3 檢視、100 篇文章閱讀、60 大功能、雙語、主題、快捷鍵
   ============================================================ */
(function () {
  'use strict';
  var C = window.SiteConfig, U = window.Utils, $ = U.$, $$ = U.$$, el = U.el;
  var SS = window.StorageService, TS = window.ThemeService, DS = window.DataService, ES = window.ExportService;

  /* ============================================================
     雙語 i18n
     ============================================================ */
  var I18N = {
    zh: {
      allArticles:'全部建築', favorites:'我的最愛', recent:'最近造訪', timeline:'時間軸', sitemap:'網站地圖',
      stats:'分類統計', random:'隨機文章', search:'搜尋建築、風格、建築師…', card:'卡片', list:'清單', map:'地圖',
      all:'全部', cat:'分類', style:'風格', region:'區域', sort:'排序', reset:'重設',
      readMin:'分鐘閱讀', featured:'精選', summary:'摘要', body:'內文', buildings:'代表建築', architects:'相關建築師',
      terms:'專業名詞', related:'相關文章', prev:'上一篇', next:'下一篇', keywords:'關鍵字',
      favEmpty:'尚未收藏任何建築，點卡片上的 ♥ 即可收藏。', recentEmpty:'還沒有瀏覽紀錄。', empty:'沒有符合條件的結果。',
      back:'回首頁', settings:'設定', featuresMap:'60 大功能地圖', quickJump:'快速跳轉', exportCSV:'匯出 CSV', exportJSON:'匯出 JSON',
      copyProtectOn:'防複製：開', copyProtectOff:'防複製：關', copied:'已複製', settingsSaved:'設定已儲存', clearHistory:'清除紀錄',
      themeCombo:'主題組合', themeMode:'日夜模式', light:'淺色', dark:'深色', system:'跟隨系統', fontSize:'字級', density:'版面密度',
      comfort:'舒適', compact:'緊湊', accent:'強調色', comboPaper:'米紙', comboSlate:'岩板', comboForest:'松柏',
      aboutTitle:'關於本站', aboutBody:'世界建築史 Architecture Atlas · V2.0 — 100 篇專業內文、30 種風格、60 大功能。資料採模組化（config/service/utils），全靜態、可離線開啟。'
    },
    en: {
      allArticles:'All Buildings', favorites:'Favorites', recent:'Recent', timeline:'Timeline', sitemap:'Sitemap',
      stats:'Category Stats', random:'Random', search:'Search buildings, styles, architects…', card:'Card', list:'List', map:'Map',
      all:'All', cat:'Category', style:'Style', region:'Region', sort:'Sort', reset:'Reset',
      readMin:'min read', featured:'Featured', summary:'Summary', body:'Article', buildings:'Key Buildings', architects:'Architects',
      terms:'Glossary', related:'Related', prev:'Previous', next:'Next', keywords:'Keywords',
      favEmpty:'No favorites yet. Tap ♥ on a card to save it.', recentEmpty:'No visit history yet.', empty:'No matching results.',
      back:'Home', settings:'Settings', featuresMap:'60 Features Map', quickJump:'Quick Jump', exportCSV:'Export CSV', exportJSON:'Export JSON',
      copyProtectOn:'Copy Protect: On', copyProtectOff:'Copy Protect: Off', copied:'Copied', settingsSaved:'Settings saved', clearHistory:'Clear history',
      themeCombo:'Theme Combo', themeMode:'Mode', light:'Light', dark:'Dark', system:'System', fontSize:'Font Size', density:'Density',
      comfort:'Comfort', compact:'Compact', accent:'Accent', comboPaper:'Paper', comboSlate:'Slate', comboForest:'Forest',
      aboutTitle:'About', aboutBody:'Architecture Atlas · V2.0 — 100 articles, 30 styles, 60 features. Modular, static, offline-ready.'
    }
  };
  var T;
  function tr (k) { return (T && T[k]) ? T[k] : (I18N.zh[k] || k); }
  function refreshLang () {
    var s = SS.getSettings();
    T = I18N[s.lang === 'en' ? 'en' : 'zh'];
    TS.applyLang(s.lang);
  }

  /* ============================================================
     State
     ============================================================ */
  var state = {
    view: 'home',       // home/fav/recent/timeline/map/stats
    viewMode: 'card',   // card/list/map/timeline
    filters: { q:'', cat:'all', style:'all', region:'all', era:'all', sort:'default', favOnly:false },
    currentArticle: null
  };

  /* ============================================================
     路由：hash
     ============================================================ */
  function parseHash () {
    var h = window.location.hash || '#/';
    if (h.indexOf('#/article/') === 0) {
      var id = parseInt(h.split('#/article/')[1], 10);
      return { type: 'article', id: id };
    }
    return { type: 'home' };
  }
  function route () {
    var r = parseHash();
    if (r.type === 'article') {
      var a = DS.getArticle(r.id);
      if (a) { renderArticle(a); return; }
    }
    resetSEO();
    renderHome();
  }
  function goArticle (id) {
    SS.recordVisit(id);
    U.setHash('#/article/' + id);
    window.scrollTo(0, 0);
  }
  function goHome () { U.setHash('#/'); }

  /* ============================================================
     麵包屑
     ============================================================ */
  function setBreadcrumb (items) {
    var bc = $('#breadcrumb'); bc.innerHTML = '';
    var home = el('a', { href:'#/', text: tr('back') });
    bc.appendChild(home);
    items.forEach(function (it, i) {
      bc.appendChild(el('span', { class:'sep', text:' › ' }));
      if (i === items.length - 1) bc.appendChild(el('span', { class:'here', text: (typeof it === 'string') ? it : (it.text || '') }));
      else bc.appendChild(el('a', { href: it.link || '#/', text: it.text || it }));
    });
  }

  /* ============================================================
     卡片 / 清單 / 地圖 / 時間軸渲染
     ============================================================ */
  function catName (id) {
    var c = C.categories.find(function (x) { return x.id === id; });
    return c ? c.zh + '（' + c.en + '）' : id;
  }
  /* 風格中文 → 「中文（en）」，查詢表 ARCH_STYLES */
  function styleName (zh) {
    var s = (window.ARCH_STYLES || []).find(function (x) { return x.zh === zh; });
    return s ? zh + '（' + s.en + '）' : zh;
  }
  /* 區域中文 → 「中文（en）」，查詢表 SiteConfig.regions */
  function regionName (zh) {
    var r = C.regions.find(function (x) { return x.zh === zh; });
    return (r && r.en) ? zh + '（' + r.en + '）' : zh;
  }
  function articleMeta (a) {
    return [a.style, a.era, a.region].join(' · ');
  }
  function buildCard (a) {
    var card = el('div', {
      class: 'card reveal' + (a.featured ? ' featured' : ''),
      onclick: function () { goArticle(a.id); }
    });
    if (a.featured) card.appendChild(el('span', { class:'ribbon', text:'精選' }));
    var imgWrap = el('div', { style: { overflow:'hidden' } });
    imgWrap.appendChild(el('img', { src: a.img, alt: a.title + ' — ' + a.style, loading:'lazy' }));
    card.appendChild(imgWrap);
    var body = el('div', { class:'card-body' });
    body.appendChild(el('div', { class:'card-title', text: a.title }));
    if (a.en) body.appendChild(el('div', { class:'card-en', text: a.en }));
    var meta = el('div', { class:'card-meta' });
    meta.appendChild(el('span', { class:'tag accent', text: catName(a.cat) }));
    meta.appendChild(el('span', { class:'tag', text: styleName(a.style) }));
    meta.appendChild(el('span', { class:'tag', text: a.era }));
    body.appendChild(meta);
    /* Breathe Clamp 摘要 */
    body.appendChild(U.createBreatheClamp(a.summary, 3));
    var foot = el('div', { class:'card-foot' });
    foot.appendChild(el('span', { class:'read', html:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 4.9 5.5.6-4.1 3.9 1.1 5.4L12 14.1l-4.9 2.7 1.1-5.4L4.1 7.5l5.5-.6z"/></svg>' +
      (a.milestone || a.summary) }));
    var fav = el('button', {
      class:'fav-btn' + (SS.isFav(a.id) ? ' on' : ''),
      title:'收藏', 'aria-label':'收藏',
      onclick: function (e) {
        e.stopPropagation();
        var on = SS.toggleFav(a.id);
        this.classList.toggle('on', on);
        $('#favCount').textContent = SS.getFavs().length;
        U.toast(on ? '已加入最愛' : '已移除最愛', on ? 'ok' : '');
      }
    });
    fav.innerHTML = '<svg viewBox="0 0 24 24" fill="' + (SS.isFav(a.id) ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z"/></svg>';
    foot.appendChild(fav);
    body.appendChild(foot);
    card.appendChild(body);
    return card;
  }

  function renderGridView (list) {
    var c = $('#content'); c.innerHTML = '';
    if (!list.length) { c.appendChild(emptyState()); return; }
    var grid = el('div', { class:'grid' });
    list.forEach(function (a) { grid.appendChild(buildCard(a)); });
    c.appendChild(grid);
    U.observeReveal($$('.reveal'));
  }

  function renderListView (list) {
    var c = $('#content'); c.innerHTML = '';
    if (!list.length) { c.appendChild(emptyState()); return; }
    var lv = el('div', { class:'list-view' });
    list.forEach(function (a, i) {
      var item = el('div', {
        class:'list-item reveal',
        onclick: function () { goArticle(a.id); }
      });
      item.appendChild(el('span', { class:'idx', text: String(i + 1).padStart(2,'0') }));
      var t = el('div', { class:'li-title', text: a.title });
      t.appendChild(el('small', { text: (a.en ? a.en + ' · ' : '') + styleName(a.style) + ' · ' + catName(a.cat) }));
      item.appendChild(t);
      item.appendChild(el('span', { class:'li-meta', text: a.era + ' · ' + a.region }));
      lv.appendChild(item);
    });
    c.appendChild(lv);
    U.observeReveal($$('.reveal'));
  }

  function renderMapView (list) {
    var c = $('#content'); c.innerHTML = '';
    var mv = el('div', { class:'map-view' });
    C.categories.forEach(function (cat) {
      var items = list.filter(function (a) { return a.cat === cat.id; });
      if (!items.length) return;
      var node = el('div', { class:'map-node reveal' });
      node.appendChild(el('h4', { html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/></svg>' + catName(cat.id) + ' <small>' + items.length + '</small>' }));
      var ul = el('ul');
      items.forEach(function (a) {
        var li = el('li', { onclick: function () { goArticle(a.id); } });
        li.appendChild(el('span', { text: a.title }));
        li.appendChild(el('small', { text: (a.en ? a.en + ' · ' : '') + a.era }));
        ul.appendChild(li);
      });
      node.appendChild(ul);
      mv.appendChild(node);
    });
    c.appendChild(mv);
    U.observeReveal($$('.reveal'));
  }

  function renderTimelineView (list) {
    var c = $('#content'); c.innerHTML = '';
    var sorted = list.slice().sort(function (a, b) {
      return (parseInt(a.era, 10) || 0) - (parseInt(b.era, 10) || 0);
    });
    var tl = el('div', { class:'timeline' });
    sorted.forEach(function (a) {
      var item = el('div', { class:'tl-item reveal' });
      item.appendChild(el('div', { class:'tl-era', text: a.era }));
      var card = el('div', { class:'tl-card', onclick: function () { goArticle(a.id); } });
      card.appendChild(el('b', { text: a.title }));
      if (a.en) card.appendChild(el('div', { class:'tl-en', text: a.en }));
      card.appendChild(el('div', { class:'tag accent', text: catName(a.cat) }));
      card.appendChild(U.createBreatheClamp(a.summary, 2));
      item.appendChild(card);
      tl.appendChild(item);
    });
    c.appendChild(tl);
    U.observeReveal($$('.reveal'));
  }

  function renderStatsView () {
    var c = $('#content'); c.innerHTML = '';
    var stats = DS.statsByCat();
    var sc = DS.styleCount();
    var wrap = el('div');
    /* 分類統計卡片 */
    var sg = el('div', { class:'stat-grid' });
    C.categories.forEach(function (cat) {
      var n = stats[cat.id] ? stats[cat.id].count : 0;
      var box = el('div', { class:'stat-box reveal' });
      box.appendChild(el('b', { text: String(n) }));
      box.appendChild(el('span', { text: catName(cat.id) }));
      sg.appendChild(box);
    });
    wrap.appendChild(el('h2', { html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg> 分類統計' }));
    wrap.appendChild(sg);
    /* 總計 */
    wrap.appendChild(el('p', { html: '<b>' + DS.getAll().length + '</b> 篇文章 · <b>' + C.categories.length + '</b> 大分類 · <b>' + DS.getStyles().length + '</b> 種風格', class:'noindent' }));
    /* 風格分佈進度條 */
    wrap.appendChild(el('h2', { html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="9"/></svg> 風格分佈' }));
    var total = DS.getAll().length;
    Object.keys(sc).sort(function (a, b) { return sc[b] - sc[a]; }).forEach(function (st) {
      var row = el('div', { style:{ marginBottom:'8px' } });
      row.appendChild(el('div', { html: '<span style="font-size:13px;font-family:sans-serif">' + styleName(st) + '</span> <small style="float:right;color:var(--ink2)">' + sc[st] + '</small>' }));
      var bar = el('div', { class:'bar' });
      bar.appendChild(el('i', { style: { width: (sc[st] / total * 100) + '%' } }));
      row.appendChild(bar);
      wrap.appendChild(row);
    });
    wrap.appendChild(el('p', { text: '— 依時代脈絡與地理分布所規劃的完整建築史地圖。', class:'noindent' }));
    c.appendChild(wrap);
    U.observeReveal($$('.reveal'));
  }

  function renderFavView () {
    var favs = SS.getFavs();
    var list = favs.map(function (id) { return DS.getArticle(id); }).filter(Boolean);
    if (!list.length) { $('#content').innerHTML = ''; $('#content').appendChild(emptyState(tr('favEmpty'))); return; }
    renderByMode(list);
  }
  function renderRecentView () {
    var h = SS.getHistory();
    var list = h.map(function (id) { return DS.getArticle(id); }).filter(Boolean);
    if (!list.length) { $('#content').innerHTML = ''; $('#content').appendChild(emptyState(tr('recentEmpty'))); return; }
    renderByMode(list);
  }

  function renderByMode (list) {
    if (state.viewMode === 'list') renderListView(list);
    else if (state.viewMode === 'map') renderMapView(list);
    else if (state.viewMode === 'timeline') renderTimelineView(list);
    else renderGridView(list);
  }

  function emptyState (msg) {
    var d = el('div', { class:'empty' });
    d.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg><p>' + (msg || tr('empty')) + '</p>';
    return d;
  }

  /* ============================================================
     首頁（含篩選）
     ============================================================ */
  function renderHome () {
    state.view = 'home';
    setBreadcrumb([{ text:'首頁' }]);
    var list = DS.filter(state.filters);
    renderByMode(list);
  }

  /* ============================================================
     文章閱讀器
     ============================================================ */
  /* ============================================================
     SEO / AEO / GEO — 每篇文章動態 title、meta、OG、canonical、JSON-LD
     ============================================================ */
  function setMeta (attr, key, content) {
    var sel = attr === 'name' ? 'meta[name="' + key + '"]' : 'meta[property="' + key + '"]';
    var m = document.querySelector(sel);
    if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); }
    m.setAttribute('content', content);
  }
  function setJSONLD (obj) {
    var s = document.getElementById('seo-jsonld');
    if (!s) { s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'seo-jsonld'; document.head.appendChild(s); }
    s.textContent = JSON.stringify(obj);
  }
  function updateArticleSEO (a) {
    var url = 'index.html#/article/' + a.id;
    var desc = (a.summary || '').slice(0, 150);
    document.title = a.title + '｜世界建築史 Architecture Atlas';
    setMeta('name', 'description', desc);
    setMeta('name', 'keywords', (a.keywords || []).join(', '));
    setMeta('property', 'og:title', a.title);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:url', url);
    if (a.img) setMeta('property', 'og:image', a.img);
    var canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; document.head.appendChild(canon); }
    canon.href = url;
    var faq = (a.terms || []).map(function (tt) {
      return { '@type': 'Question', name: '什麼是「' + tt.t + '」？', acceptedAnswer: { '@type': 'Answer', text: tt.d } };
    });
    setJSONLD({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: a.title, description: a.summary, inLanguage: 'zh-Hant', mainEntityOfPage: url,
        author: { '@type': 'Organization', name: '世界建築史 Architecture Atlas' },
        publisher: { '@type': 'Organization', name: '世界建築史 Architecture Atlas' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: '世界建築史', item: 'index.html' },
        { '@type': 'ListItem', position: 2, name: a.title } ] },
      { '@type': 'FAQPage', mainEntity: faq }
    ] });
  }
  function resetSEO () {
    document.title = '世界建築史 · Architecture Atlas｜100 篇專業內文 · 60 大功能';
    setMeta('name', 'description', '世界建築史 Architecture Atlas：100 篇專業內文、30 種建築風格、60 大功能。從古埃及金字塔、希臘神殿、羅馬穹頂、哥德教堂到參數化建築的完整建築史知識庫。');
    var s = document.getElementById('seo-jsonld');
    if (s) s.textContent = '';
  }

  function renderArticle (a) {
    state.currentArticle = a;
    SS.recordVisit(a.id);
    $('#favCount').textContent = SS.getFavs().length;
    setBreadcrumb([{ text: tr('allArticles'), link:'#/' }, a.title]);
    updateArticleSEO(a);

    var c = $('#content'); c.innerHTML = '';
    var wrap = el('div', { class:'article-wrap' });

    /* Hero */
    var hero = el('div', { class:'article-hero' });
    hero.appendChild(el('img', { src: a.img, alt: a.title, onclick: function(){ openLightbox(a.img, a.title); } }));
    var ov = el('div', { class:'overlay' });
    ov.appendChild(el('h1', { text: a.title }));
    if (a.en) ov.appendChild(el('div', { style:{ color:'#ddd', fontSize:'14px' }, text: a.en }));
    hero.appendChild(ov);
    wrap.appendChild(hero);

    /* Meta tags */
    var metaRow = el('div', { class:'chip-list' });
    metaRow.appendChild(el('span', { class:'badge', text: catName(a.cat) }));
    metaRow.appendChild(el('span', { class:'tag accent', text: styleName(a.style) }));
    metaRow.appendChild(el('span', { class:'tag', text: a.era }));
    metaRow.appendChild(el('span', { class:'tag', text: regionName(a.region) }));
    a.keywords.forEach(function (k) { metaRow.appendChild(el('span', { class:'tag', text:'#' + k })); });
    wrap.appendChild(metaRow);

    /* 文章工具列（複製/列印/分享/最愛） */
    var tools = el('div', { class:'article-tools' });
    tools.appendChild(el('button', { class:'btn', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>複製', onclick: function(){ ES.copyArticle(a); } }));
    tools.appendChild(el('button', { class:'btn', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>列印', onclick: function(){ ES.printArticle(a); } }));
    tools.appendChild(el('button', { class:'btn', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>分享', onclick: function(){ ES.shareLink(a); } }));
    var favBtn = el('button', { class:'btn', html: (SS.isFav(a.id) ? '★ 已收藏' : '☆ 收藏'),
      onclick: function(){
        var on = SS.toggleFav(a.id);
        this.innerHTML = on ? '★ 已收藏' : '☆ 收藏';
        $('#favCount').textContent = SS.getFavs().length;
        U.toast(on ? '已加入最愛' : '已移除最愛', on ? 'ok' : '');
      } });
    tools.appendChild(favBtn);
    tools.appendChild(el('button', { class:'btn', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1"/></svg>' + U.readMinutes(a.summary + a.body.join('')) + ' ' + tr('readMin'), onclick:function(){} }));
    wrap.appendChild(tools);

    /* 主體 + TOC 布局 */
    var grid = el('div', { class:'layout', style:{ gridTemplateColumns:'220px 1fr', padding:'0' } });

    /* TOC */
    var toc = el('div', { class:'toc' });
    toc.appendChild(el('h4', { html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M7 6h.01M7 12h.01M7 18h.01"/></svg>文章目錄' }));
    var tocItems = [[tr('summary'),'#sec-summary'],[tr('body'),'#sec-body'],[tr('buildings'),'#sec-buildings'],[tr('architects'),'#sec-architects'],[tr('terms'),'#sec-terms'],[tr('related'),'#sec-related']];
    tocItems.forEach(function (it) { toc.appendChild(el('a', { href: it[1], text: it[0] })); });
    grid.appendChild(toc);

    /* Body */
    var bodyWrap = el('div', { class:'article-body' });
    bodyWrap.appendChild(el('div', { id:'sec-summary', class:'article-summary', text: a.summary }));

    bodyWrap.appendChild(el('h2', { id:'sec-body', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16M4 12h16M4 19h10"/></svg>' + tr('body') }));
    a.body.forEach(function (p) {
      bodyWrap.appendChild(el('p', { text: p }));
    });

    /* 代表建築 */
    bodyWrap.appendChild(el('h2', { id:'sec-buildings', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg>' + tr('buildings') }));
    var kb = el('div', { class:'key-buildings' });
    a.buildings.forEach(function (b, i) {
      var ben = (a.buildingsEn || [])[i] || '';
      kb.appendChild(el('div', { class:'kb-item', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V9l9-6 9 6v12"/></svg><span>' + b + (ben ? '<small>' + ben + '</small>' : '') + '</span>' }));
    });
    bodyWrap.appendChild(kb);

    /* 建築師 */
    bodyWrap.appendChild(el('h2', { id:'sec-architects', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>' + tr('architects') }));
    var ar = el('div', { class:'key-buildings' });
    a.architects.forEach(function (x, i) {
      var xen = (a.architectsEn || [])[i] || '';
      ar.appendChild(el('div', { class:'kb-item', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/></svg><span>' + x + (xen ? '<small>' + xen + '</small>' : '') + '</span>' }));
    });
    bodyWrap.appendChild(ar);

    /* 專業名詞（Breathe Clamp + tooltip）— 中英文對照 */
    function glossTerm (t) {
      var en = (window.ARCH_GLOSSARY || {})[t.t] || '';
      if (en && t.t.indexOf(en) === -1) return t.t + '（' + en + '）';
      return t.t;
    }
    bodyWrap.appendChild(el('h2', { id:'sec-terms', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>' + tr('terms') }));
    a.terms.forEach(function (t) {
      var acc = el('div', { class:'accordion-item' });
      acc.appendChild(el('button', { class:'accordion-head', html:'<span>' + glossTerm(t) + '</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>',
        onclick: function(){ this.parentElement.classList.toggle('open'); } }));
      var body = el('div', { class:'accordion-body' });
      body.appendChild(el('div', { class:'accordion-body-inner', text: t.d }));
      acc.appendChild(body);
      bodyWrap.appendChild(acc);
    });

    /* 資料表格 */
    bodyWrap.appendChild(el('h2', { html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18v14H3z"/><path d="M3 9h18M3 15h18M9 9v14"/></svg>建築資訊' }));
    var table = el('table', { class:'data-table' });
    table.innerHTML = '<colgroup><col style="width:30%"><col style="width:70%"></colgroup>' +
      '<tr><th>項目</th><th>內容</th></tr>' +
      '<tr><td>名稱</td><td>' + a.title + (a.en ? '（' + a.en + '）' : '') + '</td></tr>' +
      '<tr><td>建築風格</td><td>' + styleName(a.style) + '</td></tr>' +
      '<tr><td>年代</td><td>' + a.era + '</td></tr>' +
      '<tr><td>區域</td><td>' + regionName(a.region) + '</td></tr>' +
      '<tr><td>分類</td><td>' + catName(a.cat) + '</td></tr>';
    bodyWrap.appendChild(table);

    bodyWrap.appendChild(el('h2', { id:'sec-related', html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12a5 5 0 0 1 5-5h8"/><path d="M13 3l4 4-4 4"/></svg>' + tr('related') }));
    var rel = el('div', { class:'related' });
    DS.related(a.id, 3).forEach(function (r) { rel.appendChild(buildCard(r)); });
    bodyWrap.appendChild(rel);

    grid.appendChild(bodyWrap);
    wrap.appendChild(grid);

    /* 上一篇 / 下一篇 */
    var all = DS.getAll();
    var idx = all.findIndex(function (x) { return x.id === a.id; });
    var pn = el('div', { class:'prevnext' });
    if (idx > 0) {
      var p = all[idx - 1];
      pn.appendChild(el('a', { href:'#/article/' + p.id, html:'<span class="dir">← ' + tr('prev') + '</span>' + p.title }));
    } else pn.appendChild(el('a', { style:{ visibility:'hidden' } }));
    if (idx < all.length - 1) {
      var n = all[idx + 1];
      pn.appendChild(el('a', { class:'right', href:'#/article/' + n.id, html:'<span class="dir">' + tr('next') + ' →</span>' + n.title }));
    } else pn.appendChild(el('a', { style:{ visibility:'hidden' } }));
    wrap.appendChild(pn);

    c.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  /* ============================================================
     Lightbox
     ============================================================ */
  function openLightbox (src, cap) {
    $('#lightboxImg').src = src;
    $('#lightboxCap').textContent = cap || '';
    $('#lightbox').classList.add('open');
  }
  function closeLightbox () { $('#lightbox').classList.remove('open'); }

  /* ============================================================
     Modal 工具
     ============================================================ */
  function openModal (title, bodyEl) {
    $('#modalTitle').innerHTML = title;
    var b = $('#modalBody'); b.innerHTML = '';
    b.appendChild(bodyEl);
    $('#modalMask').classList.add('open');
  }
  function closeModal () { $('#modalMask').classList.remove('open'); }

  /* ---- 設定 Modal（主題/字級/密度/強調色）---- */
  function renderSettingsModal () {
    var s = SS.getSettings();
    var wrap = el('div');
    /* 主題組合 */
    wrap.appendChild(el('h3', { style:{ margin:'6px 0', fontSize:'15px' }, text: tr('themeCombo') }));
    var comboGrp = el('div', { class:'btn-group' });
    [['paper', tr('comboPaper')], ['slate', tr('comboSlate')], ['forest', tr('comboForest')]].forEach(function (p) {
      var b = el('button', { class:'btn' + (s.themeCombo === p[0] ? ' primary' : ''), text: p[1], onclick: function () {
        SS.saveSettings({ themeCombo: p[0] });
        TS.applyTheme(p[0], SS.getSettings().themeMode);
        U.toast(tr('settingsSaved'), 'ok'); closeModal(); renderSettingsModal();
      } });
      comboGrp.appendChild(b);
    });
    wrap.appendChild(comboGrp);
    /* 日夜 */
    wrap.appendChild(el('h3', { style:{ margin:'14px 0 6px', fontSize:'15px' }, text: tr('themeMode') }));
    var modeGrp = el('div', { class:'btn-group' });
    [['light', tr('light')], ['dark', tr('dark')], ['system', tr('system')]].forEach(function (m) {
      var b = el('button', { class:'btn' + (s.themeMode === m[0] ? ' primary' : ''), text: m[1], onclick: function () {
        SS.saveSettings({ themeMode: m[0] });
        TS.applyTheme(SS.getSettings().themeCombo, m[0]);
        U.toast(tr('settingsSaved'), 'ok'); closeModal(); renderSettingsModal();
      } });
      modeGrp.appendChild(b);
    });
    wrap.appendChild(modeGrp);
    /* 字級 */
    wrap.appendChild(el('h3', { style:{ margin:'14px 0 6px', fontSize:'15px' }, text: tr('fontSize') + '：' + s.fontSize + 'px' }));
    var fsGrp = el('div', { class:'btn-group' });
    fsGrp.appendChild(el('button', { class:'btn', text:'A-', onclick: function () {
      var ns = Math.max(C.fontSize.min, s.fontSize - C.fontSize.step);
      SS.saveSettings({ fontSize: ns }); TS.applyFontSize(ns); closeModal(); renderSettingsModal();
    } }));
    fsGrp.appendChild(el('button', { class:'btn', text:'A+', onclick: function () {
      var ns = Math.min(C.fontSize.max, s.fontSize + C.fontSize.step);
      SS.saveSettings({ fontSize: ns }); TS.applyFontSize(ns); closeModal(); renderSettingsModal();
    } }));
    wrap.appendChild(fsGrp);
    /* 密度 */
    wrap.appendChild(el('h3', { style:{ margin:'14px 0 6px', fontSize:'15px' }, text: tr('density') }));
    var denGrp = el('div', { class:'btn-group' });
    [['comfort', tr('comfort')], ['compact', tr('compact')]].forEach(function (d) {
      var b = el('button', { class:'btn' + (s.density === d[0] ? ' primary' : ''), text: d[1], onclick: function () {
        SS.saveSettings({ density: d[0] }); TS.applyDensity(d[0]); U.toast(tr('settingsSaved'), 'ok'); closeModal(); renderSettingsModal();
      } });
      denGrp.appendChild(b);
    });
    wrap.appendChild(denGrp);
    /* 強調色 */
    wrap.appendChild(el('h3', { style:{ margin:'14px 0 6px', fontSize:'15px' }, text: tr('accent') }));
    var accGrp = el('div', { class:'btn-group' });
    ['#8b5a2b','#2c5f8a','#3f6b3a','#8a3324','#6b3fa0','#b03a48'].forEach(function (hx) {
      var sw = el('button', { style:{ width:'34px', height:'34px', borderRadius:'8px', background:hx, border:'2px solid ' + (s.accent === hx ? 'var(--accent2)' : 'var(--border)') }, onclick: function () {
        SS.saveSettings({ accent: hx }); TS.applyAccent(hx); U.toast(tr('settingsSaved'), 'ok'); closeModal(); renderSettingsModal();
      } });
      accGrp.appendChild(sw);
    });
    var noneB = el('button', { class:'btn', text:'預設', onclick: function () {
      SS.saveSettings({ accent: '' }); TS.applyAccent(''); U.toast(tr('settingsSaved'), 'ok'); closeModal(); renderSettingsModal();
    } });
    accGrp.appendChild(noneB);
    wrap.appendChild(accGrp);
    /* 關於 */
    wrap.appendChild(el('h3', { style:{ margin:'14px 0 6px', fontSize:'15px' }, text: tr('aboutTitle') }));
    wrap.appendChild(el('p', { class:'noindent', text: tr('aboutBody') }));
    openModal('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg> ' + tr('settings'), wrap);
  }

  /* ---- 60 功能地圖 Modal ---- */
  function renderFeaturesModal () {
    var wrap = el('div');
    var byGrp = {};
    C.features.forEach(function (f) {
      if (!byGrp[f.grp]) byGrp[f.grp] = [];
      byGrp[f.grp].push(f);
    });
    var grid = el('div', { class:'feature-grid' });
    Object.keys(byGrp).forEach(function (grp) {
      grid.appendChild(el('div', { style:{ gridColumn:'1/-1', marginTop:'4px' }, html:'<b style="color:var(--accent);font-family:sans-serif">' + grp + '</b>' }));
      byGrp[grp].forEach(function (f) {
        grid.appendChild(el('div', { class:'feature-item',
          html:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><div><b>' + f.zh + '</b><span>' + f.en + ' — ' + f.desc + '</span></div>' }));
      });
    });
    wrap.appendChild(grid);
    openModal('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 2 8l10 5 10-5z"/><path d="M2 12l10 5 10-5"/><path d="M2 16l10 5 10-5"/></svg> ' + tr('featuresMap') + '（' + C.features.length + '）', wrap);
  }

  /* ---- 快速跳轉 Modal ---- */
  function renderQuickJump () {
    var wrap = el('div');
    var input = el('input', { class:'search-box', type:'search', placeholder: tr('search'), style:{ width:'100%', padding:'10px', border:'1px solid var(--border)', borderRadius:'8px' } });
    wrap.appendChild(input);
    var listWrap = el('div', { style:{ marginTop:'10px', maxHeight:'50vh', overflow:'auto' } });
    var articles = DS.getAll();
    function paint (q) {
      listWrap.innerHTML = '';
      var list = q ? DS.search(q) : articles.slice(0, 30);
      list.forEach(function (a) {
        var it = el('div', { class:'list-item', style:{ cursor:'pointer' }, onclick: function () { closeModal(); goArticle(a.id); } });
        it.appendChild(el('span', { class:'li-title', text: a.title }));
        it.appendChild(el('span', { class:'li-meta', text: a.era }));
        listWrap.appendChild(it);
      });
    }
    input.addEventListener('input', U.debounce(function () { paint(input.value); }, 150));
    paint('');
    wrap.appendChild(listWrap);
    openModal('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg> ' + tr('quickJump'), wrap);
    setTimeout(function () { input.focus(); }, 60);
  }

  /* ============================================================
     分類橫幅、篩選初始化
     ============================================================ */
  function initFilters () {
    var catSel = $('#filterCat'), styleSel = $('#filterStyle'), regSel = $('#filterRegion');
    C.categories.forEach(function (cat) { catSel.appendChild(el('option', { value: cat.id, text: cat.zh + ' ' + cat.en })); });
    DS.getStyles().forEach(function (s) { styleSel.appendChild(el('option', { value: s.zh, text: s.zh + ' ' + s.en })); });
    C.regions.forEach(function (r) { regSel.appendChild(el('option', { value: r.zh, text: r.zh + ' ' + (r.en || '') })); });

    /* 分類橫幅 */
    var strip = $('#catStrip');
    strip.appendChild(el('button', { class:'cat-pill active', html:'全部 <b>' + DS.getAll().length + '</b>', onclick: function () {
      state.filters.cat = 'all'; paintCatStrip(); $('#filterCat').value = 'all'; refresh();
    } }));
    C.categories.forEach(function (cat) {
      var n = (DS.statsByCat()[cat.id] || {}).count || 0;
      var b = el('button', { class:'cat-pill', html: cat.zh + ' <b>' + n + '</b>', onclick: function () {
        state.filters.cat = cat.id; paintCatStrip(); $('#filterCat').value = cat.id; refresh();
      } });
      strip.appendChild(b);
    });
    function paintCatStrip () {
      $$('#catStrip .cat-pill').forEach(function (b, i) {
        var isAll = (i === 0);
        b.classList.toggle('active', isAll ? state.filters.cat === 'all' : state.filters.cat === C.categories[i - 1].id);
      });
    }

    $('#searchInput').addEventListener('input', U.debounce(function () {
      state.filters.q = $('#searchInput').value; refresh();
    }, 180));
    $('#searchInput').addEventListener('keydown', function (e) { if (e.key === 'Escape') { this.value=''; state.filters.q=''; refresh(); } });

    catSel.addEventListener('change', function () { state.filters.cat = this.value; refresh(); });
    styleSel.addEventListener('change', function () { state.filters.style = this.value; refresh(); });
    regSel.addEventListener('change', function () { state.filters.region = this.value; refresh(); });
    $('#filterSort').addEventListener('change', function () { state.filters.sort = this.value; refresh(); });
    $('#btnReset').addEventListener('click', function () {
      state.filters = { q:'', cat:'all', style:'all', region:'all', era:'all', sort:'default', favOnly:false };
      $('#searchInput').value=''; $('#filterCat').value='all'; $('#filterStyle').value='all';
      $('#filterRegion').value='all'; $('#filterSort').value='default';
      paintCatStrip(); refresh(); U.toast('篩選已重設', 'ok');
    });
    $('#btnRandom').addEventListener('click', function (e) { e.preventDefault(); location.href = 'knowledge/index.html'; });

    /* 檢視切換 */
    $$('#viewTabs button').forEach(function (b) {
      b.addEventListener('click', function () {
        state.viewMode = b.getAttribute('data-view-mode');
        $$('#viewTabs button').forEach(function (x) { x.classList.toggle('active', x === b); });
        refresh();
      });
    });
  }

  function refresh () {
    if (state.view === 'fav') renderFavView();
    else if (state.view === 'recent') renderRecentView();
    else if (state.view === 'stats') renderStatsView();
    else renderHome();
  }

  /* ============================================================
     側邊欄
     ============================================================ */
  function initSidebar () {
    $('#sideNav').addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn) return;
      var v = btn.getAttribute('data-view');
      if (btn.getAttribute('data-rand')) { location.href = 'knowledge/index.html'; return; }
      state.view = v;
      $$('#sideNav button').forEach(function (x) { x.classList.toggle('active', x === btn); });
      if (v === 'stats') { setBreadcrumb([{ text:'分類統計' }]); renderStatsView(); }
      else if (v === 'timeline') { state.viewMode='timeline'; setBreadcrumb([{ text:'時間軸' }]); renderHome(); }
      else if (v === 'map') { state.viewMode='map'; setBreadcrumb([{ text:'網站地圖' }]); renderHome(); }
      else if (v === 'fav') { setBreadcrumb([{ text:'我的最愛' }]); renderFavView(); }
      else if (v === 'recent') { setBreadcrumb([{ text:'最近造訪' }]); renderRecentView(); }
      else { state.viewMode = SS.getSettings().view || 'card'; setBreadcrumb([{ text:'首頁' }]); renderHome(); }
    });
    /* 快捷工具 */
    $$('button[data-act]').forEach(function (b) {
      b.addEventListener('click', function () {
        var act = b.getAttribute('data-act');
        if (act === 'csv') { ES.exportCSV(DS.getAll()); U.toast(tr('exportCSV') + ' ✓', 'ok'); }
        else if (act === 'json') { ES.exportJSON({ meta:{ name:'世界建築史 Architecture Atlas', version:'V2.0' }, styles: DS.getStyles(), articles: DS.getAll() }); U.toast(tr('exportJSON') + ' ✓', 'ok'); }
        else if (act === 'print') { window.print(); }
        else if (act === 'protect') { toggleProtect(); }
      });
    });
    $('#footerFeatures').addEventListener('click', renderFeaturesModal);
    $('#footerSettings').addEventListener('click', renderSettingsModal);
  }

  /* ============================================================
     防複製保護
     ============================================================ */
  function toggleProtect () {
    var s = SS.getSettings();
    var on = !s.copyProtect;
    SS.saveSettings({ copyProtect: on });
    applyProtect(on);
    U.toast(on ? tr('copyProtectOn') : tr('copyProtectOff'), 'ok');
  }
  function applyProtect (on) {
    $('#protectState').textContent = on ? '開' : '關';
    document.body.classList.toggle('copy-warn', on);
    if (on) {
      document.addEventListener('contextmenu', blockCtx);
      document.addEventListener('copy', blockCopy);
    } else {
      document.removeEventListener('contextmenu', blockCtx);
      document.removeEventListener('copy', blockCopy);
    }
  }
  function blockCtx (e) { e.preventDefault(); U.toast('本站已啟用防複製保護（F56）'); }
  function blockCopy (e) { e.preventDefault(); U.toast('本站已啟用防複製保護（F56）'); }

  /* ============================================================
     主題控制列 + 鍵盤快捷鍵 + 閱讀進度 + 回到頂部
     ============================================================ */
  function initHeaderTools () {
    var combos = ['paper', 'slate', 'forest'];
    $('#btnCombo').addEventListener('click', function () {
      var s = SS.getSettings();
      var i = combos.indexOf(s.themeCombo);
      var next = combos[(i + 1) % combos.length];
      SS.saveSettings({ themeCombo: next }); TS.applyTheme(next, s.themeMode);
      U.toast('主題：' + tr('combo' + next.charAt(0).toUpperCase() + next.slice(1)), 'ok');
    });
    $('#btnMode').addEventListener('click', function () {
      var s = SS.getSettings();
      var cur = TS.resolveMode(s.themeMode);
      var next = cur === 'light' ? 'dark' : 'light';
      SS.saveSettings({ themeMode: next }); TS.applyTheme(s.themeCombo, next);
      U.toast(next === 'dark' ? tr('dark') : tr('light'), 'ok');
    });
    $('#btnFontMinus').addEventListener('click', function () {
      var s = SS.getSettings(); var ns = Math.max(C.fontSize.min, s.fontSize - C.fontSize.step);
      SS.saveSettings({ fontSize: ns }); TS.applyFontSize(ns); U.toast('字級 ' + ns + 'px');
    });
    $('#btnFontPlus').addEventListener('click', function () {
      var s = SS.getSettings(); var ns = Math.min(C.fontSize.max, s.fontSize + C.fontSize.step);
      SS.saveSettings({ fontSize: ns }); TS.applyFontSize(ns); U.toast('字級 ' + ns + 'px');
    });
    $('#btnLang').addEventListener('click', function () {
      var s = SS.getSettings();
      var nl = s.lang === 'en' ? 'zh' : 'en';
      SS.saveSettings({ lang: nl }); refreshLang();
      TS.applyLang(nl);
      U.toast(nl === 'en' ? 'English' : '繁體中文', 'ok');
      refresh(); /* 重繪介面文字 */
    });
    $('#btnSettings').addEventListener('click', renderSettingsModal);
    $('#btnFeatures').addEventListener('click', renderFeaturesModal);
    $('#btnFavs').addEventListener('click', function () {
      state.view = 'fav';
      $$('#sideNav button').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-view') === 'fav'); });
      setBreadcrumb([{ text:'我的最愛' }]); renderFavView();
    });

    /* 鍵盤快捷鍵（F21）*/
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        if (e.key === 'Escape') { e.target.blur(); return; }
        return;
      }
      if (e.key === '/') { e.preventDefault(); $('#searchInput').focus(); }
      else if (e.key === 'k' || e.key === 'K') { location.href = 'knowledge/index.html'; }
      else if (e.key === 'f' || e.key === 'F') {
        state.view='fav';
        $$('#sideNav button').forEach(function (x) { x.classList.toggle('active', x.getAttribute('data-view')==='fav'); });
        setBreadcrumb([{ text:'我的最愛' }]); renderFavView();
      }
      else if (e.key === 'Escape') { closeModal(); closeLightbox(); }
      else if (e.key === 'ArrowLeft' && state.currentArticle) {
        var all = DS.getAll(); var i = all.findIndex(function (x){return x.id===state.currentArticle.id;});
        if (i > 0) goArticle(all[i-1].id);
      }
      else if (e.key === 'ArrowRight' && state.currentArticle) {
        var all2 = DS.getAll(); var i2 = all2.findIndex(function (x){return x.id===state.currentArticle.id;});
        if (i2 < all2.length-1) goArticle(all2[i2+1].id);
      }
      else if (e.key === 'q' || e.key === 'Q') { goHome(); }
    });
  }

  function initScrollBehaviors () {
    var pb = $('#progressBar'), bt = $('#backTop');
    window.addEventListener('scroll', U.throttle(function () {
      var h = document.documentElement;
      var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      pb.style.width = pct + '%';
      bt.classList.toggle('show', h.scrollTop > 400);
    }, 60));
    bt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalMask').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    $('#lightbox').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeLightbox(); } });
  }

  /* ============================================================
     啟動
     ============================================================ */
  function init () {
    refreshLang();
    TS.init();
    SS.getSettings(); /* ensure defaults */
    applyProtect(SS.getSettings().copyProtect);
    $('#favCount').textContent = SS.getFavs().length;
    $('#statArticles').textContent = DS.getAll().length;
    $('#statStyles').textContent = DS.getStyles().length;
    $('#statFeatures').textContent = C.features.length;
    $('#statRegions').textContent = C.regions.length;
    initFilters();
    initSidebar();
    initHeaderTools();
    initScrollBehaviors();
    window.addEventListener('hashchange', route);
    route();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
