import React from 'react';
import { PROTOCOL_INFO, CHAKRA_INITIAL_DATA, TIMELINE_PHASES, TECHNICAL_PROTOCOL, RISK_MATRIX, REFLECTION_QUESTIONS, PAYMENT_DATA } from '../data/mockData';
import { FileText, X, Printer, Shield, CheckCircle, Flame, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface FullDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'it' | 'en';
}

export const FullDossierModal: React.FC<FullDossierModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-2 sm:p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#131822] text-[#E2E8F0] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#C5A059]/50 overflow-hidden my-auto"
      >
        {/* Modal Top Controls Bar */}
        <div className="sticky top-0 z-20 bg-[#1A202C] text-[#FDFBF7] px-4 py-3 flex justify-between items-center border-b border-[#C5A059]/30">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D]">
              Fascicolo Integrale - {PROTOCOL_INFO.code}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3 py-1 bg-[#C5A059] text-white rounded-lg text-xs font-bold uppercase hover:bg-[#b08c47] transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Stampa</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Body */}
        <div className="p-6 sm:p-10 space-y-8 font-sans text-xs leading-relaxed max-h-[80vh] overflow-y-auto text-gray-300">
          
          {/* Header */}
          <div className="text-center border-b border-[#C5A059]/30 pb-6">
            <div className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full mb-3 border border-[#C5A059]/20">
              DOCUMENTO UFFICIALE RISERVATO
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-4xl text-[#DFC08D] font-bold uppercase tracking-tight">
              Svincolo <span className="text-[#C5A059]">Ancestrale</span>
            </h1>
            <p className="font-cursive text-base text-gray-400 mt-1">
              Relazione Operativa per Sara Ouachtouk • Protocollo {PROTOCOL_INFO.code}
            </p>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              1. Quadro Sintetico e Stato
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#1A202C] rounded-xl border border-[#C5A059]/20 text-[11px]">
              <div>
                <span className="text-gray-400 block">Committente:</span>
                <strong className="text-white">{PROTOCOL_INFO.clientName}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Soggetto:</span>
                <strong className="text-white">{PROTOCOL_INFO.targetName}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Stato:</span>
                <strong className="text-amber-400">{PROTOCOL_INFO.status}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Probabilità Riuscita:</span>
                <strong className="text-emerald-400">{PROTOCOL_INFO.probability}</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Diagnosi Energetica */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              2. Diagnosi del Blocco Energetico (Incatenamento Saturnino)
            </h2>
            <p className="text-gray-300">
              Mahdi presenta una contrazione sistemica causata da un eccesso di pressione e debito morale verso il clan familiare. L'energia vitale è drenata dal chakra della Radice (Muladhara, 95% di sovraccarico), comprimendo il chakra Sacrale (Svadhisthana, 15% di flusso residuo).
            </p>
            <div className="space-y-2">
              {CHAKRA_INITIAL_DATA.map(c => (
                <div key={c.id} className="p-2 bg-[#1A202C] rounded border border-gray-800 flex justify-between items-center text-[11px]">
                  <div>
                    <strong className="font-serif-heading text-[#DFC08D]">{c.italianName}</strong>
                    <p className="text-[10px] text-gray-400">{c.impactNote}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-red-400 font-bold">{c.currentLevel}%</span>
                    <span className="text-gray-500 mx-1">→</span>
                    <span className="text-emerald-400 font-bold">{c.targetLevel}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Protocollo Tecnico Operativo */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              3. Protocollo Tecnico Operativo
            </h2>
            <p className="text-gray-300 text-[11px]">
              {TECHNICAL_PROTOCOL.subtitle}
            </p>
            <div className="space-y-2">
              <div className="p-3 bg-[#1A202C] rounded-xl border border-gray-800 space-y-1.5">
                <strong className="text-[#C5A059] font-serif-heading block text-xs">1. IL PENDOLO PTAH (Chirurgia Energetica)</strong>
                {TECHNICAL_PROTOCOL.tools[0].phases?.map((ptahPhase, idx) => (
                  <p key={idx} className="text-gray-300 text-[11px] pl-2 border-l border-[#C5A059]/30">
                    <strong className="text-[#DFC08D]">{ptahPhase.code}:</strong> {ptahPhase.details}
                  </p>
                ))}
              </div>

              <div className="p-3 bg-[#1A202C] rounded-xl border border-gray-800 space-y-1">
                <strong className="text-[#C5A059] font-serif-heading block text-xs">2. LA PIRAMIDE NUBIANA (Acceleratore di Manifestazione)</strong>
                <p className="text-gray-300 text-[11px]">{TECHNICAL_PROTOCOL.tools[1].description}</p>
              </div>
            </div>
          </div>

          {/* Section 4: Cronoprogramma Luglio-Agosto */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              4. Cronoprogramma Operativo (Luglio-Agosto)
            </h2>
            <p className="text-gray-300 text-[11px]">
              L'operazione richiede un intero ciclo lunare per stabilizzarsi fisicamente.
            </p>
            <div className="space-y-2">
              {TIMELINE_PHASES.map(p => (
                <div key={p.id} className="p-3 bg-[#1A202C] text-[#E2E8F0] rounded-xl space-y-1 border border-gray-800">
                  <div className="flex justify-between items-center text-[#C5A059] font-bold">
                    <span>{p.code}: {p.title} ({p.lunarPhase})</span>
                    <span className="text-xs text-gray-400">{p.dates}</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Riflessioni Etiche e Rischi */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              5. Riflessioni Etiche e Fattori di Pericolo
            </h2>
            <div className="p-3.5 bg-[#1A202C] rounded-xl border border-gray-800 space-y-2 text-[11px] text-gray-300">
              <div>
                <strong className="text-[#C5A059] block font-serif-heading">Domanda Etica Guida:</strong>
                <p className="italic text-gray-200">"{REFLECTION_QUESTIONS[0].question}"</p>
              </div>
              <div className="pt-2 border-t border-gray-800">
                <strong className="text-[#EF4444] block font-serif-heading">Fattori di Pericolo e Mitigazione:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-gray-300">
                  {RISK_MATRIX.map(r => (
                    <li key={r.id}>
                      <strong className="text-gray-200">{r.title}:</strong> {r.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 6: Investimento Economico */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#DFC08D] border-b border-[#C5A059]/20 pb-1">
              6. Oneri e Piano Finanziario
            </h2>
            <div className="p-4 bg-[#1A202C] rounded-xl border border-gray-800 space-y-2 text-gray-300">
              <div className="flex justify-between border-b border-gray-700 pb-1 font-bold text-[#DFC08D]">
                <span>Investimento Totale Operativo:</span>
                <span>€ {PAYMENT_DATA.totalInvestment},00</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>• Già Versato (Studio Preliminare):</span>
                <span className="text-emerald-400 font-bold">- € {PAYMENT_DATA.depositFeePaid},00</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>• Acconto Avvio (70% entro 23 Luglio):</span>
                <span>€ {PAYMENT_DATA.advancePayment.amount},00</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>• Saldo Finale (30% entro fine Agosto):</span>
                <span>€ {PAYMENT_DATA.finalBalance.amount},00</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-[#C5A059]/30 flex justify-between items-center text-center">
            <div>
              <span className="text-gray-400 text-[10px] block">Committente</span>
              <strong className="font-serif-heading text-xs text-[#DFC08D]">Sara Ouachtouk</strong>
            </div>
            <div className="font-cursive italic text-[#C5A059]">
              "{PROTOCOL_INFO.motto}"
            </div>
            <div>
              <span className="text-gray-400 text-[10px] block">L'Operatore Responsabile</span>
              <strong className="font-serif-heading text-xs text-[#DFC08D]">{PROTOCOL_INFO.operatorName}</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
