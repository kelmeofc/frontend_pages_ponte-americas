"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";

export function WhyVisagismSection() {
	const features = [
		{
			title: "47 pontos de medição facial",
			description:
				"Formato do rosto, proporções entre testa/olhos/maxilar, tom e subtom da pele, textura do cabelo, estrutura óssea. Tudo que determina se um corte vai valorizar ou não.",
			image: "/lp/images/bentogrid/BentoGrid-1_Sintonia-Humana.png",
		},
		{
			title: "Elimina tentativa e erro",
			description:
				"Cada rosto tem proporções matemáticas únicas. O que fica perfeito num rosto oval pode ser desastroso num quadrado. A IA calcula isso com precisão.",
			image: "/lp/images/bentogrid/BentoGrid-2_Visual-Inteligente.png",
		},
		{
			title: "94% de aprovação",
			description:
				"Acabaram as surpresas desagradáveis. Clientes saem do salão postando no Instagram na mesma hora. Zero retrabalhos.",
			image: "/lp/images/bentogrid/BentoGrid-3_Imagem-Comunica.png",
		},
		{
			title: "Cliente vê a lógica",
			description:
				'"Este corte alonga seu rosto porque..." "Esta cor realça seu tom de pele porque..." Ela entende o porquê = confiança total.',
			image: "/lp/images/bentogrid/BentoGrid-4_Suas-Regras.png",
		},
	];

	return (
		<section id="why" className="w-full pb-10 pt-24 lg:pb-14 bg-neutral-50">
			<Container>
				<h2 className="text-2xl lg:text-3xl font-semibold text-center mb-2   text-stone-900">
					O que é visagismo e por que profissionais de elite usam?
				</h2>
				<p className="text-center text-gray-600 max-w-4xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
					Visagismo é a ciência que estuda qual corte e cor valorizam cada
					formato de rosto. Vai muito além da intuição: usa cálculos matemáticos
					para criar harmonia entre suas características faciais.
				</p>

				{/* Primeira linha de cards */}
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
					{/* Card 1 - Card maior */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[56%] pt-8 pl-8 gap-8">
						<div className="w-full lg:w-[420px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[0].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[0].description}
							</p>
						</div>

						<Image
							src={features[0].image}
							alt="Sintonia Humana"
							width={400}
							height={300}
							className="lg:w-[40%] w-full max-w-[280px] max-h-[400px] md:max-w-[320px] lg:max-w-none h-full object-contain object-bottom mx-auto lg:mx-0"
							sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 40vw"
						/>
					</div>

					{/* Card 2 - Card menor */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[44%] pt-8 pl-8 justify-between gap-8">
						<div className="w-full lg:w-[360px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[1].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[1].description}
							</p>
						</div>

						<Image
							src={features[1].image}
							alt="Visual Inteligente"
							width={400}
							height={300}
							className="lg:w-[40%] w-full max-w-[280px] max-h-[400px] md:max-w-[320px] lg:max-w-none h-full object-contain object-right ml-auto"
							sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 30vw"
						/>
					</div>
				</div>

				{/* Segunda linha de cards */}
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
					{/* Card 3 - Card menor */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[42%] pt-8 pl-8 justify-between gap-8">
						<div className="w-full lg:w-[240px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[2].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[2].description}
							</p>
						</div>

						<Image
							src={features[2].image}
							alt="Imagem Comunica"
							width={400}
							height={300}
							className="lg:w-[40%] w-full max-w-[280px] max-h-[400px] md:max-w-[320px] lg:max-w-none h-full object-contain object-bottom mx-auto lg:mx-0"
							sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 30vw"
						/>
					</div>

					{/* Card 4 - Card maior */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[58%] pt-8 pl-8 justify-between gap-4">
						<div className="w-full lg:w-[360px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[3].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[3].description}
							</p>
						</div>

						<Image
							src={features[3].image}
							alt="Suas Regras"
							width={400}
							height={300}
							className="lg:w-[40%] w-full max-w-[280px] max-h-[400px] md:max-w-[320px] lg:max-w-none h-full object-contain object-bottom ml-auto"
							sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 30vw"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}
