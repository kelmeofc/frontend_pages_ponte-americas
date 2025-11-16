"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/primary-button";
import {
  Clock,
  IdCard,
  Plane,
  Home,
  Car,
  Heart,
  GraduationCap,
  CreditCard
} from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const JOURNEY_STEPS = [
  {
    id: "planning",
    title: "PLANEJAMENTO",
    description: "Assim como em uma corrida, as aulas do Ponte Américas vão direcionar seu foco a cada etapa específica para melhorar sua adaptação a cada aula assistida.",
    icon: Clock,
  },
  {
    id: "visa-documentation",
    title: "VISTO E DOCUMENTAÇÃO",
    description: "Passo a passo completo sobre vistos, green card, cidadania e todos os documentos necessários para viver legalmente nos EUA.",
    icon: IdCard,
  },
  {
    id: "first-day",
    title: "DIA 01 NOS EUA",
    description: "Assim como em uma corrida, as aulas do Ponte Américas vão direcionar seu foco a cada etapa específica para melhorar sua adaptação a cada aula assistida.",
    icon: Plane,
  },
  {
    id: "real-estate",
    title: "IMÓVEIS E ALUGUÉIS",
    description: "Aprenda todo o processo de locação nos EUA, desde a busca pelo imóvel ideal até a negociação e assinatura do contrato, evitando as armadilhas comuns para estrangeiros.",
    icon: Home,
  },
  {
    id: "transportation",
    title: "VEÍCULOS E TRANSPORTE",
    description: "Descubra como funciona o sistema de transporte americano, como comprar ou alugar um carro, obter uma carteira de motorista e entender as regras de trânsito locais.",
    icon: Car,
  },
  {
    id: "healthcare",
    title: "SAÚDE",
    description: "Entenda o complexo sistema de saúde americano, os diferentes tipos de seguros disponíveis e como acessar serviços médicos quando necessário sem gastar fortunas.",
    icon: Heart,
  },
  {
    id: "education",
    title: "EDUCAÇÃO",
    description: "Conheça o sistema educacional americano, opções para seus filhos ou para você mesmo, desde escolas públicas até universidades e programas profissionalizantes.",
    icon: GraduationCap,
  },
  {
    id: "finance",
    title: "FINANÇAS E BANCOS",
    description: "Aprenda como abrir contas bancárias nos EUA, construir histórico de crédito, gerenciar finanças pessoais e entender impostos no contexto americano.",
    icon: CreditCard,
  },
] as const;

interface JourneyCardProps {
  step: (typeof JOURNEY_STEPS)[number];
  index: number;
}

function JourneyCard({ step, index }: JourneyCardProps) {
  const IconComponent = step.icon;

  return (
    <article 
      className="journey-card w-full max-w-2xl p-6 md:p-8 bg-white rounded-3xl shadow-lg border border-red-200 transition-shadow duration-300 group"
      data-index={index}
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Icon Section */}
        <div className="flex items-center justify-center shrink-0">
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-red-700 flex items-center justify-center transition-opacity duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-linear-to-r from-red-700 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          <GradientText>
            <h3 className="uppercase leading-tight">
              {step.title}
            </h3>
          </GradientText>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-rubik">
            {step.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export function JourneySectionLp() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>(".journey-card");
    
    if (cards.length === 0) return;

    // Set initial state for all cards
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      scale: 0.95,
    });

    // Create animation for each card
    cards.forEach((card, i) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 20%",
          scrub: 1,
          markers: false,
        },
      });

      // Fade in and slide up
      timeline.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
      });

      // Fade out when scrolling past
      timeline.to(card, {
        opacity: 0,
        y: -30,
        scale: 0.4,
        ease: "power2.in",
      }, "+=0.3");
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="journey" className="py-16 md:py-20 lg:py-24 bg-white" data-animate-section data-animate-children=".animate-child">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Americas Map - Left Side */}
          <div className="w-full lg:w-96 xl:w-[420px] shrink-0 lg:sticky lg:top-24 lg:self-start">
            <div className="relative w-full aspect-3/4 lg:h-[500px] overflow-hidden">
              <Image
                src="/images/svg/americas-map.svg"
                alt="Mapa das Américas - Jornada Ponte Américas"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-fill"
                priority
              />
            </div>
          </div>

          {/* Journey Steps - Right Side */}
          <div className="flex-1 space-y-8 lg:space-y-10">
            {/* Section Header */}
            <div className="text-center bg-white/90 p-4 border-gray-50 border rounded-xl lg:text-left space-y-4 lg:sticky lg:top-24 z-10  lg:py-4 lg:-mt-4">
              <span className="inline-block px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold uppercase tracking-wide rounded-full">
                Roadmap completo
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-clash-display leading-tight">
                CADA PASSO DA SUA{" "}
                <GradientText className=" bg-clip-text text-transparent">
                  JORNADA
                </GradientText>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl lg:max-w-none">
                Desde o planejamento até sua completa adaptação nos Estados
                Unidos, cada módulo foi pensado para acelerar seu processo de
                imigração.
              </p>
            </div>

            {/* Journey Cards */}
            <div ref={cardsRef} className="relative space-y-8 md:space-y-12">
              {JOURNEY_STEPS.map((step, index) => (
                <JourneyCard key={step.id} step={step} index={index} />
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start pt-8">
              <PrimaryButton
                size="lg"
                className="uppercase tracking-wide text-base px-8 py-4"
                href="/enroll"
              >
                Quero começar minha jornada
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default JourneySectionLp;