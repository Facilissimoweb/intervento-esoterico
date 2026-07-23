import { ChakraData, TimelinePhase, RiskItem, ReflectionQuestion, PaymentBreakdown } from '../types';

export const PROTOCOL_INFO = {
  code: "N1 - INV-178479",
  operatorName: "TAROT ITALIA (Teresa)",
  clientName: "Sara Ouachtouk",
  targetName: "Mahdi",
  title: "Svincolo Ancestrale",
  subtitle: "Relazione Operativa & Protocollo di Intervento",
  status: "In Attesa di Attivazione",
  probability: "85-90%",
  durationDays: 36,
  motto: "Omnia vincit Amor, sed fati necessitas est.",
};

export const TERESA_OPERATOR_PROFILE = {
  name: "Teresa",
  brand: "TAROT ITALIA",
  title: "Operatore Olistico & Tarologa Esoterica",
  subtitle: "Profilo Professionale, Formazione & Qualifiche Certificate",
  academicEducation: {
    degree: "Laurea in Tecniche della Comunicazione Visiva",
    institution: "Accademia di Belle Arti di Macerata",
    description: "Formazione universitaria orientata allo studio e alla padronanza dei linguaggi visivi, simbolici e figurativi."
  },
  qualifications: [
    {
      id: "tarot-2025",
      title: "Lettura dei Tarocchi Rider Waite Smith",
      subtitle: "Percorso 2025",
      mentor: "Mariangela Aggio (Taromante)",
      type: "Tarologia & Simbolismo"
    },
    {
      id: "tarot-esoterico",
      title: "Tarologa - Percorso Annuale (2023/2024)",
      subtitle: "Accademia Nazionale del Tarocco Esoterico",
      mentor: "Dorian Bones (Artista, libero ricercatore, membro fondatore della Società dello Zolfo e direttore dell’Accademia)",
      type: "Tarologia Esoterica"
    },
    {
      id: "reiki",
      title: "Operatore Certificato Reiki di II Livello",
      subtitle: "Lignaggio Originale M. Usui®",
      mentor: "Maestro F. Tartuferi",
      type: "Energetica & Channelling"
    },
    {
      id: "mindfulness",
      title: "Facilitatore Mindfulness",
      subtitle: "Mindfulness Educators ®",
      accreditation: "Accreditata IPHM (International Practitioners of Holistic Medicine)",
      type: "Mindfulness & Presenza"
    },
    {
      id: "naturopatia",
      title: "Operatore Naturopata",
      subtitle: "Future Academy ®",
      accreditation: "Accreditata IPHM (International Practitioners of Holistic Medicine)",
      type: "Naturopatia Olistica"
    },
    {
      id: "ptah-piramidi",
      title: "Pendolo PTAH & Elementi di Piramidologia",
      subtitle: "Individuazione ed elaborazione energie negative (oggetti, persone, luoghi, piante, animali)",
      mentor: "Emiliano Amici (Operatore Olistico)",
      type: "Radiestesia & Chirurgia Energetica"
    }
  ]
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

export const TECHNICAL_PROTOCOL = {
  title: "Parte 3: Protocollo Tecnico Operativo",
  subtitle: "Oltre all'uso dei sigilli cerimoniali, l'intervento si avvarrà di strumentazione di alta precisione.",
  tools: [
    {
      id: "ptah",
      name: "1. IL PENDOLO PTAH",
      type: "Chirurgia Energetica",
      phases: [
        {
          code: "Fase A - Estrazione",
          details: "Utilizzato come un bisturi per individuare e sradicare i cordoni parassitari che collegano Mahdi al clan familiare (Sâoud, Zakia e sorella)."
        },
        {
          code: "Fase B - Dissipazione",
          details: "Frammentazione delle cristallizzazioni di apatia nel campo aurico. Il pendolo emette frequenze che sgretolano la \"corazza\" saturnina che lo rende freddo."
        },
        {
          code: "Fase C - Rinnescamento",
          details: "Iniezione di energia vitale direttamente nei centri sacrali per riaccendere la polarità maschile e il desiderio verso Sara."
        }
      ]
    },
    {
      id: "piramide",
      name: "2. LA PIRAMIDE NUBIANA",
      type: "Acceleratore di Manifestazione",
      description: "I testimoni (nomi e date) di Mahdi e Sara verranno posti all'interno di una Piramide Nubiana. La sua pendenza specifica (72°) funge da acceleratore. La piramide proteggerà l'operazione dalle interferenze esterne della famiglia e manterrà l'energia del \"Rinnescamento\" costante per tutto il mese."
    }
  ]
};

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    id: 1,
    code: "FASE 1",
    title: "Preparazione",
    subtitle: "Consacrazione Strumenti & Scudo Protettivo",
    dates: "Fine Luglio (23 - 31 Luglio)",
    startDate: "2026-07-23",
    endDate: "2026-07-31",
    lunarPhase: "Preparazione",
    status: "active",
    description: "Consacrazione strumenti e creazione dello scudo protettivo per Sara e Teresa. Attivazione dei testimoni energetici e schermatura preventiva.",
    keyActions: [
      "Consacrazione degli strumenti cerimoniali e del Pendolo Ptah",
      "Creazione dello scudo protettivo per Sara e Teresa",
      "Preparazione e attivazione dei testimoni per la Piramide Nubiana",
      "Schermatura del campo aurico contro ingerenze estroverse"
    ],
    protocolRule: "Mantenere uno stato d'animo sereno e fiducioso per non interferire con la schermatura iniziale.",
    intensity: "Medium"
  },
  {
    id: 2,
    code: "FASE 2",
    title: "Il Taglio",
    subtitle: "Rituale di Bando & Estrazione dei Legami Tossici",
    dates: "Inizio Agosto (01 - 10 Agosto)",
    startDate: "2026-08-01",
    endDate: "2026-08-10",
    lunarPhase: "Luna Calante",
    status: "upcoming",
    description: "Esecuzione del RITUALE DI BANDO durante la Luna Calante. Utilizzo del Pendolo Ptah (Fase A: Estrazione & Fase B: Dissipazione) per individuare e sradicare i cordoni parassitari che collegano Mahdi al clan familiare (Sâoud, Zakia e sorella) e sgretolare la corazza saturnina.",
    keyActions: [
      "Esecuzione del RITUALE DI BANDO sotto Luna Calante",
      "Pendolo Ptah - Fase A: Estrazione dei cordoni dal clan (Sâoud, Zakia e sorella)",
      "Pendolo Ptah - Fase B: Dissipazione e sgretolamento della corazza saturnina",
      "Neutralizzazione dei tentativi di condizionamento emotivo"
    ],
    protocolRule: "Durante il 'taglio', Mahdi potrebbe mostrare freddezza o distacco reattivo. Non allarmarsi: è il naturale smaltimento della corazza.",
    intensity: "High"
  },
  {
    id: 3,
    code: "FASE 3",
    title: "Il Vuoto",
    subtitle: "Pausa di Assestamento & Smaltimento",
    dates: "Metà Agosto (11 - 15 Agosto)",
    startDate: "2026-08-11",
    endDate: "2026-08-15",
    lunarPhase: "Luna Nuova",
    status: "upcoming",
    description: "Pausa di assestamento durante la Luna Nuova. Mahdi deve smaltire il distacco dai vecchi schemi familiari in un vuoto rigenerativo proteggente.",
    keyActions: [
      "Silenzio operativo e riassestamento del campo psichico",
      "Smaltimento progressivo dell'influenza del clan familiare",
      "Integrazione dei nuovi livelli di autonomia di Mahdi",
      "Schermatura passiva mediante la Piramide Nubiana"
    ],
    protocolRule: "Pausa di assestamento: evitare di sollecitare Mahdi con discussioni o richieste pressanti.",
    intensity: "Resting"
  },
  {
    id: 4,
    code: "FASE 4",
    title: "La Riaccensione",
    subtitle: "Rituale di Riattivazione & Stabilizzazione",
    dates: "Seconda metà Agosto (16 - 31 Agosto)",
    startDate: "2026-08-16",
    endDate: "2026-08-31",
    lunarPhase: "Luna Crescente",
    status: "upcoming",
    description: "Esecuzione del RITUALE DI RIATTIVAZIONE sotto Luna Crescente. Utilizzo del Pendolo Ptah (Fase C: Rinnescamento) per l'iniezione di energia vitale nei centri sacrali, e della Piramide Nubiana (72°) per stabilizzare il ritorno della passione verso Sara.",
    keyActions: [
      "Esecuzione del RITUALE DI RIATTIVAZIONE sotto Luna Crescente",
      "Pendolo Ptah - Fase C: Rinnescamento dell'energia nei centri sacrali",
      "Attivazione costante della Piramide Nubiana (72°) con i testimoni",
      "Stabilizzazione del desiderio e del legame di coppia con Sara"
    ],
    protocolRule: "Accogliere il ritorno della passione e dell'iniziativa di Mahdi con apertura, dolcezza e naturalezza.",
    intensity: "High"
  }
];

