import { site } from '../data/site.js';
import { escapeHtml } from '../utils/html.js';

export function renderLogo(className, size = 36) {
  const alt = escapeHtml(site.name);
  const src = escapeHtml(site.logoUrl);

  return [
    `<a href="/" class="${className}" aria-label="${alt} — home">`,
    `  <img src="${src}" alt="${alt}" width="${size}" height="${size}" decoding="async">`,
    '</a>',
  ].join('\n');
}
