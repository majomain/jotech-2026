import { metrics } from '../data/metrics.js';

export function renderMetrics() {
  const items = metrics
    .map(
      (m, i) => `
    <div class="metric reveal" style="--reveal-delay: ${80 + i * 80}ms">
      ${
        m.display
          ? `<div class="num">${m.display}</div>`
          : `<div class="num" data-count="${m.count}" data-suffix="${m.suffix}">0</div>`
      }
      <div class="lbl">${m.label}</div>
    </div>`
    )
    .join('');

  return [
    '<section class="reveal-group">',
    '  <div class="sec-label metrics-header reveal">By the numbers</div>',
    `  <div class="metrics">${items}`,
    '  </div>',
    '</section>',
  ].join('\n');
}
