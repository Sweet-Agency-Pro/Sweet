'use client';

import type { ComponentType } from 'react';
import { AuthProvider } from '../../auth/AuthContext';
import RequireAdmin from './RequireAdmin';
import Login from './Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminServices from './pages/AdminServices';
import AdminProjects from './pages/AdminProjects';
import AdminContacts from './pages/AdminContacts';
import AdminMedia from './pages/AdminMedia';

const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH || '/studio-ombre-87';

export type AdminView = 'login' | 'dashboard' | 'services' | 'projects' | 'contacts' | 'media';

const PAGES: Record<Exclude<AdminView, 'login'>, ComponentType> = {
  dashboard: AdminDashboard,
  services: AdminServices,
  projects: AdminProjects,
  contacts: AdminContacts,
  media: AdminMedia,
};

/**
 * Shell client de l'admin : monté par la route catch-all secrète.
 * Enveloppe l'AuthProvider et protège les vues via RequireAdmin.
 */
export default function AdminApp({ view }: { view: AdminView }) {
  if (view === 'login') {
    return (
      <AuthProvider>
        <Login adminPath={ADMIN_PATH} />
      </AuthProvider>
    );
  }

  const Page = PAGES[view];
  return (
    <AuthProvider>
      <RequireAdmin>
        <Page />
      </RequireAdmin>
    </AuthProvider>
  );
}
