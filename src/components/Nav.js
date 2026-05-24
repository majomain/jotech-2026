import { navLinks } from '../data/navigation.js';
import { linkAttrs } from '../utils/html.js';

export function renderNav() {
  const links = navLinks
    .map((link) => `<a ${linkAttrs(link)}>${link.label}</a>`)
    .join('');

  return [
    '<nav id="nav">',
    '  <div class="logo">JO<b>TECH</b></div>',
    `  <div class="nav-links">${links}</div>`,
    '</nav>',
  ].join('\n');
}
