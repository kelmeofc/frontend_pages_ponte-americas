import { Container } from "@/components/ui/container";

export default function Statistics() {
    return (
        <section className="bg-[#F5F5F5]">
            <Container section={true}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#111827] mb-4">PPPI em Números</h2>
                    <p className="text-lg text-[#374151] max-w-3xl mx-auto">
                        Nosso compromisso com a excelência e a satisfação do cliente se reflete em nossos resultados.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center shadow-xs">
                        <p className="text-4xl font-bold text-[#0047FF]">1000+</p>
                        <p className="text-lg text-[#374151]">Clientes Atendidos</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-xs">
                        <p className="text-4xl font-bold text-[#0047FF]">98%</p>
                        <p className="text-lg text-[#374151]">Taxa de Sucesso</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-xs">
                        <p className="text-4xl font-bold text-[#0047FF]">1500+</p>
                        <p className="text-lg text-[#374151]">Marcas Protegidas</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-xs">
                        <p className="text-4xl font-bold text-[#0047FF]">13</p>
                        <p className="text-lg text-[#374151]">Anos de Experiência</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
