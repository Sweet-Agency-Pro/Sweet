/**
 * ProjectModal Component
 * Modal overlay for project details
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Beaker, Quote } from 'lucide-react';
import type { Project } from '../../../../hooks/useProjects';

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface ProjectModalProps {
  project: Project | undefined;
  selectedId: string | null;
  onClose: () => void;
}

function ProjectModal({ project, selectedId, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  // Keep a snapshot of the last valid project + id so AnimatePresence
  // can render the exit animation with the correct layoutId values
  const lastProjectRef = useRef<Project | undefined>(undefined);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedId && project) {
      lastProjectRef.current = project;
      lastIdRef.current = selectedId;
    }
  }, [selectedId, project]);

  // For rendering: use current values when open, fall back to last values during exit
  const isOpen = !!selectedId && !!project;
  const renderProject = isOpen ? project : lastProjectRef.current;
  const renderId = isOpen ? selectedId : lastIdRef.current;

  const hasPreviewImage = renderProject?.previewUrl && !imageError;
  const accent = renderProject?.colorAccent?.primary || '#0f9aa7';
  const accentSecondary = renderProject?.colorAccent?.secondary || '#06b6d4';
  const gradientOp = renderProject?.colorAccent?.gradient || `linear-gradient(135deg, ${hexToRgba(accent, 0.8)}, ${hexToRgba(accentSecondary, 0.8)})`;
  const gradient = renderProject?.colorAccent?.gradient || `linear-gradient(135deg, ${accent}, ${accentSecondary})`;

  return (
    <AnimatePresence>
      {isOpen && renderProject && renderId && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key={`modal-${renderId}`}
            layoutId={`card-container-${renderId}`}
            className="modal-container"
            style={{
              clipPath: 'inset(0% round 2rem)',
            }}
          >
            <motion.div
              layoutId={`card-inner-${renderId}`}
              layout
              className="modal-inner"
              initial={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }}
              animate={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }}
              exit={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Close button */}
              <button className="modal-close" onClick={onClose}>
                <X className="modal-close-icon" />
              </button>

              {/* Modal content */}
              <div className="modal-content">
                {/* Left side - Info */}
                <div className="modal-info">
                  <motion.div
                    layoutId={`card-tag-${renderId}`}
                    className="modal-concept-tag"
                    style={{
                      background: gradientOp,
                      border: 'none',
                    }}
                  >
                    {renderProject.type === 'production' ? (
                      <Sparkles className="flagship__tag-icon" />
                    ) : (
                      <Beaker className="flagship__tag-icon" />
                    )}
                    <span style={{ color: 'white' }}>{renderProject.type === 'production' ? 'Production' : 'Concept'}</span>
                  </motion.div>

                  <motion.h3 layoutId={`card-title-${renderId}`} className="modal-title">
                    {renderProject.name}
                  </motion.h3>

                  <motion.p layoutId={`card-hook-${renderId}`} className="modal-hook">
                    {renderProject.hook}
                  </motion.p>

                  <motion.p
                    className="modal-story"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {renderProject.story}
                  </motion.p>

                  {renderProject.benefit && (
                    <motion.div
                      className="modal-benefit"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote className="modal-quote-icon" />
                      <p className="modal-benefit-text">{renderProject.benefit}</p>
                    </motion.div>
                  )}

                  <motion.div
                    className="modal-tech"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span className="modal-tech-label">Stack Technique</span>
                    <div className="modal-tech-row">
                      {renderProject.tech.map((t: string) => (
                        <span
                          key={t}
                          className="modal-tech-badge"
                          style={{
                            backgroundColor: hexToRgba(accent, 0.1),
                            borderColor: renderProject.colorAccent.primary,
                            color: renderProject.colorAccent.primary,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.button
                    className="modal-cta"
                    style={{
                      background:
                        renderProject.colorAccent.gradient ||
                        gradient ||
                        renderProject.colorAccent.primary ||
                        '#14b8a6',
                      backgroundSize: '200% auto',
                      animation: 'gradient-shimmer 4s linear infinite',
                      ...(renderProject.externalUrl ? {} : { opacity: 0.5, cursor: 'default' }),
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={renderProject.externalUrl ? { scale: 1.03 } : {}}
                    whileTap={renderProject.externalUrl ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (renderProject.externalUrl) {
                        window.open(renderProject.externalUrl, '_blank', 'noopener');
                      }
                    }}
                  >
                    <span>Voir le projet</span>
                    <ExternalLink className="modal-cta-icon" />
                  </motion.button>
                </div>

                {/* Right side - Visual */}
                <motion.div
                  className="modal-visual"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div
                    className="modal-orb"
                    style={{
                      background: renderProject.colorAccent.gradient,
                    }}
                  />

                  {/* Preview image or fallback mockup */}
                  {hasPreviewImage ? (
                    <div className="modal-mockup">
                      <div className="mockup-header">
                        <div className="mockup-dots">
                          <span className="mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                          <span className="mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                          <span className="mockup-dot" style={{ backgroundColor: '#28c840' }} />
                        </div>
                      </div>
                      <img
                        src={renderProject.previewUrl}
                        alt={`Preview de ${renderProject.name}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'cover',
                        }}
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div className="modal-mockup">
                      <div className="mockup-header">
                        <div className="mockup-dots">
                          <span className="mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                          <span className="mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                          <span className="mockup-dot" style={{ backgroundColor: '#28c840' }} />
                        </div>
                      </div>
                      <div className="modal-mockup-content">
                        <div
                          className="mockup-accent-bar"
                          style={{
                            background: renderProject.colorAccent.gradient,
                          }}
                        />
                        <div className="mockup-line" />
                        <div className="mockup-line" style={{ width: '70%' }} />
                        <div className="mockup-line" style={{ width: '50%' }} />
                        <div className="mockup-block-large" />
                        <div className="mockup-grid">
                          <div className="mockup-grid-item" />
                          <div className="mockup-grid-item" />
                          <div className="mockup-grid-item" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;
