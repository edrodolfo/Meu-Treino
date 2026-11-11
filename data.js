// Plano de treino (fonte: meu_treino_completo.pdf)

const EXERCICIOS = {
  extensora: {
    nome: "Cadeira extensora",
    img: "img/extensora.webp",
    musculos: "Quadríceps",
    passos: [
      "Ajuste o encosto para que o joelho fique alinhado ao eixo da máquina e o rolo sobre a canela, logo acima do tornozelo.",
      "Estenda os joelhos de forma controlada até quase esticar as pernas.",
      "Desça devagar, sem deixar o peso bater no fim do movimento."
    ],
    dica: "segure nas alças e mantenha o quadril firme no banco."
  },
  leg_press: {
    nome: "Leg press 45°",
    img: "img/leg_press.webp",
    musculos: "Quadríceps, glúteos e posteriores",
    passos: [
      "Sente-se no leg press e posicione os pés na plataforma na largura dos ombros.",
      "Desça o peso de forma controlada, sem tirar o quadril do encosto.",
      "Empurre a plataforma de volta, sem travar os joelhos."
    ],
    dica: "mantenha a lombar bem apoiada e o core contraído durante todo o movimento."
  },
  hack: {
    nome: "Hack squat",
    img: "img/hack.webp",
    musculos: "Quadríceps e glúteos",
    passos: [
      "Apoie as costas e os ombros no encosto, com os pés na plataforma na largura do quadril.",
      "Destrave a máquina e desça flexionando os joelhos de forma controlada.",
      "Suba empurrando a plataforma com o pé inteiro, sem travar os joelhos."
    ],
    dica: "os joelhos acompanham a direção da ponta dos pés."
  },
  abdutora: {
    nome: "Abdutora",
    img: "img/abdutora.webp",
    musculos: "Glúteo médio e glúteo mínimo",
    passos: [
      "Sente-se com as costas apoiadas e a parte externa dos joelhos contra as almofadas.",
      "Afaste as pernas de forma controlada até o máximo confortável.",
      "Volte devagar, sem deixar as placas de peso baterem."
    ],
    dica: "segure 1 segundo na abertura máxima para sentir mais o glúteo."
  },
  leg_unilateral: {
    nome: "Leg press horizontal unilateral",
    img: "img/leg_horizontal_unilateral.jpg",
    musculos: "Quadríceps e glúteos",
    passos: [
      "Sente-se com as costas apoiadas e coloque um pé no centro da plataforma.",
      "Flexione o joelho trazendo a plataforma de forma controlada.",
      "Empurre de volta sem travar o joelho. Complete as repetições e troque de perna."
    ],
    dica: "comece pela perna mais fraca e faça o mesmo número de repetições na outra."
  },
  puxada: {
    nome: "Puxada alta aberta",
    img: "img/puxada.webp",
    musculos: "Dorsais, bíceps e parte posterior dos ombros",
    passos: [
      "Ajuste o apoio das coxas e segure a barra com as mãos mais afastadas que os ombros.",
      "Puxe a barra em direção à parte de cima do peito, levando os cotovelos para baixo.",
      "Volte de forma controlada até estender os braços."
    ],
    dica: "peito aberto e ombros longe das orelhas; evite jogar o tronco para trás."
  },
  remada: {
    nome: "Remada baixa unilateral",
    img: "img/remada.webp",
    musculos: "Dorsais, meio das costas e bíceps",
    passos: [
      "Sente-se com o tronco ereto e segure a pegada com uma das mãos.",
      "Puxe levando o cotovelo para trás, próximo ao corpo.",
      "Volte devagar estendendo o braço. Complete as repetições e troque de lado."
    ],
    dica: "evite girar o tronco; quem faz o movimento são as costas."
  },
  supino: {
    nome: "Chest press / supino máquina",
    img: "img/supino.webp",
    musculos: "Peitoral, tríceps e parte da frente dos ombros",
    passos: [
      "Ajuste o banco para que as pegadas fiquem na altura do meio do peito.",
      "Empurre as pegadas para a frente até quase estender os braços.",
      "Volte de forma controlada, sentindo o peito alongar."
    ],
    dica: "mantenha as costas apoiadas e os ombros encaixados para trás."
  },
  desenvolvimento: {
    nome: "Desenvolvimento de ombros",
    img: "img/desenvolvimento.webp",
    musculos: "Ombros e tríceps",
    passos: [
      "Sente-se com as costas apoiadas e as pegadas na altura dos ombros.",
      "Empurre para cima até quase estender os braços.",
      "Desça devagar até a altura dos ombros."
    ],
    dica: "não arqueie a lombar; mantenha o abdômen contraído."
  },
  rosca_martelo: {
    nome: "Rosca martelo",
    img: "img/rosca_martelo.webp",
    musculos: "Bíceps e antebraços",
    passos: [
      "Em pé, segure os halteres com as palmas voltadas uma para a outra.",
      "Flexione os cotovelos levando os halteres em direção aos ombros.",
      "Desça de forma controlada até estender os braços."
    ],
    dica: "cotovelos fixos ao lado do corpo, sem balançar o tronco."
  },
  triceps_polia: {
    nome: "Tríceps na polia com corda",
    img: "img/triceps_polia.webp",
    musculos: "Tríceps",
    passos: [
      "De frente para a polia alta, segure a corda com os cotovelos junto ao corpo.",
      "Estenda os cotovelos empurrando a corda para baixo e abrindo as pontas no final.",
      "Volte devagar até os antebraços ficarem um pouco acima da linha paralela ao chão."
    ],
    dica: "só os antebraços se movem; os cotovelos ficam parados."
  },
  flexora_sentada: {
    nome: "Flexora sentada",
    img: "img/flexora_sentada.webp",
    musculos: "Posteriores de coxa",
    passos: [
      "Ajuste a máquina para o joelho ficar alinhado ao eixo e o rolo atrás do tornozelo.",
      "Flexione os joelhos puxando o rolo para baixo e para trás.",
      "Volte de forma controlada até quase estender as pernas."
    ],
    dica: "trave bem as coxas com o apoio e não tire o quadril do banco."
  },
  stiff: {
    nome: "Stiff / levantamento romeno",
    img: "img/stiff.webp",
    musculos: "Posteriores de coxa, glúteos e lombar",
    passos: [
      "Em pé, segure a barra ou os halteres à frente das coxas, com os joelhos levemente flexionados.",
      "Leve o quadril para trás descendo o peso rente às pernas, com as costas retas.",
      "Suba contraindo os glúteos até ficar ereta novamente."
    ],
    dica: "desça só até onde conseguir manter a coluna neutra."
  },
  bulgaro: {
    nome: "Agachamento búlgaro com apoio",
    img: "img/bulgaro.webp",
    musculos: "Quadríceps e glúteos",
    passos: [
      "Apoie o peito de um pé no banco atrás de você e segure em um apoio para se equilibrar.",
      "Desça flexionando o joelho da frente até a coxa ficar perto da linha paralela ao chão.",
      "Suba empurrando o chão com o pé da frente. Complete as repetições e troque de lado."
    ],
    dica: "tronco levemente inclinado à frente ativa mais o glúteo."
  },
  sumo_kb: {
    nome: "Agachamento sumô com kettlebell",
    img: "img/sumo_kb.webp",
    musculos: "Glúteos, adutores e quadríceps",
    passos: [
      "Afaste os pés além da largura dos ombros, com as pontas para fora, segurando o kettlebell à frente.",
      "Agache levando o quadril para baixo, com o tronco ereto.",
      "Suba empurrando o chão e contraindo os glúteos no topo."
    ],
    dica: "empurre os joelhos para fora, na direção das pontas dos pés."
  },
  lateral_polia: {
    nome: "Elevação lateral na polia",
    img: "img/lateral_polia.webp",
    musculos: "Ombros (deltoide lateral)",
    passos: [
      "De lado para a polia baixa, segure a pegada com a mão mais distante dela.",
      "Eleve o braço para o lado até a altura do ombro, com o cotovelo levemente flexionado.",
      "Desça devagar. Complete as repetições e troque de lado."
    ],
    dica: "leve o cotovelo para cima, não a mão, e não suba os ombros."
  },
  supino_declinado: {
    nome: "Supino declinado na máquina",
    img: "img/supino_declinado.webp",
    musculos: "Peitoral (parte inferior) e tríceps",
    passos: [
      "Ajuste o banco e segure as pegadas na linha da parte de baixo do peito.",
      "Empurre para a frente e para baixo até quase estender os braços.",
      "Volte de forma controlada."
    ],
    dica: "mantenha as escápulas encaixadas e as costas apoiadas."
  },
  remada_alta: {
    nome: "Remada alta",
    img: "img/remada_alta.webp",
    musculos: "Ombros e trapézio",
    passos: [
      "Em pé, segure a barra ou a pegada da polia à frente das coxas.",
      "Puxe para cima, rente ao corpo, levando os cotovelos para o lado até perto da altura dos ombros.",
      "Desça devagar até estender os braços."
    ],
    dica: "não suba além da altura dos ombros para proteger a articulação."
  },
  triceps_maquina: {
    nome: "Tríceps máquina",
    img: "img/triceps_maquina.webp",
    musculos: "Tríceps",
    passos: [
      "Ajuste o banco para os cotovelos ficarem apoiados e alinhados ao eixo da máquina.",
      "Estenda os cotovelos empurrando as pegadas.",
      "Volte de forma controlada."
    ],
    dica: "mantenha as costas apoiadas e os ombros relaxados."
  },
  rosca_polia: {
    nome: "Rosca bíceps na polia",
    img: "img/rosca_polia.webp",
    musculos: "Bíceps",
    passos: [
      "De frente para a polia baixa, segure a barra com as palmas para cima.",
      "Flexione os cotovelos levando a barra em direção aos ombros.",
      "Desça devagar até estender os braços."
    ],
    dica: "cotovelos colados ao corpo, sem balançar o tronco."
  },
  pulldown_corda: {
    nome: "Pulldown com corda",
    img: "img/pulldown_corda.webp",
    musculos: "Dorsais",
    passos: [
      "De frente para a polia alta, segure a corda com os braços estendidos e o tronco levemente inclinado.",
      "Puxe a corda em direção às coxas mantendo os braços quase retos.",
      "Volte devagar até sentir as costas alongarem."
    ],
    dica: "pense em levar os cotovelos para trás, contraindo as costas."
  },
  hip_thrust: {
    nome: "Hip thrust",
    img: "img/hip_thrust.webp",
    musculos: "Glúteos e posteriores",
    passos: [
      "Apoie a parte de cima das costas no banco, com a barra ou a pegada sobre o quadril.",
      "Empurre o quadril para cima até o tronco ficar alinhado com as coxas.",
      "Desça de forma controlada."
    ],
    dica: "queixo levemente para baixo e contração forte do glúteo no topo."
  },
  terra_sumo: {
    nome: "Levantamento terra sumô",
    img: "img/terra_sumo.webp",
    musculos: "Glúteos, posteriores, adutores e lombar",
    passos: [
      "Afaste os pés além da largura dos ombros, com as pontas para fora, e segure o peso entre as pernas.",
      "Com as costas retas, suba estendendo joelhos e quadril ao mesmo tempo.",
      "Desça de forma controlada, levando o quadril para trás."
    ],
    dica: "mantenha o peso próximo ao corpo e o abdômen firme."
  },
  coice: {
    nome: "Coice de glúteo na máquina",
    img: "img/coice_polia.jpg",
    musculos: "Glúteo máximo",
    passos: [
      "Apoie os antebraços ou o peito na máquina e posicione um pé na plataforma ou no apoio.",
      "Empurre a perna para trás e para cima, estendendo o quadril.",
      "Volte devagar. Complete as repetições e troque de lado."
    ],
    dica: "evite arquear a lombar; o movimento vem do glúteo."
  },

  // ---------- Exercícios do treino 2 ----------
  goblet: {
    nome: "Agachamento goblet com halter",
    img: "img/goblet.jpg",
    musculos: "Quadríceps, glúteos e core",
    passos: [
      "Segure um halter na vertical junto ao peito, com os pés um pouco além da largura do quadril.",
      "Agache levando o quadril para trás e para baixo, com o peito aberto e os cotovelos entre os joelhos.",
      "Suba empurrando o chão com o pé inteiro até ficar em pé."
    ],
    dica: "joelhos na direção das pontas dos pés e calcanhares sempre no chão."
  },
  leg_horizontal: {
    nome: "Leg press horizontal",
    img: "img/leg_horizontal.jpg",
    musculos: "Quadríceps, glúteos e posteriores",
    passos: [
      "Sente-se com as costas apoiadas e os pés na plataforma na largura dos ombros.",
      "Flexione os joelhos trazendo a plataforma de forma controlada.",
      "Empurre de volta até quase estender as pernas."
    ],
    dica: "controle a descida e não trave os joelhos."
  },
  afundo: {
    nome: "Afundo reverso com halteres",
    img: "img/afundo.jpg",
    musculos: "Glúteos e quadríceps",
    passos: [
      "Em pé, segure um halter em cada mão ao lado do corpo.",
      "Dê um passo para trás e desça até os dois joelhos ficarem perto de 90°.",
      "Empurre com a perna da frente para voltar. Complete as repetições e troque de perna."
    ],
    dica: "tronco firme e joelho da frente alinhado com o pé."
  },
  remada_polia: {
    nome: "Remada baixa na polia",
    img: "img/remada.webp",
    musculos: "Dorsais, meio das costas e bíceps",
    passos: [
      "Sente-se com os pés apoiados, joelhos levemente flexionados e tronco ereto.",
      "Puxe a pegada em direção ao abdômen, levando os cotovelos para trás.",
      "Volte devagar estendendo os braços, sem curvar as costas."
    ],
    dica: "conduza o movimento pelos cotovelos e evite balançar o tronco."
  },
  remada_halter: {
    nome: "Remada unilateral com halter",
    img: "img/remada_halter.jpg",
    musculos: "Dorsais, meio das costas e bíceps",
    passos: [
      "Apoie um joelho e a mão do mesmo lado no banco, com as costas retas.",
      "Com a outra mão, puxe o halter em direção ao quadril, levando o cotovelo para trás.",
      "Desça devagar até estender o braço. Complete as repetições e troque de lado."
    ],
    dica: "conduza o movimento pelo cotovelo, sem girar o tronco."
  },
  stiff_halteres: {
    nome: "Stiff com halteres",
    img: "img/stiff.webp",
    musculos: "Posteriores de coxa, glúteos e lombar",
    passos: [
      "Em pé, segure os halteres à frente das coxas, com os joelhos levemente flexionados.",
      "Leve o quadril para trás descendo os halteres rente às pernas.",
      "Suba contraindo os glúteos até ficar ereta."
    ],
    dica: "leve o quadril para trás mantendo a coluna neutra."
  },
  flexora_maquina: {
    nome: "Flexora na máquina",
    img: "img/flexora_sentada.webp",
    musculos: "Posteriores de coxa",
    passos: [
      "Ajuste a máquina para o joelho ficar alinhado ao eixo e o rolo atrás do tornozelo.",
      "Flexione os joelhos de forma controlada.",
      "Volte devagar até quase estender as pernas."
    ],
    dica: "confirme a regulagem da estação antes de começar."
  },
  bulgaro_halteres: {
    nome: "Agachamento búlgaro com halteres e apoio",
    img: "img/bulgaro.webp",
    musculos: "Quadríceps e glúteos",
    passos: [
      "Apoie o peito de um pé no banco atrás de você, segurando um halter (ou apoio) para equilíbrio.",
      "Desça flexionando o joelho da frente até a coxa ficar perto da linha paralela ao chão.",
      "Suba empurrando o chão com o pé da frente. Complete as repetições e troque de perna."
    ],
    dica: "use apoio para ter estabilidade."
  },
  sumo_halter: {
    nome: "Agachamento sumô com halter",
    img: "img/sumo_kb.webp",
    musculos: "Glúteos, adutores e quadríceps",
    passos: [
      "Afaste os pés além da largura dos ombros, pontas para fora, segurando o halter à frente.",
      "Agache levando o quadril para baixo, com o tronco ereto.",
      "Suba empurrando o chão e contraindo os glúteos no topo."
    ],
    dica: "mantenha os joelhos alinhados com os pés."
  },
  abdominal: {
    nome: "Abdominal",
    img: "img/abdominal.jpg",
    musculos: "Abdômen (reto abdominal)",
    passos: [
      "Deite de costas com os joelhos flexionados e os pés apoiados no chão.",
      "Com as mãos atrás da cabeça, eleve os ombros do chão contraindo o abdômen.",
      "Desça devagar sem relaxar totalmente."
    ],
    dica: "não puxe o pescoço com as mãos; olhe para o teto."
  },
  supino_halteres: {
    nome: "Supino reto com halteres",
    img: "img/supino_halteres.jpg",
    musculos: "Peitoral, tríceps e parte da frente dos ombros",
    passos: [
      "Deite no banco com os pés apoiados no chão e um halter em cada mão na altura do peito.",
      "Empurre os halteres para cima até quase estender os braços.",
      "Desça de forma controlada até a linha do peito."
    ],
    dica: "mantenha os pés apoiados e controle a descida."
  },
  desenvolvimento_halteres: {
    nome: "Desenvolvimento com halteres",
    img: "img/desenvolvimento_halteres.jpg",
    musculos: "Ombros e tríceps",
    passos: [
      "Sente-se no banco com encosto, halteres na altura dos ombros e palmas para a frente.",
      "Empurre os halteres para cima até quase estender os braços.",
      "Desça devagar até a altura dos ombros."
    ],
    dica: "não arqueie a lombar; abdômen contraído."
  },
  elevacao_lateral: {
    nome: "Elevação lateral com halteres",
    img: "img/elevacao_lateral.jpg",
    musculos: "Ombros (deltoide lateral)",
    passos: [
      "Em pé, segure os halteres ao lado do corpo com os cotovelos levemente flexionados.",
      "Eleve os braços para os lados até a altura dos ombros.",
      "Desça devagar."
    ],
    dica: "evite impulso e não suba os ombros em direção às orelhas."
  },
  face_pull: {
    nome: "Face pull na polia",
    img: "img/face_pull.jpg",
    musculos: "Parte posterior dos ombros e meio das costas",
    passos: [
      "Ajuste a polia na altura do rosto e segure a corda com as palmas para baixo.",
      "Puxe a corda em direção ao rosto, abrindo as pontas e levando os cotovelos para trás e para cima.",
      "Volte devagar estendendo os braços."
    ],
    dica: "puxe em direção ao rosto sem elevar os ombros."
  },
  step_up: {
    nome: "Step-up com halteres",
    img: "img/step_up.jpg",
    musculos: "Glúteos e quadríceps",
    passos: [
      "Fique de frente para o banco ou caixote, com um halter em cada mão.",
      "Apoie um pé inteiro em cima e suba estendendo essa perna.",
      "Desça de forma controlada. Complete as repetições e troque de perna."
    ],
    dica: "evite impulsionar com a perna que fica no chão."
  },
  coice_polia: {
    nome: "Coice de glúteo na polia",
    img: "img/coice_polia.jpg",
    musculos: "Glúteo máximo",
    passos: [
      "Prenda a tornozeleira na polia baixa e segure na estação, com o tronco levemente inclinado.",
      "Leve a perna para trás estendendo o quadril, até sentir o glúteo contrair.",
      "Volte devagar. Complete as repetições e troque de perna."
    ],
    dica: "não arqueie a lombar."
  }
};

