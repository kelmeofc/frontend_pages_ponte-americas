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
		title: "Guia Completo EUA",
		subtitle: "Curso Básico",
		price: "Personalizado",
		features: [
			"Planejamento completo",
			"Documentação necessária",
			"Primeiros passos",
		],
		ctaText: "SAIBA MAIS",
		image: "/placeholder.svg",
		name: "Cauã Cunha",
	},
	{
		title: "Visto Americano",
		subtitle: "Especialização",
		price: "12x R$ 297,00",
		originalPrice: "De R$ 3.564,00",
		installments: "com 10% de desconto no PIX",
		features: [
			"Preparação para entrevista",
			"Documentação completa",
			"Suporte especializado",
		],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Dr. Roberto Mendes",
	},
	{
		title: "Moradia nos EUA",
		subtitle: "Imóveis & Aluguel",
		price: "12x R$ 197,00",
		originalPrice: "De R$ 2.364,00",
		installments: "com 10% de desconto no PIX",
		features: [
			"Como encontrar moradia",
			"Contratos de aluguel",
			"Dicas de negociação",
		],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Maria Fernanda Costa",
	},
	{
		title: "Trabalho nos EUA",
		subtitle: "Emprego & Negócios",
		price: "12x R$ 397,00",
		originalPrice: "De R$ 4.764,00",
		installments: "com 10% de desconto no PIX",
		features: [
			"Busca de emprego",
			"Networking profissional",
			"Abertura de empresa",
		],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Cauã Cunha",
	},
	{
		title: "Educação nos EUA",
		subtitle: "Escolas & Universidades",
		price: "12x R$ 247,00",
		originalPrice: "De R$ 2.964,00",
		installments: "com 10% de desconto no PIX",
		features: [
			"Sistema educacional",
			"Processo de matrícula",
			"Bolsas de estudo",
		],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Profa. Juliana Oliveira",
	},
	{
		title: "Saúde & Seguros",
		subtitle: "Sistema de Saúde",
		price: "12x R$ 147,00",
		originalPrice: "De R$ 1.764,00",
		installments: "com 10% de desconto no PIX",
		features: ["Planos de saúde", "Emergências médicas", "Medicamentos"],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Dr. Fernando Lima",
	},
	{
		title: "Transporte & Veículos",
		subtitle: "Mobilidade",
		price: "12x R$ 127,00",
		originalPrice: "De R$ 1.524,00",
		installments: "com 10% de desconto no PIX",
		features: [
			"Carteira de motorista",
			"Compra de veículo",
			"Transporte público",
		],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "João Pedro Almeida",
	},
	{
		title: "Finanças & Impostos",
		subtitle: "Gestão Financeira",
		price: "12x R$ 347,00",
		originalPrice: "De R$ 4.164,00",
		installments: "com 10% de desconto no PIX",
		features: ["Conta bancária", "Declaração de imposto", "Investimentos"],
		ctaText: "COMPRAR AGORA",
		image: "/placeholder.svg",
		name: "Luciana Rodrigues",
	},
];
