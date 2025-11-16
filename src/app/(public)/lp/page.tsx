"use client";

import { HeroSectionLp } from "@/components/lp/sections/hero-section-lp";
import { JourneySectionLp } from "@/components/lp/sections/journey-section-lp";
import { IcebreakerSectionLp } from "@/components/lp/sections/icebreaker-section-lp";
import { ComparisonSectionLp } from "@/components/lp/sections/comparison-section-lp";
import { PricingSectionLp } from "@/components/lp/sections/pricing-section-lp";

import { TestimonialsSection } from "@/components/sections/testimonials-section";
import TeacherSection from "@/components/lp/sections/teacher-section";
import { FAQSection } from "@/components/sections/faq-section";
import WhatsAppWidget from "@/components/whatsapp-widget";
import { useGsapSectionAnimation } from "@/common/hooks/use-gsap-section-animation";

import {
	FAQJsonLd,
	OrganizationJsonLd,
	ProductJsonLd,
	BreadcrumbJsonLd,
	ReviewJsonLd,
} from "@/components/seo/json-ld";
import {
	ArticleJsonLd,
	LocalBusinessJsonLd,
	WebSiteJsonLd,
} from "@/components/seo/article-json-ld";
import { FAQ_DATA, SITE_CONFIG } from "@/common/constants";
import SiteLayout from "@/components/layouts/site-layout";
import type {
	INavItem,
	IActionButtons,
	ILanguageOptions,
} from "@/types/header";

// Constantes de navegação específicas para a Landing Page
const LP_NAVIGATION_ITEMS: INavItem[] = [
	{
		title: "Início",
		href: "#hero",
	},
	{
		title: "Mentor",
		href: "#teacher",
	},
	{
		title: "Jornada",
		href: "#journey",
	},
	{
		title: "Depoimentos",
		href: "#testimonials",
	},
	{
		title: "Vantagens",
		href: "#comparison",
	},
];

// Botões de ação específicos para a LP
const LP_ACTION_BUTTONS: IActionButtons = {
	member: {
		href: "/members",
		text: "JÁ SOU ALUNO",
		variant: "outline",
		icon: <></>,
		mobileIcon: <></>,
	},
	cta: {
		href: "#pricing",
		text: "COMEÇAR AGORA",
		variant: "default",
		icon: <></>,
		mobileIcon: <></>,
	},
};

export default function Home() {
	// Initialize GSAP section animations
	useGsapSectionAnimation();

	const breadcrumbItems = [
		{ name: "Início", url: SITE_CONFIG.url },
		{ name: "Programa Ponte Américas", url: `${SITE_CONFIG.url}/#programa` },
	];

	// Dados dos tópicos didáticos importados das constantes

	return (
		<>
			{/* JSON-LD Structured Data */}
			<WebSiteJsonLd />
			<OrganizationJsonLd />
			<LocalBusinessJsonLd />
			<ProductJsonLd />
			<ArticleJsonLd />
			<FAQJsonLd faq={FAQ_DATA} />
			<BreadcrumbJsonLd items={breadcrumbItems} />
			<ReviewJsonLd />
			<SiteLayout
				className="bg-white"
				navItems={LP_NAVIGATION_ITEMS}
				actionButtons={LP_ACTION_BUTTONS}
			>
				<div
					className="bg-black"
					style={{
						background:
							"radial-gradient(37.55% 29.18% at 113.44% 43.98%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(54.06% 49.74% at 40.94% 68.84%, rgba(41, 8, 134, 0.20) 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(68.5% 61.39% at 55.21% -19.94%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(49.46% 42.97% at -9.9% 105.52%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), #05060B",
					}}
				>
					<HeroSectionLp />
				</div>

				<TeacherSection />

				<JourneySectionLp />
				<div
					className="bg-black"
					style={{
						background:
							"radial-gradient(45.87% 45.13% at 115.62% -4.79%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(58.16% 77.72% at -29.41% 62.58%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(17.21% 19.98% at 107.36% 43.68%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(46.08% 71.01% at 0% 107.07%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(35.99% 40.17% at 27.71% -5.08%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), #000",
					}}
				>
					<TestimonialsSection ctaHref="/enroll" />
				</div>

				<IcebreakerSectionLp />
				<ComparisonSectionLp />
				<PricingSectionLp />
				<FAQSection faq={FAQ_DATA} ctaHref="/enroll" />
			</SiteLayout>

			{/* WhatsApp Widget */}
			<WhatsAppWidget
				message="Olá! Estou interessado em me matricular no Programa Ponte Américas. Gostaria de saber mais informações."
				phoneNumber="13214296742"
				position="bottom-right"
				size="md"
				showPulse={true}
			/>
		</>
	);
}
