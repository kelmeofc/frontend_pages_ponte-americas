export interface IProgram {
	id: string;
	title: string;
	subtitle: string;
	price: string;
	originalPrice?: string;
	installments?: string;
	features: string[];
	ctaText: string;
	image?: string;
	name: string; // Nome do professor
	url?: string; // URL do programa
}

export const PROGRAMS_DATA: readonly IProgram[] = [
	{
		id: "passaporte-blindado",
		title: "Método Passaporte Blindado para morar legalmente nos EUA",
		subtitle: "Programa Completo de Imigração",
		price: "12x R$ 39,90",
		originalPrice: "De R$ 478,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Planejamento completo de mudança",
			"Documentação necessária",
			"Processo de imigração passo a passo",
			"Dicas práticas de adaptação",
			"Suporte especializado",
		],
		ctaText: "COMEÇAR AGORA",
		image:
			"/images/programs-thumbnails/caua-program-cover-como-vir-morar-nos-estados-unidos.png",
		name: "Cauã Cunha",
		url: "/programas/passaporte-blindado-morar-nos-eua",
	},
	{
		id: "turismo-orlando",
		title:
			"Guia turístico: tudo que você precisa saber antes de viajar para Orlando",
		subtitle: "Turismo Seguro em Orlando",
		price: "12x R$ 29,90",
		originalPrice: "De R$ 358,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Roteiros otimizados",
			"Melhores atrações e parques",
			"Dicas de hospedagem e alimentação",
			"Como economizar na viagem",
			"Planejamento de transporte",
		],
		ctaText: "PLANEJAR VIAGEM",
		image: "/images/programs-thumbnails/program-thumb-turismo-orlando.png",
		name: "Gabriela",
		url: "/programas/visitar-orlando",
	},
	{
		id: "faculdade-americana",
		title: "Conquiste sua vaga em faculdade americana (mesmo sem inglês) ",
		subtitle: "Educação Superior Americana",
		price: "12x R$ 39,90",
		originalPrice: "De R$ 478,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Processo de aplicação completo",
			"Testes padronizados (SAT, TOEFL)",
			"Bolsas de estudo e financiamento",
			"Escolha da universidade ideal",
			"Preparação para visto estudantil",
		],
		ctaText: "ESTUDAR NOS EUA",
		image: "/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
		name: "Os Irmões EUA",
		url: "/programas/faculdade-eua",
	},
	{
		id: "mercado-digital-americano",
		title: "Do zero à 1ª Lamborghini faturando em dólar no digital",
		subtitle: "Mercado Digital Americano",
		price: "12x R$ 44,90",
		originalPrice: "De R$ 538,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Plataformas de trabalho remoto",
			"Como precificar serviços em dólar",
			"Freelancing internacional",
			"Criação de negócios digitais",
			"Gestão de pagamentos internacionais",
		],
		ctaText: "GANHAR EM DÓLAR",
		image:
			"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
		name: "Lucas Zoltan",
		url: "/programas/ganhar-dinheiro-dolar-online",
	},
	{
		id: "tipos-visto",
		title: "Como escolher o visto certo para residir legalmente nos EUA",
		subtitle: "Tipos de Visto e Processos",
		price: "12x R$ 49,90",
		originalPrice: "De R$ 598,80",
		installments: "com 10% de desconto no PIX",
		features: [
			"Tipos de visto de imigração",
			"Documentação necessária",
			"Preparação para entrevista consular",
			"Processo passo a passo",
			"Acompanhamento especializado",
		],
		ctaText: "OBTER VISTO",
		image:
			"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
		name: "Advogado de Imigração",
		url: "/programas/tipos-de-visto-e-processos",
	},
];
