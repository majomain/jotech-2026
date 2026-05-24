import { site } from '../data/site.js';

export function renderCTA() {
  return [
    '<section class="cta" id="contact">',
    '  <h2 class="reveal">Let\'s build your <span class="it">narrative.</span></h2>',
    `  <a href="${site.contactUrl}" class="cta-btn reveal"><s>Start a project</s> <s>&#8594;</s></a>`,
    '</section>',
  ].join('\n');
}
