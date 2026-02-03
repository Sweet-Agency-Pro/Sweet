import Hero from './components/Hero';
import ScrollAnimation from './components/ScrollAnimation';
import ServicesPreview from './components/ServicesPreview';
import PortfolioPreview from './components/PortfolioPreview';
import { Analytics } from '@vercel/analytics/react';

function App() {
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
