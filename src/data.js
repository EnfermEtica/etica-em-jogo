// ─────────────────────────────────────────────────────────────────
//  ÉTICA EM JOGO — Conteúdo das cartas
//  Cada PAIR contém um DILEMA (frente) e o seu REFLETE (verso)
//  O emparelhamento respeita a impressão frente/verso cruzada
// ─────────────────────────────────────────────────────────────────

export const PAIRS = [
  // ── Conjunto 1 (PDF páginas 1-2) ──────────────────────────────
  {
    d: {
      texto: 'Doente idoso e confuso a levantar-se constantemente.\n\nA equipa diz:\n"Mais vale imobilizar antes que caia".',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Existe risco real e imediato?',
        'Foram tentadas alternativas?',
        'A medida é proporcional?',
        'É proteção ou conveniência?',
        'Que princípios estão em conflito?',
      ],
    },
  },
  {
    d: {
      texto: 'A família pede:\n"Não diga ao nosso pai que tem cancro."\n\nO doente pergunta:\n"Eu estou muito doente?"',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'O doente tem direito à verdade?',
        'Quer saber?',
        'Estamos a proteger ou a excluir?',
        'Qual o papel do enfermeiro?',
      ],
    },
  },
  {
    d: {
      texto: 'Uma filha liga para o serviço e pergunta:\n"Como está a minha mãe? Disseram-me que piorou."\n\nA doente está consciente, mas não indicou quem pode receber informação.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A doente autorizou a partilha de informação?',
        'Quem tem direito a saber?',
        'Estás a garantir a confidencialidade?',
        'Existe risco em não dar informação?',
        'Como responder sem violar o sigilo?',
      ],
    },
  },
  {
    d: {
      texto: 'Família aproxima-se do balcão de enfermagem e pergunta informações sobre doente internado.\n\nHá outros utentes e profissionais à volta.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'O local é adequado para essa conversa?',
        'Quem tem direito à informação?',
        'Estás a garantir a confidencialidade?',
        'Como podes proteger o doente?',
        'Que alternativa tens?',
      ],
    },
  },
  {
    d: {
      texto: 'Uma tarefa é delegada a uma TAS menos experiente.\n\nTens dúvida sobre a sua competência.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A TAS tem competência para executar o que lhe foi delegado?',
        'Quem é responsável?',
        'Devias supervisionar?',
        'O que implica delegar?',
      ],
    },
  },
  {
    d: {
      texto: 'Um erro ocorreu, mas não teve consequências visíveis.\n\nA colega diz:\n"Não vale a pena dizer nada."',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Existe o dever de informar?',
        'Que impacto tem ocultar?',
        'Segurança do doente vs cultura de silêncio?',
        'Qual a tua responsabilidade?',
      ],
    },
  },

  // ── Conjunto 2 (PDF páginas 3-4) ──────────────────────────────
  {
    d: {
      texto: 'Num quarto múltiplo sem cortinas precisas de fazer a higiene a um doente. Há outros doentes presentes e profissionais a circular.\n\nOs biombos estão todos ocupados.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Cuidar vs dignidade, o que deve prevalecer?',
        'A rotina condiciona a sensibilidade ética?',
        'O que pode ser melhorado?',
        'Que responsabilidade tens perante um doente que não verbaliza?',
      ],
    },
  },
  {
    d: {
      texto: 'Durante a visita a família do doente entrega-te um envelope e diz:\n"é só uma lembrança pelo cuidado."\n\nPercebes que tem dinheiro.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Gratidão ou compensação?',
        'Aceitar compromete a imparcialidade?',
        'Aceitar cria expectativas de tratamento diferenciado?',
      ],
    },
  },
  {
    d: {
      texto: 'Doente em fase terminal continua sujeito a procedimentos invasivos e exames. Sabes que tem maus acessos mas precisas de colher sangue.\n\nQuando te aproximas ele diz:\n"Outra vez? Estou farto de ser picado"',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Existe benefício real?',
        'O doente está a ser ouvido?',
        'Cuidar vs prolongar sofrimento',
        'Há obstinação terapêutica?',
        'O enfermeiro deve questionar?',
      ],
    },
  },
  {
    d: {
      texto: 'No último estágio de 4.º ano, uma estudante pede para fazer a sua primeira algaliação.\n"Quero muito praticar."\n\nSabes que o doente é ansioso e pouco colaborante.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'O consentimento foi considerado?',
        'Quem assume a responsabilidade?',
        'Segurança vs oportunidade pedagógica',
      ],
    },
  },
  {
    d: {
      texto: 'A família quer trazer crianças pequenas para se despedirem do avô em fim de vida.\n\nAlguns colegas discordam:\n"É muito traumático."',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Quem decide o que é adequado?',
        'Tem valor terapêutico?',
        'Proteção ou excesso de paternalismo?',
        'Como preparar a situação?',
      ],
    },
  },
  {
    d: {
      texto: 'Doente consciente e orientado recusa banho há vários dias. O odor começa a fazer-se notar e a equipa comenta:\n"Assim não pode continuar".',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A recusa deve ser respeitada?',
        'Há compromisso da dignidade ou da saúde?',
        'Cuidar permite insistir?',
        'O desconforto é de quem?',
        'Até onde vai a autonomia?',
        'Como negociar?',
      ],
    },
  },

  // ── Conjunto 3 (PDF páginas 5-6) ──────────────────────────────
  {
    d: {
      texto: 'Em sofrimento o doente olha-te e diz:\n"Assim não vale a pena. Queria morrer."\n\nEstás sozinho com ele.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'O que está por trás desta frase?',
        'O sofrimento está controlado?',
        'Pedido de morte ou pedido de escuta?',
        'Como acolher, sem julgar?',
        'Que ajuda deve ser mobilizada?',
      ],
    },
  },
  {
    d: {
      texto: 'Colega visivelmente cansada, comete pequenos lapsos durante o turno.\n\nMas recusa ajuda e continua.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A segurança dos doentes está em causa?',
        'Cuidar da equipa também é um dever?',
        'Intervir é invasão ou proteção?',
        'A omissão também te compromete?',
      ],
    },
  },
  {
    d: {
      texto: 'Dá entrada no Hospital um doente famoso.\n\nUma colega comenta:\n"Vou só espreitar o processo para ver o que ele tem."',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A curiosidade justifica acesso?',
        'O acesso fica registado?',
        'A informação clínica pertence a quem?',
        'Não reagir, compromete-te?',
      ],
    },
  },
  {
    d: {
      texto: 'No último estágio de 4.º ano, uma estudante pede para fazer a sua primeira algaliação.\n"Quero muito praticar."\n\nSabes que o doente é ansioso e pouco colaborante.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'O consentimento foi considerado?',
        'Quem assume a responsabilidade?',
        'Segurança vs oportunidade pedagógica',
      ],
    },
  },
  {
    d: {
      texto: 'O doente entra em paragem e morre subitamente.\n\nA família liga para saber informações e és tu quem atende o telefone.',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'Preparar a família também é cuidar?',
        'Dever de comunicar ou proteger?',
        'Como comunicar o falecimento por telefone?',
        'Quem deve assumir essa comunicação?',
      ],
    },
  },
  {
    d: {
      texto: 'Doente consciente e orientado recusa banho há vários dias. O odor começa a fazer-se notar e a equipa comenta:\n"Assim não pode continuar".',
      pergunta: 'O que fazes?',
    },
    r: {
      perguntas: [
        'A recusa deve ser respeitada?',
        'Há compromisso da dignidade ou da saúde?',
        'Cuidar permite insistir?',
        'O desconforto é de quem?',
        'Até onde vai a autonomia?',
        'Como negociar?',
      ],
    },
  },
];

