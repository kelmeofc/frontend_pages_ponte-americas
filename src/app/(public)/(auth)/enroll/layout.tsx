import SiteLayout from "@/components/layouts/site-layout";

export default function EnrollLayout({ children }: { children: React.ReactNode }) {
    return (
			<SiteLayout
				variant="title-only"
				footerVariant="simplified"
				navItems={[]}
				actionButtons={{
					member: {
						href: "/members",
						text: "JÁ SOU ALUNO",
						variant: "outline",
						icon: undefined,
						mobileIcon: undefined,
					},
					cta: {
						href: "/programas/passaporte-blindado-morar-nos-eua",
						text: "COMEÇAR AGORA",
						variant: "default",
						icon: undefined,
						mobileIcon: undefined,
					},
				}}
				languageOptions={undefined}
			>
				{children}
			</SiteLayout>
		);
}
