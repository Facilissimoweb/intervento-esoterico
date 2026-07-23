import React, { useState, useEffect } from 'react';
import { RiskItem, ReflectionQuestion } from '../types';
import { RISK_MATRIX, REFLECTION_QUESTIONS } from '../data/mockData';
import { ShieldAlert, HelpCircle, CheckSquare, AlertOctagon, Heart, Lock, Save, Sparkles, Filter } from 'lucide-react';
import { motion } from 'motion/react';

interface RiskTabProps {
  lang: 'it' | 'en';
}

export const RiskTab: React.FC<RiskTabProps> = ({ lang }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    const saved = localStorage.getItem('sara_reflection_answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAnswerChange = (qId: number, text: string) => {
    const updated = { ...answers, [qId]: text };
    setAnswers(updated);
    localStorage.setItem('sara_reflection_answers', JSON.stringify(updated));
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const filteredRisks = filterSeverity === 'all'
    ? RISK_MATRIX
    : RISK_MATRIX.filter(r => r.impactLevel.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1.5">
          <ShieldAlert className="w-5 h-5 text-[#A93226]" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest text-[#A93226]">
            {lang === 'it' ? 'Etica, Consapevolezza & Rischi' : 'Ethics & Risk Governance'}
          </span>
        </div>
        <h2 className="font-serif-heading text-xl text-[#2D3436] font-extrabold uppercase tracking-tight">
          {lang === 'it' ? 'Matrice dei Rischi & Valutazione' : 'Risk Matrix & Ethics'}
        </h2>
        <p className="text-xs text-[#2D3436]/80 mt-2 leading-relaxed">
          {lang === 'it'
            ? 'Ogni intervento profondo comporta reassestamenti sistemici. Il protocollo prevede misure di contenimento stringenti per salvaguardare Sara e Mahdi.'
            : 'Operational risks are actively monitored and mitigated by protective seals.'}
        </p>
      </div>

      {/* Section 1: Domande di Consapevolezza / Guiding Reflection Questions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#2D3436] tracking-wider flex items-center space-x-1.5">
            <HelpCircle className="w-4 h-4 text-[#C5A059]" />
            <span>{lang === 'it' ? 'Domande di Valutazione sul Caso (Sara & Mahdi)' : 'Evaluation Notes on Case (Sara & Mahdi)'}</span>
          </h3>
          {savedNotice && (
            <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1 animate-pulse">
              <Save className="w-3 h-3" />
              <span>{lang === 'it' ? 'Salvato!' : 'Saved!'}</span>
            </span>
          )}
        </div>

        <div className="space-y-3">
          {REFLECTION_QUESTIONS.map((q) => (
            <div
              key={q.id}
              className="parchment-card p-4 rounded-xl border border-[#C5A059]/30 space-y-2 shadow-sm"
            >
              <div className="flex items-start space-x-2">
                <span className="w-5 h-5 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {q.id}
                </span>
                <div>
                  <h4 className="font-serif-heading text-xs font-bold text-[#2D3436]">
                    {q.question}
                  </h4>
                  <p className="text-[11px] text-gray-500 italic mt-0.5 font-cursive">
                    {q.context}
                  </p>
                </div>
              </div>

              {/* Editable Answer Box */}
              <div className="mt-2 pt-2 border-t border-[#C5A059]/20">
                <label className="text-[10px] text-gray-600 font-medium block mb-1">
                  {lang === 'it' ? 'Annotazioni e valutazioni dell\'Operatore:' : 'Operator\'s evaluation notes:'}
                </label>
                <textarea
                  rows={2}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={lang === 'it' ? 'Inserisci le note o i riscontri dell\'operatore...' : 'Type operator\'s notes...'}
                  className="w-full p-2.5 bg-white text-xs text-[#2D3436] rounded-lg border border-gray-200 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] outline-none transition resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Interactive Risk Matrix */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#2D3436] tracking-wider flex items-center space-x-1.5">
            <AlertOctagon className="w-4 h-4 text-[#A93226]" />
            <span>{lang === 'it' ? 'Matrice dei Rischi Operativi' : 'Operational Risk Matrix'}</span>
          </h3>

          {/* Filter Pills */}
          <div className="flex space-x-1 text-[9px] font-bold uppercase">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`px-2 py-0.5 rounded-full transition ${
                filterSeverity === 'all'
                  ? 'bg-[#2D3436] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Tutti
            </button>
            <button
              onClick={() => setFilterSeverity('Alta')}
              className={`px-2 py-0.5 rounded-full transition ${
                filterSeverity === 'Alta'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Alta
            </button>
            <button
              onClick={() => setFilterSeverity('Media')}
              className={`px-2 py-0.5 rounded-full transition ${
                filterSeverity === 'Media'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
              }`}
            >
              Media
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredRisks.map((risk) => {
            const isHigh = risk.impactLevel === 'Alta';
            const isMed = risk.impactLevel === 'Media';

            return (
              <div
                key={risk.id}
                className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full ${
                    isHigh ? 'bg-red-600' : isMed ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                ></div>

                <div className="pl-2 flex items-start justify-between">
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">
                      {risk.category}
                    </span>
                    <h4 className="font-serif-heading font-bold text-xs text-[#2D3436]">
                      {risk.title}
                    </h4>
                  </div>

                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isHigh
                        ? 'bg-red-100 text-red-700 border border-red-200'
                        : isMed
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {lang === 'it' ? 'Rischio' : 'Risk'} {risk.impactLevel}
                  </span>
                </div>

                <p className="pl-2 text-xs text-gray-600 leading-relaxed">
                  {risk.description}
                </p>

                <div className="pl-2 pt-2 border-t border-gray-100 text-[11px] bg-gray-50 p-2.5 rounded-lg border border-gray-200/60">
                  <span className="font-bold text-[#C5A059] block mb-0.5 uppercase tracking-wider text-[9px]">
                    {lang === 'it' ? 'Protocollo di Mitigazione:' : 'Mitigation Protocol:'}
                  </span>
                  <p className="text-gray-800 leading-tight">
                    {risk.mitigationStrategy}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ethical Pledge Box */}
      <div className="p-4 bg-[#2D3436] text-[#FDFBF7] rounded-xl border border-[#C5A059]/40 space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-[#C5A059]">
          <Lock className="w-4 h-4" />
          <h4 className="font-serif-heading font-bold text-xs uppercase tracking-wider">
            {lang === 'it' ? 'Garanzia di Protezione Etica' : 'Ethical Protection Guarantee'}
          </h4>
        </div>
        <p className="text-gray-300 leading-relaxed text-[11px]">
          {lang === 'it'
            ? 'L\'intervento si limita esclusivamente alla dissoluzione delle zavorre parassite e non impone legami coercitivi o ritorni d\'odio. Il libero arbitrio e l\'armonia di Sara sono completamente protetti dallo scudo rituale.'
            : 'The intervention strictly removes parasitical ancestral baggage without coercive binding.'}
        </p>
      </div>
    </div>
  );
};
