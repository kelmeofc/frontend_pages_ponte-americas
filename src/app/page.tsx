import { HeroSection } from "@/components/sections/hero-section";
import { WhyVisagismSection } from "@/components/sections/why-visagism-section";
import { AboutVisagismSection } from "@/components/sections/about-visagism-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import FAQSection from "@/components/sections/faq-section";
import CarouselSection from "@/components/sections/carousel-section";
import { CtaSection } from "@/components/sections/cta-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { BarberTestimonialsSection } from "@/components/sections/barber-testimonials-section";
import { 
	FAQJsonLd, 
	OrganizationJsonLd, 
	ProductJsonLd, 
	BreadcrumbJsonLd, 
	ReviewJsonLd 
} from "@/components/seo/json-ld";
import { 
	ArticleJsonLd, 
	LocalBusinessJsonLd, 
	WebSiteJsonLd 
} from "@/components/seo/article-json-ld";
import { FAQ_DATA, SITE_CONFIG } from "@/common/constants";

// Removidos imports específicos da seção de benefícios (agora componentizada)

export default function Home() {
	const breadcrumbItems = [
		{ name: "Início", url: SITE_CONFIG.url },
		{ name: "Visagismo com IA", url: `${SITE_CONFIG.url}/#visagismo` }
	];

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
			
			<main>
				<HeroSection />
				<WhyVisagismSection />
				<CarouselSection />
				<BenefitsSection />
				<AboutVisagismSection />
				<SocialProofSection />
				<BarberTestimonialsSection />
				<PricingSection />
				<FAQSection faq={FAQ_DATA} />
				<CtaSection />
			</main>
		</>
	);
}
