'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define types for section data for better structure (Optional but good practice)
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

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      {/* Background effects similar to About page, potentially simplified */}
      <div className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-950 via-purple-950/10 to-teal-950/10 animate-gradient-xy"></div>

        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500 animate-text-gradient">
                Privacy & Cookie Policy
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
             <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-purple-500 to-blue-500 rounded-full shadow-lg shadow-purple-500/20"></div>
            </div>
          </div>

          {/* Main Policy Content */}
          <div className="relative p-6 md:p-10 rounded-2xl border border-gray-800/80 bg-gray-950/70 backdrop-blur-lg shadow-xl shadow-black/20">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-600/10 via-transparent to-purple-600/10 opacity-40 rounded-2xl pointer-events-none"></div>
             <div className="absolute inset-0 pattern-dots opacity-5 pointer-events-none"></div>

            <div className="relative z-10">
              <p className="mb-6 text-gray-400">Last Updated: [Insert Date of Last Update Here]</p>

              <PolicySection title="Introduction">
                <p>Async Studios (“Async Studios,” “we,” or “us”) respects your privacy and is committed to protecting it through our compliance with this Website Privacy and Cookie Policy (“Policy”). This Policy describes the information we collect and process related to our Async Studios website (the “Async Studios Website”) using automated data collection technologies, and what choices you have with respect to the information.</p>
                <p>This Policy applies to registered users of the Async Studios Website as well as those who visit the Async Studios Website (the “User”).</p>
              </PolicySection>

              <PolicySection title="Data Controller">
                <p>When visitors access the Async Studios Website, their personal data may be processed, e.g. during their browsing on the Async Studios Website; other personal data may be voluntarily provided by Async Studios Website visitors if they register to the Async Studios Website, as described below.</p>
                <p>The Data Controller is Async Studios (registered office: [Insert Your Company Address, e.g., London, England]).</p>
                 <p className="text-sm text-gray-500 italic">Note: Ensure you provide your correct, legally registered business address.</p>
              </PolicySection>

              <PolicySection title="Types of Processed Data">
                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-4">Navigation data</h3>
                <p>IT systems and software procedures adopted for the functioning of the Async Studios Website, as a part of their normal functioning, collect various items of personal data. This personal data is transferred as a part of the normal course of events when using the Internet (based on TCP/IP protocol).</p>
                <p>This personal data is not collected in order to be linked to the specific persons it refers to. However, its nature is such that, through processing and collating of data held by third parties, it may be possible to identify navigating users.</p>
                <p>This class of information includes IP addresses or the domain names of the computers of Users visiting the Async Studios Website, the addresses of requested resources (in URI, Uniform Resource Identifier format), the time of the request, the method used to forward the request to the web server, the size of the file obtained as response, the numerical code indicating the status of the response provided by the web server (e.g., successful, error, etc.) and other parameters relative to operating system and to User's IT environment.</p>
                <p>This data is only to be used for anonymous aggregated statistical information relative to use of the Async Studios Website and for control of correct functioning of the Async Studios Website in order to optimize its functionality in relation to the offered services.</p>
                <p>Please note that navigation data may be used for investigations directed at identifying any persons responsible for actions classed as computer crime, which are detrimental to the Async Studios Website or any linked website. If no such investigations are conducted, the data relative to web contacts is destroyed within a reasonable timeframe according to applicable regulations.</p>

                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-6">Data provided voluntarily by User</h3>
                <p>In registration forms or contact forms, where available, visitors may provide requested personal data (e.g., name, email address) in order to submit their registration or inquiry. Moreover, where available Async Studios Website sections dedicated to registered users, some further data may be collected by the Async Studios Website during the browsing session of logged-in registered users e.g. for the download of access-restricted contents.</p>
                <p>When e-mail messages are voluntarily sent to the addresses indicated in the address section of Async Studios Website or via the contact forms, this implies the acquisition of certain items of the requesting party's personal data, including the requesting party's e-mail address (necessary for response to requests).</p>

                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-6">Cookies</h3>
                <p>The Async Studios Website uses "Cookie" technology and potentially other tracking technologies. For information regarding the Cookies used by the Async Studios Website, how they are used and how to manage them, consult the "Cookie Policy" section of this document below.</p>
              </PolicySection>

              <PolicySection title="Processing Procedures and Security Measures">
                <p>Personal data is processed by Async Studios and potentially by third parties providing support on the Async Studios Website by means of automated and non-automated equipment. This data is processed only for no longer than is required to fulfil tasks for which the said data was collected, in compliance with applicable laws.</p>
                <p>Conformity with specific security measures is ensured in order to prevent data losses, illicit or incorrect use, and unauthorized access.</p>
              </PolicySection>

              <PolicySection title="Rights of Concerned Individuals (Data Subject Rights)">
                <p>The individuals referred to by personal data collected by the Async Studios Website have the right, at any time, to request access to their personal data and to obtain the correction or deletion of said data, or to limit the processing of their data, or to oppose its processing. The individuals also have the right to data portability, where applicable.</p>
                <p>The individuals, whose data are processed after explicit consent, have the right to withdraw their consent at any time without prejudice to the lawfulness of the processing based on the consent given before withdrawal.</p>
                <p>Residents of the UK and EU also have the right to lodge a complaint with the competent Supervisory Authority (e.g., the Information Commissioner's Office (ICO) in the UK).</p>
                <p>Such requests are to be addressed by writing us at: Async Studios, [Insert Your Company Address, London, England] or by e-mailing us at:</p>
                <p><a href="mailto:privacy@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">privacy@asyncstudios.com</a></p>
                 <p className="text-sm text-gray-500 italic">Note: Ensure 'privacy@asyncstudios.com' is a monitored email address or update it to your correct contact.</p>

                <p>California residents may have additional rights and choices. Please see the "Additional Information for California Residents" section below for more information.</p>
                {/* Add sections for other jurisdictions if applicable, e.g., Brazil */} 
              </PolicySection>

              <PolicySection title="Children">
                 <p>Async Studios does not knowingly use its Async Studios Website to request and process data from individuals under the age of 16 (or the applicable age of digital consent in their jurisdiction), according to privacy law and further laws and regulations applicable in their country of residence. If we learn we have collected or received personal information from a child under the relevant age without verification of parental consent, we will delete that information.</p>
              </PolicySection>

              <PolicySection title="Cookie Policy">
                <p>The Async Studios Website uses cookies and may use other tracking technologies (e.g., pixels, web beacons) (collectively, the "Cookies") to make its services simple and effective for Async Studios Website Users.</p>
                <p>Cookies are small text files, or parcels of information sent from a website server to the User's browser, which are memorised on the computer or device and automatically returned to the server every time the Async Studios Website is accessed.</p>
                <p>There are various types of Cookies, some used to make using the Async Studios Website more efficient, others to enable certain functions. Cookies and the other tracking technologies can:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Memorize entered preferences;</li>
                  <li>Prevent Users from having to re-enter the same information several times during their visit (e.g., login details if applicable);</li>
                  <li>Analyze in an aggregated and potentially anonymized way the use of the services and contents provided by the Async Studios Website visited in order to optimize the browsing experience and services offered;</li>
                   {/* Adjust or remove the following points based on actual practices */} 
                  <li>Potentially allow Users of the Async Studios Website to be recognized by third parties (e.g., advertising platforms like Google, LinkedIn) during navigation on such third-party platforms in order to inform them about Async Studios initiatives (retargeting);</li>
                  <li>Improve Async Studios marketing strategies on the Async Studios Website and elsewhere;</li>
                  <li>Carry out anonymous or aggregated statistical analysis.</li>
                </ul>

                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-6">Types of Cookies and other tracking technologies used by the Async Studios Website</h3>
                <p className="text-sm text-gray-500 italic mb-4">Note: This section requires careful review and customization based on the *actual* cookies your site uses. You may need a cookie scanning tool to identify them accurately.</p>

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Technical and Strictly Necessary Cookies</h4>
                <p>These Cookies allow certain portions of the Async Studios Website to function correctly and are essential in order to allow the User to browse the Async Studios Website and use its features (e.g., session cookies, security cookies). Such Cookies generally do not require prior consent from the User under applicable laws like UK GDPR/PECR.</p>
                <p>There are two main categories:</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li><strong>Persistent:</strong> Used to store information, potentially including login details if applicable, to prevent re-entry. These remain stored on the computer even after closing the browser for a set duration.</li>
                  <li><strong>Session:</strong> Used to store temporary information, linking actions during a specific session, and are removed when the browser is turned off.</li>
                </ul>
                <p>These Cookies are necessary for the correct functioning and visualization of the Async Studios Website and will therefore always be used and sent unless the User modifies their browser settings (which may impact site functionality).</p>
                <p>This category may also include third-party analytics cookies (like Google Analytics) if they are configured to collect data in an aggregated and anonymized way (e.g., with IP anonymization enabled) such that they primarily measure site performance and usage without identifying individuals directly. Async Studios aims to use analytics information to understand site usage and improve user experience.</p>
                {/* <p>The Async Studios Website uses Google Analytics [...] For more information, please visit the Google Analytics site.</p> */} 

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Functional Cookies</h4>
                <p>These Cookies are used to memorize certain settings selected by the Users (e.g., language preferences, region) in order to provide them with enhanced functionality and personalisation and improve User visit to the Async Studios Website. Such Cookies typically require prior consent from the User.</p>
                <p>Functional Cookies can have the duration of a session but they are generally persistent. The information gathered by these Cookies may be anonymized and cannot track the User's behaviour outside the Async Studios Website.</p>
                {/* Add details on specific functional cookies used, if any */} 

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Analytical / Performance Cookies</h4>
                 <p>These cookies allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily. These cookies typically require user consent.</p>
                 <p>We may use tools like Google Analytics for this purpose. While some configurations might be considered strictly necessary (as mentioned above), standard configurations that allow for user identification or cross-site tracking require consent.</p>

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Advertising / Targeting / Profiling Cookies</h4>
                <p>These cookies record your visit to our website, the pages you have visited and the links you have followed. We may use this information to make our website and the advertising displayed on it (or on third-party sites) more relevant to your interests. We may also share this information with third parties for this purpose. These cookies require prior consent from the User.</p>
                <p>In particular, some Async Studios webpages may include tracking pixels or similar technologies from third parties (e.g., LinkedIn, Facebook, Google Ads) that are used to build a profile based on your interests, upon receiving your consent. Such information may be used to recognize you when browsing on third-party platforms and to show you relevant content promoting Async Studios' initiatives (retargeting).</p>
                <p>Async Studios' role is limited to allowing the installation of such third-party technologies after the Users provide their consent (e.g., via a Cookie Banner/Consent Management Platform). The creation of Users' profiles and the subsequent retargeting are activities performed by these third parties according to their own privacy policies.</p>
                <p>Examples of Third party tracking technologies that might be used for advertising/retargeting purposes (verify actual usage):</p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Facebook Pixel (Meta Platforms, Inc.)</li>
                  <li>LinkedIn Insight Tag (LinkedIn Corporation)</li>
                  <li>Google Ads Conversion Tracking / Remarketing (Google LLC)</li>
                 {/* <li>TechTarget Pixel [...] - REMOVE/REPLACE if not applicable */} 
                </ul>
                <p>At any time, Users can decide to withdraw consent or manage these tracking technologies following the instructions provided below or in the respective third-party privacy policies.</p>

                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-6">User's consent to Cookies and tracking technologies</h3>
                <p>For UK/EU residents, according to applicable laws (UK GDPR, PECR), the Async Studios Website is not obliged to request consent for Technical and Strictly Necessary Cookies, as they are necessary in order to provide the services requested. They may be installed automatically upon the User's first visit.</p>
                <p>Functional, Analytical/Performance, and Advertising/Targeting Cookies shall only be installed upon User prior consent. For this reason, when the User accesses the Async Studios Website, a special banner ("Cookie banner") or consent management tool should inform the User that (i) the Async Studios Website uses these types of Cookies, and that (ii) by clicking appropriate buttons (e.g., "Accept All", "Reject All", "Customize") or by interacting with the Cookie Preferences settings, the User can manage their consent.</p>
                <p>We will track User consent choices (if any) by means of a dedicated technical Cookie or through the consent management platform. Should the User delete technical cookies managing consent status, track of User consent will be lost and, as a consequence, the Cookie banner/tool may be presented to the User again at their next visit.</p>
                <p>If the User uses a different internet browser or device, they may need to set their preferences again.</p>
                <p>If the User doesn't wish to give consent to non-essential Cookies, the User at any time may freely decide to block or disable specific groups of Cookies by one or more of the following means, without significantly affecting their ability to visit the Async Studios Website (though some functionality may be reduced):</p>
                 <ul className="list-disc list-inside space-y-2 pl-4">
                   <li>Using the options within the Cookie banner/consent management tool presented on the website.</li>
                   <li>Via modifications to the settings in the Cookie Preferences section/tool (see below).</li>
                   <li>Via specific browser settings used to browse the Async Studios Website (see below).</li>
                 </ul>
                <p>Please note that certain areas or features of the Async Studios Website might rely on the use of Cookies, meaning that disabling these Cookies could prevent the User from visualizing certain parts of the Async Studios Website correctly or using specific features offered by the Async Studios Website.</p>

                <h3 className="text-xl font-semibold text-teal-300 mb-3 mt-6">How to manage Cookies used by the Async Studios Website</h3>

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Cookie Preferences Section / Tool</h4>
                 <p>At any time, Users should be able to set and change their preferences regarding Cookies using a dedicated Cookie Preferences management tool. This tool should be accessible either via the initial Cookie banner or a specific link available typically in the footer of each webpage of the Async Studios Website. It should allow the User to view the categories of Cookies used, customize preferences, and withdraw consents previously given for each non-essential Cookie category.</p>
                 <p className="text-sm text-gray-500 italic">Note: Implementing a compliant Consent Management Platform (CMP) is necessary to provide this functionality.</p>
                 <p>Remember that editing Cookie Preferences will not remove any existing cookies from the browser, it will only affect the way Cookies are used in future.</p>

                <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Browser settings</h4>
                 <p>In all cases, the User also has the opportunity to manage or delete individual Cookies from their device by consulting the 'Help' or 'Settings' menu in their internet browser.</p>
                 <p>To delete Cookies from the internet browser of a smartphone/tablet, the User should refer to the device's user manual.</p>
                 <p>The User can learn more about cookies and how to block cookies on different types of browsers by visiting resources such as <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">https://www.allaboutcookies.org</a>.</p>

                 <h4 className="text-lg font-semibold text-purple-300 mb-2 mt-4">Further methods for disabling Third-Party Advertising Cookies</h4>
                 <p>In addition to managing cookies via our tool and browser settings, users can often opt-out of interest-based advertising from third parties by visiting industry opt-out pages like:</p>
                 <ul className="list-disc list-inside space-y-1 pl-4">
                    <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">Digital Advertising Alliance (DAA)</a> (US)</li>
                    <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">Digital Advertising Alliance of Canada (DAAC)</a></li>
                    <li><a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">European Interactive Digital Advertising Alliance (EDAA)</a> (EU/UK)</li>
                 </ul>
                 <p>Users are also advised to consult the privacy policies of the relevant third parties (e.g., Google, Meta, LinkedIn) for their specific opt-out mechanisms.</p>
              </PolicySection>

              {/* Keep relevant jurisdiction sections, adapt/remove others after legal review */}
              <PolicySection title="Additional Information for UK/EEA Residents">
                  <p>Async Studios provides you with this Policy pursuant to the UK General Data Protection Regulation (UK GDPR) and EU General Data Protection Regulation (EU GDPR) where applicable.</p>
                  <p>The Data Controller for the processing of your personal data is Async Studios, with a registered office in [Insert Your Company Address, London, England].</p>
                  <p>If you have questions or concerns about our collection or use of your personal data, you can contact our Data Protection contact point (or appointed DPO, if applicable) at:</p>
                  <p><a href="mailto:privacy@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">privacy@asyncstudios.com</a></p>
                   <p className="text-sm text-gray-500 italic">Note: If you formally require and appoint a Data Protection Officer (DPO), state their contact details here.</p>
                  <p>If you are unsatisfied with the way in which we have handled your personal data or any privacy query or request that you have raised to us, you have a right to complain to the appropriate National Data Protection Authority ("DPA"). In the UK, this is the Information Commissioner's Office (ICO). To find the contact details of the DPA in your country of residence, please visit the relevant governmental websites or the European Data Protection Board website for EU DPAs.</p>
              </PolicySection>

               <PolicySection title="Additional Information for California Residents">
                 <p className="text-sm text-gray-500 italic mb-4">Note: Review and adapt this section based on legal advice regarding CCPA/CPRA applicability and your specific practices.</p>
                 <p>California residents may have additional privacy rights and choices under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA). If you are a resident of the State of California, you may be entitled to request information regarding the disclosure of your personal information to third parties for direct marketing purposes (Shine the Light law), and exercise rights such as the right to know, delete, correct, and opt-out of "sales" and "sharing" of your personal information, as those terms are defined under the CCPA/CPRA. You also have the right to limit the use of sensitive personal information.</p>
                  <p>Please note that we do not typically "sell" your personal information in the traditional sense (i.e., for money). However, our use of third-party analytics and advertising cookies may be considered "selling" or "sharing" under CCPA/CPRA definitions.</p>
                 <p>To exercise your right to opt-out of the "sale" or "sharing" of your personal Information related to cookies, please use the Cookie Preferences management tool provided on the Async Studios Website, typically accessible via a "Do Not Sell or Share My Personal Information" link in the footer or within the cookie settings.</p>
                 <p>You may also have the right to opt-out of "sales" and "sharing" of your personal information through the use of an opt-out preference signal. If the Async Studios Website detects that your browser or device is transmitting a recognized opt-out preference signal (like the Global Privacy Control — GPC), we will aim to honor it for cookie-based sales/sharing for that browser or device.</p>
                 <p>For more information on your California privacy rights and how to exercise them, please contact us at <a href="mailto:privacy@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">privacy@asyncstudios.com</a> or refer to any specific CCPA/CPRA notice we may provide separately.</p>
                 {/* <p>Please see CCPA Privacy Notice for CA Residents for more information.</p> */} 
               </PolicySection>

               {/* Include other jurisdictions like Brazil if relevant, otherwise remove */}
               {/* 
               <PolicySection title="Additional Information for Brazilian Residents">
                 <p className="text-sm text-gray-500 italic mb-4">Note: Review and adapt this section based on legal advice regarding LGPD applicability.</p>
                 <p>Async Studios provides you with this Policy pursuant to Law No. 13.709/2018 (LGPD), concerning the protection of individuals with regarding to the processing of personal data.</p>
                 <p>If you have questions or concerns about our collection or use of your personal data, you can contact us at:</p>
                 <p><a href="mailto:privacy@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">privacy@asyncstudios.com</a></p>
                 <p>We will endeavor to answer data subjects' requests within the timeframe stipulated by the LGPD.</p>
               </PolicySection>
               */}

              <PolicySection title="Updates to This Policy">
                 <p>We may make changes to this Policy from time to time. The "Last Update" noted at the top of this page shows when this Policy was last revised. Any changes will become effective when we post the revised Policy on this site. We encourage you to review this Policy periodically.</p>
              </PolicySection>

              <PolicySection title="Contact Us">
                 <p>If you have any comments or questions regarding this Policy, our data handling practices, or Cookies, please contact us at <a href="mailto:privacy@asyncstudios.com" className="text-teal-400 hover:text-teal-300 underline">privacy@asyncstudios.com</a>. You may also send us a letter at the following address:</p>
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
       {/* Include necessary global styles if not already present in layout */}
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