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
	title: "CADA PASSO DA SUA",
	highlightedWord: "TRANSFORMAÇÃO",
	description:
		"Do zero ao seu primeiro dólar online, cada módulo foi estruturado para você construir um negócio digital lucrativo no mercado americano.",
	ctaText: "Quero faturar em dólar",
	ctaHref: "/enroll",
	steps: [
		{
			id: "mindset",
			title: "MINDSET DIGITAL",
			description:
				"Desenvolva a mentalidade empreendedora necessária para ter sucesso no mercado digital americano.",
			icon: "graduationCap",
		},
		{
			id: "niche",
			title: "ESCOLHA DO NICHO",
			description:
				"Identifique oportunidades lucrativas no mercado americano e escolha o nicho perfeito para você.",
			icon: "clock",
		},
		{
			id: "skills",
			title: "HABILIDADES DIGITAIS",
			description:
				"Domine as skills mais demandadas: copywriting, design, programação, marketing digital e mais.",
			icon: "idCard",
		},
		{
			id: "platforms",
			title: "PLATAFORMAS E FERRAMENTAS",
			description:
				"Upwork, Fiverr, Toptal e outras plataformas para conseguir seus primeiros clientes americanos.",
			icon: "car",
		},
		{
			id: "pricing",
			title: "PRECIFICAÇÃO EM DÓLAR",
			description:
				"Aprenda a precificar seus serviços em dólar de forma competitiva e lucrativa no mercado americano.",
			icon: "creditCard",
		},
		{
			id: "client-acquisition",
			title: "AQUISIÇÃO DE CLIENTES",
			description:
				"Estratégias comprovadas para conseguir clientes americanos de alto valor e construir relacionamentos duradouros.",
			icon: "heart",
		},
		{
			id: "scaling",
			title: "ESCALANDO O NEGÓCIO",
			description:
				"Como transformar seu freelancing em uma agência ou produto digital escalável.",
			icon: "plane",
		},
		{
			id: "financial",
			title: "GESTÃO FINANCEIRA",
			description:
				"Recebimento internacional, impostos, contas offshore e como gerenciar suas finanças em dólar.",
			icon: "home",
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
			id: "lambo-color",
			text: "Escolher a cor da sua primeira Lamborghini",
			emoji: "🏎️",
			svgPath: "/images/svg/emojis/racing-car.svg",
		},
		{
			id: "clients",
			text: "Decidir quais clientes aceitar (você terá muitos pedidos)",
			emoji: "💰",
			svgPath: "/images/svg/emojis/money-bag.svg",
		},
		{
			id: "vacation",
			text: "Planejar suas férias trabalhando de qualquer lugar do mundo",
			emoji: "🌎",
			svgPath: "/images/svg/emojis/globe.svg",
		},
	],
};

