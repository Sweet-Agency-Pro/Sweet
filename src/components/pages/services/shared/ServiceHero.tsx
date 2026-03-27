/**
 * ServiceHero, Shared hero banner for service detail pages
 * Dark background with blobs, badge, title, subtitle and CTA
 */

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

import { useSectionNavigation } from '../../../../hooks/useSectionNavigation';
import Navigation from '../../../layout/Navigation';
import './ServicePage.css';

interface ServiceHeroProps {
  badgeIcon: LucideIcon;
  badgeLabel: string;
  /** Main title, can contain JSX for gradient spans */
  title: ReactNode;
  subtitle: string;
  ctaLabel: string;
  /** Where the CTA scrolls to, defaults to 'contact' */
  ctaTarget?: string;
  colorScheme?: 'teal' | 'purple' | 'blue';
}

function ServiceHero({
  badgeIcon: BadgeIcon,
  badgeLabel,
  title,
  subtitle,
  ctaLabel,
  ctaTarget = 'contact',
  colorScheme = 'teal',
}: ServiceHeroProps) {
  const { navigateToSection } = useSectionNavigation();

  return (
    <div className={`service-hero service-hero--${colorScheme}`}>
      <Navigation colorScheme={colorScheme} />
      <div className="service-hero__texture" />
      <div className="service-hero__blob-1" />
      <div className="service-hero__blob-2" />

      <div className="service-hero__content">
        <motion.div
          className="service-hero__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BadgeIcon className="service-hero__badge-icon" />
          <span className="service-hero__badge-text">{badgeLabel}</span>
        </motion.div>

        <motion.h1
          className="service-hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="service-hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>

        <motion.button
          className="service-hero__cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => navigateToSection(ctaTarget)}
        >
          <div className="service-hero__cta-bg" />
          <div className="service-hero__cta-hover" />
          <span className="service-hero__cta-content">
            {ctaLabel}
            <ArrowRight className="service-hero__cta-icon" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default ServiceHero;
