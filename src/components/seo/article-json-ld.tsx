"use client";

import { JsonLd } from "./json-ld";

export const ArticleJsonLd = () => {
  const articleData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: "Ponte Américas: Seu Caminho para o Green Card e Vida nos EUA",
		description:
			"Descubra o método comprovado do Ponte Américas para conseguir seu Green Card, trabalhar legalmente nos EUA e construir uma vida próspera. Mais de 10.000 brasileiros já realizaram o sonho americano conosco.",
		image: [
			`${
				process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
			}/images/video-placeholder-1.png`,
			`${
				process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
			}/images/about-us-section/image-card-1.png`,
		],
		author: {
			"@type": "Organization",
			name: "Ponte Américas",
			url: process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com",
		},
		publisher: {
			"@type": "Organization",
			name: "Ponte Américas",
			logo: {
				"@type": "ImageObject",
				url: `${
					process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
				}/images/svg/logo.svg`,
			},
		},
		datePublished: "2025-01-01",
		dateModified: "2025-01-01",
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com",
		},
		keywords: [
			"ponte américas",
			"green card brasileiro",
			"como conseguir green card",
			"imigração para EUA",
			"viver nos Estados Unidos",
			"trabalhar legalmente nos EUA",
			"brasileiros nos EUA",
			"visto EB2-NIW",
			"visto de investidor E2",
			"residência permanente EUA",
			"consultoria imigração EUA",
			"advogado de imigração",
		],
		articleSection: "Imigração e Educação",
		wordCount: 2000,
		inLanguage: "pt-BR",
	};

  return <JsonLd data={articleData} id="article-json-ld" />;
};

// Componente para dados estruturados de serviço local
export const LocalBusinessJsonLd = () => {
  const localBusinessData = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"@id": `${
			process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
		}/#business`,
		name: "Ponte Américas",
		description:
			"Especialistas em imigração para os EUA. Ajudamos brasileiros a conseguir Green Card através dos vistos EB2-NIW, E2 e outros caminhos legais. Mais de 10.000 clientes aprovados.",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com",
		telephone: "+1-321-429-6742",
		email: "contato@ponteamericas.com",
		address: {
			"@type": "PostalAddress",
			addressCountry: "BR",
			addressRegion: "São Paulo",
			addressLocality: "São Paulo",
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "-23.5505",
			longitude: "-46.6333",
		},
		openingHours: "Mo-Fr 09:00-18:00",
		priceRange: "$$",
		paymentAccepted: "Credit Card, Debit Card, PIX",
		currenciesAccepted: "BRL",
		serviceArea: {
			"@type": "Country",
			name: "Brasil",
		},
		hasOfferCatalog: {
			"@type": "OfferCatalog",
			name: "Serviços de Imigração para EUA",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Consultoria para Green Card EB2-NIW",
						description:
							"Consultoria especializada para obtenção do Green Card através do visto EB2-NIW (National Interest Waiver)",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Visto de Investidor E2",
						description:
							"Assessoria completa para obtenção do visto E2 através de investimento empresarial nos EUA",
					},
				},
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Planejamento de Imigração",
						description:
							"Análise personalizada do seu perfil e estratégia completa para imigrar legalmente para os Estados Unidos",
					},
				},
			],
		},
	};

  return <JsonLd data={localBusinessData} id="local-business-json-ld" />;
};

// Componente para dados estruturados de WebSite
export const WebSiteJsonLd = () => {
  const webSiteData = {
		"@context": "https://schema.org",
		"@type": "Website",
		name: "Ponte Américas",
		alternateName: "Ponte Américas",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com",
		description:
			"Realize o sonho americano com o Ponte Américas. Especialistas em Green Card EB2-NIW, visto E2 e imigração para os EUA. Mais de 10.000 brasileiros aprovados. Consultoria gratuita disponível.",
		inLanguage: "pt-BR",
		copyrightYear: 2025,
		copyrightHolder: {
			"@type": "Organization",
			name: "Ponte Américas",
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${
					process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
				}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "Ponte Américas",
			logo: {
				"@type": "ImageObject",
				url: `${
					process.env.NEXT_PUBLIC_SITE_URL || "https://ponteamericas.com"
				}/logo.svg`,
			},
		},
	};

  return <JsonLd data={webSiteData} id="website-json-ld" />;
};
