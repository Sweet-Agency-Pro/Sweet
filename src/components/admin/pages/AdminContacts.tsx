/**
 * AdminContacts
 * Inbox view for contact messages with status management.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import {
  Trash2,
  Mail,
  MailOpen,
  MessageSquareReply,
  Archive,
  ChevronDown,
  ChevronUp,
  Inbox,
} from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import '../admin.css';
import {
  fetchContacts,
  updateContactStatus,
  deleteContact,
  type DbContact,
} from '../../../services/adminService';

const STATUS_OPTIONS = [
  { value: 'new', label: 'Nouveau', color: '#f59e0b', icon: Mail },
  { value: 'read', label: 'Lu', color: theme.colors.blue[400], icon: MailOpen },
  { value: 'replied', label: 'Répondu', color: theme.colors.teal[400], icon: MessageSquareReply },
  { value: 'archived', label: 'Archivé', color: theme.colors.slate[500], icon: Archive },
] as const;

function statusMeta(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function AdminContacts() {
  const [contacts, setContacts] = useState<DbContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setContacts(await fetchContacts());
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (id: string, status: string) => {
    await updateContactStatus(id, status);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    await deleteContact(id);
    await load();
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const filtered =
    filterStatus === 'all'
      ? contacts
      : contacts.filter((c) => c.status === filterStatus);

  return (
    <AdminLayout title="Messages">
      <div className="admin-page-header">
        <div className="admin-page-title">Boîte de réception</div>

        {/* Status filter */}
        <div style={{
          display: 'flex',
          gap: theme.spacing[2],
          flexWrap: 'wrap',
        }}>
          <button
            type="button"
            style={filterStatus === 'all' ? styles.filterActive : styles.filter}
            onClick={() => setFilterStatus('all')}
          >
            Tous ({contacts.length})
          </button>
          {STATUS_OPTIONS.map((opt) => {
            const count = contacts.filter((c) => c.status === opt.value).length;
            return (
              <button
                key={opt.value}
                type="button"
                style={
                  filterStatus === opt.value
                    ? { ...styles.filterActive, color: opt.color }
                    : styles.filter
                }
                onClick={() => setFilterStatus(opt.value)}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="admin-glass-panel">
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <Inbox className="w-10 h-10" />
          <div>Aucun message</div>
        </div>
      ) : (
        <div style={styles.list}>
          {filtered.map((msg) => {
            const meta = statusMeta(msg.status);
            const isOpen = expanded === msg.id;
            const StatusIcon = meta.icon;

            return (
              <div key={msg.id} className="admin-glass-panel" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[3],
                transition: `border-color ${theme.transitions.duration.fast}`,
              }}>
                {/* Header row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  className="contact-card-header"
                  onClick={() => toggleExpand(msg.id)}
                >
                  <div style={styles.cardLeft}>
                    <StatusIcon size={18} color={meta.color} />
                    <div>
                      <div style={styles.cardName}>{msg.name}</div>
                      <div style={styles.cardEmail}>{msg.email}</div>
                    </div>
                  </div>
                  <div style={styles.cardRight}>
                    <span className={`admin-badge admin-badge--${meta.value}`}>{meta.label}</span>
                    <span style={styles.cardDate} className="hidden-mobile">{formatDate(msg.created_at)}</span>
                    {isOpen ? (
                      <ChevronUp size={16} color={theme.colors.slate[400]} />
                    ) : (
                      <ChevronDown size={16} color={theme.colors.slate[400]} />
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div style={{
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.slate[200],
                }}>{msg.subject}</div>

                {/* Expanded body */}
                {isOpen && (
                  <div style={styles.cardBody}>
                    {msg.phone && (
                      <div style={{ color: theme.colors.slate[300] }}>
                        Tél : {msg.phone}
                      </div>
                    )}
                    <div style={{
                      color: theme.colors.slate[200],
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                    }}>{msg.message}</div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing[3],
                    }}>
                      <select
                        className="admin-form-select"
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg.id, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="admin-btn admin-btn--danger"
                        onClick={() => handleDelete(msg.id)}
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

// =============================================================================
// Local styles
// =============================================================================
const styles: Record<string, CSSProperties> = {
  filter: {
    padding: `${theme.spacing[1.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.full,
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.35)}`,
    background: 'transparent',
    color: theme.colors.slate[400],
    fontSize: theme.typography.fontSize.xs,
    cursor: 'pointer',
  },
  filterActive: {
    padding: `${theme.spacing[1.5]} ${theme.spacing[4]}`,
    borderRadius: theme.borderRadius.full,
    border: `1px solid ${theme.hexToRgba(theme.colors.teal[500], 0.5)}`,
    background: theme.hexToRgba(theme.colors.teal[500], 0.1),
    color: theme.colors.teal[300],
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[3],
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  cardRight: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
  },
  cardName: {
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
  },
  cardEmail: {
    color: theme.colors.slate[400],
    fontSize: theme.typography.fontSize.xs,
  },
  cardDate: {
    color: theme.colors.slate[500],
    fontSize: theme.typography.fontSize.xs,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[4],
    paddingTop: theme.spacing[3],
    borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
  },
};

export default AdminContacts;
