"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/common/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const frameRate = 1000 / 60
  const totalFrames = Math.round(duration * 60)

  useEffect(() => {
    if (!isInView) return

    let frame = 0
    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const currentCount = easeOutQuad(progress) * value

      if (frame === totalFrames) {
        setCount(value)
        clearInterval(counter)
      } else {
        setCount(currentCount)
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [isInView, value, totalFrames, frameRate])

  // Easing function for smoother animation
  function easeOutQuad(x: number): number {
    return 1 - (1 - x) * (1 - x)
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {count.toFixed(decimals).replace(/\.0+$/, "")}
      {suffix}
    </span>
  )
}

