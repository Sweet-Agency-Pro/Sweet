/**
 * Constantes centrales du site — SEO, coordonnées (NAP), zones desservies.
 *
 * IMPORTANT SEO local : l'entreprise est réellement domiciliée à Wasselonne (67).
 * On déclare cette adresse RÉELLE dans le JSON-LD (cohérence NAP avec les mentions
 * légales), et on cible Strasbourg / l'Eurométropole / l'Alsace via `areaServed`
 * et le contenu on-page. On n'invente jamais une adresse Strasbourg (contraire aux
 * consignes Google + incohérence NAP = signal négatif).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.agence-sweet.com'
).replace(/\/$/, '');

export const SITE = {
  name: 'Agence Sweet',
  legalName: 'Agence Sweet',
  shortName: 'Sweet',
  url: SITE_URL,
  locale: 'fr_FR',
  // Description par défaut (accueil) — orientée local Alsace / Strasbourg.
  description:
    "Agence web à Wasselonne, près de Strasbourg. Création de sites vitrine, e-commerce et back-office sur mesure : design, développement React, SEO et performance pour les entreprises d'Alsace.",
  email: 'contact@agence-sweet.com',
  phone: '+33683949690',
  phoneDisplay: '+33 6 83 94 96 90',
  founders: ['Attilio Jaeger', 'Maël Kempf--le-Pape'],
  address: {
    streetAddress: '21 rue du 23 Novembre',
    postalCode: '67310',
    addressLocality: 'Wasselonne',
    addressRegion: 'Grand Est',
    addressCountry: 'FR',
  },
  canonical: "https://www.agence-sweet.com/",
  geo: {
    // Wasselonne (Bas-Rhin) — coordonnées approximatives du centre-ville.
    latitude: 48.6366,
    longitude: 7.4457,
  },
  // Zones réellement desservies (organique + argumentaire commercial).
  areaServed: [
    'Strasbourg',
    'Eurométropole de Strasbourg',
    'Wasselonne',
    'Molsheim',
    'Saverne',
    'Bas-Rhin',
    'Alsace',
    'Grand Est',
  ],
  // Réseaux sociaux — à compléter quand les URLs seront connues (laisser vide sinon).
  sameAs: [] as string[],
} as const;

export const OG_IMAGE = '/og.jpg';
