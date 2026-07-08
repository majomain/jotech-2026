/**
 * Autoplay gallery videos when visible; keep looping GIFs running after scroll.
 */
export function initCaseStudyMedia(root = document) {
  const videos = root.querySelectorAll('.case-figure__video');

  if (videos.length) {
    videos.forEach((video) => {
      video.loop = true;
      video.muted = true;
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target;
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
          });
        },
        { threshold: 0.35 },
      );

      videos.forEach((video) => observer.observe(video));
    } else {
      videos.forEach((video) => video.play().catch(() => {}));
    }
  }

  root.querySelectorAll('[data-loop-gif]').forEach((img) => {
    if (!('IntersectionObserver' in window)) return;

    const baseSrc = img.getAttribute('src');
    let hasLeftView = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hasLeftView) {
              img.src = '';
              img.src = baseSrc;
              hasLeftView = false;
            }
            return;
          }

          hasLeftView = true;
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(img);
  });
}
