import MentionsLegales from '../../components/pages/legal/MentionsLegales';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata({
  title: 'Mentions légales',
  description:
    "Mentions légales de l'agence Sweet : éditeur du site, hébergeur et propriété intellectuelle des contenus de agence-sweet.com.",
  path: '/mentions-legales',
});

export default function MentionsLegalesPage() {
  return <MentionsLegales />;
}
