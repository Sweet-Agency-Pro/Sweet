/**
 * GlassCards Styles
 * Separated style definitions for the 3D glassmorphism cards
 */

import { CSSProperties } from 'react';
import theme from '../../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, hexToRgba } = theme;

// =============================================================================
// CODE COLORS
// =============================================================================
export const codeColors = {
  purple: colors.purple[400],
  cyan: colors.cyan[300],
  yellow: '#fde047',
  green: '#4ade80',
};

// =============================================================================
// CONTAINER STYLES
// =============================================================================
export const containerStyles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    height: 'clamp(20rem, 40vw, 28rem)',
    perspective: '62.5rem',
    width: '100%',
    maxWidth: '32rem',
  },
  containerMobile: {
    height: 'auto',
    perspective: 'none',
    marginTop: spacing[20],
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
    maxWidth: '100%',
  },
  cardsWrapper: {
    position: 'absolute',
    top: 'clamp(4rem, 10vw, 8rem)',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardsWrapperMobile: {
    position: 'relative',
    top: 0,
  },
  cardsContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '28rem',
    transformStyle: 'preserve-3d',
  },
  cardsContainerMobile: {
    position: 'relative',
    maxWidth: '100%',
    height: '14rem',
  },
};

// =============================================================================
// CARD BASE STYLES
// =============================================================================
export const cardBaseStyles: Record<string, CSSProperties> = {
  cardMobile: {
    height: '14rem',
  },
  cardInnerMobile: {},
  cardLabelMobile: {},
  cardLabel: {
    position: 'absolute',
    bottom: spacing[6],
    left: spacing[6],
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.slate[400],
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardLabelLight: {
    position: 'absolute',
    bottom: spacing[6],
    left: spacing[6],
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: hexToRgba(colors.white, 0.5),
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
};

// =============================================================================
// BACKEND CARD STYLES
// =============================================================================
export const backendCardStyles: Record<string, CSSProperties> = {
  cardBackend: {
    position: 'absolute',
    width: '100%',
    height: 'clamp(14rem, 18vw, 18rem)',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(-6rem) rotateX(3deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardBackendInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.slate[800], 0.9)}, ${hexToRgba(colors.slate[900], 0.9)})`,
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    boxShadow: '0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)',
  },
  codeContent: {
    padding: spacing[6],
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.relaxed,
  },
  codeLine: {
    marginBottom: spacing[1],
  },
  codeLineIndent: {
    paddingLeft: spacing[4],
    marginBottom: spacing[1],
  },
  codeComment: {
    marginTop: spacing[4],
  },
};

// =============================================================================
// ARCHITECTURE CARD STYLES
// =============================================================================
export const architectureCardStyles: Record<string, CSSProperties> = {
  cardArchitecture: {
    position: 'absolute',
    width: '100%',
    height: 'clamp(14rem, 18vw, 18rem)',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(-3rem) rotateY(2deg) rotateX(3deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardArchitectureInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.white, 0.05),
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    boxShadow: '0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)',
  },
  archContent: {
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  archHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  archHeaderBar1: {
    height: spacing[3],
    width: spacing[32],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.default,
  },
  archHeaderBar2: {
    height: spacing[2],
    width: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archGrid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[3],
  },
  archGrid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
  },
  archBox: {
    height: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  archBoxSmall: {
    height: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  archLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  archLine1: {
    height: spacing[2],
    width: '100%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archLine2: {
    height: spacing[2],
    width: '83%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archLine3: {
    height: spacing[2],
    width: '66%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
};

// =============================================================================
// FRONTEND CARD STYLES
// =============================================================================
export const frontendCardStyles: Record<string, CSSProperties> = {
  cardFrontend: {
    position: 'absolute',
    width: '100%',
    height: 'clamp(14rem, 18vw, 18rem)',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(0) rotateY(-4deg) rotateX(3deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardFrontendInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    boxShadow: '0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)',
  },
  cardFrontendGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.teal[500], 0.1)}, transparent, ${hexToRgba(colors.purple[500], 0.1)})`,
  },
  frontendContent: {
    position: 'relative',
    height: '100%',
    padding: spacing[6],
  },
  frontendHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  frontendHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  frontendAvatar: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: '50%',
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
  },
  frontendAvatarText: {
    display: 'flex',
    flexDirection: 'column',
  },
  frontendAvatarBar1: {
    height: spacing[2],
    width: spacing[20],
    backgroundColor: hexToRgba(colors.white, 0.4),
    borderRadius: borderRadius.default,
    marginBottom: spacing[1],
  },
  frontendAvatarBar2: {
    height: spacing[1.5],
    width: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.default,
  },
  frontendDots: {
    display: 'flex',
    gap: spacing[1],
  },
  frontendDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: '50%',
    backgroundColor: hexToRgba(colors.white, 0.3),
  },
  frontendBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  frontendCard: {
    background: `linear-gradient(to right, ${hexToRgba(colors.teal[400], 0.2)}, ${hexToRgba(colors.cyan[400], 0.2)})`,
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  frontendCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  frontendCardHeaderBar1: {
    height: spacing[2],
    width: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.5),
    borderRadius: borderRadius.default,
  },
  frontendCardHeaderBar2: {
    height: spacing[2],
    width: spacing[12],
    backgroundColor: hexToRgba(colors.teal[300], 0.5),
    borderRadius: borderRadius.default,
  },
  frontendCardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
  },
  frontendCardBox: {
    height: spacing[12],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.lg,
  },
  frontendMiniCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[3],
  },
  frontendMiniCard: {
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  frontendMiniCardBar: {
    height: spacing[2],
    width: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.4),
    borderRadius: borderRadius.default,
    marginBottom: spacing[2],
  },
  frontendMiniCardGradient1: {
    height: spacing[8],
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.cyan[400], 0.3)}, ${hexToRgba(colors.teal[400], 0.3)})`,
    borderRadius: borderRadius.default,
  },
  frontendMiniCardGradient2: {
    height: spacing[8],
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.purple[400], 0.3)}, ${hexToRgba(colors.purple[300], 0.3)})`,
    borderRadius: borderRadius.default,
  },
  frontendFooter: {
    display: 'flex',
    gap: spacing[2],
  },
  frontendFooterBar: {
    flex: 1,
    height: spacing[8],
    background: `linear-gradient(to right, ${hexToRgba(colors.teal[400], 0.3)}, ${hexToRgba(colors.cyan[400], 0.3)})`,
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
  },
  frontendFooterBox: {
    width: spacing[8],
    height: spacing[8],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...cardBaseStyles,
  ...backendCardStyles,
  ...architectureCardStyles,
  ...frontendCardStyles,
};
