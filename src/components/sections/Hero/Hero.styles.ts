/**
 * Hero Styles
 * Separated style definitions for the Hero section
 */

import { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

// =============================================================================
// CONTAINER STYLES
// =============================================================================
export const containerStyles: Record<string, CSSProperties> = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: gradients.heroBackground,
  },
  main: {
    position: 'relative',
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[32],
    paddingBottom: spacing[24],
  },
  mainMobile: {
    paddingTop: spacing[16],
    paddingBottom: spacing[16],
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[20],
    alignItems: 'center',
  },
  gridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[10],
  },
};

// =============================================================================
// BACKGROUND BLOB STYLES
// =============================================================================
export const backgroundStyles: Record<string, CSSProperties> = {
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  bgBlob1: {
    position: 'absolute',
    top: '25%',
    left: '-8rem',
    width: '24rem',
    height: '24rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.2),
    borderRadius: '50%',
    filter: 'blur(7.5rem)',
  },
  bgBlob1Mobile: {
    width: '16rem',
    height: '16rem',
    left: '-4rem',
  },
  bgBlob2: {
    position: 'absolute',
    top: '33%',
    right: '25%',
    width: '31.25rem',
    height: '31.25rem',
    backgroundColor: hexToRgba(colors.slate[600], 0.15),
    borderRadius: '50%',
    filter: 'blur(8.75rem)',
  },
  bgBlob2Mobile: {
    width: '20rem',
    height: '20rem',
    right: '-5rem',
  },
  bgBlob3: {
    position: 'absolute',
    bottom: '25%',
    right: '33%',
    width: '20rem',
    height: '20rem',
    backgroundColor: hexToRgba(colors.purple[500], 0.1),
    borderRadius: '50%',
    filter: 'blur(6.25rem)',
  },
};

// =============================================================================
// CONTENT STYLES
// =============================================================================
export const contentStyles: Record<string, CSSProperties> = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[8],
    zIndex: 10,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
  },
  title: {
    fontSize: typography.fontSize['7xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: typography.letterSpacing.normal,
    margin: 0,
  },
  titleMobile: {
    marginTop: spacing[16],
    fontSize: typography.fontSize['6xl'],
  },
  titleTablet: {
    fontSize: typography.fontSize['5xl'],
  },
  titleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: `linear-gradient(to right, ${colors.teal[300]}, ${colors.cyan[300]}, ${colors.blue[300]})`,
  },
  description: {
    fontSize: typography.fontSize.xl,
    color: colors.slate[300],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    maxWidth: '28rem',
    margin: 0,
  },
  descriptionMobile: {
    fontSize: typography.fontSize.lg,
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

// =============================================================================
// BUTTON STYLES
// =============================================================================
export const buttonStyles: Record<string, CSSProperties> = {
  buttonContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[4],
  },
  buttonContainerMobile: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing[3],
  },
  primaryButton: {
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
  },
  primaryButtonMobile: {
    minHeight: spacing[11],
  },
  primaryButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.75rem)',
    WebkitBackdropFilter: 'blur(0.75rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius.xl,
  },
  primaryButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to right, ${hexToRgba(colors.teal[500], 0.2)}, ${hexToRgba(colors.cyan[500], 0.2)})`,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
    borderRadius: borderRadius.xl,
  },
  primaryButtonContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
  buttonIcon: {
    width: spacing[5],
    height: spacing[5],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  secondaryButton: {
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    color: colors.slate[300],
    fontWeight: typography.fontWeight.semibold,
    transition: `color ${transitions.duration.medium} ${transitions.timing.ease}`,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    fontSize: typography.fontSize.base,
  },
  secondaryButtonMobile: {
    minHeight: spacing[11],
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...backgroundStyles,
  ...contentStyles,
  ...buttonStyles,
};
