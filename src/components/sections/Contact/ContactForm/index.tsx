/**
 * ContactForm Component
 * Form with real-time validation, loading states, and feedback
 */

import { useState, useCallback, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { styles } from '../Contact.styles';

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

interface ContactFormProps {
  isMobile: boolean;
}

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
function ContactForm({ isMobile }: ContactFormProps) {
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

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTouched({});

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [formData]);

  // Get input style based on state
  const getInputStyle = (field: keyof FormData): CSSProperties => {
    const baseStyle = styles.input;
    const isFocused = focusedField === field;
    const hasError = touched[field] && errors[field];

    return {
      ...baseStyle,
      ...(isFocused && styles.inputFocus),
      ...(hasError && styles.inputError),
    };
  };

  const getTextareaStyle = (): CSSProperties => {
    const isFocused = focusedField === 'message';
    const hasError = touched.message && errors.message;

    return {
      ...styles.textarea,
      ...(isFocused && styles.inputFocus),
      ...(hasError && styles.inputError),
    };
  };

  return (
    <motion.div
      style={{
        ...styles.glassCard,
        ...styles.formCard,
        ...(isMobile && styles.formCardMobile),
      }}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form style={styles.form} onSubmit={handleSubmit} noValidate>
        {/* Name & Email Row */}
        <div
          style={{
            ...styles.formRow,
            ...(isMobile && styles.formRowMobile),
          }}
        >
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Nom complet *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
              style={getInputStyle('name')}
              placeholder="Jean Dupont"
              autoComplete="name"
            />
            {touched.name && errors.name && (
              <span style={styles.errorMessage}>{errors.name}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              style={getInputStyle('email')}
              placeholder="jean@example.com"
              autoComplete="email"
            />
            {touched.email && errors.email && (
              <span style={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
        </div>

        {/* Phone & Subject Row */}
        <div
          style={{
            ...styles.formRow,
            ...(isMobile && styles.formRowMobile),
          }}
        >
          <div style={styles.inputGroup}>
            <label htmlFor="phone" style={styles.label}>
              Téléphone
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onFocus={() => handleFocus('phone')}
              onBlur={() => handleBlur('phone')}
              style={getInputStyle('phone')}
              placeholder="+33 6 12 34 56 78"
              autoComplete="tel"
            />
            {touched.phone && errors.phone && (
              <span style={styles.errorMessage}>{errors.phone}</span>
            )}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="subject" style={styles.label}>
              Objet *
            </label>
            <input
              id="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              onFocus={() => handleFocus('subject')}
              onBlur={() => handleBlur('subject')}
              style={getInputStyle('subject')}
              placeholder="Nouveau projet web"
            />
            {touched.subject && errors.subject && (
              <span style={styles.errorMessage}>{errors.subject}</span>
            )}
          </div>
        </div>

        {/* Message */}
        <div style={styles.inputGroup}>
          <label htmlFor="message" style={styles.label}>
            Message *
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => handleFocus('message')}
            onBlur={() => handleBlur('message')}
            style={getTextareaStyle()}
            placeholder="Décrivez votre projet, vos besoins, vos délais..."
          />
          {touched.message && errors.message && (
            <span style={styles.errorMessage}>{errors.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={status === 'loading'}
          style={{
            ...styles.submitButton,
            ...(status === 'loading' && styles.submitButtonDisabled),
          }}
          whileHover={
            status !== 'loading'
              ? {
                  background: 'linear-gradient(to right, #0d9488, #0891b2)',
                  transform: 'translateY(-0.125rem)',
                  boxShadow: '0 0.5rem 1.5rem -0.25rem rgba(20, 184, 166, 0.4)',
                }
              : {}
          }
          whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
        >
          {status === 'loading' ? (
            <>
              <div style={styles.loadingSpinner} />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send style={styles.submitIcon} />
              <span>Envoyer le message</span>
            </>
          )}
        </motion.button>

        {/* Success Message */}
        {status === 'success' && (
          <motion.div
            style={styles.successMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CheckCircle style={styles.successIcon} />
            <span style={styles.successText}>
              Message envoyé avec succès ! Nous vous répondrons sous 24h.
            </span>
          </motion.div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <motion.div
            style={styles.errorBox}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle style={styles.errorIcon} />
            <span style={styles.errorText}>
              Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
            </span>
          </motion.div>
        )}
      </form>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}

export default ContactForm;
