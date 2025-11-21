"use client"

import { PandaVideoPlayer } from "@/components/ui/panda-video-player"
import { cn } from "@/common/lib/utils"

interface HeroVideoProps {
  className?: string
  src?: string
  poster?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function HeroVideo({ className, src = "/", poster, onPlay, onPause, onEnded }: HeroVideoProps) {
  return (
		<div className="flex flex-col items-center">
			<PandaVideoPlayer
				src={src}
				poster={poster || "/images/programs-thumbnails/caua-program-cover-como-vir-morar-nos-estados-unidos.png"}
				className={cn("max-w-4xl", className)}
				autoPlay={true}
				muted={true}
				controls={true}
				onPlay={onPlay}
				onPause={onPause}
				onEnded={onEnded}
			/>
		</div>
	);
}
