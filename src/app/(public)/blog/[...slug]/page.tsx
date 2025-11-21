import { notFound } from "next/navigation";
import React from "react";
import { Container } from "@/components/ui/container";
import { Metadata } from "next";
import { getMetadataPostBySlug } from "@/server/services/blog-posts/get-metadata-post-by-slug";
import ArticleContent from "@/components/sections/article-content";
import Link from "next/link";
import { LeadFormBlog } from "@/components/forms/lead-form-blog";
import { ScrollSyncWrapper } from "@/components/sections/scroll-sync-wrapper";
import { Scissors, Camera, AppWindow, Users } from "lucide-react";
import { SlugPageProps } from "@/types/next-page";
import SiteLayout from "@/components/layouts/site-layout";

// Função auxiliar para extrair o slug final
function getPostSlug(slug: string | string[]): string {
	if (Array.isArray(slug)) {
		return slug[slug.length - 1];
	}
	return slug;
}

export async function generateMetadata({
	params,
}: SlugPageProps): Promise<Metadata> {
	try {
		// Aguarde a resolução do params antes de acessar suas propriedades
		const resolvedParams = await params;
		const slugParam = resolvedParams.slug;

		// Agora podemos acessar o slug com segurança
		const postSlug = getPostSlug(slugParam);
		const post = await getMetadataPostBySlug(postSlug);

		// Construct the current URL
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pppi.com.br";
		const slugPath = Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
		const currentPath = `/blog/${slugPath}`;
		const fullUrl = `${baseUrl}${currentPath}`;

		return {
			title: post.title,
			description: post.description,
			openGraph: {
				title: post.title,
				description: post.description,
				type: "article",
				url: fullUrl,
				images: [
					{
						url: post.image,
						width: 700,
						height: 400,
					},
				],
				siteName: post.title,
			},
			twitter: {
				title: post.title,
				description: post.description,
				card: "summary_large_image",
				images: [
					{
						url: post.image,
						width: 700,
						height: 400,
					},
				],
			},
			robots: {
				index: true,
				follow: true,
				"max-image-preview": "large",
				"max-snippet": -1,
				"max-video-preview": -1,
			},
		};
	} catch (error) {
		notFound();
	}
}

export default async function BlogPost({ params }: SlugPageProps) {
	// Aguarde a resolução do params antes de acessar suas propriedades
	const resolvedParams = await params;
	const slugParam = resolvedParams.slug;
	const postSlug = getPostSlug(slugParam);

	const sidebar = (
		<>
			<LeadFormBlog articleUri={`/blog/${postSlug}`} />
		</>
	);

	return (

		<SiteLayout>
			<Container>
				<ScrollSyncWrapper
					article={<ArticleContent postSlug={postSlug} />}
					sidebar={sidebar}
				/>
			</Container>
		</SiteLayout>
	);
}
