import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToSection = useCallback(
    (sectionId: string) => {
      const hash = `#${sectionId}`;

      if (location.pathname === '/') {
        const scrolled = scrollToSection(sectionId);
        if (!scrolled) {
          navigate({ pathname: '/', hash });
        }
        return;
      }

      navigate({ pathname: '/', hash });
    },
    [location.pathname, navigate]
  );

  return { navigateToSection };
}
