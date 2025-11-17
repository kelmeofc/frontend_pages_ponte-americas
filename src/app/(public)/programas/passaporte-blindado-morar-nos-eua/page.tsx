import { ProgramPage } from "@/components/pages/programs-page/passaporte-blindado-page";

import type { INavItem, IActionButtons } from "@/types/header";



export default function Home() {
	
	// Constantes de navegação específicas para a Landing Page
	const LP_NAVIGATION_ITEMS: INavItem[] = [
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
	const LP_ACTION_BUTTONS: IActionButtons = {
		member: {
			href: "/members",
			text: "JÁ SOU ALUNO",
			variant: "outline",
			icon: <></>,
			mobileIcon: <></>,
		},
		cta: {
			href: "#pricing",
			text: "COMEÇAR AGORA",
			variant: "default",
			icon: <></>,
			mobileIcon: <></>,
		},
	};

	return <ProgramPage navItems={LP_NAVIGATION_ITEMS} actionButtons={LP_ACTION_BUTTONS} />;
}
