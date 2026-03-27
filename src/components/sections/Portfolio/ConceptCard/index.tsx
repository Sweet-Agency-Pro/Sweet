/**
 * ConceptCard Component
 * Individual concept/lab project card
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Beaker, ArrowRight } from 'lucide-react';
import type { Project } from '../../../../hooks/useProjects';

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface ConceptCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ConceptCard({ project, index, onClick }: ConceptCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPreviewImage = project.previewUrl && !imageError;
  const accent = project.colorAccent?.primary || '#0f9aa7';
  const accentSecondary = project.colorAccent?.secondary || '#06b6d4';
  const gradient = project.colorAccent?.gradient || `linear-gradient(135deg, ${accent}, ${accentSecondary})`;

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      className="concept"
      style={{ clipPath: 'inset(0% round 2rem)' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.1,
        layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0 },
      }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <motion.div 
        layoutId={`card-inner-${project.id}`} 
        className="concept__inner"
        style={{ 
          boxShadow: `0 0.25rem 2rem -0.25rem ${hexToRgba(accent, 0.2)}`, 
          clipPath: 'inset(0% round 2rem)' 
        }}
      >
        <div className="concept__visual">
          <div
            className="concept__orb"
            style={{
              background: gradient,
            }}
          />
          <div className="concept__mockup">
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
                alt={`Preview de ${project.name}`}
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

        <motion.div layoutId={`card-tag-${project.id}`} className="concept__tag">
          {project.type === 'production' ? (
            <Sparkles className="concept__tag-icon" />
          ) : (
            <Beaker className="concept__tag-icon" />
          )}
          <span>{project.type === 'production' ? 'Production' : 'Concept'}</span>
        </motion.div>

        <motion.h4 layoutId={`card-title-${project.id}`} className="concept__title">
          {project.name}
        </motion.h4>

        <motion.p layoutId={`card-hook-${project.id}`} className="concept__hook">
          {project.hook}
        </motion.p>

        <div className="concept__tech-row">
          {project.tech.slice(0, 3).map((t: string) => (
            <span
              key={t}
              className="concept__tech-badge"
              style={{
                borderColor: accent,
                color: accent,
                backgroundColor: hexToRgba(accent, 0.1),
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="concept__footer">
          <span className="concept__cta">Découvrir</span>
          <ArrowRight
            className="concept__cta-icon"
            style={{
              color: project.colorAccent.primary,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ConceptCard;
