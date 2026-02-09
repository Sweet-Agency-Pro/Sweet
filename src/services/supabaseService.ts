import supabase from '../lib/supabaseClient';

export async function insertProject(project: { title: string; description?: string }) {
  const { data, error } = await supabase.from('projects').insert([project]);
  if (error) throw error;
  return data;
}

/**
 * Fetch public services (is_public = true), ordered by position.
 * Used by the front-end Services section with a static fallback.
 */
export async function fetchPublicServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_public', true)
    .order('position', { ascending: true });
  if (error) throw error;
  return data ?? [];
}
