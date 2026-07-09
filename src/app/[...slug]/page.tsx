import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminApp, { type AdminView } from '../../components/admin/AdminApp';

// L'admin ne doit jamais être indexé, et cette route est dynamique (chemin secret via env).
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { robots: { index: false, follow: false } };

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH || '/studio-ombre-87';
const LOGIN_PATH = process.env.NEXT_PUBLIC_LOGIN_PATH || '/acces-prive-87';
const SECTIONS = ['services', 'projects', 'contacts', 'media'] as const;

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = '/' + (slug?.join('/') ?? '');

  if (path === LOGIN_PATH) return <AdminApp view="login" />;
  if (path === ADMIN_PATH) return <AdminApp view="dashboard" />;

  if (path.startsWith(`${ADMIN_PATH}/`)) {
    const section = path.slice(ADMIN_PATH.length + 1);
    if ((SECTIONS as readonly string[]).includes(section)) {
      return <AdminApp view={section as AdminView} />;
    }
  }

  // Tout le reste = vrai 404 (rend app/not-found.tsx avec le bon statut HTTP).
  notFound();
}
