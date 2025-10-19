import Image from "next/image";
import { PrimaryButton } from "@/components/primary-button";
import { ArrowRight } from "lucide-react";

interface ICourseCard {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  installments?: string;
  features: string[];
  ctaText: string;
  image?: string;
  className?: string;
}

export const CourseCard = ({
  title,
  subtitle,
  price,
  originalPrice,
  installments,
  features,
  ctaText,
  image = "/placeholder.svg",
  className = ""
}: ICourseCard) => {
  return (
    <div className={`w-full h-full relative rounded-lg border bg-gradient-to-br from-gray-900 to-black border-gray-800 overflow-hidden flex flex-col ${className}`}>
      {/* Image Section - Top Half */}
      <div className="relative h-48 w-full min-h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Course Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
            {subtitle}
          </span>
        </div>
      </div>

      {/* Content Section - Bottom Half */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title */}
        <div className="mb-3">
          <h3 className="font-clash-display text-lg font-semibold text-white mb-2">{title}</h3>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-white/80">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          {originalPrice && (
            <div className="text-sm text-white/60 line-through mb-1">{originalPrice}</div>
          )}
          <div className="text-xl font-bold text-white">{price}</div>
          {installments && (
            <div className="text-xs text-white/70">{installments}</div>
          )}
        </div>

        {/* CTA Button */}
        <PrimaryButton
          icon={<ArrowRight className="size-4" />}
          size="lg"
          className="w-full bg-gradient-to-r from-[#bb0711] to-[#3f4adf] text-white font-medium"
        >
          {ctaText}
        </PrimaryButton>
      </div>
    </div>
  );
};
