import { IPost } from "@/types/post"
import Image from "next/image"
import Link from "next/link"

export default function BlogCard({ post, uri }: { post: IPost, uri: string }) {
    // Verifica se o post tem todos os dados necessários
    if (!post || !post.title || !post.date) {
        return null;
    }

    // Garante que rttpg_featured_image_url existe e tem a propriedade full como array
    const imageUrl = post.rttpg_featured_image_url?.full?.[0] || "/placeholder.svg";
    
    // Garante que temos um excerpt válido
    const excerpt = post.rttpg_excerpt || post.excerpt?.rendered || "";

    // Função para limitar texto a 24 palavras
    const truncateText = (text: string, maxWords: number = 24): string => {
        // Remove tags HTML e espaços extras
        const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const words = cleanText.split(' ');
        
        if (words.length <= maxWords) {
            return cleanText;
        }
        
        return words.slice(0, maxWords).join(' ') + '...';
    };

    const truncatedExcerpt = truncateText(excerpt, 24);

    return (
        <Link 
            href={`${uri}`} 
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 border border-solid border-gray-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 h-full flex flex-col"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={post.title.rendered || "Post image"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay sutil no hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </div>
            
            <div className="p-6 flex flex-col flex-1">
                {/* Data */}
                <p className="text-sm text-muted-foreground mb-3 font-medium">
                    {new Date(post.date).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }).replace(',', '')}
                </p>
                
                {/* Título */}
                <h2 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-shrink-0">
                    {post.title.rendered}
                </h2>
                
                {/* Descrição com altura fixa */}
                <div className="flex-1 flex flex-col justify-start">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[3.5rem] flex items-start">
                        {truncatedExcerpt}
                    </p>
                </div>
                
                {/* Botão Ler mais */}
                <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors duration-300 mt-auto">
                    <span>Ler mais</span>
                    <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                        />
                    </svg>
                </div>
            </div>
        </Link>
    )
}