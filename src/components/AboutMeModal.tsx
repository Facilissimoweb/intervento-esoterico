import React from 'react';
import { TERESA_OPERATOR_PROFILE } from '../data/mockData';
import { X, GraduationCap, Award, Feather, ShieldCheck, Sparkles, Compass, Heart, BookOpen, Printer } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'it' | 'fr';
}

export const AboutMeModal: React.FC<AboutMeModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-xl max-h-[90vh] bg-[#131822] text-[#E2E8F0] rounded-2xl shadow-2xl border border-[#C5A059]/40 overflow-hidden flex flex-col print:border-none print:shadow-none print:max-h-none print:text-black print:bg-white"
      >
        {/* Modal Header */}
        <div className="p-4 bg-[#1A202C] border-b border-[#C5A059]/30 flex items-center justify-between print:border-b-2 print:border-black print:bg-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 flex items-center justify-center text-[#C5A059]">
              <Feather className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h2 className="font-serif-heading font-bold text-sm uppercase tracking-wider text-[#DFC08D] print:text-black">
                {TERESA_OPERATOR_PROFILE.name} / {TERESA_OPERATOR_PROFILE.brand}
              </h2>
              <p className="text-[11px] text-gray-400 print:text-gray-700 font-medium">
                {TERESA_OPERATOR_PROFILE.title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-lg bg-[#2A344B] text-[#DFC08D] hover:bg-[#C5A059] hover:text-white transition border border-[#C5A059]/30"
              title="Stampa Profilo"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Hero Banner / Bio summary */}
          <div className="p-4 bg-gradient-to-br from-[#1A202C] to-[#0F131C] rounded-xl border border-[#C5A059]/30 space-y-2 relative overflow-hidden print:bg-none print:border-gray-300">
            <div className="flex items-center space-x-2 text-[#C5A059]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#DFC08D] print:text-black">
                {TERESA_OPERATOR_PROFILE.subtitle}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed print:text-black">
              Iscritta al registro di competenza olistica e simbolica, con una formazione multidisciplinare che unisce la sensibilità visivo-simbolica accademica, le antiche arti dei Tarocchi Esoterici, le pratiche di guarigione energetica Usui®, la Naturopatia e la Radiestesia del Pendolo PTAH.
            </p>
          </div>

          {/* Formazione Scolastica */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2 text-[#C5A059] border-b border-[#C5A059]/25 pb-1.5 print:border-black">
              <GraduationCap className="w-4 h-4 text-[#C5A059] print:text-black" />
              <h3 className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D] print:text-black">
                {lang === 'it' ? 'Formazione Scolastica & Accademica' : 'Formation Scolaire & Académique'}
              </h3>
            </div>

            <div className="p-3.5 bg-[#1A202C] rounded-xl border border-gray-800 space-y-1 print:bg-white print:border-gray-300">
              <strong className="text-xs font-serif-heading font-bold text-[#DFC08D] block print:text-black">
                {TERESA_OPERATOR_PROFILE.academicEducation.degree}
              </strong>
              <span className="text-[11px] text-[#C5A059] font-medium block print:text-gray-800">
                {TERESA_OPERATOR_PROFILE.academicEducation.institution}
              </span>
              <p className="text-[11px] text-gray-300 pt-1 leading-relaxed print:text-black">
                {TERESA_OPERATOR_PROFILE.academicEducation.description}
              </p>
            </div>
          </div>

          {/* Qualifiche & Percorsi Olistici */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#C5A059] border-b border-[#C5A059]/25 pb-1.5 print:border-black">
              <Award className="w-4 h-4 text-[#C5A059] print:text-black" />
              <h3 className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D] print:text-black">
                {lang === 'it' ? 'Percorsi Formativi, Attestati & Certificazioni' : 'Parcours de Formation & Certifications'}
              </h3>
            </div>

            <div className="space-y-2.5">
              {TERESA_OPERATOR_PROFILE.qualifications.map((q) => (
                <div key={q.id} className="p-3.5 bg-[#1A202C] rounded-xl border border-gray-800 space-y-1.5 print:bg-white print:border-gray-300">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif-heading font-bold text-xs text-[#DFC08D] print:text-black pr-2">
                      {q.title}
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] px-2 py-0.5 rounded border border-[#C5A059]/30 flex-shrink-0 print:border-black print:text-black print:bg-transparent">
                      {q.type}
                    </span>
                  </div>

                  <p className="text-[11px] text-gray-300 font-medium print:text-gray-800">
                    {q.subtitle}
                  </p>

                  {q.mentor && (
                    <p className="text-[10px] text-gray-400 print:text-gray-700 italic">
                      {lang === 'it' ? 'Direzione / Docenza:' : 'Direction / Enseignement :'} <strong className="text-gray-200 print:text-black font-semibold">{q.mentor}</strong>
                    </p>
                  )}

                  {q.accreditation && (
                    <div className="flex items-center space-x-1.5 pt-1 text-[10px] text-emerald-400 print:text-black font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400 print:text-black" />
                      <span>{q.accreditation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Garanzia Etica e Professionale */}
          <div className="p-3.5 bg-[#1A202C] rounded-xl border border-[#C5A059]/30 space-y-1.5 text-[11px] text-gray-300 print:bg-white print:border-black print:text-black">
            <strong className="text-xs font-serif-heading font-bold text-[#DFC08D] block print:text-black flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-[#C5A059] print:text-black" />
              <span>{lang === 'it' ? 'Metodologia & Garanzia di Riservatezza' : 'Méthodologie & Garantie de Confidentialité'}</span>
            </strong>
            <p className="leading-relaxed text-[10px] text-gray-300 print:text-black">
              {lang === 'it'
                ? "Ogni indagine e operazione svolta dall'Operatore Teresa sotto la sigla TAROT ITALIA segue rigorosamente i principi di etica olistica, massima riservatezza professionale e tutela della persona, impiegando unicamente strumenti consacrati e protocolli radiestesici di precisione."
                : "Chaque enquête et opération menée par l'Opérateur Teresa sous le nom TAROT ITALIA suit rigoureusement les principes d'éthique holistique, de confidentialité professionnelle et de protection de la personne."}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#1A202C] border-t border-[#C5A059]/30 text-center print:hidden">
          <button
            onClick={onClose}
            className="w-full py-2 bg-[#C5A059] hover:bg-[#b08d49] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md"
          >
            {lang === 'it' ? 'Chiudi Scheda Operatore' : 'Fermer la Fiche Opérateur'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
