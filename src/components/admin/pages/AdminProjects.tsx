/**
 * AdminProjects
 * CRUD page for portfolio projects with preview upload.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
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
      // just delete
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
      <div style={s.pageHeader}>
        <div style={s.pageTitle}>Portfolio</div>
        <button
          type="button"
          style={s.btnPrimary}
          onClick={() => setCreating(true)}
        >
          <Plus size={16} />
          Nouveau projet
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanel}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : projects.length === 0 ? (
        <div style={s.emptyState}>
          <div>Aucun projet</div>
          <button
            type="button"
            style={s.btnPrimary}
            onClick={() => setCreating(true)}
          >
            <Plus size={16} />
            Créer un premier projet
          </button>
        </div>
      ) : (
        <div style={s.glassPanel}>
          <table style={s.table}>
            <thead>
              <tr style={s.tableHead}>
                <th style={s.th}>Preview</th>
                <th style={s.th}>Nom</th>
                <th style={s.th}>Type</th>
                <th style={s.th}>Tech</th>
                <th style={s.th}>Couleur</th>
                <th style={s.th}>Statut</th>
                <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id}>
                  <td style={s.td}>
                    {proj.preview_url ? (
                      <img
                        src={proj.preview_url}
                        alt=""
                        style={styles.thumb}
                      />
                    ) : (
                      <div style={styles.noThumb}>
                        <Image size={16} color={theme.colors.slate[600]} />
                      </div>
                    )}
                  </td>
                  <td style={s.td}>
                    <div style={{ fontWeight: theme.typography.fontWeight.medium }}>
                      {proj.name}
                    </div>
                    <div
                      style={{
                        fontSize: theme.typography.fontSize.xs,
                        color: theme.colors.slate[500],
                      }}
                    >
                      {proj.id}
                    </div>
                  </td>
                  <td style={s.td}>
                    <span
                      style={
                        proj.type === 'production'
                          ? s.badge(theme.colors.teal[400])
                          : s.badge(theme.colors.blue[400])
                      }
                    >
                      {proj.type === 'production' ? 'Production' : 'Concept'}
                    </span>
                  </td>
                  <td style={s.td}>
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
                  <td style={s.td}>
                    <div
                      style={{
                        ...s.colorSwatch(proj.color_accent?.primary ?? '#14b8a6'),
                        width: '1.5rem',
                        height: '1.5rem',
                      }}
                      title={proj.color_accent?.primary}
                    />
                  </td>
                  <td style={s.td}>
                    {proj.is_flagship ? (
                      <span style={s.badge('#f59e0b')}>⭐ Flagship</span>
                    ) : (
                      <span style={s.badgeDraft}>Standard</span>
                    )}
                  </td>
                  <td style={{ ...s.td, textAlign: 'right' }}>
                    <div style={styles.actionRow}>
                      <button
                        type="button"
                        style={{ ...s.btnGhost, ...s.btnSmall }}
                        onClick={() => setEditing(proj)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        style={{ ...s.btnDanger, ...s.btnSmall }}
                        onClick={() => handleDelete(proj.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
