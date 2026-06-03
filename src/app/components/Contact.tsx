import { Phone, MessageCircle, Mail, MapPin, Wrench } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('./sendmail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Kontaktanfrage',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          summary: formData.message,
          website: '', // Honeypot-Feld (bleibt leer)
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success('Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(data.error || 'Senden fehlgeschlagen. Bitte rufen Sie uns an.');
      }
    } catch {
      toast.error('Netzwerkfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-gray-50 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl">Kontakt</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nehmen Sie Kontakt mit uns auf – wir freuen uns auf Ihre Anfrage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="mb-6">Kontaktmöglichkeiten</h3>

              <div className="space-y-4">
                <a
                  href="tel:+4912345678"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group"
                >
                  <div className="bg-red-100 group-hover:bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                    <Phone className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Telefon</div>
                    <div>+49 123 456 78</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/4912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group"
                >
                  <div className="bg-red-100 group-hover:bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                    <MessageCircle className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">WhatsApp</div>
                    <div>+49 123 456 78</div>
                  </div>
                </a>

                <a
                  href="mailto:info@faogi-services.de"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group"
                >
                  <div className="bg-red-100 group-hover:bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                    <Mail className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">E-Mail</div>
                    <div>info@faogi-services.de</div>
                  </div>
                </a>

                <a
                  href="https://www.my-hammer.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors group"
                >
                  <div className="bg-red-100 group-hover:bg-red-600 w-12 h-12 rounded-xl flex items-center justify-center transition-colors">
                    <Wrench className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">MyHammer</div>
                    <div className="text-sm">Profil besuchen</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl">
                  <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Adresse</div>
                    <div>Musterstraße 123</div>
                    <div>12345 Musterstadt</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Karte wird geladen...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="mb-6">Nachricht senden</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                  placeholder="ihre.email@beispiel.de"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                  placeholder="+49 123 456 78"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors resize-none"
                  placeholder="Ihre Nachricht an uns..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Wird gesendet …' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
