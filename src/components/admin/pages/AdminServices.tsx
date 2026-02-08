/**
 * AdminServices
 * CRUD page for managing services.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
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
    await createService(payload);
    await load();
  };

  const handleUpdate = async (payload: Partial<DbService>) => {
    if (!editing) return;
    await updateService(editing.id, payload);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce service ?')) return;
    await deleteService(id);
    await load();
  };

  return (
    <AdminLayout title="Services">
      <div style={s.pageHeader}>
        <div style={s.pageTitle}>Gestion des services</div>
        <button
          type="button"
          style={s.btnPrimary}
          onClick={() => setCreating(true)}
        >
          <Plus size={16} />
          Nouveau service
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanel}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : services.length === 0 ? (
        <div style={s.emptyState}>
          <div>Aucun service</div>
          <button
            type="button"
            style={s.btnPrimary}
            onClick={() => setCreating(true)}
          >
            <Plus size={16} />
            Créer un premier service
          </button>
        </div>
      ) : (
        <div style={s.glassPanel}>
          <table style={s.table}>
            <thead>
              <tr style={s.tableHead}>
                <th style={s.th}>Titre</th>
                <th style={s.th}>Icône</th>
                <th style={s.th}>Position</th>
                <th style={s.th}>Statut</th>
                <th style={{ ...s.th, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((svc) => (
                <tr key={svc.id}>
                  <td style={s.td}>{svc.title}</td>
                  <td style={s.td}>
                    <span style={{ color: theme.colors.slate[400] }}>
                      {svc.icon_name || '—'}
                    </span>
                  </td>
                  <td style={s.td}>{svc.position}</td>
                  <td style={s.td}>
                    <span style={svc.is_public ? s.badgePublic : s.badgeDraft}>
                      {svc.is_public ? 'Public' : 'Brouillon'}
                    </span>
                  </td>
                  <td style={{ ...s.td, textAlign: 'right' }}>
                    <div style={styles.actionRow}>
                      <button
                        type="button"
                        style={{ ...s.btnGhost, ...s.btnSmall }}
                        onClick={() => setEditing(svc)}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        style={{ ...s.btnDanger, ...s.btnSmall }}
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
