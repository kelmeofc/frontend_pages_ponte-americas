import * as React from "react"
import { cn } from "@/common/lib/utils"
import { UseFormRegister } from "react-hook-form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  name?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, ...props }, ref) => {
    const inputProps = {
      type,
      className: cn(
        "w-full px-4 py-3 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:outline-hidden",
        "border border-transparent focus:border-[#0047FF] transition-colors",
        className,
      ),
      ...props,
    };

    const registerProps = register ? register(props.name as string) : {};
    return <input ref={ref} {...registerProps} {...inputProps} />;
  }
);
Input.displayName = "Input"

export { Input }

