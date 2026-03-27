import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useSectionNavigation } from '../../../hooks/useSectionNavigation';
import './Footer.css';

const navLinks = [
  { sectionId: 'services', label: 'Services' },
  { sectionId: 'portfolio', label: 'Portfolio' },
  { sectionId: 'contact', label: 'Contact' },
];

interface FooterProps {
  colorScheme?: 'teal' | 'purple' | 'blue';
}

function Footer({ colorScheme }: FooterProps) {
  const { navigateToSection } = useSectionNavigation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${colorScheme ? `footer--${colorScheme}` : ''}`}>
      <div className="footer__top-accent" />
      <div className="footer__bg-texture" />
      <div className="footer__glow-orb" />

      <div className="footer__content">
        <div className="footer__top-row">
          <div className="footer__brand-wrap">
            <div className="footer__brand-row">
              <div className="footer__logo-pill">
                <Layers className="footer__logo-icon" />
              </div>
              <h3 className="footer__brand-name">Sweet</h3>
            </div>

            <p className="footer__brand-description">
              Nous concevons des expériences web élégantes, performantes et sur mesure,
              pensées pour faire grandir votre activité.
            </p>
          </div>

          <div>
            <h4 className="footer__section-title">Navigation</h4>
            <nav className="footer__link-list">
              {navLinks.map((link) => (
                <a
                  key={link.sectionId}
                  href={`/#${link.sectionId}`}
                  className="footer__link-item"
                  onClick={(event) => {
                    event.preventDefault();
                    navigateToSection(link.sectionId);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="footer__section-title">Contact</h4>
            <div className="footer__link-list">
              <p className="footer__contact-text">contact@agence-sweet.com</p>
              <p className="footer__contact-text">+33 6 83 94 96 90</p>
              <button
                className="footer__cta-button"
                onClick={() => navigateToSection('contact')}
              >
                Démarrer un projet
              </button>
            </div>
          </div>
        </div>

        <div className="footer__bottom-bar">
          <p className="footer__copyright">
            © {currentYear} Agence Sweet. Tous droits réservés.
          </p>

          <div className="footer__legal-links">
            <Link to="/mentions-legales" className="footer__legal-link">Mentions légales</Link>
            <Link to="/confidentialite" className="footer__legal-link">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
