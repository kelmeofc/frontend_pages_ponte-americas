export interface IDidaticTopic {
  id: string;
  label: string;
  videoUrl: string;
  icon?: string;
}

export const DIDATIC_TOPICS: readonly IDidaticTopic[] = [
  {
    id: "planejamento",
    label: "PLANEJAMENTO",
    videoUrl: "/videos/planejamento.mp4", // Substitua pelo caminho real do vídeo
    icon: "target"
  },
  {
    id: "visto-documentacao",
    label: "VISTO E DOCUMENTAÇÃO",
    videoUrl: "/videos/visto-documentacao.mp4", // Substitua pelo caminho real do vídeo
    icon: "file-text"
  },
  {
    id: "pisei-eua",
    label: "PISEI NOS EUA",
    videoUrl: "/videos/pisei-eua.mp4", // Substitua pelo caminho real do vídeo
    icon: "plane"
  },
  {
    id: "educacao",
    label: "EDUCAÇÃO",
    videoUrl: "/videos/educacao.mp4", // Substitua pelo caminho real do vídeo
    icon: "graduation-cap"
  },
  {
    id: "imoveis-alugueis",
    label: "IMÓVEIS E ALUGUÉIS",
    videoUrl: "/videos/imoveis-alugueis.mp4", // Substitua pelo caminho real do vídeo
    icon: "home"
  },
  {
    id: "emprego-negocios",
    label: "EMPREGO E NEGÓCIOS",
    videoUrl: "/videos/emprego-negocios.mp4", // Substitua pelo caminho real do vídeo
    icon: "briefcase"
  },
  {
    id: "veiculos-transporte",
    label: "VEÍCULOS E TRANSPORTE",
    videoUrl: "/videos/veiculos-transporte.mp4", // Substitua pelo caminho real do vídeo
    icon: "car"
  },
  {
    id: "saude",
    label: "SAÚDE",
    videoUrl: "/videos/saude.mp4", // Substitua pelo caminho real do vídeo
    icon: "heart"
  }
];
