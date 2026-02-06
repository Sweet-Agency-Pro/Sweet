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

  // Parallax transforms
  const textY = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 1, 0]
  );
  const textScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.9, 1, 1, 1, 0.9]
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
              opacity: textOpacity,
              scale: textScale,
            }}
          >
            SWEET
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          style={{
            ...styles.subtitleContainer,
            opacity: textOpacity,
          }}
        >
          <p style={{
            ...styles.subtitle,
            ...(isMobile && styles.subtitleMobile),
          }}>
            Agence Web Créative
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollAnimation;
