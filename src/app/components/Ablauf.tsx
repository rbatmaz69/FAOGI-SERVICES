import { PhoneCall, ClipboardCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

const steps = [
  {
    icon: PhoneCall,
    title: 'Anfrage',
    description: 'Sie kontaktieren uns per Telefon, E-Mail oder über das Kontaktformular.',
  },
  {
    icon: ClipboardCheck,
    title: 'Beratung & Besichtigung',
    description: 'Wir besprechen Ihren Bedarf und verschaffen uns – wenn nötig – vor Ort einen Überblick.',
  },
  {
    icon: FileText,
    title: 'Unverbindliches Angebot',
    description: 'Sie erhalten ein transparentes Angebot zum Festpreis – kostenlos und ohne Verpflichtung.',
  },
  {
    icon: CheckCircle2,
    title: 'Zuverlässige Umsetzung',
    description: 'Nach Ihrer Zusage erledigen wir die vereinbarten Arbeiten pünktlich und sorgfältig.',
  },
];

export function Ablauf() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} id="ablauf" className="py-16 px-4 bg-white scroll-mt-16 reveal">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">So läuft's ab</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            In nur vier einfachen Schritten zu Ihrem erledigten Auftrag
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative bg-gray-50 rounded-2xl p-6 text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                  {index + 1}
                </div>
                <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2">
                  <Icon className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
