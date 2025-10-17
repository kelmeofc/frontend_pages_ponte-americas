"use client"

import { Container } from "@/components/ui/container"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PrimaryButton } from "@/components/primary-button"
import { HeroAnimatedImage } from "@/components/sections/hero-animated-image"


export function HeroSection() {
  return (
		<section
			id="home"
			className="relative bg-[#f7f7f7] overflow-hidden h-[screen] md:h-auto lg:min-h-[640px] xl:min-h-[700px] flex flex-col"
		>
			{/* Background Grid Pattern */}


			<Container className="flex-1 flex flex-col">
				<div className="relative pt-24 lg:pt-16 pb-0 flex flex-col items-center flex-1">
					{/* Content */}
					<div className="z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full">
						<div className="w-full max-w-[800px] flex flex-col gap-4 md:gap-6 px-0 text-center lg:text-left mb-4 lg:mb-0">
							<h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-black leading-tight">
								A primeira{" "}
								<span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-primary to-[#C16C3F]">
									{" "}
									<br />
									IA de Visagismo
								</span>{" "}
								<br /> para cabeleireiros
							</h1>

							<p className="text-gray-600 max-w-[320px] lg:max-w-[450px] text-sm sm:text-base md:text-lg mx-auto lg:mx-0">
								Nossa inteligência artificial analisa matematicamente cada rosto
								em 30 segundos e sugere exatamente qual corte e cor vão
								valorizar. 94% das clientes aprovam na primeira tentativa.
							</p>

							<div className="flex gap-3 items-center justify-center lg:justify-start mt-2">
								<Link href="https://app.pandami.com.br/auth/sign-up/">
									<PrimaryButton
										icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
										size="lg"
										className="px-4"
									>
										COMEÇAR TESTE DE 7 DIAS
									</PrimaryButton>
								</Link>
							
							</div>
						</div>

					
					</div>
				</div>
			</Container>
		</section>
	);
}
