import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Globe, Lock, Shield, Target, Users, Zap } from "lucide-react";

export default function TabsSection() {
    return (
        <section>
            <Container section={true}>
                <Tabs defaultValue="historia" className="w-full">
                    <TabsList className="h-auto p-2 gap-1 flex max-md:flex-col mb-8 w-full">
                        <TabsTrigger value="historia" className="w-full px-8 py-3 rounded-lg text-base font-medium max-md:w-full transition-colors data-[state=active]:bg-[#0147FC] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#71717A]">Nossa História</TabsTrigger>
                        <TabsTrigger value="missao" className="w-full px-8 py-3 rounded-lg text-base font-medium max-md:w-full transition-colors data-[state=active]:bg-[#0147FC] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#71717A]">Missão e Visão</TabsTrigger>
                        <TabsTrigger value="valores" className="w-full px-8 py-3 rounded-lg text-base font-medium max-md:w-full transition-colors data-[state=active]:bg-[#0147FC] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#71717A]">Valores</TabsTrigger>
                        {/* <TabsTrigger value="equipe" className="w-full px-8 py-3 rounded-lg text-base font-medium max-md:w-full transition-colors data-[state=active]:bg-[#0147FC] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#71717A]">Nossa Equipe</TabsTrigger> */}
                    </TabsList>

                    {/* História Tab */}
                    <TabsContent value="historia" className="mt-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-4">
                                        <h2 className="title-3 text-[#111827]">Nossa Jornada</h2>
                                        <p className="text-[#374151]">
                                            A Pandami nasceu em 2010 com uma missão clara: simplificar o processo de registro de marcas no Brasil.
                                            Fundada por especialistas em propriedade intelectual, nossa empresa rapidamente se destacou pela
                                            abordagem inovadora e centrada no cliente.
                                        </p>
                                        <p className="text-[#374151]">
                                            Em 2015, expandimos nossa atuação para incluir soluções de cibersegurança, reconhecendo a crescente
                                            necessidade de proteção digital para as empresas modernas. Esta integração nos permitiu oferecer
                                            uma proteção completa para nossos clientes.
                                        </p>
                                        <p className="text-[#374151]">
                                            Hoje, atendemos mais de 1.000 clientes em todo o Brasil, desde startups até grandes corporações,
                                            sempre mantendo nosso compromisso com a excelência e a inovação.
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="relative w-full h-80 bg-[#F5F5F5] rounded-xl overflow-hidden">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                                <Clock className="w-16 h-16 text-[#0047FF] mb-4" />
                                                <h3 className="title-4 font-bold text-[#111827] mb-2">+13 Anos de Experiência</h3>
                                                <p className="text-4">
                                                    Mais de uma década protegendo marcas e dados de empresas brasileiras
                                                </p>
                                                <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                                                    <div className="bg-white p-4 rounded-lg shadow-xs">
                                                        <p className="text-3xl font-bold text-[#0047FF]">5000+</p>
                                                        <p className="text-sm text-[#374151]">Clientes Atendidos</p>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-lg shadow-xs">
                                                        <p className="text-3xl font-bold text-[#0047FF]">98%</p>
                                                        <p className="text-sm text-[#374151]">Taxa de Sucesso</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Missão e Visão Tab */}
                    <TabsContent value="missao" className="mt-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-[#F5F5F5] rounded-xl p-6">
                                        <div className="flex items-center mb-4">
                                            <Target className="w-10 h-10 text-[#0047FF] mr-4" />
                                            <h2 className="title-4 text-[#111827]">Nossa Missão</h2>
                                        </div>
                                        <p className="text-[#374151] mb-4">
                                            Proteger e valorizar os ativos intangíveis de nossos clientes através de soluções
                                            integradas de registro de marcas e cibersegurança, com processos ágeis, transparentes
                                            e eficientes.
                                        </p>
                                        <p className="text-[#374151]">
                                            Buscamos democratizar o acesso à proteção de propriedade intelectual e segurança digital,
                                            tornando esses serviços acessíveis para empresas de todos os portes.
                                        </p>
                                        <div className="mt-6 p-4 bg-white rounded-lg border border-[#E5E7EB]">
                                            <p className="text-[#111827] font-medium italic">
                                                "Transformamos a complexidade em simplicidade, para que nossos clientes possam
                                                focar no que realmente importa: fazer seus negócios crescerem."
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F5F5F5] rounded-xl p-6">
                                        <div className="flex items-center mb-4">
                                            <Globe className="w-10 h-10 text-[#0047FF] mr-4" />
                                            <h2 className="title-4 text-[#111827]">Nossa Visão</h2>
                                        </div>
                                        <p className="text-[#374151] mb-4">
                                            Ser reconhecida como a empresa líder em soluções integradas de proteção de marcas
                                            e cibersegurança no Brasil, estabelecendo novos padrões de excelência e inovação no setor.
                                        </p>
                                        <p className="text-[#374151]">
                                            Queremos criar um ambiente digital mais seguro e um mercado mais justo, onde as
                                            empresas possam inovar e crescer com a certeza de que seus ativos estão protegidos.
                                        </p>
                                        <div className="mt-6 grid grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-lg shadow-xs">
                                                <p className="text-sm font-medium text-[#374151]">Até 2025</p>
                                                <p className="text-lg font-bold text-[#111827]">Expansão para toda América Latina</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-lg shadow-xs">
                                                <p className="text-sm font-medium text-[#374151]">Compromisso</p>
                                                <p className="text-lg font-bold text-[#111827]">Inovação Constante</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Valores Tab */}
                    <TabsContent value="valores" className="mt-4">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="title-4 text-[#111827] mb-6 text-center">Nossos Valores Fundamentais</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Shield className="w-12 h-12 text-[#0047FF] mb-4" />
                                        <h3 className="text-xl font-bold text-[#111827] mb-2">Integridade</h3>
                                        <p className="text-[#374151]">
                                            Agimos com transparência e ética em todas as nossas interações, construindo
                                            relacionamentos baseados na confiança e no respeito mútuo.
                                        </p>
                                    </div>
                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Zap className="w-12 h-12 text-[#0047FF] mb-4" />
                                        <h3 className="text-xl font-bold text-[#111827] mb-2">Inovação</h3>
                                        <p className="text-[#374151]">
                                            Buscamos constantemente novas soluções e tecnologias para oferecer serviços
                                            cada vez mais eficientes e adaptados às necessidades do mercado.
                                        </p>
                                    </div>
                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Users className="w-12 h-12 text-[#0047FF] mb-4" />
                                        <h3 className="text-xl font-bold text-[#111827] mb-2">Cliente no Centro</h3>
                                        <p className="text-[#374151]">
                                            Colocamos as necessidades e objetivos de nossos clientes no centro de tudo o que fazemos,
                                            buscando sempre superar suas expectativas.
                                        </p>
                                    </div>
                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Lock className="w-12 h-12 text-[#0047FF] mb-4" />
                                        <h3 className="text-xl font-bold text-[#111827] mb-2">Segurança</h3>
                                        <p className="text-[#374151]">
                                            Comprometemo-nos com os mais altos padrões de segurança e confidencialidade
                                            em todos os nossos processos e serviços.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 p-6 bg-[#F5F5F5] rounded-xl">
                                    <h3 className="text-xl font-bold text-[#111827] mb-4">Nosso Compromisso com a Sustentabilidade</h3>
                                    <p className="text-[#374151] mb-4">
                                        Na PPPI, acreditamos que a responsabilidade social e ambiental são partes essenciais de um
                                        negócio sustentável. Por isso, implementamos práticas que minimizam nosso impacto ambiental
                                        e contribuem positivamente para as comunidades onde atuamos.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        <div className="bg-white p-4 rounded-lg shadow-xs">
                                            <p className="font-medium text-[#111827]">Operações Paperless</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-xs">
                                            <p className="font-medium text-[#111827]">Energia Renovável</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-lg shadow-xs">
                                            <p className="font-medium text-[#111827]">Programas Sociais</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* 
                    <TabsContent value="equipe" className="mt-4">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="title-4 text-[#111827] mb-6 text-center">Conheça Nossa Equipe</h2>
                                <p className="text-[#374151] text-center mb-8 max-w-3xl mx-auto">
                                    Nossa equipe é formada por especialistas em propriedade intelectual, cibersegurança,
                                    direito e tecnologia, unidos pelo propósito de oferecer as melhores soluções para nossos clientes.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 border-4 border-white mb-4">
                                            <AvatarImage src="https://i.pravatar.cc/150?u=exec1" alt="Foto de Ana Silva" />
                                            <AvatarFallback>AS</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-xl font-bold text-[#111827]">Ana Silva</h3>
                                        <p className="text-[#0047FF] font-medium mb-2">CEO e Fundadora</p>
                                        <p className="text-[#374151] mb-4">
                                            Especialista em Propriedade Intelectual com mais de 20 anos de experiência no setor.
                                        </p>
                                        <Badge className="bg-[#E5E7EB] text-[#374151] hover:bg-[#E5E7EB]/90">Liderança</Badge>
                                    </div>

                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 border-4 border-white mb-4">
                                            <AvatarImage src="https://i.pravatar.cc/150?u=exec2" alt="Foto de Carlos Mendes" />
                                            <AvatarFallback>CM</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-xl font-bold text-[#111827]">Carlos Mendes</h3>
                                        <p className="text-[#0047FF] font-medium mb-2">Diretor de Tecnologia</p>
                                        <p className="text-[#374151] mb-4">
                                            Especialista em Cibersegurança com formação pelo MIT e experiência em grandes empresas de tecnologia.
                                        </p>
                                        <Badge className="bg-[#E5E7EB] text-[#374151] hover:bg-[#E5E7EB]/90">Inovação</Badge>
                                    </div>

                                    <div className="bg-[#F5F5F5] rounded-xl p-6 flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 border-4 border-white mb-4">
                                            <AvatarImage src="https://i.pravatar.cc/150?u=exec3" alt="Foto de Juliana Costa" />
                                            <AvatarFallback>JC</AvatarFallback>
                                        </Avatar>
                                        <h3 className="text-xl font-bold text-[#111827]">Juliana Costa</h3>
                                        <p className="text-[#0047FF] font-medium mb-2">Diretora Jurídica</p>
                                        <p className="text-[#374151] mb-4">
                                            Advogada especializada em Direito da Propriedade Intelectual e Direito Digital.
                                        </p>
                                        <Badge className="bg-[#E5E7EB] text-[#374151] hover:bg-[#E5E7EB]/90">Expertise</Badge>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <h3 className="text-xl font-bold text-[#111827] mb-4">Nossa Cultura</h3>
                                    <p className="text-[#374151] mb-6">
                                        Na PPPI, cultivamos um ambiente de trabalho colaborativo, inclusivo e focado em resultados.
                                        Valorizamos a diversidade de pensamento e experiências, acreditando que equipes diversas
                                        são mais inovadoras e eficientes.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-[#F5F5F5] rounded-xl p-6">
                                            <h4 className="text-lg font-bold text-[#111827] mb-2">Desenvolvimento Contínuo</h4>
                                            <p className="text-[#374151]">
                                                Investimos no crescimento profissional e pessoal de nossa equipe, oferecendo
                                                programas de capacitação e incentivando a busca por novos conhecimentos.
                                            </p>
                                        </div>
                                        <div className="bg-[#F5F5F5] rounded-xl p-6">
                                            <h4 className="text-lg font-bold text-[#111827] mb-2">Equilíbrio Vida-Trabalho</h4>
                                            <p className="text-[#374151]">
                                                Promovemos um ambiente que respeita o equilíbrio entre vida pessoal e profissional,
                                                com políticas de trabalho flexíveis e focadas no bem-estar.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    */}
                </Tabs>
            </Container>
        </section>
    )
}
