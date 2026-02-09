/**
 * ProjectModal Component
 * Modal overlay for project details
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Beaker, Quote } from 'lucide-react';
import { styles } from '../Portfolio.styles';
import type { Project } from '../../../../hooks/useProjects';

interface ProjectModalProps {
  project: Project | undefined;
  selectedId: string | null;
  isMobileOrTablet: boolean;
  onClose: () => void;
}

function ProjectModal({ project, selectedId, isMobileOrTablet, onClose }: ProjectModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!selectedId || !project) return null;

  const hasPreviewImage = project.previewUrl && !imageError;
  console.log('Rendering ProjectModal for:', project.name, 'Has preview image:', hasPreviewImage);

  return (
    <AnimatePresence>
      {selectedId && project && (
        <>
          {/* Backdrop */}
          <motion.div
            style={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            layoutId={`card-container-${selectedId}`}
            style={{
              ...styles.modal,
              ...(isMobileOrTablet && styles.modalMobileContainer),
            }}
          >
            <motion.div
              layoutId={`card-inner-${selectedId}`}
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
                    layoutId={`card-tag-${selectedId}`}
                    style={
                      project.type === 'production'
                        ? styles.productionTag
                        : styles.modalConceptTag
                    }
                  >
                    {project.type === 'production' ? (
                      <Sparkles style={styles.tagIcon} />
                    ) : (
                      <Beaker style={styles.tagIcon} />
                    )}
                    <span>{project.type === 'production' ? 'Production' : 'Concept'}</span>
                  </motion.div>

                  <motion.h3 layoutId={`card-title-${selectedId}`} style={styles.modalTitle}>
                    {project.name}
                  </motion.h3>

                  <motion.p layoutId={`card-hook-${selectedId}`} style={styles.modalHook}>
                    {project.hook}
                  </motion.p>

                  <motion.p
                    style={styles.modalStory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {project.story}
                  </motion.p>

                  {project.benefit && (
                    <motion.div
                      style={styles.benefitBox}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote style={styles.quoteIcon} />
                      <p style={styles.benefitText}>{project.benefit}</p>
                    </motion.div>
                  )}

                  <motion.div
                    style={styles.modalTechSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <span style={styles.techLabel}>Stack Technique</span>
                    <div style={styles.modalTechRow}>
                      {project.tech.map((t: string) => (
                        <span
                          key={t}
                          style={{
                            ...styles.modalTechBadge,
                            backgroundColor: project.colorAccent.light,
                            borderColor: project.colorAccent.primary,
                            color: project.colorAccent.primary,
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
                        project.colorAccent.gradient ||
                        project.colorAccent.primary ||
                        '#14b8a6',
                      ...(project.externalUrl ? {} : { opacity: 0.5, cursor: 'default' }),
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={project.externalUrl ? { scale: 1.03 } : {}}
                    whileTap={project.externalUrl ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (project.externalUrl) {
                        window.open(project.externalUrl, '_blank', 'noopener');
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
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <div
                    style={{
                      ...styles.modalGradientOrb,
                      background: project.colorAccent.gradient,
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
                            background: project.colorAccent.gradient,
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
