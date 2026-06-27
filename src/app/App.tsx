import { useState } from 'react';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServiceConfigurator } from './components/ServiceConfigurator';
import { WhyChooseUs } from './components/WhyChooseUs';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { StickyCallButton } from './components/StickyCallButton';
import { Impressum } from './components/Impressum';
import { Datenschutz } from './components/Datenschutz';

export default function App() {
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const openConfigurator = () => setShowConfigurator(true);

  return (
    <div className="min-h-screen bg-white">
      <Header onRequestService={openConfigurator} />
      <Hero onRequestService={openConfigurator} />
      <Services />
      <ServiceConfigurator
        isOpen={showConfigurator}
        onClose={() => setShowConfigurator(false)}
      />
      <WhyChooseUs />
      <About />
      <Contact />
      <Footer
        onRequestService={openConfigurator}
        onShowImpressum={() => setShowImpressum(true)}
        onShowDatenschutz={() => setShowDatenschutz(true)}
      />
      <StickyCallButton />
      <Impressum isOpen={showImpressum} onClose={() => setShowImpressum(false)} />
      <Datenschutz isOpen={showDatenschutz} onClose={() => setShowDatenschutz(false)} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
