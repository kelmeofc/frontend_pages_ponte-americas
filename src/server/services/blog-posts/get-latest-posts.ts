import { IPost } from "@/types/post"
import api from "@/server/config/api"

export default async function getLatestPosts() {
    try {
        const response = await api.get<IPost[]>(`/wp-json/wp/v2/posts?page=${1}&per_page=${3}`)
        
        // Retornar posts para manter a consistência com o uso atual
        return {
            posts: response.data
        }
    } catch (error) {
        console.error("Error fetching posts:", error)
        return []
    }
}
