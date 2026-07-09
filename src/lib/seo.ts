import type { Metadata } from 'next';
import { SITE, SITE_URL, OG_IMAGE } from './site';

/**
 * Construit les métadonnées d'une page (title, description, canonique, OpenGraph,
 * Twitter). Le suffixe de marque est ajouté par le `title.template` du layout —
 * sauf `titleAbsolute` (utilisé pour l'accueil).
 */
export function pageMetadata(opts: {
  title?: string;
  titleAbsolute?: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path === '/' ? '' : opts.path}`;
  const ogTitle = opts.titleAbsolute ?? (opts.title ? `${opts.title} | ${SITE.name}` : SITE.name);

  return {
    title: opts.titleAbsolute ? { absolute: opts.titleAbsolute } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    ...(opts.index === false ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: ogTitle,
      description: opts.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: opts.description,
      images: [OG_IMAGE],
    },
  };
}
