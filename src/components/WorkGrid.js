import { workItems } from '../data/work.js';

function renderCard(item) {
  return [
    '<div class="wcard">',
    `  <div class="bg"></div>`,
    '  <div class="ov"></div>',
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
