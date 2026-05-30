import './styles/main.css';
import { renderApp } from './app.js';
import { initTheme } from './js/theme.js';
import { initHeroAnimation } from './js/heroAnimation.js';
import { initHeroFit } from './js/heroFit.js';
import { initHeroCarousel } from './js/heroCarousel.js';
import { initCounterAnimation } from './js/counterAnimation.js';
import { initBigType } from './js/bigType.js';
import { initScrollEffects } from './js/scrollEffects.js';
import { initServicesAccordion } from './js/servicesAccordion.js';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = renderApp();

  initTheme(document);
  initHeroFit(document);
  initHeroAnimation(document);
  initHeroCarousel(document);
  const words = initBigType(document);
  initScrollEffects(document, words);
  initCounterAnimation(document);
  initServicesAccordion(document);
}
