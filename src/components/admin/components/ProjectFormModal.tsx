/**
 * ProjectFormModal
 * Modal for creating / editing a project — aligned with the real DB schema.
 *
 * Real DB columns:
 *   id, name, hook, story, benefit, tech (text[]), type ('production' | 'concept'),
 *   color_accent (jsonb {primary,secondary,gradient,light}), is_flagship (bool),
 *   preview_url, created_at
 */

import { useRef, useState, type CSSProperties } from 'react';
import { X, Upload, ImageIcon } from 'lucide-react';
import theme from '../../../styles/theme';
import * as s from '../admin.styles';
import type { DbProject } from '../../../services/adminService';

const DEFAULT_COLORS = [
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#a855f7', // purple
  '#f59e0b', // amber
  '#ef4444', // red
  '#22c55e', // green
  '#ec4899', // pink
];

interface ProjectFormModalProps {
  initial?: DbProject | null;
  onSave: (payload: Partial<DbProject>, file?: File | null, deleteOldPreview?: boolean) => Promise<void>;
  onClose: () => void;
}

function ProjectFormModal({ initial, onSave, onClose }: ProjectFormModalProps) {
  const [id, setId] = useState(initial?.id ?? '');
  const [name, setName] = useState(initial?.name ?? '');
  const [hook, setHook] = useState(initial?.hook ?? '');
  const [story, setStory] = useState(initial?.story ?? '');
  const [benefit, setBenefit] = useState(initial?.benefit ?? '');
  const [tech, setTech] = useState(initial?.tech?.join(', ') ?? '');
  const [type, setType] = useState<'production' | 'concept'>(initial?.type ?? 'concept');
  const [primaryColor, setPrimaryColor] = useState(initial?.color_accent?.primary ?? '#14b8a6');
  const [secondaryColor, setSecondaryColor] = useState(initial?.color_accent?.secondary ?? '');
  const [isFlagship, setIsFlagship] = useState(initial?.is_flagship ?? false);

  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewLocal, setPreviewLocal] = useState<string | null>(null);
  const [existingPreview, setExistingPreview] = useState(initial?.preview_url ?? null);
  const [deleteOld, setDeleteOld] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreviewFile(file);
    setPreviewLocal(URL.createObjectURL(file));
    setDeleteOld(true);
  };

  const handleRemovePreview = () => {
    setPreviewFile(null);
    setPreviewLocal(null);
    setExistingPreview(null);
    setDeleteOld(true);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const colorAccent: DbProject['color_accent'] = { primary: primaryColor };
      if (secondaryColor) colorAccent.secondary = secondaryColor;

      await onSave(
        {
          ...(initial ? {} : { id }),
          name,
          hook: hook || null,
          story: story || null,
          benefit: benefit || null,
          tech: tech
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          type,
          color_accent: colorAccent,
          is_flagship: isFlagship,
        },
        previewFile,
        deleteOld
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setSaving(false);
    }
  };

  const displayedPreview = previewLocal ?? existingPreview;

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <form
        style={{ ...s.modalContent, maxWidth: '680px' }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div style={s.modalHeader}>
          <div style={s.modalTitle}>
            {initial ? 'Modifier le projet' : 'Nouveau projet'}
          </div>
          <button type="button" onClick={onClose} style={styles.closeBtn}>
            <X size={18} />
          </button>
        </div>

        {/* ID + Name */}
        <div style={s.grid2}>
          <div style={s.formGroup}>
            <label style={s.formLabel}>ID (slug) *</label>
            <input
              style={s.formInput}
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              disabled={!!initial}
              placeholder="mon-projet"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.formLabel}>Nom *</label>
            <input
              style={s.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Mon Projet"
            />
          </div>
        </div>

        {/* Hook (accroche) */}
        <div style={s.formGroup}>
          <label style={s.formLabel}>Accroche (hook)</label>
          <input
            style={s.formInput}
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="Phrase d'accroche courte…"
          />
        </div>

        {/* Story */}
        <div style={s.formGroup}>
          <label style={s.formLabel}>Story</label>
          <textarea
            style={s.formTextarea}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="L'histoire du projet…"
          />
        </div>

        {/* Benefit */}
        <div style={s.formGroup}>
          <label style={s.formLabel}>Bénéfice</label>
          <textarea
            style={{ ...s.formTextarea, minHeight: '5rem' }}
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
            placeholder="Le bénéfice principal…"
          />
        </div>

        {/* Tech + Type */}
        <div style={s.grid2}>
          <div style={s.formGroup}>
            <label style={s.formLabel}>Technologies (séparées par ,)</label>
            <input
              style={s.formInput}
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              placeholder="React, TypeScript, Supabase"
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.formLabel}>Type</label>
            <select
              style={s.formSelect}
              value={type}
              onChange={(e) => setType(e.target.value as 'production' | 'concept')}
            >
              <option value="production">Production</option>
              <option value="concept">Concept</option>
            </select>
          </div>
        </div>

        {/* Color Accent */}
        <div style={s.formGroup}>
          <label style={s.formLabel}>Couleur primaire</label>
          <div style={styles.colorRow}>
            {DEFAULT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setPrimaryColor(c)}
                style={{
                  ...s.colorSwatch(c),
                  outline:
                    primaryColor === c
                      ? `2px solid ${theme.colors.white}`
                      : 'none',
                  outlineOffset: '2px',
                }}
              />
            ))}
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              style={styles.colorPicker}
              title="Couleur personnalisée"
            />
          </div>
        </div>

        <div style={s.formGroup}>
          <label style={s.formLabel}>Couleur secondaire (optionnel)</label>
          <div style={styles.colorRow}>
            <input
              type="color"
              value={secondaryColor || '#000000'}
              onChange={(e) => setSecondaryColor(e.target.value)}
              style={styles.colorPicker}
              title="Couleur secondaire"
            />
            {secondaryColor && (
              <button
                type="button"
                style={{ ...s.btnGhost, ...s.btnSmall }}
                onClick={() => setSecondaryColor('')}
              >
                <X size={12} /> Retirer
              </button>
            )}
          </div>
        </div>

        {/* Preview Image */}
        <div style={s.formGroup}>
          <label style={s.formLabel}>Image preview</label>
          {displayedPreview ? (
            <div style={s.imagePreview}>
              <img src={displayedPreview} alt="preview" style={s.imagePreviewImg} />
              <button
                type="button"
                onClick={handleRemovePreview}
                style={s.imageDeleteBtn}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={styles.uploadArea}
            >
              <ImageIcon size={28} color={theme.colors.slate[500]} />
              <span>Cliquer pour uploader une image</span>
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {displayedPreview && (
            <button
              type="button"
              style={{ ...s.btnGhost, ...s.btnSmall, marginTop: theme.spacing[2] }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={14} />
              Remplacer l'image
            </button>
          )}
        </div>

        {/* Flagship */}
        <label style={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={isFlagship}
            onChange={(e) => setIsFlagship(e.target.checked)}
          />
          <span style={{ color: theme.colors.slate[200], fontSize: theme.typography.fontSize.sm }}>
            Projet phare (flagship — mis en avant sur le site)
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
  colorRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing[2],
    alignItems: 'center',
  },
  colorPicker: {
    width: '2rem',
    height: '2rem',
    padding: 0,
    border: 'none',
    borderRadius: theme.borderRadius.lg,
    cursor: 'pointer',
    background: 'transparent',
  },
  uploadArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing[2],
    padding: theme.spacing[8],
    borderRadius: theme.borderRadius.xl,
    border: `2px dashed ${theme.hexToRgba(theme.colors.slate[600], 0.5)}`,
    background: theme.hexToRgba(theme.colors.slate[800], 0.3),
    color: theme.colors.slate[400],
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
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

export default ProjectFormModal;
