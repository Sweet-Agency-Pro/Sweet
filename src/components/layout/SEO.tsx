import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  canonical?: string;
  type?: string;
}

const SEO = ({
  title,
  description = "Boostez votre présence en ligne avec l'Agence Sweet. Experts en création de sites web sur mesure, design UX/UI et solutions e-commerce haute performance. Devis gratuit.",
  image = "/preview.png",
  canonical,
  type = "website"
}: SEOProps) => {
  const { pathname } = useLocation();
  const siteUrl = "https://agence-sweet.com";
  const defaultTitle = "Agence Web Créative : Développement & Design sur Mesure | Sweet";
  const fullTitle = title ? `${title} | Sweet` : defaultTitle;
  const url = canonical || `${siteUrl}${pathname}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
};

export default SEO;
