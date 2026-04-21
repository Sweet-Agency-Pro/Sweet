# 🔍 Audit SEO Complet — Améliorations Code & Technique

> **Site :** agence-sweet.com  
> **Stack :** React (Vite) + Supabase + Vercel  
> **Date d'audit :** 16 avril 2026  

---

## Table des matières

1. [🔴 PROBLÈME CRITIQUE : Rendu Client (CSR) sans Prerendering](#1--problème-critique--rendu-client-csr-sans-prerendering)
2. [🔴 Fichiers manquants : robots.txt & sitemap.xml](#2--fichiers-manquants--robotstxt--sitemapxml)
3. [🔴 Gestion des erreurs 404 côté serveur](#3--gestion-des-erreurs-404-côté-serveur)
4. [🔴 Incohérence www vs non-www](#4--incohérence-www-vs-non-www)
5. [🟠 Amélioration du composant SEO.tsx](#5--amélioration-du-composant-seotsx)
6. [🟠 Données structurées JSON-LD manquantes](#6--données-structurées-json-ld-manquantes)
7. [🟠 Open Graph incomplet dans index.html](#7--open-graph-incomplet-dans-indexhtml)
8. [🟠 Navigation : Logo non crawlable](#8--navigation--logo-non-crawlable)
9. [🟠 Page 404 sans noindex](#9--page-404-sans-noindex)
10. [🟡 Optimisation des images](#10--optimisation-des-images)
11. [🟡 Favicon : type MIME incorrect](#11--favicon--type-mime-incorrect)
12. [🟡 Fichier manifest.json manquant](#12--fichier-manifestjson-manquant)
13. [🟡 Meta theme-color manquante](#13--meta-theme-color-manquante)
14. [🟡 Fichier .DS_Store dans public/](#14--fichier-dsstore-dans-public)
15. [🟡 Headers de sécurité & cache dans vercel.json](#15--headers-de-sécurité--cache-dans-verceljson)
16. [🟡 Prop keywords inutilisée dans SEO.tsx](#16--prop-keywords-inutilisée-dans-seotsx)
17. [📊 Récapitulatif de ce qui est bien fait](#17--récapitulatif-de-ce-qui-est-bien-fait)
18. [📋 Checklist de mise en œuvre](#18--checklist-de-mise-en-œuvre)

---

## 1. 🔴 PROBLÈME CRITIQUE : Rendu Client (CSR) sans Prerendering

### Constat
Le site est une **SPA React pure** (Client-Side Rendering). Quand un crawler (Googlebot, Bing, Facebook, LinkedIn, Twitter) visite une page, il reçoit le fichier `index.html` statique avec un `<div id="root"></div>` vide. Le contenu réel (titres, descriptions, textes, images) n'apparaît qu'après l'exécution du JavaScript côté client.

**Google** est capable d'exécuter du JS, mais :
- Il peut mettre **plusieurs jours voire semaines** à indexer le contenu JS
- La "file d'attente de rendu" de Google est longue
- Les autres moteurs (Bing, DuckDuckGo) et les réseaux sociaux **ne rendent PAS le JS**
- Les previews sociales (Facebook, LinkedIn, WhatsApp) montrent le contenu de `index.html` statique

### Impact
- Les meta `<title>`, `<meta description>`, Open Graph injectés par `react-helmet-async` ne sont **PAS visibles** dans le HTML initial
- Chaque page de service, de portfolio, légale a ses propres meta... mais elles ne sont jamais dans le HTML servi
- Les partages sur les réseaux sociaux montrent toujours les mêmes meta (celles de `index.html`)
- L'indexation est lente et potentiellement incomplète

### Solution recommandée : `vite-plugin-ssr` ou `react-snap`

#### Option A : react-snap (plus simple, recommandée)
Installe `react-snap` pour pré-rendre les pages en HTML statique au moment du build.

**Étape 1 : Installer react-snap**
```bash
npm install --save-dev react-snap
```

**Étape 2 : Modifier `package.json`**
```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "source": "dist",
    "minifyHtml": { "collapseWhitespace": false },
    "include": [
      "/",
      "/mentions-legales",
      "/confidentialite",
      "/services/site-vitrine",
      "/services/site-ecommerce",
      "/services/panneau-de-gestion",
      "/portfolio/translatix",
      "/portfolio/luminarte",
      "/portfolio/servicepro",
      "/portfolio/artinexus",
      "/404"
    ]
  }
}
```

**Étape 3 : Modifier `src/main.tsx`**
```tsx
import { createRoot, hydrateRoot } from 'react-dom/client';

const container = document.getElementById('root')!;

if (container.hasChildNodes()) {
  // Pre-rendered HTML exists, hydrate it
  hydrateRoot(container, <App />);
} else {
  // Development mode, render from scratch
  createRoot(container).render(<App />);
}
```

#### Option B : vite-ssg (plus avancée)
Pour une solution SSG complète avec Vite :
```bash
npm install vite-ssg
```
Et reconfigurer le routage pour utiliser `vite-ssg` en mode statique. Cette option est plus complexe mais plus robuste.

#### Option C : Migrer vers Next.js / Remix
C'est la solution idéale à long terme, mais c'est une réécriture significative du projet.

---

## 2. 🔴 Fichiers manquants : robots.txt & sitemap.xml

### Constat
Le dossier `public/` ne contient ni `robots.txt` ni `sitemap.xml`. Ces fichiers sont **essentiels** pour le référencement.

### Solution

**Créer `public/robots.txt` :**
```
# robots.txt — agence-sweet.com
User-agent: *
Allow: /

# Bloquer les pages admin
Disallow: /studio-ombre-87
Disallow: /acces-prive-87

# Sitemap
Sitemap: https://agence-sweet.com/sitemap.xml
```

**Créer `public/sitemap.xml` :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://agence-sweet.com/</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/services/site-vitrine</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/services/site-ecommerce</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/services/panneau-de-gestion</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/portfolio/translatix</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/portfolio/luminarte</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/portfolio/servicepro</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/portfolio/artinexus</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/mentions-legales</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://agence-sweet.com/confidentialite</loc>
    <lastmod>2026-04-16</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

> **Note :** À chaque ajout d'un nouveau projet portfolio ou d'une nouvelle page, il faut mettre à jour le sitemap. Idéalement, automatiser avec un script de build.

---

## 3. 🔴 Gestion des erreurs 404 côté serveur

### Constat
Dans `vercel.json`, le rewrite universel redirige **toutes** les URLs vers `index.html` avec un **status HTTP 200** :
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Cela signifie que même `/cette-page-nexiste-pas` renvoie un status 200. Google indexe ces pages comme du contenu valide.

### Solution
Modifier `vercel.json` pour gérer les routes connues et renvoyer un vrai 404 pour les routes inconnues :

```json
{
  "rewrites": [
    { "source": "/", "destination": "/index.html" },
    { "source": "/mentions-legales", "destination": "/index.html" },
    { "source": "/confidentialite", "destination": "/index.html" },
    { "source": "/services/site-vitrine", "destination": "/index.html" },
    { "source": "/services/site-ecommerce", "destination": "/index.html" },
    { "source": "/services/panneau-de-gestion", "destination": "/index.html" },
    { "source": "/portfolio/:projectId", "destination": "/index.html" },
    { "source": "/acces-prive-87", "destination": "/index.html" },
    { "source": "/studio-ombre-87/:path*", "destination": "/index.html" }
  ]
}
```

**Alternative** si on veut garder le catch-all pour le routage React, ajouter au minimum un header `X-Robots-Tag: noindex` pour les pages non-trouvées. Mais idéalement, avec `react-snap`, la page `/404` serait pré-rendue avec un vrai status 404.

---

## 4. 🔴 Incohérence www vs non-www

### Constat
Il y a une incohérence entre les différentes parties du code :

| Fichier | URL utilisée |
|---------|-------------|
| `SEO.tsx` → `siteUrl` | `https://agence-sweet.com` (sans www) |
| `index.html` → JSON-LD | `https://www.agence-sweet.com/` (avec www) |
| `og:image` dans `index.html` | `/preview.png` (relative, pas d'URL) |

### Impact
- Google considère `www.agence-sweet.com` et `agence-sweet.com` comme **deux sites différents**
- Le "jus SEO" (link juice) est dilué entre les deux versions
- Les canonical URLs pointent vers une version différente du JSON-LD

### Solution

**Étape 1 : Choisir UNE version (recommandé : sans www)**
Le standard moderne est de ne pas utiliser `www`. Choisir `https://agence-sweet.com`.

**Étape 2 : Corriger `index.html`**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Agence Sweet",
  "url": "https://agence-sweet.com/"
}
</script>
```

**Étape 3 : Corriger `og:image` dans `index.html`**
```html
<meta property="og:image" content="https://agence-sweet.com/preview.png">
```

**Étape 4 : Ajouter la redirection 301 dans `vercel.json`**
```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.agence-sweet.com" }],
      "destination": "https://agence-sweet.com/:path*",
      "permanent": true
    }
  ]
}
```

**Étape 5 : Vérifier `SEO.tsx`**
Le `siteUrl` est déjà `"https://agence-sweet.com"` → ✅ OK.

---

## 5. 🟠 Amélioration du composant SEO.tsx

### Constat actuel
Le composant gère : `title`, `description`, `canonical`, OG tags, Twitter Cards. Mais il manque plusieurs éléments importants.

### Solution : Composant SEO.tsx amélioré

```tsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description = "Boostez votre présence en ligne avec l'Agence Sweet. Experts en création de sites web sur mesure, design UX/UI et solutions e-commerce haute performance. Devis gratuit.",
  image = "/preview.png",
  canonical,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const { pathname } = useLocation();
  const siteUrl = "https://agence-sweet.com";
  const defaultTitle = "Agence Web Créative : Développement & Design sur Mesure | Sweet";
  const fullTitle = title ? `${title} | Sweet` : defaultTitle;
  const url = canonical || `${siteUrl}${pathname}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Agence Sweet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
```

### Modifications apportées :
1. **Ajout de `og:locale` = `fr_FR`** — Indique aux crawlers la langue du contenu
2. **Ajout de `og:site_name` = `Agence Sweet`** — Nom du site pour les previews sociales
3. **Ajout de `noindex` prop** — Pour la page 404 et les pages admin
4. **Ajout de `jsonLd` prop** — Pour injecter des données structurées par page
5. **Gestion intelligente des images** — Si l'image commence par `http`, on ne rajoute pas le `siteUrl`
6. **Suppression de `keywords` prop** — Google ignore `<meta name="keywords">` depuis 2009

---

## 6. 🟠 Données structurées JSON-LD manquantes

### Constat
Seul un schéma `WebSite` basique existe dans `index.html`. Il manque :
- `Organization` / `LocalBusiness` (identité de l'entreprise)
- `FAQPage` (pour les 3 pages de services avec FAQ)
- `BreadcrumbList` (fil d'Ariane dans les SERPs)
- `Service` (pour les pages de services)
- `CreativeWork` / `WebPage` (pour les pages portfolio)

### Solution

#### A. Schéma Organization dans `index.html`
Remplacer le JSON-LD existant par :
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://agence-sweet.com/#website",
      "name": "Agence Sweet",
      "url": "https://agence-sweet.com/",
      "description": "Agence web créative spécialisée en développement & design sur mesure",
      "inLanguage": "fr-FR"
    },
    {
      "@type": "Organization",
      "@id": "https://agence-sweet.com/#organization",
      "name": "Agence Sweet",
      "url": "https://agence-sweet.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://agence-sweet.com/sweet_logo.png"
      },
      "email": "contact@agence-sweet.com",
      "telephone": "+33683949690",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
      },
      "sameAs": []
    }
  ]
}
</script>
```

> **Note :** Ajouter les profils sociaux dans `sameAs` quand ils existent (LinkedIn, Instagram, etc.)

#### B. Schéma FAQPage pour les pages services
Utiliser la nouvelle prop `jsonLd` du composant SEO. Exemple pour `SiteVitrine/index.tsx` :

```tsx
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};

// Dans le JSX :
<SEO
  title="Création de Site Vitrine Professionnel & Design Sur Mesure"
  description="Créez un site vitrine qui convertit vos visiteurs en clients. Design unique, interface responsive et optimisation SEO pour booster votre visibilité locale."
  jsonLd={faqJsonLd}
/>
```

> **Faire la même chose pour les 3 pages de services** (`SiteVitrine`, `Ecommerce`, `PanneauDeGestion`).

#### C. Schéma BreadcrumbList pour les pages internes
Pour chaque page de service ou portfolio, ajouter un breadcrumb :

```tsx
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://agence-sweet.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://agence-sweet.com/#services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Site Vitrine",
      "item": "https://agence-sweet.com/services/site-vitrine"
    }
  ]
};
```

Pour combiner FAQPage et BreadcrumbList, passer un tableau :
```tsx
<SEO jsonLd={[faqJsonLd, breadcrumbJsonLd]} />
```

#### D. Schéma Service pour les pages de services
Ajouter à chaque page de service un schéma `Service` :

```tsx
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Création de Site Vitrine",
  "description": "Création de sites vitrine professionnels sur mesure...",
  "provider": {
    "@type": "Organization",
    "name": "Agence Sweet",
    "url": "https://agence-sweet.com"
  },
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "serviceType": "Développement Web"
};
```

---

## 7. 🟠 Open Graph incomplet dans index.html

### Constat
Dans `index.html`, il manque plusieurs meta OG et l'image est en URL relative.

### Solution
Ajouter/modifier dans le `<head>` de `index.html` :

```html
<!-- Meta OG manquantes -->
<meta property="og:url" content="https://agence-sweet.com/">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Agence Sweet">

<!-- Corriger l'image en URL absolue -->
<meta property="og:image" content="https://agence-sweet.com/preview.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Agence Sweet - Agence web créative, développement & design sur mesure">

<!-- Twitter Cards (absentes du HTML statique) -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Agence Web Créative : Développement & Design sur Mesure | Sweet">
<meta name="twitter:description" content="Besoin d'un site web qui marque les esprits ? Découvrez nos réalisations et confiez votre projet digital à l'Agence Sweet.">
<meta name="twitter:image" content="https://agence-sweet.com/preview.png">

<!-- Meta robots -->
<meta name="robots" content="index, follow">
```

> **Important :** L'image OG doit faire **1200×630px** pour un affichage optimal sur Facebook/LinkedIn.

---

## 8. 🟠 Navigation : Logo non crawlable

### Constat
Dans `src/components/layout/Navigation/index.tsx`, le logo est un `<div>` avec un `onClick` :
```tsx
<div onClick={() => navigateToSection('hero-section')} className="nav__logo">
```

Les crawlers ne peuvent pas suivre un `<div onClick>`. Le logo devrait être un lien `<a>` vers l'accueil.

### Solution
Remplacer le `<div>` par un `<a>` :

```tsx
<a href="/" onClick={(e) => { e.preventDefault(); navigateToSection('hero-section'); }} className="nav__logo">
  <div className="nav__logo-icon-wrapper">
    <div className="nav__logo-icon-glow" />
    <div className={`nav__logo-icon-inner ${isScrolled ? 'nav__logo-icon-inner--scrolled' : ''}`}>
      <Layers className={`nav__logo-icon ${isScrolled ? 'nav__logo-icon--scrolled' : ''}`} />
    </div>
  </div>
  <span className={`nav__logo-text ${isScrolled ? 'nav__logo-text--scrolled' : ''}`}>
    Sweet
  </span>
</a>
```

---

## 9. 🟠 Page 404 sans noindex

### Constat
La page `NotFound` (404) n'a pas de composant `<SEO>` et donc pas de meta `noindex`. Google pourrait indexer cette page.

### Solution
Ajouter dans `src/components/admin/NotFound.tsx` :

```tsx
import SEO from '../layout/SEO';

// Dans le JSX, au début du return :
<SEO
  title="Page non trouvée"
  description="La page que vous cherchez n'existe pas ou a été déplacée."
  noindex={true}
/>
```

---

## 10. 🟡 Optimisation des images

### Constat
- `public/preview.png` est en format PNG (non optimisé)
- `public/attilio.png` est en PNG
- `public/sweet_logo.png` est en PNG
- Aucun format WebP/AVIF n'est utilisé pour les assets statiques
- Pas de plugin d'optimisation d'images dans Vite

### Solution

**Étape 1 : Convertir les images en WebP**
```bash
# Installer cwebp (macOS)
brew install webp

# Convertir
cwebp -q 85 public/preview.png -o public/preview.webp
cwebp -q 85 public/attilio.png -o public/attilio.webp
cwebp -q 85 public/sweet_logo.png -o public/sweet_logo.webp
```

**Étape 2 : Installer un plugin Vite d'optimisation**
```bash
npm install --save-dev vite-plugin-image-optimizer
```

**Étape 3 : Configurer dans `vite.config.ts`**
```ts
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 85 },
      webp: { quality: 85 },
    }),
  ],
});
```

**Étape 4 : S'assurer que `preview.png` (pour OG image) reste en PNG**
Les réseaux sociaux préfèrent le PNG/JPG pour les OG images. Garder `preview.png` en plus du WebP.

---

## 11. 🟡 Favicon : type MIME incorrect

### Constat
Dans `index.html` :
```html
<link rel="icon" type="image/svg+xml" href="/sweet_logo.png">
```
Le type MIME est `image/svg+xml` mais le fichier est un `.png`.

### Solution
```html
<link rel="icon" type="image/png" href="/sweet_logo.png">
```

Et ajouter un fallback `.ico` pour les anciens navigateurs :
```html
<link rel="icon" type="image/png" sizes="32x32" href="/sweet_logo.png">
<link rel="apple-touch-icon" href="/sweet_logo.png">
```

---

## 12. 🟡 Fichier manifest.json manquant

### Constat
Aucun Web App Manifest n'existe. C'est nécessaire pour :
- L'expérience "Ajouter à l'écran d'accueil" sur mobile
- Les PWA
- Le branding dans les navigateurs mobiles

### Solution
Créer `public/manifest.json` :

```json
{
  "name": "Agence Sweet — Agence Web Créative",
  "short_name": "Sweet",
  "description": "Agence web créative spécialisée en développement & design sur mesure",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#14b8a6",
  "lang": "fr",
  "icons": [
    {
      "src": "/sweet_logo.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

Et ajouter dans `index.html` :
```html
<link rel="manifest" href="/manifest.json">
```

---

## 13. 🟡 Meta theme-color manquante

### Constat
Pas de `<meta name="theme-color">` dans `index.html`. Cette meta contrôle la couleur de la barre d'adresse sur mobile.

### Solution
Ajouter dans le `<head>` de `index.html` :
```html
<meta name="theme-color" content="#0f172a">
```

---

## 14. 🟡 Fichier .DS_Store dans public/

### Constat
Le fichier `.DS_Store` (fichier macOS) est dans `public/` et sera déployé sur Vercel.

### Solution
```bash
# Supprimer le fichier
rm public/.DS_Store

# Ajouter au .gitignore
echo ".DS_Store" >> .gitignore
echo "**/.DS_Store" >> .gitignore
```

---

## 15. 🟡 Headers de sécurité & cache dans vercel.json

### Constat
Le `vercel.json` ne contient aucun header HTTP personnalisé. Les headers de sécurité améliorent indirectement le SEO (Google favorise les sites sécurisés).

### Solution
Ajouter dans `vercel.json` :

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*\\.(?:png|jpg|jpeg|webp|svg|ico))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=86400, stale-while-revalidate=604800" }
      ]
    }
  ]
}
```

Ajouter aussi le header `X-Robots-Tag: noindex` pour les pages admin :
```json
{
  "source": "/studio-ombre-87/(.*)",
  "headers": [
    { "key": "X-Robots-Tag", "value": "noindex, nofollow" }
  ]
}
```

---

## 16. 🟡 Prop keywords inutilisée dans SEO.tsx

### Constat
L'interface `SEOProps` définit une prop `keywords` mais elle n'est jamais rendue dans le JSX. C'est du code mort.

### Solution
Supprimer la prop `keywords` de l'interface car Google ignore `<meta name="keywords">` depuis 2009.

```tsx
interface SEOProps {
  title?: string;
  description?: string;
  // keywords supprimé
  image?: string;
  canonical?: string;
  type?: string;
}
```

---

## 17. 📊 Récapitulatif de ce qui est bien fait

| Élément | Statut |
|---------|--------|
| `lang="fr"` sur `<html>` | ✅ |
| Composant `<SEO>` centralisé avec Helmet | ✅ |
| Chaque page a un `title` et `description` uniques | ✅ |
| Canonical URLs auto-générées | ✅ |
| Open Graph + Twitter Cards dans le composant SEO | ✅ |
| Hiérarchie des headings (h1 > h2 > h3) | ✅ |
| HTML sémantique (`<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`) | ✅ |
| `alt` text sur toutes les images projets | ✅ |
| `loading="lazy"` sur les images below-the-fold | ✅ |
| `rel="noopener noreferrer"` sur les liens externes | ✅ |
| `aria-label` sur les boutons interactifs | ✅ |
| `aria-expanded` sur les accordéons FAQ | ✅ |
| Données statiques pour les projets portfolio (SEO-first) | ✅ |
| RGPD/CNIL : consentement cookies conforme | ✅ |
| Google Analytics conditionné au consentement | ✅ |
| Preconnect pour Google Fonts | ✅ |
| Code splitting avec lazy loading | ✅ |

---

## 18. 📋 Checklist de mise en œuvre

### Priorité 1 — Critique (à faire en premier)
- [ ] Mettre en place le prerendering (`react-snap` ou autre)
- [ ] Créer `public/robots.txt`
- [ ] Créer `public/sitemap.xml`
- [ ] Corriger l'incohérence www vs non-www (choisir et rediriger)
- [ ] Mettre à jour `vercel.json` (redirections 301, headers, rewrites spécifiques)

### Priorité 2 — Important
- [ ] Améliorer `SEO.tsx` (og:locale, og:site_name, noindex, jsonLd)
- [ ] Ajouter JSON-LD `Organization` dans `index.html`
- [ ] Ajouter JSON-LD `FAQPage` sur les 3 pages de services
- [ ] Ajouter JSON-LD `BreadcrumbList` sur toutes les pages internes
- [ ] Corriger `og:image` en URL absolue dans `index.html`
- [ ] Ajouter les Twitter Cards dans `index.html` (fallback statique)
- [ ] Changer le logo Navigation de `<div>` à `<a href="/">`
- [ ] Ajouter `<SEO noindex />` sur la page 404

### Priorité 3 — Bonnes pratiques
- [ ] Corriger le type MIME du favicon (`image/png`)
- [ ] Créer `public/manifest.json`
- [ ] Ajouter `<meta name="theme-color">`
- [ ] Supprimer `.DS_Store` de `public/`
- [ ] Optimiser les images en WebP
- [ ] Supprimer la prop `keywords` inutilisée de `SEO.tsx`
- [ ] Ajouter les headers de sécurité dans `vercel.json`
