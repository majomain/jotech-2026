import { team } from '../data/founder.js';
import { linkAttrs } from '../utils/html.js';

function renderMember(member, index) {
  const flip = index % 2 === 1;
  const actions = [
    `        <a class="founder__link" ${linkAttrs({ href: member.linkedInUrl, external: true })}>Connect on LinkedIn →</a>`,
  ];
  if (member.email) {
    actions.push(`        <a class="founder__link" href="mailto:${member.email}">Email →</a>`);
  }
  return [
    `  <div class="founder__grid${flip ? ' founder__grid--flip' : ''}">`,
    '    <figure class="founder__portrait reveal">',
    `      <img src="${member.image}" alt="${member.imageAlt}" width="640" height="640" loading="lazy" decoding="async">`,
    '    </figure>',
    '    <div class="founder__body reveal">',
    `      <p class="founder__role">${member.role}</p>`,
    `      <h2 class="founder__name">${member.name}</h2>`,
    `      <p class="founder__headline">${member.headline}</p>`,
    `      <p class="founder__bio">${member.bio}</p>`,
    `      <div class="founder__actions">`,
    ...actions,
    '      </div>',
    '    </div>',
    '  </div>',
  ].join('\n');
}

export function renderFounder() {
  return [
    '<section class="founder reveal-group" id="founder">',
    '  <div class="sec-label founder-header reveal">TEAM</div>',
    ...team.map(renderMember),
    '</section>',
  ].join('\n');
}
