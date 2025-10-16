"use client";

import { JsonLd } from "./json-ld";

export const ArticleJsonLd = () => {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Visagismo com IA: Descubra sua melhor versão",
    "description": "Descubra como a inteligência artificial está revolucionando o visagismo. Análise personalizada em 30 segundos, sugestões para todos os tipos de cabelo brasileiro.",
    "image": [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"}/lp/images/hero/hero-main.png`,
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"}/lp/images/about-visagism/about-visagism-1.png`
    ],
    "author": {
      "@type": "Organization",
      "name": "PandaMi",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PandaMi",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"}/logo.svg`
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"
    },
    "keywords": [
      "visagismo",
      "inteligência artificial",
      "análise de cabelo",
      "beleza",
      "diversidade brasileira",
      "IA para cabelo",
      "sugestões personalizadas"
    ],
    "articleSection": "Beleza e Estilo",
    "wordCount": 1500,
    "inLanguage": "pt-BR"
  };

  return <JsonLd data={articleData} id="article-json-ld" />;
};

// Componente para dados estruturados de serviço local
export const LocalBusinessJsonLd = () => {
  const localBusinessData = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"@id": `${
			process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"
		}/#business`,
		name: "PandaMi",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
		telephone: "+55-11-99999-9999",
		email: "contato@pandami.com.br",
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
		name: "PandaMi",
		alternateName: "PandaMi Visagismo",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		inLanguage: "pt-BR",
		copyrightYear: new Date().getFullYear(),
		copyrightHolder: {
			"@type": "Organization",
			name: "PandaMi",
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${
					process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"
				}/search?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
		publisher: {
			"@type": "Organization",
			name: "PandaMi",
			logo: {
				"@type": "ImageObject",
				url: `${
					process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"
				}/logo.svg`,
			},
		},
	};

  return <JsonLd data={webSiteData} id="website-json-ld" />;
};
