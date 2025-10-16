"use client";

import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export const JsonLd = ({ data, id = "json-ld" }: JsonLdProps) => {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Componente específico para FAQ
interface FAQJsonLdProps {
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
}

export const FAQJsonLd = ({ faq }: FAQJsonLdProps) => {
  // Validação: só renderiza se houver FAQs
  if (!faq || faq.length === 0) {
    return null;
  }

  // Validação adicional: verificar se todos os itens têm question e answer
  const validFaq = faq.filter(item => 
    item.question && 
    item.answer && 
    item.question.trim() !== '' && 
    item.answer.trim() !== ''
  );

  if (validFaq.length === 0) {
    return null;
  }

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": validFaq.map((item) => ({
      "@type": "Question",
      "name": item.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.trim()
      }
    }))
  };

  return <JsonLd data={faqStructuredData} id="faq-json-ld" />;
};

// Componente para dados da organização
export const OrganizationJsonLd = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PandaMi",
    "description": "Visagismo com IA ",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"}/logo.svg`,
    "sameAs": [
      "https://www.instagram.com/pandami",
      "https://www.facebook.com/pandami",
      "https://www.linkedin.com/company/pandami"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    }
  };

  return <JsonLd data={organizationData} id="organization-json-ld" />;
};

// Componente para produto/serviço
export const ProductJsonLd = () => {
  const productData = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "PandaMi | Visagismo com IA",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
		applicationCategory: "BeautyApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "BRL",
			description: "Teste grátis de 7 dias",
			availability: "https://schema.org/InStock",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			ratingCount: "2000",
			bestRating: "5",
			worstRating: "1",
		},
		featureList: [
			"Análise de cabelo com IA",
			"Sugestões personalizadas",
			"Compatível com todos os tipos de cabelo",
			"Processamento em 30 segundos",
			"Privacidade garantida",
		],
	};

  return <JsonLd data={productData} id="product-json-ld" />;
};

// Componente para breadcrumbs
export const BreadcrumbJsonLd = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={breadcrumbData} id="breadcrumb-json-ld" />;
};

// Componente para reviews/testimonials
export const ReviewJsonLd = () => {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PandaMi - Visagismo com IA",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ana Paula"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Revolucionou meu trabalho como visagista. A IA é incrível!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Carlos Mendes"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Resultados surpreendentes em poucos segundos."
      }
    ]
  };

  return <JsonLd data={reviewData} id="review-json-ld" />;
};
