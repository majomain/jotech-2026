import { services } from '../data/services.js';

function renderService(service) {
  const tags = service.tags.map((tag) => `<span>${tag}</span>`).join('');

  return [
    '<div class="svc reveal">',
    `  <div class="svc-num">${service.num}</div>`,
    `  <h3>${service.title}</h3>`,
    '  <div>',
    `    <p>${service.description}</p>`,
    `    <div class="svc-tags">${tags}</div>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

export function renderServices() {
  const items = services.map(renderService).join('\n    ');

  return [
    '<section id="services">',
    '  <div class="sec-label reveal">What I do</div>',
    '  <div class="services">',
    `    ${items}`,
    '  </div>',
    '</section>',
  ].join('\n');
}
