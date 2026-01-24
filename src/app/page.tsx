import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import PreviousWork from '@/components/PreviousWork';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ServicesSection />
      <PreviousWork />
      <CallToAction />
      <Footer />
    </main>
  );
}
