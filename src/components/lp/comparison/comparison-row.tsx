"use client";

import Image from "next/image";
import { cn } from "@/common/lib/utils";
import type { ComparisonItem } from "@/common/constants/comparison";

interface ComparisonRowProps {
  item: ComparisonItem;
  className?: string;
}

export const ComparisonRow = ({ item, className }: ComparisonRowProps) => {
  return (
    <div
      className={cn(
        "w-full min-h-11 border-b border-neutral-400 grid grid-cols-3 sm:grid-cols-[2fr_1fr_1fr] gap-2 lg:gap-4 items-center py-2",
        className
      )}
    >
      {/* Feature Label */}
      <div className="pr-2">
        <div className="text-neutral-300 text-xs sm:text-sm lg:text-xl font-normal font-montserrat leading-tight lg:leading-6">
          {item.feature}
        </div>
      </div>

      {/* Ponte Américas Column */}
      <div className="flex justify-center items-center">
        {item.ponteAmericas.value ? (
          <div
            className={cn(
              "text-center text-white text-xs sm:text-sm lg:text-xl font-montserrat leading-tight lg:leading-6",
              item.ponteAmericas.isHighlight ? "font-bold" : "font-normal"
            )}
          >
            {item.ponteAmericas.value}
          </div>
        ) : (
          <div className="size-6 sm:size-8 lg:size-10 flex justify-center items-center">
            <Image
              src={
                item.ponteAmericas.hasFeature
                  ? "/images/svg/green-check.svg"
                  : "/images/svg/red-x-uncheck.svg"
              }
              alt={item.ponteAmericas.hasFeature ? "Check" : "X"}
              width={24}
              height={24}
              className="size-full object-contain"
            />
          </div>
        )}
      </div>

      {/* Others Column */}
      <div className="flex justify-center items-center">
        {item.others.value ? (
          <div className="text-center text-white text-xs sm:text-sm lg:text-xl font-normal font-montserrat leading-tight lg:leading-6">
            {item.others.value}
          </div>
        ) : (
          <div className="size-6 sm:size-8 lg:size-10 flex justify-center items-center">
            <Image
              src={
                item.others.hasFeature
                  ? "/images/svg/green-check.svg"
                  : "/images/svg/red-x-uncheck.svg"
              }
              alt={item.others.hasFeature ? "Check" : "X"}
              width={24}
              height={24}
              className="size-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};
