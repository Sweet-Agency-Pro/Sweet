# ✍️ Audit Copywriting & Arguments de Vente

## Sévérité : 🔴 Critique | 🟠 Majeur | 🟡 Moyen | 🟢 Mineur

---

## 🔴 1. "En tant que nouvelle agence" — L'aveu de faiblesse le plus coûteux

**Fichier** : `src/components/sections/About/index.tsx` lignes 94-98  
**Texte actuel** :
> « Notre approche combine expertise technique de pointe et créativité pour créer des solutions web qui dépassent les attentes. **En tant que nouvelle agence**, nous apportons un regard frais et innovant sur le développement web, tout en nous appuyant sur les meilleures pratiques du secteur. »

**Problème** : Cette phrase **détruit la crédibilité** en une seule lecture. Un prospect qui compare des agences ne va PAS choisir celle qui se présente comme "nouvelle". Cela sous-entend :
- Moins d'expérience
- Risque pour le client
- Manque de références

**Correction recommandée** :
```
« Notre approche combine expertise technique de pointe et créativité pour
créer des solutions web qui dépassent les attentes. Notre vision ? Allier
les meilleures pratiques du secteur à une approche résolument moderne,
centrée sur l'impact et la performance. Chaque projet bénéficie d'un
suivi personnalisé et d'une exigence technique sans compromis. »
```

---

## 🔴 2. "Fondée en 2026" — Date qui ancre le manque de track record

**Fichier** : `src/components/sections/About/index.tsx` ligne 89  
**Texte actuel** :
> « Fondée en 2026 par Maël KEMPF--LE PAPE et Attilio JAEGER, Sweet est née de notre passion commune pour l'innovation numérique... »

**Problème** : Mentionner une date de fondation récente est uniquement utile pour les entreprises avec un historique valorisant. Pour une agence de 2026, cela rappelle au prospect que vous avez moins d'un an d'existence.

**Correction** :
```
« Sweet est née de la vision commune de Maël KEMPF--LE PAPE et Attilio JAEGER :
rendre le web plus accessible, plus performant et plus beau. Notre mission est
de créer votre présence numérique et de vous accompagner dans votre développement,
avec une approche qui place vos objectifs au centre de chaque décision. »
```
> Supprimer "2026" et toute référence à l'ancienneté.

---

## 🟠 3. Rôles des fondateurs trop "corporate" et pas assez distinctifs

**Fichier** : `src/components/sections/About/index.tsx` lignes 41-62  
**Problème** : Les deux fondateurs ont le même rôle "**Co-fondateur**" avec des bio trop similaires et génériques. Un visiteur ne peut pas distinguer qui fait quoi.

**Correction** :
```tsx
// Maël
role: 'Co-fondateur & CTO',
bio: 'Architecte logiciel et expert des infrastructures cloud, 
Maël conçoit des solutions robustes qui tiennent la charge. 
Il pilote la stratégie technique et l\'innovation de chaque projet.'

// Attilio
role: 'Co-fondateur & Directeur Créatif',
bio: 'Designer et développeur front-end, Attilio transforme les concepts 
en interfaces qui marquent les esprits. Il s\'assure que chaque pixel 
sert l\'expérience utilisateur et la conversion.'
```

---

## 🟠 4. Absence de preuve sociale et de crédibilité

**Problème global** : Le site ne contient aucun :
- Témoignage client
- Logo de marques partenaires
- Chiffre concret (sauf le `+40%` de Translatix)
- Certification / formation
- Avis Google

**Impact** : Sans preuve sociale, le visiteur ne peut pas évaluer la crédibilité de l'agence. C'est le facteur #1 de conversion pour une agence web.

**Correction** :
```
1. Ajouter une section "Ils nous font confiance" avec les logos clients
2. Ajouter 2-3 témoignages avec nom, entreprise, photo
3. Ajouter les métriques clés : nombre de projets livrés, taux de satisfaction, etc.
4. Intégrer un widget Avis Google si pertinent
```

---

## 🟠 5. "Nous rendons le web plus simple, plus beau, plus Sweet" — Tagline floue

**Fichier** : `src/components/sections/Hero/index.tsx` lignes 41-43  
**Texte actuel** :
> « Derrière chaque interface élégante se cache une technologie solide. Nous rendons le web plus simple, plus beau, plus Sweet. »

