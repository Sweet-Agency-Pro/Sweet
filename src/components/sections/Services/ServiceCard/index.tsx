/**
 * ServiceCard Component
 * Individual service card with scroll animation and mobile expand
 */

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { styles, colors } from '../Services.styles';
import type { Service } from '../services.data';

interface ServiceCardProps {
  service: Service;
  isHovered: boolean;
  isMobile: boolean;
  onHover: () => void;
  onLeave: () => void;
}

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
      style={{
        ...styles.cardWrapper,
        ...(isExpanded && !isMobile ? styles.cardWrapperHovered : {}),
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow effect */}
      <div
        style={{
          ...styles.cardGlow,
          background: service.glowColor,
          opacity: isExpanded ? 1 : 0.5,
        }}
      />

      {/* Card inner */}
      <div style={{
        ...styles.cardInner,
        ...(isMobile && styles.cardInnerMobile),
        borderColor: isExpanded ? service.colorAccent[400] : colors.slate[200],
      }}>
        {/* Icon */}
        <div style={{
          ...styles.iconContainer,
          ...(isMobile && styles.iconContainerMobile),
          backgroundColor: service.colorAccent[50],
          borderColor: service.colorAccent[200],
        }}>
          <IconComponent
            style={{
              ...styles.icon,
              ...(isMobile && styles.iconMobile),
              color: service.colorAccent[600],
            }}
          />
        </div>

        {/* Content */}
        <div style={styles.cardContent}>
          <h3 style={{
            ...styles.cardTitle,
            ...(isMobile && styles.cardTitleMobile),
          }}>{service.accroche}</h3>
          <p style={{
            ...styles.cardTagline,
            ...(isMobile && styles.cardTaglineMobile),
          }}>{service.tagline}</p>

          {/* Resume - expandable on mobile, hover on desktop */}
          <div
            style={{
              ...styles.cardResume,
              opacity: isExpanded ? 1 : 0,
              maxHeight: isExpanded ? '20rem' : '0',
            }}
          >
            <p style={styles.resumeText}>{service.resume}</p>
          </div>

          {/* Features - expandable on mobile, hover on desktop */}
          <div
            style={{
              ...styles.features,
              ...(isMobile && styles.featuresMobile),
              opacity: isExpanded ? 1 : 0,
              display: isExpanded ? 'grid' : 'none',
            }}
          >
            {service.features.map((feature, idx) => (
              <div key={idx} style={styles.feature}>
                <div style={{
                  ...styles.featureDot,
                  backgroundColor: service.colorAccent[500],
                }} />
                <span style={styles.featureText}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          ...styles.cardFooter,
          borderTopColor: isExpanded ? service.colorAccent[200] : colors.slate[100],
        }}>
          <button
            style={{
              ...styles.learnMoreButton,
              color: isExpanded ? service.colorAccent[600] : colors.slate[600],
            }}
            onClick={isMobile ? () => setIsOpen((prev) => !prev) : undefined}
          >
            <span>{isMobile && isOpen ? 'Réduire' : 'En savoir plus'}</span>
            {isMobile ? (
              <ChevronDown
                style={{
                  ...styles.arrowIcon,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            ) : (
              <ArrowRight style={{
                ...styles.arrowIcon,
                transform: isExpanded ? 'translateX(0.25rem)' : 'translateX(0)',
              }} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ServiceCard;
