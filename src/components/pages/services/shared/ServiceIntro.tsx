/**
 * ServiceIntro — Shared intro section for service detail pages
 * White background with a centered title + paragraph
 */

import { motion } from 'framer-motion';
import './ServicePage.css';

interface ServiceIntroProps {
  title: string;
  text: string;
}

function ServiceIntro({ title, text }: ServiceIntroProps) {
  return (
    <section className="service-intro">
      <div className="service-intro__container">
        <motion.div
          className="service-intro__decoration"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />

        <motion.h2
          className="service-intro__title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="service-intro__text"
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
