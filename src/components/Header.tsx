import React, { useState } from 'react';
import { TabType } from '../types';
import { PROTOCOL_INFO } from '../data/mockData';
import { Shield, Sparkles, Info, FileText, ChevronRight, X, User, HeartHandshake, Menu, Activity, Calendar, ShieldAlert, CreditCard, BookOpen, Globe, Feather, Printer, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenFullDossier: () => void;
  lang: 'it' | 'fr';
  setLang: (lang: 'it' | 'fr') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setActiveTab, onOpenFullDossier, lang, setLang }) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const menuItems = [
    {
      id: 'diagnosi' as TabType,
      title: lang === 'it' ? 'Diagnosi Energetica' : 'Diagnostic Énergétique',
      subtitle: lang === 'it' ? 'Analisi dei 7 Centri e del blocco di Mahdi' : 'Analyse des 7 centres et du blocage de Mahdi',
      icon: Activity,
    },
    {
      id: 'cronoprogramma' as TabType,
      title: lang === 'it' ? 'Cronoprogramma Lunare' : 'Calendrier Lunaire',
      subtitle: lang === 'it' ? 'Calendario dei rituali in 36 giorni' : 'Planning des rituels sur 36 jours',
      icon: Calendar,
    },
    {
      id: 'etica' as TabType,
      title: lang === 'it' ? 'Etica & Rischi' : 'Éthique & Matrice de Risques',
      subtitle: lang === 'it' ? 'Protezione per Sara e contenimento' : 'Protection de Sara et confinement',
      icon: ShieldAlert,
    },
    {
      id: 'investimento' as TabType,
      title: lang === 'it' ? 'Oneri & Prospetto Economico' : 'Frais & Bilan Financier',
      subtitle: lang === 'it' ? 'Investimento 600€, acconti e ricevuta' : 'Investissement 600€, acompte et reçu',
      icon: CreditCard,
    },
    {
      id: 'diario' as TabType,
      title: lang === 'it' ? 'Diario dell\'Operatore' : 'Journal de l\'Opérateur',
      subtitle: lang === 'it' ? 'Note riservate di monitoraggio dell\'Operatore' : 'Notes confidentielles de suivi de l\'Opérateur',
      icon: BookOpen,
    },
    {
      id: 'dossier' as TabType,
      title: lang === 'it' ? 'Fascicolo Integrale' : 'Dossier Intégral',
      subtitle: lang === 'it' ? 'Versione ufficiale stampabile in A4' : 'Version officielle imprimable A4',
      icon: FileText,
    },
  ];

  const handleSelectMenuItem = (tabId: TabType) => {
    if (tabId === 'dossier') {
      onOpenFullDossier();
    } else {
      setActiveTab(tabId);
    }
    setShowHamburgerMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#131822]/95 backdrop-blur-md border-b border-[#C5A059]/30 px-4 py-3 transition-all print:hidden text-[#E2E8F0]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Hamburger Menu Trigger */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setShowHamburgerMenu(true)}
              className="p-2 rounded-xl bg-[#1A202C] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition shadow-sm border border-[#C5A059]/40 flex items-center justify-center"
              aria-label="Apri Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D]">
                  TAROT ITALIA
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium truncate max-w-[160px]">
                {lang === 'it' ? 'Richiedente:' : 'Demandeur :'} <strong className="text-gray-200">{PROTOCOL_INFO.clientName}</strong>
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-1.5">
            {/* Language Switch Toggle */}
            <button
              onClick={() => setLang(lang === 'it' ? 'fr' : 'it')}
              className="px-2 py-1 rounded-full bg-[#1A202C] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition border border-[#C5A059]/30 text-[10px] font-bold flex items-center space-x-1"
              title={lang === 'it' ? 'Traduci in Francese' : 'Torna in Italiano'}
            >
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="uppercase">{lang === 'it' ? 'IT' : 'FR'}</span>
            </button>

            {/* Print Button for current page */}
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-full bg-[#1A202C] text-[#E2E8F0] hover:bg-[#C5A059] hover:text-white transition border border-[#C5A059]/30"
              title={lang === 'it' ? 'Stampa Pagina Attuale' : 'Imprimer la Page Actuelle'}
              aria-label="Stampa"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Info Trigger */}
            <button
              onClick={() => setShowInfoModal(true)}
              className="p-1.5 rounded-full bg-[#1A202C] text-[#C5A059] hover:bg-[#C5A059] hover:text-white transition border border-[#C5A059]/30"
              aria-label="Info Protocollo"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Full Dossier View */}
            <button
              onClick={onOpenFullDossier}
              className="flex items-center space-x-1 text-[10px] font-semibold bg-[#2A344B] text-[#FDFBF7] px-2.5 py-1.5 rounded-full shadow-sm hover:bg-[#C5A059] transition border border-[#C5A059]/30"
            >
              <FileText className="w-3 h-3 text-[#C5A059]" />
              <span className="hidden sm:inline">Dossier</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Drawer Menu Overlay */}
      <AnimatePresence>
        {showHamburgerMenu && (
          <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm print:hidden">
            {/* Click outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHamburgerMenu(false)}
              className="absolute inset-0"
            />

            {/* Menu Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative w-4/5 max-w-xs h-full bg-[#1E232A] text-[#FDFBF7] p-5 shadow-2xl flex flex-col justify-between border-r border-[#C5A059]/40 z-10 overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#C5A059]">
                        {PROTOCOL_INFO.code}
                      </h3>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {PROTOCOL_INFO.title}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowHamburgerMenu(false)}
                    className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Language Switcher inside Drawer */}
                <div className="mt-3 p-2.5 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-medium flex items-center space-x-1.5 text-[11px]">
                    <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'it' ? 'Lingua:' : 'Langue :'}</span>
                  </span>
                  <div className="flex space-x-1 bg-white/10 p-1 rounded-lg">
                    <button
                      onClick={() => setLang('it')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                        lang === 'it' ? 'bg-[#C5A059] text-white shadow' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🇮🇹 IT
                    </button>
                    <button
                      onClick={() => setLang('fr')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition ${
                        lang === 'fr' ? 'bg-[#C5A059] text-white shadow' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🇫🇷 FR
                    </button>
                  </div>
                </div>

                {/* Role Breakdown Box */}
                <div className="mt-3 p-3 bg-black/40 rounded-xl border border-[#C5A059]/30 text-[11px] space-y-1.5">
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">{lang === 'it' ? 'Richiedente:' : 'Demandeur :'}</span>
                    <strong className="text-amber-300 font-serif-heading">{PROTOCOL_INFO.clientName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-gray-400">{lang === 'it' ? 'Soggetto:' : 'Sujet :'}</span>
                    <strong className="text-white font-serif-heading">{PROTOCOL_INFO.targetName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-gray-300 pt-1 border-t border-white/10">
                    <span className="text-gray-400 flex items-center space-x-1">
                      <Feather className="w-3 h-3 text-[#C5A059]" />
                      <span>{lang === 'it' ? 'Operatore:' : 'Opérateur :'}</span>
                    </span>
                    <strong className="text-[#C5A059]">{PROTOCOL_INFO.operatorName}</strong>
                  </div>
                </div>

                {/* Privacy & Security Disclaimer in Drawer */}
                <div className="mt-3 p-3 bg-amber-950/40 rounded-xl border border-[#C5A059]/40 text-[10px] text-amber-200/90 leading-relaxed space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[#C5A059]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{lang === 'it' ? 'Accesso Riservato Cifrato' : 'Accès Réservé Chiffré'}</span>
                  </div>
                  <p>
                    {lang === 'it'
                      ? 'L\'accesso a questo link applicativo è strettamente privato. È in possesso esclusivo dell\'Operatore e della cliente Sara Ouachtouk.'
                      : 'L\'accès à ce lien applicatif est strictement privé. Il est en possession exclusive de l\'Opérateur et de la cliente Sara Ouachtouk.'}
                  </p>
                </div>

                {/* Nav Links */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 px-2 block mb-1">
                    {lang === 'it' ? 'Sezioni del Fascicolo' : 'Sections du Dossier'}
                  </span>

                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectMenuItem(item.id)}
                        className={`w-full p-2.5 rounded-xl text-left flex items-start space-x-3 transition-all ${
                          isActive
                            ? 'bg-[#C5A059] text-white shadow-md font-semibold'
                            : 'hover:bg-white/10 text-gray-200'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-[#C5A059]'}`} />
                        <div>
                          <div className="font-serif-heading text-xs font-bold leading-tight">
                            {item.title}
                          </div>
                          <p className={`text-[10px] mt-0.5 leading-tight ${isActive ? 'text-white/90' : 'text-gray-400'}`}>
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setShowHamburgerMenu(false);
                    setShowInfoModal(true);
                  }}
                  className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 rounded-lg text-xs font-semibold uppercase flex items-center justify-center space-x-2"
                >
                  <Info className="w-4 h-4 text-[#C5A059]" />
                  <span>{lang === 'it' ? 'Info e Contesto' : 'Info & Contexte'}</span>
                </button>

                <p className="text-[9px] text-gray-500 text-center italic font-cursive">
                  "{PROTOCOL_INFO.motto}"
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Info Drawer Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 print:hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-[#131822] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border border-[#C5A059]/40 max-h-[85vh] overflow-y-auto text-[#E2E8F0]"
            >
              <div className="flex justify-between items-center pb-3 border-b border-[#C5A059]/30">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[#C5A059]" />
                  <h3 className="font-serif-heading text-sm font-bold text-[#DFC08D] uppercase tracking-wider">
                    {PROTOCOL_INFO.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 rounded-full bg-[#1A202C] text-gray-300 hover:text-red-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs text-gray-300 leading-relaxed">
                <div className="bg-[#1A202C] p-3 rounded-lg border border-[#C5A059]/30">
                  <div className="flex items-center space-x-2 text-[#C5A059] font-bold mb-1">
                    <User className="w-4 h-4" />
                    <span>{lang === 'it' ? 'Anagrafica Protocollo' : 'Données du Protocole'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] mt-2">
                    <div>
                      <span className="text-gray-400 block">{lang === 'it' ? 'Richiedente / Committente:' : 'Demandeur / Cliente :'}</span>
                      <strong className="text-gray-100">{PROTOCOL_INFO.clientName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{lang === 'it' ? 'Soggetto d\'Indagine:' : 'Sujet d\'Étude :'}</span>
                      <strong className="text-gray-100">{PROTOCOL_INFO.targetName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{lang === 'it' ? 'Operatore Responsabile:' : 'Opérateur Responsable :'}</span>
                      <strong className="text-gray-100">{PROTOCOL_INFO.operatorName}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">{lang === 'it' ? 'Codice Archiviazione:' : 'Code d\'Archivage :'}</span>
                      <strong className="text-[#C5A059] font-mono">{PROTOCOL_INFO.code}</strong>
                    </div>
                  </div>
                </div>

                {/* Privacy Disclaimer Box */}
                <div className="p-3 bg-stone-900 text-stone-100 rounded-lg text-xs leading-relaxed space-y-1 border border-[#C5A059]/40">
                  <div className="flex items-center space-x-1.5 font-bold uppercase text-[#C5A059] text-[10px]">
                    <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{lang === 'it' ? 'Garanzia di Riservatezza & Accesso Riservato' : 'Garantie de Confidentialité & Accès Réservé'}</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    {lang === 'it'
                      ? 'Questo link di consultazione e l\'intero fascicolo digitale sono ad uso strettamente privato ed esclusivo dell\'Operatore e della cliente Sara Ouachtouk. Non è presente alcuna diffusione verso terzi.'
                      : 'Ce lien de consultation et l\'ensemble du dossier numérique sont à l\'usage strictement privé et exclusif de l\'Opérateur et de la cliente Sara Ouachtouk. Aucune diffusion à des tiers.'}
                  </p>
                </div>

                <div className="border-l-2 border-[#C5A059] pl-3 py-1">
                  <h4 className="font-serif-heading font-bold text-xs text-[#C5A059] uppercase mb-1">
                    {lang === 'it' ? 'Scopo Operativo' : 'Objectif Opérationnel'}
                  </h4>
                  <p>
                    {lang === 'it'
                      ? 'Svincolo dalle interferenze ancestrali e dai debiti morali imposti dal clan familiare di Mahdi. Il protocollo ripristina la sua naturale capacità di scelta per l\'unione con Sara senza ricatti o sensi di colpa.'
                      : 'Dégagement des interférences ancestrales et des dettes morales imposées par le clan familial de Mahdi. Le protocole restaure sa capacité naturelle de choix pour l\'union avec Sara.'}
                  </p>
                </div>

                <div className="p-3 bg-[#2D3436] text-[#FDFBF7] rounded-lg text-center font-cursive text-sm italic border border-[#C5A059]/40">
                  "{PROTOCOL_INFO.motto}"
                </div>

                <button
                  onClick={() => {
                    setShowInfoModal(false);
                    onOpenFullDossier();
                  }}
                  className="w-full py-2.5 bg-[#C5A059] text-white rounded-lg font-serif-heading font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow hover:bg-[#b08c47] transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'it' ? 'Visualizza Fascicolo Integrale' : 'Afficher le Dossier Intégral'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

