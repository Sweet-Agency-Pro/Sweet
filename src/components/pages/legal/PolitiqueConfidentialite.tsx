/**
 * Politique de Confidentialité Page
 * Privacy policy page with branded dark hero + light content
 */

import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
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
          <Shield className="legal-badge__icon" />
          <span className="legal-badge__text">Confidentialité</span>
        </div>
        <h1 className="legal-hero__title">
          Politique de{' '}
          <span className="legal-hero__title-gradient">Confidentialité</span>
        </h1>
        <p className="legal-hero__description">
          Découvrez comment nous collectons, utilisons et protégeons vos données
          personnelles dans le respect du RGPD.
        </p>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="legal-list">
      {items.map((item, i) => (
        <li key={i} className="legal-list__item">
          <span className="legal-list__bullet" />
          {item}
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function PolitiqueConfidentialite() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

          {/* ── Introduction ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Introduction</h2>
            <p className="legal-paragraph">
              Dans le cadre de son activité, l'agence{' '}
              <strong className="legal-strong">Sweet</strong> est amenée à
              traiter des informations vous concernant. Nous attachons une grande importance
              à la protection de vos données personnelles et au respect de votre vie privée,
              conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés.
            </p>
          </article>

          {/* ── Article 1 : Collecte des données ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 1 - Collecte des données</h2>
            <p className="legal-paragraph">
              Nous collectons les données que vous nous communiquez volontairement,
              notamment via le formulaire de contact présent sur le site :
            </p>
            <BulletList items={[
              'Données d\'identité : nom, prénom.',
              'Données de contact : adresse email, numéro de téléphone.',
              'Données professionnelles : nom de l\'entreprise, type de projet.',
            ]} />
            <p className="legal-paragraph">
              Aucune donnée n'est collectée à votre insu. Les champs obligatoires sont
              clairement identifiés dans les formulaires.
            </p>
          </article>

          {/* ── Article 2 : Finalité du traitement ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 2 - Finalité du traitement</h2>
            <p className="legal-paragraph">
              Les données collectées nous permettent de :
            </p>
            <BulletList items={[
              'Répondre à vos demandes de devis ou de renseignements.',
              'Gérer la relation commerciale et assurer le suivi de nos prestations.',
            ]} />
          </article>

          {/* ── Article 3 : Durée de conservation ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 3 - Durée de conservation</h2>
            <p className="legal-paragraph">
              Vos données sont conservées pendant la durée strictement nécessaire à la
              gestion de la relation commerciale :
            </p>
            <BulletList items={[
              'Prospects : maximum 3 ans après le dernier contact.',
              'Clients : durée de la relation contractuelle, puis archivage conformément aux obligations légales en vigueur.',
            ]} />
          </article>

          {/* ── Article 4 : Vos droits ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 4 - Vos droits</h2>
            <p className="legal-paragraph">
              Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants
              sur vos données personnelles :
            </p>
            <BulletList items={[
              'Droit d\'accès : obtenir la confirmation que vos données sont traitées et en recevoir une copie.',
              'Droit de rectification : corriger des données inexactes ou incomplètes.',
              'Droit de suppression : demander l\'effacement de vos données.',
              'Droit d\'opposition : vous opposer au traitement de vos données pour motif légitime.',
              'Droit de limitation : demander la suspension du traitement dans certains cas.',
              'Droit à la portabilité : recevoir vos données dans un format structuré et lisible.',
            ]} />
            <p className="legal-paragraph">
              Pour exercer l'un de ces droits, contactez-nous à :{' '}
              <strong className="legal-strong">contact@agence-sweet.com</strong>.
              Nous nous engageons à répondre dans un délai d'un mois.
            </p>
          </article>

          {/* ── Article 5 : Cookies ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 5 - Cookies</h2>
            <p className="legal-paragraph">
              Le site utilise des cookies pour améliorer l'expérience utilisateur et
              analyser le trafic. Lors de votre première visite, un bandeau de consentement
              vous permet d'accepter ou de refuser ces cookies. Votre choix est mémorisé pour <strong>6 mois</strong>.
            </p>
            <p className="legal-paragraph">
              Vous pouvez à tout moment configurer votre navigateur pour refuser tout ou
              partie des cookies. Toutefois, le refus de certains cookies peut limiter
              l'accès à certaines fonctionnalités du site.
            </p>
            <BulletList items={[
              'Cookies strictement nécessaires : fonctionnement du site (non désactivables).',
              'Cookies analytiques : mesure d\'audience via Vercel Analytics (anonymisés).',
            ]} />
          </article>

          {/* ── Article 6 : Hébergement des données ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 6 - Hébergement des données</h2>

            <p className="legal-paragraph">
              <strong className="legal-strong">Hébergement du site</strong> - Les données
              collectées via le formulaire de contact sont stockées sur des serveurs
              sécurisés gérés par notre hébergeur (voir nos{' '}
              <Link to="/mentions-legales" style={{ color: '#0d9488', textDecoration: 'underline' }}>
                Mentions Légales
              </Link>{' '}
              pour les coordonnées de l'hébergeur).
            </p>

            <p className="legal-paragraph">
              <strong className="legal-strong">Hébergement des emails</strong> - Notre
              messagerie professionnelle est hébergée par{' '}
              <strong className="legal-strong">Infomaniak Network SA</strong>, société suisse
              dont le siège social est situé Rue Eugène-Marziano 25, 1227 Les Acacias,
              Genève, Suisse.
            </p>
            <p className="legal-paragraph">
              Infomaniak héberge l'ensemble de ses données exclusivement en Suisse, dans
              des data centers alimentés à 100 % par des énergies renouvelables. La Suisse
              bénéficie d'une décision d'adéquation de la Commission européenne (article 45
              du RGPD), garantissant un niveau de protection des données équivalent à celui
              de l'Union européenne.
            </p>
            <p className="legal-paragraph">
              Les échanges par email peuvent contenir des données personnelles (nom, adresse
              email, contenu des messages). Ces données sont traitées conformément à la
              politique de confidentialité d'Infomaniak et aux présentes dispositions.
            </p>
          </article>

          {/* ── Article 7 : Sécurité ── */}
          <article className="legal-article">
            <div className="legal-article__decoration" />
            <h2 className="legal-article__title">Article 7 - Sécurité des données</h2>
            <p className="legal-paragraph">
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles
              appropriées pour garantir un niveau de sécurité adapté au risque :
              chiffrement des communications (HTTPS/TLS), accès restreints, mises à jour
              régulières et audits de sécurité.
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

export default PolitiqueConfidentialite;
