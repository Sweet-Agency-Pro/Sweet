/**
 * Portfolio Section Styles
 * Separated style definitions for the Portfolio section
 */

import { CSSProperties } from 'react';
import theme from '../../../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, hexToRgba } = theme;

// =============================================================================
// SECTION & CONTAINER STYLES
// =============================================================================
export const containerStyles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    overflow: 'hidden',
    backgroundColor: colors.slate[50],
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.3)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '100rem',
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
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
    marginBottom: spacing[16],
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    backgroundColor: colors.blue[50],
    border: `1px solid ${colors.blue[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  badgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.blue[600],
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.blue[700],
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
    backgroundImage: `linear-gradient(to right, ${colors.blue[500]}, ${colors.purple[500]})`,
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
// FLAGSHIP CARD STYLES
// =============================================================================
export const flagshipStyles: Record<string, CSSProperties> = {
  flagshipCard: {
    position: 'relative',
    marginBottom: spacing[12],
    cursor: 'pointer',
  },
  flagshipCardMobile: {
    marginBottom: spacing[8],
  },
  flagshipGlow: {
    position: 'absolute',
    top: '-2rem',
    left: '-2rem',
    right: '-2rem',
    bottom: '-2rem',
    background: `linear-gradient(135deg, ${hexToRgba(colors.teal[500], 0.15)}, ${hexToRgba(colors.cyan[500], 0.1)})`,
    borderRadius: '3rem',
    filter: 'blur(2.5rem)',
    zIndex: 0,
  },
  flagshipInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: '2rem',
    border: `1px solid ${colors.slate[200]}`,
    
    // --- CORRECTIFS GPU (AJOUTÉS) ---
    overflow: 'hidden',
    transform: 'translateZ(0)', // Force le GPU
    willChange: 'transform, border-radius', // Optimisation
    // --------------------------------
    
    zIndex: 1,
    boxShadow: `0 0.625rem 2.5rem -0.5rem ${hexToRgba(colors.slate[900], 0.15)}, 0 0.25rem 1rem -0.25rem ${hexToRgba(colors.slate[900], 0.1)}`,
  },
  flagshipContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '28rem',
  },
  flagshipContentMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  flagshipLeft: {
    padding: spacing[12],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spacing[5],
  },
  productionTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    background: `linear-gradient(135deg, ${colors.teal[500]}, ${colors.cyan[500]})`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  tagIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.white,
  },
  flagshipTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    margin: 0,
    lineHeight: typography.lineHeight.tight,
  },
  flagshipTitleMobile: {
    fontSize: typography.fontSize['2xl'],
  },
  flagshipHook: {
    fontSize: typography.fontSize.xl,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  flagshipTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  flagshipTechRowMobile: {
    flexWrap: 'wrap',
  },
  techBadge: {
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.lg,
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
  },
  flagshipCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    background: `linear-gradient(135deg, ${colors.teal[500]}, ${colors.cyan[500]})`,
    borderRadius: borderRadius.xl,
    border: 'none',
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: spacing[2],
  },
  flagshipCtaMobile: {
    width: '100%',
    minHeight: spacing[11],
  },
  ctaIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  flagshipVisual: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colors.slate[100]}, ${colors.slate[50]})`,
    overflow: 'hidden',
  },
  flagshipGradientOrb: {
    position: 'absolute',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    filter: 'blur(5rem)',
    opacity: 0.4,
  },
  flagshipMockup: {
    position: 'relative',
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    boxShadow: `0 1.5625rem 3.125rem -0.75rem ${hexToRgba(colors.slate[900], 0.2)}`,
    overflow: 'hidden',
  },
};

