/* ============================================================
   utils/dom.js — DOM 建構／圖示／Toast 輔助
   ============================================================ */
(function (g) {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  function svgEl(name) {
    return document.createElementNS(NS, name);
  }

  /* 使用 sprite 的圖示（<use href="#i-key">） */
  function icon(key, cls) {
    var s = svgEl('svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    if (cls) s.setAttribute('class', cls);
    var u = svgEl('use');
    u.setAttribute('href', '#i-' + key);
    u.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#i-' + key);
    s.appendChild(u);
    return s;
  }

  function iconHtml(key, cls) {
    return '<svg viewBox="0 0 24 24" class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + key + '"></use></svg>';
  }

  /* 建構元素：el('div', {class:'x', onclick:fn, text:'內容'}, [children]) */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'style') node.style.cssText = v;
        else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else if (k === 'dataset') {
          for (var dk in v) { if (Object.prototype.hasOwnProperty.call(v, dk)) node.dataset[dk] = v[dk]; }
        } else node.setAttribute(k, v);
      }
    }
    if (children) {
      var arr = Array.isArray(children) ? children : [children];
      for (var i = 0; i < arr.length; i++) {
        var c = arr[i];
        if (c === null || c === undefined || c === false) continue;
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      }
    }
    return node;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Toast */
  function toast(msg, type) {
    var wrap = document.getElementById('toastWrap');
    if (!wrap) return;
    var t = el('div', { class: 'toast' + (type ? ' ' + type : ''), role: 'status' }, [
      icon(type === 'err' ? 'alert' : (type === 'ok' ? 'check' : 'info')),
      el('span', { text: msg })
    ]);
    wrap.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () {
      t.classList.remove('show');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 240);
    }, 2800);
  }

  g.RECalcDom = { el: el, icon: icon, iconHtml: iconHtml, clear: clear, esc: esc, toast: toast };
})(typeof window !== 'undefined' ? window : globalThis);
