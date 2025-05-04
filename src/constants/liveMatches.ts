import { create } from 'zustand';

export interface LiveMatch {
  tournament: string;
  status: 'ao_vivo' | 'encerrado' | 'em_breve';
  map: string;
  score: {
    furia: number;
    opponent: number;
  };
  opponent: {
    name: string;
  };
  players: {
    furia: Array<{
      nickname: string;
      name: string;
      kills: number;
      deaths: number;
      adr: number;
    }>;
    opponent: Array<{
      nickname: string;
      name: string;
      kills: number;
      deaths: number;
      adr: number;
    }>;
  };
  round: number;
  roundWinner: string | null;
  lastEvent: string | null;
}

interface LiveMatchStore {
  match: LiveMatch;
  updateMatch: () => void;
  startMatch: () => void;
  stopMatch: () => void;
}

const INITIAL_MATCH: LiveMatch = {
  tournament: "BLAST.tv Austin Major 2025",
  status: "ao_vivo",
  map: "Inferno",
  score: {
    furia: 9,
    opponent: 7
  },
  opponent: {
    name: "Vitality"
  },
  players: {
    furia: [
      {
        nickname: "KSCERATO",
        name: "Kaike Cerato",
        kills: 21,
        deaths: 15,
        adr: 95.5
      },
      {
        nickname: "yuurih",
        name: "Yuri Boian",
        kills: 18,
        deaths: 14,
        adr: 88.2
      },
      {
        nickname: "FalleN",
        name: "Gabriel Toledo",
        kills: 16,
        deaths: 13,
        adr: 75.8
      },
      {
        nickname: "YEKINDAR",
        name: "Mareks Gaļinskis",
        kills: 15,
        deaths: 16,
        adr: 72.3
      },
      {
        nickname: "molodoy",
        name: "Danil Golubenko",
        kills: 14,
        deaths: 15,
        adr: 70.1
      }
    ],
    opponent: [
      {
        nickname: "Zywoo",
        name: "Mathieu Herbaut",
        kills: 20,
        deaths: 14,
        adr: 90.2
      },
      {
        nickname: "ropz",
        name: "Robin Kool",
        kills: 17,
        deaths: 15,
        adr: 82.5
      },
      {
        nickname: "flameZ",
        name: "Shahar Shushan",
        kills: 15,
        deaths: 16,
        adr: 75.8
      },
      {
        nickname: "apEX",
        name: "Dan Madesclaire",
        kills: 13,
        deaths: 17,
        adr: 68.4
      },
      {
        nickname: "mezii",
        name: "William Merriman",
        kills: 12,
        deaths: 18,
        adr: 65.7
      }
    ]
  },
  round: 23,
  roundWinner: null,
  lastEvent: null
};

// Eventos possíveis durante a partida
const MATCH_EVENTS = [
  "KSCERATO acerta headshot em Zywoo com AK-47! 🎯",
  "yuurih clutch 1v2! Inacreditável! 🔥",
  "FalleN com AWP duplo! O professor está on fire! 🎯",
  "YEKINDAR entry kill! Abrindo o bomb! 💣",
  "molodoy segura o retake! Que jogada! 🛡️",
  "Zywoo tenta clutch mas KSCERATO não deixa! 💪",
  "Eco round da FURIA! Economia em dia! 💰",
  "FalleN com call perfeito! IGL masterclass! 🧠",
  "Rush B executado com perfeição! 🏃",
  "Retake da FURIA! Todos vivos! ✨"
];

export const useLiveMatch = create<LiveMatchStore>((set, get) => {
  let matchInterval: NodeJS.Timeout | null = null;

  const updateMatch = () => {
    const currentMatch = get().match;
    
    // Chance de alguém fazer kill
    const makeKill = () => {
      const teams = ['furia', 'opponent'] as const;
      const killerTeam = teams[Math.floor(Math.random() * 2)];
      const victimTeam = killerTeam === 'furia' ? 'opponent' : 'furia';
      
      const killer = currentMatch.players[killerTeam][Math.floor(Math.random() * 5)];
      const victim = currentMatch.players[victimTeam][Math.floor(Math.random() * 5)];
      
      killer.kills++;
      victim.deaths++;
      
      // Atualiza ADR
      killer.adr = Number(((killer.kills * 100) / currentMatch.round).toFixed(1));
    };

    // 70% de chance de alguém fazer kill
    if (Math.random() < 0.7) {
      makeKill();
    }

    // 20% de chance de terminar o round
    if (Math.random() < 0.2) {
      const winner = Math.random() < 0.6 ? 'FURIA' : currentMatch.opponent.name;
      if (winner === 'FURIA') {
        currentMatch.score.furia++;
      } else {
        currentMatch.score.opponent++;
      }
      currentMatch.round++;
      currentMatch.roundWinner = winner;
      currentMatch.lastEvent = MATCH_EVENTS[Math.floor(Math.random() * MATCH_EVENTS.length)];
    }

    // Verifica se o jogo acabou
    if (currentMatch.score.furia === 13 || currentMatch.score.opponent === 13) {
      currentMatch.status = 'encerrado';
      if (matchInterval) {
        clearInterval(matchInterval);
        matchInterval = null;
      }
    }

    set({ match: { ...currentMatch } });
  };

  const startMatch = () => {
    if (!matchInterval) {
      matchInterval = setInterval(updateMatch, 3000); // Atualiza a cada 3 segundos
    }
  };

  const stopMatch = () => {
    if (matchInterval) {
      clearInterval(matchInterval);
      matchInterval = null;
    }
  };

  return {
    match: INITIAL_MATCH,
    updateMatch,
    startMatch,
    stopMatch
  };
}); 