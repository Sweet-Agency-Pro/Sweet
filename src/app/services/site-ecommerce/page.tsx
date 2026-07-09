import SiteEcommerce from '../../../components/pages/services/Ecommerce';
import { pageMetadata } from '../../../lib/seo';
import { JsonLd, serviceLd, breadcrumbLd, faqLd } from '../../../lib/jsonld';

const PATH = '/services/site-ecommerce';

export const metadata = pageMetadata({
  title: 'Création de site e-commerce à Strasbourg',
  description:
    "Création de boutiques en ligne sur mesure à Strasbourg et en Alsace : paiements sécurisés, parcours d'achat optimisé et SEO produit pour vendre plus.",
  path: PATH,
});

const FAQ = [
  {
    question: 'Les paiements en ligne sont-ils vraiment sécurisés ?',
    answer:
      "Oui. Nous intégrons uniquement des prestataires de paiement certifiés PCI-DSS (Stripe, Mollie, PayPal). Vos clients paient sans que leurs données bancaires transitent par votre serveur. Le HTTPS, le protocole 3D Secure et les tokens de paiement garantissent une protection maximale.",
  },
  {
    question: 'Vaut-il mieux Shopify ou un e-commerce développé sur mesure ?',
    answer:
      "Shopify est excellent pour démarrer vite avec un budget limité. Il devient contraignant dès que vous avez des besoins spécifiques : logique de prix complexe, intégration à un ERP, design très personnalisé. Notre solution sur mesure offre une flexibilité totale, sans frais de transaction ni limites de templates.",
  },
  {
    question: 'Comment gérer mon stock et mes commandes au quotidien ?',
    answer:
      "Nous couplons systématiquement votre boutique avec un Panneau de Gestion intuitif : catalogue, commandes et stock en temps réel. Si vous avez déjà un logiciel de caisse ou un ERP, nous pouvons l'intégrer directement via API.",
  },
];

export default function SiteEcommercePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'Création de site e-commerce',
            serviceType: 'Création de boutique en ligne',
            description:
              "Développement de boutiques en ligne sur mesure à Strasbourg et en Alsace : paiements sécurisés, parcours d'achat optimisé, SEO produit.",
            path: PATH,
          }),
          breadcrumbLd([
            { name: 'Accueil', path: '/' },
            { name: 'Site e-commerce à Strasbourg', path: PATH },
          ]),
          faqLd(FAQ),
        ]}
      />
      <SiteEcommerce />
    </>
  );
}
