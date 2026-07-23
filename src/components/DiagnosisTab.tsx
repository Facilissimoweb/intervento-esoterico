import React, { useState } from 'react';
import { ChakraData } from '../types';
import { CHAKRA_INITIAL_DATA, PROTOCOL_INFO } from '../data/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, AlertTriangle, Eye, RefreshCw, Zap, Sparkles, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosisTabProps {
  lang: 'it' | 'fr';
}

export const DiagnosisTab: React.FC<DiagnosisTabProps> = ({ lang }) => {
  const [chakras, setChakras] = useState<ChakraData[]>(CHAKRA_INITIAL_DATA);
  const [showTargetData, setShowTargetData] = useState(true);
  const [selectedChakraId, setSelectedChakraId] = useState<string | null>("radice");
  const [simulationMode, setSimulationMode] = useState(false);

  // Prepare radar chart format
  const radarChartData = chakras.map((c) => ({
    subject: lang === 'it' ? c.italianName : c.name.split(' ')[0],
    Attuale: c.currentLevel,
    Target: c.targetLevel,
    fullMark: 100,
  }));

  const handleResetSimulation = () => {
    setChakras(CHAKRA_INITIAL_DATA);
  };

  const handleSliderChange = (id: string, newLevel: number) => {
    setChakras((prev) =>
      prev.map((item) => (item.id === id ? { ...item, currentLevel: newLevel } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden bg-[#131822]">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#C5A059]/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1.5">
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest text-[#C5A059]">
            {lang === 'it' ? 'Diagnosi Energetica Quantitativa' : 'Diagnostic Énergétique Quantitatif'}
          </span>
        </div>
        <h2 className="font-serif-heading text-xl text-[#DFC08D] font-extrabold uppercase tracking-tight">
          {lang === 'it' ? 'Analisi del Blocco di Mahdi' : 'Analyse du Blocage de Mahdi'}
        </h2>
        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
          {lang === 'it'
            ? 'Mahdi presenta un "Incatenamento Saturnino". L\'energia vitale che dovrebbe fluire spontaneamente verso l\'intimità e il futuro con Sara è coartata e drenata dai doveri primordiali verso la famiglia.'
            : 'Mahdi présente un "Enchaînement Saturnien". L\'énergie vitale qui devrait couler naturellement vers Sara est drainée par les devoirs envers le clan familial.'}
        </p>
      </div>

      {/* Radar Chart Section */}
      <div className="parchment-card p-4 rounded-2xl border border-[#C5A059]/30 shadow-sm bg-[#131822]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-[#C5A059]" />
            <span className="font-serif-heading text-xs font-bold uppercase tracking-wider text-[#DFC08D]">
              {lang === 'it' ? 'Mappa dei Flussi Aurici' : 'Carte des Flux Auriques'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTargetData(!showTargetData)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                showTargetData
                  ? 'bg-[#C5A059] text-white border-[#C5A059]'
                  : 'bg-[#1A202C] text-gray-200 border-[#C5A059]/40'
              }`}
            >
              {showTargetData ? (lang === 'it' ? '✓ Confronto Attivo' : '✓ Comparaisons') : (lang === 'it' ? '+ Confronta Target' : '+ Comparer Cible')}
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 text-[10px] font-medium mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
            <span className="text-gray-300">{lang === 'it' ? 'Stato Attuale (Bloccato)' : 'État Actuel (Bloqué)'}</span>
          </div>
          {showTargetData && (
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C5A059]"></span>
              <span className="text-gray-300">{lang === 'it' ? 'Target Post-Rituale' : 'Cible Post-Rituel'}</span>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="h-64 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
              <PolarGrid stroke="#C5A059" strokeOpacity={0.3} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#E2E8F0', fontSize: 10, fontFamily: 'Inter' }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Stato Attuale"
                dataKey="Attuale"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.4}
              />
              {showTargetData && (
                <Radar
                  name="Target Atteso"
                  dataKey="Target"
                  stroke="#C5A059"
                  fill="#C5A059"
                  fillOpacity={0.3}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A202C',
                  borderColor: '#C5A059',
                  borderRadius: '8px',
                  color: '#FDFBF7',
                  fontSize: '11px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Simulation Mode Toggle */}
        <div className="mt-3 pt-3 border-t border-[#C5A059]/20 flex justify-between items-center text-[11px]">
          <span className="text-gray-400">
            {lang === 'it' ? 'Simulatore sblocco:' : 'Unblock Simulator:'}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSimulationMode(!simulationMode)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                simulationMode
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-[#1A202C] text-gray-200 border border-[#C5A059]/40'
              }`}
            >
              {simulationMode ? (lang === 'it' ? 'Modalità Manuale' : 'Manual Mode') : (lang === 'it' ? 'Regola Sliders' : 'Adjust Sliders')}
            </button>
            {simulationMode && (
              <button
                onClick={handleResetSimulation}
                className="p-1 text-gray-400 hover:text-red-400"
                title="Reset"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Chakra Breakdown Accordion Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#DFC08D] tracking-wider">
            {lang === 'it' ? 'Dettaglio dei 7 Centri Energetici' : '7 Energy Centers Breakdown'}
          </h3>
          <span className="text-[10px] text-[#C5A059] font-medium">
            {lang === 'it' ? 'Seleziona per analizzare' : 'Tap to inspect'}
          </span>
        </div>

        {chakras.map((c) => {
          const isSelected = selectedChakraId === c.id;
          const isCritical = c.status === 'critical';
          const isBlocked = c.status === 'blocked';

          return (
            <motion.div
              key={c.id}
              layout
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isSelected
                  ? 'bg-[#1A202C] border-[#C5A059] shadow-lg ring-1 ring-[#C5A059]/40'
                  : 'bg-[#131822] border-[#C5A059]/30 hover:border-[#C5A059]/50'
              }`}
            >
              {/* Card Header */}
              <button
                onClick={() => setSelectedChakraId(isSelected ? null : c.id)}
                className="w-full p-3.5 flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCritical
                        ? 'bg-red-950/80 text-red-400 border border-red-700/60'
                        : isBlocked
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-700/60'
                        : 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60'
                    }`}
                  >
                    {isCritical ? '!' : isBlocked ? '🔒' : '✓'}
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-bold text-xs text-[#E2E8F0]">
                      {lang === 'it' ? c.italianName : c.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-0.5 text-[10px]">
                      <span className="text-gray-400">
                        {lang === 'it' ? 'Attuale:' : 'Current:'} <strong className={isCritical || isBlocked ? 'text-red-400' : 'text-emerald-400'}>{c.currentLevel}%</strong>
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">
                        Target: <strong className="text-[#C5A059]">{c.targetLevel}%</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isCritical
                        ? 'bg-red-900/60 text-red-300 border border-red-700/40'
                        : isBlocked
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-700/40'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/40'
                    }`}
                  >
                    {c.status}
                  </span>
                  {isSelected ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Progress Bar Visual */}
              <div className="w-full bg-gray-800 h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isCritical ? 'bg-red-500' : isBlocked ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${c.currentLevel}%` }}
                ></div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3.5 bg-[#0D111A] border-t border-[#C5A059]/30 text-xs space-y-3"
                  >
                    <p className="text-gray-300 leading-relaxed italic">{c.description}</p>

                    <div className="bg-[#131822] p-3 rounded-lg border border-[#C5A059]/30">
                      <div className="flex items-center space-x-1.5 text-[#EF4444] font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{lang === 'it' ? 'Nota Diagnostica sul Blocco:' : 'Diagnostic Note on Block:'}</span>
                      </div>
                      <p className="text-[11px] text-gray-200 leading-normal">{c.impactNote}</p>
                    </div>

                    {/* Simulation Slider if enabled */}
                    {simulationMode && (
                      <div className="pt-2 border-t border-gray-700">
                        <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                          <span>{lang === 'it' ? 'Simula livello energetico:' : 'Simulate level:'}</span>
                          <span className="font-bold text-[#C5A059]">{c.currentLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={c.currentLevel}
                          onChange={(e) => handleSliderChange(c.id, parseInt(e.target.value))}
                          className="w-full accent-[#C5A059] h-1.5 bg-gray-700 rounded-lg cursor-pointer"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-[#131822] text-[#FDFBF7] rounded-xl border border-[#C5A059]/40 space-y-2 shadow-lg">
        <div className="flex items-center space-x-2 text-[#C5A059]">
          <Sparkles className="w-4 h-4" />
          <h4 className="font-serif-heading text-xs font-bold uppercase tracking-wider">
            {lang === 'it' ? 'Sintesi dell\'Operatore' : 'Operator Overview'}
          </h4>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          {lang === 'it'
            ? 'L\'intervento di svincolo ridurrà drasticamente l\'influsso sul chakra Radice (da 95% a 40%) per consentire il completo ripristino del chakra Sacrale (da 15% a 85%) e del Cuore (da 45% a 90%).'
            : 'The protocol reduces Root Chakra pressure from 95% to 40%, restoring Sacral and Heart levels.'}
        </p>
      </div>
    </div>
  );
};
