/**
 * ProjectModal Component
 * Modal overlay for project details
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Beaker, Quote } from 'lucide-react';
import { styles } from '../Portfolio.styles';
import type { Project } from '../../../../hooks/useProjects';
import { hexToRgba } from '../../Services/Services.styles';

interface ProjectModalProps {
  project: Project | undefined;
  selectedId: string | null;
  isMobileOrTablet: boolean;
  onClose: () => void;
}

function ProjectModal({ project, selectedId, isMobileOrTablet, onClose }: ProjectModalProps) {
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
            style={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key={`modal-${renderId}`}
            layoutId={`card-container-${renderId}`}
            style={{
              ...styles.modal,
              ...(isMobileOrTablet && styles.modalMobileContainer),
              clipPath: 'inset(0% round 2rem)',
            }}
          >
            <motion.div
              layoutId={`card-inner-${renderId}`}
              layout
              style={{
                ...styles.modalInner,
                ...(isMobileOrTablet && styles.modalInnerMobile),
              }}
              initial={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }}
              animate={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }}
              exit={{ borderRadius: '2rem', clipPath: 'inset(0% round 2rem)' }} 
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Close button */}
              <button style={styles.closeButton} onClick={onClose}>
                <X style={styles.closeIcon} />
              </button>

              {/* Modal content */}
              <div style={{
                ...styles.modalContent,
                ...(isMobileOrTablet && styles.modalContentMobile),
              }}>
                {/* Left side - Info */}
                <div style={styles.modalInfo}>
                  <motion.div
                    layoutId={`card-tag-${renderId}`}
                    style={
                      renderProject.type === 'production'
                        ? { ...styles.productionTag, background: gradientOp }
                        : {
                            ...styles.modalConceptTag,
                            background: gradientOp,
                          }
                    }
                  >
                    {renderProject.type === 'production' ? (
                      <Sparkles style={styles.tagIcon} />
                    ) : (
                      <Beaker style={styles.tagIcon} />
                    )}
                    <span style={{ color: 'white' }}>{renderProject.type === 'production' ? 'Production' : 'Concept'}</span>
                  </motion.div>

                  <motion.h3 layoutId={`card-title-${renderId}`} style={styles.modalTitle}>
                    {renderProject.name}
                  </motion.h3>

                  <motion.p layoutId={`card-hook-${renderId}`} style={styles.modalHook}>
                    {renderProject.hook}
                  </motion.p>

                  <motion.p
                    style={styles.modalStory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {renderProject.story}
                  </motion.p>

                  {renderProject.benefit && (
                    <motion.div
                      style={styles.benefitBox}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote style={styles.quoteIcon} />
                      <p style={styles.benefitText}>{renderProject.benefit}</p>
                    </motion.div>
                  )}

                  <motion.div
                    style={styles.modalTechSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span style={styles.techLabel}>Stack Technique</span>
                    <div style={styles.modalTechRow}>
                      {renderProject.tech.map((t: string) => (
                        <span
                          key={t}
                          style={{
                            ...styles.modalTechBadge,
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
                    style={{
                      ...styles.modalCta,
                      background:
                        renderProject.colorAccent.gradient ||
                        gradient ||
                        renderProject.colorAccent.primary ||
                        '#14b8a6',
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
                    <ExternalLink style={styles.modalCtaIcon} />
                  </motion.button>
                </div>

                {/* Right side - Visual */}
                <motion.div
                  style={styles.modalVisual}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div
                    style={{
                      ...styles.modalGradientOrb,
                      background: renderProject.colorAccent.gradient,
                    }}
                  />
                  
                  {/* Preview image or fallback mockup */}
                  {hasPreviewImage ? (
                    <div style={styles.modalMockup}>
                      <div style={styles.mockupHeader}>
                        <div style={styles.mockupDots}>
                          <span style={{ ...styles.mockupDot, backgroundColor: '#ff5f57' }} />
                          <span style={{ ...styles.mockupDot, backgroundColor: '#febc2e' }} />
                          <span style={{ ...styles.mockupDot, backgroundColor: '#28c840' }} />
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
                    <div style={styles.modalMockup}>
                      <div style={styles.mockupHeader}>
                        <div style={styles.mockupDots}>
                          <span style={{ ...styles.mockupDot, backgroundColor: '#ff5f57' }} />
                          <span style={{ ...styles.mockupDot, backgroundColor: '#febc2e' }} />
                          <span style={{ ...styles.mockupDot, backgroundColor: '#28c840' }} />
                        </div>
                      </div>
                      <div style={styles.modalMockupContent}>
                        <div
                          style={{
                            ...styles.mockupAccentBar,
                            background: renderProject.colorAccent.gradient,
                          }}
                        />
                        <div style={styles.mockupLine} />
                        <div style={{ ...styles.mockupLine, width: '70%' }} />
                        <div style={{ ...styles.mockupLine, width: '50%' }} />
                        <div style={styles.mockupBlockLarge} />
                        <div style={styles.mockupGrid}>
                          <div style={styles.mockupGridItem} />
                          <div style={styles.mockupGridItem} />
                          <div style={styles.mockupGridItem} />
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
