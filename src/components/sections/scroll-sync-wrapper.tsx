"use client";

import { useEffect, useRef } from "react";

interface ScrollSyncWrapperProps {
	article: React.ReactNode;
	sidebar: React.ReactNode;
}

export function ScrollSyncWrapper({
	article,
	sidebar,
}: ScrollSyncWrapperProps) {
	const articleRef = useRef<HTMLElement>(null);
	const navRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (articleRef.current && navRef.current) {
				// Calcula a posição do scroll em relação ao viewport
				const viewportHeight = window.innerHeight;
				const articleTop = articleRef.current.getBoundingClientRect().top;
				const articleHeight = articleRef.current.scrollHeight;

				// Calcula uma porcentagem de scroll mais agressiva
				// Isso fará com que a navbar chegue ao final mais rapidamente
				const scrollProgress = Math.abs(articleTop) / (articleHeight * 1.5);
				const normalizedProgress = Math.min(Math.max(scrollProgress, 0), 1);

				// Aplica o scroll à navbar apenas se ela tiver conteúdo que excede a altura
				// E apenas se não estivermos usando sticky positioning
				if (
					navRef.current.scrollHeight > navRef.current.clientHeight &&
					window.innerWidth < 1024
				) {
					const maxNavScroll =
						navRef.current.scrollHeight - navRef.current.clientHeight;
					navRef.current.scrollTop = maxNavScroll * normalizedProgress;
				}
			}
		};

		// Só adiciona o listener se estivermos no mobile/tablet
		const isMobile = window.innerWidth < 1024;
		if (isMobile) {
			window.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (isMobile) {
				window.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,330px)] gap-8 py-16 relative">
			<aside
				ref={navRef}
				className="w-full lg:sticky lg:top-5 flex flex-col gap-4 py-4 order-2 lg:order-2 lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto scrollbar-none lg:align-start lg:self-start lg:z-10"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				<style jsx global>{`
					aside::-webkit-scrollbar {
						display: none;
					}
				`}</style>
				{sidebar}
			</aside>

			<section
				ref={articleRef}
				className="w-full overflow-hidden order-1 lg:order-1"
			>
				{article}
			</section>
		</div>
	);
}
