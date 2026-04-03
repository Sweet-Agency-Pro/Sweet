/**
 * Site Vitrine, Service Detail Page (Enhanced)
 * Full conversion-focused page with Benefits, Process, FAQ
 */

import { useEffect } from 'react';
import { Paintbrush, Search, Zap, TrendingUp, Users } from 'lucide-react';

import ServiceHero from '../shared/ServiceHero';
import ServiceIntro from '../shared/ServiceIntro';
import ServiceBenefits from '../shared/ServiceBenefits';
import ServiceProcess from '../shared/ServiceProcess';
import OfferingCards from './OfferingCards';
import ServiceFaq from '../shared/ServiceFaq';
import ServiceGuarantees from '../shared/ServiceGuarantees';
import ServiceCtaBand from '../shared/ServiceCtaBand';
import Footer from '../../../sections/Footer';
import '../shared/ServicePage.css';
import type { Guarantee } from '../shared/ServiceGuarantees';
import type { Benefit } from '../shared/ServiceBenefits';
import type { ProcessStep } from '../shared/ServiceProcess';
import type { FaqItem } from '../shared/ServiceFaq';

// =============================================================================
// DATA
// =============================================================================
const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    headline: 'Votre première impression génère du chiffre d\'affaires',
    body: 'Vous avez 7 secondes pour convaincre un visiteur. Un site vitrine professionnel transforme ce premier contact en confiance, et la confiance en prise de contact. 88% des internautes ne reviennent pas sur un site dont le design les a déçus.',
  },
  {
    icon: Search,
    headline: 'Être trouvé sur Google, c\'est être choisi',
    body: 'Un site optimisé pour le SEO vous place devant vos concurrents quand votre client potentiel cherche vos services. Chaque page correctement structurée est une vitrine supplémentaire, ouverte 24h/7j, sans frais publicitaires.',
  },
  {
    icon: Users,
    headline: 'Un site rapide retient vos visiteurs',
    body: 'Au-delà de 3 secondes de chargement, 40% des internautes quittent votre site. Nous livrons des performances Core Web Vitals optimales pour que chaque visiteur reste, explore et contacte.',
  },
];

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Brief & Stratégie',
    description: 'Nous analysons votre activité, vos concurrents et vos objectifs.',
    detail: 'Un questionnaire détaillé et un appel de cadrage pour définir la structure idéale (One-Page ou Multi-Pages), votre identité visuelle et vos messages clés. Livrable : brief validé + arborescence du site.',
  },
  {
    number: '02',
    title: 'Maquettes & Design',
    description: 'Votre site prend forme avant que la première ligne de code soit écrite.',
    detail: 'Nous concevons des maquettes haute-fidélité sous Figma pour chaque page clé. Vous visualisez, commentez et validez. Zéro surprise lors du développement. Livrable : design system + maquettes mobile/desktop.',
  },
  {
    number: '03',
    title: 'Développement & Lancement',
    description: 'Votre site est développé, testé, puis mis en ligne.',
    detail: 'Développement en React avec une performance maximale. Tests cross-navigateurs, vérification SEO technique, intégration du nom de domaine et lancement. Livrable : site en ligne, formation à la mise à jour incluse.',
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Quelle est la différence entre One-Page et Multi-Pages ?',
    answer: 'Le site One-Page est idéal pour les activités simples ou les lancements : tout le contenu est sur une seule page scrollable, ce qui concentre le message et guide le visiteur vers l\'action. Le site Multi-Pages convient aux entreprises avec plusieurs offres, car il permet un référencement plus profond sur Google grâce à des pages dédiées par thématique.',
  },
  {
    question: 'En combien de temps mon site sera-t-il en ligne ?',
    answer: 'En règle générale, comptez 3 à 5 semaines du brief au lancement, selon la complexité et la réactivité des échanges. La phase de maquettage (semaine 1-2) est souvent la plus importante car elle conditionne tout le reste. Nous planifions ensemble les jalons dès le démarrage du projet.',
  },
  {
    question: 'Pourrai-je modifier mon site moi-même après livraison ?',
    answer: 'Oui. Chaque site vitrine est pensé pour votre autonomie. Si vous choisissez la formule avec Panneau de Gestion, vous pouvez modifier textes, images et sections via une interface simple, sans toucher au code. Sinon, nous vous proposons des forfaits de maintenance pour toute évolution.',
  },
];

const guarantees: Guarantee[] = [
  {
    icon: Paintbrush,
    title: 'Design Personnalisé',
    text: 'Une identité visuelle unique qui vous démarque, loin des modèles standards.',
  },
  {
    icon: Search,
    title: 'Optimisation SEO',
    text: 'Des fondations techniques saines pour plaire aux moteurs de recherche dès le lancement.',
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
    document.title = 'Site Vitrine, Sweet Agency | Créateur de sites professionnels';
  }, []);

  return (
    <div className="service-page service-page--teal">
      <ServiceHero
        title={
          <>
            Votre présence en ligne,{' '}
            <span className="service-hero__title-gradient">impeccable</span>
          </>
        }
        subtitle="Un site vitrine sur mesure qui transforme vos visiteurs en clients. Pas un template, une expérience pensée pour votre activité."
        ctaLabel="Démarrer votre projet"
        colorScheme="teal"
        currentSlug="/services/site-vitrine"
      />

      <ServiceIntro
        title="Le pilier de votre crédibilité digitale"
        text="Votre site vitrine est votre commercial le plus performant : il travaille 24h/7j, ne prend pas de vacances et parle à vos clients au moment exact où ils vous cherchent. Nous concevons des sites qui inspirent confiance, racontent votre histoire et génèrent des contacts qualifiés."
        colorScheme="teal"
      />

      <ServiceBenefits
        title="Pourquoi investir dans un site vitrine professionnel ?"
        subtitle="Pas des fonctionnalités. Des résultats concrets pour votre activité."
        items={benefits}
        colorScheme="teal"
      />

      <ServiceProcess
        title="De votre idée à votre site en 3 étapes"
        steps={processSteps}
        colorScheme="teal"
      />

      <OfferingCards />

      <ServiceFaq
        title="Vos questions, nos réponses"
        items={faqItems}
        colorScheme="teal"
      />

      <ServiceGuarantees
        title="Ce qui est inclus, dans tous les cas"
        subtitle="Une qualité technique irréprochable, quel que soit votre choix."
        items={guarantees}
        colorScheme="teal"
      />

      <ServiceCtaBand
        title="Prêt à donner vie à votre vitrine ?"
        text="Échangeons sur vos objectifs et construisons ensemble le site qui vous ressemble."
        ctaLabel="Discutons de votre projet"
        colorScheme="teal"
      />

      <Footer colorScheme="teal" />
    </div>
  );
}

export default SiteVitrine;
