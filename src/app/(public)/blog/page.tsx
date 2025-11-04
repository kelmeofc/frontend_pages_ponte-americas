import defaultSeo from "@/common/config/default-seo";
import SiteLayout from "@/components/layouts/site-layout";
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
           <SiteLayout>
                <BlogGrid searchParams={resolvedSearchParams} />
            </SiteLayout>
       
        </>
    );
}