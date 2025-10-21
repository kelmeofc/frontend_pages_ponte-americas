import { FileText, Shield } from "lucide-react";
import { LegalPageConfig } from "@/types/legal-metadata";

// Constantes compartilhadas
const LAST_UPDATED = "21 de outubro de 2025";
const BASE_URL = "https://ponteamericas.com";
const COMMON_KEYWORDS = ["ponte américas", "imigração EUA", "viver nos Estados Unidos"];

// Função auxiliar para criar metadados
const createMetadata = (
  title: string,
  description: string,
  keywords: string[],
  path: string
) => ({
  title: `${title} | Ponte Américas`,
  description,
  keywords: [...COMMON_KEYWORDS, ...keywords],
  lastUpdated: LAST_UPDATED,
  canonical: `${BASE_URL}/${path}`
});

// Configuração das páginas legais
export const legalPagesConfig: Record<string, LegalPageConfig> = {
  "termos-de-uso": {
    title: "Termos de Uso",
    description: "Termos e condições de uso do programa educacional Ponte Américas. Seu guia completo para viver, trabalhar e prosperar nos Estados Unidos.",
    lastUpdated: LAST_UPDATED,
    icon: "FileText",
    metadata: createMetadata(
      "Termos de Uso - Programa Educacional de Imigração",
      "Termos e condições de uso do programa educacional Ponte Américas. Seu guia completo para viver, trabalhar e prosperar nos Estados Unidos.",
      [
        "termos de uso",
        "programa educacional",
        "imigração",
        "curso online",
        "Estados Unidos",
        "LGPD"
      ],
      "termos-de-uso"
    )
  },
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    description: "Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais no programa Ponte Américas de acordo com a LGPD.",
    lastUpdated: LAST_UPDATED,
    icon: "Shield",
    metadata: createMetadata(
      "Política de Privacidade - Proteção de Dados LGPD",
      "Política de privacidade do Ponte Américas em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos dados pessoais em nosso programa educacional.",
      [
        "política de privacidade",
        "LGPD",
        "proteção de dados",
        "privacidade",
        "dados pessoais",
        "programa educacional",
        "GDPR",
        "compliance"
      ],
      "politica-de-privacidade"
    )
  }
};
