"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import { CourseCard } from "./course-card";
import { COURSES_DATA } from "@/common/constants";

export const CoursesSection = () => {
	 const autoplayRef = useRef(
			Autoplay({ delay: 3000, stopOnInteraction: true })
		);


	return (
		<section id="programs" className="w-full  py-20">
			<div className="flex flex-col justify-center items-center gap-8">
				{/* Header */}
				<div className="px-4 flex justify-center items-center">
					<h2 className="text-center text-white text-3xl md:text-4xl font-semibold font-clash-display leading-9">
						CONHEÇA NOSSOS PROGRAMAS
					</h2>
				</div>

				{/* Carousel */}
				<div className="w-full relative">
					<Carousel
						opts={{
							align: "center",
							loop: true,
							slidesToScroll: 1,
							containScroll: "trimSnaps",
						}}
						className="w-full"
					>
						<CarouselContent className="mx-10">
							{COURSES_DATA.map((course, index) => (
								<CarouselItem
									key={index}
									className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
								>
									<CourseCard {...course} />
								</CarouselItem>
							))}
						</CarouselContent>

						<div className="absolute top-1/2 -translate-y-1/2 left-4 right-4">
							{/* Custom Navigation Buttons */}
							<CarouselPrevious className="hidden md:flex md:absolute md:left-50 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20 opacity-50 hover:opacity-80">
								<ArrowLeft className="size-4" />
							</CarouselPrevious>

							<CarouselNext className="hidden md:flex md:absolute md:right-50 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-400 border-indigo-400 text-white hover:text-white z-20 opacity-50 hover:opacity-80">
								<ArrowRight className="size-4" />
							</CarouselNext>
						</div>
					</Carousel>
				</div>
			</div>
		</section>
	);
};
