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
        src: `${ASSET_BASE}/arkim/02-why-arkim.jpg`,
        alt: 'Arkim page explaining the shrinking maintenance workforce',
      },
      {
        src: 'https://assets.jotech.co/arkim-mobile-mock-004.avif',
        alt: 'Arkim AI mobile website presented across phone mockups',
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
          },
          {
            src: `${ASSET_BASE}/arkim/04-who-uses-arkim.jpg`,
            alt: 'Arkim role-based messaging for operators, technicians, and management',
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
              'Bold accents where it counts. A calm, neutral canvas everywhere else.',
            loop: true,
          },
          {
            src: 'https://assets.jotech.co/port-arkim-tee.avif',
            alt: 'Arkim AI identity applied to a branded T-shirt',
            label: 'Brand application',
            caption:
              'The brand works off-screen too. Industrial character, intact on cotton.',
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
    title: 'J. McVeigh Jewelry',
    documentTitle: 'J. McVeigh Jewelry · Case Study | JOTECH',
    metaDescription:
      'How JOTECH migrated J. McVeigh Jewelry to Shopify while preserving brand tone and rebuilding catalog, checkout, and merchandising for a fine jewelry boutique.',
    outcome:
      'Moving a fine jewelry boutique onto Shopify with its catalog, collections, and quiet gallery character intact.',
    liveUrl: 'https://jmcveigh-jewelry.myshopify.com/',
    websiteLabel: 'jmcveigh-jewelry.myshopify.com',
    client: 'J. McVeigh Jewelry',
    service: 'Shopify Migration & Store Build',
    year: '2026',
    industry: 'Fine Jewelry',
    ogImage: 'https://assets.jotech.co/port-JMcV-updated.png',
    leadVisual: {
      src: 'https://assets.jotech.co/jmcveigh-laptop-mockup-16-9.avif',
      alt: 'J. McVeigh Jewelry website presented on a laptop',
    },
    introVisuals: [
      {
        src: 'https://assets.jotech.co/jmcveigh-jewelry-product-feature.png',
        alt: 'Product detail page: Carved Glacier Cuff Bracelet with Ruby by Barbara Heinrich',
      },
      {
        type: 'video',
        src: 'https://assets.jotech.co/jmcveigh-reel-21-9-FX.mp4',
        alt: 'J. McVeigh Jewelry product photography reel',
        aspectRatio: '21/9',
        fit: 'contain',
      },
    ],
    story: [
      {
        intro: false,
        layout: 'identity-pair',
        media: [
          {
            type: 'video',
            src: 'https://assets.jotech.co/jmcveigh-color-palette.mp4',
            alt: 'J. McVeigh Jewelry color system moving through its core brand palette',
            label: 'Color system',
            caption:
              'Quiet neutrals and warm metal tones. Room for the jewelry to lead.',
          },
          {
            type: 'video',
            src: 'https://assets.jotech.co/rg-video-crownwork-sqr.mp4',
            alt: 'Crownwork jewelry craftsmanship detail',
            label: 'Brand application',
            caption:
              'The brand lives in the work itself. Material, finish, and light.',
            variant: 'square',
          },
        ],
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
