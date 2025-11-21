import { ComparisonSectionProps, HeroSectionProps, IActionButtons, IcebreakerSectionProps, INavItem, JourneySectionProps, MentorSectionProps, PricingSectionProps } from "@/types";

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
	highlightedWord: "ADMISSÃO",
	description:
		"Do planejamento inicial até sua matrícula em uma universidade americana, cada módulo foi desenhado para maximizar suas chances de aprovação.",
	ctaText: "Quero estudar nos EUA",
	ctaHref: "/enroll",
	steps: [
		{
			id: "preparation",
			title: "PREPARAÇÃO INICIAL",
			description:
				"Entenda o sistema educacional americano, escolha seu curso ideal e prepare-se para o processo de aplicação.",
			icon: "graduationCap",
		},
		{
			id: "tests",
			title: "TESTES PADRONIZADOS",
			description:
				"Estratégias para SAT, ACT, TOEFL e IELTS: como estudar, quando fazer e como alcançar a pontuação necessária.",
			icon: "idCard",
		},
		{
			id: "application",
			title: "PROCESSO DE APLICAÇÃO",
			description:
				"Essays, cartas de recomendação, portfólio e todos os documentos necessários para uma aplicação vencedora.",
			icon: "clock",
		},
		{
			id: "scholarships",
			title: "BOLSAS E FINANCIAMENTO",
			description:
				"Como conseguir bolsas de estudo, auxílio financeiro e reduzir drasticamente os custos da sua educação.",
			icon: "creditCard",
		},
		{
			id: "visa",
			title: "VISTO ESTUDANTIL",
			description:
				"Passo a passo do visto F-1, documentação necessária e como se preparar para a entrevista consular.",
			icon: "plane",
		},
		{
			id: "housing",
			title: "MORADIA ESTUDANTIL",
			description:
				"Dormitórios, apartamentos fora do campus, contratos de aluguel e como escolher a melhor opção para você.",
			icon: "home",
		},
		{
			id: "adaptation",
			title: "ADAPTAÇÃO ACADÊMICA",
			description:
				"Sistema de créditos, escolha de matérias, relacionamento com professores e como ter sucesso acadêmico.",
			icon: "heart",
		},
		{
			id: "career",
			title: "CARREIRA E OPT",
			description:
				"Estágios, networking, OPT (Optional Practical Training) e como construir sua carreira nos EUA.",
			icon: "car",
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
			id: "university-choice",
			text: "Escolher entre Harvard, MIT ou Stanford para fazer seu mestrado",
			emoji: "🎓",
			svgPath: "/images/svg/emojis/graduation-cap.svg",
		},
		{
			id: "internship",
			text: "Decidir qual das 3 ofertas de estágio aceitar",
			emoji: "💼",
			svgPath: "/images/svg/emojis/briefcase.svg",
		},
		{
			id: "campus-life",
			text: "Equilibrar vida social intensa com excelência acadêmica",
			emoji: "🎉",
			svgPath: "/images/svg/emojis/party.svg",
		},
	],
};

