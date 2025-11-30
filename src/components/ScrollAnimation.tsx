import { useEffect, useState } from 'react';

function ScrollAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (!heroSection) return;

      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const animationStart = heroHeight * 0.7;
      const animationEnd = heroHeight * 1.1;

      if (scrollPosition > heroHeight) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
        const progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (scrollPosition < animationStart) {
        setScrollProgress(0);
      } else {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px]"></div>
        </div>

        <div
          className="relative text-[12rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300 leading-none tracking-tighter pointer-events-none select-none"
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-12">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300">
                  STRATA
                </div>

                <div className="hidden md:flex items-center gap-8">
                  <a
                    href="#services"
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    Services
                  </a>
                  <a
                    href="#portfolio"
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#about"
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    À propos
                  </a>
                  <a
                    href="#contact"
                    className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>

              <button className="group relative px-6 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-md border border-teal-400/30 rounded-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
