import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { PROJECT_DATA } from '../components/pages/portfolio/ProjectDetail/projectData';

interface ServiceAccent {
  redirect_url: string;
  color_accent: {
    [key: string]: string;
  };
}

/** Helper to derive the 4-part palette from a primary and optional secondary hex */
function getPaletteFromHex(primary: string, secondary?: string) {
  const hex = primary.toLowerCase();
  const sec = secondary || primary;

  // Map standard brand themes for consistent palettes
  if (hex.includes('14b8a6')) {
    return { 
      accent400: '#2dd4bf', 
      accent500: '#14b8a6', 
      accent600: '#0d9488', 
      accentGradient: 'var(--gradient-teal-cyan)' 
    };
  } 
  if (hex.includes('a855f7') || hex.includes('ec4899') || hex.includes('9333ea')) {
    return { 
      accent400: '#c084fc', 
      accent500: '#a855f7', 
      accent600: '#9333ea', 
      accentGradient: 'var(--gradient-purple-blue)' 
    };
  } 
  if (hex.includes('3b82f6') || hex.includes('2563eb') || hex.includes('60a5fa')) {
    return { 
      accent400: '#60a5fa', 
      accent500: '#3b82f6', 
      accent600: '#2563eb', 
      accentGradient: 'var(--gradient-blue-cyan)' 
    };
  }

  // Custom project accent (e.g. Amber/Orange)
  return {
    accent400: sec,
    accent500: hex,
    accent600: hex,
    accentGradient: `linear-gradient(135deg, ${hex}, ${sec})`
  };
}

export function useAccentColor() {
  const location = useLocation();
  const [services, setServices] = useState<ServiceAccent[]>([]);
  const [palette, setPalette] = useState({
    accent400: '#2dd4bf',
    accent500: '#14b8a6',
    accent600: '#0d9488',
    accentGradient: 'var(--gradient-teal-cyan)'
  });

  // 1. Fetch all services once (cached for navigation between services)
  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('redirect_url, color_accent')
        .eq('is_public', true);

      if (data && !error) {
        setServices(data as ServiceAccent[]);
      }
    }
    fetchServices();
  }, []);

  // 2. Update accent color and gradient on route change
  useEffect(() => {
    let active = true;

    // A. Check for portfolio project detail page
    const portfolioMatch = location.pathname.match(/^\/portfolio\/([^/]+)/);
    if (portfolioMatch) {
      const projectId = portfolioMatch[1];
      const staticProject = PROJECT_DATA[projectId];

      // i. APPLY STATIC DATA IMMEDIATELY (SEO / Instant responsiveness)
      if (staticProject) {
        setPalette(getPaletteFromHex(
          staticProject.colorAccent.primary, 
          staticProject.colorAccent.secondary
        ));
      }

      // ii. HYDRATE WITH LIVE DATA FROM SUPABASE
      async function hydrateProject() {
        const { data, error } = await supabase
          .from('projects_portfolio')
          .select('color_accent')
          .eq('id', projectId)
          .single();

        if (active && data && !error && data.color_accent) {
          const primary = data.color_accent.primary;
          const secondary = data.color_accent.secondary;
          setPalette(getPaletteFromHex(primary, secondary));
        }
      }
      hydrateProject();
      
      return () => { active = false; };
    }

    // B. Service pages logic
    const currentService = services.find(s => s.redirect_url === location.pathname);
    
    if (currentService && currentService.color_accent && currentService.color_accent['500']) {
      setPalette(getPaletteFromHex(currentService.color_accent['500']));
    } else {
      // Default fallback
      setPalette({ 
        accent400: '#2dd4bf', 
        accent500: '#14b8a6', 
        accent600: '#0d9488', 
        accentGradient: 'var(--gradient-teal-cyan)' 
      });
    }

    return () => { active = false; };
  }, [location.pathname, services]);

  return palette;
}
