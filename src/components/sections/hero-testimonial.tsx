"use client"

import { HeroAvatars } from "./hero-avatars"
import { cn } from "@/common/lib/utils"

interface HeroTestimonialProps {
  className?: string
}

export function HeroTestimonial({ className }: HeroTestimonialProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <HeroAvatars />
      <p className="text-white text-sm font-medium">
        <strong>+100 alunos do Ponte Américas</strong>
        <br />
        já vivem com a família nos EUA
      </p>
    </div>
  )
}
