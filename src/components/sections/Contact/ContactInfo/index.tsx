import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../../../styles/theme';
import { infoStyles, glassCardStyles } from '../Contact.styles';

const EmailIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const LocationIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  delay?: number;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, href, delay = 0 }) => {
  const content = (
    <motion.div
      style={infoStyles.item}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ x: 5 }}
    >
      <motion.div
        style={infoStyles.itemIcon}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <div style={infoStyles.itemContent}>
        <span style={infoStyles.itemLabel}>{label}</span>
        <span style={infoStyles.itemValue}>{value}</span>
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    );
  }

  return content;
};

const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: <EmailIcon size={22} />,
      label: 'Email',
      value: 'contact@agence-sweet.com',
      href: 'mailto:contact@agence-sweet.com',
    },
    {
      icon: <PhoneIcon size={22} />,
      label: 'Téléphone',
      value: '+33 1 23 45 67 89',
      href: 'tel:+33123456789',
    },
    {
      icon: <LocationIcon size={22} />,
      label: 'Adresse',
      value: 'Strasbourg, France',
    },
  ];

  return (
    <motion.div
      style={{ ...glassCardStyles.glassCard, ...infoStyles.infoCard }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h3
        style={infoStyles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Parlons de votre projet
      </motion.h3>

      <motion.p
        style={infoStyles.description}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Nous sommes disponibles pour discuter de vos idées et transformer
        votre vision en réalité digitale. N'hésitez pas à nous contacter.
      </motion.p>

      <div style={infoStyles.itemsContainer}>
        {contactItems.map((item, index) => (
          <ContactItem key={item.label} {...item} delay={0.2 + index * 0.1} />
        ))}
      </div>

      <motion.div
        style={{
          position: 'absolute' as const,
          bottom: '-2rem',
          right: '-2rem',
          width: '12rem',
          height: '12rem',
          background: `radial-gradient(circle, ${theme.hexToRgba(theme.colors.teal[500], 0.15)} 0%, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none' as const,
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default ContactInfo;
