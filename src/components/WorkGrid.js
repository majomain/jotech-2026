import { workItems } from '../data/work.js';
import { renderWorkCardIcon } from './icons/WorkCardIcon.js';

function renderCardIcon(item) {
  if (!item.icon) return '';

  return [
    '  <div class="wcard-icon" aria-hidden="true">',
    `    ${renderWorkCardIcon(item.icon)}`,
    '  </div>',
  ].join('\n');
}

function renderCard(item) {
  return [
    '<div class="wcard">',
    `  <div class="bg"></div>`,
    '  <div class="ov"></div>',
    renderCardIcon(item),
    '  <div class="body">',
    `    <span class="kick">${item.kicker}</span>`,
    `    <h3>${item.title}</h3>`,
    `    <p>${item.description}</p>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

export function renderWork() {
  const cards = workItems.map(renderCard).join('\n      ');

  return [
    '<div class="hwrap" id="work">',
    '  <div class="hsticky">',
    '    <div class="htrack" id="htrack">',
    '      <div class="intro">',
    '        <div class="sec-label">Selected Work</div>',
        '        <h2>stories,<br>made <em>visible.</em></h2>',
    '      </div>',
    `      ${cards}`,
    '    </div>',
    '  </div>',
    '</div>',
  ].join('\n');
}
