import { ChakraData, TimelinePhase, RiskItem, ReflectionQuestion, PaymentBreakdown } from '../types';

export const PROTOCOL_INFO = {
  code: "INV-178479",
  clientName: "Sara Ouachtouk",
  targetName: "Mahdi",
  title: "Svincolo Ancestrale",
  subtitle: "Relazione Operativa & Protocollo di Intervento",
  status: "In Attesa di Attivazione",
  probability: "85-90%",
  durationDays: 36,
  motto: "Omnia vincit Amor, sed fati necessitas est.",
};

export const CHAKRA_INITIAL_DATA: ChakraData[] = [
  {
    id: "radice",
    name: "Radice (Muladhara)",
    italianName: "Radice (Famiglia)",
    description: "Centrato sui legami di appartenenza, sicurezza e debiti morali con il clan familiare.",
    currentLevel: 95,
    targetLevel: 40,
    status: "critical",
    impactNote: "Eccesso di pressione e condizionamento familiare. Mahdi si sente un 'pilastro' coatto e non si permette desideri propri."
  },
  {
    id: "sacrale",
    name: "Sacrale (Svadhisthana)",
    italianName: "Sacrale (Desiderio)",
    description: "Centro della passione, libido, pulsione vitale e intimità di coppia.",
    currentLevel: 15,
    targetLevel: 85,
    status: "blocked",
    impactNote: "L'intimità è fortemente contratta. Il Fuoco è soffocato dal dovere primordiale verso la madre e il clan."
  },
  {
    id: "plesso",
    name: "Plesso Solare (Manipura)",
    italianName: "Plesso (Volontà)",
    description: "Capacità di prendere decisioni autonome e spezzare ricatti emotivi.",
    currentLevel: 30,
    targetLevel: 80,
    status: "blocked",
    impactNote: "Sovrapposto dal senso di colpa. Difficoltà nel dire 'no' alle richieste economiche e morali della famiglia."
  },
  {
    id: "cuore",
    name: "Cuore (Anahata)",
    italianName: "Cuore (Sentimento)",
    description: "Sentimento autentico, affetto e protezione nei confronti di Sara.",
    currentLevel: 45,
    targetLevel: 90,
    status: "normal",
    impactNote: "Sentimento presente ma confinato sotto strati di ansia sistemica e paura dell'abbandono familiare."
  },
  {
    id: "gola",
    name: "Gola (Vishuddha)",
    italianName: "Gola (Comunicazione)",
    description: "Capacità di esprimere la propria verità senza filtri o ritrosie.",
    currentLevel: 20,
    targetLevel: 75,
    status: "blocked",
    impactNote: "Silenzio difensivo, risposte elusive o chiusura ermetica quando si affrontano argomenti di futuro con Sara."
  },
  {
    id: "intuizione",
    name: "Terzo Occhio (Ajna)",
    italianName: "Intuizione",
    description: "Lucidità di visione e discernimento tra ciò che è suo e ciò che è imposto.",
    currentLevel: 35,
    targetLevel: 80,
    status: "normal",
    impactNote: "Offuscamento temporaneo prodotto dal disordine energetico familiare."
  },
  {
    id: "spiritualita",
    name: "Corona (Sahasrara)",
    italianName: "Spiritualità",
    description: "Allineamento con il proprio destino elevato e la missione di vita.",
    currentLevel: 40,
    targetLevel: 70,
    status: "normal",
    impactNote: "Canale ricettivo ma necessita di schermatura costante per evitare infiltrazioni involontarie."
  }
];

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 1,
    code: "FASE I",
    title: "Schermatura & Preparazione",
    subtitle: "Consacrazione degli strumenti & Scudo Protettivo",
    dates: "23 - 27 Luglio",
    startDate: "2026-07-23",
    endDate: "2026-07-27",
    lunarPhase: "Preparazione",
    status: "active",
    description: "Attivazione dello scudo per Sara. Preparazione dei testimoni energetici, pulizia degli incensi cerimoniali e purificazione del campo aurico.",
    keyActions: [
      "Tracciamento del pentacolo di protezione per Sara",
      "Consacrazione dei testimoni organici di Mahdi",
      "Sigillatura delle vie di dispersione energetica",
      "Preparazione delle miscele d'incenso a base di Mirra e Ruta"
    ],
    protocolRule: "Mantenere la calma emotiva e non innescare discussioni sui temi familiari durante questa finestra.",
    intensity: "Medium"
  },
  {
    id: 2,
    code: "FASE II",
    title: "Rituale I: Il Grande Taglio",
    subtitle: "Recisione dei Cordoni Tossici",
    dates: "03 - 11 Agosto",
    startDate: "2026-08-03",
    endDate: "2026-08-11",
    lunarPhase: "Calante",
    status: "upcoming",
    description: "Esecuzione durante la LUNA CALANTE per dissolvere i vincoli di dipendenza. Recisione dei cordoni ombelicali tossici. Mahdi viene svincolato dal senso di colpa e dalle pretese finanziarie sproporzionate del clan.",
    keyActions: [
      "Operazione notturna di recisione simbolico-energetica",
      "Neutralizzazione dei ricatti emotivi materni",
      "Annullamento dell'ancoraggio energetico sui risparmi di Mahdi",
      "Iniezione di fluido purificatore di piombo ed elio"
    ],
    protocolRule: "Potrebbe manifestarsi un momentaneo distacco o freddezza da parte di Mahdi. Non allarmarsi: è la reazione al taglio.",
    intensity: "High"
  },
  {
    id: 3,
    code: "FASE III",
    title: "Assestamento & Vuoto Sacro",
    subtitle: "Integrazione dell'Anima",
    dates: "12 - 14 Agosto",
    startDate: "2026-08-12",
    endDate: "2026-08-14",
    lunarPhase: "Nuova",
    status: "upcoming",
    description: "Fase durante la LUNA NUOVA. Vuoto sacro necessario affinché la struttura psichica e l'anima di Mahdi integrino la libertà acquisita senza contraccolpi.",
    keyActions: [
      "Silenzio rituale e sospensione delle cariche dirette",
      "Monitoraggio a distanza dei flussi aurici",
      "Stabilizzazione della frequenza di Sara",
      "Preparazione del terreno per la riaccensione"
    ],
    protocolRule: "Massima cautela nelle comunicazioni. Evitare pressioni o richieste di chiarimenti immediati.",
    intensity: "Resting"
  },
  {
    id: 4,
    code: "FASE IV",
    title: "Rituale II: Riaccensione Sacrale",
    subtitle: "Magnetismo & Unione Rinnovata",
    dates: "18 - 26 Agosto",
    startDate: "2026-08-18",
    endDate: "2026-08-26",
    lunarPhase: "Crescente",
    status: "upcoming",
    description: "Invocazione sotto la LUNA CRESCENTE. Iniezione di energia sacrale e riaccensione del fuoco interiore. Riattivazione del desiderio fisico spontaneo e della visione condivisa di un futuro con Sara.",
    keyActions: [
      "Attivazione del sigillo di attrazione Venusiana",
      "Incanalamento di fluido energetico rigenerante",
      "Riallineamento del chakra del Cuore con quello di Sara",
      "Consolidamento della certezza di scelta di Mahdi"
    ],
    protocolRule: "Accogliere il suo riavvicinamento con dolcezza, senza rinfacciare le assenze passate.",
    intensity: "High"
  }
];

