import type React from "react"
import "./globals.css"

import { ThemeProvider } from "@/app/providers"
import Footer from "@/components/footer"
import { Header } from "@/components/header"
import Script from "next/script"
import { Metadata } from "next"
import defaultSeo from "@/common/config/default-seo"
import { Modal } from "@/components/ui/modal/modal"
import { CookiesModal } from "@/components/cookies-modal"
import { ConsentScripts } from "@/components/consent-scripts"
import WhatsAppWidget from "@/components/whatsapp-widget"

import { Rubik } from "next/font/google";
import localFont from "next/font/local";

export const clashDisplay = localFont({
	src: [
		{
			path: "../../public/fonts/ClashDisplay-Extralight.woff2",
			weight: "200",
			style: "normal",
		},
		{
			path: "../../public/fonts/ClashDisplay-Light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/ClashDisplay-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/ClashDisplay-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/ClashDisplay-Semibold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../../public/fonts/ClashDisplay-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-clash-display", // Optional: for use with CSS variables
	display: "swap", // Recommended for performance
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: defaultSeo.openGraph,
  twitter: defaultSeo.twitter,
  alternates: defaultSeo.alternates,
  authors: [{ name: 'PandaMi' }],
  creator: 'PandaMi',
  publisher: 'PandaMi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<html
			lang="pt-BR"
			suppressHydrationWarning
			className={`${rubik.variable} ${clashDisplay.variable}`}
		>
			<head>
				<Script id="ga-consent-default" strategy="beforeInteractive">
					{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Padrão: negar até o usuário escolher
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
              // Sinais essenciais sem cookies
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `}
				</Script>
				{/* GA sempre carregado para pings essenciais (consent negado por padrão) */}
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-TGLSCTDKDL"
					strategy="afterInteractive"
				/>
				<Script id="ga-init" strategy="afterInteractive">
					{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-TGLSCTDKDL');
            `}
				</Script>
				{/* Scripts dependentes de consentimento */}
				<ConsentScripts />
			</head>
			<body className={`font-sans`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
				>
					{children}
					<Modal />
					<CookiesModal />
					<WhatsAppWidget />
				</ThemeProvider>
			</body>
		</html>
	);
}
