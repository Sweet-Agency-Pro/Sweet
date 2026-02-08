/**
 * Login page
 * Redirects to admin if already authenticated. Secret URL.
 */

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';

interface LoginProps {
  adminPath: string;
}

function Login({ adminPath }: LoginProps) {
  const { signIn, loading, isAdmin, session } = useAuth();
  const navigate = useNavigate();
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

  // Don't render the form while we check session
  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={{ color: theme.colors.slate[300] }}>Chargement…</div>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <div style={styles.iconWrap}>
          <Lock size={28} color={theme.colors.teal[400]} />
        </div>
        <div style={styles.title}>Connexion Admin</div>
        <div style={styles.subtitle}>URL privée • Accès sécurisé</div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="admin-email">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="admin@agence-sweet.com"
            autoComplete="email"
            required
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label} htmlFor="admin-password">
            Mot de passe
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        {errorMessage ? (
          <div style={styles.error}>{errorMessage}</div>
        ) : null}

        <button type="submit" style={styles.button} disabled={isDisabled}>
          {submitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: theme.gradients.heroBackground,
  },
  card: {
    width: 'min(420px, 92vw)',
    padding: theme.spacing[10],
    borderRadius: theme.borderRadius['2xl'],
    background: theme.hexToRgba(theme.colors.slate[900], 0.75),
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    backdropFilter: 'blur(20px)',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
    color: theme.colors.white,
  },
  iconWrap: {
    width: '3.2rem',
    height: '3.2rem',
    borderRadius: theme.borderRadius.xl,
    background: theme.hexToRgba(theme.colors.teal[500], 0.12),
    display: 'grid',
    placeItems: 'center',
    marginBottom: theme.spacing[2],
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.semibold,
  },
  subtitle: {
    color: theme.colors.slate[400],
    fontSize: theme.typography.fontSize.sm,
    marginBottom: theme.spacing[2],
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.slate[200],
  },
  input: {
    background: theme.hexToRgba(theme.colors.slate[900], 0.6),
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[3],
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    outline: 'none',
  },
  button: {
    marginTop: theme.spacing[2],
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.full,
    border: 'none',
    background: theme.gradients.tealCyan,
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
  },
  error: {
    color: '#f87171',
    background: theme.hexToRgba('#f87171', 0.1),
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.hexToRgba('#f87171', 0.2)}`,
    fontSize: theme.typography.fontSize.sm,
  },
};

export default Login;
