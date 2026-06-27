import { X } from 'lucide-react';

interface DatenschutzProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Datenschutz({ isOpen, onClose }: DatenschutzProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl">Datenschutzerklärung</h2>
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
            <h3 className="text-base font-semibold text-black mb-2">1. Verantwortliche Stelle</h3>
            <p>
              Verantwortliche Stelle im Sinne der Datenschutzgesetze ist:<br /><br />
              Fatma Batmaz<br />
              FAOGI SERVICES<br />
              Gartenstraße 88<br />
              74076 Heilbronn<br /><br />
              Telefon: <a href="tel:+4915224190030" className="text-red-600 hover:underline">+49 1522 4190030</a><br />
              E-Mail: <a href="mailto:info@faogi-services.de" className="text-red-600 hover:underline">info@faogi-services.de</a>
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">2. Allgemeines zur Datenverarbeitung</h3>
            <p>
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
              personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften (DSGVO, BDSG) sowie dieser Datenschutzerklärung.
              Diese Website erhebt keine Tracking-Daten und verwendet keine Cookies.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">3. Kontaktformular</h3>
            <p>
              Wenn Sie uns über das Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben
              aus dem Formular – einschließlich der von Ihnen angegebenen Kontaktdaten (Name,
              E-Mail-Adresse, Telefonnummer, Nachricht) – zur Bearbeitung Ihrer Anfrage bei uns
              gespeichert.<br /><br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw.
              vorvertragliche Maßnahmen).<br /><br />
              Die Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben und nach
              abschließender Bearbeitung Ihrer Anfrage gelöscht, sofern keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">4. Schriftarten (Fonts)</h3>
            <p>
              Diese Seite verwendet zur einheitlichen Darstellung die Schriftart „Montserrat".
              Die Schriftdateien werden lokal von unserem eigenen Webserver geladen und sind
              fester Bestandteil dieser Website. Es findet <strong>keine Verbindung zu Servern
              von Google oder anderen Drittanbietern</strong> statt, und es werden hierbei keine
              personenbezogenen Daten (insbesondere keine IP-Adresse) an Dritte übermittelt.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">5. Ihre Rechte als betroffene Person</h3>
            <p>
              Sie haben gemäß DSGVO folgende Rechte gegenüber uns:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Auskunft</strong> über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO)</li>
              <li><strong>Berichtigung</strong> unrichtiger Daten (Art. 16 DSGVO)</li>
              <li><strong>Löschung</strong> Ihrer Daten (Art. 17 DSGVO)</li>
              <li><strong>Einschränkung</strong> der Verarbeitung (Art. 18 DSGVO)</li>
              <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
              <li><strong>Widerspruch</strong> gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-2">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
              <a href="mailto:info@faogi-services.de" className="text-red-600 hover:underline">
                info@faogi-services.de
              </a>
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">6. Beschwerderecht bei der Aufsichtsbehörde</h3>
            <p>
              Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren. Die für
              Baden-Württemberg zuständige Aufsichtsbehörde ist:<br /><br />
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              Lautenschlagerstraße 20<br />
              70173 Stuttgart<br />
              Telefon: +49 711 615541-0<br />
              E-Mail: poststelle@lfdi.bwl.de
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-black mb-2">7. Datensicherheit</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
              daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt.
            </p>
          </section>

          <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
            Stand: Juni 2026
          </p>
        </div>
      </div>
    </div>
  );
}
