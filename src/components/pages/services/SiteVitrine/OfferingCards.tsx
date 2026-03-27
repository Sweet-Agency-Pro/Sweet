/**
 * OfferingCards, Site Vitrine specific section
 * Two side-by-side cards: One-Page vs Multi-Pages
 */

import { motion } from 'framer-motion';
import { FileText, Layers } from 'lucide-react';
import './SiteVitrine.css';

// =============================================================================
// DATA
// =============================================================================
interface OfferingItem {
  variant: 'onepage' | 'multipage';
  icon: typeof FileText;
  label: string;
  title: string;
  description: string;
  points: string[];
}

const offerings: OfferingItem[] = [
  {
    variant: 'onepage',
    icon: FileText,
    label: 'Option One-Page',
    title: "L\u2019Impact Imm\u00e9diat",
    description:
      'Id\u00e9ale pour concentrer votre message. Tout votre contenu essentiel accessible en un seul d\u00e9filement fluide.',
    points: ['Storytelling lin\u00e9aire', 'Navigation rapide', 'Message percutant'],
  },
  {
    variant: 'multipage',
    icon: Layers,
    label: 'Option Multi-Pages',
    title: 'La Structure Compl\u00e8te',
    description:
      'Id\u00e9ale pour structurer votre activit\u00e9 en rubriques distinctes et favoriser un r\u00e9f\u00e9rencement profond sur plusieurs th\u00e9matiques.',
    points: ['Arborescence claire', 'Contenu d\u00e9taill\u00e9', 'SEO puissant'],
  },
];

// =============================================================================
// SUB-COMPONENT: Single Offering Card
// =============================================================================
function OfferingCard({ item, index }: { item: OfferingItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      className="vitrine-offering__card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
    >
      {/* Top accent line */}
      <div className={`vitrine-offering__card-accent vitrine-offering__card-accent--${item.variant}`} />

      {/* Icon */}
      <div className={`vitrine-offering__card-icon-wrap vitrine-offering__card-icon-wrap--${item.variant}`}>
        <Icon className={`vitrine-offering__card-icon vitrine-offering__card-icon--${item.variant}`} />
      </div>

      {/* Label */}
      <p className={`vitrine-offering__card-label vitrine-offering__card-label--${item.variant}`}>
        {item.label}
      </p>

      {/* Title & description */}
      <h3 className="vitrine-offering__card-title">{item.title}</h3>
      <p className="vitrine-offering__card-desc">{item.description}</p>

      {/* Divider */}
      <div className="vitrine-offering__divider" />

      {/* Key points */}
      <ul className="vitrine-offering__points-list">
        {item.points.map((pt) => (
          <li key={pt} className="vitrine-offering__point-item">
            <span className={`vitrine-offering__point-dot vitrine-offering__point-dot--${item.variant}`} />
            {pt}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function OfferingCards() {
  return (
    <section className="vitrine-offering">
      <div className="vitrine-offering__texture" />

      <div className="vitrine-offering__container">
        <motion.div
          className="vitrine-offering__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="vitrine-offering__title">
            Deux approches, un même objectif
          </h2>
          <p className="vitrine-offering__subtitle">
            Choisissez la structure qui correspond le mieux à vos ambitions.
          </p>
        </motion.div>

        <div className="vitrine-offering__grid">
          {offerings.map((item, i) => (
            <OfferingCard key={item.variant} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferingCards;
