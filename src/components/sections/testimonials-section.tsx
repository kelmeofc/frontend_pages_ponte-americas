"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { PrimaryButton } from "@/components/primary-button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
	{
		id: 1,
		image: "/images/instagram-testimonials/depoimento-1.png",
		alt: "Depoimento de cliente satisfeito 1",
	},
	{
		id: 2,
		image: "/images/instagram-testimonials/depoimento-2.png",
		alt: "Depoimento de cliente satisfeito 2",
	},
	{
		id: 3,
		image: "/images/instagram-testimonials/depoimento-3.png",
		alt: "Depoimento de cliente satisfeito 3",
	},
	{
		id: 4,
		image: "/images/instagram-testimonials/depoimento-4.png",
		alt: "Depoimento de cliente satisfeito 4",
	},
	{
		id: 5,
		image: "/images/instagram-testimonials/depoimento-5.png",
		alt: "Depoimento de cliente satisfeito 5",
	},
	{
		id: 6,
		image: "/images/instagram-testimonials/depoimento-6.png",
		alt: "Depoimento de cliente satisfeito 6",
	},
	{
		id: 7,
		image: "/images/instagram-testimonials/depoimento-7.png",
		alt: "Depoimento de cliente satisfeito 7",
	},
];

export interface TestimonialsSectionProps {
	ctaHref?: string;
}

export const TestimonialsSection = ({
	ctaHref = "/programas/passaporte-blindado-morar-nos-eua",
}: TestimonialsSectionProps) => {
	const autoplayRef = useRef(
		Autoplay({ delay: 5000, stopOnInteraction: true })
	);

	return (
		<section
			id="testimonials"
			className="relative w-full py-16 md:py-20 overflow-hidden flex flex-col justify-center items-center gap-8"
			data-animate-section
			data-animate-children=".animate-child"
		>
			{/* Header */}
			<div className="flex flex-col items-center gap-2 text-center max-w-6xl px-4">
				<h2 className="font-semibold text-white uppercase leading-tight animate-child">
					Relatos de quem já mudou a vida
				</h2>
				<p className="text-white text-lg md:text-xl font-normal leading-relaxed animate-child">
					Esses e outros + 150 alunos já vivem o sonho americano
				</p>
			</div>

			{/* Carousel */}
			<div className="w-full md:px-0">
				<Carousel
					opts={{
						align: "center",
						loop: true,
						slidesToScroll: 1,
						containScroll: "trimSnaps",
					}}
					plugins={[autoplayRef.current]}
					className="w-full"
					onMouseEnter={() => autoplayRef.current.stop()}
					onMouseLeave={() => autoplayRef.current.play()}
				>
					<CarouselContent className="mx-10">
						{testimonials.map((testimonial) => (
							<CarouselItem
								key={testimonial.id}
								className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
							>
								<div className="relative w-full aspect-9/21 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[0.98] transition-all duration-300">
									<Image
										src={testimonial.image}
										alt={testimonial.alt}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
										className="object-cover"
										priority={testimonial.id <= 4}
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<div className="absolute top-1/2 -translate-y-1/2 left-4 right-4">
						{/* Custom Navigation Buttons */}
						<CarouselPrevious className=" flex absolute left-4 md:left-50 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20 opacity-50 hover:opacity-80 cursor-pointer">
							<ArrowLeft className="size-4" />
						</CarouselPrevious>

						<CarouselNext className="flex absolute right-4 md:right-50 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20 opacity-50 hover:opacity-80 cursor-pointer">
							<ArrowRight className="size-4" />
						</CarouselNext>
					</div>
				</Carousel>
			</div>

			{/* CTA Button */}
			<PrimaryButton
				size="lg"
				href={ctaHref}
				className="uppercase animate-child"
			>
				Quero mudar de vida
			</PrimaryButton>
		</section>
	);
};
