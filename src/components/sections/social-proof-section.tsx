"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { AboutVisagismComparisonSlider } from "@/components/sections/about-visagism-comparison-slider";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ArrowLeft, ArrowRight, XCircle, CheckCircle } from "lucide-react";
import { cn } from "@/common/lib/utils";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  title: string;
  before: {
    image: string; // path imagem antes
    text: string;  // descrição "ANTES:"
  };
  after: {
    image: string;  // path imagem depois
    text: string;   // descrição "COM IA PANDAMI:"
  };
  quote: string;   // citação curta
  avatar: string;  // pequeno círculo
}

// Imagens reais de antes/depois em /public/lp/images/social-proof
const testimonials: Testimonial[] = [
  {
    id: "patricia",
    name: "Patrícia Costa",
    age: 45,
    title: "Nunca me senti tão confiante com meu visual",
    before: {
      image: "/lp/images/social-proof/social-proof_patricia-before.png",
      text: "Usava sempre o mesmo corte há anos"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_patricia-after.png",
      text: "Corte personalizado para meu rosto oval"
    },
    quote: "O profissional me explicou exatamente por que aquele corte ia valorizar meu rosto. Incrível!",
    avatar: "/lp/images/social-proof/social-proof_patricia-after.png",
  },
  {
    id: "carlos",
    name: "Carlos Santana",
    age: 34,
    title: "Descobri que meu cabelo crespo precisava de corte específico",
    before: {
      image: "/lp/images/social-proof/social-proof_carlos-before.png",
      text: "Cortava sempre no 1, ficava sem forma"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_carlos-after.png",
      text: "Mid fade que define os cachos perfeitamente"
    },
    quote: "Agora meu cabelo tem forma, pareço mais maduro e confiante. Virei referência na região!",
    avatar: "/lp/images/social-proof/social-proof_carlos-after.png",
  },
  {
    id: "marcelo",
    name: "Marcelo Ribeiro",
    age: 35,
    title: "Nunca pensei que corte fazia tanta diferença",
    before: {
      image: "/lp/images/social-proof/social-proof_marcelo-before.png",
      text: "Mesmo corte há anos, resultado previsível"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_marcelo-after.png",
      text: "Estilo que valoriza meu rosto quadrado"
    },
    quote: "Saio na rua e ninguém me conhece mais. A diferença foi absurda!",
    avatar: "/lp/images/social-proof/social-proof_marcelo-after.png",
  },
  {
    id: "valquiria",
    name: "Valquíria Santos",
    age: 25,
    title: "Me sinto muito mais confiante agora",
    before: {
      image: "/lp/images/social-proof/social-proof_valquiria-before.png",
      text: "Cabelo básico, sem personalidade"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_valquiria-after.png",
      text: "Corte que realça minha beleza natural"
    },
    quote: "A transformação foi incrível! Pessoas me param na rua para perguntar onde cortei.",
    avatar: "/lp/images/social-proof/social-proof_valquiria-after.png",
  },
  {
    id: "andrew",
    name: "Andrew Borges",
    age: 31,
    title: "Agora me sinto muito mais elegante",
    before: {
      image: "/lp/images/social-proof/social-proof_andrew-before.png",
      text: "Visual bagunçado, sem definição"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_andrew-after.png",
      text: "Degradê moderno + barba alinhada"
    },
    quote: "Cortou num estilo que valoriza meu rosto. Mudou completamente minha mandíbula!",
    avatar: "/lp/images/social-proof/social-proof_andrew-after.png",
  },
  {
    id: "simone",
    name: "Simone Martins",
    age: 21,
    title: "Foi a melhor decisão que já tomei!",
    before: {
      image: "/lp/images/social-proof/social-proof_simone-before.png",
      text: "Cabelo ressecado, sem vida"
    },
    after: {
      image: "/lp/images/social-proof/social-proof_simone-after.png",
      text: "Corte + cor que realça meu tom de pele"
    },
    quote: "Me acho tão gata agora! Sério, foi a melhor decisão que já tomei na vida!",
    avatar: "/lp/images/social-proof/social-proof_simone-after.png",
  },
];

