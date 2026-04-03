/**
 * Site E-commerce, Service Detail Page
 * Full conversion-focused page with Benefits, Process, FAQ
 * Color scheme: Purple
 */

import { useEffect } from 'react';
import {
  ShoppingCart,
  BarChart3,
  TrendingUp,
  Shield,
  Package,
  Search,
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
    icon: TrendingUp,
    headline: 'Vendez pendant que vous dormez',
    body: 'Un site e-commerce bien conçu génère des ventes 24h/7j, même les week-ends et les jours fériés. Avec un tunnel d\'achat optimisé et un panier intuitif, chaque visiteur est guidé vers la conversion sans friction. C\'est votre vendeur le plus performant, sans salaire.',
  },
  {
    icon: ShoppingCart,
    headline: 'Récupérez les paniers abandonnés',
    body: '70% des paniers en ligne sont abandonnés avant l\'achat. Un parcours d\'achat bien pensé, étapes claires, paiement rassurant, relances automatiques, réduit drastiquement ce chiffre et augmente votre taux de conversion sans dépenser plus en publicité.',
  },
  {
    icon: BarChart3,
    headline: 'Pilotez votre performance avec vos données',
    body: 'Chaque vente, chaque visiteur, chaque abandon de panier génère des données précieuses. Nous intégrons des outils analytiques pour que vous sachiez exactement quels produits performent, d\'où viennent vos clients, et comment optimiser en continu.',
  },
];

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Découverte & Architecture',
    description: 'Nous cartographions votre catalogue et votre tunnel de vente idéal.',
    detail: 'Analyse de vos produits, de votre cible client et de vos fournisseurs de paiement. Définition de l\'arborescence (catégories, fiches produits, politique de retour) et des intégrations nécessaires (Stripe, boutique physique, ERP). Livrable : document de cadrage + wireframes.',
  },
  {
    number: '02',
    title: 'Design & Expérience Utilisateur',
    description: 'Chaque écran est conçu pour guider l\'achat, pas pour faire joli.',
    detail: 'Maquettage Figma du parcours complet : page d\'accueil, listing produits, fiche produit, panier, checkout. Tests de la hiérarchie visuelle et des appels à l\'action. Mobile-first par défaut, car 60%+ des acheteurs commandent depuis leur téléphone. Livrable : prototypes interactifs validés.',
  },
  {
    number: '03',
    title: 'Développement, Tests & Lancement',
    description: 'Votre boutique est développée, testée de A à Z, puis lancée.',
    detail: 'Intégration des paiements sécurisés, des fiches produits, du système de stock et des mails transactionnels. Tests de charge, tests de sécurité, vérification PCI-DSS pour les paiements. Livrable : boutique opérationnelle avec formation à la gestion des commandes.',
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Les paiements en ligne sont-ils vraiment sécurisés ?',
    answer: 'Oui. Nous intégrons uniquement des prestataires de paiement certifiés PCI-DSS (Stripe, Mollie, PayPal). Vos clients paient sans que leurs données bancaires transitent par votre serveur. Le cadenas HTTPS, le protocole 3D Secure et les tokens de paiement garantissent une protection maximale, rassurante pour vos clients et exigée par les banques.',
  },
  {
    question: 'Vaut-il mieux Shopify ou un e-commerce développé sur mesure ?',
    answer: 'Shopify est excellent pour démarrer vite avec un budget limité. Il devient contraignant dès que vous avez des besoins spécifiques : logique de prix complexe, intégration à un ERP, design très personnalisé ou expérience utilisateur différenciée. Notre solution sur mesure vous donne une flexibilité totale, sans les frais de transaction Shopify ni les limites de leurs templates.',
  },
  {
    question: 'Comment gérer mon stock et mes commandes au quotidien ?',
    answer: 'Nous couplons systématiquement votre boutique avec un Panneau de Gestion intuitif. Vous y gérez votre catalogue (ajout de produits, modification de prix, photos), vos commandes (statuts, facturation, expédition) et votre stock en temps réel. Si vous avez déjà un logiciel de caisse ou un ERP, nous pouvons l\'intégrer directement via API.',
  },
];

const guarantees: Guarantee[] = [
  {
    icon: Shield,
    title: 'Paiements Sécurisés',
    text: 'Intégration certifiée PCI-DSS. Vos clients paient en toute confiance.',
  },
  {
    icon: Package,
    title: 'Gestion de Catalogue',
    text: 'Ajoutez, modifiez ou retirez des produits simplement, sans toucher au code.',
  },
  {
    icon: Search,
    title: 'SEO Produit Intégré',
    text: 'Structure technique et balises optimisées pour que vos fiches produits remontent sur Google.',
  },
];

// =============================================================================
// COMPONENT
// =============================================================================
function SiteEcommerce() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page service-page--purple">
      <SEO
        title="Développement de Boutique E-commerce (Shopify/Next.js)"
        description="Lancez votre boutique en ligne performante. Développement e-commerce sécurisé, gestion des stocks simplifiée et expérience d'achat fluide. Prêt à vendre ?"
      />
      <ServiceHero
        title={
          <>
            Votre boutique en ligne,{' '}
            <span className="service-hero__title-gradient">qui vend vraiment</span>
          </>
        }
        subtitle="Une plateforme performante et sécurisée conçue pour démultiplier vos ventes en ligne, tout en offrant une expérience utilisateur fluide."
        ctaLabel="Discuter de votre projet"
        colorScheme="purple"
        currentSlug="/services/site-ecommerce"
      />

      <ServiceIntro
        title="Vendre en ligne est une science. On la maîtrise."
        text="Un site e-commerce ne se résume pas à une liste de produits avec un bouton 'Ajouter au panier'. C'est un système complet : expérience utilisateur, confiance, performance, gestion. Nous concevons des boutiques qui convertissent car elles sont pensées du point de vue de l'acheteur, pas du vendeur."
        colorScheme="purple"
      />

      <ServiceBenefits
        title="Votre boutique en ligne comme levier de croissance"
        subtitle="Des avantages concrets, mesurables, qui impactent directement votre chiffre d'affaires."
        items={benefits}
        colorScheme="purple"
      />

      <ServiceProcess
        title="Comment naît votre boutique en ligne"
        steps={processSteps}
        colorScheme="purple"
      />

      <ServiceFaq
        title="Vos questions E-commerce"
        items={faqItems}
        colorScheme="purple"
      />

      <ServiceGuarantees
        title="Ce qui est inclus dans chaque boutique"
        subtitle="Tout le nécessaire pour vendre en toute sérénité dès le premier jour."
        items={guarantees}
        colorScheme="purple"
      />

      <ServiceCtaBand
        title="Prêt à ouvrir votre boutique en ligne ?"
        text="Parlez-nous de vos produits et de votre vision. Ensemble, construisons votre machine à vendre."
        ctaLabel="Démarrer mon e-commerce"
        colorScheme="purple"
      />

      <Footer colorScheme="purple" />
    </div>
  );
}

export default SiteEcommerce;
