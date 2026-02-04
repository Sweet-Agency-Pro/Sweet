import Hero from './components/Hero';
import ScrollAnimation from './components/ScrollAnimation';
import ServicesPreview from './components/ServicesPreview';
import PortfolioPreview from './components/PortfolioPreview';
import { Analytics } from '@vercel/analytics/react';
import { useEffect, CSSProperties } from 'react';

// =============================================================================
// COMPONENT
// =============================================================================
function App() {
  useEffect(() => {
    const env = import.meta.env.VITE_VERCEL_ENV || 'local';
    if (env !== 'production') {
      document.title = 'Sweet DEVELOPMENT';
    } else {
      document.title = 'Agence Sweet';
    }
  }, []);

  return (
    <div style={styles.app}>
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />
      <PortfolioPreview />
      <Analytics />
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
