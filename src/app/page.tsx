import { HeroSection } from "@/components/sections/hero-section";
import { AboutusSection } from "@/components/sections/aboutus-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { DidaticSection } from "@/components/sections/didatic-section";
import { CoursesSection } from "@/components/sections/courses-section";
import FAQSection from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import WhatsAppWidget from "@/components/whatsapp-widget";

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
import { FAQ_DATA, SITE_CONFIG, DIDATIC_TOPICS } from "@/common/constants";

// Removidos imports específicos da seção de benefícios (agora componentizada)

export default function Home() {
	const breadcrumbItems = [
		{ name: "Início", url: SITE_CONFIG.url },
		{ name: "Visagismo com IA", url: `${SITE_CONFIG.url}/#visagismo` }
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

			<main>
				<HeroSection />
				<CoursesSection />
				<AboutusSection />
				<DidaticSection topics={DIDATIC_TOPICS} />
				<BenefitsSection />
				<FAQSection faq={FAQ_DATA} />
				<CtaSection />
			</main>

			{/* WhatsApp Widget */}
			<WhatsAppWidget
				message="Olá! Gostaria de saber mais sobre o Ponte Américas e como posso começar minha jornada nos Estados Unidos."
				phoneNumber="5511999999999"
				position="bottom-right"
				size="md"
				showPulse={true}
			/>
		</>
	);
}
