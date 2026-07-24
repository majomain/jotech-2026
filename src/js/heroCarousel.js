const DRAG_THRESHOLD = 5;
/** Touch drags move the track farther per finger pixel than mouse. */
const TOUCH_DRAG_MULTIPLIER = 2;
/** Extra coast distance after a quick touch flick (px per px/ms). */
const TOUCH_THROW_MS = 320;

/**
 * Portfolio preview carousel: video visibility, hover pause (CSS), drag to scrub.
 */
export function initHeroCarousel(root = document) {
  const carousel = root.querySelector('.hero-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.hero-carousel__track');
  if (!track) return;

  if ('IntersectionObserver' in window) {
    const videos = carousel.querySelectorAll('video');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            // Duplicate-loop tiles defer src via data-src until needed.
            if (video.dataset.src && !video.getAttribute('src')) {
              video.src = video.dataset.src;
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 },
    );
    videos.forEach((video) => observer.observe(video));
  }

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let loopWidth = 0;
  let isDragging = false;
  let dragDistance = 0;
  let startX = 0;
  let startOffset = 0;
  let currentOffset = 0;
  let activePointerType = 'mouse';
  let lastMoveX = 0;
  let lastMoveTime = 0;
  let velocityX = 0;
  let throwFrame = 0;

  const dragMultiplier = () => (activePointerType === 'touch' ? TOUCH_DRAG_MULTIPLIER : 1);

  const measure = () => {
    loopWidth = track.scrollWidth / 2;
  };

  const normalizeOffset = (x) => {
    if (!loopWidth) return 0;
    let o = x % loopWidth;
    if (o > 0) o -= loopWidth;
    return o;
  };

  const readOffset = () => {
    const transform = getComputedStyle(track).transform;
    if (transform === 'none') return 0;
    return new DOMMatrixReadOnly(transform).m41;
  };

  const applyOffset = (x) => {
    currentOffset = normalizeOffset(x);
    track.style.animation = 'none';
    track.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
  };

  const cancelThrow = () => {
    if (throwFrame) {
      cancelAnimationFrame(throwFrame);
      throwFrame = 0;
    }
  };

  const applyTouchThrow = () => {
    if (activePointerType !== 'touch' || Math.abs(velocityX) < 0.2) {
      endDrag(true);
      return;
    }

    const from = currentOffset;
    const throwDistance = velocityX * TOUCH_THROW_MS * dragMultiplier();
    const to = normalizeOffset(from + throwDistance);
    const duration = 260;
    const start = performance.now();

    carousel.classList.remove('is-dragging');
    isDragging = false;
    track.style.animationPlayState = 'paused';

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      currentOffset = from + (to - from) * eased;
      track.style.animation = 'none';
      track.style.transform = `translate3d(${currentOffset}px, 0, 0)`;

      if (t < 1) {
        throwFrame = requestAnimationFrame(tick);
        return;
      }

      throwFrame = 0;
      currentOffset = to;
      resumeAnimation();
    };

    throwFrame = requestAnimationFrame(tick);
  };

  const resumeAnimation = () => {
    measure();
    if (!loopWidth) return;

    const current = readOffset();
    const progress = Math.max(0, Math.min(1, -normalizeOffset(current) / loopWidth));
    const durationMs =
      parseFloat(getComputedStyle(track).animationDuration) * 1000 || 48000;

    track.style.transform = '';
    track.style.animation = '';
    track.style.animationDelay = `${-progress * durationMs}ms`;
  };

  const endDrag = (resume) => {
    cancelThrow();
    if (isDragging) {
      if (resume) resumeAnimation();
      carousel.classList.remove('is-dragging');
      isDragging = false;
    }
    track.style.animationPlayState = '';
  };

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    cancelThrow();
    measure();
    activePointerType = e.pointerType;
    isDragging = false;
    dragDistance = 0;
    startX = e.clientX;
    startOffset = readOffset();
    currentOffset = startOffset;
    lastMoveX = e.clientX;
    lastMoveTime = performance.now();
    velocityX = 0;
    track.style.animationPlayState = 'paused';

    try {
      carousel.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e) => {
    if (!carousel.hasPointerCapture(e.pointerId)) return;

    const now = performance.now();
    const dt = now - lastMoveTime;
    if (dt > 0) {
      const instantVelocity = (e.clientX - lastMoveX) / dt;
      velocityX = velocityX * 0.55 + instantVelocity * 0.45;
    }
    lastMoveX = e.clientX;
    lastMoveTime = now;

    const rawDx = e.clientX - startX;
    const dx = rawDx * dragMultiplier();
    dragDistance = Math.max(dragDistance, Math.abs(rawDx));

    if (!isDragging && Math.abs(rawDx) < DRAG_THRESHOLD) return;

    if (!isDragging) {
      isDragging = true;
      carousel.classList.add('is-dragging');
      startOffset = readOffset();
      currentOffset = startOffset;
    }

    e.preventDefault();
    applyOffset(startOffset + dx);
  };

  const onPointerUp = (e) => {
    if (!carousel.hasPointerCapture(e.pointerId)) return;

    try {
      carousel.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }

    if (isDragging && activePointerType === 'touch') {
      applyTouchThrow();
      return;
    }

    endDrag(isDragging);
  };

  // Suppress link navigation after a scrub so drag does not fire click.
  carousel.addEventListener(
    'click',
    (e) => {
      if (dragDistance > DRAG_THRESHOLD) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true,
  );

  carousel.addEventListener('pointerdown', onPointerDown);
  carousel.addEventListener('pointermove', onPointerMove);
  carousel.addEventListener('pointerup', onPointerUp);
  carousel.addEventListener('pointercancel', onPointerUp);

  let lastMeasureWidth = window.innerWidth;
  const onResize = () => {
    const width = window.innerWidth;
    if (width === lastMeasureWidth) return;
    lastMeasureWidth = width;
    measure();
  };

  window.addEventListener('resize', onResize, { passive: true });
  measure();
}
