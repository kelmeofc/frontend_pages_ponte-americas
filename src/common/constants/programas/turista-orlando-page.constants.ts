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
	highlightedWord: "VIAGEM",
	description:
		"Do planejamento ao retorno, cada módulo foi pensado para você aproveitar Orlando ao máximo, economizando tempo e dinheiro.",
	ctaText: "Quero planejar minha viagem",
	ctaHref: "/enroll",
	steps: [
		{
			id: "pre-trip",
			title: "PRÉ-VIAGEM",
			description:
				"Documentação, passagens, seguro viagem e tudo que você precisa resolver antes de embarcar para Orlando.",
			icon: "idCard",
		},
		{
			id: "accommodation",
			title: "HOSPEDAGEM",
			description:
				"Melhores regiões, tipos de acomodação e como escolher o lugar perfeito para sua família em Orlando.",
			icon: "home",
		},
		{
			id: "parks",
			title: "PARQUES TEMÁTICOS",
			description:
				"Disney, Universal, SeaWorld e outros: roteiros otimizados, ingressos com desconto e estratégias para evitar filas.",
			icon: "clock",
		},
		{
			id: "transportation",
			title: "TRANSPORTE",
			description:
				"Aluguel de carro, Uber, transporte dos parques e como se locomover com economia e praticidade.",
			icon: "car",
		},
		{
			id: "dining",
			title: "GASTRONOMIA",
			description:
				"Restaurantes imperdíveis, onde economizar, planos de refeição dos parques e dicas de alimentação.",
			icon: "heart",
		},
		{
			id: "shopping",
			title: "COMPRAS",
			description:
				"Outlets, malls, produtos essenciais para trazer e como aproveitar as melhores ofertas de Orlando.",
			icon: "creditCard",
		},
		{
			id: "attractions",
			title: "ATRAÇÕES EXTRAS",
			description:
				"Além dos parques: praias próximas, Kennedy Space Center, passeios noturnos e experiências únicas.",
			icon: "plane",
		},
		{
			id: "budget",
			title: "ORÇAMENTO",
			description:
				"Planejamento financeiro completo, quanto levar, como economizar e evitar gastos desnecessários.",
			icon: "graduationCap",
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
			id: "which-park",
			text: "Decidir qual parque visitar primeiro: Magic Kingdom ou Universal?",
			emoji: "🎢",
			svgPath: "/images/svg/emojis/roller-coaster.svg",
		},
		{
			id: "souvenirs",
			text: "Escolher entre tantas opções de souvenirs para a família",
			emoji: "🎁",
			svgPath: "/images/svg/emojis/gift.svg",
		},
		{
			id: "extend-trip",
			text: "Convencer a família a estender a viagem por mais alguns dias",
			emoji: "🏖️",
			svgPath: "/images/svg/emojis/beach.svg",
		},
	],
};

