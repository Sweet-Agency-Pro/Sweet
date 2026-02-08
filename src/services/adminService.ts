/**
 * Supabase Admin Service
 * Full CRUD for services, projects, contacts, and media upload.
 */

import supabase from '../lib/supabaseClient';

// =============================================================================
// TYPES
// =============================================================================
export interface DbService {
  id: string;
  title: string;
  description: string | null;
  icon_name: string | null;
  cta_label: string | null;
  cta_url: string | null;
  position: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbProject {
  id: string;
  name: string;
  hook: string | null;
  story: string | null;
  benefit: string | null;
  tech: string[];
  type: 'production' | 'concept';
  color_accent: {
    primary?: string;
    secondary?: string;
    gradient?: string;
    light?: string;
  };
  is_flagship: boolean;
  preview_url: string | null;
  created_at: string;
}

export interface DbContact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

// =============================================================================
// SERVICES CRUD
// =============================================================================
export async function fetchServices(): Promise<DbService[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('position', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createService(
  payload: Partial<Omit<DbService, 'id' | 'created_at' | 'updated_at'>>
): Promise<DbService> {
  const { data, error } = await supabase
    .from('services')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateService(
  id: string,
  payload: Partial<Omit<DbService, 'id' | 'created_at'>>
): Promise<DbService> {
  const { data, error } = await supabase
    .from('services')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
}

// =============================================================================
// PROJECTS CRUD
// =============================================================================
export async function fetchProjects(): Promise<DbProject[]> {
  const { data, error } = await supabase
    .from('projects_portfolio')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function createProject(
  payload: Partial<Omit<DbProject, 'created_at'>>
): Promise<DbProject> {
  const { data, error } = await supabase
    .from('projects_portfolio')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  payload: Partial<Omit<DbProject, 'created_at'>>
): Promise<DbProject> {
  const { data, error } = await supabase
    .from('projects_portfolio')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('projects_portfolio')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// =============================================================================
// CONTACTS
// =============================================================================
export async function fetchContacts(): Promise<DbContact[]> {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function insertContact(
  payload: Omit<DbContact, 'id' | 'status' | 'created_at'>
): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .insert([payload]);
  if (error) throw error;
}

export async function updateContactStatus(
  id: string,
  status: string
): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// =============================================================================
// MEDIA / STORAGE
// =============================================================================
const BUCKET = 'portfolio_screenshots';

export async function uploadPreview(
  projectId: string,
  file: File
): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'png';
  const path = `${projectId}/${projectId}_preview.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deletePreview(projectId: string): Promise<void> {
  const { data: list, error: listError } = await supabase.storage
    .from(BUCKET)
    .list(projectId);

  if (listError) throw listError;

  if (list && list.length > 0) {
    const paths = list.map((f) => `${projectId}/${f.name}`);
    const { error } = await supabase.storage.from(BUCKET).remove(paths);
    if (error) throw error;
  }
}

// =============================================================================
// STATS (DASHBOARD)
// =============================================================================
export async function fetchStats() {
  const [services, projects, contacts] = await Promise.all([
    supabase.from('services').select('id, is_public', { count: 'exact', head: true }),
    supabase.from('projects_portfolio').select('id', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('id, status', { count: 'exact', head: true }),
  ]);

  const newContacts = await supabase
    .from('contact_messages')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new');

  return {
    servicesCount: services.count ?? 0,
    projectsCount: projects.count ?? 0,
    contactsCount: contacts.count ?? 0,
    newContactsCount: newContacts.count ?? 0,
  };
}
