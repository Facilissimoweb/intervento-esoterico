export type TabType = 'diagnosi' | 'cronoprogramma' | 'etica' | 'investimento' | 'diario' | 'dossier';

export interface ChakraData {
  id: string;
  name: string;
  italianName: string;
  description: string;
  currentLevel: number; // 0 to 100
  targetLevel: number;  // post ritual level
  status: 'critical' | 'blocked' | 'normal' | 'optimal';
  impactNote: string;
}

export interface TimelinePhase {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  dates: string;
  startDate: string; // YYYY-MM-DD for countdown
  endDate: string;
  lunarPhase: 'Crescente' | 'Calante' | 'Nuova' | 'Piena' | 'Preparazione';
  status: 'upcoming' | 'active' | 'completed';
  description: string;
  keyActions: string[];
  protocolRule: string;
  intensity: 'High' | 'Medium' | 'Resting';
}

export interface RiskItem {
  id: string;
  title: string;
  category: string;
  description: string;
  impactLevel: 'Bassa' | 'Media' | 'Alta';
  mitigationStrategy: string;
  status: 'monitored' | 'contained' | 'critical';
}

export interface ReflectionQuestion {
  id: number;
  question: string;
  context: string;
  userAnswer?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  phaseId?: number;
  tags?: string[];
}

export interface PaymentBreakdown {
  totalInvestment: number; // 600 eur
  depositFeePaid: number; // 70 eur (già versate per indagine)
  remainingTotal: number; // 530 eur
  advancePayment: {
    percentage: number;
    amount: number; // 350 eur
    dueDate: string;
    description: string;
    status: 'pending' | 'paid' | 'overdue';
  };
  finalBalance: {
    percentage: number;
    amount: number; // 180 eur
    dueDate: string;
    description: string;
    status: 'pending' | 'paid';
  };
}
