import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#0f172a',
        color: '#ffffff',
      }}
    >
      <p style={{ fontSize: '4rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Cette page n&apos;existe pas</h1>
      <p style={{ color: '#94a3b8', maxWidth: '32rem', margin: 0 }}>
        Le lien est peut-être erroné ou la page a été déplacée. Revenez à l&apos;accueil pour
        retrouver nos services.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '0.5rem',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.75rem',
          background: 'linear-gradient(90deg, #14b8a6, #06b6d4)',
          color: '#ffffff',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
