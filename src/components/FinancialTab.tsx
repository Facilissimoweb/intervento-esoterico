import React, { useState } from 'react';
import { PAYMENT_DATA } from '../data/mockData';
import { CreditCard, CheckCircle2, Clock, FileCheck, ArrowRight, ShieldCheck, Download, Sparkles, Check, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FinancialTabProps {
  lang: 'it' | 'en';
}

export const FinancialTab: React.FC<FinancialTabProps> = ({ lang }) => {
  const [advancePaid, setAdvancePaid] = useState<boolean>(() => {
    return localStorage.getItem('sara_advance_paid') === 'true';
  });
  const [finalPaid, setFinalPaid] = useState<boolean>(() => {
    return localStorage.getItem('sara_final_paid') === 'true';
  });
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  const toggleAdvancePaid = () => {
    const nextVal = !advancePaid;
    setAdvancePaid(nextVal);
    localStorage.setItem('sara_advance_paid', String(nextVal));
  };

  const toggleFinalPaid = () => {
    const nextVal = !finalPaid;
    setFinalPaid(nextVal);
    localStorage.setItem('sara_final_paid', String(nextVal));
  };

  // Calculate current paid amount
  const initialPaid = PAYMENT_DATA.depositFeePaid; // 70
  const advanceAmt = advancePaid ? PAYMENT_DATA.advancePayment.amount : 0; // 280
  const finalAmt = finalPaid ? PAYMENT_DATA.finalBalance.amount : 0; // 150
  const currentTotalPaid = initialPaid + advanceAmt + finalAmt;
  const progressPercentage = Math.round((currentTotalPaid / PAYMENT_DATA.totalInvestment) * 100);

  return (
    <div className="space-y-6 pb-24">
      {/* Header Card */}
      <div className="dark-dossier-card p-6 rounded-2xl shadow-xl relative overflow-hidden border border-[#C5A059]/40">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-serif text-[#C5A059] pointer-events-none">
          €
        </div>

        <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
          <CreditCard className="w-5 h-5" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest">
            {lang === 'it' ? 'Piano di Sostentamento & Oneri' : 'Financial Ledger & Ledger Breakdown'}
          </span>
        </div>

        <h2 className="font-serif-heading text-2xl font-bold uppercase text-[#FDFBF7]">
          {lang === 'it' ? 'Prospetto Economico Operativo' : 'Financial Overview'}
        </h2>
        <p className="text-xs text-gray-300 mt-1">
          {lang === 'it' ? 'Trasparenza totale per il ciclo operativo di 36 giorni' : 'Full financial transparency for the 36-day cycle'}
        </p>

        {/* Big Totals Box */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 italic">
              {lang === 'it' ? 'Investimento Totale Operativo:' : 'Total Operation Investment:'}
            </span>
            <span className="font-serif-heading text-lg font-bold text-[#FDFBF7]">
              € {PAYMENT_DATA.totalInvestment},00
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">
              {lang === 'it' ? 'Già Versato (Fase di Ricerca Preliminare):' : 'Already Paid (Preliminary Research):'}
            </span>
            <span className="text-red-400 font-bold font-mono">
              - € {PAYMENT_DATA.depositFeePaid},00
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/30">
            <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
              {lang === 'it' ? 'Rimanente Totale:' : 'Remaining Balance:'}
            </span>
            <span className="font-serif-heading text-xl font-extrabold text-[#C5A059]">
              € {PAYMENT_DATA.remainingTotal},00
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-[10px] font-semibold">
            <span className="text-gray-300">
              {lang === 'it' ? 'Stato Saldo Complessivo:' : 'Overall Payment Progress:'}
            </span>
            <span className="text-[#C5A059] font-mono">{currentTotalPaid}€ / {PAYMENT_DATA.totalInvestment}€ ({progressPercentage}%)</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C5A059] to-amber-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </div>

      {/* Payment Stages Interactive Cards */}
      <div className="space-y-3">
        <h3 className="font-serif-heading text-xs font-bold uppercase text-[#2D3436] tracking-wider px-1">
          {lang === 'it' ? 'Scadenziario dei Versamenti' : 'Payment Schedule'}
        </h3>

        {/* Phase 1: Research Fee (Already Paid) */}
        <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block">
                {lang === 'it' ? 'FASE PRELIMINARE' : 'PRELIMINARY PHASE'}
              </span>
              <h4 className="font-serif-heading font-bold text-xs text-[#2D3436]">
                {lang === 'it' ? 'Studio di Ricerca & Analisi' : 'Research & Diagnosis Fee'}
              </h4>
              <p className="text-[10px] text-gray-500">
                {lang === 'it' ? 'Versamento confermato all\'avvio' : 'Confirmed at start'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-serif-heading font-bold text-sm text-[#2D3436] block">
              € 70,00
            </span>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {lang === 'it' ? 'REGOLATO' : 'SETTLED'}
            </span>
          </div>
        </div>

        {/* Phase 2: Advance Deposit 70% (€280) */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            advancePaid
              ? 'bg-emerald-50/90 border-emerald-300'
              : 'bg-white border-[#C5A059]/40 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 ${
                  advancePaid
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#C5A059]/20 text-[#C5A059]'
                }`}
              >
                {advancePaid ? <Check className="w-5 h-5" /> : '70%'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest block">
                  {lang === 'it' ? 'ACCONTO AVVIO OPERATIVO' : 'OPERATIONAL DEPOSIT'}
                </span>
                <h4 className="font-serif-heading font-bold text-xs text-[#2D3436]">
                  {lang === 'it' ? 'Acconto Inizio Lavori (70%)' : 'Advance Deposit (70%)'}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {lang === 'it' ? 'Scadenza: 23 Luglio 2026' : 'Due: July 23, 2026'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif-heading font-bold text-base text-[#2D3436] block">
                € 280,00
              </span>
              <button
                onClick={toggleAdvancePaid}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition mt-1 ${
                  advancePaid
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-[#C5A059] text-white border-[#C5A059] hover:bg-[#b08c47]'
                }`}
              >
                {advancePaid
                  ? (lang === 'it' ? '✓ REGOLATO' : '✓ PAID')
                  : (lang === 'it' ? 'REGOLA ACCONTO' : 'CONFIRM PAYMENT')}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-gray-600 mt-3 pt-2 border-t border-gray-200 leading-normal">
            {PAYMENT_DATA.advancePayment.description}
          </p>
        </div>

        {/* Phase 3: Final Balance 30% (€150) */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            finalPaid
              ? 'bg-emerald-50/90 border-emerald-300'
              : 'bg-white border-gray-200 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 ${
                  finalPaid
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-500 border border-gray-300'
                }`}
              >
                {finalPaid ? <Check className="w-5 h-5" /> : '30%'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  {lang === 'it' ? 'SALDO FINALE COMPRENSIVO' : 'FINAL BALANCE'}
                </span>
                <h4 className="font-serif-heading font-bold text-xs text-[#2D3436]">
                  {lang === 'it' ? 'Saldo a Compimento (30%)' : 'Final Balance (30%)'}
                </h4>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {lang === 'it' ? 'Scadenza: Fine Agosto 2026' : 'Due: Late August 2026'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif-heading font-bold text-base text-[#2D3436] block">
                € 150,00
              </span>
              <button
                onClick={toggleFinalPaid}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition mt-1 ${
                  finalPaid
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-gray-800 text-white border-gray-800 hover:bg-[#C5A059]'
                }`}
              >
                {finalPaid
                  ? (lang === 'it' ? '✓ REGOLATO' : '✓ PAID')
                  : (lang === 'it' ? 'REGOLA SALDO' : 'CONFIRM FINAL')}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-gray-600 mt-3 pt-2 border-t border-gray-200 leading-normal">
            {PAYMENT_DATA.finalBalance.description}
          </p>
        </div>
      </div>

      {/* Itemization breakdown */}
      <div className="parchment-card p-4 rounded-xl border border-[#C5A059]/30 text-xs space-y-3">
        <h4 className="font-serif-heading font-bold text-xs uppercase text-[#2D3436] tracking-wider flex items-center space-x-1.5">
          <FileCheck className="w-4 h-4 text-[#C5A059]" />
          <span>{lang === 'it' ? 'Dettaglio Inserimento Costi' : 'Cost Allocation Details'}</span>
        </h4>

        <ul className="space-y-2 text-[11px] text-gray-700">
          <li className="flex justify-between items-center border-b border-gray-200/60 pb-1.5">
            <span>• {lang === 'it' ? 'Materiali cerimoniali di purificazione e incensi' : 'Ceremonial materials & incense'}</span>
            <strong className="text-gray-900">€ 120,00</strong>
          </li>
          <li className="flex justify-between items-center border-b border-gray-200/60 pb-1.5">
            <span>• {lang === 'it' ? 'Sigilli metallici e testimoni consacrati' : 'Consecrated metal seals'}</span>
            <strong className="text-gray-900">€ 110,00</strong>
          </li>
          <li className="flex justify-between items-center border-b border-gray-200/60 pb-1.5">
            <span>• {lang === 'it' ? 'Schermatura continua di Sara (36 giorni)' : 'Sara\'s continuous protective shield (36d)'}</span>
            <strong className="text-gray-900">€ 150,00</strong>
          </li>
          <li className="flex justify-between items-center">
            <span>• {lang === 'it' ? 'Onorario operatore e monitoraggio aurico' : 'Operator fee & aura monitoring'}</span>
            <strong className="text-gray-900">€ 120,00</strong>
          </li>
        </ul>

        {/* Receipt Generator Button */}
        <button
          onClick={() => setShowReceipt(!showReceipt)}
          className="w-full py-2 bg-[#F4EFE6] text-[#2D3436] rounded-lg border border-[#C5A059]/40 font-serif-heading text-xs font-bold uppercase hover:bg-[#C5A059] hover:text-white transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>
            {showReceipt
              ? (lang === 'it' ? 'Nascondi Ricevuta' : 'Hide Receipt')
              : (lang === 'it' ? 'Genera Ricevuta Contabile' : 'Generate Ledger Receipt')}
          </span>
        </button>
      </div>

      {/* Official Receipt Box */}
      <AnimatePresence>
        {showReceipt && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 bg-white rounded-2xl border-2 border-dashed border-[#C5A059] text-xs space-y-3 font-mono shadow-md"
          >
            <div className="text-center border-b border-gray-200 pb-3">
              <span className="font-serif-heading font-bold text-sm block text-[#2D3436]">
                RICEVUTA DI REGOLAZIONE CONTO
              </span>
              <span className="text-[10px] text-gray-500 uppercase">
                Protocollo INV-178479 • Sara Ouachtouk
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>Data Emissione:</span>
                <strong className="text-gray-800">{new Date().toLocaleDateString('it-IT')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Totale Preventivo:</span>
                <span>€ 500,00</span>
              </div>
              <div className="flex justify-between">
                <span>Acconto Versato (Ricerca):</span>
                <span>€ 70,00</span>
              </div>
              <div className="flex justify-between">
                <span>Acconto 70% (Luglio):</span>
                <span className={advancePaid ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                  {advancePaid ? '€ 280,00 (VERSATO)' : 'NON VERSATO'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Saldo 30% (Agosto):</span>
                <span className={finalPaid ? 'text-emerald-700 font-bold' : 'text-gray-400'}>
                  {finalPaid ? '€ 150,00 (VERSATO)' : 'NON VERSATO'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between items-center font-bold text-xs">
              <span>Totale Saldato:</span>
              <span className="text-[#C5A059]">€ {currentTotalPaid},00 / € 500,00</span>
            </div>

            <div className="text-[9px] text-gray-400 text-center italic pt-2">
              Documento ad uso strettamente riservato del committente.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
