interface AboutProps {
  imageUrl?: string;
  imageAlt?: string;
}

export function About({
  imageUrl = "https://images.unsplash.com/photo-1687062013633-f2d1a2686f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxidWlsZGluZyUyMG1haW50ZW5hbmNlJTIwc2VydmljZSUyMHRlYW0lMjB3b3JraW5nfGVufDF8fHx8MTc3Mjk2NjIyMHww&ixlib=rb-4.1.0&q=80&w=1080",
  imageAlt = "FAOGI SERVICES Team"
}: AboutProps = {}) {
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
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
