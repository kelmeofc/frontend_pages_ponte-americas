import { IMetadataPost, IPost } from "@/types/post";
import api from "@/common/config/api";

export async function getMetadataPostBySlug(slug: string) {
    try {
        const response = await api.get<IPost[]>(`/wp-json/wp/v2/posts?slug=${slug}`)
        
        if (!response.data || response.data.length === 0) {
            throw new Error(`Post with slug ${slug} not found`)
        }
        
        const post = response.data[0]
        
        // Adaptação para o formato esperado de metadados
        const metadata: IMetadataPost = {
            slug: post.slug,
            title: post.title.rendered || '',
            description: post.excerpt.rendered || post.rttpg_excerpt || '',
            modified: post.date || '',
            image: post.image || (post.rttpg_featured_image_url?.full && post.rttpg_featured_image_url.full[0]) || ''
        }
        
        return metadata;
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error)
        throw error
    }
}