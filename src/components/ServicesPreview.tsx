import { ArrowRight, Code2, Database, Globe, Sparkles } from 'lucide-react';
import { CSSProperties } from 'react';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function ServicesPreview() {
  return (
    <section id="services" style={styles.section}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles style={styles.badgeIcon} />
            <span style={styles.badgeText}>Nos Services</span>
          </div>

          <h2 style={styles.title}>
            Des solutions qui transforment
            <span style={styles.titleGradient}> votre vision</span> en réalité
          </h2>

          <p style={styles.description}>
            Nous ne livrons pas que du code—nous créons des expériences numériques qui propulsent votre entreprise vers l'avant.
            De l'architecture backend la plus robuste aux interfaces utilisateur les plus élégantes, chaque ligne est écrite pour
            générer de la valeur et des résultats mesurables.
          </p>

          <div style={styles.buttonContainer}>
            <button style={styles.primaryButton}>
              <div style={styles.primaryButtonBg}></div>
              <div style={styles.primaryButtonHover}></div>
              <span style={styles.primaryButtonContent}>
                Découvrir tous nos services
                <ArrowRight style={styles.buttonIcon} />
              </span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div style={styles.grid}>
          {/* Card 1 - Web Development */}
          <div style={styles.card}>
            <div style={{ ...styles.cardGlow, ...styles.cardGlowTeal }}></div>
            <div style={styles.cardInner}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconTeal }}>
                <Code2 style={{ ...styles.icon, color: colors.teal[600] }} />
              </div>
              <h3 style={styles.cardTitle}>Développement Web</h3>
              <p style={styles.cardDescription}>Applications modernes et performantes</p>
            </div>
          </div>

          {/* Card 2 - Backend Infrastructure */}
          <div style={styles.card}>
            <div style={{ ...styles.cardGlow, ...styles.cardGlowCyan }}></div>
            <div style={styles.cardInner}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconCyan }}>
                <Database style={{ ...styles.icon, color: colors.cyan[600] }} />
              </div>
              <h3 style={styles.cardTitle}>Infrastructure Backend</h3>
              <p style={styles.cardDescription}>APIs robustes et scalables</p>
            </div>
          </div>

          {/* Card 3 - Cloud Architecture */}
          <div style={styles.card}>
            <div style={{ ...styles.cardGlow, ...styles.cardGlowBlue }}></div>
            <div style={styles.cardInner}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconBlue }}>
                <Globe style={{ ...styles.icon, color: colors.blue[600] }} />
              </div>
              <h3 style={styles.cardTitle}>Architecture Cloud</h3>
              <p style={styles.cardDescription}>Déploiement et scaling optimisés</p>
            </div>
          </div>

          {/* Card 4 - UX/UI Design */}
          <div style={styles.card}>
            <div style={{ ...styles.cardGlow, ...styles.cardGlowPurple }}></div>
            <div style={styles.cardInner}>
              <div style={{ ...styles.cardIcon, ...styles.cardIconPurple }}>
                <Sparkles style={{ ...styles.icon, color: colors.purple[600] }} />
              </div>
              <h3 style={styles.cardTitle}>UX/UI Design</h3>
              <p style={styles.cardDescription}>Expériences utilisateur mémorables</p>
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
  },
  badgeIcon: {
    width: spacing[4],
    height: spacing[4],
    color: colors.teal[600],
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    color: colors.teal[700],
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
    backgroundImage: gradients.tealCyan,
  },
  description: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
  },
  buttonContainer: {
    paddingTop: spacing[6],
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
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.xl,
  },
  primaryButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyanDark,
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[6],
    maxWidth: '75rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    position: 'relative',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: borderRadius['2xl'],
    filter: 'blur(1.5rem)',
    opacity: 0,
    transition: `opacity ${transitions.duration.slow} ${transitions.timing.ease}`,
  },
  cardGlowTeal: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.teal[500], 0.2)}, ${hexToRgba(colors.cyan[500], 0.2)})`,
  },
  cardGlowCyan: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.cyan[500], 0.2)}, ${hexToRgba(colors.blue[500], 0.2)})`,
  },
  cardGlowBlue: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.blue[500], 0.2)}, ${hexToRgba(colors.purple[500], 0.2)})`,
  },
  cardGlowPurple: {
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.purple[500], 0.2)}, ${hexToRgba('#ec4899', 0.2)})`,
  },
  cardInner: {
    position: 'relative',
    backgroundColor: colors.slate[50],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    height: '100%',
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  cardIcon: {
    width: spacing[12],
    height: spacing[12],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  cardIconTeal: {
    background: `linear-gradient(to bottom right, ${colors.teal[100]}, ${colors.cyan[100]})`,
    border: `1px solid ${colors.teal[300]}`,
  },
  cardIconCyan: {
    background: `linear-gradient(to bottom right, ${colors.cyan[100]}, ${colors.blue[100]})`,
    border: `1px solid ${colors.cyan[300]}`,
  },
  cardIconBlue: {
    background: `linear-gradient(to bottom right, ${colors.blue[100]}, ${colors.purple[100]})`,
    border: `1px solid ${colors.blue[300]}`,
  },
  cardIconPurple: {
    background: `linear-gradient(to bottom right, ${colors.purple[100]}, #fce7f3)`,
    border: `1px solid ${colors.purple[300]}`,
  },
  icon: {
    width: spacing[6],
    height: spacing[6],
  },
  cardTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    marginBottom: spacing[2],
  },
  cardDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
  },
};

export default ServicesPreview;
