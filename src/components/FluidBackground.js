export function renderFluidBackground() {
  return [
    '<div class="fluid">',
    '  <div class="blob b1"></div>',
    '  <div class="blob b2"></div>',
    '  <div class="blob b3"></div>',
    '</div>',
    '<div class="scrim"></div>',
    '<div class="noise"></div>',
  ].join('\n');
}

export function renderProgressBar() {
  return '<div class="prog" id="prog"></div>';
}
