import { site } from '../data/site.js';

export function renderCTA() {
  return [
    '<section class="cta reveal-group" id="contact">',
    '  <h2 class="reveal">let\'s build your <em>digital narrative</em></h2>',
    `  <a class="cta-btn reveal" href="${site.contactUrl}" style="--reveal-delay: 120ms">get in contact</a>`,
    '  <p class="cta-note reveal" style="--reveal-delay: 240ms">have a great day 🙂</p>',
    '</section>',
  ].join('\n');
}
