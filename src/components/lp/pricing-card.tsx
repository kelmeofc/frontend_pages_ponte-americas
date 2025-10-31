"use client";

import { cn } from "@/common/lib/utils";
import { PrimaryButton } from "@/components/primary-button";
import { StarRating } from "./star-rating";
import { PricingFeatureItem } from "./pricing-feature-item";

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    badge: {
      text: string;
      color: string;
    };
    rating: {
      score: number;
      reviews: number;
    };
    pricing?: {
      originalPrice: string;
      installments: string;
      price: string;
      cents: string;
    };
    title?: string;
    features: ReadonlyArray<{
      readonly title: string;
      readonly description: string;
    }>;
    buttonText: string;
    subtitle?: string;
  };
  className?: string;
}

export const PricingCard = ({ plan, className }: PricingCardProps) => {
  const isPersonalized = plan.id === "personalizado";

  return (
    <div className={cn(
      "flex flex-1 flex-col gap-8 overflow-hidden rounded-2xl bg-zinc-950/50 px-5 pb-8 outline-1 -outline-offset-1 outline-white/20",
      isPersonalized && "self-stretch",
      className
    )}>
      {/* Badge */}
      <div className={cn(
        "flex items-center justify-center gap-2.5 overflow-hidden rounded-bl-[20px] rounded-br-[20px] px-12 py-4",
        plan.badge.color
      )}>
        <span className="text-2xl font-semibold text-white">
          {plan.badge.text}
        </span>
      </div>

      {/* Content */}
      <div className={cn(
        "flex flex-col gap-8",
        isPersonalized && "flex-1 justify-between"
      )}>
        {/* Rating */}
        <StarRating 
          score={plan.rating.score} 
          reviews={plan.rating.reviews} 
        />

        {/* Pricing or Title */}
        {plan.pricing ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-7">
              {/* Original Price */}
              <div className="flex flex-col items-center">
                <div className="text-center text-xl font-semibold leading-6 text-stone-100">
                  <span>Valor TOTAL: </span>
                  <span className="line-through">{plan.pricing.originalPrice}</span>
                  <br />
                  <span>Por apenas:</span>
                </div>
              </div>

              {/* Current Price */}
              <div className="flex items-end justify-center gap-5">
                <div className="flex flex-col items-center">
                  <span className="text-center text-sm font-normal leading-4 text-white font-rubik">
                    {plan.pricing.installments}
                  </span>
                </div>
                <div className="flex items-end justify-center gap-0.5">
                  <span className="text-center text-2xl font-semibold leading-6 text-white font-rubik">
                    R$
                  </span>
                  <span className="text-center text-4xl font-semibold leading-9 text-white font-rubik">
                    {plan.pricing.price}
                  </span>
                  <span className="text-center text-2xl font-semibold leading-6 text-white font-rubik">
                    {plan.pricing.cents}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <PrimaryButton 
                href={`/enroll?planId=${plan.id}`}
                variant="default"
                size="lg"
                className="h-12 w-full bg-linear-to-r from-red-700 to-indigo-600 px-8 py-4 font-rubik text-base font-medium uppercase text-white"
              >
                {plan.buttonText}
              </PrimaryButton>
            </div>
          </div>
        ) : (
          // Personalized plan layout
          <div className="flex flex-col items-center justify-between gap-6">
            <div className="flex flex-col items-center">
              <h3 className="text-center text-2xl font-semibold leading-7 text-stone-100 font-rubik">
                {plan.title}
              </h3>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6">
              <PrimaryButton 
                href="/enroll?planId=personalizado"
                variant="default"
                size="lg"
                className="h-12 w-full uppercase text-white"
              >
                {plan.buttonText}
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="flex flex-col gap-6">
          <h4 className="text-center text-xl font-semibold leading-5 text-stone-100 font-rubik">
            {plan.subtitle || "Tudo o que você LEVA AGORA:"}
          </h4>
          <div className="flex flex-col gap-6">
            {plan.features.map((feature, index) => (
              <PricingFeatureItem
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};