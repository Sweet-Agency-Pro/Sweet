/**
 * Politique de Confidentialité Page
 * Privacy policy page with branded dark hero + light content
 */

import { ArrowLeft, Shield } from 'lucide-react';
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
          <Shield style={styles.badgeIcon} />
          <span style={styles.badgeText}>Confidentialité</span>
        </div>
        <h1 style={styles.heroTitle}>
          Politique de{' '}
          <span style={styles.heroTitleGradient}>Confidentialité</span>
        </h1>
        <p style={styles.heroDescription}>
          Découvrez comment nous collectons, utilisons et protégeons vos données
          personnelles dans le respect du RGPD.
        </p>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={styles.list}>
      {items.map((item, i) => (
        <li key={i} style={styles.listItem}>
          <span style={styles.listBullet} />
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
  const { isMobile } = useWindowSize();

  const titleStyle = {
    ...styles.articleTitle,
    ...(isMobile ? styles.articleTitleMobile : undefined),
  };

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

          {/* ── Introduction ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Introduction</h2>
            <p style={styles.paragraph}>
              Dans le cadre de son activité, l'agence{' '}
              <strong style={styles.strong}>Sweet</strong> est amenée à
              traiter des informations vous concernant. Nous attachons une grande importance
              à la protection de vos données personnelles et au respect de votre vie privée,
              conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés.
            </p>
          </article>

          {/* ── Article 1 : Collecte des données ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 1 - Collecte des données</h2>
            <p style={styles.paragraph}>
              Nous collectons les données que vous nous communiquez volontairement,
              notamment via le formulaire de contact présent sur le site :
            </p>
            <BulletList items={[
              'Données d\'identité : nom, prénom.',
              'Données de contact : adresse email, numéro de téléphone.',
              'Données professionnelles : nom de l\'entreprise, type de projet.',
            ]} />
            <p style={styles.paragraph}>
              Aucune donnée n'est collectée à votre insu. Les champs obligatoires sont
              clairement identifiés dans les formulaires.
            </p>
          </article>

          {/* ── Article 2 : Finalité du traitement ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 2 - Finalité du traitement</h2>
            <p style={styles.paragraph}>
              Les données collectées nous permettent de :
            </p>
            <BulletList items={[
              'Répondre à vos demandes de devis ou de renseignements.',
              'Gérer la relation commerciale et assurer le suivi de nos prestations.',
            ]} />
          </article>

          {/* ── Article 3 : Durée de conservation ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 3 - Durée de conservation</h2>
            <p style={styles.paragraph}>
              Vos données sont conservées pendant la durée strictement nécessaire à la
              gestion de la relation commerciale :
            </p>
            <BulletList items={[
              'Prospects : maximum 3 ans après le dernier contact.',
              'Clients : durée de la relation contractuelle, puis archivage conformément aux obligations légales en vigueur.',
            ]} />
          </article>

          {/* ── Article 4 : Vos droits ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 4 - Vos droits</h2>
            <p style={styles.paragraph}>
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
            <p style={styles.paragraph}>
              Pour exercer l'un de ces droits, contactez-nous à :{' '}
              <strong style={styles.strong}>contact@agence-sweet.com</strong>.
              Nous nous engageons à répondre dans un délai d'un mois.
            </p>
          </article>

          {/* ── Article 5 : Cookies ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 5 - Cookies</h2>
            <p style={styles.paragraph}>
              Le site utilise des cookies pour améliorer l'expérience utilisateur et
              analyser le trafic. Lors de votre première visite, un bandeau de consentement
              vous permet d'accepter ou de refuser ces cookies.
            </p>
            <p style={styles.paragraph}>
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
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 6 - Hébergement des données</h2>

            <p style={styles.paragraph}>
              <strong style={styles.strong}>Hébergement du site</strong> - Les données
              collectées via le formulaire de contact sont stockées sur des serveurs
              sécurisés gérés par notre hébergeur (voir nos{' '}
              <Link to="/mentions-legales" style={{ color: '#0d9488', textDecoration: 'underline' }}>
                Mentions Légales
              </Link>{' '}
              pour les coordonnées de l'hébergeur).
            </p>

            <p style={styles.paragraph}>
              <strong style={styles.strong}>Hébergement des emails</strong> - Notre
              messagerie professionnelle est hébergée par{' '}
              <strong style={styles.strong}>Infomaniak Network SA</strong>, société suisse
              dont le siège social est situé Rue Eugène-Marziano 25, 1227 Les Acacias,
              Genève, Suisse.
            </p>
            <p style={styles.paragraph}>
              Infomaniak héberge l'ensemble de ses données exclusivement en Suisse, dans
              des data centers alimentés à 100 % par des énergies renouvelables. La Suisse
              bénéficie d'une décision d'adéquation de la Commission européenne (article 45
              du RGPD), garantissant un niveau de protection des données équivalent à celui
              de l'Union européenne.
            </p>
            <p style={styles.paragraph}>
              Les échanges par email peuvent contenir des données personnelles (nom, adresse
              email, contenu des messages). Ces données sont traitées conformément à la
              politique de confidentialité d'Infomaniak et aux présentes dispositions.
            </p>
          </article>

          {/* ── Article 7 : Sécurité ── */}
          <article style={styles.article}>
            <div style={styles.articleTitleDecoration} />
            <h2 style={titleStyle}>Article 7 - Sécurité des données</h2>
            <p style={styles.paragraph}>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles
              appropriées pour garantir un niveau de sécurité adapté au risque :
              chiffrement des communications (HTTPS/TLS), accès restreints, mises à jour
              régulières et audits de sécurité.
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

export default PolitiqueConfidentialite;
