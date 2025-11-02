"use client";

import Image from "next/image";
import { cn } from "@/common/lib/utils";

interface ComparisonHeaderProps {
  title: string;
  isMain?: boolean;
  className?: string;
}

export const ComparisonHeader = ({
  title,
  isMain = false,
  className,
}: ComparisonHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-start items-center",
        className
      )}
    >
      {isMain ? (
        <div className="w-16 sm:w-40 lg:w-60 flex justify-center items-center">
          <picture>
            <source 
              media="(max-width: 639px)" 
              srcSet="/images/svg/ponteamericas-logo-icon-only.svg"
            />
            <Image
              src="/images/svg/ponteamericas-logo-title-light.svg"
              alt="Ponte Américas Logo"
              width={240}
              height={48}
              className="w-full h-auto"
              priority
            />
          </picture>
        </div>
      ) : (
        <div className="text-center text-neutral-800 text-sm sm:text-base lg:text-xl font-semibold font-montserrat leading-tight lg:leading-6 px-2">
          {title}
        </div>
      )}
    </div>
  );
};
