/**
 * Services Section Component
 * Displays the three main service offerings with hover effects
 */

import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Palette,
  Store,
  BarChart3,
  Globe,
  Code,
  Smartphone,
  Shield,
  Zap,
  Layers,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { styles, colors, hexToRgba } from './Services.styles';
import { services as fallbackServices, type Service } from './services.data';
import ServiceCard from './ServiceCard';
import { fetchPublicServices } from '../../../services/supabaseService';

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
/** Map icon name → lucide-react component */
const ICON_MAP: Record<string, LucideIcon> = {
  Palette, Store, BarChart3, Globe, Code,
  Smartphone, Shield, Zap, Layers, PenTool, Sparkles,
};

function resolveIcon(iconName: string | null): Service['icon'] {
  if (!iconName) return Sparkles;
  return ICON_MAP[iconName] ?? Sparkles;
}

/** Build a ColorAccent palette from a JSON object, falling back to teal */
function resolveColorAccent(raw: Record<string, string> | null): Service['colorAccent'] {
  if (!raw || !raw['500']) return colors.teal;
  // Build a minimal palette — the card only uses a few shades
  return {
    50: raw['50'] ?? colors.teal[50],
    100: raw['100'] ?? colors.teal[100],
    200: raw['200'] ?? colors.teal[200],
    300: raw['300'] ?? colors.teal[300],
    400: raw['400'] ?? colors.teal[400],
    500: raw['500'],
    600: raw['600'] ?? colors.teal[600],
    700: raw['700'] ?? colors.teal[700],
    800: raw['800'] ?? colors.teal[800],
    900: raw['900'] ?? colors.teal[900],
  };
}

function ServicesPreview() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  useEffect(() => {
    let cancelled = false;
    fetchPublicServices()
      .then((rows) => {
        if (cancelled || rows.length === 0) return;
        const mapped: Service[] = rows.map((row, idx) => {
          const accent = resolveColorAccent(row.color_accent as Record<string, string> | null);
          return {
            id: idx + 1,
            icon: resolveIcon(row.icon_name),
            accroche: row.accroche,
            tagline: row.tagline ?? '',
            resume: row.resume ?? '',
            features: row.features ?? [],
            colorAccent: accent,
            glowColor: row.glow_color ?? hexToRgba(accent[500], 0.15),
            redirectUrl: row.redirect_url ?? undefined,
          };
        });
        setServices(mapped);
      })
      .catch(() => {
        // Keep fallback static data on error
      });
    return () => { cancelled = true; };
  }, []);

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
