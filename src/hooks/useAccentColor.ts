import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface ServiceAccent {
  redirect_url: string;
  color_accent: {
    [key: string]: string;
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

  // Fetch services once
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

  // Update accent color and gradient when location or services change
  useEffect(() => {
    const currentService = services.find(s => s.redirect_url === location.pathname);
    
    if (currentService && currentService.color_accent && currentService.color_accent['500']) {
      const hex = currentService.color_accent['500'].toLowerCase();

      // Map hex to full palette and gradient
      if (hex === '#14b8a6') {
        setPalette({ accent400: '#2dd4bf', accent500: '#14b8a6', accent600: '#0d9488', accentGradient: 'var(--gradient-teal-cyan)' });
      } else if (hex === '#a855f7') {
        setPalette({ accent400: '#c084fc', accent500: '#a855f7', accent600: '#9333ea', accentGradient: 'var(--gradient-purple-blue)' });
      } else if (hex === '#3b82f6') {
        setPalette({ accent400: '#60a5fa', accent500: '#3b82f6', accent600: '#2563eb', accentGradient: 'var(--gradient-blue-cyan)' });
      } else {
        setPalette({ accent400: '#2dd4bf', accent500: '#14b8a6', accent600: '#0d9488', accentGradient: 'var(--gradient-teal-cyan)' });
      }
    } else {
      setPalette({ accent400: '#2dd4bf', accent500: '#14b8a6', accent600: '#0d9488', accentGradient: 'var(--gradient-teal-cyan)' });
    }
  }, [location.pathname, services]);

  return palette;
}
