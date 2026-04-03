/**
 * Panneau de Gestion, Service Detail Page
 * Full conversion-focused page with Benefits, Process, FAQ
 * Color scheme: Blue
 */

import { useEffect } from 'react';
import {
  Clock,
  Settings,
  UserCog,
  TrendingUp,
  Database,
  Lock,
} from 'lucide-react';

import ServiceHero from '../shared/ServiceHero';
import ServiceIntro from '../shared/ServiceIntro';
import ServiceBenefits from '../shared/ServiceBenefits';
import ServiceProcess from '../shared/ServiceProcess';
import ServiceFaq from '../shared/ServiceFaq';
import ServiceGuarantees from '../shared/ServiceGuarantees';
import ServiceCtaBand from '../shared/ServiceCtaBand';
import Footer from '../../../sections/Footer';
import SEO from '../../../layout/SEO';
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
    icon: Clock,
    headline: 'Reprenez le contrôle de votre temps',
    body: 'Sans panneau de gestion, chaque modification de votre site vous coûte du temps et de l\'argent : contacter un développeur, attendre, payer. Avec votre back-office, vous modifiez vos tarifs, ajoutez une photo ou publiez un article en 2 minutes, en totale autonomie.',
  },
  {
    icon: TrendingUp,
    headline: 'Décidez grâce aux données, pas aux intuitions',
    body: 'Combien de visiteurs cette semaine ? Quel article de blog génère le plus de contacts ? Quelle offre est la plus consultée ? Votre tableau de bord analytique répond à ces questions en temps réel. Fini les décisions à l\'aveugle, chaque action est guidée par les chiffres.',
  },
  {
    icon: Settings,
    headline: 'Votre site évolue avec votre activité',
    body: 'Une activité qui grandit a besoin d\'un site qui s\'adapte. Avec votre panneau de gestion, vous lancez une nouvelle offre, modifiez vos prix de saison ou publiez un témoignage client sans jamais dépendre d\'un prestataire. C\'est votre site, vraiment.',
  },
];

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Audit & Cartographie des Besoins',
    description: 'Nous identifions précisément ce que vous devez pouvoir gérer vous-même.',
    detail: 'Atelier de découverte pour lister chaque contenu modifiable (textes, images, articles, produits, disponibilités…), les rôles utilisateurs nécessaires et les intégrations à prévoir. Livrable : carte des fonctionnalités + maquette du tableau de bord.',
  },
  {
    number: '02',
    title: 'Design de l\'Interface Admin',
    description: 'Une interface pensée pour vous, pas pour des développeurs.',
    detail: 'Nous concevons un back-office sur mesure, épuré et intuitif. Chaque section correspond à un besoin réel : pas de menus inutiles, pas de fonctions incompréhensibles. Formation en ligne enregistrée incluse. Livrable : maquettes validées + guide d\'utilisation.',
  },
  {
    number: '03',
    title: 'Développement & Connexion au Site',
    description: 'Le panneau est développé et connecté en temps réel à votre site public.',
    detail: 'Architecture headless sécurisée : les contenus que vous modifiez s\'affichent instantanément sur votre site. Accès par rôles (admin, éditeur), logs d\'activité, sauvegardes automatiques. Livrable : panneau opérationnel + session de formation.',
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Dois-je avoir des compétences techniques pour utiliser le panneau ?',
    answer: 'Non. C\'est précisément pour cela que nous le concevons sur mesure. L\'interface est conçue comme un outil de traitement de texte amélioré : vous cliquez, vous tapez, vous sauvegardez. Pas de code, pas de jargon. Une formation de prise en main est incluse dans chaque projet, et nous vous fournissons un guide vidéo de référence.',
  },
  {
    question: 'Le panneau de gestion peut-il contrôler plusieurs sites ?',
    answer: 'Oui. Nous pouvons architecturer un panneau de gestion centralisé qui gère plusieurs sites (par exemple, un site vitrine et une boutique e-commerce). Les droits d\'accès peuvent être définis par site et par section. C\'est particulièrement utile pour les franchises ou les agences qui gèrent plusieurs entités.',
  },
  {
    question: 'Mes données sont-elles sécurisées et sauvegardées ?',
    answer: 'Absolument. Nous hébergeons vos données en Europe (RGPD), avec des sauvegardes automatiques quotidiennes et la possibilité d\'export à tout moment. L\'accès au panneau est sécurisé par authentification à deux facteurs (2FA). Vous restez propriétaire de toutes vos données, transfert possible à tout moment.',
  },
];

const guarantees: Guarantee[] = [
  {
    icon: UserCog,
    title: 'Interface Sur Mesure',
    text: 'Un back-office pensé pour votre activité, pas un template générique.',
  },
  {
    icon: Lock,
    title: 'Accès Sécurisé',
    text: 'Authentification 2FA, rôles personnalisés et logs d\'activité complets.',
  },
  {
    icon: Database,
    title: 'Données & Sauvegardes',
    text: 'Hébergement RGPD, backups quotidiens, export possible à tout moment.',
  },
];

// =============================================================================
// COMPONENT
// =============================================================================
function PanneauDeGestion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page service-page--blue">
      <SEO
        title="Dashboard & Outils Métier sur Mesure"
        description="Automatisez vos processus avec un dashboard sur mesure. Développement d'outils de gestion interne, CRM et applications métier sécurisées avec React & Supabase."
      />
      <ServiceHero
        title={
          <>
            Votre site,{' '}
            <span className="service-hero__title-gradient">sous votre contrôle</span>
          </>
        }
        subtitle="Un back-office sur mesure pour recadrer la gestion de votre entreprise. Suivez vos métriques clés, gérez vos tâches complexes et automatisez votre processus de travail avec des processus taillés pour votre entreprise."
        ctaLabel="Demander une démo"
        colorScheme="blue"
        currentSlug="/services/panneau-de-gestion"
      />

      <ServiceIntro
        title="L'outil qui rend votre site vraiment le vôtre"
        text="Un site sans panneau de gestion, c'est une voiture sans volant. Vous pouvez admirer la carrosserie, mais vous ne pouvez pas conduire. Le panneau de gestion est le moteur invisible qui vous permet de piloter votre présence en ligne, de mettre à jour vos tarifs le soir même, de lancer une promo en 2 clics et de prendre des décisions basées sur vos vraies données."
        colorScheme="blue"
      />

      <ServiceBenefits
        title="Pourquoi votre autonomie a une valeur financière"
        subtitle="Chaque dépendance à un prestataire a un coût. On vous donne les clés."
        items={benefits}
        colorScheme="blue"
      />

      <ServiceProcess
        title="Comment nous construisons votre back-office"
        steps={processSteps}
        colorScheme="blue"
      />

      <ServiceFaq
        title="Vos questions sur le Panneau de Gestion"
        items={faqItems}
        colorScheme="blue"
      />

      <ServiceGuarantees
        title="Ce qui est inclus dans chaque panneau"
        subtitle="Un socle technique solide et une formation pour que vous soyez autonome dès le premier jour."
        items={guarantees}
        colorScheme="blue"
      />

      <ServiceCtaBand
        title="Prêt à piloter votre site vous-même ?"
        text="Parlez-nous de vos besoins de gestion. On conçoit l'outil qui vous correspond exactement."
        ctaLabel="Concevoir mon panneau"
        colorScheme="blue"
      />

      <Footer colorScheme="blue" />
    </div>
  );
}

export default PanneauDeGestion;
