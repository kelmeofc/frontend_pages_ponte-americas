"use client"

import { PandaVideoPlayer } from "@/components/ui/panda-video-player"
import { cn } from "@/common/lib/utils"

interface HeroVideoProps {
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
}

export function HeroVideo({ className, onPlay, onPause, onEnded }: HeroVideoProps) {
  return (
    <div className="flex flex-col items-center">
      <PandaVideoPlayer
        src="/"
        poster="/images/video-placeholder-2.png"
        className={cn("max-w-4xl", className)}
        autoPlay={true}
        muted={true}
        controls={true}
      
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />
    </div>
  )
}
