export interface InsuranceProduct {
  name: string;
  basePremium: number;
  coverages: string[];
  description: string;
}

export interface InsuranceCompany {
  id: string;
  name: string;
  logoPath: string;
  products: InsuranceProduct[];
}

export const insuranceCompanies: { [key: string]: InsuranceCompany[] } = {
  travel: [
    {
      id: "fidelidade",
      name: "Fidelidade",
      logoPath: "/logos/fidelidade.svg",
      products: [
        {
          name: "Global Travel",
          basePremium: 30,
          coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos", "Responsabilidade Civil"],
          description: "Seguro de viagem global com cobertura completa para qualquer destino."
        }
      ]
    },
    {
      id: "generali-tranquilidade",
      name: "Generali Tranquilidade",
      logoPath: "/logos/generali-tranquilidade.svg",
      products: [
        {
          name: "Travel Safe",
          basePremium: 32,
          coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos", "Responsabilidade Civil"],
          description: "Seguro de viagem completo com assistência 24/7."
        }
      ]
    },
    {
      id: "ageas",
      name: "Ageas",
      logoPath: "/logos/ageas.svg",
      products: [
        {
          name: "World Travel",
          basePremium: 28,
          coverages: ["Assistência Médica", "Bagagem", "Cancelamento", "Atrasos"],
          description: "Seguro de viagem mundial com coberturas abrangentes."
        }
      ]
    }
  ],
  life: [
    {
      id: "fidelidade",
      name: "Fidelidade",
      logoPath: "/logos/fidelidade.svg",
      products: [
        {
          name: "Vida Mais",
          basePremium: 45,
          coverages: ["Morte", "Invalidez", "Doenças Graves", "Hospitalização"],
          description: "Seguro de vida completo com coberturas extensivas para toda a família."
        }
      ]
    },
    {
      id: "generali-tranquilidade",
      name: "Generali Tranquilidade",
      logoPath: "/logos/generali-tranquilidade.svg",
      products: [
        {
          name: "Vida Tranquila",
          basePremium: 40,
          coverages: ["Morte", "Invalidez", "Doenças Graves"],
          description: "Seguro de vida que oferece tranquilidade para o seu futuro."
        }
      ]
    },
    {
      id: "ageas",
      name: "Ageas",
      logoPath: "/logos/ageas.svg",
      products: [
        {
          name: "Vida Protect",
          basePremium: 42,
          coverages: ["Morte", "Invalidez", "Doenças Graves"],
          description: "Proteção financeira para si e para a sua família em caso de imprevistos."
        }
      ]
    }
  ],
  health: [
    {
      id: "fidelidade",
      name: "Fidelidade",
      logoPath: "/logos/fidelidade.svg",
      products: [
        {
          name: "Multicare Plus",
          basePremium: 80,
          coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental", "Oftalmologia"],
          description: "O plano de saúde mais completo do mercado com acesso à rede Multicare."
        }
      ]
    },
    {
      id: "generali-tranquilidade",
      name: "Generali Tranquilidade",
      logoPath: "/logos/generali-tranquilidade.svg",
      products: [
        {
          name: "Saúde Tranquila",
          basePremium: 65,
          coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos"],
          description: "Plano de saúde completo com atendimento personalizado."
        }
      ]
    },
    {
      id: "ageas",
      name: "Ageas",
      logoPath: "/logos/ageas.svg",
      products: [
        {
          name: "Médis Premium",
          basePremium: 75,
          coverages: ["Hospitalização", "Consultas", "Exames", "Medicamentos", "Dental"],
          description: "Plano de saúde premium com cobertura completa para toda a família."
        }
      ]
    }
  ],
  auto: [
    {
      id: "fidelidade",
      name: "Fidelidade",
      logoPath: "/logos/fidelidade.svg",
      products: [
        {
          name: "Auto Premium",
          basePremium: 500,
          coverages: ["Responsabilidade Civil", "Danos Próprios", "Assistência em Viagem", "Proteção de Ocupantes", "Veículo de Substituição"],
          description: "Seguro automóvel completo com as melhores coberturas do mercado."
        }
      ]
    },
    {
      id: "generali-tranquilidade",
      name: "Generali Tranquilidade",
      logoPath: "/logos/generali-tranquilidade.svg",
      products: [
        {
          name: "Auto Seguro",
          basePremium: 450,
          coverages: ["Responsabilidade Civil", "Danos Próprios", "Assistência em Viagem", "Proteção de Ocupantes"],
          description: "Proteção abrangente para o seu veículo com assistência 24/7."
        }
      ]
    },
    {
      id: "ageas",
      name: "Ageas",
      logoPath: "/logos/ageas.svg",
      products: [
        {
          name: "Auto Protect",
          basePremium: 475,
          coverages: ["Responsabilidade Civil", "Danos Próprios", "Assistência em Viagem", "Proteção Jurídica"],
          description: "Seguro automóvel flexível adaptado às suas necessidades."
        }
      ]
    }
  ]
}; 