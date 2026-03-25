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

// =============================================================================
// HOOK
// =============================================================================
export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    // SSR-safe initial state
    if (typeof window === 'undefined') {
      return {
        width: 1200,
        height: 800,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        is4K: false,
      };
    }
    
    const width = window.innerWidth;
    return {
      width,
      height: window.innerHeight,
      isMobile: width < BREAKPOINTS.mobile,
      isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
      isDesktop: width >= BREAKPOINTS.desktop,
      isLargeDesktop: width >= BREAKPOINTS.largeDesktop,
      is4K: width >= BREAKPOINTS.ultraWide,
    };
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      // Debounce resize events for performance
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        setWindowSize({
          width,
          height,
          isMobile: width < BREAKPOINTS.mobile,
          isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
          isDesktop: width >= BREAKPOINTS.desktop,
          isLargeDesktop: width >= BREAKPOINTS.largeDesktop,
          is4K: width >= BREAKPOINTS.ultraWide,
        });
      }, 100);
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
