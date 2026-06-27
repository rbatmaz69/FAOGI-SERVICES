import { X } from 'lucide-react';

interface ImpressumProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Impressum({ isOpen, onClose }: ImpressumProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl">Impressum</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-gray-700 leading-relaxed">
          <section>
            <h3 className="text-base font-semibold text-black mb-2">Angaben gemäß § 5 TMG</h3>
            <p>
              Fatma Batmaz<br />
              FAOGI SERVICES<br />
              Gartenstraße 88<br />
              74076 Heilbronn
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Kontakt</h3>
            <p>
              Telefon: <a href="tel:+4915224190030" className="text-red-600 hover:underline">+49 1522 4190030</a><br />
              E-Mail: <a href="mailto:info@faogi-services.de" className="text-red-600 hover:underline">info@faogi-services.de</a>
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Unternehmensform</h3>
            <p>
              Kleingewerbe gemäß § 19 UStG. Es besteht kein Eintrag im Handelsregister.
              Eine Umsatzsteuer-Identifikationsnummer liegt nicht vor.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
            <p>
              Fatma Batmaz<br />
              Gartenstraße 88<br />
              74076 Heilbronn
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Haftung für Inhalte</h3>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
              mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