export const comparisonSectionProps: ComparisonSectionProps = {
	title: "ESTES SÃO OS DIFERENCIAIS DA",
	highlightedTitle: "PONTE AMÉRICAS",
	ponteAmericasHeader: "PONTE AMÉRICAS",
	othersHeader: "Cursos genéricos",
	rows: [
		{
			feature: "Foco no mercado americano",
			ponteAmericas: {
				value: "100% dólar",
				hasFeature: true,
				isHighlight: true,
			},
			others: { value: "Mercado brasileiro", hasFeature: true },
		},
		{
			feature: "Estratégias validadas",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Mentoria com quem fatura em dólar",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Acesso a plataformas premium",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Templates e materiais prontos",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Comunidade de empreendedores",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Suporte para recebimento internacional",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Cases reais de sucesso",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Networking com clientes americanos",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Atualizações constantes",
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
			rating: { score: 4.9, reviews: 156 },
			pricing: {
				originalPrice: "R$ 2.988,00",
				installments: "12X de",
				price: "44",
				cents: ",90",
			},
			features: [
				{
					title: "Roadmap completo",
					description: "(Do zero ao primeiro dólar)",
				},
				{
					title: "Templates e materiais",
					description: "(Portfólio, propostas, contratos)",
				},
				{
					title: "50+ aulas práticas",
					description: "(Conteúdo completo gravado)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "completo",
			name: "COMPLETO",
			badge: { text: "COMPLETO", color: "bg-emerald-600" },
			rating: { score: 4.9, reviews: 156 },
			pricing: {
				originalPrice: "R$ 3.888,00",
				installments: "12X de",
				price: "64",
				cents: ",90",
			},
			features: [
				{
					title: "Tudo do plano Starter",
					description: "(Todas as funcionalidades incluídas)",
				},
				{
					title: "Acesso a plataformas premium",
					description: "(Upwork, Toptal e outras)",
				},
				{
					title: "Grupo VIP de networking",
					description: "(Conexões com outros empreendedores)",
				},
				{
					title: "Acesso vitalício",
					description: "(Atualizações constantes)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "personalizado",
			name: "PERSONALIZADO",
			badge: { text: "PERSONALIZADO", color: "bg-orange-500" },
			rating: { score: 4.9, reviews: 156 },
			title: "MENTORIA 1:1 PARA FATURAR EM DÓLAR",
			subtitle: "PARA VOCÊ QUE PROCURA",
			features: [
				{
					title: "Consultoria individual",
					description: "(Sessões ao vivo personalizadas)",
				},
				{
					title: "Análise do seu perfil",
					description: "(Identificação de oportunidades)",
				},
				{
					title: "Estratégia personalizada",
					description: "(Plano sob medida para você)",
				},
				{
					title: "Suporte até o primeiro cliente",
					description: "(Acompanhamento completo)",
				},
			],
			buttonText: "VAMOS CONVERSAR",
		},
	],
};

// Props específicas da Hero Section
export const heroSectionProps: HeroSectionProps = {
	title: "DO ZERO À 1ª LAMBORGHINI",
	subtitle: "FATURANDO EM DÓLAR NO MERCADO DIGITAL AMERICANO",
	ctaText: "QUERO FATURAR EM DÓLAR",
	ctaHref: "#pricing",
	videoSrc: "/",
	posterImage:
		"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
};

// Props específicas da Mentor Section
export const mentorSectionProps: MentorSectionProps = {
	mentor: {
		name: "Lucas Zoltan",
		role: "Empreendedor Digital e Especialista em Mercado Americano",
		image: {
			src: "/images/team-members-cards/zoltan-card-cover.png",
			alt: "Lucas Zoltan, professor do Programa Ponte Américas",
			width: 1280,
			height: 720,
		},
		highlights: [
			{ label: "Faturamento em dólar", value: "$500k+" },
			{ label: "Alunos faturando", value: "+400" },
			{ label: "Horas de conteúdo", value: "+45" },
		],
	},
	modules: [
		{
			id: "fundamentos-digitais",
			title: "Fundamentos do mercado digital",
			description:
				"Entenda como funciona o mercado digital americano e quais são as oportunidades mais lucrativas para brasileiros.",
			audience: "Mentoria Ponte Américas",
			image:
				"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
			tag: "Módulo 1",
		},
		{
			id: "skills-demandadas",
			title: "Skills mais demandadas",
			description:
				"Domine as habilidades que os clientes americanos mais procuram e como se posicionar como especialista.",
			audience: "Aula prática",
			image:
				"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
			tag: "Módulo 2",
		},
		{
			id: "primeiros-clientes",
			title: "Conseguindo seus primeiros clientes",
			description:
				"Estratégias comprovadas para conseguir clientes americanos de alto valor em plataformas como Upwork e Fiverr.",
			audience: "Playbook exclusivo",
			image:
				"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
			tag: "Módulo 3",
		},
		{
			id: "escalando-negocio",
			title: "Escalando para 6 dígitos",
			description:
				"Como transformar seu freelancing em um negócio digital escalável e alcançar 6 dígitos em dólar.",
			audience: "Material bônus",
			image:
				"/images/programs-thumbnails/program-thumb-mercado-digital-americano.png",
			tag: "Módulo 4",
		},
	],
	ctaText: "Quero faturar em dólar",
	ctaHref: "#pricing",
};
