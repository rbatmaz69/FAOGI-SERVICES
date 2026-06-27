import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

interface HeaderProps {
  onRequestService: () => void;
}

const navLinks = [
  { id: 'services', label: 'Leistungen' },
  { id: 'why', label: 'Warum wir?' },
  { id: 'about', label: 'Über uns' },
  { id: 'contact', label: 'Kontakt' },
];

export function Header({ onRequestService }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 text-lg tracking-tight"
        >
          <img src={logo} alt="FAOGI Logo" className="h-11 w-auto" />
          <span className="text-black">FAOGI</span> <span className="text-red-600">SERVICES</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm transition-colors hover:text-red-600 ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onRequestService}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Service anfragen
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü"
          className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            scrolled ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10'
          }`}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-3 rounded-lg text-gray-800 hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onRequestService();
              }}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Service anfragen
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
