import { Layers } from 'lucide-react';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { styles } from './Footer.styles';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

function Footer() {
  const { isMobile, isTablet } = useWindowSize();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.topAccent} />
      <div style={styles.backgroundTexture} />
      <div style={styles.glowOrb} />

      <div style={{
        ...styles.content,
        ...(isMobile && styles.contentMobile),
      }}>
        <div style={{
          ...styles.topRow,
          ...(isTablet && styles.topRowTablet),
          ...(isMobile && styles.topRowMobile),
        }}>
          <div style={styles.brandWrap}>
            <div style={styles.brandRow}>
              <div style={styles.logoPill}>
                <Layers style={styles.logoIcon} />
              </div>
              <h3 style={styles.brandName}>Sweet</h3>
            </div>

            <p style={styles.brandDescription}>
              Nous concevons des expériences web élégantes, performantes et sur mesure,
              pensées pour faire grandir votre activité.
            </p>
          </div>

          <div>
            <h4 style={styles.sectionTitle}>Navigation</h4>
            <nav style={styles.linkList}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} style={styles.linkItem}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 style={styles.sectionTitle}>Contact</h4>
            <div style={styles.linkList}>
              <p style={styles.contactText}>contact@agence-sweet.com</p>
              <p style={styles.contactText}>+33 1 23 45 67 89</p>
              <button
                style={styles.ctaButton}
                onClick={() => {
                  window.location.hash = '#contact';
                }}
              >
                Démarrer un projet
              </button>
            </div>
          </div>
        </div>

        <div style={{
          ...styles.bottomBar,
          ...(isMobile && styles.bottomBarMobile),
        }}>
          <p style={styles.copyright}>
            © {currentYear} Agence Sweet. Tous droits réservés.
          </p>

          <div style={styles.legalLinks}>
            <a href="#" style={styles.legalLink}>Mentions légales</a>
            <a href="#" style={styles.legalLink}>Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
