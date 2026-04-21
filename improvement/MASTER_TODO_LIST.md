# 📋 Master Todo List — Améliorations Agence Sweet

Ce document regroupe toutes les tâches identifiées lors de l'audit, classées par fichier avec leur niveau de priorité. Les tâches issues de l'audit précédent sont cochées comme demandé.

---

## [SEO_AMELIORATIONS_CODE.md](./SEO_AMELIORATIONS_CODE.md)

### Priorité 1 — Critique (à faire en premier)
- [x] Mettre en place le prerendering (`react-snap` ou autre)
- [x] Créer `public/robots.txt`
- [x] Créer `public/sitemap.xml`
- [x] Corriger l'incohérence www vs non-www (choisir et rediriger)
- [x] Mettre à jour `vercel.json` (redirections 301, headers, rewrites spécifiques)

### Priorité 2 — Important
- [x] Améliorer `SEO.tsx` (og:locale, og:site_name, noindex, jsonLd)
- [x] Ajouter JSON-LD `Organization` dans `index.html`
- [x] Ajouter JSON-LD `FAQPage` sur les 3 pages de services
- [x] Ajouter JSON-LD `BreadcrumbList` sur toutes les pages internes
- [x] Corriger `og:image` en URL absolue dans `index.html`
- [x] Ajouter les Twitter Cards dans `index.html` (fallback statique)
- [x] Changer le logo Navigation de `<div>` à `<a href="/">`
- [x] Ajouter `<SEO noindex />` sur la page 404

### Priorité 3 — Bonnes pratiques
- [x] Corriger le type MIME du favicon (`image/png`)
- [x] Créer `public/manifest.json`
- [x] Ajouter `<meta name="theme-color">`
- [x] Supprimer `.DS_Store` de `public/`
- [x] Optimiser les images en WebP
- [x] Supprimer la prop `keywords` inutilisée de `SEO.tsx`
- [x] Ajouter les headers de sécurité dans `vercel.json`

---

## [01_SEO_TECHNIQUE.md](./01_SEO_TECHNIQUE.md)
- [ ] 🔴 1. Image OG/Twitter en PNG au lieu de WebP
- [ ] 🔴 2. Favicon/Logo en PNG non optimisé (501 Ko)
- [ ] 🔴 3. Photo de profil attilio.png non compressée (2.76 Mo)
- [ ] 🟠 4. Sitemap statique non mis à jour automatiquement
- [ ] 🟠 5. Heading `<h1>` absent de la page d'accueil côté SEO
- [ ] 🟠 6. `<main>` utilisé à l'intérieur du Hero au lieu d'envelopper toute la page
- [ ] 🟠 7. Liens internes de navigation avec `<a href>` + `preventDefault` au lieu de `<Link>`
- [ ] 🟡 8. Pas de balise `<link rel="alternate" hreflang>`
- [ ] 🟡 9. Manifest incomplet (manque taille 512x512)
- [ ] 🟡 10. Absence de header `Content-Security-Policy`
- [ ] 🟡 11. Google Fonts chargées via `<link>` bloquant le rendu
- [ ] 🟡 12. JSON-LD `sameAs` vide dans index.html
- [ ] 🟢 13. Pages de service sans balise `<nav>` breadcrumb visible
- [ ] 🟢 14. `package.json` nommé "vite-react-typescript-starter"

---

## [02_SECURITE_ET_ENV.md](./02_SECURITE_ET_ENV.md)
- [ ] 🔴 1. Clé API Web3Forms hardcodée dans le code source
- [ ] 🔴 2. Credentials Supabase en clair dans `.env` versionné
- [ ] 🔴 3. Chemins admin en clair dans le `.env` local vs production
- [ ] 🟠 4. `@ts-ignore` utilisé 4 fois dans App.tsx
- [ ] 🟠 5. `any` utilisé dans le code TypeScript
- [ ] 🟠 6. AuthContext assume que toute session = admin
- [ ] 🟡 7. `dotenv` dans les dépendances de production
- [ ] 🟡 8. Supabase `select('*')` sur des tables publiques
- [ ] 🟡 9. RequireAdmin ne gère pas `VITE_LOGIN_PATH` vide

---

