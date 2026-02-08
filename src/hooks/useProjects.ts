import { useEffect, useState, useCallback } from 'react';
import supabase from '../lib/supabaseClient';

export type Project = {
  id: string;
  name: string;
  hook: string;
  story: string;
  benefit?: string;
  tech: string[];
  type: 'production' | 'concept';
  colorAccent: {
    primary?: string;
    secondary?: string;
    gradient?: string;
    light?: string;
  };
  isFlagship?: boolean;
  previewUrl?: string;
};

/**
 * useProjects
 * - Attempts to read the projects table from multiple common table names
 * - Maps DB rows to the local `Project` shape used by components
 * - Returns { data, loading, error, refresh }
 */
export function useProjects() {
  const [data, setData] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  const table_name = 'projects_portfolio';

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: rows, error } = await supabase
        .from(table_name)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (rows) {
        // Map DB row to expected shape (light mapping)
        const mapped: Project[] = rows.map((r: any) => ({
          id: r.id,
          name: r.name,
          hook: r.hook,
          story: r.story,
          benefit: r.benefit ?? undefined,
          tech: r.tech ?? [],
          type: r.type,
          colorAccent: r.color_accent ?? {},
          isFlagship: r.is_flagship ?? false,
          previewUrl: r.preview_url ?? undefined,
        }));

        setData(mapped);
      }
    } catch (e) {
      console.error("Erreur chargement projets:", e);
      setError(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch().catch((e) => {
      setError(e);
    });
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
