import { Phone } from 'lucide-react';

export function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-25" />
        <a
          href="tel:+4915224190030"
          className="relative bg-red-600 hover:bg-red-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Jetzt anrufen"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>
      <span className="text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
        Anrufen
      </span>
    </div>
  );
}
