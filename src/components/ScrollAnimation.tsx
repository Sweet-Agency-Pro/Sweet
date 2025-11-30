import { useEffect, useState, useRef } from 'react';

function ScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const [strataVisible, setStrataVisible] = useState(true);
  const strataRef = useRef<HTMLDivElement>(null);
  const navbarTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const strataElement = strataRef.current;

      if (!heroSection || !strataElement) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Animation starts when STRATA reaches center of viewport
      const animationStart = heroHeight + (viewportHeight * 0.2);
      const animationEnd = heroHeight + (viewportHeight * 0.8);

      // Calculate STRATA element's position relative to viewport
      const strataRect = strataElement.getBoundingClientRect();
      const strataTopPosition = strataRect.top;
      const strataCenterPosition = strataRect.top + (strataRect.height / 2);
      const viewportCenter = viewportHeight / 2;

      // Target position: where STRATA logo appears in navbar
      const navbarLogoPosition = 40;

      // STRATA disappears when it gets close to navbar position (with delay before navbar appears)
      if (strataTopPosition <= navbarLogoPosition + 20 && scrollProgress > 0.7) {
        setStrataVisible(false);

        // Clear any existing timeout
        if (navbarTimeoutRef.current) {
          clearTimeout(navbarTimeoutRef.current);
        }

        // Delay navbar appearance by 300ms for smooth transition
        navbarTimeoutRef.current = window.setTimeout(() => {
          setShowNavbar(true);
        }, 300);
      } else {
        setStrataVisible(true);
        setShowNavbar(false);

        // Clear timeout if scrolling back
        if (navbarTimeoutRef.current) {
          clearTimeout(navbarTimeoutRef.current);
          navbarTimeoutRef.current = null;
        }
      }

      // Handle scroll progress for STRATA animation
      if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
        const progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (scrollPosition < animationStart) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    // Use requestAnimationFrame for smoother performance
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

  // Start from center (0vh vertical offset) and move up to navbar position
  const strataY = -(easedProgress * 45);
  // Move left to align with navbar logo position
  const strataX = easedProgress * -35;
  // Scale down from full size to navbar logo size
  const strataScale = 1 - (easedProgress * 0.85);

  // STRATA opacity: visible initially, then fade out when it reaches near navbar
  // Add delayed fade out at 75% progress
  let strataOpacity = 1;
  if (scrollProgress >= 0.75) {
    strataOpacity = strataVisible ? 1 - ((scrollProgress - 0.75) / 0.25) : 0;
  }

  return (
    <>
      <div className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]"></div>
        </div>

        <div
          ref={strataRef}
          id="strata"
          className="relative text-[12rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 leading-none tracking-tighter pointer-events-none select-none"
          style={{
            transform: `translate(${strataX}vw, ${strataY}vh) scale(${strataScale})`,
            opacity: strataOpacity,
            transition: 'opacity 0.3s ease-out',
            willChange: 'transform, opacity',
          }}
        >
          STRATA
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="bg-white/98 backdrop-blur-lg border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-12">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500">
                  STRATA
                </div>

                <div className="hidden md:flex items-center gap-8">
                  <a
                    href="#services"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    Services
                  </a>
                  <a
                    href="#portfolio"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#about"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    À propos
                  </a>
                  <a
                    href="#contact"
                    className="text-sm text-slate-700 hover:text-slate-900 transition-colors duration-200 font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <button className="group relative px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-sm text-white font-semibold">
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

export default ScrollAnimation;
