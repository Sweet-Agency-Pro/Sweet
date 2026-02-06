/**
 * Portfolio Section Component
 * Displays projects with flagship card, concept grid, and detail modal
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Beaker } from 'lucide-react';

import { useProjects } from '../../../hooks/useProjects';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { styles } from './Portfolio.styles';
import FlagshipCard from './FlagshipCard';
import ConceptCard from './ConceptCard';
import ProjectModal from './ProjectModal';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Section Header with badge and title */
function SectionHeader({ isMobile, isTablet, isMobileOrTablet }: {
  isMobile: boolean;
  isTablet: boolean;
  isMobileOrTablet: boolean;
}) {
  return (
    <motion.div
      style={styles.header}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div style={styles.badge}>
        <Award style={styles.badgeIcon} />
        <span style={styles.badgeText}>Portfolio</span>
      </div>

      <h2 style={{
        ...styles.title,
        ...(isMobile && styles.titleMobile),
        ...(isTablet && styles.titleTablet),
      }}>
        Projets qui
        <span style={styles.titleGradient}> inspirent</span>
      </h2>

      <p style={{
        ...styles.description,
        ...(isMobileOrTablet && styles.descriptionMobile),
      }}>
        De la production client aux concepts exploratoires du Sweet Lab,
        découvrez comment nous repoussons les limites du possible.
      </p>
    </motion.div>
  );
}

/** Lab Section Header */
function LabHeader({ isMobile }: { isMobile: boolean }) {
  return (
    <motion.div
      style={{
        ...styles.labHeader,
        ...(isMobile && styles.labHeaderMobile),
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Beaker style={styles.labIcon} />
      <span style={{
        ...styles.labTitle,
        ...(isMobile && styles.labTitleMobile),
      }}>
        Sweet Lab — Concepts Exploratoires
      </span>
    </motion.div>
  );
}

/** Loading State */
function LoadingState() {
  return (
    <div style={styles.loadingSection}>
      <div style={styles.loading}>Chargement des projets…</div>
    </div>
  );
}

/** Error State */
function ErrorState({ error }: { error: unknown }) {
  return (
    <div style={styles.errorBox}>
      Erreur lors du chargement : {String(error)}
    </div>
  );
}

/** Empty State */
function EmptyState() {
  return (
    <div style={styles.emptyBox}>
      Aucun projet trouvé dans la table.
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function PortfolioPreview() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  const { data: projects, loading, error } = useProjects();

  const selectedProject = projects.find((p) => p.id === selectedId);
  const flagship = projects.find((p) => p.isFlagship);
  const concepts = projects.filter((p) => !p.isFlagship);

  return (
    <section id="portfolio" style={styles.section}>
      {/* Background texture */}
      <div style={styles.backgroundTexture} />

      <div style={{
        ...styles.container,
        ...(isMobileOrTablet && styles.containerMobile),
      }}>
        <SectionHeader
          isMobile={isMobile}
          isTablet={isTablet}
          isMobileOrTablet={isMobileOrTablet}
        />

        {/* Loading / Error / Empty states */}
        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!loading && !error && projects.length === 0 && <EmptyState />}

        {/* Flagship Project */}
        {flagship && (
          <FlagshipCard
            project={flagship}
            isMobile={isMobile}
            isMobileOrTablet={isMobileOrTablet}
            onClick={() => setSelectedId(flagship.id)}
          />
        )}

        {/* Lab Section */}
        <LabHeader isMobile={isMobile} />

        {/* Concepts Grid */}
        <div style={{
          ...styles.conceptsGrid,
          ...(isMobile && styles.conceptsGridMobile),
          ...(isTablet && styles.conceptsGridTablet),
        }}>
          {concepts.map((project, index) => (
            <ConceptCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        selectedId={selectedId}
        isMobileOrTablet={isMobileOrTablet}
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
}

export default PortfolioPreview;
