const MIN_SIZE = 28;
const MAX_SIZE = 68;
const MOBILE_MAX_SIZE = 48;
const MOBILE_BREAKPOINT = 860;
/** Share of stage content height reserved for headline block (rest → carousel) */
const HEADLINE_SHARE = 0.42;

/**
 * Fits headline + carousel into exactly one viewport: caps type size and stretches slides.
 */
export function initHeroFit(root = document) {
  const stage = root.querySelector('.hero-stage');
  const collection = root.querySelector('.hero-collection');
  const carousel = root.querySelector('.hero-carousel');
  const main = root.querySelector('.hero-main');
  const h1 = root.querySelector('.hero h1');
  const eyebrow = root.querySelector('.hero .eyebrow');
  if (!stage || !collection || !carousel || !main || !h1) return;

  const syncSlides = () => {
    const h = Math.floor(carousel.clientHeight);
    if (h > 0) {
      stage.style.setProperty('--hero-slide-h', `${h}px`);
    }
  };

  const fitHeadline = () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const minSize = isMobile ? 24 : MIN_SIZE;
    const maxSize = isMobile ? MOBILE_MAX_SIZE : MAX_SIZE;
    const stageStyle = getComputedStyle(stage);
    const stagePad =
      parseFloat(stageStyle.paddingTop) + parseFloat(stageStyle.paddingBottom);
    const rowGap = parseFloat(stageStyle.rowGap) || 0;
    const innerH = stage.clientHeight - stagePad - rowGap;

    const headlineBudget =
      innerH * HEADLINE_SHARE -
      (eyebrow ? eyebrow.offsetHeight + (isMobile ? 10 : 14) : 0);

    if (headlineBudget <= 0) return;

    const availW = main.clientWidth;

    let low = minSize;
    let high = maxSize;
    let best = minSize;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      h1.style.fontSize = `${mid}px`;

      if (h1.scrollHeight <= headlineBudget && h1.scrollWidth <= availW) {
        best = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    h1.style.fontSize = `${best}px`;
  };

  const layout = () => {
    fitHeadline();
    syncSlides();
  };

  layout();
  requestAnimationFrame(layout);

  window.addEventListener('resize', layout, { passive: true });

  if (document.fonts?.ready) {
    document.fonts.ready.then(layout).catch(() => {});
  }

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(layout);
    ro.observe(stage);
    ro.observe(carousel);
  }
}
