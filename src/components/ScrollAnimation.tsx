import { useEffect, useState, useRef } from 'react';

function ScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);
  const strataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const strataElement = strataRef.current;

      if (!heroSection || !strataElement) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const animationStart = heroHeight * 0.7;
      const animationEnd = heroHeight * 1.1;

      // Calculate STRATA element's position relative to viewport
      const strataRect = strataElement.getBoundingClientRect();
      const strataTopPosition = strataRect.top;

      // Target position: where STRATA logo appears in navbar (approximately 32px from top for centering in 80px navbar)
      const navbarLogoPosition = 40;

      // Trigger navbar when STRATA element reaches the navbar logo position
      if (strataTopPosition <= navbarLogoPosition && scrollPosition > animationStart) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
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

    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  const easedProgress = easeOutCubic(scrollProgress);

  const strataY = 50 - (easedProgress * 55);
  const strataX = easedProgress * -35;
  const strataScale = 1 - (easedProgress * 0.65);
  const strataOpacity = scrollProgress < 0.95 ? 1 : 1 - ((scrollProgress - 0.95) / 0.05);

  return (
    <>
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-white">
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
            transition: 'none',
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
