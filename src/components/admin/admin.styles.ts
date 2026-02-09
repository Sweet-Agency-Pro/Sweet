/**
 * Admin Shared Styles
 * Reusable style objects for all admin pages — follows the site's visual DNA.
 * Supports responsive layouts: mobile, FHD, 4K/5K.
 */

import type { CSSProperties } from 'react';
import theme from '../../styles/theme';

// =============================================================================
// RESPONSIVE HELPERS
// =============================================================================
export interface AdminResponsive {
  isMobile: boolean;
  is4K: boolean;
}

/** Scale a rem value for 4K */
const s4K = (base: string, factor = 1.35): string => {
  const num = parseFloat(base);
  return `${(num * factor).toFixed(3)}rem`;
};

// =============================================================================
// GLASS PANEL
// =============================================================================
export const glassPanel: CSSProperties = {
  padding: theme.spacing[8],
  borderRadius: theme.borderRadius['2xl'],
  background: theme.hexToRgba(theme.colors.slate[900], 0.7),
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
};

export const glassPanelR = (r: AdminResponsive): CSSProperties => ({
  ...glassPanel,
  padding: r.isMobile ? theme.spacing[4] : r.is4K ? theme.spacing[12] : theme.spacing[8],
  borderRadius: r.isMobile ? theme.borderRadius.xl : theme.borderRadius['2xl'],
});

// =============================================================================
// STAT CARD
// =============================================================================
export const statCard: CSSProperties = {
  ...glassPanel,
  padding: theme.spacing[6],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing[2],
};

export const statCardR = (r: AdminResponsive): CSSProperties => ({
  ...glassPanelR(r),
  padding: r.isMobile ? theme.spacing[4] : r.is4K ? theme.spacing[8] : theme.spacing[6],
  display: 'flex',
  flexDirection: 'column',
  gap: r.is4K ? theme.spacing[3] : theme.spacing[2],
});

export const statValue: CSSProperties = {
  fontSize: theme.typography.fontSize['3xl'],
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.white,
};

export const statValueR = (r: AdminResponsive): CSSProperties => ({
  ...statValue,
  fontSize: r.isMobile ? theme.typography.fontSize['2xl'] : r.is4K ? theme.typography.fontSize['5xl'] : theme.typography.fontSize['3xl'],
});

export const statLabel: CSSProperties = {
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.slate[300],
};

export const statLabelR = (r: AdminResponsive): CSSProperties => ({
  ...statLabel,
  fontSize: r.is4K ? theme.typography.fontSize.lg : theme.typography.fontSize.sm,
});

// =============================================================================
// DATA TABLE
// =============================================================================
export const table: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

export const tableR = (r: AdminResponsive): CSSProperties => ({
  ...table,
  display: r.isMobile ? 'block' : 'table',
  overflowX: r.isMobile ? 'auto' : undefined,
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : undefined,
});

export const tableWrap = (r: AdminResponsive): CSSProperties => ({
  overflowX: r.isMobile ? 'auto' : undefined,
  WebkitOverflowScrolling: 'touch' as unknown as undefined,
});

export const tableHead: CSSProperties = {
  borderBottom: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
};

export const th: CSSProperties = {
  textAlign: 'left',
  padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
  color: theme.colors.slate[300],
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
};

export const thR = (r: AdminResponsive): CSSProperties => ({
  ...th,
  padding: r.isMobile
    ? `${theme.spacing[2]} ${theme.spacing[3]}`
    : r.is4K
      ? `${theme.spacing[4]} ${theme.spacing[6]}`
      : th.padding,
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : theme.typography.fontSize.sm,
  whiteSpace: r.isMobile ? 'nowrap' : undefined,
});

