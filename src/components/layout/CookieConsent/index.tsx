/**
 * CookieConsent Component
 * Comprehensive GDPR-compliant modal with multi-level choice and granular options.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronRight, ArrowLeft, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

// =============================================================================
// TYPES & CONSTANTS
// =============================================================================

type ConsentData = {
  essential: boolean;
  analytics: boolean;
  timestamp: string;
  version: string;
};

const CONSENT_KEY = 'SweetAgency_GDPR_Consent';
const CONSENT_VERSION = '1.0.0';
const EXPIRY_DAYS = 180; // 6 months as recommended by CNIL

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

interface ToggleProps {
  active: boolean;
  onChange?: (val: boolean) => void;
  disabled?: boolean;
}

const Toggle = ({ active, onChange, disabled }: ToggleProps) => (
  <div
    className={`cookie-toggle ${active ? 'cookie-toggle--active' : ''} ${disabled ? 'cookie-toggle--disabled' : ''}`}
    onClick={() => !disabled && onChange?.(!active)}
  >
    <div className="cookie-toggle__dot" />
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface CookieConsentProps {
  onConsentChange: (consent: ConsentData) => void;
}

const CookieConsentModal = ({ onConsentChange }: CookieConsentProps) => {
  const [show, setShow] = useState(false);
  const [level, setLevel] = useState<1 | 2>(1);
  const [tempConsent, setTempConsent] = useState({
    analytics: false
  });

  // Load existing consent
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      // Delay slightly for UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const data = JSON.parse(saved) as ConsentData;
        // Check if consent has expired
        const savedDate = new Date(data.timestamp).getTime();
        const now = new Date().getTime();
        const diffDays = (now - savedDate) / (1000 * 60 * 60 * 24);

        if (diffDays > EXPIRY_DAYS) {
          setShow(true);
        } else {
          onConsentChange(data);
        }
      } catch {
        setShow(true);
      }
    }
  }, [onConsentChange]);

  const saveConsent = useCallback((analytics: boolean) => {
    const data: ConsentData = {
      essential: true,
      analytics,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
    onConsentChange(data);
    setShow(false);
    setLevel(1);
  }, [onConsentChange]);

  const handleAcceptAll = () => saveConsent(true);
  const handleRefuseAll = () => saveConsent(false);
  const handleSaveCustom = () => saveConsent(tempConsent.analytics);

  return (
    <>
      <AnimatePresence>
        {show && (
          <div className="cookie-modal-backdrop">
            <motion.div
              className="cookie-modal"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close / Refusal button */}
              <button
                className="cookie-modal__close"
                onClick={handleRefuseAll}
                aria-label="Refuser et fermer"
              >
                <X size={20} />
              </button>

              <div className="cookie-modal__body">
                {level === 1 ? (
                  /* --- LEVEL 1: Summary --- */
                  <motion.div
                    key="level1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="cookie-modal__header"
                  >
                    <div className="cookie-modal__badge">
                      <ShieldCheck size={16} />
                      <span>Paramètres de confidentialité</span>
                    </div>
                    <h2 className="cookie-modal__title">Nous respectons votre vie privée</h2>
                    <p className="cookie-modal__description">
                      Chez <span className="cookie-modal__sweet-highlight">Sweet</span>, nous utilisons des technologies comme les cookies pour stocker et/ou accéder à des informations personnelles.
                      Ces outils nous aident à améliorer votre expérience, analyser notre trafic et vous proposer des contenus adaptés.
                    </p>
                    <p className="cookie-modal__description" style={{ marginTop: '0.5rem', fontSize: '12px' }}>
                      <Link to="/confidentialite" className="cookie-modal__link" style={{ marginLeft: '4px' }}>En savoir plus</Link>
                    </p>
                  </motion.div>
                ) : (
                  /* --- LEVEL 2: Granular --- */
                  <motion.div
                    key="level2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="cookie-modal__header"
                  >
                    <div className="cookie-modal__badge">
                      <Info size={16} />
                      <span>Personnalisation des cookies</span>
                    </div>
                    <h2 className="cookie-modal__title">Configurez vos préférences</h2>

                    <div className="cookie-categories" style={{ marginTop: '1.25rem' }}>
                      {/* CATEGORY: ESSENTIAL */}
                      <div className="cookie-category cookie-category--active" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="cookie-category__info">
                            <span className="cookie-category__label">Essentiels</span>
                            <span className="cookie-category__desc">Indispensables au fonctionnement du site (sécurité, admin).</span>
                          </div>
                          <Toggle active={true} disabled />
                        </div>
                        <div className="cookie-category__vendors">
                          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="cookie-vendor-tag">Vercel</a>
                          <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="cookie-vendor-tag">Supabase</a>
                        </div>
                      </div>

                      {/* CATEGORY: ANALYTICS */}
                      <div className={`cookie-category ${tempConsent.analytics ? 'cookie-category--active' : ''}`} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="cookie-category__info">
                            <span className="cookie-category__label">Mesure d'audience</span>
                            <span className="cookie-category__desc">Analyse d'audience et statistiques de visites.</span>
                          </div>
                          <Toggle
                            active={tempConsent.analytics}
                            onChange={(val) => setTempConsent(prev => ({ ...prev, analytics: val }))}
                          />
                        </div>
                        <div className="cookie-category__vendors">
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="cookie-vendor-tag">Google Analytics 4</a>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </div>

              <div className="cookie-modal__footer">
                {level === 1 ? (
                  <>
                    <div className="cookie-modal__actions-main">
                      <button className="cookie-btn cookie-btn--primary" onClick={handleAcceptAll}>
                        Accepter
                      </button>
                      <button className="cookie-btn cookie-btn--danger" onClick={handleRefuseAll}>
                        Refuser
                      </button>
                    </div>
                    <button className="cookie-btn cookie-btn--ghost" onClick={() => setLevel(2)}>
                      Personnaliser <ChevronRight size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cookie-btn cookie-btn--ghost" onClick={() => setLevel(1)}>
                      <ArrowLeft size={14} /> Retour
                    </button>
                    <button className="cookie-btn cookie-btn--primary" onClick={handleSaveCustom}>
                      Confirmer
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!show && (
          <motion.button
            key="trigger"
            className="cookie-trigger"
            onClick={() => setShow(true)}
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            aria-label="Gérer mes cookies"
            title="Gérer mes cookies"
          >
            <Cookie size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsentModal;
export type { ConsentData };
