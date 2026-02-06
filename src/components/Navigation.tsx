import { useState, useEffect, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Menu, X } from 'lucide-react';
import { useWindowSize } from '../hooks/useWindowSize';
import theme from '../styles/theme';

const { colors, spacing, typography, borderRadius, transitions, hexToRgba, gradients } = theme;

// =============================================================================
// SCROLL THRESHOLD (px)
// =============================================================================
const SCROLL_THRESHOLD = 50;

// =============================================================================
// NAVIGATION LINKS DATA
// =============================================================================
const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Réalisations' },
  { href: '#about', label: 'À Propos' },
  { href: '#contact', label: 'Contact' },
];

// =============================================================================
// COMPONENT
// =============================================================================
function Navigation() {
  const { isDesktop } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isDesktop, isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        ...styles.nav,
        ...(isScrolled ? styles.navActive : styles.navTransparent),
      }}>
        <div style={styles.navContent}>
          {/* Logo */}
          <a href="#hero-section" style={styles.logoContainer}>
            <div style={styles.logoIconWrapper}>
              <div style={styles.logoIconGlow}></div>
              <div style={{
                ...styles.logoIconInner,
                ...(isScrolled && styles.logoIconInnerScrolled),
              }}>
                <Layers style={{
                  ...styles.logoIcon,
                  ...(isScrolled && styles.logoIconScrolled),
                }} />
              </div>
            </div>
            <span style={{
              ...styles.logoText,
              ...(isScrolled && styles.logoTextScrolled),
            }}>Sweet</span>
          </a>

          {/* Desktop Navigation Links */}
          {isDesktop && (
            <div style={styles.navLinks}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} style={{
                  ...styles.navLink,
                  ...(isScrolled && styles.navLinkScrolled),
                }}>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA Button */}
          {isDesktop && (
            <button style={{
              ...styles.ctaButton,
              ...(isScrolled && styles.ctaButtonScrolled),
            }}>
              Discutons
            </button>
          )}

          {/* Mobile Burger Button */}
          {!isDesktop && (
            <button
              style={{
                ...styles.burgerButton,
                ...(isScrolled && styles.burgerButtonScrolled),
              }}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu style={{
                ...styles.burgerIcon,
                ...(isScrolled && styles.burgerIconScrolled),
              }} />
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && !isDesktop && (
          <>
            {/* Backdrop */}
            <motion.div
              style={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.div
              style={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                style={styles.closeButton}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X style={styles.closeIcon} />
              </button>

              {/* Mobile Logo */}
              <div style={styles.drawerLogo}>
                <div style={styles.logoIconWrapper}>
                  <div style={styles.logoIconGlowDark}></div>
                  <div style={styles.logoIconInnerDark}>
                    <Layers style={styles.logoIconDark} />
                  </div>
                </div>
                <span style={styles.logoTextDark}>Sweet</span>
              </div>

              {/* Mobile Navigation Links */}
              <nav style={styles.drawerNav}>
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    style={styles.drawerLink}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                style={styles.drawerCta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button style={styles.drawerCtaButton} onClick={handleLinkClick}>
                  <span style={styles.drawerCtaText}>Discutons</span>
                </button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                style={styles.drawerContact}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p style={styles.drawerContactText}>contact@sweetagency.fr</p>
                <p style={styles.drawerContactText}>+33 1 23 45 67 89</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  // -------------------------------------------------------------------------
  // NAVBAR
  // -------------------------------------------------------------------------
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    transition: `background-color 0.3s ease, box-shadow 0.3s ease`,
  },
  navTransparent: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  navActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(0.75rem)',
    WebkitBackdropFilter: 'blur(0.75rem)',
    boxShadow: '0 0.125rem 1rem rgba(0, 0, 0, 0.08)',
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '87.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: spacing[5],
    paddingRight: spacing[5],
  },
  
  // -------------------------------------------------------------------------
  // LOGO
  // -------------------------------------------------------------------------
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    textDecoration: 'none',
    cursor: 'pointer',
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
  logoIconGlowDark: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: `linear-gradient(to bottom right, ${colors.teal[400]}, ${colors.cyan[400]})`,
    filter: 'blur(1rem)',
    opacity: 0.3,
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
  logoIconInnerDark: {
    position: 'relative',
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    padding: spacing[2],
    borderRadius: borderRadius.lg,
  },
  logoIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.white,
    transition: 'color 0.3s ease',
  },
  logoIconScrolled: {
    color: colors.teal[600],
  },
  logoIconInnerScrolled: {
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
  },
  logoIconDark: {
    width: spacing[6],
    height: spacing[6],
    color: colors.teal[600],
  },
  logoText: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.white,
    letterSpacing: typography.letterSpacing.wider,
    transition: 'color 0.3s ease',
  },
  logoTextScrolled: {
    color: colors.slate[900],
  },
  logoTextDark: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.black,
    color: colors.slate[900],
    letterSpacing: typography.letterSpacing.wider,
  },

  // -------------------------------------------------------------------------
  // DESKTOP NAV LINKS
  // -------------------------------------------------------------------------
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
  },
  navLink: {
    color: colors.slate[300],
    fontWeight: typography.fontWeight.medium,
    transition: 'color 0.3s ease',
    textDecoration: 'none',
    fontSize: typography.fontSize.base,
  },
  navLinkScrolled: {
    color: colors.slate[600],
  },

  // -------------------------------------------------------------------------
  // DESKTOP CTA BUTTON
  // -------------------------------------------------------------------------
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
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontSize: typography.fontSize.base,
  },
  ctaButtonScrolled: {
    backgroundImage: gradients.primary,
    border: 'none',
    color: colors.white,
    boxShadow: `0 0.25rem 0.75rem ${hexToRgba(colors.teal[500], 0.3)}`,
  },

  // -------------------------------------------------------------------------
  // MOBILE BURGER BUTTON
  // -------------------------------------------------------------------------
  burgerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[11],  // 44px - minimum touch target
    height: spacing[11], // 44px
    backgroundColor: hexToRgba(colors.white, 0.1),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    border: `1px solid ${hexToRgba(colors.white, 0.2)}`,
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  burgerButtonScrolled: {
    backgroundColor: colors.teal[50],
    border: `1px solid ${colors.teal[200]}`,
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none',
  },
  burgerIcon: {
    width: spacing[6],
    height: spacing[6],
    color: colors.white,
    transition: 'color 0.3s ease',
  },
  burgerIconScrolled: {
    color: colors.teal[600],
  },

  // -------------------------------------------------------------------------
  // MOBILE DRAWER
  // -------------------------------------------------------------------------
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: hexToRgba(colors.slate[900], 0.5),
    backdropFilter: 'blur(0.25rem)',
    WebkitBackdropFilter: 'blur(0.25rem)',
    zIndex: 998,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '85vw',
    maxWidth: '22rem',
    backgroundColor: colors.white,
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing[6],
    boxShadow: `-1.5rem 0 3rem ${hexToRgba(colors.slate[900], 0.2)}`,
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: spacing[5],
    right: spacing[5],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing[11],  // 44px
    height: spacing[11], // 44px
    backgroundColor: colors.slate[100],
    border: 'none',
    borderRadius: borderRadius.full,
    cursor: 'pointer',
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
  },
  closeIcon: {
    width: spacing[5],
    height: spacing[5],
    color: colors.slate[600],
  },

  // -------------------------------------------------------------------------
  // DRAWER CONTENT
  // -------------------------------------------------------------------------
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginTop: spacing[8],
    marginBottom: spacing[10],
  },
  drawerNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  },
  drawerLink: {
    display: 'block',
    padding: spacing[4],
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.slate[700],
    textDecoration: 'none',
    borderRadius: borderRadius.lg,
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
    minHeight: spacing[11], // 44px touch target
  },
  drawerCta: {
    marginTop: 'auto',
    paddingTop: spacing[8],
  },
  drawerCtaButton: {
    width: '100%',
    padding: spacing[4],
    backgroundImage: gradients.primary,
    border: 'none',
    borderRadius: borderRadius.xl,
    cursor: 'pointer',
    transition: `all ${transitions.duration.normal} ${transitions.timing.ease}`,
    minHeight: spacing[11], // 44px
  },
  drawerCtaText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  drawerContact: {
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTop: `1px solid ${colors.slate[200]}`,
  },
  drawerContactText: {
    fontSize: typography.fontSize.sm,
    color: colors.slate[500],
    margin: 0,
    marginBottom: spacing[2],
  },
};

export default Navigation;
