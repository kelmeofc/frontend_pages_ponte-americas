'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/common/lib/utils'
import gsap from 'gsap'
import Image from 'next/image'

interface SwipeHandAffordanceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function SwipeHandAffordance({
  className,
  ...props
}: SwipeHandAffordanceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Respeita usuários com redução de movimento
    if (
      typeof window !== "undefined" &&
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.set(container, { rotation: 0, transformOrigin: "center bottom" })
      return
    }

    // Timeline contínua e suave: 0° -> +15° -> -15° -> 0° (loop)
    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: "sine.inOut" },
    })

    timeline
      .set(container, { rotation: 0, transformOrigin: "center bottom", willChange: "transform" })
      .to(container, { rotation: 15, duration: 0.3 })
      .to(container, { rotation: -15, duration: 0.3 })
      .to(container, { rotation: 0, duration: 0.3 })

    return () => {
      timeline.kill()
    }
  }, [])

  return (
		<div
			ref={containerRef}
			className={cn(
				"relative flex flex-col items-center justify-center gap-[0px] mb-1",
				className
			)}
			{...props}
		>
			{/* Container da Mão */}
			<div className="relative flex-shrink-0 w-[14px] h-[14px]">
				<Image
					src="/svg/FingerSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					className="opacity-inherit"
				/>
			</div>

			{/* Container da Seta */}
			<div className={cn("relative flex-shrink-0 w-6 h-6")}>
				<Image
					src="/svg/ArrowSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					className="opacity-inherit"
				/>
			</div>
		</div>
	);
}