export const td: CSSProperties = {
  padding: `${theme.spacing[4]} ${theme.spacing[4]}`,
  color: theme.colors.slate[100],
  fontSize: theme.typography.fontSize.sm,
  borderBottom: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.25)}`,
};

export const tdR = (r: AdminResponsive): CSSProperties => ({
  ...td,
  padding: r.isMobile
    ? `${theme.spacing[3]} ${theme.spacing[3]}`
    : r.is4K
      ? `${theme.spacing[5]} ${theme.spacing[6]}`
      : td.padding,
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : theme.typography.fontSize.sm,
  whiteSpace: r.isMobile ? 'nowrap' : undefined,
});

// =============================================================================
// BADGES
// =============================================================================
export const badge = (color: string, r?: AdminResponsive): CSSProperties => ({
  display: 'inline-block',
  padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
  borderRadius: theme.borderRadius.full,
  fontSize: r?.is4K ? s4K(theme.typography.fontSize.xs) : theme.typography.fontSize.xs,
  fontWeight: theme.typography.fontWeight.medium,
  background: theme.hexToRgba(color, 0.15),
  color,
});

export const badgePublic = badge(theme.colors.teal[400]);
export const badgeDraft = badge(theme.colors.slate[400]);
export const badgeNew = badge('#f59e0b');
export const badgeArchived = badge(theme.colors.slate[500]);

// =============================================================================
// BUTTONS
// =============================================================================
const btnBase: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing[2],
  padding: `${theme.spacing[2.5]} ${theme.spacing[5]}`,
  borderRadius: theme.borderRadius.lg,
  border: 'none',
  cursor: 'pointer',
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
  transition: `all ${theme.transitions.duration.fast}`,
};

const btnBaseR = (r: AdminResponsive): CSSProperties => ({
  ...btnBase,
  padding: r.is4K
    ? `${theme.spacing[4]} ${theme.spacing[8]}`
    : btnBase.padding,
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : theme.typography.fontSize.sm,
});

export const btnPrimary: CSSProperties = {
  ...btnBase,
  background: theme.gradients.tealCyan,
  color: theme.colors.white,
};

export const btnPrimaryR = (r: AdminResponsive): CSSProperties => ({
  ...btnBaseR(r),
  background: theme.gradients.tealCyan,
  color: theme.colors.white,
});

export const btnDanger: CSSProperties = {
  ...btnBase,
  background: theme.hexToRgba('#ef4444', 0.15),
  color: '#f87171',
  border: `1px solid ${theme.hexToRgba('#ef4444', 0.25)}`,
};

export const btnDangerR = (r: AdminResponsive): CSSProperties => ({
  ...btnBaseR(r),
  background: theme.hexToRgba('#ef4444', 0.15),
  color: '#f87171',
  border: `1px solid ${theme.hexToRgba('#ef4444', 0.25)}`,
});

export const btnGhost: CSSProperties = {
  ...btnBase,
  background: theme.hexToRgba(theme.colors.slate[700], 0.4),
  color: theme.colors.slate[200],
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.3)}`,
};

