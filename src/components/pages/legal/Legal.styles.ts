/**
 * Legal Pages Styles
 * Shared styles for Mentions Légales & Politique de Confidentialité
 * Light section design — consistent with Services / Portfolio
 */

import { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, gradients, hexToRgba } = theme;

// =============================================================================
// LAYOUT STYLES
// =============================================================================
export const layoutStyles: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.slate[50],
  },
  heroBar: {
    position: 'relative',
    overflow: 'hidden',
    background: gradients.heroBackground,
    paddingTop: spacing[32],
    paddingBottom: spacing[16],
  },
  heroBarMobile: {
    paddingTop: spacing[24],
    paddingBottom: spacing[12],
  },
  heroTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.teal[500], 0.08)} 1px, transparent 1px)`,
    backgroundSize: '2rem 2rem',
    pointerEvents: 'none',
  },
  heroBlob1: {
    position: 'absolute',
    top: '20%',
    left: '-6rem',
    width: '20rem',
    height: '20rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.15),
    borderRadius: '50%',
    filter: 'blur(6rem)',
    pointerEvents: 'none',
  },
  heroBlob2: {
    position: 'absolute',
    bottom: '10%',
    right: '-4rem',
    width: '16rem',
    height: '16rem',
    backgroundColor: hexToRgba(colors.purple[500], 0.08),
    borderRadius: '50%',
    filter: 'blur(5rem)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    maxWidth: '56rem',
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
  heroTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    marginBottom: spacing[5],
  },
  heroTitleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
  },
  heroDescription: {
    fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
    color: colors.slate[400],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    maxWidth: '40rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  accentLine: {
    height: '3px',
    backgroundImage: gradients.primary,
  },
};

// =============================================================================
// CONTENT STYLES
// =============================================================================
export const contentStyles: Record<string, CSSProperties> = {
  main: {
    flex: 1,
    position: 'relative',
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.25)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '52rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: spacing[16],
    paddingBottom: spacing[20],
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    zIndex: 1,
  },
  containerMobile: {
    paddingTop: spacing[10],
    paddingBottom: spacing[14],
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
};

// =============================================================================
// ARTICLE STYLES
// =============================================================================
export const articleStyles: Record<string, CSSProperties> = {
  article: {
    marginBottom: spacing[10],
  },
  articleTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
    marginBottom: spacing[4],
    lineHeight: typography.lineHeight.snug,
  },
  articleTitleMobile: {
    fontSize: typography.fontSize.xl,
  },
  articleTitleDecoration: {
    display: 'block',
    width: spacing[10],
    height: '3px',
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.full,
    marginBottom: spacing[5],
  },
  paragraph: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    marginBottom: spacing[4],
    fontWeight: typography.fontWeight.light,
  },
  strong: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[700],
  },
  list: {
    margin: 0,
    marginBottom: spacing[4],
    paddingLeft: spacing[5],
    listStyleType: 'none',
  },
  listItem: {
    position: 'relative',
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    lineHeight: typography.lineHeight.loose,
    fontWeight: typography.fontWeight.light,
    paddingLeft: spacing[4],
  },
  listBullet: {
    position: 'absolute',
    left: 0,
    top: '0.7em',
    width: spacing[2],
    height: spacing[2],
    borderRadius: borderRadius.full,
    backgroundImage: gradients.tealCyan,
    flexShrink: 0,
  },
  infoCard: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    marginBottom: spacing[4],
  },
  infoRow: {
    display: 'flex',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  infoLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[500],
    fontWeight: typography.fontWeight.medium,
    minWidth: '7rem',
  },
  infoValue: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.normal,
  },
  placeholderValue: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[600],
    fontWeight: typography.fontWeight.medium,
    backgroundColor: colors.teal[50],
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[0.5],
    paddingBottom: spacing[0.5],
    borderRadius: borderRadius.md,
  },
  lastUpdated: {
    textAlign: 'center',
    fontSize: typography.fontSize.sm,
    color: colors.slate[400],
    fontWeight: typography.fontWeight.light,
    marginTop: spacing[12],
    paddingTop: spacing[6],
    borderTop: `1px solid ${colors.slate[200]}`,
  },
};

// =============================================================================
// BACK LINK STYLES
// =============================================================================
export const navStyles: Record<string, CSSProperties> = {
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    color: colors.slate[300],
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing[8],
  },
  backIcon: {
    width: spacing[4],
    height: spacing[4],
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...layoutStyles,
  ...contentStyles,
  ...articleStyles,
  ...navStyles,
};
