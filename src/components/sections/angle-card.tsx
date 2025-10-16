"use client"

import { memo } from 'react';
import Image from 'next/image';

interface AngleCardProps {
  index: number; 
  imageSrc: string; 
  title: string;
  ref?: React.Ref<HTMLDivElement>;
}

export const AngleCard = memo(({ 
  index, 
  imageSrc, 
  title,
  ref 
}: AngleCardProps) => {
  return (
    <div 
      ref={ref}
      className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-col justify-center items-center gap-2 opacity-0"
    >
      <div className="text-neutral-800 text-sm font-bold">
        {title}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        width={112}
        height={112}
        className="size-28 md:size-[7rem] rounded-xl object-cover aspect-square"
        loading={index === 0 ? "eager" : "lazy"}
      />
    </div>
  );
});

AngleCard.displayName = 'AngleCard';