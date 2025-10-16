"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/common/lib/utils"
import Link from "next/link"

interface RotatingBadgeProps {
  text: string
  className?: string
  textClassName?: string
  rotationDuration?: number
  icon?: React.ReactNode
  href?: string
}

export function RotatingBadge({ text, className, textClassName, rotationDuration = 8000, icon, href = "/registro-de-marca" }: RotatingBadgeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const circleText = containerRef.current?.querySelector('.circle-text') as HTMLElement
    if (!circleText) return
    
    // Criando a animação com CSS em vez de JS
    circleText.style.animation = `rotate ${rotationDuration}ms linear infinite`
    
    // Adicionando a keyframe para rotação se ainda não existir
    if (!document.getElementById('rotate-keyframe')) {
      const style = document.createElement('style')
      style.id = 'rotate-keyframe'
      style.innerHTML = `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }
    
    return () => {
      if (document.getElementById('rotate-keyframe') && !document.querySelectorAll('.circle-text').length) {
        document.getElementById('rotate-keyframe')?.remove()
      }
    }
  }, [rotationDuration])

  // Preparando o texto repetido para cobrir o círculo completamente
  const formattedText = `${text} `.repeat(5).trim()

  return (
    <Link href="/registro-de-marca" className="block cursor-pointer">
      <div 
        ref={containerRef}
        className={cn("relative inline-flex items-center justify-center rounded-full bg-[#D2DFFF] p-1", className)}
      >
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="circle-text absolute inset-0 rounded-full">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full absolute"
            >
              <path 
                id="circlePath" 
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" 
                fill="transparent"
              />
              <text 
                className={cn("text-xs font-medium", textClassName)}
                style={{ fontSize: "0.65rem" }}
              >
                <textPath href="#circlePath">
                  {formattedText}
                </textPath>
              </text>
            </svg>
          </div>
        </div>
        <div className="z-10 rounded-full p-2 flex items-center justify-center">
          {icon || (
            <div className="bg-[#D2DFFF] rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-white font-bold text-lg bg-[#D2DFFF]">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.35913 6.6416H12.6214C13.5131 6.6416 14.2786 6.77896 14.9178 7.05369C15.557 7.32841 16.0485 7.73501 16.3923 8.27347C16.736 8.81193 16.9079 9.47402 16.9079 10.2597C16.9079 10.8806 16.8005 11.4191 16.5856 11.8751C16.3708 12.3312 16.0673 12.713 15.6752 13.0207C15.2884 13.3284 14.8318 13.5702 14.3054 13.746L13.6125 14.1086H9.84973L9.83362 12.3202H12.6456C13.1022 12.3202 13.4809 12.2378 13.7817 12.0729C14.0825 11.9081 14.3081 11.6801 14.4585 11.3889C14.6143 11.0976 14.6922 10.7652 14.6922 10.3916C14.6922 9.9905 14.617 9.64435 14.4666 9.35314C14.3162 9.05644 14.0879 8.82841 13.7817 8.66907C13.4755 8.50973 13.0888 8.43006 12.6214 8.43006H10.5749V18.6416H8.35913V6.6416ZM14.9822 18.6416L12.2669 13.268L14.6116 13.2597L17.3591 18.5262V18.6416H14.9822Z"
                    fill="black"
                  />
                  <circle cx="12.3591" cy="12.6416" r="11" stroke="black" strokeWidth="2" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

