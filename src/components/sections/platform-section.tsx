"use client";

import React from "react";
import Image from "next/image";
import { Check, Laptop, Video, Compass, MonitorCheck, FileText } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/primary-button";
import { useRouter } from "next/navigation";

const features: { iconName: string; icon: React.ReactElement; label: string }[] = [
  { iconName: "Laptop", icon: <Laptop />, label: "Acesso à área exclusiva de membros" },
  { iconName: "Video", icon: <Video />, label: "Produção cinematográfica" },
  { iconName: "Compass", icon: <Compass />, label: "Análise de casos reais de viajantes" },
  { iconName: "MonitorCheck", icon: <MonitorCheck />, label: "Suporte garantido 24/7" },
  { iconName: "FileText", icon: <FileText />, label: "Materiais complementares" },
];

export const PlatformSection: React.FC = () => {
  const router = useRouter();
  return (
		<section id="platform" className="bg-white" data-animate-section>
			<Container>
				<div className="flex flex-col md:flex-row items-center gap-8 py-20">
					{/* Image */}
					<div className="w-full md:w-1/2 flex justify-center md:justify-start">
						<Image
							src="/images/platform-banner.png"
							alt="Plataforma Ponte Américas"
							width={632}
							height={512}
							className="w-full max-w-[632px] h-auto rounded-lg object-cover"
							priority
						/>
					</div>

					{/* Content */}
					<div className="w-full md:w-1/2 flex-1">
						<h2 className="text-gray-800  font-semibold uppercase leading-10 mb-4">
							ASSINE UM PROGRAMA DO PONTE AMÉRICAS E TENHA ACESSO A UMA SÉRIE DE{" "}
							<span className="text-indigo-600">BÔNUS</span>
						</h2>

						<p className="text-gray-800 font-medium leading-8 mb-6">
							Em todos os nossos cursos você vai receber:
						</p>

						<ul className="space-y-3 mb-6">
							{features.map((item) => (
								<li key={item.label} className="flex items-center gap-3">
									<span
										className="w-8 h-8 p-2 bg-indigo-50 text-indigo-600 rounded-full shrink-0 flex items-center justify-center"
										aria-hidden="true"
									>
										{item.icon}
									</span>
									<span className="text-gray-800 text-base font-medium font-['Rubik'] leading-5">
										{item.label}
									</span>
								</li>
							))}
						</ul>

						<PrimaryButton
							size="lg"
							className="uppercase"
							href="/programas/passaporte-blindado-morar-nos-eua"
							aria-label="Quero mudar de vida"
						>
							quero mudar de vida
						</PrimaryButton>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default PlatformSection;


