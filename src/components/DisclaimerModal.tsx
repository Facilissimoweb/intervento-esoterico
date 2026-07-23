import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#131822] text-[#E2E8F0] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#C5A059]/50 overflow-hidden my-auto flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-[#1A202C] px-5 py-4 flex justify-between items-center border-b border-[#C5A059]/30 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif-heading font-bold text-xs uppercase tracking-wider text-[#DFC08D]">
                Disclaimer & Liberatoria di Responsabilità
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/10"
              title="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body content */}
          <div className="p-6 space-y-4 text-xs text-gray-300 leading-relaxed overflow-y-auto flex-1 font-sans">
            <h2 className="font-serif-heading text-sm font-bold text-[#DFC08D] uppercase tracking-wide border-b border-[#C5A059]/20 pb-2">
              INFORMATIVA E LIBERATORIA PER ESCLUSIONE DA RESPONSABILITÀ
            </h2>

            <p>
              I corsi, i servizi e i trattamenti offerti da Maria Teresa Rogani, e da chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, sono pratiche senza alcuna valenza scientifica e gli operatori e le operatrici che le svolgono non sono né medici, né psichiatri, né psicologi o psicoterapeuti, non possono quindi fornire diagnosi, prescrivere o somministrare farmaci, né formulare terapie.
            </p>

            <p>
              Le persone che decidono di usufruire di questi servizi lo fanno in piena coscienza, libertà e responsabilità. In nessun caso le suddette pratiche possono essere considerate una terapia, né tantomeno è consigliato sospendere o ridurre le terapie mediche in corso. Le suddette pratiche non costituiscono formalmente una cura fisica, pertanto non è garantito alcun risultato specifico.
            </p>

            <p>
              Consultare sempre un medico abilitato per prendersi cura del proprio stato fisico e/o psichico. Ogni individuo è responsabile per sé stesso e per le proprie cure mediche, psicologiche o psichiatriche. Chi prende visione di tali informazioni e le sottoscrive rinuncia ad ogni tipo di azione legale nei confronti di Maria Teresa Rogani, o di chiunque operi per suo conto, la cui lista è disponibile presso la sede del Titolare, e libera tutti i soggetti indicati in questo documento da ogni e qualsivoglia responsabilità.
            </p>

            <h3 className="font-serif-heading text-xs font-bold text-[#DFC08D] uppercase tracking-wide pt-2 border-t border-[#C5A059]/20">
              L’OPERATORE OLISTICO
            </h3>

            <div className="space-y-3">
              <p>
                <strong>1)</strong> L’operatore olistico non si pone come sostituto della medicina classica occidentale, ma come strumento complementare. Si occupa di preservare il benessere dell’individuo a 360°, aiutandolo ad integrarsi nei cicli naturali della vita, ristabilendo gli equilibri del benessere.
              </p>

              <p>
                Non formula diagnosi, non rilascia ricette e non interferisce con le prescrizioni di farmaci e rimedi dati o suggeriti dai medici. Fornisce consigli su come utilizzare nel migliore dei modi i rimedi naturali ritenuti più idonei per il miglioramento del proprio benessere psico-fisico e energetico.
              </p>

              <p>
                Questo sito non intende offrire consigli medici e le informazioni qui contenute non possono sostituirsi ad un consulto personalizzato effettuato da un medico.
              </p>

              <p>
                Il cliente dovrebbe consultare un medico a proposito della propria salute, soprattutto riguardo a sintomi che possano richiedere diagnosi e/o trattamento.
              </p>

              <p>
                L’operatore olistico può supportare chi si rivolge a lui, nella scelta del metodo di cura naturale più indicato al suo problema.
              </p>

              <p>
                L’operatore olistico non si assume alcuna responsabilità per qualsiasi conseguenza che possa derivare da qualsiasi trattamento, procedura, azione, modifica dello stato di health o applicazione di qualsiasi metodo da parte di qualsiasi persona che legga o segua le informazioni contenute su questo sito.
              </p>

              <p>
                Non si può garantire che le informazioni e i consigli qui contenuti siano adatti o sicuri per ogni persona.
              </p>

              <p>
                Ogni sforzo è stato fatto per garantire che le informazioni qui contenute siano il più complete ed accurate possibile, oltre che aggiornate. Ma queste informazioni dovrebbero essere usate soltanto come guida, e non come la fonte definitiva di informazioni sui disturbi e disagi a cui qui si fa cenno.
              </p>

              <p>
                Per tutti questi motivi si declina ogni responsabilità per qualsiasi conseguenza, danno o perdita che possano essere causate dal contenuto di questo sito e dagli articoli in esso pubblicati.
              </p>

              <p>
                <strong>2)</strong> Ad oggi le discipline Olistiche dette anche Bio-Naturali non hanno ottenuto una normativa a livello nazionale. In attesa di una regolamentazione “ufficiale” alcune regioni come la Lombardia, Toscana, Liguria, Emilia Romagna, hanno stabilito leggi regionali che permettono alla medicina Olistica di affiancarsi a quella tradizionale. Viene riportata di seguito la LEGGE REGIONALE 1 febbraio 2005, N. 2 “Norme in materia di discipline bio-naturali”. (BURL n. 5, 1º suppl. ord. del 04 Febbraio 2005) urn:nir:regione.lombardia:legge:2005-02-01;2
              </p>

              <p>
                Tali pratiche, che non hanno carattere di prestazioni sanitarie, tendono a stimolare le risorse vitali dell’individuo attraverso metodi ed elementi naturali la cui efficacia sia stata verificata nei contesti culturali e geografici in cui le discipline sono sorte e si sono sviluppate.
              </p>

              <p>
                <strong>3)</strong> Le informazioni contenute in essi non sono a carattere medico e non vogliono in alcun modo sostituirsi a qualunque consulenza o prescrizione medica. Questo sito fornisce informazioni su argomenti riguardanti il benessere inteso in senso olistico.
              </p>

              <p>
                L’approccio olistico non si pone in contrapposizione, né in alcun modo intende sostituire la medicina tradizionale. Pertanto, è sempre richiesto di utilizzare con intelligenza e buon senso tutte le informazioni presenti su questo sito.
              </p>

              <p>
                Le informazioni contenute in questo sito non costituiscono pareri di tipo professionale, medico o giuridico e non possono in nessun caso essere utilizzate per la cura di patologie o disturbi di qualsivoglia natura.
              </p>

              <p>
                Per qualsiasi decisione o informazione riguardante lo stato di salute è necessario che la persona si rivolga al proprio medico curante o ad un’altra figura professionale autorizzata.
              </p>

              <p>
                Se credi di essere in una condizione che richiede cure mediche, psicologiche, ecc., per favore rivolgiti subito alla figura professionale di riferimento.
              </p>

              <p>
                Nessun professionista olistico può dunque sovrapporsi alle figure medico/psicologiche o ricoprirne le vesti.
              </p>

              <p>
                L’Operatore Olistico, l’Operatore del Benessere e l’Operatore Energetico possono intervenire esclusivamente per aiutare il soggetto in questione a riequilibrare il proprio sistema energetico, ma non possono in nessun caso fare diagnosi, prescrivere e/o somministrare farmaci, sostituire un medico o qualunque altra figura professionale preposta.
              </p>

              <p>
                In Italia, la professione dell’operatore olistico è regolamentata dalla legge 4/2013. I trattamenti olistici sono trattamenti di riequilibrio energetico volti al recupero ed al mantenimento del benessere e della vitalità della persona.
              </p>
            </div>
          </div>

          {/* Footer close button */}
          <div className="bg-[#1A202C] px-5 py-3 border-t border-[#C5A059]/30 flex justify-end flex-shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#C5A059] hover:bg-[#b08c47] text-white text-xs font-bold font-serif-heading uppercase rounded-xl transition"
            >
              Ho Compreso e Accetto
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
