import { IPost } from "@/types/post";
import api from "@/server/config/api";

export async function getPostById(id: number) {
    try {
        const response = await api.get<IPost>(`/wp-json/wp/v2/posts/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error)
        throw error
    }
}