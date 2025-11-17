"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, memo } from "react";
import gsap from "gsap";
import { Instagram } from "lucide-react";
import { PROGRAMS_DATA } from "@/common/constants/programs";

// Animation constants
const TILT_INTENSITY = 10;
const TILT_DURATION = 0.3;
const FLIP_DURATION = 0.6;
const PERSPECTIVE = 1000;

interface InstagramProfile {
  handle: string;
  followers: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  poster?: string;
  instagram: InstagramProfile;
  programIds: string[]; // IDs dos programas em PROGRAMS_DATA
}

const TEAM_MEMBERS: TeamMember[] = [
	{
		id: "caua-cunha",
		name: "Cauã Cunha",
		role: "Fundador do Ponte Américas",
		poster: "/images/team-members-cards/caua-card-cover.png",
		instagram: {
			handle: "@ponteamericas",
			followers: "3K",
		},
		programIds: ["passaporte-blindado", "tipos-visto"],
	},

	{
		id: "lucas-zoltan",
		name: "Lucas Zoltan",
		role: "Do Zero à 1ª Lamborghini com Mercado Digital nos EUA",
		poster: "/images/team-members-cards/zoltan-card-cover.png",
		instagram: {
			handle: "@lucaszoltan",
			followers: "1.2M",
		},
		programIds: ["mercado-digital-americano"],
	},
	{
		id: "turistorlando",
		name: "Gabriela",
		role: "Influencer Turista Orlando",
		poster: "/images/team-members-cards/gabriela-card-cover.png",
		instagram: {
			handle: "@turistorlando",
			followers: "490K",
		},
		programIds: ["turismo-orlando"],
	},
	{
		id: "irmoes-eua",
		name: "Os Irmões EUA",
		role: "High School",
		poster: "/images/team-members-cards/irmoes-card-cover.png",
		instagram: {
			handle: "@irmoeseua",
			followers: "21K",
		},
		programIds: ["faculdade-americana"],
	},
];

