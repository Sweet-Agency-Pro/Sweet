import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useProjects';
import { useWindowSize } from '../hooks/useWindowSize';
import { X, ExternalLink, Sparkles, Beaker, Award, ArrowRight, Quote } from 'lucide-react';
import type { CSSProperties } from 'react';
import theme from '../styles/theme';


const { colors, spacing, typography, borderRadius, transitions, hexToRgba } = theme;


// =============================================================================
// COMPONENT
// =============================================================================
function PortfolioPreview() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  // Use consolidated hook
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
        {/* Header */}
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

        {/* Loading / Error / Empty states */}
        {loading && (
          <div style={styles.loadingSection}>
            <div style={styles.loading}>Chargement des projets…</div>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>Erreur lors du chargement : {String(error)}</div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div style={styles.emptyBox}>Aucun projet trouvé dans la table.</div>
        )}

        {/* Flagship Project */}
        {flagship && (
          <motion.div
            layoutId={`card-container-${flagship.id}`}
            onClick={() => setSelectedId(flagship.id)}
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
            <div style={styles.flagshipGlow} />
            <motion.div layoutId={`card-inner-${flagship.id}`} style={styles.flagshipInner}>
              <div style={{
                ...styles.flagshipContent,
                ...(isMobileOrTablet && styles.flagshipContentMobile),
              }}>
                <div style={styles.flagshipLeft}>
                  <motion.div layoutId={`card-tag-${flagship.id}`} style={styles.productionTag}>
                    <Sparkles style={styles.tagIcon} />
                    <span>Production</span>
                  </motion.div>

                  <motion.h3 layoutId={`card-title-${flagship.id}`} style={{
                    ...styles.flagshipTitle,
                    ...(isMobile && styles.flagshipTitleMobile),
                  }}>
                    {flagship.name}
                  </motion.h3>

                  <motion.p layoutId={`card-hook-${flagship.id}`} style={styles.flagshipHook}>
                    {flagship.hook}
                  </motion.p>

                  <div style={{
                    ...styles.flagshipTechRow,
                    ...(isMobile && styles.flagshipTechRowMobile),
                  }}>
                    {flagship.tech.slice(0, isMobile ? 3 : flagship.tech.length).map((t: string) => (
                      <span key={t} style={styles.techBadge}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <button style={{
                    ...styles.flagshipCta,
                    ...(isMobileOrTablet && styles.flagshipCtaMobile),
                  }}>
                    <span>Explorer le projet</span>
                    <ArrowRight style={styles.ctaIcon} />
                  </button>
                </div>

                {/* Hide visual on mobile */}
                {!isMobile && (
                <div style={styles.flagshipVisual}>
                  <div
                    style={{
                      ...styles.flagshipGradientOrb,
                      background: flagship.colorAccent.gradient,
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
                    <div style={styles.mockupContent}>
                      <div style={styles.mockupLine} />
                      <div style={{ ...styles.mockupLine, width: '60%' }} />
                      <div style={styles.mockupBlock} />
                    </div>
                  </div>
                </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Lab Section Header */}
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
          }}>Sweet Lab — Concepts Exploratoires</span>
        </motion.div>

        {/* Concepts Grid */}
        <div style={{
          ...styles.conceptsGrid,
          ...(isMobile && styles.conceptsGridMobile),
          ...(isTablet && styles.conceptsGridTablet),
        }}>
          {concepts.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`card-container-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              style={styles.conceptCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >

              <motion.div layoutId={`card-inner-${project.id}`} style={styles.conceptInner}>
                {/* Visual accent */}
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
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              style={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
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
                style={{
                  ...styles.modalInner,
                  ...(isMobileOrTablet && styles.modalInnerMobile),
                }}
              >
                {/* Close button */}
                <button style={styles.closeButton} onClick={() => setSelectedId(null)}>
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
                        selectedProject.type === 'production'
                          ? styles.productionTag
                          : styles.modalConceptTag
                      }
                    >
                      {selectedProject.type === 'production' ? (
                        <Sparkles style={styles.tagIcon} />
                      ) : (
                        <Beaker style={styles.tagIcon} />
                      )}
                      <span>{selectedProject.type === 'production' ? 'Production' : 'Concept'}</span>
                    </motion.div>

                    <motion.h3 layoutId={`card-title-${selectedId}`} style={styles.modalTitle}>
                      {selectedProject.name}
                    </motion.h3>

                    <motion.p layoutId={`card-hook-${selectedId}`} style={styles.modalHook}>
                      {selectedProject.hook}
                    </motion.p>

                    <motion.p
                      style={styles.modalStory}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {selectedProject.story}
                    </motion.p>

                    {selectedProject.benefit && (
                      <motion.div
                        style={styles.benefitBox}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Quote style={styles.quoteIcon} />
                        <p style={styles.benefitText}>{selectedProject.benefit}</p>
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
                        {selectedProject.tech.map((t: string) => (
                          <span
                            key={t}
                            style={{
                              ...styles.modalTechBadge,
                              backgroundColor: selectedProject.colorAccent.light,
                              borderColor: selectedProject.colorAccent.primary,
                              color: selectedProject.colorAccent.primary,
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
                        background: selectedProject.colorAccent.gradient,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
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
                        background: selectedProject.colorAccent.gradient,
                      }}
                    />
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
                            background: selectedProject.colorAccent.gradient,
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
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    paddingTop: spacing[24],
    paddingBottom: spacing[24],
    overflow: 'hidden',
    backgroundColor: colors.slate[50],
  },
  backgroundTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(${hexToRgba(colors.slate[300], 0.3)} 1px, transparent 1px)`,
    backgroundSize: '1.5rem 1.5rem',
    pointerEvents: 'none',
  },
  container: {
    position: 'relative',
    maxWidth: '100rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
  },
  header: {
    textAlign: 'center',
    maxWidth: '48rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
    marginBottom: spacing[16],
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[4],
    paddingRight: spacing[4],
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
    backgroundColor: colors.blue[50],
    border: `1px solid ${colors.blue[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  badgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.blue[600],
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.blue[700],
    fontWeight: typography.fontWeight.semibold,
  },
  title: {
    fontSize: typography.fontSize['5xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    lineHeight: typography.lineHeight.tight,
    margin: 0,
  },
  titleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: `linear-gradient(to right, ${colors.blue[500]}, ${colors.purple[500]})`,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },

  // Flagship Card
  flagshipCard: {
    position: 'relative',
    marginBottom: spacing[12],
    cursor: 'pointer',
  },
  flagshipGlow: {
    position: 'absolute',
    top: '-2rem',
    left: '-2rem',
    right: '-2rem',
    bottom: '-2rem',
    background: `linear-gradient(135deg, ${hexToRgba(colors.teal[500], 0.15)}, ${hexToRgba(colors.cyan[500], 0.1)})`,
    borderRadius: '3rem',
    filter: 'blur(2.5rem)',
    zIndex: 0,
  },
  flagshipInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: '2rem',
    border: `1px solid ${colors.slate[200]}`,
    overflow: 'hidden',
    zIndex: 1,
  },
  flagshipContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '28rem',
  },
  flagshipLeft: {
    padding: spacing[12],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: spacing[5],
  },
  productionTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    background: `linear-gradient(135deg, ${colors.teal[500]}, ${colors.cyan[500]})`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  tagIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.white,
  },
  flagshipTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    margin: 0,
    lineHeight: typography.lineHeight.tight,
  },
  flagshipHook: {
    fontSize: typography.fontSize.xl,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  flagshipTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  techBadge: {
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.lg,
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
  },
  flagshipCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    background: `linear-gradient(135deg, ${colors.teal[500]}, ${colors.cyan[500]})`,
    borderRadius: borderRadius.xl,
    border: 'none',
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: spacing[2],
  },
  ctaIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  flagshipVisual: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colors.slate[100]}, ${colors.slate[50]})`,
    overflow: 'hidden',
  },
  flagshipGradientOrb: {
    position: 'absolute',
    width: '20rem',
    height: '20rem',
    borderRadius: '50%',
    filter: 'blur(5rem)',
    opacity: 0.4,
  },
  flagshipMockup: {
    position: 'relative',
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    boxShadow: `0 1.5625rem 3.125rem -0.75rem ${hexToRgba(colors.slate[900], 0.2)}`,
    overflow: 'hidden',
  },
  mockupHeader: {
    padding: spacing[3],
    backgroundColor: colors.slate[100],
    borderBottom: `1px solid ${colors.slate[200]}`,
  },
  mockupDots: {
    display: 'flex',
    gap: spacing[1.5],
  },
  mockupDot: {
    width: spacing[2.5],
    height: spacing[2.5],
    borderRadius: borderRadius.full,
  },
  mockupContent: {
    padding: spacing[4],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  mockupLine: {
    height: spacing[2],
    backgroundColor: colors.slate[200],
    borderRadius: borderRadius.sm,
    width: '80%',
  },
  mockupBlock: {
    height: spacing[16],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
    marginTop: spacing[2],
  },

  // Lab Header
  labHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[8],
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.slate[200]}`,
  },
  labIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.purple[500],
  },
  labTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[500],
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },

  // Concepts Grid
  conceptsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[6],
  },
  conceptCard: {
    position: 'relative',
    cursor: 'pointer',
  },
  conceptInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: borderRadius['2xl'],
    border: `1px solid ${colors.slate[200]}`,
    padding: spacing[6],
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    overflow: 'hidden',
  },
  conceptAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: spacing[1],
  },
  conceptTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingLeft: spacing[2.5],
    paddingRight: spacing[2.5],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  conceptTagIcon: {
    width: spacing[3],
    height: spacing[3],
    color: colors.slate[500],
  },
  conceptTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  conceptHook: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    flex: 1,
  },
  conceptTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[1.5],
  },
  conceptTechBadge: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[0.5],
    paddingBottom: spacing[0.5],
    backgroundColor: 'transparent',
    border: '1px solid',
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  conceptFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    paddingTop: spacing[2],
    borderTop: `1px solid ${colors.slate[100]}`,
  },
  conceptCta: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[600],
  },
  conceptCtaIcon: {
    width: spacing[4],
    height: spacing[4],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },

  // Modal
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba(colors.slate[900], 0.6),
    backdropFilter: 'blur(0.5rem)',
    WebkitBackdropFilter: 'blur(0.5rem)',
    zIndex: 100,
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '72rem',
    maxHeight: '90vh',
    zIndex: 101,
  },
  modalInner: {
    position: 'relative',
    backgroundColor: colors.white,
    borderRadius: '2rem',
    overflow: 'hidden',
    boxShadow: `0 1.5625rem 3.125rem -0.75rem ${hexToRgba(colors.slate[900], 0.25)}, 0 0 0 1px ${hexToRgba(colors.slate[200], 0.5)}`,
  },
  closeButton: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    width: spacing[10],
    height: spacing[10],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate[100],
    border: 'none',
    borderRadius: borderRadius.full,
    cursor: 'pointer',
    zIndex: 10,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  closeIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.slate[600],
  },
  modalContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '32rem',
  },
  modalInfo: {
    padding: spacing[12],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[5],
  },
  modalConceptTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1.5],
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    backgroundColor: colors.slate[100],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  modalTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    margin: 0,
    lineHeight: typography.lineHeight.tight,
  },
  modalHook: {
    fontSize: typography.fontSize.xl,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.snug,
    margin: 0,
  },
  modalStory: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  benefitBox: {
    position: 'relative',
    padding: spacing[5],
    backgroundColor: colors.teal[50],
    borderRadius: borderRadius.xl,
    borderLeft: `0.25rem solid ${colors.teal[500]}`,
  },
  quoteIcon: {
    position: 'absolute',
    top: spacing[3],
    right: spacing[3],
    width: spacing[5],
    height: spacing[5],
    color: colors.teal[300],
  },
  benefitText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[800],
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
    fontStyle: 'italic',
  },
  modalTechSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  techLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[500],
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  modalTechRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[2],
  },
  modalTechBadge: {
    paddingLeft: spacing[3],
    paddingRight: spacing[3],
    paddingTop: spacing[1.5],
    paddingBottom: spacing[1.5],
    border: '1px solid',
    borderRadius: borderRadius.lg,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  modalCta: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    border: 'none',
    color: colors.white,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  modalCtaIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  modalVisual: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `linear-gradient(135deg, ${colors.slate[100]}, ${colors.slate[50]})`,
    overflow: 'hidden',
  },
  modalGradientOrb: {
    position: 'absolute',
    width: '24rem',
    height: '24rem',
    borderRadius: '50%',
    filter: 'blur(5rem)',
    opacity: 0.5,
  },
  modalMockup: {
    position: 'relative',
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    boxShadow: `0 1.5625rem 3.125rem -0.75rem ${hexToRgba(colors.slate[900], 0.25)}`,
    overflow: 'hidden',
  },
  modalMockupContent: {
    padding: spacing[5],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  mockupAccentBar: {
    height: spacing[1],
    borderRadius: borderRadius.full,
    marginBottom: spacing[2],
  },
  mockupBlockLarge: {
    height: spacing[24],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
    marginTop: spacing[2],
  },
  mockupGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[3],
    marginTop: spacing[3],
  },
  mockupGridItem: {
    height: spacing[12],
    backgroundColor: colors.slate[100],
    borderRadius: borderRadius.lg,
  },

  // Loading / Error / Empty states
  loadingSection: {
    paddingTop: spacing[8],
    paddingBottom: spacing[8],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
  },
  errorBox: {
    padding: spacing[6],
    backgroundColor: hexToRgba('#fee2e2', 0.95),
    border: `1px solid #fecaca`,
    color: '#991b1b',
    borderRadius: borderRadius.lg,
    marginBottom: spacing[6],
  },
  emptyBox: {
    padding: spacing[6],
    backgroundColor: colors.slate[50],
    border: `1px dashed ${colors.slate[200]}`,
    color: colors.slate[600],
    borderRadius: borderRadius.lg,
    marginBottom: spacing[6],
    textAlign: 'center' as const,
  },

  // -------------------------------------------------------------------------
  // MOBILE & TABLET STYLES
  // -------------------------------------------------------------------------
  containerMobile: {
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  titleMobile: {
    fontSize: typography.fontSize['3xl'],
  },
  titleTablet: {
    fontSize: typography.fontSize['4xl'],
  },
  descriptionMobile: {
    fontSize: typography.fontSize.base,
    maxWidth: '100%',
  },
  flagshipCardMobile: {
    marginBottom: spacing[8],
  },
  flagshipContentMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  flagshipTitleMobile: {
    fontSize: typography.fontSize['2xl'],
  },
  flagshipTechRowMobile: {
    flexWrap: 'wrap',
  },
  flagshipCtaMobile: {
    width: '100%',
    minHeight: spacing[11], // 44px touch target
  },
  labHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing[2],
  },
  labTitleMobile: {
    fontSize: typography.fontSize.sm,
  },
  conceptsGridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[4],
  },
  conceptsGridTablet: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[5],
  },
  modalMobileContainer: {
    width: '95vw',
    maxWidth: '100%',
    maxHeight: '95vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modalInnerMobile: {
    borderRadius: borderRadius.xl,
  },
  modalContentMobile: {
    gridTemplateColumns: '1fr',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
};

export default PortfolioPreview;
