import { Metadata } from "next";
import { LegalPageMetadata } from "@/types/legal-metadata";

export const useLegalMetadata = (config: LegalPageMetadata): Metadata => {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: "website",
      locale: "pt_BR",
      siteName: "Pandami",
    },
    twitter: {
      card: "summary",
      title: config.title,
      description: config.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: config.canonical,
    },
  };
};
