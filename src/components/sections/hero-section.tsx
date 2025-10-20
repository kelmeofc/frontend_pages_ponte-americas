"use client"

import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/primary-button"
import { GradientText } from "@/components/ui/gradient-text"
import { HeroTestimonial } from "./hero-testimonial"
import { HeroVideo } from "./hero-video"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
		<section
			id="home"
			className="relative min-h-screen bg-gradient-to-r from-[#05060b] to-[#05060b] overflow-hidden"
		>
			<Container className="flex flex-col items-center justify-center min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 gap-2">
				{/* Testimonial */}
				<HeroTestimonial />

				{/* Description */}
				<p className="text-gray-200 text-sm sm:text-base max-w-3xl leading-relaxed text-center">
					Não é um simples curso, somos um time completo para te ajudar a
					entender os Estados Unidos evitando os erros que custam MILHARES de
					dólares para brasileiros que viajam despreparados.  
				</p>

				{/* Main Heading */}
				<h1 className="font-clash-display  font-semibold leading-tight text-center mb-8">
					<GradientText>A VIRADA DE CHAVE</GradientText>
					<br className="sm:hidden" />
					<span className="text-white ml-3">PARA MORAR NOS EUA</span>
					<br />
					<span className="text-white">QUE VOCÊ PRECISA ENTENDER AGORA</span>
				</h1>

				{/* Video */}
				<HeroVideo className="w-full max-w-[573px] mb-8" />

				{/* CTA Button */}
				<PrimaryButton
					icon={<ArrowRight className="size-4" />}
					size="lg"
					className="bg-gradient-to-r from-[#bb0711] to-[#3f4adf] text-white font-medium px-8 py-4 rounded-lg"
				>
					QUERO MUDAR DE VIDA
				</PrimaryButton>
			</Container>
		</section>
	);
}
