import getLatestPostsAction from "@/server/actions/get-latest-posts-action"
import useGetLatestPosts from "@/common/hooks/use-get-latest-posts"
import { removeHtmlTags } from "@/common/lib/utils"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"

interface BlogPost {
  id: number
  title: { rendered: string }
  excerpt: { rendered: string }
  date: string
  image: string
  slug: string
}

export async function BlogSection() {
  const { execGetLatestPosts } = await useGetLatestPosts()
  const blogPosts: BlogPost[] = (await execGetLatestPosts()).map(post => ({
    id: post.id,
    title: { rendered: removeHtmlTags(post.title.rendered) },
    excerpt: { rendered: removeHtmlTags(post.excerpt.rendered) },
    date: post.date,
    image: post.rttpg_featured_image_url.full[0],
    slug: post.slug
  }))

  return (
    <section className="py-16 bg-white border-b border-[#E5E7EB] snap-start">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">Blog de Marcas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center text-sm font-bold text-[#111827]">Nenhum post encontrado</div>
            )
          }
        </div>

        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center text-[#0047FF] font-medium hover:underline">
            Ver todos os artigos
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  )
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="flex flex-col h-full overflow-hidden rounded-xl bg-[#F9FAFB]">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title.rendered}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col grow p-6">
          <span className="text-sm text-[#6B7280] mb-2">{post.date}</span>

          <h3 className="text-xl font-bold text-[#111827] mb-3">{post.title.rendered}</h3>

          <p className="text-[#374151] mb-4 grow">{post.excerpt.rendered}</p>

          <Link href={`/blog/${post.slug}`} className="text-[#0047FF] font-medium hover:underline mt-auto">
            Ler mais
          </Link>
        </div>
      </div>
    </Link>
  )
}

