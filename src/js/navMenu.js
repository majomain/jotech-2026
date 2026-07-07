const MOBILE_BREAKPOINT = 860;

export function initNavMenu(root = document) {
  const nav = root.querySelector('.site-nav');
  const toggle = root.querySelector('.nav-toggle');
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-lock');
  };

  toggle.addEventListener('click', () => {
    const open = !nav.classList.contains('nav-open');
    nav.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-lock', open);
  });

  nav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) close();
    },
    { passive: true },
  );
}
