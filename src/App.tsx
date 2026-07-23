/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { DiagnosisTab } from './components/DiagnosisTab';
import { TimelineTab } from './components/TimelineTab';
import { RiskTab } from './components/RiskTab';
import { FinancialTab } from './components/FinancialTab';
import { JournalTab } from './components/JournalTab';
import { FullDossierModal } from './components/FullDossierModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { PROTOCOL_INFO } from './data/mockData';
import { Shield, Sparkles, FileText, ChevronRight, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initGoogleTranslate, setGoogleTranslateLang } from './utils/googleTranslate';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('diagnosi');
  const [lang, setLang] = useState<'it' | 'fr'>('it');
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  useEffect(() => {
    initGoogleTranslate();
  }, []);

  const handleSetLang = (newLang: 'it' | 'fr') => {
    setLang(newLang);
    setGoogleTranslateLang(newLang);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#E2E8F0] flex flex-col font-sans selection:bg-[#C5A059]/30">
      {/* Hidden Google Translate Target Element */}
      <div id="google_translate_element" className="hidden pointer-events-none" aria-hidden="true" />

      {/* Mobile Frame Container */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-[#0B0E14] relative shadow-2xl border-x border-[#C5A059]/20">
        
        {/* Top Header Navigation */}
        <Header
          currentTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenFullDossier={() => setIsDossierOpen(true)}
          lang={lang}
          setLang={handleSetLang}
        />

        {/* Main Content Area */}
        <main className="flex-1 px-4 py-4 overflow-x-hidden pb-8">
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
                className="space-y-4"
              >
                <div className="parchment-card p-6 rounded-2xl border border-[#C5A059]/40 text-center space-y-3 bg-[#131822]">
                  <Shield className="w-12 h-12 text-[#C5A059] mx-auto animate-bounce" />
                  <h2 className="font-serif-heading text-lg font-bold uppercase text-[#DFC08D]">
                    {lang === 'it' ? 'Fascicolo Completo Stampabile' : 'Dossier Complet Imprimable'}
                  </h2>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {lang === 'it'
                      ? 'Accedi alla versione integrale e formattata della relazione operativa da leggere o stampare in formato A4.'
                      : 'Accédez à la version intégrale et formatée du rapport opérationnel à lire ou à imprimer au format A4.'}
                  </p>
                  <button
                    onClick={() => setIsDossierOpen(true)}
                    className="w-full py-3 bg-[#C5A059] text-white rounded-xl font-serif-heading text-xs font-bold uppercase tracking-wider shadow hover:bg-[#b08c47] transition flex items-center justify-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{lang === 'it' ? 'Apri Fascicolo Integrale' : 'Ouvrir le Dossier Intégral'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer with Legal Notice & Disclaimer */}
        <footer className="mt-auto p-4 border-t border-[#C5A059]/20 bg-[#0D111A] text-center space-y-3">
          <p className="text-[10px] text-gray-400 leading-normal">
            Tarot Italia di Maria Teresa Rogani P.Iva 02136780430 è studio Olistico a Macerata ai sensi di Legge 4/2013.
          </p>

          <div>
            <button
              onClick={() => setIsDisclaimerOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1A202C] hover:bg-[#252D3D] border border-[#C5A059]/30 text-[#DFC08D] text-[10px] font-bold font-serif-heading uppercase tracking-wider transition"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>DISCLAIMER: Informativa e Liberatoria</span>
            </button>
          </div>
        </footer>
      </div>

      {/* Full Dossier Modal */}
      <FullDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        lang={lang}
      />

      {/* Legal Disclaimer Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />
    </div>
  );
}

