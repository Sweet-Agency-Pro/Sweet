/**
 * Navigation Component
 * Main navigation bar with scroll detection and mobile drawer
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Menu, X } from 'lucide-react';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { useSectionNavigation } from '../../../hooks/useSectionNavigation';
import { styles } from './Navigation.styles';

// =============================================================================
// CONSTANTS
// =============================================================================
const SCROLL_THRESHOLD = 50;

const navLinks = [
  { sectionId: 'services', label: 'Services' },
  { sectionId: 'portfolio', label: 'Réalisations' },
  { sectionId: 'about', label: 'À Propos' },
  { sectionId: 'contact', label: 'Contact' },
];

// =============================================================================
// CUSTOM HOOK: useScrollDetection
// =============================================================================
function useScrollDetection(threshold: number = SCROLL_THRESHOLD) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}

// =============================================================================
// CUSTOM HOOK: useBodyScrollLock
// =============================================================================
function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}

// =============================================================================
// COMPONENT
// =============================================================================
function Navigation() {
  const { isDesktop } = useWindowSize();
  const { navigateToSection } = useSectionNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScrollDetection();

  // Close menu on resize to desktop
  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isDesktop, isMenuOpen]);

  // Lock body scroll when drawer is open
  useBodyScrollLock(isMenuOpen);

  const handleLinkClick = (sectionId?: string) => {
    setIsMenuOpen(false);
    if (sectionId) {
      navigateToSection(sectionId);
    }
  };

  return (
    <>
      <nav
        style={{
          ...styles.nav,
          ...(isScrolled ? styles.navActive : styles.navTransparent),
        }}
      >
        <div style={styles.navContent}>
          {/* Logo */}
            <div onClick={() => navigateToSection('hero-section')} style={styles.logoContainer}>
            <div style={styles.logoIconWrapper}>
              <div style={styles.logoIconGlow} />
              <div
              style={{
                ...styles.logoIconInner,
                ...(isScrolled && styles.logoIconInnerScrolled),
              }}
              >
              <Layers
                style={{
                ...styles.logoIcon,
                ...(isScrolled && styles.logoIconScrolled),
                }}
              />
              </div>
            </div>
            <span
              style={{
              ...styles.logoText,
              ...(isScrolled && styles.logoTextScrolled),
              }}
            >
              Sweet
            </span>
            </div>

          {/* Desktop Navigation Links */}
          {isDesktop && (
            <div style={styles.navLinks}>
              {navLinks.map((link) => (
                <a
                  key={link.sectionId}
                  href={`/#${link.sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection(link.sectionId);
                  }}
                  style={{
                    ...styles.navLink,
                    ...(isScrolled && styles.navLinkScrolled),
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA Button */}
          {isDesktop && (
            <button
              style={{
                ...styles.ctaButton,
                ...(isScrolled && styles.ctaButtonScrolled),
              }}
              onClick={() => navigateToSection('contact')}
            >
              Discutons
            </button>
          )}

          {/* Mobile Burger Button */}
          {!isDesktop && (
            <button
              style={{
                ...styles.burgerButton,
                ...(isScrolled && styles.burgerButtonScrolled),
                ...(isMenuOpen && styles.burgerButtonOpen),
              }}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? (
                <X
                  style={{
                    ...styles.burgerIcon,
                    ...styles.burgerIconOpen,
                  }}
                />
              ) : (
                <Menu
                  style={{
                    ...styles.burgerIcon,
                    ...(isScrolled && styles.burgerIconScrolled),
                  }}
                />
              )}
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
                  <div style={styles.logoIconGlowDark} />
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
                    key={link.sectionId}
                    href={`/#${link.sectionId}`}
                    style={styles.drawerLink}
                    onClick={(event) => {
                      event.preventDefault();
                      handleLinkClick(link.sectionId);
                    }}
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
                <button style={styles.drawerCtaButton} onClick={() => handleLinkClick('contact')}>
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

export default Navigation;
