"use client";

import { Container } from "@/components/ui/container";
import { BadgeIcon } from "@/components/svg/badge-icon";
import { ImageComparisonSlider } from "./image-comparison-slider";
import { useRef, useEffect, useCallback, useMemo } from "react";
import gsap from "gsap";

// Tipos otimizados para melhor performance e type safety
interface BeforeAfterPair {
	readonly beforeSrc: string;
	readonly afterSrc: string;
	readonly beforeAlt: string;
	readonly afterAlt: string;
	readonly className?: string;
}

interface MarqueeRowProps {
	readonly items: readonly BeforeAfterPair[];
	readonly reverse?: boolean;
	readonly speed?: number; // Velocidade: valores menores = mais rápido, maiores = mais lento
}

// Constantes para melhor manutenção e performance
const ANIMATION_CONFIG = {
	MIN_DURATION: 10, // Duração mínima (mais rápido)
	MAX_DURATION: 120, // Duração máxima (mais lento)
	BASE_SPEED: 50, // Velocidade base para cálculos
	RESIZE_THROTTLE: 200,
	INTERSECTION_THRESHOLD: 0.1,
	GAP_BETWEEN_ITEMS: 6,
	EDGE_FADE_WIDTH: 24,
} as const;

// Função auxiliar otimizada para criar pares de imagens
const createImagePair = (
	gender: "woman" | "man",
	index: number,
	className: string = "w-64 h-72"
): BeforeAfterPair =>
	({
		beforeSrc: `/lp/images/carrousel/${gender}-${index}-before.png`,
		afterSrc: `/lp/images/carrousel/${gender}-${index}-after.png`,
		beforeAlt: `${gender === "woman" ? "Mulher" : "Homem"} antes do visagismo`,
		afterAlt: `${gender === "woman" ? "Mulher" : "Homem"} depois do visagismo`,
		className,
	} as const);

// Dados das imagens - memoizados para evitar recriação
const womenPairs = [
	createImagePair("woman", 1),
	createImagePair("woman", 2, "w-72 h-72"),
	createImagePair("woman", 3, "w-56 h-72"),
	createImagePair("woman", 4),
	createImagePair("woman", 5),
] as const;

const menPairs = [
	createImagePair("man", 1),
	createImagePair("man", 2, "w-80 h-72"),
	createImagePair("man", 3),
	createImagePair("man", 4),
	createImagePair("man", 5),
] as const;

/**
 * MarqueeRow - Componente de rolagem infinita otimizado usando GSAP
 * @param items - Array readonly de pares de imagens antes/depois
 * @param reverse - Se verdadeiro, a direção da animação é invertida
 * @param speed - Velocidade da animação (maior = mais lento)
 */
