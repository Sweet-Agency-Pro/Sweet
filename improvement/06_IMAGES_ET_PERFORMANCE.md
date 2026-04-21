# 🖼️ Audit Images & Performance

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. Images `public/` en PNG non optimisées — Poids total : 4.4 Mo

| Fichier | Taille | Usage | Format recommandé |
|---------|--------|-------|-------------------|
| `attilio.png` | 2.77 Mo | Photo profil (non utilisée ?) | WebP, 400x400 → ~20 Ko |
| `preview.png` | 1.19 Mo | OG/Twitter share image | WebP, 1200x630 → ~80 Ko |
| `sweet_logo.png` | 501 Ko | Favicon + logo | SVG ou WebP, multi-tailles |

**Impact** : Le dossier `public/` fait 4.4 Mo de ressources statiques. Ces fichiers ne sont PAS traités par le plugin `vite-plugin-image-optimizer` car ils sont dans `public/` (copie brute).

**Correction** :
```bash
# Convertir en WebP avec sharp (déjà installé en devDependencies)
npx sharp-cli -i public/preview.png -o public/preview.webp --quality 85
npx sharp-cli -i public/sweet_logo.png -o public/sweet_logo.webp --quality 90

# Supprimer les fichiers PNG originaux après vérification
rm public/attilio.png  # Si non utilisé
```

---

## 🟠 2. `vite-plugin-image-optimizer` mal configuré

**Fichier** : `vite.config.ts` lignes 9-13  
**Problème** : Le plugin optimise les PNG, JPEG et WebP dans le build, mais :
1. Les images du portfolio sont chargées depuis **Supabase Storage** (URLs externes) → non optimisées
2. Les images dans `public/` ne sont pas optimisées par Vite (copie brute)
3. Pas de génération automatique de WebP pour les JPG/PNG

**Correction** :
```
1. Les images portfolio sont déjà en WebP dans Supabase (✅ bien fait)
2. Optimiser manuellement les images de public/ (voir point 1)
3. Ajouter la compression AVIF en plus de WebP :
```
```ts
ViteImageOptimizer({
  png: { quality: 85 },
  jpeg: { quality: 85 },
  webp: { quality: 85 },
  avif: { quality: 65 },  // Format plus performant que WebP
}),
```

---

## 🟠 3. Aucune image lazy-loadée sauf dans l'About

**Fichiers** : Tous les composants avec `<img>`  
**Problème** : Seule l'image team dans About a `loading="lazy"`. Toutes les autres images (Portfolio, ProjectDetail) sont chargées immédiatement.

**Endroits sans `loading="lazy"` :**
- `FlagshipCard/index.tsx` : image flagship
- `ConceptCard/index.tsx` : images concept
- `ProjectModal/index.tsx` : image modal
- `ProjectDetail/index.tsx` : images projet
- `AdminMedia.tsx` / `AdminProjects.tsx` : images admin

**Correction** :
```tsx
// Ajouter loading="lazy" sur toutes les images below the fold
<img 
  src={project.previewUrl}
  alt={`Aperçu du projet ${project.name}`}
  loading="lazy"
  decoding="async"
/>
```

---

## 🟠 4. Pas de `<picture>` avec fallback pour les images WebP

**Problème** : Les images du portfolio sont servies en WebP depuis Supabase mais sans élément `<picture>` pour fournir un fallback PNG/JPG aux navigateurs qui ne supportent pas WebP (rares mais existants).

**Correction** :
```tsx
<picture>
  <source srcSet={project.previewUrl} type="image/webp" />
  <img 
    src={project.previewUrl.replace('.webp', '.png')} 
    alt={`Aperçu du projet ${project.name}`}
    loading="lazy"
    width={800}
    height={450}
  />
</picture>
```

> Note : En 2026, le support WebP est quasi universel (98%+). Ce point est plus une best practice qu'un bug critique.

---

## 🟡 5. Pas de `srcset` ni `sizes` pour le responsive

**Problème** : Les images du portfolio sont toutes servies en une seule taille, quelle que soit la taille de l'écran. Sur mobile, une image de 1200px de large est chargée alors que l'écran fait 375px.

**Correction** :
```
1. Stocker dans Supabase des variantes : thumbnail (400px), medium (800px), large (1200px)
2. Utiliser srcset :
```
```tsx
<img
  src={`${project.previewUrl}?width=800`}
  srcSet={`
    ${project.previewUrl}?width=400 400w,
    ${project.previewUrl}?width=800 800w,
    ${project.previewUrl}?width=1200 1200w
  `}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="..."
  loading="lazy"
/>
```

---

## 🟡 6. Google Fonts chargées en double

**Fichiers** : `index.html` lignes 78-82 + `src/index.css` ligne 3  
**Problème** : La police Inter est chargée **deux fois** :
1. Via `<link>` dans `index.html` (Inter + Plus Jakarta Sans)
2. Via `@import` dans `index.css` (Inter uniquement)

De plus, `Plus Jakarta Sans` est chargée dans `index.html` mais **jamais utilisée dans aucun CSS** du projet.

**Correction** :
```
1. Supprimer la ligne 3 de index.css (@import Inter)
2. Vérifier si Plus Jakarta Sans est utilisé quelque part — sinon supprimer du <link>
3. Idéalement, self-host les polices pour éliminer les requêtes DNS externes
```

---

## 🟡 7. Animations CSS lourdes (blob-drift) sur mobile

**Fichier** : `src/index.css` lignes 152-170  
**Problème** : Les animations de blob (`blob-drift`, `gradient-shimmer`) tournent en permanence avec des `transform` + `scale` qui consomment du GPU. Sur mobile, ces effets peuvent causer des saccades et vider la batterie.

**Correction** :
```css
/* Désactiver les blobs animés sur mobile */
@media (max-width: 768px) {
  .hero__blob-1,
  .hero__blob-2,
  .hero__blob-3,
  .about__blob-1,
  .about__blob-2 {
    animation: none;
  }
}
```

---

## 🟢 8. Tailwind CSS installé mais pas utilisé correctement

**Fichier** : `tailwind.config.js`, `postcss.config.js`  
**Problème** : TailwindCSS est en devDependencies et configuré, mais le projet utilise du CSS vanilla pur avec des CSS Custom Properties. Tailwind n'est probablement pas purgé correctement et pourrait ajouter du poids au bundle.

**Correction** :
```
1. Vérifier si Tailwind est réellement utilisé quelque part dans les composants
2. Si non : supprimer tailwindcss, tailwind.config.js, et la référence dans postcss.config.js
3. Cela réduit le build time et élimine un outil non utilisé
```

---

## 🟢 9. Pas de format AVIF pour les images de preview

**Problème** : AVIF offre une compression ~30% supérieure à WebP pour la même qualité. Les images portfolio pourraient bénéficier d'un format AVIF en priorité.

**Correction** :
```
Stocker les previews en AVIF + WebP fallback dans Supabase
```
