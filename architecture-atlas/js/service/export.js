/* ============================================================
   export.js — 匯出與工具 service
   世界建築史 · Architecture Atlas
   匯出 CSV / JSON、列印、複製
   ============================================================ */
window.ExportService = (function () {
  'use strict';
  var U = window.Utils;

  function download (filename, content, mime) {
    var blob = new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    setTimeout(function () { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
  }

  function csvEscape (s) {
    s = String(s == null ? '' : s);
    if (/[",\n]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  /* 匯出文章清單 CSV */
  function exportCSV (list) {
    var rows = [['id', 'title', 'en', 'style', 'region', 'category', 'era', 'summary', 'keywords']];
    list.forEach(function (a) {
      rows.push([a.id, a.title, a.en, a.style, a.region, a.cat, a.era, a.summary, (a.keywords || []).join(';')]);
    });
    var csv = '\uFEFF' + rows.map(function (r) { return r.map(csvEscape).join(','); }).join('\r\n');
    download('世界建築史_文章清單.csv', csv, 'text/csv;charset=utf-8');
  }

  /* 匯出 JSON */
  function exportJSON (data) {
    download('世界建築史_資料.json', JSON.stringify(data, null, 2), 'application/json;charset=utf-8');
  }

  /* 列印單篇 */
  function printArticle (article) {
    var w = window.open('', '_blank', 'width=860,height=900');
    var html = '<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="UTF-8"><title>' +
      article.title + ' - 世界建築史</title><style>' +
      'body{font-family:"Noto Serif TC",serif;max-width:760px;margin:32px auto;padding:0 24px;color:#222;line-height:1.9}' +
      'h1{font-size:30px;border-bottom:3px solid #b8860b;padding-bottom:10px}' +
      '.meta{color:#777;font-size:13px;margin-bottom:18px}' +
      'p{margin:14px 0;text-align:justify}h2{font-size:20px;margin-top:26px;color:#8b5a2b}' +
      'table{border-collapse:collapse;width:100%;margin:12px 0}td,th{border:1px solid #ccc;padding:8px;font-size:14px}' +
      '.foot{margin-top:40px;font-size:12px;color:#999;border-top:1px solid #ddd;padding-top:10px}</style></head><body>' +
      '<h1>' + article.title + '</h1><div class="meta">' +
      (article.en ? article.en + ' · ' : '') + article.style + ' · ' + article.era + ' · ' + article.region + '</div>' +
      article.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      '<h2>代表建築</h2><p>' + article.buildings.join('、') + '</p>' +
      '<h2>相關建築師</h2><p>' + article.architects.join('、') + '</p>' +
      '<div class="foot">世界建築史 · Architecture Atlas — 列印版</div></body></html>';
    w.document.write(html); w.document.close();
    w.focus();
    setTimeout(function () { w.print(); }, 350);
  }

  /* 複製全文 */
  function copyArticle (article) {
    var text = '【' + article.title + '】' + (article.en ? ' ' + article.en : '') +
      '（' + article.style + ' · ' + article.era + ' · ' + article.region + '）\n\n' +
      article.summary + '\n\n' + article.body.join('\n\n') +
      '\n\n代表建築：' + article.buildings.join('、') +
      '\n建築師：' + article.architects.join('、');
    var done = false;
    function fallback () {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done = true; } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done = true; U.toast('已複製文章全文', 'ok'); },
        function () { fallback(); if (done) U.toast('已複製文章全文', 'ok'); });
    } else { fallback(); if (done) U.toast('已複製文章全文', 'ok'); }
  }

  /* 分享（複製連結） */
  function shareLink (article) {
    var url = window.location.origin + window.location.pathname + '#/article/' + article.id;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { U.toast('連結已複製，可分享', 'ok'); },
        function () { U.toast('複製失敗，請手動複製網址', 'warn'); });
    } else {
      window.prompt('複製此連結以分享', url);
    }
  }

  return { exportCSV: exportCSV, exportJSON: exportJSON, printArticle: printArticle, copyArticle: copyArticle, shareLink: shareLink };
})();
