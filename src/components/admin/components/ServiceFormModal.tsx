/**
 * ServiceFormModal
 * Modal for creating / editing a service.
 * Responsive: mobile, FHD, 4K/5K.
 */

import { useState, type CSSProperties } from 'react';
import {
  X,
  Palette,
  Store,
  BarChart3,
  Globe,
  Code,
  Smartphone,
  Shield,
  Zap,
  Layers,
  PenTool,
  type LucideIcon,
} from 'lucide-react';
import theme from '../../../styles/theme';
import { useWindowSize } from '../../../hooks/useWindowSize';
import * as s from '../admin.styles';
import type { AdminResponsive } from '../admin.styles';
import type { DbService } from '../../../services/adminService';

// =============================================================================
// PREDEFINED OPTIONS
// =============================================================================
const ICON_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: 'Palette', icon: Palette },
  { name: 'Store', icon: Store },
  { name: 'BarChart3', icon: BarChart3 },
  { name: 'Globe', icon: Globe },
  { name: 'Code', icon: Code },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'Shield', icon: Shield },
  { name: 'Zap', icon: Zap },
  { name: 'Layers', icon: Layers },
  { name: 'PenTool', icon: PenTool },
];

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

// =============================================================================
// COLOR HELPERS
// =============================================================================
const parseRgb = (value: string): { r: number; g: number; b: number } | null => {
  const match = value.replace(/\s+/g, '').match(/rgba?\((\d+),(\d+),(\d+)(?:,[\d.]+)?\)/i);
  if (!match) return null;
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) };
};

