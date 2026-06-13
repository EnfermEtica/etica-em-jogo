// ─────────────────────────────────────────────────────────────────
//  ÉTICA EM JOGO — Conteúdo das cartas
// ─────────────────────────────────────────────────────────────────

export const PAIRS = [

  // ── Conjunto 1 (cartas originais) ────────────────────────────
  {
    d: { texto: 'Doente idoso e confuso a levantar-se constantemente.\n\nA equipa diz:\n"Mais vale imobilizar antes que caia".', pergunta: 'O que fazes?' },
    r: { perguntas: ['Existe risco real e imediato?','Foram tentadas alternativas?','A medida é proporcional?','É proteção ou conveniência?','Que princípios estão em conflito?'] },
  },
  {
    d: { texto: 'A família pede:\n"Não diga ao nosso pai que tem cancro."\n\nO doente pergunta:\n"Eu estou muito doente?"', pergunta: 'O que fazes?' },
    r: { perguntas: ['O doente tem direito à verdade?','Quer saber?','Estamos a proteger ou a excluir?','Qual o papel do enfermeiro?'] },
  },
  {
    d: { texto: 'Uma filha liga para o serviço e pergunta:\n"Como está a minha mãe? Disseram-me que piorou."\n\nA doente está consciente, mas não indicou quem pode receber informação.', pergunta: 'O que fazes?' },
    r: { perguntas: ['A doente autorizou a partilha de informação?','Quem tem direito a saber?','Estás a garantir a confidencialidade?','Existe risco em não dar informação?','Como responder sem violar o sigilo?'] },
  },
  {
    d: { texto: 'Família aproxima-se do balcão de enfermagem e pergunta informações sobre doente internado.\n\nHá outros utentes e profissionais à volta.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O local é adequado para essa conversa?','Quem tem direito à informação?','Estás a garantir a confidencialidade?','Como podes proteger o doente?','Que alternativa tens?'] },
  },
  {
    d: { texto: 'Uma tarefa é delegada a uma TAS menos experiente.\n\nTens dúvida sobre a sua competência.', pergunta: 'O que fazes?' },
    r: { perguntas: ['A TAS tem competência para executar o que lhe foi delegado?','Quem é responsável?','Devias supervisionar?','O que implica delegar?'] },
  },
  {
    d: { texto: 'Um erro ocorreu, mas não teve consequências visíveis.\n\nA colega diz:\n"Não vale a pena dizer nada."', pergunta: 'O que fazes?' },
    r: { perguntas: ['Existe o dever de informar?','Que impacto tem ocultar?','Segurança do doente vs cultura de silêncio?','Qual a tua responsabilidade?'] },
  },

  // ── Conjunto 2 ───────────────────────────────────────────────
  {
    d: { texto: 'Num quarto múltiplo sem cortinas precisas de fazer a higiene a um doente. Há outros doentes presentes e profissionais a circular.\n\nOs biombos estão todos ocupados.', pergunta: 'O que fazes?' },
    r: { perguntas: ['Cuidar vs dignidade, o que deve prevalecer?','A rotina condiciona a sensibilidade ética?','O que pode ser melhorado?','Que responsabilidade tens perante um doente que não verbaliza?'] },
  },
  {
    d: { texto: 'Durante a visita a família do doente entrega-te um envelope e diz:\n"é só uma lembrança pelo cuidado."\n\nPercebes que tem dinheiro.', pergunta: 'O que fazes?' },
    r: { perguntas: ['Gratidão ou compensação?','Aceitar compromete a imparcialidade?','Aceitar cria expectativas de tratamento diferenciado?'] },
  },
  {
    d: { texto: 'Doente em fase terminal continua sujeito a procedimentos invasivos e exames. Sabes que tem maus acessos mas precisas de colher sangue.\n\nQuando te aproximas ele diz:\n"Outra vez? Estou farto de ser picado"', pergunta: 'O que fazes?' },
    r: { perguntas: ['Existe benefício real?','O doente está a ser ouvido?','Cuidar vs prolongar sofrimento','Há obstinação terapêutica?','O enfermeiro deve questionar?'] },
  },
  {
    d: { texto: 'No último estágio de 4.º ano, uma estudante pede para fazer a sua primeira algaliação.\n"Quero muito praticar."\n\nSabes que o doente é ansioso e pouco colaborante.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O consentimento foi considerado?','Quem assume a responsabilidade?','Segurança vs oportunidade pedagógica'] },
  },
  {
    d: { texto: 'A família quer trazer crianças pequenas para se despedirem do avô em fim de vida.\n\nAlguns colegas discordam:\n"É muito traumático."', pergunta: 'O que fazes?' },
    r: { perguntas: ['Quem decide o que é adequado?','Tem valor terapêutico?','Proteção ou excesso de paternalismo?','Como preparar a situação?'] },
  },
  {
    d: { texto: 'Doente consciente e orientado recusa banho há vários dias. O odor começa a fazer-se notar e a equipa comenta:\n"Assim não pode continuar".', pergunta: 'O que fazes?' },
    r: { perguntas: ['A recusa deve ser respeitada?','Há compromisso da dignidade ou da saúde?','Cuidar permite insistir?','O desconforto é de quem?','Até onde vai a autonomia?','Como negociar?'] },
  },

  // ── Conjunto 3 ───────────────────────────────────────────────
  {
    d: { texto: 'Em sofrimento o doente olha-te e diz:\n"Assim não vale a pena. Queria morrer."\n\nEstás sozinho com ele.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O que está por trás desta frase?','O sofrimento está controlado?','Pedido de morte ou pedido de escuta?','Como acolher, sem julgar?','Que ajuda deve ser mobilizada?'] },
  },
  {
    d: { texto: 'Colega visivelmente cansada, comete pequenos lapsos durante o turno.\n\nMas recusa ajuda e continua.', pergunta: 'O que fazes?' },
    r: { perguntas: ['A segurança dos doentes está em causa?','Cuidar da equipa também é um dever?','Intervir é invasão ou proteção?','A omissão também te compromete?'] },
  },
  {
    d: { texto: 'Dá entrada no Hospital um doente famoso.\n\nUma colega comenta:\n"Vou só espreitar o processo para ver o que ele tem."', pergunta: 'O que fazes?' },
    r: { perguntas: ['A curiosidade justifica acesso?','O acesso fica registado?','A informação clínica pertence a quem?','Não reagir, compromete-te?'] },
  },
  {
    d: { texto: 'No último estágio de 4.º ano, uma estudante pede para fazer a sua primeira algaliação.\n"Quero muito praticar."\n\nSabes que o doente é ansioso e pouco colaborante.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O consentimento foi considerado?','Quem assume a responsabilidade?','Segurança vs oportunidade pedagógica'] },
  },
  {
    d: { texto: 'O doente entra em paragem e morre subitamente.\n\nA família liga para saber informações e és tu quem atende o telefone.', pergunta: 'O que fazes?' },
    r: { perguntas: ['Preparar a família também é cuidar?','Dever de comunicar ou proteger?','Como comunicar o falecimento por telefone?','Quem deve assumir essa comunicação?'] },
  },
  {
    d: { texto: 'Doente consciente e orientado recusa banho há vários dias. O odor começa a fazer-se notar e a equipa comenta:\n"Assim não pode continuar".', pergunta: 'O que fazes?' },
    r: { perguntas: ['A recusa deve ser respeitada?','Há compromisso da dignidade ou da saúde?','Cuidar permite insistir?','O desconforto é de quem?','Até onde vai a autonomia?','Como negociar?'] },
  },

  // ── Conjunto 4 (PDF novo — páginas 1-2) ──────────────────────
  {
    d: { texto: 'Um doente com demência moderada é proposto para cirurgia. A família assina o consentimento. O doente diz repetidamente:\n"Não quero! Deixem-me em paz".', pergunta: 'O que fazes?' },
    r: { perguntas: ['O doente tem capacidade para decidir?','Uma pessoa pode recusar sem compreender totalmente?','Como distinguir incapacidade de discordância?','O que diz o consentimento informado na ausência de capacidade?','Qual o papel do enfermeiro?'] },
  },
  {
    d: { texto: 'Um adolescente de 16 anos recusa quimioterapia. Os pais querem que o tratamento avance e o médico pede-te ajuda para falar com o jovem.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O que está por trás da recusa?','Esclarecer é diferente de convencer?','Como dar voz ao adolescente?','Como preservar a relação terapêutica?','É possível cuidar sem respeitar a vontade?'] },
  },
  {
    d: { texto: 'Um doente Testemunha de Jeová recusa transfusão de sangue. O seu estado clínico deteriora-se e a equipa questiona se vale a pena "respeitar isso".', pergunta: 'O que fazes?' },
    r: { perguntas: ['Tens de concordar para respeitar?','Existe autonomia quando a decisão pode levar à morte?','Que suporte legal existe para o profissional?','Beneficiência e autonomia podem entrar em conflito?'] },
  },
  {
    d: { texto: 'Um doente tem Testamento Vital registado com indicação de não reanimar. Entra em paragem cardiorrespiratória e a família, junto à cama, implora:\n"Por favor façam tudo!"', pergunta: 'O que fazes?' },
    r: { perguntas: ['A família pode revogar uma decisão do doente?','O que sentes ao não iniciar reanimação?','Quem continuas a representar quando o doente já não pode falar?'] },
  },
  {
    d: { texto: 'Um doente assina o consentimento informado para um procedimento invasivo. Em conversa percebes que não compreendeu riscos nem alternativas, mas refere:\n"O médico explicou e eu assinei."', pergunta: 'O que fazes?' },
    r: { perguntas: ['O doente pode consentir algo que não compreende?','Que responsabilidade tem o enfermeiro quando identifica dúvidas não esclarecidas?','Adiar o procedimento é uma opção?','Como agir sem desautorizar o médico?'] },
  },
  {
    d: { texto: 'Uma colega partilhou no grupo do WhatsApp da equipa detalhes clínicos de um doente, com humor. O doente não é identificável pelo nome, mas é reconhecível.', pergunta: 'O que fazes?' },
    r: { perguntas: ['Retirar o nome protege a confidencialidade?','O que diz a lei e a deontologia sobre esta partilha?','O contexto justifica a partilha?'] },
  },

  // ── Conjunto 5 (PDF novo — páginas 3-4) ──────────────────────
  {
    d: { texto: 'Percebes que um colega está a pesquisar o processo clínico de um familiar seu internado noutro serviço.\nEle diz:\n"É família, é só para saber se ele está bem!"', pergunta: 'O que fazes?' },
    r: { perguntas: ['Quem pode aceder ao processo?','A preocupação altera a legitimidade do acesso?','Que implicações legais estão em causa?','O silêncio responsabiliza-te?'] },
  },
  {
    d: { texto: 'Um doente em fase terminal está em sofrimento intenso. A família, com lágrimas nos olhos, pede:\n"Pode aumentar a morfina para ele descansar de uma vez."', pergunta: 'O que fazes?' },
    r: { perguntas: ['O que está realmente a ser pedido?','Como acolher o sofrimento da família?','Aliviar o sofrimento tem limites?'] },
  },
  {
    d: { texto: 'Doente em fase terminal recusa comer. A família insiste na colocação de sonda nasogástrica.\n"Não podemos deixá-lo morrer de fome."', pergunta: 'O que fazes?' },
    r: { perguntas: ['Respeitar a recusa é abandonar?','O que preocupa verdadeiramente a família?','A SNG pode aumentar o sofrimento?','A alimentação artificial é sempre um cuidado ou pode ser obstinação?'] },
  },
  {
    d: { texto: 'A equipa continua a fazer análises e exames de rotina a um doente em fase terminal.\n"É o protocolo."', pergunta: 'O que fazes?' },
    r: { perguntas: ['Tens responsabilidade em questionar?','Estamos a cuidar ou a cumprir?','A rotina condiciona o pensamento crítico?','Ainda existe benefício?'] },
  },
  {
    d: { texto: 'Ao prestar cuidados a uma criança, notas marcas suspeitas no seu corpo. Os pais têm uma explicação para cada uma. A criança está calada e evita o teu olhar.', pergunta: 'O que fazes?' },
    r: { perguntas: ['Os sinais são suficientes para agir?','A intuição clínica tem lugar na decisão?','Que responsabilidade tens se não agires?','E se estiveres errado?','E se não estiveres?'] },
  },
  {
    d: { texto: 'Uma doente idosa é trazida repetidamente à urgência por quedas. De cada vez está acompanhada por um familiar diferente. A idosa evita responder a perguntas e o acompanhante responde sempre por ela.', pergunta: 'O que fazes?' },
    r: { perguntas: ['A intuição clínica tem lugar na decisão?','Quedas repetidas podem ser sinal de negligência?','Como avaliar o contexto familiar sem acusar?','A dúvida impede a sinalização?','Quem protege a doente?'] },
  },

  // ── Conjunto 6 (PDF novo — páginas 5-6) ──────────────────────
  {
    d: { texto: 'Uma doente internada revela sinais evidentes de violência doméstica. Em segredo pede:\n"Por favor não diga nada. Vai ser pior se ele souber que eu falei."', pergunta: 'O que fazes?' },
    r: { perguntas: ['Respeitar a vontade é suficiente?','O que está a ser pedido realmente?','A autonomia pode existir sob medo?','O silêncio protege ou expõe?','Que responsabilidade tens perante este risco?'] },
  },
  {
    d: { texto: 'Um doente transgénero é referido repetidamente pela equipa pelo género errado e o nome que consta no processo não é o nome pelo qual quer ser tratado. Após mais uma correção, diz:\n"Já expliquei várias vezes!"', pergunta: 'O que fazes?' },
    r: { perguntas: ['Estamos a considerar a pessoa, ou o processo?','Nome e género assumido são um direito?','Como corrigir a equipa sem entrar em conflito?','Que impacto tem este comportamento no cuidado terapêutico?'] },
  },
  {
    d: { texto: 'A família de um doente muçulmano pede que os cuidados de higiene sejam realizados apenas por profissionais do mesmo género. O serviço tem dificuldades de escala.', pergunta: 'O que fazes?' },
    r: { perguntas: ['O pedido é razoável?','Respeitar implica concordar?','Existem limites para a adaptação cultural?','Como respeitar a vontade do doente e encontrar equilíbrio nos recursos?'] },
  },
  {
    d: { texto: 'Um doente com doença mental grave recusa repetidamente a medicação.\nO médico diz:\n"Não lhe diga. Misture na comida."', pergunta: 'O que fazes?' },
    r: { perguntas: ['A beneficiência justifica o engano?','A capacidade de decisão pode ser ignorada?','A recusa pode ser ignorada?','O que acontece à confiança?','Tens responsabilidade nesta decisão?'] },
  },
  {
    d: { texto: 'O teu chefe toma uma decisão clínica com a qual discordas profundamente e que consideras prejudicial para o doente. Perante a tua preocupação, responde:\n"Está decidido."', pergunta: 'O que fazes?' },
    r: { perguntas: ['A hierarquia limita a tua responsabilidade?','A quem deves lealdade primeiro?','O silêncio torna-te parte da decisão?','Tens o dever de intervir?','O que acontece se ficares em silêncio?'] },
  },
  {
    d: { texto: 'Um estudante de enfermagem sob a tua supervisão comete um erro que não teve consequências. Assustado, pede:\n"Por favor, não registe. Não quero prejudicar o meu estágio."', pergunta: 'O que fazes?' },
    r: { perguntas: ['O registo protege o doente ou penaliza o estudante?','O erro desaparece se não for registado?','O que aprende o estudante com a tua decisão?','Qual a tua responsabilidade como supervisor?'] },
  },

  // ── Conjunto 7 (PDF novo — páginas 7-8) ──────────────────────
  {
    d: { texto: 'Um colega mais experiente humilha sistematicamente os enfermeiros mais novos durante as passagens de turno. Quando alguém reage, responde:\n"É assim que se aprende."', pergunta: 'O que fazes?' },
    r: { perguntas: ['É exigência ou humilhação?','O bullying profissional afeta a segurança dos doentes?','O medo favorece a aprendizagem?','Quando passa a ser normal, deixa de ser errado?','Que responsabilidade tens ao assistir?'] },
  },
  {
    d: { texto: 'Estás a trabalhar o 6.º turno seguido por falta de pessoal. Percebes que estás mais lento, esqueces-te de tarefas e tens dificuldade em concentrar-te.\nO chefe diz:\n"Não há alternativa!"', pergunta: 'O que fazes?' },
    r: { perguntas: ['O teu cansaço compromete a segurança do doente?','Quando deixas de estar em condições para cuidar?','Pedir ajuda é responsabilidade ou fragilidade?','Quem assume as consequências?'] },
  },
  {
    d: { texto: 'Um colega fotografa uma situação clínica invulgar, sem pedir autorização ao doente. Quando questionado diz:\n"É para fins pedagógicos e está sedado, não vai saber."', pergunta: 'O que fazes?' },
    r: { perguntas: ['O consentimento pode ser presumido?','Fins pedagógicos justificam a captação de imagens sem consentimento?','Basta não colocar o rosto?','Estar sedado implica perder direitos?','Que responsabilidade tens ao assistir?'] },
  },
  {
    d: { texto: 'Um doente mostra-te informação retirada da internet que contradiz o seu plano medicamentoso.\n"Li que este medicamento faz mal e não o quero tomar!"', pergunta: 'O que fazes?' },
    r: { perguntas: ['A literacia em saúde é responsabilidade do enfermeiro?','Uma decisão é verdadeiramente autónoma sem informação adequada?','Como responder sem desvalorizar a preocupação do doente?','Estás a esclarecer ou a persuadir?'] },
  },
];

