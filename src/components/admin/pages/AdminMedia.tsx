/**
 * AdminMedia
 * Media browser — shows all project preview images from the storage bucket.
 * Responsive: mobile, FHD, 4K/5K.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Trash2, ExternalLink, RefreshCw, FolderOpen } from 'lucide-react';
import theme from '../../../styles/theme';
import { useWindowSize } from '../../../hooks/useWindowSize';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
import type { AdminResponsive } from '../admin.styles';
import supabase from '../../../lib/supabaseClient';

interface MediaItem {
  projectId: string;
  name: string;
  path: string;
  publicUrl: string;
  size: number;
  createdAt: string;
}

const BUCKET = 'portfolio_screenshots';

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AdminMedia() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isMobile, is4K } = useWindowSize();
  const r: AdminResponsive = { isMobile, is4K };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data: folders, error: fError } = await supabase.storage
        .from(BUCKET)
        .list('', { limit: 500, sortBy: { column: 'name', order: 'asc' } });

      if (fError) throw fError;

      const allItems: MediaItem[] = [];

      for (const folder of folders ?? []) {
        if (!folder.id && folder.name) {
          const { data: files } = await supabase.storage
            .from(BUCKET)
            .list(folder.name, { limit: 50 });

          for (const file of files ?? []) {
            if (!file.name || file.name === '.emptyFolderPlaceholder') continue;
            const path = `${folder.name}/${file.name}`;
            const { data: urlData } = supabase.storage
              .from(BUCKET)
              .getPublicUrl(path);
            allItems.push({
              projectId: folder.name,
              name: file.name,
              path,
              publicUrl: urlData.publicUrl,
              size: (file.metadata as Record<string, number>)?.size ?? 0,
              createdAt: file.created_at ?? '',
            });
          }
        }
      }

      setItems(allItems);
    } catch (err) {
      console.error('Media load error', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Supprimer ${item.name} ?`)) return;
    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([item.path]);
    if (error) {
      alert('Erreur : ' + error.message);
      return;
    }

    await supabase
      .from('projects_portfolio')
      .update({ preview_url: null })
      .eq('id', item.projectId);

    await load();
  };

  const baseFontSize = is4K ? theme.typography.fontSize.base : theme.typography.fontSize.sm;
  const smallFontSize = is4K ? theme.typography.fontSize.sm : theme.typography.fontSize.xs;

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile
      ? 'repeat(auto-fill, minmax(160px, 1fr))'
      : is4K
        ? 'repeat(auto-fill, minmax(360px, 1fr))'
        : 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: is4K ? theme.spacing[7] : theme.spacing[5],
  };

  return (
    <AdminLayout title="Médias">
      <div style={s.pageHeaderR(r)}>
        <div style={s.pageTitleR(r)}>Bibliothèque média</div>
        <button type="button" style={s.btnGhostR(r)} onClick={load}>
          <RefreshCw size={is4K ? 20 : 16} />
          Rafraîchir
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanelR(r)}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : items.length === 0 ? (
        <div style={s.emptyStateR(r)}>
          <FolderOpen size={is4K ? 52 : 40} />
          <div>Aucun fichier média</div>
          <p style={{ color: theme.colors.slate[500], fontSize: baseFontSize }}>
            Uploadez des images depuis la page Projets
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {items.map((item) => (
            <div key={item.path} style={{
              ...s.glassPanelR(r),
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={styles.imgWrap}>
                <img src={item.publicUrl} alt={item.name} style={styles.img} />
              </div>
              <div style={{
                padding: `${is4K ? theme.spacing[5] : theme.spacing[4]} ${is4K ? theme.spacing[6] : theme.spacing[5]}`,
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[1],
                flex: 1,
              }}>
                <div style={{ fontSize: smallFontSize, color: theme.colors.teal[400], fontWeight: theme.typography.fontWeight.medium }}>{item.projectId}</div>
                <div style={{ fontSize: baseFontSize, color: theme.colors.white, wordBreak: 'break-all' }}>{item.name}</div>
                <div style={{ fontSize: smallFontSize, color: theme.colors.slate[500] }}>
                  {formatBytes(item.size)}
                  {item.createdAt &&
                    ` · ${new Date(item.createdAt).toLocaleDateString('fr-FR')}`}
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: theme.spacing[2],
                padding: `${theme.spacing[3]} ${is4K ? theme.spacing[6] : theme.spacing[5]}`,
                borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.3)}`,
              }}>
                <a
                  href={item.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...s.btnGhostR(r), ...s.btnSmallR(r), textDecoration: 'none' }}
                >
                  <ExternalLink size={is4K ? 18 : 14} />
                </a>
                <button
                  type="button"
                  style={{ ...s.btnDangerR(r), ...s.btnSmallR(r) }}
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 size={is4K ? 18 : 14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

// =============================================================================
// Local styles
// =============================================================================
const styles: Record<string, CSSProperties> = {
  imgWrap: {
    width: '100%',
    aspectRatio: '16/9',
    background: theme.hexToRgba(theme.colors.slate[800], 0.5),
    display: 'grid',
    placeItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default AdminMedia;
