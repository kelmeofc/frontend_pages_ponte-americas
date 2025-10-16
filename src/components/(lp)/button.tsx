import { type ButtonHTMLAttributes, forwardRef } from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/common/lib/utils"
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-[#0047FF] via-[#0037C3] to-[#002B99] text-white shadow-[0px_4px_26px_0px_rgba(38,109,246,0.50)] hover:brightness-110",
        destructive: "bg-[#ed0006] text-white hover:bg-[#ed0006]/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-[#4b5563] hover:bg-[#4b5563]/90 text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-full",
        lg: "h-12 px-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{
          // background: "linear-gradient(90deg, #0047FF 0.01%, #0037C3 44%, #002B99 99.99%)",
          // boxShadow: "0px 4px 26px 0px rgba(38, 109, 246, 0.50)",
        }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

