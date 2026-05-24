import { renderGrainOverlay } from './components/GrainOverlay.js';
import { renderNav } from './components/Nav.js';
import { renderHero } from './components/Hero.js';
import { renderMarquee } from './components/Marquee.js';
import { renderServices } from './components/Services.js';
import { renderStatement } from './components/Statement.js';
import { renderWork } from './components/WorkGrid.js';
import { renderMetrics } from './components/Metrics.js';
import { renderCTA } from './components/CTA.js';
import { renderFooter } from './components/Footer.js';

export function renderApp() {
  return [
    renderGrainOverlay(),
    renderNav(),
    renderHero(),
    renderMarquee(),
    renderServices(),
    renderStatement(),
    renderWork(),
    renderMetrics(),
    renderCTA(),
    renderFooter(),
  ].join('\n');
}