export const comparisonSectionProps: ComparisonSectionProps = {
	title: "ESTES SÃO OS DIFERENCIAIS DA",
	highlightedTitle: "PONTE AMÉRICAS",
	ponteAmericasHeader: "PONTE AMÉRICAS",
	othersHeader: "Consultoria tradicional",
	rows: [
		{
			feature: "Processo completo de A a Z",
			ponteAmericas: {
				value: "Desde testes até matrícula",
				hasFeature: true,
				isHighlight: true,
			},
			others: { value: "Apenas aplicação", hasFeature: true },
		},
		{
			feature: "Estratégias para bolsas",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Preparação para testes",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Revisão ilimitada de essays",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Mentoria com estudantes atuais",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Suporte pós-admissão",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Comunidade de alunos aprovados",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Material didático completo",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Acompanhamento do visto F-1",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Experiência de quem passou pelo processo",
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
			rating: { score: 4.9, reviews: 86 },
			pricing: {
				originalPrice: "R$ 2.688,00",
				installments: "12X de",
				price: "39",
				cents: ",90",
			},
			features: [
				{
					title: "Guia completo de aplicação",
					description: "(Passo a passo detalhado)",
				},
				{
					title: "Templates de essays",
					description: "(Modelos aprovados em top universities)",
				},
				{
					title: "40+ aulas sobre admissão",
					description: "(Conteúdo completo gravado)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "completo",
			name: "COMPLETO",
			badge: { text: "COMPLETO", color: "bg-emerald-600" },
			rating: { score: 4.9, reviews: 86 },
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
					title: "Revisão de essays",
					description: "(Até 3 revisões por documento)",
				},
				{
					title: "Simulados de testes",
					description: "(SAT, ACT, TOEFL com correção)",
				},
				{
					title: "Acesso vitalício",
					description: "(Para graduação e pós-graduação)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "personalizado",
			name: "PERSONALIZADO",
			badge: { text: "PERSONALIZADO", color: "bg-orange-500" },
			rating: { score: 4.9, reviews: 86 },
			title: "MENTORIA PERSONALIZADA PARA ADMISSÃO",
			subtitle: "PARA VOCÊ QUE PROCURA",
			features: [
				{
					title: "Consultoria 1:1 completa",
					description: "(Acompanhamento individual)",
				},
				{
					title: "Análise de perfil acadêmico",
					description: "(Avaliação completa gratuita)",
				},
				{
					title: "Estratégia personalizada",
					description: "(Plano sob medida para seu perfil)",
				},
				{
					title: "Suporte até a matrícula",
					description: "(Acompanhamento em todo o processo)",
				},
			],
			buttonText: "VAMOS CONVERSAR",
		},
	],
};

// Props específicas da Hero Section
export const heroSectionProps: HeroSectionProps = {
	title: "CONQUISTE SUA VAGA",
	subtitle: "EM UMA FACULDADE AMERICANA (MESMO SEM INGLÊS FLUENTE)",
	ctaText: "QUERO ESTUDAR NOS EUA",
	ctaHref: "#pricing",
	videoSrc: "/",
	posterImage:
		"/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
};

// Props específicas da Mentor Section
export const mentorSectionProps: MentorSectionProps = {
	mentor: {
		name: "Os Irmãos EUA",
		role: "Especialistas em Admissão Universitária",
		image: {
			src: "/images/team-members-cards/irmoes-card-cover.png",
			alt: "Os Irmãos EUA, professores do Programa Ponte Américas",
			width: 1280,
			height: 720,
		},
		highlights: [
			{ label: "Alunos aprovados", value: "+300" },
			{ label: "Universidades parceiras", value: "50+" },
			{ label: "Horas de conteúdo", value: "+35" },
		],
	},
	modules: [
		{
			id: "sistema-universitario",
			title: "Sistema universitário americano",
			description:
				"Entenda como funcionam as universidades americanas, tipos de instituições e como escolher a ideal para você.",
			audience: "Mentoria Ponte Américas",
			image:
				"/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
			tag: "Módulo 1",
		},
		{
			id: "testes-aplicacao",
			title: "Testes e processo de aplicação",
			description:
				"Preparação completa para SAT, ACT, TOEFL e todo o processo de application para universidades americanas.",
			audience: "Aula prática",
			image:
				"/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
			tag: "Módulo 2",
		},
		{
			id: "bolsas-financiamento",
			title: "Bolsas de estudo e financiamento",
			description:
				"Estratégias comprovadas para conseguir bolsas e reduzir drasticamente os custos da sua educação nos EUA.",
			audience: "Playbook exclusivo",
			image:
				"/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
			tag: "Módulo 3",
		},
		{
			id: "vida-universitaria",
			title: "Vida universitária nos EUA",
			description:
				"Moradia, visto estudantil, adaptação cultural e tudo que você precisa para ter sucesso na universidade.",
			audience: "Material bônus",
			image:
				"/images/programs-thumbnails/program-thumb-faculdade-amercana.png",
			tag: "Módulo 4",
		},
	],
	ctaText: "Quero estudar nos EUA",
	ctaHref: "#pricing",
};
