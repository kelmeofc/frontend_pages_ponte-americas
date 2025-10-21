import LegalLayout from "@/components/layouts/legal-layout";
import { useLegalMetadata } from "@/common/hooks/use-legal-metadata";
import { legalPagesConfig } from "@/common/config/legal-pages";

export const metadata = useLegalMetadata(legalPagesConfig["termos-de-uso"].metadata);

export default function Page() {
    return (
        <LegalLayout
            config={legalPagesConfig["termos-de-uso"]}
            currentPath="/termos-de-uso"
        >
            {/* Índice de navegação */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Índice</h2>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <a href="#aceitacao" className="text-primary hover:underline">1. Aceitação dos Termos</a>
                    <a href="#descricao" className="text-primary hover:underline">2. Descrição do Programa</a>
                    <a href="#cadastro" className="text-primary hover:underline">3. Cadastro e Inscrição</a>
                    <a href="#conteudo" className="text-primary hover:underline">4. Conteúdo Educacional</a>
                    <a href="#uso-permitido" className="text-primary hover:underline">5. Uso Permitido</a>
                    <a href="#propriedade" className="text-primary hover:underline">6. Propriedade Intelectual</a>
                    <a href="#responsabilidades" className="text-primary hover:underline">7. Responsabilidades</a>
                    <a href="#limitacao" className="text-primary hover:underline">8. Limitação de Responsabilidade</a>
                    <a href="#privacidade" className="text-primary hover:underline">9. Privacidade e Proteção de Dados</a>
                    <a href="#modificacoes" className="text-primary hover:underline">10. Modificações dos Termos</a>
                    <a href="#rescisao" className="text-primary hover:underline">11. Cancelamento e Rescisão</a>
                    <a href="#disponibilidade" className="text-primary hover:underline">12. Disponibilidade do Serviço</a>
                    <a href="#comunicacoes" className="text-primary hover:underline">13. Comunicações</a>
                    <a href="#disposicoes" className="text-primary hover:underline">14. Disposições Gerais</a>
                    <a href="#contato" className="text-primary hover:underline">15. Suporte e Contato</a>
                    <a href="#vigencia" className="text-primary hover:underline">16. Vigência</a>
                </nav>
            </div>

            <section id="aceitacao">
                <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                <p className="mb-4 leading-relaxed">
                    Ao acessar e utilizar o programa educacional <strong>Ponte Américas</strong> ("Programa", "Plataforma" ou "Serviços"), você concorda em cumprir e estar vinculado aos seguintes Termos de Uso.
                </p>
                <p className="mb-6 leading-relaxed">
                    Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços educacionais. O uso contínuo da plataforma constitui aceitação plena destes termos.
                </p>
            </section>

            <section id="descricao">
                <h2 className="text-2xl font-semibold mb-4">2. Descrição do Programa</h2>

                <h3 className="text-xl font-medium mb-3">2.1 Sobre o Ponte Américas</h3>
                <p className="mb-4 leading-relaxed">
                    O Ponte Américas é um programa educacional abrangente dedicado a orientar brasileiros em sua jornada para viver, trabalhar e prosperar nos Estados Unidos. Nosso objetivo é fornecer conhecimento prático e estratégico para uma transição bem-sucedida.
                </p>

                <h3 className="text-xl font-medium mb-3">2.2 Conteúdo Oferecido</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Cursos online sobre imigração e legislação americana</li>
                    <li>Guias práticos sobre documentação e processos burocráticos</li>
                    <li>Orientações sobre mercado de trabalho e oportunidades profissionais</li>
                    <li>Informações sobre sistema educacional americano</li>
                    <li>Dicas sobre adaptação cultural e social</li>
                    <li>Estratégias financeiras e tributárias</li>
                    <li>Materiais em PDF, vídeo-aulas e webinars</li>
                    <li>Comunidade de apoio entre participantes</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">2.3 Natureza Educacional</h3>
                <p className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <strong>Importante:</strong> O Ponte Américas oferece conteúdo educacional e informativo. Não somos escritório de advocacia, despachante ou agência de imigração. Para questões legais específicas, recomendamos consultar profissionais qualificados.
                </p>
            </section>

            <section id="cadastro">
                <h2 className="text-2xl font-semibold mb-4">3. Cadastro e Inscrição</h2>

                <h3 className="text-xl font-medium mb-3">3.1 Requisitos para Inscrição</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Ter pelo menos 18 anos de idade</li>
                    <li>Fornecer informações verdadeiras e precisas</li>
                    <li>Manter dados atualizados em nosso sistema</li>
                    <li>Utilizar email válido para comunicações</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">3.2 Responsabilidades do Participante</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Manter confidencialidade de dados de acesso</li>
                    <li>Notificar imediatamente sobre uso não autorizado</li>
                    <li>Não compartilhar credenciais com terceiros</li>
                    <li>Participar de forma respeitosa e construtiva</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">3.3 Modalidades de Participação</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Acesso Gratuito:</strong> Conteúdos introdutórios e materiais básicos</li>
                    <li><strong>Programa Completo:</strong> Acesso total aos cursos e materiais exclusivos</li>
                    <li><strong>Mentoria Personalizada:</strong> Orientação individual especializada</li>
                </ul>
            </section>

            <section id="conteudo">
                <h2 className="text-2xl font-semibold mb-4">4. Conteúdo Educacional</h2>

                <h3 className="text-xl font-medium mb-3">4.1 Acesso aos Materiais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Conteúdo disponível 24/7 através da plataforma online</li>
                    <li>Materiais em diversos formatos: vídeo, áudio, PDF, webinars</li>
                    <li>Possibilidade de download para estudo offline (quando permitido)</li>
                    <li>Atualizações regulares do conteúdo conforme mudanças legislativas</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">4.2 Qualidade e Veracidade</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Informações baseadas em fontes oficiais e confiáveis</li>
                    <li>Conteúdo revisado por especialistas em imigração</li>
                    <li>Atualizações conforme mudanças na legislação americana</li>
                    <li>Compromisso com informações precisas e atuais</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">4.3 Limitações do Conteúdo</h3>
                <p className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <strong>Aviso:</strong> O conteúdo educacional não substitui aconselhamento jurídico profissional. Cada caso de imigração é único e pode requerer orientação específica de advogados especializados.
                </p>
            </section>

            <section id="uso-permitido">
                <h2 className="text-2xl font-semibold mb-4">5. Uso Permitido</h2>

                <h3 className="text-xl font-medium mb-3">5.1 Usos Autorizados</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Acesso pessoal aos materiais educacionais</li>
                    <li>Download de conteúdo permitido para estudo pessoal</li>
                    <li>Participação em fóruns e comunidades do programa</li>
                    <li>Compartilhamento de experiências pessoais</li>
                    <li>Uso das informações para seu processo de imigração</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">5.2 Usos Proibidos</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Reprodução, distribuição ou venda não autorizada do conteúdo</li>
                    <li>Compartilhamento de credenciais de acesso</li>
                    <li>Uso comercial sem autorização expressa</li>
                    <li>Upload de conteúdo ofensivo, discriminatório ou ilegal</li>
                    <li>Tentativas de hackear ou comprometer a plataforma</li>
                    <li>Disseminação de informações falsas ou enganosas</li>
                    <li>Violação de direitos autorais de terceiros</li>
                </ul>
            </section>

            <section id="propriedade">
                <h2 className="text-2xl font-semibold mb-4">6. Propriedade Intelectual</h2>

                <h3 className="text-xl font-medium mb-3">6.1 Direitos do Ponte Américas</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Todo conteúdo educacional é protegido por direitos autorais</li>
                    <li>Marca "Ponte Américas" e elementos visuais são registrados</li>
                    <li>Metodologia e estrutura curricular são propriedade intelectual</li>
                    <li>Plataforma tecnológica e seus recursos</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">6.2 Licença de Uso</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Concedemos licença pessoal, intransferível e não comercial</li>
                    <li>Uso limitado ao período de sua participação no programa</li>
                    <li>Direito de acessar e estudar o conteúdo disponibilizado</li>
                    <li>Proibida redistribuição ou modificação do material</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">6.3 Conteúdo do Usuário</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Você mantém direitos sobre conteúdo original que criar</li>
                    <li>Ao compartilhar, concede licença para uso na plataforma</li>
                    <li>Responsabilidade pela originalidade e legalidade do que publica</li>
                </ul>
            </section>

            <section id="responsabilidades">
                <h2 className="text-2xl font-semibold mb-4">7. Responsabilidades</h2>

                <h3 className="text-xl font-medium mb-3">7.1 Nossas Responsabilidades</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Manter a plataforma funcional e acessível</li>
                    <li>Fornecer conteúdo educacional de qualidade</li>
                    <li>Atualizar informações conforme mudanças legislativas</li>
                    <li>Proteger dados pessoais conforme LGPD</li>
                    <li>Oferecer suporte técnico durante horário comercial</li>
                    <li>Manter ambiente respeitoso na comunidade</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">7.2 Suas Responsabilidades</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Usar informações de forma responsável e ética</li>
                    <li>Verificar aplicabilidade das informações ao seu caso</li>
                    <li>Buscar orientação profissional quando necessário</li>
                    <li>Manter comportamento respeitoso na comunidade</li>
                    <li>Não compartilhar informações confidenciais de terceiros</li>
                    <li>Seguir todas as leis aplicáveis</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">7.3 Isenções Importantes</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Não garantimos sucesso em processos de imigração</li>
                    <li>Não somos responsáveis por decisões baseadas no conteúdo</li>
                    <li>Não assumimos responsabilidade por erros de interpretação</li>
                    <li>Não garantimos resultados específicos ou prazos</li>
                </ul>
            </section>

            <section id="limitacao">
                <h2 className="text-2xl font-semibold mb-4">8. Limitação de Responsabilidade</h2>
                <p className="mb-4 leading-relaxed">
                    O Ponte Américas oferece conteúdo educacional com fins informativos. Em nenhuma circunstância seremos responsáveis por:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Danos diretos ou indiretos decorrentes do uso das informações</li>
                    <li>Perdas financeiras relacionadas a processos de imigração</li>
                    <li>Decisões tomadas com base no conteúdo educacional</li>
                    <li>Resultados negativos em processos governamentais</li>
                    <li>Perda de oportunidades profissionais ou pessoais</li>
                </ul>
                <p className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                    <strong>Importante:</strong> Nossa responsabilidade máxima está limitada ao valor pago pelo programa no período de 12 meses anteriores ao evento.
                </p>
            </section>

            <section id="privacidade">
                <h2 className="text-2xl font-semibold mb-4">9. Privacidade e Proteção de Dados</h2>

                <h3 className="text-xl font-medium mb-3">9.1 Compromisso com a Privacidade</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Operamos em conformidade com a LGPD e GDPR</li>
                    <li>Coletamos apenas dados necessários para o serviço</li>
                    <li>Não vendemos ou compartilhamos dados pessoais</li>
                    <li>Mantemos informações seguras e criptografadas</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">9.2 Uso de Dados</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Personalização da experiência educacional</li>
                    <li>Comunicação sobre atualizações do programa</li>
                    <li>Melhoria dos serviços oferecidos</li>
                    <li>Cumprimento de obrigações legais</li>
                </ul>
            </section>

            <section id="modificacoes">
                <h2 className="text-2xl font-semibold mb-4">10. Modificações dos Termos</h2>
                <p className="mb-4 leading-relaxed">
                    Reservamos o direito de modificar estes Termos de Uso a qualquer momento. As alterações serão:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Comunicadas via email com 30 dias de antecedência</li>
                    <li>Publicadas na plataforma com destaque</li>
                    <li>Efetivas após o período de notificação</li>
                </ul>
                <p className="mb-6 leading-relaxed">
                    O uso continuado após as modificações constitui aceitação dos novos termos.
                </p>
            </section>

            <section id="rescisao">
                <h2 className="text-2xl font-semibold mb-4">11. Cancelamento e Rescisão</h2>

                <h3 className="text-xl font-medium mb-3">11.1 Cancelamento pelo Participante</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Cancelamento a qualquer momento através da plataforma</li>
                    <li>Acesso mantido até o final do período pago</li>
                    <li>Dados mantidos conforme Política de Privacidade</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">11.2 Suspensão pelo Ponte Américas</h3>
                <p className="mb-3">Podemos suspender o acesso em casos de:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Violação destes Termos de Uso</li>
                    <li>Comportamento inadequado na comunidade</li>
                    <li>Uso indevido da plataforma</li>
                    <li>Atividades ilegais ou fraudulentas</li>
                </ul>
            </section>

            <section id="disponibilidade">
                <h2 className="text-2xl font-semibold mb-4">12. Disponibilidade do Serviço</h2>

                <h3 className="text-xl font-medium mb-3">12.1 Compromisso de Disponibilidade</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Esforços para manter plataforma disponível 24/7</li>
                    <li>Manutenções programadas comunicadas antecipadamente</li>
                    <li>Suporte técnico em horário comercial brasileiro</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">12.2 Interrupções</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Manutenções necessárias para melhorias</li>
                    <li>Falhas técnicas ou problemas de infraestrutura</li>
                    <li>Eventos de força maior</li>
                </ul>
            </section>

            <section id="comunicacoes">
                <h2 className="text-2xl font-semibold mb-4">13. Comunicações</h2>

                <h3 className="text-xl font-medium mb-3">13.1 Canais de Comunicação</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: contato@ponteamericas.com</li>
                    <li>WhatsApp: +1 321 429-6742</li>
                    <li>Formulários na plataforma</li>
                    <li>Notificações internas do sistema</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">13.2 Tipos de Comunicação</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Atualizações sobre o programa</li>
                    <li>Novos conteúdos disponíveis</li>
                    <li>Mudanças na legislação americana</li>
                    <li>Informações técnicas e de suporte</li>
                </ul>
            </section>

            <section id="disposicoes">
                <h2 className="text-2xl font-semibold mb-4">14. Disposições Gerais</h2>

                <h3 className="text-xl font-medium mb-3">14.1 Lei Aplicável</h3>
                <p className="mb-4 leading-relaxed">
                    Estes Termos são regidos pelas leis da República Federativa do Brasil, especificamente pela legislação brasileira sobre educação, proteção de dados e direitos do consumidor.
                </p>

                <h3 className="text-xl font-medium mb-3">14.2 Foro Competente</h3>
                <p className="mb-4 leading-relaxed">
                    Fica eleito o foro brasileiro competente para dirimir questões relacionadas a estes termos, conforme domicílio do contratante ou sede da prestação de serviços.
                </p>

                <h3 className="text-xl font-medium mb-3">14.3 Acordo Integral</h3>
                <p className="mb-4 leading-relaxed">
                    Estes Termos, juntamente com a Política de Privacidade, constituem o acordo completo entre você e o Ponte Américas.
                </p>

                <h3 className="text-xl font-medium mb-3">14.4 Independência das Cláusulas</h3>
                <p className="mb-4 leading-relaxed">
                    Se qualquer disposição for considerada inválida, as demais permanecerão em pleno vigor e efeito.
                </p>

                <h3 className="text-xl font-medium mb-3">14.5 Idioma</h3>
                <p className="mb-6 leading-relaxed">
                    Estes Termos são redigidos em português brasileiro. Em caso de tradução, a versão em português prevalecerá.
                </p>
            </section>

            <section id="contato">
                <h2 className="text-2xl font-semibold mb-4">15. Suporte e Contato</h2>

                <h3 className="text-xl font-medium mb-3">Suporte Educacional</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: suporte@ponteamericas.com</li>
                    <li>WhatsApp: +1 321 429-6742</li>
                    <li>Horário: Segunda a Sexta, 9h às 18h (Brasília)</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Questões Gerais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: contato@ponteamericas.com</li>
                    <li>Formulário de contato na plataforma</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Questões sobre Privacidade</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Email: privacidade@ponteamericas.com</li>
                    <li>Encarregado de Proteção de Dados disponível</li>
                </ul>
            </section>

            <section id="vigencia">
                <h2 className="text-2xl font-semibold mb-4">16. Vigência</h2>
                <p className="mb-4 leading-relaxed">
                    Ao acessar nossa plataforma, criar uma conta ou utilizar nossos serviços educacionais, você confirma que:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Leu e compreendeu integralmente estes Termos de Uso</li>
                    <li>Possui capacidade legal para contratar</li>
                    <li>Concorda com todas as disposições estabelecidas</li>
                    <li>Compromete-se a utilizar o programa de forma responsável</li>
                </ul>
                <p className="mb-6 leading-relaxed">
                    <strong>Data de Última Atualização:</strong> 21 de outubro de 2025
                </p>
            </section>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Sobre o Programa</h3>
                <p className="mb-2"><strong>Ponte Américas</strong></p>
                <p className="mb-2">Programa Educacional sobre os Estados Unidos</p>
                <p className="mb-4">Baseado nos Estados Unidos</p>
                <div className="space-y-2">
                    <p><strong>Contato:</strong> contato@ponteamericas.com</p>
                    <p><strong>WhatsApp:</strong> +1 321 429-6742</p>
                    <p><strong>Suporte:</strong> Segunda a Sexta, 9h às 18h (Brasília)</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                    Estes Termos de Uso foram elaborados em conformidade com o Código Civil Brasileiro, Código de Defesa do Consumidor, Marco Civil da Internet, LGPD e demais legislações aplicáveis à educação e proteção de dados.
                </p>
            </div>
        </LegalLayout>
    );
}