"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/common/lib/utils"
import gsap from "gsap"

interface GradientTextProps {
  text: string
  className?: string
  colors?: string[]
  duration?: number
  delay?: number
  animateOnScroll?: boolean
}

export function GradientText({
  text,
  className,
  colors = ["#0055FF", "#6D28D9", "#4F46E5", "#2563EB"],
  duration = 5,
  delay = 0,
  animateOnScroll = false,
}: GradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current

    const setupAnimation = () => {
      gsap.to(element, {
        backgroundPosition: "200% center",
        duration,
        ease: "none",
        repeat: -1,
        delay,
      })
    }

    if (animateOnScroll) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setupAnimation()
              observer.unobserve(element)
            }
          })
        },
        { threshold: 0.1 },
      )

      observer.observe(element)
      return () => observer.unobserve(element)
    } else {
      setupAnimation()
    }
  }, [duration, delay, animateOnScroll])

  const gradientColors = colors.join(", ")

  return (
    <h2
      ref={textRef}
      className={cn("bg-clip-text! text-transparent!", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors}, ${colors[0]})`,
        backgroundSize: "200% auto",
      }}
    >
      {text}
    </h2>
  )
}

