/**
 * ConceptCard Component
 * Individual concept/lab project card
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Beaker, ArrowRight } from 'lucide-react';
import { styles } from '../Portfolio.styles';
import type { Project } from '../../../../hooks/useProjects';
import { hexToRgba } from '../../Services/Services.styles';

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
      style={styles.conceptCard}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <motion.div layoutId={`card-inner-${project.id}`} style={{ ...styles.conceptInner, boxShadow: `0 0.25rem 2rem -0.25rem ${hexToRgba(accent, 0.2)}` }}>
        {/* Preview image or accent bar */}
        {hasPreviewImage ? (
          <img
            src={project.previewUrl}
            alt={`Preview de ${project.name}`}
            style={{
              width: '100%',
              height: '8rem',
              objectFit: 'cover',
              borderRadius: '0.75rem 0.75rem 0 0',
              marginBottom: '1rem',
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            style={{
              ...styles.conceptAccent,
              background: gradient,
            }}
          />
        )}

        <motion.div layoutId={`card-tag-${project.id}`} style={styles.conceptTag}>
          {project.type === 'production' ? (
            <Sparkles style={styles.conceptTagIcon} />
          ) : (
            <Beaker style={styles.conceptTagIcon} />
          )}
          <span>{project.type === 'production' ? 'Production' : 'Concept'}</span>
        </motion.div>

        <motion.h4 layoutId={`card-title-${project.id}`} style={styles.conceptTitle}>
          {project.name}
        </motion.h4>

        <motion.p layoutId={`card-hook-${project.id}`} style={styles.conceptHook}>
          {project.hook}
        </motion.p>

        <div style={styles.conceptTechRow}>
          {project.tech.slice(0, 3).map((t: string) => (
            <span
              key={t}
              style={{
                ...styles.conceptTechBadge,
                borderColor: accent,
                color: accent,
                backgroundColor: hexToRgba(accent, 0.1),
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div style={styles.conceptFooter}>
          <span style={styles.conceptCta}>Découvrir</span>
          <ArrowRight
            style={{
              ...styles.conceptCtaIcon,
              color: project.colorAccent.primary,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ConceptCard;
