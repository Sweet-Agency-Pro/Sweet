import SiteVitrine from '../../../components/pages/services/SiteVitrine';
import { pageMetadata } from '../../../lib/seo';
import { JsonLd, serviceLd, breadcrumbLd, faqLd } from '../../../lib/jsonld';

const PATH = '/services/site-vitrine';

export const metadata = pageMetadata({
  title: 'Création de site vitrine à Strasbourg',
  description:
    "Création de sites vitrine professionnels sur mesure à Strasbourg et en Alsace. Design unique, SEO et performance pour transformer vos visiteurs en clients.",
  path: PATH,
});

const FAQ = [
  {
    question: 'Quelle est la différence entre One-Page et Multi-Pages ?',
    answer:
      "Le site One-Page est idéal pour les activités simples ou les lancements : tout le contenu est sur une seule page scrollable, ce qui concentre le message et guide le visiteur vers l'action. Le site Multi-Pages convient aux entreprises avec plusieurs offres, car il permet un référencement plus profond sur Google grâce à des pages dédiées par thématique.",
  },
  {
    question: 'En combien de temps mon site sera-t-il en ligne ?',
    answer:
      'En règle générale, comptez 3 à 5 semaines du brief au lancement, selon la complexité et la réactivité des échanges. La phase de maquettage (semaine 1-2) est souvent la plus importante car elle conditionne tout le reste.',
  },
  {
    question: 'Pourrai-je modifier mon site moi-même après livraison ?',
    answer:
      "Oui. Chaque site vitrine est pensé pour votre autonomie. Si vous choisissez la formule avec Panneau de Gestion, vous pouvez modifier textes, images et sections via une interface simple, sans toucher au code. Sinon, nous proposons des forfaits de maintenance pour toute évolution.",
  },
];

export default function SiteVitrinePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceLd({
            name: 'Création de site vitrine',
            serviceType: 'Création de site vitrine',
            description:
              "Conception de sites vitrine sur mesure à Strasbourg et en Alsace : design, développement, SEO et performance.",
            path: PATH,
          }),
          breadcrumbLd([
            { name: 'Accueil', path: '/' },
            { name: 'Site vitrine à Strasbourg', path: PATH },
          ]),
          faqLd(FAQ),
        ]}
      />
      <SiteVitrine />
    </>
  );
}