export const RISK_MATRIX: RiskItem[] = [
  {
    id: "risk-1",
    title: "Sbalzi d'Umore Necessari alla Guarigione",
    category: "Fattore di Pericolo / Psichico",
    description: "Durante il 'taglio' e la rimozione delle sovrastrutture, Mahdi potrebbe avere momenti di sbalzi d'umore o temporanea disorientazione necessari al processo di guarigione e svincolo.",
    impactLevel: "Alta",
    mitigationStrategy: "La schermatura di Sara ammortizza le oscillazioni. Mantenere presenza calma senza sollecitare lo scontro.",
    status: "monitored"
  },
  {
    id: "risk-2",
    title: "Intensificazione dei Ricatti Emotivi della Famiglia",
    category: "Fattore di Pericolo / Relazionale",
    description: "Durante il 'taglio', la famiglia (Sâoud, Zakia e sorella) potrebbe avvertire il distacco energetico e tentare di intensificare le pressioni ed i ricatti emotivi per riprendere il controllo.",
    impactLevel: "Alta",
    mitigationStrategy: "La Piramide Nubiana (72°) schermerà l'operazione dalle interferenze esterne della famiglia per tutto il mese.",
    status: "contained"
  },
  {
    id: "risk-3",
    title: "Ricostruzione dell'Identità da Zero",
    category: "Evolutivo / Relazionale",
    description: "Una volta libero dalle catene ancestrali, Mahdi dovrà ricostruire la propria identità e autonomia decisionale senza il pilota automatico del senso di colpa.",
    impactLevel: "Media",
    mitigationStrategy: "Supportare l'emancipazione con amore sano, complicità e fiducia nell'uomo autonomo che sta emergendo.",
    status: "contained"
  }
];

