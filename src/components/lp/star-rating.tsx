"use client";

import Image from "next/image";
import { cn } from "@/common/lib/utils";

interface StarRatingProps {
  score: number;
  reviews: number;
  className?: string;
}

export const StarRating = ({ score, reviews, className }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="flex items-start gap-1">
        {stars.map((star) => (
          <div key={star} className="relative size-4 overflow-hidden">
            <Image
              src="/icons/star.svg"
              alt="Star"
              width={16}
              height={16}
              className="size-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-center text-sm font-medium uppercase text-white">
          {score}
        </span>
        <span className="text-center text-xs font-normal text-gray-400">
          ({reviews} avaliações)
        </span>
      </div>
    </div>
  );
};