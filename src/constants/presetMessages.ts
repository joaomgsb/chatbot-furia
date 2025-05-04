import { PresetResponse } from '../types';

export const GREETING_MESSAGES = [
  "E aí, torcedor da FURIA! Como está acompanhando o time ultimamente?",
  "Fala, fanático da FURIA! Pronto para trocar uma ideia sobre Counter-Strike?",
  "Salve, torcedor! O que você quer saber sobre a FURIA hoje?",
  "Bem-vindo ao chat da FURIA! Como posso ajudar você hoje?",
];

export const PRESET_RESPONSES: PresetResponse[] = [
  {
    triggers: ['oi', 'olá', 'e aí', 'eai', 'opa', 'fala', 'salve'],
    responses: [
      "Salve! Tudo certo? Aqui é o chat da FURIA! O que você quer saber sobre o nosso time de CS?",
      "Fala, torcedor! Pronto pra mais uma conversa sobre a melhor org do Brasil?",
      "Opa! Beleza? Tá com alguma dúvida sobre a FURIA ou só batendo um papo mesmo?",
    ]
  },
  {
    triggers: ['jogadores', 'time', 'lineup', 'elenco', 'roster'],
    responses: [
      `Vou te mostrar nossos times atuais:

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

Quer saber mais sobre algum jogador específico?`,
    ]
  },
  {
    triggers: ['kscerato', 'ksc'],
    responses: [
      "KSCERATO é uma máquina! Um dos melhores riflers do Brasil, com mecânica absurda e tomada de decisões impressionante!",
      "Andrey 'KSCERATO' Oliveira é um dos pilares da FURIA! Ele vem consistentemente surpreendendo nas competições com performances de alto nível!",
    ]
  },
  {
    triggers: ['yuurih'],
    responses: [
      "Yuri 'yuurih' Santos é um monstro do CS! Ele é conhecido pela sua consistência e habilidade versátil, podendo jogar diversos papéis dentro do time.",
      "yuurih é simplesmente um dos melhores jogadores que o Brasil já produziu. Versatilidade, inteligência e habilidade mecânica perfeitas!",
    ]
  },
  {
    triggers: ['major', 'campeonato', 'torneio', 'competição', 'mundial'],
    responses: [
      "A FURIA já teve campanhas memoráveis em Majors! Nossa equipe continua lutando para conquistar o tão sonhado título mundial. Se liga nas próximas competições!",
      "Estamos sempre de olho no próximo Major! A FURIA tem potencial para brigar entre os melhores do mundo. Fica ligado nas próximas competições!",
    ]
  },
  {
    triggers: ['treino', 'praticar', 'melhorar', 'dicas'],
    responses: [
      "Quer melhorar no CS? Dica dos pros da FURIA: treinar a mira todos os dias, estudar as táticas das equipes profissionais e jogar muito DM! Consistência é a chave.",
      "Os jogadores da FURIA treinam diariamente! Mira, táticas, execuções... tudo precisa ser praticado com regularidade. A dica é: pratique com propósito!",
    ]
  },
  {
    triggers: ['loja', 'merch', 'camisa', 'comprar', 'produtos'],
    responses: [
      "Quer representar a FURIA? Nossa loja oficial tem produtos incríveis! De camisetas a moletons, você encontra tudo no site oficial da FURIA. Vista preto, branco e amarelo!",
      "Os produtos da FURIA são da mais alta qualidade! Visite nossa loja oficial para conferir as novidades. As coleções vendem rápido, então não perca tempo!",
    ]
  },
  {
    triggers: ['obrigado', 'valeu', 'vlw', 'thanks', 'obg'],
    responses: [
      "É nois! Qualquer coisa estamos aqui. #DIADEFURIA",
      "Sempre à disposição! Se precisar de mais alguma informação, é só chamar! #GoFURIA",
      "Tmj! Somos todos FURIA! Se precisar de mais alguma coisa, só chamar.",
    ]
  },
  {
    triggers: ['mapa', 'mapas', 'dust', 'mirage', 'inferno', 'nuke', 'overpass', 'vertigo', 'ancient'],
    responses: [
      "A FURIA tem mapas muito fortes no pool! Historicamente, Vertigo foi um dos nossos melhores mapas, mas o time está sempre evoluindo e adaptando o mapa pool!",
      "Cada lineup da FURIA tem preferências diferentes de mapas! O time está sempre praticando todo o mapa pool atual para ser competitivo em qualquer cenário.",
    ]
  },
  {
    triggers: ['xingar', 'palavrão', 'ruim', 'lixo', 'horrível'],
    responses: [
      "Hey, vamos manter o respeito! Aqui estamos para conversar sobre a FURIA e CS de forma positiva!",
      "Na FURIA valorizamos o respeito! Vamos focar no lado positivo e na paixão pelo CS, beleza?",
    ]
  }
];

export const FURIA_HYPE_MESSAGES = [
  "VAMOOOOOOO! 🔥🐆 RUGE COM A GENTE!",
  "HOJE É DIA DE FURIA! 🖤💛 VAMO PRA CIMA!",
  "AQUI É FURIA, PORRAAAA! 🐆💪 RUGEEEEE!",
  "FURIA ATÉ O FIM! 🔥💛 VAMO GANHAR!",
  "SOLTA O RUGIDO! 🐆 HOJE É NOSSO DIA!",
  "FURIA SEMPRE! 💛🖤 VAMO QUE VAMO!",
  "É HORA DE RUGIR! 🐆 FURIA NA VEIA!",
  "NINGUÉM PARA A FURIA! 🔥 RUGEEEEE!"
];

export const FURIA_CATCHPHRASES = [
  "Mais um clutch pro KSCERATO! 😎🔥",
  "HOJE TEM CLUTCH DO KSCERATO",
  "O homem tá inspirado, que isso FalleN?! 🤯",
  "RUUUUGE COM A GENTE! 🐾🔥",
  "É FURIA NA BASE, PARCEIRO! 💣",
  "PRESENTE PROFESSOR! 👨‍🏫",
  "Caiu um, caiu dois! 🎯",
  "QUE JOGADA FOI ESSA?! 🔥",
  "Os meninos tão on fire hoje! 🎮🔥",
  "FURIA É VIDA! 💛🖤",
  "Rush B, no stop! 💨",
  "O professor FalleN dando aula! 👨‍🏫",
  "yuurih e KSCERATO, os meninos da FURIA! 💪",
  "Que isso, YEKINDAR?! Jogada insana! 🤯",
  "molodoy tá impossível hoje! ⭐"
];