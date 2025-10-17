export default {
	title: "Entenda tudo sobre Estados Unidos | Ponte Américas",
	blog_title: "Blog | Ponte Américas",
	description:
		"Entenda tudo sobre Estados Unidos com a Ponte Américas",
	keywords: "Ponte Américas, Alugar nos EUA, Morar nos EUA, Entenda Estados Unidos, Imigrar para os EUA",
	openGraph: {
		type: "website",
		locale: "pt_BR",
		url: process.env.NEXT_PUBLIC_SITE_URL,
		title: "Entenda tudo sobre Estados Unidos | Ponte Américas",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		siteName: "Ponte Américas",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/lp/images/hero/hero-main.png`,
				width: 1200,
				height: 630,
				alt: "Entenda tudo sobre Estados Unidos - Ponte Américas",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ponte Américas | Entenda tudo sobre Estados Unidos",
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
