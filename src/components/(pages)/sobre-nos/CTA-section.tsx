import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="bg-white">
            <Container section={true}>
                <div className="bg-[#0047FF] rounded-3xl p-8 md:p-12 text-white text-center">
                    <h2 className="title-3 text-white! font-bold mb-4">Pronto para proteger sua marca e seus dados?</h2>
                    <p className="text-3 text-white! mb-4 md:mb-8 max-w-3xl mx-auto">
                        Entre em contato conosco hoje mesmo e descubra como podemos ajudar sua empresa a crescer com segurança.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/#contato"
                            className="bg-white text-[#0047FF] hover:bg-white/90 px-8 py-3 rounded-lg font-medium text-lg transition-colors focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0047FF] focus:outline-hidden"
                            aria-label="Entre em contato conosco"
                        >
                            Fale Conosco
                        </Link>
                        <Link
                            href="/#servicos"
                            className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium text-lg transition-colors focus:ring-2 focus:ring-white focus:outline-hidden"
                            aria-label="Conheça nossos serviços"
                        >
                            Nossos Serviços
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}
