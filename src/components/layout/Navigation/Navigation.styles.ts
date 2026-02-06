/**
 * Navigation Styles
 * Separated style definitions for the Navigation component
 */

import type { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, hexToRgba, gradients } = theme;

// =============================================================================
// NAVBAR STYLES
// =============================================================================
export const navStyles: Record<string, CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  navTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  navActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(0.75rem)',
    WebkitBackdropFilter: 'blur(0.75rem)',
    boxShadow: '0 0.125rem 1rem rgba(0, 0, 0, 0.08)',
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
};

// =============================================================================
// LOGO STYLES
// =============================================================================
export const logoStyles: Record<string, CSSProperties> = {
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logoIconWrapper: {
    position: 'relative',
  },
  logoIconGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
    filter: 'blur(1rem)',
    opacity: 0.5,
  },
  logoIconGlowDark: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
    filter: 'blur(1rem)',
    opacity: 0.3,
  },
  logoIconInner: {
    position: 'relative',
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    padding: spacing[2],
    borderRadius: borderRadius.lg,
  },
  logoIconInnerDark: {
    position: 'relative',
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    padding: spacing[2],
    borderRadius: borderRadius.lg,
  },
  logoIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.white,
    transition: 'color 0.3s ease',
  },
  logoIconScrolled: {
    color: colors.teal[600],
  },
  logoIconInnerScrolled: {
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
  },
  logoIconDark: {
    width: spacing[6],
    height: spacing[6],
    color: colors.teal[600],
  },
  logoText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    letterSpacing: typography.letterSpacing.wider,
    transition: 'color 0.3s ease',
  },
  logoTextScrolled: {
    color: colors.slate[900],
  },
  logoTextDark: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    letterSpacing: typography.letterSpacing.wider,
  },
};

// =============================================================================
// DESKTOP NAV LINKS STYLES
// =============================================================================
export const navLinksStyles: Record<string, CSSProperties> = {
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
  },
  navLink: {
    color: colors.slate[300],
    fontWeight: typography.fontWeight.medium,
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    fontSize: typography.fontSize.base,
  },
  navLinkScrolled: {
    color: colors.slate[600],
  },
};

// =============================================================================
// CTA BUTTON STYLES
// =============================================================================
export const ctaStyles: Record<string, CSSProperties> = {
  ctaButton: {
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[2.5],
    paddingBottom: spacing[2.5],
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius.lg,
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontSize: typography.fontSize.base,
  },
  ctaButtonScrolled: {
    backgroundImage: gradients.primary,
    border: 'none',
    color: colors.white,
    boxShadow: `0 0.25rem 0.75rem ${hexToRgba(colors.teal[500], 0.3)}`,
  },
};

// =============================================================================
// BURGER BUTTON STYLES
// =============================================================================
export const burgerStyles: Record<string, CSSProperties> = {
  burgerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[11],
    height: spacing[11],
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  burgerButtonScrolled: {
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
  },
  burgerIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.white,
    transition: 'color 0.3s ease',
  },
  burgerIconScrolled: {
    color: colors.teal[600],
  },
};

// =============================================================================
// DRAWER STYLES
// =============================================================================
export const drawerStyles: Record<string, CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba(colors.slate[900], 0.5),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    zIndex: 998,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85vw',
    maxWidth: '22rem',
    backgroundColor: colors.white,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing[6],
    boxShadow: `-1.5rem 0 3rem ${hexToRgba(colors.slate[900], 0.2)}`,
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: spacing[5],
    right: spacing[5],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[11],
    height: spacing[11],
    backgroundColor: colors.slate[100],
    border: 'none',
    borderRadius: borderRadius.full,
    cursor: 'pointer',
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
  },
  closeIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.slate[600],
  },
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[8],
    marginBottom: spacing[10],
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  drawerLink: {
    display: 'block',
    padding: spacing[4],
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[700],
    textDecoration: 'none',
    borderRadius: borderRadius.lg,
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
    minHeight: spacing[11],
  },
  drawerCta: {
    marginTop: 'auto',
    paddingTop: spacing[8],
  },
  drawerCtaButton: {
    width: '100%',
    padding: spacing[4],
    backgroundImage: gradients.primary,
    border: 'none',
    borderRadius: borderRadius.xl,
    cursor: 'pointer',
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
    minHeight: spacing[11],
  },
  drawerCtaText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  drawerContact: {
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTop: `1px solid ${colors.slate[200]}`,
  },
  drawerContactText: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[500],
    margin: 0,
    marginBottom: spacing[2],
  },
};

// Merged styles for backward compatibility
export const styles = {
  ...navStyles,
  ...logoStyles,
  ...navLinksStyles,
  ...ctaStyles,
  ...burgerStyles,
  ...drawerStyles,
};

export default styles;
