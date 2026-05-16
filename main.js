// ====== page-load fade ======
(function () {
  function reveal() {
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  }
  if (document.readyState === 'complete') reveal();
  else window.addEventListener('load', reveal);
})();

// ====== scrollspy: underline current nav (both desktop side-nav + mobile top-nav) ======
(function () {
  const links  = document.querySelectorAll('.nav a[data-target]');
  const mlinks = document.querySelectorAll('.mobile-nav a[data-mtarget]');
  const map = {};
  links.forEach (a => { (map[a.dataset.target]  = map[a.dataset.target]  || []).push(a); });
  mlinks.forEach(a => { (map[a.dataset.mtarget] = map[a.dataset.mtarget] || []).push(a); });
  const sections = ['statement', 'works', 'profile', 'exhibition']
    .map(id => document.getElementById(id));

  function update() {
    const y = (window.scrollY || 0) + window.innerHeight * 0.35;
    let current = sections[0];
    for (const s of sections) {
      if (s.offsetTop <= y) current = s;
    }
    [...links, ...mlinks].forEach(a => a.classList.remove('is-active'));
    if (current && map[current.id]) map[current.id].forEach(a => a.classList.add('is-active'));
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

// ====== to-top visibility ======
(function () {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  function onScroll() {
    if ((window.scrollY || 0) > window.innerHeight * 0.6) btn.classList.add('is-visible');
    else btn.classList.remove('is-visible');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ====== reveal works on enter (fade up) ======
(function () {
  const items = document.querySelectorAll('[data-parallax]');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.05,
  });
  items.forEach(el => io.observe(el));
})();
