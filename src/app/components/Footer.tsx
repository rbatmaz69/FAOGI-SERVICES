import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onRequestService: () => void;
  onShowImpressum: () => void;
  onShowDatenschutz: () => void;
}

export function Footer({ onRequestService, onShowImpressum, onShowDatenschutz }: FooterProps) {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="bg-black text-white pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="text-lg mb-4">
              FAOGI <span className="text-red-500">SERVICES</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Ihr zuverlässiger Partner für Gebäude, Garten und Event!
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Leistungen</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Hausmeisterservice</li>
              <li>Gartenpflege</li>
              <li>Winterdienst</li>
              <li>Außenanlagenpflege</li>
              <li>Entrümpelung</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-white/60">
              {/* TODO: echte Kontaktdaten eintragen */}
              <li>
                <a href="tel:+4915224190030" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> +49 1522 4190030
                </a>
              </li>
              <li>
                <a href="mailto:info@faogi-services.de" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> info@faogi-services.de
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Gartenstraße 88, 74076 Heilbronn
              </li>
            </ul>
          </div>

          {/* CTA + legal */}
          <div>
            <h4 className="mb-4">Schnellzugriff</h4>
            <button
              onClick={onRequestService}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors mb-4"
            >
              Angebot berechnen
            </button>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors">
                  Kontaktformular
                </button>
              </li>
              {/* TODO: Impressum & Datenschutz sind in DE rechtlich Pflicht – Inhalte ergänzen */}
              <li>
                <button onClick={onShowImpressum} className="hover:text-white transition-colors text-left">Impressum</button>
              </li>
              <li>
                <button onClick={onShowDatenschutz} className="hover:text-white transition-colors text-left">Datenschutz</button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
          © {year} FAOGI SERVICES. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
