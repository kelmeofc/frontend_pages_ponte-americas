"use client";

import Image from "next/image";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  poster?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "caua-cunha",
    name: "Cauã Cunha",
    role: "Fundador do Ponte Américas",
    poster: "/images/video-placeholder-2.png",
  },
  {
    id: "gabriela",
    name: "Gabriela",
    role: "Influencer Turista Orlando",
    poster: "/images/video-placeholder-2.png",
  },
  {
    id: "samuel-h",
    name: "Samuel Holzhacker",
    role: "Os Irmãos EUA",
    poster: "/images/video-placeholder-2.png",
  },
  {
    id: "caua-obeid",
    name: "Cauã Obeid",
    role: "Os Irmãos EUA",
    poster: "/images/video-placeholder-2.png",
  },
];

export const TeamSection = () => {
  return (
    <section id="team" className="w-full py-20">
      <div className="flex flex-col items-center gap-8 px-4">
        <div className="text-center">
          <h2 className="text-white font-semibold font-clash-display uppercase leading-tight">
            o time que vai te guiar durante toda a sua jornada
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mt-2">
            Todos eles vieram como turistas para os EUA e conquistaram o Green
            Card
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-4">
          {TEAM_MEMBERS.map((member) => {
            const posterSrc = member.poster ?? "/images/video-placeholder-2.png";

            return (
              <article
              key={member.id}
              className="flex-1 h-[420px] md:h-[550px] relative rounded-lg overflow-hidden outline outline-gray-600"
              role="group"
              aria-label={`Card do membro ${member.name}`}
              tabIndex={0}
            >
              <Image src={posterSrc} alt={member.name} fill className="object-cover" />
             

              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/80" />

              <div className="absolute left-0 right-0 bottom-6 px-4 text-center">
                <h3 className="text-white text-2xl font-semibold font-clash-display leading-8 drop-shadow-md">
                  {member.name}
                </h3>
                <p className="text-white text-base font-medium font-sans mt-1">
                  {member.role}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;


