"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/common/lib/utils";
import { SwipeHandAffordance } from "../svg/swipe-hand-affordance";
import gsap from "gsap";

interface AboutVisagismComparisonSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

// Slider mais simples e controlado por drag do usuário – independente do já existente para evitar efeitos colaterais
export function AboutVisagismComparisonSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
}: AboutVisagismComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState(50); // porcentagem
  const [isHovered, setIsHovered] = useState(false); // estado para controlar opacidade do affordance no hover
  const [hasSeenAffordance, setHasSeenAffordance] = useState<boolean>(false); // não persiste entre reloads
  const isDraggingRef = useRef(false);
  const isFinePointer = useRef<boolean>(true);
  const rafMoveRef = useRef<number | null>(null);
  const scaleAnimationRef = useRef<gsap.core.Tween | null>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  // Detecta se o dispositivo tem ponteiro "fino" (desktop / mouse)
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      isFinePointer.current = window.matchMedia("(pointer: fine)").matches;
    }
  }, []);

  // Animação de escala do handle (pulse)
  useEffect(() => {
    const handle = handleRef.current;
    if (!handle) return;

    const stopScaleAnimation = () => {
      if (scaleAnimationRef.current) {
        scaleAnimationRef.current.kill();
        scaleAnimationRef.current = null;
      }
      gsap.set(handle, { scale: 1 });
    };

    const startScaleAnimation = () => {
      if (scaleAnimationRef.current) return; // evita múltiplas animações
      scaleAnimationRef.current = gsap.to(handle, {
        scale: 1.2,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    };

    // Se o usuário já viu o affordance, nunca pulse novamente
    if (hasSeenAffordance) {
      stopScaleAnimation();
      return;
    }

    // Inicia o pulse por padrão
    startScaleAnimation();

    // Para o pulse durante hover (quando o usuário já está interagindo)
    if (isHovered) {
      stopScaleAnimation();
    }

    return () => {
      stopScaleAnimation();
    };
  }, [hasSeenAffordance, isHovered]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
      updatePositionFromClientX(clientX);
      if (!hasSeenAffordance) setHasSeenAffordance(true);
    };
    const stop = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stop);
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
    };
  }, [updatePositionFromClientX, hasSeenAffordance]);

  return (
		<div
			ref={containerRef}
			className={cn(
				"relative w-full h-[480px] rounded-3xl overflow-hidden select-none touch-none bg-neutral-200", // base
				"md:h-[520px]",
				className
			)}
			onMouseDown={(e) => {
				isDraggingRef.current = true;
				updatePositionFromClientX(e.clientX);
				if (!hasSeenAffordance) setHasSeenAffordance(true);
			}}
			onTouchStart={(e) => {
				isDraggingRef.current = true;
				updatePositionFromClientX(e.touches[0].clientX);
				if (!hasSeenAffordance) setHasSeenAffordance(true);
			}}
			onMouseEnter={() => {
				setIsHovered(true);
				if (!hasSeenAffordance) setHasSeenAffordance(true);
			}}
			onMouseLeave={() => setIsHovered(false)}
			// Move conforme mouse em desktop (sem necessidade de clicar)
			onMouseMove={(e) => {
				if (!isFinePointer.current) return; // evita em touch devices híbridos
				if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
				rafMoveRef.current = requestAnimationFrame(() => {
					updatePositionFromClientX(e.clientX);
				});
			}}
		>
			<Image
				src={after}
				alt={afterAlt}
				fill
				sizes="(max-width:768px) 100vw, 50vw"
				className="object-cover object-center"
				priority={false}
			/>
			<div
				className="absolute inset-0"
				style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
			>
				<Image
					src={before}
					alt={beforeAlt}
					fill
					sizes="(max-width:768px) 100vw, 50vw"
					className="object-cover object-center"
					priority={false}
				/>
			</div>
			<div>
				{/* Divider */}
				<div
					className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
					style={{ left: `${position}%` }}
				/>

			{/* Handle */}
			<button
				ref={handleRef}
				type="button"
				aria-label="Arraste para comparar"
				className="absolute top-1/2 -translate-y-1/2 -ml-4 flex flex-col items-center gap-2"
				style={{ left: `${position}%` }}
				onMouseDown={(e) => {
					e.preventDefault();
					isDraggingRef.current = true;
					if (!hasSeenAffordance) setHasSeenAffordance(true);
				}}
				onTouchStart={(e) => {
					e.preventDefault();
					isDraggingRef.current = true;
					if (!hasSeenAffordance) setHasSeenAffordance(true);
				}}
			>
					<span className="h-14 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/60">
					{!hasSeenAffordance && (
					<SwipeHandAffordance
							className={cn(
								"transition-opacity duration-200",
								isHovered && "opacity-0"
							)}
					/>
					)}
					</span>
				</button>
			</div>

			{/* Labels */}
			<span
				className={cn(
					"absolute top-4 left-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow-sm transition-opacity",
					position < 45 && "opacity-40"
				)}
			>
				Sem visagismo
			</span>
			<span
				className={cn(
					"absolute top-4 right-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow-sm transition-opacity",
					position > 55 && "opacity-40"
				)}
			>
				Com visagismo
			</span>
		</div>
	);
}
