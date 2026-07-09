'use client';

import { useEffect, CSSProperties } from 'react';

// Section Components (modular architecture)
import Hero from './sections/Hero';
import ScrollAnimation from './sections/ScrollAnimation';
import ServicesPreview from './sections/Services';
import PortfolioPreview from './sections/Portfolio';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// =============================================================================
// COMPONENT
// =============================================================================
function PublicHome() {
  // Scroll vers la section correspondant au hash de l'URL (#services, #portfolio…).
  // Se déclenche au montage et à chaque changement de hash.
  useEffect(() => {
    const NAV_HEIGHT = 80;
    let cleanup: (() => void) | undefined;

    const run = () => {
      cleanup?.();
      cleanup = undefined;

      const sectionId = window.location.hash.replace('#', '');
      if (!sectionId) return;

      let frameId = 0;
      let attempts = 0;
      const maxAttempts = 30;
      let observer: ResizeObserver | null = null;
      let stabilityTimer: ReturnType<typeof setTimeout> | null = null;

      const doScroll = (target: HTMLElement, smooth: boolean) => {
        const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'instant' });
      };

      const startObserving = (target: HTMLElement) => {
        let lastY = target.getBoundingClientRect().top + window.scrollY;

        observer = new ResizeObserver(() => {
          const newY = target.getBoundingClientRect().top + window.scrollY;
          if (Math.abs(newY - lastY) > 2) {
            lastY = newY;
            doScroll(target, false);
          }
          if (stabilityTimer) clearTimeout(stabilityTimer);
          stabilityTimer = setTimeout(() => {
            observer?.disconnect();
            observer = null;
          }, 1500);
        });

        const root = document.getElementById('app-root') || document.body;
        observer.observe(root);

        setTimeout(() => {
          observer?.disconnect();
          observer = null;
        }, 8000);
      };

      const tryScroll = () => {
        const target = document.getElementById(sectionId);
        if (target) {
          doScroll(target, true);
          startObserving(target);
          return;
        }
        attempts += 1;
        if (attempts < maxAttempts) {
          frameId = requestAnimationFrame(tryScroll);
        }
      };

      frameId = requestAnimationFrame(tryScroll);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        observer?.disconnect();
        if (stabilityTimer) clearTimeout(stabilityTimer);
      };
    };

    run();
    window.addEventListener('hashchange', run);
    return () => {
      window.removeEventListener('hashchange', run);
      cleanup?.();
    };
  }, []);

  return (
    <div style={styles.app}>
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />
      <PortfolioPreview />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  app: {
    minHeight: '100vh',
    width: '100%',
    overflowX: 'hidden',
  },
};

export default PublicHome;
