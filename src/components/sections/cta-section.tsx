'use client'

import React, { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";
import { EbookDownloadModal } from "@/components/ebook-download-modal";

export const CtaSection: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<section id="cta" className="py-20 bg-[#f5f6f8]" data-animate-section>
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-30">
				<div className="relative flex flex-col lg:flex-row items-end lg:items-center  justify-between gap-8 lg:gap-12">
					{/* Card principal com gradiente */}
					<div className="relative w-full h-auto rounded-[20px] border border-[#898989] overflow-hidden bg-linear-to-br from-[hsl(var(--primary-gradient-from))] via-[#050505] to-[hsl(var(--primary-gradient-to))] flex flex-col justify-center px-8 sm:px-12 lg:px-16 pb-12 sm:pb-16 lg:pb-20 gap-6 lg:gap-8 pt-30 lg:py-20">
						<h2 className="text-white text-2xl sm:text-3xl lg:text-[40px] font-semibold leading-[1.2] max-w-[712px]">
							Baixe agora Ebook completo passo a passo para obter o Visto
							Americano e trabalhar legalmente nos EUA
						</h2>

						<PrimaryButton
							size="lg"
							icon={<Download className="size-4 lg:size-5" />}
							variant="outline"
							className="border border-white bg-transparent hover:bg-white/10 text-white px-4 py-3 lg:px-6 lg:py-4 rounded-2xl text-base lg:text-xl font-bold w-full sm:w-auto max-w-fit"
							onClick={handleOpenModal}
						>
							Baixar meu ebook agora
						</PrimaryButton>
					</div>

					<div className="absolute bottom-70 right-0 left-0  mx-auto lg:left-auto lg:bottom-0 lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full sm:w-[400px] lg:w-[476px] h-[300px] sm:h-[400px] lg:h-[580px]">
						<Image
							src="/images/passaporte-blindado-ebook.png"
							alt="Ebook Passaporte Blindado - Seus primeiros 7 dias nos EUA"
							width={476}
							height={580}
							className="w-full h-full object-contain"
							priority
						/>
					</div>
				</div>
			</div>

			{/* Modal de download do ebook */}
			<EbookDownloadModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</section>
	);
};
