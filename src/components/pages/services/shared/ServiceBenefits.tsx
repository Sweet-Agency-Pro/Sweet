/**
 * ServiceBenefits, Shared ROI-framed benefits section for service pages
 * 3 cards showcasing client outcomes, not just features
 */

import { motion, type Variants } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

export interface Benefit {
  icon: LucideIcon;
  headline: string;
  body: string;
}

export type ColorScheme = 'teal' | 'purple' | 'blue';

interface ServiceBenefitsProps {
  title: string;
  subtitle?: string;
  items: Benefit[];
  colorScheme?: ColorScheme;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

function ServiceBenefits({
  title,
  subtitle,
  items,
  colorScheme = 'teal',
}: ServiceBenefitsProps) {
  return (
    <section className={`service-benefits service-benefits--${colorScheme}`}>
      <div className="service-benefits__container">
        <motion.div
          className="service-benefits__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="service-benefits__title">{title}</h2>
          {subtitle && <p className="service-benefits__subtitle">{subtitle}</p>}
        </motion.div>

        <motion.div
          className="service-benefits__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="service-benefits__card"
              >
                <div className="service-benefits__icon-wrap">
                  <Icon className="service-benefits__icon" strokeWidth={1.5} />
                </div>
                <h3 className="service-benefits__card-headline">{item.headline}</h3>
                <p className="service-benefits__card-body">{item.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default ServiceBenefits;
