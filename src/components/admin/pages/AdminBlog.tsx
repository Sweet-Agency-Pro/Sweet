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
    getMediaUrl,
    deletePrecisePreview,
    deletePreviewTableBlog,
    addMediaBlog,
    type DbBlog, deletePreview,
} from '../../../services/adminService';
import BlogFormModal from "@/components/admin/components/BlogFormModal";
import supabase from "@/lib/supabaseClient";

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

    const getStoragePath = async (image_id: string, bucket: string) => {
        const marker = `/storage/v1/object/public/${bucket}/`;
        const url = await getMediaUrl(image_id)
        const index = url.indexOf(marker);

        if (index === -1) {
            throw new Error("Invalid Supabase storage URL");
        }
        return url.substring(index + marker.length);
    };
    const handleCreate = async (
        payload: Partial<DbBlog>,
        Files?: File[] | null,
    ) => {
        let newInf: DbBlog

        const maxId = blog.length > 0 ? Math.max(...blog.map(s => parseInt(s.id))) : 0;
        const newId = (maxId + 1).toString();
        newInf = await createBlog({...payload, id: newId});
        if (Files && Files.length > 0) {
            const mediaMaxId = newInf.images?.length > 0
                ? Math.max(...newInf.images.map(s => parseInt((s.position).toString())))
                : 0;
            const mediaNewId = (mediaMaxId + 1).toString();
            await Promise.all (
                Files.map(async(f, index) => {
                    const newId = (Number(mediaNewId) + index).toString();
                    const url =  await uploadPreview(newInf.id, f, bucket, newInf.name, newId);

                    await addMediaBlog({blog_id: newInf.id, public_url: url, position: Number(newId)});
                })
            );
        }
        await load();
    };

    const handleUpdate = async (
        payload: Partial<DbBlog>,
        Files?: File[] | null,
        deleteOld?: string[]
        ) => {
        if (!editing) return;
        if (deleteOld && deleteOld.length > 0) {
                    console.log(deleteOld?.length);
            deleteOld.map(async(del) => {
                const path = await getStoragePath(del, 'Blog_Images');
                try {
                    await deletePrecisePreview(path, 'Blog_Images');
                } catch {}
                await deletePreviewTableBlog(del, 'blog_media')
            });
        }
        if (Files && Files.length > 0 && editing.id) {
            const mediaMaxId = editing.images?.length > 0
                ? Math.max(...editing.images.map(s => parseInt((s.position).toString())))
                : 0;
            const mediaNewId = (mediaMaxId + 1).toString();
            await Promise.all (
                Files.map(async(f, index) => {
                    const newId = (Number(mediaNewId) + index).toString();
                    const url =  await uploadPreview(editing.id, f, bucket, editing.name, newId);

                    await addMediaBlog({blog_id: editing.id, public_url: url, position: Number(newId)});
                })
            );
        }
        await updateBlog(editing.id, 'blog', payload);
        await load();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Supprimer ce blog ?')) return;
        await deleteBlog(id);
        await deletePreview(id, 'Blog_Images')
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
                                        {blg.images?.length > 0 ? (
                                        <img
                                            src={blg.images[0].url}
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
