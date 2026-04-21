import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact__bg-texture" />
      <div className="contact__blob-1" />
      <div className="contact__blob-2" />

      <div className="contact__container">
        <motion.header
          className="contact__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="contact__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Mail className="contact__badge-icon" />
            <span className="contact__badge-text">Contact</span>
          </motion.span>

          <motion.h2
            className="contact__title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Parlons de{' '}
            <span className="contact__title-gradient">votre projet</span>
          </motion.h2>

          <motion.p
            className="contact__description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Remplissez le formulaire ci-dessous ou contactez-nous directement.
            Notre équipe vous répond sous 24 heures.
          </motion.p>
        </motion.header>

        <div className="contact__grid">
          <ContactInfo />
          <ContactForm />
        </div>

        <motion.div
          className="contact__footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>
            Réponse garantie sous 24 heures ouvrées.<br />
            Vos données sont protégées et ne seront jamais cédées à des tiers (RGPD).
          </p>
        </motion.div>
      </div>

      <div className="contact__separator" />
    </section>
  );
};

export default Contact;
