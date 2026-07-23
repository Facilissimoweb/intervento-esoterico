import React, { useState, useEffect } from 'react';
import { TimelinePhase } from '../types';
import { TIMELINE_PHASES, TECHNICAL_PROTOCOL } from '../data/mockData';
import { Calendar, Clock, Moon, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Flame, Sparkles, Compass, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface TimelineTabProps {
  lang: 'it' | 'fr';
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
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden bg-[#131822]">
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1.5">
          <Calendar className="w-5 h-5" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest text-[#C5A059]">
            {lang === 'it' ? 'Cronoprogramma Operativo Lunare' : 'Planning Opérationnel Lunaire'}
          </span>
        </div>
        <h2 className="font-serif-heading text-xl text-[#DFC08D] font-extrabold uppercase tracking-tight">
          {lang === 'it' ? 'Calendario dell\'Intervento' : 'Calendrier de l\'Intervention'}
        </h2>
        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
          {lang === 'it'
            ? 'L\'intervento rispetta la meccanica celeste delle fasi lunari tra Luglio e Agosto per garantire la massima efficacia ed evitare reazioni avverse.'
            : 'L\'intervention respecte la mécanique céleste des phases lunaires entre Juillet et Août pour garantir une efficacité maximale.'}
        </p>

        {/* Live Countdown Box */}
        <div className="mt-4 p-3 bg-[#1A202C] text-[#FDFBF7] rounded-xl border border-[#C5A059]/40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#C5A059] animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-medium">
                {lang === 'it' ? 'Inizio FASE I (Schermatura):' : 'Début PHASE I (Bouclier) :'}
              </span>
              <span className="text-xs font-bold text-white">23 JUIL 2026</span>
            </div>
          </div>

          <div className="flex space-x-1.5 font-mono text-center">
            <div className="bg-black/60 px-2 py-1 rounded border border-[#C5A059]/30">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.days}</span>
              <span className="text-[8px] text-gray-400 block">{lang === 'it' ? 'g' : 'j'}</span>
            </div>
            <div className="bg-black/60 px-2 py-1 rounded border border-[#C5A059]/30">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.hours}</span>
              <span className="text-[8px] text-gray-400 block">h</span>
            </div>
            <div className="bg-black/60 px-2 py-1 rounded border border-[#C5A059]/30">
              <span className="text-xs font-bold text-[#C5A059]">{timeLeft.minutes}</span>
              <span className="text-[8px] text-gray-400 block">m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Cards Slider / Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#DFC08D] tracking-wider">
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
                    ? 'bg-[#1A202C] text-[#FDFBF7] border-[#C5A059] shadow-lg ring-1 ring-[#C5A059]/40'
                    : 'bg-[#131822] text-[#E2E8F0] border-[#C5A059]/30 hover:border-[#C5A059]/50'
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
                        : 'bg-[#1A202C] text-[#C5A059] border border-[#C5A059]/30'
                    }`}
                  >
                    {phase.code}
                  </span>
                  <div className="flex items-center space-x-1 text-[9px] font-medium opacity-80">
                    <Moon className="w-3 h-3 text-[#C5A059]" />
                    <span>{phase.lunarPhase}</span>
                  </div>
                </div>

                <h4 className="font-serif-heading font-bold text-xs truncate mt-1 text-[#E2E8F0]">
                  {phase.title}
                </h4>
                <p className="text-[10px] opacity-75 mt-0.5 font-medium text-gray-400">
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
        className="parchment-card p-5 rounded-2xl border border-[#C5A059]/40 space-y-4 shadow-md bg-[#131822]"
      >
        <div className="flex justify-between items-start border-b border-[#C5A059]/30 pb-3">
          <div>
            <span className="text-[10px] text-[#C5A059] font-bold uppercase tracking-widest block">
              {activePhase.code} • {activePhase.lunarPhase}
            </span>
            <h3 className="font-serif-heading text-lg font-bold text-[#DFC08D] mt-0.5">
              {activePhase.title}
            </h3>
            <p className="text-xs text-gray-400 italic mt-0.5 font-cursive">
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
        <p className="text-xs text-gray-300 leading-relaxed">
          {activePhase.description}
        </p>

        {/* Protocol Rule for Sara */}
        <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl space-y-1">
          <div className="flex items-center space-x-1.5 text-amber-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{lang === 'it' ? 'Regola d\'Oro per Sara' : 'Golden Rule for Sara'}</span>
          </div>
          <p className="text-[11px] text-amber-200/90 leading-normal">
            {activePhase.protocolRule}
          </p>
        </div>

        {/* Action Checklist */}
        <div className="space-y-2 pt-1">
          <h4 className="font-serif-heading text-xs font-bold text-[#DFC08D] uppercase tracking-wider flex items-center space-x-1.5">
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
                      ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                      : 'bg-[#1A202C] border-gray-800 hover:border-[#C5A059]/40 text-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${
                        isDone ? 'text-emerald-400 fill-emerald-950' : 'text-gray-500'
                      }`}
                    />
                    <span className={isDone ? 'line-through text-emerald-300' : ''}>
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

      {/* PARTE 3: PROTOCOLLO TECNICO OPERATIVO (DINAMICO PER FASE) */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/40 space-y-4 shadow-md bg-[#131822]">
        <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-2.5">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <Zap className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D]">
                {TECHNICAL_PROTOCOL.title}
              </h3>
              <p className="text-[10px] text-gray-400 font-sans">
                {lang === 'it' ? 'Modalità di intervento strumentale per' : 'Instrumental mode for'} <strong className="text-[#DFC08D]">{activePhase.code} ({activePhase.title})</strong>
              </p>
            </div>
          </div>
          <span className="text-[9px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/15 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
            {activePhase.code}
          </span>
        </div>

        <div className="space-y-4">
          {/* Tool 1: Pendolo Ptah */}
          <div className="p-3.5 bg-[#1A202C] rounded-xl border border-[#C5A059]/25 space-y-2">
            <div className="flex justify-between items-center border-b border-[#C5A059]/20 pb-1.5">
              <h4 className="font-serif-heading font-bold text-xs text-[#DFC08D] flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-[#C5A059]" />
                <span>1. IL PENDOLO PTAH</span>
              </h4>
              <span className="text-[9px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                {TECHNICAL_PROTOCOL.tools[0].type}
              </span>
            </div>

            {activePhase.technicalProtocol?.ptahAction ? (
              <div className="bg-[#131822] p-3 rounded-lg border border-[#C5A059]/30 space-y-1">
                <strong className="text-xs text-[#DFC08D] font-serif-heading block">
                  {activePhase.technicalProtocol.ptahAction.stage}
                </strong>
                <p className="text-[11px] text-gray-200 leading-relaxed">
                  {activePhase.technicalProtocol.ptahAction.description}
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                {TECHNICAL_PROTOCOL.tools[0].phases?.map((ptahPhase, idx) => (
                  <div key={idx} className="bg-[#131822] p-2.5 rounded-lg border border-gray-800 space-y-0.5">
                    <strong className="text-[11px] text-[#DFC08D] font-serif-heading block">
                      {ptahPhase.code}
                    </strong>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {ptahPhase.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tool 2: Piramide Nubiana */}
          <div className="p-3.5 bg-[#1A202C] rounded-xl border border-[#C5A059]/25 space-y-2">
            <div className="flex justify-between items-center border-b border-[#C5A059]/20 pb-1.5">
              <h4 className="font-serif-heading font-bold text-xs text-[#DFC08D] flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span>2. LA PIRAMIDE NUBIANA</span>
              </h4>
              <span className="text-[9px] uppercase font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded border border-[#C5A059]/30">
                {TECHNICAL_PROTOCOL.tools[1].type}
              </span>
            </div>

            {activePhase.technicalProtocol?.piramideAction ? (
              <div className="bg-[#131822] p-3 rounded-lg border border-[#C5A059]/30 space-y-1">
                <strong className="text-xs text-[#DFC08D] font-serif-heading block">
                  {activePhase.technicalProtocol.piramideAction.stage}
                </strong>
                <p className="text-[11px] text-gray-200 leading-relaxed">
                  {activePhase.technicalProtocol.piramideAction.description}
                </p>
              </div>
            ) : (
              <p className="text-[11px] text-gray-300 leading-relaxed pt-1">
                {TECHNICAL_PROTOCOL.tools[1].description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Guidelines Box */}
      <div className="p-4 bg-[#131822] rounded-xl border border-[#C5A059]/30 text-xs space-y-2 shadow-sm">
        <div className="flex items-center space-x-2 text-[#C5A059] font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'it' ? 'Mantenimento del Silenzio Ritualistico' : 'Ritual Silence Protocol'}</span>
        </div>
        <p className="text-gray-300 text-[11px] leading-relaxed">
          {lang === 'it'
            ? 'Durante l\'intero ciclo di 36 giorni, Sara deve astenersi dal fare riferimento diretto a questo fascicolo o ai rituali in corso con Mahdi o persone terze. La riservatezza garantisce l\'integrità del campo operante.'
            : 'Sara must maintain total secrecy regarding this document and ongoing work to preserve energy field integrity.'}
        </p>
      </div>
    </div>
  );
};
