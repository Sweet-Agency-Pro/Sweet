/**
 * ServiceFormModal
 * Modal for creating / editing a service.
 */

import { useState, type CSSProperties } from 'react';
import { X } from 'lucide-react';
import theme from '../../../styles/theme';
import * as s from '../admin.styles';
import type { DbService } from '../../../services/adminService';

interface ServiceFormModalProps {
  initial?: DbService | null;
  onSave: (payload: Partial<DbService>) => Promise<void>;
  onClose: () => void;
}

function ServiceFormModal({ initial, onSave, onClose }: ServiceFormModalProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [iconName, setIconName] = useState(initial?.icon_name ?? '');
  const [ctaLabel, setCtaLabel] = useState(initial?.cta_label ?? '');
  const [ctaUrl, setCtaUrl] = useState(initial?.cta_url ?? '');
  const [position, setPosition] = useState(initial?.position ?? 0);
  const [isPublic, setIsPublic] = useState(initial?.is_public ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave({
        title,
        description: description || null,
        icon_name: iconName || null,
        cta_label: ctaLabel || null,
        cta_url: ctaUrl || null,
        position,
        is_public: isPublic,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <form
        style={s.modalContent}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div style={s.modalHeader}>
          <div style={s.modalTitle}>
            {initial ? 'Modifier le service' : 'Nouveau service'}
          </div>
          <button type="button" onClick={onClose} style={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        <div style={s.formGroup}>
          <label style={s.formLabel}>Titre *</label>
          <input
            style={s.formInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Site Vitrine"
          />
        </div>

        <div style={s.formGroup}>
          <label style={s.formLabel}>Description</label>
          <textarea
            style={s.formTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez le service…"
          />
        </div>

        <div style={s.grid2}>
          <div style={s.formGroup}>
            <label style={s.formLabel}>Icône (nom lucide)</label>
            <input
              style={s.formInput}
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              placeholder="Palette"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.formLabel}>Position</label>
            <input
              style={s.formInput}
              type="number"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
            />
          </div>
        </div>

        <div style={s.grid2}>
          <div style={s.formGroup}>
            <label style={s.formLabel}>CTA Label</label>
            <input
              style={s.formInput}
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              placeholder="En savoir plus"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.formLabel}>CTA URL</label>
            <input
              style={s.formInput}
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              placeholder="#contact"
            />
          </div>
        </div>

        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span style={{ color: theme.colors.slate[200], fontSize: theme.typography.fontSize.sm }}>
            Publier (visible sur le site)
          </span>
        </label>

        {error && <div style={styles.errorMsg}>{error}</div>}

        <div style={styles.actions}>
          <button type="button" onClick={onClose} style={s.btnGhost}>
            Annuler
          </button>
          <button type="submit" style={s.btnPrimary} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[400],
    cursor: 'pointer',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing[3],
    cursor: 'pointer',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing[3],
    marginTop: theme.spacing[2],
  },
  errorMsg: {
    color: '#f87171',
    fontSize: theme.typography.fontSize.sm,
  },
};

export default ServiceFormModal;
