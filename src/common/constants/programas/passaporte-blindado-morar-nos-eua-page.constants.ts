import { ComparisonSectionProps, HeroSectionProps, IActionButtons, IcebreakerSectionProps, INavItem, JourneySectionProps, MentorSectionProps, PricingSectionProps } from "@/types";

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
		ctaText: "MORAR NOS EUA",
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
		url: "/programas/turista-orlando",
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

// Constantes de navegação específicas para a Landing Page
export const LP_NAVIGATION_ITEMS: INavItem[] = [
	{
		title: "Início",
		href: "#hero",
	},
	{
		title: "Mentor",
		href: "#teacher",
	},
	{
		title: "Jornada",
		href: "#journey",
	},
	{
		title: "Depoimentos",
		href: "#testimonials",
	},
	{
		title: "Vantagens",
		href: "#comparison",
	},
];

// Botões de ação específicos para a LP
export const LP_ACTION_BUTTONS: IActionButtons = {
	member: {
		href: "/members",
		text: "JÁ SOU ALUNO",
		variant: "outline",
	},
	cta: {
		href: "#pricing",
		text: "COMEÇAR AGORA",
		variant: "default",
	},
};

export const journeySectionProps: JourneySectionProps = {
	eyebrow: "Roadmap completo",
	title: "CADA PASSO DA SUA",
	highlightedWord: "JORNADA",
	description:
		"Desde o planejamento até sua completa adaptação nos Estados Unidos, cada módulo foi pensado para acelerar seu processo de imigração.",
	ctaText: "Quero começar minha jornada",
	ctaHref: "/enroll",
	steps: [
		{
			id: "planning",
			title: "PLANEJAMENTO",
			description:
				"Assim como em uma corrida, cada aula aponta um foco claro para sua adaptação e progresso rumo aos EUA.",
			icon: "clock",
		},
		{
			id: "visa-documentation",
			title: "VISTOS E DOCUMENTAÇÃO",
			description:
				"Passo a passo completo sobre vistos, green card, cidadania e todos os documentos necessários para viver legalmente nos EUA.",
			icon: "idCard",
		},
		{
			id: "first-day",
			title: "DIA 01 NOS EUA",
			description:
				"Simulações reais e checklists práticos para você viver o primeiro dia nos Estados Unidos com confiança.",
			icon: "plane",
		},
		{
			id: "real-estate",
			title: "IMÓVEIS E ALUGUÉIS",
			description:
				"Desde a busca até a assinatura, saiba como negociar moradia sem cair em ciladas e garantir uma casa pronta para morar.",
			icon: "home",
		},
		{
			id: "transportation",
			title: "VEÍCULOS E TRANSPORTE",
			description:
				"Entenda o sistema americano de transporte, obtenha a habilitação certa e escolha veículos que se encaixam no seu estilo de vida.",
			icon: "car",
		},
		{
			id: "healthcare",
			title: "SAÚDE",
			description:
				"Conheça quais seguros contratar, como montar um plano financeiro para saúde e evitar surpresas médicas custosas.",
			icon: "heart",
		},
		{
			id: "education",
			title: "EDUCAÇÃO",
			description:
				"Matrículas, bolsas e tradução de históricos: tudo que você precisa para garantir estudos de qualidade para você e sua família.",
			icon: "graduationCap",
		},
		{
			id: "finance",
			title: "FINANÇAS E BANCOS",
			description:
				"Abra contas, construa crédito e domine impostos para colocar suas finanças americanas no caminho do crescimento.",
			icon: "creditCard",
		},
	],
};

export const icebreakerSectionProps: IcebreakerSectionProps = {
	title: "QUAIS SERÃO\nSUAS MAIORES\nDIFICULDADES\nAPÓS O PROGRAMA?",
	icon: {
		src: "/images/svg/red-x-uncheck.svg",
		alt: "Ícone de X vermelho",
		width: 64,
		height: 64,
	},
	items: [
		{
			id: "restaurant",
			text: "Escolher o restaurante para jantar na quarta-feira",
			emoji: "🍱",
			svgPath: "/images/svg/emojis/sushi.svg",
		},
		{
			id: "convince-uncle",
			text: "Ensinar ao seu tio que a AMÉRICA é a melhor escolha",
			emoji: "🫨",
			svgPath: "/images/svg/emojis/frightened.svg",
		},
		{
			id: "family-trip",
			text: "Decidir para onde levar a sua família: Disney ou Miami?",
			emoji: "✈️",
			svgPath: "/images/svg/emojis/plane.svg",
		},
	],
};

