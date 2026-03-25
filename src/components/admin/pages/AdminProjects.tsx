/**
 * AdminProjects
 * CRUD page for portfolio projects with preview upload.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import '../admin.css';
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
    if (!window.confirm('Supprimer ce projet ?')) return;
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
      <div className="admin-page-header">
        <div className="admin-page-title">Portfolio</div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => setCreating(true)}
        >
          <Plus size={16} />
          Nouveau projet
        </button>
      </div>

      {loading ? (
        <div className="admin-glass-panel">
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-empty-state">
          <div>Aucun projet</div>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={() => setCreating(true)}
          >
            <Plus size={16} />
            Créer un premier projet
          </button>
        </div>
      ) : (
        <div className="admin-glass-panel">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-head">
                  <th className="admin-th hidden-mobile">Preview</th>
                  <th className="admin-th">Nom</th>
                  <th className="admin-th">Type</th>
                  <th className="admin-th hidden-mobile">Tech</th>
                  <th className="admin-th hidden-mobile">Couleur</th>
                  <th className="admin-th">Statut</th>
                  <th className="admin-th" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj.id}>
                    <td className="admin-td hidden-mobile">
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
                    <td className="admin-td">
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
                    <td className="admin-td">
                      <span
                        className={`admin-badge ${proj.type === 'production' ? 'admin-badge--public' : 'admin-badge--draft'}`}
                      >
                        {proj.type === 'production' ? 'Production' : 'Concept'}
                      </span>
                    </td>
                    <td className="admin-td hidden-mobile">
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
                    <td className="admin-td hidden-mobile">
                      <div
                        className="admin-color-swatch"
                        style={{
                          backgroundColor: proj.color_accent?.primary ?? '#14b8a6',
                          width: '1.5rem',
                          height: '1.5rem',
                        }}
                        title={proj.color_accent?.primary}
                      />
                    </td>
                    <td className="admin-td">
                      {proj.is_flagship ? (
                        <span className="admin-badge admin-badge--new">⭐ Flagship</span>
                      ) : (
                        <span className="admin-badge admin-badge--draft">Standard</span>
                      )}
                    </td>
                    <td className="admin-td" style={{ textAlign: 'right' }}>
                      <div style={styles.actionRow}>
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost admin-btn--small"
                          onClick={() => setEditing(proj)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--danger admin-btn--small"
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
