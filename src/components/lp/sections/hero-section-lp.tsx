"use client"

import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/primary-button"
import { GradientText } from "@/components/ui/gradient-text"
import { HeroVideo } from "@/components/sections/hero-video"
import { HeroBenefitsList } from "../hero-benefits-list"
import { ArrowRight } from "lucide-react"
import type { HeroSectionProps } from "@/types"

export function HeroSectionLp({ 
	title, 
	subtitle, 
	ctaText, 
	ctaHref, 
	videoSrc, 
	posterImage 
}: HeroSectionProps) {
	return (
		<section
			id="hero"
			className="relative min-h-screen overflow-hidden"
			data-animate-section
			data-animate-children=".animate-child"
		>
			<Container className="flex flex-col items-center justify-center min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 gap-2">


				{/* Description */}

				{/* Main Heading */}
				<h1 className="font-semibold leading-tight text-center">
					<GradientText>{title}</GradientText>
					<br className="sm:hidden" />
					<span className="text-white ml-3">{subtitle}</span>
				</h1>

				{/* Benefits List */}
				<HeroBenefitsList className="mb-6" />

				{/* Video */}
				<HeroVideo 
					src={videoSrc}
					poster={posterImage}
					className="w-full max-w-[650px] mb-2" 
				/>

				{/* CTA Button */}
				<PrimaryButton
					icon={<ArrowRight className="size-4" />}
					size="lg"
					href={ctaHref}
					className="bg-linear-to-r from-[#bb0711] to-[#3f4adf] text-white font-medium px-8 py-4 rounded-lg"
				>
					{ctaText}
				</PrimaryButton>
			</Container>
		</section>
	);
}
