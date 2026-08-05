import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { Plus, Pencil, Trash2, Image } from 'lucide-react';
import theme from '../../../styles/theme';
import AdminLayout from '../AdminLayout';
import '../admin.css';
import {
    fetchBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadPreview,
    deletePreview,
    type DbBlog,
} from '../../../services/adminService';
import BlogFormModal from "@/components/admin/components/BlogFormModal";

const bucket = 'Blog_Images';
function AdminBlog() {
    const [blog, setBlog] = useState<DbBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<DbBlog | null>(null);
    const [creating, setCreating] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            setBlog(await fetchBlog());
        } catch {
            /* silently fail */
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const handleCreate = async (
        payload: Partial<DbBlog>,
        Files?: File[] | null,
        deleteOld?: boolean
    ) => {
        let newInf: DbBlog

        const maxId = blog.length > 0 ? Math.max(...blog.map(s => parseInt(s.id))) : 0;
        const newId = (maxId + 1).toString();
        newInf = await createBlog({...payload, id: newId});
        if (deleteOld && (!Files || Files.length === 0)) {
            await deletePreview(newInf.id, bucket);
            await updateBlog(newInf.id, { preview_urls: [] });
        } else if (Files && Files.length > 0) {
            if (deleteOld) {
                try {
                    await deletePreview(newInf.id, bucket);
                } catch {}
            }
            const urls = await Promise.all (
                Files.map(async(f, index) => {
                    return await uploadPreview(newInf.id, f, bucket, newInf.name, index);
                })
            );
                await updateBlog(newInf.id, { preview_urls: urls });
        }

        await load();
    };

    const handleUpdate = async (
        payload: Partial<DbBlog>,
        Files?: File[] | null,
        deleteOld?: boolean
        ) => {
        if (!editing) return;
        if (Files && Files.length > 0 && editing.id) {
            // if (deleteOld) {
            //     try {
            //         await deletePreview(editing.id, bucket);
            //     } catch {}
            // }
            const urls = await Promise.all (
                Files.map(async(f, index) => {
                    index += editing.preview_urls.length;
                    return await uploadPreview(editing.id, f, bucket, payload.name, index);
                })
            );
            editing.preview_urls = [...editing.preview_urls, ...urls]
            await updateBlog(editing.id, { preview_urls: editing.preview_urls });
        }
        await updateBlog(editing.id, payload);
        await load();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Supprimer ce blog ?')) return;
        await deleteBlog(id);
        await load();
    };
    return (
        <AdminLayout title="Blog">
            <div className="admin-page-header">
                <div className="admin-page-title">Gestion des blog</div>
                <button
                    type="button"
                    className="admin-btn admin-btn--primary"
                    onClick={() => setCreating(true)}
                >
                    <Plus size={16} />
                    Nouveau blog
                </button>
            </div>

            {loading ? (
                <div className="admin-glass-panel">
                    <span style={{ color: theme.colors.slate[400] }}>Chargement…</span>
                </div>
            ) : blog.length === 0 ? (
                <div className="admin-empty-state">
                    <div>Aucun blog</div>
                    <button
                        type="button"
                        className="admin-btn admin-btn--primary"
                        onClick={() => setCreating(true)}
                    >
                        <Plus size={16} />
                        Créer un premier blog
                    </button>
                </div>
            ) : (
                <div className="admin-glass-panel">
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                            <tr className="admin-table-head">
                                <th className="admin-th">Preview</th>
                                <th className="admin-th">Name</th>
                                <th className="admin-th hidden-mobile">Description</th>
                                <th className="admin-th" style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {blog.map((blg) => (
                                <tr key={blg.id}>
                                    <td className="admin-td">
                                        {blg.preview_urls?.length > 0 ? (
                                        <img
                                            src={blg.preview_urls[0]}
                                            alt={`preview of ${blg.name}`}
                                            style={styles.thumb}
                                        />
                                            ) : (
                                            <p>No preview found</p>
                                        )}
                                    </td>
                                    <td className="admin-td">{blg.name}</td>
                                    <td className="admin-td">
                                        <span style={{ color: theme.colors.slate[400] }}>
                                            {blg.message || '—'}
                                        </span>
                                    </td>
                                    {/*<td className="admin-td">{blg.position}</td>*/}
                                    <td className="admin-td">
                                    </td>
                                    <td className="admin-td" style={{ textAlign: 'right' }}>
                                    <div style={styles.actionRow}>
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn--ghost admin-btn--small"
                                                onClick={() => setEditing(blg)}
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                className="admin-btn admin-btn--danger admin-btn--small"
                                                onClick={() => handleDelete(blg.id)}
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
                </div>
            )}

            {creating && (
                <BlogFormModal
                    onSave={handleCreate}
                    onClose={() => setCreating(false)}
                />
            )}

            {editing && (
                <BlogFormModal
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
    thumb: {
        width: '3.5rem',
            height: '2rem',
            objectFit: 'cover',
            borderRadius: theme.borderRadius.md,
            border: `1px solid ${theme.hexToRgba(theme.colors.slate[600], 0.4)}`,
    },
}

export default AdminBlog;
