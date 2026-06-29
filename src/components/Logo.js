import { site } from '../data/site.js';
import { escapeHtml } from '../utils/html.js';

function renderLogoImages(height) {
  const alt = escapeHtml(site.name);
  const light = escapeHtml(site.logoUrl);
  const dark = escapeHtml(site.logoUrlDark);

  return [
    `<img class="site-logo__img site-logo__img--light" src="${light}" alt="${alt}" height="${height}" decoding="async">`,
    `<img class="site-logo__img site-logo__img--dark" src="${dark}" alt="" aria-hidden="true" height="${height}" decoding="async">`,
  ].join('\n');
}

export function renderLogo(className, { height = 72, link = true, wordmark = false } = {}) {
  const alt = escapeHtml(site.name);
  const name = escapeHtml(site.name);
  const morphClass = wordmark ? ' site-logo--morph' : '';

  const inner = [
    `<span class="site-logo${morphClass}">`,
    '  <span class="site-logo__mark">',
    `    ${renderLogoImages(height)}`,
    '  </span>',
    wordmark ? `  <span class="site-logo__wordmark" style="font-weight: bold;">${name}</span>` : '',
    '</span>',
  ]
    .filter(Boolean)
    .join('\n');

  if (!link) {
    return `<div class="${className}">${inner}</div>`;
  }

  return [
    `<a href="/" class="${className}" aria-label="${alt} — home">`,
    inner,
    '</a>',
  ].join('\n');
}
