'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-200">
              About Us
            </span>
          </h1>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
            Learn more about our company and mission coming soon.
          </p>
          <div className="flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 