// ─────────────────────────────────────────────────────────────────
//  CARTAS SABIAS QUE
// ─────────────────────────────────────────────────────────────────
export const SABIAS = [
  { texto: 'A consulta indevida de dados clínicos de utentes através de plataformas de registo eletrónico incorre no crime de acesso ilegítimo a dados confidenciais, punido com pena de prisão entre 1 a 3 anos.', fonte: 'Art. 6.º, n.º 1 e n.º 4, Lei 109/2009' },
  { texto: '"A consulta de um processo clínico por enfermeiros que não estiveram envolvidos no plano terapêutico do utente, sem que exista motivo clínico, ou sem a autorização para o efeito, coloca em causa a dignidade da pessoa e desrespeita a intimidade do mesmo."', fonte: 'Parecer OE 114/2019' },
  { texto: 'Sempre que consultas um processo clínico através de uma plataforma, o teu acesso fica registado.', fonte: '' },
  { texto: 'Sanções disciplinares aplicadas pela OE:\n• Advertência escrita\n• Censura escrita\n• Suspensão do exercício profissional até 5 anos\n• Expulsão', fonte: 'Art. 76.º Estatuto OE' },
  { texto: 'A prestação de cuidados de enfermagem sem consentimento da pessoa constitui um crime contra a liberdade pessoal, punido até 3 anos de prisão ou pena de multa. O enfermeiro tem o dever de informar e obter a decisão da pessoa.', fonte: 'Parecer OE 225/2014' },
  { texto: 'Seguir as decisões da equipa não elimina a tua responsabilidade.', fonte: '' },
  { texto: 'A utilização de medidas de contenção deve ser vista pelos profissionais de saúde como incidente para a segurança do doente.', fonte: 'DGS Norma 021/2011' },
  { texto: 'A contenção mecânica deve ser considerada como último recurso, depois de esgotadas as medidas alternativas, considerando o seu impacto na liberdade, autodeterminação e dignidade do doente.', fonte: 'DGS Norma 021/2011' },
  { texto: 'Na aplicação de medidas de contenção, deve prevalecer o princípio de cuidar do doente com a menor restrição possível, durante o menor tempo possível.', fonte: 'DGS Norma 021/2011' },
  { texto: 'Na aplicação de medidas de contenção, deve-se: esgotar medidas preventivas; obter consentimento (sempre que possível); esclarecer o que vai ser feito; ajustar a medida à situação; vigiar; reavaliar; retirar assim que possível; registar.', fonte: 'DGS Norma 021/2011' },
  { texto: 'Medidas alternativas à contenção incluem: presença e acompanhamento individual; contenção verbal; modificar o contexto; recorrer a pessoa significativa; técnica de distração; tratamento farmacológico.', fonte: 'DGS Norma 021/2011' },
  { texto: 'No processo de contenção mecânica, os enfermeiros valorizam mais os pensamentos dos familiares do que os dos doentes.', fonte: 'Artigo de investigação: "Contenção mecânica: perceção dos enfermeiros"' },
];

