import { forwardRef } from "react";
import { cn } from "@/common/lib/utils";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, id, options, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-[#4b5563] text-base font-medium mb-2"
        >
          {label}
        </label>
        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full p-4 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]",
            className
          )}
          {...props}
        >
          <option value="">Selecione uma opção</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-[#f31260] text-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect"; 