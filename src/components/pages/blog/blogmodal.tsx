/**
 * BlogModal Component
 * Modal overlay for blog details
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Beaker, Quote } from 'lucide-react';
import type { DbBlog } from '../../../services/adminService';
import BlogDescription from "@/components/pages/blog/blog_description";
import './blog_pres.css'
import '../../sections/Portfolio/Portfolio.css'

// Hex to Rgba helper for dynamic styles
const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

interface BlogModalProps {
    blog: DbBlog | undefined;
    selectedId: string | null;
    onClose: () => void;
}

function BlogModal({ blog, selectedId, onClose }: BlogModalProps) {
    const [imageError, setImageError] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Keep a snapshot of the last valid blog + id so AnimatePresence
    // can render the exit animation with the correct layoutId values
    const lastBlogRef = useRef<DbBlog | undefined>(undefined);
    const lastIdRef = useRef<string | null>(null);

    useEffect(() => {
        if (selectedId && blog) {
            lastBlogRef.current = blog;
            lastIdRef.current = selectedId;

            const resetScroll = () => {
                const el = scrollContainerRef.current;
                if (el) {
                    el.scrollTop = 0;
                    // Use scrollTo as well just in case
                    el.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                }
            };

            // Reset scroll immediately
            resetScroll();
        }
    }, [selectedId, blog]);

    // For rendering: use current values when open, fall back to last values during exit
    const isOpen = !!selectedId && !!blog;
    const renderBlog = isOpen ? blog : lastBlogRef.current;
    const renderId = isOpen ? selectedId : lastIdRef.current;

    // const accent = renderBlog?.colorAccent?.primary || '#0f9aa7';
    // const accentSecondary = renderBlog?.colorAccent?.secondary || '#06b6d4';
    // const gradientOp = renderBlog?.colorAccent?.gradient || `linear-gradient(135deg, ${hexToRgba(accent, 0.8)}, ${hexToRgba(accentSecondary, 0.8)})`;
    // const gradient = renderBlog?.colorAccent?.gradient || `linear-gradient(135deg, ${accent}, ${accentSecondary})`;

    return (
        <AnimatePresence>
            {isOpen && renderBlog && renderId && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="modal-backdrop"
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key={`modal-${renderId}`}
                        layoutId={`card-container-${renderId}`}
                        className="blog_modal-container"
                        style={{
                            clipPath: 'inset(0% round 2rem)',
                        }}
                    >
                        <motion.div
                            layoutId={`card-inner-${renderId}`}
                            layout
                            className="modal-inner"
                        >
                            {/* Close button */}
                            <button className="modal-close" onClick={onClose}>
                                <X className="modal-close-icon" />
                            </button>

                            {/* Modal content */}
                            <div
                                ref={scrollContainerRef}
                                className="blog_modal-content"
                            >
                                {/* Left side - Info */}
                                <div className="modal-info" key={blog.id}>
                                    <h3>{blog.name}</h3>
                                    <BlogDescription
                                        text={blog.message}
                                        images={blog.images}
                                    />

                                    {/*<motion.div*/}
                                    {/*    layoutId={`card-tag-${renderId}`}*/}
                                    {/*    className="modal-concept-tag"*/}
                                    {/*    style={{*/}
                                    {/*        background: gradientOp,*/}
                                    {/*        border: 'none',*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    {renderBlog.type === 'production' ? (*/}
                                    {/*        <Sparkles className="flagship__tag-icon" />*/}
                                    {/*    ) : (*/}
                                    {/*        <Beaker className="flagship__tag-icon" />*/}
                                    {/*    )}*/}
                                    {/*    <span style={{ color: 'white' }}>{renderBlog.type === 'production' ? 'Production' : 'Concept'}</span>*/}
                                    {/*</motion.div>*/}

                                    <motion.h3 layoutId={`card-title-${renderId}`} className="modal-title">
                                        {renderBlog.name}
                                    </motion.h3>

                                    {/*<motion.p layoutId={`card-hook-${renderId}`} className="modal-hook">*/}
                                    {/*    {renderBlog.hook}*/}
                                    {/*</motion.p>*/}

                                    {/*<motion.p*/}
                                    {/*    className="modal-story"*/}
                                    {/*    initial={{ opacity: 0, y: 20 }}*/}
                                    {/*    animate={{ opacity: 1, y: 0 }}*/}
                                    {/*    exit={{ opacity: 0 }}*/}
                                    {/*    transition={{ delay: 0.2 }}*/}
                                    {/*>*/}
                                    {/*    {renderBlog.story}*/}
                                    {/*</motion.p>*/}

                                    {/*{renderBlog.benefit && (*/}
                                    {/*    <motion.div*/}
                                    {/*        className="modal-benefit"*/}
                                    {/*        initial={{ opacity: 0, y: 20 }}*/}
                                    {/*        animate={{ opacity: 1, y: 0 }}*/}
                                    {/*        exit={{ opacity: 0 }}*/}
                                    {/*        transition={{ delay: 0.3 }}*/}
                                    {/*    >*/}
                                    {/*        <Quote className="modal-quote-icon" />*/}
                                    {/*        <p className="modal-benefit-text">{renderBlog.benefit}</p>*/}
                                    {/*    </motion.div>*/}
                                    {/*)}*/}

                        {/*            <motion.div*/}
                        {/*                className="modal-tech"*/}
                        {/*                initial={{ opacity: 0, y: 20 }}*/}
                        {/*                animate={{ opacity: 1, y: 0 }}*/}
                        {/*                exit={{ opacity: 0 }}*/}
                        {/*                transition={{ delay: 0.35 }}*/}
                        {/*            >*/}
                        {/*                <span className="modal-tech-label">Stack Technique</span>*/}
                        {/*                <div className="modal-tech-row">*/}
                        {/*                    {renderBlog.tech.map((t: string) => (*/}
                        {/*                        <span*/}
                        {/*                            key={t}*/}
                        {/*                            className="modal-tech-badge"*/}
                        {/*                            style={{*/}
                        {/*                                backgroundColor: hexToRgba(accent, 0.1),*/}
                        {/*                                borderColor: renderBlog.colorAccent.primary,*/}
                        {/*                                color: renderBlog.colorAccent.primary,*/}
                        {/*                            }}*/}
                        {/*                        >*/}
                        {/*  {t}*/}
                        {/*</span>*/}
                        {/*                    ))}*/}
                        {/*                </div>*/}
                        {/*            </motion.div>*/}

                                    {/*<motion.button*/}
                                    {/*    className="modal-cta"*/}
                                    {/*    style={{*/}
                                    {/*        background:*/}
                                    {/*            renderBlog.colorAccent.gradient ||*/}
                                    {/*            gradient ||*/}
                                    {/*            renderBlog.colorAccent.primary ||*/}
                                    {/*            '#14b8a6',*/}
                                    {/*        backgroundSize: '200% auto',*/}
                                    {/*        animation: 'gradient-shimmer 4s linear infinite',*/}
                                    {/*        ...(renderBlog.externalUrl ? {} : { opacity: 0.5, cursor: 'default' }),*/}
                                    {/*    }}*/}
                                    {/*    initial={{ opacity: 0, y: 20 }}*/}
                                    {/*    animate={{ opacity: 1, y: 0 }}*/}
                                    {/*    exit={{ opacity: 0 }}*/}
                                    {/*    transition={{ delay: 0.4 }}*/}
                                    {/*    whileHover={renderBlog.externalUrl ? { scale: 1.03 } : {}}*/}
                                    {/*    whileTap={renderBlog.externalUrl ? { scale: 0.98 } : {}}*/}
                                    {/*    onClick={() => {*/}
                                    {/*        if (renderBlog.externalUrl) {*/}
                                    {/*            window.open(renderBlog.externalUrl, '_blank', 'noopener');*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*>*/}
                                    {/*    <span>Voir le projet</span>*/}
                                    {/*    <ExternalLink className="modal-cta-icon" />*/}
                                    {/*</motion.button>*/}
                                </div>

                                {/* Right side - Visual */}
                                {/*<motion.div*/}
                                {/*    className="modal-visual"*/}
                                {/*    initial={{ opacity: 0, scale: 0.9 }}*/}
                                {/*    animate={{ opacity: 1, scale: 1 }}*/}
                                {/*    exit={{ opacity: 0 }}*/}
                                {/*    transition={{ delay: 0.15, duration: 0.4 }}*/}
                                {/*>*/}
                                {/*    <div*/}
                                {/*        className="modal-orb"*/}
                                {/*        // style={{*/}
                                {/*        //     background: renderBlog.colorAccent.gradient,*/}
                                {/*        // }}*/}
                                {/*    />*/}

                                    {/* Preview image or fallback mockup */}
                                    {/*{hasPreviewImage  ?  (*/}
                                    {/*    <motion.div*/}
                                    {/*        className="modal-mockup"*/}
                                    {/*        // whileHover={renderBlog.externalUrl ? { scale: 1.02, y: -4 } : {}}*/}
                                    {/*        // whileTap={renderBlog.externalUrl ? { scale: 0.98 } : {}}*/}
                                    {/*        // transition={{ duration: 0.3, ease: "easeOut" }}*/}
                                    {/*        // onClick={() => {*/}
                                    {/*        //     if (renderBlog.externalUrl) {*/}
                                    {/*        //         window.open(renderBlog.externalUrl, '_blank', 'noopener');*/}
                                    {/*        //     }*/}
                                    {/*        // }}*/}
                                    {/*        // style={{ cursor: renderBlog.externalUrl ? 'pointer' : 'default' }}*/}
                                    {/*    >*/}
                                    {/*        <div className="mockup-header">*/}
                                    {/*            <div className="mockup-dots">*/}
                                    {/*                <span className="mockup-dot" style={{ backgroundColor: '#ff5f57' }} />*/}
                                    {/*                <span className="mockup-dot" style={{ backgroundColor: '#febc2e' }} />*/}
                                    {/*                <span className="mockup-dot" style={{ backgroundColor: '#28c840' }} />*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        <img*/}
                                    {/*            src={renderBlog.preview_urls[0]}*/}
                                    {/*            alt={`Aperçu du projet ${renderBlog.name}`}*/}
                                    {/*            loading="lazy"*/}
                                    {/*            style={{*/}
                                    {/*                width: '100%',*/}
                                    {/*                height: 'auto',*/}
                                    {/*                display: 'block',*/}
                                    {/*                objectFit: 'cover',*/}
                                    {/*            }}*/}
                                    {/*            onError={() => setImageError(true)}*/}
                                    {/*        />*/}
                                    {/*    </motion.div>*/}
                                    {/*) : (*/}
                                    {/*    <span>image preview</span>*/}
                                    {/*)}*/}
                                    {/*    // (*/}
                                    {/*    // <motion.div*/}
                                    {/*    //     className="modal-mockup"*/}
                                    {/*    //     whileHover={renderBlog.externalUrl ? { scale: 1.02, y: -4 } : {}}*/}
                                    {/*    //     whileTap={renderBlog.externalUrl ? { scale: 0.98 } : {}}*/}
                                    {/*    //     transition={{ duration: 0.3, ease: "easeOut" }}*/}
                                    {/*    //     onClick={() => {*/}
                                    {/*    //         if (renderBlog.externalUrl) {*/}
                                    {/*    //             window.open(renderBlog.externalUrl, '_blank', 'noopener');*/}
                                    {/*    //         }*/}
                                    {/*    //     }}*/}
                                    {/*    //     style={{ cursor: renderBlog.externalUrl ? 'pointer' : 'default' }}*/}
                                    {/*    // >*/}
                                    {/*    //     <div className="mockup-header">*/}
                                    {/*    //         <div className="mockup-dots">*/}
                                    {/*    //             <span className="mockup-dot" style={{ backgroundColor: '#ff5f57' }} />*/}
                                    {/*    //             <span className="mockup-dot" style={{ backgroundColor: '#febc2e' }} />*/}
                                    {/*    //             <span className="mockup-dot" style={{ backgroundColor: '#28c840' }} />*/}
                                    {/*    //         </div>*/}
                                    {/*    //     </div>*/}
                                    {/*    //     <div className="modal-mockup-content">*/}
                                    {/*    //         <div*/}
                                    {/*    //             className="mockup-accent-bar"*/}
                                    {/*    //             style={{*/}
                                    {/*    //                 background: renderBlog.colorAccent.gradient,*/}
                                    {/*    //             }}*/}
                                    {/*    //         />*/}
                                    {/*    //         <div className="mockup-line" />*/}
                                    {/*    //         <div className="mockup-line" style={{ width: '70%' }} />*/}
                                    {/*    //         <div className="mockup-line" style={{ width: '50%' }} />*/}
                                    {/*    //         <div className="mockup-block-large" />*/}
                                    {/*    //         <div className="mockup-grid">*/}
                                    {/*    //             <div className="mockup-grid-item" />*/}
                                    {/*    //             <div className="mockup-grid-item" />*/}
                                    {/*    //             <div className="mockup-grid-item" />*/}
                                    {/*    //         </div>*/}
                                    {/*    //     </div>*/}
                                    {/*    // </motion.div>*/}
                                    {/*// )}*/}
                                {/*</motion.div>*/}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default BlogModal;
