export function renderWorkCardIcon(src, size) {
  const sizeClass = size ? ` wcard-icon__img--${size}` : '';
  return `<img class="wcard-icon__img${sizeClass}" src="${src}" alt="" width="360" height="360" loading="lazy" decoding="async">`;
}
