/**
 * ConceptCard Component
 * Individual concept/lab project card
 */

import { motion } from 'framer-motion';
import { Sparkles, Beaker, ArrowRight } from 'lucide-react';
import { styles } from '../Portfolio.styles';
import type { Project } from '../../../../hooks/useProjects';

interface ConceptCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ConceptCard({ project, index, onClick }: ConceptCardProps) {
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
      <motion.div layoutId={`card-inner-${project.id}`} style={styles.conceptInner}>
        {/* Visual accent bar */}
        <div
          style={{
            ...styles.conceptAccent,
            background: project.colorAccent.gradient,
          }}
        />

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
                borderColor: project.colorAccent.primary,
                color: project.colorAccent.primary,
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
