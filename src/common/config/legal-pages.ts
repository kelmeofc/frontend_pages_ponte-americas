import { FileText, Shield } from "lucide-react";
import { LegalPageConfig } from "@/types/legal-metadata";

// Constantes compartilhadas
const LAST_UPDATED = "19 de setembro de 2025";
const BASE_URL = "https://pandami.com.br";
const COMMON_KEYWORDS = ["pandami", "barbearia", "visagismo"];

// Função auxiliar para criar metadados
const createMetadata = (
  title: string,
  description: string,
  keywords: string[],
  path: string
) => ({
  title: `${title} | Pandami`,
  description,
  keywords: [...COMMON_KEYWORDS, ...keywords],
  lastUpdated: LAST_UPDATED,
  canonical: `${BASE_URL}/${path}`
});

// Configuração das páginas legais
export const legalPagesConfig: Record<string, LegalPageConfig> = {
  "termos-de-uso": {
    title: "Termos de Uso",
    description: "Termos e condições de uso da plataforma Pandami. Sistema de gestão de clientes para barbearias com análise de visagismo assistida por IA.",
    lastUpdated: LAST_UPDATED,
    icon: "FileText",
    metadata: createMetadata(
      "Termos de Uso - Sistema de Gestão para Barbearias",
      "Termos e condições de uso da plataforma Pandami. Sistema de gestão de clientes para barbearias com análise de visagismo assistida por Inteligência Artificial.",
      [
        "termos de uso",
        "inteligência artificial",
        "gestão de clientes",
        "sistema de barbearia",
        "análise facial",
        "LGPD"
      ],
      "termos-de-uso"
    )
  },
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    description: "Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais na plataforma Pandami de acordo com a LGPD.",
    lastUpdated: LAST_UPDATED,
    icon: "Shield",
    metadata: createMetadata(
      "Política de Privacidade - Proteção de Dados LGPD",
      "Política de privacidade da Pandami em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos dados pessoais e biométricos em nosso sistema de gestão para barbearias.",
      [
        "política de privacidade",
        "LGPD",
        "proteção de dados",
        "privacidade",
        "dados pessoais",
        "dados biométricos",
        "GDPR",
        "compliance"
      ],
      "politica-de-privacidade"
    )
  }
};
