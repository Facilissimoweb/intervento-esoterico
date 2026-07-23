/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DiagnosisTab } from './components/DiagnosisTab';
import { TimelineTab } from './components/TimelineTab';
import { RiskTab } from './components/RiskTab';
import { FinancialTab } from './components/FinancialTab';
import { JournalTab } from './components/JournalTab';
import { FullDossierModal } from './components/FullDossierModal';
import { PROTOCOL_INFO } from './data/mockData';
import { Shield, Sparkles, FileText, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('diagnosi');
  const [lang, setLang] = useState<'it' | 'en'>('it');
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D3436] flex flex-col font-sans selection:bg-[#C5A059]/20">
      
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-[#FDFBF7] relative shadow-2xl border-x border-[#C5A059]/15">
        
        {/* Top Header Navigation */}
        <Header
          currentTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenFullDossier={() => setIsDossierOpen(true)}
          lang={lang}
          setLang={setLang}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-4 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'diagnosi' && (
              <motion.div
                key="diagnosi"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <DiagnosisTab lang={lang} />
              </motion.div>
            )}

            {activeTab === 'cronoprogramma' && (
              <motion.div
                key="cronoprogramma"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <TimelineTab lang={lang} />
              </motion.div>
            )}

            {activeTab === 'etica' && (
              <motion.div
                key="etica"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <RiskTab lang={lang} />
              </motion.div>
            )}

            {activeTab === 'investimento' && (
              <motion.div
                key="investimento"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <FinancialTab lang={lang} />
              </motion.div>
            )}

            {activeTab === 'diario' && (
              <motion.div
                key="diario"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <JournalTab lang={lang} />
              </motion.div>
            )}

            {activeTab === 'dossier' && (
              <motion.div
                key="dossier"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 pb-24"
              >
                <div className="parchment-card p-6 rounded-2xl border border-[#C5A059]/40 text-center space-y-3">
                  <Shield className="w-12 h-12 text-[#C5A059] mx-auto animate-bounce" />
                  <h2 className="font-serif-heading text-lg font-bold uppercase text-[#2D3436]">
                    {lang === 'it' ? 'Fascicolo Completo Stampabile' : 'Full Printable Dossier'}
                  </h2>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {lang === 'it'
                      ? 'Accedi alla versione integrale e formattata della relazione operativa da leggere o stampare in formato A4.'
                      : 'Open the formatted official report suitable for reading or printing.'}
                  </p>
                  <button
                    onClick={() => setIsDossierOpen(true)}
                    className="w-full py-3 bg-[#C5A059] text-white rounded-xl font-serif-heading text-xs font-bold uppercase tracking-wider shadow hover:bg-[#b08c47] transition flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{lang === 'it' ? 'Apri Fascicolo Integrale' : 'Open Full Dossier'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
      </div>

      {/* Full Dossier Modal */}
      <FullDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        lang={lang}
      />
    </div>
  );
}
