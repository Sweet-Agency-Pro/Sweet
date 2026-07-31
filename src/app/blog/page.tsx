import Blogpage from '../../components/pages/blog/blog'
import {pageMetadata} from "@/lib/seo";


export const metadata = pageMetadata({
    title: 'Blog',
    description:
        "Ici, le blog :)",
    path: '/blog',
});

export default function blog_render() {
    return <Blogpage />
}

