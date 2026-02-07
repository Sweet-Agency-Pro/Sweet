/**
 * Contact Section Styles
 * Glassmorphism design with premium UX
 * Fully responsive from mobile to 5K displays
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
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    overflow: 'hidden',
    background: gradients.heroBackground,
    minHeight: '100vh',
  },
  sectionMobile: {
    paddingTop: spacing[16],
    paddingBottom: spacing[16],
    minHeight: 'auto',
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.teal[500], 0.08)} 1px, transparent 1px)`,
    backgroundSize: '2rem 2rem',
    pointerEvents: 'none',
  },
  backgroundBlob1: {
    position: 'absolute',
    top: '10%',
    left: '-10%',
    width: '30rem',
    height: '30rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.15),
    borderRadius: '50%',
    filter: 'blur(8rem)',
    pointerEvents: 'none',
  },
  backgroundBlob2: {
    position: 'absolute',
    bottom: '10%',
    right: '-10%',
    width: '25rem',
    height: '25rem',
    backgroundColor: hexToRgba(colors.purple[500], 0.1),
    borderRadius: '50%',
    filter: 'blur(8rem)',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '80rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    zIndex: 10,
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
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: spacing[16],
  },
  headerMobile: {
    marginBottom: spacing[10],
  },
  badge: {
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
    marginBottom: spacing[5],
  },
  badgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.teal[400],
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[300],
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[5],
  },
  titleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
  },
  description: {
    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
    color: colors.slate[400],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,  
    textAlign: 'center',
  },
};

// =============================================================================
// GRID LAYOUT STYLES
// =============================================================================
export const gridStyles: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: spacing[10],
    alignItems: 'start',
  },
  gridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[8],
  },
};

// =============================================================================
// GLASS CARD STYLES
// =============================================================================
export const glassCardStyles: Record<string, CSSProperties> = {
  glassCard: {
    position: 'relative',
    backgroundColor: hexToRgba(colors.white, 0.05),
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    borderRadius: borderRadius['2xl'],
    border: `1px solid ${hexToRgba(colors.white, 0.1)}`,
    overflow: 'hidden',
  },
  glassCardGlow: {
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    right: '-1px',
    bottom: '-1px',
    background: `linear-gradient(135deg, ${hexToRgba(colors.teal[500], 0.2)}, transparent, ${hexToRgba(colors.purple[500], 0.1)})`,
    borderRadius: borderRadius['2xl'],
    zIndex: -1,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
};

// =============================================================================
// CONTACT INFO STYLES
// =============================================================================
export const infoStyles: Record<string, CSSProperties> = {
  infoCard: {
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[8],
    height: '33.59rem',
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    margin: 0,
  },
  description: {
    fontSize: typography.fontSize.base,
    color: colors.slate[300],
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    padding: `${spacing[4]} ${spacing[5]}`,
    backgroundColor: hexToRgba(colors.white, 0.04),
    border: `1px solid ${hexToRgba(colors.white, 0.08)}`,
    borderRadius: borderRadius.xl,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  itemIcon: {
    width: spacing[10],
    height: spacing[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.lg,
    backgroundColor: hexToRgba(colors.teal[500], 0.12),
    color: colors.teal[300],
    flexShrink: 0,
  },
  itemContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  },
  itemLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.slate[400],
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
  },
  itemValue: {
    fontSize: typography.fontSize.base,
    color: colors.white,
    fontWeight: typography.fontWeight.medium,
  },
};

// =============================================================================
// FORM STYLES
// =============================================================================
export const formStyles: Record<string, CSSProperties> = {
  formCard: {
    padding: spacing[8],
  },
  formCardMobile: {
    padding: spacing[6],
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[4],
  },
  formRowMobile: {
    gridTemplateColumns: '1fr',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.slate[300],
  },
  input: {
    width: '100%',
    padding: spacing[4],
    backgroundColor: hexToRgba(colors.white, 0.05),
    border: `1px solid ${hexToRgba(colors.white, 0.1)}`,
    borderRadius: borderRadius.xl,
    fontSize: typography.fontSize.base,
    color: colors.white,
    outline: 'none',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  inputFocus: {
    borderColor: colors.teal[500],
    backgroundColor: hexToRgba(colors.white, 0.08),
    boxShadow: `0 0 0 3px ${hexToRgba(colors.teal[500], 0.15)}`,
  },
  inputError: {
    borderColor: '#ef4444',
    backgroundColor: hexToRgba('#ef4444', 0.05),
  },
  textarea: {
    width: '100%',
    padding: spacing[4],
    backgroundColor: hexToRgba(colors.white, 0.05),
    border: `1px solid ${hexToRgba(colors.white, 0.1)}`,
    borderRadius: borderRadius.xl,
    fontSize: typography.fontSize.base,
    color: colors.white,
    outline: 'none',
    resize: 'vertical',
    minHeight: '10rem',
    fontFamily: 'inherit',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  errorMessage: {
    fontSize: typography.fontSize.xs,
    color: '#ef4444',
    marginTop: spacing[1],
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    width: '100%',
    padding: spacing[4],
    background: gradients.tealCyan,
    border: 'none',
    borderRadius: borderRadius.xl,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
    cursor: 'pointer',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    marginTop: spacing[2],
  },
  submitButtonHover: {
    background: gradients.tealCyanDark,
    transform: 'translateY(-0.125rem)',
    boxShadow: `0 0.5rem 1.5rem -0.25rem ${hexToRgba(colors.teal[500], 0.4)}`,
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
  submitIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  loadingSpinner: {
    width: spacing[5],
    height: spacing[5],
    border: `2px solid ${hexToRgba(colors.white, 0.3)}`,
    borderTopColor: colors.white,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

// =============================================================================
// FEEDBACK STYLES
// =============================================================================
export const feedbackStyles: Record<string, CSSProperties> = {
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: hexToRgba('#22c55e', 0.15),
    border: `1px solid ${hexToRgba('#22c55e', 0.3)}`,
    borderRadius: borderRadius.xl,
    marginTop: spacing[4],
  },
  successIcon: {
    width: spacing[6],
    height: spacing[6],
    color: '#22c55e',
    flexShrink: 0,
  },
  successText: {
    fontSize: typography.fontSize.sm,
    color: '#86efac',
    fontWeight: typography.fontWeight.medium,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: hexToRgba('#ef4444', 0.15),
    border: `1px solid ${hexToRgba('#ef4444', 0.3)}`,
    borderRadius: borderRadius.xl,
    marginTop: spacing[4],
  },
  errorIcon: {
    width: spacing[6],
    height: spacing[6],
    color: '#ef4444',
    flexShrink: 0,
  },
  errorText: {
    fontSize: typography.fontSize.sm,
    color: '#fca5a5',
    fontWeight: typography.fontWeight.medium,
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...headerStyles,
  ...gridStyles,
  ...glassCardStyles,
  ...infoStyles,
  ...formStyles,
  ...feedbackStyles,
};
