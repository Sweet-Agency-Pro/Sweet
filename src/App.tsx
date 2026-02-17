import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicHome from './components/PublicHome';
import MentionsLegales from './components/pages/legal/MentionsLegales';
import PolitiqueConfidentialite from './components/pages/legal/PolitiqueConfidentialite';
import Login from './components/admin/Login';
import NotFound from './components/admin/NotFound';
import RequireAdmin from './components/admin/RequireAdmin';
import AdminDashboard from './components/admin/pages/AdminDashboard';
import AdminServices from './components/admin/pages/AdminServices';
import AdminProjects from './components/admin/pages/AdminProjects';
import AdminContacts from './components/admin/pages/AdminContacts';
import AdminMedia from './components/admin/pages/AdminMedia';

// =============================================================================
// COMPONENT
// =============================================================================
function App() {
  const loginPath = import.meta.env.VITE_LOGIN_PATH || '/acces-prive-87';
  const adminPath = import.meta.env.VITE_ADMIN_PATH || '/studio-ombre-87';

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
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
    </BrowserRouter>
  );
}

export default App;
