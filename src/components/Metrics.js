import { metrics } from '../data/metrics.js';

export function renderMetrics() {
  const items = metrics
    .map(
      (m) => `
    <div class="metric">
      <div class="num" data-count="${m.count}" data-suffix="${m.suffix}">0</div>
      <div class="lbl">${m.label}</div>
    </div>`
    )
    .join('');

  return [
    '<section>',
    '  <div class="sec-label metrics-header">By the numbers</div>',
    `  <div class="metrics">${items}`,
    '  </div>',
    '</section>',
  ].join('\n');
}
