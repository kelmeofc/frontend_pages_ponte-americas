import SiteLayout from "@/components/layouts/site-layout";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <SiteLayout 
            actionButtons={{
                member: {
                    href: "/members",
                    text: "JÁ SOU ALUNO",
                    variant: "outline",
                    icon: undefined,
                    mobileIcon: undefined
                },
                cta: {
                    href: "/lp",
                    text: "COMEÇAR AGORA",
                    variant: "default",
                    icon: undefined,
                    mobileIcon: undefined
                }
            }}
            languageOptions={undefined}
        >
            {children}
        </SiteLayout>
    );
}
 