"use client"

import Image from "next/image"

import { PrimaryButton } from "@/components/primary-button"
import { Container } from "@/components/ui/container"
import { Marquee } from "@/components/ui/marquee"

const TEACHER_PROFILE = {
  name: "Cauã Cunha",
  role: "Fundador do Ponte Américas",
  image: {
    src: "/images/programs-thumbnails/caua-program-cover-2-como-vir-morar-nos-estados-unidos.png",
    alt: "Cauã Cunha, professor do Programa Ponte Américas",
    width: 1280,
    height: 720,
  },
  highlights: [
    { label: "Sonhos realizados", value: "+150" },
    { label: "Países atendidos", value: "08" },
    { label: "Horas de conteúdo", value: "+40" },
  ],
}

const LESSON_PREVIEWS = [
  {
    id: "sistema-americano",
    title: "Como funciona o sistema americano",
    description: "Entenda desde o básico até as nuances culturais, legais e financeiras para se estabelecer com sucesso nos EUA.",
    audience: "Mentoria Ponte Américas",
    image: "/images/programs-modules-covers/program-morar-nos-eua-module-cover-sistema-americano.png",
    tag: "Módulo 1",
  },
  {
    id: "documentacao-legal",
    title: "Documentação e processos legais",
    description: "Passo a passo completo sobre vistos, green card, cidadania e todos os documentos necessários para viver legalmente nos EUA.",
    audience: "Aula prática",
    image: "/images/programs-modules-covers/program-morar-nos-eua-module-cover-documentacao-legal.png",
    tag: "Módulo 2",
  },
  {
    id: "mercado-trabalho",
    title: "Mercado de trabalho americano",
    description: "Como encontrar oportunidades, criar networking efetivo e se posicionar no mercado de trabalho dos EUA.",
    audience: "Playbook exclusivo",
    image: "/images/programs-modules-covers/program-morar-nos-eua-module-cover-mercado-trabalho.png",
    tag: "Módulo 3",
  },
  {
    id: "vida-pratica",
    title: "Vida prática nos Estados Unidos",
    description: "Moradia, sistema de saúde, educação, impostos e tudo que você precisa saber para o dia a dia americano.",
    audience: "Material bônus",
    image: "/images/programs-modules-covers/program-morar-nos-eua-module-cover-vida-pratica.png",
    tag: "Módulo 4",
  },
] as const

export function TeacherSection() {
  return (
    <section id="teacher" className="bg-white py-20 overflow-hidden" data-animate-section data-animate-children=".animate-child">
      <Container>
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 justify-between items-center ">
          {/* Professor Card */}
          <div className="flex flex-col w-full h-auto xl:h-[600px] max-w-[420px] xl:w-[420px] bg-zinc-900 shadow-xl rounded-3xl overflow-hidden">
            <div className="flex-1 relative">
              <Image
                src={TEACHER_PROFILE.image.src}
                alt={TEACHER_PROFILE.image.alt}
                width={TEACHER_PROFILE.image.width}
                height={TEACHER_PROFILE.image.height}
                quality={85}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="mt-8 flex flex-col gap-5 to-transparent p-6 sm:p-7 w-full">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Mentor</p>
                <h3 className="mt-1 text-3xl font-semibold uppercase text-white">
                  {TEACHER_PROFILE.name}
                </h3>
                <p className="text-sm font-medium text-white/80 font-montserrat">
                  {TEACHER_PROFILE.role}
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-3 text-xs text-white/70">
                {TEACHER_PROFILE.highlights.map((item) => (
                  <div key={item.label} className="flex flex-col rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <dt className="text-[11px] font-montserrat uppercase tracking-wide">
                      {item.label}
                    </dt>
                    <dd className="text-lg font-semibold text-white">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 max-w-xs md:max-w-2xl lg:max-w-[44rem] text-center xl:text-left items-center xl:items-start">

            <span className="flex w-fit items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Método exclusivo Ponte Américas
            </span>
            <h3 className="font-semibold uppercase text-zinc-900 ">
              Conheça a didática do seu mentor
            </h3>
            <p className="text-base sm:text-lg text-zinc-600">
              Ainda está em dúvida? Veja uma amostra das aulas que você desbloqueia ao entrar no Ponte Américas. Cada módulo combina informação prática, estratégia e experiência real para acelerar sua jornada rumo aos Estados Unidos.
            </p>

            {/* Marquee Container */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 sm:w-16 bg-linear-to-r from-white via-white/80 to-transparent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 sm:w-16 bg-linear-to-l from-white via-white/80 to-transparent"
              />

              <Marquee pauseOnHover className="flex py-2 sm:py-4 [--gap:1.5rem]" repeat={2}>
                {LESSON_PREVIEWS.map((lesson) => (
                  <article
                    key={lesson.id}
                    className="flex flex-col w-64 sm:w-72 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={lesson.image}
                        alt={lesson.title}
                        fill
                        sizes="(max-width: 640px) 80vw, 288px"
                        className="object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white">
                        {lesson.tag}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                      <h3 className="text-sm font-semibold text-zinc-900">
                        {lesson.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-zinc-500">
                        {lesson.description}
                      </p>
                      <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                        {lesson.audience}
                      </span>
                    </div>
                  </article>
                ))}
              </Marquee>
            </div>

            <div className="flex justify-center xl:justify-start w-full">
              <PrimaryButton href="/enroll" size="lg" className="uppercase tracking-wide">
                Quero mudar de vida
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TeacherSection
