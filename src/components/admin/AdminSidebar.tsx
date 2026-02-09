/**
 * AdminSidebar
 * Navigation sidebar with nav links, home button, and sign-out.
 * Mobile: slide-in overlay panel. 4K: wider with scaled fonts.
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
  X,
} from 'lucide-react';
import theme from '../../styles/theme';
import { useAuth } from '../../auth/AuthContext';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useSidebar } from './AdminLayout';

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
  const { isMobile, is4K } = useWindowSize();
  const { open, close } = useSidebar();

  const handleSignOut = async () => {
    navigate('/', { replace: true });
    await signOut();
  };

  const handleNavClick = () => {
    if (isMobile) close();
  };

  const iconSize = is4K ? 22 : 18;

  // ── Dynamic styles ──
  const sidebarStyle: CSSProperties = isMobile
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '18rem',
        padding: theme.spacing[6],
        background: theme.hexToRgba(theme.colors.slate[900], 0.97),
        borderRight: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing[6],
        flexShrink: 0,
        zIndex: 50,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
      }
    : {
        width: is4K ? '20rem' : '16rem',
        padding: is4K ? theme.spacing[8] : theme.spacing[6],
        background: theme.hexToRgba(theme.colors.slate[900], 0.92),
        borderRight: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
        display: 'flex',
        flexDirection: 'column',
        gap: is4K ? theme.spacing[8] : theme.spacing[6],
        flexShrink: 0,
      };

  const brandStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
  };

  const brandDotStyle: CSSProperties = {
    width: is4K ? '0.8rem' : '0.6rem',
    height: is4K ? '0.8rem' : '0.6rem',
    borderRadius: theme.borderRadius.full,
    background: theme.colors.teal[400],
    boxShadow: `0 0 0.5rem ${theme.hexToRgba(theme.colors.teal[400], 0.6)}`,
  };

  const brandTextStyle: CSSProperties = {
    fontSize: is4K ? theme.typography.fontSize.xl : theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
    letterSpacing: theme.typography.letterSpacing.tight,
    flex: 1,
  };

  const navStyle: CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1.5],
  };

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    color: theme.colors.slate[300],
    padding: is4K ? `${theme.spacing[3]} ${theme.spacing[5]}` : `${theme.spacing[2.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    background: 'transparent',
    transition: `all ${theme.transitions.duration.fast}`,
    fontWeight: theme.typography.fontWeight.medium,
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  };

  const linkActiveStyle: CSSProperties = {
    background: theme.hexToRgba(theme.colors.teal[500], 0.14),
    color: theme.colors.teal[300],
    boxShadow: `inset 3px 0 0 ${theme.colors.teal[400]}`,
  };

  const bottomStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[2],
    borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    paddingTop: theme.spacing[4],
  };

  const bottomBtnStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[300],
    padding: is4K ? `${theme.spacing[3]} ${theme.spacing[5]}` : `${theme.spacing[2.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    fontSize: is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const signOutBtnStyle: CSSProperties = {
    ...bottomBtnStyle,
    background: theme.hexToRgba('#ef4444', 0.08),
    color: '#f87171',
  };

  const closeBtnStyle: CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[400],
    cursor: 'pointer',
    padding: theme.spacing[1],
  };

  return (
    <aside style={sidebarStyle}>
      {/* Brand */}
      <div style={brandStyle}>
        <div style={brandDotStyle} />
        <span style={brandTextStyle}>Sweet Admin</span>
        {isMobile && (
          <button type="button" onClick={close} style={closeBtnStyle}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={navStyle}>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={handleNavClick}
            style={({ isActive }) => ({
              ...linkStyle,
              ...(isActive ? linkActiveStyle : undefined),
            })}
          >
            <item.icon size={iconSize} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div style={bottomStyle}>
        <button
          type="button"
          onClick={() => { navigate('/'); if (isMobile) close(); }}
          style={bottomBtnStyle}
        >
          <ArrowLeft size={is4K ? 20 : 16} />
          Voir le site
        </button>
        <button type="button" onClick={handleSignOut} style={signOutBtnStyle}>
          <LogOut size={is4K ? 20 : 16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
