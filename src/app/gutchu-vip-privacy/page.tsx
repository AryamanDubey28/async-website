'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, children }) => (
  <div className="mb-10 md:mb-12">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-300 inline-block">
      {title}
    </h2>
    <div className="text-gray-300 space-y-4 leading-relaxed text-base md:text-lg">
      {children}
    </div>
  </div>
);

export default function GutchuVipPrivacy() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/10 to-teal-950/10 animate-gradient-xy"></div>

        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                Gutchu VIP Privacy Policy
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              How we handle your data when you use the Gutchu VIP WhatsApp booking service.
            </p>
            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/20"></div>
            </div>
          </div>

          {/* Main Policy Content */}
          <div className="relative p-6 md:p-10 rounded-2xl border border-gray-800/80 bg-gray-950/70 backdrop-blur-lg shadow-xl shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-600/10 via-transparent to-purple-600/10 opacity-40 rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-0 pattern-dots opacity-5 pointer-events-none"></div>

            <div className="relative z-10">
              <p className="mb-6 text-gray-400">Last updated: 24 February 2026</p>

              <PolicySection title="Who we are">
                <p>
                  Gutchu VIP operates an AI-powered WhatsApp chatbot that helps customers book premium chauffeur rides in London. This policy explains how we collect, use, and protect your personal data when you interact with our service.
                </p>
                <p>
                  When we say &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;, we mean Gutchu VIP.
                </p>
              </PolicySection>

              <PolicySection title="What data we collect">
                <p>When you use our WhatsApp booking service, we collect the following information:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Phone number</strong> &mdash; provided automatically when you message us on WhatsApp</li>
                  <li><strong>Name</strong> &mdash; from your WhatsApp profile</li>
                  <li><strong>Booking details</strong> &mdash; pickup location, drop-off location, date and time, number of passengers, and vehicle preference</li>
                </ul>
                <p>We only collect what is necessary to fulfil your booking.</p>
              </PolicySection>

              <PolicySection title="How we use your data">
                <p>We use your data to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Process and confirm your chauffeur bookings</li>
                  <li>Communicate with you about your rides</li>
                  <li>Improve our service</li>
                </ul>
                <p>We <strong>do not</strong> sell your data to third parties. Your data is used solely to provide the booking service.</p>
              </PolicySection>

              <PolicySection title="Third-party processors">
                <p>To deliver our service, your data is processed by the following third-party providers:</p>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-3 pr-6 text-teal-300 font-semibold">Provider</th>
                        <th className="py-3 text-teal-300 font-semibold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-800">
                        <td className="py-3 pr-6 font-medium">Meta (WhatsApp Business API)</td>
                        <td className="py-3">Transmitting messages between you and our service</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 pr-6 font-medium">OpenAI</td>
                        <td className="py-3">Processing your messages to generate booking responses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">These providers act as data processors on our behalf and are subject to their own data protection obligations.</p>
              </PolicySection>

              <PolicySection title="Legal basis for processing">
                <p>Under UK GDPR, we process your data on the basis of:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Contractual necessity</strong> &mdash; to fulfil the chauffeur booking you request</li>
                  <li><strong>Legitimate interests</strong> &mdash; to operate and improve our service</li>
                </ul>
              </PolicySection>

              <PolicySection title="Data retention">
                <p>We keep your booking records for as long as necessary to fulfil the service and meet any legal or regulatory obligations. We do not retain your data longer than needed.</p>
              </PolicySection>

              <PolicySection title="Data security">
                <p>We take reasonable measures to protect your data from unauthorised access, loss, or misuse. However, no method of electronic transmission or storage is completely secure.</p>
              </PolicySection>

              <PolicySection title="Your rights">
                <p>Under UK GDPR, you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>Access</strong> your personal data</li>
                  <li><strong>Correct</strong> inaccurate data</li>
                  <li><strong>Delete</strong> your data</li>
                  <li><strong>Restrict</strong> how we process your data</li>
                  <li><strong>Object</strong> to processing</li>
                  <li><strong>Data portability</strong> &mdash; receive your data in a portable format</li>
                </ul>
                <p>To exercise any of these rights, simply send a message to our WhatsApp number and we will respond within 30 days.</p>
                <p>You also have the right to lodge a complaint with the Information Commissioner&rsquo;s Office (ICO) if you are unsatisfied with how we handle your data.</p>
              </PolicySection>

              <PolicySection title="Children">
                <p>Our service is not intended for individuals under 16. We do not knowingly collect data from children. If we learn we have collected personal information from a child, we will delete it promptly.</p>
              </PolicySection>

              <PolicySection title="Changes to this policy">
                <p>We may update this policy from time to time. Any changes will be communicated through our WhatsApp service. The date at the top of this page shows when this policy was last revised.</p>
              </PolicySection>

              <PolicySection title="Contact us">
                <p>If you have questions about this privacy policy or how we handle your data, you can reach us by messaging our WhatsApp number directly.</p>
              </PolicySection>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx global>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 200% 200%;
        }
        @keyframes text-gradient {
          to {
            background-position: 200% center;
          }
        }
        .animate-text-gradient {
          background-size: 200% auto;
          animation: text-gradient 3s linear infinite;
        }
        .pattern-dots {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 15px 15px;
        }
      `}</style>
    </main>
  );
}
