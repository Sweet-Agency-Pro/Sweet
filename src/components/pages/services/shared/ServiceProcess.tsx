/**
 * ServiceProcess, Shared 3-step process timeline for service pages
 * Brief → Maquettes → Développement
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

interface ServiceProcessProps {
  title?: string;
  steps: ProcessStep[];
  colorScheme?: 'teal' | 'purple' | 'blue';
}



function ServiceProcess({ title = 'Notre Processus', steps, colorScheme = 'teal' }: ServiceProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Line progress matching the entire container passing through the center of viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  return (
    <section className={`service-process service-process--${colorScheme}`}>
      <div className="service-process__container">
        <motion.div
          className="service-process__header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="service-process__title">{title}</h2>
          <p className="service-process__subtitle">
            Un chemin clair, de votre idée à votre site en ligne.
          </p>
        </motion.div>

        <div ref={containerRef} className="service-process__steps-wrapper">
          <div className="service-process__line-bg" />
          <motion.div
            className="service-process__line-progress"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="service-process__steps">
            {steps.map((step, idx) => (
              <StepItem key={idx} step={step} isFirst={idx === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({ step, isFirst }: { step: ProcessStep, isFirst: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null);

  // Each step tracks its own scroll position to become active
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ['start 75%', 'start 40%'], // Fade in as the step scrolls from 75% height to 40% height of the viewport
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);
  const scrollFilter = useTransform(scrollYProgress, [0, 1], ['grayscale(100%)', 'grayscale(0%)']);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const opacity = isFirst ? 1 : scrollOpacity;
  const filter = isFirst ? 'grayscale(0%)' : scrollFilter;
  const scale = isFirst ? 1 : scrollScale;

  return (
    <motion.div
      ref={stepRef}
      className="service-process__step"
      style={{ opacity, filter, scale }}
    >
      <div className="service-process__step-left">
        <div className="service-process__number">{step.number}</div>
      </div>

      <div className="service-process__step-content">
        <h3 className="service-process__step-title">{step.title}</h3>
        <p className="service-process__step-desc">{step.description}</p>
        <p className="service-process__step-detail">{step.detail}</p>
      </div>
    </motion.div>
  );
}

export type { ProcessStep };
export default ServiceProcess;
