"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export function CaseStudies() {
  const [activeTab, setActiveTab] = useState("case1")
  const contentRef = useRef<HTMLDivElement>(null)

  const caseStudies = [
    {
      id: "case1",
      title: "TechFlow",
      industry: "Tecnologia",
      problem: "Marca negada por conflito com empresa existente",
      solution: "Análise prévia identificou o conflito e sugeriu alteração estratégica no nome",
      result: "Registro aprovado em primeira tentativa com o novo nome",
      before: "TechFlow",
      after: "TechFlux",
      testimonial: {
        quote:
          "Após ter meu pedido negado duas vezes, a análise da PPPI identificou o problema e sugeriu uma pequena alteração que manteve a essência da marca, mas evitou o conflito.",
        author: "Carlos Mendes, CEO",
        company: "TechFlux",
      },
    },
    {
      id: "case2",
      title: "Bella Vita",
      industry: "Alimentação",
      problem: "Documentação incorreta e classificação inadequada",
      solution: "Revisão completa da documentação e ajuste nas classes de registro",
      result: "Economia de tempo e dinheiro, aprovação em 9 meses",
      before: "Documentação com erros em 3 classes",
      after: "Documentação correta em 2 classes estratégicas",
      testimonial: {
        quote:
          "A PPPI nos mostrou que estávamos registrando em classes desnecessárias e com documentação incompleta. Economizamos dinheiro e conseguimos a aprovação muito mais rápido.",
        author: "Ana Oliveira",
        company: "Bella Vita Restaurantes",
      },
    },
    {
      id: "case3",
      title: "EcoStyle",
      industry: "Moda",
      problem: "Nome genérico com alta probabilidade de negação",
      solution: "Estratégia de registro com elementos distintivos adicionais",
      result: "Marca registrada com proteção adequada",
      before: "EcoStyle (nome genérico)",
      after: "EcoStyle+ com elementos visuais distintivos",
      testimonial: {
        quote:
          "Não sabíamos que nosso nome era considerado genérico demais para registro. A PPPI desenvolveu uma estratégia que nos permitiu manter o nome com elementos adicionais que garantiram a proteção.",
        author: "Mariana Costa",
        company: "EcoStyle+",
      },
    },
  ]

  // Animation for tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    }
  }, [activeTab])

  return (
    <div className="space-y-6">

      <Tabs defaultValue="case1" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          {caseStudies.map((study) => (
            <TabsTrigger key={study.id} value={study.id}>
              {study.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {caseStudies.map((study) => (
          <TabsContent key={study.id} value={study.id}>
            <Card>
              <CardContent className="p-4 md:p-6" ref={study.id === activeTab ? contentRef : null}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {study.industry}
                    </div>
                    <h4 className="text-xl font-bold mb-4">{study.title}</h4>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-slate-900">O Problema:</h5>
                        <p className="text-slate-600">{study.problem}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-900">Nossa Solução:</h5>
                        <p className="text-slate-600">{study.solution}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-900">Resultado:</h5>
                        <p className="text-slate-600">{study.result}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <blockquote className="italic text-slate-600">"{study.testimonial.quote}"</blockquote>
                      <p className="mt-2 font-medium text-slate-900">
                        {study.testimonial.author}, {study.testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 md:p-6 rounded-lg">
                    <h5 className="text-lg font-bold mb-4 text-center">Antes vs. Depois</h5>

                    <div className="space-y-6">
                      <div className="bg-white p-4 rounded border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="h-5 w-5 text-red-500" />
                          <h6 className="font-medium">Antes da análise PPPI:</h6>
                        </div>
                        <p className="text-slate-600">{study.before}</p>
                      </div>

                      <div className="relative py-4 flex justify-center">
                        <ArrowRight className="h-8 w-8 text-primary" />
                      </div>

                      <div className="bg-white p-4 rounded border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <h6 className="font-medium">Depois da análise PPPI:</h6>
                        </div>
                        <p className="text-slate-600">{study.after}</p>
                      </div>
                    </div>

                    <div className="mt-8 md:mt-12 text-center">
                      <Button
                        onClick={() => document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })}
                        size='lg'
                        className="uppercase max-w-full"
                      >
                        Quero minha consulta gratuita
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

