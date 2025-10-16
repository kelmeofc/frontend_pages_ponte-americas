import type React from "react"
import "./globals.css"
import { Ubuntu, Fahkwang } from "next/font/google"
import { ThemeProvider } from "@/app/providers"
import Footer from "@/components/footer"
import { Header } from "@/components/header"
import Script from "next/script"
import { Metadata } from "next"
import defaultSeo from "@/common/config/default-seo"
import { Modal } from "@/components/ui/modal/modal"
import { CookiesModal } from "@/components/cookies-modal"
import { ConsentScripts } from "@/components/consent-scripts"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
})

const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-fahkwang",
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
			className={`${ubuntu.variable} ${fahkwang.variable}`}
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
					src="https://www.googletagmanager.com/gtag/js?id=G-FPJQ0WXH4J"
					strategy="afterInteractive"
				/>
				<Script id="ga-init" strategy="afterInteractive">
					{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-FPJQ0WXH4J');
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
					disableTransitionOnChange
				>
					<Header />
					{children}
					<Footer />
					<Modal />
					<CookiesModal />
				</ThemeProvider>
			</body>
		</html>
	);
}
