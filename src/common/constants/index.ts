/**
 * Application constants
 */

// Site configuration
export const SITE_CONFIG = {
  name: 'Ponte Américas',
  description: 'Sua ponte para os Estados Unidos - Programa completo para brasileiros',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ponteamericas.com',
  logo: '/logo.svg',
} as const;

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/ponteamericas',
  facebook: 'https://www.facebook.com/ponteamericas',
  linkedin: 'https://www.linkedin.com/company/ponteamericas',
} as const;

// Contact information used across the site
export const CONTACT = {
  email: 'contato@ponteamericas.com',
  phoneDisplay: '+1 321 429-6742',
  phoneHref: '+13214296742',
  hours: 'Seg-Sex: 9h às 18h (Brasil)',
} as const;

// Navigation links for header/footer
export const NAV_LINKS = [
  { label: 'Início', href: '/#home' },
  { label: 'Nosso time', href: '/#about-us' },
  { label: 'Programas', href: '/#programs' },
  { label: 'Depoimentos', href: '/#testimonials' },
  { label: 'Começar Agora', href: '/lp' },
  { label: 'Blog', href: '/blog' },
] as const;

// FAQ data
export const FAQ_DATA = [
  {
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos cartão de crédito (Visa, Mastercard, Elo), PIX, boleto bancário e PayPal. O pagamento é processado de forma segura e você recebe a confirmação imediatamente.",
  },
  {
    question: "Como vou receber o acesso ao Ponte Américas?",
    answer: "Após a confirmação do pagamento, você receberá um email com seus dados de acesso à plataforma. O acesso é liberado imediatamente e você pode começar a assistir às aulas em até 5 minutos.",
  },
  {
    question: "O conteúdo é ao vivo ou gravado?",
    answer: "Todo o conteúdo é gravado e disponível 24/7 na plataforma. Você pode assistir no seu ritmo, pausar, voltar e revisar quantas vezes quiser durante o período de acesso.",
  },
  {
    question: "Por quanto tempo vou ter acesso?",
    answer: "Você terá acesso vitalício ao conteúdo do Ponte Américas. Uma vez adquirido, o acesso é seu para sempre, incluindo todas as atualizações e novos conteúdos que forem adicionados.",
  },
  {
    question: "Qual é a plataforma de aulas?",
    answer: "Utilizamos uma plataforma própria e segura, otimizada para streaming de vídeos em alta qualidade. Funciona em qualquer dispositivo: computador, tablet ou celular, com interface intuitiva e fácil navegação.",
  },
  {
    question: "O pagamento é seguro?",
    answer: "Sim! Utilizamos criptografia SSL e processamento seguro. Seus dados financeiros são protegidos e não armazenamos informações de cartão. O pagamento é processado por empresas certificadas e confiáveis.",
  },
  {
    question: "Moro fora do Brasil. Posso comprar?",
    answer: "Sim! O Ponte Américas está disponível para brasileiros em qualquer lugar do mundo. O conteúdo é em português e você terá acesso completo, independentemente da sua localização.",
  },
  {
    question: "Já estou nos EUA. O Ponte Américas serve pra mim?",
    answer: "Perfeitamente! O Ponte Américas foi criado especialmente para brasileiros que estão ou vão para os EUA. O conteúdo aborda especificamente as oportunidades, desafios e estratégias para o mercado americano.",
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
  defaultTitle: 'Ponte Américas | Sua ponte para os Estados Unidos',
  defaultDescription: 'O Ponte Américas é sua ponte para os Estados Unidos. Um programa completo que te prepara para viver, trabalhar e prosperar nos EUA, evitando os erros que custam milhares de dólares.',
  keywords: 'ponte américas, imigração EUA, viver nos Estados Unidos, trabalhar nos EUA, brasileiros nos EUA, green card, visto americano',
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

// Export didatic topics
export { DIDATIC_TOPICS } from './didatic-topics';

// Export courses data
export { COURSES_DATA, type ICourse } from './courses';

// Export pricing data
export { PRICING_DATA } from './pricing';

// Export hero benefits
export { HERO_BENEFITS } from './hero-benefits';