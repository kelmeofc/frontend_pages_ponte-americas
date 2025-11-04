"use client";

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
    description: "Conheça o sistema educacional americano, opções para seus filhos ou para você mesmo, desde escolas públicas até universidades e cursos profissionalizantes.",
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
    <article className="w-full max-w-2xl p-6 md:p-8 bg-linear-to-br from-gray-50 via-white to-white rounded-3xl shadow-sm border border-red-200 hover:shadow-lg hover:border-red-300 transition-all duration-300 group">
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
  return (
		<section id="journey" className="py-16 md:py-20 lg:py-24 overflow-hidden">
			<Container>
				<div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 items-start">
					{/* Americas Map - Left Side */}
					<div className="w-full lg:w-96 xl:w-[420px] shrink-0 sticky">
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
						<div className="text-center lg:text-left space-y-4">
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
						<div className="space-y-6 md:space-y-8">
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