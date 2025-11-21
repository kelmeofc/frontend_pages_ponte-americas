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
		href: "/",
		text: "PÁGINA INICIAL",
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
	title: "CADA PASSO DO SEU",
	highlightedWord: "PROCESSO",
	description:
		"Da escolha do visto ideal até sua aprovação consular, cada módulo foi desenvolvido para maximizar suas chances de sucesso no processo de imigração.",
	ctaText: "Quero obter meu visto",
	ctaHref: "/enroll",
	steps: [
		{
			id: "visa-types",
			title: "TIPOS DE VISTO",
			description:
				"Entenda todos os tipos de visto americano: turismo, trabalho, estudo, investidor e imigração permanente.",
			icon: "idCard",
		},
		{
			id: "eligibility",
			title: "ELEGIBILIDADE",
			description:
				"Descubra qual visto é o mais adequado para seu perfil e objetivos nos Estados Unidos.",
			icon: "clock",
		},
		{
			id: "documentation",
			title: "DOCUMENTAÇÃO",
			description:
				"Lista completa de documentos necessários, como organizá-los e evitar erros que podem causar negação.",
			icon: "graduationCap",
		},
		{
			id: "ds160",
			title: "FORMULÁRIO DS-160",
			description:
				"Passo a passo para preencher corretamente o formulário DS-160 e evitar armadilhas comuns.",
			icon: "creditCard",
		},
		{
			id: "interview",
			title: "ENTREVISTA CONSULAR",
			description:
				"Preparação completa para a entrevista: perguntas comuns, postura, documentos e como impressionar o oficial.",
			icon: "heart",
		},
		{
			id: "green-card",
			title: "GREEN CARD",
			description:
				"Processos para obter residência permanente: casamento, trabalho, investimento e loteria de vistos.",
			icon: "home",
		},
		{
			id: "citizenship",
			title: "CIDADANIA",
			description:
				"Requisitos e processo completo para se tornar cidadão americano e obter o passaporte dos EUA.",
			icon: "plane",
		},
		{
			id: "legal-support",
			title: "SUPORTE JURÍDICO",
			description:
				"Quando contratar um advogado de imigração e como escolher o profissional certo para seu caso.",
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
			id: "passport-photo",
			text: "Escolher a melhor foto para o seu passaporte americano",
			emoji: "📸",
			svgPath: "/images/svg/emojis/camera.svg",
		},
		{
			id: "celebration",
			text: "Decidir como comemorar a aprovação do seu visto",
			emoji: "🎉",
			svgPath: "/images/svg/emojis/party-popper.svg",
		},
		{
			id: "moving-date",
			text: "Planejar a data exata da sua mudança para os EUA",
			emoji: "📅",
			svgPath: "/images/svg/emojis/calendar.svg",
		},
	],
};

