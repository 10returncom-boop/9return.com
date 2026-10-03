/* ============================================================
   helpers.js — 通用工具 utils
   世界建築史 · Architecture Atlas
   ============================================================ */
window.Utils = (function () {
  'use strict';

  function $ (sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$ (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* 建立元素 */
  function el (tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'style' && typeof v === 'object') {
          Object.keys(v).forEach(function (sk) { node.style[sk] = v[sk]; });
        } else if (k.indexOf('on') === 0 && typeof v === 'function') {
          node.addEventListener(k.slice(2), v);
        } else node.setAttribute(k, v);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  /* 防抖 / 節流 */
  function debounce (fn, wait) {
    var t; return function () {
      var args = arguments, ctx = this;
      clearTimeout(t); t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }
  function throttle (fn, wait) {
    var last = 0, t;
    return function () {
      var now = Date.now(), args = arguments, ctx = this;
      if (now - last >= wait) { last = now; fn.apply(ctx, args); }
      else { clearTimeout(t); t = setTimeout(function () { last = Date.now(); fn.apply(ctx, args); }, wait - (now - last)); }
    };
  }

  /* 數字動畫 */
  function animateCounter (node, to, dur, suffix) {
    dur = dur || 900; suffix = suffix || '';
    var start = 0, t0 = null;
    function step (ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var val = Math.round(to * (1 - Math.pow(1 - p, 3)));
      node.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Toast 通知 */
  function toast (msg, type) {
    var box = $('.toast-wrap');
    if (!box) { box = el('div', { class: 'toast-wrap' }); document.body.appendChild(box); }
    var item = el('div', { class: 'toast ' + (type || 'info') }, [el('span', { text: msg })]);
    box.appendChild(item);
    requestAnimationFrame(function () { item.classList.add('show'); });
    setTimeout(function () {
      item.classList.remove('show');
      setTimeout(function () { item.remove(); }, 400);
    }, 2600);
  }

  /* ============================================================
     Breathe Clamp 組件：多行文字收合 + 展開/收合按鈕
     ============================================================ */
  function createBreatheClamp (text, lines) {
    lines = lines || 3;
    var clampId = 'clamp-' + Math.random().toString(36).slice(2, 9);
    var wrapper = el('div', { class: 'breathe-clamp-wrapper' });
    var clamp = el('div', { class: 'breathe-clamp', id: clampId, text: text, style: { '--clamp-lines': lines } });
    var toggle = el('button', {
      class: 'breathe-clamp-toggle',
      html: '<span>展開</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
      onclick: function () {
        var isExpanded = clamp.classList.toggle('expanded');
        this.classList.toggle('expanded', isExpanded);
        this.querySelector('span').textContent = isExpanded ? '收合' : '展開';
      }
    });
    wrapper.appendChild(clamp);
    wrapper.appendChild(toggle);
    return wrapper;
  }

  /* ============================================================
     滾動揭示（IntersectionObserver）
     ============================================================ */
  function observeReveal (nodes) {
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* 統計：字數（繁中視每個字一字） */
  function countWords (str) {
    str = str || '';
    var cjk = (str.match(/[\u4e00-\u9fff]/g) || []).length;
    var latin = (str.replace(/[\u4e00-\u9fff\s]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
    return cjk + latin;
  }
  function readMinutes (str) {
    return Math.max(1, Math.round(countWords(str) / 250));
  }

  /* 跳轉路由（hash） */
  function setHash (h) {
    if (window.location.hash === h) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = h;
    }
  }

  return {
    $: $, $$: $$, el: el, debounce: debounce, throttle: throttle,
    animateCounter: animateCounter, toast: toast,
    createBreatheClamp: createBreatheClamp, observeReveal: observeReveal,
    countWords: countWords, readMinutes: readMinutes, setHash: setHash
  };
})();
