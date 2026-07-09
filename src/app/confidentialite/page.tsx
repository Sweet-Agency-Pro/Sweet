import PolitiqueConfidentialite from '../../components/pages/legal/PolitiqueConfidentialite';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité de l'agence web Sweet : collecte, finalité, conservation et protection de vos données personnelles (RGPD).",
  path: '/confidentialite',
});

export default function ConfidentialitePage() {
  return <PolitiqueConfidentialite />;
}
