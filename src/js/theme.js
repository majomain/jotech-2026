const STORAGE_KEY = 'jotech-theme';

export function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Syncs theme toggle label and handles user preference.
 */
export function initTheme(root = document) {
  const toggle = root.getElementById('theme-toggle');
  const theme = document.documentElement.getAttribute('data-theme') || getInitialTheme();

  applyTheme(theme);
  updateToggleLabel(toggle, theme);

  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    updateToggleLabel(toggle, next);
  });
}

function updateToggleLabel(toggle, theme) {
  if (!toggle) return;
  const next = theme === 'dark' ? 'light' : 'dark';
  toggle.textContent = next.charAt(0).toUpperCase() + next.slice(1);
  toggle.setAttribute('aria-label', `Switch to ${next} mode`);
}
