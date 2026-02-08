/**
 * AdminMedia
 * Media browser — shows all project preview images from the storage bucket.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Trash2, ExternalLink, RefreshCw, FolderOpen } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import * as s from '../admin.styles';
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

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // list all top-level folders (= project ids)
      const { data: folders, error: fError } = await supabase.storage
        .from(BUCKET)
        .list('', { limit: 500, sortBy: { column: 'name', order: 'asc' } });

      if (fError) throw fError;

      const allItems: MediaItem[] = [];

      for (const folder of folders ?? []) {
        if (!folder.id && folder.name) {
          // it's a folder
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

    // also clear preview_url on the project
    await supabase
      .from('projects_portfolio')
      .update({ preview_url: null })
      .eq('id', item.projectId);

    await load();
  };

  return (
    <AdminLayout title="Médias">
      <div style={s.pageHeader}>
        <div style={s.pageTitle}>Bibliothèque média</div>
        <button type="button" style={s.btnGhost} onClick={load}>
          <RefreshCw size={16} />
          Rafraîchir
        </button>
      </div>

      {loading ? (
        <div style={s.glassPanel}>
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : items.length === 0 ? (
        <div style={s.emptyState}>
          <FolderOpen size={40} />
          <div>Aucun fichier média</div>
          <p style={{ color: theme.colors.slate[500], fontSize: theme.typography.fontSize.sm }}>
            Uploadez des images depuis la page Projets
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item.path} style={styles.card}>
              <div style={styles.imgWrap}>
                <img src={item.publicUrl} alt={item.name} style={styles.img} />
              </div>
              <div style={styles.info}>
                <div style={styles.projectId}>{item.projectId}</div>
                <div style={styles.fileName}>{item.name}</div>
                <div style={styles.meta}>
                  {formatBytes(item.size)}
                  {item.createdAt &&
                    ` · ${new Date(item.createdAt).toLocaleDateString('fr-FR')}`}
                </div>
              </div>
              <div style={styles.actions}>
                <a
                  href={item.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...s.btnGhost, ...s.btnSmall, textDecoration: 'none' }}
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  style={{ ...s.btnDanger, ...s.btnSmall }}
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 size={14} />
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: theme.spacing[5],
  },
  card: {
    ...s.glassPanel,
    padding: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
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
  info: {
    padding: `${theme.spacing[4]} ${theme.spacing[5]}`,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[1],
    flex: 1,
  },
  projectId: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.teal[400],
    fontWeight: theme.typography.fontWeight.medium,
  },
  fileName: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.white,
    wordBreak: 'break-all',
  },
  meta: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.slate[500],
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing[2],
    padding: `${theme.spacing[3]} ${theme.spacing[5]}`,
    borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.3)}`,
  },
};

export default AdminMedia;
