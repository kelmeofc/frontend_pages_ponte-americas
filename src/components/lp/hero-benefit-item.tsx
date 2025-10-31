"use client";

import Image from "next/image";
import { cn } from "@/common/lib/utils";

interface HeroBenefitItemProps {
  title: string;
  className?: string;
}

export const HeroBenefitItem = ({ title, className }: HeroBenefitItemProps) => {
  return (
    <div className={cn(
      "flex items-center justify-center gap-2 py-0.5 sm:justify-start", 
      className
    )}>
      <div className="size-6 shrink-0">
        <Image
          src="/icons/check-green.svg"
          alt="Check"
          width={24}
          height={24}
          className="size-full object-contain"
        />
      </div>
      <span className="text-gray-200 text-base font-medium leading-5 sm:text-lg">
        {title}
      </span>
    </div>
  );
};