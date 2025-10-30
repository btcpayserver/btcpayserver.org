
function scrollTo(o, t) {
    var n = t || 1,
        i = window.scrollY ? window.scrollY : 0;
    animate(document.scrollingElement || document.documentElement, "scrollTop", "", i, o.offsetTop - n, 750, !0)
}

function animate(e, t, n, o, i, r, l) {
    if (e) {
        var c = (new Date).getTime(),
            s = setInterval(function () {
                var a = Math.min(1, ((new Date).getTime() - c) / r);
                l ? e[t] = o + a * (i - o) + n : e.style[t] = o + a * (i - o) + n, 1 === a && clearInterval(s)
            }, 1);
        l ? e[t] = o + n : e.style[t] = o + n
    }
}

try {
    document.querySelectorAll(".nonJavascriptMessage").forEach(function (e) {
        e.style.display = "none"
    }), document.querySelectorAll(".oF_JS_Env").forEach(function (e) {
        e.style.display = ""
    })
} catch (e) { }


try {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
} catch (e) { }


if (document.querySelectorAll(".selector-no-js").length > 0) {
    document.querySelectorAll(".selector-no-js")[0].checked = true;
}

// Theme Switch
const COLOR_MODES = ["light", "dark"];
const systemColorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const userColorMode = window.localStorage.getItem('colorMode');
const initialColorMode = COLOR_MODES.includes(userColorMode) ? userColorMode : systemColorMode;

function setColorMode (mode) {
  if (COLOR_MODES.includes(mode)) {
    window.localStorage.setItem("colorMode", mode);
    document.documentElement.setAttribute("data-theme", mode);

    const serverImage = document.getElementById("server-image");
    const invoiceImage = document.getElementById("invoice-image");
    if (serverImage) serverImage.setAttribute("src", "/img/server-" + mode + ".png");
    if (invoiceImage) invoiceImage.setAttribute("src", "/img/invoice-" + mode + ".svg");
  }
}

setColorMode(initialColorMode);

document.querySelectorAll("[data-theme-switch]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const mode = link.getAttribute("data-theme-switch");
    setColorMode(mode);
  })
})

// Integrations and plugins
document.querySelectorAll("a").forEach(function (e) {
    try {
        "#" == e.getAttribute("href").substr(0, 1) && e.getAttribute("href").length > 1 && "#_" != e.getAttribute("href").substr(0, 2) && e.addEventListener("click", function (t) {
            return t.preventDefault(), scrollTo(document.getElementById(e.getAttribute("href").replace("#", "")), 50), !1
        })
    } catch (e) { }
})


if (window.theme && window.theme !== "light" && window.theme !== "dark") {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if (document.querySelectorAll(".i-a").length > 0) {
            document.querySelectorAll(".i-a")[0].setAttribute("src", "/img/server-dark.png");
        }
        if (document.querySelectorAll(".i-b").length > 0) {
            document.querySelectorAll(".i-b")[0].setAttribute("src", "/img/invoice-dark.svg");
        }
    }
}

if (document.querySelectorAll(".selector-no-js").length > 0 && window.innerWidth < 700) {
    var ele = document.querySelectorAll(".selector-no-js");
    for (i = 0; i < ele.length; i++) {
        document.querySelectorAll(".selector-no-js")[i].addEventListener("click", function () {
            var t = this.getBoundingClientRect();
            window.scrollBy({
                top: t.top,
                behavior: 'smooth'
            });
        })
    }
}

var ww;
ww = window.innerWidth;
function alignSVGTEXT() {
    ww = window.innerWidth;
    if (document.querySelectorAll("svg.mobile-only").length > 0 && ww <= 700) {
        var svg = document.querySelectorAll("svg.mobile-only")[0];
        for (i = 0; i < svg.querySelectorAll("text").length; i++) {
            var t = svg.querySelectorAll("text")[i];
            var w = t.getBoundingClientRect().width;
            var r = 340 / (ww * .8);
            var nx = ((ww * .8) - w) * .5;
            nx = nx * r;
            t.setAttribute("x", nx + "px");
        }
    } else {
    }
}

alignSVGTEXT();
window.onresize = function () {
    alignSVGTEXT();
};


