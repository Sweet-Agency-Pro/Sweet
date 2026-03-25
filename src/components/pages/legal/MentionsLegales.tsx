/**
 * Mentions Légales Page
 * Legal notice page with branded dark hero + light content
 */

import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navigation from '../../layout/Navigation';
import Footer from '../../sections/Footer';
import './Legal.css';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function HeroBanner() {
  return (
    <div className="legal-hero">
      <Navigation />
      <div className="legal-hero__texture" />
      <div className="legal-hero__blob-1" />
      <div className="legal-hero__blob-2" />

      <div className="legal-hero__content">
        <div className="legal-badge">
          <FileText className="legal-badge__icon" />
          <span className="legal-badge__text">Légal</span>
        </div>
        <h1 className="legal-hero__title">
          Mentions{' '}
          <span className="legal-hero__title-gradient">Légales</span>
        </h1>
        <p className="legal-hero__description">
          Informations légales relatives à l'éditeur du site, à son hébergement
          et à la propriété intellectuelle des contenus.
        </p>
      </div>
    </div>
  );
}

function InfoCard({ rows }: { rows: { label: string; value: string; isPlaceholder?: boolean }[] }) {
  return (
    <div className="legal-info-card">
      {rows.map((row, i) => (
        <div key={i} className="legal-info-row">
          <span className="legal-info-label">{row.label}</span>
          <span className={row.isPlaceholder ? "legal-info-placeholder" : "legal-info-value"}>
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
  return (
    <div className="legal-page">
      <HeroBanner />
      <div className="legal-accent-line" />

      <div className="legal-main">
        <div className="legal-main__texture" />

        <div className="legal-container">
          <Link to="/" className="legal-back-link">
            <ArrowLeft className="legal-back-icon" />
            Retour à l'accueil
          </Link>

          {/* ── Article 1 : Éditeur du site ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">
              Article 1 - Éditeur du site
            </h2>

            <p className="legal-paragraph">
              Le présent site, accessible à l'URL{' '}
              <strong className="legal-strong">https://www.agence-sweet.com/</strong>, est édité par :
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
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">
              Article 2 - Hébergeur
            </h2>

            <p className="legal-paragraph">
              Le site est hébergé par la société :
            </p>

            <InfoCard rows={[
              { label: 'Hébergeur', value: 'Vercel Inc.', isPlaceholder: false },
              { label: 'Adresse', value: '440 N Barranca Avenue #4133, Covina, CA 91723, United States', isPlaceholder: false },
              { label: 'Contact', value: 'https://www.vercel.com/contact', isPlaceholder: false },
            ]} />
          </article>

          {/* ── Article 3 : Propriété intellectuelle ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">
              Article 3 - Propriété intellectuelle
            </h2>

            <p className="legal-paragraph">
              L'ensemble de ce site, notamment les textes, logos, tableaux, représentations
              iconographiques et photographiques, ainsi que les documents téléchargeables, relève
              de la législation française et internationale sur le droit d'auteur et la propriété
              intellectuelle.
            </p>
            <p className="legal-paragraph">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou
              partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
              interdite sans autorisation écrite préalable de l'éditeur.
            </p>
            <p className="legal-paragraph">
              Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il
              contient sera considérée comme constitutive d'une contrefaçon et poursuivie
              conformément aux dispositions des articles L.335-2 et suivants du Code de la
              Propriété Intellectuelle.
            </p>
          </article>

          {/* ── Article 4 : Responsabilité ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">
              Article 4 - Limitation de responsabilité
            </h2>

            <p className="legal-paragraph">
              L'éditeur du site ne pourra être tenu pour responsable des dommages directs ou
              indirects causés au matériel de l'utilisateur lors de l'accès au site, résultant
              soit de l'utilisation d'un matériel ne répondant pas aux spécifications techniques
              requises, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
            <p className="legal-paragraph">
              L'éditeur ne pourra également être tenu pour responsable des dommages indirects
              consécutifs à l'utilisation du site.
            </p>
          </article>

          <p className="legal-last-updated">
            Dernière mise à jour : février 2026
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MentionsLegales;
