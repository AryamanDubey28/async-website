import React from 'react';

const ApiIntegrations = () => {
  const servicesRow1 = [
    { name: "Wordpress", logo: "/logos/wordpress-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "X Social Media", logo: "/logos/x-social-media-black-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Slack", logo: "/logos/slack-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Trello", logo: "/logos/trello-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Whatsapp Business", logo: "/logos/whatsapp-business-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Salesforce", logo: "/logos/salesforce-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Sharepoint", logo: "/logos/sharepoint-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Shopify", logo: "/logos/shopify-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Oracle", logo: "/logos/oracle-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Notion", logo: "/logos/notion-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Onedrive Color", logo: "/logos/onedrive-color-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Microsoft Powerpoint", logo: "/logos/microsoft-powerpoint-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Microsoft Teams", logo: "/logos/microsoft-teams-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Microsoft Word", logo: "/logos/microsoft-word-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Microsoft Excel", logo: "/logos/microsoft-excel-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Squarespace", logo: "/logos/squarespace-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "AWS", logo: "/logos/aws-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Azure", logo: "/logos/azure-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Facebook Messenger", logo: "/logos/facebook-messenger-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
  ];

  const servicesRow2 = [
    { name: "Microsoft Outlook", logo: "/logos/microsoft-outlook-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "LinkedIn App", logo: "/logos/linkedin-app-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Mailchimp", logo: "/logos/mailchimp-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Sheets", logo: "/logos/google-sheets-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Hubspot", logo: "/logos/hubspot-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Instagram", logo: "/logos/ig-instagram-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Drive Color", logo: "/logos/google-drive-color-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Gmail", logo: "/logos/gmail-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Calendar", logo: "/logos/google-calendar-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Facebook Square", logo: "/logos/facebook-square-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Github", logo: "/logos/github-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Evernote", logo: "/logos/evernote-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Dropbox", logo: "/logos/dropbox-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Canva", logo: "/logos/canva-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Analytics", logo: "/logos/google-analytics-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Cloud", logo: "/logos/google-cloud-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Firebase", logo: "/logos/google-firebase-icon.svg", bg: "bg-gray-800", border: "border-gray-700" },
  ];

  return (
    <section className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 via-teal-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-gradient-to-tr from-teal-600/10 via-blue-500/8 to-purple-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-gray-800/70 backdrop-blur-lg border border-purple-500/30 mb-3">
            <p className="text-sm font-medium text-purple-300 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mr-2 animate-pulse"></span>
              Unmatched Integration Ecosystem
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-400 to-blue-500">
              8,000+ API Integrations
            </span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Skynet Agents connects seamlessly with thousands of services, empowering your agents to interact with virtually any digital platform.
          </p>
        </div>

        {/* Integration logos carousel - full width */}
        <div className="relative mx-auto max-w-[100vw] overflow-hidden py-10 mb-20">
          {/* Left gradient fade */}
          <div className="absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          {/* Right gradient fade */}
          <div className="absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

          {/* First row - left to right */}
          <div className="flex animate-scroll-left whitespace-nowrap py-5">
            <div className="flex space-x-10 animated-carousel">
              {[...servicesRow1, ...servicesRow1].map((service, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl ${service.bg} ${service.border} backdrop-blur-md border flex items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300 hover:shadow-md hover:shadow-purple-500/20`}
                >
                  <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Second row - right to left */}
          <div className="flex animate-scroll-right whitespace-nowrap py-5">
            <div className="flex space-x-10 animated-carousel">
              {[...servicesRow2, ...servicesRow2].map((service, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl ${service.bg} ${service.border} backdrop-blur-md border flex items-center justify-center p-4 transform hover:scale-110 transition-transform duration-300 hover:shadow-md hover:shadow-purple-500/20`}
                >
                  <img src={service.logo} alt={service.name} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom integrations CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-xl bg-gradient-to-r from-purple-500/10 via-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/30 p-0.5">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg py-4 px-8">
              <p className="text-gray-300 mb-3">Don't see the integration you need?</p>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105">
                Request Custom Integration
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiIntegrations; 