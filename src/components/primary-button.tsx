"use client"

import Link from "next/link"
import { cn } from "@/common/lib/utils"
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react"

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "outline-solid" | "white"
  size?: "default" | "sm" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
  isShine?: boolean
  href?: string
}

// Constantes para melhor manutenibilidade
const BASE_CLASSES = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full rounded-xl"

// Classes otimizadas para o efeito shine (opacity-0 no hover)
const SHINE_CLASSES = [
  "group relative overflow-hidden",
  "transform hover:scale-105 transition-transform duration-300",
  "shadow-lg hover:shadow-xl hover:shadow-purple-500/25",
  "before:absolute before:inset-0 before:bg-gradient-to-r",
  "before:from-transparent before:via-white/30 before:to-transparent",
  "before:animate-[shine_3s_ease-in-out_infinite] hover:before:opacity-0",
  "before:transition-opacity before:duration-300",
  "after:absolute after:inset-0 after:bg-gradient-to-r",
  "after:from-transparent after:via-white/10 after:to-transparent",
  "after:translate-x-[-100%] hover:after:translate-x-[100%]",
  "after:transition-transform after:duration-700 after:ease-in-out"
].join(" ")

const VARIANT_CLASSES = {
  default: "bg-linear-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] text-primary-foreground hover:from-[hsl(var(--primary-gradient-hover-from))] hover:to-[hsl(var(--primary-gradient-hover-to))]",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary dark:border-primary dark:text-primary bg-background hover:text-white",
  // Alias de compatibilidade: "outline-solid" usa o mesmo estilo de outline
  "outline-solid": "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary",
  white: "bg-background text-primary border border-input hover:bg-accent dark:bg-background dark:text-primary"
} as const

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 py-2 text-xs",
  lg: "h-11 px-8 py-4 text-base"
} as const

const PrimaryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, PrimaryButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    icon, 
    iconPosition = "right", 
    isShine = true,
    children, 
    href = "",
    ...props 
  }, ref) => {
    // Memoização do ícone para evitar re-renders desnecessários
    const iconElement = icon ? (
      <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
        {icon}
      </span>
    ) : null;

    // Construção otimizada das classes
    const buttonClasses = cn(
      BASE_CLASSES,
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      isShine && SHINE_CLASSES,
      "cursor-pointer",
      className
    );

    return (
			<Link href={href}>
				<button className={buttonClasses} {...props}>
					{iconPosition === "left" && iconElement}
					{children}
					{iconPosition === "right" && iconElement}
				</button>
			</Link>
		);
  }
)

PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }

