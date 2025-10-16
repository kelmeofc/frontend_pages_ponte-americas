import LegalLayout from "@/common/layouts/legal-layout";
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
                    <a href="#descricao" className="text-primary hover:underline">2. Descrição do Serviço</a>
                    <a href="#cadastro" className="text-primary hover:underline">3. Cadastro e Conta</a>
                    <a href="#assinatura" className="text-primary hover:underline">4. Assinatura e Pagamento</a>
                    <a href="#uso-permitido" className="text-primary hover:underline">5. Uso Permitido</a>
                    <a href="#propriedade" className="text-primary hover:underline">6. Propriedade Intelectual</a>
                    <a href="#ia" className="text-primary hover:underline">7. Inteligência Artificial</a>
                    <a href="#responsabilidades" className="text-primary hover:underline">8. Responsabilidades</a>
                    <a href="#limitação" className="text-primary hover:underline">9. Limitação de Responsabilidade</a>
                    <a href="#indenizacao" className="text-primary hover:underline">10. Indenização</a>
                    <a href="#privacidade" className="text-primary hover:underline">11. Privacidade e Proteção de Dados</a>
                    <a href="#modificacoes" className="text-primary hover:underline">12. Modificações do Serviço</a>
                    <a href="#rescisao" className="text-primary hover:underline">13. Rescisão</a>
                    <a href="#disponibilidade" className="text-primary hover:underline">14. Disponibilidade do Serviço</a>
                    <a href="#comunicacoes" className="text-primary hover:underline">15. Comunicações</a>
                    <a href="#disposicoes" className="text-primary hover:underline">16. Disposições Gerais</a>
                    <a href="#definicoes" className="text-primary hover:underline">17. Definições</a>
                    <a href="#contato" className="text-primary hover:underline">18. Suporte e Contato</a>
                    <a href="#beta" className="text-primary hover:underline">19. Programa Beta e Funcionalidades Experimentais</a>
                    <a href="#vigencia" className="text-primary hover:underline">20. Aceitação e Vigência</a>
                </nav>
            </div>

            <section id="aceitacao">
                <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
                <p className="mb-4 leading-relaxed">
                    Ao acessar e usar o <strong>Pandami</strong> ("Plataforma", "Serviço" ou "App"), operado pela <strong>PandaHan</strong> ("nós", "nosso" ou "Empresa"), você concorda em cumprir e estar vinculado aos seguintes Termos de Uso.
                </p>
                <p className="mb-6 leading-relaxed">
                    Se você não concordar com qualquer parte destes termos, não deve usar nossa Plataforma.
                </p>
            </section>

            <section id="descricao">
                <h2 className="text-2xl font-semibold mb-4">2. Descrição do Serviço</h2>

                <h3 className="text-xl font-medium mb-3">2.1 O que oferecemos</h3>
                <p className="mb-3">Nossa Plataforma oferece:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Sistema de gestão de clientes para barbearias</li>
                    <li>Análise de visagismo assistida por Inteligência Artificial</li>
                    <li>Geração de simulações de cortes através de manipulação de imagem com IA</li>
                    <li>Armazenamento de histórico de atendimentos</li>
                    <li>Relatórios personalizados de cortes</li>
                    <li>Comunicação facilitada entre barbeiros e clientes</li>
                </ul>
                <p className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <strong>Nota:</strong> O Serviço encontra-se em fase Beta/MVP, sujeito a melhorias e ajustes contínuos.
                </p>

                <h3 className="text-xl font-medium mb-3">2.2 Modalidades de Uso</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Formulário de Visagismo Completo:</strong> Análise detalhada com múltiplas perguntas</li>
                    <li><strong>Modo Simplificado:</strong> Descrição direta do corte desejado sem formulário</li>
                </ul>
            </section>

            <section id="cadastro">
                <h2 className="text-2xl font-semibold mb-4">3. Cadastro e Conta</h2>

                <h3 className="text-xl font-medium mb-3">3.1 Requisitos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Você deve ter pelo menos 18 anos ou ser maior de idade em sua jurisdição</li>
                    <li>Fornecer informações verdadeiras, precisas e completas</li>
                    <li>Manter a segurança de sua senha e conta</li>
                    <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">3.2 Tipos de Usuário</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Estabelecimento:</strong> Barbearia que contrata o serviço</li>
                    <li><strong>Profissional:</strong> Barbeiro autorizado pelo estabelecimento</li>
                    <li><strong>Cliente Final:</strong> Pessoa que recebe os serviços da barbearia</li>
                </ul>
            </section>

            <section id="assinatura">
                <h2 className="text-2xl font-semibold mb-4">4. Assinatura e Pagamento</h2>

                <h3 className="text-xl font-medium mb-3">4.1 Modelo de Assinatura</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>O Serviço funciona mediante assinatura mensal/anual</li>
                    <li>Planos disponíveis: Básico/Profissional/Premium</li>
                    <li>Valores e funcionalidades conforme tabela vigente no site</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">4.2 Cobrança</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Pagamento antecipado via cartão de crédito, boleto ou PIX</li>
                    <li>Renovação automática ao final do período</li>
                    <li>Reajuste anual conforme IPCA ou índice acordado</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">4.3 Cancelamento</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Cancelamento a qualquer momento</li>
                    <li>Acesso mantido até o final do período pago</li>
                    <li>Sem multas ou taxas de cancelamento</li>
                    <li>Dados mantidos por 60 dias após cancelamento para reativação</li>
                </ul>
            </section>

            <section id="uso-permitido">
                <h2 className="text-2xl font-semibold mb-4">5. Uso Permitido</h2>

                <h3 className="text-xl font-medium mb-3">5.1 Você pode:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Acessar e usar o Serviço para fins comerciais legítimos</li>
                    <li>Armazenar dados de clientes com consentimento</li>
                    <li>Gerar relatórios e simulações para uso profissional</li>
                    <li>Compartilhar resultados com clientes mediante autorização</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">5.2 Você NÃO pode:</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Usar o Serviço para fins ilegais ou não autorizados</li>
                    <li>Violar direitos de privacidade ou propriedade intelectual</li>
                    <li>Transmitir vírus ou código malicioso</li>
                    <li>Fazer engenharia reversa ou copiar o Serviço</li>
                    <li>Revender ou sublicenciar o acesso</li>
                    <li>Usar para criar produto concorrente</li>
                    <li>Manipular imagens para fins não relacionados a cortes de cabelo</li>
                </ul>
            </section>

            <section id="propriedade">
                <h2 className="text-2xl font-semibold mb-4">6. Propriedade Intelectual</h2>

                <h3 className="text-xl font-medium mb-3">6.1 Nossa Propriedade</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Software, algoritmos, interface e marca são propriedade da Empresa</li>
                    <li>Modelos de IA e tecnologia de processamento são proprietários</li>
                    <li>Conteúdo gerado pelo sistema permanece licenciado para uso</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">6.2 Sua Propriedade</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Você mantém direitos sobre dados inseridos</li>
                    <li>Fotografias dos clientes permanecem propriedade dos mesmos</li>
                    <li>Notas e observações criadas por você</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">6.3 Licença de Uso</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Concedemos licença limitada, não exclusiva e intransferível</li>
                    <li>Você nos concede licença para processar seus dados conforme necessário</li>
                    <li>Direito de usar dados anonimizados para melhorar o serviço</li>
                </ul>
            </section>

            <section id="ia">
                <h2 className="text-2xl font-semibold mb-4">7. Inteligência Artificial</h2>

                <h3 className="text-xl font-medium mb-3">7.1 Funcionamento</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Utilizamos IA para análise facial e recomendações</li>
                    <li>Processamento via Azure e tecnologias proprietárias</li>
                    <li>Resultados são sugestões, não garantias</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">7.2 Limitações</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IA pode gerar resultados imprecisos</li>
                    <li>Simulações são aproximações visuais</li>
                    <li>Decisão final sempre do profissional e cliente</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">7.3 Melhoria Contínua</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Dados anonimizados podem treinar modelos</li>
                    <li>Feedback usado para aprimoramento</li>
                    <li>Atualizações periódicas dos algoritmos</li>
                </ul>
            </section>

            <section id="responsabilidades">
                <h2 className="text-2xl font-semibold mb-4">8. Responsabilidades</h2>

                <h3 className="text-xl font-medium mb-3">8.1 Nossas Responsabilidades</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Envidar melhores esforços para manter a Plataforma operacional</li>
                    <li>Proteger dados conforme padrões de segurança</li>
                    <li>Fornecer suporte técnico em horário comercial</li>
                    <li>Atualizar e melhorar o serviço regularmente</li>
                    <li>Notificar sobre manutenções programadas com antecedência</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">8.2 Suas Responsabilidades</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Obter consentimento dos clientes para fotos e dados</li>
                    <li>Usar o serviço de forma ética e legal</li>
                    <li>Manter confidencialidade de dados de terceiros</li>
                    <li>Garantir veracidade das informações inseridas</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">8.3 Isenção de Responsabilidade</h3>
                <p className="mb-3">NÃO nos responsabilizamos por:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Resultados estéticos dos cortes realizados</li>
                    <li>Satisfação dos clientes finais</li>
                    <li>Perdas comerciais indiretas</li>
                    <li>Interpretação incorreta das sugestões de IA</li>
                    <li>Uso indevido das ferramentas</li>
                    <li>Interrupções decorrentes da fase Beta/MVP</li>
                    <li>Bugs ou erros durante o desenvolvimento</li>
                </ul>
            </section>

            <section id="limitação">
                <h2 className="text-2xl font-semibold mb-4">9. Limitação de Responsabilidade</h2>
                <p className="mb-4 leading-relaxed">
                    Em nenhuma circunstância a Empresa será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis.
                </p>
                <p className="mb-6 leading-relaxed">
                    Nossa responsabilidade total não excederá o valor pago por você nos últimos 12 meses.
                </p>
            </section>

            <section id="indenizacao">
                <h2 className="text-2xl font-semibold mb-4">10. Indenização</h2>
                <p className="mb-3">Você concorda em defender, indenizar e isentar a Empresa de qualquer reclamação, dano, obrigação, perda, responsabilidade, custo ou dívida, e despesas decorrentes de:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Seu uso do Serviço</li>
                    <li>Violação destes Termos</li>
                    <li>Violação de direitos de terceiros</li>
                    <li>Uso inadequado de dados de clientes</li>
                </ul>
            </section>

            <section id="privacidade">
                <h2 className="text-2xl font-semibold mb-4">11. Privacidade e Proteção de Dados</h2>

                <h3 className="text-xl font-medium mb-3">11.1 Conformidade Legal</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Operamos conforme LGPD (Brasil) e GDPR (UE)</li>
                    <li>Política de Privacidade integra estes Termos</li>
                    <li>Processamento mediante bases legais adequadas</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">11.2 Segurança</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Criptografia de ponta a ponta</li>
                    <li>Servidores seguros na nuvem</li>
                    <li>Auditorias regulares de segurança</li>
                </ul>
            </section>

            <section id="modificacoes">
                <h2 className="text-2xl font-semibold mb-4">12. Modificações do Serviço</h2>
                <p className="mb-3">Reservamos o direito de:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Modificar ou descontinuar funcionalidades</li>
                    <li>Alterar preços com 30 dias de aviso</li>
                    <li>Atualizar requisitos técnicos</li>
                    <li>Implementar novos recursos</li>
                </ul>
            </section>

            <section id="rescisao">
                <h2 className="text-2xl font-semibold mb-4">13. Rescisão</h2>

                <h3 className="text-xl font-medium mb-3">13.1 Por Você</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Cancelamento a qualquer momento</li>
                    <li>Solicitação via painel ou email</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">13.2 Por Nós</h3>
                <p className="mb-3">Podemos suspender ou encerrar seu acesso por:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Violação dos Termos</li>
                    <li>Atividade fraudulenta</li>
                    <li>Inadimplência</li>
                    <li>Ordem judicial</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">13.3 Efeitos da Rescisão</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Acesso encerrado imediatamente</li>
                    <li>Dados disponíveis para download por 30 dias</li>
                    <li>Sem direito a reembolso proporcional</li>
                </ul>
            </section>

            <section id="disponibilidade">
                <h2 className="text-2xl font-semibold mb-4">14. Disponibilidade do Serviço</h2>

                <h3 className="text-xl font-medium mb-3">14.1 Nível de Serviço</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>A Empresa envidará melhores esforços comercialmente razoáveis para manter o Serviço disponível</li>
                    <li>Manutenções programadas: notificadas com 48h de antecedência</li>
                    <li>Suporte técnico: dias úteis, horário comercial (9h às 18h BRT)</li>
                    <li>Fase Beta/MVP: Sem garantias específicas de disponibilidade</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">14.2 Força Maior</h3>
                <p className="mb-3">Não somos responsáveis por indisponibilidade causada por:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Desastres naturais</li>
                    <li>Atos governamentais</li>
                    <li>Falhas de terceiros (internet, energia)</li>
                    <li>Ataques cibernéticos</li>
                </ul>
            </section>

            <section id="comunicacoes">
                <h2 className="text-2xl font-semibold mb-4">15. Comunicações</h2>

                <h3 className="text-xl font-medium mb-3">15.1 Notificações para Você</h3>
                <p className="mb-4">Via email cadastrado ou notificação no App</p>

                <h3 className="text-xl font-medium mb-3">15.2 Notificações para Nós</h3>
                <p className="mb-6">Email: <a href="mailto:juridico@pandami.com.br" className="text-primary hover:underline">juridico@pandami.com.br</a><br />
                Endereço: Florianópolis, Santa Catarina, Brasil</p>
            </section>

            <section id="disposicoes">
                <h2 className="text-2xl font-semibold mb-4">16. Disposições Gerais</h2>

                <h3 className="text-xl font-medium mb-3">16.1 Lei Aplicável</h3>
                <p className="mb-4">Estes Termos são regidos pelas leis do Brasil</p>

                <h3 className="text-xl font-medium mb-3">16.2 Foro</h3>
                <p className="mb-4">Fica eleito o foro da comarca de Florianópolis, Santa Catarina, para dirimir questões</p>

                <h3 className="text-xl font-medium mb-3">16.3 Acordo Integral</h3>
                <p className="mb-4">Estes Termos constituem o acordo completo entre as partes</p>

                <h3 className="text-xl font-medium mb-3">16.4 Cessão</h3>
                <p className="mb-4">Você não pode ceder ou transferir estes Termos</p>

                <h3 className="text-xl font-medium mb-3">16.5 Salvaguarda</h3>
                <p className="mb-4">Se qualquer disposição for inválida, as demais permanecem em vigor</p>

                <h3 className="text-xl font-medium mb-3">16.6 Renúncia</h3>
                <p className="mb-6">Nenhuma renúncia será válida sem acordo escrito</p>
            </section>

            <section id="definicoes">
                <h2 className="text-2xl font-semibold mb-4">17. Definições</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>"IA"</strong>: Inteligência Artificial</li>
                    <li><strong>"Visagismo"</strong>: Técnica de análise facial para harmonização estética</li>
                    <li><strong>"Dados Biométricos"</strong>: Características físicas únicas (face)</li>
                    <li><strong>"Plataforma"</strong>: Conjunto de software e serviços oferecidos</li>
                    <li><strong>"Usuário"</strong>: Qualquer pessoa que acessa o Serviço</li>
                </ul>
            </section>

            <section id="contato">
                <h2 className="text-2xl font-semibold mb-4">18. Suporte e Contato</h2>

                <h3 className="text-xl font-medium mb-3">Suporte Técnico</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: <a href="mailto:suporte@pandami.com.br" className="text-primary hover:underline">suporte@pandami.com.br</a></li>
                    <li>Chat no App: Horário comercial</li>
                    <li>Base de conhecimento: help.pandami.com</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Questões Comerciais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Email: <a href="mailto:comercial@pandami.com.br" className="text-primary hover:underline">comercial@pandami.com.br</a></li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Questões Jurídicas</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Email: <a href="mailto:juridico@pandami.com.br" className="text-primary hover:underline">juridico@pandami.com.br</a></li>
                </ul>
            </section>

            <section id="beta">
                <h2 className="text-2xl font-semibold mb-4">19. Programa Beta e Funcionalidades Experimentais</h2>

                <h3 className="text-xl font-medium mb-3">19.1 Fase MVP/Beta</h3>
                <p className="mb-3">O Serviço está atualmente em fase MVP (Produto Mínimo Viável):</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Funcionalidades em desenvolvimento e aperfeiçoamento contínuo</li>
                    <li>Possíveis interrupções para melhorias</li>
                    <li>Feedback dos usuários é essencial para evolução</li>
                    <li>Sem garantias específicas de performance ou disponibilidade</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">19.2 Funcionalidades Experimentais</h3>
                <p className="mb-3">Podemos oferecer acesso a funcionalidades em teste:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Uso por conta e risco</li>
                    <li>Sem garantias de funcionamento</li>
                    <li>Feedback incentivado</li>
                    <li>Podem ser modificadas ou descontinuadas</li>
                </ul>
            </section>

            <section id="vigencia">
                <h2 className="text-2xl font-semibold mb-4">20. Aceitação e Vigência</h2>
                <p className="mb-3">Ao clicar em "Aceito", criar uma conta ou usar o Serviço, você confirma que:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Leu e compreendeu estes Termos</li>
                    <li>Tem capacidade legal para contratar</li>
                    <li>Concorda com todas as disposições</li>
                </ul>
                <p className="mb-6"><strong>Data de Vigência:</strong> 19 de setembro de 2024</p>
            </section>

            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Informações da Empresa</h3>
                <p className="mb-2"><strong>PandaHan</strong></p>
                <p className="mb-2">CNPJ: 60.348.853/0001-40</p>
                <p className="mb-2">Endereço: Florianópolis, Santa Catarina, Brasil</p>
                <p className="text-sm text-muted-foreground">
                    Estes Termos de Uso foram elaborados em conformidade com o Código Civil Brasileiro, Código de Defesa do Consumidor, Marco Civil da Internet, LGPD e demais legislações aplicáveis.
                </p>
            </div>
        </LegalLayout>
    );
}