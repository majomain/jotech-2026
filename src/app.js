import { renderFluidBackground, renderProgressBar } from './components/FluidBackground.js';
import { renderNav } from './components/Nav.js';
import { renderHero, renderHeroCollection } from './components/Hero.js';
import { renderBigType } from './components/BigType.js';
import { renderWork } from './components/WorkGrid.js';
import { renderServices } from './components/Services.js';
import { renderMetrics } from './components/Metrics.js';
import { renderCTA } from './components/CTA.js';
import { renderFooter } from './components/Footer.js';

export function renderApp() {
  return [
    renderFluidBackground(),
    renderProgressBar(),
    '<div class="wrap">',
    renderNav(),
    renderHero(),
    renderHeroCollection(),
    renderBigType(),
    renderWork(),
    renderServices(),
    renderMetrics(),
    renderCTA(),
    renderFooter(),
    '</div>',
  ].join('\n');
}
