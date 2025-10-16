"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"

export default function PricingSection() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    minutes: 3,
    seconds: 9,
  })

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({
          ...timeLeft,
          seconds: timeLeft.seconds - 1,
        })
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        })
      } else {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time with leading zeros
  const formattedMinutes = timeLeft.minutes.toString().padStart(1, "0")
  const formattedSeconds = timeLeft.seconds.toString().padStart(2, "0")

  return (
    <section className="w-full py-6 md:py-12 bg-white">
      <div className="container px-4">
        <div className="flex flex-col items-center">
          {/* Pricing Card */}
          <div className="bg-[#0e2133] rounded-3xl w-full max-w-[544px] p-6 md:p-11 text-white text-center mb-4 md:mb-6">
            {/* Countdown Timer */}
            <div className="bg-[#ff8800] text-black font-medium py-2 px-6 rounded-full inline-block mb-8">
              Oferta se encerra em {formattedMinutes}:{formattedSeconds} minutos
            </div>

            {/* Pricing Information */}
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl mb-4 max-w-[464px] mx-auto">
                <span className="font-bold">SOMENTE HOJE</span> a monitoria da 3PI vai te custar:
              </h2>

              <div className="mb-2 text-base md:text-lg">
                de <span className="line-through">R$129,90</span>
              </div>

              <div className="flex items-baseline justify-center">
                <span className="text-xl mr-2">por</span>
                <span className="text-5xl md:text-7xl font-bold">29,90</span>
                <span className="text-2xl ml-2">/mês</span>
              </div>
            </div>

            {/* CTA Button */}
            <Button size="lg" className="w-full uppercase font-medium mb-8">
              Quero monitorar com a 3PI
            </Button>

            {/* Stripe Badge */}
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold">STRIPE</span>
              <span className="text-xs md:text-sm text-gray-300">COMPRA 100% PROCESSADA PELA STRIPE</span>
            </div>
          </div>

          {/* Coffee comparison text */}
          <p className="text-gray-600 text-center">é menos que uma xicara de café por dia....</p>
        </div>
      </div>
    </section>
  )
}

