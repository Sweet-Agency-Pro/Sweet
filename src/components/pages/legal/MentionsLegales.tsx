/**
 * Mentions Légales Page
 * Legal notice page with branded dark hero + light content
 */

import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useWindowSize } from '../../../hooks/useWindowSize';
import Navigation from '../../layout/Navigation';
import Footer from '../../sections/Footer';
import { styles } from './Legal.styles';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function HeroBanner({ isMobile }: { isMobile: boolean }) {
  return (
    <div style={{
      ...styles.heroBar,
      ...(isMobile && styles.heroBarMobile),
    }}>
      <Navigation />
      <div style={styles.heroTexture} />
      <div style={styles.heroBlob1} />
      <div style={styles.heroBlob2} />

      <div style={{
        ...styles.heroContent,
        ...(isMobile && styles.heroContentMobile),
      }}>
        <div style={styles.badge}>
          <FileText style={styles.badgeIcon} />
          <span style={styles.badgeText}>Légal</span>
        </div>
        <h1 style={styles.heroTitle}>
          Mentions{' '}
          <span style={styles.heroTitleGradient}>Légales</span>
        </h1>
        <p style={styles.heroDescription}>
          Informations légales relatives à l'éditeur du site, à son hébergement
          et à la propriété intellectuelle des contenus.
        </p>
      </div>
    </div>
  );
}

function InfoCard({ rows }: { rows: { label: string; value: string; isPlaceholder?: boolean }[] }) {
  return (
    <div style={styles.infoCard}>
      {rows.map((row, i) => (
        <div key={i} style={{
          ...styles.infoRow,
          ...(i === rows.length - 1 ? { marginBottom: 0 } : undefined),
        }}>
          <span style={styles.infoLabel}>{row.label}</span>
          <span style={row.isPlaceholder ? styles.placeholderValue : styles.infoValue}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function MentionsLegales() {
  const { isMobile } = useWindowSize();

  return (
    <div style={styles.page}>
      <HeroBanner isMobile={isMobile} />
      <div style={styles.accentLine} />

      <div style={styles.main}>
        <div style={styles.backgroundTexture} />

        <div style={{
          ...styles.container,
          ...(isMobile && styles.containerMobile),
        }}>
          <Link to="/" style={styles.backLink}>
            <ArrowLeft style={styles.backIcon} />
            Retour à l'accueil
          </Link>

          {/* ── Article 1 : Éditeur du site ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={{
              ...styles.articleTitle,
              ...(isMobile && styles.articleTitleMobile),
            }}>
              Article 1 - Éditeur du site
            </h2>

            <p style={styles.paragraph}>
              Le présent site, accessible à l'URL{' '}
              <strong style={styles.strong}>https://www.agence-sweet.com/</strong>, est édité par :
            </p>

            <InfoCard rows={[
              { label: 'Raison sociale', value: 'Agence Sweet', isPlaceholder: false },
              { label: 'Forme juridique', value: 'Groupement d\'intérêt économique d\'auto-entrepreneurs', isPlaceholder: false },
              { label: 'RCS', value: 'Saverne - N° 94462387500019', isPlaceholder: false },
              { label: 'Siège social', value: '21 rue du 23 Novembre, 67310, Wasselonne, France', isPlaceholder: false },
              { label: 'Téléphone', value: '+33 6 83 94 96 90', isPlaceholder: false },
              { label: 'Email', value: 'contact@agence-sweet.com', isPlaceholder: false },
              { label: 'Directeur de la publication', value: 'Jaeger Attilio & Kempf--le-Pape Maël', isPlaceholder: false },
            ]} />
          </article>

          {/* ── Article 2 : Hébergeur ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={{
              ...styles.articleTitle,
              ...(isMobile && styles.articleTitleMobile),
            }}>
              Article 2 - Hébergeur
            </h2>

            <p style={styles.paragraph}>
              Le site est hébergé par la société :
            </p>

            <InfoCard rows={[
              { label: 'Hébergeur', value: 'Vercel Inc.', isPlaceholder: false },
              { label: 'Adresse', value: '440 N Barranca Avenue #4133, Covina, CA 91723, United States', isPlaceholder: false },
              { label: 'Contact', value: 'https://www.vercel.com/contact', isPlaceholder: false },
            ]} />
          </article>

          {/* ── Article 3 : Propriété intellectuelle ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={{
              ...styles.articleTitle,
              ...(isMobile && styles.articleTitleMobile),
            }}>
              Article 3 - Propriété intellectuelle
            </h2>

            <p style={styles.paragraph}>
              L'ensemble de ce site, notamment les textes, logos, tableaux, représentations
              iconographiques et photographiques, ainsi que les documents téléchargeables, relève
              de la législation française et internationale sur le droit d'auteur et la propriété
              intellectuelle.
            </p>
            <p style={styles.paragraph}>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou
              partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sans autorisation écrite préalable de l'éditeur.
            </p>
            <p style={styles.paragraph}>
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il
              contient sera considérée comme constitutive d'une contrefaçon et poursuivie
              conformément aux dispositions des articles L.335-2 et suivants du Code de la
              Propriété Intellectuelle.
            </p>
          </article>

          {/* ── Article 4 : Responsabilité ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={{
              ...styles.articleTitle,
              ...(isMobile && styles.articleTitleMobile),
            }}>
              Article 4 - Limitation de responsabilité
            </h2>

            <p style={styles.paragraph}>
              L'éditeur du site ne pourra être tenu pour responsable des dommages directs ou
              indirects causés au matériel de l'utilisateur lors de l'accès au site, résultant
              soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques
              requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p style={styles.paragraph}>
              L'éditeur ne pourra également être tenu pour responsable des dommages indirects
              consécutifs à l'utilisation du site.
            </p>
          </article>

          <p style={styles.lastUpdated}>
            Dernière mise à jour : février 2026
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MentionsLegales;
