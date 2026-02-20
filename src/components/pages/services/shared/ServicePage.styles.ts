/**
 * Service Page — Shared Styles
 * Reusable style definitions for all service detail pages.
 * Each page can override or extend these via its own style file.
 */

import { CSSProperties } from 'react';
import theme from '../../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

// =============================================================================
// PAGE LAYOUT
// =============================================================================
export const layoutStyles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
};

// =============================================================================
// HERO SECTION
// =============================================================================
export const heroStyles: Record<string, CSSProperties> = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    background: gradients.heroBackground,
    paddingTop: spacing[36],
    paddingBottom: spacing[20],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  heroMobile: {
    paddingTop: spacing[28],
    paddingBottom: spacing[14],
    minHeight: '50vh',
  },
  heroTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.teal[500], 0.06)} 1px, transparent 1px)`,
    backgroundSize: '2rem 2rem',
    pointerEvents: 'none',
  },
  heroBlob1: {
    position: 'absolute',
    top: '15%',
    left: '-8rem',
    width: '28rem',
    height: '28rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.12),
    borderRadius: '50%',
    filter: 'blur(7rem)',
    pointerEvents: 'none',
  },
  heroBlob2: {
    position: 'absolute',
    bottom: '10%',
    right: '-6rem',
    width: '22rem',
    height: '22rem',
    backgroundColor: hexToRgba(colors.purple[500], 0.08),
    borderRadius: '50%',
    filter: 'blur(6rem)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '60rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    textAlign: 'center',
    zIndex: 1,
  },
  heroContentMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    backgroundColor: hexToRgba(colors.teal[500], 0.15),
    border: `1px solid ${hexToRgba(colors.teal[400], 0.3)}`,
    borderRadius: borderRadius.full,
    marginBottom: spacing[6],
  },
  heroBadgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.teal[400],
  },
  heroBadgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[300],
    fontWeight: typography.fontWeight.semibold,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[6],
  },
  heroTitleMobile: {
    fontSize: 'clamp(2rem, 8vw, 3rem)',
  },
  heroTitleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
  },
  heroSubtitle: {
    fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
    color: colors.slate[300],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    maxWidth: '42rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: spacing[10],
  },
  heroSubtitleMobile: {
    fontSize: typography.fontSize.base,
    maxWidth: '100%',
  },
  heroCta: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  heroCtaMobile: {
    width: '100%',
    justifyContent: 'center',
    minHeight: spacing[12],
  },
  heroCtaBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.xl,
  },
  heroCtaHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyanDark,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  heroCtaContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
  heroCtaIcon: {
    width: spacing[5],
    height: spacing[5],
  },
};

// =============================================================================
// INTRO SECTION
// =============================================================================
export const introStyles: Record<string, CSSProperties> = {
  intro: {
    position: 'relative',
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    backgroundColor: colors.white,
  },
  introMobile: {
    paddingTop: spacing[14],
    paddingBottom: spacing[14],
  },
  introContainer: {
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    textAlign: 'center',
  },
  introContainerMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  introDecoration: {
    display: 'block',
    width: spacing[12],
    height: '3px',
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.full,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: spacing[8],
  },
  introTitle: {
    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[6],
  },
  introTitleMobile: {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
  },
  introText: {
    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  introTextMobile: {
    fontSize: typography.fontSize.base,
  },
};

// =============================================================================
// GUARANTEES / FEATURES BAND
// =============================================================================
export const guaranteesStyles: Record<string, CSSProperties> = {
  guarantees: {
    position: 'relative',
    paddingTop: spacing[20],
    paddingBottom: spacing[20],
    backgroundColor: colors.slate[50],
    overflow: 'hidden',
  },
  guaranteesMobile: {
    paddingTop: spacing[14],
    paddingBottom: spacing[14],
  },
  guaranteesTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.2)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  guaranteesContainer: {
    position: 'relative',
    maxWidth: '72rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    zIndex: 1,
  },
  guaranteesContainerMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  guaranteesHeader: {
    textAlign: 'center',
    marginBottom: spacing[14],
  },
  guaranteesHeaderMobile: {
    marginBottom: spacing[10],
  },
  guaranteesTitle: {
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[3],
  },
  guaranteesTitleMobile: {
    fontSize: 'clamp(1.5rem, 5vw, 1.75rem)',
  },
  guaranteesSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.slate[500],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  guaranteesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[8],
  },
  guaranteesGridTablet: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[6],
  },
  guaranteesGridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  guaranteeCard: {
    position: 'relative',
    backgroundColor: colors.white,
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  guaranteeCardMobile: {
    padding: spacing[6],
  },
  guaranteeIconWrap: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
  },
  guaranteeIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.teal[600],
  },
  guaranteeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  guaranteeText: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
};

// =============================================================================
// CTA BOTTOM BAND
// =============================================================================
export const ctaBottomStyles: Record<string, CSSProperties> = {
  ctaBottom: {
    position: 'relative',
    overflow: 'hidden',
    background: gradients.heroBackground,
    paddingTop: spacing[16],
    paddingBottom: spacing[16],
  },
  ctaBottomMobile: {
    paddingTop: spacing[12],
    paddingBottom: spacing[12],
  },
  ctaBottomTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.teal[500], 0.06)} 1px, transparent 1px)`,
    backgroundSize: '2rem 2rem',
    pointerEvents: 'none',
  },
  ctaBottomContainer: {
    position: 'relative',
    maxWidth: '56rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    textAlign: 'center',
    zIndex: 1,
  },
  ctaBottomTitle: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[4],
  },
  ctaBottomText: {
    fontSize: typography.fontSize.base,
    color: colors.slate[400],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    marginBottom: spacing[8],
    maxWidth: '34rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaBottomButton: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  ctaBottomButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.xl,
  },
  ctaBottomButtonContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
};

// =============================================================================
// MERGED EXPORT
// =============================================================================
export const sharedStyles: Record<string, CSSProperties> = {
  ...layoutStyles,
  ...heroStyles,
  ...introStyles,
  ...guaranteesStyles,
  ...ctaBottomStyles,
};

export { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba };
