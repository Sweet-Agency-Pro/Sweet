import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchPublicServices } from '../../../../../services/supabaseService';
import { services as fallbackServices, type Service } from '../../../../sections/Services/services.data';
import './ServiceTabs.css';

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

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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

interface ServiceTabsProps {
  /** Mode: 'navigate' redirects to the service page URL. 'switch' calls onTabChange with ID. */
  mode: 'navigate' | 'switch';
  /** If in 'switch' mode, the ID of the currently active tab */
  activeTabId?: number;
  /** If in 'navigate' mode, the redirectUrl of the current page. If none, match by name. */
  currentSlug?: string;
  /** Callback when a tab is clicked in 'switch' mode */
  onTabChange?: (id: number) => void;
  /** Visual variants */
  variant?: 'light' | 'dark';
}

function ServiceTabs({
  mode,
  activeTabId,
  currentSlug,
  onTabChange,
  variant = 'light',
}: ServiceTabsProps) {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    fetchPublicServices()
      .then((rows) => {
        if (cancelled || rows.length === 0) return;
        const mapped: Service[] = rows.map((row, idx) => {
          const accent = resolveColorAccent(row.color_accent as Record<string, string> | null);
          return {
            id: idx + 1,
            icon: undefined as any, // Not needed for tabs
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

  const handleTabClick = (service: Service) => {
    if (mode === 'navigate') {
      if (service.redirectUrl && service.redirectUrl !== currentSlug) {
        navigate(service.redirectUrl);
      }
    } else if (mode === 'switch' && onTabChange) {
      onTabChange(service.id);
    }
  };

  const getIsActive = (service: Service) => {
    if (mode === 'switch') {
      return activeTabId === service.id;
    }
    // In navigate mode, try to match current slug to redirectUrl
    return currentSlug === service.redirectUrl;
  };

  return (
    <div className={`services-tabs-shared services-tabs-shared--${variant}`}>
      <div className="services-tabs-shared__scroll">
        {services.map((s) => {
          const isActive = getIsActive(s);
          
          return (
            <button
              key={s.id}
              onClick={() => handleTabClick(s)}
              className={`services-tabs-shared__tab ${isActive ? 'active' : ''}`}
              style={{
                color: isActive ? 'var(--white)' : (variant === 'dark' ? 'rgba(255,255,255,0.7)' : 'var(--slate-500)'),
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-service-tab-shared"
                  className="services-tabs-shared__indicator"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${s.colorAccent[500]}, ${s.colorAccent[300]}, ${s.colorAccent[500]})`,
                    backgroundSize: '200% auto',
                    animation: 'gradient-shimmer 8s linear infinite',
                    border: `1px solid ${s.colorAccent[400]}`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="services-tabs-shared__text">{s.accroche}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceTabs;
