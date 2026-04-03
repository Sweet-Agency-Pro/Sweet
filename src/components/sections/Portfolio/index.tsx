/**
 * Portfolio Section Component
 * Displays projects with flagship card, concept grid, and detail modal
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Beaker } from 'lucide-react';

import { useProjects } from '../../../hooks/useProjects';
import FlagshipCard from './FlagshipCard';
import ConceptCard from './ConceptCard';
import ProjectModal from './ProjectModal';
import './Portfolio.css';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Section Header with badge and title */
function SectionHeader() {
  return (
    <motion.div
      className="portfolio__header"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="portfolio__badge">
        <Award className="portfolio__badge-icon" />
        <span className="portfolio__badge-text">Portfolio</span>
      </div>

      <h2 className="portfolio__title">
        Projets qui
        <span className="portfolio__title-gradient"> inspirent</span>
      </h2>

      <p className="portfolio__description">
        De la production client aux concepts exploratoires du Sweet Lab,
        découvrez comment nous repoussons les limites du possible.
      </p>
    </motion.div>
  );
}

/** Lab Section Header */
function LabHeader() {
  return (
    <motion.div
      className="portfolio__lab-header"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Beaker className="portfolio__lab-icon" />
      <span className="portfolio__lab-title">
        Sweet Lab, Concepts Exploratoires
      </span>
    </motion.div>
  );
}

/** Loading State */
function LoadingState() {
  return (
    <div className="portfolio__loading-section">
      <div className="portfolio__loading">Chargement des projets…</div>
    </div>
  );
}

/** Error State */
function ErrorState({ error }: { error: unknown }) {
  return (
    <div className="portfolio__error-box">
      Erreur lors du chargement : {String(error)}
    </div>
  );
}

/** Empty State */
function EmptyState() {
  return (
    <div className="portfolio__empty-box">
      Aucun projet trouvé dans la table.
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function PortfolioPreview() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: projects, loading, error } = useProjects();

  const selectedProject = projects.find((p) => p.id === selectedId);
  const flagship = projects.find((p) => p.isFlagship);
  const concepts = projects.filter((p) => !p.isFlagship);

  return (
    <section id="portfolio" className="portfolio">
      {/* Background texture */}
      <div className="portfolio__bg-texture" />

      <div className="portfolio__container">
        <SectionHeader />

        {/* Loading / Error / Empty states */}
        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!loading && !error && projects.length === 0 && <EmptyState />}

        {/* Flagship Project */}
        {flagship && (
          <FlagshipCard
            project={flagship}
            onClick={() => setSelectedId(flagship.id)}
          />
        )}

        {/* Lab Section */}
        <LabHeader />

        {/* Concepts Grid */}
        <div className="concepts">
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
        onClose={() => setSelectedId(null)}
      />
    </section>
  );
}

export default PortfolioPreview;