export const btnGhostR = (r: AdminResponsive): CSSProperties => ({
  ...btnBaseR(r),
  background: theme.hexToRgba(theme.colors.slate[700], 0.4),
  color: theme.colors.slate[200],
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.3)}`,
});

export const btnSmall: CSSProperties = {
  padding: `${theme.spacing[1.5]} ${theme.spacing[3]}`,
  fontSize: theme.typography.fontSize.xs,
};

export const btnSmallR = (r: AdminResponsive): CSSProperties => ({
  padding: r.is4K ? `${theme.spacing[2.5]} ${theme.spacing[5]}` : `${theme.spacing[1.5]} ${theme.spacing[3]}`,
  fontSize: r.is4K ? theme.typography.fontSize.sm : theme.typography.fontSize.xs,
});

// =============================================================================
// FORM FIELDS
// =============================================================================
export const formGroup: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing[2],
};

export const formLabel: CSSProperties = {
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.slate[200],
  fontWeight: theme.typography.fontWeight.medium,
};

export const formLabelR = (r: AdminResponsive): CSSProperties => ({
  ...formLabel,
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : theme.typography.fontSize.sm,
});

export const formInput: CSSProperties = {
  padding: theme.spacing[3],
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
  background: theme.hexToRgba(theme.colors.slate[900], 0.6),
  color: theme.colors.white,
  fontSize: theme.typography.fontSize.sm,
  outline: 'none',
};

export const formInputR = (r: AdminResponsive): CSSProperties => ({
  ...formInput,
  padding: r.is4K ? theme.spacing[4] : theme.spacing[3],
  fontSize: r.is4K ? s4K(theme.typography.fontSize.sm) : theme.typography.fontSize.sm,
});

export const formTextarea: CSSProperties = {
  ...formInput,
  minHeight: '10rem',
  resize: 'vertical',
  fontFamily: 'inherit',
};

export const formTextareaR = (r: AdminResponsive): CSSProperties => ({
  ...formInputR(r),
  minHeight: r.is4K ? '14rem' : '10rem',
  resize: 'vertical',
  fontFamily: 'inherit',
});

export const formSelect: CSSProperties = {
  ...formInput,
  cursor: 'pointer',
};

export const formSelectR = (r: AdminResponsive): CSSProperties => ({
  ...formInputR(r),
  cursor: 'pointer',
});

// =============================================================================
// PAGE HEADER
// =============================================================================
export const pageHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const pageHeaderR = (r: AdminResponsive): CSSProperties => ({
  ...pageHeader,
  flexDirection: r.isMobile ? 'column' : 'row',
  alignItems: r.isMobile ? 'stretch' : 'center',
  gap: r.isMobile ? theme.spacing[4] : undefined,
});

export const pageTitle: CSSProperties = {
  fontSize: theme.typography.fontSize['2xl'],
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.white,
};

export const pageTitleR = (r: AdminResponsive): CSSProperties => ({
  ...pageTitle,
  fontSize: r.isMobile
    ? theme.typography.fontSize.xl
    : r.is4K
      ? theme.typography.fontSize['4xl']
      : theme.typography.fontSize['2xl'],
});

// =============================================================================
// EMPTY STATE
// =============================================================================
export const emptyState: CSSProperties = {
  ...glassPanel,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing[4],
  padding: theme.spacing[16],
  color: theme.colors.slate[400],
  textAlign: 'center',
};

export const emptyStateR = (r: AdminResponsive): CSSProperties => ({
  ...glassPanelR(r),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: r.is4K ? theme.spacing[6] : theme.spacing[4],
  padding: r.isMobile ? theme.spacing[10] : r.is4K ? theme.spacing[20] : theme.spacing[16],
  color: theme.colors.slate[400],
  textAlign: 'center',
  fontSize: r.is4K ? s4K(theme.typography.fontSize.base) : undefined,
});

// =============================================================================
// COLOR SWATCH
// =============================================================================
export const colorSwatch = (color: string): CSSProperties => ({
  width: '2rem',
  height: '2rem',
  borderRadius: theme.borderRadius.lg,
  background: color,
  border: `2px solid ${theme.hexToRgba(theme.colors.white, 0.2)}`,
  cursor: 'pointer',
});

// =============================================================================
// IMAGE PREVIEW
// =============================================================================
export const imagePreview: CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '20rem',
  aspectRatio: '16/9',
  borderRadius: theme.borderRadius.xl,
  overflow: 'hidden',
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
};

export const imagePreviewImg: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const imageDeleteBtn: CSSProperties = {
  position: 'absolute',
  top: theme.spacing[2],
  right: theme.spacing[2],
  width: '1.75rem',
  height: '1.75rem',
  borderRadius: theme.borderRadius.full,
  border: 'none',
  background: theme.hexToRgba('#ef4444', 0.85),
  color: theme.colors.white,
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center',
  fontSize: theme.typography.fontSize.xs,
};

// =============================================================================
// MODAL / DIALOG
// =============================================================================
export const modalOverlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  background: theme.hexToRgba(theme.colors.black, 0.6),
  backdropFilter: 'blur(6px)',
  display: 'grid',
  placeItems: 'center',
};

export const modalContent: CSSProperties = {
  ...glassPanel,
  width: 'min(600px, 92vw)',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing[6],
};

export const modalContentR = (r: AdminResponsive): CSSProperties => ({
  ...glassPanelR(r),
  width: r.isMobile ? '96vw' : r.is4K ? 'min(900px, 60vw)' : 'min(600px, 92vw)',
  maxHeight: r.isMobile ? '95vh' : '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: r.is4K ? theme.spacing[8] : theme.spacing[6],
});

export const modalHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const modalTitle: CSSProperties = {
  fontSize: theme.typography.fontSize.xl,
  fontWeight: theme.typography.fontWeight.semibold,
  color: theme.colors.white,
};

export const modalTitleR = (r: AdminResponsive): CSSProperties => ({
  ...modalTitle,
  fontSize: r.is4K ? theme.typography.fontSize['2xl'] : theme.typography.fontSize.xl,
});

// =============================================================================
// GRID
// =============================================================================
export const grid2: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing[4],
};

export const grid2R = (r: AdminResponsive): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: r.isMobile ? '1fr' : 'repeat(2, 1fr)',
  gap: r.is4K ? theme.spacing[6] : theme.spacing[4],
});

export const grid3: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing[4],
};

export const grid3R = (r: AdminResponsive): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: r.isMobile ? '1fr' : r.is4K ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
  gap: r.is4K ? theme.spacing[6] : theme.spacing[4],
});

export const grid4: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing[4],
};

export const grid4R = (r: AdminResponsive): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: r.isMobile ? 'repeat(2, 1fr)' : r.is4K ? 'repeat(4, 1fr)' : 'repeat(4, 1fr)',
  gap: r.isMobile ? theme.spacing[3] : r.is4K ? theme.spacing[6] : theme.spacing[4],
});
