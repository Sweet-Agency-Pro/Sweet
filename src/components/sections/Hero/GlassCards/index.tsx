/**
 * GlassCards Component
 * 3D glassmorphism cards showcasing backend, architecture, and frontend layers
 */

import { useWindowSize } from '../../../../hooks/useWindowSize';
import { styles, codeColors } from './GlassCards.styles';
import theme from '../../../../styles/theme';

const { colors } = theme;

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface CardProps {
  isCompact: boolean;
}

/** Backend Code Card */
function BackendCard({ isCompact }: CardProps) {
  return (
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
  );
}

/** Architecture Wireframe Card */
function ArchitectureCard({ isCompact }: CardProps) {
  return (
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
  );
}

/** Frontend UI Preview Card */
function FrontendCard({ isCompact }: CardProps) {
  return (
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
  );
}

// =============================================================================
// MAIN COMPONENT
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
          <BackendCard isCompact={isCompact} />
          <ArchitectureCard isCompact={isCompact} />
          <FrontendCard isCompact={isCompact} />
        </div>
      </div>
    </div>
  );
}

export default GlassCards;
