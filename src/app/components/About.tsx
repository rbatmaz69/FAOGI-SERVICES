import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heckenpflege from '@/assets/about/heckenpflege.jpg';
import schubkarre from '@/assets/about/schubkarre-bepflanzung.jpg';
import rosenbeet from '@/assets/about/rosenbeet.jpg';
import hochzeitstisch from '@/assets/about/hochzeitstisch.jpg';

const slides = [
  { src: rosenbeet, alt: 'Gepflegtes Rosenbeet im Garten' },
  { src: schubkarre, alt: 'Liebevoll bepflanzte Schubkarre als Gartendekoration' },
  { src: heckenpflege, alt: 'FAOGI SERVICES bei der Heckenpflege und Wildkrautentfernung' },
  { src: hochzeitstisch, alt: 'Festlich gedeckter Hochzeitstisch im Außenbereich' },
];

const SLIDE_INTERVAL = 5000;

export function About() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [current]);

  const goTo = (index: number) => setCurrent((index + slides.length) % slides.length);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  return (
    <section id="about" className="py-16 px-4 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6 text-3xl md:text-4xl">Über FAOGI SERVICES</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                FAOGI SERVICES ist Ihr zuverlässiger Partner für Hausmeisterservice und Außenanlagenpflege in der Region. Mit jahrelanger Erfahrung und einem engagierten Team sorgen wir dafür, dass Ihre Immobilie stets in bestem Zustand ist.
              </p>
              <p>
                Unser Ziel ist es, Ihnen den Alltag zu erleichtern. Ob regelmäßige Gartenpflege, Winterdienst, umfassende Hausmeisterarbeiten oder Entrümpelung – wir kümmern uns professionell und gewissenhaft um alle anfallenden Aufgaben.
              </p>
              <p>
                Vertrauen Sie auf unsere Expertise und unseren persönlichen Service. Wir sind nicht nur Dienstleister, sondern Ihr verlässlicher Partner vor Ort.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <div className="text-3xl mb-1">10+</div>
                <div className="text-sm text-gray-600">Jahre Erfahrung</div>
              </div>
              <div>
                <div className="text-3xl mb-1">500+</div>
                <div className="text-sm text-gray-600">Zufriedene Kunden</div>
              </div>
              <div>
                <div className="text-3xl mb-1">100%</div>
                <div className="text-sm text-gray-600">Zuverlässigkeit</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
              {slides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    index === current ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Navigation arrows */}
              <button
                type="button"
                onClick={prev}
                aria-label="Vorheriges Bild"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Nächstes Bild"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Bild ${index + 1} anzeigen`}
                    className={`h-2.5 rounded-full transition-all ${
                      index === current ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-2xl mb-1">Lokal & Persönlich</div>
              <div className="text-sm opacity-90">Ihr Partner vor Ort</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
