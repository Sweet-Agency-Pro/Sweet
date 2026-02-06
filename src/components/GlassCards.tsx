import { CSSProperties } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function GlassCards() {
  const { isMobile, isTablet } = useWindowSize();
  const isCompact = isMobile || isTablet;

  return (
    <div style={{
      ...styles.container,
      ...(isCompact && styles.containerMobile),
    }}>
      <div style={{
        ...styles.cardsWrapper,
        ...(isCompact && styles.cardsWrapperMobile),
      }}>
        <div style={{
          ...styles.cardsContainer,
          ...(isCompact && styles.cardsContainerMobile),
        }}>
          {/* Backend Card */}
          <div style={{
            ...styles.cardBackend,
            ...(isCompact && styles.cardMobile),
          }}>
            <div style={{
              ...styles.cardBackendInner,
              ...(isCompact && styles.cardInnerMobile),
            }}>
              <div style={styles.codeContent}>
                <div style={styles.codeLine}>
                  <span style={{ color: codeColors.purple }}>const</span>{' '}
                  <span style={{ color: codeColors.cyan }}>buildAPI</span> ={' '}
                  <span style={{ color: codeColors.yellow }}>async</span> () =&gt; {'{'}
                </div>
                <div style={styles.codeLineIndent}>
                  <span style={{ color: codeColors.purple }}>const</span> server ={' '}
                  <span style={{ color: codeColors.cyan }}>express</span>();
                </div>
                <div style={styles.codeLineIndent}>
                  <span style={{ color: codeColors.purple }}>await</span>{' '}
                  <span style={{ color: codeColors.cyan }}>database</span>.
                  <span style={{ color: codeColors.green }}>connect</span>();
                </div>
                <div style={styles.codeLineIndent}>
                  server.<span style={{ color: codeColors.green }}>use</span>(
                  <span style={{ color: codeColors.cyan }}>middleware</span>);
                </div>
                <div style={styles.codeLineIndent}>
                  <span style={{ color: codeColors.purple }}>return</span> server.
                  <span style={{ color: codeColors.green }}>listen</span>(
                  <span style={{ color: codeColors.yellow }}>3000</span>);
                </div>
                <div style={styles.codeLine}>{'}'}</div>
                {!isCompact && (
                  <>
                    <div style={styles.codeComment}>
                      <span style={{ color: colors.slate[500] }}>// PostgreSQL + Redis</span>
                    </div>
                    <div style={{ opacity: 0.4 }}>
                      <span style={{ color: colors.slate[500] }}>// Architecture Microservices</span>
                    </div>
                    <div style={{ opacity: 0.4 }}>
                      <span style={{ color: colors.slate[500] }}>// APIs GraphQL + REST</span>
                    </div>
                  </>
                )}
              </div>
              <div style={{
                ...styles.cardLabel,
                ...(isCompact && styles.cardLabelMobile),
              }}>Couche Backend</div>
            </div>
          </div>

          {/* Architecture Card */}
          <div style={{
            ...styles.cardArchitecture,
            ...(isCompact && styles.cardMobile),
          }}>
            <div style={{
              ...styles.cardArchitectureInner,
              ...(isCompact && styles.cardInnerMobile),
            }}>
              <div style={styles.archContent}>
                <div style={styles.archHeader}>
                  <div style={styles.archHeaderBar1}></div>
                  <div style={styles.archHeaderBar2}></div>
                </div>
                <div style={styles.archGrid2}>
                  <div style={styles.archBox}></div>
                  <div style={styles.archBox}></div>
                </div>
                {!isCompact && (
                  <>
                    <div style={styles.archLines}>
                      <div style={styles.archLine1}></div>
                      <div style={styles.archLine2}></div>
                      <div style={styles.archLine3}></div>
                    </div>
                    <div style={styles.archGrid3}>
                      <div style={styles.archBoxSmall}></div>
                      <div style={styles.archBoxSmall}></div>
                      <div style={styles.archBoxSmall}></div>
                    </div>
                  </>
                )}
              </div>
              <div style={{
                ...styles.cardLabelLight,
                ...(isCompact && styles.cardLabelMobile),
              }}>Couche Architecture</div>
            </div>
          </div>

          {/* Frontend Card */}
          <div style={{
            ...styles.cardFrontend,
            ...(isCompact && styles.cardMobile),
          }}>
            <div style={{
              ...styles.cardFrontendInner,
              ...(isCompact && styles.cardInnerMobile),
            }}>
              <div style={styles.cardFrontendGradient}></div>
              <div style={styles.frontendContent}>
                <div style={styles.frontendHeader}>
                  <div style={styles.frontendHeaderLeft}>
                    <div style={styles.frontendAvatar}></div>
                    <div style={styles.frontendAvatarText}>
                      <div style={styles.frontendAvatarBar1}></div>
                      <div style={styles.frontendAvatarBar2}></div>
                    </div>
                  </div>
                  <div style={styles.frontendDots}>
                    <div style={styles.frontendDot}></div>
                    <div style={styles.frontendDot}></div>
                    <div style={styles.frontendDot}></div>
                  </div>
                </div>
                <div style={styles.frontendBody}>
                  <div style={styles.frontendCard}>
                    <div style={styles.frontendCardHeader}>
                      <div style={styles.frontendCardHeaderBar1}></div>
                      <div style={styles.frontendCardHeaderBar2}></div>
                    </div>
                    <div style={styles.frontendCardGrid}>
                      <div style={styles.frontendCardBox}></div>
                      <div style={styles.frontendCardBox}></div>
                      <div style={styles.frontendCardBox}></div>
                    </div>
                  </div>
                  {!isCompact && (
                    <>
                      <div style={styles.frontendMiniCards}>
                        <div style={styles.frontendMiniCard}>
                          <div style={styles.frontendMiniCardBar}></div>
                          <div style={styles.frontendMiniCardGradient1}></div>
                        </div>
                        <div style={styles.frontendMiniCard}>
                          <div style={styles.frontendMiniCardBar}></div>
                          <div style={styles.frontendMiniCardGradient2}></div>
                        </div>
                      </div>
                      <div style={styles.frontendFooter}>
                        <div style={styles.frontendFooterBar}></div>
                        <div style={styles.frontendFooterBox}></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const { colors, spacing, typography, borderRadius, transitions, hexToRgba } = theme;

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  container: {
    position: 'relative',
    height: '43.75rem', // 700px
    perspective: '62.5rem', // 1000px
  },
  containerMobile: {
    height: 'auto',
    perspective: 'none',
    marginTop: spacing[8],
    paddingLeft: spacing[5], // 1.25rem lateral safety
    paddingRight: spacing[5],
  },
  cardsWrapper: {
    position: 'absolute',
    top: '12rem',
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardsWrapperMobile: {
    position: 'relative',
    top: 0,
  },
  cardsContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '34rem',
    transformStyle: 'preserve-3d',
  },
  cardsContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
    maxWidth: '100%',
    transformStyle: 'flat',
  },
  // --- Mobile card overrides (stacked, no 3D) ---
  cardMobile: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    transform: 'none',
    borderRadius: '1.5rem',
  },
  cardInnerMobile: {
    position: 'relative',
    minHeight: '7rem',
    padding: spacing[5],
    borderRadius: '1.5rem',
  },
  cardLabelMobile: {
    position: 'relative',
    bottom: 'auto',
    left: 'auto',
    marginTop: spacing[4],
  },
  // Backend Card (back layer)
  cardBackend: {
    position: 'absolute',
    width: '100%',
    height: '20rem',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(-5rem) rotateY(-8deg) rotateX(5deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardBackendInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.slate[800], 0.4),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.1)}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    overflow: 'hidden',
  },
  codeContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    fontFamily: 'monospace',
    fontSize: typography.fontSize.xs,
    color: colors.slate[400],
  },
  codeLine: {
    opacity: 0.6,
  },
  codeLineIndent: {
    opacity: 0.6,
    paddingLeft: spacing[4],
  },
  codeComment: {
    opacity: 0.4,
    paddingTop: spacing[4],
    color: colors.slate[500],
  },
  cardLabel: {
    position: 'absolute',
    bottom: spacing[4],
    left: spacing[6],
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[500],
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wider,
  },
  cardLabelLight: {
    position: 'absolute',
    bottom: spacing[4],
    left: spacing[6],
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[400],
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wider,
  },
  // Architecture Card (middle layer)
  cardArchitecture: {
    position: 'absolute',
    width: '100%',
    height: '20rem',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(-2.5rem) rotateY(-6deg) rotateX(4deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardArchitectureInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.slate[700], 0.5),
    backdropFilter: 'blur(0.75rem)',
    WebkitBackdropFilter: 'blur(0.75rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.15)}`,
    borderRadius: borderRadius['2xl'],
    padding: spacing[6],
    overflow: 'hidden',
  },
  archContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  archHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  archHeaderBar1: {
    height: spacing[3],
    width: spacing[32],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.default,
  },
  archHeaderBar2: {
    height: spacing[2],
    width: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archGrid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[3],
  },
  archGrid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
  },
  archBox: {
    height: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  archBoxSmall: {
    height: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  archLines: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  archLine1: {
    height: spacing[2],
    width: '100%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archLine2: {
    height: spacing[2],
    width: '83%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  archLine3: {
    height: spacing[2],
    width: '66%',
    backgroundColor: hexToRgba(colors.white, 0.1),
    borderRadius: borderRadius.default,
  },
  // Frontend Card (front layer)
  cardFrontend: {
    position: 'absolute',
    width: '100%',
    height: '20rem',
    borderRadius: borderRadius['2xl'],
    transform: 'translateZ(0) rotateY(-4deg) rotateX(3deg)',
    transformStyle: 'preserve-3d',
    transition: `all ${transitions.duration.slower} ${transitions.timing.ease}`,
  },
  cardFrontendInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(1.5rem)',
    WebkitBackdropFilter: 'blur(1.5rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    boxShadow: '0 1.5625rem 3.125rem -0.75rem rgba(0, 0, 0, 0.25)',
  },
  cardFrontendGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.teal[500], 0.1)}, transparent, ${hexToRgba(colors.purple[500], 0.1)})`,
  },
  frontendContent: {
    position: 'relative',
    height: '100%',
    padding: spacing[6],
  },
  frontendHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[6],
  },
  frontendHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  frontendAvatar: {
    width: spacing[10],
    height: spacing[10],
    borderRadius: '50%',
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
  },
  frontendAvatarText: {
    display: 'flex',
    flexDirection: 'column',
  },
  frontendAvatarBar1: {
    height: spacing[2],
    width: spacing[20],
    backgroundColor: hexToRgba(colors.white, 0.4),
    borderRadius: borderRadius.default,
    marginBottom: spacing[1],
  },
  frontendAvatarBar2: {
    height: spacing[1.5],
    width: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.default,
  },
  frontendDots: {
    display: 'flex',
    gap: spacing[1],
  },
  frontendDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: '50%',
    backgroundColor: hexToRgba(colors.white, 0.3),
  },
  frontendBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
  frontendCard: {
    background: `linear-gradient(to right, ${hexToRgba(colors.teal[400], 0.2)}, ${hexToRgba(colors.cyan[400], 0.2)})`,
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    borderRadius: borderRadius.xl,
    padding: spacing[4],
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  frontendCardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
  },
  frontendCardHeaderBar1: {
    height: spacing[2],
    width: spacing[24],
    backgroundColor: hexToRgba(colors.white, 0.5),
    borderRadius: borderRadius.default,
  },
  frontendCardHeaderBar2: {
    height: spacing[2],
    width: spacing[12],
    backgroundColor: hexToRgba(colors.teal[300], 0.5),
    borderRadius: borderRadius.default,
  },
  frontendCardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
  },
  frontendCardBox: {
    height: spacing[12],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.lg,
  },
  frontendMiniCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: spacing[3],
  },
  frontendMiniCard: {
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    borderRadius: borderRadius.lg,
    padding: spacing[3],
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
  },
  frontendMiniCardBar: {
    height: spacing[2],
    width: spacing[16],
    backgroundColor: hexToRgba(colors.white, 0.4),
    borderRadius: borderRadius.default,
    marginBottom: spacing[2],
  },
  frontendMiniCardGradient1: {
    height: spacing[8],
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.cyan[400], 0.3)}, ${hexToRgba(colors.teal[400], 0.3)})`,
    borderRadius: borderRadius.default,
  },
  frontendMiniCardGradient2: {
    height: spacing[8],
    background: `linear-gradient(to bottom right, ${hexToRgba(colors.purple[400], 0.3)}, ${hexToRgba(colors.purple[300], 0.3)})`,
    borderRadius: borderRadius.default,
  },
  frontendFooter: {
    display: 'flex',
    gap: spacing[2],
  },
  frontendFooterBar: {
    flex: 1,
    height: spacing[8],
    background: `linear-gradient(to right, ${hexToRgba(colors.teal[400], 0.3)}, ${hexToRgba(colors.cyan[400], 0.3)})`,
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
  },
  frontendFooterBox: {
    width: spacing[8],
    height: spacing[8],
    backgroundColor: hexToRgba(colors.white, 0.2),
    borderRadius: borderRadius.lg,
    border: `1px solid ${hexToRgba(colors.white, 0.3)}`,
  },
};

// Code highlighting colors
const codeColors = {
  purple: colors.purple[400],
  cyan: colors.cyan[300],
  yellow: '#fde047',
  green: '#4ade80',
};

export default GlassCards;
