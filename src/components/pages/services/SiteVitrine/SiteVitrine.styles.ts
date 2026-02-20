/**
 * SiteVitrine — Page-specific styles
 * Offering cards (One-Page vs Multi-Pages) section
 */

import { CSSProperties } from 'react';
import theme from '../../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

// =============================================================================
// OFFERING SECTION
// =============================================================================
export const offeringStyles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    backgroundColor: colors.slate[50],
    overflow: 'hidden',
  },
  sectionMobile: {
    paddingTop: spacing[14],
    paddingBottom: spacing[14],
  },
  texture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.18)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '72rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    zIndex: 1,
  },
  containerMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  header: {
    textAlign: 'center',
    marginBottom: spacing[14],
  },
  headerMobile: {
    marginBottom: spacing[10],
  },
  headerTitle: {
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[3],
  },
  headerTitleMobile: {
    fontSize: 'clamp(1.5rem, 5vw, 1.75rem)',
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.slate[500],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },

  // Grid for 2 cards side-by-side
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[8],
    alignItems: 'stretch',
  },
  gridTablet: {
    gap: spacing[6],
  },
  gridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },

  // Individual offering card
  card: {
    position: 'relative',
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    overflow: 'hidden',
  },
  cardMobile: {
    padding: spacing[6],
  },
  cardHovered: {
    borderColor: colors.teal[300],
    boxShadow: `0 0.5rem 2rem ${hexToRgba(colors.teal[500], 0.08)}`,
    transform: 'translateY(-0.25rem)',
  },

  // Top gradient line on each card
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    borderRadius: `${borderRadius['2xl']} ${borderRadius['2xl']} 0 0`,
  },
  cardAccentOnePage: {
    backgroundImage: gradients.tealCyan,
  },
  cardAccentMultiPage: {
    backgroundImage: gradients.bluePurple,
  },

  // Card icon
  cardIconWrap: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconWrapOnePage: {
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
  },
  cardIconWrapMultiPage: {
    backgroundColor: colors.blue[50],
    border: `1px solid ${colors.blue[200]}`,
  },
  cardIcon: {
    width: spacing[6],
    height: spacing[6],
  },
  cardIconOnePage: {
    color: colors.teal[600],
  },
  cardIconMultiPage: {
    color: colors.blue[600],
  },

  // Card typography
  cardLabel: {
    display: 'inline-block',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase' as const,
    margin: 0,
  },
  cardLabelOnePage: {
    color: colors.teal[600],
  },
  cardLabelMultiPage: {
    color: colors.blue[600],
  },
  cardTitle: {
    fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.snug,
    margin: 0,
  },
  cardDescription: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },

  // Key-points list
  pointsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[3],
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    marginTop: spacing[2],
  },
  pointItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
  },
  pointDot: {
    width: spacing[1.5],
    height: spacing[1.5],
    borderRadius: borderRadius.full,
    flexShrink: 0,
  },
  pointDotOnePage: {
    backgroundColor: colors.teal[500],
  },
  pointDotMultiPage: {
    backgroundColor: colors.blue[500],
  },

  // Divider inside card
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: colors.slate[100],
    margin: 0,
  },
};

// =============================================================================
// MERGED EXPORT
// =============================================================================
export const vitrinStyles: Record<string, CSSProperties> = {
  ...offeringStyles,
};
