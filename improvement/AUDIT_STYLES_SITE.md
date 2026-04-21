# Audit visuel complet du site

## Périmètre analysé

- Sources scannées: `src/**/*.{tsx,ts,css}`
- Composants React analysés: **50**
- Fichiers CSS analysés: **19**
- Boutons détectés: **58**
- Liens détectés: **27**
- Contrôles de formulaire détectés: **29**
- Noeuds texte (<p>/<span>) détectés: **212**
- Fichiers avec Framer Motion: **22**
- Fichiers avec styles inline: **27**

## Tokens et fondations style

- Palette principale: **teal / cyan / blue / purple / slate** (`src/styles/variables.css`, `src/styles/theme.ts`)
- Gradients globaux déclarés: **12** (`--gradient-*`)
- Keyframes globaux: **blob-drift, gradient-shimmer, float, pulse-glow, slide-up-fade, scale-in, gradient-bar-shift, spin, draw-line** (`src/index.css`)
- Typographie globale: **Inter** + fallback système (`src/index.css`)

## Inventaire des fichiers CSS (couleurs, gradients, animations)

| Fichier CSS | Gradients | Règles animation | Règles transition | Keyframes locales |
|---|---:|---:|---:|---|
| `src/components/admin/admin.css` | 0 | 0 | 1 | — |
| `src/components/layout/CookieConsent/CookieConsent.css` | 1 | 2 | 7 | — |
| `src/components/layout/Navigation/Navigation.css` | 3 | 1 | 10 | — |
| `src/components/pages/legal/Legal.css` | 2 | 0 | 0 | — |
| `src/components/pages/portfolio/ProjectDetail/ProjectDetail.css` | 8 | 4 | 14 | — |
| `src/components/pages/services/SiteVitrine/SiteVitrine.css` | 1 | 0 | 1 | — |
| `src/components/pages/services/shared/ServicePage.css` | 13 | 3 | 6 | — |
| `src/components/pages/services/shared/ServiceTabs/ServiceTabs.css` | 0 | 0 | 1 | — |
| `src/components/sections/About/About.css` | 6 | 8 | 5 | scroll-marquee |
| `src/components/sections/Contact/Contact.css` | 7 | 7 | 5 | — |
| `src/components/sections/Footer/Footer.css` | 3 | 3 | 5 | — |
| `src/components/sections/Hero/GlassCards/GlassCards.css` | 8 | 5 | 4 | — |
| `src/components/sections/Hero/Hero.css` | 1 | 6 | 6 | — |
| `src/components/sections/Portfolio/Portfolio.css` | 6 | 4 | 9 | — |
| `src/components/sections/ScrollAnimation/ScrollAnimation.css` | 2 | 3 | 0 | — |
| `src/components/sections/Services/Services.css` | 4 | 4 | 7 | — |
| `src/index.css` | 0 | 0 | 2 | blob-drift, gradient-shimmer, float, pulse-glow, slide-up-fade, scale-in, gradient-bar-shift, spin, draw-line |
| `src/styles/utilities.css` | 0 | 0 | 1 | — |
| `src/styles/variables.css` | 12 | 0 | 0 | — |

## Inventaire complet des composants (composants, boutons, textes)

