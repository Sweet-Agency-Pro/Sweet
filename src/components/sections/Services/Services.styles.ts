/**
 * Services Section Styles
 * Separated style definitions for the Services section
 */

import { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

// =============================================================================
// SECTION & CONTAINER STYLES
// =============================================================================
export const containerStyles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    paddingTop: spacing[20],
    paddingBottom: spacing[24],
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  container: {
    position: 'relative',
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
  },
  containerMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
};

// =============================================================================
// HEADER STYLES
// =============================================================================
export const headerStyles: Record<string, CSSProperties> = {
  header: {
    textAlign: 'center',
    maxWidth: '56rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
    marginBottom: spacing[20],
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  badgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.teal[600],
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[700],
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.tight,
    margin: 0,
  },
  titleMobile: {
    fontSize: typography.fontSize['3xl'],
  },
  titleTablet: {
    fontSize: typography.fontSize['4xl'],
  },
  titleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.tealCyan,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  descriptionMobile: {
    fontSize: typography.fontSize.base,
    maxWidth: '100%',
  },
};

// =============================================================================
// GRID STYLES
// =============================================================================
export const gridStyles: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[8],
    marginBottom: spacing[16],
  },
  gridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  gridTablet: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[6],
  },
};

// =============================================================================
// CARD STYLES
// =============================================================================
export const cardStyles: Record<string, CSSProperties> = {
  cardWrapper: {
    position: 'relative',
    perspective: '62.5rem',
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  cardWrapperHovered: {
    transform: 'translateY(-0.5rem)',
  },
  cardGlow: {
    position: 'absolute',
    top: '-0.5rem',
    right: '-0.5rem',
    bottom: '-0.5rem',
    left: '-0.5rem',
    borderRadius: borderRadius['2xl'],
    filter: 'blur(1.5rem)',
    zIndex: 0,
    transition: `opacity ${transitions.duration.slow} ${transitions.timing.ease}`,
  },
  cardInner: {
    position: 'relative',
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    zIndex: 1,
  },
  cardInnerMobile: {
    padding: spacing[4],
    gap: spacing[3],
  },
  iconContainer: {
    width: spacing[11],
    height: spacing[11],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid`,
  },
  iconContainerMobile: {
    width: spacing[9],
    height: spacing[9],
  },
  icon: {
    width: spacing[5],
    height: spacing[5],
  },
  iconMobile: {
    width: spacing[4],
    height: spacing[4],
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  cardTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  cardTitleMobile: {
    fontSize: typography.fontSize.lg,
  },
  cardTagline: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.semibold,
    margin: 0,
  },
  cardTaglineMobile: {
    fontSize: typography.fontSize.xs,
  },
  cardResume: {
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    overflow: 'hidden',
  },
  resumeText: {
    fontSize: typography.fontSize.xs,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[2],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  featuresMobile: {
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[1.5],
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  featureDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: borderRadius.full,
    flexShrink: 0,
  },
  featureText: {
    fontSize: typography.fontSize.xs,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
  },
  cardFooter: {
    borderTop: `1px solid`,
    paddingTop: spacing[3],
    marginTop: spacing[1],
    transition: `border-color ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  learnMoreButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    padding: 0,
  },
  arrowIcon: {
    width: spacing[4],
    height: spacing[4],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
};

// =============================================================================
// CTA SECTION STYLES
// =============================================================================
export const ctaStyles: Record<string, CSSProperties> = {
  ctaSection: {
    backgroundColor: colors.slate[50],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[12],
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: spacing[8],
    alignItems: 'center',
  },
  ctaSectionMobile: {
    gridTemplateColumns: '1fr',
    textAlign: 'center',
    gap: spacing[6],
  },
  ctaContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  ctaTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  ctaTitleMobile: {
    fontSize: typography.fontSize.xl,
  },
  ctaDescription: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  ctaButton: {
    position: 'relative',
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    whiteSpace: 'nowrap',
  },
  ctaButtonMobile: {
    width: '100%',
    minHeight: spacing[11],
  },
  ctaButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.xl,
  },
  ctaButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyanDark,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  ctaButtonContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
  ctaButtonIcon: {
    width: spacing[5],
    height: spacing[5],
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...headerStyles,
  ...gridStyles,
  ...cardStyles,
  ...ctaStyles,
};

// =============================================================================
// THEME COLORS EXPORT (for dynamic styling)
// =============================================================================
export { colors, hexToRgba };
