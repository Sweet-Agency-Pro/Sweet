/**
 * Footer Styles
 * Light footer — contrasts with the dark Contact section above
 * Uses the same design language as Services / Portfolio (light sections)
 */

import { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

// =============================================================================
// CONTAINER STYLES
// =============================================================================
export const containerStyles: Record<string, CSSProperties> = {
  footer: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  topAccent: {
    height: '3px',
    backgroundImage: gradients.primary,
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.3)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  glowOrb: {
    position: 'absolute',
    width: '20rem',
    height: '20rem',
    right: '-8rem',
    top: '-8rem',
    borderRadius: '50%',
    backgroundColor: hexToRgba(colors.teal[400], 0.08),
    filter: 'blur(5rem)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: spacing[12],
    paddingBottom: spacing[8],
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    zIndex: 1,
  },
  contentMobile: {
    paddingTop: spacing[10],
    paddingBottom: spacing[6],
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
};

// =============================================================================
// TOP ROW STYLES
// =============================================================================
export const topRowStyles: Record<string, CSSProperties> = {
  topRow: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr',
    gap: spacing[8],
    alignItems: 'start',
    marginBottom: spacing[8],
  },
  topRowTablet: {
    gridTemplateColumns: '1fr 1fr',
    rowGap: spacing[7],
  },
  topRowMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  sectionTitle: {
    margin: 0,
    marginBottom: spacing[3],
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
    color: colors.slate[500],
  },
};

// =============================================================================
// BRAND STYLES
// =============================================================================
export const brandStyles: Record<string, CSSProperties> = {
  brandWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  logoPill: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[11],
    height: spacing[11],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
  },
  logoIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.teal[600],
  },
  brandName: {
    margin: 0,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    letterSpacing: typography.letterSpacing.wider,
  },
  brandDescription: {
    margin: 0,
    maxWidth: '30rem',
    color: colors.slate[500],
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.relaxed,
    fontWeight: typography.fontWeight.light,
  },
};

// =============================================================================
// LINKS STYLES
// =============================================================================
export const linksStyles: Record<string, CSSProperties> = {
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  linkItem: {
    color: colors.slate[600],
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: `color ${transitions.duration.medium} ${transitions.timing.ease}`,
    width: 'fit-content',
  },
  contactText: {
    margin: 0,
    color: colors.slate[600],
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.relaxed,
  },
  ctaButton: {
    marginTop: spacing[2],
    width: 'fit-content',
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
    paddingTop: spacing[2.5],
    paddingBottom: spacing[2.5],
    borderRadius: borderRadius.lg,
    border: 'none',
    backgroundImage: gradients.tealCyan,
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
  },
};

// =============================================================================
// BOTTOM BAR STYLES
// =============================================================================
export const bottomStyles: Record<string, CSSProperties> = {
  bottomBar: {
    borderTop: `1px solid ${colors.slate[200]}`,
    paddingTop: spacing[5],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing[4],
  },
  bottomBarMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  copyright: {
    margin: 0,
    color: colors.slate[400],
    fontSize: typography.fontSize.sm,
  },
  legalLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[5],
  },
  legalLink: {
    color: colors.slate[400],
    textDecoration: 'none',
    fontSize: typography.fontSize.xs,
    letterSpacing: typography.letterSpacing.wide,
    textTransform: 'uppercase',
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...topRowStyles,
  ...brandStyles,
  ...linksStyles,
  ...bottomStyles,
};
