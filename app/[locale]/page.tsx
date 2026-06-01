import Hero from '@/components/Hero';
import TrainingAreas from '@/components/TrainingAreas';
import About from '@/components/About';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CtaBand from '@/components/CtaBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrainingAreas />
      <About />
      <Packages />
      <Testimonials />
      <FAQ />
      <CtaBand />
    </>
  );
}
