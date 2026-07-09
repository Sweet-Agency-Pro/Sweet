import PublicHome from '../components/PublicHome';
import { pageMetadata } from '../lib/seo';

export const metadata = pageMetadata({
  titleAbsolute: 'Agence web à Strasbourg — Création de sites | Sweet',
  description:
    "Agence web à Wasselonne, près de Strasbourg : création de sites vitrine, e-commerce et back-office sur mesure. Design, développement React, SEO et performance.",
  path: '/',
});

export default function HomePage() {
  // Les données structurées Organization + WebSite sont injectées globalement (layout).
  return <PublicHome />;
}
