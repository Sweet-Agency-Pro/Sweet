'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const NAV_HEIGHT = 80;

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) return false;

  const y = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  const hash = `#${sectionId}`;
  if (window.location.hash !== hash) {
    window.history.replaceState(null, '', `/${hash}`);
  }
  return true;
}

export function useSectionNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToSection = useCallback(
    (sectionId: string) => {
      // Sur la home : scroll direct vers la section. Sinon : navigation vers /#section
      // (la home lit le hash au chargement et scrolle).
      if (pathname === '/') {
        const scrolled = scrollToSection(sectionId);
        if (!scrolled) {
          router.push(`/#${sectionId}`);
        }
        return;
      }

      router.push(`/#${sectionId}`);
    },
    [pathname, router]
  );

  return { navigateToSection };
}
