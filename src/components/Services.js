import { services } from '../data/services.js';
import { shopifyPartner } from '../data/shopify.js';

function renderService(service) {
  return [
    `<div class="svc${service.open ? ' open' : ''}">`,
    `  <div class="num">${service.num}</div>`,
    `  <h3>${service.title}</h3>`,
    '  <span class="plus">+</span>',
    '  <div class="detail">',
    `    <p>${service.description}</p>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

function renderShopifyPartnerLogo() {
  const { logo, logoDark, logoAlt } = shopifyPartner;

  if (logoDark) {
    return [
      `<img class="shopify-partner__logo-img shopify-partner__logo-img--light" src="${logo}" alt="${logoAlt}" loading="lazy">`,
      `<img class="shopify-partner__logo-img shopify-partner__logo-img--dark" src="${logoDark}" alt="" aria-hidden="true" loading="lazy">`,
    ].join('\n    ');
  }

  return `<img class="shopify-partner__logo-img shopify-partner__logo-img--filter" src="${logo}" alt="${logoAlt}" loading="lazy">`;
}

function renderShopifyPartner() {
  const caps = shopifyPartner.capabilities
    .map((cap) => `<span>${cap}</span>`)
    .join('');

  return [
    '<div class="shopify-partner">',
    '  <div class="shopify-partner__logo">',
    `    ${renderShopifyPartnerLogo()}`,
    '  </div>',
    '  <div class="shopify-partner__body">',
    `    <div class="shopify-partner__tag">${shopifyPartner.tag}</div>`,
    `    <h3 class="shopify-partner__heading">${shopifyPartner.heading}</h3>`,
    `    <p class="shopify-partner__desc">${shopifyPartner.description}</p>`,
    `    <div class="shopify-partner__caps">${caps}</div>`,
    '  </div>',
    '</div>',
  ].join('\n');
}

export function renderServices() {
  const items = services.map(renderService).join('\n  ');

  return [
    '<section id="services">',
    '  <div class="sec-label services-header">Services</div>',
    `  ${items}`,
    `  ${renderShopifyPartner()}`,
    '</section>',
  ].join('\n');
}
