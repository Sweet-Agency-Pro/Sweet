/**
 * AdminTopbar
 * Header bar showing page title, breadcrumb, and user info.
 * Mobile: hamburger menu button, compact. 4K: scaled text.
 */

import type { CSSProperties } from 'react';
import { Menu } from 'lucide-react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSidebar } from './AdminLayout';

interface AdminTopbarProps {
  title?: string;
}

function AdminTopbar({ title }: AdminTopbarProps) {
  const { user } = useAuth();
  const { isMobile, is4K } = useWindowSize();
  const { toggle } = useSidebar();

  const topbarStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isMobile
      ? `${theme.spacing[3]} ${theme.spacing[4]}`
      : is4K
        ? `${theme.spacing[6]} ${theme.spacing[14]}`
        : `${theme.spacing[5]} ${theme.spacing[10]}`,
    borderBottom: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.25)}`,
    background: theme.hexToRgba(theme.colors.slate[900], 0.55),
    backdropFilter: 'blur(20px)',
    gap: theme.spacing[3],
  };

  const titleStyle: CSSProperties = {
    fontSize: isMobile
      ? theme.typography.fontSize.base
      : is4K
        ? theme.typography.fontSize['2xl']
        : theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
  };

  const subtitleStyle: CSSProperties = {
    marginTop: theme.spacing[0.5],
    color: theme.colors.slate[400],
    fontSize: is4K ? theme.typography.fontSize.sm : theme.typography.fontSize.xs,
    letterSpacing: theme.typography.letterSpacing.wider,
    textTransform: 'uppercase',
    display: isMobile ? 'none' : undefined,
  };

  const userAreaStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const avatarStyle: CSSProperties = {
    width: is4K ? '2.8rem' : '2.2rem',
    height: is4K ? '2.8rem' : '2.2rem',
    borderRadius: theme.borderRadius.full,
    background: theme.gradients.tealCyan,
    display: 'grid',
    placeItems: 'center',
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
  };

  const userNameStyle: CSSProperties = {
    color: theme.colors.slate[100],
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
  };

  const userRoleStyle: CSSProperties = {
    color: theme.colors.teal[400],
    fontSize: is4K ? theme.typography.fontSize.sm : theme.typography.fontSize.xs,
  };

  const hamburgerStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[200],
    cursor: 'pointer',
    padding: theme.spacing[1],
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <header style={topbarStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing[3] }}>
        {isMobile && (
          <button type="button" style={hamburgerStyle} onClick={toggle}>
            <Menu size={22} />
          </button>
        )}
        <div>
          <div style={titleStyle}>{title ?? 'Dashboard'}</div>
          <div style={subtitleStyle}>Panneau d'administration</div>
        </div>
      </div>
      <div style={userAreaStyle}>
        <div style={avatarStyle}>{(user?.email?.[0] ?? 'A').toUpperCase()}</div>
        {!isMobile && (
          <div style={{ display: 'flex', flexDirection: 'column' as const }}>
            <span style={userNameStyle}>{user?.email ?? 'Admin'}</span>
            <span style={userRoleStyle}>admin</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminTopbar;
