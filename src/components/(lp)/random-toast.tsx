"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/common/lib/utils"

const blinkAnimation = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`

const vibrateAnimation = `
  @keyframes vibrate {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(2px, 2px); }
    50% { transform: translate(-2px, -2px); }
    75% { transform: translate(-2px, 2px); }
  }
`

export default function RandomToast() {
  const [visible, setVisible] = useState(false)
  const [number, setNumber] = useState(0)
  const [state, setState] = useState("")
  const [isVibrating, setIsVibrating] = useState(false)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  // Generate a random number between min and max (inclusive)
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Generate a random delay between min and max seconds
  const getRandomDelay = () => {
    return getRandomNumber(3, 10) * 1000
  }

  const brazilianStates = [
    "São Paulo",
    "Rio de Janeiro",
    "Minas Gerais",
    "Bahia",
    "Rio Grande do Sul",
    "Paraná",
    "Pernambuco",
    "Ceará",
    "Pará",
    "Santa Catarina",
    "Goiás",
    "Maranhão",
  ]

  const getRandomState = () => {
    return brazilianStates[Math.floor(Math.random() * brazilianStates.length)]
  }

  const playSound = () => {
    // const audio = new Audio("/notification-sound.mp3")
    // audio.play()
  }

  const showToast = () => {
    setNumber(getRandomNumber(123, 890))
    setState(getRandomState())
    setVisible(true)
    setIsVibrating(true)
    playSound()

    const hideTimeout = setTimeout(() => {
      setVisible(false)
      setIsVibrating(false)
      const nextToastTimeout = setTimeout(showToast, getRandomDelay())
      timeoutIdRef.current = nextToastTimeout
    }, 3000)

    timeoutIdRef.current = hideTimeout
  }

  useEffect(() => {
    const showToastWithDelay = () => {
      const delay = getRandomDelay()
      timeoutIdRef.current = setTimeout(() => {
        showToast()
        showToastWithDelay()
      }, delay)
    }

    showToastWithDelay()
    
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    }
  }, []) // Added dependencies to useEffect

  return (
    <>
      <style jsx>{blinkAnimation}</style>
      <style jsx>{vibrateAnimation}</style>
      <div
        className={cn(
          "fixed z-50 bg-white rounded-2xl shadow-lg transition-all duration-300 p-4 w-64",
          "left-1/2 -translate-x-1/2 bottom-4 md:left-auto md:right-4 md:translate-x-0",
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none",
          isVibrating && "animate-[vibrate_0.3s_ease-in-out]",
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <div className="h-3 w-3 rounded-full bg-[#eb0400] animate-[blink_1s_ease-in-out_infinite]"></div>
          <span className="text-xl font-bold text-[#000000]">{number}</span>
          <span className="text-[#000000]">do {state}</span>
        </div>
        <p className="text-[#000000] text-sm">Estão assistindo esse video</p>
      </div>
    </>
  )
}

