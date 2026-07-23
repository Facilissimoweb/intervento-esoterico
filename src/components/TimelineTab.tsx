import React, { useState, useEffect } from 'react';
import { TimelinePhase } from '../types';
import { TIMELINE_PHASES } from '../data/mockData';
import { Calendar, Clock, Moon, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineTabProps {
  lang: 'it' | 'en';
}

export const TimelineTab: React.FC<TimelineTabProps> = ({ lang }) => {
  const [phases, setPhases] = useState<TimelinePhase[]>(TIMELINE_PHASES);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Calculate live countdown to Phase 1 (July 23, 2026) or next active phase
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-23T00:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleStepCompleted = (phaseId: number, index: number) => {
    const key = `${phaseId}-${index}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activePhase = phases.find(p => p.id === selectedPhaseId) || phases[0];

  return (
    <div className="space-y-6 pb-24">
      {/* Intro Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1.5">
          <Calendar className="w-5 h-5" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest">
            {lang === 'it' ? 'Cronoprogramma Operativo Lunare' : 'Lunar Operational Timeline'}
          </span>
        </div>
        <h2 className="font-serif-heading text-xl text-[#2D3436] font-extrabold uppercase tracking-tight">
          {lang === 'it' ? 'Calendario dell\'Intervento' : 'Intervention Timeline'}
        </h2>
        <p className="text-xs text-[#2D3436]/80 mt-2 leading-relaxed">
          {lang === 'it'
            ? 'L\'intervento rispetta la meccanica celeste delle fasi lunari tra Luglio e Agosto per garantire la massima efficacia ed evitare reazioni avverse.'
            : 'Operational phases aligned with lunar cycles between July and August.'}
        </p>

        {/* Live Countdown Box */}
        <div className="mt-4 p-3 bg-[#2D3436] text-[#FDFBF7] rounded-xl border border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-medium">
                {lang === 'it' ? 'Inizio FASE I (Schermatura):' : 'Phase I Countdown:'}
              </span>
              <span className="text-xs font-bold text-white">23 LUG 2026</span>
            </div>
          </div>

          <div className="flex space-x-1.5 font-mono text-center">
            <div className="bg-black/40 px-2 py-1 rounded border border-[#C5A059]/20">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.days}</span>
              <span className="text-[8px] text-gray-400 block">{lang === 'it' ? 'g' : 'd'}</span>
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-[#C5A059]/20">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.hours}</span>
              <span className="text-[8px] text-gray-400 block">h</span>
            </div>
            <div className="bg-black/40 px-2 py-1 rounded border border-[#C5A059]/20">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.minutes}</span>
              <span className="text-[8px] text-gray-400 block">m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Cards Slider / Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#2D3436] tracking-wider">
            {lang === 'it' ? 'Fasi di Intervento (36 Giorni)' : '4 Intervention Phases'}
          </h3>
          <span className="text-[10px] text-[#C5A059] font-semibold">
            {lang === 'it' ? 'Seleziona FASE' : 'Select Phase'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {phases.map((phase) => {
            const isSelected = selectedPhaseId === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => setSelectedPhaseId(phase.id)}
                className={`p-3 rounded-xl text-left border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#2D3436] text-[#FDFBF7] border-[#C5A059] shadow-lg ring-1 ring-[#C5A059]/40'
                    : 'bg-white text-[#2D3436] border-[#C5A059]/20 hover:border-[#C5A059]/50'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 bg-[#C5A059]/20 rounded-bl-full pointer-events-none"></div>
                )}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#C5A059] text-white'
                        : 'bg-[#F4EFE6] text-[#C5A059]'
                    }`}
                  >
                    {phase.code}
                  </span>
                  <div className="flex items-center space-x-1 text-[9px] font-medium opacity-80">
                    <Moon className="w-3 h-3 text-[#C5A059]" />
                    <span>{phase.lunarPhase}</span>
                  </div>
                </div>

                <h4 className="font-serif-heading font-bold text-xs truncate mt-1">
                  {phase.title}
                </h4>
                <p className="text-[10px] opacity-75 mt-0.5 font-medium">
                  {phase.dates}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Active Details */}
      <motion.div
        key={activePhase.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="parchment-card p-5 rounded-2xl border border-[#C5A059]/40 space-y-4 shadow-md"
      >
        <div className="flex justify-between items-start border-b border-[#C5A059]/20 pb-3">
          <div>
            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest block">
              {activePhase.code} • {activePhase.lunarPhase}
            </span>
            <h3 className="font-serif-heading text-lg font-bold text-[#2D3436] mt-0.5">
              {activePhase.title}
            </h3>
            <p className="text-xs text-[#2D3436]/70 italic mt-0.5 font-cursive">
              {activePhase.subtitle}
            </p>
          </div>

          <div className="text-right">
            <span className="inline-block text-[10px] font-bold bg-[#C5A059]/15 text-[#C5A059] px-2.5 py-1 rounded-full border border-[#C5A059]/30">
              {activePhase.dates}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#2D3436]/90 leading-relaxed">
          {activePhase.description}
        </p>

        {/* Protocol Rule for Sara */}
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1">
          <div className="flex items-center space-x-1.5 text-amber-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>{lang === 'it' ? 'Regola d\'Oro per Sara' : 'Golden Rule for Sara'}</span>
          </div>
          <p className="text-[11px] text-amber-900/90 leading-normal">
            {activePhase.protocolRule}
          </p>
        </div>

        {/* Action Checklist */}
        <div className="space-y-2 pt-1">
          <h4 className="font-serif-heading text-xs font-bold text-[#2D3436] uppercase tracking-wider flex items-center space-x-1.5">
            <Flame className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{lang === 'it' ? 'Operazioni Cerimoniali Previste' : 'Ceremonial Actions Checklist'}</span>
          </h4>

          <div className="space-y-2">
            {activePhase.keyActions.map((action, idx) => {
              const isDone = !!completedSteps[`${activePhase.id}-${idx}`];

              return (
                <button
                  key={idx}
                  onClick={() => toggleStepCompleted(activePhase.id, idx)}
                  className={`w-full p-2.5 rounded-lg text-left text-xs flex items-center justify-between border transition-all ${
                    isDone
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                      : 'bg-white border-gray-200 hover:border-[#C5A059]/40 text-[#2D3436]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${
                        isDone ? 'text-emerald-600 fill-emerald-100' : 'text-gray-300'
                      }`}
                    />
                    <span className={isDone ? 'line-through text-emerald-800' : ''}>
                      {action}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold text-gray-400">
                    {isDone ? (lang === 'it' ? 'Eseguito' : 'Done') : (lang === 'it' ? 'In Programma' : 'Scheduled')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Guidelines Box */}
      <div className="p-4 bg-white rounded-xl border border-[#C5A059]/20 text-xs space-y-2 shadow-sm">
        <div className="flex items-center space-x-2 text-[#C5A059] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'it' ? 'Mantenimento del Silenzio Ritualistico' : 'Ritual Silence Protocol'}</span>
        </div>
        <p className="text-[#2D3436]/80 text-[11px] leading-relaxed">
          {lang === 'it'
            ? 'Durante l\'intero ciclo di 36 giorni, Sara deve astenersi dal fare riferimento diretto a questo fascicolo o ai rituali in corso con Mahdi o persone terze. La riservatezza garantisce l\'integrità del campo operante.'
            : 'Sara must maintain total secrecy regarding this document and ongoing work to preserve energy field integrity.'}
        </p>
      </div>
    </div>
  );
};
