import { Layers } from 'lucide-react';
import { CSSProperties } from 'react';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function Navigation() {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIconWrapper}>
            <div style={styles.logoIconGlow}></div>
            <div style={styles.logoIconInner}>
              <Layers style={styles.logoIcon} />
            </div>
          </div>
          <span style={styles.logoText}>Sweet</span>
        </div>

        {/* Navigation Links */}
        <div style={styles.navLinks}>
          <a href="#services" style={styles.navLink}>
            Services
          </a>
          <a href="#work" style={styles.navLink}>
            Réalisations
          </a>
          <a href="#about" style={styles.navLink}>
            À Propos
          </a>
          <a href="#contact" style={styles.navLink}>
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <button style={styles.ctaButton}>
          Discutons
        </button>
      </div>
    </nav>
  );
}

const { colors, spacing, typography, borderRadius, transitions, hexToRgba } = theme;

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  nav: {
    position: 'relative',
    zIndex: 50,
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[8],
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  },
  logoIconWrapper: {
    position: 'relative',
  },
  logoIconGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
    filter: 'blur(1rem)',
    opacity: 0.5,
  },
  logoIconInner: {
    position: 'relative',
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    padding: spacing[2],
    borderRadius: borderRadius.lg,
  },
  logoIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.white,
  },
  logoText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    letterSpacing: typography.letterSpacing.wider,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
  },
  navLink: {
    color: colors.slate[300],
    fontWeight: typography.fontWeight.medium,
    transition: `color ${transitions.duration.normal} ${transitions.timing.ease}`,
    textDecoration: 'none',
    fontSize: typography.fontSize.base,
  },
  ctaButton: {
    paddingLeft: spacing[6],
    paddingRight: spacing[6],
    paddingTop: spacing[2.5],
    paddingBottom: spacing[2.5],
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius.lg,
    color: colors.white,
    fontWeight: typography.fontWeight.semibold,
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
    cursor: 'pointer',
    fontSize: typography.fontSize.base,
  },
};

export default Navigation;