// ─────────────────────────────────────────────────────────────────
//  TABULEIRO
// ─────────────────────────────────────────────────────────────────
export const BOARD = [
  { n: 'INÍCIO',  t: 'inicio'  },
  { n: '1',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '2',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '3',       t: 'sabias',  sub: 'TIRA UMA\nCARTA'  },
  { n: '4',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '5',       t: 'reflete', sub: 'ESTIVE A\nPENSAR' },
  { n: '6',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '7',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '8',       t: 'dilema',  sub: 'DILEMA'           },
  { n: '9',       t: 'sabias',  sub: 'TIRA UMA\nCARTA'  },
  { n: '10',      t: 'reflete', sub: 'O QUE\nACHAS?'    },
  { n: '11',      t: 'dilema',  sub: 'NINGUÉM\nVIU!'    },
  { n: '12',      t: 'dilema',  sub: 'DILEMA'           },
  { n: '13',      t: 'dilema',  sub: 'DILEMA'           },
  { n: '14',      t: 'sabias',  sub: 'TIRA UMA\nCARTA'  },
  { n: '15',      t: 'dilema',  sub: 'NÃO ME\nINTERESSA!'},
  { n: '16',      t: 'dilema',  sub: 'DILEMA'           },
  { n: 'FIM',     t: 'fim'     },
];

