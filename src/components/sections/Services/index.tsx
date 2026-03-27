/**
 * Services Section Component
 * Apple-style Interactive Showcase layout (UI/UX Pro Max)
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import ServiceShowcase from './ServiceShowcase';
import { fetchPublicServices } from '../../../services/supabaseService';
import './Services.css';

// Hex to Rgba helper for dynamic styles
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
        <span className="services__badge-text">Nos Expertises</span>
      </div>

      <h2 className="services__title">
        Solutions Numériques<br />
        <span className="services__title-gradient">Sur Mesure</span>
      </h2>

      <p className="services__description">
        Découvrez nos 3 piliers d'excellence pour construire et piloter votre écosystème digital.
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
          Démarrer un projet
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
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [activeTabId, setActiveTabId] = useState<number>(fallbackServices[0]?.id || 1);
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
        if (mapped.length > 0) setActiveTabId(mapped[0].id);
      })
      .catch(() => {
        // Keep fallback static data on error
      });
    return () => { cancelled = true; };
  }, []);

  const activeService = services.find(s => s.id === activeTabId) || services[0];

  return (
    <section 
      id="services" 
      className="services"
      style={{
        '--selection-bg': activeService.colorAccent[200],
        '--selection-text': activeService.colorAccent[900],
      } as React.CSSProperties}
    >
      <div className="services__container">
        <SectionHeader />

        {/* Apple-Style Navigation Tabs */}
        <div className="services__tabs-wrapper">
          <div className="services__tabs">
            {services.map((s) => {
              const isActive = activeTabId === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveTabId(s.id)}
                  className={`services__tab ${isActive ? 'active' : ''}`}
                  style={{
                    color: isActive ? 'var(--white)' : 'var(--slate-500)',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-service-tab"
                      className="services__tab-indicator"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${s.colorAccent[500]}, ${s.colorAccent[300]}, ${s.colorAccent[500]})`,
                        backgroundSize: '200% auto',
                        animation: 'gradient-shimmer 8s linear infinite',
                        border: `1px solid ${s.colorAccent[400]}`
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="services__tab-text">{s.accroche}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Area */}
        <div className="services__showcase-wrapper">
          <AnimatePresence mode="wait">
            {activeService && (
              <ServiceShowcase
                key={activeService.id}
                service={activeService}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </div>

        <CTABanner />
      </div>
    </section>
  );
}

export default ServicesPreview;
