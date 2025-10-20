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
        src="/videos/hero-demo.mp4"
        poster="/images/video-placeholder-1.png"
        className={cn("max-w-4xl", className)}
        autoPlay={false}
        muted={true}
        controls={true}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      />
    </div>
  )
}
