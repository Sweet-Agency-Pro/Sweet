# 📐 Audit Mise en Page & UX

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🟠 1. Photos d'équipe absentes (initiales à la place)

**Fichier** : `src/components/sections/About/index.tsx` lignes 43-61  
**Problème** : Les deux co-fondateurs n'ont pas de photo (`imageUrl: ''`). À la place, des initiales ("MK", "AJ") sont affichées. Pour une agence web qui vend du design et de la crédibilité, ne pas montrer les visages des fondateurs est une **erreur de confiance grave**.

**Impact** : 
- Les visiteurs veulent voir des visages humains derrière une prestation de service
- Les initiales font "placeholder non terminé"
- L'image `attilio.png` est dans `public/` mais non utilisée

**Correction** :
```
1. Prendre des photos professionnelles (headshots sur fond neutre)
2. Les redimensionner à 400x400 et convertir en WebP (< 30 Ko chacune)
3. Mettre à jour imageUrl pour chaque membre
4. Supprimer attilio.png de public/ (2.77 Mo non utilisé)
```

---

## 🟠 2. Section "Notre Histoire" beaucoup trop longue

**Fichier** : `src/components/sections/About/index.tsx` lignes 88-98  
**Problème** : Deux paragraphes denses de texte qui parlent plus de l'agence que du bénéfice client. Le visiteur scanne, il ne lit pas des blocs de texte.

**Correction** :
```
1. Réduire à 2-3 lignes maximum
2. Utiliser des puces ou des chiffres pour rythmer
3. Parler du bénéfice client, pas de l'agence :
   "Nous transformons vos idées en sites web qui convertissent.
    Notre expertise : allier design impactant et code haute performance."
```

---

## 🟠 3. Section Contact : Adresse "Strasbourg" vs Mentions Légales "Wasselonne"

**Fichier** : `src/components/sections/Contact/ContactInfo/index.tsx` ligne 80  
vs `src/components/pages/legal/MentionsLegales.tsx` ligne 120  

**Problème** : 
- ContactInfo affiche : `Strasbourg, France`
- Mentions Légales affiche : `21 rue du 23 Novembre, 67310, Wasselonne, France`
- JSON-LD dans index.html : `Wasselonne`

**Incohérence** : Strasbourg et Wasselonne sont deux villes différentes (~30 km). Cela crée de la confusion et peut nuire au référencement local.

**Correction** :
```
Option 1 : "Strasbourg Métropole, France" (si Wasselonne est dans la métropole)
Option 2 : "Wasselonne, Alsace" (exact et cohérent avec les mentions légales)
Option 3 : "Région Strasbourg, France" (compromis géographique)
```

---

## 🟠 4. Page 404 : NotFound est dans `/admin/` au lieu d'être global

**Fichier** : `src/components/admin/NotFound.tsx`  
**Problème** : Le composant 404 est dans le dossier `admin/`. Il est utilisé pour la route `*` (catch-all) mais son design et sa localisation correspondent à l'admin plutôt qu'au public.

**Correction** :
```
1. Déplacer NotFound dans src/components/pages/ ou src/components/layout/
2. Créer une page 404 publique avec le design du site (pas de l'admin)
3. Inclure un bouton "Retour à l'accueil" et les liens principaux
4. Ajouter le composant SEO avec noindex
```

---

## 🟡 5. `window.scrollTo(0, 0)` dans chaque page de service

**Fichiers** : `SiteVitrine/index.tsx`, `Ecommerce/index.tsx`, `PanneauDeGestion/index.tsx`, `MentionsLegales.tsx`  
**Problème** : Chaque page de service et légale a un `useEffect(() => window.scrollTo(0, 0), [])`. C'est de la duplication. De plus, `MentionsLegales` utilise `behavior: 'smooth'` ce qui crée un scroll visible, alors que les autres font un saut instantané.

**Correction** :
```
1. Créer un composant ou hook ScrollToTop global :
```
```tsx
// hooks/useScrollToTop.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
```
```
2. L'ajouter une seule fois dans App.tsx
3. Supprimer les useEffect de scroll dans chaque page
```

---

## 🟡 6. Navigation mobile drawer : pas de swipe pour fermer

**Problème** : Le drawer de navigation mobile ne peut être fermé que par le bouton X ou le backdrop. Un geste de swipe vers la droite serait plus naturel sur mobile.

**Correction** :
```
Implémenter un drag dismiss avec Framer Motion :
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(_, info) => {
    if (info.offset.x > 100) setIsMenuOpen(false);
  }}
>
```

---

## 🟡 7. Footer identique sur toutes les pages mais avec `colorScheme` inutile

**Fichier** : `src/components/sections/Footer/index.tsx`  
**Problème** : Le Footer accepte un `colorScheme` prop ('teal' | 'purple' | 'blue') mais ce prop ne semble affecter que quelques détails visuels via des classes CSS. Sur la page d'accueil, il est utilisé sans colorScheme (default).

**Question** : Est-ce que le Footer change réellement d'apparence entre les pages ? Si oui, c'est cohérent. Sinon, simplifier en supprimant le prop.

---

## 🟡 8. Pas de breadcrumb visuel sur les pages de service

**Problème** : Les pages de service ont un JSON-LD BreadcrumbList mais aucun breadcrumb affiché visuellement. Un breadcrumb visible aide la navigation et le SEO.

**Correction** :
```tsx
<nav aria-label="Fil d'Ariane" className="breadcrumb">
  <a href="/">Accueil</a>
  <span className="breadcrumb__separator">›</span>
  <a href="/#services">Services</a>
  <span className="breadcrumb__separator">›</span>
  <span className="breadcrumb__current">Site Vitrine</span>
</nav>
```

---

## 🟡 9. Formulaire de contact sans protection anti-spam

**Fichier** : `src/components/sections/Contact/ContactForm/index.tsx`  
**Problème** : Le formulaire n'a aucune protection anti-spam :
- Pas de captcha (reCAPTCHA, hCaptcha, Turnstile)
- Pas de honeypot
- Pas de rate limiting
- La clé Web3Forms est exposée

**Correction minimale** (honeypot) :
```tsx
// Ajouter un champ invisible que les bots remplissent
<input 
  type="text" 
  name="website" 
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  style={{ position: 'absolute', left: '-9999px' }}
  tabIndex={-1}
  autoComplete="off"
/>

// Dans handleSubmit :
if (honeypot) return; // Bot détecté
```

---

## 🟢 10. Les liens du footer Contact ne sont pas des `<a>` avec href correct

**Fichier** : `src/components/sections/Footer/index.tsx` lignes 66-67  
**Ce qui est bien** : Les liens `mailto:` et `tel:` sont présents.  
**Amélioration** : Ajouter des `aria-label` descriptifs :
```tsx
<a href="mailto:contact@agence-sweet.com" aria-label="Envoyer un email à Agence Sweet">
```

---

## 🟢 11. Pas de page "Services" globale (hub)

**Problème** : Il existe 3 pages de service individuelles (/services/site-vitrine, etc.) mais aucune page `/services` qui les liste toutes. Ce hub serait bénéfique pour le SEO (page parent → pages enfants) et la navigation.

**Correction** :
```
Créer une page /services qui présente les 3 services avec des liens vers
les pages détaillées. Structure SEO :
  Accueil → Services → Site Vitrine
                      → E-commerce
                      → Panneau de Gestion
```
