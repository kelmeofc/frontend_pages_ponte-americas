"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "../ui/container";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { PrimaryButton } from "../ui/primary-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface FAQ {
  question: string;
  answer: string;
}

export type FAQArray = readonly FAQ[];

const testimonialAvatars = [
  {
    src: "/testimonials/home/ana-paula.jpg",
    alt: "Ana Paula",
    initials: "AP",
  },
  {
    src: "/testimonials/home/carlos-men.jpg",
    alt: "Carlos Mendes",
    initials: "CM",
  },
  {
    src: "/testimonials/home/jorge-santana.jpg",
    alt: "Jorge Santana",
    initials: "JS",
  },
  {
    src: "/testimonials/home/maria-silva.jpg",
    alt: "Maria Silva",
    initials: "MS",
  },
];

export default function FAQSection({ faq }: { faq: FAQArray }) {
  return (
		<section id="faq" className="w-full py-10 md:py-16 bg-white">
			<Container className="px-4 md:px-6">
				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
					{/* Left column: Title, description, testimonials, CTA */}
					<div className="w-full lg:w-5/12 xl:w-4/12 order-1 lg:order-1">
						<div className="lg:sticky lg:top-20">
							<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
								Perguntas frequentes sobre visagismo com IA
							</h2>
							<p className="text-gray-700 mb-6 md:mb-8 ">
								Tudo que você precisa saber sobre a PandaMi, desde como funciona nossa IA de visagismo até a usabilidade da plataforma.
							</p>

							{/* Testimonials and CTA - positioned after description on mobile, sticky on desktop */}
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<div className="flex -space-x-2 justify-start">
										{testimonialAvatars.map((avatar, i) => (
											<Avatar
												key={i}
												className="border-2 border-white h-8 w-8 md:h-9 md:w-9"
											>
												<AvatarImage src={avatar.src} alt={avatar.alt} />
												<AvatarFallback>{avatar.initials}</AvatarFallback>
											</Avatar>
										))}
									</div>
									<p className="text-sm text-gray-600 text-left">
										+2 mil homens e mulheres já descobriram sua melhor versão
									</p>
								</div>
								<div className="flex justify-center lg:justify-start">
									<Link
										href="https://app.pandami.com.br/auth/sign-up"
										className="w-full"
									>
										<PrimaryButton
											size="lg"
											icon={<ArrowRight className="h-4 w-4" />}
											className="w-full md:w-auto"
										>
											COMEÇAR TESTE DE 7 DIAS
										</PrimaryButton>
									</Link>
								</div>
							</div>
						</div>
					</div>

					{/* Right column: Accordion */}
					<div className="w-full lg:w-7/12 xl:w-8/12 order-2 lg:order-2">
						<Accordion type="single" collapsible className="space-y-2">
							{faq.map((item, index) => (
								<AccordionItem
									key={`faq-${index}`}
									value={`faq-${index}`}
									className="border-b border-gray-200 overflow-hidden"
								>
									<AccordionTrigger className="px-2 py-4 hover:no-underline text-left">
										<span className="text-left font-medium text-sm md:text-base font-sans">
											{item.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="px-2 pb-4 pt-0">
										<p className="text-gray-600 text-sm md:text-base">
											{item.answer}
										</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</Container>
		</section>
	);
}
