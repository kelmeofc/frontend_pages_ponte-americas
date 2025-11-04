export interface ComparisonItem {
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

export const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: "Número de aulas",
    ponteAmericas: {
      value: "Mais de 100",
      hasFeature: true,
      isHighlight: true,
    },
    others: {
      value: "Entre 10 e 50",
      hasFeature: true,
    },
  },
  {
    feature: "Programas com temas variados",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: true,
    },
  },
  {
    feature: "Materiais complementares",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: true,
    },
  },
  {
    feature: "Comunidade",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: true,
    },
  },
  {
    feature: "Atualizações mensais de conteúdo",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
  {
    feature: "Plano de estudo personalizado",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
  {
    feature: "Todos os professores residentes nos EUA",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
  {
    feature: "Estratégia validada com vários alunos",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
  {
    feature: "Aulas com qualidade visual cinematográfica",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
  {
    feature: "Time dedicado à didática e qualidade de ensino",
    ponteAmericas: {
      value: "",
      hasFeature: true,
    },
    others: {
      value: "",
      hasFeature: false,
    },
  },
] as const;

export const COMPARISON_HEADERS = {
  ponteAmericas: "PONTE AMÉRICAS",
  others: "Curso de esquina",
} as const;
