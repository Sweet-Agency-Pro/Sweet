import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description = "Agence Sweet — Nous concevons des sites web sur mesure (vitrine, e-commerce) qui convertissent vos visiteurs en clients. Design unique, SEO optimisé, code performant.",
  image = "/preview.png",
  canonical,
  type = "website",
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const { pathname } = useLocation();
  const siteUrl = "https://agence-sweet.com";
  const defaultTitle = "Agence Web Créative : Développement & Design sur Mesure | Sweet";
  const fullTitle = title ? `${title} | Sweet` : defaultTitle;
  const url = canonical || `${siteUrl}${pathname}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Agence Sweet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
