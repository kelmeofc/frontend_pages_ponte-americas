import { HeroSectionLp } from "@/components/lp/sections/hero-section-lp";

import { TestimonialsSection } from "@/components/sections/testimonials-section";
import TeacherSection from "@/components/sections/teacher-section";
import FAQSection from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import WhatsAppWidget from "@/components/whatsapp-widget";

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
import { FAQ_DATA, SITE_CONFIG, DIDATIC_TOPICS } from "@/common/constants";

// Removidos imports específicos da seção de benefícios (agora componentizada)

export default function Home() {
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

      <main>
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

        <div
          className="bg-black"
          style={{
            background:
              "radial-gradient(45.87% 45.13% at 115.62% -4.79%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(58.16% 77.72% at -29.41% 62.58%, #B00D23 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(17.21% 19.98% at 107.36% 43.68%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(46.08% 71.01% at 0% 107.07%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), radial-gradient(35.99% 40.17% at 27.71% -5.08%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), #000",
          }}
        >
          <TestimonialsSection />
        </div>

    
        <FAQSection faq={FAQ_DATA} />
        <CtaSection />
      </main>

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
