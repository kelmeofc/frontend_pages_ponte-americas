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
			className="relative min-h-screen overflow-hidden"
			data-animate-section
			data-animate-children=".animate-child"
		>
			<Container className="flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 gap-[8px]">
				{/* Testimonial */}
				<div className="animate-child">
					<HeroTestimonial />
				</div>

				{/* Description */}

				{/* Main Heading */}
				<h1 className="font-clash-display  font-semibold leading-tight text-center animate-child">
					<GradientText>A VIRADA DE CHAVE</GradientText>
					<br className="sm:hidden" />
					<span className="text-white ml-3">PARA MORAR NOS EUA</span>
					<br />
					<span className="text-white">QUE VOCÊ PRECISA ENTENDER AGORA</span>
				</h1>
				<p className="text-gray-300 text-sm sm:text-base max-w-3xl leading-relaxed text-center animate-child">
					Não é um simples curso, somos um programa completo para te ajudar a
					entender os Estados Unidos evitando os erros que custam MILHARES de
					dólares para brasileiros que viajam despreparados.
				</p>

				{/* Video */}
				<div className="animate-child">
					<HeroVideo className="w-full max-w-[650px] mb-2" />
				</div>

				{/* CTA Button */}
				<PrimaryButton
					icon={<ArrowRight className="size-4" />}
					href="/lp"
					size="lg"
					className="bg-linear-to-r from-[#bb0711] to-[#3f4adf] text-white font-medium px-8 py-4 rounded-lg"
				>
					QUERO MUDAR DE VIDA
				</PrimaryButton>
			</Container>
		</section>
	);
}
