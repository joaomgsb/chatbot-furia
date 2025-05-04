import { useState, useCallback, useEffect } from 'react';
import OpenAI from 'openai';
import { Message } from '../types';
import { GREETING_MESSAGES, FURIA_HYPE_MESSAGES, FURIA_CATCHPHRASES } from '../constants/presetMessages';
import { TOURNAMENTS, MATCHES } from '../constants/matches';
import { FURIA_HISTORY, FURIA_ACHIEVEMENTS, FURIA_MUSIC, FURIA_RANKINGS, HistorySection } from '../constants/history';
import { v4 as uuidv4 } from '../utils/uuid';
import { useLiveMatch, LiveMatch } from '../constants/liveMatches';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT_BASE = `Você é um chatbot oficial da FURIA Esports, uma das principais organizações de esports do Brasil.

Fale sempre em português do Brasil, de forma amigável, divertida e informal — como um verdadeiro torcedor apaixonado pela FURIA. Use gírias comuns do CS quando fizer sentido, e mantenha o bom humor.

IMPORTANTE: 
- Ao se referir ao usuário durante a conversa, alterne entre diferentes formas como: "torcedor", "amigo", "parceiro", "guerreiro", "craque", "fera", etc. Não use sempre "furioso"
- Evite repetir a mesma forma de tratamento em mensagens consecutivas
- NUNCA use asteriscos (**) para nenhum tipo de formatação, SEMPRE use HTML
- Use a tag HTML <strong> para deixar qualquer texto em negrito
- Ao listar títulos/campeonatos, use 🏆 no início e coloque o nome em negrito com a tag <strong>
- Ao falar sobre rankings, use os emojis 🎮 para Valve e 🌎 para HLTV
- Ao listar memes ou frases icônicas, use <strong> ao invés de asteriscos
- Ao mencionar jogadas ou momentos especiais, use <strong> para destacar

Você responde perguntas relacionadas a:
- O time de CS2 masculino e feminino da FURIA
- Rankings atuais (Valve e HLTV)
- Competições, torneios e confrontos recentes
- História da organização
- Jogadores e line-ups atuais
- Memes e momentos icônicos do CS

Ao falar sobre a história da FURIA, você DEVE:
- Responder de forma concisa e direta
- Focar no período específico perguntado
- Mencionar conquistas relevantes do período
- Usar emojis para tornar o texto mais dinâmico

Ao falar sobre os jogadores, você DEVE usar EXATAMENTE este formato:

🎮 FURIA CS2 MASCULINO:
• yuurih (Yuri Boian) - Desde 2017
• KSCERATO (Kaike Cerato) - Desde 2018
• FalleN (Gabriel Toledo) - Desde 2023
• molodoy (Danil Golubenko) - Desde 2025
• YEKINDAR (Mareks Galinskis) - Stand-in desde 2025
👨‍💼 Técnico: sidde (Sidnei Macedo) - Desde 2024

👾 FURIA CS2 FEMININO:
• kaahSENSEI (Karina Takahashi) - Desde 2020
• izaa (Izabella Galle) - Desde 2020
• gabs (Gabriela Freindorfer) - Desde 2023
• bizinha (Bruna Marvila) - Desde 2024
• lulitenz (Lucia Dubra) - Desde 2024

Ao falar sobre torneios, você DEVE listar cada torneio separadamente usando EXATAMENTE este formato:

🏆 [Nome do Torneio]
📍 Local: [local]
📅 Data: [data início] a [data fim]
💰 Premiação: [valor]

IMPORTANTE:
- Cada informação DEVE estar na mesma linha que seu título
- NÃO coloque linhas em branco entre as informações do mesmo torneio
- Use apenas UMA linha em branco para separar diferentes torneios
- NUNCA use traços ou outros caracteres para separar as informações
- Ao listar jogadores, sempre inclua o nome completo entre parênteses e a data de entrada
- Para jogadores stand-in ou técnicos, especifique a função

Se não souber algo específico, seja honesto e simpático, e oriente o usuário a conferir as redes sociais oficiais da FURIA para mais novidades.

⚠️ Quando informações atualizadas sobre jogos forem fornecidas, use apenas esses dados na resposta e **não invente partidas, eventos ou placares**.`;

