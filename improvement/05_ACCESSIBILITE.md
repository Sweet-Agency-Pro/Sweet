# ♿ Audit Accessibilité (a11y)

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. Navigation au clavier impossible pour les boutons CTA

**Fichiers** : Heroes, Services, Contact — tous les `<button>` avec pseudo-éléments  
**Problème** : Les boutons principaux (ex: `hero__primary-btn`, `services__cta-button`) ont des structures complexes avec des `<div>` internes pour les effets visuels (gradient, hover), mais pas de `role` ou `aria-label` explicites. De plus, l'état `:focus-visible` est globalement défini dans `index.css` mais les pseudo-éléments de hover/glow des boutons peuvent masquer l'outline de focus.

**Correction** :
```css
/* S'assurer que l'outline de focus passe au-dessus des pseudo-éléments */
.hero__primary-btn:focus-visible {
  outline: 2px solid var(--teal-400);
  outline-offset: 3px;
  z-index: 1;
}
```

---

## 🔴 2. Images sans attribut `width` et `height` (CLS)

**Fichiers** : Toutes les images du Portfolio et des projets  
**Problème** : Les `<img>` dans les composants `FlagshipCard`, `ConceptCard`, `ProjectModal`, `ProjectDetail` n'ont pas d'attributs `width` et `height` explicites. Cela provoque du CLS (Cumulative Layout Shift) pendant le chargement.

**Correction** :
```tsx
<img 
  src={project.previewUrl}
  alt={`Aperçu du projet ${project.name}`}
  width={800}
  height={450}
  loading="lazy"
/>
```

---

## 🟠 3. Pas de `role="navigation"` ou `aria-label` sur les `<nav>` 

**Fichier** : `src/components/layout/Navigation/index.tsx` ligne 88  
**Problème** : La `<nav>` principale n'a pas de `aria-label` pour distinguer la navigation principale du breadcrumb ou du footer navigation.

**Correction** :
```tsx
<nav aria-label="Navigation principale" className={`nav ...`}>
```
```tsx
// Dans le Footer
<nav aria-label="Liens de navigation du pied de page" className="footer__link-list">
```

---

## 🟠 4. Contraste insuffisant pour certains textes

**Problème potentiel** : Les textes avec des nuances de `slate-400` (`#94a3b8`) sur fond blanc (`#ffffff`) ont un ratio de contraste de **3.3:1**, en dessous du minimum WCAG AA de **4.5:1** pour le texte normal.

**Endroits concernés** :
- Descriptions de services
- Sous-titres des sections
- Labels du formulaire de contact

**Correction** :
```css
/* Remplacer slate-400 par slate-500 ou slate-600 pour les textes de lecture */
/* slate-500 (#64748b) sur blanc : ratio 4.8:1 ✅ WCAG AA */
/* slate-600 (#475569) sur blanc : ratio 7.0:1 ✅ WCAG AAA */
```

---

## 🟠 5. Animations Framer Motion sans respect de `prefers-reduced-motion`

**Fichiers** : Portfolio, Contact, Navigation — tous les composants avec `<motion.*>`  
**Problème** : Le CSS a bien un media query `prefers-reduced-motion: reduce` dans `index.css` (ligne 311-319), mais cela ne s'applique qu'aux animations CSS. **Les animations Framer Motion ne sont pas affectées** car elles utilisent JavaScript.

**Correction** :
```tsx
// Créer un hook commun
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// Utilisation
const reducedMotion = useReducedMotion();
<motion.div
  initial={reducedMotion ? false : { opacity: 0, y: 30 }}
  ...
/>
```

> **Note** : Framer Motion 12+ a `useReducedMotion()` intégré. L'utiliser directement.

---

## 🟠 6. Formulaire de contact : labels présents mais pas de `aria-required`

**Fichier** : `src/components/sections/Contact/ContactForm/index.tsx`  
**Problème** : Les champs obligatoires sont indiqués par `*` dans le label mais sans `aria-required="true"` sur les inputs. Les lecteurs d'écran ne savent pas quels champs sont obligatoires.

**Correction** :
```tsx
<input
  id="name"
  aria-required="true"
  aria-invalid={touched.name && errors.name ? 'true' : undefined}
  aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
  ...
/>
{touched.name && errors.name && (
  <span id="name-error" role="alert" className="contact-form__error-message">{errors.name}</span>
)}
```

---

## 🟡 7. Modal du Portfolio sans trap de focus

**Fichier** : `src/components/sections/Portfolio/ProjectModal/index.tsx`  
**Problème** : Quand le modal est ouvert, le focus n'est pas piégé dans le modal. L'utilisateur peut tabuler vers des éléments derrière le modal.

**Correction** :
```
1. Piéger le focus dans le modal quand il est ouvert
2. Restaurer le focus sur l'élément déclencheur quand il est fermé
3. Fermer le modal avec la touche Escape
4. Ajouter role="dialog" et aria-modal="true"
```

---

## 🟡 8. Le drawer mobile n'a pas de `role="dialog"`

**Fichier** : `src/components/layout/Navigation/index.tsx` ligne 164  
**Problème** : Le drawer de navigation mobile est un overlay avec backdrop mais sans `role="dialog"` ni `aria-modal`.

**Correction** :
```tsx
<motion.div
  className="nav__drawer"
  role="dialog"
  aria-modal="true"
  aria-label="Menu de navigation"
  ...
>
```

---

## 🟡 9. Icônes décoratives sans `aria-hidden`

**Problème** : De nombreuses icônes Lucide sont utilisées de manière purement décorative (badges, CTA icons, etc.) mais ne sont pas masquées des lecteurs d'écran.

**Exemple** :
```tsx
// Actuel
<Sparkles className="services__badge-icon" />

// Corrigé
<Sparkles className="services__badge-icon" aria-hidden="true" />
```

**Fichiers concernés** : Hero, Services, Portfolio, About, Contact, Footer — toutes les icônes décoratives.

---

## 🟡 10. Navigation logo `<a href="/">` avec `onClick preventDefault`

**Fichier** : `src/components/layout/Navigation/index.tsx` ligne 91  
**Problème** : Le logo utilise `<a href="/">` avec `preventDefault`, mais pour les lecteurs d'écran, le `href` indique un lien valide alors que le comportement réel est le scroll vers le Hero.

**Correction** :
```tsx
<a 
  href="/" 
  onClick={(e) => { e.preventDefault(); navigateToSection('hero-section'); }}
  className="nav__logo"
  aria-label="Sweet — Retour à l'accueil"
>
```

---

## 🟢 11. Pas de "skip to content" link

**Problème** : Il n'y a pas de lien "Aller au contenu principal" en haut de la page pour les utilisateurs de clavier/lecteur d'écran.

**Correction** :
```tsx
// Ajouter en tout premier élément du body dans PublicHome
<a href="#services" className="skip-link">
  Aller au contenu principal
</a>

// CSS
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 9999;
  padding: 1rem 2rem;
  background: var(--teal-500);
  color: white;
  font-weight: 600;
}
.skip-link:focus {
  top: 0;
}
```