| Composant | CSS importé | Boutons | Liens | Champs formulaire | Texte (p+span) | Titres | Motion | Inline style |
|---|---|---:|---:|---:|---:|---|---|---|
| `src/App.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Oui |
| `src/auth/AuthContext.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Non |
| `src/components/PublicHome.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Oui |
| `src/components/admin/AdminLayout.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Non |
| `src/components/admin/AdminSidebar.tsx` | — | 3 | 0 | 0 | 1 | — | Non | Non |
| `src/components/admin/AdminTopbar.tsx` | — | 1 | 0 | 0 | 2 | — | Non | Oui |
| `src/components/admin/Login.tsx` | — | 1 | 0 | 2 | 0 | — | Non | Oui |
| `src/components/admin/NotFound.tsx` | — | 0 | 1 | 0 | 0 | — | Non | Non |
| `src/components/admin/RequireAdmin.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Non |
| `src/components/admin/components/ProjectFormModal.tsx` | `../admin.css` | 10 | 0 | 12 | 2 | — | Non | Oui |
| `src/components/admin/components/ServiceFormModal.tsx` | `../admin.css` | 8 | 0 | 9 | 2 | — | Non | Oui |
| `src/components/admin/pages/AdminContacts.tsx` | `../admin.css` | 3 | 0 | 1 | 3 | — | Non | Oui |
| `src/components/admin/pages/AdminDashboard.tsx` | `../admin.css` | 1 | 0 | 0 | 1 | — | Non | Oui |
| `src/components/admin/pages/AdminMedia.tsx` | `../admin.css` | 2 | 1 | 0 | 2 | — | Non | Oui |
| `src/components/admin/pages/AdminProjects.tsx` | `../admin.css` | 4 | 0 | 0 | 6 | — | Non | Oui |
| `src/components/admin/pages/AdminServices.tsx` | `../admin.css` | 4 | 0 | 0 | 4 | — | Non | Oui |
| `src/components/layout/CookieConsent/index.tsx` | `./CookieConsent.css` | 6 | 4 | 0 | 9 | h2:2 | Oui | Oui |
| `src/components/layout/Navigation/index.tsx` | `./Navigation.css` | 4 | 1 | 0 | 5 | — | Oui | Non |
| `src/components/layout/SEO.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Non |
| `src/components/pages/legal/MentionsLegales.tsx` | `./Legal.css` | 0 | 1 | 0 | 13 | h1:1, h2:4 | Non | Non |
| `src/components/pages/legal/PolitiqueConfidentialite.tsx` | `./Legal.css` | 0 | 2 | 0 | 20 | h1:1, h2:8, h3:1 | Non | Oui |
| `src/components/pages/portfolio/ProjectDetail/TechIcons.tsx` | — | 0 | 0 | 0 | 0 | — | Non | Non |
| `src/components/pages/portfolio/ProjectDetail/index.tsx` | `./ProjectDetail.css` | 2 | 7 | 0 | 37 | h1:2, h2:5, h3:4 | Oui | Oui |
| `src/components/pages/services/Ecommerce/index.tsx` | `../shared/ServicePage.css` | 0 | 0 | 0 | 1 | — | Non | Non |
| `src/components/pages/services/PanneauDeGestion/index.tsx` | `../shared/ServicePage.css` | 0 | 0 | 0 | 1 | — | Non | Non |
| `src/components/pages/services/SiteVitrine/OfferingCards.tsx` | `./SiteVitrine.css` | 0 | 0 | 0 | 4 | h2:1, h3:1 | Oui | Non |
| `src/components/pages/services/SiteVitrine/index.tsx` | `../shared/ServicePage.css` | 0 | 0 | 0 | 1 | — | Non | Non |
| `src/components/pages/services/shared/ServiceBenefits.tsx` | — | 0 | 0 | 0 | 2 | h2:1, h3:1 | Oui | Non |
| `src/components/pages/services/shared/ServiceCtaBand.tsx` | `./ServicePage.css` | 0 | 0 | 0 | 2 | h2:1 | Oui | Oui |
| `src/components/pages/services/shared/ServiceFaq.tsx` | — | 1 | 0 | 0 | 4 | h2:1 | Oui | Non |
| `src/components/pages/services/shared/ServiceGuarantees.tsx` | `./ServicePage.css` | 0 | 0 | 0 | 2 | h2:1, h3:1 | Oui | Non |
| `src/components/pages/services/shared/ServiceHero.tsx` | `./ServicePage.css` | 0 | 0 | 0 | 1 | — | Oui | Oui |
| `src/components/pages/services/shared/ServiceIntro.tsx` | `./ServicePage.css` | 0 | 0 | 0 | 0 | — | Oui | Non |
| `src/components/pages/services/shared/ServiceProcess.tsx` | — | 0 | 0 | 0 | 3 | h2:1, h3:1 | Oui | Oui |
| `src/components/pages/services/shared/ServiceTabs/index.tsx` | `./ServiceTabs.css` | 1 | 0 | 0 | 1 | — | Oui | Oui |
| `src/components/sections/About/index.tsx` | `./About.css` | 0 | 2 | 0 | 13 | h2:2, h3:3 | Non | Oui |
| `src/components/sections/Contact/ContactForm/index.tsx` | — | 0 | 2 | 5 | 10 | — | Oui | Non |
| `src/components/sections/Contact/ContactInfo/index.tsx` | — | 0 | 1 | 0 | 2 | — | Oui | Oui |
| `src/components/sections/Contact/index.tsx` | `./Contact.css` | 0 | 0 | 0 | 3 | — | Oui | Non |
| `src/components/sections/Footer/index.tsx` | `./Footer.css` | 1 | 5 | 0 | 2 | h3:1, h4:2 | Non | Non |
| `src/components/sections/Hero/GlassCards/index.tsx` | `./GlassCards.css` | 0 | 0 | 0 | 16 | — | Non | Oui |
| `src/components/sections/Hero/index.tsx` | `./Hero.css` | 2 | 0 | 0 | 3 | h1:1 | Non | Non |
| `src/components/sections/Portfolio/ConceptCard/index.tsx` | — | 0 | 0 | 0 | 6 | — | Oui | Oui |
| `src/components/sections/Portfolio/FlagshipCard/index.tsx` | — | 1 | 0 | 0 | 6 | — | Oui | Oui |
| `src/components/sections/Portfolio/ProjectModal/index.tsx` | — | 1 | 0 | 0 | 11 | — | Oui | Oui |
| `src/components/sections/Portfolio/index.tsx` | `./Portfolio.css` | 0 | 0 | 0 | 4 | h2:1 | Oui | Non |
| `src/components/sections/ScrollAnimation/index.tsx` | `./ScrollAnimation.css` | 0 | 0 | 0 | 0 | — | Oui | Oui |
| `src/components/sections/Services/ServiceShowcase/index.tsx` | — | 1 | 0 | 0 | 2 | — | Oui | Oui |
| `src/components/sections/Services/index.tsx` | `./Services.css` | 1 | 0 | 0 | 5 | h2:1, h3:1 | Oui | Oui |
| `src/main.tsx` | `./index.css` | 0 | 0 | 0 | 0 | — | Non | Non |

