import { sections } from './navigation.js';

const ASSET_BASE = '/case-studies';

export const caseStudies = [
  {
    slug: 'arkim',
    path: '/work/arkim',
    label: 'Case Study — Arkim AI',
    title: 'corporate website for a B2B AI company',
    documentTitle: 'Arkim AI — Case Study | JOTECH',
    metaDescription:
      "How JOTECH translated Arkim AI's technical B2B product into a clear, conversion-driven corporate website for plant managers and operations leaders.",
    summary: [
      'The goal of the project was to translate a deeply technical product into a clear, credible story for plant managers and operations leadership — communicating value fast, building enterprise trust across regulated industries, and guiding decision-makers toward a consultation. Emphasis was placed on structured, role-based messaging for operators, technicians, and management, and a confident visual system that reflects precision and industrial-grade reliability.',
      'The result is a conversion-driven corporate presence that positions Arkim as the modern alternative to sensor-heavy legacy platforms — delivering value in week one, not month six.',
    ],
    liveUrl: 'https://arkim.ai',
    client: 'Arkim AI',
    service: 'Web Design & Development',
    year: '2026',
    cover: {
      src: `${ASSET_BASE}/arkim/01-hero.jpg`,
      alt: 'Arkim AI homepage hero — industrial maintenance, re-leveraged',
    },
    gallery: [
      {
        src: `${ASSET_BASE}/arkim/02-why-arkim.jpg`,
        alt: 'Why Arkim section — the maintenance workforce is shrinking',
      },
      {
        src: `${ASSET_BASE}/arkim/03-how-it-works.jpg`,
        alt: 'How it works section — diagnose before you dispatch',
      },
      {
        src: `${ASSET_BASE}/arkim/04-who-uses-arkim.jpg`,
        alt: 'Who uses Arkim — operators, technicians, and management on one platform',
      },
      {
        src: `${ASSET_BASE}/arkim/05-roi-comparison.jpg`,
        alt: 'ROI comparison — Arkim versus legacy sensor platforms',
      },
      {
        src: `${ASSET_BASE}/arkim/06-enterprise-ready.jpg`,
        alt: 'Enterprise ready section — built for regulated industries',
      },
      {
        src: `${ASSET_BASE}/arkim/07-consultation-cta.jpg`,
        alt: 'Consultation call-to-action — tell us about your facility',
      },
      {
        src: `${ASSET_BASE}/arkim/08-footer.jpg`,
        alt: 'Arkim AI site footer',
      },
    ],
  },
  {
    slug: 'jmcveigh',
    path: '/work/jmcveigh',
    label: 'Case Study — J. McVeigh Jewelry',
    title: 'store migration for a fine jewelry boutique',
    documentTitle: 'J. McVeigh Jewelry — Case Study | JOTECH',
    metaDescription:
      'How JOTECH migrated J. McVeigh Jewelry to Shopify — preserving brand tone while rebuilding catalog, checkout, and merchandising for a fine jewelry boutique.',
    summary: [
      'The goal of the project was to move the full product catalog onto Shopify without losing momentum — preserving collections, product detail, and brand tone while rebuilding checkout, navigation, and content structure from the ground up. Emphasis was placed on clear merchandising for new arrivals and birthstone collections, event promotion for in-store appearances, and a polished product page template suited to one-of-a-kind inventory with rich imagery and stone attributes.',
      'The result is a streamlined Shopify storefront that supports ongoing merchandising, appointment scheduling, and discovery — giving J. McVeigh Jewelry a modern e-commerce foundation built to scale with new designers, seasonal collections, and in-store events.',
    ],
    liveUrl: 'https://jmcveigh-jewelry.myshopify.com/',
    client: 'J. McVeigh Jewelry',
    service: 'Shopify Migration & Store Build',
    year: '2026',
    cover: {
      src: 'https://assets.jotech.co/port-JMcV-updated.png',
      alt: 'J. McVeigh Jewelry homepage hero — custom, one-of-a-kind and finely crafted jewelry',
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
        alt: 'Product detail page — Halo Ring with Unheated Blue Sapphire',
      },
      {
        src: `${ASSET_BASE}/jmcveigh/08-footer.jpg`,
        alt: 'J. McVeigh Jewelry site footer',
      },
    ],
  },
];

export const caseStudyNavItems = caseStudies.map(({ client, path }) => ({
  label: client,
  href: path,
}));

function withNavigation(study, index) {
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return {
    ...study,
    back: { label: 'back to work', href: sections.work },
    next: { label: nextStudy.client, href: nextStudy.path },
  };
}

export function getCaseStudyByPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const index = caseStudies.findIndex((study) => study.path === normalized);
  if (index === -1) return null;

  return withNavigation(caseStudies[index], index);
}
