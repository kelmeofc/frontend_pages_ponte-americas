"use client";

import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/gradient-text";
import { ComparisonHeader } from "../comparison/comparison-header";
import { ComparisonRow } from "../comparison/comparison-row";
import type { ComparisonSectionProps } from "@/types";

export const ComparisonSectionLp = ({ title, highlightedTitle, ponteAmericasHeader, othersHeader, rows }: ComparisonSectionProps) => {
  return (
    <section id="comparison" className="w-full px-4 lg:px-28 pt-20 pb-6 bg-white flex flex-col justify-center items-center gap-16 lg:gap-32 overflow-hidden" data-animate-section data-animate-children=".animate-child">
      <Container>
        {/* Section Header */}
        <div className="flex justify-center items-center gap-2 mb-8 lg:mb-16">
          <h2 className="text-center">
            <span className="text-gray-800 font-semibold leading-8 lg:leading-10">
              {title}{" "}
            </span>
            <GradientText className="font-semibold leading-8 lg:leading-10">
              {highlightedTitle}
            </GradientText>
          </h2>
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-[1200px] mx-auto mt-30">
          <div className="relative bg-zinc-950 rounded-[20px] p-4 lg:p-8 min-h-[500px] lg:min-h-[709px]">
            {/* Headers Grid - Alinhado com as colunas da tabela */}
            <div className="w-full max-w-[900px] lg:max-w-[1150px] mx-auto grid grid-cols-3 sm:grid-cols-[2fr_1fr_1fr] gap-2 lg:gap-4 mb-8 lg:mb-16 relative">
              {/* Empty space for feature column */}
              <div></div>

              {/* Ponte Américas Logo Column */}
              <div className="flex justify-center">
                <div className="w-20 sm:w-40 lg:w-64 h-196 lg:h-[840px] absolute -top-24 lg:top-[-109px] bg-linear-to-r from-primary to-blue-950  rounded-[10px] flex justify-center items-start py-6 lg:py-8">
                  <ComparisonHeader
                    title={ponteAmericasHeader}
                    isMain={true}
                    className=""
                  />
                </div>
              </div>

              {/* Other Course Header */}
              <div className="flex justify-center">
                <div className="absolute -top-16 lg: flex justify-center">
                  <ComparisonHeader
                    title={othersHeader}
                    isMain={false}
                  />
                </div>
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="w-full max-w-[900px] lg:max-w-[1150px] mx-auto space-y-0">
              {rows.map((item, index) => (
                <ComparisonRow
                  key={index}
                  item={item}
                  className="relative"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};