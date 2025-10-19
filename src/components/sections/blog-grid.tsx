import { getPosts } from "@/common/services/posts/get-posts";
import { IPagination, IPost } from "@/types/post";
import ClientPagination from "../ui/client-pagination";
import BlogCard from "../ui/blog-card";
import { Container } from "../ui/container";

export default async function BlogGrid({ searchParams }: { searchParams?: any }) {
  const sp = typeof searchParams?.then === 'function' ? await searchParams : searchParams;
  const currentPage = Number(sp?.page) || 1;
  const limit = 9;

  const data = await getPosts(currentPage, limit);
  
  // Verificação adicional para garantir que data e data.posts existam
  if (!data || !data.posts) {
    return (
      <section className="w-full bg-white min-h-screen">
        <Container section={true}>
          <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-12 mb-8">
            Blog Ponte Américas
          </h2>
          <p className="text-center">Nenhum artigo encontrado. Por favor, tente novamente mais tarde.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="w-full bg-white">
      <Container section={true}>
        <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-12 mb-8">
          Blog Ponte Américas
        </h2>
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.posts.length > 0 ? (
              data.posts.map((post) => {
                const parsedUrl = new URL(post.link);
                const path = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

                return (
                  <BlogCard key={post.id} post={post} uri={path} />
                );
              })
            ) : (
              <p className="col-span-3 text-center">Nenhum artigo publicado no momento.</p>
            )}
          </div>
          {data.posts.length > 0 && (
            <div className="mt-12">
              <ClientPagination
                currentPage={data.pagination.current_page}
                totalPages={data.pagination.total_pages}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}