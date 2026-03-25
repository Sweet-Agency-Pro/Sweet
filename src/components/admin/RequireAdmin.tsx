import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export function RequireAdmin({ children }: { children: React.ReactNode; loginPath?: string }) {
  const { session, loading } = useAuth();

  if (loading) return null; // Ou un spinner très léger

  if (!session) {
    // Si pas de session, on redirige vers le login secret
    return <Navigate to={import.meta.env.VITE_LOGIN_PATH} replace />;
  }

  return <>{children}</>;
}

export default RequireAdmin;
