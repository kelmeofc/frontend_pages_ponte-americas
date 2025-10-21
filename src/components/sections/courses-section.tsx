"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GradientText } from "@/components/ui/gradient-text";
import { CourseCard } from "./course-card";
import { COURSES_DATA } from "@/common/constants";

export const CoursesSection = () => {
  const carouselApiRef = useRef<CarouselApi | null>(null);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApiRef.current) {
        carouselApiRef.current.scrollNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="courses" className="w-full px-7 md:px-28 py-20 bg-white">
      <div className="flex flex-col justify-center items-center gap-8">
        {/* Header */}
        <div className="flex justify-center items-center">
          <h2 className="text-center text-3xl md:text-4xl font-semibold font-['Clash_Display'] leading-9">
            <GradientText>
              CONHEÇA NOSSOS CURSOS
            </GradientText>
          </h2>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-[1440px] relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={(api) => {
              carouselApiRef.current = api;
            }}
            className="w-full"
          >
            {/* Fade gradients nas laterais */}
            <div className="hidden md:block md:absolute md:left-0 md:top-0 w-12 md:w-20 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="hidden md:block md:absolute md:right-0 md:top-0 w-12 md:w-20 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            
            <CarouselContent className="">
              {COURSES_DATA.map((course, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <CourseCard {...course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20">
              <ArrowLeft className="w-4 h-4" />
            </CarouselPrevious>
            
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20">
              <ArrowRight className="w-4 h-4" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};