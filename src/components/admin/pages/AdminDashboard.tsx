/**
 * AdminDashboard
 * Overview page with stat cards and recent activity.
 */

import { useEffect, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  FolderKanban,
  MessageSquare,
  Bell,
  ArrowRight,
} from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
import { fetchStats } from '../../../services/adminService';

const adminPath = import.meta.env.VITE_ADMIN_PATH || '/studio-ombre-87';

interface Stats {
  servicesCount: number;
  projectsCount: number;
  contactsCount: number;
  newContactsCount: number;
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  const cards = stats
    ? [
        {
          label: 'Services',
          value: stats.servicesCount,
          icon: Briefcase,
          color: theme.colors.teal[400],
          to: `${adminPath}/services`,
        },
        {
          label: 'Projets',
          value: stats.projectsCount,
          icon: FolderKanban,
          color: theme.colors.cyan[400],
          to: `${adminPath}/projects`,
        },
        {
          label: 'Messages',
          value: stats.contactsCount,
          icon: MessageSquare,
          color: theme.colors.blue[400],
          to: `${adminPath}/contacts`,
        },
        {
          label: 'Nouveaux',
          value: stats.newContactsCount,
          icon: Bell,
          color: '#f59e0b',
          to: `${adminPath}/contacts`,
        },
      ]
    : [];

  return (
    <AdminLayout title="Dashboard">
      {error && <div style={styles.error}>{error}</div>}

      <div style={s.grid4}>
        {stats
          ? cards.map((card) => (
              <button
                key={card.label}
                type="button"
                onClick={() => navigate(card.to)}
                style={styles.statBtn}
              >
                <div style={styles.statHeader}>
                  <card.icon size={20} color={card.color} />
                  <ArrowRight size={14} color={theme.colors.slate[500]} />
                </div>
                <div style={{ ...s.statValue, color: card.color }}>
                  {card.value}
                </div>
                <div style={s.statLabel}>{card.label}</div>
              </button>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={styles.skeleton} />
            ))}
      </div>

      <div style={s.glassPanel}>
        <div style={styles.welcomeTitle}>Bienvenue sur Sweet Admin</div>
        <p style={styles.welcomeText}>
          Gérez vos services, projets portfolio et messages de contact depuis
          cette interface. Toutes les modifications sont reflétées en temps réel
          sur le site public.
        </p>
      </div>
    </AdminLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  statBtn: {
    ...s.statCard,
    cursor: 'pointer',
    textAlign: 'left',
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.35)}`,
    transition: `all ${theme.transitions.duration.fast}`,
  },
  statHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  skeleton: {
    ...s.statCard,
    minHeight: '7rem',
    background: theme.hexToRgba(theme.colors.slate[800], 0.5),
    animation: 'pulse 1.5s infinite',
  },
  welcomeTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.white,
    marginBottom: theme.spacing[2],
  },
  welcomeText: {
    color: theme.colors.slate[300],
    lineHeight: theme.typography.lineHeight.relaxed,
    fontSize: theme.typography.fontSize.sm,
  },
  error: {
    color: '#f87171',
    background: theme.hexToRgba('#ef4444', 0.1),
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.hexToRgba('#ef4444', 0.2)}`,
  },
};

export default AdminDashboard;
