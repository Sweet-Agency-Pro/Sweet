/**
 * ScrollAnimation Component
 * Parallax "SWEET" text reveal animation section
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { styles } from './ScrollAnimation.styles';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/** Decorative Corner Elements */
function DecorativeCorners() {
  return (
    <div style={styles.decorativeElements}>
      <div style={styles.cornerTL} />
      <div style={styles.cornerTR} />
      <div style={styles.cornerBL} />
      <div style={styles.cornerBR} />
    </div>
  );
}

/** Background Blob */
function BackgroundBlob({ isMobileOrTablet }: { isMobileOrTablet: boolean }) {
  return (
    <div style={styles.backgroundContainer}>
      <div style={{
        ...styles.backgroundBlob,
        ...(isMobileOrTablet && styles.backgroundBlobMobile),
      }} />
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useWindowSize();
  const isMobileOrTablet = isMobile || isTablet;

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
    <section ref={sectionRef} style={{
      ...styles.section,
      ...(isMobileOrTablet && styles.sectionMobile),
    }}>
      {/* Background */}
      <BackgroundBlob isMobileOrTablet={isMobileOrTablet} />

      {/* Decorative corners - hidden on mobile */}
      {!isMobile && <DecorativeCorners />}

      {/* Main reveal container */}
      <div style={styles.revealContainer}>
        {/* The masking window */}
        <div style={{
          ...styles.revealWindow,
          ...(isMobileOrTablet && styles.revealWindowMobile),
        }}>
          {/* Animated text */}
          <motion.div
            style={{
              ...styles.revealText,
              ...(isMobile && styles.revealTextMobile),
              ...(isTablet && styles.revealTextTablet),
              y: textY,
              scale: textScale,
              rotateX: textRotateX,
            }}
          >
            SWEET
          </motion.div>
        </div>

        {/* Subtitle */}
        <div
          style={styles.subtitleContainer}
        >
          <p style={{
            ...styles.subtitle,
            ...(isMobile && styles.subtitleMobile),
          }}>
            Agence Web Créative
          </p>
        </div>
      </div>
    </section>
  );
}

export default ScrollAnimation;
