import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import RequireAdmin from './components/admin/RequireAdmin';
import CookieConsentModal, { type ConsentData } from './components/layout/CookieConsent';

// =============================================================================
// ANALYTICS SETUP
// =============================================================================
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Helper to check if analytics consent is granted
const getAnalyticsConsent = () => {
  const saved = localStorage.getItem('SweetAgency_GDPR_Consent');
  if (!saved) return false;
  try {
    const data = JSON.parse(saved) as ConsentData;
    return data.analytics === true;
  } catch {
    return false;
  }
};

// Analytics Page View Tracker Component
const AnalyticsTracker = ({ hasConsent }: { hasConsent: boolean }) => {
  const location = useLocation();

  useEffect(() => {
    const isAdminPage = location.pathname.startsWith(import.meta.env.VITE_ADMIN_PATH);

    if (GA_MEASUREMENT_ID) {
      if (hasConsent && !isAdminPage) {
        // Re-enable GA tracking
        // @ts-ignore
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
        
        // Initialize if not already done
        if (window.localStorage.getItem('ga_initialized') !== 'true') {
          ReactGA.initialize(GA_MEASUREMENT_ID);
          window.localStorage.setItem('ga_initialized', 'true');
        }
        
        ReactGA.send({
          hitType: "pageview",
          page: location.pathname + location.search
        });
      } else {
        // Disable GA tracking
        // @ts-ignore
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
        window.localStorage.setItem('ga_initialized', 'false');
      }
    }
  }, [location, hasConsent]);

  return null;
};

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
  const [analyticsConsent, setAnalyticsConsent] = useState(getAnalyticsConsent());

  const handleConsentChange = useCallback((data: ConsentData) => {
    setAnalyticsConsent(data.analytics);
    if (GA_MEASUREMENT_ID) {
      if (data.analytics) {
        // Re-enable GA tracking immediately
        // @ts-ignore
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

        if (window.localStorage.getItem('ga_initialized') !== 'true') {
          ReactGA.initialize(GA_MEASUREMENT_ID);
          window.localStorage.setItem('ga_initialized', 'true');
        }
        ReactGA.send({
          hitType: "pageview",
          page: window.location.pathname + window.location.search
        });
      } else {
        // Disable GA tracking immediately
        // @ts-ignore
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
        window.localStorage.setItem('ga_initialized', 'false');
      }
    }
  }, []);


  return (
    <BrowserRouter>
      <AnalyticsTracker hasConsent={analyticsConsent} />
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
      <CookieConsentModal onConsentChange={handleConsentChange} />
    </BrowserRouter>
  );
}

export default App;
