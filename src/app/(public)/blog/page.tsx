import defaultSeo from "@/common/config/default-seo";
import BlogGrid from "@/components/sections/blog-grid";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: defaultSeo.blog_title,
};

export default async function BlogPage({ searchParams }: any) {
    const resolvedSearchParams = typeof searchParams?.then === 'function' ? await searchParams : searchParams;
    return (
        <>
            <main className="w-full flex flex-col gap-16 py-16">
                <BlogGrid searchParams={resolvedSearchParams} />
            </main>
        </>
    );
}