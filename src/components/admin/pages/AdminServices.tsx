/**
 * AdminServices
 * CRUD page for managing services.
 * Responsive: mobile (horizontal scroll table), FHD, 4K/5K.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import theme from '../../../styles/theme';
import { useWindowSize } from '../../../hooks/useWindowSize';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
import type { AdminResponsive } from '../admin.styles';
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
  const { isMobile, is4K } = useWindowSize();
  const r: AdminResponsive = { isMobile, is4K };

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
    if (!confirm('Supprimer ce service ?')) return;
    await deleteService(id);
    await load();
  };

  return (
    <AdminLayout title="Services">
      <div style={s.pageHeaderR(r)}>
        <div style={s.pageTitleR(r)}>Gestion des services</div>
        <button
          type="button"
          style={s.btnPrimaryR(r)}
          onClick={() => setCreating(true)}
        >
          <Plus size={is4K ? 20 : 16} />
          Nouveau service
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanelR(r)}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : services.length === 0 ? (
        <div style={s.emptyStateR(r)}>
          <div>Aucun service</div>
          <button
            type="button"
            style={s.btnPrimaryR(r)}
            onClick={() => setCreating(true)}
          >
            <Plus size={is4K ? 20 : 16} />
            Créer un premier service
          </button>
        </div>
      ) : (
        <div style={s.glassPanelR(r)}>
          <div style={s.tableWrap(r)}>
            <table style={s.tableR(r)}>
              <thead>
                <tr style={s.tableHead}>
                  <th style={s.thR(r)}>Accroche</th>
                  <th style={s.thR(r)}>Tagline</th>
                  {!isMobile && <th style={s.thR(r)}>Icône</th>}
                  <th style={s.thR(r)}>Position</th>
                  <th style={s.thR(r)}>Statut</th>
                  <th style={{ ...s.thR(r), textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((svc) => (
                  <tr key={svc.id}>
                    <td style={s.tdR(r)}>{svc.accroche}</td>
                    <td style={s.tdR(r)}>
                      <span style={{ color: theme.colors.slate[400] }}>
                        {svc.tagline || '—'}
                      </span>
                    </td>
                    {!isMobile && (
                      <td style={s.tdR(r)}>
                        <span style={{ color: theme.colors.slate[400] }}>
                          {svc.icon_name || '—'}
                        </span>
                      </td>
                    )}
                    <td style={s.tdR(r)}>{svc.position}</td>
                    <td style={s.tdR(r)}>
                      <span style={svc.is_public ? s.badgePublic : s.badgeDraft}>
                        {svc.is_public ? 'Public' : 'Brouillon'}
                      </span>
                    </td>
                    <td style={{ ...s.tdR(r), textAlign: 'right' }}>
                      <div style={styles.actionRow}>
                        <button
                          type="button"
                          style={{ ...s.btnGhostR(r), ...s.btnSmallR(r) }}
                          onClick={() => setEditing(svc)}
                        >
                          <Pencil size={is4K ? 18 : 14} />
                        </button>
                        <button
                          type="button"
                          style={{ ...s.btnDangerR(r), ...s.btnSmallR(r) }}
                          onClick={() => handleDelete(svc.id)}
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
