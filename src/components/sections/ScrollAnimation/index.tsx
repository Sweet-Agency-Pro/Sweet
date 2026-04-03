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

  // Parallax transforms, reimagined for "pétillante" feel on mobile
  const textY = useTransform(scrollYProgress, [0, 1], ['350%', '-350%']);

  // Scale: More pop on mobile
  const textScaleValues = isMobile ? [0.4, 1.25, 1.35, 1.25, 0.4] : [0.6, 1.05, 1.1, 1.05, 0.6];
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    textScaleValues
  );

  const textRotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [30, 5, 0, -5, -30]
  );

  // Skew: Adds that "liquid/pétillante" wobble on mobile
  const textSkewY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isMobile ? [15, 4, 0, -4, -15] : [0, 0, 0, 0, 0]
  );

  // Blur: Focus effect for premium feel
  const textBlur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    isMobile
      ? ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(12px)']
      : ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
  );

  // Letter spacing: Expansion effect
  const textLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isMobile ? ['-0.05em', '0.02em', '0.08em', '0.02em', '-0.05em'] : ['-0.02em', '0em', '0.02em', '0em', '-0.02em']
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
              skewY: textSkewY,
              filter: textBlur,
              letterSpacing: textLetterSpacing,
            }}
          >
            SWEET
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ScrollAnimation;
