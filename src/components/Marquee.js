import { marqueeItems } from '../data/marquee.js';

function buildMarqueeSegment(items) {
  return items
    .map((item, i) => {
      const separator =
        i % 2 === 0
          ? ' <span class="st">&#10022;</span> '
          : ' <span class="it">+</span> ';
      return item + separator;
    })
    .join('');
}

export function renderMarquee() {
  const segment = buildMarqueeSegment(marqueeItems);
  const track = `${segment}${segment}`;

  return [
    '<div class="marquee">',
    '  <div class="mtrack">',
    `    <span>${track}</span>`,
    '  </div>',
    '</div>',
  ].join('\n');
}
