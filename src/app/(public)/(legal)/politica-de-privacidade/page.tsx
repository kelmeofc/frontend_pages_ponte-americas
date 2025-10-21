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
                    <a href="#conteudo-educacional" className="text-primary hover:underline">10. Conteúdo Educacional</a>
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
                <p className="mb-4">O <strong>Ponte Américas</strong> ("nós", "nosso" ou "Programa"), um programa educacional abrangente baseado nos Estados Unidos, é dedicado a orientar brasileiros em sua jornada para viver, trabalhar e prosperar nos Estados Unidos.</p>
                <p className="mb-4">Esta Política de Privacidade informa sobre nossas práticas de coleta, uso, armazenamento e proteção de dados pessoais, em conformidade com:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) do Brasil</li>
                    <li>Regulamento Geral sobre a Proteção de Dados (GDPR - UE 2016/679)</li>
                    <li>Marco Civil da Internet (Lei nº 12.965/2014)</li>
                    <li>Leis americanas aplicáveis de proteção de dados</li>
                </ul>
                <p className="mb-4"><strong>IMPORTANTE:</strong> Nosso programa está em constante evolução, com melhorias contínuas sendo implementadas, incluindo recursos de segurança e privacidade.</p>
            </section>

            <section id="definicoes-importantes">
                <h2 className="text-2xl font-bold mb-4">2. DEFINIÇÕES IMPORTANTES</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>"Programa Educacional"</strong>: Conjunto de cursos, materiais e orientações sobre imigração para os EUA</li>
                    <li><strong>"Participante"</strong>: Pessoa inscrita no programa educacional</li>
                    <li><strong>"Conteúdo Educacional"</strong>: Materiais didáticos, vídeos, PDFs, webinars e orientações</li>
                    <li><strong>"Plataforma"</strong>: Site e ambiente virtual de aprendizagem do Ponte Américas</li>
                    <li><strong>"Titular"</strong>: Pessoa natural a quem se referem os dados pessoais</li>
                    <li><strong>"Dados Pessoais"</strong>: Informações relacionadas a pessoa natural identificada ou identificável</li>
                    <li><strong>"Mentoria"</strong>: Orientação personalizada sobre processos de imigração</li>
                    <li><strong>"Comunidade"</strong>: Ambiente de interação entre participantes do programa</li>
                </ul>
            </section>

            <section id="dados-que-coletamos">
                <h2 className="text-2xl font-bold mb-4">3. DADOS QUE COLETAMOS</h2>

                <h3 className="text-xl font-semibold mb-3">3.1 Dados de Cadastro e Identificação</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nome completo</li>
                    <li>CPF (quando aplicável para brasileiros)</li>
                    <li>Data de nascimento</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone/WhatsApp</li>
                    <li>Endereço residencial atual</li>
                    <li>Nacionalidade e documentos de identificação</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.2 Dados de Perfil Educacional</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nível de escolaridade</li>
                    <li>Área de formação e experiência profissional</li>
                    <li>Proficiência em inglês</li>
                    <li>Objetivos de imigração (trabalho, estudo, investimento)</li>
                    <li>Situação familiar e dependentes</li>
                    <li>Experiência prévia com processos de imigração</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.3 Dados de Utilização da Plataforma</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Progresso nos cursos e módulos</li>
                    <li>Tempo de estudo e frequência de acesso</li>
                    <li>Materiais baixados e visualizados</li>
                    <li>Participação em webinars e eventos</li>
                    <li>Interações na comunidade (posts, comentários)</li>
                    <li>Avaliações e feedback sobre o conteúdo</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.4 Dados de Mentoria e Orientação</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Questionários de perfil para mentoria</li>
                    <li>Situação específica de imigração</li>
                    <li>Documentos compartilhados (quando autorizado)</li>
                    <li>Anotações de sessões de mentoria</li>
                    <li>Planos de ação personalizados</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.5 Dados de Pagamento e Financeiros</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Informações de cartão de crédito (tokenizadas)</li>
                    <li>Histórico de transações e pagamentos</li>
                    <li>Plano contratado e renovações</li>
                    <li>Dados para emissão de recibos e notas fiscais</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">3.6 Dados Técnicos e de Navegação</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Endereço IP e localização geográfica</li>
                    <li>Tipo de dispositivo e sistema operacional</li>
                    <li>Navegador utilizado e suas configurações</li>
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Cookies e identificadores únicos</li>
                    <li>Logs de acesso e atividades na plataforma</li>
                </ul>
            </section>

            <section id="bases-legais-e-finalidades">
                <h2 className="text-2xl font-bold mb-4">4. BASES LEGAIS E FINALIDADES</h2>

                <h3 className="text-xl font-semibold mb-3">4.1 Consentimento (Art. 7º, I da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Informações sensíveis, participação na comunidade, dados opcionais</p>
                <p className="mb-2"><strong>Finalidade:</strong> Personalização da experiência educacional e interação social</p>
                <p className="mb-4"><strong>Como obtemos:</strong> Termo de consentimento específico no cadastro e durante o uso</p>

                <h3 className="text-xl font-semibold mb-3">4.2 Execução de Contrato (Art. 7º, V da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Informações de cadastro, progresso nos cursos, dados de pagamento</p>
                <p className="mb-4"><strong>Finalidade:</strong> Prestação dos serviços educacionais contratados</p>

                <h3 className="text-xl font-semibold mb-3">4.3 Legítimo Interesse (Art. 7º, IX da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Dados de uso, preferências de aprendizado, feedback</p>
                <p className="mb-4"><strong>Finalidade:</strong> Melhoria dos serviços educacionais e prevenção de fraudes</p>

                <h3 className="text-xl font-semibold mb-3">4.4 Cumprimento de Obrigação Legal (Art. 7º, II da LGPD)</h3>
                <p className="mb-2"><strong>Dados:</strong> Dados fiscais e financeiros, registros de acesso</p>
                <p className="mb-6"><strong>Finalidade:</strong> Cumprimento de obrigações tributárias e regulamentares</p>
            </section>

            <section id="como-usamos-os-dados">
                <h2 className="text-2xl font-bold mb-4">5. COMO USAMOS OS DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">5.1 Prestação dos Serviços Educacionais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Criar e manter sua conta na plataforma</li>
                    <li>Fornecer acesso aos cursos e materiais educacionais</li>
                    <li>Acompanhar seu progresso e desempenho</li>
                    <li>Personalizar conteúdo baseado em seu perfil</li>
                    <li>Facilitar participação em webinars e eventos</li>
                    <li>Conectar com mentores e outros participantes</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">5.2 Comunicação e Suporte</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Enviar atualizações sobre o programa</li>
                    <li>Notificar sobre novos conteúdos disponíveis</li>
                    <li>Informar sobre mudanças na legislação americana</li>
                    <li>Fornecer suporte técnico e educacional</li>
                    <li>Responder dúvidas e solicitações</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">5.3 Melhoria e Desenvolvimento</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Analisar padrões de uso para melhorar a plataforma</li>
                    <li>Desenvolver novos conteúdos educacionais</li>
                    <li>Personalizar recomendações de estudo</li>
                    <li>Identificar áreas de interesse dos participantes</li>
                    <li>Medir eficácia dos materiais educacionais</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">5.4 Segurança e Prevenção</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Detectar e prevenir fraudes</li>
                    <li>Proteger a integridade da plataforma</li>
                    <li>Monitorar atividades suspeitas</li>
                    <li>Cumprir requisitos legais e regulamentares</li>
                </ul>
            </section>

            <section id="compartilhamento-de-dados">
                <h2 className="text-2xl font-bold mb-4">6. COMPARTILHAMENTO DE DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">6.1 Com Quem Compartilhamos</h3>

                <h4 className="text-lg font-medium mb-2">Prestadores de Serviços Essenciais</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Hospedagem</strong>: Provedores de nuvem para armazenamento seguro</li>
                    <li><strong>Pagamentos</strong>: Processadores de pagamento (Stripe, PayPal)</li>
                    <li><strong>Comunicação</strong>: Serviços de email e WhatsApp Business</li>
                    <li><strong>Analytics</strong>: Ferramentas de análise para melhoria do serviço</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Mentores e Especialistas</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Informações necessárias para orientação personalizada</li>
                    <li>Dados compartilhados apenas com consentimento específico</li>
                    <li>Acordos de confidencialidade com todos os mentores</li>
                </ul>

                <h4 className="text-lg font-medium mb-2">Comunidade do Programa</h4>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Informações de perfil público escolhidas por você</li>
                    <li>Conteúdo compartilhado voluntariamente em fóruns</li>
                    <li>Progresso e conquistas (se habilitado)</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">6.2 Não Compartilhamos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Nunca vendemos dados pessoais</li>
                    <li>Não compartilhamos com empresas de marketing externas</li>
                    <li>Não criamos perfis para publicidade direcionada</li>
                    <li>Não compartilhamos dados sensíveis sem consentimento explícito</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">6.3 Transferência Internacional</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Dados podem ser processados nos EUA e outros países</li>
                    <li>Garantimos adequado nível de proteção</li>
                    <li>Cláusulas contratuais padrão para transferências</li>
                    <li>Conformidade com LGPD/GDPR para transferências internacionais</li>
                </ul>
            </section>

            <section id="seguranca-dos-dados">
                <h2 className="text-2xl font-bold mb-4">7. SEGURANÇA DOS DADOS</h2>

                <h3 className="text-xl font-semibold mb-3">7.1 Medidas Técnicas</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Criptografia TLS 1.3</strong> para dados em trânsito</li>
                    <li><strong>Criptografia AES-256</strong> para dados em repouso</li>
                    <li><strong>Autenticação multifator</strong> disponível</li>
                    <li><strong>Hashing seguro</strong> para senhas (bcrypt)</li>
                    <li><strong>Firewall</strong> e proteção DDoS</li>
                    <li><strong>Backups</strong> regulares e seguros</li>
                    <li><strong>Monitoramento</strong> 24/7 de segurança</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">7.2 Medidas Organizacionais</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Controle de acesso baseado em funções</li>
                    <li>Treinamento regular de equipe em segurança</li>
                    <li>Acordos de confidencialidade</li>
                    <li>Políticas rigorosas de senhas</li>
                    <li>Auditoria regular de acessos</li>
                    <li>Plano de resposta a incidentes</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">7.3 Proteção Contínua</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Atualizações regulares de segurança</li>
                    <li>Testes de penetração periódicos</li>
                    <li>Monitoramento proativo de ameaças</li>
                    <li>Revisões de segurança com fornecedores</li>
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
                                <td className="border border-gray-300 px-4 py-2">Dados de cadastro</td>
                                <td className="border border-gray-300 px-4 py-2">Durante participação ativa</td>
                                <td className="border border-gray-300 px-4 py-2">2 anos</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Progresso educacional</td>
                                <td className="border border-gray-300 px-4 py-2">Durante participação ativa</td>
                                <td className="border border-gray-300 px-4 py-2">3 anos</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Dados de mentoria</td>
                                <td className="border border-gray-300 px-4 py-2">Durante participação ativa</td>
                                <td className="border border-gray-300 px-4 py-2">1 ano</td>
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
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">Conteúdo da comunidade</td>
                                <td className="border border-gray-300 px-4 py-2">Durante participação ativa</td>
                                <td className="border border-gray-300 px-4 py-2">30 dias</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="text-xl font-semibold mb-3">8.2 Exclusão por Solicitação</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Você pode solicitar exclusão de dados a qualquer momento</li>
                    <li>Prazo de atendimento: até 15 dias úteis</li>
                    <li>Dados exigidos por lei mantidos conforme prazo legal</li>
                    <li>Dados anonimizados podem ser mantidos para estatísticas</li>
                </ul>
            </section>

            <section id="direitos-dos-titulares">
                <h2 className="text-2xl font-bold mb-4">9. DIREITOS DOS TITULARES</h2>

                <h3 className="text-xl font-semibold mb-3">9.1 Seus Direitos (LGPD + GDPR)</h3>
                <p className="mb-3">Você tem direito a:</p>
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                    <li><strong>Confirmação e Acesso</strong>: Saber se tratamos seus dados e acessá-los</li>
                    <li><strong>Correção</strong>: Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li><strong>Anonimização/Bloqueio/Eliminação</strong>: De dados desnecessários ou excessivos</li>
                    <li><strong>Portabilidade</strong>: Receber seus dados em formato estruturado</li>
                    <li><strong>Informação</strong>: Sobre compartilhamento de dados com terceiros</li>
                    <li><strong>Revogação</strong>: Retirar consentimento a qualquer momento</li>
                    <li><strong>Oposição</strong>: Opor-se a tratamentos específicos</li>
                    <li><strong>Revisão</strong>: De decisões automatizadas</li>
                </ol>

                <h3 className="text-xl font-semibold mb-3">9.2 Como Exercer Seus Direitos</h3>
                <p className="mb-2"><strong>Via Plataforma:</strong></p>
                <p className="mb-2">Configurações → Privacidade → Meus Dados</p>
                <p className="mb-2"><strong>Por Email:</strong></p>
                <p className="mb-2">privacidade@ponteamericas.com</p>
                <p className="mb-2"><strong>WhatsApp:</strong></p>
                <p className="mb-2">+1 321 429-6742</p>
                <p className="mb-2"><strong>Prazo de Resposta:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>15 dias úteis (LGPD)</li>
                    <li>30 dias (GDPR)</li>
                    <li>Podendo ser prorrogado por mais 15 dias</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">9.3 Garantias</h3>
                <p className="mb-3">Exercer seus direitos nunca resultará em:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Cobrança de taxas (primeira solicitação gratuita)</li>
                    <li>Discriminação ou tratamento diferenciado</li>
                    <li>Cancelamento não solicitado do programa</li>
                    <li>Perda de acesso a conteúdos já pagos</li>
                </ul>
            </section>

            <section id="conteudo-educacional">
                <h2 className="text-2xl font-bold mb-4">10. CONTEÚDO EDUCACIONAL</h2>

                <h3 className="text-xl font-semibold mb-3">10.1 Personalização do Conteúdo</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Utilizamos dados de perfil para personalizar recomendações</li>
                    <li>Análise de progresso para sugerir próximos passos</li>
                    <li>Adaptação do conteúdo baseada em objetivos de imigração</li>
                    <li>Recomendações baseadas em seu nível de conhecimento</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">10.2 Dados de Aprendizado</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Tempo gasto em cada módulo</li>
                    <li>Materiais mais acessados</li>
                    <li>Padrões de estudo e preferências</li>
                    <li>Avaliações e feedback sobre conteúdo</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">10.3 Melhoria Contínua</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Dados agregados e anonimizados para melhoria do programa</li>
                    <li>Identificação de lacunas no conteúdo educacional</li>
                    <li>Desenvolvimento de novos materiais baseados em necessidades</li>
                    <li>Otimização da experiência de aprendizado</li>
                </ul>
            </section>

            <section id="dados-de-menores">
                <h2 className="text-2xl font-bold mb-4">11. DADOS DE MENORES</h2>

                <h3 className="text-xl font-semibold mb-3">11.1 Política para Menores</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Menores de 16 anos</strong>: Consentimento expresso dos pais/responsáveis obrigatório</li>
                    <li><strong>16 a 18 anos</strong>: Consentimento do menor com ciência dos pais/responsáveis</li>
                    <li><strong>Verificação</strong>: Processo de verificação de idade no cadastro</li>
                    <li><strong>Acompanhamento</strong>: Participação dos responsáveis quando necessário</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">11.2 Proteção Especial</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Dados de menores processados com cuidado redobrado</li>
                    <li>Não utilizamos dados de menores para marketing</li>
                    <li>Exclusão imediata mediante solicitação dos responsáveis</li>
                    <li>Moderação adicional em interações na comunidade</li>
                </ul>
            </section>

            <section id="cookies-e-tecnologias">
                <h2 className="text-2xl font-bold mb-4">12. COOKIES E TECNOLOGIAS</h2>

                <h3 className="text-xl font-semibold mb-3">12.1 Cookies Essenciais (Obrigatórios)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Autenticação</strong>: Manter sessão de login ativa</li>
                    <li><strong>Segurança</strong>: Prevenção de ataques CSRF</li>
                    <li><strong>Funcionalidade</strong>: Preferências de idioma e tema</li>
                    <li><strong>Progresso</strong>: Salvar posição em cursos e módulos</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">12.2 Cookies Analíticos (Opcionais)</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Google Analytics</strong>: Análise de uso da plataforma</li>
                    <li><strong>Hotjar</strong>: Melhoria da experiência do usuário</li>
                    <li><strong>Estatísticas</strong>: Métricas de engajamento educacional</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">12.3 Gerenciamento de Cookies</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Banner de consentimento na primeira visita</li>
                    <li>Central de privacidade para gerenciar preferências</li>
                    <li>Opção de aceitar, recusar ou personalizar</li>
                    <li>Respeito ao sinal "Do Not Track" do navegador</li>
                </ul>
            </section>

            <section id="comunicacoes">
                <h2 className="text-2xl font-bold mb-4">13. COMUNICAÇÕES</h2>

                <h3 className="text-xl font-semibold mb-3">13.1 Tipos de Comunicação</h3>
                <p className="mb-2"><strong>Comunicações Transacionais (Sempre Enviadas):</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Confirmações de inscrição e pagamento</li>
                    <li>Notificações sobre novos conteúdos</li>
                    <li>Alertas sobre mudanças na legislação</li>
                    <li>Lembretes de webinars e eventos</li>
                    <li>Comunicações de segurança e privacidade</li>
                    <li>Alterações nos termos de uso</li>
                </ul>

                <p className="mb-2"><strong>Comunicações de Marketing (Requer Consentimento):</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Newsletter educacional</li>
                    <li>Promoções e ofertas especiais</li>
                    <li>Conteúdo exclusivo e dicas</li>
                    <li>Convites para eventos especiais</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">13.2 Canais de Comunicação</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Email</strong>: Canal principal para comunicações</li>
                    <li><strong>WhatsApp</strong>: Comunicações importantes e suporte</li>
                    <li><strong>Plataforma</strong>: Notificações internas</li>
                    <li><strong>SMS</strong>: Apenas para verificações de segurança</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">13.3 Gestão de Preferências</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Link de descadastro em todas as comunicações</li>
                    <li>Central de preferências na plataforma</li>
                    <li>Resposta "SAIR" via WhatsApp</li>
                    <li>Granularidade nas preferências por tipo de conteúdo</li>
                </ul>
            </section>

            <section id="incidentes-de-seguranca">
                <h2 className="text-2xl font-bold mb-4">14. INCIDENTES DE SEGURANÇA</h2>

                <h3 className="text-xl font-semibold mb-3">14.1 Nosso Compromisso</h3>
                <p className="mb-3">Em caso de incidente de segurança que possa afetar seus dados:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Detecção</strong>: Monitoramento 24/7 para identificação rápida</li>
                    <li><strong>Contenção</strong>: Medidas imediatas para limitar o impacto</li>
                    <li><strong>Avaliação</strong>: Análise completa do escopo e riscos</li>
                    <li><strong>Notificação</strong>: Comunicação aos afetados em até 72 horas</li>
                    <li><strong>Correção</strong>: Implementação de medidas corretivas</li>
                    <li><strong>Transparência</strong>: Relatório detalhado sobre o ocorrido</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">14.2 Sua Responsabilidade</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Manter credenciais de acesso seguras</li>
                    <li>Usar senhas fortes e únicas</li>
                    <li>Não compartilhar dados de acesso</li>
                    <li>Reportar atividades suspeitas imediatamente</li>
                    <li>Manter navegador e dispositivos atualizados</li>
                </ul>
            </section>

            <section id="encarregado-de-protecao-de-dados">
                <h2 className="text-2xl font-bold mb-4">15. ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)</h2>
                <p className="mb-2"><strong>Nome:</strong> Encarregado de Proteção de Dados</p>
                <p className="mb-2"><strong>Email:</strong> dpo@ponteamericas.com</p>
                <p className="mb-2"><strong>WhatsApp:</strong> +1 321 429-6742</p>
                <p className="mb-4"><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h (Horário de Brasília)</p>
                
                <h3 className="text-xl font-semibold mb-3">15.1 Responsabilidades do DPO</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Orientar sobre cumprimento da LGPD e GDPR</li>
                    <li>Atuar como canal de comunicação com titulares</li>
                    <li>Receber comunicações da autoridade nacional</li>
                    <li>Orientar colaboradores sobre práticas de proteção de dados</li>
                </ul>
            </section>

            <section id="autoridades-de-controle">
                <h2 className="text-2xl font-bold mb-4">16. AUTORIDADES DE CONTROLE</h2>
                <p className="mb-3">Se não estiver satisfeito com nossa resposta, você pode contatar:</p>
                
                <p className="mb-2"><strong>Brasil:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>ANPD</strong> - Autoridade Nacional de Proteção de Dados</li>
                    <li>Site: www.gov.br/anpd</li>
                    <li>Email: encarregado@anpd.gov.br</li>
                    <li>Ouvidoria: (61) 2025-3460</li>
                </ul>

                <p className="mb-2"><strong>Estados Unidos:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>FTC</strong> - Federal Trade Commission</li>
                    <li>Site: www.ftc.gov</li>
                    <li>Consumer Sentinel: reportfraud.ftc.gov</li>
                </ul>

                <p className="mb-2"><strong>União Europeia (se aplicável):</strong></p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Autoridade de proteção de dados do país do titular</li>
                    <li>Lista completa: edpb.europa.eu</li>
                </ul>
            </section>

            <section id="alteracoes-nesta-politica">
                <h2 className="text-2xl font-bold mb-4">17. ALTERAÇÕES NESTA POLÍTICA</h2>

                <h3 className="text-xl font-semibold mb-3">17.1 Quando Alteramos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Mudanças na legislação aplicável</li>
                    <li>Novos recursos ou serviços na plataforma</li>
                    <li>Melhorias nas práticas de segurança</li>
                    <li>Feedback dos participantes</li>
                    <li>Alterações em parceiros e fornecedores</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">17.2 Como Comunicamos</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Alterações menores</strong>: Notificação na plataforma</li>
                    <li><strong>Alterações significativas</strong>: Email com 30 dias de antecedência</li>
                    <li><strong>Alterações substanciais</strong>: Novo consentimento pode ser solicitado</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">17.3 Histórico de Versões</h3>
                <p className="mb-6">Mantemos histórico de todas as versões desta política em: ponteamericas.com/privacidade/historico</p>
            </section>

            <section id="lei-aplicavel-e-foro">
                <h2 className="text-2xl font-bold mb-4">18. LEI APLICÁVEL E FORO</h2>
                <p className="mb-4">Esta Política de Privacidade é regida pelas leis brasileiras, especificamente pela LGPD, bem como pelas leis americanas aplicáveis quando o processamento ocorrer nos Estados Unidos.</p>
                <p className="mb-6">Para participantes brasileiros, fica eleito o foro brasileiro competente conforme legislação consumerista. Para demais jurisdições, aplicam-se as leis locais de proteção de dados.</p>
            </section>

            <section id="glossario-tecnico">
                <h2 className="text-2xl font-bold mb-4">19. GLOSSÁRIO TÉCNICO</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>API</strong>: Interface de Programação de Aplicações</li>
                    <li><strong>Backup</strong>: Cópia de segurança dos dados</li>
                    <li><strong>Cookie</strong>: Pequeno arquivo armazenado no navegador</li>
                    <li><strong>Criptografia</strong>: Codificação para proteger dados</li>
                    <li><strong>Hash</strong>: Transformação irreversível de dados</li>
                    <li><strong>HTTPS</strong>: Protocolo seguro para navegação</li>
                    <li><strong>Token</strong>: Identificador único para autenticação</li>
                    <li><strong>TLS</strong>: Protocolo de segurança para dados em trânsito</li>
                    <li><strong>Firewall</strong>: Sistema de proteção contra acesso não autorizado</li>
                </ul>
            </section>

            <section id="contato">
                <h2 className="text-2xl font-bold mb-4">20. CONTATO</h2>
                <p className="mb-2"><strong>Ponte Américas</strong></p>
                <p className="mb-2">Programa Educacional de Imigração para os Estados Unidos</p>
                <p className="mb-4">Baseado nos Estados Unidos</p>

                <p className="mb-2"><strong>Canais de Atendimento:</strong></p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li><strong>Privacidade e Proteção de Dados</strong>: privacidade@ponteamericas.com</li>
                    <li><strong>Suporte Educacional</strong>: suporte@ponteamericas.com</li>
                    <li><strong>Geral</strong>: contato@ponteamericas.com</li>
                    <li><strong>WhatsApp</strong>: +1 321 429-6742</li>
                </ul>

                <p className="mb-2"><strong>Horário de Atendimento:</strong></p>
                <p className="mb-6">Segunda a Sexta, 9h às 18h (Horário de Brasília)</p>

                <hr className="my-8" />

                <h3 className="text-xl font-semibold mb-3">DECLARAÇÃO DE CONFORMIDADE</h3>
                <p className="mb-3">Esta Política de Privacidade foi elaborada em conformidade com:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) - Brasil</li>
                    <li>Regulamento Geral sobre a Proteção de Dados (GDPR - UE 2016/679)</li>
                    <li>Marco Civil da Internet (Lei nº 12.965/2014) - Brasil</li>
                    <li>Código de Defesa do Consumidor (Lei nº 8.078/1990) - Brasil</li>
                    <li>California Consumer Privacy Act (CCPA) - Estados Unidos</li>
                    <li>Children's Online Privacy Protection Act (COPPA) - Estados Unidos</li>
                </ul>

                <p className="mb-2"><strong>Última revisão jurídica:</strong> 21/10/2025</p>
                <p className="mb-6"><strong>Próxima revisão programada:</strong> 21/04/2026</p>

                <hr className="my-8" />

                <p className="text-sm text-muted-foreground italic">
                    O Ponte Américas está comprometido com a privacidade e proteção de seus dados pessoais. 
                    Esta política reflete nosso compromisso com a transparência, segurança e conformidade legal 
                    no tratamento de dados pessoais de nossos participantes.
                </p>
            </section>
        </LegalLayout>
    );
}