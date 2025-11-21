/**
 * Program and Course Types
 * 
 * This file contains all type definitions related to programs, courses,
 * mentors, and course modules used across the application.
 */

/**
 * Represents a mentor/teacher profile
 */
export interface MentorProfile {
	/** Full name of the mentor */
	name: string;
	/** Professional role or title */
	role: string;
	/** Profile image information */
	image: {
		/** Image source URL */
		src: string;
		/** Alt text for accessibility */
		alt: string;
		/** Image width in pixels */
		width: number;
		/** Image height in pixels */
		height: number;
	};
	/** Key achievements or statistics to highlight */
	highlights: Array<{
		/** Label for the highlight (e.g., "Dreams fulfilled") */
		label: string;
		/** Value to display (e.g., "+150") */
		value: string;
	}>;
}

/**
 * Represents a single course module or lesson
 */
export interface CourseModule {
	/** Unique identifier for the module */
	id: string;
	/** Module title */
	title: string;
	/** Detailed description of module content */
	description: string;
	/** Target audience or module type (e.g., "Practical class", "Exclusive playbook") */
	audience: string;
	/** Cover image URL for the module */
	image: string;
	/** Module tag/label (e.g., "Module 1", "Bonus") */
	tag: string;
}

/**
 * Props for the Hero Section component
 */
export interface HeroSectionProps {
	/** Main title text */
	title: string;
	/** Subtitle or secondary text */
	subtitle: string;
	/** Call-to-action button text */
	ctaText: string;
	/** Call-to-action button link */
	ctaHref: string;
	/** Video source URL */
	videoSrc: string;
	/** Video poster/thumbnail image URL */
	posterImage: string;
}

/**
 * Props for the Mentor/Teacher Section component
 */
export interface MentorSectionProps {
	/** Mentor profile information */
	mentor: MentorProfile;
	/** Array of course modules to display */
	modules: CourseModule[];
	/** Call-to-action button text */
	ctaText: string;
	/** Call-to-action button link */
	ctaHref: string;
}

export type JourneyIcon =
	| "clock"
	| "idCard"
	| "plane"
	| "home"
	| "car"
	| "heart"
	| "graduationCap"
	| "creditCard";

export interface JourneyStep {
	/** Unique identifier for the journey step */
	id: string;
	/** Step title */
	title: string;
	/** Step description */
	description: string;
	/** Icon identifier displayed alongside the step */
	icon: JourneyIcon;
}

export interface JourneySectionProps {
	/** Eyebrow/tagline displayed above the heading */
	eyebrow: string;
	/** Heading text preceding the highlighted word */
	title: string;
	/** Word rendered with gradient emphasis */
	highlightedWord: string;
	/** Supporting paragraph for the section */
	description: string;
	/** CTA label */
	ctaText: string;
	/** CTA target link */
	ctaHref: string;
	/** Journey timeline steps */
	steps: JourneyStep[];
}

export interface IcebreakerItem {
	/** Unique identifier for the icebreaker card */
	id: string;
	/** Description of the challenge or moment */
	text: string;
	/** Representational emoji */
	emoji: string;
	/** Path to supporting SVG illustration */
	svgPath: string;
}

export interface IcebreakerSectionProps {
	/** Section heading */
	title: string;
	/** Icon displayed next to the heading */
	icon: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	/** Icebreaker cards */
	items: IcebreakerItem[];
}

export interface ComparisonRowData {
	feature: string;
	ponteAmericas: {
		value: string;
		hasFeature: boolean;
		isHighlight?: boolean;
	};
	others: {
		value: string;
		hasFeature: boolean;
	};
}

export interface ComparisonSectionProps {
	title: string;
	highlightedTitle: string;
	ponteAmericasHeader: string;
	othersHeader: string;
	rows: ReadonlyArray<ComparisonRowData>;
}

export interface PricingFeature {
	title: string;
	description: string;
}

export interface PricingPlan {
	id: string;
	name: string;
	badge: {
		text: string;
		color: string;
	};
	rating: {
		score: number;
		reviews: number;
	};
	pricing?: {
		originalPrice: string;
		installments: string;
		price: string;
		cents: string;
	};
	title?: string;
	subtitle?: string;
	features: ReadonlyArray<PricingFeature>;
	buttonText: string;
}

export interface PricingSectionProps {
	title: {
		main: string;
		highlight: string;
		subtitle: string;
	};
	plans: ReadonlyArray<PricingPlan>;
}

/**
 * Complete props for a Program Page
 */
export interface ProgramPageData {
	/** Unique program identifier (slug) */
	programId: string;
	/** Hero section configuration */
	heroSection: HeroSectionProps;
	/** Mentor section configuration */
	mentorSection: MentorSectionProps;
	/** Journey section configuration */
	journeySection: JourneySectionProps;
	/** Icebreaker section configuration */
	icebreakerSection: IcebreakerSectionProps;
	/** Comparison section configuration */
	comparisonSection: ComparisonSectionProps;
	/** Pricing section configuration */
	pricingSection: PricingSectionProps;
}