## [03_COPYWRITING_ET_VENTE.md](./03_COPYWRITING_ET_VENTE.md)
- [ ] 🔴 1. "En tant que nouvelle agence" — L'aveu de faiblesse le plus coûteux
- [ ] 🔴 2. "Fondée en 2026" — Date qui ancre le manque de track record
- [ ] 🟠 3. Rôles des fondateurs trop "corporate" et pas assez distinctifs
- [ ] 🟠 4. Absence de preuve sociale et de crédibilité
- [ ] 🟠 5. "Nous rendons le web plus simple, plus beau, plus Sweet" — Tagline floue
- [ ] 🟠 6. "Découvrez nos 3 piliers d'excellence" — Jargon corporate
- [ ] 🟡 7. Hero description dans PublicHome ne correspond pas à Hero.tsx
- [ ] 🟡 8. "Prêt à transformer votre présence numérique ?" — CTA générique
- [ ] 🟡 9. Titre Contact "Donnons vie à votre vision" — Trop naïf
- [ ] 🟡 10. "Contactez-nous et commençons cette aventure ensemble" — Trop émotionnel
- [ ] 🟢 11. "Nous répondons généralement sous 24 heures" — Bien mais à renforcer
- [ ] 🟢 12. Technologies listées sans hiérarchie de pertinence

---

## [04_STYLE_ET_COHERENCE_CSS.md](./04_STYLE_ET_COHERENCE_CSS.md)
- [ ] 🔴 1. Double système de design non unifié (theme.ts vs variables.css)
- [ ] 🟠 2. Couleurs hardcodées dans les fichiers CSS (pas de variables)
- [ ] 🟠 3. `index.css` contient un duplicata de `html` selector
- [ ] 🟠 4. Mélange de classes CSS BEM et classes génériques
- [ ] 🟠 5. `theme.ts` contient un commentaire obsolète "STRATA"
- [ ] 🟡 6. Gradients incohérents entre CSS et JS
- [ ] 🟡 7. Inline styles excessifs dans certains composants
- [ ] 🟡 8. `Loader` dans App.tsx utilise des styles inline hardcodés
- [ ] 🟡 9. `Suspense fallback` dans PublicHome avec styles inline
- [ ] 🟢 10. Variables CSS pour les breakpoints jamais utilisées en CSS
- [ ] 🟢 11. Scrollbar styling webkit-only

---

## [05_ACCESSIBILITE.md](./05_ACCESSIBILITE.md)
- [ ] 🔴 1. Navigation au clavier impossible pour les boutons CTA
- [ ] 🔴 2. Images sans attribut `width` et `height` (CLS)
- [ ] 🟠 3. Pas de `role="navigation"` ou `aria-label` sur les `<nav>`
- [ ] 🟠 4. Contraste insuffisant pour certains textes
- [ ] 🟠 5. Animations Framer Motion sans respect de `prefers-reduced-motion`
- [ ] 🟠 6. Formulaire de contact : labels présents mais pas de `aria-required`
- [ ] 🟡 7. Modal du Portfolio sans trap de focus
- [ ] 🟡 8. Le drawer mobile n'a pas de `role="dialog"`
- [ ] 🟡 9. Icônes décoratives sans `aria-hidden`
- [ ] 🟡 10. Navigation logo `<a href="/">` avec `onClick preventDefault`
- [ ] 🟢 11. Pas de "skip to content" link

---

## [06_IMAGES_ET_PERFORMANCE.md](./06_IMAGES_ET_PERFORMANCE.md)
- [ ] 🔴 1. Images `public/` en PNG non optimisées — Poids total : 4.4 Mo
- [ ] 🟠 2. `vite-plugin-image-optimizer` mal configuré
- [ ] 🟠 3. Aucune image lazy-loadée sauf dans l'About
- [ ] 🟠 4. Pas de `<picture>` avec fallback pour les images WebP
- [ ] 🟡 5. Pas de `srcset` ni `sizes` pour le responsive
- [ ] 🟡 6. Google Fonts chargées en double
- [ ] 🟡 7. Animations CSS lourdes (blob-drift) sur mobile
- [ ] 🟢 8. Tailwind CSS installé mais pas utilisé correctement
- [ ] 🟢 9. Pas de format AVIF pour les images de preview

---

## [07_ARCHITECTURE_ET_CODE.md](./07_ARCHITECTURE_ET_CODE.md)
- [ ] 🔴 1. `insertProject` non utilisé dans supabaseService.ts
- [ ] 🟠 2. Deux tables différentes pour les projets
- [ ] 🟠 3. Fetch Supabase en double pour les services (accent color + services)
- [ ] 🟠 4. Composant `hero__main` utilise `<main>` — sémantique incorrecte
- [ ] 🟠 5. `useWindowSize` hook cause des re-renders inutiles
- [ ] 🟡 6. ContactForm utilise `insertContact` depuis `adminService`
- [ ] 🟡 7. React 18 avec react-router-dom v7 — Compatibilité
- [ ] 🟡 8. Pas de Error Boundary global
- [ ] 🟡 9. `react-snap` en devDependencies mais utilisé en postbuild
- [ ] 🟢 10. Composants de pages de services très similaires (DRY)
- [ ] 🟢 11. `useCallback` sans réel bénéfice dans ContactForm

