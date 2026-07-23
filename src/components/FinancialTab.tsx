import React, { useState } from 'react';
import { PAYMENT_DATA, PROTOCOL_INFO } from '../data/mockData';
import { CreditCard, CheckCircle2, Clock, FileCheck, ArrowRight, ShieldCheck, Download, Sparkles, Check, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FinancialTabProps {
  lang: 'it' | 'fr';
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
  const advanceAmt = advancePaid ? PAYMENT_DATA.advancePayment.amount : 0; // 350
  const finalAmt = finalPaid ? PAYMENT_DATA.finalBalance.amount : 0; // 180
  const currentTotalPaid = initialPaid + advanceAmt + finalAmt;
  const progressPercentage = Math.round((currentTotalPaid / PAYMENT_DATA.totalInvestment) * 100);

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="dark-dossier-card p-6 rounded-2xl shadow-xl relative overflow-hidden border border-[#C5A059]/40 bg-[#131822]">
        <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-serif text-[#C5A059] pointer-events-none">
          €
        </div>

        <div className="flex items-center space-x-2 text-[#C5A059] mb-1">
          <CreditCard className="w-5 h-5" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest text-[#C5A059]">
            {lang === 'it' ? 'Piano di Sostentamento & Oneri' : 'Plan Financier & Frais'}
          </span>
        </div>

        <h2 className="font-serif-heading text-2xl font-bold uppercase text-[#DFC08D]">
          {lang === 'it' ? 'Prospetto Economico Operativo' : 'Bilan Financier Opérationnel'}
        </h2>
        <p className="text-xs text-gray-300 mt-1">
          {lang === 'it' ? 'Trasparenza totale per il ciclo operativo di 36 giorni' : 'Transparence totale pour le cycle opérationnel de 36 jours'}
        </p>

        {/* Big Totals Box */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 italic">
              {lang === 'it' ? 'Investimento Totale Operativo:' : 'Investissement Total Opérationnel :'}
            </span>
            <span className="font-serif-heading text-lg font-bold text-[#FDFBF7]">
              € {PAYMENT_DATA.totalInvestment},00
            </span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400">
              {lang === 'it' ? 'Già Versato (Indagine & Studio Preliminare):' : 'Déjà Versé (Enquête & Étude Préliminaire) :'}
            </span>
            <span className="text-emerald-400 font-bold font-mono">
              - € {PAYMENT_DATA.depositFeePaid},00 ({lang === 'it' ? 'REGOLATO' : 'RÉGLÉ'})
            </span>
          </div>

          <div className="flex justify-between items-center p-3 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/30">
            <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">
              {lang === 'it' ? 'Rimanente Totale da Saldare:' : 'Solde Restant à Régler :'}
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
              {lang === 'it' ? 'Stato Saldo Complessivo:' : 'Progression Globale du Paiement :'}
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
        <h3 className="font-serif-heading text-xs font-bold uppercase text-[#DFC08D] tracking-wider px-1">
          {lang === 'it' ? 'Scadenziario dei Versamenti' : 'Échéancier des Versements'}
        </h3>

        {/* Phase 1: Research Fee (Already Paid - Excluded from remaining) */}
        <div className="bg-[#131822] p-4 rounded-xl border border-emerald-700/60 shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 flex items-center justify-center font-bold">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block">
                {lang === 'it' ? 'INDAGINE PRELIMINARE (GIÀ VERSATE)' : 'ENQUÊTE PRÉLIMINAIRE (DÉJÀ PAYÉE)'}
              </span>
              <h4 className="font-serif-heading font-bold text-xs text-[#E2E8F0]">
                {lang === 'it' ? 'Studio d\'Indagine & Analisi Aurica' : 'Étude d\'Enquête & Analyse Aurique'}
              </h4>
              <p className="text-[10px] text-gray-400">
                {lang === 'it' ? 'Importo già saldato ed escluso dal rimanente' : 'Montant déjà réglé et exclu du solde'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="font-serif-heading font-bold text-sm text-[#E2E8F0] block">
              € 70,00
            </span>
            <span className="text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2 py-0.5 rounded-full inline-block mt-0.5">
              {lang === 'it' ? 'GIÀ VERSATE' : 'DÉJÀ REÇU'}
            </span>
          </div>
        </div>

        {/* Phase 2: Advance Deposit (€350) */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            advancePaid
              ? 'bg-emerald-950/40 border-emerald-700/60'
              : 'bg-[#131822] border-[#C5A059]/40 shadow-sm'
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
                {advancePaid ? <Check className="w-5 h-5" /> : '1°'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#C5A059] uppercase tracking-widest block">
                  {lang === 'it' ? 'ACCONTO AVVIO: 70 PER CENTO ENTRO FINE LUGLIO' : 'ACOMPTE DE DÉMARRAGE : 70% FIN JUILLET'}
                </span>
                <h4 className="font-serif-heading font-bold text-xs text-[#E2E8F0]">
                  {lang === 'it' ? 'Acconto Inizio Operazioni' : 'Acompte de Début des Opérations'}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {lang === 'it' ? 'Scadenza: Fine Luglio 2026' : 'Échéance : Fin Juillet 2026'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif-heading font-bold text-base text-[#E2E8F0] block">
                € 350,00
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
                  ? (lang === 'it' ? '✓ REGOLATO' : '✓ RÉGLÉ')
                  : (lang === 'it' ? 'REGOLA ACCONTO' : 'CONFIRMER L\'ACOMPTE')}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-gray-300 mt-3 pt-2 border-t border-gray-800 leading-normal">
            {PAYMENT_DATA.advancePayment.description}
          </p>
        </div>

        {/* Phase 3: Final Balance (€180) */}
        <div
          className={`p-4 rounded-xl border transition-all ${
            finalPaid
              ? 'bg-emerald-950/40 border-emerald-700/60'
              : 'bg-[#131822] border-gray-800 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 ${
                  finalPaid
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1A202C] text-gray-400 border border-gray-700'
                }`}
              >
                {finalPaid ? <Check className="w-5 h-5" /> : '2°'}
              </div>
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                  {lang === 'it' ? 'SALDO FINALE COMPRENSIVO' : 'SOLDE FINAL COMPLET'}
                </span>
                <h4 className="font-serif-heading font-bold text-xs text-[#E2E8F0]">
                  {lang === 'it' ? 'Saldo a Compimento Rituale' : 'Solde à l\'Achevement du Rituel'}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {lang === 'it' ? 'Scadenza: Fine Agosto 2026' : 'Échéance : Fin Août 2026'}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-serif-heading font-bold text-base text-[#E2E8F0] block">
                € 180,00
              </span>
              <button
                onClick={toggleFinalPaid}
                className={`text-[9px] font-bold px-2.5 py-1 rounded-full border transition mt-1 ${
                  finalPaid
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-[#C5A059]'
                }`}
              >
                {finalPaid
                  ? (lang === 'it' ? '✓ REGOLATO' : '✓ RÉGLÉ')
                  : (lang === 'it' ? 'REGOLA SALDO' : 'CONFIRMER LE SOLDE')}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-gray-300 mt-3 pt-2 border-t border-gray-800 leading-normal">
            {PAYMENT_DATA.finalBalance.description}
          </p>
        </div>
      </div>

      {/* Itemization breakdown */}
      <div className="parchment-card p-4 rounded-xl border border-[#C5A059]/30 text-xs space-y-3 bg-[#131822]">
        <h4 className="font-serif-heading font-bold text-xs uppercase text-[#DFC08D] tracking-wider flex items-center space-x-1.5">
          <FileCheck className="w-4 h-4 text-[#C5A059]" />
          <span>{lang === 'it' ? 'Dettaglio Voce per Voce (Totale €600)' : 'Détail Poste par Poste (Total 600€)'}</span>
        </h4>

        <ul className="space-y-2 text-[11px] text-gray-300">
          <li className="flex justify-between items-center border-b border-gray-800/80 pb-1.5">
            <span>• {lang === 'it' ? 'Materiali cerimoniali di purificazione e incensi rari' : 'Matériels cérémoniels de purification et encens'}</span>
            <strong className="text-white">€ 150,00</strong>
          </li>
          <li className="flex justify-between items-center border-b border-gray-800/80 pb-1.5">
            <span>• {lang === 'it' ? 'Sigilli metallici e testimoni consacrati' : 'Sceaux métalliques et témoins consacrés'}</span>
            <strong className="text-white">€ 130,00</strong>
          </li>
          <li className="flex justify-between items-center border-b border-gray-800/80 pb-1.5">
            <span>• {lang === 'it' ? 'Schermatura continua di Sara (36 giorni)' : 'Bouclier de protection continue de Sara (36 jours)'}</span>
            <strong className="text-white">€ 170,00</strong>
          </li>
          <li className="flex justify-between items-center">
            <span>• {lang === 'it' ? 'Onorario operatore e monitoraggio aurico' : 'Honoraires opérateur et suivi aurique'}</span>
            <strong className="text-white">€ 150,00</strong>
          </li>
        </ul>

        {/* Receipt Generator Button */}
        <button
          onClick={() => setShowReceipt(!showReceipt)}
          className="w-full py-2 bg-[#1A202C] text-[#DFC08D] rounded-lg border border-[#C5A059]/40 font-serif-heading text-xs font-bold uppercase hover:bg-[#C5A059] hover:text-white transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>
            {showReceipt
              ? (lang === 'it' ? 'Nascondi Ricevuta' : 'Masquer le Reçu')
              : (lang === 'it' ? 'Genera Ricevuta Contabile' : 'Générer le Reçu')}
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
            className="p-5 bg-[#1A202C] rounded-2xl border-2 border-dashed border-[#C5A059] text-xs space-y-3 font-mono shadow-md text-gray-200"
          >
            <div className="text-center border-b border-gray-700 pb-3">
              <span className="font-serif-heading font-bold text-sm block text-[#DFC08D]">
                RICEVUTA DI REGOLAZIONE CONTO
              </span>
              <span className="text-[10px] text-gray-400 uppercase">
                Protocollo {PROTOCOL_INFO.code} • {PROTOCOL_INFO.operatorName} • Sara Ouachtouk
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span>{lang === 'it' ? 'Data Emissione:' : 'Date d\'Émission :'}</span>
                <strong className="text-gray-200">{new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'fr-FR')}</strong>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'it' ? 'Totale Intervento:' : 'Total Intervention :'}</span>
                <span>€ 600,00</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>{lang === 'it' ? 'Indagine Preliminare (Già Versate):' : 'Enquête Préliminaire (Déjà Payée) :'}</span>
                <span>- € 70,00 (REGOLATO)</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'it' ? 'Acconto Fase I (Luglio):' : 'Acompte Phase I (Juillet) :'}</span>
                <span className={advancePaid ? 'text-emerald-400 font-bold' : 'text-gray-400'}>
                  {advancePaid ? '€ 350,00 (VERSATO)' : 'NON VERSATO'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{lang === 'it' ? 'Saldo Finale (Agosto):' : 'Solde Final (Août) :'}</span>
                <span className={finalPaid ? 'text-emerald-400 font-bold' : 'text-gray-400'}>
                  {finalPaid ? '€ 180,00 (VERSATO)' : 'NON VERSATO'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-700 flex justify-between items-center font-bold text-xs">
              <span>{lang === 'it' ? 'Totale Saldato:' : 'Total Réglé :'}</span>
              <span className="text-[#C5A059]">€ {currentTotalPaid},00 / € 600,00</span>
            </div>

            <div className="text-[9px] text-gray-400 text-center italic pt-2">
              {lang === 'it' ? 'Documento ad uso strettamente riservato dell\'operatore e del committente.' : 'Document à l\'usage strictly réservé de l\'opérateur et du client.'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
