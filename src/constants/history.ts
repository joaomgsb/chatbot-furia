export interface HistorySection {
  id: string;
  title: string;
  period: string;
  content: string;
}

export interface FuriaMusic {
  title: string;
  description: string;
  url: string;
}

export interface TeamRanking {
  valve: number;
  hltv: number;
  lastUpdate: string;
}

export interface Rankings {
  masculino: TeamRanking;
  feminino: TeamRanking;
}

export const FURIA_HISTORY: HistorySection[] = [
  {
    id: 'fundacao',
    title: 'A Fundação',
    period: '2017',
    content: `A FURIA Esports nasceu em agosto de 2017, em Uberlândia (MG), pela união de Jaime Pádua, André Akkari e Cristian "Cris" Guedes. A ideia era colocar o Brasil no topo dos esports, começando pelo CS:GO. Com uma filosofia agressiva, a FURIA apostou na garotada, formando talentos como KSCERATO e yuurih, que se tornaram pilares da equipe.`
  },
  {
    id: 'primeiros-passos',
    title: 'Primeiros Passos e Reconhecimento',
    period: '2019',
    content: `Em 2019, a FURIA garantiu vaga no seu primeiro Major, o IEM Katowice, e logo foi vice-campeã da ECS Season 7. O crescimento foi tão rápido que atraiu fãs como o Neymar Jr. para a torcida! 😎`
  },
  {
    id: 'ascensao-internacional',
    title: 'Ascensão Internacional',
    period: '2020',
    content: `2020 foi o ano da consagração! A FURIA conquistou campeonatos como DreamHack Masters Spring e IEM New York, chegando ao 3º lugar no ranking da HLTV e sendo eleita a Melhor Organização de Esports do Brasil!`
  },
  {
    id: 'consolidacao',
    title: 'Consolidação e Expansão',
    period: '2021-2022',
    content: `Em 2021, a FURIA se tornou a primeira equipe brasileira a integrar o grupo de parceiros da ESL Pro League, garantindo vaga fixa nas principais competições de CS:GO do mundo. A organização também expandiu sua atuação para outros jogos, como League of Legends (CBLOL), Valorant, Rainbow Six, Rocket League e Apex Legends. Em 2022, chegou às semifinais do IEM Rio Major, com uma campanha histórica em casa!`
  },
  {
    id: 'era-moderna',
    title: 'Era Moderna e Expansão Global',
    period: '2023-2025',
    content: `Em 2023, a FURIA trouxe o ícone FalleN para o time. Em 2024, a organização se aventurou no futebol 7 e na Porsche Cup Brasil, com Neymar como presidente honorário! Hoje, a FURIA é uma das maiores organizações de esports do mundo, com sedes em várias cidades e parcerias com marcas gigantes! 💪`
  }
];

export const FURIA_MUSIC: FuriaMusic[] = [
  {
    title: 'Rap da FURIA',
    description: 'O rap mais icônico da FURIA! Uma música que virou hino da torcida',
    url: 'https://www.youtube.com/watch?v=WFEtDqLLv84'
  },
  {
    title: 'chelo',
    description: 'Uma homenagem ao talento do jogador chelo 🎮',
    url: 'https://www.youtube.com/watch?v=xKgI7In8u0I'
  },
  {
    title: 'YEKINDAR',
    description: 'Celebrando a chegada do craque letão para a FURIA ⭐',
    url: 'https://www.youtube.com/watch?v=JJNaXwqcCrU'
  },
  {
    title: 'molodoy',
    description: 'Uma música especial para o jovem talento cazaque da FURIA 🎯',
    url: 'https://www.youtube.com/watch?v=DslwR10LiIA'
  }
];

export const FURIA_ACHIEVEMENTS = {
  titles: [
    'DreamHack Masters Spring 2020',
    'ESL Pro League Season 12',
    'IEM New York 2020',
    'Intel Extreme Masters XVI – Fall: North America',
    'Elisa Masters Espoo 2023'
  ],
  awards: [
    'Melhor Organização de Esports do Brasil (2020)',
    'Melhor Organização de Esports do Brasil (2021)',
    'Top 5 Maiores Organizações de Esports do Mundo (2022)'
  ],
  milestones: [
    'Primeira organização brasileira no Acordo de Louvre da ESL',
    'Semifinalista do IEM Rio Major 2022',
    'Expansão para múltiplas modalidades de esports',
    'Presença global com centros em 4 continentes',
    'Parceria com grandes marcas globais',
    'Entrada no futebol 7 (Kings League) e automobilismo (Porsche Cup)'
  ]
};

export const FURIA_RANKINGS: Rankings = {
  masculino: {
    valve: 18,
    hltv: 16,
    lastUpdate: '26/04/2025'
  },
  feminino: {
    valve: 77,
    hltv: 185,
    lastUpdate: '26/04/2025'
  }
}; 