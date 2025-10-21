"use client";

import { JsonLd } from "./json-ld";

export const ArticleJsonLd = () => {
  const articleData = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: "Ponte Américas: Seu Guia Completo para Viver nos Estados Unidos",
		description:
			"O Ponte Américas vai te ensinar tudo sobre como viver, trabalhar e prosperar nos EUA, evitando os erros que custam milhares de dólares..",
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
			"imigração EUA",
			"viver nos Estados Unidos",
			"trabalhar nos EUA",
			"brasileiros nos EUA",
			"green card",
			"visto americano",
			"programa de imigração",
			"consultoria imigração",
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
			"O Ponte Américas vai te ensinar tudo sobre como viver, trabalhar e prosperar nos EUA, evitando os erros que custam milhares de dólares.",
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
			name: "Serviços de Visagismo",
			itemListElement: [
				{
					"@type": "Offer",
					itemOffered: {
						"@type": "Service",
						name: "Análise de Visagismo com IA",
						description:
							"Análise personalizada de cabelo usando inteligência artificial",
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
			"O Ponte Américas vai te ensinar tudo sobre como viver, trabalhar e prosperar nos EUA, evitando os erros que custam milhares de dólares.",
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
