/**
 * ServiceIntro — Shared intro section for service detail pages
 * White background with a centered title + paragraph
 */

import { motion } from 'framer-motion';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { sharedStyles as s } from './ServicePage.styles';

interface ServiceIntroProps {
  title: string;
  text: string;
}

function ServiceIntro({ title, text }: ServiceIntroProps) {
  const { isMobile } = useWindowSize();

  return (
    <section style={{
      ...s.intro,
      ...(isMobile && s.introMobile),
    }}>
      <div style={{
        ...s.introContainer,
        ...(isMobile && s.introContainerMobile),
      }}>
        <motion.div
          style={s.introDecoration}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <motion.h2
          style={{
            ...s.introTitle,
            ...(isMobile && s.introTitleMobile),
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <motion.p
          style={{
            ...s.introText,
            ...(isMobile && s.introTextMobile),
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {text}
        </motion.p>
      </div>
    </section>
  );
}

export default ServiceIntro;