const TeamCard = memo(({ member }: { member: TeamMember }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFlipped = useRef(false);
  const isFlipping = useRef(false);

  // Buscar programas do membro usando os IDs
  const memberPrograms = member.programIds
    .map(id => PROGRAMS_DATA.find(program => program.id === id))
    .filter(Boolean);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    /**
     * Tilt effect: Card tilts following mouse movement
     * Only active when card is on front side
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (isFlipping.current || isFlipped.current) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -TILT_INTENSITY;
      const rotateY = ((x - centerX) / centerX) * TILT_INTENSITY;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: TILT_DURATION,
        ease: "power2.out",
        transformPerspective: PERSPECTIVE,
      });
    };

    /**
     * Reset tilt when mouse leaves card area
     */
    const handleMouseLeave = () => {
      if (isFlipping.current || isFlipped.current) return;

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    /**
     * Flip card on click (toggle between front and back)
     */
    const handleClick = () => {
      if (isFlipping.current) return;
      
      isFlipped.current = !isFlipped.current;
      isFlipping.current = true;

      const targetRotationY = isFlipped.current ? 180 : 0;

      // Kill any ongoing tilt animations for clean flip
      gsap.killTweensOf(card);
      gsap.to(card, {
        rotationX: 0,
        rotationY: targetRotationY,
        duration: FLIP_DURATION,
        ease: "power2.inOut",
        transformPerspective: PERSPECTIVE,
        onComplete: () => {
          isFlipping.current = false;
        },
      });
    };

    /**
     * Keyboard accessibility: Enter or Space to flip card
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    // Attach event listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);
    container.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("keydown", handleKeyDown);
      gsap.killTweensOf(card);
    };
  }, []);

  const posterSrc = member.poster ?? "/images/video-placeholder-2.png";
  const instagramUrl = `https://instagram.com/${member.instagram.handle.replace('@', '')}`;

  return (
		<div
			ref={containerRef}
			className="w-full lg:flex-1 aspect-6/11 md:aspect-auto md:min-h-[550px] lg:min-h-[600px] perspective-1000 cursor-pointer"
			style={{ perspective: "1000px" }}
			role="button"
			tabIndex={0}
			aria-label={`Clique para ver mais sobre ${member.name}`}
		>
			<div
				ref={cardRef}
				className="relative w-full h-full"
				style={{
					transformStyle: "preserve-3d",
					transition: "transform 0.6s",
				}}
			>
				{/* Front Side */}
				<article
					className="absolute inset-0 rounded-lg overflow-hidden outline outline-gray-600 backface-hidden"
					style={{ backfaceVisibility: "hidden" }}
					role="group"
					aria-label={`Card do membro ${member.name}`}
				>
					<Image
						src={posterSrc}
						alt={member.name}
						fill
						className="object-cover"
					/>

					<div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/0 to-black/80" />

					<div className="absolute left-0 right-0 bottom-6 px-4 text-center">
						<h3 className="text-white text-2xl font-semibold font-clash-display leading-8 drop-shadow-md">
							{member.name}
						</h3>
						<p className="text-gray-400 text-base font-medium font-sans mt-1">
							{member.role}
						</p>
						<p className="text-gray-500 text-xs mt-3 uppercase tracking-wide">
							Clique para girar
						</p>
					</div>
				</article>

				{/* Back Side */}
				<article
					className="absolute inset-0 rounded-lg overflow-hidden outline outline-gray-600 bg-linear-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col backface-hidden"
					style={{
						backfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
				>
					<div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
						<h3 className="text-white text-xl font-semibold font-clash-display mb-4">
							{member.name}
						</h3>

						{/* Instagram Profile Link */}
						<Link
							href={instagramUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="block mb-6 p-4 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-colors"
							onClick={(e) => e.stopPropagation()}
							aria-label={`Visitar perfil do Instagram de ${member.name}`}
						>
							<div className="flex items-center gap-2 mb-2">
								<Instagram className="w-5 h-5 text-pink-500" />
								<span className="text-white font-semibold">
									{member.instagram.handle}
								</span>
							</div>
							<p className="text-gray-300 text-sm">
								<span className="text-2xl font-bold text-white">
									{member.instagram.followers}
								</span>{" "}
								<span className="text-gray-400">seguidores</span>
							</p>
						</Link>

						{/* Programs List */}
						<div>
							<h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
								Programas
							</h4>
							<div className="space-y-3">
								{memberPrograms.map((program) => (
									<Link
										key={program!.id}
										href={
											program!.url ||
											"/programas/passaporte-blindado-morar-nos-eua"
										}
										className="block bg-white/5 rounded-md border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-colors"
										onClick={(e) => e.stopPropagation()}
										aria-label={`Ver programa: ${program!.title}`}
									>
										<div className="relative w-full aspect-video bg-gray-800">
											<Image
												src={
													program!.image || "/images/video-placeholder-1.png"
												}
												alt={`Thumbnail do programa ${program!.title}`}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
												className="object-cover"
											/>
										</div>
										<p className="text-gray-300 text-xs p-2">
											{program!.title}
										</p>
									</Link>
								))}
							</div>
						</div>
					</div>

					<div className="text-center text-xs text-gray-500 mt-4 pt-4 border-t border-white/10">
						Clique novamente para voltar
					</div>
				</article>
			</div>
		</div>
	);
});

TeamCard.displayName = "TeamCard";

const TeamSectionComponent = () => {
  return (
    <section 
      id="team" 
      className="w-full py-20" 
      data-animate-section
      aria-labelledby="team-heading"
    >
      <div className="flex flex-col items-center gap-8 px-4">
        <div className="text-center">
          <h2 
            id="team-heading"
            className="text-white font-semibold font-clash-display uppercase leading-tight"
          >
            o time que vai te guiar durante toda a sua jornada
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mt-2">
            Todos eles vieram como turistas para os EUA e conquistaram o Green
            Card
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const TeamSection = memo(TeamSectionComponent);
TeamSection.displayName = "TeamSection";

export default TeamSection;