## Détail ciblé des boutons

| Composant | Nb boutons | Classes boutons/CTA détectées |
|---|---:|---|
| `src/components/admin/AdminSidebar.tsx` | 3 | — |
| `src/components/admin/AdminTopbar.tsx` | 1 | — |
| `src/components/admin/Login.tsx` | 1 | — |
| `src/components/admin/components/ProjectFormModal.tsx` | 10 | `admin-btn`, `admin-btn--ghost`, `admin-btn--small`, `admin-image-delete-btn`, `admin-btn--primary` |
| `src/components/admin/components/ServiceFormModal.tsx` | 8 | `admin-btn`, `admin-btn--ghost`, `admin-btn--small`, `admin-btn--primary` |
| `src/components/admin/pages/AdminContacts.tsx` | 3 | `admin-btn`, `admin-btn--danger` |
| `src/components/admin/pages/AdminDashboard.tsx` | 1 | — |
| `src/components/admin/pages/AdminMedia.tsx` | 2 | `admin-btn`, `admin-btn--ghost`, `admin-btn--small`, `admin-btn--danger` |
| `src/components/admin/pages/AdminProjects.tsx` | 4 | `admin-btn`, `admin-btn--primary`, `admin-btn--ghost`, `admin-btn--small`, `admin-btn--danger` |
| `src/components/admin/pages/AdminServices.tsx` | 4 | `admin-btn`, `admin-btn--primary`, `admin-btn--ghost`, `admin-btn--small`, `admin-btn--danger` |
| `src/components/layout/CookieConsent/index.tsx` | 6 | `cookie-toggle__dot`, `cookie-modal__close`, `cookie-modal__actions-main`, `cookie-btn`, `cookie-btn--primary`, `cookie-btn--danger`, `cookie-btn--ghost`, `cookie-toggle`, `'cookie-toggle--active'`, `'cookie-toggle--disabled'` |
| `src/components/layout/Navigation/index.tsx` | 4 | `nav__drawer-close`, `nav__drawer-close-icon`, `nav__drawer-cta`, `nav__drawer-cta-button`, `nav__drawer-cta-text`, `nav__cta`, `'nav__cta--scrolled'` |
| `src/components/pages/portfolio/ProjectDetail/index.tsx` | 2 | `pd-hero__actions`, `pd-hero__cta`, `pd-hero__cta-bg`, `pd-hero__cta-content`, `pd-hero__cta-icon`, `pd-hero__cta-icon--external`, `pd-hero__cta--ghost`, `pd-hero__cta-icon--arrow`, `pd-preview__visit-cta`, `pd-related__card-cta`, `pd-cta-bottom`, `pd-cta-bottom__texture`, `pd-cta-bottom__container`, `pd-cta-bottom__title`, `pd-cta-bottom__text`, `pd-cta-bottom__btn`, `pd-cta-bottom__btn-bg`, `pd-cta-bottom__btn-content`, `pd-cta-bottom__icon` |
| `src/components/pages/services/shared/ServiceCtaBand.tsx` | 0 | `service-cta-bottom__texture`, `service-cta-bottom__container`, `service-cta-bottom__title`, `service-cta-bottom__text`, `service-cta-bottom__btn`, `service-cta-bottom__btn-bg`, `service-cta-bottom__btn-hover`, `service-cta-bottom__btn-content`, `service-cta-bottom`, `service-cta-bottom--${colorScheme}` |
| `src/components/pages/services/shared/ServiceFaq.tsx` | 1 | — |
| `src/components/pages/services/shared/ServiceHero.tsx` | 0 | `service-hero__top-actions`, `service-hero__cta`, `service-hero__cta-bg`, `service-hero__cta-hover`, `service-hero__cta-content`, `service-hero__cta-icon` |
| `src/components/pages/services/shared/ServiceTabs/index.tsx` | 1 | — |
| `src/components/sections/Contact/ContactForm/index.tsx` | 0 | `contact-form__submit-icon`, `contact-form__submit`, `'contact-form__submit--disabled'` |
| `src/components/sections/Footer/index.tsx` | 1 | `footer__cta-button` |
| `src/components/sections/Hero/index.tsx` | 2 | `hero__actions`, `hero__primary-btn`, `hero__primary-btn-bg`, `hero__primary-btn-hover`, `hero__primary-btn-content`, `hero__btn-icon`, `hero__secondary-btn` |
| `src/components/sections/Portfolio/ConceptCard/index.tsx` | 0 | `concept__cta`, `concept__cta-icon` |
| `src/components/sections/Portfolio/FlagshipCard/index.tsx` | 1 | `flagship__cta`, `flagship__cta-icon` |
| `src/components/sections/Portfolio/ProjectModal/index.tsx` | 1 | `modal-close`, `modal-close-icon`, `modal-cta`, `modal-cta-icon` |
| `src/components/sections/Services/ServiceShowcase/index.tsx` | 1 | `service-showcase__cta-wrapper`, `service-showcase__cta`, `service-showcase__cta-icon` |
| `src/components/sections/Services/index.tsx` | 1 | `services__cta-banner`, `services__cta-content`, `services__cta-title`, `services__cta-description`, `services__cta-button`, `services__cta-button-bg`, `services__cta-button-hover`, `services__cta-button-content`, `services__cta-button-icon` |

