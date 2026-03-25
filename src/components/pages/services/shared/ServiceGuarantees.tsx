/**
 * ServiceGuarantees — Shared guarantees / features band
 * Light gray background with 3 (or more) cards
 */

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import './ServicePage.css';

export interface Guarantee {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface ServiceGuaranteesProps {
  title?: string;
  subtitle?: string;
  items: Guarantee[];
}

function ServiceGuarantees({
  title = 'Nos Garanties',
  subtitle = 'Une qualité technique irréprochable, quel que soit votre choix.',
  items,
}: ServiceGuaranteesProps) {
  return (
    <section className="service-guarantees">
      <div className="service-guarantees__texture" />

      <div className="service-guarantees__container">
        <motion.div
          className="service-guarantees__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="service-guarantees__title">{title}</h2>
          <p className="service-guarantees__subtitle">{subtitle}</p>
        </motion.div>

        <div className="service-guarantees__grid">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="service-guarantees__card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div className="service-guarantees__icon-wrap">
                  <Icon className="service-guarantees__icon" />
                </div>
                <h3 className="service-guarantees__card-title">{item.title}</h3>
                <p className="service-guarantees__card-text">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceGuarantees;
