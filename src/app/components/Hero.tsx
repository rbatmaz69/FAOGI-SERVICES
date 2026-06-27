import { ArrowRight, ChevronDown } from 'lucide-react';
import logistikwagen from '@/assets/logistikwagen.jpg';

interface HeroProps {
  onRequestService: () => void;
}

export function Hero({ onRequestService }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={logistikwagen}
          alt="Dynamischer Logistikwagen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-white mb-4 text-4xl md:text-6xl">
          FAOGI SERVICES
        </h1>
        <p className="text-white/90 mb-8 text-xl md:text-2xl">
          Ihr zuverlässiger Partner für Hausmeisterservice & Außenanlagenpflege
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onRequestService}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            Service anfragen
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition-all border border-white/30 w-full sm:w-auto"
          >
            Leistungen ansehen
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  );
}