// ======================= TREINO 1 =======================
const DIAS_T1 = [
  {
    id: "seg", curto: "Seg", nome: "Segunda", treino: "Inferiores A",
    foco: "quadríceps e glúteos", tempo: "~ 50–60 min",
    exercicios: [
      { id: "extensora", reps: "12–15" },
      { id: "leg_press", reps: "10–12" },
      { id: "hack", reps: "10–12" },
      { id: "abdutora", reps: "12–15" },
      { id: "leg_unilateral", reps: "10 por lado" }
    ]
  },
  {
    id: "ter", curto: "Ter", nome: "Terça", treino: "Superiores A",
    foco: "costas, peito, ombros e braços", tempo: "~ 55–65 min",
    exercicios: [
      { id: "puxada", reps: "10–12" },
      { id: "remada", reps: "10–12 por lado" },
      { id: "supino", reps: "10–12" },
      { id: "desenvolvimento", reps: "10–12" },
      { id: "rosca_martelo", reps: "10–12" },
      { id: "triceps_polia", reps: "10–12" }
    ]
  },
  {
    id: "qua", curto: "Qua", nome: "Quarta", treino: "Inferiores B",
    foco: "posteriores e glúteos", tempo: "~ 50–60 min",
    exercicios: [
      { id: "flexora_sentada", reps: "12–15" },
      { id: "stiff", reps: "8–10" },
      { id: "bulgaro", reps: "10 por lado" },
      { id: "sumo_kb", reps: "10–12" },
      { id: "abdutora", reps: "12–15" }
    ]
  },
  {
    id: "qui", curto: "Qui", nome: "Quinta", treino: "Superiores B",
    foco: "ombros, peito, costas e braços", tempo: "~ 60–75 min",
    exercicios: [
      { id: "desenvolvimento", reps: "10–12" },
      { id: "lateral_polia", reps: "12–15" },
      { id: "supino_declinado", reps: "10–12" },
      { id: "remada_alta", reps: "10–12" },
      { id: "triceps_maquina", reps: "10–12" },
      { id: "rosca_polia", reps: "10–12" },
      { id: "pulldown_corda", reps: "12–15" }
    ]
  },
  {
    id: "sex", curto: "Sex", nome: "Sexta", treino: "Inferiores C",
    foco: "glúteos e quadríceps", tempo: "~ 50–60 min",
    exercicios: [
      { id: "hip_thrust", reps: "10–12" },
      { id: "terra_sumo", reps: "10–12" },
      { id: "coice", reps: "12–15 por lado" },
      { id: "abdutora", reps: "12–15" },
      { id: "extensora", reps: "12–15" }
    ]
  }
];

