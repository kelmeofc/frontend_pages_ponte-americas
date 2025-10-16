"use client"

import type { ReactNode, JSX } from "react"
import { useRef, useEffect } from "react"

type AnimatedElementProps = {
  children: ReactNode
  className?: string
  animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scale" | "bounce" | "none"
  delay?: number
  duration?: number
  scrollTrigger?: boolean
  tag?: keyof JSX.IntrinsicElements
}

export function AnimatedElement({
  children,
  className,
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
  scrollTrigger = true,
  tag = "div",
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !scrollTrigger) return

    // Usar IntersectionObserver em vez de GSAP para melhor desempenho
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Aplicar animação com CSS nativo em vez de GSAP
            setTimeout(() => {
              if (ref.current) {
                ref.current.style.opacity = "1"
                ref.current.style.transform = "translate(0, 0) scale(1)"
              }
            }, delay * 1000)

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [scrollTrigger, delay])

  // Definir estilos iniciais baseados no tipo de animação
  const getInitialStyles = () => {
    const styles = {
      opacity: scrollTrigger ? "0" : "1",
      transform: "",
      transition: `opacity ${duration}s ease-out, transform ${duration}s ease-out`,
    }

    if (scrollTrigger) {
      switch (animation) {
        case "fadeInUp":
          styles.transform = "translate(0, 50px)"
          break
        case "fadeInDown":
          styles.transform = "translate(0, -50px)"
          break
        case "fadeInLeft":
          styles.transform = "translate(-50px, 0)"
          break
        case "fadeInRight":
          styles.transform = "translate(50px, 0)"
          break
        case "scale":
          styles.transform = "scale(0.8)"
          break
        default:
          break
      }
    }

    return styles
  }

  const Tag = tag as any

  return (
    <Tag ref={ref} className={className} style={getInitialStyles()}>
      {children}
    </Tag>
  )
}

