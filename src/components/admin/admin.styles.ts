/**
 * Admin Shared Styles
 * Reusable style objects for all admin pages — follows the site's visual DNA.
 */

import type { CSSProperties } from 'react';
import theme from '../../styles/theme';

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

export const statValue: CSSProperties = {
  fontSize: theme.typography.fontSize['3xl'],
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.white,
};

export const statLabel: CSSProperties = {
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.slate[300],
};

// =============================================================================
// DATA TABLE
// =============================================================================
export const table: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

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

export const td: CSSProperties = {
  padding: `${theme.spacing[4]} ${theme.spacing[4]}`,
  color: theme.colors.slate[100],
  fontSize: theme.typography.fontSize.sm,
  borderBottom: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.25)}`,
};

// =============================================================================
// BADGES
// =============================================================================
export const badge = (color: string): CSSProperties => ({
  display: 'inline-block',
  padding: `${theme.spacing[1]} ${theme.spacing[3]}`,
  borderRadius: theme.borderRadius.full,
  fontSize: theme.typography.fontSize.xs,
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

export const btnPrimary: CSSProperties = {
  ...btnBase,
  background: theme.gradients.tealCyan,
  color: theme.colors.white,
};

export const btnDanger: CSSProperties = {
  ...btnBase,
  background: theme.hexToRgba('#ef4444', 0.15),
  color: '#f87171',
  border: `1px solid ${theme.hexToRgba('#ef4444', 0.25)}`,
};

export const btnGhost: CSSProperties = {
  ...btnBase,
  background: theme.hexToRgba(theme.colors.slate[700], 0.4),
  color: theme.colors.slate[200],
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.3)}`,
};

export const btnSmall: CSSProperties = {
  padding: `${theme.spacing[1.5]} ${theme.spacing[3]}`,
  fontSize: theme.typography.fontSize.xs,
};

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

export const formInput: CSSProperties = {
  padding: theme.spacing[3],
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
  background: theme.hexToRgba(theme.colors.slate[900], 0.6),
  color: theme.colors.white,
  fontSize: theme.typography.fontSize.sm,
  outline: 'none',
};

export const formTextarea: CSSProperties = {
  ...formInput,
  minHeight: '10rem',
  resize: 'vertical',
  fontFamily: 'inherit',
};

export const formSelect: CSSProperties = {
  ...formInput,
  cursor: 'pointer',
};

// =============================================================================
// PAGE HEADER
// =============================================================================
export const pageHeader: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const pageTitle: CSSProperties = {
  fontSize: theme.typography.fontSize['2xl'],
  fontWeight: theme.typography.fontWeight.bold,
  color: theme.colors.white,
};

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

// =============================================================================
// GRID
// =============================================================================
export const grid2: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing[4],
};

export const grid3: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing[4],
};

export const grid4: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing[4],
};
