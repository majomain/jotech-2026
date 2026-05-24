import './styles/main.css';
import { renderApp } from './app.js';
import { initNavScroll } from './js/navScroll.js';
import { initHeroAnimation } from './js/heroAnimation.js';
import { initScrollReveal } from './js/scrollReveal.js';
import { initCounterAnimation } from './js/counterAnimation.js';

const app = document.getElementById('app');

if (app) {
  app.innerHTML = renderApp();

  initNavScroll(document.getElementById('nav'));
  initHeroAnimation(document);
  initScrollReveal(document);
  initCounterAnimation(document);
}
