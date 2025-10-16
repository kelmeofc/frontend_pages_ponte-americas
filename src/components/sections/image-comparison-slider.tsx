"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type ImageComparisonSliderProps = {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  className?: string
  transitionDuration?: number
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className = 'w-64 h-72',
  transitionDuration = 1000
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(100)
  const [direction, setDirection] = useState<'increasing' | 'decreasing'>('decreasing')
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const animationSpeed = 0.8; // Velocidade de animação em % por frame
  const pauseDuration = 800; // Duração da pausa em ms
  
  // Função para animar o slider usando requestAnimationFrame
  const animate = () => {
    setSliderPosition((prev) => {
      if (direction === 'decreasing') {
        // Diminuindo (mostrando mais da imagem "depois")
        const newPos = prev - animationSpeed;
        if (newPos <= 0) {
          // Pausa antes de mudar de direção
          setTimeout(() => setDirection('increasing'), pauseDuration);
          return 0;
        }
        return newPos;
      } else {
        // Aumentando (mostrando mais da imagem "antes")
        const newPos = prev + animationSpeed;
        if (newPos >= 100) {
          // Pausa antes de mudar de direção
          setTimeout(() => setDirection('decreasing'), pauseDuration);
          return 100;
        }
        return newPos;
      }
    });
    
    // Continua a animação
    animationRef.current = requestAnimationFrame(animate);
  };

  // Inicia e limpa a animação
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    
    // Limpa a animação quando o componente é desmontado
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [direction]);

  const labelStyle = "absolute bg-black/70 text-white px-2 py-1 text-xs rounded-md font-medium transition-opacity duration-300";
  
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className} group`}
    >
      {/* Imagem "depois" (camada de fundo) */}
      <div className="absolute inset-0">
        <Image 
          src={afterImage}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      {/* Imagem "antes" (camada superior) com máscara de clipping */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <Image 
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
          className="object-cover"
        />
      </div>

      {/* Linha divisória com indicador */}
      <div 
        className="absolute inset-y-0 border-r-2 border-white shadow-md pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
       
      </div>

      {/* Rótulos "Antes" e "Depois" */}
      <div 
        className={`${labelStyle} bottom-3 left-3`}
        style={{ opacity: sliderPosition > 50 ? 1 : 0 }}
      >
        Antes
      </div>
      
      <div 
        className={`${labelStyle} bottom-3 right-3`}
        style={{ opacity: sliderPosition <= 50 ? 1 : 0 }}
      >
        Depois
      </div>

      {/* Overlay para efeito hover */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  )
}
