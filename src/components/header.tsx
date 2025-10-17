'use client'

import Link from "next/link"
import Image from "next/image"
import { Globe, Menu, ChevronDown, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/primary-button"
import { ThemeToggle } from "@/components/theme-toggle"
import type { INavItem } from "@/types/header"
import { useState, useEffect, useRef } from "react"

const navItems: INavItem[] = [
  {
    title: "Início",
    href: "/#home",
  },
  {
    title: "Benefícios",
    href: "/#benefits",
  },
  {
    title: "Planos",
    href: "/#pricing",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const languageButtonRef = useRef<HTMLButtonElement>(null)

  // Controlar efeito de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Controlar o body quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
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
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }
  
  const handleDropdownToggle = (dropdown: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  }

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
						<div className="flex-1">
							<Link
								href="/"
								className="flex items-center"
								onClick={handleLinkClick}
							>
								<Image
									src="/images/svg/logo.svg"
									alt="Pandami Logo"
									width={160}
									height={24}
									className="h-6 lg:h-8 w-auto"
								/>
							</Link>
						</div>

						{/* Nav Items - Apenas Desktop */}
						<nav className="hidden lg:flex items-center justify-center flex-1">
							{navItems.map((item) => (
								<div key={item.title} className="mr-8 last:mr-0">
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
						<div className="hidden lg:flex items-center space-x-3 flex-1 justify-end">
							<ThemeToggle />

							<div className="relative">
								<button
									ref={languageButtonRef}
									className="rounded-full bg-transparent hover:bg-accent p-2"
									onClick={(e) => handleDropdownToggle("language", e)}
									aria-label="Selecionar idioma"
									aria-expanded={activeDropdown === "language"}
									aria-haspopup="listbox"
								>
									<Globe className="h-5 w-5" />
								</button>
							</div>

							<Link href="https://app.pandami.com.br/auth/sign-in/">
								<PrimaryButton
									icon={<ArrowRight className="h-4 w-4" />}
									size="sm"
                  variant="outline"
									className="px-3 whitespace-nowrap"
								>
									ACESSAR PAINEL
								</PrimaryButton>
							</Link>

							<Link href="https://app.pandami.com.br/auth/sign-up/">
								<PrimaryButton
									icon={<ArrowRight className="h-4 w-4" />}
									size="sm"
									className="px-3 whitespace-nowrap"
								>
									COMEÇAR AGORA
								</PrimaryButton>
							</Link>
						</div>

						{/* Menu Mobile Toggle */}
						<div className="lg:hidden flex items-center gap-2">
							<ThemeToggle />
							<button
								className="p-2 rounded-md hover:bg-accent"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
							>
								<Menu className="h-6 w-6" />
							</button>
						</div>
					</div>
				</Container>
			</header>

			{/* Menu Mobile Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-50 bg-background">
					<Container>
						<div className="flex justify-between items-center py-4 border-b">
							<Link
								href="/"
								className="flex items-center"
								onClick={handleLinkClick}
							>
								<Image
									src="/logo.svg"
									alt="Pandami Logo"
									width={160}
									height={24}
									className="h-6 lg:h-8 w-auto"
								/>
							</Link>
							<div className="flex items-center border rounded-md px-3 py-2 bg-card">
								<Globe className="h-5 w-5 mr-3 text-muted-foreground" />
								<select
									className="w-full bg-transparent focus:outline-hidden"
									defaultValue="pt-BR"
								>
									<option value="pt-BR">Português</option>
								</select>
							</div>
							<button
								className="p-2 rounded-full hover:bg-accent"
								onClick={() => setIsMobileMenuOpen(false)}
								aria-label="Fechar menu"
							>
								<X className="h-6 w-6" />
							</button>
						</div>

						<div className="py-8 overflow-y-auto h-[calc(100vh-80px)]">
							<nav className="space-y-6 mb-8">
								{navItems.map((item) => (
									<div key={item.title} className="border-b border-border pb-4">
										<Link
											href={item.href}
											className="text-xl font-medium hover:text-primary flex items-center"
											onClick={handleLinkClick}
										>
											{item.icon && <item.icon className="h-5 w-5 mr-2" />}
											{item.title}
										</Link>
									</div>
								))}
							</nav>

							<div className="space-y-4 mt-10">
								{/* Substitui os botões do mobile pelos do desktop */}
								<Link
									href="https://app.pandami.com.br/auth/sign-in/"
									onClick={handleLinkClick}
									className="block"
								>
									<PrimaryButton 
                    className="w-full" 
                    variant="outline" 
                    size="lg"
                    icon={<ArrowRight className="h-5 w-5" />}
                  >
										ACESSAR PAINEL
									</PrimaryButton>
								</Link>

								<Link
									href="https://app.pandami.com.br/auth/sign-up/"
									onClick={handleLinkClick}
									className="block"
								>
									<PrimaryButton
										icon={<ArrowRight className="h-5 w-5" />}
										className="w-full"
										size="lg"
									>
										COMEÇAR AGORA
									</PrimaryButton>
								</Link>
							</div>
						</div>
					</Container>
				</div>
			)}

			{/* Mega Dropdown para Desktop */}
			{activeDropdown && activeDropdown !== "language" && (
				<div
					className="fixed top-[72px] left-0 w-full z-40 border-t border-border bg-background/95 backdrop-blur-lg shadow-lg"
					onClick={() => setActiveDropdown(null)}
				>
					<Container>
						<div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
							{/* Aqui você pode adicionar o conteúdo específico do dropdown ativo */}
							<div className="col-span-1">
								<h3 className="font-medium text-lg mb-4">{activeDropdown}</h3>
								<div className="space-y-3">
									<Link
										href="#"
										className="block text-muted-foreground hover:text-primary"
										onClick={handleLinkClick}
									>
										Item de exemplo 1
									</Link>
									<Link
										href="#"
										className="block text-muted-foreground hover:text-primary"
										onClick={handleLinkClick}
									>
										Item de exemplo 2
									</Link>
									<Link
										href="#"
										className="block text-muted-foreground hover:text-primary"
										onClick={handleLinkClick}
									>
										Item de exemplo 3
									</Link>
								</div>
							</div>
							{/* Adicione mais colunas conforme necessário */}
						</div>
					</Container>
				</div>
			)}

			{/* Dropdown de Idioma */}
			{activeDropdown === "language" && (
				<div 
          className="fixed z-50 bg-background/95 backdrop-blur-md border border-border rounded-md shadow-lg w-30"
          onClick={(e) => e.stopPropagation()}
          role="listbox"
          style={{
            top: languageButtonRef.current 
              ? languageButtonRef.current.getBoundingClientRect().bottom + 8 
              : 82,
            left: languageButtonRef.current 
              ? languageButtonRef.current.getBoundingClientRect().left - 16
              : 'auto',
          }}
        >
          <div className="py-2 w-full">
            <button
              className="w-full text-center px-2 py-1 hover:bg-accent"
              onClick={() => setActiveDropdown(null)}
              role="option"
              aria-selected="true"
            >
              Português
            </button>
          </div>
        </div>
			)}
		</>
	);
}