## Détail ciblé de la hiérarchie texte

| Composant | Titres | Paragraphes | Spans |
|---|---|---:|---:|
| `src/components/admin/AdminSidebar.tsx` | — | 0 | 1 |
| `src/components/admin/AdminTopbar.tsx` | — | 0 | 2 |
| `src/components/admin/components/ProjectFormModal.tsx` | — | 0 | 2 |
| `src/components/admin/components/ServiceFormModal.tsx` | — | 0 | 2 |
| `src/components/admin/pages/AdminContacts.tsx` | — | 0 | 3 |
| `src/components/admin/pages/AdminDashboard.tsx` | — | 1 | 0 |
| `src/components/admin/pages/AdminMedia.tsx` | — | 1 | 1 |
| `src/components/admin/pages/AdminProjects.tsx` | — | 0 | 6 |
| `src/components/admin/pages/AdminServices.tsx` | — | 0 | 4 |
| `src/components/layout/CookieConsent/index.tsx` | h2:2 | 2 | 7 |
| `src/components/layout/Navigation/index.tsx` | — | 2 | 3 |
| `src/components/pages/legal/MentionsLegales.tsx` | h1:1, h2:4 | 9 | 4 |
| `src/components/pages/legal/PolitiqueConfidentialite.tsx` | h1:1, h2:8, h3:1 | 17 | 3 |
| `src/components/pages/portfolio/ProjectDetail/index.tsx` | h1:2, h2:5, h3:4 | 14 | 23 |
| `src/components/pages/services/Ecommerce/index.tsx` | — | 0 | 1 |
| `src/components/pages/services/PanneauDeGestion/index.tsx` | — | 0 | 1 |
| `src/components/pages/services/SiteVitrine/OfferingCards.tsx` | h2:1, h3:1 | 3 | 1 |
| `src/components/pages/services/SiteVitrine/index.tsx` | — | 0 | 1 |
| `src/components/pages/services/shared/ServiceBenefits.tsx` | h2:1, h3:1 | 2 | 0 |
| `src/components/pages/services/shared/ServiceCtaBand.tsx` | h2:1 | 1 | 1 |
| `src/components/pages/services/shared/ServiceFaq.tsx` | h2:1 | 2 | 2 |
| `src/components/pages/services/shared/ServiceGuarantees.tsx` | h2:1, h3:1 | 2 | 0 |
| `src/components/pages/services/shared/ServiceHero.tsx` | — | 0 | 1 |
| `src/components/pages/services/shared/ServiceProcess.tsx` | h2:1, h3:1 | 3 | 0 |
| `src/components/pages/services/shared/ServiceTabs/index.tsx` | — | 0 | 1 |
| `src/components/sections/About/index.tsx` | h2:2, h3:3 | 6 | 7 |
| `src/components/sections/Contact/ContactForm/index.tsx` | — | 1 | 9 |
| `src/components/sections/Contact/ContactInfo/index.tsx` | — | 0 | 2 |
| `src/components/sections/Contact/index.tsx` | — | 1 | 2 |
| `src/components/sections/Footer/index.tsx` | h3:1, h4:2 | 2 | 0 |
| `src/components/sections/Hero/GlassCards/index.tsx` | — | 0 | 16 |
| `src/components/sections/Hero/index.tsx` | h1:1 | 1 | 2 |
| `src/components/sections/Portfolio/ConceptCard/index.tsx` | — | 0 | 6 |
| `src/components/sections/Portfolio/FlagshipCard/index.tsx` | — | 0 | 6 |
| `src/components/sections/Portfolio/ProjectModal/index.tsx` | — | 1 | 10 |
| `src/components/sections/Portfolio/index.tsx` | h2:1 | 1 | 3 |
| `src/components/sections/Services/ServiceShowcase/index.tsx` | — | 1 | 1 |
| `src/components/sections/Services/index.tsx` | h2:1, h3:1 | 2 | 3 |

