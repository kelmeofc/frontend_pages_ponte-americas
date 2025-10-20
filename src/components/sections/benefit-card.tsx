"use client"

import { LucideIcon } from "lucide-react"
import { cn } from "@/common/lib/utils"

interface BenefitCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function BenefitCard({ 
  icon: Icon, 
  title, 
  description, 
  className 
}: BenefitCardProps) {
  return (
    <div className={cn(
      "w-full h-min-80 px-6 sm:px-8 md:px-10 pb-8 bg-neutral-400/20 rounded-[10px] flex flex-col justify-start items-center gap-8 overflow-hidden gradient-border-pseudo",
      className
    )}>
      
      {/* Content Container */}
      <div className="w-full flex flex-col md:flex-row justify-center md:justify-start items-start gap-6 sm:gap-8 mt-8">
        {/* Icon Container */}
        <div className="flex-shrink-0 p-2 bg-gradient-to-r from-red-700 to-indigo-600 rounded-full">
          <div className="p-[3px] bg-white rounded-full">
            <div className="p-4 bg-gradient-to-r from-red-700 to-indigo-600 rounded-full flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="flex-1 pt-2 flex flex-col justify-start items-start gap-2.5">
          <h3 className="w-full text-gray-800 text-xl sm:text-2xl md:text-3xl font-semibold font-rubik leading-tight">
            {title}
          </h3>
          <p className="w-full text-gray-800 text-base sm:text-lg md:text-xl font-normal font-rubik leading-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
