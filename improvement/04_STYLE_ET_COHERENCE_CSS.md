# 🎨 Audit Style, Cohérence & Incohérences CSS

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. Double système de design non unifié (theme.ts vs variables.css)

**Fichiers** : `src/styles/theme.ts` + `src/styles/variables.css`  
**Problème** : Le projet maintient **deux sources de vérité** pour le design system :
- `theme.ts` : Export JS/TS avec `colors`, `spacing`, `typography`, etc.
- `variables.css` : CSS Custom Properties avec les mêmes valeurs

Les composants utilisent tantôt l'un, tantôt l'autre :
- `services.data.ts` importe `theme.ts` directement
- Les fichiers CSS utilisent `var(--teal-500)` depuis `variables.css`
- `commonStyles` dans `theme.ts` est un duplicat de `utilities.css`

**Impact** : Si une couleur est changée dans l'un et pas dans l'autre, incohérence visuelle.

**Correction** :
```
1. Choisir UNE seule source de vérité — les CSS Custom Properties (variables.css)
2. Supprimer les doublons dans theme.ts
3. Dans les composants JS, lire les valeurs via getComputedStyle() si nécessaire
   OU garder theme.ts uniquement pour les valeurs utilisées en JS pur
   (ex: Framer Motion, couleurs dynamiques Supabase)
```

---

## 🟠 2. Couleurs hardcodées dans les fichiers CSS (pas de variables)

**Fichiers concernés** :
| Fichier | Couleur hardcodée | Variable à utiliser |
|---------|------------------|-------------------|
| `Hero/GlassCards/GlassCards.css:180` | `#fde047` (jaune) | Créer `--yellow-300` |
| `Hero/GlassCards/GlassCards.css:184` | `#4ade80` (vert) | Créer `--green-400` |
| `About/About.css:586-587` | `#0A66C2` (LinkedIn blue) | Créer `--linkedin-blue` |
| `Portfolio/Portfolio.css:214-215` | `#fecaca`, `#991b1b` | Créer `--error-100`, `--error-700` |
| `Contact/Contact.css:441,447` | `#ef4444` | Utiliser `var(--error-500)` |
| `Contact/Contact.css:549,555` | `#22c55e`, `#86efac` | Créer `--success-500`, `--success-300` |

**Correction** :
```css
/* Ajouter dans variables.css */
--error-100: #fecaca;
--error-300: #fca5a5;
--error-500: #ef4444;
--error-700: #991b1b;
--success-300: #86efac;
--success-500: #22c55e;
--yellow-300: #fde047;
--green-400: #4ade80;
--linkedin-blue: #0A66C2;
```

---

## 🟠 3. `index.css` contient un duplicata de `html` selector

**Fichier** : `src/index.css` lignes 21-26 et 69-72  
**Problème** : Le sélecteur `html` est défini **deux fois** :
```css
/* Ligne 21 */
html {
  font-size: var(--base-font-size);
  scroll-behavior: smooth;
  ...
}

/* Ligne 69 */
html {
  overflow-x: hidden;
}
```

**Correction** : Fusionner en un seul bloc `html`.

---

## 🟠 4. Mélange de classes CSS BEM et classes génériques

**Problème** : Le projet utilise **3 conventions de nommage différentes** :
- BEM strict : `hero__title-gradient`, `services__cta-button-bg`
- Camel case CSS : pas vraiment
- Classes génériques : `flex-center`, `container`, `glass-effect`
- Classes de révélation : `reveal`, `reveal--visible`, `reveal-stagger`

C'est globalement bon avec BEM dominant, mais les classes utilitaires (`flex-center`, `container`, etc.) dans `utilities.css` ne sont quasiment jamais utilisées dans le code.

**Correction** :
```
1. Auditer l'usage réel des classes de utilities.css
2. Supprimer les classes utilitaires non utilisées
3. Documenter la convention de nommage dans un README
```

---

## 🟠 5. `theme.ts` contient un commentaire obsolète "STRATA"

