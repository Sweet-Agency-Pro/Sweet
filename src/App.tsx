import { useEffect, CSSProperties } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Section Components (modular architecture)
import Hero from './components/sections/Hero';
import ScrollAnimation from './components/sections/ScrollAnimation';
import ServicesPreview from './components/sections/Services';
import PortfolioPreview from './components/sections/Portfolio';

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
