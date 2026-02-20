/**
 * ServiceHero — Shared hero banner for service detail pages
 * Dark background with blobs, badge, title, subtitle and CTA
 */

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, type LucideIcon } from 'lucide-react';

import { useSectionNavigation } from '../../../../hooks/useSectionNavigation';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Navigation from '../../../layout/Navigation';
import { sharedStyles as s } from './ServicePage.styles';

interface ServiceHeroProps {
  badgeIcon: LucideIcon;
  badgeLabel: string;
  /** Main title — can contain JSX for gradient spans */
  title: ReactNode;
  subtitle: string;
  ctaLabel: string;
  /** Where the CTA scrolls to — defaults to 'contact' */
  ctaTarget?: string;
}

function ServiceHero({
  badgeIcon: BadgeIcon,
  badgeLabel,
  title,
  subtitle,
  ctaLabel,
  ctaTarget = 'contact',
}: ServiceHeroProps) {
  const { isMobile } = useWindowSize();
  const { navigateToSection } = useSectionNavigation();

  return (
    <div style={{
      ...s.hero,
      ...(isMobile && s.heroMobile),
    }}>
      <Navigation />
      <div style={s.heroTexture} />
      <div style={s.heroBlob1} />
      <div style={s.heroBlob2} />

      <div style={{
        ...s.heroContent,
        ...(isMobile && s.heroContentMobile),
      }}>
        <motion.div
          style={s.heroBadge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <BadgeIcon style={s.heroBadgeIcon} />
          <span style={s.heroBadgeText}>{badgeLabel}</span>
        </motion.div>

        <motion.h1
          style={{
            ...s.heroTitle,
            ...(isMobile && s.heroTitleMobile),
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        <motion.p
          style={{
            ...s.heroSubtitle,
            ...(isMobile && s.heroSubtitleMobile),
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>

        <motion.button
          style={{
            ...s.heroCta,
            ...(isMobile && s.heroCtaMobile),
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigateToSection(ctaTarget)}
        >
          <div style={s.heroCtaBg} />
          <span style={s.heroCtaContent}>
            {ctaLabel}
            <ArrowRight style={s.heroCtaIcon} />
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default ServiceHero;
