/**
 * Hero Section Component
 * Landing section with navigation, title, CTAs and glass cards
 */

import { ArrowRight } from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Navigation from '../../layout/Navigation';
import GlassCards from './GlassCards';
import { styles } from './Hero.styles';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Background Blobs - Decorative gradient circles */
function BackgroundBlobs({ isMobileOrTablet }: { isMobileOrTablet: boolean }) {
  return (
    <div style={styles.backgroundContainer}>
      <div style={{
        ...styles.bgBlob1,
        ...(isMobileOrTablet && styles.bgBlob1Mobile),
      }} />
      <div style={{
        ...styles.bgBlob2,
        ...(isMobileOrTablet && styles.bgBlob2Mobile),
      }} />
      <div style={styles.bgBlob3} />
    </div>
  );
}

/** Hero Title with gradient text */
function HeroTitle({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) {
  return (
    <h1 style={{
      ...styles.title,
      ...(isMobile && styles.titleMobile),
      ...(isTablet && styles.titleTablet),
    }}>
      Agence web<br />
      <span style={styles.titleGradient}>Sweet.</span>
    </h1>
  );
}

/** Hero Description */
function HeroDescription({ isMobileOrTablet }: { isMobileOrTablet: boolean }) {
  return (
    <p style={{
      ...styles.description,
      ...(isMobileOrTablet && styles.descriptionMobile),
    }}>
      Derrière chaque interface élégante se cache une technologie solide. 
      Nous rendons le web plus simple, plus beau, plus Sweet.
    </p>
  );
}

/** CTA Buttons */
function CTAButtons({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{
      ...styles.buttonContainer,
      ...(isMobile && styles.buttonContainerMobile),
    }}>
      <button style={{
        ...styles.primaryButton,
        ...(isMobile && styles.primaryButtonMobile),
      }}>
        <div style={styles.primaryButtonBg} />
        <div style={styles.primaryButtonHover} />
        <span style={styles.primaryButtonContent}>
          Nos Services
          <ArrowRight style={styles.buttonIcon} />
        </span>
      </button>

      <button style={{
        ...styles.secondaryButton,
        ...(isMobile && styles.secondaryButtonMobile),
      }}>
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
    <div id="hero-section" style={styles.hero}>
      <BackgroundBlobs isMobileOrTablet={isMobileOrTablet} />
      <Navigation />

      <main style={{
        ...styles.main,
        ...(isMobileOrTablet && styles.mainMobile),
      }}>
        <div style={{
          ...styles.grid,
          ...(isMobileOrTablet && styles.gridMobile),
        }}>
          {/* Left content */}
          <div style={styles.content}>
            <div style={styles.textContent}>
              <HeroTitle isMobile={isMobile} isTablet={isTablet} />
              <HeroDescription isMobileOrTablet={isMobileOrTablet} />
            </div>

            <CTAButtons isMobile={isMobile} />

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
