import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

interface HomeProps {
  onRequestService: () => void;
}

export function Home({ onRequestService }: HomeProps) {
  return (
    <>
      <Hero onRequestService={onRequestService} />
      <Services />
      <WhyChooseUs />
      <About />
      <Contact />
    </>
  );
}
