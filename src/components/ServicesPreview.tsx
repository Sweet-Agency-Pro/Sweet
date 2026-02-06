import { Store, BarChart3, Palette, ArrowRight, Sparkles } from 'lucide-react';
import { CSSProperties, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import theme from '../styles/theme';

function ServicesPreview() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

  const services = [
    {
      id: 1,
      icon: Palette,
      accroche: 'Site Vitrine',
      tagline: 'Une présentation sur mesure, adaptée à la densité de votre contenu.',
      resume: 'Le site vitrine est le pilier de votre identité numérique. Nous adaptons sa structure selon vos objectifs : l\'option "One-Page" idéale pour un impact immédiat, ou l\'option "Multi-Pages" pour structurer votre activité en rubriques distinctes et favoriser un référencement profond. Quelle que soit la structure choisie, vous bénéficiez d\'un design unique et d\'une performance technique optimale.',
      features: ['Design personnalisé', 'One-Page ou Multi-Pages', 'Optimisation SEO', 'Performance garantie'],
      colorAccent: colors.teal,
      glowColor: hexToRgba(colors.teal[500], 0.15),
    },
    {
      id: 2,
      icon: Store,
      accroche: 'Site E-commerce',
      tagline: 'Votre boutique en ligne complète pour vendre 24h/7j.',
      resume: 'Transformez vos visiteurs en clients fidèles avec une plateforme de vente robuste. Notre solution e-commerce intègre les paiements sécurisés, un parcours d\'achat optimisé et une gestion de catalogue fluide. Conçu pour la performance, votre site e-commerce est développé pour supporter la croissance de votre activité tout en offrant une expérience utilisateur rassurante et professionnelle.',
      features: ['Paiements sécurisés', 'Gestion de catalogue', 'Parcours d\'achat optimisé', 'Scalabilité'],
      colorAccent: colors.cyan,
      glowColor: hexToRgba(colors.cyan[500], 0.15),
    },
    {
      id: 3,
      icon: BarChart3,
      accroche: 'Panneau de Gestion',
      tagline: 'L\'interface d\'administration indissociable pour piloter votre site en autonomie.',
      resume: 'Le panneau de gestion est le moteur qui rend votre Site Vitrine ou E-commerce dynamique. Greffé à votre site public, il constitue votre back-office privé et sécurisé. Il vous permet de modifier vos contenus sans toucher au code, administrer votre activité (stocks, commandes, utilisateurs), et suivre vos performances via des tableaux de bord analytiques. C\'est l\'outil indispensable pour garder la main sur votre site au quotidien.',
      features: ['Gestion de contenu simple', 'Back-office sécurisé', 'Tableaux de bord analytiques', 'Contrôle total'],
      colorAccent: colors.blue,
      glowColor: hexToRgba(colors.blue[500], 0.15),
    },
  ];

  return (
    <section id="services" style={styles.section}>
      <div style={{
        ...styles.container,
        ...(isMobileOrTablet && styles.containerMobile),
      }}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>
            <Sparkles style={styles.badgeIcon} />
            <span style={styles.badgeText}>Nos Services</span>
          </div>

          <h2 style={{
            ...styles.title,
            ...(isMobile && styles.titleMobile),
            ...(isTablet && styles.titleTablet),
          }}>
            Solutions Numériques<br/>
            <span style={styles.titleGradient}>Sur Mesure</span>
          </h2>

          <p style={{
            ...styles.description,
            ...(isMobileOrTablet && styles.descriptionMobile),
          }}>
            Trois piliers pour construire votre présence en ligne : du site vitrine à l'e-commerce, en passant par l'administration complète de votre écosystème digital.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          ...styles.grid,
          ...(isMobile && styles.gridMobile),
          ...(isTablet && styles.gridTablet),
        }}>
          {services.map((service) => {
            const IconComponent = service.icon;
            const isHovered = hoveredService === service.id;

            return (
              <div
                key={service.id}
                style={{
                  ...styles.cardWrapper,
                  ...(isHovered ? styles.cardWrapperHovered : {}),
                }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Glow effect */}
                <div
                  style={{
                    ...styles.cardGlow,
                    background: service.glowColor,
                    opacity: isHovered ? 1 : 0.5,
                  }}
                />

                {/* Card inner */}
                <div style={{
                  ...styles.cardInner,
                  borderColor: isHovered ? service.colorAccent[400] : colors.slate[200],
                }}>
                  {/* Icon */}
                  <div style={{
                    ...styles.iconContainer,
                    backgroundColor: `${service.colorAccent[50]}`,
                    borderColor: `${service.colorAccent[200]}`,
                  }}>
                    <IconComponent
                      style={{
                        ...styles.icon,
                        color: service.colorAccent[600],
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{service.accroche}</h3>
                    <p style={styles.cardTagline}>{service.tagline}</p>

                    {/* Resume - shown on hover */}
                    <div
                      style={{
                        ...styles.cardResume,
                        opacity: isHovered ? 1 : 0,
                        maxHeight: isHovered ? '12.5rem' : '0',
                      }}
                    >
                      <p style={styles.resumeText}>{service.resume}</p>
                    </div>

                    {/* Features - shown on hover */}
                    <div
                      style={{
                        ...styles.features,
                        opacity: isHovered ? 1 : 0,
                        display: isHovered ? 'grid' : 'none',
                      }}
                    >
                      {service.features.map((feature, idx) => (
                        <div key={idx} style={styles.feature}>
                          <div style={{
                            ...styles.featureDot,
                            backgroundColor: service.colorAccent[500],
                          }} />
                          <span style={styles.featureText}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom divider and arrow */}
                  <div style={{
                    ...styles.cardFooter,
                    borderTopColor: isHovered ? service.colorAccent[200] : colors.slate[100],
                  }}>
                    <button style={{
                      ...styles.learnMoreButton,
                      color: isHovered ? service.colorAccent[600] : colors.slate[600],
                    }}>
                      <span>En savoir plus</span>
                      <ArrowRight style={{
                        ...styles.arrowIcon,
                        transform: isHovered ? 'translateX(0.25rem)' : 'translateX(0)',
                      }} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div style={{
          ...styles.ctaSection,
          ...(isMobileOrTablet && styles.ctaSectionMobile),
        }}>
          <div style={styles.ctaContent}>
            <h3 style={{
              ...styles.ctaTitle,
              ...(isMobile && styles.ctaTitleMobile),
            }}>Prêt à transformer votre présence numérique ?</h3>
            <p style={styles.ctaDescription}>
              Parlons ensemble de comment nos solutions peuvent propulser votre activité vers l'avant.
            </p>
          </div>
          <button style={{
            ...styles.ctaButton,
            ...(isMobileOrTablet && styles.ctaButtonMobile),
          }}>
            <div style={styles.ctaButtonBg}></div>
            <div style={styles.ctaButtonHover}></div>
            <span style={styles.ctaButtonContent}>
              Commencer un projet
              <ArrowRight style={styles.ctaButtonIcon} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

const { colors, spacing, typography, borderRadius, transitions, gradients, hexToRgba } = theme;

const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    paddingTop: spacing[20],
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
    maxWidth: '56rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
    marginBottom: spacing[20],
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
    margin: 0,
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
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[8],
    marginBottom: spacing[16],
  },
  cardWrapper: {
    position: 'relative',
    perspective: '62.5rem',
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  cardWrapperHovered: {
    transform: 'translateY(-0.5rem)',
  },
  cardGlow: {
    position: 'absolute',
    top: '-1rem',
    right: '-1rem',
    bottom: '-1rem',
    left: '-1rem',
    borderRadius: borderRadius['2xl'],
    filter: 'blur(2rem)',
    zIndex: 0,
    transition: `opacity ${transitions.duration.slow} ${transitions.timing.ease}`,
  },
  cardInner: {
    position: 'relative',
    backgroundColor: colors.white,
    border: `1.5px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[8],
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    zIndex: 1,
  },
  iconContainer: {
    width: spacing[14],
    height: spacing[14],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid`,
  },
  icon: {
    width: spacing[7],
    height: spacing[7],
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  },
  cardTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  cardTagline: {
    fontSize: typography.fontSize.base,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.semibold,
    margin: 0,
  },
  cardResume: {
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    overflow: 'hidden',
  },
  resumeText: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  features: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[3],
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  },
  featureDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: borderRadius.full,
    flexShrink: 0,
  },
  featureText: {
    fontSize: typography.fontSize.xs,
    color: colors.slate[700],
    fontWeight: typography.fontWeight.medium,
  },
  cardFooter: {
    borderTop: `1px solid`,
    paddingTop: spacing[4],
    marginTop: spacing[2],
    transition: `border-color ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  learnMoreButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    transition: `all ${transitions.duration.medium} ${transitions.timing.ease}`,
    padding: 0,
  },
  arrowIcon: {
    width: spacing[4],
    height: spacing[4],
    transition: `transform ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  ctaSection: {
    backgroundColor: colors.slate[50],
    border: `1px solid ${colors.slate[200]}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[12],
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: spacing[8],
    alignItems: 'center',
  },
  ctaContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  ctaTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.slate[900],
    margin: 0,
  },
  ctaDescription: {
    fontSize: typography.fontSize.base,
    color: colors.slate[600],
    fontWeight: typography.fontWeight.light,
    lineHeight: typography.lineHeight.relaxed,
    margin: 0,
  },
  ctaButton: {
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
    whiteSpace: 'nowrap',
  },
  ctaButtonBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyan,
    borderRadius: borderRadius.xl,
  },
  ctaButtonHover: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage: gradients.tealCyanDark,
    opacity: 0,
    transition: `opacity ${transitions.duration.medium} ${transitions.timing.ease}`,
  },
  ctaButtonContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.base,
  },
  ctaButtonIcon: {
    width: spacing[5],
    height: spacing[5],
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
  gridMobile: {
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  },
  gridTablet: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[6],
  },
  ctaSectionMobile: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: spacing[6],
  },
  ctaTitleMobile: {
    fontSize: typography.fontSize.xl,
  },
  ctaButtonMobile: {
    width: '100%',
    minHeight: spacing[11], // 44px touch target
  },
};

export default ServicesPreview;
