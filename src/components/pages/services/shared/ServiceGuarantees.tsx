/**
 * ServiceGuarantees — Shared guarantees / features band
 * Light gray background with 3 (or more) cards
 */

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { sharedStyles as s } from './ServicePage.styles';

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
  const { isMobile, isTablet } = useWindowSize();

  return (
    <section style={{
      ...s.guarantees,
      ...(isMobile && s.guaranteesMobile),
    }}>
      <div style={s.guaranteesTexture} />

      <div style={{
        ...s.guaranteesContainer,
        ...(isMobile && s.guaranteesContainerMobile),
      }}>
        <motion.div
          style={{
            ...s.guaranteesHeader,
            ...(isMobile && s.guaranteesHeaderMobile),
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            ...s.guaranteesTitle,
            ...(isMobile && s.guaranteesTitleMobile),
          }}>
            {title}
          </h2>
          <p style={s.guaranteesSubtitle}>{subtitle}</p>
        </motion.div>

        <div style={{
          ...s.guaranteesGrid,
          ...(isTablet && s.guaranteesGridTablet),
          ...(isMobile && s.guaranteesGridMobile),
        }}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                style={{
                  ...s.guaranteeCard,
                  ...(isMobile && s.guaranteeCardMobile),
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                <div style={s.guaranteeIconWrap}>
                  <Icon style={s.guaranteeIcon} />
                </div>
                <h3 style={s.guaranteeTitle}>{item.title}</h3>
                <p style={s.guaranteeText}>{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceGuarantees;
