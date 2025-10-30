import Image from 'next/image';
import { PrimaryButton } from '@/components/primary-button';
import { GradientText } from '@/components/ui/gradient-text';

export function AboutusSection() {
  return (
		<section id="about-us" className="w-full bg-white py-16 lg:py-28">
			<div className="container mx-auto px-4 lg:px-28">
				<div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
					{/* Left Column - Text Content */}
					<div className="w-full lg:w-[627px] flex flex-col justify-start items-start gap-6">
						<div className="w-full flex flex-col justify-start items-start gap-4">
							<h2 className="w-full text-3xl lg:text-4xl font-semibold font-clash-display uppercase leading-tight">
								<GradientText>
									o time que vai te guiar <br className="sm:hidden" />{" "}
									durante toda a jornada
								</GradientText>
							</h2>
							<div className="w-full text-gray-800 text-lg lg:text-xl font-normal font-sans leading-relaxed">
								<p className="mb-4">
									O sonho americano vira um pesadelo que custa milhares de
									dólares quando você vem na raça e na coragem. Nossa família
									está nos EUA desde 2012 e já ralamos muito pra te entregar o
									caminho das pedras.
								</p>
								<p className="mb-4">
									O Ponte Américas é seu mentor particular de especialistas em
									visto, imóveis, saúde, educação e toda a sua vida nos Estados
									Unidos, garantindo que você não passe por perrengue e corra o
									risco de ser multado e deportado na gringa.
								</p>
								<p>
									Hoje, nosso time de especialistas não te entrega teoria, mas
									sim o plano de ação exato, blindado e validado com vários
									clientes, somos a ponte que gostaríamos de ter tido quando
									chegamos aqui, e vamos guiar você e sua família por cada
									centímetro dessa jornada de como funciona a América!
								</p>
							</div>
						</div>
						<PrimaryButton
							variant="default"
							size="lg"
							className="uppercase"
							href="/lp"
						>
							quero mudar de vida
						</PrimaryButton>
					</div>

					{/* Right Column - Image Collage */}
					<div className="w-full lg:w-[539px] relative flex flex-col justify-center items-center h-[484px]">
						{/* Main Image - American Flag */}
						<div className="absolute lg:left-[114px] lg:top-[59px] z-10">
							<Image
								src="/images/about-us-section/image-card-1.png"
								alt="Bandeira americana"
								width={320}
								height={484}
								className="h-[484px] lg:w-80 md:w-120 md:h-[484px] lg:h-[484px] rounded-lg object-cover object-top"
								priority
							/>
						</div>

						{/* Top Right Image - Disney Castle */}
						<div className="absolute right-[23px] top-[21px] z-20">
							<Image
								src="/images/about-us-section/image-card-2.png"
								alt="Castelo da Cinderela"
								width={336}
								height={432}
								className="w-28 h-36 rounded-lg object-cover"
							/>
						</div>

						{/* Bottom Right Image - Beach */}
						<div className="absolute right-[0px] bottom-[-40px] lg:bottom-[-90px] z-20">
							<Image
								src="/images/about-us-section/image-card-3.png"
								alt="Praia tropical"
								width={416}
								height={256}
								className="w-52 h-32 rounded-lg object-cover"
							/>
						</div>

						{/* Mid Left Image - Mountain Road */}
						<div className="absolute left-[23px] top-[257px] z-20">
							<Image
								src="/images/about-us-section/image-card-4.png"
								alt="Estrada nas montanhas"
								width={228}
								height={320}
								className="w-32 h-40 rounded-lg object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
