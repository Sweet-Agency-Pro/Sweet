import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';
import { CSSProperties } from 'react';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function PortfolioPreview() {
  return (
    <section id="portfolio" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Award style={styles.badgeIcon} />
            <span style={styles.badgeText}>Nos Réalisations</span>
          </div>

          <h2 style={styles.title}>
            Des projets qui parlent
            <span style={styles.titleGradient}> d'eux-mêmes</span>
          </h2>

          <p style={styles.description}>
            Plus de 50 projets livrés, des millions d'utilisateurs impactés, et une satisfaction client de 98%.
            Nos réalisations ne sont pas de simples sites web—ce sont des plateformes qui génèrent de la croissance,
            optimisent les processus et créent de véritables avantages compétitifs pour nos clients.
          </p>

          {/* Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>
                <TrendingUp style={{ ...styles.statIcon, color: colors.teal[600] }} />
                <div style={styles.statNumber}>+240%</div>
              </div>
              <p style={styles.statLabel}>Croissance moyenne du trafic</p>
            </div>

            <div style={styles.statItem}>
              <div style={styles.statValue}>
                <Users style={{ ...styles.statIcon, color: colors.cyan[600] }} />
                <div style={styles.statNumber}>3.2M+</div>
              </div>
              <p style={styles.statLabel}>Utilisateurs actifs générés</p>
            </div>

            <div style={styles.statItem}>
              <div style={styles.statValue}>
                <Award style={{ ...styles.statIcon, color: colors.blue[600] }} />
                <div style={styles.statNumber}>98%</div>
              </div>
              <p style={styles.statLabel}>Satisfaction client</p>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button style={styles.primaryButton}>
              <div style={styles.primaryButtonBg}></div>
              <div style={styles.primaryButtonHover}></div>
              <span style={styles.primaryButtonContent}>
                Explorer notre portfolio complet
                <ArrowRight style={styles.buttonIcon} />
              </span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div style={styles.projectsGrid}>
          {/* Project 1 - E-commerce */}
          <div style={styles.projectCard}>
            <div style={{ ...styles.projectCardGlow, ...styles.projectCardGlowTeal }}></div>
            <div style={styles.projectCardInner}>
              <div style={styles.projectImageTeal}>
                <div style={styles.projectImageContent}>
                  <div style={styles.projectTitle}>E-commerce</div>
                  <p style={styles.projectSubtitle}>Plateforme multi-vendeurs</p>
                </div>
              </div>
              <div style={styles.projectInfo}>
                <div style={styles.tagsContainer}>
                  <div style={styles.tagTeal}>React</div>
                  <div style={styles.tagCyan}>Node.js</div>
                </div>
                <p style={styles.projectStats}>+350% de conversions en 6 mois</p>
              </div>
            </div>
          </div>

          {/* Project 2 - SaaS */}
          <div style={styles.projectCard}>
            <div style={{ ...styles.projectCardGlow, ...styles.projectCardGlowBlue }}></div>
            <div style={styles.projectCardInner}>
              <div style={styles.projectImageBlue}>
                <div style={styles.projectImageContent}>
                  <div style={styles.projectTitle}>SaaS</div>
                  <p style={styles.projectSubtitle}>Gestion de projets</p>
                </div>
              </div>
              <div style={styles.projectInfo}>
                <div style={styles.tagsContainer}>
                  <div style={styles.tagBlue}>Vue.js</div>
                  <div style={styles.tagPurple}>Python</div>
                </div>
                <p style={styles.projectStats}>10K+ utilisateurs actifs</p>
              </div>
            </div>
          </div>

          {/* Project 3 - Fintech */}
          <div style={styles.projectCard}>
            <div style={{ ...styles.projectCardGlow, ...styles.projectCardGlowCyan }}></div>
            <div style={styles.projectCardInner}>
              <div style={styles.projectImageCyan}>
                <div style={styles.projectImageContent}>
                  <div style={styles.projectTitle}>Fintech</div>
                  <p style={styles.projectSubtitle}>Plateforme de paiement</p>
                </div>
              </div>
              <div style={styles.projectInfo}>
                <div style={styles.tagsContainer}>
                  <div style={styles.tagCyan}>Next.js</div>
                  <div style={styles.tagBlue}>Go</div>
                </div>
                <p style={styles.projectStats}>$2M+ transactions/mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

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
  container: {
    position: 'relative',
    maxWidth: '87.5rem',
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
    gap: spacing[6],
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
  },
  titleGradient: {
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.bluePurple,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[6],
    maxWidth: '42rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: spacing[6],
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  statValue: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
  },
  statIcon: {
    width: spacing[5],
    height: spacing[5],
  },
  statNumber: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
  },
  buttonContainer: {
    paddingTop: spacing[8],
  },
  primaryButton: {
    position: 'relative',
    paddingLeft: spacing[8],
    paddingRight: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
  },
  primaryButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.bluePurple,
    borderRadius: borderRadius.xl,
  },
  primaryButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.bluePurpleDark,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  primaryButtonContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
  buttonIcon: {
    width: spacing[5],
    height: spacing[5],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[6],
  },
  projectCard: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: borderRadius['2xl'],
  },
  projectCardGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    filter: 'blur(1.5rem)',
    opacity: 0,
    transition: `opacity ${transitions.duration.slow} ${transitions.timing.ease}`,
  },
  projectCardGlowTeal: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.teal[500], 0.2)}, ${hexToRgba(colors.cyan[500], 0.2)})`,
  },
  projectCardGlowBlue: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.blue[500], 0.2)}, ${hexToRgba(colors.purple[500], 0.2)})`,
  },
  projectCardGlowCyan: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.cyan[500], 0.2)}, ${hexToRgba(colors.blue[500], 0.2)})`,
  },
  projectCardInner: {
    position: 'relative',
    backgroundColor: colors.white,
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  projectImageTeal: {
    aspectRatio: '16/9',
    background: `linear-gradient(to bottom right, ${colors.teal[100]}, ${colors.cyan[100]})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImageBlue: {
    aspectRatio: '16/9',
    background: `linear-gradient(to bottom right, ${colors.blue[100]}, ${colors.purple[100]})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImageCyan: {
    aspectRatio: '16/9',
    background: `linear-gradient(to bottom right, ${colors.cyan[100]}, ${colors.blue[100]})`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectImageContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
    padding: spacing[6],
  },
  projectTitle: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
  },
  projectSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[700],
  },
  projectInfo: {
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  tagsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  tagTeal: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.teal[100],
    border: `1px solid ${colors.teal[300]}`,
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    color: colors.teal[700],
    fontWeight: typography.fontWeight.semibold,
  },
  tagCyan: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.cyan[100],
    border: `1px solid ${colors.cyan[300]}`,
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    color: colors.cyan[700],
    fontWeight: typography.fontWeight.semibold,
  },
  tagBlue: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.blue[100],
    border: `1px solid ${colors.blue[300]}`,
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    color: colors.blue[700],
    fontWeight: typography.fontWeight.semibold,
  },
  tagPurple: {
    paddingLeft: spacing[2],
    paddingRight: spacing[2],
    paddingTop: spacing[1],
    paddingBottom: spacing[1],
    backgroundColor: colors.purple[100],
    border: `1px solid ${colors.purple[300]}`,
    borderRadius: borderRadius.default,
    fontSize: typography.fontSize.xs,
    color: colors.purple[700],
    fontWeight: typography.fontWeight.semibold,
  },
  projectStats: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
  },
};

export default PortfolioPreview;
