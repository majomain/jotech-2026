import { site } from '../data/site.js';

export function renderCTA() {
  return [
    '<section class="cta" id="contact">',
    '  <h2>let\'s build your <em>narrative.</em></h2>',
    `  <a class="cta-btn" href="${site.contactUrl}">Start a project →</a>`,
    '</section>',
  ].join('\n');
}
