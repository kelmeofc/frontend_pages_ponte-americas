import type React from "react"
import { cn } from "@/common/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  section?: boolean
}

export function Container({ children, className, section = false }: ContainerProps) {
  return <div id="container" className={cn("mx-auto w-full max-w-[1200px] px-4", section ? "md:py-16 py-8" : "", className)}>{children}</div>
}

