/**
 * Global Theme Configuration
 * Fluid Scaling System for 4K/5K/Retina displays
 * 
 * Base Scale: 1rem = 16px
 * Large Viewports (≥1920px): 18px
 * Ultra-Wide/High-Density (≥2560px): 22px
 */

import { CSSProperties } from 'react';

// =============================================================================
// COLOR PALETTE
// =============================================================================
export const colors = {
  // Primary gradient colors
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    150: '#e2e7efd6',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// =============================================================================
// SPACING SYSTEM (in rem)
// =============================================================================
export const spacing = {
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

// =============================================================================
// TYPOGRAPHY SYSTEM (in rem)
// =============================================================================
export const typography = {
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
    '8xl': '6rem',      // 96px
    '9xl': '8rem',      // 128px
    hero: '12rem',      // 192px (for STRATA logo)
    heroLg: '16rem',    // 256px (for STRATA logo on large screens)
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// =============================================================================
// BORDER RADIUS (in rem)
// =============================================================================
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const;

// =============================================================================
// SHADOWS
// =============================================================================
export const shadows = {
  sm: '0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05)',
  default: '0 0.0625rem 0.1875rem 0 rgba(0, 0, 0, 0.1), 0 0.0625rem 0.125rem -0.0625rem rgba(0, 0, 0, 0.1)',
  md: '0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0 0.125rem 0.25rem -0.125rem rgba(0, 0, 0, 0.1)',
  lg: '0 0.625rem 0.9375rem -0.1875rem rgba(0, 0, 0, 0.1), 0 0.25rem 0.375rem -0.25rem rgba(0, 0, 0, 0.1)',
  xl: '0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1), 0 0.5rem 0.625rem -0.375rem rgba(0, 0, 0, 0.1)',
  '2xl': '0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)',
  none: 'none',
} as const;

// =============================================================================
// TRANSITIONS
// =============================================================================
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    medium: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
  },
} as const;

// =============================================================================
// GRADIENTS
// =============================================================================
export const gradients = {
  primary: `linear-gradient(to right, ${colors.teal[500]}, ${colors.cyan[500]}, ${colors.blue[500]})`,
  primaryLight: `linear-gradient(to right, ${colors.teal[300]}, ${colors.cyan[300]}, ${colors.blue[300]})`,
  primaryDark: `linear-gradient(to right, ${colors.teal[600]}, ${colors.cyan[600]}, ${colors.blue[600]})`,
  tealCyan: `linear-gradient(to right, ${colors.teal[500]}, ${colors.cyan[500]})`,
  tealCyanDark: `linear-gradient(to right, ${colors.teal[600]}, ${colors.cyan[600]})`,
  bluePurple: `linear-gradient(to right, ${colors.blue[500]}, ${colors.purple[500]})`,
  bluePurpleDark: `linear-gradient(to right, ${colors.blue[600]}, ${colors.purple[600]})`,
  heroBackground: `linear-gradient(to bottom right, ${colors.slate[900]}, ${colors.slate[800]}, ${colors.slate[900]})`,
} as const;

// =============================================================================
// GLOBAL CONTAINER STYLES
// =============================================================================
export const container: CSSProperties = {
  maxWidth: '100rem', // 1600px
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
  paddingLeft: spacing[6],  // 1.5rem = 24px
  paddingRight: spacing[6], // 1.5rem = 24px
};

export const containerLarge: CSSProperties = {
  ...container,
  paddingLeft: spacing[8],  // 2rem = 32px
  paddingRight: spacing[8], // 2rem = 32px
};

// =============================================================================
// MEDIA QUERY BREAKPOINTS
// =============================================================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',  // Large viewports
  '4xl': '2560px',  // Ultra-wide/4K
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Convert pixel value to rem
 * Formula: rem = px / 16
 */
export const pxToRem = (px: number): string => `${px / 16}rem`;

/**
 * Create rgba color from hex
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Merge multiple style objects
 */
export const mergeStyles = (...styles: (CSSProperties | undefined)[]): CSSProperties => {
  return Object.assign({}, ...styles.filter(Boolean));
};

// =============================================================================
// COMMON STYLE PATTERNS
// =============================================================================
export const commonStyles = {
  // Flexbox utilities
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as CSSProperties,
  
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as CSSProperties,
  
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,

  // Absolute positioning
  absoluteFill: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  } as CSSProperties,

  // Glass effect
  glassEffect: {
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.75rem)',
    WebkitBackdropFilter: 'blur(0.75rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  } as CSSProperties,

  // Text gradient
  textGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
  } as CSSProperties,

  // Button base
  buttonBase: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius.xl,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  } as CSSProperties,

  // Card base
  cardBase: {
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  } as CSSProperties,

  // Section base
  sectionBase: {
    position: 'relative',
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    overflow: 'hidden',
  } as CSSProperties,
};

// =============================================================================
// EXPORT DEFAULT THEME
// =============================================================================
const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  gradients,
  container,
  containerLarge,
  breakpoints,
  commonStyles,
  pxToRem,
  hexToRgba,
  mergeStyles,
};

export default theme;
