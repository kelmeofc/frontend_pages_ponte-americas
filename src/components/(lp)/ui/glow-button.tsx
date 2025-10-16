"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/common/lib/utils"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

interface GlowButtonProps extends ButtonProps {
  glowColor?: string
  hoverScale?: number
}

export function GlowButton({
  children,
  className,
  glowColor = "rgba(0, 85, 255, 0.35)",
  hoverScale = 1.05,
  ...props
}: GlowButtonProps) {
  const [isMouse, setIsMouse] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMouse) setIsMouse(true)

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsMouse(false)
  }

  return (
    <Button
      className={cn("relative overflow-hidden transition-transform", isMouse && `scale-${hoverScale * 100}`, className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isMouse && (
        <div
          className="absolute inset-0 z-0 opacity-80 blur-xl"
          style={{
            background: glowColor,
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            transform: `translate(${mousePosition.x - 20}px, ${mousePosition.y - 20}px)`,
            transition: "transform 0.1s ease",
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}

