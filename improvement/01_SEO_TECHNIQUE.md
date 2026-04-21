# 🔍 Audit SEO Technique

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. Image OG/Twitter en PNG au lieu de WebP

**Fichier** : `src/components/layout/SEO.tsx` ligne 17, `index.html` ligne 26/38  
**Problème** : L'image de preview sociale `/preview.png` est en PNG (1.19 Mo). Les images OG doivent être < 300 Ko idéalement.  
**Impact** : Chargement lent des previews sur Facebook/Twitter/LinkedIn, mauvaise expérience utilisateur au partage.

**Correction** :
```
1. Convertir preview.png en WebP (cible : < 200 Ko)
2. Mettre à jour les références dans index.html (og:image, twitter:image)
3. Mettre à jour le default dans SEO.tsx : image = "/preview.webp"
```

---

## 🔴 2. Favicon/Logo en PNG non optimisé (501 Ko)

**Fichier** : `public/sweet_logo.png` — 501 Ko  
**Problème** : Le logo utilisé comme favicon fait 501 Ko, ce qui est excessif pour un favicon. Un favicon devrait faire < 10 Ko.

**Correction** :
```
1. Générer des favicons aux tailles standard : 16x16, 32x32, 180x180 (apple-touch-icon)
2. Utiliser le format .ico ou .svg pour le favicon principal
3. Garder le PNG uniquement pour apple-touch-icon à 180x180 (< 20 Ko)
4. Ajouter dans index.html :
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
```

---

## 🔴 3. Photo de profil attilio.png non compressée (2.76 Mo)

**Fichier** : `public/attilio.png` — 2 768 806 octets  
**Problème** : Image présente dans public/ de presque 3 Mo. Même si elle n'est pas utilisée dans le site actuellement, elle est servie publiquement et pèse sur le bundle.

**Correction** :
```
1. Si utilisée : convertir en WebP et redimensionner à 400x400 max (< 50 Ko)
2. Si non utilisée : supprimer de public/
```

---

## 🟠 4. Sitemap statique non mis à jour automatiquement

**Fichier** : `public/sitemap.xml`  
**Problème** : Le sitemap est statique avec des dates hardcodées (`2026-04-16`). Quand un nouveau projet portfolio est ajouté via Supabase, le sitemap n'est pas mis à jour.

**Correction** :
```
Option 1 : Ajouter un script de build qui génère le sitemap depuis les données Supabase
Option 2 : Créer une Vercel Edge Function qui génère le sitemap dynamiquement
```

---

## 🟠 5. Heading `<h1>` absent de la page d'accueil côté SEO

**Fichier** : `src/components/sections/Hero/index.tsx` ligne 31  
**Problème** : Le `<h1>` est `Agence web<br/>Sweet.` — C'est correct sémantiquement MAIS le contenu est trop générique pour le SEO. Il ne contient aucun mot-clé métier.

**Correction** :
```tsx
// Actuel
<h1>Agence web<br/><span>Sweet.</span></h1>

// Recommandé (garder "Sweet" visuellement, enrichir sémantiquement)
<h1>
  Agence web créative<br/>
  <span className="hero__title-gradient">Sweet.</span>
</h1>
// Ou ajouter un <span className="sr-only"> avec du texte enrichi pour le SEO
```

---

## 🟠 6. `<main>` utilisé à l'intérieur du Hero au lieu d'envelopper toute la page

**Fichier** : `src/components/sections/Hero/index.tsx` ligne 82  
**Problème** : La balise `<main>` est utilisée dans le Hero section au lieu d'encapsuler le contenu principal de la page (`PublicHome.tsx`). Google attend un seul `<main>` par page couvrant le contenu principal.

**Correction** :
```
1. Retirer <main> du Hero, le remplacer par <div>
2. Ajouter <main> dans PublicHome.tsx autour du contenu principal (après le Hero)
   OU envelopper tout le contenu dans PublicHome avec <main>
```

---

## 🟠 7. Liens internes de navigation avec `<a href>` + `preventDefault` au lieu de `<Link>`

