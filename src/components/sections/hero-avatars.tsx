"use client"

import Image from "next/image"
import { cn } from "@/common/lib/utils"

interface HeroAvatarsProps {
  className?: string
}

export function HeroAvatars({ className }: HeroAvatarsProps) {
  const avatars = [
    "/images/avatars/ana-paula.jpg",
    "/images/avatars/avatar-2.png", 
    "/images/avatars/avatar-3.png"
  ]

  return (
    <div className={cn("flex items-center", className)}>
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            "relative w-8 h-8 rounded-full overflow-hidden border-2 border-white",
            index > 0 && "-ml-2"
          )}
        >
          <Image
            src={avatar}
            alt={`Avatar ${index + 1}`}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
      ))}
    </div>
  )
}
