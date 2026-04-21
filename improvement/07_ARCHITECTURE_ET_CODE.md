# 🏗️ Audit Architecture & Code Quality

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. `insertProject` non utilisé dans supabaseService.ts

**Fichier** : `src/services/supabaseService.ts` lignes 3-7  
**Problème** : La fonction `insertProject` est définie mais **jamais importée nulle part** dans le projet. C'est du dead code.

**Correction** :
```
Supprimer la fonction insertProject() de supabaseService.ts
```

---

## 🟠 2. Deux tables différentes pour les projets

**Fichiers** : `src/services/supabaseService.ts` et `src/services/adminService.ts`  
**Problème** : 
- `supabaseService.ts` utilise `supabase.from('projects')` (ligne 4)
- `adminService.ts` + `useProjects.ts` utilisent `supabase.from('projects_portfolio')`

La table `'projects'` dans `supabaseService.ts` est probablement une ancienne table, ce qui crée de la confusion.

**Correction** :
```
1. Vérifier si la table 'projects' existe encore dans Supabase
2. Si oui, migrer/supprimer
3. Supprimer insertProject de supabaseService.ts (point 1)
4. N'utiliser que 'projects_portfolio' partout
```

---

## 🟠 3. Fetch Supabase en double pour les services (accent color + services)

**Fichiers** :
- `src/hooks/useAccentColor.ts` : Fetch `services` pour les couleurs (lignes 64-76)
- `src/components/sections/Services/index.tsx` : Fetch `services` pour le contenu (lignes 140-166)

**Problème** : Deux requêtes identiques à la même table `services` avec `is_public = true` au chargement de la page. C'est un gaspillage réseau.

**Correction** :
```
1. Créer un hook partagé useServices() qui cache les données
2. Ou utiliser React Context pour partager les services fetchés
3. Ou utiliser un state management minimal (zustand / jotai)
```

---

## 🟠 4. Composant `hero__main` utilise `<main>` — sémantique incorrecte

**Fichier** : `src/components/sections/Hero/index.tsx` ligne 82  
**Problème** : Le Hero utilise `<main>` pour son conteneur interne. Cela signifie que les sections suivantes (Services, Portfolio, About, Contact, Footer) sont **en dehors** du `<main>`, ce qui est sémantiquement incorrect.

**Correction** :
```tsx
// Hero/index.tsx — remplacer <main> par <div>
<div className="hero__main">

// PublicHome.tsx — envelopper tout le contenu dans <main>
<main style={styles.app}>
  <Hero />
  <ScrollAnimation />
  ...
</main>
```

---

## 🟠 5. `useWindowSize` hook cause des re-renders inutiles

**Fichier** : `src/hooks/useWindowSize.ts`  
**Problème** : Le hook re-render le composant **à chaque resize** (avec debounce de 100ms). Or, les breakpoints ne changent que quand on passe un seuil (mobile → tablet → desktop). Le hook devrait re-render uniquement quand un breakpoint change.

**Correction** :
```tsx
// Comparer les breakpoints au lieu des dimensions exactes
const handleResize = () => {
  const width = window.innerWidth;
  const newIsMobile = width < BREAKPOINTS.mobile;
  const newIsTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
  // Ne re-render que si le breakpoint a changé
  setWindowSize(prev => {
    if (prev.isMobile === newIsMobile && prev.isTablet === newIsTablet) {
      return prev; // même référence = pas de re-render
    }
    return { ... };
  });
};
```

---

## 🟡 6. ContactForm utilise `insertContact` depuis `adminService`

**Fichier** : `src/components/sections/Contact/ContactForm/index.tsx` ligne 9  
**Problème** : Le formulaire de contact public importe `insertContact` depuis `adminService.ts`. Ce service est censé être réservé à l'admin. Le formulaire public fait un INSERT direct dans la base de données via la clé anonyme Supabase.

**Impact sécurité** : Si les RLS sont mal configurées, n'importe qui peut insérer des messages sans validation côté serveur. Il n'y a aucune protection anti-spam (honeypot, captcha, rate limiting).

**Correction** :
```
1. Déplacer insertContact dans supabaseService.ts (service public)
2. Ajouter une validation côté serveur (Edge Function Supabase ou webhook)
3. Ajouter un honeypot anti-spam dans le formulaire
4. Implémenter un rate limiting basique (max 3 messages par IP par heure)
```

---

## 🟡 7. React 18 avec react-router-dom v7 — Compatibilité

**Fichier** : `package.json` lignes 39, 44  
**Problème** : 
- React 18.3.1
- react-router-dom 7.13.0

React Router v7 est conçu pour React 19+. Bien qu'il fonctionne avec React 18, certaines fonctionnalités (comme les Server Components) ne sont pas disponibles. La documentation officielle recommande React 19 pour v7.

**Correction** :
```
Option 1 : Rester sur react-router-dom v6 (stable pour React 18)
Option 2 : Mettre à jour React vers la version 19
```

---

## 🟡 8. Pas de Error Boundary global

**Problème** : Si un composant crash (erreur runtime), l'application entière plante avec un écran blanc. Il n'y a pas de `ErrorBoundary` pour afficher un message d'erreur élégant.

**Correction** :
```tsx
// Ajouter un ErrorBoundary dans main.tsx
<ErrorBoundary fallback={<ErrorPage />}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</ErrorBoundary>
```

---

## 🟡 9. `react-snap` en devDependencies mais utilisé en postbuild

**Fichier** : `package.json` lignes 9, 57  
**Problème** : `react-snap` est en `devDependencies` ce qui est correct, mais la config `reactSnap.include` hardcode les URLs du portfolio (`translatix`, `luminarte`, etc.). Quand un nouveau projet est ajouté dans Supabase, il faut manuellement mettre à jour `package.json`.

**Correction** :
```
1. Créer un script de pre-build qui query Supabase pour les IDs de projets
2. Générer dynamiquement la liste d'URLs pour react-snap
3. Ou migrer vers un vrai SSG/SSR (Next.js) pour le pre-rendering automatique
```

---

## 🟢 10. Composants de pages de services très similaires (DRY)

**Fichiers** : `SiteVitrine/index.tsx`, `Ecommerce/index.tsx`, `PanneauDeGestion/index.tsx`  
**Problème** : Les trois pages de services ont exactement la même structure :
```
ServiceHero → ServiceIntro → ServiceBenefits → ServiceProcess → 
ServiceFaq → ServiceGuarantees → ServiceCtaBand → Footer
```
Seules les données changent. Cela pourrait être un seul composant `ServicePage` avec un objet de configuration.

**Correction** :
```tsx
// Créer un composant ServicePage générique
function ServicePage({ config }: { config: ServicePageConfig }) {
  return (
    <div className={`service-page service-page--${config.colorScheme}`}>
      <SEO title={config.seo.title} description={config.seo.description} jsonLd={config.jsonLd} />
      <ServiceHero {...config.hero} />
      <ServiceIntro {...config.intro} />
      <ServiceBenefits {...config.benefits} />
      ...
    </div>
  );
}
```

---

## 🟢 11. `useCallback` sans réel bénéfice dans ContactForm

**Fichier** : `src/components/sections/Contact/ContactForm/index.tsx`  
**Problème** : `handleChange`, `handleBlur`, `handleFocus`, `handleSubmit` sont tous wrappés dans `useCallback` mais sont passés directement à des éléments DOM natifs (`<input>`, `<textarea>`), pas à des enfants React mémoïsés. `useCallback` n'apporte aucun gain de performance dans ce cas.

**Correction** : Retirer les `useCallback` inutiles pour simplifier le code.
