import { Mail, Phone, Clock, Instagram, Facebook, Linkedin } from "lucide-react"
import { Container } from "./ui/container"
import Link from "next/link"
import Image from "next/image"
import { SOCIAL_LINKS } from "@/common/constants"

export default function Footer() {
  return (
		<footer className="py-16 bg-white border-t border-gray-200">
			<Container>
				<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
					{/* Logo e descrição */}
					<div className="mb-8 md:mb-0 md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
						<div className="flex items-center mb-6">
							<Image
								src="/images/svg/ponteamericas-logo-title-dark.svg"
								alt="Ponte Américas Logo"
								width={50}
								height={50}
								className="h-10 w-auto"
							/>
						</div>
						<p className="text-sm text-gray-600 mb-6 max-w-sm">
							O Ponte Américas é sua ponte para os Estados Unidos. Um programa completo que te prepara para viver, trabalhar e prosperar nos EUA, evitando os erros que custam milhares de dólares.
						</p>
						<p className="text-xs text-gray-500">
							© 2025 Ponte Américas - Todos os direitos
							reservados.
						</p>
					</div>

					{/* Links de Navegação */}
					<div className="mb-8 md:mb-0 text-center md:text-left">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 md:after:left-0 after:right-0 md:after:right-auto after:mx-auto md:after:mx-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Institucional
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link
									href="/#home"
									className="hover:text-primary transition-colors"
								>
									Início
								</Link>
							</li>
							<li>
								<Link
									href="/#about-us"
									className="hover:text-primary transition-colors"
								>
									Nosso time
								</Link>
							</li>
							<li>
								<Link
									href="/#courses"
									className="hover:text-primary transition-colors"
								>
									Cursos
								</Link>
							</li>
							<li>
								<Link
									href="/#testimonials"
									className="hover:text-primary transition-colors"
								>
									Depoimentos
								</Link>
							</li>

							<li>
								<Link
									href="/coming-soon"
									className="hover:text-primary transition-colors"
								>
									Começar Agora
								</Link>
							</li>

							<li>
								<Link
									href="/blog"
									className="hover:text-primary transition-colors"
								>
									Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Links de Informações */}
					<div className="mb-8 md:mb-0 text-center md:text-left">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 md:after:left-0 after:right-0 md:after:right-auto after:mx-auto md:after:mx-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Informações
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link
									href="/politica-de-privacidade"
									className="hover:text-primary transition-colors"
								>
									Política de Privacidade
								</Link>
							</li>
							<li>
								<Link
									href="/termos-de-uso"
									className="hover:text-primary transition-colors"
								>
									Termos de Uso
								</Link>
							</li>
						</ul>
					</div>

					{/* Informações de Contato e Redes Sociais */}
					<div className="text-center md:text-left">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 md:after:left-0 after:right-0 md:after:right-auto after:mx-auto md:after:mx-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Contato
						</h3>
						<ul className="space-y-2 text-sm text-gray-600 mb-6">
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Mail className="h-4 w-4" />
								<a
									href="mailto:contato@ponteamericas.com"
									className="hover:text-primary transition-colors"
								>
									contato@ponteamericas.com
								</a>
							</li>
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Phone className="h-4 w-4" />
								<a
									href="tel:+13214296742"
									className="hover:text-primary transition-colors"
								>
									+1 321 429-6742
								</a>
							</li>
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Clock className="h-4 w-4" />
								<span>Seg-Sex: 9h às 18h (Brasil)</span>
							</li>
						</ul>
						
						{/* Redes Sociais */}
						<div>
							<h4 className="text-sm font-medium mb-3 text-gray-700">Siga-nos</h4>
							<div className="flex gap-3 justify-center md:justify-start">
								<a
									href={SOCIAL_LINKS.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors"
									aria-label="Siga-nos no Instagram"
								>
									<Instagram className="h-4 w-4" />
								</a>
								<a
									href={SOCIAL_LINKS.facebook}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors"
									aria-label="Siga-nos no Facebook"
								>
									<Facebook className="h-4 w-4" />
								</a>
								<a
									href={SOCIAL_LINKS.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors"
									aria-label="Siga-nos no LinkedIn"
								>
									<Linkedin className="h-4 w-4" />
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* logo title */}
				<div className="mt-16 text-center">
					<Image
						src="/images/svg/ponteamericas-logo-title-footer.svg"
						alt="Ponte Américas"
						width={1200}
						height={200}
						className="w-full h-auto"
						aria-hidden="true"
					/>
				</div>
			</Container>
		</footer>
	);
}

