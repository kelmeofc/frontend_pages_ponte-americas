import { cn } from "@/common/lib/utils"
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react"

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "outline-solid" | "white"
  size?: "default" | "sm" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

// Constantes para melhor manutenibilidade
const BASE_CLASSES = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full in-[#container]:rounded-xl"

const VARIANT_CLASSES = {
  default: "bg-linear-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] text-primary-foreground hover:from-[hsl(var(--primary-gradient-hover-from))] hover:to-[hsl(var(--primary-gradient-hover-to))]",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary",
  // Alias de compatibilidade: "outline-solid" usa o mesmo estilo de outline
  "outline-solid": "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary",
  white: "bg-background text-primary border border-input hover:bg-accent dark:bg-background dark:text-primary"
} as const

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 py-2 text-xs",
  lg: "h-11 px-8 py-4 text-base"
} as const

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    icon, 
    iconPosition = "right", 
    children, 
    ...props 
  }, ref) => {
    const iconElement = icon && (
      <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
        {icon}
      </span>
    )

    return (
      <button
        ref={ref}
        className={cn(
          BASE_CLASSES,
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          className,
          "cursor-pointer" // Adicionando a classe cursor-pointer aqui
        )}
        {...props}
      >
        {iconPosition === "left" && iconElement}
        {children}
        {iconPosition === "right" && iconElement}
      </button>
    )
  }
)

PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }

