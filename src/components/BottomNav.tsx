import React from 'react';
import { TabType } from '../types';
import { Activity, Calendar, ShieldAlert, CreditCard, BookOpen, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lang: 'it' | 'fr';
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab, lang }) => {
  const tabs = [
    {
      id: 'diagnosi' as TabType,
      label: lang === 'it' ? 'Diagnosi' : 'Diagnostic',
      icon: Activity,
    },
    {
      id: 'cronoprogramma' as TabType,
      label: lang === 'it' ? 'Ritual' : 'Rituels',
      icon: Calendar,
    },
    {
      id: 'etica' as TabType,
      label: lang === 'it' ? 'Rischi' : 'Risques',
      icon: ShieldAlert,
    },
    {
      id: 'investimento' as TabType,
      label: lang === 'it' ? 'Oneri' : 'Frais',
      icon: CreditCard,
    },
    {
      id: 'diario' as TabType,
      label: lang === 'it' ? 'Diario' : 'Journal',
      icon: BookOpen,
    },
    {
      id: 'dossier' as TabType,
      label: 'Dossier',
      icon: FileText,
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#C5A059]/30 shadow-lg pb-safe print:hidden">
      <div className="max-w-md mx-auto px-2 py-1.5 flex justify-between items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-1.5 rounded-xl min-w-[52px] transition-all duration-200 ${
                isActive
                  ? 'text-[#C5A059] font-bold'
                  : 'text-[#2D3436]/60 hover:text-[#2D3436] font-normal'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-[#C5A059]/10 rounded-xl border border-[#C5A059]/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-[#C5A059]' : ''}`} />
              <span className="text-[10px] mt-1 tracking-tight leading-none truncate max-w-[56px]">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
