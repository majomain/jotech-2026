export const SITE_ORIGIN = 'https://jotech.co';

export const homeShareMeta = {
  title: 'JOTECH · Design + Narrative',
  description:
    'JOTECH · Design + Narrative. Modern, high-impact visuals for B2B brands. Web design, development, marketing, and technical solutions.',
  url: `${SITE_ORIGIN}/`,
  image: 'https://assets.jotech.co/landscape-logo-withcopy.jpg',
  imageWidth: '1200',
  imageHeight: '628',
  type: 'website',
};

function absoluteUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return new URL(src, SITE_ORIGIN).href;
}

/**
 * Share / Open Graph fields for a case study (crawlable + client meta).
 */
export function getCaseStudyShareMeta(study) {
  return {
    title: study.documentTitle,
    description: study.metaDescription,
    url: new URL(study.path, SITE_ORIGIN).href,
    image: absoluteUrl(study.ogImage ?? study.cover?.src) || homeShareMeta.image,
    imageWidth: study.ogImageWidth ?? undefined,
    imageHeight: study.ogImageHeight ?? undefined,
    type: 'article',
  };
}