export const RISK_MATRIX: RiskItem[] = [
  {
    id: "risk-1",
    title: "Instabilità Emotiva Temporanea di Mahdi",
    category: "Psicologico / Energetico",
    description: "Nel periodo immediatamente successivo al taglio (3-11 Agosto), Mahdi potrebbe avvertire un senso di spaesamento o vertigine privo di causa apparente.",
    impactLevel: "Alta",
    mitigationStrategy: "La schermatura di Sara assorbe la dissonanza. Si raccomanda dolcezza e assenza di giudizio.",
    status: "monitored"
  },
  {
    id: "risk-2",
    title: "Reazione Dissonante del Clan Familiare",
    category: "Relazionale",
    description: "La madre o altri membri del clan potrebbero avvertire la perdita di controllo e tentare ricatti emotivi ad alta intensità per riagganciarlo.",
    impactLevel: "Media",
    mitigationStrategy: "Lo scudo rituale impedisce ai dardi emotivi di penetrare nel campo di Mahdi, trasformando le pressioni in disinteresse progressivo.",
    status: "contained"
  },
  {
    id: "risk-3",
    title: "Colpo di Ritorno (Energia Riflessa)",
    category: "Esoterico / Protezione",
    description: "Possibile rimbalzo delle cariche negative inviate involontariamente dai familiari in opposizione.",
    impactLevel: "Bassa",
    mitigationStrategy: "Totalmente neutralizzato mediante il tracciamento dei testimoni e la benedizione del nome di Sara.",
    status: "contained"
  }
];

export const REFLECTION_QUESTIONS: ReflectionQuestion[] = [
  {
    id: 1,
    question: "Lo sto liberando per il suo vero bene o per pacificare la mia ansia?",
    context: "Il rituale non aggiunge un vincolo, ma rimuove una zavorra. Devi essere pronta a vederlo agire con reale libero arbitrio."
  },
  {
    id: 2,
    question: "Sono pronta ad accettare l'uomo autonomo che emergerà dopo il taglio?",
    context: "Senza la scusa della pressione familiare, Mahdi mostrerà la sua vera essenza matura."
  },
  {
    id: 3,
    question: "Saprò colmare con amore sano il vuoto che la distanza dalla famiglia lascerà?",
    context: "Il vuoto lasciatogli dal clan necessita di essere riempito di serenità, rispetto e complicità quotidiana."
  }
];

export const PAYMENT_DATA: PaymentBreakdown = {
  totalInvestment: 500,
  depositFeePaid: 70,
  remainingTotal: 430,
  advancePayment: {
    percentage: 70,
    amount: 280,
    dueDate: "23 Luglio 2026",
    description: "Copre l'acquisto dei materiali cerimoniali rari (olii consacrati, cere vergini, sigilli in metallo), lo scudo di protezione per Sara e l'avvio della Fase I.",
    status: "pending"
  },
  finalBalance: {
    percentage: 30,
    amount: 150,
    dueDate: "Fine Agosto 2026",
    description: "Da versare a compimento del Rituale II (Riaccensione) dopo la conferma di stabilizzazione dei flussi.",
    status: "pending"
  }
};
