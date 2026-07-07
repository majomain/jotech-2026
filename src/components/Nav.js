import { renderLogo } from './Logo.js';
import { navLinks, sections } from '../data/navigation.js';
import { caseStudyNavItems } from '../data/caseStudies.js';
import { escapeHtml, linkAttrs } from '../utils/html.js';

function renderWorkNavItem() {
  const studyLinks = caseStudyNavItems
    .map(
      (item) =>
        `<a class="nav-item__study" ${linkAttrs(item)}>${escapeHtml(item.label)}</a>`,
    )
    .join('\n        ');

  return [
    '<div class="nav-item nav-item--work">',
    '  <div class="nav-item__trigger">',
    `    <a class="nav-item__link" ${linkAttrs({ href: sections.work })}>Work</a>`,
    '    <button type="button" class="nav-item__toggle" aria-expanded="false" aria-controls="work-nav-panel" aria-label="Show case studies">',
    '      <span class="nav-item__chevron" aria-hidden="true"></span>',
    '    </button>',
    '  </div>',
    '  <div class="nav-item__panel" id="work-nav-panel">',
    `    ${studyLinks}`,
    `    <a class="nav-item__all" ${linkAttrs({ href: sections.work })}>All Work <span aria-hidden="true">&rarr;</span></a>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

function renderNavLinks() {
  const otherLinks = navLinks
    .filter((link) => link.href !== sections.work)
    .map((link) => `<a ${linkAttrs(link)}>${link.label}</a>`)
    .join('');

  return `${renderWorkNavItem()}\n      ${otherLinks}`;
}

export function renderNav() {
  return [
    '<nav class="site-nav">',
    `  ${renderLogo('logo', { wordmark: true })}`,
    '  <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu">',
    '    <span class="nav-toggle__bar"></span>',
    '    <span class="nav-toggle__bar"></span>',
    '  </button>',
    '  <div class="nav-end" id="nav-menu">',
    `    <div class="nav-links">${renderNavLinks()}</div>`,
    '    <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle color theme">Dark</button>',
    '  </div>',
    '</nav>',
  ].join('\n');
}
