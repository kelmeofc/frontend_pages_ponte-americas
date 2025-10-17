"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PrimaryButton } from "@/components/primary-button";
import { ArrowRight } from "lucide-react";

// Interfaces para os componentes
interface ProfileImageProps {
  profileImageSrc?: string;
}

interface TestimonialBaseProps {
  profileImageSrc?: string;
}

interface TextCardProps extends TestimonialBaseProps {
  message: string;
  hasEmoji?: boolean;
  emoji?: string;
}

interface ImageCardProps extends TestimonialBaseProps {
  imageUrl: string;
}

interface EmojiReactionCardProps extends TestimonialBaseProps {
  message: string;
  emoji: string;
}

// Função utilitária para formatar mensagens com quebras de linha
const formatMessage = (message: string) => {
  return message.split("<br/>").map((text, index) => (
    <span key={index}>
      {text}
      {index < message.split("<br/>").length - 1 && <br />}
    </span>
  ));
};

// Componente para a imagem de perfil
const ProfileImage = ({ profileImageSrc }: ProfileImageProps) => (
  <div className="w-8 h-8 rounded-[999px]">
    {profileImageSrc ? (
      <Image 
        src={profileImageSrc}
        alt="Foto de perfil" 
        width={32} 
        height={32}
        className="rounded-[999px] object-cover w-full h-full"
      />
    ) : (
      <div className="w-full h-full rounded-[999px] blur-[2px] bg-gray-300"></div>
    )}
  </div>
);

// Componente 1: Card de Texto Simples
const TextCard = ({ profileImageSrc, message }: TextCardProps) => {
  return (
    <div className="w-full inline-flex justify-start items-end gap-4">
      <ProfileImage profileImageSrc={profileImageSrc} />
      <div className="flex-1 pl-3.5 pr-4 pt-2 pb-2.5 bg-zinc-100 rounded-tl-2xl rounded-tr-2xl rounded-bl rounded-br-2xl flex justify-start items-start overflow-hidden">
        <div className="w-full justify-center text-neutral-900 text-lg font-normal leading-normal">
          {formatMessage(message)}
        </div>
      </div>
    </div>
  );
};

// Componente 2: Card de Imagem
const ImageCard = ({ profileImageSrc, imageUrl }: ImageCardProps) => {
  return (
    <div className="w-full inline-flex justify-start items-end gap-4">
      <ProfileImage profileImageSrc={profileImageSrc} />
      <div className="flex-1 rounded-lg flex justify-start items-center overflow-hidden">
        <Image 
          src={imageUrl} 
          alt="Depoimento visual" 
          width={300} 
          height={245} 
          className="w-full h-60 object-cover"
        />
      </div>
    </div>
  );
};