export const comparisonSectionProps: ComparisonSectionProps = {
	title: "ESTES SÃO OS DIFERENCIAIS DA",
	highlightedTitle: "PONTE AMÉRICAS",
	ponteAmericasHeader: "PONTE AMÉRICAS",
	othersHeader: "Curso de esquina",
	rows: [
		{
			feature: "Número de aulas",
			ponteAmericas: {
				value: "Mais de 100",
				hasFeature: true,
				isHighlight: true,
			},
			others: { value: "Entre 10 e 50", hasFeature: true },
		},
		{
			feature: "Programas com temas variados",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Materiais complementares",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Comunidade",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Atualizações mensais de conteúdo",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Plano de estudo personalizado",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Todos os professores residentes nos EUA",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Estratégia validada com vários alunos",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Aulas com qualidade visual cinematográfica",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Time dedicado à didática e qualidade de ensino",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
	],
};

export const pricingSectionProps: PricingSectionProps = {
	title: {
		main: "AO SE MATRICULAR HOJE NO",
		highlight: "PONTE AMÉRICAS",
		subtitle: "VOCÊ GARANTE:",
	},
	plans: [
		{
			id: "starter",
			name: "STARTER",
			badge: { text: "STARTER", color: "bg-indigo-600" },
			rating: { score: 4.8, reviews: 94 },
			pricing: {
				originalPrice: "R$ 2.688,00",
				installments: "12X de",
				price: "39",
				cents: ",90",
			},
			features: [
				{
					title: "Cupom bônus exclusivo",
					description: "(6 meses de acesso aos descontos)",
				},
				{
					title: "Apostila completa das aulas",
					description: "(Material de apoio em PDF)",
				},
				{
					title: "50 aulas para te ensinar tudo sobre EUA",
					description: "(Conteúdo completo gravado)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "completo",
			name: "COMPLETO",
			badge: { text: "COMPLETO", color: "bg-emerald-600" },
			rating: { score: 4.8, reviews: 94 },
			pricing: {
				originalPrice: "R$ 3.588,00",
				installments: "12X de",
				price: "59",
				cents: ",90",
			},
			features: [
				{
					title: "Tudo do plano Starter",
					description: "(Todas as funcionalidades incluídas)",
				},
				{
					title: "Suporte premium via WhatsApp",
					description: "(Atendimento prioritário)",
				},
				{
					title: "Certificado de conclusão",
					description: "(Documento oficial do programa)",
				},
				{
					title: "Acesso vitalício ao conteúdo",
					description: "(Sem limite de tempo)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "personalizado",
			name: "PERSONALIZADO",
			badge: { text: "PERSONALIZADO", color: "bg-orange-500" },
			rating: { score: 4.8, reviews: 94 },
			title: "CONSULTORIA DE EUA COM O TIME, AO VIVO",
			subtitle: "PARA VOCÊ QUE PROCURA",
			features: [
				{
					title: "Consultoria 1:1 personalizada",
					description: "(Atendimento individual)",
				},
				{
					title: "Análise do seu perfil",
					description: "(Avaliação completa gratuita)",
				},
				{
					title: "Estratégia personalizada",
					description: "(Plano sob medida para você)",
				},
				{
					title: "Acompanhamento contínuo",
					description: "(Suporte durante todo o processo)",
				},
			],
			buttonText: "VAMOS CONVERSAR",
		},
	],
};

// Props específicas da Hero Section
export const heroSectionProps: HeroSectionProps = {
	title: "A VIRADA DE CHAVE",
	subtitle: "PARA MORAR NOS EUA QUE VOCÊ PRECISA ENTENDER AGORA",
	ctaText: "QUERO MUDAR DE VIDA",
	ctaHref: "#pricing",
	videoSrc: "/",
	posterImage:
		"/images/programs-thumbnails/caua-program-cover-como-vir-morar-nos-estados-unidos.png",
};

// Props específicas da Mentor Section
export const mentorSectionProps: MentorSectionProps = {
	mentor: {
		name: "Cauã Cunha",
		role: "Fundador do Ponte Américas",
		image: {
			src: "/images/programs-thumbnails/caua-program-cover-2-como-vir-morar-nos-estados-unidos.png",
			alt: "Cauã Cunha, professor do Programa Ponte Américas",
			width: 1280,
			height: 720,
		},
		highlights: [
			{ label: "Sonhos realizados", value: "+150" },
			{ label: "Países atendidos", value: "08" },
			{ label: "Horas de conteúdo", value: "+40" },
		],
	},
	modules: [
		{
			id: "sistema-americano",
			title: "Como funciona o sistema americano",
			description:
				"Entenda desde o básico até as nuances culturais, legais e financeiras para se estabelecer com sucesso nos EUA.",
			audience: "Mentoria Ponte Américas",
			image:
				"/images/programs-modules-covers/program-morar-nos-eua-module-cover-sistema-americano.png",
			tag: "Módulo 1",
		},
		{
			id: "documentacao-legal",
			title: "Documentação e processos legais",
			description:
				"Passo a passo completo sobre vistos, green card, cidadania e todos os documentos necessários para viver legalmente nos EUA.",
			audience: "Aula prática",
			image:
				"/images/programs-modules-covers/program-morar-nos-eua-module-cover-documentacao-legal.png",
			tag: "Módulo 2",
		},
		{
			id: "mercado-trabalho",
			title: "Mercado de trabalho americano",
			description:
				"Como encontrar oportunidades, criar networking efetivo e se posicionar no mercado de trabalho dos EUA.",
			audience: "Playbook exclusivo",
			image:
				"/images/programs-modules-covers/program-morar-nos-eua-module-cover-mercado-trabalho.png",
			tag: "Módulo 3",
		},
		{
			id: "vida-pratica",
			title: "Vida prática nos Estados Unidos",
			description:
				"Moradia, sistema de saúde, educação, impostos e tudo que você precisa saber para o dia a dia americano.",
			audience: "Material bônus",
			image:
				"/images/programs-modules-covers/program-morar-nos-eua-module-cover-vida-pratica.png",
			tag: "Módulo 4",
		},
	],
	ctaText: "Quero mudar de vida",
	ctaHref: "#pricing",
};