// ─────────────────────────────────────────────────────────────────
//  CARTAS SABIAS QUE
// ─────────────────────────────────────────────────────────────────
export const SABIAS = [
  {
    texto: 'A consulta indevida de dados clínicos de utentes através de plataformas de registo eletrónico incorre no crime de acesso ilegítimo a dados confidenciais, punido com pena de prisão entre 1 a 3 anos.',
    fonte: 'Art. 6.º, n.º 1 e n.º 4, Lei 109/2009',
  },
  {
    texto: '"A consulta de um processo clínico por enfermeiros que não estiveram envolvidos no plano terapêutico do utente, sem que exista motivo clínico, ou sem a autorização para o efeito, coloca em causa a dignidade da pessoa e desrespeita a intimidade do mesmo."',
    fonte: 'Parecer OE 114/2019',
  },
  {
    texto: 'Sempre que consultas um processo clínico através de uma plataforma, o teu acesso fica registado.',
    fonte: '',
  },
  {
    texto: 'Sanções disciplinares aplicadas pela OE:\n• Advertência escrita\n• Censura escrita\n• Suspensão do exercício profissional até 5 anos\n• Expulsão',
    fonte: 'Art. 76.º Estatuto OE',
  },
  {
    texto: 'A prestação de cuidados de enfermagem sem consentimento da pessoa constitui um crime contra a liberdade pessoal, punido até 3 anos de prisão ou pena de multa. O enfermeiro tem o dever de informar e obter a decisão da pessoa.',
    fonte: 'Parecer OE 225/2014',
  },
  {
    texto: 'Seguir as decisões da equipa não elimina a tua responsabilidade.',
    fonte: '',
  },
  {
    texto: 'A utilização de medidas de contenção deve ser vista pelos profissionais de saúde como incidente para a segurança do doente.',
    fonte: 'DGS Norma 021/2011',
  },
  {
    texto: 'A contenção mecânica deve ser considerada como último recurso, depois de esgotadas as medidas alternativas, considerando o seu impacto na liberdade, autodeterminação e dignidade do doente.',
    fonte: 'DGS Norma 021/2011',
  },
  {
    texto: 'Na aplicação de medidas de contenção, deve prevalecer o princípio de cuidar do doente com a menor restrição possível, durante o menor tempo possível.',
    fonte: 'DGS Norma 021/2011',
  },
  {
    texto: 'Na aplicação de medidas de contenção, deve-se: esgotar medidas preventivas; obter consentimento (sempre que possível); esclarecer o que vai ser feito; ajustar a medida à situação; vigiar; reavaliar; retirar assim que possível; registar.',
    fonte: 'DGS Norma 021/2011',
  },
  {
    texto: 'Medidas alternativas à contenção incluem: presença e acompanhamento individual; contenção verbal; modificar o contexto; recorrer a pessoa significativa; técnica de distração; tratamento farmacológico.',
    fonte: 'DGS Norma 021/2011',
  },
  {
    texto: 'No processo de contenção mecânica, os enfermeiros valorizam mais os pensamentos dos familiares do que os dos doentes.',
    fonte: 'Artigo de investigação: "Contenção mecânica: perceção dos enfermeiros"',
  },
];

