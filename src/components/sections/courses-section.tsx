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

const COURSES_DATA = [
  {
    title: "Guia Completo EUA",
    subtitle: "Curso Básico",
    price: "Saiba mais",
    features: ["Planejamento completo", "Documentação necessária", "Primeiros passos"],
    ctaText: "SAIBA MAIS",
    image: "/placeholder.svg"
  },
  {
    title: "Visto Americano",
    subtitle: "Especialização",
    price: "12x R$ 297,00",
    originalPrice: "De R$ 3.564,00",
    installments: "com 10% de desconto no PIX",
    features: ["Preparação para entrevista", "Documentação completa", "Suporte especializado"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Moradia nos EUA",
    subtitle: "Imóveis & Aluguel",
    price: "12x R$ 197,00",
    originalPrice: "De R$ 2.364,00",
    installments: "com 10% de desconto no PIX",
    features: ["Como encontrar moradia", "Contratos de aluguel", "Dicas de negociação"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Trabalho nos EUA",
    subtitle: "Emprego & Negócios",
    price: "12x R$ 397,00",
    originalPrice: "De R$ 4.764,00",
    installments: "com 10% de desconto no PIX",
    features: ["Busca de emprego", "Networking profissional", "Abertura de empresa"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Educação nos EUA",
    subtitle: "Escolas & Universidades",
    price: "12x R$ 247,00",
    originalPrice: "De R$ 2.964,00",
    installments: "com 10% de desconto no PIX",
    features: ["Sistema educacional", "Processo de matrícula", "Bolsas de estudo"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Saúde & Seguros",
    subtitle: "Sistema de Saúde",
    price: "12x R$ 147,00",
    originalPrice: "De R$ 1.764,00",
    installments: "com 10% de desconto no PIX",
    features: ["Planos de saúde", "Emergências médicas", "Medicamentos"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Transporte & Veículos",
    subtitle: "Mobilidade",
    price: "12x R$ 127,00",
    originalPrice: "De R$ 1.524,00",
    installments: "com 10% de desconto no PIX",
    features: ["Carteira de motorista", "Compra de veículo", "Transporte público"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  },
  {
    title: "Finanças & Impostos",
    subtitle: "Gestão Financeira",
    price: "12x R$ 347,00",
    originalPrice: "De R$ 4.164,00",
    installments: "com 10% de desconto no PIX",
    features: ["Conta bancária", "Declaração de imposto", "Investimentos"],
    ctaText: "COMPRAR AGORA",
    image: "/placeholder.svg"
  }
];

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
      <div className="flex flex-col justify-center items-center gap-8 overflow-hidden">
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
            <CarouselContent className="-ml-2 md:-ml-4">
              {COURSES_DATA.map((course, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <CourseCard {...course} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white">
              <ArrowLeft className="w-4 h-4" />
            </CarouselPrevious>
            
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 text-white">
              <ArrowRight className="w-4 h-4" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};