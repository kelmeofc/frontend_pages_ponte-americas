/**
 * Application constants
 */

// Site configuration
export const SITE_CONFIG = {
  name: 'PandaMi',
  description: 'Visagismo com IA',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pandami.com.br',
  logo: '/logo.svg',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/pandami',
  facebook: 'https://www.facebook.com/pandami',
  linkedin: 'https://www.linkedin.com/company/pandami',
} as const;

// FAQ data
export const FAQ_DATA = [
  {
    question: "Funciona no meu tipo de cabelo?",
    answer: "Sim! Nossa IA foi treinada especialmente para a diversidade brasileira: cabelos lisos, cacheados, crespos, de todas as texturas e etnias. O sistema reconhece as características únicas de cada tipo.",
  },
  {
    question: "É complicado de usar?",
    answer: "Super simples: tire uma foto, aguarde 30 segundos, receba as sugestões. Não precisa ser expert em tecnologia. Se tiver dúvidas, nosso suporte te ajuda no mesmo dia.",
  },
  {
    question: "E se o cliente não gostar do resultado?",
    answer: "Nossa IA tem 94% de aprovação, mas entendemos que gosto é pessoal. Se não gostar das sugestões iniciais, nossos profissionais podem ajustar as recomendações até encontrar a opção ideal.",
  },
  {
    question: "Preciso baixar algum app?",
    answer: "Não! Funciona direto no seu celular pelo navegador. Você agenda pelo link que enviamos e usa durante a consulta com o cliente.",
  },
  {
    question: "Como funciona a privacidade?",
    answer: "Total segurança: fotos são processadas e automaticamente apagadas após a análise. Não compartilhamos dados com terceiros. Privacidade garantida.",
  },
  {
    question: "Posso testar antes de decidir?",
    answer: "Claro! Teste por 7 dias com risco zero. Se não melhorar seus resultados, cancele sem pegadinhas. Suporte incluído durante todo o teste.",
  },
];

// Pricing configuration
export const PRICING_CONFIG = {
  periods: {
    monthly: { label: 'Mensal', discount: 0 },
    semiannual: { label: 'Semestral', discount: 10 },
    annual: { label: 'Anual', discount: 20 },
  },
  basePrices: {
    STARTER: 49.9,
    PRO: 99.9,
    MAX: 189.9,
  },
  testPrices: {
    STARTER: 4.90,
    PRO: 9.90,
    MAX: 19.90,
  },
} as const;

// SEO configuration
export const SEO_CONFIG = {
  defaultTitle: 'Visagismo com IA | Descubra sua melhor versão | PandaMi',
  defaultDescription: 'Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!',
  keywords: 'visagismo com IA, Pandami, IA Pandami',
  locale: 'pt_BR',
} as const;

// Consent & privacy
export const CONSENT_STORAGE_KEY = 'pdmi_consent_choice_v2' as const;

// Animation configurations
export const ANIMATION_CONFIG = {
  durations: {
    short: 0.3,
    medium: 0.6,
    long: 1.0,
  },
  easings: {
    easeOut: 'power2.out',
    easeIn: 'power2.in',
    easeInOut: 'power2.inOut',
  },
} as const;
