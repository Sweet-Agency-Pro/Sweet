import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { JsonLd, organizationLd, websiteLd } from '../lib/jsonld';
import { SITE, SITE_URL } from '../lib/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Agence web à Strasbourg — Création de sites | Sweet',
    template: '%s | Agence Sweet',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className}>
      <body>
        {/* Données structurées globales : identité de l'entreprise + site */}
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
