import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { PROTOCOL_INFO } from '../data/mockData';
import { BookOpen, Plus, Trash2, Calendar, Tag, Sparkles, Lock, Save, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface JournalTabProps {
  lang: 'it' | 'fr';
}

export const JournalTab: React.FC<JournalTabProps> = ({ lang }) => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('sara_journal_entries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      {
        id: '1',
        date: new Date().toISOString().split('T')[0],
        title: lang === 'it' ? 'Apertura fascicolo e primo riscontro da Sara' : 'Ouverture du dossier et premier retour de Sara',
        content: lang === 'it'
          ? 'Colloquio con la richiedente Sara Ouachtouk. Confermati i sintomi di distacco emotivo improvviso in Mahdi a seguito dell\'influenza familiare. Predisposta la schermatura per la Fase I (23 Luglio).'
          : 'Consultation avec la demandesse Sara Ouachtouk. Confirmation du détachement émotionnel soudain chez Mahdi suite à l\'influence familiale. Mise en place du bouclier pour la Phase I (23 Juillet).',
        tags: ['Opérateur', 'Analyse']
      }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('Observation');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('sara_journal_entries', JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(lang === 'it' ? 'it-IT' : 'fr-FR'),
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: [selectedTag]
    };

    setEntries([entry, ...entries]);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="parchment-card p-5 rounded-2xl border border-[#C5A059]/30 relative overflow-hidden bg-[#131822]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#C5A059]">
            <BookOpen className="w-5 h-5" />
            <span className="font-serif-heading font-bold text-xs uppercase tracking-widest text-[#C5A059]">
              {lang === 'it' ? 'Diario dell\'Operatore Esoterico' : 'Journal de l\'Opérateur Ésotérique'}
            </span>
          </div>

          <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#C5A059] px-2.5 py-0.5 rounded-full border border-[#C5A059]/30 flex items-center space-x-1">
            <Lock className="w-3 h-3" />
            <span>{lang === 'it' ? 'Riservato Operatore' : 'Réservé Opérateur'}</span>
          </span>
        </div>

        <h2 className="font-serif-heading text-xl text-[#DFC08D] font-extrabold uppercase tracking-tight mt-2">
          {lang === 'it' ? 'Note & Monitoraggio Operatore' : 'Notes & Suivi de l\'Opérateur'}
        </h2>
        <div className="mt-1 text-xs text-gray-300 space-y-1">
          <p className="font-medium bg-[#1A202C] px-2.5 py-1 rounded border border-[#C5A059]/30 inline-block text-[11px] text-[#DFC08D]">
            <strong>{lang === 'it' ? 'Operatore:' : 'Opérateur :'}</strong> {PROTOCOL_INFO.operatorName} &nbsp;|&nbsp; <strong>{lang === 'it' ? 'Richiedente:' : 'Demandeur :'}</strong> Sara Ouachtouk &nbsp;|&nbsp; <strong>{lang === 'it' ? 'Soggetto:' : 'Sujet :'}</strong> Mahdi
          </p>
          <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
            {lang === 'it'
              ? 'Diario di lavoro ad uso esclusivo dell\'Operatore per registrare osservazioni clinico-rituali, segnali inviati da Sara e riscontri comportamentali di Mahdi durante i 36 giorni.'
              : 'Journal de travail à l\'usage exclusif de l\'Opérateur pour consigner les observations clinico-rituelles et les retours comportementaux.'}
          </p>
        </div>

        {/* Add Entry CTA */}
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 w-full py-2.5 bg-[#1A202C] text-[#DFC08D] border border-[#C5A059]/40 rounded-xl font-serif-heading text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow hover:bg-[#C5A059] hover:text-white transition"
        >
          <Plus className="w-4 h-4 text-[#C5A059]" />
          <span>{lang === 'it' ? 'Nuova Annotazione dell\'Operatore' : 'Nouvelle Annotation de l\'Opérateur'}</span>
        </button>
      </div>

      {/* Entries List */}
      <div className="space-y-3">
        <h3 className="font-serif-heading text-xs font-bold uppercase text-[#DFC08D] tracking-wider px-1">
          {lang === 'it' ? 'Note Archiviate' : 'Logged Entries'} ({entries.length})
        </h3>

        {entries.length === 0 ? (
          <div className="text-center p-8 bg-[#131822] rounded-xl border border-dashed border-gray-700 text-xs text-gray-400">
            {lang === 'it' ? 'Nessuna annotazione ancora salvata. Clicca sopra per aggiungere la prima.' : 'No entries yet.'}
          </div>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#131822] p-4 rounded-xl border border-[#C5A059]/30 shadow-sm space-y-2 relative"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[10px] text-gray-400 font-bold uppercase">
                    {entry.date}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {entry.tags?.map((t, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-semibold bg-[#1A202C] text-[#C5A059] px-2 py-0.5 rounded border border-[#C5A059]/30"
                    >
                      #{t}
                    </span>
                  ))}

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="p-1 text-gray-500 hover:text-red-400 transition"
                    title="Elimina nota"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="font-serif-heading font-bold text-xs text-[#E2E8F0]">
                {entry.title}
              </h4>

              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                {entry.content}
              </p>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#131822] rounded-2xl p-5 shadow-2xl border border-[#C5A059]/40 space-y-4 text-gray-200"
            >
              <div className="flex justify-between items-center border-b border-[#C5A059]/30 pb-2">
                <h3 className="font-serif-heading font-bold text-sm text-[#DFC08D] uppercase">
                  {lang === 'it' ? 'Aggiungi Note al Diario' : 'Add Journal Entry'}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-200 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddEntry} className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                    {lang === 'it' ? 'Titolo / Argomento:' : 'Title:'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={lang === 'it' ? 'Es. Telefonata inaspettata di Mahdi' : 'e.g. Unexpected call from Mahdi'}
                    className="w-full p-2.5 bg-[#1A202C] text-xs text-[#E2E8F0] rounded-lg border border-gray-700 focus:border-[#C5A059] outline-none placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                    {lang === 'it' ? 'Categoria / Tag:' : 'Category Tag:'}
                  </label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full p-2.5 bg-[#1A202C] text-xs text-[#E2E8F0] rounded-lg border border-gray-700 focus:border-[#C5A059] outline-none"
                  >
                    <option value="Sensazione">{lang === 'it' ? 'Sensazione / Umore' : 'Feeling / Mood'}</option>
                    <option value="Sogno">{lang === 'it' ? 'Sogno Premonitorio' : 'Dream'}</option>
                    <option value="Comunicazione">{lang === 'it' ? 'Messaggio / Telefonata' : 'Call / Message'}</option>
                    <option value="Incontro">{lang === 'it' ? 'Incontro Diretto' : 'In-person Meeting'}</option>
                    <option value="Segno">{lang === 'it' ? 'Segno / Sincronicità' : 'Synchronicity Sign'}</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                    {lang === 'it' ? 'Dettaglio dell\'osservazione:' : 'Observation Content:'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={lang === 'it' ? 'Descrivi cosa hai notato o provato...' : 'Describe what you noticed...'}
                    className="w-full p-2.5 bg-[#1A202C] text-xs text-[#E2E8F0] rounded-lg border border-gray-700 focus:border-[#C5A059] outline-none resize-none placeholder-gray-500"
                  />
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/2 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 rounded-lg text-xs font-bold uppercase transition"
                  >
                    {lang === 'it' ? 'Annulla' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2 bg-[#C5A059] text-white rounded-lg text-xs font-bold uppercase shadow hover:bg-[#b08c47] transition"
                  >
                    {lang === 'it' ? 'Salva Nota' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
