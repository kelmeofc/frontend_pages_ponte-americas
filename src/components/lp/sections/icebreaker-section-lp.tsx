"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { cn } from "@/common/lib/utils"
import type { IcebreakerSectionProps } from "@/types"

interface IcebreakerCardProps {
  text: string
  emoji: string
  svgPath: string
  className?: string
}

function IcebreakerCard({ text, emoji, svgPath, className }: IcebreakerCardProps) {
  return (
    <div className="flex flex-row items-center">
      {/* Emoji/Icon */}
      <div className="relative -right-6 -16 h-16 sm:w-[72px] sm:h-[72px] z-10">
        <Image
          src={svgPath}
          alt={emoji}
          width={72}
          height={72}
          className="w-full h-full object-contain"
        />
      </div>

      <div className={cn(
        "relative h-20 sm:h-24 w-full bg-linear-to-r from-neutral-200 via-white via-41% to-white mr-4",
        "rounded-2xl border",
        "flex items-center justify-start pl-12 sm:pl-20",
        className
      )}>

        {/* Text */}
        <p className="text-stone-950 text-base sm:text-lg md:text-xl font-normal font-rubik leading-6 pr-4">
          {text}
        </p>
      </div>
    </div>
  )
}

export function IcebreakerSectionLp({ title, icon, items }: IcebreakerSectionProps) {
  return (
		<section
			className="bg-white py-16 md:py-20 overflow-hidden"
			data-animate-section
			data-animate-children=".animate-child"
		>
			<Container className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-12">
				{/* Left Content */}
				<div className="flex flex-col  justify-center items-center lg:justify-start lg:items-start gap-4 max-w-lg text-center lg:text-left">
					{/* Icon Container */}
					<Image
						src={icon.src}
						alt={icon.alt}
						width={icon.width}
						height={icon.height}
						className="size-20"
					/>

					{/* Title */}
					<div className="pb-2">
						<h2 className="text-gray-800 leading-tight whitespace-pre-line">
							{title}
						</h2>
					</div>
				</div>

				{/* Right Content - Cards */}
				<div className="w-full lg:w-[700px] flex flex-col gap-2.5">
					{items.map((item) => (
						<IcebreakerCard
							key={item.id}
							text={item.text}
							emoji={item.emoji}
							svgPath={item.svgPath}
							className={cn(
								"transform transition-all duration-300 hover:scale-[1.02]",
								"hover:shadow-lg hover:border-red-600"
							)}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}