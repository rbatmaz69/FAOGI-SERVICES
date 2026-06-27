import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Was kostet ein Einsatz?',
    a: 'Das hängt vom Umfang der Arbeiten ab. Sie erhalten von uns immer ein kostenloses und unverbindliches Angebot – so wissen Sie vorab genau, womit Sie rechnen können.',
  },
  {
    q: 'Bieten Sie einmalige Aufträge und regelmäßige Betreuung an?',
    a: 'Ja. Wir übernehmen sowohl einmalige Aufträge (z. B. eine Entrümpelung) als auch laufende Betreuung im regelmäßigen Turnus (z. B. Hausmeisterservice oder Gartenpflege).',
  },
  {
    q: 'Wie schnell bekomme ich einen Termin?',
    a: 'Wir bemühen uns um kurzfristige Termine. Melden Sie sich einfach – wir finden gemeinsam einen passenden Zeitpunkt, der zu Ihrem Anliegen passt.',
  },
  {
    q: 'In welchem Gebiet sind Sie tätig?',
    a: 'Wir sind in Heilbronn und der näheren Umgebung für Sie im Einsatz. Ob Ihr Objekt im Einzugsgebiet liegt, klären wir gerne kurz am Telefon.',
  },
  {
    q: 'Wie kann ich Sie am besten erreichen?',
    a: 'Am schnellsten telefonisch oder per WhatsApp unter +49 1522 4190030. Alternativ erreichen Sie uns per E-Mail oder über das Kontaktformular auf dieser Seite.',
  },
];

const orte = [
  'Heilbronn',
  'Neckarsulm',
  'Weinsberg',
  'Bad Wimpfen',
  'Bad Friedrichshall',
  'Lauffen am Neckar',
  'Leingarten',
  'Brackenheim',
  'Eppingen',
  'Obersulm',
  'Flein',
  'Untergruppenbach',
];

export function FAQ() {
  const ref = useScrollReveal();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={ref} id="faq" className="py-16 px-4 bg-gray-50 scroll-mt-16 reveal">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">Häufige Fragen</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Die wichtigsten Antworten rund um unsere Leistungen
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Einsatzgebiet */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl">Unser Einsatzgebiet</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Wir sind für Sie in Heilbronn und der gesamten Umgebung im Einsatz – unter anderem in:
          </p>
          <div className="flex flex-wrap gap-2">
            {orte.map((ort) => (
              <span
                key={ort}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
              >
                {ort}
              </span>
            ))}
            <span className="bg-red-600 text-white text-sm px-3 py-1.5 rounded-full">
              und Umgebung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
