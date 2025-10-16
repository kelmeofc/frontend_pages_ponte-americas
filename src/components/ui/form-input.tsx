import { forwardRef } from "react";
import { cn } from "@/common/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, labelClassName, label, error, id, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className={cn(
            "block text-[#4b5563] text-base font-medium mb-2",
            labelClassName
          )}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full p-4 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[#f31260] text-sm  text-left">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput"; 