// ======================= TREINO 2 =======================
const DIAS_T2 = [
  {
    id: "seg", curto: "Seg", nome: "Segunda", treino: "Quadríceps + glúteos",
    curtoTreino: "Quad + glúteo", foco: "pernas com ênfase em quadríceps", tempo: "~ 60–75 min", descansoSeg: 90,
    aquecimento: "5–8 minutos de caminhada ou elíptico leve + mobilidade de quadril, joelhos e tornozelos.",
    descanso: "90 s nos exercícios principais e 60 s nos isolados.",
    cardio: "Esteira — caminhada moderada · 15–20 min",
    exercicios: [
      { id: "goblet", series: 3, reps: "10–12" },
      { id: "leg_horizontal", series: 3, reps: "10–12" },
      { id: "extensora", series: 3, reps: "10–12", dica: "segure 1 segundo na contração." },
      { id: "afundo", series: 2, reps: "10 por perna" },
      { id: "abdutora", nome: "Cadeira abdutora", series: 2, reps: "12–15", dica: "segure 2 segundos ao abrir." }
    ]
  },
  {
    id: "ter", curto: "Ter", nome: "Terça", treino: "Costas + bíceps",
    curtoTreino: "Costas + bíceps", foco: "puxadas, remadas e bíceps", tempo: "~ 60–75 min", descansoSeg: 75,
    aquecimento: "5 minutos de cardio leve + mobilidade de ombros e escápulas.",
    descanso: "60–90 s.",
    cardio: "Elíptico — ritmo confortável · 15–20 min",
    exercicios: [
      { id: "puxada", nome: "Puxada alta com pegada aberta", series: 3, reps: "10–12", dica: "evite balançar o tronco nas puxadas." },
      { id: "remada_polia", series: 3, reps: "10–12" },
      { id: "remada_halter", series: 2, reps: "10 por braço" },
      { id: "pulldown_corda", series: 2, reps: "12–15", dica: "evite balançar o tronco; leve os cotovelos para trás." },
      { id: "rosca_martelo", nome: "Rosca martelo com halteres", series: 3, reps: "10–12", dica: "mantenha os punhos neutros." }
    ]
  },
  {
    id: "qua", curto: "Qua", nome: "Quarta", treino: "Posterior + glúteos",
    curtoTreino: "Post + glúteo", foco: "posterior de coxa, glúteos e abdômen", tempo: "~ 60–75 min", descansoSeg: 90,
    aquecimento: "5–8 minutos leves + mobilidade de quadril e posterior de coxa.",
    descanso: "cerca de 90 s nos exercícios principais.",
    cardio: "Sem cardio obrigatório; priorizar recuperação.",
    exercicios: [
      { id: "stiff_halteres", series: 3, reps: "10–12" },
      { id: "flexora_maquina", series: 3, reps: "10–12" },
      { id: "bulgaro_halteres", series: 2, reps: "8–10 por perna" },
      { id: "sumo_halter", series: 2, reps: "12" },
      { id: "abdominal", series: 2, reps: "12–15" }
    ]
  },
  {
    id: "qui", curto: "Qui", nome: "Quinta", treino: "Peito + ombros + tríceps",
    curtoTreino: "Peito + ombro", foco: "empurrar: peito, ombros e tríceps", tempo: "~ 60–75 min", descansoSeg: 75,
    aquecimento: "5 minutos de cardio leve + mobilidade de ombros.",
    descanso: "60–90 s.",
    cardio: "Elíptico — ritmo moderado · 15–20 min",
    exercicios: [
      { id: "supino_halteres", series: 3, reps: "10–12" },
      { id: "desenvolvimento_halteres", series: 3, reps: "10–12" },
      { id: "elevacao_lateral", series: 3, reps: "12–15" },
      { id: "triceps_polia", nome: "Tríceps pulley com corda", series: 3, reps: "10–12", dica: "mantenha os cotovelos próximos ao corpo." },
      { id: "face_pull", series: 2, reps: "12–15" }
    ]
  },
  {
    id: "sex", curto: "Sex", nome: "Sexta", treino: "Glúteos + quadríceps",
    curtoTreino: "Glúteo + quad", foco: "pernas com ênfase em glúteos", tempo: "~ 60–75 min", descansoSeg: 75,
    aquecimento: "5–8 minutos leves + mobilidade de quadril e tornozelos.",
    descanso: "60–90 s.",
    cardio: "Caminhada leve, se estiver recuperada · 10–15 min",
    exercicios: [
      { id: "hip_thrust", nome: "Elevação pélvica com barra", series: 3, reps: "10–12", dica: "segure 2 segundos no topo." },
      { id: "leg_unilateral", series: 2, reps: "10 por perna" },
      { id: "coice_polia", series: 2, reps: "12 por perna" },
      { id: "abdutora", nome: "Cadeira abdutora", series: 3, reps: "12–15", dica: "faça o movimento controlado." },
      { id: "goblet", nome: "Agachamento goblet", series: 2, reps: "12" }
    ]
  }
];

