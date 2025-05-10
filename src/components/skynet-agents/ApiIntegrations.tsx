import React from 'react';

const ApiIntegrations = () => {
  const servicesRow1 = [
    { name: "GitHub", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Slack", logo: "/logos/slack.svg", bg: "bg-gray-800", border: "border-purple-700" },
    { name: "Notion", logo: "/logos/notion.svg", bg: "bg-gray-800", border: "border-gray-700" },
    { name: "Google Drive", logo: "/logos/google-drive.svg", bg: "bg-gray-800", border: "border-blue-700" },
    { name: "Google Sheets", logo: "/logos/google-sheets.svg", bg: "bg-gray-800", border: "border-green-700" },
    { name: "Airtable", logo: "/logos/airtable.svg", bg: "bg-gray-800", border: "border-teal-700" },
    { name: "Microsoft Excel", logo: "/logos/excel.svg", bg: "bg-gray-800", border: "border-green-700" },
    { name: "Brave", logo: "/logos/brave.svg", bg: "bg-gray-800", border: "border-orange-700" },
    { name: "GitLab", logo: "/logos/gitlab.svg", bg: "bg-gray-800", border: "border-red-700" },
    { name: "Jira", logo: "/logos/jira.svg", bg: "bg-gray-800", border: "border-blue-700" },
    { name: "OneDrive", logo: "/logos/onedrive.svg", bg: "bg-gray-800", border: "border-blue-700" },
  ];

  const servicesRow2 = [
    { name: "Figma", logo: "/logos/figma.svg", bg: "bg-gray-800", border: "border-purple-700" },
    { name: "Dropbox", logo: "/logos/dropbox.svg", bg: "bg-gray-800", border: "border-blue-700" },
    { name: "Stripe", logo: "/logos/stripe.svg", bg: "bg-gray-800", border: "border-indigo-700" },
    { name: "AWS", logo: "/logos/aws.svg", bg: "bg-gray-800", border: "border-orange-700" },
    { name: "Trello", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-blue-700" }, // Assuming github.svg is placeholder
    { name: "Discord", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-indigo-700" }, // Assuming github.svg is placeholder
    { name: "Salesforce", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-blue-700" }, // Assuming github.svg is placeholder
    { name: "Zoom", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-blue-700" }, // Assuming github.svg is placeholder
    { name: "Linear", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-gray-700" }, // Assuming github.svg is placeholder
    { name: "MongoDB", logo: "/logos/github.svg", bg: "bg-gray-800", border: "border-green-700" }, // Assuming github.svg is placeholder
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