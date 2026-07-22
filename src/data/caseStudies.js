import { sections } from './navigation.js';

const ASSET_BASE = '/case-studies';

export const caseStudies = [
  {
    slug: 'arkim',
    path: '/work/arkim',
    label: 'Case Study · Arkim AI',
    title: 'Arkim AI',
    documentTitle: 'Arkim AI · Case Study | JOTECH',
    metaDescription:
      "How JOTECH translated Arkim AI's technical B2B product into a clear, conversion-driven corporate website for plant managers and operations leaders.",
    outcome:
      'Turning a deeply technical maintenance platform into a clear, credible story built for enterprise decision-makers.',
    liveUrl: 'https://arkim.ai',
    websiteLabel: 'arkim.ai',
    client: 'Arkim AI',
    service: 'Strategy, Identity, Web Design & Development',
    year: '2025',
    industry: 'Industrial AI',
    leadVisual: {
      type: 'video',
      src: 'https://assets.jotech.co/port-arkim-intro-reel.mp4',
      alt: 'Arkim AI website and identity reel',
    },
    introVisuals: [
      {
        src: 'https://assets.jotech.co/arlim-laptop-mock.avif',
        alt: 'Arkim AI website presented on a laptop',
      },
      {
        src: 'https://assets.jotech.co/arkim-mobile-mock-004.avif',
        alt: 'Arkim AI mobile website presented across phone mockups',
      },
      {
        src: `${ASSET_BASE}/arkim/02-why-arkim.jpg`,
        alt: 'Arkim page explaining the shrinking maintenance workforce',
      },
    ],
    story: [
      {
        intro: false,
        layout: 'full',
        media: [
          {
            src: `${ASSET_BASE}/arkim/03-how-it-works.jpg`,
            alt: 'Arkim product workflow showing diagnosis before dispatch',
            label: 'Clarity',
            caption:
              'A three-step product story turns the underlying system into an easy path from signal to action.',
          },
          {
            src: `${ASSET_BASE}/arkim/04-who-uses-arkim.jpg`,
            alt: 'Arkim role-based messaging for operators, technicians, and management',
            label: 'Relevance',
            caption:
              'Role-specific outcomes help each stakeholder recognize their place in the platform.',
          },
        ],
      },
      {
        intro: false,
        layout: 'identity-pair',
        media: [
          {
            src: 'https://assets.jotech.co/arkim-color-palette.gif',
            alt: 'Arkim AI color system moving through its core brand palette',
            label: 'Color system',
            caption:
              'High-contrast accents identify key moments while the neutral canvas keeps information calm and legible.',
            loop: true,
          },
          {
            src: 'https://assets.jotech.co/port-arkim-tee.avif',
            alt: 'Arkim AI identity applied to a branded T-shirt',
            label: 'Brand application',
            caption:
              'The identity extends beyond the interface into a practical team touchpoint without losing its industrial character.',
            variant: 'square',
          },
        ],
      },
    ],
  },
  {
    slug: 'jmcveigh',
    path: '/work/jmcveigh',
    label: 'Case Study · J. McVeigh Jewelry',
    title: 'Store migration for a fine jewelry boutique',
    titleLines: [
      { text: 'Store migration for' },
      { text: 'a fine jewelry boutique' },
    ],
    documentTitle: 'J. McVeigh Jewelry · Case Study | JOTECH',
    metaDescription:
      'How JOTECH migrated J. McVeigh Jewelry to Shopify while preserving brand tone and rebuilding catalog, checkout, and merchandising for a fine jewelry boutique.',
    summary: [
      'The goal of the project was to move the full product catalog onto Shopify without losing momentum, preserving collections, product detail, and brand tone while rebuilding checkout, navigation, and content structure from the ground up. Emphasis was placed on clear merchandising for new arrivals and birthstone collections, event promotion for in-store appearances, and a polished product page template suited to one-of-a-kind inventory with rich imagery and stone attributes.',
      'The result is a streamlined Shopify storefront that supports ongoing merchandising, appointment scheduling, and discovery, giving J. McVeigh Jewelry a modern e-commerce foundation built to scale with new designers, seasonal collections, and in-store events.',
    ],
    liveUrl: 'https://jmcveigh-jewelry.myshopify.com/',
    client: 'J. McVeigh Jewelry',
    service: 'Shopify Migration & Store Build',
    year: '2026',
    cover: {
      src: 'https://assets.jotech.co/port-JMcV-updated.png',
      alt: 'J. McVeigh Jewelry homepage hero: custom, one-of-a-kind and finely crafted jewelry',
    },
    gallery: [
      {
        src: `${ASSET_BASE}/jmcveigh/02-events.jpg`,
        alt: 'Trunk show and personal appearance event promotions',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/03-new-arrivals.jpg`,
        alt: 'New arrivals product grid on the homepage',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/04-location.jpg`,
        alt: 'Stonington, Maine location section',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/05-birthstones.jpg`,
        alt: 'Birthstones collection browsing by month',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/06-collection.jpg`,
        alt: 'All jewelry collection page with product grid',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/07-product.jpg`,
        alt: 'Product detail page: Halo Ring with Unheated Blue Sapphire',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/08-footer.jpg`,
        alt: 'J. McVeigh Jewelry site footer',
      },
    ],
  },
];

function withNavigation(study, index) {
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return {
    ...study,
    back: { label: 'Back to work', href: sections.work },
    next: { label: nextStudy.client, href: nextStudy.path },
  };
}

export function getCaseStudyByPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const index = caseStudies.findIndex((study) => study.path === normalized);
  if (index === -1) return null;

  return withNavigation(caseStudies[index], index);
}
