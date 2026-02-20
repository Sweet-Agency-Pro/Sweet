/**
 * ServiceCtaBand — Shared dark CTA band (typically above Footer)
 */

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSectionNavigation } from '../../../../hooks/useSectionNavigation';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { sharedStyles as s } from './ServicePage.styles';

interface ServiceCtaBandProps {
  title?: string;
  text?: string;
  ctaLabel?: string;
  ctaTarget?: string;
}

function ServiceCtaBand({
  title = 'Prêt à démarrer votre projet?',
  text = 'Discutons ensemble de vos objectifs et construisons la solution idéale.',
  ctaLabel = 'Nous contacter',
  ctaTarget = 'contact',
}: ServiceCtaBandProps) {
  const { isMobile } = useWindowSize();
  const { navigateToSection } = useSectionNavigation();

  return (
    <section style={{
      ...s.ctaBottom,
      ...(isMobile && s.ctaBottomMobile),
    }}>
      <div style={s.ctaBottomTexture} />

      <motion.div
        style={s.ctaBottomContainer}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={s.ctaBottomTitle}>{title}</h2>
        <p style={s.ctaBottomText}>{text}</p>

        <motion.button
          style={s.ctaBottomButton}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigateToSection(ctaTarget)}
        >
          <div style={s.ctaBottomButtonBg} />
          <span style={s.ctaBottomButtonContent}>
            {ctaLabel}
            <ArrowRight style={{ width: '1.25rem', height: '1.25rem' }} />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}

export default ServiceCtaBand;
