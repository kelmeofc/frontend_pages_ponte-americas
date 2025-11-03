"use client";

import { PRICING_DATA } from "@/common/constants";
import { PricingCard } from "../pricing-card";
import { GradientText } from "@/components/ui/gradient-text";

export const PricingSectionLp = () => {
  return (
    <section
      className="w-full px-4 py-16 md:px-8 md:py-28 bg-black"
      style={{
        background: "radial-gradient(74.24% 106.5% at 68.26% 131.44%, #290886 0%, rgba(0, 0, 0, 0.00) 100%), linear-gradient(0deg, #05060B 0%, #05060B 100%), linear-gradient(0deg, #0D0D0D 0%, #0D0D0D 100%), #B4903F"
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center justify-center gap-2">
          <div className="text-center">

            <h3 className="font-semibold uppercase leading-tight text-white">
              {PRICING_DATA.title.main}
            </h3>


          </div>
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-5">

            <h2 className="text-center  font-semibold uppercase leading-tight  ">
              <GradientText>
                {PRICING_DATA.title.highlight}
              </GradientText>
            </h2>




            <h3 className="text-center font-semibold uppercase leading-tight text-white  ">
              {PRICING_DATA.title.subtitle}
            </h3>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {PRICING_DATA.plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};