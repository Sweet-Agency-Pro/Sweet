/**
 * ProjectDetail — Full portfolio case study page
 * 
 * Data strategy: static JSON embedded at build time (SEO), hydrated with
 * Supabase on mount for live updates.
 * 
 * Sections:
 *   1. Hero (dark) — name, hook, type badge, preview mockup, CTAs
 *   2. Story (white) — challenge / approach split narrative
 *   3. Impact (slate-50) — benefit quote + metrics cards
 *   4. Tech Stack (white) — bento cards with rationale
 *   5. Preview Showcase (dark) — large browser mockup
 *   6. Related Projects (white) — cards linking to other projects
 *   7. CTA Band (dark) — contact prompt
 *   8. Footer
 */

import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Beaker,
  Quote,
  Target,
  Lightbulb,
  ArrowLeft,
} from 'lucide-react';

import SEO from '../../../layout/SEO';
import Navigation from '../../../layout/Navigation';
import Footer from '../../../sections/Footer';
import { useSectionNavigation } from '../../../../hooks/useSectionNavigation';
import supabase from '../../../../lib/supabaseClient';
import {
  PROJECT_DATA,
  PROJECT_IDS,
  getStaticProject,
  type ProjectStaticData,
} from './projectData';
import { TechIcon } from './TechIcons';
import './ProjectDetail.css';

// =============================================================================
// HELPERS
// =============================================================================

/** Map a hex primary color to a known site colorScheme */
function deriveColorScheme(hex: string): 'teal' | 'purple' | 'blue' {
  const h = hex.toLowerCase();
  if (h.includes('a855f7') || h.includes('ec4899') || h.includes('9333ea')) return 'purple';
  if (h.includes('3b82f6') || h.includes('2563eb') || h.includes('60a5fa')) return 'blue';
  return 'teal'; // default for teal + amber + others
}

