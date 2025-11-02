"use client";

import Image from "next/image";
import { cn } from "@/common/lib/utils";

interface PricingFeatureItemProps {
  title: string;
  description: string;
  className?: string;
}

export const PricingFeatureItem = ({ 
  title, 
  description, 
  className 
}: PricingFeatureItemProps) => {
  return (
    <div className={cn(
      "flex items-center gap-3", 
      className
    )}>
      <div className="size-4 shrink-0">
        <Image
          src="/images/svg/blue-check.svg"
          alt="Check"
          width={16}
          height={16}
          className="size-full object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold leading-6 text-white">
          {title}
        </span>
        <span className="text-xs font-normal leading-4 text-stone-400">
          {description}
        </span>
      </div>
    </div>
  );
};