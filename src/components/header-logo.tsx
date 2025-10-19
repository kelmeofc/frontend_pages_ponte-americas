"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/common/lib/utils"

interface HeaderLogoProps {
  className?: string
  width?: number
  height?: number
}

export function HeaderLogo({ 
  className, 
  width = 160, 
  height = 24 
}: HeaderLogoProps) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
    >
      <Image
        src="/images/svg/logo.svg"
        alt="Ponte Américas Logo"
        width={width}
        height={height}
        className="h-6 lg:h-8 w-auto"
        priority
      />
    </Link>
  )
}