/** Simple reveal-on-scroll wrapper */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Hero section */
function HeroSection({ project }: { project: ProjectStaticData }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = project.previewUrl && !imgError;

  return (
    <section className="pd-hero">
      <div className="pd-hero__texture" />
      <div className="pd-hero__blob-1" />
      <div className="pd-hero__blob-2" />

      <div className="pd-hero__container">
        {/* Info */}
        <motion.div
          className="pd-hero__info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link to="/#portfolio" className="pd-hero__back-link">
            <ArrowLeft className="pd-hero__back-link-icon" />
            Toutes nos réalisations
          </Link>

          <div
            className={`pd-hero__badge pd-hero__badge--${project.type}`}
          >
            {project.type === 'production' ? (
              <Sparkles className="pd-hero__badge-icon" />
            ) : (
              <Beaker className="pd-hero__badge-icon" />
            )}
            <span>
              {project.type === 'production' ? 'Production' : 'Concept'}
            </span>
          </div>

          <h1 className="pd-hero__title">{project.name}</h1>
          <p className="pd-hero__hook">{project.hook}</p>

          <div className="pd-hero__actions">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pd-hero__cta"
              >
                <div className="pd-hero__cta-bg" />
                <span className="pd-hero__cta-content">
                  Voir le site
                  <ExternalLink className="pd-hero__cta-icon pd-hero__cta-icon--external" />
                </span>
              </a>
            )}
            <Link to="/#contact" className="pd-hero__cta pd-hero__cta--ghost">
              <span className="pd-hero__cta-content">
                Un projet similaire ?
                <ArrowRight className="pd-hero__cta-icon pd-hero__cta-icon--arrow" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          className="pd-hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-hero__mockup-wrap"
          >
            <div className="pd-hero__mockup-glow" />
            <div className="pd-hero__mockup">
              <div className="pd-hero__mockup-bar">
                <span className="pd-hero__mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                <span className="pd-hero__mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                <span className="pd-hero__mockup-dot" style={{ backgroundColor: '#28c840' }} />
              </div>
              {hasImage ? (
                <img
                  src={project.previewUrl}
                  alt={`Aperçu du projet ${project.name}`}
                  className="pd-hero__mockup-img"
                  loading="eager"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="pd-hero__mockup-fallback">
                  <div className="pd-hero__mockup-fallback-bar" />
                  <div className="pd-hero__mockup-fallback-line" />
                  <div className="pd-hero__mockup-fallback-line" style={{ width: '70%' }} />
                  <div className="pd-hero__mockup-fallback-line" style={{ width: '50%' }} />
                  <div className="pd-hero__mockup-fallback-block" />
                </div>
              )}
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/** Story section — Challenge / Approach split */
function StorySection({ project }: { project: ProjectStaticData }) {
  return (
    <section className="pd-story">
      <div className="pd-story__container">
        <RevealSection>
          <div className="pd-story__header">
            <span className="pd-story__decoration" />
            <h2 className="pd-story__title">L'histoire du projet</h2>
          </div>
        </RevealSection>

        <div className="pd-story__grid">
          <RevealSection delay={0.1}>
            <div className="pd-story__column pd-story__column--challenge">
              <span className="pd-story__column-label">
                <Target className="pd-story__column-label-icon" />
                Le Défi
              </span>
              <h3 className="pd-story__column-title">
                Comprendre le besoin
              </h3>
              <p className="pd-story__column-text">{project.challenge}</p>
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="pd-story__column pd-story__column--approach">
              <span className="pd-story__column-label">
                <Lightbulb className="pd-story__column-label-icon" />
                Notre Approche
              </span>
              <h3 className="pd-story__column-title">
                Transformer la vision en réalité
              </h3>
              <p className="pd-story__column-text">{project.approach}</p>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/** Impact / Results section */
function ImpactSection({ project }: { project: ProjectStaticData }) {
  if (!project.benefit && (!project.metrics || project.metrics.length === 0)) {
    return null;
  }

  return (
    <section className="pd-impact">
      <div className="pd-impact__texture" />
      <div className="pd-impact__container">
        {project.benefit && (
          <RevealSection>
            <div className="pd-impact__quote-wrap">
              <Quote className="pd-impact__quote-icon" />
              <p className="pd-impact__quote-text">{project.benefit}</p>
            </div>
          </RevealSection>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <RevealSection delay={0.15}>
            <div className="pd-impact__metrics">
              {project.metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="pd-impact__metric-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <p className="pd-impact__metric-value">{metric.value}</p>
                  <p className="pd-impact__metric-label">{metric.label}</p>
                  {metric.detail && (
                    <p className="pd-impact__metric-detail">{metric.detail}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </RevealSection>
        )}
      </div>
    </section>
  );
}

/** Tech Stack section */
function TechSection({ project }: { project: ProjectStaticData }) {
  return (
    <section className="pd-tech">
      <div className="pd-tech__container">
        <RevealSection>
          <div className="pd-tech__header">
            <span className="pd-tech__decoration" />
            <h2 className="pd-tech__title">Stack Technique</h2>
            <p className="pd-tech__subtitle">
              Les technologies choisies pour répondre aux enjeux du projet.
            </p>
          </div>
        </RevealSection>

        <div className="pd-tech__grid">
          {project.tech.map((techName, i) => (
            <RevealSection key={techName} delay={0.1 * i}>
              <div className="pd-tech__card">
                <div className="pd-tech__card-header">
                  <div className="pd-tech__card-icon">
                    <TechIcon name={techName} />
                  </div>
                  <h3 className="pd-tech__card-name">{techName}</h3>
                </div>
                <p className="pd-tech__card-rationale">
                  {project.techRationale[techName] || 'Technologie de pointe sélectionnée pour ce projet.'}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Preview Showcase section (dark, full-width mockup) */
function PreviewSection({ project }: { project: ProjectStaticData }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = project.previewUrl && !imgError;

  if (!hasImage) return null;

  return (
    <section className="pd-preview">
      <div className="pd-preview__texture" />
      <div className="pd-preview__container">
        <RevealSection>
          <div className="pd-preview__header">
            <h2 className="pd-preview__title">Aperçu du résultat</h2>
            <p className="pd-preview__subtitle">
              Cliquez pour visiter le site en direct.
            </p>
          </div>
        </RevealSection>

        <RevealSection delay={0.15}>
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pd-preview__mockup-container"
            style={{ display: 'block', position: 'relative' }}
          >
            <div className="pd-preview__mockup-glow" />
            <div className="pd-preview__mockup">
              <div className="pd-preview__mockup-bar">
                <span className="pd-preview__mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                <span className="pd-preview__mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                <span className="pd-preview__mockup-dot" style={{ backgroundColor: '#28c840' }} />
              </div>
              <img
                src={project.previewUrl}
                alt={`Vue complète du projet ${project.name}`}
                className="pd-preview__mockup-img"
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>
          </a>
        </RevealSection>

        <RevealSection delay={0.25}>
          <div className="pd-preview__visit-cta">
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-hero__cta"
            >
              <div className="pd-hero__cta-bg" />
              <span className="pd-hero__cta-content">
                Visiter le site
                <ExternalLink className="pd-hero__cta-icon pd-hero__cta-icon--external" />
              </span>
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/** Related Projects section */
function RelatedSection({ currentId }: { currentId: string }) {
  const otherProjects = useMemo(
    () => PROJECT_IDS.filter((id) => id !== currentId).map((id) => PROJECT_DATA[id]),
    [currentId]
  );

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  if (otherProjects.length === 0) return null;

  return (
    <section className="pd-related">
      <div className="pd-related__container">
        <RevealSection>
          <div className="pd-related__header">
            <span className="pd-related__decoration" />
            <h2 className="pd-related__title">Nos autres réalisations</h2>
          </div>
        </RevealSection>

        <div className="pd-related__grid">
          {otherProjects.map((proj, i) => (
            <RevealSection key={proj.id} delay={0.1 * i}>
              <Link
                to={`/portfolio/${proj.id}`}
                className="pd-related__card"
              >
                <div className="pd-related__inner">
                  <div className="pd-related__visual">
                    <div
                      className="pd-related__orb"
                      style={{
                        background: `linear-gradient(135deg, ${proj.colorAccent.primary}, ${proj.colorAccent.secondary})`,
                      }}
                    />
                    <div className="pd-related__mockup">
                      <div className="pd-related__mockup-header">
                        <div className="pd-related__mockup-dots">
                          <span className="pd-related__mockup-dot" style={{ backgroundColor: '#ff5f57' }} />
                          <span className="pd-related__mockup-dot" style={{ backgroundColor: '#febc2e' }} />
                          <span className="pd-related__mockup-dot" style={{ backgroundColor: '#28c840' }} />
                        </div>
                      </div>
                      {proj.previewUrl && !imgErrors[proj.id] ? (
                        <img
                          src={proj.previewUrl}
                          alt={`Aperçu ${proj.name}`}
                          className="pd-related__card-preview"
                          loading="lazy"
                          onError={() =>
                            setImgErrors((prev) => ({ ...prev, [proj.id]: true }))
                          }
                        />
                      ) : (
                        <div className="pd-related__mockup-content">
                          <div className="pd-related__mockup-line" />
                          <div className="pd-related__mockup-line pd-related__mockup-line--short" />
                          <div className="pd-related__mockup-block" />
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="pd-related__card-type">
                    {proj.type === 'production' ? (
                      <Sparkles className="pd-related__card-type-icon" />
                    ) : (
                      <Beaker className="pd-related__card-type-icon" />
                    )}
                    <span>{proj.type === 'production' ? 'Production' : 'Concept'}</span>
                  </p>

                  <h3 className="pd-related__card-name">{proj.name}</h3>
                  <p className="pd-related__card-hook">{proj.hook}</p>

                  <div className="pd-related__tech-row">
                    {proj.tech.slice(0, 3).map((tech) => (
                      <span
                        key={`${proj.id}-${tech}`}
                        className="pd-related__tech-badge"
                        style={{
                          borderColor: proj.colorAccent.primary,
                          color: proj.colorAccent.primary,
                          backgroundColor: `${proj.colorAccent.primary}1a`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="pd-related__card-arrow">
                    <span className="pd-related__card-cta">Découvrir</span>
                    <ArrowRight
                      className="pd-related__card-arrow-icon"
                      style={{ color: proj.colorAccent.primary }}
                    />
                  </span>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/** CTA Bottom Band */
function CtaBottomSection() {
  const { navigateToSection } = useSectionNavigation();

  return (
    <section className="pd-cta-bottom">
      <div className="pd-cta-bottom__texture" />
      <RevealSection className="pd-cta-bottom__container">
        <h2 className="pd-cta-bottom__title">
          Un projet similaire en tête ?
        </h2>
        <p className="pd-cta-bottom__text">
          Chaque projet est unique. Discutons du vôtre et voyons comment nous
          pouvons le concrétiser ensemble.
        </p>
        <button
          className="pd-cta-bottom__btn"
          onClick={() => navigateToSection('contact')}
        >
          <div className="pd-cta-bottom__btn-bg" />
          <span className="pd-cta-bottom__btn-content">
            Discutons de votre projet
            <ArrowRight className="pd-cta-bottom__icon" />
          </span>
        </button>
      </RevealSection>
    </section>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
// =============================================================================
function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // 1. Get static data immediately (SEO)
  const staticProject = projectId ? getStaticProject(projectId) : undefined;

  // 2. Supabase hydration state
  const [liveProject, setLiveProject] = useState<ProjectStaticData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Fetch live data from Supabase
  useEffect(() => {
    if (!projectId) return;

    async function fetchProject() {
      const { data, error } = await supabase
        .from('projects_portfolio')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error || !data) return;

      // Map DB row to our shape, merging with static data
      const base = staticProject || ({} as Partial<ProjectStaticData>);
      const merged: ProjectStaticData = {
        ...base,
        id: data.id,
        name: data.name ?? base.name ?? '',
        hook: data.hook ?? base.hook ?? '',
        story: data.story ?? base.story ?? '',
        challenge: base.challenge ?? data.story?.split('\n\n')[0] ?? '',
        approach: base.approach ?? data.story?.split('\n\n')[1] ?? '',
        benefit: data.benefit ?? base.benefit ?? null,
        tech: data.tech ?? base.tech ?? [],
        techRationale: base.techRationale ?? {},
        type: data.type ?? base.type ?? 'concept',
        colorAccent: data.color_accent ?? base.colorAccent ?? { primary: '#14b8a6', secondary: '#06b6d4' },
        isFlagship: data.is_flagship ?? base.isFlagship ?? false,
        previewUrl: data.preview_url ?? base.previewUrl ?? '',
        externalUrl: data.external_url ?? base.externalUrl ?? '',
        colorScheme: deriveColorScheme(
          data.color_accent?.primary ?? base.colorAccent?.primary ?? '#14b8a6'
        ),
        metaTitle: base.metaTitle ?? `${data.name} | Sweet`,
        metaDescription:
          base.metaDescription ??
          `Découvrez le projet ${data.name} réalisé par l'Agence Sweet. ${data.hook ?? ''}`,
        metrics: base.metrics,
      };

      setLiveProject(merged);
    }

    fetchProject();
  }, [projectId, staticProject]);

  // Resolved project: live > static
  const project = liveProject || staticProject;

  // 404 — project not found
  if (!project) {
    return (
      <div className="pd-not-found">
        <Navigation />
        <h1 className="pd-not-found__title">Projet introuvable</h1>
        <p className="pd-not-found__text">
          Ce projet n'existe pas ou a été retiré du portfolio.
        </p>
        <button
          className="pd-not-found__link"
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const colorScheme = project.colorScheme || deriveColorScheme(project.colorAccent.primary);

  return (
    <div
      className="project-detail"
      style={{
        '--project-primary': project.colorAccent.primary,
        '--project-secondary': project.colorAccent.secondary,
      } as React.CSSProperties}
    >
      <SEO
        title={project.metaTitle}
        description={project.metaDescription}
        image={project.previewUrl || undefined}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Accueil",
              "item": "https://agence-sweet.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Réalisations",
              "item": "https://agence-sweet.com/#portfolio"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": project.name,
              "item": `https://agence-sweet.com/portfolio/${project.id}`
            }
          ]
        }}
      />

      <Navigation colorScheme={colorScheme} />

      <HeroSection project={project} />
      <StorySection project={project} />
      <ImpactSection project={project} />
      <TechSection project={project} />
      <PreviewSection project={project} />
      <RelatedSection currentId={project.id} />
      <CtaBottomSection />
      <Footer colorScheme={colorScheme} />
    </div>
  );
}

export default ProjectDetailPage;
