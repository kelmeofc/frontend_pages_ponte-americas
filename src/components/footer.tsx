import { Mail, Phone, Clock } from "lucide-react"
import { Container } from "./ui/container"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
		<footer className="py-16 bg-white border-t border-gray-200">
			<Container>
				<div className="flex flex-col md:flex-row justify-between items-center md:items-start">
					{/* Logo e descrição */}
					<div className="mb-8 md:mb-0 md:w-1/3 text-center md:text-left flex flex-col items-center md:items-start">
						<div className="flex items-center mb-6">
							<Image
								src="/logo.svg"
								alt="Pandami Logo"
								width={50}
								height={50}
								className="h-10 w-auto"
							/>
						</div>
						<p className="text-sm text-gray-600 mb-6 max-w-sm">
							Primeiro surgiu a tesoura, depois nasceu o secador de cabelo e a
							máquina de corte e agora, mais de 2 décadas depois, temos o
							próximo grande salto tecnológico para os salões. Nós somos a
							Pandami!
						</p>
						<p className="text-xs text-gray-500">
							© {new Date().getFullYear()} Pandami - Todos os direitos
							reservados.
						</p>
					</div>

					{/* Links de Navegação */}
					<div className="mb-8 md:mb-0 text-center md:text-left">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 md:after:left-0 after:right-0 md:after:right-auto after:mx-auto md:after:mx-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Pandami
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
									href="/#why"
									className="hover:text-primary transition-colors"
								>
									Por que Visagismo
								</Link>
							</li>
							<li>
								<Link
									href="/#benefits"
									className="hover:text-primary transition-colors"
								>
									Benefícios
								</Link>
							</li>
							<li>
								<Link
									href="#pricing"
									className="hover:text-primary transition-colors"
								>
									Planos profissionais
								</Link>
							</li>

							<li>
								<Link
									href="https://app.pandami.com.br/auth/sign-up"
									className="hover:text-primary transition-colors"
								>
									Quero me cadastrar
								</Link>
							</li>

							<li>
								<Link
									href="https://app.pandami.com.br/auth/sign-in"
									className="hover:text-primary transition-colors"
								>
									Acessar painel
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

					{/* Informações de Contato */}
					<div className="text-center md:text-left">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 md:after:left-0 after:right-0 md:after:right-auto after:mx-auto md:after:mx-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Atendimento
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Mail className="h-4 w-4" />
								<a
									href="mailto:suporte@pandami.com.br"
									className="hover:text-primary transition-colors"
								>
									suporte@pandami.com.br
								</a>
							</li>
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Phone className="h-4 w-4" />
								<a
									href="tel:08008789746"
									className="hover:text-primary transition-colors"
								>
									0800 878 9746
								</a>
							</li>
							<li className="flex items-center gap-2 justify-center md:justify-start">
								<Clock className="h-4 w-4" />
								<span>Seg-Sex: 8h às 18h</span>
							</li>
						</ul>
					</div>
				</div>
				{/* logo title */}
				<div className="mt-16 text-center">
					<Image
						src="/pandami-logo-title-footer.svg"
						alt="Pandami"
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

