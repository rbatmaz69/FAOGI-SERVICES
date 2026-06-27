import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { services } from '@/app/data/services';

interface LeistungenDetailProps {
  onRequestService: () => void;
}

export function LeistungenDetail({ onRequestService }: LeistungenDetailProps) {
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      const el = document.getElementById(slug);
      if (el) {
        // Direkt zum gewählten Abschnitt springen, ohne sichtbares Scrollen
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <main className="pt-24 pb-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">Unsere Leistungen im Detail</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Erfahren Sie mehr über unser komplettes Leistungsspektrum für Gebäude, Garten und Event.
          </p>
        </div>

        <div className="space-y-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <section
                key={service.slug}
                id={service.slug}
                className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-600 w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl">{service.title}</h2>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{service.intro}</p>

                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onRequestService}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
                >
                  Service anfragen
                  <ArrowRight className="w-5 h-5" />
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
