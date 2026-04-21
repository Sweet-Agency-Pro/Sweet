# 🔎 Guide Complet — Référencement Google (Étape par Étape)

> **Site :** agence-sweet.com  
> **Date :** 16 avril 2026  
> **Objectif :** Indexer, référencer et optimiser la visibilité du site sur Google  

---

## Table des matières

1. [Phase 1 : Créer et configurer Google Search Console](#phase-1--créer-et-configurer-google-search-console)
2. [Phase 2 : Configurer Google Analytics 4 (GA4)](#phase-2--configurer-google-analytics-4-ga4)
3. [Phase 3 : Soumettre le sitemap et demander l'indexation](#phase-3--soumettre-le-sitemap-et-demander-lindexation)
4. [Phase 4 : Créer et optimiser le Google Business Profile](#phase-4--créer-et-optimiser-le-google-business-profile)
5. [Phase 5 : Tester et valider les données structurées](#phase-5--tester-et-valider-les-données-structurées)
6. [Phase 6 : Tester les Core Web Vitals](#phase-6--tester-les-core-web-vitals)
7. [Phase 7 : Tester le rendu mobile](#phase-7--tester-le-rendu-mobile)
8. [Phase 8 : Tester les previews sociales (Open Graph)](#phase-8--tester-les-previews-sociales-open-graph)
9. [Phase 9 : Stratégie de mots-clés et contenu](#phase-9--stratégie-de-mots-clés-et-contenu)
10. [Phase 10 : Backlinks et autorité de domaine](#phase-10--backlinks-et-autorité-de-domaine)
11. [Phase 11 : Monitoring et suivi continu](#phase-11--monitoring-et-suivi-continu)
12. [Phase 12 : Optimisations avancées](#phase-12--optimisations-avancées)
13. [Calendrier de suivi SEO recommandé](#calendrier-de-suivi-seo-recommandé)

---

## Phase 1 : Créer et configurer Google Search Console

Google Search Console (GSC) est **l'outil officiel et gratuit** de Google pour gérer la présence de votre site dans les résultats de recherche.

### Étape 1.1 : Accéder à Search Console
1. Aller sur [search.google.com/search-console](https://search.google.com/search-console)
2. Se connecter avec un compte Google (idéalement un compte professionnel `@agence-sweet.com` ou le compte Google principal de l'entreprise)

### Étape 1.2 : Ajouter la propriété
1. Cliquer sur **"Ajouter une propriété"** (bouton en haut à gauche)
2. Choisir le type **"Domaine"** (recommandé, couvre toutes les variantes)
3. Entrer : `agence-sweet.com`
4. Cliquer sur **"Continuer"**

### Étape 1.3 : Vérifier la propriété via DNS (méthode recommandée)
1. Google vous donnera un enregistrement TXT à ajouter à votre DNS
2. Exemple : `google-site-verification=XXXXXXXXXXXXX`
3. Aller sur [manager.infomaniak.com](https://manager.infomaniak.com)
4. **Noms de domaine** → `agence-sweet.com` → **Gestion DNS**
5. Ajouter un nouvel enregistrement :
   - **Type :** `TXT`
   - **Nom :** `@` (ou laisser vide)
   - **Valeur :** Coller le code fourni par Google (ex: `google-site-verification=AbCdEfGhIjKlMnOpQrStUv`)
   - **TTL :** 300 (ou par défaut)
6. Cliquer sur **Enregistrer**
7. Attendre **5 à 30 minutes** pour la propagation DNS
8. Retourner sur Google Search Console et cliquer sur **"Vérifier"**
9. Si ça échoue, attendre encore 30 minutes et réessayer

### Étape 1.4 : Ajouter aussi la version avec www
1. Revenir sur Search Console
2. Ajouter une seconde propriété : `www.agence-sweet.com`
3. La vérification devrait être automatique si le domaine parent est déjà vérifié

### Étape 1.5 : Configurer la version préférée
1. Comme vous redirigez www → non-www, la version canonique est `agence-sweet.com`
2. Google le détectera automatiquement via la redirection 301, mais vérifier dans les mois suivants que les URLs indexées sont bien sans `www`

---

## Phase 2 : Configurer Google Analytics 4 (GA4)

### Étape 2.1 : Créer le compte GA4 (si pas déjà fait)
1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Se connecter avec le même compte Google que pour Search Console
3. Si pas de compte existant : **Admin** → **Créer un compte**
   - Nom du compte : `Agence Sweet`
   - Nom de la propriété : `agence-sweet.com`
   - Fuseau horaire : `France`
   - Devise : `Euro (€)`
4. Choisir **Web** comme plateforme
5. Entrer l'URL : `https://agence-sweet.com`
6. Nom du flux : `Site web Sweet`
7. Cliquer sur **Créer le flux**

### Étape 2.2 : Récupérer l'ID de mesure
1. Après création, Google affiche un **ID de mesure** : `G-XXXXXXXXXX`
2. Copier cet ID

### Étape 2.3 : Configurer l'ID dans votre projet
1. S'assurer que la variable d'environnement `VITE_GA_MEASUREMENT_ID` est configurée :
   - **En local** : dans le fichier `.env` : `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - **Sur Vercel** : Dashboard → Settings → Environment Variables → Ajouter `VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX` pour **Production** uniquement

> **Note :** Le code GA4 est déjà implémenté dans `App.tsx` avec `react-ga4` et conditionné au consentement cookies ✅

### Étape 2.4 : Lier GA4 à Search Console
1. Dans GA4 → **Admin** (icône engrenage en bas à gauche)
2. Sous la colonne **Propriété** → **Liens vers les produits** → **Liens vers Search Console**
3. Cliquer sur **Associer**
4. Sélectionner la propriété Search Console `agence-sweet.com`
5. Sélectionner le flux Web correspondant
6. Cliquer sur **Envoyer**

### Étape 2.5 : Configurer les événements de conversion
1. Dans GA4 → **Admin** → **Événements**
2. Créer/marquer comme conversions :
   - `form_submit` (soumission du formulaire de contact)
   - `click` sur les boutons CTA (email, téléphone)
   - `page_view` sur les pages services (intent d'achat)
3. Pour suivre le formulaire de contact, ajouter dans le code du formulaire :
```tsx
ReactGA.event({
  category: 'Contact',
  action: 'form_submit',
  label: 'Contact Form',
});
```

### Étape 2.6 : Vérifier que le tracking fonctionne
1. Ouvrir le site en production : `https://agence-sweet.com`
2. Accepter les cookies analytics
3. Dans GA4 → **Rapports** → **Temps réel**
4. Vérifier que votre visite apparaît
5. Naviguer sur différentes pages et vérifier que les page_view s'enregistrent

---

## Phase 3 : Soumettre le sitemap et demander l'indexation

### Étape 3.1 : Vérifier que le sitemap est accessible
1. Après avoir créé `public/sitemap.xml` (voir SEO_AMELIORATIONS_CODE.md)
2. Déployer le site sur Vercel
3. Vérifier l'accès : ouvrir `https://agence-sweet.com/sitemap.xml` dans un navigateur
4. Vérifier que le XML s'affiche correctement

### Étape 3.2 : Vérifier que robots.txt pointe vers le sitemap
1. Ouvrir `https://agence-sweet.com/robots.txt`
2. Vérifier que la ligne suivante est présente :
```
Sitemap: https://agence-sweet.com/sitemap.xml
```

### Étape 3.3 : Soumettre le sitemap dans Search Console
1. Aller sur [Google Search Console](https://search.google.com/search-console)
2. Sélectionner la propriété `agence-sweet.com`
3. Dans le menu de gauche → **Sitemaps**
4. Dans le champ "Ajouter un sitemap" → entrer : `sitemap.xml`
5. Cliquer sur **Envoyer**
6. Le statut devrait passer à **"Réussite"** après quelques minutes/heures
7. Vérifier le nombre d'URLs découvertes (devrait être ~10)

### Étape 3.4 : Demander l'indexation manuelle des pages clés
1. Dans Search Console → **Inspection d'URL** (barre en haut)
2. Entrer chaque URL une par une et cliquer sur **"Demander l'indexation"** :
   - `https://agence-sweet.com/`
   - `https://agence-sweet.com/services/site-vitrine`
   - `https://agence-sweet.com/services/site-ecommerce`
   - `https://agence-sweet.com/services/panneau-de-gestion`
   - `https://agence-sweet.com/portfolio/translatix`
   - `https://agence-sweet.com/portfolio/luminarte`
   - `https://agence-sweet.com/portfolio/servicepro`
   - `https://agence-sweet.com/portfolio/artinexus`
   - `https://agence-sweet.com/mentions-legales`
   - `https://agence-sweet.com/confidentialite`
3. **Limites :** Google autorise ~10-12 demandes d'indexation par jour. Si vous avez plus de pages, étalez sur 2 jours.

### Étape 3.5 : Vérifier l'indexation après quelques jours
1. Attendre 2-7 jours
2. Dans Search Console → **Pages** (anciennement "Couverture de l'index")
3. Vérifier que les pages passent de "Découvertes" à "Indexées"
4. Si des pages restent en "Exclues", cliquer dessus pour voir le motif

### Étape 3.6 : Tester l'indexation dans Google
1. Ouvrir Google.fr
2. Taper `site:agence-sweet.com`
3. Vérifier que vos pages apparaissent
4. Vérifier les titres et descriptions affichés — correspondent-ils à vos meta tags ?

---

## Phase 4 : Créer et optimiser le Google Business Profile

### Pourquoi c'est important
Le Google Business Profile (anciennement Google My Business) est **essentiel** pour le SEO local. Il fait apparaître votre entreprise dans :
- Le "Pack Local" de Google (la carte avec 3 résultats)
- Google Maps
- Le Knowledge Panel (panneau de droite)

### Étape 4.1 : Créer le profil
1. Aller sur [business.google.com](https://business.google.com)
2. Cliquer sur **"Gérer maintenant"**
3. Chercher si votre entreprise existe déjà
4. Si non, cliquer sur **"Ajouter votre entreprise sur Google"**

### Étape 4.2 : Remplir les informations de base
1. **Nom de l'entreprise :** `Agence Sweet`
2. **Catégorie principale :** `Agence de création de sites Internet` (ou `Web designer` / `Agence web`)
3. **Catégories secondaires :** 
   - `Développeur de logiciels`
   - `Service de commerce électronique`
   - `Consultant en informatique`
4. **Adresse :** L'adresse physique de l'entreprise (obligatoire pour le pack local)
5. **Zone desservie :** Si vous travaillez à distance, définir "France" ou les départements/villes cibles
6. **Numéro de téléphone :** `+33 6 83 94 96 90`
7. **Site web :** `https://agence-sweet.com`

### Étape 4.3 : Vérifier l'entreprise
1. Google enverra un code de vérification par :
   - **Courrier postal** (carte postale à votre adresse, 5-14 jours)
   - **Téléphone** (appel ou SMS, si disponible)
   - **Email** (si vous avez un email sur le domaine)
2. Entrer le code de vérification quand reçu

### Étape 4.4 : Optimiser le profil
1. **Description de l'entreprise** (750 caractères max) :
```
Agence Sweet est une agence web créative spécialisée dans le développement de sites internet sur mesure. Nous concevons des sites vitrines professionnels, des boutiques e-commerce performantes et des panneaux de gestion intuitifs. Notre approche allie design moderne, code optimisé et stratégie SEO pour donner à nos clients une présence en ligne qui génère des résultats concrets. Basés en France, nous accompagnons entrepreneurs, PME et startups dans leur transformation digitale.
```

2. **Horaires d'ouverture :** Définir vos horaires (ex: Lundi-Vendredi 9h-18h)

3. **Photos :** Ajouter au minimum :
   - Logo de l'agence (format carré, 250×250px minimum)
   - Photo de couverture (format paysage, 1080×608px)
   - 3-5 photos de projets réalisés
   - Photo de l'équipe (si applicable)

4. **Services :** Ajouter chaque service :
   - Création de Site Vitrine
   - Développement E-commerce
   - Panneau de Gestion / Dashboard
   - Design UX/UI
   - Optimisation SEO

5. **Attributs :** Cocher les attributs pertinents :
   - ✅ Rendez-vous en ligne
   - ✅ Devis gratuit
   - ✅ Prise en charge à distance

### Étape 4.5 : Publier des posts régulièrement
1. Dans le Business Profile → **Posts**
2. Publier au moins **1 post par semaine** :
   - Nouveau projet réalisé
   - Conseil web/SEO
   - Offre spéciale
   - Actualité de l'agence
3. Chaque post doit avoir :
   - Une image (1200×900px)
   - Un texte de 150-300 mots
   - Un bouton d'action ("En savoir plus" → lien vers le site)

### Étape 4.6 : Collecter des avis Google
1. Dans le Business Profile → **Demander des avis**
2. Copier le lien de demande d'avis
3. Envoyer ce lien à vos clients satisfaits après livraison
4. **Objectif :** Minimum 5 avis avec une note ≥ 4.5/5
5. **Important :** Répondre à CHAQUE avis (positif ou négatif) dans les 24-48h

> **Astuce :** Intégrer le lien d'avis dans votre email de suivi post-projet.

---

## Phase 5 : Tester et valider les données structurées

### Étape 5.1 : Tester avec le Rich Results Test
1. Aller sur [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
2. Entrer l'URL : `https://agence-sweet.com/`
3. Cliquer sur **"Tester l'URL"**
4. Vérifier que les résultats affichent :
   - ✅ `WebSite` détecté
   - ✅ `Organization` détecté
5. Tester ensuite les pages services :
   - `https://agence-sweet.com/services/site-vitrine`
   - Vérifier que `FAQPage` est détecté
   - Vérifier que `BreadcrumbList` est détecté

### Étape 5.2 : Tester avec le Schema Markup Validator
1. Aller sur [validator.schema.org](https://validator.schema.org)
2. Entrer les mêmes URLs
3. Vérifier qu'il n'y a **aucune erreur** (les warnings sont acceptables)

### Étape 5.3 : Vérifier dans Search Console
1. Search Console → **Améliorations** → **FAQ** (apparaîtra après l'indexation)
2. Vérifier que les pages FAQ sont détectées sans erreur
3. Search Console → **Améliorations** → **Fil d'Ariane**
4. Vérifier que les breadcrumbs sont détectés

### Étape 5.4 : Tester les données structurées depuis le code
Pour chaque page avec JSON-LD, copier le JSON et le coller dans :
- [json-ld.org/playground](https://json-ld.org/playground/) pour valider la syntaxe
- [schema.org/docs/validator.html](https://schema.org/docs/validator.html) pour valider la conformité

---

## Phase 6 : Tester les Core Web Vitals

### Pourquoi c'est crucial
Les Core Web Vitals sont des métriques de performance que Google utilise comme **facteur de ranking** depuis 2021.

### Étape 6.1 : Tester avec PageSpeed Insights
1. Aller sur [pagespeed.web.dev](https://pagespeed.web.dev)
2. Entrer `https://agence-sweet.com`
3. Analyser les résultats **Mobile** ET **Desktop**
4. **Objectifs minimaux :**

| Métrique | Seuil "Bon" | Votre objectif |
|----------|------------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | < 2.0s |
| INP (Interaction to Next Paint) | < 200ms | < 150ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.05 |
| FCP (First Contentful Paint) | < 1.8s | < 1.5s |
| TTFB (Time to First Byte) | < 800ms | < 500ms |

5. Tester aussi les pages de services :
   - `https://agence-sweet.com/services/site-vitrine`
   - `https://agence-sweet.com/services/site-ecommerce`
   - `https://agence-sweet.com/services/panneau-de-gestion`

### Étape 6.2 : Tester avec Lighthouse (Chrome DevTools)
1. Ouvrir Chrome → F12 → onglet **Lighthouse**
2. Configurer :
   - Categories : Performance, Accessibility, Best Practices, SEO
   - Device : Mobile
3. Cliquer sur **"Generate report"**
4. **Objectifs :**
   - Performance : ≥ 90
   - Accessibility : ≥ 95
   - Best Practices : ≥ 95
   - SEO : ≥ 95

### Étape 6.3 : Corriger les problèmes identifiés
Pour chaque problème remonté par PageSpeed/Lighthouse, appliquer les corrections recommandées. Les plus courants pour un site React/Vite :

1. **LCP trop lent :**
   - Preload de l'image hero
   - Inline les CSS critiques (above-the-fold)
   - Ajouter `fetchpriority="high"` sur l'image LCP

2. **CLS trop élevé :**
   - Définir des dimensions `width` et `height` sur toutes les images
   - Réserver de l'espace pour les éléments lazy-loaded
   - Éviter les fonts flash (FOUT) → `font-display: swap` déjà utilisé ✅

3. **FCP trop lent :**
   - Réduire la taille du bundle JS initial
   - Inline le CSS critique
   - Preload les fonts

### Étape 6.4 : Surveiller les Core Web Vitals dans Search Console
1. Search Console → **Expérience** → **Core Web Vitals**
2. Cette section apparaît une fois que Google a collecté assez de données terrain (28 jours minimum)
3. Vérifier que toutes les URLs sont en statut **"Bon"** (vert)

---

## Phase 7 : Tester le rendu mobile

### Étape 7.1 : Test d'optimisation mobile de Google
1. Aller sur [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly)
2. Entrer `https://agence-sweet.com`
3. Vérifier que le résultat est : **"La page est adaptée aux mobiles"**
4. Tester aussi chaque page de service et portfolio

### Étape 7.2 : Vérifier le rendu dans Search Console
1. Search Console → **Inspection d'URL**
2. Entrer une URL
3. Cliquer sur **"Tester l'URL en ligne"**
4. Puis **"Afficher la page testée"** → **"Capture d'écran"**
5. Vérifier que le contenu est visible et bien rendu
6. **Attention :** Si le site est en CSR pur (SPA sans prerendering), la capture peut montrer une page blanche ou partiellement rendue. C'est un signe que le prerendering est nécessaire.

---

## Phase 8 : Tester les previews sociales (Open Graph)

### Étape 8.1 : Tester Facebook/Meta
1. Aller sur [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
2. Entrer `https://agence-sweet.com`
3. Cliquer sur **"Debug"**
4. Vérifier :
   - ✅ `og:title` affiché correctement
   - ✅ `og:description` affichée
   - ✅ `og:image` affichée (1200×630px)
   - ✅ Pas d'avertissements en rouge
5. Si l'image/titre est incorrecte, cliquer sur **"Scrape Again"** pour forcer le rafraîchissement
6. **Tester aussi chaque page de service et portfolio**

### Étape 8.2 : Tester Twitter/X
1. Aller sur [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) (ou poster un lien en DM à vous-même sur X)
2. Entrer l'URL
3. Vérifier que la Twitter Card (`summary_large_image`) s'affiche correctement

### Étape 8.3 : Tester LinkedIn
1. Aller sur [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)
2. Entrer l'URL
3. Vérifier la preview
4. Si incorrecte, utiliser le bouton **"Refresh"**

### Étape 8.4 : Tester WhatsApp
1. Envoyer le lien `https://agence-sweet.com` dans une conversation WhatsApp
2. Vérifier que l'image, le titre et la description s'affichent

> **Important :** Si le site est en CSR pur sans prerendering, les previews sociales afficheront les meta de `index.html` statique pour TOUTES les pages. C'est pourquoi le prerendering est critique.

---

## Phase 9 : Stratégie de mots-clés et contenu

### Étape 9.1 : Recherche de mots-clés
Utiliser des outils gratuits pour identifier les mots-clés à cibler :

1. **Google Keyword Planner** (gratuit avec un compte Google Ads) :
   - [ads.google.com/intl/fr_fr/home/tools/keyword-planner/](https://ads.google.com/intl/fr_fr/home/tools/keyword-planner/)
   - Créer un compte Google Ads (pas besoin de payer pour utiliser le planner)
   - Chercher des mots-clés liés à votre activité

2. **Google Trends** (gratuit) :
   - [trends.google.fr](https://trends.google.fr)
   - Comparer les tendances de recherche

3. **Ubersuggest** (gratuit limité) :
   - [neilpatel.com/ubersuggest](https://neilpatel.com/ubersuggest/)

4. **AnswerThePublic** (gratuit limité) :
   - [answerthepublic.com](https://answerthepublic.com)
   - Découvrir les questions que les gens posent

### Étape 9.2 : Mots-clés recommandés pour Agence Sweet

#### Page d'accueil
| Mot-clé principal | Volume estimé (FR) | Difficulté |
|-------------------|-------------------|------------|
| agence web | Élevé | Difficile |
| création site internet | Élevé | Difficile |
| agence web créative | Moyen | Moyen |
| développement web sur mesure | Moyen | Moyen |
| agence digitale france | Moyen | Moyen |

#### Page Site Vitrine
| Mot-clé | Volume | Difficulté |
|---------|--------|------------|
| création site vitrine | Moyen | Moyen |
| site vitrine professionnel | Moyen | Moyen |
| site vitrine prix | Élevé | Difficile |
| créer site vitrine sur mesure | Faible | Facile |
| site vitrine one page | Faible | Facile |

#### Page E-commerce
| Mot-clé | Volume | Difficulté |
|---------|--------|------------|
| création site e-commerce | Moyen | Difficile |
| développement boutique en ligne | Moyen | Moyen |
| site e-commerce sur mesure | Faible | Moyen |
| alternative shopify | Moyen | Moyen |
| développeur e-commerce freelance | Faible | Facile |

#### Page Panneau de Gestion
| Mot-clé | Volume | Difficulté |
|---------|--------|------------|
| développement dashboard sur mesure | Faible | Facile |
| back-office site web | Faible | Facile |
| CMS sur mesure | Faible | Moyen |
| outil de gestion interne | Moyen | Moyen |
| application métier sur mesure | Moyen | Moyen |

### Étape 9.3 : Optimiser les titres et descriptions existants

Voici les titres/descriptions actuels et les suggestions d'amélioration :

#### Page d'accueil
- **Actuel :** `Agence Web Créative : Développement & Design sur Mesure | Sweet`
- **Suggéré :** `Agence Web Créative à [Ville] — Sites Web sur Mesure | Sweet` (ajouter la localisation si pertinent)

- **Description actuelle :** `Agence Sweet - Création de sites internet, e-commerce et solutions sur mesure pour propulser votre activité.`
- **Suggérée :** `Agence Sweet, agence web créative : création de sites vitrines, boutiques e-commerce et dashboards sur mesure. Design UX/UI moderne, code optimisé et SEO. Devis gratuit.` (156 caractères)

#### Page Site Vitrine
- **Titre actuel :** `Création de Site Vitrine Professionnel & Design Sur Mesure | Sweet`
- **Suggéré :** `Création de Site Vitrine Professionnel — Design & SEO sur Mesure | Sweet`

- **Description actuelle :** `Créez un site vitrine qui convertit vos visiteurs en clients. Design unique, interface responsive et optimisation SEO pour booster votre visibilité locale.`
- **OK** — Bonne description. Ajouter un prix d'appel si possible : `À partir de X€.`

#### Page E-commerce
- **Titre actuel :** `Développement de Boutique E-commerce (Shopify/Next.js) | Sweet`
- **Suggéré :** `Création de Boutique E-commerce sur Mesure — Shopify & Next.js | Sweet`

#### Page Panneau de Gestion
- **Titre actuel :** `Dashboard & Outils Métier sur Mesure | Sweet`
- **Suggéré :** `Dashboard & Back-office sur Mesure — Outils de Gestion | Sweet`

### Étape 9.4 : Créer du contenu supplémentaire (à terme)

Pour améliorer significativement le référencement, envisager :

1. **Un blog** avec des articles SEO :
   - "Combien coûte un site vitrine en 2026 ?"
   - "Shopify vs site e-commerce sur mesure : le guide complet"
   - "Pourquoi votre site web ne génère pas de clients"
   - "Les 5 erreurs SEO les plus courantes des PME"
   - "Comment choisir son agence web en France"

2. **Des pages de localisation** (si pertinent) :
   - `/agence-web-paris`
   - `/agence-web-lyon`
   - `/creation-site-internet-[ville]`

3. **Des études de cas détaillées** (déjà partiellement fait avec les projets portfolio ✅)

---

## Phase 10 : Backlinks et autorité de domaine

### Étape 10.1 : Vérifier l'autorité actuelle du domaine
1. Aller sur [ahrefs.com/website-authority-checker](https://ahrefs.com/website-authority-checker) (gratuit)
2. Entrer `agence-sweet.com`
3. Noter le **Domain Rating (DR)** actuel
4. Un nouveau domaine commence généralement à DR 0-5

### Étape 10.2 : Stratégies de backlinks (liens entrants)

Les backlinks sont des liens depuis d'autres sites vers le vôtre. C'est un des facteurs de ranking les plus importants.

#### A. Inscriptions dans les annuaires professionnels
| Annuaire | URL | Priorité |
|----------|-----|----------|
| Google Business Profile | business.google.com | 🔴 Critique |
| Pages Jaunes / Solocal | pagesjaunes.fr | 🟠 Important |
| LinkedIn (page entreprise) | linkedin.com/company/ | 🟠 Important |
| Malt (profil freelance) | malt.fr | 🟠 Important |
| Sortlist | sortlist.fr | 🟡 Mineur |
| Webikeo | webikeo.com | 🟡 Mineur |
| Kompass | kompass.com | 🟡 Mineur |
| Societe.com | societe.com | 🟡 Mineur |

#### B. Liens depuis les projets réalisés
1. Pour chaque client (ex: Translatix), demander un lien retour dans le footer : `"Réalisé par Agence Sweet"`
2. C'est le backlink le plus naturel et le plus puissant

#### C. Guest blogging
1. Proposer des articles invités sur des blogs tech/web français :
   - BlogDuModeateur.com
   - Webmarketing-com.com
   - JournalDuNet.com (section PME)
2. Inclure un lien vers `agence-sweet.com` dans la bio auteur

#### D. Communiqués de presse
1. Pour chaque grand projet livré, rédiger un communiqué de presse
2. Le distribuer sur des plateformes gratuites : 24presse.com, categorynet.com

---

## Phase 11 : Monitoring et suivi continu

### Étape 11.1 : Dashboard de suivi
Créer un document de suivi mensuel avec les métriques suivantes :

| Métrique | Outil | Fréquence |
|----------|-------|-----------|
| Pages indexées | Search Console | Hebdomadaire |
| Impressions & clics | Search Console | Hebdomadaire |
| Position moyenne | Search Console | Hebdomadaire |
| Trafic organique | GA4 | Mensuel |
| Core Web Vitals | Search Console / PageSpeed | Mensuel |
| Backlinks | Ahrefs / Ubersuggest | Mensuel |
| Avis Google | Business Profile | Hebdomadaire |

### Étape 11.2 : Alertes à configurer

**Dans Search Console :**
1. Les alertes sont automatiques par email pour :
   - Problèmes d'indexation
   - Erreurs de données structurées
   - Problèmes de sécurité
2. S'assurer que l'email configuré est vérifié régulièrement

**Dans GA4 :**
1. Configurer des alertes personnalisées :
   - **Admin** → **Alertes personnalisées**
   - Alerte si le trafic chute de plus de 30% d'une semaine à l'autre

### Étape 11.3 : Audits réguliers
| Audit | Fréquence | Outils |
|-------|-----------|--------|
| Vérifier l'indexation (`site:agence-sweet.com`) | Hebdomadaire | Google.fr |
| Tester les Core Web Vitals | Mensuel | PageSpeed Insights |
| Vérifier les liens cassés | Mensuel | Screaming Frog (gratuit jusqu'à 500 URLs) |
| Mettre à jour le sitemap | À chaque nouveau contenu | Manuel |
| Vérifier les positions sur les mots-clés cibles | Mensuel | Search Console |

---

## Phase 12 : Optimisations avancées

### 12.1 : Ajouter le balisage hreflang (si site multilingue à l'avenir)
Si le site est traduit en anglais ou espagnol :
```html
<link rel="alternate" hreflang="fr" href="https://agence-sweet.com/" />
<link rel="alternate" hreflang="en" href="https://agence-sweet.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://agence-sweet.com/" />
```

### 12.2 : Implémenter le protocole IndexNow (Bing, Yandex)
IndexNow permet de notifier les moteurs de recherche immédiatement quand du contenu change.

1. Générer une clé API sur [indexnow.org](https://www.indexnow.org)
2. Ajouter un fichier de vérification dans `public/`
3. Envoyer une requête POST à chaque mise à jour de contenu

### 12.3 : Soumettre le site à Bing Webmaster Tools
1. Aller sur [bing.com/webmasters](https://www.bing.com/webmasters/)
2. Ajouter le site `agence-sweet.com`
3. Vérifier via DNS (même méthode que Google)
4. Soumettre le sitemap

### 12.4 : Inscrire le site sur les réseaux sociaux
Créer des profils professionnels cohérents (même nom, même description, même logo) :
- LinkedIn Page Entreprise
- Instagram @agencesweet
- Twitter/X @agencesweet
- Behance / Dribbble (pour le portfolio)

### 12.5 : Mettre en place un suivi des positions
Pour les mots-clés prioritaires, utiliser un outil de suivi :
- **Gratuit :** Google Search Console (données limitées)
- **Freemium :** Ubersuggest, SE Ranking
- **Payant :** Ahrefs, SEMrush

---

## Calendrier de suivi SEO recommandé

### Semaine 1 (immédiat)
- [ ] Créer Google Search Console
- [ ] Vérifier le domaine via DNS
- [ ] Créer `robots.txt` et `sitemap.xml`
- [ ] Soumettre le sitemap
- [ ] Demander l'indexation des 10 pages
- [ ] Configurer GA4 et lier à Search Console

### Semaine 2
- [ ] Créer Google Business Profile
- [ ] Soumettre la vérification
- [ ] Implémenter le prerendering (react-snap)
- [ ] Corriger les meta OG dans index.html
- [ ] Ajouter les JSON-LD (Organization, FAQPage, Breadcrumbs)

### Semaine 3
- [ ] Tester Core Web Vitals et corriger les problèmes
- [ ] Tester les previews sociales sur toutes les pages
- [ ] Corriger l'incohérence www vs non-www
- [ ] Configurer les headers de sécurité sur Vercel

### Semaine 4
- [ ] Vérifier l'indexation dans Google (`site:agence-sweet.com`)
- [ ] Vérifier les positions initiales sur les mots-clés cibles
- [ ] Inscrire le site dans les annuaires professionnels
- [ ] Demander des backlinks aux clients

### Mois 2-3
- [ ] Compléter le Google Business Profile (photos, posts, avis)
- [ ] Publier 2-3 posts par semaine sur le Business Profile
- [ ] Collecter les premiers avis Google
- [ ] Soumettre le site à Bing Webmaster Tools
- [ ] Créer les profils sociaux

### Mois 3-6
- [ ] Suivre les métriques mensuellement
- [ ] Optimiser les pages en fonction des données Search Console
- [ ] Envisager la création d'un blog
- [ ] Continuer l'acquisition de backlinks
- [ ] Mettre à jour le contenu régulièrement

### Mois 6+
- [ ] Analyser les résultats et ajuster la stratégie
- [ ] Créer des pages de localisation si pertinent
- [ ] Implémenter IndexNow pour une indexation instantanée
- [ ] Envisager Google Ads pour les mots-clés ultra-compétitifs