// ─────────────────────────────────────────────────────────────────
//  TABULEIRO
//  18 posições: 0=INÍCIO, 1-16=casas, 17=FIM
//  t: 'inicio' | 'dilema' | 'sabias' | 'reflete' | 'fim'
//  Casas reflete abrem directamente no verso do REFLETE
// ─────────────────────────────────────────────────────────────────
export const BOARD = [
  { n: 'INÍCIO',  t: 'inicio'  },   // 0
  { n: '1',       t: 'dilema',  sub: 'DILEMA'           },  // 1
  { n: '2',       t: 'dilema',  sub: 'DILEMA'           },  // 2
  { n: '3',       t: 'sabias',  sub: 'SABIAS QUE'       },  // 3
  { n: '4',       t: 'dilema',  sub: 'DILEMA'           },  // 4
  { n: '5',       t: 'reflete', sub: 'ESTIVE A\nPENSAR' },  // 5 → sobe para 11
  { n: '6',       t: 'dilema',  sub: 'DILEMA'           },  // 6
  { n: '7',       t: 'dilema',  sub: 'DILEMA'           },  // 7
  { n: '8',       t: 'dilema',  sub: 'DILEMA'           },  // 8
  { n: '9',       t: 'sabias',  sub: 'SABIAS QUE'       },  // 9
  { n: '10',      t: 'reflete', sub: 'O QUE\nACHAS?'    },  // 10 → sobe para 14
  { n: '11',      t: 'dilema',  sub: 'NINGUÉM\nVIU!'    },  // 11 → desce para 3
  { n: '12',      t: 'dilema',  sub: 'DILEMA'           },  // 12
  { n: '13',      t: 'dilema',  sub: 'DILEMA'           },  // 13
  { n: '14',      t: 'sabias',  sub: 'SABIAS QUE'       },  // 14
  { n: '15',      t: 'dilema',  sub: 'NÃO ME\nINTERESSA!'},  // 15 → desce para 7
  { n: '16',      t: 'dilema',  sub: 'DILEMA'           },  // 16
  { n: 'FIM',     t: 'fim'     },   // 17
];

// Escadas (sobe) e escorregadores (desce)
// Chave = posição de origem, valor = destino
export const TELEPORTS = {
  5:  11,  // 🪜 Casa 5 → Casa 11
  10: 14,  // 🪜 Casa 10 → Casa 14
  11: 3,   // 🎿 Casa 11 → Casa 3
  15: 7,   // 🎿 Casa 15 → Casa 7
};

// Cores e nomes por defeito das equipas
export const TEAM_COLORS = ['#7c3aed', '#c05621', '#1a5276', '#1e6b45', '#8b1a1a'];
export const TEAM_NAMES  = ['Equipa Alfa', 'Equipa Beta', 'Equipa Gama', 'Equipa Delta', 'Equipa Épsilon'];
export const DICE_EMOJI  = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
