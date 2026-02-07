import { useEffect, useState, CSSProperties, type ComponentType } from 'react';

// Section Components (modular architecture)
import Hero from './components/sections/Hero';
import ScrollAnimation from './components/sections/ScrollAnimation';
import ServicesPreview from './components/sections/Services';
import PortfolioPreview from './components/sections/Portfolio';
import Contact from './components/sections/Contact';

// =============================================================================
// COMPONENT
// =============================================================================
function App() {
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
    if (env !== 'production') {
      document.title = 'Sweet DEVELOPMENT';
    } else {
      document.title = 'Agence Sweet';
    }
  }, [env]);

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

  return (
    <div style={styles.app}>
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />
      <PortfolioPreview />
      <Contact />
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

export default App;
