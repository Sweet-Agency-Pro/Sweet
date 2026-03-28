/**
 * FlagshipCard Component
 * Featured project card with visual mockup
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import type { Project } from '../../../../hooks/useProjects';

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface FlagshipCardProps {
  project: Project;
  onClick: () => void;
}

function FlagshipCard({ project, onClick }: FlagshipCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPreviewImage = project.previewUrl && !imageError;
  const accent = project.colorAccent?.primary || '#0f9aa7';
  const accentSecondary = project.colorAccent?.secondary || '#06b6d4';
  const accentLight = project.colorAccent?.light || 'rgba(15, 154, 167, 0.12)';
  const gradient = project.colorAccent?.gradient || `linear-gradient(135deg, ${accent}, ${accentSecondary}, ${accent})`;

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      className="flagship"
      style={{
        clipPath: 'inset(0% round 2rem)',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay: 0.1,
        layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0 },
      }}
      whileHover={{ y: -8 }}
    >
      <div
        className="flagship__glow"
        style={{
          background: `linear-gradient(135deg, ${hexToRgba(accent, 0.15)}, ${hexToRgba(accentSecondary, 0.1)})`,
        }}
      />
      <motion.div layoutId={`card-inner-${project.id}`} className="flagship__inner" style={{ clipPath: 'inset(0% round 2rem)' }}>
        <div className="flagship__content">
          <div className="flagship__left">
            <motion.div
              layoutId={`card-tag-${project.id}`}
              className="flagship__tag"
              style={{
                background: gradient,
              }}
            >
              <Sparkles className="flagship__tag-icon" />
              <span>Production</span>
            </motion.div>

            <motion.h3 layoutId={`card-title-${project.id}`} className="flagship__title">
              {project.name}
            </motion.h3>

            <motion.p layoutId={`card-hook-${project.id}`} className="flagship__hook">
              {project.hook}
            </motion.p>

            <div className="flagship__tech-row">
              {project.tech.map((t: string) => (
                <span
                  key={t}
                  className="flagship__tech-badge"
                  style={{
                    backgroundColor: accentLight,
                    borderColor: accent,
                    color: accent,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              className="flagship__cta"
              style={{
                background: gradient,
                backgroundSize: '200% auto',
                animation: 'gradient-shimmer 4s linear infinite'
              }}
            >
              <span>Explorer le projet</span>
              <ArrowRight className="flagship__cta-icon" />
            </button>
          </div>

          <div className="flagship__visual">
            <div
              className="flagship__orb"
              style={{
                background: project.colorAccent.gradient,
              }}
            />
            <div className="flagship__mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span className="mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                  <span className="mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                  <span className="mockup-dot" style={{ backgroundColor: '#28c840' }} />
                </div>
              </div>
              {hasPreviewImage ? (
                <img
                  src={project.previewUrl}
                  alt={`Aperçu du projet ${project.name}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="mockup-content">
                  <div className="mockup-line" />
                  <div className="mockup-line" style={{ width: '60%' }} />
                  <div className="mockup-block" />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FlagshipCard;
