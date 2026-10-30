/* ============================================================
   data.js — 資料服務 service
   世界建築史 · Architecture Atlas
   篩選 / 搜尋 / 統計 / 排序 / 相關推薦
   ============================================================ */
window.DataService = (function () {
  'use strict';
  var articles = window.ARCH_ARTICLES || [];
  var styles = window.ARCH_STYLES || [];

  function getArticle (id) {
    return articles.find(function (a) { return a.id === Number(id); });
  }
  function getAll () { return articles; }
  function getStyles () { return styles; }

  function styleName (zh) {
    var s = styles.find(function (x) { return x.zh === zh; });
    return s ? s : { zh: zh, en: zh, img: 'images/hero.webp' };
  }

  /* 搜尋：標題/內文/關鍵字/英文 */
  function search (q) {
    q = (q || '').trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(function (a) {
      var hay = (a.title + ' ' + a.en + ' ' + a.summary + ' ' + a.body.join(' ') +
        ' ' + a.keywords.join(' ') + ' ' + a.region + ' ' + a.style + ' ' +
        a.buildings.join(' ') + ' ' + a.architects.join(' ')).toLowerCase();
      return hay.indexOf(q) >= 0;
    });
  }

  /* 綜合篩選 */
  function filter (opts) {
    var q = (opts.q || '').trim().toLowerCase();
    var list = q ? search(q) : articles.slice();
    if (opts.cat && opts.cat !== 'all') list = list.filter(function (a) { return a.cat === opts.cat; });
    if (opts.style && opts.style !== 'all') list = list.filter(function (a) { return a.style === opts.style; });
    if (opts.region && opts.region !== 'all') list = list.filter(function (a) { return a.region === opts.region; });
    if (opts.era && opts.era !== 'all') {
      list = list.filter(function (a) {
        var y = parseInt(a.era, 10);
        var range = opts.era.split('-').map(Number);
        return y >= range[0] && y <= range[1];
      });
    }
    if (opts.favOnly) {
      var favs = window.StorageService.getFavs();
      list = list.filter(function (a) { return favs.indexOf(a.id) >= 0; });
    }
    /* 排序 */
    if (opts.sort === 'name') list.sort(function (a, b) { return a.title.localeCompare(b.title, 'zh'); });
    else if (opts.sort === 'era') list.sort(function (a, b) {
      return (parseInt(a.era, 10) || 0) - (parseInt(b.era, 10) || 0);
    });
    else if (opts.sort === 'featured') list.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    return list;
  }

  /* 分類統計 */
  function statsByCat () {
    var map = {};
    articles.forEach(function (a) {
      if (!map[a.cat]) map[a.cat] = { count: 0, list: [] };
      map[a.cat].count++; map[a.cat].list.push(a);
    });
    return map;
  }
  function styleCount () {
    var map = {};
    articles.forEach(function (a) {
      map[a.style] = (map[a.style] || 0) + 1;
    });
    return map;
  }

  /* 相關推薦：同分類優先，其次同風格 */
  function related (id, n) {
    n = n || 3;
    var a = getArticle(id);
    if (!a) return [];
    var same = articles.filter(function (x) {
      return x.id !== id && x.cat === a.cat;
    });
    var rest = articles.filter(function (x) {
      return x.id !== id && x.cat !== a.cat && x.style === a.style;
    });
    var pool = same.concat(rest);
    if (pool.length < n) {
      var others = articles.filter(function (x) {
        return x.id !== id && pool.indexOf(x) < 0;
      });
      pool = pool.concat(others);
    }
    return pool.slice(0, n);
  }

  function random () {
    return articles[Math.floor(Math.random() * articles.length)];
  }

  return {
    getArticle: getArticle, getAll: getAll, getStyles: getStyles, styleName: styleName,
    search: search, filter: filter, statsByCat: statsByCat, styleCount: styleCount,
    related: related, random: random
  };
})();