---

## [08_MISE_EN_PAGE_ET_UX.md](./08_MISE_EN_PAGE_ET_UX.md)
- [ ] 🟠 1. Photos d'équipe absentes (initiales à la place)
- [ ] 🟠 2. Section "Notre Histoire" beaucoup trop longue
- [ ] 🟠 3. Section Contact : Adresse "Strasbourg" vs Mentions Légales "Wasselonne"
- [ ] 🟠 4. Page 404 : NotFound est dans `/admin/` au lieu d'être global
- [ ] 🟡 5. `window.scrollTo(0, 0)` dans chaque page de service
- [ ] 🟡 6. Navigation mobile drawer : pas de swipe pour fermer
- [ ] 🟡 7. Footer identique sur toutes les pages mais avec `colorScheme` inutile
- [ ] 🟡 8. Pas de breadcrumb visuel sur les pages de service
- [ ] 🟡 9. Formulaire de contact sans protection anti-spam
- [ ] 🟢 10. Les liens du footer Contact ne sont pas des `<a>` avec href correct
- [ ] 🟢 11. Pas de page "Services" globale (hub)

---

## [SEO_GUIDE_GOOGLE.md](./SEO_GUIDE_GOOGLE.md)
- [x] 🔴 Phase 1 : Créer et configurer Google Search Console
- [ ] 🔴 Phase 2 : Configurer Google Analytics 4 (GA4)
- [ ] 🔴 Phase 3 : Soumettre le sitemap et demander l'indexation
- [ ] 🟠 Phase 4 : Créer et optimiser le Google Business Profile
- [ ] 🟠 Phase 5 : Tester et valider les données structurées
- [ ] 🟠 Phase 6 : Tester les Core Web Vitals
- [ ] 🟠 Phase 7 : Tester le rendu mobile
- [ ] 🟠 Phase 8 : Tester les previews sociales (Open Graph)
- [ ] 🟡 Phase 9 : Stratégie de mots-clés et contenu
- [ ] 🟡 Phase 10 : Backlinks et autorité de domaine
- [ ] 🟡 Phase 11 : Monitoring et suivi continu
- [ ] 🟡 Phase 12 : Optimisations avancées

---

## [SEO_PLATEFORMES_EXTERNES.md](./SEO_PLATEFORMES_EXTERNES.md)

### Vercel
- [ ] 🔴 Redirection 301 www → non-www
- [ ] 🟠 Vérifier région serveur Europe (cdg1/fra1)
- [ ] 🟠 Activer Speed Insights
- [ ] 🟡 Headers sécurité (vercel.json)
- [ ] 🟡 Vérifier HTTPS/SSL
- [ ] 🟡 Preview deployments noindex
- [ ] 🟡 Alertes erreurs 500

### Infomaniak
- [ ] 🔴 Vérifier DNS (A + CNAME)
- [ ] 🔴 Renouvellement auto domaine
- [ ] 🟠 Enregistrement AAAA (IPv6)
- [ ] 🟠 SPF / DKIM / DMARC pour les emails
- [ ] 🟠 Email professionnel configuré
- [ ] 🟡 Activer DNSSEC

### Supabase
- [ ] 🟠 Optimiser images Storage
- [ ] 🟠 Vérifier région serveur (EU)
- [ ] 🟠 Vérifier RLS policies
- [ ] 🟠 Backups automatiques
- [ ] 🟡 Surveiller performances API
- [ ] 🟡 Sync données statiques

---

## [AUDIT_STYLES_SITE.md](./AUDIT_STYLES_SITE.md)
- [ ] 🟠 Harmoniser les couleurs hardcodées hors tokens (portfolio dots, états erreurs/succès, LinkedIn, etc.)
- [ ] 🟠 Réduire l'utilisation des styles inline (27 fichiers détectés)
- [ ] 🟠 Unifier les signatures visuelles concurrentes (sombre glass vs clair éditorial vs admin)
- [ ] 🟡 Ajuster la cohérence et l'intensité des animations selon les sections