const toHex = (value: string | null | undefined): string => {
  if (!value) return '';
  if (value.startsWith('#')) return value;
  const rgb = parseRgb(value);
  if (!rgb) return value;
  const toHexPart = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHexPart(rgb.r)}${toHexPart(rgb.g)}${toHexPart(rgb.b)}`;
};

const toRgba = (value: string, alpha = 0.15): string => {
  if (!value) return value;
  if (value.startsWith('rgb')) {
    const rgb = parseRgb(value);
    if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
  if (value.startsWith('#')) {
    const hex = value.replace('#', '');
    const full = hex.length === 3
      ? hex.split('').map((c) => c + c).join('')
      : hex;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return value;
};

// =============================================================================
// COMPONENT
// =============================================================================
interface ServiceFormModalProps {
  initial?: DbService | null;
  onSave: (payload: Partial<DbService>) => Promise<void>;
  onClose: () => void;
}

function ServiceFormModal({ initial, onSave, onClose }: ServiceFormModalProps) {
  const [accroche, setAccroche] = useState(initial?.accroche ?? '');
  const [tagline, setTagline] = useState(initial?.tagline ?? '');
  const [resume, setResume] = useState(initial?.resume ?? '');
  const [featuresRaw, setFeaturesRaw] = useState(
    (initial?.features ?? []).join(', ')
  );
  const [iconName, setIconName] = useState(initial?.icon_name ?? '');
  const [glowColor, setGlowColor] = useState(
    toHex(initial?.glow_color) || '#14b8a6'
  );
  const [accentColor, setAccentColor] = useState<string>(
    initial?.color_accent?.['500'] ?? '#14b8a6'
  );
  const [redirectUrl, setRedirectUrl] = useState(initial?.redirect_url ?? '');
  const [position, setPosition] = useState(initial?.position ?? 0);
  const [isPublic, setIsPublic] = useState(initial?.is_public ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isMobile, is4K } = useWindowSize();
  const r: AdminResponsive = { isMobile, is4K };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const features = featuresRaw
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean);

      // Build a minimal color_accent palette from the picked accent color
      const colorAccent: Record<string, string> = { '500': accentColor };

      await onSave({
        accroche,
        tagline: tagline || null,
        resume: resume || null,
        features,
        icon_name: iconName || null,
        glow_color: glowColor ? toRgba(glowColor, 0.15) : null,
        color_accent: colorAccent,
        redirect_url: redirectUrl || null,
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
        style={{ ...s.modalContentR(r), maxWidth: is4K ? '900px' : '680px' }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div style={s.modalHeader}>
          <div style={s.modalTitleR(r)}>
            {initial ? 'Modifier le service' : 'Nouveau service'}
          </div>
          <button type="button" onClick={onClose} style={localStyles.closeBtn}>
            <X size={is4K ? 22 : 18} />
          </button>
        </div>

        {/* Accroche */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Accroche *</label>
          <input
            style={s.formInputR(r)}
            value={accroche}
            onChange={(e) => setAccroche(e.target.value)}
            required
            placeholder="Site Vitrine"
          />
        </div>

        {/* Tagline */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Tagline</label>
          <input
            style={s.formInputR(r)}
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Courte phrase d'accroche"
          />
        </div>

        {/* Résumé */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Résumé</label>
          <textarea
            style={s.formTextareaR(r)}
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Description détaillée du service…"
          />
        </div>

        {/* Features */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Features (séparées par des virgules)</label>
          <input
            style={s.formInputR(r)}
            value={featuresRaw}
            onChange={(e) => setFeaturesRaw(e.target.value)}
            placeholder="Design personnalisé, Optimisation SEO, Performance"
          />
        </div>

        {/* Icône — grille visuelle */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Icône</label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : is4K ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)',
            gap: theme.spacing[2],
          }}>
            {ICON_OPTIONS.map((opt) => {
              const isSelected = iconName === opt.name;
              return (
                <button
                  key={opt.name}
                  type="button"
                  onClick={() => setIconName(opt.name)}
                  title={opt.name}
                  style={{
                    ...localStyles.iconBtn,
                    ...(isSelected ? localStyles.iconBtnActive : {}),
                  }}
                >
                  <opt.icon size={20} />
                  <span style={localStyles.iconLabel}>{opt.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color Accent — picker */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Couleur d'accent</label>
          <div style={localStyles.colorRow}>
            {DEFAULT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setAccentColor(c)}
                style={{
                  ...s.colorSwatch(c),
                  outline: accentColor === c ? `2px solid ${theme.colors.white}` : 'none',
                  outlineOffset: '2px',
                }}
              />
            ))}
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              style={localStyles.colorPicker}
              title="Couleur personnalisée"
            />
            <button
              type="button"
              style={{ ...s.btnGhostR(r), ...s.btnSmallR(r) }}
              onClick={() => setAccentColor('#14b8a6')}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Glow Color — picker */}
        <div style={s.formGroup}>
          <label style={s.formLabelR(r)}>Couleur de glow</label>
          <div style={localStyles.colorRow}>
            {DEFAULT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setGlowColor(c)}
                style={{
                  ...s.colorSwatch(c),
                  outline: glowColor === c ? `2px solid ${theme.colors.white}` : 'none',
                  outlineOffset: '2px',
                }}
              />
            ))}
            <input
              type="color"
              value={glowColor}
              onChange={(e) => setGlowColor(e.target.value)}
              style={localStyles.colorPicker}
              title="Couleur personnalisée"
            />
            <button
              type="button"
              style={{ ...s.btnGhostR(r), ...s.btnSmallR(r) }}
              onClick={() => setGlowColor('none')}
            >
              Réinitialiser
            </button>
          </div>
        </div>

        {/* Position + Redirect URL */}
        <div style={s.grid2R(r)}>
          <div style={s.formGroup}>
            <label style={s.formLabelR(r)}>Position</label>
            <input
              style={s.formInputR(r)}
              type="number"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
            />
          </div>
          <div style={s.formGroup}>
            <label style={s.formLabelR(r)}>URL de redirection</label>
            <input
              style={s.formInputR(r)}
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              placeholder="/services/site-vitrine"
            />
          </div>
        </div>

        {/* Publier */}
        <label style={localStyles.checkboxRow}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span style={{ color: theme.colors.slate[200], fontSize: is4K ? theme.typography.fontSize.lg : theme.typography.fontSize.sm }}>
            Publier (visible sur le site)
          </span>
        </label>

        {error && <div style={localStyles.errorMsg}>{error}</div>}

        <div style={localStyles.actions}>
          <button type="button" onClick={onClose} style={s.btnGhostR(r)}>
            Annuler
          </button>
          <button type="submit" style={s.btnPrimaryR(r)} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
}

// =============================================================================
// STYLES
// =============================================================================
const localStyles: Record<string, CSSProperties> = {
  closeBtn: {
    background: 'transparent',
    border: 'none',
    color: theme.colors.slate[400],
    cursor: 'pointer',
  },
  iconBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing[1],
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius.lg,
    border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
    background: theme.hexToRgba(theme.colors.slate[800], 0.4),
    color: theme.colors.slate[300],
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  iconBtnActive: {
    borderColor: theme.colors.teal[400],
    background: theme.hexToRgba(theme.colors.teal[500], 0.15),
    color: theme.colors.teal[300],
  },
  iconLabel: {
    fontSize: '0.6rem',
    opacity: 0.7,
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
