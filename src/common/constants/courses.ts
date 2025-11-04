export interface ICourse {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  installments?: string;
  features: string[];
  ctaText: string;
  image?: string;
  name: string; // Nome do professor
}

export const COURSES_DATA: readonly ICourse[] = [
	{
		title: "Como vir morar nos Estados Unidos",
		subtitle: "Guia Completo de Imigração",
		price: "12x R$ 39,90",
		originalPrice: "De R$ 478,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Planejamento completo de mudança",
			"Documentação necessária",
			"Processo de imigração passo a passo",
			"Dicas práticas de adaptação",
			"Suporte especializado"
		],
		ctaText: "COMEÇAR AGORA",
		image: "/images/video-placeholder-1.png",
		name: "Cauã Cunha",
	},
	{
		title: "Tudo que você precisa saber antes de visitar Orlando",
		subtitle: "Guia de Turismo Eficiente",
		price: "12x R$ 29,90",
		originalPrice: "De R$ 358,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Roteiros otimizados",
			"Melhores atrações e parques",
			"Dicas de hospedagem e alimentação",
			"Como economizar na viagem",
			"Planejamento de transporte"
		],
		ctaText: "PLANEJAR VIAGEM",
		image: "/images/video-placeholder-1.png",
		name: "Gabriela",
	},
	{
		title: "Tudo que é preciso para fazer faculdade nos EUA",
		subtitle: "Educação Superior Americana",
		price: "12x R$ 39,90",
		originalPrice: "De R$ 478,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Processo de aplicação completo",
			"Testes padronizados (SAT, TOEFL)",
			"Bolsas de estudo e financiamento",
			"Escolha da universidade ideal",
			"Preparação para vida acadêmica"
		],
		ctaText: "ESTUDAR NOS EUA",
		image: "/images/video-placeholder-1.png",
		name: "Os Irmões EUA",
	},
	{
		title: "Como funciona o ensino médio nos Estados Unidos",
		subtitle: "Sistema Educacional Americano",
		price: "12x R$ 34,90",
		originalPrice: "De R$ 418,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Estrutura do sistema escolar",
			"Processo de matrícula",
			"Disciplinas e atividades extracurriculares",
			"Preparação para college",
			"Adaptação cultural para estudantes"
		],
		ctaText: "ENTENDER SISTEMA",
		image: "/images/video-placeholder-1.png",
		name: "Os Irmões EUA",
	},
	{
		title: "Ganhar dinheiro em dólar de forma online",
		subtitle: "Trabalho Remoto Internacional",
		price: "12x R$ 44,90",
		originalPrice: "De R$ 538,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Plataformas de trabalho remoto",
			"Como precificar serviços em dólar",
			"Freelancing internacional",
			"Criação de negócios digitais",
			"Gestão de pagamentos internacionais"
		],
		ctaText: "GANHAR EM DÓLAR",
		image: "/images/video-placeholder-1.png",
		name: "Especialista em Trabalho Remoto",
	},
	{
		title: "Como tirar seus vistos para morar nos EUA",
		subtitle: "Tipos de Visto e Processos",
		price: "12x R$ 49,90",
		originalPrice: "De R$ 598,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Tipos de visto de imigração",
			"Documentação necessária",
			"Preparação para entrevista consular",
			"Processo passo a passo",
			"Acompanhamento especializado"
		],
		ctaText: "OBTER VISTO",
		image: "/images/video-placeholder-1.png",
		name: "Advogado de Imigração",
	},
];
