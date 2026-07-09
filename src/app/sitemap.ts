import type { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/site';

// Date de dernière modification significative du contenu (à mettre à jour lors de
// refontes réelles — ne pas régénérer à chaque build pour rester fiable).
const LAST_MODIFIED = new Date('2026-07-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'monthly' },
    { path: '/services/site-vitrine', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/site-ecommerce', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services/panneau-de-gestion', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
