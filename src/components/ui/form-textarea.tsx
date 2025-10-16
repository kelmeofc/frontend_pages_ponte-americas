import { forwardRef } from "react";
import { cn } from "@/common/lib/utils";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-[#4b5563] text-base font-medium mb-2"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full p-4 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[#f31260] text-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea"; 