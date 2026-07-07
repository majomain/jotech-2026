import './styles/main.css';
import { renderApp } from './app.js';
import { renderCaseStudyPage } from './components/CaseStudy.js';
import { getCaseStudyByPath } from './data/caseStudies.js';
import { setCaseStudyMeta } from './utils/meta.js';
import { initTheme } from './js/theme.js';
import { initNavMenu } from './js/navMenu.js';
import { initNavScroll } from './js/navScroll.js';
import { initHeroAnimation, initCaseHeaderAnimation } from './js/heroAnimation.js';
import { initHeroFit } from './js/heroFit.js';
import { initHeroCarousel } from './js/heroCarousel.js';
import { initCounterAnimation } from './js/counterAnimation.js';
import { initBigType } from './js/bigType.js';
import { initScrollEffects } from './js/scrollEffects.js';
import { initScrollReveal } from './js/scrollReveal.js';
import { initServicesAccordion } from './js/servicesAccordion.js';
import { initRouting } from './js/routing.js';
import { initVideoModal } from './js/videoModal.js';

const app = document.getElementById('app');
const caseStudy = getCaseStudyByPath(window.location.pathname);

if (app && caseStudy) {
  setCaseStudyMeta(caseStudy);
  app.innerHTML = renderCaseStudyPage(caseStudy);

  initTheme(document);
  initNavMenu(document);
  initNavScroll(document.querySelector('.site-nav'));
  initCaseHeaderAnimation(document);
  initScrollEffects(document);
  initScrollReveal(document);
} else if (app) {
  app.innerHTML = renderApp();

  initTheme(document);
  initNavMenu(document);
  initNavScroll(document.querySelector('.site-nav'));
  initHeroFit(document);
  initHeroAnimation(document);
  initHeroCarousel(document);
  const words = initBigType(document);
  initScrollEffects(document, words);
  initScrollReveal(document);
  initCounterAnimation(document);
  initServicesAccordion(document);
  initRouting(document);
  initVideoModal(document);
}
