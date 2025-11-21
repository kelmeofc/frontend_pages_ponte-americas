"use client";

import { PricingCard } from "@/components/lp/pricing-card";
import { GradientText } from "@/components/ui/gradient-text";
import type { PricingSectionProps } from "@/types";

interface PricingSectionLpProps extends PricingSectionProps {
  programId: string;
}

export const PricingSectionLp = ({ programId, title, plans }: PricingSectionLpProps) => {
  return (
    <section
      id="pricing"
      className="w-full px-4 py-16 md:px-8 md:py-28 bg-black"
      data-animate-section
      data-animate-children=".animate-child"
      style={{
        background: "radial-gradient(74.24% 106.5% at 68.26% 131.44%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(0deg, #05060B 0%, #05060B 100%), linear-gradient(0deg, #0D0D0D 0%, #0D0D0D 100%), #B4903F"
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center gap-2">
          <div className="text-center">

            <h3 className="font-semibold uppercase leading-tight text-white">
              {title.main}
            </h3>


          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-5">

            <h2 className="text-center  font-semibold uppercase leading-tight  ">
              <GradientText>
                {title.highlight}
              </GradientText>
            </h2>




            <h3 className="text-center font-semibold uppercase leading-tight text-white  ">
              {title.subtitle}
            </h3>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} programId={programId} />
          ))}
        </div>
      </div>
    </section>
  );
};