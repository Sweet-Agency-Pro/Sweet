import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';

function NotFound() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.title}>404</div>
        <div style={styles.subtitle}>Cette page n’existe pas.</div>
        <Link to="/" style={styles.link}>
          Retour à l’accueil
        </Link>
      </div>
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
    padding: theme.spacing[10],
    borderRadius: theme.borderRadius.xl,
    background: theme.hexToRgba(theme.colors.slate[900], 0.75),
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    textAlign: 'center' as const,
    color: theme.colors.white,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
  },
  subtitle: {
    marginTop: theme.spacing[2],
    color: theme.colors.slate[300],
  },
  link: {
    display: 'inline-block',
    marginTop: theme.spacing[6],
    color: theme.colors.teal[300],
    textDecoration: 'none',
    fontWeight: theme.typography.fontWeight.medium,
  },
};

export default NotFound;
