"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Globe } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeaderLogo } from "./header-logo";
import { PrimaryButton } from "@/components/primary-button";
import type { INavItem, IHeaderProps, HeaderVariant } from "@/types/header";
import { useState, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Constantes compartilhadas entre desktop e mobile
const NAVIGATION_ITEMS: INavItem[] = [
	{
		title: "Início",
		href: "/#home",
	},
	{
		title: "Programas",
		href: "/#programs",
	},
	{
		title: "Mentores",
		href: "/#team",
	},
	{
		title: "Depoimentos",
		href: "/#testimonials",
	},
	{
		title: "Blog",
		href: "/blog",
	},
];

// Constantes para os botões de ação
const ACTION_BUTTONS = {
	member: {
		href: "/members",
		text: "JÁ SOU ALUNO",
		variant: "outline" as const,
	},
	cta: {
		href: "/#programs",
		text: "COMEÇAR AGORA",
		variant: "default" as const,
		icon: <ArrowRight className="h-4 w-4" />,
		mobileIcon: <ArrowRight className="h-5 w-5" />,
	},
} as const;

// Constantes para idiomas
const LANGUAGE_OPTIONS = {
	current: "pt-BR",
	display: "Português",
	options: [{ value: "pt-BR", label: "PT" }],
} as const;

export function Header({
	navItems = NAVIGATION_ITEMS,
	actionButtons = ACTION_BUTTONS,
	languageOptions = LANGUAGE_OPTIONS,
	variant = "default",
}: IHeaderProps) {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("");

	// Normalizar valores resolvidos para evitar tipos opcionais durante o render
	const resolvedNavItems = navItems ?? NAVIGATION_ITEMS;
	const resolvedActionButtons = actionButtons ?? ACTION_BUTTONS;
	const resolvedLanguageOptions = languageOptions ?? LANGUAGE_OPTIONS;

	// Controlar efeito de scroll
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Detectar seção ativa baseado no scroll
	useEffect(() => {
		if (typeof window === "undefined") return;

		const sections = resolvedNavItems
			.map((item) => {
				// Suporta tanto "/#section" (home) quanto "#section" (LP)
				if (item.href.startsWith("/#")) {
					return item.href.substring(2);
				} else if (item.href.startsWith("#")) {
					return item.href.substring(1);
				}
				return null;
			})
			.filter(Boolean) as string[];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(`#${entry.target.id}`);
					} else if (activeSection === `#${entry.target.id}`) {
						setActiveSection("");
					}
				});
			},
			{
				rootMargin: "-20% 0px -70% 0px",
				threshold: 0,
			}
		);

		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		return () => observer.disconnect();
	}, [resolvedNavItems, activeSection]);

	// Controlar o body quando o menu mobile está aberto
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			{/* Header Principal - Desktop e Mobile */}
			<header
				className={`w-screen border-b border-gray-800 py-4 fixed top-0 left-0 right-0 z-50 ${
					variant === "title-only"
						? "bg-black backdrop-blur-md"
						: isScrolled
						? "bg-black/90 backdrop-blur-md"
						: "bg-black/60 backdrop-blur-xs"
				}`}
			>
				<Container>
					<div className="flex items-center justify-between w-full">
						{/* Logo */}
						<div className="lg:flex-1">
							<HeaderLogo />
						</div>

						{/* Nav Items - Apenas Desktop */}
						{variant !== "title-only" && (
							<nav className="hidden lg:flex items-center justify-center flex-1 gap-5">
								{resolvedNavItems.map((item) => {
									// Suporta tanto "/#section" (home) quanto "#section" (LP)
									const isAnchorLink = item.href.startsWith("/#") || item.href.startsWith("#");
									const isActive = isAnchorLink
										? activeSection === (item.href.startsWith("/#") ? item.href.substring(1) : item.href)
										: pathname === item.href;
									return (
										<Link
											key={item.title}
											href={item.href}
											data-testid={`menu-${item.title.toLowerCase()}`}
											className="relative text-base font-normal text-white hover:text-gray-200 transition-colors duration-300 group"
										>
											{item.title}
											<span
												className={`absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-red-500 to-indigo-500 transition-all duration-300 ease-out ${
													isActive ? "w-full" : "w-0 group-hover:w-full"
												}`}
											/>
										</Link>
									);
								})}
							</nav>
						)}

						{/* Botões e controles - Desktop */}
						<div className="hidden lg:flex items-center flex-1 justify-end gap-4">
							{variant !== "title-only" && (
								<>
									{/* Dropdown de idioma */}
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<button className="flex items-center text-base font-normal text-white hover:text-primary">
												<Globe className="h-4 w-4 mr-1" />
											</button>
										</DropdownMenuTrigger>
										<DropdownMenuContent
											align="center"
											className="w-fit text-center"
										>
											<DropdownMenuItem className="text-center w-fit">
												{resolvedLanguageOptions.display}
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</>
							)}

							{/* Botões de ação - Desktop */}
							<PrimaryButton
								href={resolvedActionButtons.member.href}
								icon={resolvedActionButtons.member.icon}
								size="sm"
								variant={actionButtons.member.variant}
								className="px-3 whitespace-nowrap"
							>
								{actionButtons.member.text}
							</PrimaryButton>

							{variant !== "title-only" && (
								<PrimaryButton
									icon={resolvedActionButtons.cta.icon}
									size="sm"
									href={resolvedActionButtons.cta.href}
									variant={resolvedActionButtons.cta.variant}
									className="px-3 whitespace-nowrap"
								>
									{actionButtons.cta.text}
								</PrimaryButton>
							)}
						</div>

						{/* Menu Mobile Toggle */}
						{variant !== "title-only" ? (
							<div className="lg:hidden flex items-center gap-2">
								<button
									className="p-2 rounded-md hover:bg-slate-900 border-2 border-slate-800 text-white"
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
								>
									<Menu className="size-6 text-white" />
								</button>
							</div>
						) : (
							<div className="lg:hidden flex items-center">
								<PrimaryButton
									href={resolvedActionButtons.member.href}
									icon={resolvedActionButtons.member.mobileIcon}
									size="sm"
									variant={actionButtons.member.variant}
									className="px-3 whitespace-nowrap"
								>
									{actionButtons.member.text}
								</PrimaryButton>
							</div>
						)}
					</div>
				</Container>
			</header>

			{/* Menu Mobile Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
					<Container>
						<div className="flex justify-between items-center py-4 border-b border-gray-800">
							<HeaderLogo />
							<div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-gray-900/50">
								<Globe className="h-5 w-5 mr-3 text-gray-400" />
								<select
									className="w-full bg-transparent text-white focus:outline-none"
									defaultValue={resolvedLanguageOptions.current}
								>
									{resolvedLanguageOptions.options.map((option) => (
										<option
											key={option.value}
											value={option.value}
											className="bg-gray-900"
										>
											{option.label}
										</option>
									))}
								</select>
							</div>
							<button
								className="p-2 rounded-full hover:bg-gray-800 text-white"
								onClick={() => setIsMobileMenuOpen(false)}
								aria-label="Fechar menu"
							>
								<X className="h-6 w-6" />
							</button>
						</div>

						<div className="py-8 overflow-y-auto h-[calc(100vh-80px)]">
							<nav className="space-y-6 mb-8">
								{resolvedNavItems.map((item) => {
									// Suporta tanto "/#section" (home) quanto "#section" (LP)
									const isAnchorLink = item.href.startsWith("/#") || item.href.startsWith("#");
									const isActive = isAnchorLink
										? activeSection === (item.href.startsWith("/#") ? item.href.substring(1) : item.href)
										: pathname === item.href;
									return (
										<div
											key={item.title}
											className="border-b border-gray-800 pb-4"
										>
											<Link
												href={item.href}
												className="text-xl font-medium text-white hover:text-gray-400 flex items-center group transition-colors duration-300"
												onClick={handleLinkClick}
											>
												{item.icon && <item.icon className="h-5 w-5 mr-2" />}
												<span className="relative inline-block">
													{item.title}
													<span
														className={`absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-red-500 to-indigo-500 transition-all duration-300 ease-out ${
															isActive ? "w-full" : "w-0 group-hover:w-full"
														}`}
													/>
												</span>
											</Link>
										</div>
									);
								})}
							</nav>

							<div className="flex  flex-col lg:flex-row mt-10 gap-2 h-fit overflow-visible z-3">
								<PrimaryButton
									className="w-full"
									variant={resolvedActionButtons.member.variant}
									size="lg"
									icon={resolvedActionButtons.member.mobileIcon}
									href={resolvedActionButtons.member.href}
								>
									{actionButtons.member.text}
								</PrimaryButton>

								<PrimaryButton
									icon={resolvedActionButtons.cta.mobileIcon}
									className="w-full"
									href={resolvedActionButtons.cta.href}
									size="lg"
									variant={resolvedActionButtons.cta.variant}
								>
									{actionButtons.cta.text}
								</PrimaryButton>
							</div>
						</div>
					</Container>
				</div>
			)}
		</>
	);
}
