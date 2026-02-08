/**
 * AdminTopbar
 * Header bar showing page title, breadcrumb, and user info.
 */

import type { CSSProperties } from 'react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';

interface AdminTopbarProps {
  title?: string;
}

function AdminTopbar({ title }: AdminTopbarProps) {
  const { user } = useAuth();

  return (
    <header style={styles.topbar}>
      <div>
        <div style={styles.title}>{title ?? 'Dashboard'}</div>
        <div style={styles.subtitle}>Panneau d'administration</div>
      </div>
      <div style={styles.userArea}>
        <div style={styles.avatar}>{(user?.email?.[0] ?? 'A').toUpperCase()}</div>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{user?.email ?? 'Admin'}</span>
          <span style={styles.userRole}>admin</span>
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, CSSProperties> = {
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing[5]} ${theme.spacing[10]}`,
    borderBottom: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.25)}`,
    background: theme.hexToRgba(theme.colors.slate[900], 0.55),
    backdropFilter: 'blur(20px)',
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  },
  subtitle: {
    marginTop: theme.spacing[0.5],
    color: theme.colors.slate[400],
    fontSize: theme.typography.fontSize.xs,
    letterSpacing: theme.typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  userArea: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  avatar: {
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: theme.borderRadius.full,
    background: theme.gradients.tealCyan,
    display: 'grid',
    placeItems: 'center',
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.sm,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    color: theme.colors.slate[100],
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: theme.typography.fontSize.sm,
  },
  userRole: {
    color: theme.colors.teal[400],
    fontSize: theme.typography.fontSize.xs,
  },
};

export default AdminTopbar;