export const TELEPORTS = {
  5:  7,
  10: 13,
  11: 2,
  15: 8,
};

export const TELEPORT_MESSAGES = {
  5:  { sobe: true,  header: 'PARABÉNS!! 🎉', body: 'Esta equipa esteve a pensar sobre um dilema ético e por isso vai subir para a casa 7!' },
  10: { sobe: true,  header: 'PARABÉNS!! 🎉', body: 'Esta equipa questiona-se a si e aos outros e por isso merece subir para a casa 13!' },
  11: { sobe: false, header: 'Ohhhhhhhh 😬',  body: 'Cometeram um erro e ficaram satisfeitos porque ninguém viu. Por isso devem escorregar para a casa 2!' },
  15: { sobe: false, header: 'Ohhhhhhhh 😬',  body: 'Não estão interessados em discutir eticamente a vossa tomada de decisão? Então vão descer para a casa 8!' },
};

export const TEAM_COLORS = ['#7c3aed','#c05621','#1a5276','#1e6b45','#8b1a1a'];
export const TEAM_NAMES  = ['Equipa Alfa','Equipa Beta','Equipa Gama','Equipa Delta','Equipa Épsilon'];
export const DICE_EMOJI  = ['⚀','⚁','⚂','⚃','⚄','⚅'];
