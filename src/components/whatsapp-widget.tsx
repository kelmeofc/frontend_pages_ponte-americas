"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@/common/hooks/use-gsap"
import gsap from "gsap"

interface WhatsAppWidgetProps {
  message?: string
  phoneNumber?: string
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  size?: "sm" | "md" | "lg"
  showPulse?: boolean
  className?: string
}

export default function WhatsAppWidget({
  message = "Oi, acabei de ver o site de vocês! Gostaria de saber mais sobre o curso",
  phoneNumber = "5511999999999", // Número padrão do Brasil
  position = "bottom-right",
  size = "md",
  showPulse = true,
  className = ""
}: WhatsAppWidgetProps) {
  const pulseRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  // Animação de entrada com GSAP
  const animatedRef = useGSAP<HTMLDivElement>({
    from: { 
      scale: 0, 
      opacity: 0,
      y: 20
    },
    to: { 
      scale: 1, 
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: 1
    }
  })

  // Efeito radar pulse
  useEffect(() => {
    if (!showPulse || !pulseRef.current) return

    const pulse = pulseRef.current

    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(pulse, {
      scale: 1.5,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    })
    .to(pulse, {
      scale: 1,
      opacity: 0.8,
      duration: 0,
      ease: "none"
    })

    return () => {
      tl.kill()
    }
  }, [showPulse])

  // Animação do ícone no hover
  useEffect(() => {
    if (!iconRef.current) return

    const icon = iconRef.current

    const handleMouseEnter = () => {
      gsap.to(icon, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    icon.addEventListener("mouseenter", handleMouseEnter)
    icon.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      icon.removeEventListener("mouseenter", handleMouseEnter)
      icon.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  // Construir URL do WhatsApp
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`

  // Classes de posicionamento
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  }

  // Classes de tamanho
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16", 
    lg: "w-20 h-20"
  }

  const iconSizes = {
    sm: 24,
    md: 32,
    lg: 40
  }

  return (
    <div
      ref={animatedRef}
      className={`fixed z-50 ${positionClasses[position]} ${className}`}
    >
      {/* Efeito Radar Pulse */}
      {showPulse && (
        <div
          ref={pulseRef}
          className={`absolute inset-0 bg-green-500 rounded-full opacity-80 ${sizeClasses[size]}`}
        />
      )}
      
      {/* Widget Principal */}
      <div
        className={`relative ${sizeClasses[size]} bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full flex items-center justify-center"
          aria-label="Enviar mensagem no WhatsApp"
        >
          <div className="flex items-center justify-center">
            <Image
              src="/images/about-us-section/whtasapp-icon.svg"
              alt="WhatsApp"
              width={iconSizes[size]}
              height={iconSizes[size]}
              className="text-white"
            />
          </div>
        </a>
      </div>
    </div>
  )
}