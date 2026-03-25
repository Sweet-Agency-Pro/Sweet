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
import { useSectionNavigation } from '../../../hooks/useSectionNavigation';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { services as fallbackServices, type Service } from './services.data';
import ServiceCard from './ServiceCard';
import { fetchPublicServices } from '../../../services/supabaseService';
import './Services.css';

// Hex to Rgba helper for fallback
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Fallback teal colors for fallbackAccent
const tealAccent = {
  50: '#f0fdfa',
  100: '#ccfbf1',
  200: '#99f6e4',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Section Header with badge and title */
function SectionHeader() {
  return (
    <div className="services__header">
      <div className="services__badge">
        <Sparkles className="services__badge-icon" />
        <span className="services__badge-text">Nos Services</span>
      </div>

      <h2 className="services__title">
        Solutions Numériques<br/>
        <span className="services__title-gradient">Sur Mesure</span>
      </h2>

      <p className="services__description">
        Trois piliers pour construire votre présence en ligne : du site vitrine 
        à l'e-commerce, en passant par l'administration complète de votre écosystème digital.
      </p>
    </div>
  );
}

/** CTA Banner at the bottom */
function CTABanner() {
  const { navigateToSection } = useSectionNavigation();

  return (
    <div className="services__cta-banner">
      <div className="services__cta-content">
        <h3 className="services__cta-title">
          Prêt à transformer votre présence numérique ?
        </h3>
        <p className="services__cta-description">
          Parlons ensemble de comment nos solutions peuvent propulser votre activité vers l'avant.
        </p>
      </div>
      <button className="services__cta-button" onClick={() => navigateToSection('contact')}>
        <div className="services__cta-button-bg" />
        <div className="services__cta-button-hover" />
        <span className="services__cta-button-content">
          Commencer un projet
          <ArrowRight className="services__cta-button-icon" />
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
  if (!raw || !raw['500']) return tealAccent;
  // Build a minimal palette — the card only uses a few shades
  return {
    50: raw['50'] ?? tealAccent[50],
    100: raw['100'] ?? tealAccent[100],
    200: raw['200'] ?? tealAccent[200],
    300: raw['300'] ?? tealAccent[300],
    400: raw['400'] ?? tealAccent[400],
    500: raw['500'],
    600: raw['600'] ?? tealAccent[600],
    700: raw['700'] ?? tealAccent[700],
    800: raw['800'] ?? tealAccent[800],
    900: raw['900'] ?? tealAccent[900],
  };
}

function ServicesPreview() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const { isMobile } = useWindowSize();

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
    <section id="services" className="services">
      <div className="services__container">
        <SectionHeader />

        {/* Services Grid */}
        <div className="services__grid">
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

        <CTABanner />
      </div>
    </section>
  );
}

export default ServicesPreview;
