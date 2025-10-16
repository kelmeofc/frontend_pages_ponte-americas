"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/common/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glareEnabled?: boolean
  tiltReverse?: boolean
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  perspective?: number
  scale?: number
}

export function TiltCard({
  children,
  className,
  containerClassName,
  glareEnabled = true,
  tiltReverse = false,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  perspective = 1000,
  scale = 1.05,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 })

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [tiltReverse ? tiltMaxAngleX : -tiltMaxAngleX, tiltReverse ? -tiltMaxAngleX : tiltMaxAngleX],
  )
  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [tiltReverse ? -tiltMaxAngleY : tiltMaxAngleY, tiltReverse ? tiltMaxAngleY : -tiltMaxAngleY],
  )

  const glareX = useTransform(mouseX, [-0.5, 0.5], ["-20%", "120%"])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["-20%", "120%"])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) / width - 0.5
    const mouseY = (e.clientY - rect.top) / height - 0.5

    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    x.set(0)
    y.set(0)
  }

  if (!isMounted) {
    return (
      <div className={cn("relative overflow-hidden rounded-xl", containerClassName)}>
        <div className={cn("relative z-10", className)}>{children}</div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative overflow-hidden rounded-xl", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={cn("relative z-10", className)}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective,
          scale: isHovering ? scale : 1,
        }}
      >
        {children}
      </motion.div>

      {glareEnabled && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 h-full w-full opacity-0 transition-opacity"
          style={{
            opacity: isHovering ? 0.15 : 0,
            background: "radial-gradient(circle at center, white 0%, transparent 80%)",
            left: glareX,
            top: glareY,
          }}
        />
      )}
    </div>
  )
}

