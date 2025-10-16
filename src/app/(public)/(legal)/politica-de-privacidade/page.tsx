import LegalLayout from "@/common/layouts/legal-layout"
import { useLegalMetadata } from "@/common/hooks/use-legal-metadata";
import { legalPagesConfig } from "@/common/config/legal-pages";

export const metadata = useLegalMetadata(legalPagesConfig["politica-de-privacidade"].metadata);

export default function Page() {
    return (
        <LegalLayout
            config={legalPagesConfig["politica-de-privacidade"]}
            currentPath="/politica-de-privacidade"
        >
            {/* Índice de navegação */}
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Índice</h2>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <a href="#introducao" className="text-primary hover:underline">1. Introdução</a>
                    <a href="#definicoes-importantes" className="text-primary hover:underline">2. Definições Importantes</a>
                    <a href="#dados-que-coletamos" className="text-primary hover:underline">3. Dados que Coletamos</a>
                    <a href="#bases-legais-e-finalidades" className="text-primary hover:underline">4. Bases Legais e Finalidades</a>
                    <a href="#como-usamos-os-dados" className="text-primary hover:underline">5. Como Usamos os Dados</a>
                    <a href="#compartilhamento-de-dados" className="text-primary hover:underline">6. Compartilhamento de Dados</a>
                    <a href="#seguranca-dos-dados" className="text-primary hover:underline">7. Segurança dos Dados</a>
                    <a href="#retencao-e-exclusao-de-dados" className="text-primary hover:underline">8. Retenção e Exclusão de Dados</a>
                    <a href="#direitos-dos-titulares" className="text-primary hover:underline">9. Direitos dos Titulares</a>
                    <a href="#uso-de-inteligencia-artificial" className="text-primary hover:underline">10. Uso de Inteligência Artificial</a>
                    <a href="#dados-de-menores" className="text-primary hover:underline">11. Dados de Menores</a>
                    <a href="#cookies-e-tecnologias" className="text-primary hover:underline">12. Cookies e Tecnologias</a>
                    <a href="#comunicacoes" className="text-primary hover:underline">13. Comunicações</a>
                    <a href="#incidentes-de-seguranca" className="text-primary hover:underline">14. Incidentes de Segurança</a>
                    <a href="#encarregado-de-protecao-de-dados" className="text-primary hover:underline">15. Encarregado de Proteção de Dados</a>
                    <a href="#autoridades-de-controle" className="text-primary hover:underline">16. Autoridades de Controle</a>
                    <a href="#alteracoes-nesta-politica" className="text-primary hover:underline">17. Alterações nesta Política</a>
                    <a href="#lei-aplicavel-e-foro" className="text-primary hover:underline">18. Lei Aplicável e Foro</a>
                    <a href="#glossario-tecnico" className="text-primary hover:underline">19. Glossário Técnico</a>
                    <a href="#contato" className="text-primary hover:underline">20. Contato</a>
                </nav>
            </div>

            <section id="introducao">
                <h2 className="text-2xl font-bold mb-4">1. INTRODUÇÃO</h2>
                <p className="mb-4">A <strong>PandaHan</strong> (CNPJ: 60.348.853/0001-40), com sede em Florianópolis, Santa Catarina ("nós", "nosso" ou "Empresa"), opera o aplicativo web <strong>Pandami</strong> (o "Serviço"), uma plataforma inovadora de gestão e visagismo para barbearias que utiliza inteligência artificial para personalização de cortes de cabelo.</p>
                <p className="mb-4">Esta Política de Privacidade informa sobre nossas práticas de coleta, uso, armazenamento e proteção de dados pessoais, em conformidade com:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) do Brasil</li>
                    <li>Regulamento Geral sobre a Proteção de Dados (GDPR - UE 2016/679)</li>
                    <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
                </ul>
                <p className="mb-4"><strong>IMPORTANTE:</strong> Nosso Serviço está em fase Beta/MVP, com melhorias contínuas sendo implementadas, incluindo recursos de segurança e privacidade.</p>
            </section>

            <section id="definicoes-importantes">
                <h2 className="text-2xl font-bold mb-4">2. DEFINIÇÕES IMPORTANTES</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>"Visagismo"</strong>: Técnica de análise facial para harmonização estética de cortes</li>
                    <li><strong>"Dados Biométricos"</strong>: Fotografias faciais usadas para análise e simulação</li>
                    <li><strong>"IA"</strong>: Inteligência Artificial que processa imagens e gera recomendações</li>
                    <li><strong>"Manipulação de Imagem"</strong>: Tecnologia Flux Azure para simular cortes</li>
                    <li><strong>"Titular"</strong>: Pessoa natural a quem se referem os dados (cliente final)</li>
                    <li><strong>"Controlador"</strong>: PandaHan e/ou barbearia que decide sobre o tratamento</li>
                    <li><strong>"Operador"</strong>: Barbeiro que realiza o tratamento dos dados</li>
                </ul>
            </section>

            <section id="dados-que-coletamos">
                <h2 className="text-2xl font-bold mb-4">3. DADOS QUE COLETAMOS</h2>

                <h3 className="text-xl font-semibold mb-3">3.1 Dados dos Estabelecimentos (Barbearias)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Razão social e nome fantasia</li>
                    <li>CNPJ/CPF do responsável</li>
                    <li>Endereço comercial completo</li>
                    <li>Telefone e email corporativo</li>
                    <li>Dados bancários para pagamento da assinatura</li>
                    <li>Plano contratado e histórico de pagamentos</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.2 Dados dos Profissionais (Barbeiros)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nome completo</li>
                    <li>CPF (quando aplicável)</li>
                    <li>Email e telefone celular</li>
                    <li>Credenciais de acesso (senha criptografada com hash)</li>
                    <li>Logs de acesso e atividades</li>
                    <li>Histórico de atendimentos realizados</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.3 Dados dos Clientes Finais</h3>

                <h4 className="text-lg font-medium mb-2">Dados Básicos (Obrigatórios)</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nome completo</li>
                    <li>Telefone celular (WhatsApp)</li>
                    <li>Email (opcional)</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Dados de Atendimento</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Notas Personalizadas</strong>: Preferências pessoais (ex: "gosta de futebol", "cliente sério")</li>
                    <li><strong>Histórico de Visitas</strong>: Datas, tipos de corte (1º, 2º, 3º corte, etc.)</li>
                    <li><strong>Evolução do Corte</strong>: Anotações sobre mudanças e adaptações</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Dados de Visagismo (Opção 1 - Formulário Completo)</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Respostas ao questionário de visagismo (múltipla escolha)</li>
                    <li>Formato do rosto identificado</li>
                    <li>Tipo de cabelo e características</li>
                    <li>Preferências estéticas</li>
                    <li>Estilo de vida e profissão</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Dados de Atendimento Simplificado (Opção 2 - Sem Visagismo)</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Descrição do corte desejado (texto livre do barbeiro)</li>
                    <li>Preferências diretas do cliente</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Dados Biométricos Sensíveis</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Fotografias Faciais</strong>: Imagem original do cliente</li>
                    <li><strong>Imagens Processadas</strong>: Simulações geradas por IA</li>
                    <li><strong>Metadados</strong>: Data, hora, dispositivo usado para captura</li>
                </ul>
            </section>

            <section id="bases-legais-e-finalidades">
                <h2 className="text-2xl font-bold mb-4">4. BASES LEGAIS E FINALIDADES</h2>

                <h3 className="text-xl font-semibold mb-3">4.1 Consentimento (Art. 7º, I e Art. 11º, I da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Fotografias faciais e dados biométricos</p>
                <p className="mb-2"><strong>Finalidade:</strong> Análise de visagismo e geração de simulações</p>
                <p className="mb-4"><strong>Como obtemos:</strong> Termo de consentimento específico no primeiro atendimento</p>

                <h3 className="text-xl font-semibold mb-3">4.2 Execução de Contrato (Art. 7º, V da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Informações de contato, histórico de atendimentos</p>
                <p className="mb-4"><strong>Finalidade:</strong> Prestação do serviço de gestão e agendamento</p>

                <h3 className="text-xl font-semibold mb-3">4.3 Legítimo Interesse (Art. 7º, IX da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Notas de preferências, evolução do corte</p>
                <p className="mb-4"><strong>Finalidade:</strong> Melhorar qualidade do atendimento e fidelização</p>

                <h3 className="text-xl font-semibold mb-3">4.4 Cumprimento de Obrigação Legal (Art. 7º, II da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Dados fiscais e financeiros</p>
                <p className="mb-6"><strong>Finalidade:</strong> Cumprimento de obrigações tributárias</p>
            </section>

            <section id="como-usamos-os-dados">
                <h2 className="text-2xl font-bold mb-4">5. COMO USAMOS OS DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">5.1 Processo de Visagismo com IA</h3>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li><strong>Captura</strong>: Barbeiro fotografa o cliente com celular</li>
                    <li><strong>Upload</strong>: Foto é enviada ao servidor seguro</li>
                    <li><strong>Análise</strong>: IA processa respostas do formulário</li>
                    <li><strong>Geração de Relatório</strong>: Sistema cria recomendações personalizadas</li>
                    <li><strong>Simulação</strong>: Flux Azure gera imagem com novo corte</li>
                    <li><strong>Armazenamento</strong>: Dados salvos no perfil do cliente</li>
                </ol>

                <h3 className="text-xl font-semibold mb-3">5.2 Processo Simplificado (Sem Visagismo)</h3>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li><strong>Consulta</strong>: Barbeiro pergunta preferência diretamente</li>
                    <li><strong>Registro</strong>: Descrição do corte no sistema</li>
                    <li><strong>Foto</strong>: Captura da imagem atual</li>
                    <li><strong>Processamento</strong>: IA converte descrição em simulação</li>
                    <li><strong>Resultado</strong>: Imagem com corte sugerido</li>
                </ol>

                <h3 className="text-xl font-semibold mb-3">5.3 Usos Adicionais</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Envio de relatórios via WhatsApp/email (com consentimento)</li>
                    <li>Lembretes de agendamento</li>
                    <li>Análise de satisfação e melhorias</li>
                    <li>Treinamento de IA (dados anonimizados)</li>
                    <li>Suporte técnico e resolução de problemas</li>
                </ul>
            </section>

            <section id="compartilhamento-de-dados">
                <h2 className="text-2xl font-bold mb-4">6. COMPARTILHAMENTO DE DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">6.1 Com Quem Compartilhamos</h3>

                <h4 className="text-lg font-medium mb-2">Parceiros Tecnológicos Essenciais</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Microsoft Azure</strong>: Hospedagem e processamento de IA</li>
                    <li><strong>Flux</strong>: Manipulação de imagens</li>
                    <li><strong>Processador de Pagamentos</strong>: Stripe Brasil</li>
                    <li><strong>WhatsApp Business API</strong>: Envio de mensagens (quando autorizado)</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Dentro da Plataforma</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Entre Barbeiros do Mesmo Estabelecimento</strong>: Para continuidade do atendimento</li>
                    <li><strong>Do Barbeiro para o Cliente</strong>: Relatórios e simulações</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">6.2 Não Compartilhamos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nunca vendemos dados pessoais</li>
                    <li>Não compartilhamos com empresas de marketing</li>
                    <li>Não criamos perfis para publicidade</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">6.3 Transferência Internacional</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Dados podem ser processados em servidores Microsoft Azure globais</li>
                    <li>Garantimos cláusulas contratuais padrão para proteção</li>
                    <li>Conformidade com requisitos LGPD/GDPR para transferências</li>
                </ul>
            </section>

            <section id="seguranca-dos-dados">
                <h2 className="text-2xl font-bold mb-4">7. SEGURANÇA DOS DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">7.1 Medidas Técnicas (Fase MVP/Beta)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Criptografia TLS 1.3</strong> para dados em trânsito</li>
                    <li><strong>Criptografia AES-256</strong> para dados em repouso</li>
                    <li><strong>Autenticação</strong> com hash bcrypt para senhas</li>
                    <li><strong>Firewall</strong> e proteção contra DDoS</li>
                    <li><strong>Backups</strong> diários automatizados</li>
                    <li><strong>Logs de auditoria</strong> para rastreamento</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">7.2 Medidas Organizacionais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Acesso restrito por perfis (barbeiro acessa só seus clientes)</li>
                    <li>Treinamento de colaboradores</li>
                    <li>Acordos de confidencialidade</li>
                    <li>Política de senha forte obrigatória</li>
                    <li>Revisão periódica de acessos</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">7.3 Limitações da Fase Beta</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Sistema em aperfeiçoamento contínuo</li>
                    <li>Possíveis ajustes de segurança durante desenvolvimento</li>
                    <li>Monitoramento ativo para identificar melhorias</li>
                </ul>
            </section>

            <section id="retencao-e-exclusao-de-dados">
                <h2 className="text-2xl font-bold mb-4">8. RETENÇÃO E EXCLUSÃO DE DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">8.1 Períodos de Retenção</h3>
                <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-300 px-4 py-2 text-left">Tipo de Dado</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Período Ativo</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Após Cancelamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Dados básicos do cliente</td>
                                <td className="border border-gray-300 px-4 py-2">Enquanto assinatura ativa</td>
                                <td className="border border-gray-300 px-4 py-2">2 anos</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Fotografias/Simulações</td>
                                <td className="border border-gray-300 px-4 py-2">Enquanto assinatura ativa</td>
                                <td className="border border-gray-300 px-4 py-2">60 dias</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Histórico de cortes</td>
                                <td className="border border-gray-300 px-4 py-2">Enquanto assinatura ativa</td>
                                <td className="border border-gray-300 px-4 py-2">2 anos</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Dados financeiros</td>
                                <td className="border border-gray-300 px-4 py-2">5 anos</td>
                                <td className="border border-gray-300 px-4 py-2">5 anos (obrigação legal)</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Logs de acesso</td>
                                <td className="border border-gray-300 px-4 py-2">6 meses</td>
                                <td className="border border-gray-300 px-4 py-2">Exclusão automática</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mb-3">8.2 Exclusão por Solicitação</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Cliente pode solicitar exclusão imediata de fotos</li>
                    <li>Prazo de atendimento: até 15 dias</li>
                    <li>Dados obrigatórios por lei mantidos conforme prazo legal</li>
                </ul>
            </section>

            <section id="direitos-dos-titulares">
                <h2 className="text-2xl font-bold mb-4">9. DIREITOS DOS TITULARES</h2>

                <h3 className="text-xl font-semibold mb-3">9.1 Seus Direitos (LGPD + GDPR)</h3>
                <p className="mb-3">Você tem direito a:</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li><strong>Confirmação e Acesso</strong>: Saber se tratamos seus dados e acessá-los</li>
                    <li><strong>Correção</strong>: Corrigir dados incompletos ou desatualizados</li>
                    <li><strong>Anonimização/Bloqueio/Eliminação</strong>: De dados desnecessários</li>
                    <li><strong>Portabilidade</strong>: Receber seus dados em formato estruturado (JSON/CSV)</li>
                    <li><strong>Informação</strong>: Saber com quem compartilhamos seus dados</li>
                    <li><strong>Revogação</strong>: Retirar consentimento a qualquer momento</li>
                    <li><strong>Oposição</strong>: Opor-se a tratamentos específicos</li>
                    <li><strong>Revisão</strong>: De decisões automatizadas da IA</li>
                </ol>

                <h3 className="text-xl font-semibold mb-3">9.2 Como Exercer Seus Direitos</h3>
                <p className="mb-2"><strong>Via App:</strong></p>
                <p className="mb-2">Menu &gt; Configurações &gt; Privacidade &gt; Meus Dados</p>
                <p className="mb-2"><strong>Por Email:</strong></p>
                <p className="mb-2">privacidade@pandami.com.br</p>
                <p className="mb-2"><strong>Resposta em até:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>15 dias (LGPD)</li>
                    <li>30 dias (GDPR)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">9.3 Sem Prejuízo do Serviço</h3>
                <p className="mb-3">Exercer seus direitos nunca resultará em:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Cobrança de taxas (primeira solicitação gratuita)</li>
                    <li>Discriminação ou prejuízo no atendimento</li>
                    <li>Cancelamento não solicitado</li>
                </ul>
            </section>

            <section id="uso-de-inteligencia-artificial">
                <h2 className="text-2xl font-bold mb-4">10. USO DE INTELIGÊNCIA ARTIFICIAL</h2>

                <h3 className="text-xl font-semibold mb-3">10.1 Como a IA Processa Seus Dados</h3>
                <p className="mb-2"><strong>Análise Facial:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Identifica formato do rosto</li>
                    <li>Detecta características (não identifica pessoa)</li>
                    <li>Sugere cortes harmônicos</li>
                    <li>Não faz reconhecimento facial para identificação</li>
                </ul>

                <p className="mb-2"><strong>Geração de Simulações:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Usa Flux Azure para manipular apenas área do cabelo</li>
                    <li>Mantém características faciais originais</li>
                    <li>Não altera outras partes da imagem</li>
                    <li>Processamento em tempo real, sem armazenamento intermediário</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">10.2 Transparência Algorítmica</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>IA faz sugestões, decisão final é sempre humana</li>
                    <li>Barbeiro pode ignorar ou adaptar sugestões</li>
                    <li>Cliente pode recusar uso de IA a qualquer momento</li>
                    <li>Explicamos a lógica das recomendações no relatório</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">10.3 Limitações e Avisos</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Simulações são aproximações artísticas</li>
                    <li>Resultado real pode variar</li>
                    <li>IA em constante aprendizado e melhoria</li>
                    <li>Feedback ajuda a melhorar precisão</li>
                </ul>
            </section>

            <section id="dados-de-menores">
                <h2 className="text-2xl font-bold mb-4">11. DADOS DE MENORES</h2>

                <h3 className="text-xl font-semibold mb-3">11.1 Política para Menores</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Menores de 16 anos</strong>: Necessário consentimento dos pais/responsáveis</li>
                    <li><strong>16 a 18 anos</strong>: Consentimento do menor + ciência dos pais</li>
                    <li><strong>Identificação</strong>: Barbeiro deve perguntar idade quando aplicável</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">11.2 Proteção Especial</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Fotos de menores com segurança reforçada</li>
                    <li>Não usamos dados de menores para treinamento de IA</li>
                    <li>Exclusão imediata mediante solicitação dos responsáveis</li>
                </ul>
            </section>

            <section id="cookies-e-tecnologias">
                <h2 className="text-2xl font-bold mb-4">12. COOKIES E TECNOLOGIAS</h2>

                <h3 className="text-xl font-semibold mb-3">12.1 Cookies Essenciais (Obrigatórios)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Sessão</strong>: Mantém login ativo</li>
                    <li><strong>Segurança</strong>: Previne ataques CSRF</li>
                    <li><strong>Preferências</strong>: Idioma, tema escuro/claro</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">12.2 Cookies Analíticos (Opcionais)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Google Analytics</strong>: Entender uso da plataforma</li>
                    <li><strong>Hotjar</strong>: Melhorar experiência do usuário</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">12.3 Gerenciamento</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Banner de cookies na primeira visita</li>
                    <li>Configurações &gt; Privacidade &gt; Cookies</li>
                    <li>Respeito ao sinal "Do Not Track"</li>
                </ul>
            </section>

            <section id="comunicacoes">
                <h2 className="text-2xl font-bold mb-4">13. COMUNICAÇÕES</h2>

                <h3 className="text-xl font-semibold mb-3">13.1 Tipos de Comunicação</h3>
                <p className="mb-2"><strong>Transacionais (Sempre Enviadas):</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Confirmações de agendamento</li>
                    <li>Relatórios solicitados</li>
                    <li>Alertas de segurança</li>
                    <li>Mudanças nos termos</li>
                </ul>

                <p className="mb-2"><strong>Marketing (Requer Opt-in):</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Promoções da barbearia</li>
                    <li>Novidades da plataforma</li>
                    <li>Dicas de cuidados</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">13.2 Canais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>WhatsApp (principal)</li>
                    <li>Email (secundário)</li>
                    <li>Notificações no app</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">13.3 Descadastro</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Link em todas mensagens de marketing</li>
                    <li>Responder "SAIR" no WhatsApp</li>
                    <li>Configurações do app</li>
                </ul>
            </section>

            <section id="incidentes-de-seguranca">
                <h2 className="text-2xl font-bold mb-4">14. INCIDENTES DE SEGURANÇA</h2>

                <h3 className="text-xl font-semibold mb-3">14.1 Nosso Compromisso</h3>
                <p className="mb-3">Em caso de incidente que possa causar risco:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Notificação em 72 horas</strong> aos afetados</li>
                    <li><strong>Comunicação à ANPD</strong> quando aplicável</li>
                    <li><strong>Medidas imediatas</strong> de contenção</li>
                    <li><strong>Relatório transparente</strong> sobre o ocorrido</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">14.2 Seu Papel</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Manter senha segura e secreta</li>
                    <li>Notificar comportamentos suspeitos</li>
                    <li>Manter app atualizado</li>
                </ul>
            </section>

            <section id="encarregado-de-protecao-de-dados">
                <h2 className="text-2xl font-bold mb-4">15. ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)</h2>
                <p className="mb-2"><strong>Nome:</strong> Encarregado de Proteção de Dados</p>
                <p className="mb-2"><strong>Email:</strong> dpo@pandami.com.br</p>
                <p className="mb-2"><strong>Telefone:</strong> (48) 99999-9999</p>
                <p className="mb-6"><strong>Horário:</strong> Segunda a Sexta, 9h às 18h (Horário de Brasília)</p>
            </section>

            <section id="autoridades-de-controle">
                <h2 className="text-2xl font-bold mb-4">16. AUTORIDADES DE CONTROLE</h2>
                <p className="mb-3">Caso não esteja satisfeito com nossa resposta:</p>
                <p className="mb-2"><strong>Brasil:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Autoridade Nacional de Proteção de Dados (ANPD)</li>
                    <li>Site: www.gov.br/anpd</li>
                    <li>Email: encarregado@anpd.gov.br</li>
                </ul>

                <p className="mb-2"><strong>União Europeia:</strong></p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Autoridade de proteção de dados do país do titular</li>
                    <li>Lista: edpb.europa.eu</li>
                </ul>
            </section>

            <section id="alteracoes-nesta-politica">
                <h2 className="text-2xl font-bold mb-4">17. ALTERAÇÕES NESTA POLÍTICA</h2>

                <h3 className="text-xl font-semibold mb-3">17.1 Quando Alteramos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Mudanças na legislação</li>
                    <li>Novos recursos no app</li>
                    <li>Melhorias de segurança</li>
                    <li>Feedback dos usuários</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">17.2 Como Avisamos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Mudanças menores</strong>: Atualização silenciosa</li>
                    <li><strong>Mudanças significativas</strong>: 30 dias de aviso prévio</li>
                    <li><strong>Canal de aviso</strong>: Email + banner no app</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">17.3 Histórico de Versões</h3>
                <p className="mb-6">Disponível em: pandami.com.br/privacidade/historico</p>
            </section>

            <section id="lei-aplicavel-e-foro">
                <h2 className="text-2xl font-bold mb-4">18. LEI APLICÁVEL E FORO</h2>
                <p className="mb-6">Esta Política é regida pelas leis brasileiras. Fica eleito o foro da comarca de Florianópolis, Santa Catarina, para dirimir questões, com renúncia a qualquer outro.</p>
            </section>

            <section id="glossario-tecnico">
                <h2 className="text-2xl font-bold mb-4">19. GLOSSÁRIO TÉCNICO</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>API</strong>: Interface de Programação de Aplicações</li>
                    <li><strong>Backup</strong>: Cópia de segurança dos dados</li>
                    <li><strong>Criptografia</strong>: Codificação para proteger dados</li>
                    <li><strong>Hash</strong>: Transformação irreversível de senha</li>
                    <li><strong>MVP</strong>: Produto Mínimo Viável (versão inicial)</li>
                    <li><strong>TLS</strong>: Protocolo de segurança para internet</li>
                </ul>
            </section>

            <section id="contato">
                <h2 className="text-2xl font-bold mb-4">20. CONTATO</h2>
                <p className="mb-2"><strong>PandaHan</strong></p>
                <p className="mb-2">CNPJ: 60.348.853/0001-40</p>
                <p className="mb-4">Endereço: Florianópolis, Santa Catarina, Brasil</p>

                <p className="mb-2"><strong>Canais de Atendimento:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Privacidade</strong>: privacidade@pandami.com.br</li>
                    <li><strong>Suporte</strong>: suporte@pandami.com.br</li>
                    <li><strong>Comercial</strong>: comercial@pandami.com.br</li>
                    <li><strong>WhatsApp</strong>: (48) 98879-3250</li>
                </ul>

                <hr className="my-8" />

                <h3 className="text-xl font-semibold mb-3">DECLARAÇÃO DE CONFORMIDADE</h3>
                <p className="mb-3">Esta Política de Privacidade foi elaborada em conformidade com:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)</li>
                    <li>Regulamento Geral sobre a Proteção de Dados (GDPR - UE 2016/679)</li>
                    <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
                    <li>Código de Defesa do Consumidor (Lei nº 8.078/1990)</li>
                </ul>

                <p className="mb-2"><strong>Última revisão jurídica:</strong> 19/09/2025 </p>
                <p className="mb-6"><strong>Próxima revisão programada:</strong> 19/03/2026</p>

                <hr className="my-8" />

                <p className="text-sm text-muted-foreground italic">A PandaHan se compromete com a privacidade e proteção dos seus dados. Esta política reflete nosso compromisso com a transparência e conformidade legal.</p>
            </section>
        </LegalLayout>
    );
}