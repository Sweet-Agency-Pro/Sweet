import Hero from './components/Hero';
import ScrollAnimation from './components/ScrollAnimation';
import ServicesPreview from './components/ServicesPreview';
import PortfolioPreview from './components/PortfolioPreview';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollAnimation />
      <ServicesPreview />
      <PortfolioPreview />
    </div>
  );
}

export default App;
