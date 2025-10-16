"use client"

import { useRef, useEffect } from "react"
import { TestimonialCard } from "./testimonial-card"

// Custom utility to hide scrollbar but allow scrolling
const scrollbarHideClass = `
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
  }
`

// Testimonial data
const testimonials = [
    {
        id: 'depoimento-hanna',
        name: "Hanna ",
        videoSrc: "https://assets-pppi.s3.us-east-1.amazonaws.com/public/depoimento-hanna.mp4",
        hasVideo: false,
        description: 'Empresária dona de seguradora'
    },
    {
        id: 'depoimento-andre',
        name: "André Lin",
        videoSrc: "https://assets-pppi.s3.us-east-1.amazonaws.com/public/depoimento-andre.mp4",
        hasVideo: false,
        description: 'Especialista em cogumelos'
    },
    {
        id: 'depoimento-carlos',
        name: "Carlos Roberto",
        videoSrc: "https://assets-pppi.s3.us-east-1.amazonaws.com/public/depoimento-eduardo.mp4",
        hasVideo: true,
        description: 'Dono de lanchonete'
    },
]

export function TestimonialsSliderSection() {
    const sliderRef = useRef<HTMLDivElement>(null)
    const isDragging = useRef(false)
    const startX = useRef(0)
    const scrollLeft = useRef(0)

    useEffect(() => {
        const slider = sliderRef.current
        if (!slider) return
        
        // Ensure the slider starts at the beginning (first slide visible)
        slider.scrollLeft = 0

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true
            slider.style.cursor = 'grabbing'
            startX.current = e.pageX - slider.offsetLeft
            scrollLeft.current = slider.scrollLeft
        }

        const handleMouseUp = () => {
            isDragging.current = false
            slider.style.cursor = 'grab'
        }

        const handleMouseLeave = () => {
            isDragging.current = false
            slider.style.cursor = 'grab'
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return
            e.preventDefault()
            const x = e.pageX - slider.offsetLeft
            const walk = (x - startX.current) * 2
            slider.scrollLeft = scrollLeft.current - walk
        }

        slider.addEventListener('mousedown', handleMouseDown)
        slider.addEventListener('mousemove', handleMouseMove)
        slider.addEventListener('mouseup', handleMouseUp)
        slider.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            slider.removeEventListener('mousedown', handleMouseDown)
            slider.removeEventListener('mousemove', handleMouseMove)
            slider.removeEventListener('mouseup', handleMouseUp)
            slider.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <>
            {/* <style jsx global>
                {scrollbarHideClass}
            </style>
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-12">
                    Escute o que vários empresários falam
                    <br className="hidden sm:block" /> sobre o registro da 3Pi
                </h2>

                <div className="relative w-full overflow-hidden">
                    <div
                        ref={sliderRef}
                        className="flex justify-start md:justify-center overflow-x-auto snap-x snap-mandatory touch-pan-x scrollbar-hide space-x-4 pb-6 cursor-grab active:cursor-grabbing"
                        style={{
                            scrollBehavior: "smooth",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="flex-none w-[80%] sm:w-[calc(50%-8px)] lg:w-[calc(28%-12px)] snap-start"
                            >
                                <TestimonialCard name={testimonial.name} videoUrl={testimonial.videoSrc} id={testimonial.id} description={testimonial.description} />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const container = sliderRef.current
                                    if (!container) return
                                    const slideWidth = container.scrollWidth / testimonials.length
                                    container.scrollTo({
                                        left: slideWidth * index,
                                        behavior: "smooth",
                                    })
                                }}
                                className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-500 focus:bg-gray-800 transition-colors"
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section> */}
        </>
    )
}

