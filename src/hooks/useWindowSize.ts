import { useState, useEffect } from 'react';

// =============================================================================
// BREAKPOINTS
// =============================================================================
export const BREAKPOINTS = {
  mobile: 768,    // < 768px
  tablet: 1024,   // 768px - 1024px
  desktop: 1024,  // > 1024px
  largeDesktop: 1440, // > 1440px (scaling reference)
  ultraWide: 2560, // 4K/5K displays
} as const;

// =============================================================================
// TYPES
// =============================================================================
export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  is4K: boolean;
}

const DEFAULT_SIZE: WindowSize = {
  width: 1200,
  height: 800,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLargeDesktop: false,
  is4K: false,
};

function computeSize(): WindowSize {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return {
    width,
    height,
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.desktop,
    isLargeDesktop: width >= BREAKPOINTS.largeDesktop,
    is4K: width >= BREAKPOINTS.ultraWide,
  };
}

// =============================================================================
// HOOK
// =============================================================================
export function useWindowSize(): WindowSize {
  // ⚠️ On NE lit PAS window ici : l'initializer doit renvoyer la même valeur
  // sur le serveur et au 1er render client, sinon React détecte un mismatch.
  // La vraie taille est appliquée juste après le mount, dans le useEffect.
  const [windowSize, setWindowSize] = useState<WindowSize>(DEFAULT_SIZE);

  useEffect(() => {
    setWindowSize(computeSize());

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize(computeSize());
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
