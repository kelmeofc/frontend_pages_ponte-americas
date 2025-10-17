"use server";

import { getPostBySlug } from "@/common/services/posts/get-post-by-slug";
import { Container } from "../ui/container";
import { notFound } from "next/navigation";
import { LeadFormBlog } from "../forms/lead-form-blog";
import { CtaSectionBlog } from "./cta-section-blog";

export default async function ArticleContent({
	postSlug,
}: {
	postSlug: string;
}) {
	let uri = null;

	if (Array.isArray(postSlug) && postSlug.length >= 2) {
		uri = `/blog/${postSlug.join("/")}/`;
	}

	const post = await getPostBySlug(postSlug);

	if (!post) {
		notFound();
	}

	const parsedUrl = new URL(post.link);
	const path = parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;

	if (uri != null && uri != path) {
		notFound();
	}

	// Transform content for better React compatibility
	const transformedContent = post.content.rendered
		.replace(/class=/g, "className=")
		.replace(/fetchpriority=/g, "fetchPriority=")
		.replace(/<(br)([^>]*)(?!\/)>/g, "<$1$2 />")
		.replace(/style="([^"]*)"/g, (match: string, styles: string) => {
			const styleObject = styles
				.split(";")
				.filter(Boolean)
				.reduce((acc: Record<string, string>, style: string) => {
					const [property, value] = style.split(":").map((s) => s.trim());
					if (property && value) {
						const camelProperty = property.replace(/-([a-z])/g, (g) =>
							g[1].toUpperCase()
						);
						acc[camelProperty] = value;
					}
					return acc;
				}, {});
			return `style={${JSON.stringify(styleObject)}}`;
		})
		.replace(/for=/g, "htmlFor=")
		.replace(/tabindex=/g, "tabIndex=")
		.replace(/readonly=/g, "readOnly=")
		.replace(/maxlength=/g, "maxLength=")
		.replace(/contenteditable=/g, "contentEditable=");

	return (
		<section id="article" className="w-full bg-background py-8 md:py-12 mt-10">
			<article
				className="max-w-3xl mx-auto flex flex-col w-full overflow-hidden"
				itemScope
				itemType="http://schema.org/BlogPosting"
			>
				<header className="mb-6 md:mb-8 article-header pb-4 w-full">
					<h1
						className="font-bold text-gray-900 mb-4 break-words"
						itemProp="headline"
					>
						{post.title.rendered}
					</h1>
					<meta
						name="description"
						content={post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
					/>
					<div className="description-snippet mb-4 w-full" data-snippet="true">
						<p className="text-gray-700 break-words" itemProp="description">
							{post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, "")}
						</p>
					</div>
					<div className="flex items-center text-gray-500 text-sm">
						<time
							dateTime={post.date}
							className="flex items-center"
							itemProp="datePublished"
						>
							{new Date(post.date)
								.toLocaleString("pt-BR", {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
								})
								.replace(",", "")}
						</time>
					</div>
				</header>

				<div className="prose prose-lg max-w-none mb-12 w-full overflow-hidden">
					<div
						className="post-content text-gray-700 w-full overflow-hidden"
						data-nosnippet
						dangerouslySetInnerHTML={{ __html: transformedContent }}
					/>
				</div>

				<CtaSectionBlog />
			</article>
		</section>
	);
}
