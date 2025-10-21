"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/common/lib/utils";

interface PandaVideoPlayerProps {
	src: string;
	poster?: string;
	className?: string;
	autoPlay?: boolean;
	loop?: boolean;
	muted?: boolean;
	controls?: boolean;
	onPlay?: () => void;
	onPause?: () => void;
	onEnded?: () => void;
}

export function PandaVideoPlayer({
	src,
	poster,
	className,
	autoPlay = false,
	loop = false,
	muted = true,
	controls = true,
	onPlay,
	onPause,
	onEnded,
}: PandaVideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(muted);
	const [showMutedIndicator, setShowMutedIndicator] = useState(muted);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handlePlay = () => {
			setIsPlaying(true);
			onPlay?.();
		};

		const handlePause = () => {
			setIsPlaying(false);
			onPause?.();
		};

		const handleEnded = () => {
			setIsPlaying(false);
			onEnded?.();
		};

		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);
		video.addEventListener("ended", handleEnded);

		return () => {
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
			video.removeEventListener("ended", handleEnded);
		};
	}, [onPlay, onPause, onEnded]);

	// Detecta mudanças no estado de fullscreen
	useEffect(() => {
		const handleFullscreenChange = () => {
			const isCurrentlyFullscreen = !!(
				document.fullscreenElement ||
				(document as any).webkitFullscreenElement ||
				(document as any).mozFullScreenElement ||
				(document as any).msFullscreenElement
			);
			setIsFullscreen(isCurrentlyFullscreen);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
		document.addEventListener("mozfullscreenchange", handleFullscreenChange);
		document.addEventListener("MSFullscreenChange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
			document.removeEventListener(
				"webkitfullscreenchange",
				handleFullscreenChange
			);
			document.removeEventListener(
				"mozfullscreenchange",
				handleFullscreenChange
			);
			document.removeEventListener(
				"MSFullscreenChange",
				handleFullscreenChange
			);
		};
	}, []);

	const handleVideoClick = async () => {
		const video = videoRef.current;
		if (!video || isLoading) return;

		try {
			setIsLoading(true);

			// Sempre reinicia o vídeo e ativa o som
			video.currentTime = 0;
			video.muted = false;
			setIsMuted(false);
			setShowMutedIndicator(false);

			// Aguarda o play() ser resolvido antes de continuar
			await video.play();

			// Entra em tela cheia após play bem-sucedido
			requestFullscreen(video);
		} catch (error) {
			// Trata erros como AbortError, NotAllowedError, etc.
			console.warn("Erro ao reproduzir vídeo:", error);
			
			// Se falhou, ainda tenta entrar em tela cheia
			// AbortError acontece quando play() é interrompido por pause()
			if (error instanceof Error && error.name !== 'AbortError') {
				requestFullscreen(video);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const requestFullscreen = (element: HTMLVideoElement) => {
		try {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if ((element as any).webkitRequestFullscreen) {
				// Safari
				(element as any).webkitRequestFullscreen();
			} else if ((element as any).mozRequestFullScreen) {
				// Firefox
				(element as any).mozRequestFullScreen();
			} else if ((element as any).msRequestFullscreen) {
				// IE/Edge
				(element as any).msRequestFullscreen();
			}
		} catch (error) {
			console.warn("Fullscreen não suportado:", error);
		}
	};

	return (
		<div
			className={cn(
				"relative w-full aspect-video rounded-2xl overflow-hidden bg-black group",
				className
			)}
		>
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className="w-full h-full cursor-pointer video-player"
				style={{
					objectFit: isFullscreen ? "contain" : "cover",
				}}
				autoPlay={autoPlay}
				loop={loop}
				muted={isMuted}
				controls={controls && !showMutedIndicator}
				playsInline
				disablePictureInPicture
				onClick={handleVideoClick}
			/>

			{/* Loading Indicator */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/40">
					<div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
				</div>
			)}

			{/* Muted Indicator - Clone do Panda Video */}
			{(showMutedIndicator || !isPlaying) && !isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/20">
					<button
						onClick={handleVideoClick}
						disabled={isLoading}
						className="panda-muted-indicator-impact-wrapper panda-muted-indicator-item animate-pulse hover:scale-105 transition-transform duration-300 flex flex-col items-center px-6 py-4 bg-black/60 rounded-2xl backdrop-blur-sm border border-white/20 group/button disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{/* Texto Superior */}
						<span className="text-white text-sm font-medium">Clique aqui</span>

						{/* Ícone SVG do Volume com Linha - Animado */}
						<div className="relative">
							<svg
								className="w-24 h-16 text-white"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 400 200"
								xmlSpace="preserve"
							>
								<style>{`
                   .fg-color { fill: currentColor; }
                   .bg-color { fill: rgba(0,0,0,0.8); }
                   .volume, .wave { 
                     transform: scale(1);
                     transform-box: fill-box;
                     transform-origin: center;
                   }
                   
                   /* Animações das ondas sonoras - Efeito cascata */
                   .wave {
                     animation: wave-pulse 2.5s ease-in-out infinite;
                     transform-origin: center;
                   }
                   
                   .wave:nth-child(3) {
                     animation-delay: 0.3s;
                     opacity: 0.8;
                   }
                   
                   .wave:nth-child(4) {
                     animation-delay: 0.6s;
                     opacity: 0.6;
                   }
                   
                   .wave:nth-child(5) {
                     animation-delay: 0.9s;
                     opacity: 0.4;
                   }
                   
                   @keyframes wave-pulse {
                     0%, 100% {
                       opacity: 0.2;
                       transform: scale(0.95);
                     }
                     25% {
                       opacity: 0.6;
                       transform: scale(1.02);
                     }
                     50% {
                       opacity: 1;
                       transform: scale(1.08);
                     }
                     75% {
                       opacity: 0.8;
                       transform: scale(1.04);
                     }
                   }
                   
                   /* Animação do volume principal - Batimento */
                   .volume {
                     animation: volume-heartbeat 2s ease-in-out infinite;
                   }
                   
                   @keyframes volume-heartbeat {
                     0%, 100% {
                       transform: scale(1);
                     }
                     10% {
                       transform: scale(1.1);
                     }
                     20% {
                       transform: scale(1);
                     }
                     30% {
                       transform: scale(1.15);
                     }
                     40% {
                       transform: scale(1);
                     }
                   }
                   
                   /* Animação da linha diagonal - Piscar intenso */
                   .line {
                     animation: line-flash 1.2s ease-in-out infinite;
                   }
                   
                   @keyframes line-flash {
                     0%, 100% {
                       opacity: 0.9;
                       filter: drop-shadow(0 0 2px rgba(255,255,255,0.3));
                     }
                     50% {
                       opacity: 1;
                       filter: drop-shadow(0 0 4px rgba(255,255,255,0.6));
                     }
                   }
                   
                   /* Efeito hover - Intensifica animações */
                   .group\\/button:hover .wave {
                     animation-duration: 1.5s;
                   }
                   
                   .group\\/button:hover .volume {
                     animation-duration: 1s;
                   }
                   
                   .group\\/button:hover .line {
                     animation-duration: 0.8s;
                   }
                 `}</style>

								{/* Volume Icon */}
								<path
									className="volume fg-color"
									d="M169.8 85.5h-23c-1.9 0-3.1 1.2-3.1 3.1v26.5c0 1.9 1.2 3.1 3.1 3.1h23l19.3 18.4V68.7c.3 0-19.3 16.8-19.3 16.8z"
								/>

								{/* Sound Waves */}
								<path
									className="wave fg-color opacity-80"
									d="M205.9 127.8c-1.2-1.2-.9-3.4.3-5 9.6-12.1 9.6-29.3 0-41.1-1.2-1.6-1.2-3.7-.3-5 1.2-1.2 3.7-.9 5 .9 11.5 14.3 11.5 34.9 0 48.9-1.4 2.6-3.8 2.6-5 1.3z"
								/>
								<path
									className="wave fg-color opacity-60"
									d="M223.9 138.4c-1.2-1.2-.9-3.4.3-5 14.6-17.1 14.6-42.3 0-59.4-1.2-1.6-1.6-3.7-.3-5 1.2-1.2 3.4-.9 5 .9 16.5 19.3 16.5 48.2 0 67.5-1.5 2.2-3.8 2.6-5 1z"
								/>
								<path
									className="wave fg-color opacity-40"
									d="M241.6 149.3c-1.2-1.2-.9-3.4.3-5 21.2-24 21.2-60.1 0-84-1.2-1.2-1.6-3.1-.3-4.4 1.2-1.2 3.4-.9 5 .6 23.3 26.1 23.3 66 0 92.1-1.2 1.9-3.7 2.2-5 .7z"
								/>

								{/* Diagonal Line (Muted) */}
								<path
									className="line bg-color"
									d="M274 141.2c-.3-1.6-1.2-3.1-2.8-4L135.6 50.6c-.9-.6-2.2-.9-3.4-.9-2.2 0-4 .9-5.3 2.8-.9 1.6-1.2 3.1-.9 4.7.3 1.6 1.2 3.1 2.8 4l135.4 86.2c.9.6 2.2.9 3.4.9 2.2 0 4-.9 5.3-2.8 1.1-.9 1.4-2.7 1.1-4.3z"
								/>
								<path
									className="line fg-color"
									d="M267.8 145.9c-.6 0-1.2-.3-1.6-.6L130.9 58.4c-1.6-.9-1.9-2.8-.9-4 .9-1.6 2.8-1.9 4-.9l135.4 86.2c1.6.9 1.9 2.8.9 4.4-.7.8-1.5 1.8-2.5 1.8z"
								/>
							</svg>
						</div>

						{/* Texto Inferior */}
						<span className="text-white text-sm font-medium">
							para ativar o som
						</span>
					</button>
				</div>
			)}
		</div>
	);
}
