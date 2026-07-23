import React from 'react';
import { PROTOCOL_INFO, CHAKRA_INITIAL_DATA, TIMELINE_PHASES, RISK_MATRIX, PAYMENT_DATA } from '../data/mockData';
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
        className="bg-[#FDFBF7] text-[#2D3436] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#C5A059]/50 overflow-hidden my-auto"
      >
        {/* Modal Top Controls Bar */}
        <div className="sticky top-0 z-20 bg-[#2D3436] text-[#FDFBF7] px-4 py-3 flex justify-between items-center border-b border-[#C5A059]/30">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#C5A059]">
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
        <div className="p-6 sm:p-10 space-y-8 font-sans text-xs leading-relaxed max-h-[80vh] overflow-y-auto">
          
          {/* Header */}
          <div className="text-center border-b border-[#C5A059]/30 pb-6">
            <div className="inline-block text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full mb-3 border border-[#C5A059]/20">
              DOCUMENTO UFFICIALE RISERVATO
            </div>
            <h1 className="font-serif-heading text-2xl sm:text-4xl text-[#2D3436] font-bold uppercase tracking-tight">
              Svincolo <span className="text-[#C5A059]">Ancestrale</span>
            </h1>
            <p className="font-cursive text-base text-gray-500 mt-1">
              Relazione Operativa per Sara Ouachtouk • Protocollo {PROTOCOL_INFO.code}
            </p>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#C5A059] border-b border-[#C5A059]/20 pb-1">
              1. Quadro Sintetico e Stato
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#F4EFE6] rounded-xl border border-[#C5A059]/20 text-[11px]">
              <div>
                <span className="text-gray-500 block">Committente:</span>
                <strong>{PROTOCOL_INFO.clientName}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Soggetto:</span>
                <strong>{PROTOCOL_INFO.targetName}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Stato:</span>
                <strong className="text-amber-800">{PROTOCOL_INFO.status}</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Probabilità Riuscita:</span>
                <strong className="text-emerald-700">{PROTOCOL_INFO.probability}</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Diagnosi Energetica */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#C5A059] border-b border-[#C5A059]/20 pb-1">
              2. Diagnosi del Blocco Energetico (Incatenamento Saturnino)
            </h2>
            <p className="text-gray-700">
              Mahdi presenta una contrazione sistemica causata da un eccesso di pressione e debito morale verso il clan familiare. L'energia vitale è drenata dal chakra della Radice (Muladhara, 95% di sovraccarico), comprimendo il chakra Sacrale (Svadhisthana, 15% di flusso residuo).
            </p>
            <div className="space-y-2">
              {CHAKRA_INITIAL_DATA.map(c => (
                <div key={c.id} className="p-2 bg-white rounded border border-gray-200 flex justify-between items-center text-[11px]">
                  <div>
                    <strong className="font-serif-heading text-[#2D3436]">{c.italianName}</strong>
                    <p className="text-[10px] text-gray-500">{c.impactNote}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-red-600 font-bold">{c.currentLevel}%</span>
                    <span className="text-gray-400 mx-1">→</span>
                    <span className="text-emerald-600 font-bold">{c.targetLevel}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Cronoprogramma Operativo */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#C5A059] border-b border-[#C5A059]/20 pb-1">
              3. Cronoprogramma delle Fasi Lunari
            </h2>
            <div className="space-y-2">
              {TIMELINE_PHASES.map(p => (
                <div key={p.id} className="p-3 bg-[#2D3436] text-[#FDFBF7] rounded-xl space-y-1">
                  <div className="flex justify-between items-center text-[#C5A059] font-bold">
                    <span>{p.code} - {p.title} ({p.lunarPhase})</span>
                    <span className="text-xs">{p.dates}</span>
                  </div>
                  <p className="text-gray-300 text-[11px]">{p.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Investimento Economico */}
          <div className="space-y-3">
            <h2 className="font-serif-heading text-sm font-bold uppercase text-[#C5A059] border-b border-[#C5A059]/20 pb-1">
              4. Oneri e Piano Finanziario
            </h2>
            <div className="p-4 bg-white rounded-xl border border-gray-300 space-y-2">
              <div className="flex justify-between border-b pb-1 font-bold">
                <span>Investimento Totale Operativo:</span>
                <span>€ {PAYMENT_DATA.totalInvestment},00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>• Già Versato (Studio Preliminare):</span>
                <span>- € {PAYMENT_DATA.depositFeePaid},00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>• Acconto Avvio (70% entro 23 Luglio):</span>
                <span>€ {PAYMENT_DATA.advancePayment.amount},00</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>• Saldo Finale (30% entro fine Agosto):</span>
                <span>€ {PAYMENT_DATA.finalBalance.amount},00</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-[#C5A059]/30 flex justify-between items-center text-center">
            <div>
              <span className="text-gray-500 text-[10px] block">Committente</span>
              <strong className="font-serif-heading text-xs">Sara Ouachtouk</strong>
            </div>
            <div className="font-cursive italic text-[#C5A059]">
              "{PROTOCOL_INFO.motto}"
            </div>
            <div>
              <span className="text-gray-500 text-[10px] block">L'Operatore Responsabile</span>
              <strong className="font-serif-heading text-xs">Protocollo INV-178479</strong>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