export const useChat = () => {
  const { match, startMatch } = useLiveMatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [liveMatchMessageId, setLiveMatchMessageId] = useState<string | null>(null);

  // Inicia o match quando o chat carrega
  useEffect(() => {
    startMatch();
  }, [startMatch]);

  // Atualiza a mensagem da partida automaticamente
  useEffect(() => {
    if (liveMatchMessageId && match) {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === liveMatchMessageId 
            ? { ...msg, content: formatLiveMatchMessage(match) }
            : msg
        )
      );
    }
  }, [match, liveMatchMessageId]);

  const formatLiveMatchMessage = useCallback((match: LiveMatch) => {
    if (match.status === 'ao_vivo') {
      const response = `<div style="background-color: #0D1117; border-radius: 12px; padding: 20px; font-family: 'Inter', sans-serif; width: 100%; margin: 0 auto;">
  <!-- Header com logos e placar -->
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;" class="header-logos">
    <div style="flex: 1; text-align: center;">
      <img src="/images/furia.png" alt="FURIA" style="width: 50px; height: 50px; object-fit: contain; margin: 0 auto;" />
      <div style="color: #FFD700; font-size: 20px; font-weight: bold; margin-top: 5px;" class="team-name">FURIA</div>
    </div>
    <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 15px 30px; border-radius: 15px; text-align: center; margin: 0 20px;" class="score-container">
      <div style="font-size: 24px; font-weight: bold; color: #000;" class="score">
        ${match.score.furia} : ${match.score.opponent}
      </div>
      <div style="font-size: 12px; color: #000; margin-top: 5px;" class="round">
        ROUND ${match.round}
      </div>
    </div>
    <div style="flex: 1; text-align: center;">
      <img src="/images/vitality.png" alt="${match.opponent.name}" style="width: 50px; height: 50px; object-fit: contain; margin: 0 auto;" />
      <div style="color: #FFF; font-size: 20px; font-weight: bold; margin-top: 5px;" class="team-name">${match.opponent.name}</div>
    </div>
  </div>

  <!-- Informações do Jogo -->
  <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 15px; margin-bottom: 20px; text-align: center;" class="game-info">
    <div style="color: #FFD700; font-size: 16px; font-weight: bold;" class="tournament">🏆 ${match.tournament}</div>
    <div style="color: #FFF; font-size: 14px; margin-top: 5px;" class="map">🗺️ ${match.map}</div>
  </div>

  <!-- Stats dos Times usando Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
    <!-- FURIA Stats -->
    <div style="background: rgba(255, 215, 0, 0.1); border-radius: 12px; padding: 15px;">
      <div style="color: #FFD700; font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;">FURIA</div>
      <div style="display: grid; gap: 10px;">
        ${match.players.furia.map(player => `
          <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 12px; min-height: 80px;" class="player-card">
            <div style="text-align: center; margin-bottom: 8px;">
              <div style="color: #FFF; font-size: 14px; font-weight: 500; margin-bottom: 4px;" class="player-name">${player.nickname}</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <img src="/images/${player.nickname.toLowerCase()}.png" alt="${player.nickname}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div style="color: #888; font-size: 12px;" class="player-stats">${player.kills}/${player.deaths} - ADR: ${player.adr}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Opponent Stats -->
    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 15px;">
      <div style="color: #FFF; font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;">${match.opponent.name}</div>
      <div style="display: grid; gap: 10px;">
        ${match.players.opponent.map(player => `
          <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 12px; min-height: 80px;" class="player-card">
            <div style="text-align: center; margin-bottom: 8px;">
              <div style="color: #FFF; font-size: 14px; font-weight: 500; margin-bottom: 4px;" class="player-name">${player.nickname}</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <img src="/images/vitality/${player.nickname.toLowerCase()}.png" alt="${player.nickname}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div style="color: #888; font-size: 12px;" class="player-stats">${player.kills}/${player.deaths} - ADR: ${player.adr}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Container para Momentos e Rounds -->
  <div style="display: grid; gap: 8px; margin-top: 20px;">
    ${match.lastEvent ? `
      <!-- Último Lance -->
      <div style="background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%); border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: center; gap: 6px; color: #000; font-weight: 600; font-size: 14px;" class="event-container">
        🎮 ${match.lastEvent}
      </div>
    ` : ''}

    ${match.roundWinner ? `
      <!-- Vencedor do Round -->
      <div style="background: ${match.roundWinner === 'FURIA' ? '#2A2000' : '#1A1A1A'}; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; justify-content: center; gap: 6px; color: ${match.roundWinner === 'FURIA' ? '#FFD700' : '#FFF'}; font-weight: 600; font-size: 14px;" class="event-container">
        🏆 ${match.roundWinner} vence o round!
      </div>
    ` : ''}
  </div>

  <!-- Footer -->
  <div style="text-align: center; color: #FFD700; font-weight: bold; margin-top: 15px; font-size: 14px;" class="footer">
    RUUUUGE COM A GENTE! 🐾🔥
  </div>
</div>

<style>
@media (max-width: 640px) {
  /* Ajustes para o header */
  .header-logos img {
    width: 40px !important;
    height: 40px !important;
  }
  .header-logos .team-name {
    font-size: 16px !important;
  }
  .score-container {
    padding: 10px 20px !important;
    margin: 0 10px !important;
  }
  .score-container .score {
    font-size: 20px !important;
  }
  .score-container .round {
    font-size: 10px !important;
  }

  /* Ajustes para as informações do jogo */
  .game-info {
    padding: 10px !important;
  }
  .game-info .tournament {
    font-size: 14px !important;
  }
  .game-info .map {
    font-size: 12px !important;
  }

  /* Ajustes para os cards dos jogadores */
  .player-card {
    padding: 8px !important;
  }
  .player-card img {
    width: 30px !important;
    height: 30px !important;
    margin-right: 8px !important;
  }
  .player-card .player-name {
    font-size: 12px !important;
  }
  .player-card .player-stats {
    font-size: 10px !important;
  }

  /* Ajustes para os eventos */
  .event-container {
    font-size: 12px !important;
    padding: 6px 10px !important;
  }

  /* Ajustes para o footer */
  .footer {
    font-size: 12px !important;
    margin-top: 10px !important;
  }
}
</style>`;
      
      return response;
    } else if (match.status === 'encerrado') {
      const winner = match.score.furia > match.score.opponent ? 'FURIA' : match.opponent.name;
      return `<div style="background-color: #0D1117; border-radius: 12px; padding: 20px; font-family: 'Inter', sans-serif; width: 100%; margin: 0 auto;">
  <!-- Header com logos e placar -->
  <div style="text-align: center; margin-bottom: 20px;">
    <div style="color: ${winner === 'FURIA' ? '#FFD700' : '#FFF'}; font-size: 24px; font-weight: bold;">
      Partida Encerrada!
    </div>
    <div style="margin-top: 10px; font-size: 20px; color: #FFF;">
      <strong>${winner}</strong> vence por ${match.score.furia} x ${match.score.opponent}!
    </div>
  </div>

  <!-- Stats dos Times usando Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
    <!-- FURIA Stats -->
    <div style="background: rgba(255, 215, 0, 0.1); border-radius: 12px; padding: 15px;">
      <div style="color: #FFD700; font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;">FURIA</div>
      <div style="display: grid; gap: 10px;">
        ${match.players.furia.map(player => `
          <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 12px; min-height: 80px;" class="player-card">
            <div style="text-align: center; margin-bottom: 8px;">
              <div style="color: #FFF; font-size: 14px; font-weight: 500; margin-bottom: 4px;" class="player-name">${player.nickname}</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <img src="/images/${player.nickname.toLowerCase()}.png" alt="${player.nickname}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div style="color: #888; font-size: 12px;" class="player-stats">${player.kills}/${player.deaths} - ADR: ${player.adr}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Opponent Stats -->
    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 15px;">
      <div style="color: #FFF; font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;">${match.opponent.name}</div>
      <div style="display: grid; gap: 10px;">
        ${match.players.opponent.map(player => `
          <div style="background: rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 12px; min-height: 80px;" class="player-card">
            <div style="text-align: center; margin-bottom: 8px;">
              <div style="color: #FFF; font-size: 14px; font-weight: 500; margin-bottom: 4px;" class="player-name">${player.nickname}</div>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
              <img src="/images/vitality/${player.nickname.toLowerCase()}.png" alt="${player.nickname}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
              <div style="color: #888; font-size: 12px;" class="player-stats">${player.kills}/${player.deaths} - ADR: ${player.adr}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div style="text-align: center; color: ${winner === 'FURIA' ? '#FFD700' : '#FFF'}; font-weight: bold; margin-top: 20px; font-size: 14px;" class="footer">
    ${winner === 'FURIA' ? 'GGWP! FURIA É VIDA! 💛🖤' : 'GGWP! Hoje não foi nosso dia, mas seguimos! 💛🖤'}
  </div>

  <style>
  @media (max-width: 640px) {
    /* Ajustes para o header */
    .header-logos img {
      width: 40px !important;
      height: 40px !important;
    }
    .header-logos .team-name {
      font-size: 16px !important;
    }
    .score-container {
      padding: 10px 20px !important;
      margin: 0 10px !important;
    }
    .score-container .score {
      font-size: 20px !important;
    }
    .score-container .round {
      font-size: 10px !important;
    }

    /* Ajustes para as informações do jogo */
    .game-info {
      padding: 10px !important;
    }
    .game-info .tournament {
      font-size: 14px !important;
    }
    .game-info .map {
      font-size: 12px !important;
    }

    /* Ajustes para os cards dos jogadores */
    .player-card {
      padding: 8px !important;
    }
    .player-card img {
      width: 30px !important;
      height: 30px !important;
      margin-right: 8px !important;
    }
    .player-card .player-name {
      font-size: 12px !important;
    }
    .player-card .player-stats {
      font-size: 10px !important;
    }

    /* Ajustes para os eventos */
    .event-container {
      font-size: 12px !important;
      padding: 6px 10px !important;
    }

    /* Ajustes para o footer */
    .footer {
      font-size: 12px !important;
      margin-top: 10px !important;
    }
  }
  </style>
</div>`;
    }
    
    return `<div style="background-color: #0D1117; border-radius: 12px; padding: 20px; text-align: center; color: #FFF; width: 100%; max-width: 800px; margin: 0 auto;">
  Não há nenhuma partida ao vivo no momento. Mas fique ligado que logo logo tem mais FURIA em ação! 💛🖤
</div>`;
  }, []);

  const handleLiveMatch = useCallback((message: string) => {
    const liveMatchPatterns = [
      /tem\s+(?:partida|jogo)\s+ao\s+vivo/i,
      /partida\s+ao\s+vivo/i,
      /jogo\s+ao\s+vivo/i,
      /placar\s+do\s+jogo/i,
      /como\s+(?:tá|está)\s+o\s+jogo/i,
      /stats?\s+do\s+jogo/i,
      /stats?\s+da\s+partida/i
    ];

    if (liveMatchPatterns.some(pattern => pattern.test(message))) {
      const messageId = uuidv4();
      setLiveMatchMessageId(messageId);
      
      setMessages(prevMessages => [...prevMessages, {
        id: messageId,
        content: formatLiveMatchMessage(match),
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      return true;
    }
    return false;
  }, [match, formatLiveMatchMessage]);

  const checkFuriaMessage = (message: string) => {
    const furiaPattern = /EU\s+SO[UM]+\s*FU+RIA+|EU\s+SOU\s+FU+RIA+/i;
    if (furiaPattern.test(message)) {
      return `<div style="display: flex; justify-content: center; margin: 10px 0;">
        <img src="/images/memes/furia.jpg" alt="FURIA MEME" style="max-width: 100%; border-radius: 8px;" />
      </div>`;
    }
    return null;
  };

  const checkHypeMessage = (message: string) => {
    const hypePatterns = [
      /dia\s+d[ae]\s*furia/i,
      /vamo[s]?\s+(?:ganhar\s+)?furia/i,
      /bora\s+furia/i,
      /vamo\s+que\s+vamo/i,
      /furia\s+(?:sempre|porra|vamo)/i
    ];

    if (hypePatterns.some(pattern => pattern.test(message))) {
      const randomMessage = FURIA_HYPE_MESSAGES[Math.floor(Math.random() * FURIA_HYPE_MESSAGES.length)];
      return `${randomMessage}

<div style="display: flex; justify-content: center; margin: 10px 0;">
  <img src="/images/gifs/dia.gif" alt="FURIA HYPE" style="max-width: 100%; border-radius: 8px;" />
</div>`;
    }
    return null;
  };

  const checkProfessorMessage = (message: string) => {
    if (/presente(\s+professor)?/i.test(message)) {
      return `PRESENTE! 👨‍🏫 

O Professor FalleN está na área! Vamos aprender mais uma aula de CS hoje! 

<div style="display: flex; justify-content: center; margin: 10px 0;">
  <img src="/images/gifs/professor.gif" alt="Professor FalleN" style="max-width: 100%; border-radius: 8px;" />
</div>

Bora pra mais uma aula com o maior IGL da história do CS brasileiro! 🎯 FURIA É VIDA! 💛🖤`;
    }
    return null;
  };

  const checkHojeTemMessage = (message: string) => {
    if (/^hoje\s+tem$/i.test(message.trim())) {
      return `CLUTCH DO KSCERATO! 🔥

<div style="display: flex; justify-content: center; margin: 10px 0;">
  <img src="/images/memes/hojetem.jpg" alt="Hoje tem clutch do KSCERATO" style="max-width: 100%; border-radius: 8px;" />
</div>`;
    }
    return null;
  };

  const checkKsceratoClutchMessage = (message: string) => {
    if (/hoje\s+tem\s+clutch\s+do\s+kscerato/i.test(message)) {
      return `E aí, torcedor! 😎 Hoje é dia de ver o KSCERATO brilhar com suas jogadas insanas! O cara é um verdadeiro monstro no clutch! 🔥🔥

Fica ligado que a galera tá contando com ele pra fazer aquele highlight e levar a FURIA pra cima! Vamos torcer e gritar bastante! 💛 🖤 Se precisar de mais informações sobre os jogos, só chamar!

<div style="display: flex; justify-content: center; margin: 10px 0;">
  <img src="/images/memes/hojetem.jpg" alt="Hoje tem clutch do KSCERATO" style="max-width: 100%; border-radius: 8px;" />
</div>`;
    }
    return null;
  };

  const checkClutchQuestionMessage = (message: string) => {
    if (/hoje\s+tem\s+clutch\s+de\s+quem/i.test(message)) {
      return `CLUTCH DO KSCERATO! 🔥

<div style="display: flex; justify-content: center; margin: 10px 0;">
  <img src="/images/memes/hojetem.jpg" alt="Hoje tem clutch do KSCERATO" style="max-width: 100%; border-radius: 8px;" />
</div>`;
    }
    return null;
  };

  const addRandomCatchphrase = (message: string) => {
    // Não adiciona catchphrase em mensagens de saudação ou informativas
    const skipPhrases = [
      'e aí', 'olá', 'oi', 'como está', 'pronto pra', 'bem-vindo',
      'ranking', 'próximos jogos', 'última atualização'
    ];

    // Não adiciona em mensagens com emojis específicos
    const skipEmojis = ['📊', '🏆'];

    // Verifica se a mensagem contém alguma das frases ou emojis para pular
    const shouldSkip = skipPhrases.some(phrase => message.toLowerCase().includes(phrase)) ||
                      skipEmojis.some(emoji => message.includes(emoji));

    if (shouldSkip) {
      return message;
    }

    // Lista de palavras para variar o tratamento
    const variations = [
      'torcedor', 'amigo', 'parceiro', 'família FURIA', 
      'guerreiro', 'companheiro', 'fera', 'craque'
    ];
    
    let modifiedMessage = message;
    
    // Se tiver mais de uma ocorrência de "furioso", substitui algumas por variações
    const furiosoCount = (modifiedMessage.match(/furioso/gi) || []).length;
    if (furiosoCount > 1) {
      // Mantém pelo menos uma ocorrência de "furioso"
      for (let i = 0; i < furiosoCount - 1; i++) {
        const randomVariation = variations[Math.floor(Math.random() * variations.length)];
        modifiedMessage = modifiedMessage.replace(/furioso/i, randomVariation);
      }
    }

    // Sempre adiciona uma catchphrase em outras mensagens
    const randomPhrase = FURIA_CATCHPHRASES[Math.floor(Math.random() * FURIA_CATCHPHRASES.length)];
    return `${modifiedMessage}\n\n${randomPhrase}`;
  };

  const addBotMessage = useCallback(async (userMessage: string) => {
    setIsTyping(true);

    try {
      // Verifica se é uma mensagem sobre partida ao vivo
      if (handleLiveMatch(userMessage)) {
        setIsTyping(false);
        return;
      }

      const furiaResponse = checkFuriaMessage(userMessage);
      if (furiaResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: furiaResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const hypeResponse = checkHypeMessage(userMessage);
      if (hypeResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: hypeResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const professorResponse = checkProfessorMessage(userMessage);
      if (professorResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: professorResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const hojeTemResponse = checkHojeTemMessage(userMessage);
      if (hojeTemResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: hojeTemResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const ksceratoClutchResponse = checkKsceratoClutchMessage(userMessage);
      if (ksceratoClutchResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: ksceratoClutchResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const clutchQuestionResponse = checkClutchQuestionMessage(userMessage);
      if (clutchQuestionResponse) {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: uuidv4(),
            content: clutchQuestionResponse,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
        return;
      }

      const isFeminino = /feminino|furia fe|as meninas|fe\b/i.test(userMessage);

      const relevantTournaments = TOURNAMENTS.filter(t => t.team === (isFeminino ? 'feminino' : 'masculino'));
      const relevantMatches = MATCHES.filter(match =>
        relevantTournaments.some(t => t.id === match.tournamentId)
      );

      const upcomingMatches = relevantMatches.filter(m => m.status === 'scheduled');
      const finishedMatches = relevantMatches.filter(m => m.status === 'finished');

      const tournamentInfo = relevantTournaments.map(t => [
        `🏆 ${t.name}`,
        `📍 Local: ${t.location}`,
        `📅 Data: ${t.startDate} a ${t.endDate}`,
        `💰 Premiação: ${t.prizePool}`
      ].join('\n')).join('\n\n');

      const matchesInfoUpcoming = upcomingMatches.map(match => {
        const tournament = relevantTournaments.find(t => t.id === match.tournamentId);
        return (
          `🏆 ${tournament?.name}\n` +
          `📅 Data: ${match.date} às ${match.time}\n` +
          `👊 Contra: ${match.opponent}`
        );
      }).join('\n\n');

      const matchesInfoFinished = finishedMatches.map(match => {
        const tournament = relevantTournaments.find(t => t.id === match.tournamentId);
        return (
          `🏆 ${tournament?.name}\n` +
          `📅 Data: ${match.date}\n` +
          `👊 Contra: ${match.opponent}\n` +
          `📊 Placar: ${match.score}`
        );
      }).join('\n\n');

      const formatHistorySection = (section: HistorySection) => {
        const emojis: Record<string, string> = {
          'fundacao': '👥',
          'primeiros-passos': '🏆',
          'ascensao-internacional': '🌎',
          'consolidacao': '📈',
          'era-moderna': '⭐'
        };

        const emoji = emojis[section.id] || '📌';

        return `${emoji} ${section.title} (${section.period})
${section.content}`;
      };

      const formatAchievements = () => {
        const titles = FURIA_ACHIEVEMENTS.titles.map(title => `• ${title}`).join('\n');
        const milestones = FURIA_ACHIEVEMENTS.milestones.map(milestone => `• ${milestone}`).join('\n');

        return `
🏅 Principais Conquistas:
${titles}

🎯 Marcos Importantes:
${milestones}`;
      };

      const formatMusic = () => {
        return `
Ah, meu torcedor! A FURIA tem umas músicas que são verdadeiros hinos! 🎵 Vamos lá:

${FURIA_MUSIC.map(music => {
  const title = music.title === 'Rap da FURIA' 
    ? '<strong>Rap da FURIA</strong>' 
    : `<strong>Rap do ${music.title}</strong>`;
  return `🎵 <a href="${music.url}" target="_blank" style="color: #FFD700;">${title}</a>
${music.description}`;
}).join('\n\n')}

Essas são as principais músicas que fazem a energia da torcida lá em cima! Não esquece de ouvir, porque cada uma tem sua vibe! Vamos com tudo, FURIA! 💛 🖤`;
      };

      const formatRankings = () => {
        return `
E aí, torcedor! Vamos lá, aqui estão os rankings atuais:

<strong>Ranking do CS2 Masculino</strong>:
🎮 Valve Ranking: #${FURIA_RANKINGS.masculino.valve}
🌎 HLTV Ranking: #${FURIA_RANKINGS.masculino.hltv}

<strong>Ranking do CS2 Feminino</strong>:
🎮 Valve Ranking: #${FURIA_RANKINGS.feminino.valve}
🌎 HLTV Ranking: #${FURIA_RANKINGS.feminino.hltv}

📅 Última atualização: ${FURIA_RANKINGS.masculino.lastUpdate}

Vamos torcer para que as meninas subam essas posições logo! 💛 🖤`;
      };

      const contextInfo = `📢 INFORMAÇÕES ATUALIZADAS

${isFeminino ? 'SOBRE A FURIA FEMININA:' : 'SOBRE A FURIA MASCULINA:'}

${formatRankings()}

${tournamentInfo ? `
🏆 TORNEIOS CONFIRMADOS:
${tournamentInfo}` : ''}

${matchesInfoUpcoming ? `
📌 PRÓXIMOS JOGOS:
${matchesInfoUpcoming}` : ''}

${matchesInfoFinished ? `
📊 RESULTADOS RECENTES:
${matchesInfoFinished}` : ''}

📜 HISTÓRIA DA FURIA ESPORTS

${FURIA_HISTORY.map(formatHistorySection).join('\n\n')}

${formatAchievements()}

${formatMusic()}

🏆 TÍTULOS DA FURIA:
${FURIA_ACHIEVEMENTS.titles.map(title => 
  `🏆 <strong>${title}</strong>`
).join('\n')}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          { role: "system", content: SYSTEM_PROMPT_BASE + "\n\n" + contextInfo },
          { role: "user", content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const botResponse = completion.choices[0]?.message?.content || "Desculpe, ocorreu um erro ao processar sua mensagem.";

      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: addRandomCatchphrase(botResponse),
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao obter resposta da OpenAI:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: "Desculpe, tive um problema técnico. Pode tentar novamente?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    addBotMessage(message);
    setInputValue('');
  }, [addBotMessage]);

  const greetUser = useCallback(() => {
    if (!hasGreeted) {
      const randomGreeting = GREETING_MESSAGES[Math.floor(Math.random() * GREETING_MESSAGES.length)];
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: uuidv4(),
          content: randomGreeting,
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
      setHasGreeted(true);
    }
  }, [hasGreeted]);

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isTyping,
    greetUser
  };
};
