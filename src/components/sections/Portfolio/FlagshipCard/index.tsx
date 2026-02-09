/**
 * FlagshipCard Component
 * Featured project card with visual mockup
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { styles } from '../Portfolio.styles';
import theme from '../../../../styles/theme';
import type { Project } from '../../../../hooks/useProjects';

interface FlagshipCardProps {
  project: Project;
  isMobile: boolean;
  isMobileOrTablet: boolean;
  onClick: () => void;
}

function FlagshipCard({ project, isMobile, isMobileOrTablet, onClick }: FlagshipCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasPreviewImage = project.previewUrl && !imageError;
  const accent = project.colorAccent?.primary || '#0f9aa7';
  const accentSecondary = project.colorAccent?.secondary || '#06b6d4';
  const accentLight = project.colorAccent?.light || 'rgba(15, 154, 167, 0.12)';
  const gradient = project.colorAccent?.gradient || `linear-gradient(135deg, ${accent}, ${accentSecondary})`;
  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      onClick={onClick}
      style={{
        ...styles.flagshipCard,
        ...(isMobileOrTablet && styles.flagshipCardMobile),
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      whileHover={{ y: -8 }}
    >
      <div style={{
        ...styles.flagshipGlow,
        background: `linear-gradient(135deg, ${theme.hexToRgba(accent, 0.15)}, ${theme.hexToRgba(accentSecondary, 0.1)})`,
      }} />
      <motion.div layoutId={`card-inner-${project.id}`} style={styles.flagshipInner}>
        <div style={{
          ...styles.flagshipContent,
          ...(isMobileOrTablet && styles.flagshipContentMobile),
        }}>
          <div style={styles.flagshipLeft}>
            <motion.div layoutId={`card-tag-${project.id}`} style={{
              ...styles.productionTag,
              background: gradient,
            }}>
              <Sparkles style={styles.tagIcon} />
              <span>Production</span>
            </motion.div>

            <motion.h3 layoutId={`card-title-${project.id}`} style={{
              ...styles.flagshipTitle,
              ...(isMobile && styles.flagshipTitleMobile),
            }}>
              {project.name}
            </motion.h3>

            <motion.p layoutId={`card-hook-${project.id}`} style={styles.flagshipHook}>
              {project.hook}
            </motion.p>

            <div style={{
              ...styles.flagshipTechRow,
              ...(isMobile && styles.flagshipTechRowMobile),
            }}>
              {project.tech.slice(0, isMobile ? 3 : project.tech.length).map((t: string) => (
                <span
                  key={t}
                  style={{
                    ...styles.techBadge,
                    backgroundColor: accentLight,
                    borderColor: accent,
                    color: accent,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <button style={{
              ...styles.flagshipCta,
              ...(isMobileOrTablet && styles.flagshipCtaMobile),
              background: gradient,
            }}>
              <span>Explorer le projet</span>
              <ArrowRight style={styles.ctaIcon} />
            </button>
          </div>

          {/* Visual mockup - hidden on mobile */}
          {!isMobile && (
            <div style={styles.flagshipVisual}>
              <div
                style={{
                  ...styles.flagshipGradientOrb,
                  background: project.colorAccent.gradient,
                }}
              />
              <div style={styles.flagshipMockup}>
                <div style={styles.mockupHeader}>
                  <div style={styles.mockupDots}>
                    <span style={{ ...styles.mockupDot, backgroundColor: '#ff5f57' }} />
                    <span style={{ ...styles.mockupDot, backgroundColor: '#febc2e' }} />
                    <span style={{ ...styles.mockupDot, backgroundColor: '#28c840' }} />
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
                  <div style={styles.mockupContent}>
                    <div style={styles.mockupLine} />
                    <div style={{ ...styles.mockupLine, width: '60%' }} />
                    <div style={styles.mockupBlock} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FlagshipCard;
