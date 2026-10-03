/* ============================================================
   九回房地 算算不動產 — 主程式 app
   元件：主題切換 / 下拉導航 / hamburger / mobile-menu / sidebar
   back-to-top / fab / accordion / tab / ui-dropdown / context-menu
   anti-copy / lazy-load / forms / favorite / toast / tree-view
   ============================================================ */
(function () {
  'use strict';
  var SITE = window.SITE || { nav: [], footerLinks: [], tags: [], latestPosts: [], contact: {} };

  /* ---------- 日夜主題（含跟隨系統、localStorage 記憶） ---------- */
  var THEME_KEY = '9r-theme';
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    var b = document.getElementById('themeBtn');
    if (b) b.textContent = t === 'dark' ? '☾' : '☀';
  }
  function initTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    var sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    applyTheme(saved === 'dark' || saved === 'light' ? saved : sys);
  }
  function cycleTheme() {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    toast(next === 'dark' ? '已切換深色模式' : '已切換白天模式');
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ---------- Toast ---------- */
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- 主選單渲染（top-nav + dropdown + mobile-menu） ---------- */
  function renderNav() {
    var nav = document.getElementById('mainNav');
    var mobile = document.getElementById('mobileMenu');
    if (!nav && !mobile) return;
    var active = location.pathname.split('/').pop() || 'index.html';
    function linkHTML(item, isSub) {
      return '<a class="' + (isSub ? 'nav-link' : 'nav-link' + (item.url === active ? ' active' : '')) + '" href="' + item.url + '">' +
        (item.icon ? '<span>' + item.icon + '</span>' : '') + item.t + (item.sub ? '<span class="caret">▼</span>' : '') + '</a>';
    }
    if (nav) {
      nav.innerHTML = SITE.nav.map(function (it) {
        return '<li' + (it.sub ? ' class="has-sub"' : '') + '>' + linkHTML(it) +
          (it.sub ? '<div class="dropdown-menu">' + it.sub.map(function (s) { return '<a href="' + s.url + '">' + s.t + '</a>'; }).join('') + '</div>' : '') +
          '</li>';
      }).join('');
    }
    if (mobile) {
      mobile.innerHTML = '<div class="mm-title">☰ 主題導覽</div>' + SITE.nav.map(function (it) {
        var sub = it.sub ? '<div class="mm-sub">' + it.sub.map(function (s) { return '<a href="' + s.url + '">' + s.t + '</a>'; }).join('') + '</div>' : '';
        return '<a class="mm-link" href="' + it.url + '">' + it.t + (it.sub ? '<span>▸</span>' : '') + '</a>' + sub;
      }).join('');
    }
    // 下拉 hover（桌面）＋ click（行動）
    document.querySelectorAll('#mainNav li.has-sub').forEach(function (li) {
      li.addEventListener('mouseenter', function () { if (window.innerWidth > 880) li.classList.add('open'); });
      li.addEventListener('mouseleave', function () { if (window.innerWidth > 880) li.classList.remove('open'); });
    });
  }

  /* ---------- Hamburger / mobile-menu / overlay ---------- */
  function initMobileMenu() {
    var ham = document.getElementById('hamburger');
    var menu = document.getElementById('mobileMenu');
    var overlay = document.getElementById('overlay');
    if (!ham || !menu || !overlay) return;
    function open() { ham.classList.add('open'); menu.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
    function close() { ham.classList.remove('open'); menu.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }
    ham.addEventListener('click', function () { ham.classList.contains('open') ? close() : open(); });
    overlay.addEventListener('click', close);
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  /* ---------- Back-to-top ---------- */
  function initBackTop() {
    var btn = document.getElementById('backTop');
    if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 400); });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll('.accordion .acc-head').forEach(function (head) {
      head.addEventListener('click', function () {
        var item = head.closest('.acc-item');
        var body = item.querySelector('.acc-body');
        var isOpen = item.classList.contains('open');
        // 手風琴：關閉其他
        var scope = item.closest('.accordion');
        if (scope) scope.querySelectorAll('.acc-item.open').forEach(function (o) {
          o.classList.remove('open'); o.querySelector('.acc-body').style.maxHeight = null;
        });
        if (!isOpen) { item.classList.add('open'); body.style.maxHeight = body.scrollHeight + 'px'; }
      });
    });
  }

  /* ---------- Tab ---------- */
  function initTabs() {
    document.querySelectorAll('.tabs').forEach(function (tabs) {
      tabs.addEventListener('click', function (e) {
        var btn = e.target.closest('.tab-btn');
        if (!btn) return;
        var wrap = tabs.closest('.tab-wrap') || tabs.parentElement;
        tabs.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        wrap.querySelectorAll(':scope > .tab-pane, .tab-pane').forEach(function (p) { p.classList.remove('active'); });
        var target = document.getElementById(btn.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ---------- UI Dropdown（點擊） ---------- */
  function initUiDropdown() {
    document.querySelectorAll('.ui-dropdown').forEach(function (dd) {
      var t = dd.querySelector('.dd-toggle');
      t.addEventListener('click', function (e) {
        e.stopPropagation();
        dd.classList.toggle('open');
      });
    });
    document.addEventListener('click', function () {
      document.querySelectorAll('.ui-dropdown.open').forEach(function (dd) { dd.classList.remove('open'); });
    });
  }

  /* ---------- Context-menu（右鍵自訂選單） ---------- */
  function initContextMenu() {
    var cm = document.getElementById('contextMenu');
    if (!cm) return;
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      cm.classList.add('show');
      var x = Math.min(e.clientX, window.innerWidth - 200);
      var y = Math.min(e.clientY, window.innerHeight - 160);
      cm.style.left = x + 'px'; cm.style.top = y + 'px';
    });
    document.addEventListener('click', function () { cm.classList.remove('show'); });
    window.addEventListener('scroll', function () { cm.classList.remove('show'); }, true);
    cm.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var act = a.dataset.act;
        if (act === 'back') window.scrollTo({ top: 0, behavior: 'smooth' });
        else if (act === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
        else if (act === 'fav') toggleFav();
        else if (act === 'theme') cycleTheme();
        cm.classList.remove('show');
      });
    });
  }

  /* ---------- Anti-copy（防複製保護） ---------- */
  function initAntiCopy() {
    // 保護文字：允許選取但仍顯示版權提示；保護圖片
    document.addEventListener('copy', function (e) {
      if (document.body.classList.contains('copy-locked')) {
        e.preventDefault();
        toast('內容受保護，請勿複製 © 九回房地');
      }
    });
    // contextmenu 已由自訂選單接管
    // 阻止拖拽圖片
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('dragstart', function (e) { if (document.body.classList.contains('copy-locked')) e.preventDefault(); });
    });
  }

  /* ---------- Lazy-load（進階延遲載入） ---------- */
  function initLazy() {
    var imgs = document.querySelectorAll('img[data-src]');
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(function (i) { i.src = i.dataset.src; i.classList.add('loaded'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var img = en.target;
          img.src = img.dataset.src;
          img.onload = function () { img.classList.add('loaded'); };
          io.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach(function (i) { io.observe(i); });
  }

  /* ---------- Favorite（收藏） ---------- */
  var FAV_KEY = '9r-fav';
  function toggleFav() {
    var star = document.querySelector('.fav-btn .star');
    var isOn = document.querySelector('.fav-btn').classList.toggle('on');
    document.querySelector('.fav-btn .star').textContent = isOn ? '★' : '☆';
    toast(isOn ? '已加入收藏' : '已取消收藏');
  }
  function initFav() {
    var fav = document.querySelector('.fav-btn');
    if (fav) {
      fav.innerHTML = '<span class="star">☆</span> 收藏本頁';
      fav.addEventListener('click', toggleFav);
    }
    var fabFav = document.getElementById('fabFav');
    if (fabFav) fabFav.addEventListener('click', toggleFav);
  }

  /* ---------- Forms（subscribe / email-sub / register / form-submit） ---------- */
  function initForms() {
    document.querySelectorAll('form[data-sim]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var msg = form.querySelector('.form-msg');
        var email = form.querySelector('input[type=email]');
        if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) {
          if (msg) { msg.textContent = '請輸入有效的 Email'; msg.className = 'form-msg err'; }
          return;
        }
        var ok = form.querySelector('.form-msg');
        if (ok) { ok.textContent = '✓ 已送出（示範），我們將盡快與你聯繫'; ok.className = 'form-msg ok'; }
        toast('表單已送出 ✓');
        form.reset();
      });
    });
  }

  /* ---------- 統計動畫 ---------- */
  function initCounters() {
    var nums = document.querySelectorAll('[data-count]');
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target, target = parseInt(el.dataset.count, 10), cur = 0, step = Math.max(1, Math.round(target / 40));
          var t = setInterval(function () {
            cur += step; if (cur >= target) { cur = target; clearInterval(t); }
            el.textContent = cur;
          }, 26);
          io.unobserve(el);
        }
      });
    });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Footer 渲染 ---------- */
  function renderFooter() {
    function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
    setText('contactEmail', SITE.contact.email);
    setText('contactTel', SITE.contact.tel);
    setText('contactLine', SITE.contact.line);
    // 文章內容移到主體（最新文章＋熱門標籤）
    var mainLp = document.getElementById('mainLatestPosts');
    if (mainLp && SITE.latestPosts) mainLp.innerHTML = SITE.latestPosts.map(function (p) {
      return '<li><div class="lp-thumb"></div><div><div class="lp-t">' + p.t + '</div><div class="lp-d">' + p.d + '</div></div></li>';
    }).join('');
    var mainTg = document.getElementById('mainTagCloud');
    if (mainTg && SITE.tags) mainTg.innerHTML = SITE.tags.map(function (t) { return '<a href="sitemap.html#about">#' + t + '</a>'; }).join('');
    // 分享下拉
    document.querySelectorAll('[data-share]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        toast('已複製網址（示範）');
      });
    });
  }

  /* ---------- 浮動站內導覽 dock（站內導覽＋回上頁＋首頁，每頁通用） ---------- */
  function initSitemapDropdown() {
    // 浮動 dock
    var dock = document.createElement('div');
    dock.className = 'float-nav'; dock.id = 'floatNav';
    dock.setAttribute('role', 'navigation');
    dock.setAttribute('aria-label', '浮動站內導覽');
    var navBtn = document.createElement('button');
    navBtn.className = 'fn-btn main'; navBtn.id = 'navToggle';
    navBtn.innerHTML = '<span class="f-icon">≣</span>站內導覽';
    navBtn.setAttribute('aria-label', '開啟站內導覽');
    var backBtn = document.createElement('button');
    backBtn.className = 'fn-btn'; backBtn.id = 'backBtn';
    backBtn.innerHTML = '<span class="f-icon">←</span>回上一頁';
    backBtn.setAttribute('aria-label', '回上一頁');
    var homeBtn = document.createElement('a');
    homeBtn.className = 'fn-btn'; homeBtn.id = 'homeBtn';
    homeBtn.href = 'index.html';
    homeBtn.innerHTML = '<span class="f-icon">⌂</span>首頁';
    homeBtn.setAttribute('aria-label', '回到首頁');
    dock.appendChild(homeBtn);
    dock.appendChild(backBtn);
    dock.appendChild(navBtn);
    // 下拉選單
    var panel = document.createElement('nav');
    panel.className = 'sitemap-dropdown'; panel.id = 'sitemapDropdown';
    panel.setAttribute('aria-label', '站內導覽選單');
    panel.innerHTML = '<div class="sm-title">站內導覽 <button class="sm-close" aria-label="關閉" type="button">✕</button></div>';
    var tree = document.createElement('div'); tree.id = 'smTree';
    panel.appendChild(tree);
    document.body.appendChild(dock);
    document.body.appendChild(panel);
    // 由 SITE.nav 遞迴渲染全站結構
    tree.innerHTML = SITE.nav.map(function (it) {
      var active = location.pathname.split('/').pop() || 'index.html';
      var activeCls = it.url === active ? ' style="color:var(--accent2)"' : '';
      if (it.sub) {
        var sub = '<div class="sm-sub">' + it.sub.map(function (s) {
          return '<a href="' + s.url + '">' + s.t + '</a>';
        }).join('') + '</div>';
        return '<details><summary' + activeCls + '>' + it.t + ' <span>▸</span></summary>' + sub + '</details>';
      }
      return '<a class="sm-leaf" href="' + it.url + '"' + activeCls + '>' + it.t + '</a>';
    }).join('');
    // 切換
    function open() { panel.classList.add('open'); }
    function close() { panel.classList.remove('open'); }
    navBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.classList.contains('open')) close(); else open();
    });
    // 回上一頁
    backBtn.addEventListener('click', function () {
      if (history.length > 1) history.back();
      else location.href = 'index.html';
    });
    panel.querySelector('.sm-close').addEventListener('click', close);
    document.addEventListener('click', function (e) {
      if (!panel.contains(e.target) && e.target !== navBtn) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------- Init ---------- */
  function init() {
    initTheme();
    renderNav();
    initMobileMenu();
    initBackTop();
    initAccordion();
    initTabs();
    initUiDropdown();
    initContextMenu();
    initAntiCopy();
    initLazy();
    initFav();
    initForms();
    initCounters();
    renderFooter();
    initSitemapDropdown();
    var themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', cycleTheme);
  }
  document.addEventListener('DOMContentLoaded', init);
  window.cycleTheme = cycleTheme;
  window.toggleFav = toggleFav;
})();
