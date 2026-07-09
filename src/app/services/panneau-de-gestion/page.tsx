import PanneauDeGestion from '../../../components/pages/services/PanneauDeGestion';
import { pageMetadata } from '../../../lib/seo';
import { JsonLd, serviceLd, breadcrumbLd, faqLd } from '../../../lib/jsonld';

const PATH = '/services/panneau-de-gestion';

export const metadata = pageMetadata({
  title: 'Panneau de gestion sur mesure à Strasbourg',
  description:
    "Back-office et panneau de gestion sur mesure pour piloter votre site en autonomie : contenus, produits, tableaux de bord. Conçu en Alsace par l'agence Sweet.",
  path: PATH,
});

const FAQ = [
  {
    question: 'Dois-je avoir des compétences techniques pour utiliser le panneau ?',
    answer:
      "Non. L'interface est conçue comme un outil de traitement de texte amélioré : vous cliquez, vous tapez, vous sauvegardez. Pas de code, pas de jargon. Une formation de prise en main et un guide vidéo sont inclus dans chaque projet.",
  },
  {
    question: 'Le panneau de gestion peut-il contrôler plusieurs sites ?',
    answer:
      "Oui. Nous pouvons architecturer un panneau centralisé qui gère plusieurs sites (par exemple un site vitrine et une boutique e-commerce). Les droits d'accès sont définissables par site et par section.",
  },
  {
    question: 'Mes données sont-elles sécurisées et sauvegardées ?',
    answer:
      "Absolument. Vos données sont hébergées en Europe (RGPD), avec des sauvegardes automatiques quotidiennes et un export possible à tout moment. L'accès au panneau est sécurisé par authentification à deux facteurs (2FA).",
  },
];

export default function PanneauDeGestionPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'Panneau de gestion sur mesure',
            serviceType: 'Développement de back-office',
            description:
              "Conception de back-offices sur mesure pour piloter un site en autonomie, à Strasbourg et en Alsace.",
            path: PATH,
          }),
          breadcrumbLd([
            { name: 'Accueil', path: '/' },
            { name: 'Panneau de gestion', path: PATH },
          ]),
          faqLd(FAQ),
        ]}
      />
      <PanneauDeGestion />
    </>
  );
}
