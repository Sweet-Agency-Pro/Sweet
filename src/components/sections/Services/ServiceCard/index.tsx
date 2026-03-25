/**
 * ServiceCard Component
 * Individual service card with scroll animation and mobile expand
 */

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import type { Service } from '../services.data';

interface ServiceCardProps {
  service: Service;
  isHovered: boolean;
  isMobile: boolean;
  onHover: () => void;
  onLeave: () => void;
}

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function ServiceCard({ service, isHovered, isMobile, onHover, onLeave }: ServiceCardProps) {
  const IconComponent = service.icon;
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  // Desktop: expand on hover | Mobile: expand on button click
  const isExpanded = isMobile ? isOpen : isHovered;

  return (
    <motion.div
      ref={cardRef}
      className={`service-card ${isExpanded && !isMobile ? 'service-card--hovered' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow effect */}
      <div
        className="service-card__glow"
        style={{
          background: service.glowColor,
          opacity: isExpanded ? 1 : 0.5,
        }}
      />

      {/* Card inner */}
      <div 
        className="service-card__inner"
        style={{
          // UNIFORMITÉ 1 : La bordure de la carte prend la couleur d'accent (500) quand elle est ouverte
          borderColor: isExpanded ? service.colorAccent[500] : 'var(--slate-200)',
        }}
      >
        {/* Icon */}
        <div 
          className="service-card__icon-container"
          style={{
            // UNIFORMITÉ 2 : Fond et bordure de l'icône utilisent toujours la couleur d'accent
            backgroundColor: hexToRgba(service.colorAccent[500], 0.15), 
            borderColor: service.colorAccent[500],
          }}
        >
          <IconComponent
            className="service-card__icon"
            style={{
              color: service.colorAccent[500],
            }}
          />
        </div>

        {/* Content */}
        <div className="service-card__content">
          <h3 className="service-card__title">{service.accroche}</h3>
          <p className="service-card__tagline">{service.tagline}</p>

          {/* Resume - expandable on mobile, hover on desktop */}
          <div
            className="service-card__resume"
            style={{
              opacity: isExpanded ? 1 : 0,
              maxHeight: isExpanded ? '20rem' : '0',
            }}
          >
            <p className="service-card__resume-text">{service.resume}</p>
          </div>

          {/* Features - expandable on mobile, hover on desktop */}
          <div
            className="service-card__features"
            style={{
              opacity: isExpanded ? 1 : 0,
              display: isExpanded ? 'grid' : 'none',
            }}
          >
            {service.features.map((feature, idx) => (
              <div key={idx} className="service-card__feature">
                {/* UNIFORMITÉ 3 : Les points features utilisent la couleur d'accent (500) */}
                <div 
                  className="service-card__feature-dot"
                  style={{
                    backgroundColor: service.colorAccent[500],
                  }} 
                />
                <span className="service-card__feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div 
          className="service-card__footer"
          style={{
            // UNIFORMITÉ 4 : La barre de séparation se colore quand la carte est ouverte
            borderTopColor: isExpanded ? service.colorAccent[500] : 'var(--slate-100)',
          }}
        >
          <button
            className="service-card__btn"
            style={{
              // UNIFORMITÉ 5 : Le texte et l'icône prennent la couleur d'accent (600)
              color: isExpanded ? service.colorAccent[500] : 'var(--slate-600)',
            }}
            onClick={
              isMobile
                ? () => setIsOpen((prev) => !prev)
                : service.redirectUrl
                  ? () => window.open(service.redirectUrl, '_blank', 'noopener')
                  : undefined
            }
          >
            <span>{isMobile && isOpen ? 'Réduire' : 'En savoir plus'}</span>
            {isMobile ? (
              <ChevronDown
                className="service-card__arrow"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  // L'icône chevron suit aussi la couleur
                  color: isExpanded ? service.colorAccent[500] : 'inherit',
                }}
              />
            ) : (
              <ArrowRight 
                className="service-card__arrow"
                style={{
                  transform: isExpanded ? 'translateX(0.25rem)' : 'translateX(0)',
                  // L'icône flèche suit aussi la couleur
                  color: isExpanded ? service.colorAccent[500] : 'inherit',
                }} 
              />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;