**Fichier** : `src/styles/theme.ts` lignes 140-141  
**Problème** :
```ts
hero: '12rem',      // 192px (for STRATA logo)
heroLg: '16rem',    // 256px (for STRATA logo on large screens)
```
"STRATA" est un ancien nom de projet. C'est un reliquat non nettoyé.

**Correction** : Remplacer par `// for Sweet logo` ou `// for hero section`.

---

## 🟡 6. Gradients incohérents entre CSS et JS

**Problème** : Les gradients sont définis en CSS avec `linear-gradient(90deg, ...)` et en JS avec `linear-gradient(to right, ...)`. Les deux sont identiques (90deg = to right) mais le mélange de syntaxes est confus.

**CSS (variables.css)** :
```css
--gradient-primary: linear-gradient(90deg, #14b8a6, #06b6d4, #3b82f6, #14b8a6);
```

**JS (theme.ts)** :
```ts
primary: `linear-gradient(to right, ${colors.teal[500]}, ${colors.cyan[500]}, ${colors.blue[500]})`,
```

**Différence** : La version CSS est un gradient en **boucle** (4 stops avec retour au départ), la version JS ne l'est pas (3 stops). Ce sont des gradients **différents** malgré le même nom "primary".

**Correction** : Harmoniser les stops et la syntaxe entre CSS et JS.

---

## 🟡 7. Inline styles excessifs dans certains composants

**Fichier** : `src/components/sections/About/index.tsx` lignes 142-144  
```tsx
<Users className="about__badge-icon" style={{ color: 'var(--blue-500)' }} />
<span className="about__badge-text" style={{ color: 'var(--blue-700)' }}>
```

**Problème** : Des styles inline ponctuels qui devraient être des classes CSS (ex: `about__badge-icon--blue`). Cela rend le design system incohérent et les styles plus difficiles à maintenir.

**Correction** : Créer des variantes CSS :
```css
.about__badge-icon--blue { color: var(--blue-500); }
.about__badge-text--blue { color: var(--blue-700); }
```

---

## 🟡 8. `Loader` dans App.tsx utilise des styles inline hardcodés

**Fichier** : `src/App.tsx` lignes 79-97  
**Problème** : Le composant `Loader` utilise des styles inline avec des couleurs hardcodées (`#0f172a`, `#14b8a6`) au lieu d'utiliser les variables CSS.

**Correction** :
```tsx
// Utiliser les variables CSS
backgroundColor: 'var(--slate-900)',
border: '3px solid var(--teal-100)',
borderTopColor: 'var(--teal-500)',
```

---

## 🟡 9. `Suspense fallback` dans PublicHome avec styles inline

**Fichier** : `src/components/PublicHome.tsx` ligne 140  
```tsx
<Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'transparent' }} />}>
```

**Problème** : Le fallback est un div vide transparent de 400px. Cela crée un saut de contenu (CLS - Cumulative Layout Shift) quand les composants lazy-loadés se chargent.

**Correction** :
```
1. Créer un skeleton de chargement qui imite la structure des sections à venir
2. Ou utiliser une hauteur qui correspond au contenu final
3. Ajouter une transition d'apparition pour masquer le saut
```

---

## 🟢 10. Variables CSS pour les breakpoints jamais utilisées en CSS

**Fichier** : `src/styles/variables.css` lignes 241-248  
**Problème** : Les variables `--bp-sm`, `--bp-md`, etc. sont définies mais CSS ne permet pas d'utiliser des custom properties dans les `@media` queries :
```css
@media (min-width: var(--bp-lg)) { /* NE FONCTIONNE PAS */ }
```

Ces variables sont purement documentaires et jamais utilisées fonctionnellement.

**Correction** :
```
1. Supprimer les variables de breakpoints du CSS
2. Documenter les breakpoints dans un commentaire
3. Garder uniquement dans theme.ts pour référence JS
```

---

## 🟢 11. Scrollbar styling webkit-only

**Fichier** : `src/index.css` lignes 131-145  
**Problème** : Le styling de scrollbar n'utilise que les pseudo-éléments webkit. Firefox utilise `scrollbar-width` et `scrollbar-color`.

**Correction** :
```css
/* Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: var(--slate-800) var(--slate-100);
}
```
