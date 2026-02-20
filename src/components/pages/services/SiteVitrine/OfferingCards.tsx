/**
 * OfferingCards — Site Vitrine specific section
 * Two side-by-side cards: One-Page vs Multi-Pages
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Layers } from 'lucide-react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { vitrinStyles as v } from '../SiteVitrine/SiteVitrine.styles';

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
  const { isMobile } = useWindowSize();
  const [hovered, setHovered] = useState(false);
  const isOnePage = item.variant === 'onepage';

  const Icon = item.icon;

  return (
    <motion.div
      style={{
        ...v.card,
        ...(isMobile && v.cardMobile),
        ...(hovered && !isMobile ? v.cardHovered : undefined),
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top accent line */}
      <div style={{
        ...v.cardAccent,
        ...(isOnePage ? v.cardAccentOnePage : v.cardAccentMultiPage),
      }} />

      {/* Icon */}
      <div style={{
        ...v.cardIconWrap,
        ...(isOnePage ? v.cardIconWrapOnePage : v.cardIconWrapMultiPage),
      }}>
        <Icon style={{
          ...v.cardIcon,
          ...(isOnePage ? v.cardIconOnePage : v.cardIconMultiPage),
        }} />
      </div>

      {/* Label */}
      <p style={{
        ...v.cardLabel,
        ...(isOnePage ? v.cardLabelOnePage : v.cardLabelMultiPage),
      }}>
        {item.label}
      </p>

      {/* Title & description */}
      <h3 style={v.cardTitle}>{item.title}</h3>
      <p style={v.cardDescription}>{item.description}</p>

      {/* Divider */}
      <div style={v.divider} />

      {/* Key points */}
      <ul style={v.pointsList}>
        {item.points.map((pt) => (
          <li key={pt} style={v.pointItem}>
            <span style={{
              ...v.pointDot,
              ...(isOnePage ? v.pointDotOnePage : v.pointDotMultiPage),
            }} />
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
  const { isMobile, isTablet } = useWindowSize();

  return (
    <section style={{
      ...v.section,
      ...(isMobile && v.sectionMobile),
    }}>
      <div style={v.texture} />

      <div style={{
        ...v.container,
        ...(isMobile && v.containerMobile),
      }}>
        <motion.div
          style={{
            ...v.header,
            ...(isMobile && v.headerMobile),
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            ...v.headerTitle,
            ...(isMobile && v.headerTitleMobile),
          }}>
            Deux approches, un même objectif
          </h2>
          <p style={v.headerSubtitle}>
            Choisissez la structure qui correspond le mieux à vos ambitions.
          </p>
        </motion.div>

        <div style={{
          ...v.grid,
          ...(isTablet && v.gridTablet),
          ...(isMobile && v.gridMobile),
        }}>
          {offerings.map((item, i) => (
            <OfferingCard key={item.variant} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferingCards;
