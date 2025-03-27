import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import ServicesSection from '@/components/ServicesSection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <FeatureSection />
      <ServicesSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
