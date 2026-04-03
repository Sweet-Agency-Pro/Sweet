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
  const [accentColor, setAccentColor] = useState<string>('#14b8a6');
  const [accentGradient, setAccentGradient] = useState<string>('var(--gradient-teal-cyan)');

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
      setAccentColor(hex);

      // Map hex to gradient
      if (hex === '#14b8a6') {
        setAccentGradient('var(--gradient-teal-cyan)');
      } else if (hex === '#a855f7') {
        setAccentGradient('var(--gradient-purple-blue)');
      } else if (hex === '#3b82f6') {
        setAccentGradient('var(--gradient-blue-cyan)');
      } else {
        setAccentGradient('var(--gradient-teal-cyan)');
      }
    } else {
      setAccentColor('#14b8a6');
      setAccentGradient('var(--gradient-teal-cyan)');
    }
  }, [location.pathname, services]);

  return { accentColor, accentGradient };
}
