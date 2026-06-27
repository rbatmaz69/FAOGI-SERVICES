import { Phone } from 'lucide-react';

export function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href="tel:+4915224190030"
        className="bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Jetzt anrufen"
      >
        <Phone className="w-7 h-7" />
      </a>
    </div>
  );
}
