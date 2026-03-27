/**
 * ServiceCtaBand, Shared dark CTA band (typically above Footer)
 */

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSectionNavigation } from '../../../../hooks/useSectionNavigation';
import './ServicePage.css';

interface ServiceCtaBandProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  colorScheme?: 'teal' | 'purple' | 'blue';
}

function ServiceCtaBand({
  title = 'Prêt à démarrer votre projet?',
  text = 'Discutons ensemble de vos objectifs et construisons la solution idéale.',
  ctaLabel = 'Nous contacter',
  ctaTarget = 'contact',
  colorScheme = 'teal',
}: ServiceCtaBandProps) {
  const { navigateToSection } = useSectionNavigation();

  return (
    <section className={`service-cta-bottom service-cta-bottom--${colorScheme}`}>
      <div className="service-cta-bottom__texture" />

      <motion.div
        className="service-cta-bottom__container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="service-cta-bottom__title">{title}</h2>
        <p className="service-cta-bottom__text">{text}</p>

        <motion.button
          className="service-cta-bottom__btn"
          onClick={() => navigateToSection(ctaTarget)}
        >
          <div className="service-cta-bottom__btn-bg" />
          <div className="service-cta-bottom__btn-hover" />
          <span className="service-cta-bottom__btn-content">
            {ctaLabel}
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default ServiceCtaBand;
