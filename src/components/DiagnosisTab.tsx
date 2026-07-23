import React, { useState } from 'react';
import { ChakraData } from '../types';
import { CHAKRA_INITIAL_DATA, PROTOCOL_INFO } from '../data/mockData';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, AlertTriangle, Eye, RefreshCw, Zap, Sparkles, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosisTabProps {
  lang: 'it' | 'en';
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
    <div className="space-y-6 pb-24">
      {/* Intro Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#C5A059]/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center space-x-2 text-[#C5A059] mb-1.5">
          <Activity className="w-5 h-5 animate-pulse" />
          <span className="font-serif-heading font-bold text-xs uppercase tracking-widest">
            {lang === 'it' ? 'Diagnosi Energetica Quantitativa' : 'Quantitative Energy Diagnosis'}
          </span>
        </div>
        <h2 className="font-serif-heading text-xl text-[#2D3436] font-extrabold uppercase tracking-tight">
          {lang === 'it' ? 'Analisi del Blocco di Mahdi' : 'Mahdi\'s Blockage Analysis'}
        </h2>
        <p className="text-xs text-[#2D3436]/80 mt-2 leading-relaxed">
          {lang === 'it'
            ? 'Mahdi presenta un "Incatenamento Saturnino". L\'energia vitale che dovrebbe fluire spontaneamente verso l\'intimità e il futuro con Sara è coartata e drenata dai doveri primordiali verso la famiglia.'
            : 'Mahdi exhibits a "Saturnine Entanglement". Energy that should flow towards Sara is trapped by family obligations.'}
        </p>
      </div>

      {/* Radar Chart Section */}
      <div className="parchment-card p-4 rounded-2xl border border-[#C5A059]/30 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-[#C5A059]" />
            <span className="font-serif-heading text-xs font-bold uppercase tracking-wider text-[#2D3436]">
              {lang === 'it' ? 'Mappa dei Flussi Aurici' : 'Auric Map Radar'}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTargetData(!showTargetData)}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                showTargetData
                  ? 'bg-[#C5A059] text-white border-[#C5A059]'
                  : 'bg-[#F4EFE6] text-[#2D3436] border-[#C5A059]/30'
              }`}
            >
              {showTargetData ? (lang === 'it' ? '✓ Confronto Attivo' : '✓ Compare On') : (lang === 'it' ? '+ Confronta Target' : '+ Compare Target')}
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 text-[10px] font-medium mb-2">
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-[#A93226]"></span>
            <span className="text-[#2D3436]">{lang === 'it' ? 'Stato Attuale (Bloccato)' : 'Current Blocked'}</span>
          </div>
          {showTargetData && (
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-[#C5A059]"></span>
              <span className="text-[#2D3436]">{lang === 'it' ? 'Target Post-Rituale' : 'Target Post-Ritual'}</span>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="h-64 w-full my-1">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
              <PolarGrid stroke="#C5A059" strokeOpacity={0.25} />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#2D3436', fontSize: 10, fontFamily: 'Inter' }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Stato Attuale"
                dataKey="Attuale"
                stroke="#A93226"
                fill="#A93226"
                fillOpacity={0.35}
              />
              {showTargetData && (
                <Radar
                  name="Target Atteso"
                  dataKey="Target"
                  stroke="#C5A059"
                  fill="#C5A059"
                  fillOpacity={0.25}
                />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2D3436',
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
          <span className="text-[#2D3436]/70">
            {lang === 'it' ? 'Simulatore sblocco:' : 'Unblock Simulator:'}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSimulationMode(!simulationMode)}
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                simulationMode
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-[#F4EFE6] text-[#2D3436] border border-[#C5A059]/30'
              }`}
            >
              {simulationMode ? (lang === 'it' ? 'Modalità Manuale' : 'Manual Mode') : (lang === 'it' ? 'Regola Sliders' : 'Adjust Sliders')}
            </button>
            {simulationMode && (
              <button
                onClick={handleResetSimulation}
                className="p-1 text-gray-500 hover:text-red-600"
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
          <h3 className="font-serif-heading text-xs font-bold uppercase text-[#2D3436] tracking-wider">
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
                  ? 'bg-white border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30'
                  : 'bg-[#FDFBF7]/90 border-[#C5A059]/20 hover:border-[#C5A059]/40'
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
                        ? 'bg-red-100 text-red-700 border border-red-300'
                        : isBlocked
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {isCritical ? '!' : isBlocked ? '🔒' : '✓'}
                  </div>
                  <div>
                    <h4 className="font-serif-heading font-bold text-xs text-[#2D3436]">
                      {lang === 'it' ? c.italianName : c.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-0.5 text-[10px]">
                      <span className="text-gray-500">
                        {lang === 'it' ? 'Attuale:' : 'Current:'} <strong className={isCritical || isBlocked ? 'text-red-600' : 'text-emerald-600'}>{c.currentLevel}%</strong>
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">
                        Target: <strong className="text-[#C5A059]">{c.targetLevel}%</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      isCritical
                        ? 'bg-red-100 text-red-700'
                        : isBlocked
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {c.status}
                  </span>
                  {isSelected ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {/* Progress Bar Visual */}
              <div className="w-full bg-gray-100 h-1.5 overflow-hidden">
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
                    className="p-3.5 bg-[#F4EFE6]/50 border-t border-[#C5A059]/20 text-xs space-y-3"
                  >
                    <p className="text-gray-700 leading-relaxed italic">{c.description}</p>

                    <div className="bg-white p-3 rounded-lg border border-[#C5A059]/20">
                      <div className="flex items-center space-x-1.5 text-[#A93226] font-semibold mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{lang === 'it' ? 'Nota Diagnostica sul Blocco:' : 'Diagnostic Note on Block:'}</span>
                      </div>
                      <p className="text-[11px] text-gray-800 leading-normal">{c.impactNote}</p>
                    </div>

                    {/* Simulation Slider if enabled */}
                    {simulationMode && (
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center text-[10px] text-gray-600 mb-1">
                          <span>{lang === 'it' ? 'Simula livello energetico:' : 'Simulate level:'}</span>
                          <span className="font-bold text-[#C5A059]">{c.currentLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={c.currentLevel}
                          onChange={(e) => handleSliderChange(c.id, parseInt(e.target.value))}
                          className="w-full accent-[#C5A059] h-1.5 bg-gray-200 rounded-lg cursor-pointer"
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
      <div className="p-4 bg-[#2D3436] text-[#FDFBF7] rounded-xl border border-[#C5A059]/40 space-y-2">
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
