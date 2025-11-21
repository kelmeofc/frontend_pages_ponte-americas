import { IPagination, IPost } from "@/types/post"
import api from "@/server/config/api"

export async function getPosts(page: number = 1, limit: number = 9) {
    try {
        const response = await api.get<IPost[]>(`/wp-json/wp/v2/posts?page=${page}&per_page=${limit}`)
        
        // Extrair informações de paginação dos headers da resposta
        const totalItems = Number(response.headers['x-wp-total'] || 0)
        const totalPages = Number(response.headers['x-wp-totalpages'] || 1)
        
        // Formatar a resposta para o formato esperado pelo componente
        return {
            posts: response.data,
            pagination: {
                total_items: totalItems,
                total_pages: totalPages,
                current_page: page,
                limit: limit
            }
        }
    } catch (error) {
        console.error("Error fetching posts:", error)
        // Retornando uma estrutura de dados compatível mesmo em caso de erro
        return {
            posts: [],
            pagination: {
                total_items: 0,
                total_pages: 1,
                current_page: page,
                limit: limit
            }
        }
    }
}