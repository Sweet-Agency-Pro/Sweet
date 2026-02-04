import { useRef, CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import theme from '../styles/theme';

// =============================================================================
// COMPONENT
// =============================================================================
function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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
    <section ref={sectionRef} style={styles.section}>
      {/* Background */}
      <div style={styles.backgroundContainer}>
        <div style={styles.backgroundBlob}></div>
      </div>

      {/* Decorative corners */}
      <div style={styles.decorativeElements}>
        <div style={styles.cornerTL}></div>
        <div style={styles.cornerTR}></div>
        <div style={styles.cornerBL}></div>
        <div style={styles.cornerBR}></div>
      </div>

      {/* Main reveal container */}
      <div style={styles.revealContainer}>
        {/* The masking window */}
        <div style={styles.revealWindow}>
          {/* Animated text - only visible within the window */}
          <motion.div
            style={{
              ...styles.revealText,
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
          <p style={styles.subtitle}>Agence Web Créative</p>
        </motion.div>
      </div>
    </section>
  );
}

const { colors, spacing, typography, gradients, hexToRgba } = theme;

// =============================================================================
// STYLES
// =============================================================================
const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    height: '90vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  backgroundBlob: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50rem',
    height: '50rem',
    backgroundColor: hexToRgba(colors.teal[500], 0.08),
    borderRadius: '50%',
    filter: 'blur(10rem)',
  },
  revealContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revealWindow: {
    position: 'relative',
    height: '20rem',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '102rem',
  },
  revealWindowLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  revealText: {
    fontSize: '30rem',
    fontWeight: typography.fontWeight.black,
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    backgroundImage: gradients.primary,
    lineHeight: typography.lineHeight.none,
    letterSpacing: typography.letterSpacing.tighter,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    willChange: 'transform',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  cornerTL: {
    position: 'absolute',
    top: spacing[8],
    left: spacing[8],
    width: spacing[16],
    height: spacing[16],
    borderTop: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
    borderLeft: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
  },
  cornerTR: {
    position: 'absolute',
    top: spacing[8],
    right: spacing[8],
    width: spacing[16],
    height: spacing[16],
    borderTop: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
    borderRight: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
  },
  cornerBL: {
    position: 'absolute',
    bottom: spacing[8],
    left: spacing[8],
    width: spacing[16],
    height: spacing[16],
    borderBottom: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
    borderLeft: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
  },
  cornerBR: {
    position: 'absolute',
    bottom: spacing[8],
    right: spacing[8],
    width: spacing[16],
    height: spacing[16],
    borderBottom: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
    borderRight: `0.0625rem solid ${hexToRgba(colors.teal[500], 0.3)}`,
  },
  subtitleContainer: {
    marginTop: spacing[6],
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.slate[500],
    fontWeight: typography.fontWeight.light,
    letterSpacing: typography.letterSpacing.wide,
  },
};

export default ScrollAnimation;
