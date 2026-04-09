import React from 'react';
import {
  Database, // for Supabase fallback
  Zap,      // for Vite fallback
  CreditCard, // for Stripe fallback
  Code2     // general fallback
} from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

/**
 * TechIcon — Specific SVGs for tech stack logos.
 * If no specific SVG is found, it falls back to a Lucide icon.
 */
export const TechIcon: React.FC<TechIconProps> = ({ name, className }) => {
  const n = name.toLowerCase();

  // TypeScript
  if (n === 'typescript' || n === 'ts') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
        <path fill="#fff" d="M22.67 47h99.67v73.67H22.67z" /><path data-name="original" fill="currentColor" d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z" />
      </svg>
    );
  }

  // Next.js
  if (n === 'next.js' || n === 'nextjs') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className={className} fill="currentColor">
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
      </svg>
    );
  }

  // Supabase
  if (n === 'supabase') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.362 9.354H12V.348L2.638 12.646H12V21.652L21.362 9.354Z" />
      </svg>
    );
  }

  // Vite
  if (n === 'vite') {
    return (
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={className}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <title>file_type_vite</title>
          {/* Main Body - uses currentColor */}
          <path
            d="M29.8836 6.146L16.7418 29.6457c-.2714.4851-.9684.488-1.2439.0052L2.0956 6.1482c-.3-.5262.1498-1.1635.746-1.057l13.156 2.3516a.7144.7144 0 00.2537-.0004l12.8808-2.3478c.5942-.1083 1.0463.5241.7515 1.0513z"
            fill="currentColor"
          />
          {/* Bolt - uses project accent gradient */}
          <path
            d="M22.2644 2.0069l-9.7253 1.9056a.3571.3571 0 00-.2879.3294l-.5982 10.1038c-.014.238.2045.4227.4367.3691l2.7077-.6248c.2534-.0585.4823.1647.4302.4194l-.8044 3.9393c-.0542.265.1947.4918.4536.4132l1.6724-.5082c.2593-.0787.5084.1487.4536.414l-1.2784 6.1877c-.08.387.4348.598.6495.2662L16.5173 25 24.442 9.1848c.1327-.2648-.096-.5667-.387-.5106l-2.787.5379c-.262.0505-.4848-.1934-.4109-.4497l1.8191-6.306c.074-.2568-.1496-.5009-.4118-.4495z"
            fill="url(#viteBoltGradient)"
          />
          <defs>
            <linearGradient id="viteBoltGradient" x1="12" y1="2" x2="24" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--project-secondary, #28c4f9ff)" />
              <stop offset="1" stopColor="var(--project-secondary, #BD34FE)" />
            </linearGradient>
          </defs>
        </g>
      </svg>
    );
  }

  // Stripe
  if (n === 'stripe') {
    return (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path fill="currentColor" fillRule="evenodd" d="M1,1 L23,1 L23,23 L1,23 L1,1 Z M11.1196337,9.18908425 C11.1196337,8.58622711 11.6142857,8.35435897 12.4335531,8.35435897 C13.6083516,8.35435897 15.0923077,8.70989011 16.2671062,9.343663 L16.2671062,5.71106227 C14.9841026,5.20095238 13.7165568,5 12.4335531,5 C9.2956044,5 7.20879121,6.6385348 7.20879121,9.37457875 C7.20879121,13.6409524 13.0827839,12.9608059 13.0827839,14.800293 C13.0827839,15.5113553 12.4644689,15.7432234 11.5988278,15.7432234 C10.3158242,15.7432234 8.67728938,15.2176557 7.37882784,14.5065934 L7.37882784,18.1855678 C8.81641026,18.8038828 10.2694505,19.0666667 11.5988278,19.0666667 C14.8140659,19.0666667 17.0245421,17.4745055 17.0245421,14.7075458 C17.0090842,10.1010989 11.1196337,10.9203663 11.1196337,9.18908425 L11.1196337,9.18908425 Z"></path>
        </g>
      </svg>
    );
  }

  // Fallbacks using Lucide Icons
  if (n.includes('db') || n.includes('database') || n.includes('sql') || n.includes('postgre')) {
    return <Database className={className} />;
  }
  if (n.includes('vite') || n.includes('performance') || n.includes('speed')) {
    return <Zap className={className} />;
  }
  if (n.includes('pay') || n.includes('stripe') || n.includes('checkout')) {
    return <CreditCard className={className} />;
  }

  return <Code2 className={className} />;
};
