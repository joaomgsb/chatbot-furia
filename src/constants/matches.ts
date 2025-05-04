export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  prizePool: string;
  type: 'Major' | 'Premier' | 'Elite' | 'Open';
  status: 'upcoming' | 'ongoing' | 'finished';
  team: 'masculino' | 'feminino';
}

export interface Match {
  id: string;
  tournamentId: string;
  opponent: string;
  date: string;
  time: string;
  map?: string;
  score?: string;
  status: 'scheduled' | 'live' | 'finished';
}

export const TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    name: 'PGL Astana 2025',
    startDate: '2025-05-10',
    endDate: '2025-05-18',
    location: 'Astana, Cazaquistão',
    prizePool: '$1,250,000',
    type: 'Major',
    status: 'upcoming',
    team: 'masculino'
  },
  {
    id: 't2',
    name: 'IEM Dallas 2025',
    startDate: '2025-05-19',
    endDate: '2025-05-25',
    location: 'Dallas, EUA',
    prizePool: '$250,000',
    type: 'Elite',
    status: 'upcoming',
    team: 'masculino'
  },
  {
    id: 't3',
    name: 'BLAST.tv Austin Major 2025 Stage 2',
    startDate: '2025-06-07',
    endDate: '2025-06-10',
    location: 'Austin, EUA',
    prizePool: '$500,000',
    type: 'Premier',
    status: 'upcoming',
    team: 'masculino'
  },
  {
    id: 't4',
    name: 'PGL Bucharest 2025',
    startDate: '2025-04-06',
    endDate: '2025-04-09',
    location: 'Bucareste, Romênia',
    prizePool: '$500,000',
    type: 'Major',
    status: 'finished',
    team: 'masculino'
  },
  {
    id: 't5',
    name: 'ESL Impact League Season 7 Finals',
    startDate: '2025-05-23',
    endDate: '2025-05-25',
    location: 'Dallas, EUA',
    prizePool: '$150,000',
    type: 'Elite',
    status: 'upcoming',
    team: 'feminino'
  }
];

export const MATCHES: Match[] = [
  {
    id: 'm1',
    tournamentId: 't1',
    opponent: 'a definir',
    date: '2025-05-10',
    time: 'TBD',
    status: 'scheduled'
  },
  {
    id: 'm2',
    tournamentId: 't2',
    opponent: 'a definir',
    date: '2025-05-19',
    time: 'TBD',
    status: 'scheduled'
  },
  {
    id: 'm3',
    tournamentId: 't3',
    opponent: 'a definir',
    date: '2025-06-07',
    time: 'TBD',
    status: 'scheduled'
  },
  {
    id: 'm4',
    tournamentId: 't4',
    opponent: 'The MongolZ',
    date: '2025-04-09',
    time: 'TBD',
    score: '0 : 2',
    status: 'finished'
  },
  {
    id: 'm5',
    tournamentId: 't4',
    opponent: 'Virtus.pro',
    date: '2025-04-08',
    time: 'TBD',
    score: '0 : 2',
    status: 'finished'
  },
  {
    id: 'm6',
    tournamentId: 't4',
    opponent: 'Complexity',
    date: '2025-04-07',
    time: 'TBD',
    score: '1 : 2',
    status: 'finished'
  },
  {
    id: 'm7',
    tournamentId: 't4',
    opponent: 'Betclic',
    date: '2025-04-06',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm8',
    tournamentId: 't5',
    opponent: 'MIBR fe',
    date: '2025-04-11',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm9',
    tournamentId: 't5',
    opponent: 'Messitas',
    date: '2025-04-02',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm10',
    tournamentId: 't5',
    opponent: 'Quem Sao Elas',
    date: '2025-03-27',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm11',
    tournamentId: 't5',
    opponent: 'Bounty Hunters fe',
    date: '2025-03-19',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm12',
    tournamentId: 't5',
    opponent: 'thekillaz fe',
    date: '2025-03-13',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm13',
    tournamentId: 't5',
    opponent: 'Atrix',
    date: '2025-03-06',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  },
  {
    id: 'm14',
    tournamentId: 't5',
    opponent: 'Brave Bears',
    date: '2025-02-26',
    time: 'TBD',
    score: '2 : 0',
    status: 'finished'
  }
];
