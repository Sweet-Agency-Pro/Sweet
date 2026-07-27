/**
 * ProjectFormModal
 * Modal for creating / editing a blog
 */

import { useRef, useState, type CSSProperties } from 'react';
import {
    X,
    Upload,
    ImageIcon,
} from 'lucide-react';
import theme from '../../../styles/theme';
import '../admin.css';
import type {DbBlog, DbProject} from '../../../services/adminService';

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

interface BlogFormModalProps {
    initial?: DbBlog | null;
    onSave: (Payload: Partial<DbBlog>, File?: File | null, deleteOldPreview?: boolean) => Promise<void>;
    onClose: () => void
}

function BlogFormModal({initial, onSave, onClose}: BlogFormModalProps){
    const [id, setId] = useState(initial?.id ?? '');
    const [name, setName] = useState(initial?.name ?? '');
    const [message, setMessage] = useState(initial?.message ?? '');

    // const [primaryColor, setPrimaryColor] = useState(initial?.color_accent?.primary ?? '#14b8a6');
    // const [secondaryColor, setSecondaryColor] = useState(initial?.color_accent?.secondary ?? '');

    const [previewFile, setPreviewFile] = useState<File | null>(null);
    const [deleteOld, setDeleteOld] = useState(false);
    const [previewLocal, setPreviewLocal] = useState<string | null>(null);
    const [existingPreview, setExistingPreview] = useState(initial?.preview_url ?? null);

    const [save, setSave] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreviewFile(file);
        setPreviewLocal(URL.createObjectURL(file));
        setDeleteOld(true);
    }

    const resetSetPreview = () => {
        setPreviewFile(null);
        setExistingPreview(null);
        setPreviewLocal(null);
        setDeleteOld(true);
        if (fileRef.current) fileRef.current.value = '';
    }


    const HandleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();
        setSave(true)
        setError(null)

        try {
            // const colorAccent: DbProject['color_accent'] = { primary: primaryColor };
            // if (secondaryColor) colorAccent.secondary = secondaryColor;

            await onSave(
                {
                    ...(initial ? {} : { id }),
                    name,
                    message: message || null,
                },
                previewFile,
                deleteOld,
            );
        onClose();

        } catch(error) {
            setError(error instanceof Error ? error.message : 'Erreur inconnue');
        } finally {
            setSave(false);
        }
    };

    const DisplayedPreview = previewLocal ?? existingPreview;

    return (
        <div className="admin-modal-overlay" onClick={onClose}>
            <form
                className="admin-modal-content"
                onClick={(e) => e.stopPropagation()}
                onSubmit={HandleSubmit}
            >
            <div className="admin-modal-header">
                <div className="admin-modal-title">
                    Nouveau Blog
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    style={styles.closeBtn}
                >
                    <X size={20} />
                </button>
            </div>
                <div className="admin-form-group" >
                    <label className="admin-form-label">Nom</label>
                    <input
                        className="admin-form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={!!initial}
                        placeholder="Mon Blog"
                    />
                </div>
                <div className="admin-form-group" >
                    <label className="admin-form-label">descritpion</label>
                    <input
                        className="admin-form-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        disabled={!!initial}
                        placeholder="Nouvelle Update"
                    />
                </div>

                {/*preview image*/}
                <div className="admin-form-group">
                    <label className="admin-form-label">Image preview</label>
                    {DisplayedPreview ? (
                        <div className="admin-image-preview">
                            <img className="admin-image-preview__img" src={DisplayedPreview} alt={`Aperçu de ${name || "Nouveau projet"}`} />
                            <button
                                type="button"
                                onClick={resetSetPreview}
                                className="admin-image-delete-btn"
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
                    {DisplayedPreview && (
                        <button
                            type="button"
                            className="admin-btn admin-btn--ghost admin-btn--small"
                            style={{ marginTop: theme.spacing[2] }}
                            onClick={() => fileRef.current?.click()}
                        >
                            <Upload size={14} />
                            Remplacer l'image
                        </button>
                    )}
                </div>

                <div className="admin-grid-2">
                    <button
                        type={"button"}
                        className="admin-btn admin-btn--ghost"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="admin-btn admin-btn--primary"
                        disabled={save}
                    >
                        {save ? 'Enregistrement…' : 'Enregistrer'}
                    </button>
                </div>
            </form>
        </div>
    )
}

const styles: Record<string, CSSProperties> = {
    closeBtn: {
        background: 'transparent',
        border: 'none',
        color: theme.colors.slate[400],
        cursor: 'pointer',
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
}

export default BlogFormModal;