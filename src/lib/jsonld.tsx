import { SITE, SITE_URL, OG_IMAGE } from './site';

type Json = Record<string, unknown>;

/** Bloc <script type="application/ld+json"> — rendu côté serveur. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      // Les données sont statiques/maîtrisées : pas d'injection utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** ProfessionalService (sous-type de LocalBusiness) — identité + NAP réel + zones desservies. */
export function organizationLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    image: `${SITE_URL}${OG_IMAGE}`,
    logo: `${SITE_URL}/sweet_logo.png`,
    description: SITE.description,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.streetAddress,
      postalCode: SITE.address.postalCode,
      addressLocality: SITE.address.addressLocality,
      addressRegion: SITE.address.addressRegion,
      addressCountry: SITE.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    founder: SITE.founders.map((name) => ({ '@type': 'Person', name })),
    knowsAbout: [
      'Création de site web',
      'Site vitrine',
      'Site e-commerce',
      'Développement React',
      'Référencement naturel (SEO)',
      'Design web',
      'Back-office sur mesure',
    ],
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  };
}

/** WebSite — aide Google à afficher le bon nom de site. */
export function websiteLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    inLanguage: 'fr-FR',
    publisher: { '@id': `${SITE_URL}/#business` },
  };
}

/** Service — décrit une prestation, reliée au fournisseur (l'agence). */
export function serviceLd(params: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${params.path}#service`,
    name: params.name,
    serviceType: params.serviceType ?? params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: SITE.areaServed.map((name) => ({ '@type': 'Place', name })),
    inLanguage: 'fr-FR',
  };
}

/** BreadcrumbList — fil d'Ariane affiché dans la SERP. */
export function breadcrumbLd(items: { name: string; path?: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
    })),
  };
}

/** FAQPage — valeur sémantique (le rich result FAQ est restreint depuis 2023, mais le balisage aide la compréhension). */
export function faqLd(items: { question: string; answer: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
