"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Container } from "../ui/container";
import { PrimaryButton } from "../primary-button";
import Image from "next/image";

export interface FAQ {
  question: string;
  answer: string;
}

export type FAQArray = readonly FAQ[];

export default function FAQSection({ faq }: { faq: FAQArray }) {
  return (
		<section id="faq" className="w-full py-16 md:py-20 bg-gray-50">
			<Container className="px-4 md:px-6">
				<div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
					{/* FAQ Section */}
					<article className="w-full lg:w-2/3">
						<h2 className="text-3xl md:text-4xl font-bold text-[#290886] uppercase">
							Perguntas Frequentes
						</h2>

						<Accordion type="single" collapsible className="w-full space-y-0">
							{faq.map((item, index) => (
								<AccordionItem
									key={`faq-${index}`}
									value={`faq-${index}`}
									className="border-b border-gray-400 last:border-b-0"
								>
									<AccordionTrigger className="px-0 py-4 hover:no-underline text-left justify-between">
										<span className="font-semibold text-base text-gray-800">
											{item.question}
										</span>
									</AccordionTrigger>
									<AccordionContent className="px-0 pb-4 pt-0">
										<p className="text-gray-600 text-base">{item.answer}</p>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</article>

					{/* Warranty Badge Section */}
					<aside className="w-full lg:w-1/3 flex flex-col items-center text-center gap-6">
						<div className="relative w-48 h-48">
							<Image
								src="/images/warranty-badge.png"
								alt="7 Dias de Garantia"
								fill
								className="object-contain"
							/>
						</div>

						<h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] bg-clip-text text-transparent uppercase">
							7 DIAS DE GARANTIA
						</h3>

						<p className="text-gray-800 text-base leading-relaxed">
							Assinando agora, você terá acesso ao conteúdo completo do Ponte
							Américas. Se, em 7 dias assistindo às aulas, você não gostar, nós
							devolvemos todo o seu dinheiro de forma simples e segura.
						</p>

						<PrimaryButton size="lg" className="">
							QUERO MUDAR DE VIDA
						</PrimaryButton>
					</aside>
				</div>
			</Container>
		</section>
	);
}
