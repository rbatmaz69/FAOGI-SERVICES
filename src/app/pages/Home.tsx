import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Ablauf } from '../components/Ablauf';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';

interface HomeProps {
  onRequestService: () => void;
}

export function Home({ onRequestService }: HomeProps) {
  return (
    <>
      <Hero onRequestService={onRequestService} />
      <Services />
      <Ablauf />
      <WhyChooseUs />
      <About />
      <FAQ />
      <Contact />
    </>
  );
}
