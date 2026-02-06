/**
 * ServiceCard Component
 * Individual service card with hover effects
 */

import { ArrowRight } from 'lucide-react';
import { styles, colors } from '../Services.styles';
import type { Service } from '../services.data';

interface ServiceCardProps {
  service: Service;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ServiceCard({ service, isHovered, onHover, onLeave }: ServiceCardProps) {
  const IconComponent = service.icon;

  return (
    <div
      style={{
        ...styles.cardWrapper,
        ...(isHovered ? styles.cardWrapperHovered : {}),
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Glow effect */}
      <div
        style={{
          ...styles.cardGlow,
          background: service.glowColor,
          opacity: isHovered ? 1 : 0.5,
        }}
      />

      {/* Card inner */}
      <div style={{
        ...styles.cardInner,
        borderColor: isHovered ? service.colorAccent[400] : colors.slate[200],
      }}>
        {/* Icon */}
        <div style={{
          ...styles.iconContainer,
          backgroundColor: service.colorAccent[50],
          borderColor: service.colorAccent[200],
        }}>
          <IconComponent
            style={{
              ...styles.icon,
              color: service.colorAccent[600],
            }}
          />
        </div>

        {/* Content */}
        <div style={styles.cardContent}>
          <h3 style={styles.cardTitle}>{service.accroche}</h3>
          <p style={styles.cardTagline}>{service.tagline}</p>

          {/* Resume - shown on hover */}
          <div
            style={{
              ...styles.cardResume,
              opacity: isHovered ? 1 : 0,
              maxHeight: isHovered ? '12.5rem' : '0',
            }}
          >
            <p style={styles.resumeText}>{service.resume}</p>
          </div>

          {/* Features - shown on hover */}
          <div
            style={{
              ...styles.features,
              opacity: isHovered ? 1 : 0,
              display: isHovered ? 'grid' : 'none',
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
          borderTopColor: isHovered ? service.colorAccent[200] : colors.slate[100],
        }}>
          <button style={{
            ...styles.learnMoreButton,
            color: isHovered ? service.colorAccent[600] : colors.slate[600],
          }}>
            <span>En savoir plus</span>
            <ArrowRight style={{
              ...styles.arrowIcon,
              transform: isHovered ? 'translateX(0.25rem)' : 'translateX(0)',
            }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
