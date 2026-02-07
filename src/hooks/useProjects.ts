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

  const candidates = ['projects_portfolio', 'projects_portfoliio', 'projects', 'projects_portfoliio'];

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    let lastError: any = null;

    for (const table of candidates) {
      try {
        const { data: rows, error } = await supabase
          .from(table)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          lastError = error;
          continue;
        }

        if (rows && rows.length) {
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
          setLoading(false);
          return { rows: mapped, table };
        }

        // If rows is an empty array it's still a successful query — return it
        if (rows && rows.length === 0) {
          setData([]);
          setLoading(false);
          return { rows: [], table };
        }
      } catch (e) {
        lastError = e;
        continue;
      }
    }

    setError(lastError || new Error('No projects table found'));
    setLoading(false);
    return { rows: [], table: null };
  }, []);

  useEffect(() => {
    fetch().catch((e) => {
      setError(e);
    });
  }, [fetch]);

  return { data, loading, error, refresh: fetch };
}