## Rendus visuels actuellement présents sur le site

1. **Gradient premium sombre**: sections Hero / CTA avec fond sombre (`--gradient-hero-bg`), blobs flous, texte blanc et accents teal/cyan.
2. **Glassmorphism**: navigation, cookie modal, certaines cartes/services/admin (`backdrop-filter`, `rgba(...)`, bordures translucides).
3. **Surface claire éditoriale**: blocs blancs/slate très lisibles avec textures pointillées (`radial-gradient(... 1px ...)`) et cartes à bordures douces.
4. **CTA dégradés animés**: boutons principaux avec shimmer (`gradient-shimmer`) + hover en double couche (`*-bg` / `*-hover`).
5. **Accent dynamique par page/service/projet**: variantes teal/purple/blue pour services + accent custom dans portfolio (project colors).
6. **Mode admin distinct**: UI utilitaire sombre/translucide, boutons primary/danger/ghost et densité d'interface plus forte.
7. **Animations d'ambiance omniprésentes**: blob-drift, pulse-glow, float, slide-up-fade, gradient-bar-shift selon sections.

## Écarts importants à harmoniser (base de décision)

1. **Couleurs hardcodées hors tokens**: présence de couleurs directes dans plusieurs composants (portfolio dots, états erreurs/succès, LinkedIn, etc.) en plus des variables globales.
2. **Styles inline fréquents**: 27 fichiers utilisent du style inline, ce qui fragmente la cohérence des couleurs et animations.
3. **Multiples signatures visuelles concurrentes**: sombre glass + clair éditorial + admin utilitaire + accents projet personnalisés.
4. **Animations nombreuses**: cohérence globale correcte mais intensité variable selon les sections (certaines très animées, d'autres plus statiques).

## Fichiers source clés pour uniformiser ensuite

- `src/styles/variables.css` (tokens CSS globaux)
- `src/styles/theme.ts` (tokens TS + helpers)
- `src/index.css` (font globale + keyframes globales)
- `src/components/pages/services/shared/ServicePage.css` (gros noyau de patterns CTA/hero/gradient)
- `src/components/sections/Hero/Hero.css`, `src/components/sections/Portfolio/Portfolio.css`, `src/components/sections/Contact/Contact.css` (sections visuelles majeures)
- `src/components/admin/admin.css` (système admin séparé)
