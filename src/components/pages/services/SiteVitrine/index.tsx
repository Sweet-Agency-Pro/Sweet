/**
 * Site Vitrine — Service Detail Page
 *
 * Layout:
 *   1. ServiceHero   (shared) — dark hero with badge, title, CTA
 *   2. ServiceIntro  (shared) — white centered paragraph
 *   3. OfferingCards (custom) — One-Page vs Multi-Pages
 *   4. Guarantees    (shared) — 3-column cards on light-gray
 *   5. CtaBand       (shared) — dark CTA before footer
 *   6. Footer        (shared) — from sections/Footer
 */

import { useEffect } from 'react';
import { Globe, Paintbrush, Search, Zap } from 'lucide-react';

import ServiceHero from '../shared/ServiceHero';
import ServiceIntro from '../shared/ServiceIntro';
import ServiceGuarantees from '../shared/ServiceGuarantees';
import ServiceCtaBand from '../shared/ServiceCtaBand';
import OfferingCards from './OfferingCards';
import Footer from '../../../sections/Footer';
import { sharedStyles as s } from '../shared/ServicePage.styles';
import type { Guarantee } from '../shared/ServiceGuarantees';

// =============================================================================
// DATA
// =============================================================================
const guarantees: Guarantee[] = [
  {
    icon: Paintbrush,
    title: 'Design Personnalisé',
    text: 'Une identité visuelle unique qui vous démarque, loin des modèles standards.',
  },
  {
    icon: Search,
    title: 'Optimisation SEO',
    text: 'Des fondations techniques saines pour plaire aux moteurs de recherche.',
  },
  {
    icon: Zap,
    title: 'Performance Garantie',
    text: 'Un code optimisé pour un affichage ultra-rapide sur mobile et ordinateur.',
  },
];

// =============================================================================
// COMPONENT
// =============================================================================
function SiteVitrine() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Site Vitrine — Agence Sweet';
  }, []);

  return (
    <div style={s.page}>
      <ServiceHero
        badgeIcon={Globe}
        badgeLabel="Site Vitrine"
        title={
          <>
            Site{' '}
            <span style={s.heroTitleGradient}>Vitrine</span>
          </>
        }
        subtitle="Une présentation sur mesure, adaptée à la densité de votre contenu."
        ctaLabel="Démarrer votre projet"
      />

      <ServiceIntro
        title="Le pilier de votre identité numérique"
        text="Le site vitrine est le point d'ancrage de votre communication. Nous ne nous contentons pas de créer une page, nous adaptons sa structure selon vos objectifs. Quelle que soit la structure choisie, vous bénéficiez d'un design unique et d'une performance technique optimale."
      />

      <OfferingCards />

      <ServiceGuarantees
        title="Ce qui est inclus, dans tous les cas"
        subtitle="Une qualité technique irréprochable, quel que soit votre choix."
        items={guarantees}
      />

      <ServiceCtaBand
        title="Prêt à donner vie à votre vitrine?"
        text="Échangeons sur vos objectifs et construisons ensemble le site qui vous ressemble."
        ctaLabel="Discutons de votre projet"
      />

      <Footer />
    </div>
  );
}

export default SiteVitrine;
