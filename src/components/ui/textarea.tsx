import * as React from "react"
import { cn } from "@/common/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-3 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:outline-hidden",
        "border border-transparent focus:border-[#0047FF] transition-colors resize-none",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

