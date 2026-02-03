import Hero from './components/Hero';
import ScrollAnimation from './components/ScrollAnimation';
import ServicesPreview from './components/ServicesPreview';
import PortfolioPreview from './components/PortfolioPreview';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    const env = import.meta.env.VITE_VERCEL_ENV || 'local';
    if (env !== 'production') {
      document.title = "Sweet DEVELOPMENT";
    } else {
      document.title = "Agence Sweet";
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />
      <PortfolioPreview />
      <Analytics />
    </div>
  );
}

export default App;
