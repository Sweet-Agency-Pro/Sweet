/**
 * AdminSidebar
 * Navigation sidebar with nav links, home button, and sign-out.
 */

import type { CSSProperties } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  MessageSquare,
  Image,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/studio-ombre-87';

const navItems = [
  { label: 'Dashboard', to: adminPath, end: true, icon: LayoutDashboard },
  { label: 'Services', to: `${adminPath}/services`, icon: Briefcase },
  { label: 'Projets', to: `${adminPath}/projects`, icon: FolderKanban },
  { label: 'Contacts', to: `${adminPath}/contacts`, icon: MessageSquare },
  { label: 'Médias', to: `${adminPath}/media`, icon: Image },
];

function AdminSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate('/', { replace: true });
    await signOut();
  };

  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div style={styles.brandArea}>
        <div style={styles.brandDot} />
        <span style={styles.brand}>Sweet Admin</span>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            style={({ isActive }) => ({
              ...styles.link,
              ...(isActive ? styles.linkActive : undefined),
            })}
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div style={styles.bottom}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={styles.bottomBtn}
        >
          <ArrowLeft size={16} />
          Voir le site
        </button>
        <button type="button" onClick={handleSignOut} style={styles.signOutBtn}>
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

const styles: Record<string, CSSProperties> = {
  sidebar: {
    width: '16rem',
    padding: theme.spacing[6],
    background: theme.hexToRgba(theme.colors.slate[900], 0.92),
    borderRight: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[6],
    flexShrink: 0,
  },
  brandArea: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
  },
  brandDot: {
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: theme.borderRadius.full,
    background: theme.colors.teal[400],
    boxShadow: `0 0 0.5rem ${theme.hexToRgba(theme.colors.teal[400], 0.6)}`,
  },
  brand: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
    letterSpacing: theme.typography.letterSpacing.tight,
  },
  nav: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1.5],
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.slate[300],
    padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    background: 'transparent',
    transition: `all ${theme.transitions.duration.fast}`,
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: theme.typography.fontSize.sm,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  linkActive: {
    background: theme.hexToRgba(theme.colors.teal[500], 0.14),
    color: theme.colors.teal[300],
    boxShadow: `inset 3px 0 0 ${theme.colors.teal[400]}`,
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
    borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    paddingTop: theme.spacing[4],
  },
  bottomBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[300],
    padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  signOutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    background: theme.hexToRgba('#ef4444', 0.08),
    border: 'none',
    color: '#f87171',
    padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
};

export default AdminSidebar;