export const REFLECTION_QUESTIONS: ReflectionQuestion[] = [
  {
    id: 1,
    question: "Sei pronta, Sara, ad accogliere un uomo che, una volta libero, potrebbe dover ricostruire la propria identità da zero?",
    context: "Svincolarsi dai condizionamenti del clan significa abbandonare vecchie abitudini e definire un nuovo modo di vivere il futuro in autonomia."
  },
  {
    id: 2,
    question: "Riesci a mantenere la calma se durante il 'taglio' la famiglia intensificherà i ricatti emotivi?",
    context: "La reazione disperata del clan è la prova dell'efficacia del taglio: la Piramide Nubiana fa da scudo, sta a te non farti spaventare."
  },
  {
    id: 3,
    question: "Saprò accogliere con dolcezza e fiducia la riaccensione del desiderio in Luna Crescente?",
    context: "Il Rinnescamento del Pendolo Ptah riattiverà la polarità maschile, offrendo a Mahdi lo spazio per sceglerti liberamente."
  }
];

export const PAYMENT_DATA: PaymentBreakdown = {
  totalInvestment: 600,
  depositFeePaid: 70,
  remainingTotal: 530,
  advancePayment: {
    percentage: 70,
    amount: 350,
    dueDate: "Fine Luglio 2026",
    description: "70 per cento entro fine Luglio. Copre l'acquisto dei materiali cerimoniali rari (olii consacrati, cere vergini, sigilli in metallo), lo scudo di protezione per Sara e l'avvio della Fase 1.",
    status: "pending"
  },
  finalBalance: {
    percentage: 30,
    amount: 180,
    dueDate: "Fine Agosto 2026",
    description: "30 per cento da versare a compimento del Rituale II (Riaccensione) dopo la conferma di stabilizzazione dei flussi.",
    status: "pending"
  }
};
