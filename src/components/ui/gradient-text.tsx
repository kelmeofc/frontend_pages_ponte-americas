import { cn } from "@/common/lib/utils";

interface IGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText = ({ children, className }: IGradientTextProps) => {
  return (
    <span className={cn("bg-gradient-to-r from-[#bb0711] to-[#3f4adf] bg-clip-text text-transparent", className)}>
      {children}
    </span>
  );
};
