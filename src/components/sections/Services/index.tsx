/**
 * Services Section Component
 * Displays the three main service offerings with hover effects
 */

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { styles } from './Services.styles';
import { services } from './services.data';
import ServiceCard from './ServiceCard';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Section Header with badge and title */
function SectionHeader({ isMobile, isTablet, isMobileOrTablet }: { 
  isMobile: boolean; 
  isTablet: boolean; 
  isMobileOrTablet: boolean;
}) {
  return (
    <div style={styles.header}>
      <div style={styles.badge}>
        <Sparkles style={styles.badgeIcon} />
        <span style={styles.badgeText}>Nos Services</span>
      </div>

      <h2 style={{
        ...styles.title,
        ...(isMobile && styles.titleMobile),
        ...(isTablet && styles.titleTablet),
      }}>
        Solutions Numériques<br/>
        <span style={styles.titleGradient}>Sur Mesure</span>
      </h2>

      <p style={{
        ...styles.description,
        ...(isMobileOrTablet && styles.descriptionMobile),
      }}>
        Trois piliers pour construire votre présence en ligne : du site vitrine 
        à l'e-commerce, en passant par l'administration complète de votre écosystème digital.
      </p>
    </div>
  );
}

/** CTA Banner at the bottom */
function CTABanner({ isMobile, isMobileOrTablet }: { 
  isMobile: boolean; 
  isMobileOrTablet: boolean;
}) {
  return (
    <div style={{
      ...styles.ctaSection,
      ...(isMobileOrTablet && styles.ctaSectionMobile),
    }}>
      <div style={styles.ctaContent}>
        <h3 style={{
          ...styles.ctaTitle,
          ...(isMobile && styles.ctaTitleMobile),
        }}>
          Prêt à transformer votre présence numérique ?
        </h3>
        <p style={styles.ctaDescription}>
          Parlons ensemble de comment nos solutions peuvent propulser votre activité vers l'avant.
        </p>
      </div>
      <button style={{
        ...styles.ctaButton,
        ...(isMobileOrTablet && styles.ctaButtonMobile),
      }}>
        <div style={styles.ctaButtonBg} />
        <div style={styles.ctaButtonHover} />
        <span style={styles.ctaButtonContent}>
          Commencer un projet
          <ArrowRight style={styles.ctaButtonIcon} />
        </span>
      </button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function ServicesPreview() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  return (
    <section id="services" style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobileOrTablet && styles.containerMobile),
      }}>
        <SectionHeader 
          isMobile={isMobile} 
          isTablet={isTablet} 
          isMobileOrTablet={isMobileOrTablet} 
        />

        {/* Services Grid */}
        <div style={{
          ...styles.grid,
          ...(isMobile && styles.gridMobile),
          ...(isTablet && styles.gridTablet),
        }}>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isHovered={hoveredService === service.id}
              isMobile={isMobile}
              onHover={() => setHoveredService(service.id)}
              onLeave={() => setHoveredService(null)}
            />
          ))}
        </div>

        <CTABanner isMobile={isMobile} isMobileOrTablet={isMobileOrTablet} />
      </div>
    </section>
  );
}

export default ServicesPreview;