export const comparisonSectionProps: ComparisonSectionProps = {
	title: "ESTES SÃO OS DIFERENCIAIS DA",
	highlightedTitle: "PONTE AMÉRICAS",
	ponteAmericasHeader: "PONTE AMÉRICAS",
	othersHeader: "Guias genéricos",
	rows: [
		{
			feature: "Roteiros personalizados por perfil",
			ponteAmericas: {
				value: "Família, casal, solo",
				hasFeature: true,
				isHighlight: true,
			},
			others: { value: "Roteiro único", hasFeature: true },
		},
		{
			feature: "Dicas de economia real",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: true },
		},
		{
			feature: "Mapas interativos dos parques",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Estratégias anti-fila atualizadas",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Lista de compras com preços",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Suporte durante a viagem",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Cupons de desconto exclusivos",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Atualizações mensais",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Grupo VIP de viajantes",
			ponteAmericas: { value: "", hasFeature: true },
			others: { value: "", hasFeature: false },
		},
		{
			feature: "Experiência de quem mora em Orlando",
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
			rating: { score: 4.9, reviews: 127 },
			pricing: {
				originalPrice: "R$ 1.788,00",
				installments: "12X de",
				price: "29",
				cents: ",90",
			},
			features: [
				{
					title: "Cupons de desconto exclusivos",
					description: "(Válidos em parques e atrações)",
				},
				{
					title: "Guia completo em PDF",
					description: "(Material para levar na viagem)",
				},
				{
					title: "30+ aulas sobre Orlando",
					description: "(Conteúdo completo gravado)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "completo",
			name: "COMPLETO",
			badge: { text: "COMPLETO", color: "bg-emerald-600" },
			rating: { score: 4.9, reviews: 127 },
			pricing: {
				originalPrice: "R$ 2.388,00",
				installments: "12X de",
				price: "39",
				cents: ",90",
			},
			features: [
				{
					title: "Tudo do plano Starter",
					description: "(Todas as funcionalidades incluídas)",
				},
				{
					title: "Suporte via WhatsApp durante a viagem",
					description: "(Tire dúvidas em tempo real)",
				},
				{
					title: "Mapas offline dos parques",
					description: "(Acesse sem internet)",
				},
				{
					title: "Acesso vitalício",
					description: "(Para todas as suas viagens)",
				},
			],
			buttonText: "ASSINAR PONTE AMÉRICAS",
		},
		{
			id: "personalizado",
			name: "PERSONALIZADO",
			badge: { text: "PERSONALIZADO", color: "bg-orange-500" },
			rating: { score: 4.9, reviews: 127 },
			title: "PLANEJAMENTO PERSONALIZADO DA SUA VIAGEM",
			subtitle: "PARA VOCÊ QUE PROCURA",
			features: [
				{
					title: "Roteiro personalizado 1:1",
					description: "(Baseado no seu perfil e orçamento)",
				},
				{
					title: "Consultoria ao vivo",
					description: "(Sessão individual de planejamento)",
				},
				{
					title: "Lista de compras personalizada",
					description: "(Com preços e lojas recomendadas)",
				},
				{
					title: "Suporte premium",
					description: "(Antes, durante e depois da viagem)",
				},
			],
			buttonText: "VAMOS CONVERSAR",
		},
	],
};

// Props específicas da Hero Section
export const heroSectionProps: HeroSectionProps = {
	title: "O GUIA DEFINITIVO",
	subtitle: "PARA APROVEITAR ORLANDO COMO UM LOCAL",
	ctaText: "QUERO PLANEJAR MINHA VIAGEM",
	ctaHref: "#pricing",
	videoSrc: "/",
	posterImage:
		"/images/programs-thumbnails/program-thumb-turismo-orlando.png",
};

// Props específicas da Mentor Section
export const mentorSectionProps: MentorSectionProps = {
	mentor: {
		name: "Gabriela",
		role: "Especialista em Turismo em Orlando",
		image: {
			src: "/images/team-members-cards/gabriela-card-cover.png",
			alt: "Gabriela, professora do Programa Ponte Américas",
			width: 1280,
			height: 720,
		},
		highlights: [
			{ label: "Viagens realizadas", value: "+200" },
			{ label: "Parques visitados", value: "15+" },
			{ label: "Horas de conteúdo", value: "+25" },
		],
	},
	modules: [
		{
			id: "planejamento-viagem",
			title: "Planejamento completo da viagem",
			description:
				"Documentação, passagens, hospedagem e tudo que você precisa organizar antes de embarcar para Orlando.",
			audience: "Mentoria Ponte Américas",
			image:
				"/images/programs-thumbnails/program-thumb-turismo-orlando.png",
			tag: "Módulo 1",
		},
		{
			id: "parques-tematicos",
			title: "Parques temáticos e atrações",
			description:
				"Estratégias para aproveitar Disney, Universal, SeaWorld e outros parques sem perder tempo em filas.",
			audience: "Aula prática",
			image:
				"/images/programs-thumbnails/program-thumb-turismo-orlando.png",
			tag: "Módulo 2",
		},
		{
			id: "gastronomia-compras",
			title: "Gastronomia e compras",
			description:
				"Melhores restaurantes, outlets, estratégias de economia e o que não pode faltar na sua mala.",
			audience: "Playbook exclusivo",
			image:
				"/images/programs-thumbnails/program-thumb-turismo-orlando.png",
			tag: "Módulo 3",
		},
		{
			id: "extras-orlando",
			title: "Além de Orlando",
			description:
				"Praias, Kennedy Space Center, passeios noturnos e experiências únicas que vão além dos parques.",
			audience: "Material bônus",
			image:
				"/images/programs-thumbnails/program-thumb-turismo-orlando.png",
			tag: "Módulo 4",
		},
	],
	ctaText: "Quero planejar minha viagem",
	ctaHref: "#pricing",
};
