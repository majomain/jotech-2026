import { founder } from '../data/founder.js';
import { linkAttrs } from '../utils/html.js';

export function renderFounder() {
  return [
    '<section class="founder" id="founder">',
    '  <div class="sec-label founder-header">Our TEAM</div>',
    '  <div class="founder__grid">',
    '    <figure class="founder__portrait reveal">',
    `      <img src="${founder.image}" alt="${founder.imageAlt}" width="640" height="640" loading="lazy" decoding="async">`,
    '    </figure>',
    '    <div class="founder__body reveal">',
    `      <p class="founder__role">${founder.role}</p>`,
    `      <h2 class="founder__name">${founder.name}</h2>`,
    `      <p class="founder__headline">${founder.headline}</p>`,
    `      <p class="founder__bio">${founder.bio}</p>`,
    `      <div class="founder__actions">`,
    `        <a class="founder__link" ${linkAttrs({ href: founder.linkedInUrl, external: true })}>Connect on LinkedIn →</a>`,
    `        <a class="founder__link" href="mailto:${founder.email}">Email →</a>`,
    '      </div>',
    '    </div>',
    '  </div>',
    '</section>',
  ].join('\n');
}