if (document.getElementById("backgroundBubbles")) {
    var s = document.getElementById("backgroundBubbles");
    var t;
    t = "#_IM0_1_" + window.theme;
    if (window.theme && window.theme !== "light" && window.theme !== "dark") {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            t = "#_IM0_1_dark";
        } else {
            t = "#_IM0_1_light";
        }
    } else {
        t = "#_IM0_1_" + window.theme;
    }
    s.setAttribute("xlink:href", t);
}

// Integrations page filtering
(function(){
  const grid = document.getElementById('integrationsGrid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.int-card'));
  const search = document.getElementById('intSearch');
  const quick = document.getElementById('intQuickFilters');
  function apply() {
    const q = (search && search.value || '').trim().toLowerCase();
    const active = quick ? (quick.querySelector('.int-chip.-active')?.dataset.chip || '') : '';
    items.forEach(li => {
      const name = li.getAttribute('data-name') || '';
      const tags = (li.getAttribute('data-tags') || '').toLowerCase();
      const hitName = !q || name.indexOf(q) >= 0;
      const hitChip = !active || tags.indexOf(active) >= 0 || name.indexOf(active) >= 0;
      li.style.display = hitName && hitChip ? '' : 'none';
    });
  }
  if (search) search.addEventListener('input', apply);
  if (quick) quick.addEventListener('click', (e)=>{
    const btn = e.target.closest('.int-chip');
    if (!btn) return;
    const cur = quick.querySelector('.int-chip.-active');
    if (cur === btn) btn.classList.remove('-active'); else { if (cur) cur.classList.remove('-active'); btn.classList.add('-active'); }
    apply();
  });
})();

