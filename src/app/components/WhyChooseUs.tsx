import { Clock, Shield, DollarSign, MapPin, Award } from 'lucide-react';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

const features = [
  {
    icon: Shield,
    title: 'Zuverlässig',
    description: 'Pünktlich und verlässlich – darauf können Sie sich verlassen',
  },
  {
    icon: Clock,
    title: 'Schnell verfügbar',
    description: 'Kurzfristige Termine und flexible Einsatzplanung',
  },
  {
    icon: Award,
    title: 'Rundum-Sorglos-Rabatt',
    description: 'Bis zu 15% Rabatt beim Komplettpaket aller Leistungen',
    highlighted: true,
  },
  {
    icon: DollarSign,
    title: 'Transparente Preise',
    description: 'Faire Preise ohne versteckte Kosten',
  },
  {
    icon: MapPin,
    title: 'Lokaler Service',
    description: 'Wir sind in Ihrer Nähe und kennen die Region',
  },
];

export function WhyChooseUs() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} id="why" className="py-16 px-4 bg-gray-50 scroll-mt-16 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">Warum FAOGI SERVICES?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professionell, zuverlässig und persönlich – das sind unsere Werte
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHighlighted = 'highlighted' in feature && feature.highlighted;
            return (
              <div
                key={index}
                className={`p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all ${
                  isHighlighted
                    ? 'bg-gradient-to-br from-red-600 to-red-700 text-white ring-4 ring-red-200'
                    : 'bg-white'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  isHighlighted ? 'bg-white/20' : 'bg-red-100'
                }`}>
                  <Icon className={`w-8 h-8 ${isHighlighted ? 'text-white' : 'text-red-600'}`} />
                </div>
                <h4 className="mb-2">{feature.title}</h4>
                <p className={`text-sm leading-relaxed ${
                  isHighlighted ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
