"use client";

import { HERO_BENEFITS } from "@/common/constants";
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
          src="/images/svg/green-check.svg"
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

interface HeroBenefitsListProps {
  className?: string;
}

export const HeroBenefitsList = ({ className }: HeroBenefitsListProps) => {
  return (
    <div className={cn(
      "text-medium flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 lg:gap-6", 
      className
    )}>
      {HERO_BENEFITS.map((benefit, index) => (
        <HeroBenefitItem key={index} title={benefit} />
      ))}
    </div>
  );
};