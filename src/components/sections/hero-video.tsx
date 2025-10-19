"use client"

import Image from "next/image"
import { cn } from "@/common/lib/utils"
import { Play } from "lucide-react"

interface HeroVideoProps {
  className?: string
  onClick?: () => void
}

export function HeroVideo({ className, onClick }: HeroVideoProps) {
  return (
    <div 
      className={cn(
        "relative w-full max-w-[573px] aspect-video rounded-lg overflow-hidden cursor-pointer group",
        "bg-gradient-to-br from-gray-900 to-gray-800",
        className
      )}
      onClick={onClick}
    >
      {/* Video element with poster */}
      <video
        className="w-full h-full object-cover opacity-20"
        poster="/images/video-placeholder-1.png"
        preload="metadata"
        muted
      >
        <source src="/videos/hero-demo.mp4" type="video/mp4" />
      </video>
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
          <Play className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" />
        </div>
      </div>
    </div>
  )
}
