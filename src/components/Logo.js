import { site } from '../data/site.js';
import { escapeHtml } from '../utils/html.js';

export function renderLogo(className, { height = 72, link = true, wordmark = false } = {}) {
  const alt = escapeHtml(site.name);
  const name = escapeHtml(site.name);

  const inner = `<span class="site-logo site-logo--text" style="font-weight: bold;">${name}</span>`;

  if (!link) {
    return `<div class="${className}">${inner}</div>`;
  }

  return [
    `<a href="/" class="${className}" aria-label="${alt} — home">`,
    inner,
    '</a>',
  ].join('\n');
}