export const comparisonSectionProps: ComparisonSectionProps = {
	title: "ESTES SÃO OS DIFERENCIAIS DA",
	highlightedTitle: "PONTE AMÉRICAS",
	ponteAmericasHeader: "PONTE AMÉRICAS",
	othersHeader: "Consultorias tradicionais",
	rows: [
		{
			feature: "Todos os tipos de visto",
			ponteAmericas: {
				value: "Turismo até cidadania",
				hasFeature: true,
				isHighlight: true,
			},
			others: { value: "Apenas 1 ou 2 tipos", hasFeature: true },
		},
		{
			feature: "Preparação para entrevista",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Simulações de entrevista",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Revisão de documentação",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Suporte jurídico especializado",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Casos de sucesso documentados",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Acompanhamento pós-aprovação",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Material didático completo",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Comunidade de aprovados",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Garantia de reembolso",
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
			rating: { score: 4.9, reviews: 203 },
			pricing: {
				originalPrice: "R$ 3.288,00",
				installments: "12X de",
				price: "49",
				cents: ",90",
			},
			features: [
				{
					title: "Guia completo de vistos",
					description: "(Todos os tipos explicados)",
				},
				{
					title: "Checklists de documentação",
					description: "(Para cada tipo de visto)",
				},
				{
					title: "60+ aulas sobre imigração",
					description: "(Conteúdo completo gravado)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "completo",
			name: "COMPLETO",
			badge: { text: "COMPLETO", color: "bg-emerald-600" },
			rating: { score: 4.9, reviews: 203 },
			pricing: {
				originalPrice: "R$ 4.188,00",
				installments: "12X de",
				price: "69",
				cents: ",90",
			},
			features: [
				{
					title: "Tudo do plano Starter",
					description: "(Todas as funcionalidades incluídas)",
				},
				{
					title: "Simulações de entrevista",
					description: "(Pratique antes do dia real)",
				},
				{
					title: "Revisão de documentação",
					description: "(Análise completa dos seus docs)",
				},
				{
					title: "Acesso vitalício",
					description: "(Para todos os seus processos)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "personalizado",
			name: "PERSONALIZADO",
			badge: { text: "PERSONALIZADO", color: "bg-orange-500" },
			rating: { score: 4.9, reviews: 203 },
			title: "CONSULTORIA JURÍDICA ESPECIALIZADA",
			subtitle: "PARA VOCÊ QUE PROCURA",
			features: [
				{
					title: "Advogado de imigração dedicado",
					description: "(Acompanhamento individual)",
				},
				{
					title: "Análise completa do caso",
					description: "(Avaliação jurídica detalhada)",
				},
				{
					title: "Estratégia personalizada",
					description: "(Plano sob medida para seu perfil)",
				},
				{
					title: "Suporte até a aprovação",
					description: "(Acompanhamento em todo o processo)",
				},
			],
			buttonText: "VAMOS CONVERSAR",
		},
	],
};

// Props específicas da Hero Section
export const heroSectionProps: HeroSectionProps = {
	title: "ESCOLHA O VISTO CERTO",
	subtitle: "PARA RESIDIR LEGALMENTE NOS ESTADOS UNIDOS",
	ctaText: "QUERO OBTER MEU VISTO",
	ctaHref: "#pricing",
	videoSrc: "/",
	posterImage:
		"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
};

// Props específicas da Mentor Section
export const mentorSectionProps: MentorSectionProps = {
	mentor: {
		name: "Advogado de Imigração",
		role: "Especialista em Direito de Imigração Americana",
		image: {
			src: "/images/avatars/carlos-men.jpg",
			alt: "Advogado de Imigração, professor do Programa Ponte Américas",
			width: 1280,
			height: 720,
		},
		highlights: [
			{ label: "Vistos aprovados", value: "+1000" },
			{ label: "Anos de experiência", value: "15+" },
			{ label: "Horas de conteúdo", value: "+50" },
		],
	},
	modules: [
		{
			id: "tipos-vistos",
			title: "Tipos de visto e elegibilidade",
			description:
				"Conheça todos os tipos de visto americano e descubra qual é o mais adequado para seu perfil e objetivos.",
			audience: "Mentoria Ponte Américas",
			image:
				"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
			tag: "Módulo 1",
		},
		{
			id: "documentacao-processo",
			title: "Documentação e processo",
			description:
				"Aprenda a organizar toda a documentação necessária e evite erros que podem causar a negação do visto.",
			audience: "Aula prática",
			image:
				"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
			tag: "Módulo 2",
		},
		{
			id: "entrevista-consular",
			title: "Entrevista consular",
			description:
				"Preparação completa para a entrevista: perguntas comuns, postura adequada e como impressionar o oficial.",
			audience: "Playbook exclusivo",
			image:
				"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
			tag: "Módulo 3",
		},
		{
			id: "green-card-cidadania",
			title: "Green Card e cidadania",
			description:
				"Processos para obter residência permanente e cidadania americana: requisitos, documentação e prazos.",
			audience: "Material bônus",
			image:
				"/images/programs-thumbnails/program-thumb-tipos-de-visto-e-processos.png",
			tag: "Módulo 4",
		},
	],
	ctaText: "Quero obter meu visto",
	ctaHref: "#pricing",
};
