import { hero as heroData } from '../data/hero.js';

export function renderHero() {
  const lines = heroData.lines
    .map((line) => {
      const inner = line.html
        ? `<b>${line.text}</b>`
        : `<b${line.className ? ` class="${line.className}"` : ''}>${line.text}</b>`;
      return `<span class="line">${inner}</span>`;
    })
    .join('\n    ');

  const subtitles = heroData.subtitles
    .map(
      (sub) =>
        `<p class="fade-up" style="animation-delay:${sub.delay}">${sub.text}</p>`
    )
    .join('\n    ');

  return [
    '<header class="hero">',
    `  <div class="eyebrow"><b>${heroData.eyebrow}</b></div>`,
    '  <h1>',
    `    ${lines}`,
    '  </h1>',
    '  <div class="hero-sub">',
    `    ${subtitles}`,
    '  </div>',
    `  <div class="scroll-cue fade-up" style="animation-delay:${heroData.scrollCueDelay}"><i></i> ${heroData.scrollCue}</div>`,
    '</header>',
  ].join('\n');
}
