/**
 * Navigation Component
 * Main navigation bar with scroll detection and mobile drawer
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Menu, X } from 'lucide-react';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { useSectionNavigation } from '../../../hooks/useSectionNavigation';
import './Navigation.css';

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
      <nav className={`nav ${isScrolled ? 'nav--active' : 'nav--transparent'}`}>
        <div className="nav__content">
          {/* Logo */}
          <div onClick={() => navigateToSection('hero-section')} className="nav__logo">
            <div className="nav__logo-icon-wrapper">
              <div className="nav__logo-icon-glow" />
              <div className={`nav__logo-icon-inner ${isScrolled ? 'nav__logo-icon-inner--scrolled' : ''}`}>
                <Layers className={`nav__logo-icon ${isScrolled ? 'nav__logo-icon--scrolled' : ''}`} />
              </div>
            </div>
            <span className={`nav__logo-text ${isScrolled ? 'nav__logo-text--scrolled' : ''}`}>
              Sweet
            </span>
          </div>

          {/* Desktop Navigation Links */}
          {isDesktop && (
            <div className="nav__links">
              {navLinks.map((link) => (
                <a
                  key={link.sectionId}
                  href={`/#${link.sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection(link.sectionId);
                  }}
                  className={`nav__link ${isScrolled ? 'nav__link--scrolled' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA Button */}
          {isDesktop && (
            <button
              className={`nav__cta ${isScrolled ? 'nav__cta--scrolled' : ''}`}
              onClick={() => navigateToSection('contact')}
            >
              Discutons
            </button>
          )}

          {/* Mobile Burger Button */}
          {!isDesktop && (
            <button
              className={`nav__burger ${isScrolled ? 'nav__burger--scrolled' : ''} ${isMenuOpen ? 'nav__burger--open' : ''}`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? (
                <X className="nav__burger-icon nav__burger-icon--open" />
              ) : (
                <Menu className={`nav__burger-icon ${isScrolled ? 'nav__burger-icon--scrolled' : ''}`} />
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
              className="nav__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer Menu */}
            <motion.div
              className="nav__drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                className="nav__drawer-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <X className="nav__drawer-close-icon" />
              </button>

              {/* Mobile Logo */}
              <div className="nav__drawer-logo">
                <div className="nav__logo-icon-wrapper">
                  <div className="nav__logo-icon-glow--dark" />
                  <div className="nav__logo-icon-inner--dark">
                    <Layers className="nav__logo-icon--dark" />
                  </div>
                </div>
                <span className="nav__logo-text--dark">Sweet</span>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="nav__drawer-nav">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.sectionId}
                    href={`/#${link.sectionId}`}
                    className="nav__drawer-link"
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
                className="nav__drawer-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button className="nav__drawer-cta-button" onClick={() => handleLinkClick('contact')}>
                  <span className="nav__drawer-cta-text">Discutons</span>
                </button>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="nav__drawer-contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="nav__drawer-contact-text">contact@agence-sweet.com</p>
                <p className="nav__drawer-contact-text">+33 6 83 94 96 90</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;
