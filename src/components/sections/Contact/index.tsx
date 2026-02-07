import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import theme from '../../../styles/theme';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { containerStyles, headerStyles, gridStyles } from './Contact.styles';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const Contact: React.FC = () => {
  const { isMobile, isTablet } = useWindowSize();

  const sectionStyle: React.CSSProperties = isMobile
    ? { ...containerStyles.section, ...containerStyles.sectionMobile }
    : containerStyles.section;

  const containerStyle: React.CSSProperties = isMobile
    ? { ...containerStyles.container, ...containerStyles.containerMobile }
    : containerStyles.container;

  const responsiveGridStyles: React.CSSProperties = {
    ...gridStyles.grid,
    ...(isMobile ? gridStyles.gridMobile : undefined),
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1.2fr',
  };

  const responsiveHeaderStyles = {
    header: {
      ...headerStyles.header,
      ...(isMobile ? headerStyles.headerMobile : undefined),
      maxWidth: '64rem',
    },
    title: {
      ...headerStyles.title,
      fontSize: isMobile
        ? 'clamp(2rem, 8vw, 2.5rem)'
        : isTablet
          ? 'clamp(2.5rem, 6vw, 3rem)'
          : headerStyles.title.fontSize,
    },
    description: {
      ...headerStyles.description,
      fontSize: isMobile
        ? theme.typography.fontSize.base
        : headerStyles.description.fontSize,
      maxWidth: isMobile ? '100%' : '750px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  };

  return (
    <section id="contact" style={sectionStyle}>
      <div style={containerStyles.backgroundTexture} />
      <div style={containerStyles.backgroundBlob1} />
      <div style={containerStyles.backgroundBlob2} />

      <div style={containerStyle}>
        <motion.header
          style={responsiveHeaderStyles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            style={headerStyles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Mail style={headerStyles.badgeIcon} />
            <span style={headerStyles.badgeText}>Contact</span>
          </motion.span>

          <motion.h2
            style={responsiveHeaderStyles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Donnons vie à{' '}
            <span style={headerStyles.titleGradient}>votre vision</span>
          </motion.h2>

          <motion.p
            style={responsiveHeaderStyles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Prêt à transformer vos idées en expériences digitales exceptionnelles ?
            Contactez-nous et commençons cette aventure ensemble.
          </motion.p>
        </motion.header>

        <div style={responsiveGridStyles}>
          <ContactInfo />
          <ContactForm isMobile={isMobile} />
        </div>

        <motion.div
          style={{
            textAlign: 'center' as const,
            marginTop: theme.spacing[16],
            padding: `0 ${theme.spacing[4]}`,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p
            style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.slate[400],
              lineHeight: 1.6,
            }}
          >
            Nous répondons généralement sous 24 heures.
            Vos données sont protégées et ne seront jamais partagées.
          </p>
        </motion.div>
      </div>

      <div
        style={{
          position: 'absolute' as const,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '600px',
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${theme.hexToRgba(theme.colors.teal[500], 0.3)}, transparent)`,
        }}
      />
    </section>
  );
};

export default Contact;
