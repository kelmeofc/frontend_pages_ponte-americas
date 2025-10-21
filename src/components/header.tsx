"use client";

import Link from "next/link";
import { Menu, ChevronDown, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { HeaderLogo } from "./header-logo";
import { HeaderActions } from "./header-actions";
import { HeaderLanguageDropdown } from "./header-language-dropdown";
import type { INavItem } from "@/types/header";
import { useState, useEffect } from "react";

const navItems: INavItem[] = [
	{
		title: "Início",
		href: "/#home",
	},
	{
		title: "Cursos",
		href: "/#courses",
	},
	{
		title: "Nosso time",
		href: "/#about-us",
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

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);

	// Controlar efeito de scroll
	useEffect(() => {
		if (typeof window === 'undefined') return;
		
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	// Fechar dropdown ao clicar fora
	useEffect(() => {
		if (!activeDropdown) return;
		const handleClickOutside = () => setActiveDropdown(null);
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [activeDropdown]);

	const handleLinkClick = () => {
		setIsMobileMenuOpen(false);
		setActiveDropdown(null);
	};

	const handleDropdownToggle = (dropdown: string, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
	};

	return (
		<>
			{/* Header Principal - Desktop e Mobile */}
			<header
				className={`w-screen border-b border-gray-800 py-4 fixed top-0 left-0 right-0 z-50 ${
					isScrolled
						? "bg-black/80 backdrop-blur-md"
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
						<nav className="hidden lg:flex items-center justify-center flex-1 gap-5">
							{navItems.map((item) => (
								<div key={item.title}>
									{item.hasDropdown ? (
										<button
											className="flex items-center text-base font-medium text-foreground hover:text-primary"
											onClick={(e) => handleDropdownToggle(item.title, e)}
										>
											{item.icon && <item.icon className="h-5 w-5 mr-2" />}
											{item.title}
											<ChevronDown className="h-4 w-4 ml-1" />
										</button>
									) : (
										<Link
											href={item.href}
											data-testid={`menu-${item.title.toLowerCase()}`}
											className="text-base font-normal text-white hover:text-primary flex items-center"
											onClick={handleLinkClick}
										>
											{item.icon && <item.icon className="h-5 w-5 mr-2" />}
											{item.title}
										</Link>
									)}
								</div>
							))}
						</nav>

						{/* Botões e controles - Desktop */}
						<div className="hidden lg:flex items-center flex-1 justify-end gap-4">
							<HeaderActions variant="desktop" />
						</div>

						{/* Menu Mobile Toggle */}
						<div className="lg:hidden flex items-center gap-2">
							<button
								className="p-2 rounded-md hover:bg-slate-900 border-2 border-slate-800 text-white"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
							>
								<Menu className="size-6 text-white" />
							</button>
						</div>
					</div>
				</Container>
			</header>

			{/* Menu Mobile Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md">
					<Container>
						<div className="flex justify-between items-center py-4 border-b border-gray-800">
							<HeaderLogo />
							<HeaderLanguageDropdown variant="mobile" />
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
								{navItems.map((item) => (
									<div
										key={item.title}
										className="border-b border-gray-800 pb-4"
									>
										<Link
											href={item.href}
											className="text-xl font-medium text-white hover:text-primary flex items-center"
											onClick={handleLinkClick}
										>
											{item.icon && <item.icon className="h-5 w-5 mr-2" />}
											{item.title}
										</Link>
									</div>
								))}
							</nav>

							<div className="mt-10">
								<HeaderActions variant="mobile" onLinkClick={handleLinkClick} />
							</div>
						</div>
					</Container>
				</div>
			)}
		</>
	);
}
