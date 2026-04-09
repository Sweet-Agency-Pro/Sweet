/**
 * Static project data for SEO-first rendering.
 * This data is embedded at build time so search engines see full content immediately.
 * Supabase hydration overlays live data on top.
 */

export interface ProjectStaticData {
  id: string;
  name: string;
  hook: string;
  story: string;
  /** Split narrative for the detail page */
  challenge: string;
  approach: string;
  benefit: string | null;
  tech: string[];
  /** Brief rationale for each technology choice */
  techRationale: Record<string, string>;
  type: 'production' | 'concept';
  colorAccent: {
    primary: string;
    secondary: string;
  };
  isFlagship: boolean;
  previewUrl: string;
  externalUrl: string;
  /** Derived color scheme for Navigation/Footer */
  colorScheme: 'teal' | 'purple' | 'blue';
  /** SEO meta description */
  metaDescription: string;
  /** SEO title */
  metaTitle: string;
  /** Key metrics / results (optional, displayed when present) */
  metrics?: { label: string; value: string; detail?: string }[];
}

// =============================================================================
// PROJECT DATA MAP
// =============================================================================

export const PROJECT_DATA: Record<string, ProjectStaticData> = {
  translatix: {
    id: 'translatix',
    name: 'Translatix',
    hook: 'Briser les barrières linguistiques avec une précision chirurgicale.',
    story:
      "Nous avons repris le projet Translatix à un moment charnière : l'ancienne plateforme, entravée par des bugs et suspendue, ne reflétait plus l'ambition de son propriétaire. Notre mission ? Repartir de zéro pour redonner une identité forte à ce service de traductions officielles (Anglais, Français, Espagnol). Nous avons conçu un écosystème 100 % dynamique et sur mesure, intégrant un blog stratégique et une gestion fluide des prestations. Au-delà du design, notre agence a livré un moteur SEO haute performance et un panneau d'administration sécurisé, garantissant au client une autonomie totale et une visibilité maximale sur le marché.",
    challenge:
      "Translatix avait tout pour réussir : un positionnement unique sur le marché des traductions officielles trilingues (Anglais, Français, Espagnol), et un propriétaire passionné par son métier. Mais la plateforme existante était devenue un frein, truffée de bugs, suspendue par l'hébergeur, et incapable de refléter le professionnalisme du service. Le client avait perdu confiance dans le digital. Notre défi : repartir d'une page blanche et construire bien plus qu'un site, un écosystème qui génère des leads internationaux de manière autonome.",
    approach:
      "Nous avons conçu un écosystème 100 % dynamique et sur mesure. Chaque page est pensée pour convertir : landing pages optimisées pour chaque combinaison linguistique, blog stratégique alimenté par un panneau d'administration intuitif, et parcours de commande fluide. Le moteur SEO intégré a transformé Google en canal d'acquisition principal. Le panneau d'administration sécurisé offre au client une autonomie totale sur son contenu, ses tarifs et ses prestations, sans jamais toucher une ligne de code.",
    benefit:
      "100% d'autonomie sur le contenu et +40% de leads internationaux dès le premier trimestre.",
    tech: ['TypeScript', 'Next.js', 'Supabase'],
    techRationale: {
      TypeScript: 'Fiabilité du code et maintenabilité à long terme',
      'Next.js': 'SEO serveur natif et performances optimales',
      Supabase: 'Base de données temps réel et authentification sécurisée',
    },
    type: 'production',
    colorAccent: { primary: '#14b8a6', secondary: '#06b6d4' },
    isFlagship: true,
    previewUrl:
      'https://tvbotgqwagfbqpxovgos.supabase.co/storage/v1/object/public/portfolio_screenshots/translatix/translatix_preview.webp',
    externalUrl: 'https://translatix.org',
    colorScheme: 'teal',
    metaTitle: 'Translatix - Plateforme de Traduction Officielle | Sweet',
    metaDescription:
      "Découvrez comment nous avons transformé Translatix : une plateforme de traduction officielle trilingue avec +40% de leads internationaux. Étude de cas par l'Agence Sweet.",
    metrics: [
      { label: 'Leads internationaux', value: '+40%', detail: 'dès le premier trimestre' },
      { label: 'Autonomie contenu', value: '100%', detail: 'via panneau d\'administration' },
      { label: 'Langues supportées', value: '3', detail: 'Anglais, Français, Espagnol' },
    ],
  },

  luminarte: {
    id: 'luminarte',
    name: 'LuminArte Studio',
    hook: 'Là où la lumière rencontre la toile numérique.',
    story:
      "Nous avons conçu l'interface de LuminArte comme une galerie digitale immersive. Ce studio ne se contente pas de fournir des services, il transforme chaque projet en une œuvre d'art. Notre défi était d'intégrer une offre très large, de la photographie créative aux installations numériques, dans une navigation fluide et cohérente. Le résultat est un site vitrine élégant, doté d'un système de tarification modulaire et de sections dédiées (Portfolio, Blog, FAQ) pensées pour convertir le visiteur en collaborateur artistique. Une plateforme qui reflète parfaitement la devise du studio : \"Chaque projet est une œuvre d'art en devenir.\"",
    challenge:
      "LuminArte Studio offre un spectre créatif immense, de la photographie événementielle aux installations numériques immersives. Cette richesse d'offre était aussi son plus grand défi digital : comment présenter une palette de services aussi large sans perdre le visiteur ? Le studio avait besoin d'un espace numérique à la hauteur de son identité artistique, capable de transformer le visiteur curieux en collaborateur convaincu.",
    approach:
      "Nous avons pensé chaque pixel comme une toile. L'interface fonctionne comme une galerie digitale immersive : navigation fluide entre les univers créatifs, système de tarification modulaire transparent, et sections Portfolio, Blog et FAQ structurées pour guider le parcours de décision. Le design oscille entre sobriété élégante et éclats visuels maîtrisés, laissant les œuvres parler d'elles-mêmes tout en portant le message commercial avec subtilité.",
    benefit: null,
    tech: ['TypeScript', 'Next.js', 'Supabase'],
    techRationale: {
      TypeScript: 'Architecture robuste pour un catalogue riche',
      'Next.js': 'Rendu hybride pour galeries d\'images haute résolution',
      Supabase: 'Gestion dynamique du portfolio et des tarifs',
    },
    type: 'concept',
    colorAccent: { primary: '#a855f7', secondary: '#ec4899' },
    isFlagship: false,
    previewUrl:
      'https://tvbotgqwagfbqpxovgos.supabase.co/storage/v1/object/public/portfolio_screenshots/luminarte/luminarte_preview.webp',
    externalUrl: 'https://cute-mooncake-6802dd.netlify.app/',
    colorScheme: 'purple',
    metaTitle: 'LuminArte Studio - Galerie Digitale Immersive | Sweet',
    metaDescription:
      "Concept de galerie digitale immersive pour un studio créatif. Interface élégante, tarification modulaire et parcours de conversion artistique. Projet par l'Agence Sweet.",
  },

  servicepro: {
    id: 'servicepro',
    name: 'ServicePro Plus',
    hook: 'Réinventer le checkout sans friction.',
    story:
      "Nous avons développé pour ServicePro Plus une plateforme tout-en-un alliant prestations de services et e-commerce. L'objectif était de simplifier le parcours utilisateur pour des besoins quotidiens variés : nettoyage, réparation électroménager et assistance informatique. Nous avons conçu une interface structurée où chaque service dispose de sa propre proposition de valeur claire (tarifs transparents, garanties, délais). Le site intègre également une boutique en ligne de produits professionnels, créant ainsi un écosystème complet pour le client, de l'intervention à l'entretien autonome.",
    challenge:
      "ServicePro Plus couvre trois métiers très différents, nettoyage professionnel, réparation électroménager, assistance informatique, chacun avec ses propres tarifs, garanties et contraintes. Le défi : unifier ces univers dans un parcours d'achat unique, sans friction, où le client trouve instantanément ce dont il a besoin sans être submergé par la complexité de l'offre.",
    approach:
      "Nous avons architecturé la plateforme comme un écosystème complet : chaque service a sa propre landing page avec proposition de valeur claire, tarification transparente et engagement qualité. Le checkout unifié fonctionne aussi bien pour réserver une prestation que pour acheter un produit. La boutique en ligne de produits professionnels complète naturellement l'offre de services, transformant le client ponctuel en utilisateur régulier.",
    benefit: null,
    tech: ['TypeScript', 'Vite', 'Stripe', 'Supabase'],
    techRationale: {
      TypeScript: 'Sécurité du typage pour les flux de paiement',
      Vite: 'Build ultra-rapide et expérience développeur optimale',
      Stripe: 'Paiement sécurisé et gestion avancée des abonnements',
      Supabase: 'Base de données et gestion des utilisateurs en temps réel',
    },
    type: 'concept',
    colorAccent: { primary: '#3b82f6', secondary: '#06b6d4' },
    isFlagship: false,
    previewUrl:
      'https://tvbotgqwagfbqpxovgos.supabase.co/storage/v1/object/public/portfolio_screenshots/servicepro/servicepro_preview.webp',
    externalUrl: 'https://thriving-melomakarona-f6d951.netlify.app/',
    colorScheme: 'blue',
    metaTitle: 'ServicePro Plus - Plateforme Services & E-commerce | Sweet',
    metaDescription:
      "Concept de plateforme tout-en-un alliant prestations de services et e-commerce : checkout sans friction, tarification transparente et boutique intégrée. Par l'Agence Sweet.",
  },

  artinexus: {
    id: 'artinexus',
    name: 'ArtiNexus',
    hook: "Le minimalisme comme forme d'art suprême.",
    story:
      "Nous avons conçu ArtiNexus comme un pont numérique entre la créativité brute et le monde professionnel. Cette plateforme permet aux entreprises de sourcer des artistes talentueux pour métamorphoser leurs espaces ou sublimer leurs événements avec un art impactant. L'interface, à la fois sobre et élégante, a été pensée pour mettre en avant la force visuelle des œuvres tout en offrant un parcours utilisateur fluide. Le résultat est un outil de curation moderne qui facilite la collaboration artistique et renforce l'image de marque des clients corporate.",
    challenge:
      "Le monde de l'art contemporain et celui de l'entreprise parlent rarement le même langage. ArtiNexus devait créer un pont entre ces deux univers : permettre aux entreprises de trouver, évaluer et engager des artistes pour des projets concrets (espaces, événements, branding), tout en respectant la sensibilité artistique et la liberté créative. Le défi : concevoir une plateforme qui parle aux deux audiences sans trahir aucune.",
    approach:
      "Nous avons fait du minimalisme notre manifeste de design. L'interface ultra-épurée met la lumière sur ce qui compte : les œuvres et les artistes. Le parcours utilisateur est séquencé comme une visite de galerie, découverte, coup de cœur, prise de contact, avec un système de curation intelligent qui facilite le matching entre vision corporate et talent artistique. Chaque interaction est pensée pour renforcer la confiance et accélérer la collaboration.",
    benefit: null,
    tech: ['TypeScript', 'Next.js', 'Supabase'],
    techRationale: {
      TypeScript: 'Solidité pour une plateforme de mise en relation',
      'Next.js': 'Performances et SEO pour la visibilité des artistes',
      Supabase: 'Gestion des profils artistes et messagerie temps réel',
    },
    type: 'concept',
    colorAccent: { primary: '#f59e0b', secondary: '#f5b038' },
    isFlagship: false,
    previewUrl:
      'https://tvbotgqwagfbqpxovgos.supabase.co/storage/v1/object/public/portfolio_screenshots/artinexus/artinexus_preview.webp',
    externalUrl: 'https://melodious-cactus-0ba27c.netlify.app/',
    colorScheme: 'teal',
    metaTitle: "ArtiNexus - Plateforme de Curation Artistique | Sweet",
    metaDescription:
      "Concept de plateforme de mise en relation art & entreprise. Interface minimaliste, curation intelligente et collaboration facilitée. Projet par l'Agence Sweet.",
  },
};

/** Get all project IDs for static generation / navigation */
export const PROJECT_IDS = Object.keys(PROJECT_DATA);

/** Get a project by ID, returns undefined if not found */
export function getStaticProject(id: string): ProjectStaticData | undefined {
  return PROJECT_DATA[id];
}
