/**
 * AdminProjects
 * CRUD page for portfolio projects with preview upload.
 * Responsive: mobile, FHD, 4K/5K.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import theme from '../../../styles/theme';
import { useWindowSize } from '../../../hooks/useWindowSize';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
import type { AdminResponsive } from '../admin.styles';
import ProjectFormModal from '../components/ProjectFormModal';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadPreview,
  deletePreview,
  type DbProject,
} from '../../../services/adminService';

function AdminProjects() {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DbProject | null>(null);
  const [creating, setCreating] = useState(false);
  const { isMobile, is4K } = useWindowSize();
  const r: AdminResponsive = { isMobile, is4K };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setProjects(await fetchProjects());
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (
    payload: Partial<DbProject>,
    file?: File | null,
    deleteOldPreview?: boolean
  ) => {
    const isNew = !editing;
    let saved: DbProject;

    if (isNew) {
      saved = await createProject(payload);
    } else {
      saved = await updateProject(editing!.id, payload);
    }

    // handle preview
    if (deleteOldPreview && !file) {
      await deletePreview(saved.id);
      await updateProject(saved.id, { preview_url: null });
    } else if (file) {
      if (deleteOldPreview) {
        try {
          await deletePreview(saved.id);
        } catch {
          /* ignore */
        }
      }
      const url = await uploadPreview(saved.id, file);
      await updateProject(saved.id, { preview_url: url });
    }

    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      await deletePreview(id);
    } catch {
      /* ignore */
    }
    await deleteProject(id);
    await load();
  };

  return (
    <AdminLayout title="Projets">
      <div style={s.pageHeaderR(r)}>
        <div style={s.pageTitleR(r)}>Portfolio</div>
        <button
          type="button"
          style={s.btnPrimaryR(r)}
          onClick={() => setCreating(true)}
        >
          <Plus size={is4K ? 20 : 16} />
          Nouveau projet
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanelR(r)}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : projects.length === 0 ? (
        <div style={s.emptyStateR(r)}>
          <div>Aucun projet</div>
          <button
            type="button"
            style={s.btnPrimaryR(r)}
            onClick={() => setCreating(true)}
          >
            <Plus size={is4K ? 20 : 16} />
            Créer un premier projet
          </button>
        </div>
      ) : (
        <div style={s.glassPanelR(r)}>
          <div style={s.tableWrap(r)}>
            <table style={s.tableR(r)}>
              <thead>
                <tr style={s.tableHead}>
                  {!isMobile && <th style={s.thR(r)}>Preview</th>}
                  <th style={s.thR(r)}>Nom</th>
                  <th style={s.thR(r)}>Type</th>
                  {!isMobile && <th style={s.thR(r)}>Tech</th>}
                  {!isMobile && <th style={s.thR(r)}>Couleur</th>}
                  <th style={s.thR(r)}>Statut</th>
                  <th style={{ ...s.thR(r), textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    {!isMobile && (
                      <td style={s.tdR(r)}>
                        {proj.preview_url ? (
                          <img
                            src={proj.preview_url}
                            alt=""
                            style={styles.thumb}
                          />
                        ) : (
                          <div style={styles.noThumb}>
                            <Image size={is4K ? 20 : 16} color={theme.colors.slate[600]} />
                          </div>
                        )}
                      </td>
                    )}
                    <td style={s.tdR(r)}>
                      <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                        {proj.name}
                      </div>
                      <div
                        style={{
                          fontSize: is4K ? theme.typography.fontSize.sm : theme.typography.fontSize.xs,
                          color: theme.colors.slate[500],
                        }}
                      >
                        {proj.id}
                      </div>
                    </td>
                    <td style={s.tdR(r)}>
                      <span
                        style={
                          proj.type === 'production'
                            ? s.badge(theme.colors.teal[400], r)
                            : s.badge(theme.colors.blue[400], r)
                        }
                      >
                        {proj.type === 'production' ? 'Production' : 'Concept'}
                      </span>
                    </td>
                    {!isMobile && (
                      <td style={s.tdR(r)}>
                        <div style={styles.techList}>
                          {(proj.tech ?? []).slice(0, 3).map((t) => (
                            <span key={t} style={styles.techBadge}>{t}</span>
                          ))}
                          {(proj.tech ?? []).length > 3 && (
                            <span style={{ color: theme.colors.slate[500], fontSize: theme.typography.fontSize.xs }}>
                              +{proj.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                    )}
                    {!isMobile && (
                      <td style={s.tdR(r)}>
                        <div
                          style={{
                            ...s.colorSwatch(proj.color_accent?.primary ?? '#14b8a6'),
                            width: is4K ? '2rem' : '1.5rem',
                            height: is4K ? '2rem' : '1.5rem',
                          }}
                          title={proj.color_accent?.primary}
                        />
                      </td>
                    )}
                    <td style={s.tdR(r)}>
                      {proj.is_flagship ? (
                        <span style={s.badge('#f59e0b', r)}>⭐ Flagship</span>
                      ) : (
                        <span style={s.badgeDraft}>Standard</span>
                      )}
                    </td>
                    <td style={{ ...s.tdR(r), textAlign: 'right' }}>
                      <div style={styles.actionRow}>
                        <button
                          type="button"
                          style={{ ...s.btnGhostR(r), ...s.btnSmallR(r) }}
                          onClick={() => setEditing(proj)}
                        >
                          <Pencil size={is4K ? 18 : 14} />
                        </button>
                        <button
                          type="button"
                          style={{ ...s.btnDangerR(r), ...s.btnSmallR(r) }}
                          onClick={() => handleDelete(proj.id)}
                        >
                          <Trash2 size={is4K ? 18 : 14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {creating && (
        <ProjectFormModal
          onSave={handleSave}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <ProjectFormModal
          initial={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </AdminLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  thumb: {
    width: '3.5rem',
    height: '2rem',
    objectFit: 'cover',
    borderRadius: theme.borderRadius.md,
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
  },
  noThumb: {
    width: '3.5rem',
    height: '2rem',
    borderRadius: theme.borderRadius.md,
    border: `1px dashed ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
    display: 'grid',
    placeItems: 'center',
    background: theme.hexToRgba(theme.colors.slate[800], 0.3),
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing[2],
  },
  techList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[1],
    alignItems: 'center',
  },
  techBadge: {
    padding: `${theme.spacing[0.5]} ${theme.spacing[2]}`,
    borderRadius: theme.borderRadius.full,
    fontSize: theme.typography.fontSize.xs,
    background: theme.hexToRgba(theme.colors.slate[600], 0.3),
    color: theme.colors.slate[300],
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.3)}`,
  },
};

export default AdminProjects;