// Componente 3: Card de Texto com Reação em Emoji
const EmojiReactionCard = ({ profileImageSrc, message, emoji }: EmojiReactionCardProps) => {
  return (
    <div className="w-full inline-flex justify-start items-end gap-4">
      <div className="pb-4 flex justify-start items-center gap-2.5">
        <ProfileImage profileImageSrc={profileImageSrc} />
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-start">
        <div className="w-full pl-3.5 pr-4 pt-2 pb-2.5 bg-zinc-100 rounded-tl-2xl rounded-tr-2xl rounded-bl rounded-br-2xl inline-flex justify-start items-start overflow-hidden">
          <div className="w-full justify-center text-neutral-900 text-lg font-normal leading-normal">
            {formatMessage(message)}
          </div>
        </div>
        <div className="pl-2 flex flex-col justify-start items-start gap-2.5">
          <div className="w-8 h-7 bg-zinc-100 rounded-[20px] outline outline-offset-[-1px] outline-white flex flex-col justify-center items-center">
            <div className="justify-center text-black text-base font-normal leading-normal">
              {emoji}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function BarberTestimonialsSection() {
  return (
		<section id="barber-testimonials" className="w-full py-14 bg-neutral-50">
			<Container className="flex flex-col justify-start items-center gap-8">
				<div className="px-4 md:px-48 flex flex-col justify-start items-center">
					<h2 className="text-center justify-center text-stone-900 text-3xl md:text-4xl font-semibold leading-tight md:leading-[57.60px]">
						Profissionais de Beleza Aprovam
					</h2>
				</div>

				<div className="w-full flex flex-col md:flex-row justify-between items-start gap-8">
					{/* Coluna 1 */}
					<div className="w-full md:w-1/3 flex flex-col justify-start items-start gap-5">
						<TextCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-1.png"
							message="Sempre fui meio perfeccionista com meu trabalho. Ficava remoendo quando um corte não ficava como eu imaginava. Tem um tempo que venho usando uma ferramenta chamada PandaMi. No começo achei que era besteira, mas um cliente comentou que tinha visto na internet sobre análise de rosto pra corte de cabelo. Resolvi testar<br/><br/>A coisa funciona mesmo. Tira foto, analisa o formato do rosto e sugere uns cortes com explicação do porquê !"
						/>
						<ImageCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-1.png"
							imageUrl="/lp/images/barber-testimonials-section/testimonial-col-1.png"
						/>
						<EmojiReactionCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-1.png"
							message="Semana passada veio um rapaz aqui que tava desempregado, tinha entrevista de emprego. Queria um corte que passasse seriedade. Saber que ajudei de alguma forma e olhar o semblante do cliente com o resultado<br/><br/>Hoje em dia uso em quase todos os clientes. Me sinto mais confiante no que estou fazendo!!😍😍"
							emoji="❤️"
						/>
					</div>

					{/* Coluna 2 */}
					<div className="w-full md:w-1/3 flex flex-col justify-center items-start gap-5">
						<div className="flex flex-col justify-center items-end gap-5 w-full">
							<EmojiReactionCard
								profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-2.png"
								message="Resolvi experimentar com uma cliente que sempre reclamava que nunca conseguia um corte que ficasse bom nela. A análise mostrou que o formato do rosto dela pedia um tipo de corte específico. <br/><br/>Expliquei pra ela, mostrei as sugestões. Ela topou tentar. O resultado foi muito além do que eu esperava. <br/><br/>Ela saiu daqui radiante, postou no Instagram, marcou o salão. Veio um monte de gente nova por causa disso. Agora uso sempre 🐼🐼😍<br/><br/><br/>Me ajuda muito na consulta, principalmente com clientes novas que eu não conheço o gosto. Minha autoestima profissional melhorou bastante. <br/><br/>Não fico mais naquela insegurança!!"
								emoji="❤️"
							/>
						</div>
						<div className="flex flex-col justify-center items-end gap-5 w-full">
							<EmojiReactionCard
								profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-2-col-2.png"
								message="Testei com um senhor de uns 50 anos que queria renovar o visual. A análise sugeriu uns cortes que eu nunca teria pensado. Expliquei pra ele como cada um ia funcionar, mostrei que um deles ia tirar uns anos da aparência dele. Fizemos o corte seguindo a sugestão. O resultado foi impressionante. O cara rejuvenesceu mesmo!! <br/><br/>Desde então uso regularmente. Me dá uma base técnica que eu não tinha antes. Os clientes ficam impressionados quando explico o porquê de cada sugestão."
								emoji="❤️"
							/>
						</div>
					</div>

					{/* Coluna 3 */}
					<div className="w-full md:w-1/3 flex flex-col justify-center items-start gap-5">
						<TextCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-3.png"
							message={
								"Depois de 20 anos cortando cabelo, achava que já sabia tudo. Mas sempre tinha aquela inseguranca com alguns tipos de rosto. Minha filha, que trabalha com marketing digital, me falou sobre uma ferramenta de inteligência artificial pro visagismo. Confesso que torci o nariz no começo. Mas resolvi dar uma chance. E que bom que dei <br/><br/>Ontem mesmo veio uma moça aqui, recém separada, querendo mudar totalmente o visual.<br/>Ela me disse que queria começar uma nova fase sabe<br/><br/><br/>Usei a analise do PandaMi, mostrei pra ela as opções que apareceram. Uma delas era perfeita pro que ela queria: algo que deixasse ela mais confiante e moderna. O corte com a coloração deixou ela MARAVILHOSAAA"
							}
						/>
						<ImageCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-3.png"
							imageUrl="/lp/images/barber-testimonials-section/testimonial-col-3.png"
						/>
						<EmojiReactionCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-3.png"
							message="🥹🥹 Ela chorou quando se viu no espelho<br/><br/>Disse que há anos não se sentia tão bonita!!  Momentos assim me lembram por que escolhi essa profissão."
							emoji="❤️"
						/>
						<TextCard
							profileImageSrc="/lp/images/barber-testimonials-section/NEXTJS/image-pfp-1-col-3.png"
							message="E ter uma ferramenta que me ajuda a entregar isso é muitooo GRATIFICANTE !!!!!❤️"
						/>
					</div>
				</div>

				<Link href="https://app.pandami.com.br/auth/sign-up/">
					<PrimaryButton
						variant="default"
						size="lg"
						icon={<ArrowRight className="w-5 h-5" />}
						iconPosition="right"
					>
						Quero no meu salão
					</PrimaryButton>
				</Link>
			</Container>
		</section>
	);
}