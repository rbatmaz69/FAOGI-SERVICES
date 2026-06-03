import { Leaf, Scissors, Snowflake, Wrench, Sparkles, Fence, Home, Trash2 } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Hausmeisterservice',
    description: 'Umfassende Betreuung Ihrer Immobilie',
  },
  {
    icon: Sparkles,
    title: 'Reinigung',
    description: 'Professionelle Reinigungsarbeiten innen und außen',
  },
  {
    icon: Leaf,
    title: 'Gartenpflege',
    description: 'Professionelle Pflege Ihres Gartens das ganze Jahr über',
  },
  {
    icon: Scissors,
    title: 'Außenanlagenpflege',
    description: 'Gehwege, Höfe und befestigte Flächen',
  },
  {
    icon: Snowflake,
    title: 'Winterdienst',
    description: 'Zuverlässiger Schnee- und Räumdienst bei jedem Wetter',
  },
  {
    icon: Fence,
    title: 'Zaunmontage',
    description: 'Professionelle Montage und Reparatur von Zäunen',
  },
  {
    icon: Home,
    title: 'Terrassenüberdachung',
    description: 'Planung und Montage von Terrassenüberdachungen',
  },
  {
    icon: Trash2,
    title: 'Entrümpelung',
    description: 'Professionelle Entrümpelung von Wohnungen und Objekten',
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 px-4 bg-white scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">Unsere Leistungen</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Von der Gartenpflege bis zum Hausmeisterservice – wir bieten Ihnen professionelle Dienstleistungen für Ihr Zuhause
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-600 hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="bg-gray-100 group-hover:bg-red-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-7 h-7 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
