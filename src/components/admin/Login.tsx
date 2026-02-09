/**
 * Login page
 * Redirects to admin if already authenticated. Secret URL.
 * Responsive: scales for mobile, FHD, 4K/5K.
 */

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';
import { useWindowSize } from '../../hooks/useWindowSize';

interface LoginProps {
  adminPath: string;
}

function Login({ adminPath }: LoginProps) {
  const { signIn, loading, isAdmin, session } = useAuth();
  const navigate = useNavigate();
  const { isMobile, is4K } = useWindowSize();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isDisabled = useMemo(() => submitting || loading, [submitting, loading]);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate(adminPath, { replace: true });
    }
  }, [loading, session, isAdmin, adminPath, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      await signIn(email, password);
      navigate(adminPath, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Connexion impossible.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // ── Dynamic styles ──
  const wrapperStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: theme.gradients.heroBackground,
    padding: isMobile ? theme.spacing[4] : 0,
  };

  const cardStyle: CSSProperties = {
    width: isMobile ? '100%' : is4K ? 'min(560px, 40vw)' : 'min(420px, 92vw)',
    padding: isMobile ? theme.spacing[7] : is4K ? theme.spacing[14] : theme.spacing[10],
    borderRadius: theme.borderRadius['2xl'],
    background: theme.hexToRgba(theme.colors.slate[900], 0.75),
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    gap: is4K ? theme.spacing[5] : theme.spacing[4],
    color: theme.colors.white,
  };

  const iconWrapStyle: CSSProperties = {
    width: is4K ? '4rem' : '3.2rem',
    height: is4K ? '4rem' : '3.2rem',
    borderRadius: theme.borderRadius.xl,
    background: theme.hexToRgba(theme.colors.teal[500], 0.12),
    display: 'grid',
    placeItems: 'center',
    marginBottom: theme.spacing[2],
  };

  const titleStyle: CSSProperties = {
    fontSize: is4K ? theme.typography.fontSize['3xl'] : theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const subtitleStyle: CSSProperties = {
    color: theme.colors.slate[400],
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
    marginBottom: theme.spacing[2],
  };

  const fieldStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
  };

  const labelStyle: CSSProperties = {
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
    color: theme.colors.slate[200],
  };

  const inputStyle: CSSProperties = {
    background: theme.hexToRgba(theme.colors.slate[900], 0.6),
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
    borderRadius: theme.borderRadius.lg,
    padding: is4K ? theme.spacing[4] : theme.spacing[3],
    color: theme.colors.white,
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
    outline: 'none',
  };

  const buttonStyle: CSSProperties = {
    marginTop: theme.spacing[2],
    padding: is4K ? theme.spacing[4] : theme.spacing[3],
    borderRadius: theme.borderRadius.full,
    border: 'none',
    background: theme.gradients.tealCyan,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
  };

  const errorStyle: CSSProperties = {
    color: '#f87171',
    background: theme.hexToRgba('#f87171', 0.1),
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.hexToRgba('#f87171', 0.2)}`,
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
  };

  // Don't render the form while we check session
  if (loading) {
    return (
      <div style={wrapperStyle}>
        <div style={{ color: theme.colors.slate[300] }}>Chargement…</div>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <div style={iconWrapStyle}>
          <Lock size={is4K ? 36 : 28} color={theme.colors.teal[400]} />
        </div>
        <div style={titleStyle}>Connexion Admin</div>
        <div style={subtitleStyle}>URL privée • Accès sécurisé</div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="admin@agence-sweet.com"
            autoComplete="email"
            required
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="admin-password">
            Mot de passe
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {errorMessage ? (
          <div style={errorStyle}>{errorMessage}</div>
        ) : null}

        <button type="submit" style={buttonStyle} disabled={isDisabled}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default Login;
