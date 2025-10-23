"use client"

import { useRef } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/primary-button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    id: 1,
    image: "/images/instagram-testimonials/depoimento-1.png",
    alt: "Depoimento de cliente satisfeito 1",
  },
  {
    id: 2,
    image: "/images/instagram-testimonials/depoimento-2.png",
    alt: "Depoimento de cliente satisfeito 2",
  },
  {
    id: 3,
    image: "/images/instagram-testimonials/depoimento-3.png",
    alt: "Depoimento de cliente satisfeito 3",
  },
  {
    id: 4,
    image: "/images/instagram-testimonials/depoimento-4.png",
    alt: "Depoimento de cliente satisfeito 4",
  },
  {
    id: 5,
    image: "/images/instagram-testimonials/depoimento-5.png",
    alt: "Depoimento de cliente satisfeito 5",
  },
  {
    id: 6,
    image: "/images/instagram-testimonials/depoimento-6.png",
    alt: "Depoimento de cliente satisfeito 6",
  },
  {
    id: 7,
    image: "/images/instagram-testimonials/depoimento-7.png",
    alt: "Depoimento de cliente satisfeito 7",
  },
]

export function TestimonialsSection() {
  const autoplayRef = useRef(
    Autoplay({ delay: 10000, stopOnInteraction: true })
  )

  const handleCtaClick = () => {
    // Scroll para a seção de CTA ou abrir WhatsApp
    const ctaSection = document.querySelector("#cta")
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="testimonials"
      className="relative w-full py-16 md:py-20 bg-[radial-gradient(ellipse_77.06%_124.39%_at_26.81%_-24.47%,_#290886_0%,_rgba(0,_0,_0,_0)_100%)] bg-black overflow-hidden"
    >
      <Container className="flex flex-col items-center gap-8 md:gap-12">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center max-w-6xl px-4">
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold font-clash-display uppercase leading-tight ">
            Relatos de quem já mudou a vida
          </h2>
          <p className="text-white text-lg md:text-xl font-normal leading-relaxed">
            Esses e outros + 150 alunos já vivem o sonho americano
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-7xl px-4 md:px-0">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[autoplayRef.current]}
            className="w-full"
            onMouseEnter={() => autoplayRef.current.stop()}
            onMouseLeave={() => autoplayRef.current.play()}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <div className="relative w-full aspect-[9/21] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover"
                      priority={testimonial.id <= 4}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
       
          </Carousel>
        </div>

        {/* CTA Button */}
        <PrimaryButton
          onClick={handleCtaClick}
          size="lg"
          isShine={false}
          className="bg-gradient-to-r from-[#bb0711] to-[#3f4adf] text-white font-medium px-8 py-4 rounded-lg uppercase hover:opacity-90 transition-opacity duration-300"
        >
          Quero mudar de vida
        </PrimaryButton>
      </Container>
    </section>
  )
}

