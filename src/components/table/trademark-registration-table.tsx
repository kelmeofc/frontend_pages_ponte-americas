'use client'

import { Button } from "../ui/button";
import { Check, X, Info, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState, useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useRouter } from "next/navigation";

export default function TrademarkRegistrationTable({ theme = 'white' }) {
    const [isMobile, setIsMobile] = useState(false);

    const { push } = useRouter();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1100);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const table = [
        [
            {
                text: 'Análise Prévia de Disponibilidade no INPI'
            },
            {
                text: 'Análise Básica',
                information: 'Análise Básica – Consulta à base do INPI para verificar disponibilidade.'
            },
            {
                text: 'Análise Básica com verificação complementar',
                information: 'Análise Básica com verificação complementar para identificar possíveis conflitos.'
            },
            {
                text: 'Análise Detalhada e Avançada',
                information: 'Análise Detalhada e Avançada – Parecer técnico completo, com análise de riscos e busca mundial.'
            }
        ],
        [
            {
                text: 'Depósito e Procedimentos do INPI'
            },
            {
                text: 'Assistência Básica',
                information: 'Assistência para o depósito do pedido.'
            },
            {
                text: 'Assistência Integral',
                information: 'Acompanhamento integral durante o processo de registro com informativo dos andamentos'
            },
            {
                text: 'Assessoria Personalizada',
                information: 'Assessoria Personalizada – Revisão técnica detalhada durante o depósito, acompanhamento completo com explicação técnica de todos os atos e respostas às exigências do INPI.'
            }
        ],
        [
            {
                text: 'Acompanhamento do Processo (Relatórios Mensais)'
            },
            {
                text: 'Relatórios Básicos',
                information: 'Relatórios básicos mensais informativos.'
            },
            {
                text: 'Relatórios Detalhados',
                information: 'Relatórios detalhados mensais com acompanhamento e aviso de todos os andamentos.'
            },
            {
                text: 'Relatórios Detalhados e Avançados',
                information: 'Relatórios detalhados mensais com acompanhamento e aviso de todos os andamentos.Relatórios Mensais Detalhados e Avançados – Com análise crítica do processo com parecer técnico e notificações em 24h'
            }
        ],
        [
            {
                text: 'Atendimento aos Pedidos do INPI'
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Orientações para exigências do INPI',
                information: 'Inclusão de orientações de como responder às exigências e notificações emitidas pelo INPI.'
            },
            {
                text: 'Atendimento Integral',
                information: 'Atendimento Integral – Orientações estratégicas completas, suporte técnico e respostas elaboradas pela 3PI.'
            }
        ],
        [
            {
                text: 'Monitoramento da Marca no INPI'
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Identificação de registros conflitantes',
                information: 'Monitoramento para identificar registros conflitantes.'
            },
            {
                text: 'Monitoramento com Análise Preditiva',
                information: 'Monitoramento com Análise Preditiva – Alertas avançados, acompanhamento sistemático, notificação extrajudicial e relatório de análise do risco do conflito com parecer de recomendações.'
            }
        ],
        [
            {
                text: 'Defesa Contra Oposição'
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Parecer técnico básico sobre como responder',
                information: 'Parecer de como proceder para responder à oposição'
            },
            {
                text: 'Defesa Avançada com atuação proativa',
                information: 'Estratégia personalizada para contestações, com atuação proativa.'
            }
        ],
        [
            {
                text: 'Recurso Contra Indeferimento'
            },
            {
                text: '',
                information: ''
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Assessoria completa',
                information: 'Assessoria completa para interposição de recurso, garantindo alta chance de reversão do indeferimento.'
            }
        ],
        [
            {
                text: 'Análise Avançada do Nome, Logotipo e Identidade Visual'
            },
            {
                text: '',
                information: ''
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Avaliação detalhada e estratégica',
                information: 'Avaliação detalhada e estratégica dos elementos visuais da marca e nome'
            }
        ],
        [
            {
                text: 'Relatório Técnico com Parecer e Recomendações'
            },
            {
                text: '',
                information: ''
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Emissão de relatório completo com parecer técnico',
                information: 'Emissão de relatório completo com parecer técnico e recomendações estratégicas.'
            }
        ],
        [
            {
                text: 'Monitoria Pós-Registro (1 ano grátis)'
            },
            {
                text: '',
                information: ''
            },
            {
                text: '',
                information: ''
            },
            {
                text: 'Monitoria por 1 ano, após a concessão do registro',
                information: 'Monitoria completa da marca por 1 ano, após a concessão do registro.'
            }
        ]
    ]

    const planTitles = [
        "Starter",
        "Essential",
        "Premium Pro"
    ];

    const onClick = () => {
        push('/registro-de-marca#form-registro-de-marca')
    }

    const renderDesktopVersion = () => {
        return (
            <div className="w-full mx-auto">
                <div className={`border-y ${theme == 'black' ? 'border-gray-800' : ''} overflow-hidden`}>
                    <table className="w-full border-collapse">
                        <tbody>
                            {
                                table.map((row, rowIndex) => {
                                    return (
                                        <tr className={`border-b ${theme == 'black' ? 'border-gray-800' : ''}`} key={`row-${rowIndex}`}>
                                            {
                                                row.map((cell, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <td className="p-4 max-w-[260px]" key={`cell-${rowIndex}-${index}`}>
                                                                <p className="font-medium">{cell.text}</p>
                                                            </td>
                                                        )
                                                    }

                                                    if (!cell.text) {
                                                        return (
                                                            <td className="p-4 text-center max-w-[260px]" key={`cell-${rowIndex}-${index}`}>
                                                                <X className="h-5 w-5 text-red-400 mx-auto" />
                                                            </td>
                                                        )
                                                    }

                                                    return (
                                                        <td className="p-4 text-center max-w-[260px]" key={`cell-${rowIndex}-${index}`}>
                                                            <div className="flex items-center justify-between min-w-[240px]">
                                                                <div className="flex justify-center items-center">
                                                                    <Check className="min-h-5 h-5 min-w-5 w-5 text-teal-500" />
                                                                    <span className="ml-2 text-sm text-left">{cell.text}</span>
                                                                </div>
                                                                <Popover>
                                                                    <PopoverTrigger asChild>
                                                                        <button className="mt-1">
                                                                            <Info className="h-4 w-4 text-gray-400" />
                                                                        </button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent className="w-64 p-3 text-sm bg-white shadow-lg rounded-md">
                                                                        {cell.information ? cell.information : "Sem informações adicionais disponíveis."}
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderMobileVersion = () => {
        // Reorganize data by plan instead of by feature
        const planData = planTitles.map((title, index) => {
            // For each plan, collect all features
            const features = table.map((row, rowIndex) => {
                const cell = row[index + 1]; // +1 because first column is feature name
                return {
                    featureName: row[0].text,
                    hasFeature: !!cell.text,
                    featureText: cell.text,
                    information: cell.information,
                    rowIndex
                };
            }).filter(feature => feature.hasFeature || feature.rowIndex === 0); // Always include first feature or those with content

            return {
                title,
                features,
                planIndex: index
            };
        });

        return (
            <div className="w-full mx-auto">
                <div className="space-y-8">
                    {planData.map((plan) => (
                        <div key={`mobile-plan-${plan.planIndex}`} className={`border rounded-lg overflow-hidden mb-8 ${theme == 'black' ? 'border-gray-800' : ''}`}>
                            <div className={`${theme == 'black' ? '' : 'bg-gray-50'} p-4 border-b ${theme == 'black' ? 'border-gray-800' : ''}`}>
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-medium text-xl">{plan.title}</h3>
                                    {plan.planIndex === 2 ? (
                                        <Button onClick={onClick} variant="default" className="whitespace-nowrap bg-linear-to-r from-[#0047ff] to-[#0035c0] hover:opacity-70 cursor-pointer rounded-full px-4 py-2">
                                            Fale com um consultor
                                        </Button>
                                    ) : (
                                        <Button onClick={onClick} variant="outline" className={`whitespace-nowrap border-2 border-gray-300 rounded-full px-4 py-2 text-gray-700 ${theme == 'black' ? 'bg-white text-black' : 'text-gray-700'}`}>
                                            Fale com um consultor
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <Accordion type="single" collapsible key={`feature-${plan.planIndex}-${feature.rowIndex}`}>
                                            <AccordionItem value={`feature-${plan.planIndex}-${feature.rowIndex}`} className="border-b border-gray-100 last:border-0">
                                                <AccordionTrigger className="py-2 hover:no-underline">
                                                    <div className="flex items-center gap-2">
                                                        {feature.hasFeature ? (
                                                            <>
                                                                <Check className="min-h-5 h-5 min-w-5 w-5 text-teal-500 shrink-0" />
                                                                <span className="ml-2 text-sm text-left">{feature.featureName}: {feature.featureText}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <X className="h-5 w-5 text-red-400 shrink-0" />
                                                                <span className="ml-2 text-sm text-gray-500">{feature.featureName}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </AccordionTrigger>
                                                {feature.hasFeature && (
                                                    <AccordionContent className="pt-2 pb-2 pl-7">
                                                        <div className={`text-sm text-gray-600 ${theme == 'black' ? 'text-gray-300!' : 'bg-gray-50'} p-3 rounded-md`}>
                                                            {feature.information ? feature.information : "Sem informações adicionais disponíveis."}
                                                        </div>
                                                    </AccordionContent>
                                                )}
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className={`w-full py-8 md:py-12 ${theme == 'black' ? 'bg-transparent text-white mt-24' : 'bg-white'} overflow-hidden`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold">Escolha o registro ideal para sua empresa</h2>
                    {!isMobile && (
                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="flex flex-col items-center">
                                <p className="w-full text-left font-medium text-[24px] mb-2">Starter</p>
                                <Button variant="outline" onClick={onClick} className={`min-w-[280px] whitespace-nowrap border-2 border-gray-300 rounded-full text-[16px] ${theme == 'black' ? 'bg-white text-black' : 'text-gray-700'}`}>Fale com um consultor</Button>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="w-full text-left font-medium text-[24px] mb-2">Essential</p>
                                <Button variant="outline" onClick={onClick} className={`min-w-[280px] whitespace-nowrap border-2 border-gray-300 rounded-full text-[16px] ${theme == 'black' ? 'bg-white text-black' : 'text-gray-700'}`}>Fale com um consultor</Button>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="w-full text-left font-medium text-[24px] mb-2">Premium Pro</p>
                                <Button variant="default" onClick={onClick} className="min-w-[280px] whitespace-nowrap bg-linear-to-r from-[#0047ff] to-[#0035c0] hover:opacity-70 cursor-pointer rounded-full">Fale com um consultor</Button>
                            </div>
                        </div>
                    )}
                </div>

                {isMobile ? renderMobileVersion() : renderDesktopVersion()}
            </div>
        </section>
    )
}