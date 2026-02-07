import supabase from '../lib/supabaseClient';

export async function insertProject(project: { title: string; description?: string }) {
  const { data, error } = await supabase.from('projects').insert([project]);
  if (error) throw error;
  return data;
}
