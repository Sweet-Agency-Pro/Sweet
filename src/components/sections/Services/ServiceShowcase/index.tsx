import { motion, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Service } from '../services.data';

interface ServiceShowcaseProps {
  service: Service;
  isMobile: boolean;
}

// Helper to use the accent color dynamically
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const showcaseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export default function ServiceShowcase({ service }: ServiceShowcaseProps) {
  const IconComponent = service.icon;
  const primaryColor = service.colorAccent[500];
  const darkColor = service.colorAccent[700];

  return (
    <motion.div
      className="service-showcase"
      variants={showcaseVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={service.id} // Important for AnimatePresence
    >
      {/* LEFT COLUMN: HERO MARKETING */}
      <div className="service-showcase__hero">
        <motion.div variants={childVariants} className="service-showcase__icon-wrapper">
          <div 
            className="service-showcase__icon-squircle"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(primaryColor, 0.05)}, ${hexToRgba(primaryColor, 0.15)})`,
              boxShadow: `0 0 40px ${hexToRgba(primaryColor, 0.2)}, inset 0 0 20px ${hexToRgba(primaryColor, 0.1)}`,
              border: `1px solid ${hexToRgba(primaryColor, 0.3)}`
            }}
          >
            <IconComponent 
              className="service-showcase__icon" 
              strokeWidth={1.5} 
              style={{ color: primaryColor }}
            />
          </div>
        </motion.div>

        <motion.h3 variants={childVariants} className="service-showcase__title">
          {service.accroche}
        </motion.h3>

        <motion.p 
          variants={childVariants} 
          className="service-showcase__tagline"
          style={{
            backgroundImage: `linear-gradient(90deg, ${primaryColor}, ${darkColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {service.tagline}
        </motion.p>

        {/* PROMINENT CTA MOVED TO LEFT COLUMN */}
        <motion.div variants={childVariants} className="service-showcase__cta-wrapper">
          <button 
            className="service-showcase__cta"
            style={{
              background: `linear-gradient(90deg, ${primaryColor}, ${darkColor}, ${primaryColor})`,
              backgroundSize: '200% auto',
              animation: 'gradient-shimmer 4s linear infinite',
              boxShadow: `0 8px 25px -5px ${hexToRgba(primaryColor, 0.4)}`
            }}
            onClick={
              service.redirectUrl
                ? () => window.open(service.redirectUrl, '_blank', 'noopener')
                : undefined
            }
          >
            M'intéresse
            <ArrowRight className="service-showcase__cta-icon" />
          </button>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: INFORMATION PANEL & FEATURES */}
      <div className="service-showcase__info-panel">
        <motion.div variants={childVariants} className="service-showcase__resume-card">
          <p>{service.resume}</p>
        </motion.div>

        <div className="service-showcase__features-grid">
          {service.features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={childVariants} 
              className="service-showcase__feature-item"
              style={{
                background: `linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))`,
                borderColor: hexToRgba(primaryColor, 0.2),
              }}
            >
              <div 
                className="service-showcase__feature-check"
                style={{ backgroundColor: hexToRgba(primaryColor, 0.1), color: primaryColor }}
              >
                <CheckCircle2 size={16} strokeWidth={2.5} />
              </div>
              <span className="service-showcase__feature-text">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
