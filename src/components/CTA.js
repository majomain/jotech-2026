import { site } from '../data/site.js';

export function renderCTA() {
  return [
    '<section class="cta" id="contact">',
    '  <h2>let\'s build your <em>digital narrative</em></h2>',
    `  <a class="cta-btn" href="${site.contactUrl}">get in contact</a>`,
    '</section>',
  ].join('\n');
}
