import { useEffect, useState, useRef, CSSProperties } from 'react';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function ScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const showNavbarRef = useRef<boolean>(false);
  const [sweetVisible, setSweetVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const sweetRef = useRef<HTMLDivElement>(null);
  const navbarTimeoutRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const navbarScrollHandledRef = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const sweetElement = sweetRef.current;

      if (!heroSection || !sweetElement) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const isScrollingDown = scrollPosition > lastScrollYRef.current;
      const viewportHeight = window.innerHeight;

      const sweetSection = sweetElement.parentElement;
      const sweetSectionTop = sweetSection?.offsetTop || heroHeight;

      const animationStart = sweetSectionTop;
      const animationEnd = sweetSectionTop + (viewportHeight * 0.8);

      let currentProgress = 0;
      if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
        currentProgress = (scrollPosition - animationStart) / (animationEnd - animationStart);
        currentProgress = Math.min(Math.max(currentProgress, 0), 1);
        setScrollProgress(currentProgress);
      } else if (scrollPosition < animationStart) {
        currentProgress = 0;
        setScrollProgress(0);
      } else {
        currentProgress = 1;
        setScrollProgress(1);
      }

      const sweetRect = sweetElement.getBoundingClientRect();
      const sweetTopPosition = sweetRect.top;
      const navbarLogoPosition = 40;

      if (sweetTopPosition <= navbarLogoPosition + 200 && currentProgress > 0.20) {
        setIsHiding(true);

        if (navbarTimeoutRef.current == null && !showNavbarRef.current) {
          navbarTimeoutRef.current = window.setTimeout(() => {
            showNavbarRef.current = true;
            setShowNavbar(true);
            navbarTimeoutRef.current = null;
          }, 150);
        }

        if ((showNavbar || showNavbarRef.current) && isScrollingDown && !navbarScrollHandledRef.current) {
          navbarScrollHandledRef.current = true;
          setIsHiding(false);
          setSweetVisible(false);
          setScrollProgress(1);
        }
      } else {
        setIsHiding(false);
        setSweetVisible(true);
        showNavbarRef.current = false;
        setShowNavbar(false);
        navbarScrollHandledRef.current = false;

        if (navbarTimeoutRef.current) {
          clearTimeout(navbarTimeoutRef.current);
          navbarTimeoutRef.current = null;
        }
      }
    };

    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (navbarTimeoutRef.current) {
        clearTimeout(navbarTimeoutRef.current);
      }
    };
  }, []);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const easedProgress = easeOutCubic(scrollProgress);

  const sweetY = -(easedProgress * 45);
  const sweetX = easedProgress * -75;
  const finalScale = 0.01;

  let scaleProgress = easedProgress;
  try {
    const rect = sweetRef.current?.getBoundingClientRect();
    if (rect && typeof window !== 'undefined') {
      const sweetCenter = rect.top + rect.height / 2;
      const viewportHeightNow = window.innerHeight;
      const navbarLogoPosition = 40;
      const scaleRange = viewportHeightNow * 0.4;
      const distance = Math.max(0, sweetCenter - navbarLogoPosition);
      scaleProgress = 1 - Math.min(Math.max(distance / scaleRange, 0), 1);
    }
  } catch (e) {
    // Fallback to easedProgress
  }

  const sweetScale = 1 + (finalScale - 1) * scaleProgress;

  let sweetOpacity = 1;
  if (isHiding) {
    sweetOpacity = 0.15 + (1 - Math.min(Math.max((scrollProgress - 0.5) / 0.5, 0), 1)) * 0.85;
  } else if (scrollProgress >= 0.75) {
    sweetOpacity = sweetVisible ? 1 - ((scrollProgress - 0.75) / 0.25) : 0;
  }

  const navbarStyle: CSSProperties = {
    ...styles.navbar,
    ...(showNavbar ? styles.navbarVisible : styles.navbarHidden),
    backdropFilter: showNavbar ? 'blur(0.75rem)' : 'blur(0)',
    WebkitBackdropFilter: showNavbar ? 'blur(0.75rem)' : 'blur(0)',
  };

  const sweetTextStyle: CSSProperties = {
    ...styles.sweetText,
    transform: `translate(${sweetX}vw, ${sweetY}vh) scale(${sweetScale})`,
    opacity: sweetOpacity,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.easeOut}`,
  };

  return (
    <>
      <div style={styles.section}>
        <div style={styles.backgroundContainer}>
          <div style={styles.backgroundBlob}></div>
        </div>

        <div
          ref={sweetRef}
          id="sweet"
          style={sweetTextStyle}
        >
          SWEET
        </div>
      </div>

      <div style={navbarStyle}>
        <nav style={styles.navInner}>
          <div style={styles.navContainer}>
            <div style={styles.navContent}>
              <div style={styles.navLeft}>
                <div style={styles.navLogo}>SWEET</div>

                <div style={styles.navLinks}>
                  <a href="#services" style={styles.navLink}>
                    Services
                  </a>
                  <a href="#portfolio" style={styles.navLink}>
                    Portfolio
                  </a>
                  <a href="#about" style={styles.navLink}>
                    À propos
                  </a>
                  <a href="#contact" style={styles.navLink}>
                    Contact
                  </a>
                </div>
              </div>

              <button style={styles.ctaButton}>
                <div style={styles.ctaButtonBg}></div>
                <div style={styles.ctaButtonHover}></div>
                <span style={styles.ctaButtonText}>
                  Démarrer un projet
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba, shadows } = theme;

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  backgroundBlob: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '37.5rem', // 600px
    height: '37.5rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.1),
    borderRadius: '50%',
    filter: 'blur(8.75rem)', // 140px
  },
  sweetText: {
    position: 'relative',
    fontSize: typography.fontSize.hero,
    fontWeight: typography.fontWeight.black,
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
    lineHeight: typography.lineHeight.none,
    letterSpacing: typography.letterSpacing.tighter,
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform, opacity',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: `all ${transitions.duration.slower} ${transitions.timing.easeOut}`,
  },
  navbarHidden: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },
  navbarVisible: {
    transform: 'translateY(0)',
    opacity: 1,
  },
  navInner: {
    backgroundColor: hexToRgba(colors.white, 0.98),
    borderBottom: `1px solid ${colors.slate[200]}`,
    boxShadow: shadows.sm,
  },
  navContainer: {
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: spacing[20],
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[12],
  },
  navLogo: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
  },
  navLink: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
    transition: `color ${transitions.duration.normal} ${transitions.timing.ease}`,
    textDecoration: 'none',
  },
  ctaButton: {
    position: 'relative',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[2.5],
    paddingBottom: spacing[2.5],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  },
  ctaButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.lg,
  },
  ctaButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyanDark,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  ctaButtonText: {
    position: 'relative',
    fontSize: typography.fontSize.sm,
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
  },
};

export default ScrollAnimation;
