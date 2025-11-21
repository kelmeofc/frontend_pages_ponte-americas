import { ProgramPage } from "@/components/pages/programs-page/program-page.view";

import { LP_NAVIGATION_ITEMS, LP_ACTION_BUTTONS, heroSectionProps, mentorSectionProps, journeySectionProps, icebreakerSectionProps, comparisonSectionProps, pricingSectionProps } from "@/common/constants/programas/tipos-de-visto-e-processos-page.constants";

export default function Home() {
	
	return <ProgramPage 
		navItems={LP_NAVIGATION_ITEMS} 
		actionButtons={LP_ACTION_BUTTONS}
		heroSection={heroSectionProps}
		mentorSection={mentorSectionProps}
		journeySection={journeySectionProps}
		icebreakerSection={icebreakerSectionProps}
		comparisonSection={comparisonSectionProps}
		pricingSection={pricingSectionProps}
		programId="tipos-de-visto-e-processos"
	/>
}
