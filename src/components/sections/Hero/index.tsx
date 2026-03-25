/**
 * Hero Section Component
 * Landing section with navigation, title, CTAs and glass cards
 */

import { ArrowRight } from 'lucide-react';
import { useSectionNavigation } from '../../../hooks/useSectionNavigation';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Navigation from '../../layout/Navigation';
import GlassCards from './GlassCards';
import './Hero.css';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Background Blobs - Decorative gradient circles */
function BackgroundBlobs() {
  return (
    <div className="hero__background">
      <div className="hero__blob-1" />
      <div className="hero__blob-2" />
      <div className="hero__blob-3" />
    </div>
  );
}

/** Hero Title with gradient text */
function HeroTitle() {
  return (
    <h1 className="hero__title">
      Agence web<br />
      <span className="hero__title-gradient">Sweet.</span>
    </h1>
  );
}

/** Hero Description */
function HeroDescription() {
  return (
    <p className="hero__description">
      Derrière chaque interface élégante se cache une technologie solide. 
      Nous rendons le web plus simple, plus beau, plus Sweet.
    </p>
  );
}

/** CTA Buttons */
function CTAButtons() {
  const { navigateToSection } = useSectionNavigation();

  return (
    <div className="hero__actions">
      <button className="hero__primary-btn" onClick={() => navigateToSection('services')}>
        <div className="hero__primary-btn-bg" />
        <div className="hero__primary-btn-hover" />
        <span className="hero__primary-btn-content">
          Nos Services
          <ArrowRight className="hero__btn-icon" />
        </span>
      </button>

      <button className="hero__secondary-btn" onClick={() => navigateToSection('portfolio')}>
        Voir les Projets
      </button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function Hero() {
  const { isMobile, isTablet, isDesktop } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  return (
    <div id="hero-section" className="hero">
      <BackgroundBlobs />
      <Navigation />

      <main className="hero__main">
        <div className="hero__grid">
          {/* Left content */}
          <div className="hero__content">
            <div className="hero__text-content">
              <HeroTitle />
              <HeroDescription />
            </div>

            <CTAButtons />

            {/* GlassCards – displayed below buttons on mobile/tablet */}
            {isMobileOrTablet && <GlassCards />}
          </div>

          {/* Right content - Glass Cards - Desktop only */}
          {isDesktop && <GlassCards />}
        </div>
      </main>
    </div>
  );
}

export default Hero;