**Fichier** : `src/components/layout/Navigation/index.tsx` lignes 107-117, `src/components/sections/Footer/index.tsx` lignes 48-58  
**Problème** : Les liens de navigation utilisent `<a href="/#services">` avec `preventDefault`, ce qui empêche le crawling naturel par les bots. Les bots ne voient que des `<a>` vers des ancres qui ne mènent nulle part sans JavaScript.

**Correction** :
```
Pour le SEO, les bots doivent pouvoir suivre les liens.
Les ancres hash sont acceptables mais préférer <Link to="/#services"> de react-router
qui génère des vrais <a> tout en gérant la navigation côté client.
```

---

## 🟡 8. Pas de balise `<link rel="alternate" hreflang>` 

**Fichier** : `index.html`, `src/components/layout/SEO.tsx`  
**Problème** : Le site est en français mais ne déclare pas `hreflang` pour signaler aux moteurs de recherche qu'il cible les utilisateurs francophones.

**Correction** :
```html
<!-- Dans index.html ou via Helmet -->
<link rel="alternate" hreflang="fr" href="https://agence-sweet.com/" />
<link rel="alternate" hreflang="x-default" href="https://agence-sweet.com/" />
```

---

## 🟡 9. Manifest incomplet (manque taille 512x512)

**Fichier** : `public/manifest.json`  
**Problème** : L'icône n'a qu'une seule taille (192x192). Google et les PWA nécessitent au minimum 192x192 ET 512x512.

**Correction** :
```json
{
  "icons": [
    { "src": "/sweet_logo_192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/sweet_logo_512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 🟡 10. Absence de header `Content-Security-Policy`

**Fichier** : `vercel.json`  
**Problème** : Les headers de sécurité sont bien présents (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) mais il manque `Content-Security-Policy` et `Strict-Transport-Security`.

**Correction** :
```json
{
  "key": "Strict-Transport-Security",
  "value": "max-age=63072000; includeSubDomains; preload"
},
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://api.web3forms.com;"
}
```

---

## 🟡 11. Google Fonts chargées via `<link>` bloquant le rendu

**Fichier** : `index.html` lignes 78-82  
**Problème** : Les Google Fonts sont chargées via `<link rel="stylesheet">` classique + un second import dans `index.css` ligne 3. **Double chargement** et **blocage du rendu**.

**Correction** :
```
1. Supprimer l'import dans index.css ligne 3 (il charge Inter en doublon)
2. Ajouter media="print" onload="this.media='all'" pour le chargement asynchrone :
   <link href="https://fonts.googleapis.com/..." rel="stylesheet" media="print" onload="this.media='all'" />
   <noscript><link rel="stylesheet" href="..." /></noscript>
3. MIEUX : Héberger les polices en local via @font-face pour éliminer les requêtes externes
```

---

## 🟡 12. JSON-LD `sameAs` vide dans index.html

**Fichier** : `index.html` ligne 71  
**Problème** : `"sameAs": []` — Le tableau de liens vers les réseaux sociaux est vide. Google utilise ce champ pour valider l'identité de l'entreprise.

**Correction** :
```json
"sameAs": [
  "https://www.linkedin.com/company/agence-sweet/"
]
```

---

## 🟢 13. Pages de service sans balise `<nav>` breadcrumb visible

**Problème** : Les pages de service (SiteVitrine, Ecommerce, PanneauDeGestion) ont des `BreadcrumbList` en JSON-LD mais aucun breadcrumb visuellement affiché. Les utilisateurs et Google bénéficient d'un breadcrumb visible.

**Correction** :
```
Ajouter un composant Breadcrumb visuel sous le ServiceHero, ex :
Accueil > Services > Site Vitrine
```

---

## 🟢 14. `package.json` nommé "vite-react-typescript-starter"

**Fichier** : `package.json` ligne 2  
**Problème** : Le nom du package est `"vite-react-typescript-starter"` — nom par défaut du template. Ce n'est pas visible par l'utilisateur mais c'est une mauvaise pratique.

**Correction** :
```json
"name": "agence-sweet-website"
```
