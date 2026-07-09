'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ReactGA from 'react-ga4';
import { Analytics } from '@vercel/analytics/react';
import CookieConsentModal, { type ConsentData } from '../components/layout/CookieConsent';
import { useAccentColor } from '../hooks/useAccentColor';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADMIN_PATH = process.env.NEXT_PUBLIC_ADMIN_PATH || '/studio-ombre-87';
const CONSENT_KEY = 'SweetAgency_GDPR_Consent';

function readStoredConsent(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = window.localStorage.getItem(CONSENT_KEY);
  if (!saved) return false;
  try {
    return (JSON.parse(saved) as ConsentData).analytics === true;
  } catch {
    return false;
  }
}

function setGaEnabled(enabled: boolean) {
  if (!GA_MEASUREMENT_ID) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any)[`ga-disable-${GA_MEASUREMENT_ID}`] = !enabled;
  if (enabled) {
    if (window.localStorage.getItem('ga_initialized') !== 'true') {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      window.localStorage.setItem('ga_initialized', 'true');
    }
  } else {
    window.localStorage.setItem('ga_initialized', 'false');
  }
}

/** Envoie une pageview GA à chaque changement de route (hors admin, si consentement). */
function AnalyticsTracker({ hasConsent }: { hasConsent: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const isAdminPage = pathname?.startsWith(ADMIN_PATH) ?? false;

    if (hasConsent && !isAdminPage) {
      setGaEnabled(true);
      ReactGA.send({ hitType: 'pageview', page: pathname ?? '/' });
    } else {
      setGaEnabled(false);
    }
  }, [pathname, hasConsent]);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const { accent400, accent500, accent600, accentGradient } = useAccentColor();

  // Initialise l'état de consentement depuis localStorage après montage (évite un mismatch SSR).
  useEffect(() => {
    setAnalyticsConsent(readStoredConsent());
  }, []);

  const handleConsentChange = useCallback((data: ConsentData) => {
    setAnalyticsConsent(data.analytics);
    setGaEnabled(data.analytics);
    if (data.analytics && GA_MEASUREMENT_ID) {
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }
  }, []);

  return (
    <>
      <AnalyticsTracker hasConsent={analyticsConsent} />
      {children}
      <CookieConsentModal
        onConsentChange={handleConsentChange}
        dynamic400={accent400}
        dynamic500={accent500}
        dynamic600={accent600}
        dynamicGradient={accentGradient}
      />
      <Analytics />
    </>
  );
}
