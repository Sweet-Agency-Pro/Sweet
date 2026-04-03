import { lazy, Suspense } from 'react';
import { useEffect, useState, CSSProperties, type ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './layout/SEO';

// Section Components (modular architecture)
import Hero from './sections/Hero';
import ScrollAnimation from './sections/ScrollAnimation';
import ServicesPreview from './sections/Services';

const PortfolioPreview = lazy(() => import('./sections/Portfolio'));
const About = lazy(() => import('./sections/About'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

// =============================================================================
// COMPONENT
// =============================================================================
function PublicHome() {
  const location = useLocation();
  const env = import.meta.env.VITE_VERCEL_ENV || 'local';
  const canUseStorage = (() => {
    if (typeof window === 'undefined') return false;
    try {
      const key = '__storage_test__';
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  })();
  const [AnalyticsComponent, setAnalyticsComponent] = useState<
    null | ComponentType
  >(null);


  useEffect(() => {
    if (env !== 'production' || !canUseStorage) return;

    let isMounted = true;
    import('@vercel/analytics/react')
      .then((mod) => {
        if (isMounted) {
          setAnalyticsComponent(() => mod.Analytics);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAnalyticsComponent(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [env, canUseStorage]);

  useEffect(() => {
    const sectionId = location.hash.replace('#', '');
    if (!sectionId) return;

    let frameId = 0;
    let attempts = 0;
    const maxAttempts = 30;
    let observer: ResizeObserver | null = null;
    let stabilityTimer: ReturnType<typeof setTimeout> | null = null;

    const NAV_HEIGHT = 80;

    const doScroll = (target: HTMLElement, smooth: boolean) => {
      const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: Math.max(0, y), behavior: smooth ? 'smooth' : 'instant' });
    };

    const startObserving = (target: HTMLElement) => {
      // Track the last known position so we only re-scroll when it actually shifts
      let lastY = target.getBoundingClientRect().top + window.scrollY;

      observer = new ResizeObserver(() => {
        const newY = target.getBoundingClientRect().top + window.scrollY;
        // If the section moved by more than 2px, re-scroll instantly (no jank)
        if (Math.abs(newY - lastY) > 2) {
          lastY = newY;
          doScroll(target, false);
        }

        // Reset stability timer – stop observing once layout stops shifting
        if (stabilityTimer) clearTimeout(stabilityTimer);
        stabilityTimer = setTimeout(() => {
          observer?.disconnect();
          observer = null;
        }, 1500);
      });

      // Observe the main content wrapper so we catch any child size changes
      const root = document.getElementById('app-root') || document.body;
      observer.observe(root);

      // Safety: stop observing after 8 seconds max
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

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
      if (stabilityTimer) clearTimeout(stabilityTimer);
    };
  }, [location.hash]);

  return (
    <div style={styles.app}>
      <SEO
        title={env !== 'production' ? 'Sweet DEVELOPMENT' : 'Agence Web Créative : Développement & Design sur Mesure'}
        description="Agence Sweet - Création de sites internet, e-commerce et solutions sur mesure pour propulser votre activité."
      />
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />

      <Suspense fallback={<div style={{ minHeight: '400px', backgroundColor: 'transparent' }} />}>
        <PortfolioPreview />
        <About />
        <Contact />
        <Footer />
      </Suspense>

      {AnalyticsComponent ? <AnalyticsComponent /> : null}
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
