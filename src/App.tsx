import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAdmin from './components/admin/RequireAdmin';

// Public Pages
const PublicHome = lazy(() => import('./components/PublicHome'));
const MentionsLegales = lazy(() => import('./components/pages/legal/MentionsLegales'));
const PolitiqueConfidentialite = lazy(() => import('./components/pages/legal/PolitiqueConfidentialite'));
const SiteVitrine = lazy(() => import('./components/pages/services/SiteVitrine'));
const SiteEcommerce = lazy(() => import('./components/pages/services/Ecommerce'));
const PanneauDeGestion = lazy(() => import('./components/pages/services/PanneauDeGestion'));

// Admin Pages
const Login = lazy(() => import('./components/admin/Login'));
const NotFound = lazy(() => import('./components/admin/NotFound'));
const AdminDashboard = lazy(() => import('./components/admin/pages/AdminDashboard'));
const AdminServices = lazy(() => import('./components/admin/pages/AdminServices'));
const AdminProjects = lazy(() => import('./components/admin/pages/AdminProjects'));
const AdminContacts = lazy(() => import('./components/admin/pages/AdminContacts'));
const AdminMedia = lazy(() => import('./components/admin/pages/AdminMedia'));

// Basic loader for Suspense
const Loader = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(20, 184, 166, 0.1)',
      borderTopColor: '#14b8a6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

// =============================================================================
// COMPONENT
// =============================================================================
function App() {
  const loginPath = import.meta.env.VITE_LOGIN_PATH || '/acces-prive-87';
  const adminPath = import.meta.env.VITE_ADMIN_PATH || '/studio-ombre-87';

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/services/site-vitrine" element={<SiteVitrine />} />
          <Route path="/services/site-ecommerce" element={<SiteEcommerce />} />
          <Route path="/services/panneau-de-gestion" element={<PanneauDeGestion />} />
          <Route path={loginPath} element={<Login adminPath={adminPath} />} />
          <Route
            path={adminPath}
            element={
              <RequireAdmin loginPath={loginPath}>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path={`${adminPath}/services`}
            element={
              <RequireAdmin loginPath={loginPath}>
                <AdminServices />
              </RequireAdmin>
            }
          />
          <Route
            path={`${adminPath}/projects`}
            element={
              <RequireAdmin loginPath={loginPath}>
                <AdminProjects />
              </RequireAdmin>
            }
          />
          <Route
            path={`${adminPath}/contacts`}
            element={
              <RequireAdmin loginPath={loginPath}>
                <AdminContacts />
              </RequireAdmin>
            }
          />
          <Route
            path={`${adminPath}/media`}
            element={
              <RequireAdmin loginPath={loginPath}>
                <AdminMedia />
              </RequireAdmin>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
