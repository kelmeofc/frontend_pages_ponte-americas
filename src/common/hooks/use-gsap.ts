"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Registrando o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

type GSAPAnimationOptions = {
  duration?: number
  ease?: string
  delay?: number
  stagger?: number | object
  scrollTrigger?: boolean | object
  from?: object
  to?: object
}

export function useGSAP<T extends HTMLElement = HTMLDivElement>(animationOptions?: GSAPAnimationOptions) {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    const defaults = {
      duration: 0.8,
      ease: "power3.out",
      delay: 0,
    }

    const options = { ...defaults, ...animationOptions }

    let animation: gsap.core.Tween | null = null

    if (options.from) {
      // Se temos propriedades 'from', usamos from/to
      const fromOptions = { ...options.from }
      const toOptions = { ...options.to }

      if (options.scrollTrigger) {
        const scrollOptions =
          typeof options.scrollTrigger === "object"
            ? options.scrollTrigger
            : {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none",
              }

        animation = gsap.fromTo(element, fromOptions, {
          ...toOptions,
          duration: options.duration,
          ease: options.ease,
          delay: options.delay,
          stagger: options.stagger,
          scrollTrigger: scrollOptions,
        })
      } else {
        animation = gsap.fromTo(element, fromOptions, {
          ...toOptions,
          duration: options.duration,
          ease: options.ease,
          delay: options.delay,
          stagger: options.stagger,
        })
      }
    } else {
      // Caso contrário, usamos apenas 'to'
      if (options.scrollTrigger) {
        const scrollOptions =
          typeof options.scrollTrigger === "object"
            ? options.scrollTrigger
            : {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none",
              }

        animation = gsap.to(element, {
          ...options.to,
          duration: options.duration,
          ease: options.ease,
          delay: options.delay,
          stagger: options.stagger,
          scrollTrigger: scrollOptions,
        })
      } else {
        animation = gsap.to(element, {
          ...options.to,
          duration: options.duration,
          ease: options.ease,
          delay: options.delay,
          stagger: options.stagger,
        })
      }
    }

    return () => {
      if (animation) {
        animation.kill()
      }
    }
  }, [animationOptions])

  return elementRef
}