function MarqueeRow({ items, reverse = false, speed = 50 }: MarqueeRowProps) {
	// Referências otimizadas com tipos específicos
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const firstRowRef = useRef<HTMLDivElement>(null);
	const secondRowRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Timeline | null>(null);
	const resizeTimerRef = useRef<number | null>(null);

	// Cálculo corrigido da duração da animação baseado na velocidade
	const animationDuration = useMemo(() => {
		// Inversão da lógica: speed menor = animação mais rápida
		const baseSpeed = speed || ANIMATION_CONFIG.BASE_SPEED;

		// Cálculo inverso: valores menores de speed resultam em menor duração
		const calculatedDuration = ANIMATION_CONFIG.BASE_SPEED / baseSpeed * 30;

		// Limitação dentro dos valores mínimos e máximos
		return Math.max(
			ANIMATION_CONFIG.MIN_DURATION,
			Math.min(ANIMATION_CONFIG.MAX_DURATION, calculatedDuration)
		);
	}, [speed]);

	// Função otimizada para configurar o marquee
	const setupMarquee = useCallback(() => {
		if (!firstRowRef.current || !secondRowRef.current || !trackRef.current) {
			return 0;
		}

		const firstRow = firstRowRef.current;
		const secondRow = secondRowRef.current;
		const track = trackRef.current;
		const firstRowWidth = firstRow.offsetWidth;

		// Configuração otimizada dos elementos
		gsap.set(secondRow, {
			position: "absolute",
			left: firstRowWidth,
			top: 0,
		});

		gsap.set(track, {
			width: firstRowWidth * 2,
			position: "relative",
			x: reverse ? -firstRowWidth : 0,
		});

		return firstRowWidth;
	}, [reverse]);

	// Função otimizada para reset da posição
	const resetPosition = useCallback((newPosition: number) => {
		if (trackRef.current) {
			gsap.set(trackRef.current, { x: newPosition });
		}
	}, []);

	// Função otimizada para criar timeline
	const createTimeline = useCallback(
		(firstRowWidth: number) => {
			if (!trackRef.current) return null;

			const timeline = gsap.timeline({
				repeat: -1,
				defaults: {
					ease: "linear",
					duration: animationDuration, // Duração agora é inversamente proporcional à velocidade
				},
			});

			if (reverse) {
				timeline.to(trackRef.current, {
					x: 0,
					onComplete: () => resetPosition(-firstRowWidth),
				});
			} else {
				timeline.to(trackRef.current, {
					x: -firstRowWidth,
					onComplete: () => resetPosition(0),
				});
			}

			return timeline;
		},
		[animationDuration, reverse, resetPosition]
	);

	// Função otimizada para redimensionamento
	const handleResize = useCallback(() => {
		if (resizeTimerRef.current) {
			window.clearTimeout(resizeTimerRef.current);
		}

		resizeTimerRef.current = window.setTimeout(() => {
			if (!animationRef.current) return;

			animationRef.current.kill();

			const updatedWidth = setupMarquee();
			if (updatedWidth > 0) {
				animationRef.current = createTimeline(updatedWidth);
			}
		}, ANIMATION_CONFIG.RESIZE_THROTTLE);
	}, [setupMarquee, createTimeline]);

	// Efeito principal otimizado
	useEffect(() => {
		// Verificações de segurança
		if (
			!containerRef.current ||
			!trackRef.current ||
			!firstRowRef.current ||
			!secondRowRef.current
		) {
			return;
		}

		const container = containerRef.current;

		// Limpa animações anteriores
		if (animationRef.current) {
			animationRef.current.kill();
		}

		// Configura o marquee
		const firstRowWidth = setupMarquee();
		if (firstRowWidth === 0) return;

		// Cria e inicia a timeline
		animationRef.current = createTimeline(firstRowWidth);

		// Observer otimizado para visibilidade
		const visibilityObserver = new IntersectionObserver(
			([entry]) => {
				if (!animationRef.current) return;

				if (entry.isIntersecting) {
					animationRef.current.play();
				} else {
					animationRef.current.pause();
				}
			},
			{ threshold: ANIMATION_CONFIG.INTERSECTION_THRESHOLD }
		);

		visibilityObserver.observe(container);

		// Event listener otimizado para resize
		window.addEventListener("resize", handleResize, { passive: true });

		// Cleanup otimizado
		return () => {
			if (animationRef.current) {
				animationRef.current.kill();
			}
			if (resizeTimerRef.current) {
				window.clearTimeout(resizeTimerRef.current);
			}
			visibilityObserver.disconnect();
			window.removeEventListener("resize", handleResize);
		};
	}, [reverse, animationDuration, setupMarquee, createTimeline, handleResize]);

	return (
		<div ref={containerRef} className="relative w-full overflow-hidden">
			<div
				ref={trackRef}
				className="will-change-transform"
				style={{ display: "flex", position: "relative" }}
			>
				{/* Primeira sequência de imagens */}
				<div
					ref={firstRowRef}
					className="flex flex-nowrap shrink-0"
					style={{
						gap: `${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
						padding: `0 ${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 1}px`,
					}}
				>
					{items.map((item, i) => (
						<div key={`first-${i}`} className="relative shrink-0">
							<ImageComparisonSlider
								beforeImage={item.beforeSrc}
								afterImage={item.afterSrc}
								beforeAlt={item.beforeAlt}
								afterAlt={item.afterAlt}
								className={item.className}
							/>
						</div>
					))}
				</div>

				{/* Segunda sequência de imagens duplicada */}
				<div
					ref={secondRowRef}
					className="flex flex-nowrap shrink-0"
					style={{
						gap: `${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
						padding: `0 ${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
					}}
				>
					{items.map((item, i) => (
						<div key={`second-${i}`} className="relative shrink-0">
							<ImageComparisonSlider
								beforeImage={item.beforeSrc}
								afterImage={item.afterSrc}
								beforeAlt={item.beforeAlt}
								afterAlt={item.afterAlt}
								className={item.className}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Efeito de fade nas bordas laterais otimizado */}
			<div
				className="pointer-events-none absolute inset-y-0 left-0 bg-linear-to-r from-neutral-50 to-transparent z-10"
				style={{ width: `${ANIMATION_CONFIG.EDGE_FADE_WIDTH}px` }}
			/>
			<div
				className="pointer-events-none absolute inset-y-0 right-0 bg-linear-to-l from-neutral-50 to-transparent z-10"
				style={{ width: `${ANIMATION_CONFIG.EDGE_FADE_WIDTH}px` }}
			/>
		</div>
	);
}

/**
 * CarouselSection - Seção otimizada de showcase de transformações visuais
 * Exibe uma seleção de imagens antes/depois em rolagem automática infinita
 */
export default function CarouselSection() {
	return (
		<>
			<div className="bg-neutral-800">
				<section
					id="carousel"
					className="w-full pt-20 pb-40 bg-neutral-50 overflow-hidden relative flex flex-col justify-center items-center rounded-bl-[32px] rounded-br-[32px]"
				>
					<Container>
						{/* Cabeçalho da seção otimizado */}
						<div className="max-w-3xl mx-auto text-center mb-12">
							<h2 className="font-semibold text-center mb-2   text-neutral-900">
								Transformações reais de{" "}
								<span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-primary to-[#C16C3F]">
									visagismo
								</span>{" "}
								feito por nossa IA
							</h2>

							<p className="text-center text-neutral-600 max-w-4xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
								Cada resultado seguiu exatamente as recomendações da nossa
								análise matemática. Veja como diferentes formatos de rosto foram
								valorizados cientificamente.
							</p>
						</div>

						{/* Carousel de imagens otimizado */}
						<div className="flex flex-col justify-start items-center gap-14">
							{/* Linha superior - Mulheres - Speed menor para movimento mais rápido */}
							<section className="w-full" aria-label="Transformações femininas">
								<MarqueeRow items={womenPairs} speed={30} />
							</section>

							{/* Linha inferior - Homens (direção invertida) */}
							<section
								className="w-full"
								aria-label="Transformações masculinas"
							>
								<MarqueeRow items={menPairs} reverse speed={40} />
							</section>
						</div>
					</Container>
				</section>

				{/* Seção separada para o badge */}
				<section
					id="benefits"
					className="w-full py-10  h-20 z-20  bg-neutral-800  relative flex flex-col justify-center items-center"
				>
					<BadgeIcon />
				</section>
			</div>
		</>
	);
}
