import { IPost } from "@/types/post";
import api from "@/server/config/api";

export async function getPostBySlug(slug: string) {
    try {
        const response = await api.get<IPost[]>(`/wp-json/wp/v2/posts?slug=${slug}`)
        return response.data[0]; // WordPress retorna um array, mesmo para slug único
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error)
        throw error
    }
}