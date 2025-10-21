export interface IDidaticTopic {
  id: string;
  label: string;
  videoUrl: string;
  placeholder: string;
  icon?: string;
}

export const DIDATIC_TOPICS: readonly IDidaticTopic[] = [
  {
    id: "planejamento",
    label: "PLANEJAMENTO",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "target"
  },
  {
    id: "visto-documentacao",
    label: "VISTO E DOCUMENTAÇÃO",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "file-text"
  },
  {
    id: "pisei-eua",
    label: "PISEI NOS EUA",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "plane"
  },
  {
    id: "educacao",
    label: "EDUCAÇÃO",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "graduation-cap"
  },
  {
    id: "imoveis-alugueis",
    label: "IMÓVEIS E ALUGUÉIS",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "home"
  },
  {
    id: "emprego-negocios",
    label: "EMPREGO E NEGÓCIOS",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "briefcase"
  },
  {
    id: "veiculos-transporte",
    label: "VEÍCULOS E TRANSPORTE",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "car"
  },
  {
    id: "saude",
    label: "SAÚDE",
    videoUrl: "/videos/placeholder.mp4", // Substitua pelo caminho real do vídeo
    placeholder: "/images/video-placeholder.png",
    icon: "heart"
  }
];
