import { sections } from '../data/navigation.js';

const PATH_TO_SECTION = {
  '/': null,
  ...Object.fromEntries(Object.entries(sections).map(([id, path]) => [path, id])),
};

const SECTION_TO_PATH = Object.fromEntries(
  Object.entries(sections).map(([id, path]) => [id, path]),
);

const INTERNAL_PATHS = new Set(Object.keys(PATH_TO_SECTION));

function normalizePath(path) {
  if (!path || path === '/') return '/';
  return path.replace(/\/+$/, '') || '/';
}

function scrollToPath(path, { smooth = true } = {}) {
  const sectionId = PATH_TO_SECTION[normalizePath(path)];
  if (sectionId === undefined) return false;

  if (!sectionId) {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }

  const target = document.getElementById(sectionId);
  if (!target) return false;

  const nav = document.querySelector('.site-nav');
  const offset = nav ? nav.getBoundingClientRect().height + 16 : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? 'smooth' : 'auto' });
  return true;
}

function navigate(path, { replace = false } = {}) {
  const normalized = normalizePath(path);
  if (!INTERNAL_PATHS.has(normalized)) return;

  if (replace) {
    history.replaceState(null, '', normalized);
  } else {
    history.pushState(null, '', normalized);
  }

  scrollToPath(normalized);
}

function isInternalPath(href) {
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      const url = new URL(href);
      return url.origin === window.location.origin && INTERNAL_PATHS.has(normalizePath(url.pathname));
    } catch {
      return false;
    }
  }

  return INTERNAL_PATHS.has(normalizePath(href));
}

function pathFromHref(href) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return normalizePath(new URL(href).pathname);
  }
  return normalizePath(href);
}

function migrateLegacyHash() {
  const hash = window.location.hash;
  if (!hash || hash === '#') {
    if (hash === '#' && window.location.pathname === '/') {
      history.replaceState(null, '', '/');
    }
    return;
  }

  const sectionId = hash.slice(1);
  const path = SECTION_TO_PATH[sectionId];
  if (path) {
    history.replaceState(null, '', path);
  }
}

/**
 * Path-based section routing with History API (replaces hash URLs).
 */
export function initRouting(root = document) {
  migrateLegacyHash();

  const initialPath = normalizePath(window.location.pathname);
  if (initialPath !== '/') {
    requestAnimationFrame(() => {
      scrollToPath(initialPath, { smooth: false });
    });
  }

  root.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank') return;

    const href = link.getAttribute('href');
    if (!isInternalPath(href)) return;

    event.preventDefault();
    navigate(pathFromHref(href));
  });

  window.addEventListener('popstate', () => {
    scrollToPath(window.location.pathname, { smooth: false });
  });
}
