import { bigtype } from '../data/bigtype.js';

export function renderBigType() {
  const { text, accent = '', suffix = '' } = bigtype;
  const accentMarkup = accent ? `<span class="serif">${accent}</span>` : '';

  return [
    '<div class="bigtype">',
    `  <p class="words" id="words">${text}${accentMarkup}${suffix}</p>`,
    '</div>',
  ].join('\n');
}
