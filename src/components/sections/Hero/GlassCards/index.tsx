/**
 * GlassCards Component
 * 3D glassmorphism cards showcasing backend, architecture, and frontend layers
 */

import { useWindowSize } from '../../../../hooks/useWindowSize';
import './GlassCards.css';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface CardProps {
  isCompact: boolean;
}

/** Backend Code Card */
function BackendCard({ isCompact }: CardProps) {
  return (
    <div className="glass-card glass-card--backend">
      <div className="glass-card__inner glass-card__inner--backend">
        <div className="glass-card__code">
          <div className="glass-card__code-line">
            <span className="code-purple">const</span>{' '}
            <span className="code-cyan">buildAPI</span> ={' '}
            <span className="code-yellow">async</span> () =&gt; {'{'}
          </div>
          <div className="glass-card__code-indent">
            <span className="code-purple">const</span> server ={' '}
            <span className="code-cyan">express</span>();
          </div>
          <div className="glass-card__code-indent">
            <span className="code-purple">await</span>{' '}
            <span className="code-cyan">database</span>.
            <span className="code-green">connect</span>();
          </div>
          <div className="glass-card__code-indent">
            server.<span className="code-green">use</span>(
            <span className="code-cyan">middleware</span>);
          </div>
          <div className="glass-card__code-indent">
            <span className="code-purple">return</span> server.
            <span className="code-green">listen</span>(
            <span className="code-yellow">3000</span>);
          </div>
          <div className="glass-card__code-line">{'}'}</div>
          {!isCompact && (
            <>
              <div className="glass-card__code-comment">
                <span className="code-slate">// PostgreSQL + Redis</span>
              </div>
              <div style={{ opacity: 0.4 }}>
                <span className="code-slate">// Architecture Microservices</span>
              </div>
              <div style={{ opacity: 0.4 }}>
                <span className="code-slate">// APIs GraphQL + REST</span>
              </div>
            </>
          )}
        </div>
        <div className="glass-card__label glass-card__label--backend">Couche Backend</div>
      </div>
    </div>
  );
}

/** Architecture Wireframe Card */
function ArchitectureCard({ isCompact }: CardProps) {
  return (
    <div className="glass-card glass-card--architecture">
      <div className="glass-card__inner glass-card__inner--architecture">
        <div className="glass-card__arch-content">
          <div className="glass-card__arch-header">
            <div className="glass-card__arch-bar-1"></div>
            <div className="glass-card__arch-bar-2"></div>
          </div>
          <div className="glass-card__arch-grid-2">
            <div className="glass-card__arch-box"></div>
            <div className="glass-card__arch-box"></div>
          </div>
          {!isCompact && (
            <>
              <div className="glass-card__arch-lines">
                <div className="glass-card__arch-line-1"></div>
                <div className="glass-card__arch-line-2"></div>
                <div className="glass-card__arch-line-3"></div>
              </div>
              <div className="glass-card__arch-grid-3">
                <div className="glass-card__arch-box-small"></div>
                <div className="glass-card__arch-box-small"></div>
                <div className="glass-card__arch-box-small"></div>
              </div>
            </>
          )}
        </div>
        <div className="glass-card__label glass-card__label--light">Couche Architecture</div>
      </div>
    </div>
  );
}

/** Frontend UI Preview Card */
function FrontendCard({ isCompact }: CardProps) {
  return (
    <div className="glass-card glass-card--frontend">
      <div className="glass-card__inner glass-card__inner--frontend">
        <div className="glass-card__frontend-gradient"></div>
        <div className="glass-card__frontend-content">
          <div className="glass-card__frontend-header">
            <div className="glass-card__frontend-header-left">
              <div className="glass-card__frontend-avatar"></div>
              <div className="glass-card__frontend-avatar-text">
                <div className="glass-card__frontend-avatar-bar-1"></div>
                <div className="glass-card__frontend-avatar-bar-2"></div>
              </div>
            </div>
            <div className="glass-card__frontend-dots">
              <div className="glass-card__frontend-dot"></div>
              <div className="glass-card__frontend-dot"></div>
              <div className="glass-card__frontend-dot"></div>
            </div>
          </div>
          <div className="glass-card__frontend-body">
            <div className="glass-card__frontend-card">
              <div className="glass-card__frontend-card-header">
                <div className="glass-card__frontend-card-bar-1"></div>
                <div className="glass-card__frontend-card-bar-2"></div>
              </div>
              <div className="glass-card__frontend-card-grid">
                <div className="glass-card__frontend-card-box"></div>
                <div className="glass-card__frontend-card-box"></div>
                <div className="glass-card__frontend-card-box"></div>
              </div>
            </div>
            {!isCompact && (
              <>
                <div className="glass-card__frontend-minicards">
                  <div className="glass-card__frontend-minicard">
                    <div className="glass-card__frontend-minicard-bar"></div>
                    <div className="glass-card__frontend-minicard-grad-1"></div>
                  </div>
                  <div className="glass-card__frontend-minicard">
                    <div className="glass-card__frontend-minicard-bar"></div>
                    <div className="glass-card__frontend-minicard-grad-2"></div>
                  </div>
                </div>
                <div className="glass-card__frontend-footer">
                  <div className="glass-card__frontend-footer-bar"></div>
                  <div className="glass-card__frontend-footer-box"></div>
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
    <div className="glass-cards">
      <div className="glass-cards__wrapper">
        <div className="glass-cards__container">
          <BackendCard isCompact={isCompact} />
          <ArchitectureCard isCompact={isCompact} />
          <FrontendCard isCompact={isCompact} />
        </div>
      </div>
    </div>
  );
}

export default GlassCards;
