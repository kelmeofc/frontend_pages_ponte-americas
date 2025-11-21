"use client";

import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/primary-button";
import { BenefitCard } from "@/components/sections/benefit-card";
import { ChartNoAxesCombined, Star, Users, Gift } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";

const benefitsData = [
	{
		icon: ChartNoAxesCombined,
		title: "A melhor decisão antes de viajar é o PLANEJAMENTO",
		description:
			"Alunos economizam em média US$50.400 e anos de burocracia só aplicando nosso método de negociação de aluguel.",
	},
	{
		icon: Star,
		title: "Área de Membros e Apostilas EXCLUSIVAS",
		description:
			"Aprenda no SEU ritmo, com apostilas com passo a passo completo e aulas gravadas por especialistas que dominam cada aspecto da vida americana.",
	},
	{
		icon: Users,
		title: "Suporte da Comunidade de BRASILEIROS nos EUA",
		description:
			"86% dos nossos alunos conseguem suas primeiras oportunidades de emprego e moradia através da nossa rede de contato.",
	},
	{
		icon: Gift,
		title: 'Guia "PRIMEIROS 90 Dias"',
		description:
			'Nosso sistema de "Imersão Acelerada" te prepara para cada detalhe crítico: desde abrir conta sem SSN até evitar as 17 multas mais comuns que atingem imigrantes e podem comprometer sua residência legal.',
	},
];

export function BenefitsSection() {
	return (
		<section
			id="benefits"
			className="bg-gray-50 py-16 md:py-20"
			data-animate-section
			data-animate-children=".animate-child"
		>
			<Container className="flex flex-col items-center gap-8">
				{/* Header */}
				<div className="flex flex-col items-center gap-4 text-center max-w-4xl">
					<h2 className="text-gray-800 leading-tight animate-child">
						<GradientText>TUDO QUE VOCÊ PRECISA APRENDER PARA </GradientText>{" "}
						<GradientText>INICIAR SUA VIDA NOS ESTADOS UNIDOS</GradientText>
					</h2>
					<p className="text-lg sm:text-xl text-gray-800 font-normal leading-relaxed animate-child">
						O Ponte Américas não é um simples curso, é um programa de imigração
						completo para conquistar a América sem os erros que custam MILHARES
						de dólares para brasileiros que viajam despreparados.
					</p>
				</div>

				{/* Benefits Grid */}
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
					{benefitsData.map((benefit, index) => (
						<div key={index} className="animate-child">
							<BenefitCard
								icon={benefit.icon}
								title={benefit.title}
								description={benefit.description}
							/>
						</div>
					))}
				</div>

				{/* CTA Button */}
				<PrimaryButton
					size="lg"
					className="uppercase animate-child"
					href="/programas/passaporte-blindado-morar-nos-eua"
				>
					quero mudar de vida
				</PrimaryButton>
			</Container>
		</section>
	);
}