// ======================= PLANOS =======================
const PLANOS = [
  {
    id: "t2",
    nome: "Treino 2",
    descricao: "Plano de retomada · ênfase em glúteos e inferiores",
    dias: DIAS_T2,
    orientacoes: [
      {
        titulo: "Objetivos",
        itens: [
          "Emagrecimento, manutenção e desenvolvimento de massa muscular, com ênfase em glúteos e membros inferiores.",
          "Duração estimada: 60–75 minutos por sessão, incluindo aquecimento e cardio quando indicado.",
          "Fim de semana: descanso ou atividade leve."
        ]
      },
      {
        titulo: "Progressão nas primeiras semanas",
        itens: [
          "Semanas 1–2: comece com 2 séries por exercício, cargas leves a moderadas e foco na técnica.",
          "Semanas 3–4: se estiver recuperando bem, avance para o número de séries indicado na ficha.",
          "Semanas 5–6: aumente gradualmente a carga quando conseguir completar o topo da faixa de repetições com boa execução.",
          "Intensidade: nas primeiras semanas, termine cada série sentindo que ainda conseguiria fazer aproximadamente 2–3 repetições com boa técnica. Não é necessário treinar até a falha nem usar drop-set nesta fase."
        ]
      },
      {
        titulo: "Regras importantes",
        itens: [
          "Faça 5–8 minutos de aquecimento antes da musculação.",
          "Inclua mobilidade dinâmica das articulações envolvidas.",
          "Séries leves de aquecimento não contam como séries efetivas.",
          "Priorize a execução antes de aumentar a carga.",
          "Faça alongamento leve ao final, sem forçar amplitudes.",
          "Se estiver muito dolorida ou sem recuperação, reduza o volume e priorize o descanso.",
          "Anote a carga utilizada e as repetições realizadas a cada sessão. Aumente a carga apenas quando mantiver amplitude e controle adequados."
        ]
      },
      {
        titulo: "Observações de segurança",
        itens: [
          "Confirme a seleção, a técnica, as cargas e a regulagem das máquinas com sua treinadora.",
          "A estação de flexão/extensão de joelhos deve ser ajustada e identificada corretamente antes do uso.",
          "Interrompa qualquer exercício que provoque dor articular ou dor aguda e procure orientação profissional."
        ]
      }
    ]
  },
  {
    id: "t1",
    nome: "Treino 1",
    descricao: "3 dias de inferiores e 2 de superiores · 3 séries",
    dias: DIAS_T1,
    orientacoes: [
      {
        titulo: "Orientações gerais",
        itens: [
          "Nas primeiras 1–2 semanas após a pausa, escolha cargas moderadas e finalize cada série sentindo que conseguiria fazer cerca de 3 repetições extras, mantendo a técnica.",
          "Depois, progrida gradualmente: aumente repetições dentro da faixa e/ou a carga quando conseguir completar todas as séries com boa execução.",
          "Descanso sugerido: 60–120 segundos entre séries; exercícios mais exigentes podem pedir até 2 minutos.",
          "Faça aquecimento leve e séries de preparação antes dos movimentos principais. O aquecimento não conta como as 3 séries de trabalho.",
          "Cardio opcional e leve: caminhada de 10–15 minutos algumas vezes na semana, aumentando aos poucos conforme disposição e recuperação.",
          "Interrompa se houver dor aguda ou desconforto incomum. Para ajustes de técnica e carga, siga as orientações do profissional que acompanha seu treino."
        ]
      }
    ]
  }
];

const PLANO_PADRAO = "t2";
const SERIES_PADRAO = 3;
