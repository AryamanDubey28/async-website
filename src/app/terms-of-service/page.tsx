'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link'; // Import Link for internal navigation

// Re-using the PolicySection component structure
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

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {/* Background effects consistent with other pages */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/10 to-teal-950/10 animate-gradient-xy"></div>

        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                Terms of Service
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services.
            </p>
             <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/20"></div>
            </div>
          </div>

          {/* Main Terms Content */}
          <div className="relative p-6 md:p-10 rounded-2xl border border-gray-800/80 bg-gray-950/70 backdrop-blur-lg shadow-xl shadow-black/20">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-600/10 via-transparent to-purple-600/10 opacity-40 rounded-2xl pointer-events-none"></div>
             <div className="absolute inset-0 pattern-dots opacity-5 pointer-events-none"></div>

            <div className="relative z-10">
               <p className="mb-6 text-gray-400">Last Updated: [Insert Date of Last Update Here]</p>
              <p className="mb-8 text-yellow-300 bg-yellow-900/30 border border-yellow-700/50 p-4 rounded-lg text-sm italic">
                <strong>Disclaimer:</strong> These Terms of Service are provided as a template and general guide. They are not legal advice. Async Studios must consult with a qualified legal professional to ensure these terms are complete, accurate, and compliant with all applicable laws and regulations for its specific business operations, services, and jurisdiction (England and Wales).
              </p>

              <PolicySection title="1. Introduction and Acceptance of Terms">
                <p>Welcome to Async Studios ("Async Studios," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website located at [Your Website URL, e.g., asyncstudios.com] (the "Website") and the services we offer, including but not limited to the development and provision of AI agents, custom AI solutions, and related consulting services (collectively, the "Services").</p>
                <p>By accessing or using our Website or Services, you agree to be bound by these Terms and our <Link href="/privacy-policy" className="text-teal-400 hover:text-teal-300 underline">Privacy Policy</Link>, incorporated herein by reference. If you do not agree to these Terms, you must not access or use the Website or Services.</p>
                <p>We may update these Terms from time to time. We will notify you of significant changes by posting the new Terms on the Website and updating the "Last Updated" date. Your continued use of the Website or Services after such changes constitutes your acceptance of the new Terms. [Consider specifying notification method for material changes, e.g., email for registered users, if applicable].</p>
                 {/* Optional: Add details on how acceptance is confirmed, e.g., clicking a button for specific service sign-ups. */}
              </PolicySection>

              <PolicySection title="2. Definitions">
                <p>Key terms used in this agreement:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li><strong>"Service(s)":</strong> Refers to the AI agent development, custom AI solutions, consulting, website access, and any other offerings provided by Async Studios as described on our Website or in specific agreements.</li>
                  <li><strong>"User," "You," "Your":</strong> Refers to the individual or entity accessing or using the Website or Services.</li>
                  <li><strong>"Content":</strong> Refers to text, graphics, images, software, data, and any other materials provided on or through the Website or Services, excluding User Content.</li>
                  <li><strong>"User Content":</strong> Refers to any data, information, or material provided or submitted by you to or through the Services. [Refine based on whether users submit content].</li>
                   <li><strong>"AI Agent":</strong> Refers to autonomous or semi-autonomous software programs developed by Async Studios designed to perform specific tasks.</li>
                   <li><strong>"Intellectual Property Rights":</strong> Refers to patents, copyrights, trademarks, trade secrets, and other proprietary rights.</li>
                   <li><i>[Add other relevant definitions specific to your services, e.g., specific product names, subscription terms if any]</i></li>
                </ul>
              </PolicySection>

              <PolicySection title="3. Description of Services">
                <p>Async Studios provides bespoke AI solutions, including the design, development, and implementation of AI Agents and custom software, primarily for business clients. Our Services aim to help businesses optimize performance, drive innovation, and harness the power of artificial intelligence.</p>
                 <p>Specific details, scope, deliverables, limitations, and technical requirements for any custom development or consulting Services will be outlined in a separate agreement (e.g., Statement of Work, Service Agreement) between Async Studios and the client.</p>
                 <p>The Website provides information about our Services, company, and potentially blog posts or other resources. We strive to ensure the Website is available but do not guarantee uninterrupted access. We reserve the right to modify or discontinue any part of the Website or Services at any time. [Consider adding details on maintenance windows if applicable].</p>
                 <p>[Specify any geographic limitations if Services are restricted].</p>
              </PolicySection>

              <PolicySection title="4. User Eligibility and Responsibilities">
                <p>To use our Services, you must be at least 18 years old and have the legal capacity to enter into binding contracts. If you are using the Services on behalf of an entity, you represent and warrant that you have the authority to bind that entity to these Terms.</p>
                <p>You agree to:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Provide accurate and complete information when requested (e.g., via contact forms or service agreements).</li>
                  <li>Use the Website and Services only for lawful purposes and in accordance with these Terms and any applicable specific agreements.</li>
                  <li>Not engage in any activity that interferes with or disrupts the Website or Services (or the servers and networks connected to the Services).</li>
                  <li>Not attempt to gain unauthorized access to any part of the Website, Services, or our systems.</li>
                  <li>Be responsible for maintaining the confidentiality of any account credentials associated with the Services [If applicable].</li>
                  <li>Comply with all applicable laws and regulations, including data privacy laws, regarding your use of the Services and any data you provide or process.</li>
                  <li>Not use the Services to develop or train competing AI models without our express written consent. [Consider adding specifics on prohibited uses].</li>
                   <li>Respect the Intellectual Property Rights of Async Studios and third parties.</li>
                </ul>
              </PolicySection>

              <PolicySection title="5. Pricing, Payment, and Termination Details">
                 <p className="text-sm text-gray-500 italic mb-4">Note: Adapt this section heavily based on your business model. If you only do custom projects via separate contracts, state that pricing is project-specific. If you offer subscriptions or standard products, detail those terms.</p>
                <p>Pricing for custom development and consulting Services is determined on a project-by-project basis and will be detailed in a separate written agreement between Async Studios and the client. Such agreements will outline payment terms, schedules, and any applicable taxes.</p>
                <p>[If offering standard products/subscriptions: Detail payment methods, billing cycles (e.g., monthly, annual), subscription terms, automatic renewal policies, cancellation procedures, and refund policies (or state if non-refundable)].</p>
                 <p>We reserve the right to suspend or terminate your access to the Website or Services for any breach of these Terms or the terms of any specific service agreement, with or without notice, depending on the severity of the breach. [Detail termination procedures, e.g., notice period, reasons for termination].</p>
                 <p>Upon termination, your right to use the Services ceases immediately. [Specify data retention/deletion policy post-termination, consistent with your Privacy Policy and applicable laws].</p>
              </PolicySection>

               <PolicySection title="6. Intellectual Property Rights">
                <p>The Website, Services, and all Content (excluding User Content, if applicable), including the underlying software, AI models (unless otherwise specified in a client agreement), text, graphics, logos, and branding, are the exclusive property of Async Studios and its licensors, protected by copyright, trademark, and other laws.</p>
                <p>Subject to your compliance with these Terms, Async Studios grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Website and applicable Services solely for your internal business purposes or personal use, as intended through the provided functionality.</p>
                <p>You agree not to copy, modify, distribute, sell, lease, or reverse engineer any part of our Website or Services without our prior written consent.</p>
                 <p>Ownership of Intellectual Property Rights related to custom Services developed for a client (e.g., bespoke AI Agents) will be governed by the specific terms of the applicable service agreement between Async Studios and the client.</p>
                 <p>[Address User Content ownership if users submit content - e.g., user retains ownership but grants Async Studios a license to use it for providing the Service].</p>
              </PolicySection>

              <PolicySection title="7. Data Protection and Privacy Policy Reference">
                 <p>Your privacy is important to us. Our collection and use of personal information in connection with your access to and use of the Website and Services is described in our <Link href="/privacy-policy" className="text-teal-400 hover:text-teal-300 underline">Privacy Policy</Link>.</p>
                 <p>By using our Website or Services, you acknowledge that you have read and understood our Privacy Policy and consent to the data practices described therein.</p>
              </PolicySection>

              <PolicySection title="8. Disclaimer and Limitation of Liability">
                 <p className="text-sm text-gray-500 italic mb-4">Note: This section is highly dependent on legal advice and the nature of your services. The following is very generic.</p>
                <p><strong>Disclaimer of Warranties:</strong> THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. ASYNC STUDIOS DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, NOR DOES IT MAKE ANY WARRANTY AS TO THE ACCURACY, COMPLETENESS, RELIABILITY, OR RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES.</p>
                 <p><strong>Limitation of Liability:</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ASYNC STUDIOS, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (a) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (b) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES; (c) ANY CONTENT OBTAINED FROM THE SERVICES; OR (d) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
                 <p>[Consider adding a cap on direct damages, often linked to fees paid, subject to legal advice].</p>
                 <p>[Consider adding an Indemnification clause where users agree to defend/indemnify Async Studios against claims arising from their misuse of the service or violation of terms, subject to legal advice].</p>
              </PolicySection>

              <PolicySection title="9. Governing Law and Jurisdiction">
                <p>These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims) shall be governed by and construed in accordance with the law of England and Wales.</p>
                <p>You agree that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or their subject matter or formation (including non-contractual disputes or claims).</p>
              </PolicySection>

               <PolicySection title="10. Updates to Terms">
                 <p>We reserve the right to modify these Terms at any time. We will post the revised Terms on this page and update the "Last Updated" date. For material changes, we may provide more prominent notice [Specify method if desired, e.g., email]. By continuing to access or use our Website or Services after the changes become effective, you agree to be bound by the revised Terms.</p>
              </PolicySection>

              <PolicySection title="11. Contact Us">
                 <p>If you have any questions about these Terms of Service, please contact us at:</p>
                 <p><a href="mailto:legal@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">legal@asyncstudios.com</a></p>
                 <p className="text-sm text-gray-500 italic">Note: Ensure 'legal@asyncstudios.com' is a monitored email address or update it.</p>
                 <p>Or by mail:</p>
                 <p>
                   Async Studios<br />
                   [Insert Your Full Company Address]<br />
                   London, England<br />
                   [Insert Post Code]
                 </p>
              </PolicySection>
            </div>
          </div>
        </div>
      </div>
      <Footer />
       {/* Include necessary global styles */}
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