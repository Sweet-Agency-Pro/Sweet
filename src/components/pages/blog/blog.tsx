'use client';

/**
 * blog Page
 * where blog content is, Idk what is blog content
 */

import BlogHero from './BlogHero';
import Footer from "@/components/sections/Footer";
import {useEffect, useState} from "react";
import supabase from '../../../lib/supabaseClient';
import {type DbBlog, fetchBlog} from '../../../services/adminService';
import BlogDescription from './blog_description';
import { motion } from 'framer-motion';
import {ArrowRight, Beaker, Sparkles} from "lucide-react";
import BlogModal from './blogmodal'
import '../../sections/Portfolio/Portfolio.css'
import './blog_pres.css'



interface ConceptCardProps {
    Blog: DbBlog;
    index: number;
    onClick: () => void;
}

function ConceptCard({ Blog, index, onClick }: ConceptCardProps) {
    const [imageError, setImageError] = useState(false);
    const hasPreviewImage = Blog.images.length > 0 && !imageError;

    return(
        <motion.div
            layoutId={`card-container-${Blog.id}`}
            onClick={onClick}
            className="concept_size"
            style={{ clipPath: 'inset(0% round 2rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                layout: { duration: 0.45, ease: [0.23, 1, 0.32, 1], delay: 0 },
            }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            <motion.div
                layoutId={`card-inner-${Blog.id}`}
                className="concept__inner"
                style={{
                    // boxShadow: `0 0.25rem 2rem -0.25rem ${hexToRgba(accent, 0.2)}`,
                    clipPath: 'inset(0% round 2rem)'
                }}
            >
                <div className="concept__visual">
                    <div
                        className="concept__orb"
                        // style={{
                        //     background: gradient,
                        // }}
                    />
                    <div className="concept__mockup">
                        {hasPreviewImage ? (
                            <img
                                src={Blog.images[0].url}
                                alt={`Aperçu du blog ${Blog.name}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    objectFit: 'cover',
                                }}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="mockup-content">
                                <div className="mockup-line" />
                                <div className="mockup-line" style={{ width: '60%' }} />
                                <div className="mockup-block" />
                            </div>
                        )}
                    </div>
                </div>

                {/*<motion.div layoutId={`card-tag-${Blog.id}`} className="concept__tag">*/}
                {/*    {Blog.type === 'production' ? (*/}
                {/*        <Sparkles className="concept__tag-icon" />*/}
                {/*    ) : (*/}
                {/*        <Beaker className="concept__tag-icon" />*/}
                {/*    )}*/}
                {/*    <span>{Blog.type === 'production' ? 'Production' : 'Concept'}</span>*/}
                {/*</motion.div>*/}

                <motion.h4 layoutId={`card-title-${Blog.id}`} className="concept_title">
                    {Blog.name}
                </motion.h4>

                <div className="concept__footer">
                    <span className="concept__cta">Découvrir</span>
                    <ArrowRight
                        className="concept__cta-icon"
                        // style={{
                        //     color: Blog.colorAccent.primary,
                        // }}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}
function Blogpage () {

    const [blog, setBlog] = useState<DbBlog[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedProject = blog.find((p) => p.id === selectedId);

    useEffect(() => {
        const load = async () => {
            const blogs = await fetchBlog();
            setBlog(blogs);
        };

        load();
    }, []);

    return (
        <div>
            <BlogHero
                title={
                    <>
                        Notre blog,{' '}
                        <span className="service-hero__title-gradient">qui blog vraiment</span>
                    </>
                }
                subtitle="Un blog."
                ctaLabel="Discuter de notre blog"
                colorScheme="purple"
                currentSlug="/blog"
            />
            <h2>
                here are all our blog
            </h2>
                <div className='concept_container'>
                {blog.map((blg, index) =>
                    <ConceptCard key={blg.id} Blog={blg} index={index} onClick={() => setSelectedId(blg.id)}/>
                )}
            </div>
            <BlogModal
                blog={selectedProject}
                selectedId={selectedId}
                onClose={() => setSelectedId(null)}
            />

                <Footer colorScheme="purple" />

        </div>
    );
}

export default Blogpage;