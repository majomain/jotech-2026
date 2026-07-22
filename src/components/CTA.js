import { site } from '../data/site.js';

export function renderCTA() {
  return [
    '<section class="cta reveal-group" id="contact">',
    '  <h2 class="reveal">Let\'s build your <em>digital narrative</em></h2>',
    `  <a class="cta-btn reveal" href="${site.contactUrl}" style="--reveal-delay: 120ms">Get in contact</a>`,
    '  <p class="cta-note reveal" style="--reveal-delay: 240ms">Have a great day 🙂</p>',
    '</section>',
  ].join('\n');
}
