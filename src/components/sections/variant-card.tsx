"use client"

import { memo } from 'react';
import Image from 'next/image';
import { DonutPercent } from './donut-percent';

interface VariantCardProps {
  index: number; 
  imageSrc: string; 
  title: string;
  subtitle: string;
  percent: number;
  isSelected: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const VariantCard = memo(({ 
  index, 
  imageSrc, 
  title, 
  subtitle, 
  percent, 
  isSelected,
  ref 
}: VariantCardProps) => {
  return (
    <div 
      ref={ref}
      className={`p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] ${
        isSelected ? 'outline-primary outline-2 shadow-lg shadow-primary/20' : 'outline-white/50'
      } backdrop-blur-xl flex items-center gap-3 transition-all duration-300 opacity-0`}
      aria-selected={isSelected}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={106}
        height={106}
        className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
        loading={index === 0 ? "eager" : "lazy"}
      />
      <div className="flex flex-col items-center gap-1.5">
        <div className="text-neutral-800 text-sm font-bold">
          {title}
        </div>
        <div className="text-neutral-800 text-[8px] font-normal">
          {subtitle}
        </div>
        <DonutPercent percent={percent} />
      </div>
    </div>
  );
});

VariantCard.displayName = 'VariantCard';