// Video carousel (rolodex-style overlap, swipe, dots, lazy embed)
(function(){
  const root = document.querySelector('[data-vc]');
  if (!root) return;
  const track = root.querySelector('.vc-track');
  const cards = Array.from(root.querySelectorAll('.vc-card'));
  const prev = root.querySelector('[data-vc-prev]');
  const next = root.querySelector('[data-vc-next]');
  const dotsWrap = root.querySelector('.vc-dots');
  const ariaLive = root.querySelector('.vc-aria');
  let i = 0;
  let pendingAutoplay = false;
  // mark JS-enhanced
  root.classList.add('js-vc');

  function isSmallScreen() { return window.innerWidth <= 700; }
  function isLandscape() { return window.innerWidth > window.innerHeight; }


  function isSmallScreen() { return window.innerWidth <= 700; }
  function isLandscape() { return window.innerWidth > window.innerHeight; }
  function reqFullscreen(el) {
    try {
      if (el.requestFullscreen) return el.requestFullscreen();
      if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return el.msRequestFullscreen();
    } catch(_) {}
  }
  function exitFullscreen() {
    const d = document;
    try {
      if (d.exitFullscreen) return d.exitFullscreen();
      if (d.webkitExitFullscreen) return d.webkitExitFullscreen();
      if (d.msExitFullscreen) return d.msExitFullscreen();
    } catch(_) {}
  }

  function centerActivePx() {
    const active = cards[i];
    if (!active) return 0;
    const cardCenter = active.offsetLeft + active.offsetWidth / 2;
    const containerW = root.clientWidth;
    const target = Math.max(0, cardCenter - containerW / 2);
    return target;
  }

  function makeThumb(card) {
    const player = card.querySelector('.vc-player');
    if (!player || !player.dataset.yt) return;
    if (player.querySelector('iframe')) return;
    const id = player.dataset.yt;
    player.innerHTML = `
      <img class="vc-thumb" src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Video thumbnail" loading="lazy" decoding="async" />
      <button class="vc-play" aria-label="Play video">▶</button>`;
  }

  function makeIframe(card, autoplay, requestFs) {
    const player = card.querySelector('.vc-player');
    if (!player || !player.dataset.yt) return;
    const id = player.dataset.yt;
    const auto = autoplay ? '1' : '0';
    player.innerHTML = `<iframe class="unfetteredVideoFrame" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=${auto}" title="YouTube video player" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    if (requestFs && isSmallScreen()) {
      const inner = card.querySelector('.vc-inner') || player;
      reqFullscreen(inner);
    }
  }

  function stopNonActive() {
    cards.forEach((c, idx) => { if (idx !== i) makeThumb(c); });
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    cards.forEach((c, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      const titleEl = c.querySelector('.vc-title');
      const label = (titleEl && titleEl.textContent || '').trim() || `Slide ${idx+1}`;
      dot.setAttribute('aria-label', label);
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', idx === i ? 'true' : 'false');
      dot.addEventListener('click', ()=>{ i = idx; update(); });
      dotsWrap.appendChild(dot);
    })
  }

  function update() {
    const px = centerActivePx();
    cards.forEach((c, idx) => c.classList.toggle('is-active', idx === i));
    track.style.transform = `translateX(-${px}px)`;
    updateDots();
    stopNonActive();
    // announce to SR
    if (ariaLive) {
      const titleEl = cards[i].querySelector('.vc-title');
      const label = (titleEl && titleEl.textContent || '').trim() || `Slide ${i+1}`;
      ariaLive.textContent = `${i+1} of ${cards.length}: ${label}`;
    }
    // autoplay if requested and current not yet iframe
    if (pendingAutoplay) {
      const player = cards[i].querySelector('.vc-player');
      if (player && !player.querySelector('iframe')) makeIframe(cards[i], true, true);
      pendingAutoplay = false;
    }
  }

  function go(dir, opts) {
    i = (i + dir + cards.length) % cards.length;
    pendingAutoplay = !!(opts && opts.autoplay);
    update();
  }

  if (prev) prev.addEventListener('click', () => go(-1, {autoplay:false}));
  if (next) next.addEventListener('click', () => go(1, {autoplay:false}));
  root.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowLeft') { go(-1, {autoplay:false}); }
    if (e.key === 'ArrowRight') { go(1, {autoplay:false}); }
  });

  root.addEventListener('click', (e)=>{
    const btn = e.target.closest('.vc-play');
    if (!btn) return;
    const card = e.target.closest('.vc-card');
    const idx = cards.indexOf(card);
    if (idx === i) makeIframe(card, true, true);
  });

  // touch swipe
  let tsX = 0, tsY = 0, isTouching = false;
  root.addEventListener('touchstart', (e)=>{
    const t = e.changedTouches[0];
    tsX = t.clientX; tsY = t.clientY; isTouching = true;
  }, {passive: true});

  // wheel/trackpad horizontal paging
  let wheelLock = false;
  root.addEventListener('wheel', (e)=>{
    // only handle if horizontal intent (or strong vertical like 2-finger scroll)
    const ax = Math.abs(e.deltaX);
    const ay = Math.abs(e.deltaY);
    if (wheelLock) return;
    if (ax > 10 || ay > 30) {
      const dir = (e.deltaX > 0 || e.deltaY > 0) ? 1 : -1;
      wheelLock = true;
      e.preventDefault();
      go(dir, {autoplay:false});
      setTimeout(()=> wheelLock = false, 400);
    }
  }, {passive: false});
  root.addEventListener('touchend', (e)=>{
    if (!isTouching) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - tsX; const dy = t.clientY - tsY;
    isTouching = false;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) go(1, {autoplay:true}); else go(-1, {autoplay:true});
    }
  }, {passive: true});

  cards.forEach(makeThumb);
  update();
  window.addEventListener('resize', ()=> update());
  window.addEventListener('orientationchange', ()=>{
    const active = cards[i];
    if (!active) return;
    const hasIframe = !!active.querySelector('.vc-player iframe');
    if (window.innerWidth <= 700) {
      if (window.innerWidth > window.innerHeight && hasIframe && !document.fullscreenElement) {
        const inner = active.querySelector('.vc-inner') || active.querySelector('.vc-player');
        if (inner && inner.requestFullscreen) try { inner.requestFullscreen(); } catch(_) {}
      } else if (window.innerWidth <= window.innerHeight && document.fullscreenElement) {
        if (document.exitFullscreen) try { document.exitFullscreen(); } catch(_) {}
      }
    }
  });
})();

// Language modal + search
(function(){
  const modal = document.getElementById('langModal');
  if (!modal) return;
  const openers = document.querySelectorAll('.open-lang-modal');
  const closer = modal.querySelector('[data-lang-modal-close]');
  const search = document.getElementById('langSearch');
  const list = document.getElementById('langAllList');
  const links = list ? Array.from(list.querySelectorAll('li')) : [];
  function open() { modal.removeAttribute('hidden'); if (search) setTimeout(()=>search.focus(), 10); }
  function close() { modal.setAttribute('hidden', ''); }
  openers.forEach(el => el.addEventListener('click', (e)=>{ e.preventDefault(); open(); }));
  if (closer) closer.addEventListener('click', (e)=>{ e.preventDefault(); close(); });
  modal.addEventListener('click', (e)=>{ if (e.target === modal) close(); });
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && !modal.hasAttribute('hidden')) close(); });
  if (search && links.length) {
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      links.forEach(li => {
        const text = (li.textContent || '').toLowerCase();
        li.style.display = !q || text.indexOf(q) >= 0 ? '' : 'none';
      })
    })
  }
})();

// Language dropdown (compact lists)
(function(){
  const triggers = Array.from(document.querySelectorAll('#lnNom'));
  if (!triggers.length) return;
  triggers.forEach(trigger => {
    const parent = trigger.closest('.lnNomPar');
    if (!parent) return;
    trigger.addEventListener('click', function(e){
      parent.classList.toggle('open');
    });
    document.addEventListener('click', function(e){
      if (!parent.contains(e.target)) parent.classList.remove('open');
    });
  });
})();

// Integrations grid subtle parallax
(function(){
  const root = document.querySelector('.integrations-grid');
  if (!root) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const items = Array.from(root.querySelectorAll('.svg-link'));
  if (!items.length) return;

  // Stable depth pattern; increase overall depth and avoid zeros for more motion
  const pattern = [0.85, 0.55, 0.2, -0.45, -0.8, 0.35, -0.25, -0.6, 0.5, -0.3, 0.7, 0.15, -0.5, 0.4];
  items.forEach((el, idx) => {
    const d = parseFloat(el.getAttribute('data-depth'));
    const depth = Number.isFinite(d) ? Math.max(-1, Math.min(1, d)) : pattern[idx % pattern.length];
    // @ts-ignore - stash for quick access
    el._depth = depth;
    // small perf hint
    el.style.willChange = 'transform';
  });

  const MAX_SHIFT_DESKTOP = 36; // px
  const MAX_SHIFT_MOBILE = 22;  // px

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    ticking = false;
    const rect = root.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const maxShift = (vh <= 700) ? MAX_SHIFT_MOBILE : MAX_SHIFT_DESKTOP;

    // Visibility progress of the grid through the viewport: 0..1
    const total = rect.height + vh || 1;
    const seen = Math.min(total, Math.max(0, vh - rect.top));
    const phase = seen / total; // 0 at first touch, 1 when fully passed
    const base = (phase - 0.5) * 2 * maxShift; // -max..max around the midpoint

    items.forEach((el) => {
      // @ts-ignore
      const depth = el._depth || 0;
      const shift = Math.round((base * depth) * 100) / 100;
      el.style.transform = `translateY(${shift}px)`;
    });
  }

  // Only run reactions while in view to save work
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll);
          onScroll();
        } else {
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      });
    }, { root: null, threshold: 0 });
    io.observe(root);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }
})();

// Contributors: staggered pop-in (Mexican wave) when in view
(function(){
  const grid = document.getElementById('donGr');
  if (!grid) return;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const items = Array.from(grid.querySelectorAll('.ind-icon'));
  if (!items.length) return;

  // Prepare initial state only when JS is active
  grid.classList.add('-wave-ready');
  items.forEach((el, i) => el.style.setProperty('--i', String(i)));

  function activate() {
    grid.classList.add('is-inview');
  }

  if ('IntersectionObserver' in window) {
    const section = document.getElementById('contributors') || grid;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activate();
          io.disconnect(); // fire once
        }
      });
    }, { root: null, threshold: 0.15 });
    io.observe(section);
  } else {
    // Fallback without IO: trigger shortly after load
    setTimeout(activate, 200);
  }
})();
