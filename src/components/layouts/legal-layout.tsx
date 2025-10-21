import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";
import { LegalPageConfig } from "@/types/legal-metadata";
import { FileText, Shield } from "lucide-react";

const getIcon = (iconName: string) => {
  const icons = {
    FileText: <FileText className="h-6 w-6" />,
    Shield: <Shield className="h-6 w-6" />,
  };
  return icons[iconName as keyof typeof icons] || null;
};

interface LegalLayoutProps {
  children: ReactNode;
  config: LegalPageConfig;
  currentPath?: string;
}

export default function LegalLayout({
  children,
  config,
  currentPath
}: LegalLayoutProps) {
  return (
		<div className="min-h-screen bg-background mt-40">
			{/* Breadcrumb simples */}
			<div className="absolute top-16 left-0 w-full border-b bg-muted/30">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<nav className="flex items-center space-x-2 text-sm text-muted-foreground py-4">
						<Link href="/" className="hover:text-foreground transition-colors">
							Início
						</Link>
						<span>/</span>
						{currentPath && (
							<>
								<span className="text-foreground font-medium">
									{config?.title}
								</span>
							</>
						)}
					</nav>
				</div>
			</div>

			{/* Conteúdo principal */}
			<main className="py-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Cabeçalho do documento */}
					<div className="mb-8">
						<div className="flex items-center gap-3 mb-4">
							{config?.icon && (
								<div className="p-2 rounded-lg bg-primary/10 text-primary">
									{getIcon(config.icon)}
								</div>
							)}
							<div>
								<h1 className="text-3xl font-bold tracking-tight">
									{config?.title || "Documento Legal"}
								</h1>
								{config?.lastUpdated && (
									<p className="text-sm text-muted-foreground mt-1">
										Última atualização: {config.lastUpdated}
									</p>
								)}
							</div>
						</div>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{config?.description || "Documento legal da Pandami"}
						</p>
					</div>

					{/* Conteúdo do documento */}
					<div className="space-y-6">{children}</div>

					{/* Footer do documento */}
					<div className="mt-12 pt-8 border-t">
						<div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
							<div className="text-sm text-muted-foreground">
								<p>
									Em caso de dúvidas sobre este documento, entre em contato
									conosco.
								</p>
							</div>
							<div className="flex gap-2">
								<Button variant="outline" size="sm" asChild>
									<Link href="mailto:contato@pandami.com.br">Contato</Link>
								</Button>
								<Button variant="outline" size="sm" asChild>
									<Link href="mailto:lgpd@pandami.com.br">DPO</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
