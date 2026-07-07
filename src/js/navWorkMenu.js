const MOBILE_BREAKPOINT = 860;

let closeWorkMenu = null;

export function closeNavWorkMenu() {
  closeWorkMenu?.();
}

export function initNavWorkMenu(root = document) {
  const workItem = root.querySelector('.nav-item--work');
  if (!workItem) return;

  const toggle = workItem.querySelector('.nav-item__toggle');
  const panel = workItem.querySelector('.nav-item__panel');
  if (!toggle || !panel) return;

  const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

  const setExpanded = (open) => {
    workItem.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (isMobile()) {
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    } else {
      panel.removeAttribute('aria-hidden');
    }
  };

  const close = () => {
    setExpanded(false);
  };

  closeWorkMenu = close;
  setExpanded(false);

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setExpanded(!workItem.classList.contains('is-open'));
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (isMobile()) close();
    });
  });

  document.addEventListener('click', (event) => {
    if (!workItem.classList.contains('is-open')) return;
    if (workItem.contains(event.target)) return;
    close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  window.addEventListener(
    'resize',
    () => {
      if (isMobile()) {
        close();
      } else {
        panel.removeAttribute('aria-hidden');
      }
    },
    { passive: true },
  );
}
