import { workItems } from '../data/work.js';

function renderCard(item) {
  return [
    `<div class="card ${item.size} reveal">`,
    `  <div class="bg ${item.bg}"></div>`,
    '  <div class="ov"></div>',
    `  <span class="kicker">${item.kicker}</span>`,
    `  <h4>${item.title}</h4>`,
    `  <p>${item.description}</p>`,
    '</div>',
  ].join('\n');
}

export function renderWork() {
  const cards = workItems.map(renderCard).join('\n    ');

  return [
    '<section id="work">',
    '  <div class="sec-label reveal">Selected work</div>',
    '  <div class="work-grid">',
    `    ${cards}`,
    '  </div>',
    '</section>',
  ].join('\n');
}
