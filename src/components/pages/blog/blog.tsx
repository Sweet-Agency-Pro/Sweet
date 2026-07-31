'use client';

/**
 * blog Page
 * where blog content is, Idk what is blog content
 */

import BlogHero from './BlogHero';
import Footer from "@/components/sections/Footer";
import {useEffect, useState} from "react";
import supabase from '../../../lib/supabaseClient';
import {type DbBlog} from '../../../services/adminService';
import BlogDescription from './blog_description';

function Blogpage () {

    const [blog, setBlog] = useState<DbBlog[]>([]);


    useEffect(() => {
        async function fetchBlog() {
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .order('created_at', { ascending: false });
            if (data) {
                setBlog(data as DbBlog[]);
            }
        }
        fetchBlog();
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
            <tbody>
            <h2>
                here are all our blog
            </h2>
                {blog.map((blg) =>
                    <tr key={blg.id}>
                        <td>
                            <h3>
                                {blg.name}
                            </h3>
                            <BlogDescription
                                text={blg.message}
                                images={blg.preview_urls}
                            />
                        </td>
                    </tr>
                )}

                <Footer colorScheme="purple" />
            </tbody>

        </div>
    );
}

export default Blogpage;