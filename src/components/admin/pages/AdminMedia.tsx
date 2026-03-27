/**
 * AdminMedia
 * Media browser, shows all project preview images from the storage bucket.
 */

import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Trash2, ExternalLink, RefreshCw, FolderOpen } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import '../admin.css';
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
    if (!window.confirm(`Supprimer ${item.name} ?`)) return;
    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([item.path]);
    if (error) {
      window.alert('Erreur : ' + error.message);
      return;
    }

    await supabase
      .from('projects_portfolio')
      .update({ preview_url: null })
      .eq('id', item.projectId);

    await load();
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: theme.spacing[5],
  };

  return (
    <AdminLayout title="Médias">
      <div className="admin-page-header">
        <div className="admin-page-title">Bibliothèque média</div>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={load}>
          <RefreshCw size={16} />
          Rafraîchir
        </button>
      </div>

      {loading ? (
        <div className="admin-glass-panel">
          <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
        </div>
      ) : items.length === 0 ? (
        <div className="admin-empty-state">
          <FolderOpen className="w-10 h-10" />
          <div>Aucun fichier média</div>
          <p style={{ color: theme.colors.slate[500] }}>
            Uploadez des images depuis la page Projets
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {items.map((item) => (
            <div key={item.path} className="admin-glass-panel" style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={styles.imgWrap}>
                <img src={item.publicUrl} alt={item.name} style={styles.img} />
              </div>
              <div style={{
                padding: theme.spacing[4],
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing[1],
                flex: 1,
              }}>
                <div style={{ color: theme.colors.teal[400], fontWeight: theme.typography.fontWeight.medium }}>{item.projectId}</div>
                <div style={{ color: theme.colors.white, wordBreak: 'break-all' }}>{item.name}</div>
                <div style={{ color: theme.colors.slate[500] }}>
                  {formatBytes(item.size)}
                  {item.createdAt &&
                    ` · ${new Date(item.createdAt).toLocaleDateString('fr-FR')}`}
                </div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: theme.spacing[2],
                padding: theme.spacing[3],
                borderTop: `1px solid ${theme.hexToRgba(theme.colors.slate[700], 0.3)}`,
              }}>
                <a
                  href={item.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-btn admin-btn--ghost admin-btn--small"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  type="button"
                  className="admin-btn admin-btn--danger admin-btn--small"
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
