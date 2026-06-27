import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StickyCallButton } from './components/StickyCallButton';
import { ServiceConfigurator } from './components/ServiceConfigurator';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';
import { Home } from './pages/Home';
import { LeistungenDetail } from './pages/LeistungenDetail';

export default function App() {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const openConfigurator = () => setShowConfigurator(true);

  return (
    <div className="min-h-screen bg-white">
      <Header onRequestService={openConfigurator} />

      <Routes>
        <Route path="/" element={<Home onRequestService={openConfigurator} />} />
        <Route
          path="/leistungen"
          element={<LeistungenDetail onRequestService={openConfigurator} />}
        />
        <Route
          path="/leistungen/:slug"
          element={<LeistungenDetail onRequestService={openConfigurator} />}
        />
      </Routes>

      <Footer
        onRequestService={openConfigurator}
        onShowImpressum={() => setShowImpressum(true)}
        onShowDatenschutz={() => setShowDatenschutz(true)}
      />
      <StickyCallButton />

      <ServiceConfigurator
        isOpen={showConfigurator}
        onClose={() => setShowConfigurator(false)}
      />
      <Impressum isOpen={showImpressum} onClose={() => setShowImpressum(false)} />
      <Datenschutz isOpen={showDatenschutz} onClose={() => setShowDatenschutz(false)} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
