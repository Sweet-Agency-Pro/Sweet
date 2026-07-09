import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

// Génère /robots.txt. On n'y liste PAS les chemins admin secrets (le fichier est
// public) : les pages admin sont protégées par un noindex dans leurs métadonnées.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
