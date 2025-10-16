import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { HeroIcon } from "@/components/svg/hero-icon";

export const CtaSectionBlog: React.FC = () => {
	return (
		<section id="cta-blog" className="py-8 md:py-10">
			<div className="relative">
				<div className="px-4 sm:px-6 md:px-8 py-6 md:py-8 bg-orange-50 rounded-2xl flex flex-col-reverse md:flex-row-reverse justify-between items-center gap-6 md:gap-8 overflow-hidden">
					{/* Textos e botão */}
					<div className="w-full md:w-3/5 lg:max-w-[600px] flex flex-col gap-4 md:gap-6 z-10">
						<div className="flex flex-col gap-2 md:gap-3">
							<h3 className="text-neutral-800 text-xl sm:text-2xl md:text-3xl font-bold">
								Transforme incerteza em precisão científica
							</h3>
							<p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
								Seja o primeiro profissional da sua região com análise de IA.
								Enquanto concorrentes ainda "chutam" no visagismo, você oferece
								resultados baseados em ciência.
							</p>
						</div>
						<Link href="https://app.pandami.com.br/auth/sign-up">
							<PrimaryButton
								size="lg"
								icon={<ArrowRight className="h-4 w-4" />}
								className="w-full px-4 py-3"
							>
								COMEÇAR TESTE DE 7 DIAS
							</PrimaryButton>
						</Link>
					</div>

					{/* Container da imagem com alinhamento ao bottom */}
					<div className="relative w-full md:w-2/5 flex justify-center md:justify-end items-end">
						{/* Elementos decorativos */}
						<div className="absolute right-1/2 md:right-6 -mb-16 md:-mb-18 z-0 opacity-40 md:opacity-70">
							<div className="w-64 h-40 md:w-72 md:h-48 lg:w-80 lg:h-56 -rotate-45 md:rotate-0">
								<HeroIcon className="w-full h-full" />
							</div>
						</div>

						{/* Imagem da mulher alinhada ao bottom */}
						<div className="relative z-20 flex items-end">
							<Image
								src="/lp/images/ctasection/ctaSection_womanImage.png"
								alt="Mulher usando o visagismo Pandami"
								width={250}
								height={320}
								className="w-64 h-auto md:w-72 md:h-auto lg:w-80 lg:h-auto max-w-none"
								priority={false}
							/>
						</div>

						{/* Efeito de blur decorativo */}
						<div className="absolute left-0 top-0 w-60 h-60 md:w-80 md:h-80 bg-gradient-to-br from-orange-400/25 to-white/25 rounded-full blur-[50px] z-0" />
					</div>
				</div>
			</div>
		</section>
	);
};