**Problème** : "Plus Sweet" est un jeu de mots sympathique mais pas impactant pour le SEO ni la conversion. La description ne parle pas au prospect de SES problèmes.

**Correction** :
```
« Derrière chaque interface élégante se cache une technologie solide.
Nous concevons des sites web qui convertissent vos visiteurs en clients. »
```
> Ou une version plus audacieuse :
```
« Un site beau, c'est bien. Un site qui vend, c'est mieux.
Nous faisons les deux. »
```

---

## 🟠 6. "Découvrez nos 3 piliers d'excellence" — Jargon corporate

**Fichier** : `src/components/sections/Services/index.tsx` ligne 72  
**Texte actuel** :
> « Découvrez nos 3 piliers d'excellence pour construire et piloter votre écosystème digital. »

**Problème** : "Piliers d'excellence" et "écosystème digital" sont des expressions vides que chaque agence utilise. Ça ne dit rien de concret au prospect.

**Correction** :
```
« Trois services, une seule promesse : un site qui travaille pour vous. »
```

---

## 🟡 7. Hero description dans PublicHome ne correspond pas à Hero.tsx

**Fichier** : `src/components/PublicHome.tsx` ligne 134  
**Problème** : La meta description dans le composant `<SEO>` est différente de la description du Hero :
- SEO: "Agence Sweet - Création de sites internet, e-commerce et solutions sur mesure..."
- Hero: "Derrière chaque interface élégante se cache une technologie solide..."
- index.html: "Boostez votre présence en ligne..."

Il y a **3 descriptions différentes** pour la même page. Google peut choisir n'importe laquelle.

**Correction** :
```
Unifier la meta description partout avec un seul message fort :
"Agence Sweet — Nous concevons des sites web sur mesure (vitrine, e-commerce)
qui convertissent vos visiteurs en clients. Design unique, SEO optimisé, code performant."
```

---

## 🟡 8. "Prêt à transformer votre présence numérique ?" — CTA générique

**Fichier** : `src/components/sections/Services/index.tsx` lignes 85-89  
**Problème** : Les CTA de la page utilisent des formules vues partout :
- "Prêt à transformer votre présence numérique ?"
- "Parlons ensemble de comment nos solutions peuvent propulser votre activité vers l'avant."

**Correction** :
```
« Votre prochain client vous cherche en ce moment. Est-ce qu'il vous trouve ? »
« Discutons de votre projet — premier échange offert, sans engagement. »
```

---

## 🟡 9. Titre Contact "Donnons vie à votre vision" — Trop naïf

**Fichier** : `src/components/sections/Contact/index.tsx` lignes 41-42  
**Problème** : "Donnons vie à votre vision" sonne comme une agence junior qui essaie d'impressionner.

**Correction** :
```
« Parlons de votre projet »
ou
« Un projet en tête ? Échangeons. »
```
> Simple, direct, professionnel.

---

## 🟡 10. "Contactez-nous et commençons cette aventure ensemble" — Trop émotionnel

**Fichier** : `src/components/sections/Contact/index.tsx` lignes 52-53  
**Problème** : "Aventure" implique l'incertitude et le risque — l'exact opposé de ce qu'un prospect d'agence web recherche.

**Correction** :
```
« Remplissez le formulaire ci-dessous ou contactez-nous directement.
Notre équipe vous répond sous 24 heures. »
```

---

## 🟢 11. "Nous répondons généralement sous 24 heures" — Bien mais à renforcer

**Fichier** : `src/components/sections/Contact/index.tsx` lignes 69-72  
**Ce qui est bien** : Le délai de réponse est affiché.  
**Amélioration** :
```
« Réponse garantie sous 24 heures ouvrées.
Vos données sont protégées et ne seront jamais cédées à des tiers (RGPD). »
```

---

## 🟢 12. Technologies listées sans hiérarchie de pertinence

**Fichier** : `src/components/sections/About/index.tsx` lignes 30-39  
**Problème** : Le marquee de technologies mélange des langages de base (HTML, CSS) avec des frameworks avancés (Next.js, Flutter). Lister HTML/CSS nuit à la perception d'expertise.

**Correction** :
```
Retirer les technologies basiques (HTML, CSS, JavaScript) — tout dev les maîtrise.
Garder uniquement les technologies à forte valeur perçue :
TypeScript, React, Next.js, Vue.js, React Native, Flutter, 
Node.js, PostgreSQL, Supabase, Firebase
```