// =============================================================================
// MOCKUP STYLES
// =============================================================================
export const mockupStyles: Record<string, CSSProperties> = {
  mockupHeader: {
    padding: spacing[3],
    backgroundColor: colors.slate[150],
    borderBottom: `1px solid ${colors.slate[200]}`,
  },
  mockupDots: {
    display: 'flex',
    gap: spacing[1.5],
  },
  mockupDot: {
    width: spacing[2.5],
    height: spacing[2.5],
    borderRadius: borderRadius.full,
  },
  mockupContent: {
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  mockupLine: {
    height: spacing[2],
    backgroundColor: colors.slate[200],
    borderRadius: borderRadius.sm,
    width: '80%',
  },
  mockupBlock: {
    height: spacing[16],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
    marginTop: spacing[2],
  },
};

// =============================================================================
// LAB HEADER STYLES
// =============================================================================
export const labStyles: Record<string, CSSProperties> = {
  labHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[8],
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.slate[200]}`,
  },
  labHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing[2],
  },
  labIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.purple[500],
  },
  labTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[500],
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  labTitleMobile: {
    fontSize: typography.fontSize.sm,
  },
};

// =============================================================================
// CONCEPTS GRID STYLES
// =============================================================================
export const conceptStyles: Record<string, CSSProperties> = {
  conceptsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[6],
  },
  conceptsGridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[4],
  },
  conceptsGridTablet: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[5],
  },
  conceptCard: {
    position: 'relative',
    cursor: 'pointer',
  },
  conceptInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: borderRadius['2xl'],
    border: `1px solid ${colors.slate[200]}`,
    padding: spacing[6],
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    
    // --- CORRECTIFS GPU (AJOUTÉS) ---
    overflow: 'hidden',
    transform: 'translateZ(0)',
    willChange: 'transform, border-radius',
    // --------------------------------

    boxShadow: `0 0.5rem 2rem -0.375rem ${hexToRgba(colors.slate[900], 0.12)}, 0 0.25rem 0.75rem -0.25rem ${hexToRgba(colors.slate[900], 0.08)}`,
  },
  conceptAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: spacing[1],
  },
  conceptTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingLeft: spacing[2.5],
    paddingRight: spacing[2.5],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  conceptTagIcon: {
    width: spacing[3],
    height: spacing[3],
    color: colors.slate[500],
  },
  conceptTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  conceptHook: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    flex: 1,
  },
  conceptTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[1.5],
  },
  conceptTechBadge: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[0.5],
    paddingBottom: spacing[0.5],
    backgroundColor: 'transparent',
    border: '1px solid',
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  conceptFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    paddingTop: spacing[2],
    borderTop: `1px solid ${colors.slate[100]}`,
  },
  conceptCta: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[600],
  },
  conceptCtaIcon: {
    width: spacing[4],
    height: spacing[4],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
};

// =============================================================================
// MODAL STYLES (CORRIGÉ ANIMATION BORDUR & 4K)
// =============================================================================
export const modalStyles: Record<string, CSSProperties> = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba(colors.slate[900], 0.7),
    backdropFilter: 'blur(0.5rem)',
    WebkitBackdropFilter: 'blur(0.5rem)',
    zIndex: 100,
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
    width: '90vw',
    maxWidth: '100rem',
    height: 'fit-content',
    maxHeight: '92vh',
    zIndex: 101,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  modalMobileContainer: {
    width: '95vw',
    maxHeight: '95vh',
  },
  modalInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: '2rem',
    
    // ON NETTOIE ICI : Pas de clipPath
    overflow: 'hidden',
    transform: 'translateZ(0)',
    willChange: 'transform, opacity, border-radius', 
    backfaceVisibility: 'hidden',

    boxShadow: `0 25px 50px -12px ${hexToRgba(colors.slate[900], 0.25)}`,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    pointerEvents: 'auto',
  },
  modalInnerMobile: {
    borderRadius: borderRadius.xl,
  },
  closeButton: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    width: spacing[10],
    height: spacing[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.full,
    cursor: 'pointer',
    zIndex: 50,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  closeIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.slate[600],
  },
  modalContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    
    // Sécurité supplémentaire : on s'assure que le contenu respecte la découpe
    borderRadius: 'inherit', 
    WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fix bug Safari overflow
  },
  modalContentMobile: {
    display: 'flex',
    flexDirection: 'column-reverse',
    overflowY: 'auto',
    maxHeight: '85vh',
  },
  modalInfo: {
    padding: spacing[10],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
    backgroundColor: colors.white,
  },
  modalConceptTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  modalTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    margin: 0,
    lineHeight: typography.lineHeight.tight,
  },
  modalHook: {
    fontSize: typography.fontSize.xl,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.snug,
    margin: 0,
  },
  modalStory: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  benefitBox: {
    position: 'relative',
    padding: spacing[5],
    backgroundColor: colors.teal[50],
    borderRadius: borderRadius.xl,
    borderLeft: `0.25rem solid ${colors.teal[500]}`,
  },
  quoteIcon: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    width: spacing[5],
    height: spacing[5],
    color: colors.teal[300],
  },
  benefitText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[800],
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    fontStyle: 'italic',
  },
  modalTechSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  techLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[500],
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  modalTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  modalTechBadge: {
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    border: '1px solid',
    borderRadius: borderRadius.lg,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  modalCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    border: 'none',
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  modalCtaIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  modalVisual: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colors.slate[100]}, ${colors.slate[50]})`,
    overflow: 'hidden',
    minHeight: '20rem',
    // Correction supplémentaire pour l'image qui pourrait passer par dessus le bord
    borderTopRightRadius: '2rem',
    borderBottomRightRadius: '2rem',
  },
  modalGradientOrb: {
    position: 'absolute',
    width: '24rem',
    height: '24rem',
    borderRadius: '50%',
    filter: 'blur(5rem)',
    opacity: 0.5,
  },
  modalMockup: {
    position: 'relative',
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    boxShadow: `0 1.5625rem 3.125rem -0.75rem ${hexToRgba(colors.slate[900], 0.25)}`,
    overflow: 'hidden',
  },
  modalMockupContent: {
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  mockupAccentBar: {
    height: spacing[1],
    borderRadius: borderRadius.full,
    marginBottom: spacing[2],
  },
  mockupBlockLarge: {
    height: spacing[24],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
    marginTop: spacing[2],
  },
  mockupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[3],
    marginTop: spacing[3],
  },
  mockupGridItem: {
    height: spacing[12],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
  },
};

// =============================================================================
// STATE STYLES (Loading, Error, Empty)
// =============================================================================
export const stateStyles: Record<string, CSSProperties> = {
  loadingSection: {
    paddingTop: spacing[8],
    paddingBottom: spacing[8],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
  },
  errorBox: {
    padding: spacing[6],
    backgroundColor: hexToRgba('#fee2e2', 0.95),
    border: `1px solid #fecaca`,
    color: '#991b1b',
    borderRadius: borderRadius.lg,
    marginBottom: spacing[6],
  },
  emptyBox: {
    padding: spacing[6],
    backgroundColor: colors.slate[50],
    border: `1px dashed ${colors.slate[200]}`,
    color: colors.slate[600],
    borderRadius: borderRadius.lg,
    marginBottom: spacing[6],
    textAlign: 'center',
  },
};

// =============================================================================
// MERGED STYLES EXPORT
// =============================================================================
export const styles: Record<string, CSSProperties> = {
  ...containerStyles,
  ...headerStyles,
  ...flagshipStyles,
  ...mockupStyles,
  ...labStyles,
  ...conceptStyles,
  ...modalStyles,
  ...stateStyles,
};

// =============================================================================
// THEME COLORS EXPORT
// =============================================================================
export { colors };