export function SocialProofSection() {
  const [index, setIndex] = useState(5); // começa no depoimento da Simone conforme screenshot
  const current = testimonials[index];
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const prevIndex = useRef(index);
  const directionRef = useRef<1 | -1>(1); // 1 = avançando, -1 = retrocedendo
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Animação slide-in direcional a cada mudança de slide
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prevIndex.current = index;
      return;
    }

    // Determina direção considerando wrap
    if (index === 0 && prevIndex.current === testimonials.length - 1) {
      directionRef.current = 1;
    } else if (index === testimonials.length - 1 && prevIndex.current === 0) {
      directionRef.current = -1;
    } else {
      directionRef.current = index > prevIndex.current ? 1 : -1;
    }

    prevIndex.current = index;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const dir = directionRef.current; // 1 ou -1
    const l = leftRef.current;
    const r = rightRef.current;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });

    if (navRef.current) {
      tl.fromTo(
        navRef.current.querySelectorAll('button[aria-label^="Ver depoimento"]'),
        { opacity: 0.65 },
        { opacity: 1, stagger: 0.04, duration: 0.3 },
        0
      );
    }

    if (l && r) {
      gsap.set([l, r], { willChange: 'opacity, transform' });
      // Estado inicial fora de tela leve + fade
      gsap.set(l, { x: dir * 60, autoAlpha: 0 });
      gsap.set(r, { x: dir * 80, autoAlpha: 0 });

      tl.to(l, { x: 0, autoAlpha: 1 }, 0.05)
        .to(r, { x: 0, autoAlpha: 1 }, 0.1)
        .add(() => {
          gsap.set([l, r], { clearProps: 'willChange' });
        });
    }

    return () => {
      tl.kill();
    };
  }, [index]);

  function prev() {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
    <section id="socialproof" className="py-20 bg-neutral-50 overflow-hidden">
      <Container className="overflow-visible">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-2 text-stone-900">
          Clientes reais, transformações reais com análise PandaMi
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
          Veja o que acontece quando profissionais usam nossa IA para escolher o
          corte perfeito. Deslize nas fotos para ver o antes e depois.
        </p>

        {/* Navegação */}
        <div
          ref={navRef}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-10 max-w-full px-2"
        >
          <button
            onClick={prev}
            aria-label="Anterior"
            className="p-2 rounded-full bg-orange-50 border border-orange-200 text-stone-900 hover:bg-orange-100 transition shrink-0 cursor-pointer"
          >
            <ArrowLeft className="size-4 sm:size-5" />
          </button>
          <ul className="flex gap-2 sm:gap-4 items-center overflow-x-hidden max-w-[calc(100%-5rem)]">
            {/* No mobile: apenas 3 avatares (anterior, atual e próximo) */}
            {testimonials.map((t, i) => {
              const prevIdx = index === 0 ? testimonials.length - 1 : index - 1;
              const nextIdx = index === testimonials.length - 1 ? 0 : index + 1;
              const isVisibleOnMobile = i === prevIdx || i === index || i === nextIdx;

              return (
                <li
                  key={t.id}
                  className={cn(
                    !isVisibleOnMobile && "hidden sm:block" // Oculta no mobile se não for um dos 3 avatares visíveis
                  )}
                >
                  <button
                    aria-label={`Ver depoimento de ${t.name}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "relative size-12 rounded-full border overflow-hidden transition cursor-pointer",
                      i === index
                        ? "border-orange-400 ring-2 ring-orange-200"
                        : "border-white/70 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={128}
                      height={128}
                      className="w-12 h-12 object-cover object-center"
                      sizes="256px"
                      priority={i === index}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={next}
            aria-label="Próximo"
            className="p-2 rounded-full bg-orange-50 border border-orange-200 text-stone-900 hover:bg-orange-100 transition shrink-0 cursor-pointer"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>

        {/* Slide atual */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
          <div ref={leftRef} key={current.id + "-left"} className="lg:w-1/2">
            <AboutVisagismComparisonSlider
              before={current.before.image}
              after={current.after.image}
              beforeAlt="Antes do visagismo"
              afterAlt="Depois do visagismo"
              className="w-full h-[420px] md:h-[500px]"
            />
          </div>
          <div
            ref={rightRef}
            key={current.id + "-right"}
            className="lg:w-1/2 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-6">
              {/* Título do depoimento */}
              <h3 className="text-stone-900 text-xl md:text-2xl font-medium leading-tight">
                {current.title}
              </h3>

              {/* Comparativo Antes vs Depois */}
              <div className="flex flex-col gap-3">
                <div className="flex rounded-lg bg-red-50 overflow-hidden">
                  <div className="bg-red-100 flex items-center justify-center px-3 py-3">
                    <XCircle className="text-red-500 size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col p-3">
                    <div className="font-medium text-red-700 mb-0.5">ANTES:</div>
                    <div className="text-neutral-700">{current.before.text}</div>
                  </div>
                </div>
                
                <div className="flex rounded-lg bg-emerald-50 overflow-hidden">
                  <div className="bg-emerald-100 flex items-center justify-center px-3 py-3">
                    <CheckCircle className="text-emerald-500 size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col p-3">
                    <div className="font-medium text-emerald-700 mb-0.5">COM IA PANDAMI:</div>
                    <div className="text-neutral-700">{current.after.text}</div>
                  </div>
                </div>
              </div>

              {/* Citação */}
              <blockquote className="border-l-4 border-orange-300 pl-4 py-2">
                <p className="text-stone-900 text-lg leading-relaxed italic">
                  "{current.quote}"
                </p>
              </blockquote>
              
              {/* Autor da citação */}
              <p className="text-neutral-600 text-sm md:text-base">
                {current.name}, {current.age} anos
              </p>
            </div>
            
            <div className="mt-6">
              <Link href="https://app.pandami.com.br/auth/sign-up">
                <PrimaryButton
                  size="lg"
                  className="w-full md:w-auto px-8 cursor-pointer"
                  icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
                >
                  Quero no meu salão
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
