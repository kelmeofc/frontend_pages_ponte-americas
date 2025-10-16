import { Container } from "@/components/ui/container";
import { Badge } from "lucide-react";

export default function Hero() {
    return (
        <section className="bg-[#F5F5F5]">
            <Container section={true}>
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                  
                    <h1 className="title-3 text-[#111827] mb-6">
                        Protegendo o que importa: <span className="text-[#0047FF]">sua marca</span> e <span className="text-[#0047FF]">seus dados</span>
                    </h1>
                    <p className="text-3 text-[#374151]">
                        Desde 2010, a PPPI tem sido líder em soluções integradas de registro de marcas e cibersegurança,
                        ajudando empresas a proteger seus ativos mais valiosos no mundo digital e físico.
                    </p>
                </div>
            </Container>
        </section>
    )
}   
