"use client"

import { cn } from "@/common/lib/utils"
import { useState, useEffect } from "react"

interface StatsCardProps {
  className?: string
}

export function StatsCard({ className }: StatsCardProps) {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 segundos para a animação completa
    const finalValues = [1000, 700, 870000]
    const steps = 50 // número de passos para a animação

    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++

      // Calcular o progresso atual (0 a 1)
      const progress = step / steps

      // Usar uma função de easing para tornar a animação mais natural
      // Função easeOutQuad: t => t * (2 - t)
      const easedProgress = progress * (2 - progress)

      // Atualizar os contadores com base no progresso
      setCount1(Math.round(easedProgress * finalValues[0]))
      setCount2(Math.round(easedProgress * finalValues[1]))
      setCount3(Math.round(easedProgress * finalValues[2]))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  // Formatar o terceiro número para exibir "mil" quando atingir o valor final
  const formatCount3 = count3 >= 870000 ? "870 mil" : count3.toLocaleString()

  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-8 shadow-xs h-full flex items-center justify-center border border-[#E5E7EB] border-solid",
        className,
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center">
          <span className="text-[30px] font-bold text-[#111827] leading-none">+{count1}</span>
          <span className="text-sm text-[#4B5563] mt-2">Marcas registradas</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[30px] font-bold text-[#111827] leading-none">+{count2}</span>
          <span className="text-sm text-[#4B5563] mt-2">Empresas protegidas</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="text-[30px] font-bold text-[#111827] leading-none">+{formatCount3}</span>
          <span className="text-sm text-[#4B5563] mt-2">Takedowns</span>
        </div>
      </div>
    </div>
  )
}

