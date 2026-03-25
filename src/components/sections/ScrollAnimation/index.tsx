/**
 * ScrollAnimation Component
 * Parallax "SWEET" text reveal animation section
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './ScrollAnimation.css';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Decorative Corner Elements */
function DecorativeCorners() {
  return (
    <div className="scroll-animation__decorative">
      <div className="scroll-animation__corner scroll-animation__corner-tl" />
      <div className="scroll-animation__corner scroll-animation__corner-tr" />
      <div className="scroll-animation__corner scroll-animation__corner-bl" />
      <div className="scroll-animation__corner scroll-animation__corner-br" />
    </div>
  );
}

/** Background Blob */
function BackgroundBlob() {
  return (
    <div className="scroll-animation__bg-container">
      <div className="scroll-animation__bg-blob" />
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindowSize();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms — fast, no fade
  const textY = useTransform(scrollYProgress, [0, 1], ['300%', '-300%']);
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.6, 1.05, 1.1, 1.05, 0.6]
  );
  const textRotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [30, 5, 0, -5, -30]
  );

  return (
    <section ref={sectionRef} className="scroll-animation">
      {/* Background */}
      <BackgroundBlob />

      {/* Decorative corners - hidden on mobile */}
      {!isMobile && <DecorativeCorners />}

      {/* Main reveal container */}
      <div className="scroll-animation__reveal-container">
        {/* The masking window */}
        <div className="scroll-animation__reveal-window">
          {/* Animated text */}
          <motion.div
            className="scroll-animation__reveal-text"
            style={{
              y: textY,
              scale: textScale,
              rotateX: textRotateX,
            }}
          >
            SWEET
          </motion.div>
        </div>

        {/* Subtitle */}
        <div className="scroll-animation__subtitle-container">
          <p className="scroll-animation__subtitle">
            Agence Web Créative
          </p>
        </div>
      </div>
    </section>
  );
}

export default ScrollAnimation;
