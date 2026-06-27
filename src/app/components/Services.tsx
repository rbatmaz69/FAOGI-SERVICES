import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';
import { services } from '@/app/data/services';

export function Services() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} id="services" className="py-16 px-4 bg-white scroll-mt-16 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">Unsere Leistungen</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Von der Gartenpflege bis zum Hausmeisterservice – wir bieten Ihnen professionelle Dienstleistungen für Ihr Zuhause
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                to={`/leistungen/${service.slug}`}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-red-600 hover:shadow-xl transition-all cursor-pointer group flex flex-col"
              >
                <div className="bg-gray-100 group-hover:bg-red-600 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-7 h-7 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Mehr erfahren <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
