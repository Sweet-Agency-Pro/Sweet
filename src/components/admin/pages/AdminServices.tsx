/**
 * AdminServices
 * CRUD page for managing services.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import '../admin.css';
import ServiceFormModal from '../components/ServiceFormModal';
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  type DbService,
} from '../../../services/adminService';

function AdminServices() {
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<DbService | null>(null);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchServices();
      setServices(data);
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (payload: Partial<DbService>) => {
    const maxId = services.length > 0 ? Math.max(...services.map(s => parseInt(s.id))) : 0;
    const newId = (maxId + 1).toString();
    await createService({ ...payload, id: newId });
    await load();
  };

  const handleUpdate = async (payload: Partial<DbService>) => {
    if (!editing) return;
    await updateService(editing.id, payload);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer ce service ?')) return;
    await deleteService(id);
    await load();
  };

  return (
    <AdminLayout title="Services">
      <div className="admin-page-header">
        <div className="admin-page-title">Gestion des services</div>
        <button
          type="button"
          className="admin-btn admin-btn--primary"
          onClick={() => setCreating(true)}
        >
          <Plus size={16} />
          Nouveau service
        </button>
      </div>

      {loading ? (
        <div className="admin-glass-panel">
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : services.length === 0 ? (
        <div className="admin-empty-state">
          <div>Aucun service</div>
          <button
            type="button"
            className="admin-btn admin-btn--primary"
            onClick={() => setCreating(true)}
          >
            <Plus size={16} />
            Créer un premier service
          </button>
        </div>
      ) : (
        <div className="admin-glass-panel">
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-head">
                  <th className="admin-th">Accroche</th>
                  <th className="admin-th">Tagline</th>
                  <th className="admin-th hidden-mobile">Icône</th>
                  <th className="admin-th">Position</th>
                  <th className="admin-th">Statut</th>
                  <th className="admin-th" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id}>
                    <td className="admin-td">{svc.accroche}</td>
                    <td className="admin-td">
                      <span style={{ color: theme.colors.slate[400] }}>
                        {svc.tagline || '—'}
                      </span>
                    </td>
                    <td className="admin-td hidden-mobile">
                      <span style={{ color: theme.colors.slate[400] }}>
                        {svc.icon_name || '—'}
                      </span>
                    </td>
                    <td className="admin-td">{svc.position}</td>
                    <td className="admin-td">
                      <span className={`admin-badge ${svc.is_public ? 'admin-badge--public' : 'admin-badge--draft'}`}>
                        {svc.is_public ? 'Public' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="admin-td" style={{ textAlign: 'right' }}>
                      <div style={styles.actionRow}>
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost admin-btn--small"
                          onClick={() => setEditing(svc)}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          className="admin-btn admin-btn--danger admin-btn--small"
                          onClick={() => handleDelete(svc.id)}
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
        <ServiceFormModal
          onSave={handleCreate}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <ServiceFormModal
          initial={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </AdminLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing[2],
  },
};

export default AdminServices;
