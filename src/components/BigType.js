import { bigtype } from '../data/bigtype.js';

export function renderBigType() {
  return [
    '<div class="bigtype">',
    '  <p class="words" id="words">',
    `    ${bigtype.text}<span class="serif">${bigtype.accent}</span>${bigtype.suffix}`,
    '  </p>',
    '</div>',
  ].join('\n');
}
