/**
 * ServiceFaq, Shared animated accordion FAQ for service pages
 * Uses framer-motion AnimatePresence for smooth open/close
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqProps {
  title?: string;
  items: FaqItem[];
  colorScheme?: 'teal' | 'purple' | 'blue';
}

function FaqAccordion({ item, colorScheme, delay }: { item: FaqItem; colorScheme: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className={`service-faq__item service-faq__item--${colorScheme} ${open ? 'service-faq__item--open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
    >
      <button
        className="service-faq__question"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="service-faq__question-text">{item.question}</span>
        <span className="service-faq__icon">
          {open ? <Minus size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="service-faq__answer-wrapper"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <p className="service-faq__answer">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ServiceFaq({ title = 'Questions Fréquentes', items, colorScheme = 'teal' }: ServiceFaqProps) {
  return (
    <section className={`service-faq service-faq--${colorScheme}`}>
      <div className="service-faq__container">
        <motion.div
          className="service-faq__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="service-faq__title">{title}</h2>
          <p className="service-faq__subtitle">
            Les réponses aux questions que nos clients nous posent le plus souvent.
          </p>
        </motion.div>

        <div className="service-faq__list">
          {items.map((item, idx) => (
            <FaqAccordion
              key={idx}
              item={item}
              colorScheme={colorScheme}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFaq;
