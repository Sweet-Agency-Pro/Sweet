/**
 * ContactForm Component
 * Form with real-time validation, loading states, and feedback
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { insertContact } from '../../../../services/adminService';

// =============================================================================
// TYPES
// =============================================================================
interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// =============================================================================
// VALIDATION
// =============================================================================
const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Optional field
  const regex = /^[\d\s\-+()]{8,}$/;
  return regex.test(phone);
};

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Le nom est requis';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  if (!data.email.trim()) {
    errors.email = "L'email est requis";
  } else if (!validateEmail(data.email)) {
    errors.email = "Format d'email invalide";
  }

  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Format de téléphone invalide';
  }

  if (!data.subject.trim()) {
    errors.subject = "L'objet est requis";
  }

  if (!data.message.trim()) {
    errors.message = 'Le message est requis';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères';
  }

  return errors;
};

// =============================================================================
// COMPONENT
// =============================================================================
function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Nouvel état pour gérer l'animation de secousse
  const [isShaking, setIsShaking] = useState(false);

  // Handle input change with real-time validation for touched fields
  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Handle blur for field-level validation
  const handleBlur = useCallback((field: keyof FormData) => {
    // Check if all fields are empty
    const allEmpty = Object.values(formData).every(value => !value.trim());
    if (allEmpty) {
      setFocusedField(null);
      return;
    }

    setTouched((prev) => ({ ...prev, [field]: true }));
    setFocusedField(null);

    const fieldErrors = validateForm(formData);
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  }, [formData]);

  // Handle focus
  const handleFocus = useCallback((field: string) => {
    setFocusedField(field);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are empty
    const allEmpty = Object.values(formData).every(value => !value.trim());
    if (allEmpty) {
      return;
    }

    // Validate all fields
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    // Si erreur, on déclenche l'animation "Shake"
    if (Object.keys(formErrors).length > 0) {
      setIsShaking(true);
      // On retire l'état secousse après la fin de l'animation (500ms)
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setStatus('loading');

    try {

      await insertContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      const formPayload = new FormData();
      formPayload.append("access_key", "3c02797c-2de0-4e08-b944-0adaf559b563");
      formPayload.append("name", formData.name.trim());
      formPayload.append("email", formData.email.trim());
      if (formData.phone.trim()) {
        formPayload.append("phone", formData.phone.trim());
      }
      formPayload.append("subject", formData.subject.trim());
      formPayload.append("message", formData.message.trim());

      // Envoi asynchrone vers Web3Forms sans attendre pour ne pas bloquer l'UI
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      }).catch(err => console.error("Web3Forms error:", err));

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTouched({});

      // Reset success message after 15 seconds
      setTimeout(() => setStatus('idle'), 15000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [formData]);

  // Get input class based on state
  const getInputClass = (field: keyof FormData) => {
    let className = 'contact-form__input';
    if (focusedField === field) className += ' contact-form__input--focus';
    if (touched[field] && errors[field]) className += ' contact-form__input--error';
    return className;
  };

  const getTextareaClass = () => {
    let className = 'contact-form__textarea';
    if (focusedField === 'message') className += ' contact-form__textarea--focus';
    if (touched.message && errors.message) className += ' contact-form__textarea--error';
    return className;
  };

  return (
    <motion.div
      className="contact__glass-card contact-form"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form className="contact-form__form" onSubmit={handleSubmit} noValidate>
        {/* Name & Email Row */}
        <div className="contact-form__row">
          <div className="contact-form__group">
            <label htmlFor="name" className="contact-form__label">
              Nom complet *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              className={getInputClass('name')}
              placeholder="Jean Dupont"
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <span className="contact-form__error-message">{errors.name}</span>
            )}
          </div>

          <div className="contact-form__group">
            <label htmlFor="email" className="contact-form__label">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              className={getInputClass('email')}
              placeholder="jean@example.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span className="contact-form__error-message">{errors.email}</span>
            )}
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div className="contact-form__row">
          <div className="contact-form__group">
            <label htmlFor="phone" className="contact-form__label">
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              className={getInputClass('phone')}
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <span className="contact-form__error-message">{errors.phone}</span>
            )}
          </div>

          <div className="contact-form__group">
            <label htmlFor="subject" className="contact-form__label">
              Objet *
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onFocus={() => handleFocus('subject')}
              onBlur={() => handleBlur('subject')}
              className={getInputClass('subject')}
              placeholder="Nouveau projet web"
            />
            {touched.subject && errors.subject && (
              <span className="contact-form__error-message">{errors.subject}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="contact-form__group">
          <label htmlFor="message" className="contact-form__label">
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            className={getTextareaClass()}
            placeholder="Décrivez votre projet, vos besoins, vos délais..."
          />
          {touched.message && errors.message && (
            <span className="contact-form__error-message">{errors.message}</span>
          )}
        </div>

        {/* Legal Notice */}
        <p className="contact-form__legal">
          L'envoi de ce formulaire vaut pour acceptation de nos{' '}
          <a href="/mentions-legales" className="contact-form__legal-link">Mentions légales</a>{' '}
          et{' '}
          <a href="/confidentialite" className="contact-form__legal-link">Politique de confidentialité</a>.
        </p>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          className={`contact-form__submit ${status === 'loading' ? 'contact-form__submit--disabled' : ''}`}
          // Animation de secousse (Error Shake)
          animate={isShaking ? {
            x: [0, -10, 10, -10, 10, 0],
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0)",
              "0 0 0.5rem 0.25rem rgba(239, 68, 68, 0.4)", // Glow rouge
              "0 0 0 0 rgba(239, 68, 68, 0)"
            ]
          } : { x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {status === 'loading' ? (
            <>
              <div className="contact-form__spinner" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="contact-form__submit-icon" />
              <span>Envoyer le message</span>
            </>
          )}
        </motion.button>

        {/* Success Message */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              key="success"
              className="contact-form__success"
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.9,
                filter: 'blur(6px)',
                transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <CheckCircle className="contact-form__success-icon" />
              <span className="contact-form__success-text">
                Message envoyé avec succès ! Nous vous répondrons sous 24h.
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              key="error"
              className="contact-form__error"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.9,
                filter: 'blur(6px)',
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <AlertCircle className="contact-form__error-icon" />
              <span className="contact-form__error-text">
                Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}

export default ContactForm;