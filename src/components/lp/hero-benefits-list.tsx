"use client";

import { HERO_BENEFITS } from "@/common/constants";
import { HeroBenefitItem } from "./hero-benefit-item";
import { cn } from "@/common/lib/utils";

interface HeroBenefitsListProps {
  className?: string;
}

export const HeroBenefitsList = ({ className }: HeroBenefitsListProps) => {
  return (
    <div className={cn(
      "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5", 
      className
    )}>
      {HERO_BENEFITS.map((benefit, index) => (
        <HeroBenefitItem key={index} title={benefit} />
      ))}
    </div>
  );
};