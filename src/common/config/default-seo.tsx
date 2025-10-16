export default {
	title: "Visagismo com IA | Descubra sua melhor versão | PandaMi",
	blog_title: "Blog | PandaMi",
	description:
		"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
	keywords: "visagismo com IA, Pandami, IA Pandami",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: process.env.NEXT_PUBLIC_SITE_URL,
		title: "Visagismo com IA | Descubra sua melhor versão | PandaMi",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		siteName: "PandaMi",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/lp/images/hero/hero-main.png`,
				width: 1200,
				height: 630,
				alt: "Visagismo com IA - Descubra sua melhor versão com PandaMi",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "PandaMi | Visagismo com IA",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		images: [
			`${process.env.NEXT_PUBLIC_SITE_URL}/lp/images/hero/hero-main.png`,
		],
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
};
