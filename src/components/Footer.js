import { site } from '../data/site.js';
import { footerLinks } from '../data/navigation.js';
import { linkAttrs } from '../utils/html.js';

export function renderFooter() {
  const links = footerLinks
    .map((link) => `<a ${linkAttrs(link)}>${link.label}</a>`)
    .join('');

  return [
    '<footer>',
    '  <div class="foot-logo">JO<b>TECH</b></div>',
    `  <div class="foot-links">${links}</div>`,
    `  <div class="foot-copy">${site.copyright}</div>`,
    '</footer>',
  ].join('\n');
}
