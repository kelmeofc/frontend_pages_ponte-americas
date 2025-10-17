import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";
import { HeroIcon } from "@/components/svg/hero-icon";
import { Container } from "../ui/container";

export const CtaSection: React.FC = () => {
	return (
		<section id="cta" className="py-20">
			<Container>
				{" "}
				<div className="relative">
					<div className="px-6 md:px-16 py-8 mt-48 md:mt-0  lg:mt-28 bg-orange-50 rounded-2xl flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-8 md:gap-10 overflow-hidden ">
						{/* Textos e botão */}
						<div className="w-full md:w-1/2 lg:max-w-[560px] flex flex-col gap-6 z-10">
							<div className="flex flex-col gap-3">
								<h3 className="text-neutral-800 text-2xl md:text-3xl font-bold">
									Transforme incerteza em precisão científica
								</h3>
								<p className="text-neutral-600 text-base font-normal leading-relaxed">
									Seja o primeiro profissional da sua região com análise de IA.
									Enquanto concorrentes ainda "chutam" no visagismo, você
									oferece resultados baseados em ciência.
								</p>
							</div>
							<Link href="https://app.pandami.com.br/auth/sign-up">
								<PrimaryButton
									size="lg"
									icon={<ArrowRight className="h-4 w-4" />}
									className="w-full md:max-w-72 px-4"
								>
									COMEÇAR TESTE DE 7 DIAS
								</PrimaryButton>
							</Link>
						</div>

						{/* Imagem */}
						{/* Elementos decorativos */}
						<div className="relative right-1/2  -mb-20 md:left-auto md:right-10 md:translate-x-0 z-0 opacity-40 md:opacity-70">
							<div className="w-96 h-64 lg:w-full lg:h-full -rotate-45 md:rotate-0">
								<HeroIcon className="w-full h-full" />
							</div>
						</div>
						<div className="absolute -top-[200px] md:bottom-[120px] md:left-24 z-20">
							<Image
								src="/lp/images/ctasection/ctaSection_womanImage.png"
								alt="Mulher usando o visagismo Pandami"
								width={400}
								height={500}
								className="w-80 h-auto max-w-96  md:w-96 md:h-128"
							/>
						</div>

						<div className="absolute left-0 top-0 w-80 h-80 bg-linear-to-br from-orange-400/25 to-white/25 rounded-full blur-[50px] z-0" />
					</div>
				</div>
			</Container>
		</section>
	);
};
