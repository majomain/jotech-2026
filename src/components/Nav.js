import { site } from '../data/site.js';
import { navLinks } from '../data/navigation.js';
import { linkAttrs } from '../utils/html.js';

export function renderNav() {
  const links = navLinks
    .map((link) => `<a ${linkAttrs(link)}>${link.label}</a>`)
    .join('');

  return [
    '<nav class="site-nav">',
    `  <a href="#" class="logo">${site.name}</a>`,
    '  <div class="nav-end">',
    `    <div class="nav-links">${links}</div>`,
    '    <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme">Dark</button>',
    '  </div>',
    '</nav>',
  ].join('\n');
}
