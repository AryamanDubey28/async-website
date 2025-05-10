'use client';

// Type for feature data
type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode; // Keep using ReactNode for flexibility
  detail: string;
};

interface SkynetChatFeaturesProps {
  features: Feature[];
}

export default function SkynetChatFeatures({ features }: SkynetChatFeaturesProps) {
  return (
    <section className="py-20 relative">
      {/* Background effects - Enhanced with more vibrancy */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/8 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-purple-400 to-blue-500">
              Key Features
            </span>
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/10 to-purple-400/10 rounded-lg blur-sm"></div>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mt-4">
            Skynet Chat combines AI power with your business knowledge, designed to fit within your walls
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              // Replaced JS state hover with CSS group-hover
              className="relative bg-gray-900/60 backdrop-blur-xl rounded-xl p-6 overflow-hidden group hover:scale-105 border border-teal-500/20 shadow-xl shadow-teal-500/5 h-full transition-all duration-300 hover:border-teal-400/40 hover:shadow-teal-500/10 group-hover:border-teal-400/30 group-hover:shadow-[0_0_15px_rgba(56,178,172,0.1)]"
              // onMouseEnter={() => setActiveFeature(index)} // Removed JS state interaction
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/15 via-purple-500/10 to-blue-600/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Tech grid lines for tech effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#4fd1c508_50%,transparent_100%)] animate-scanner"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gray-800/60 backdrop-blur-sm flex items-center justify-center mb-6 text-teal-400 group-hover:bg-teal-400/15 transition-all duration-300 transform group-hover:scale-110 border border-teal-400/20">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white transition-all duration-300 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:via-purple-400 group-hover:to-blue-500">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 transition-all duration-300 group-hover:text-gray-200">
                  {feature.description}
                </p>
              </div>
              
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-xl transition-all duration-300 border border-transparent after:opacity-0 group-hover:after:opacity-100 after:content-[''] after:absolute after:inset-0 after:rounded-xl after:border after:border-teal-400/10 after:scale-[1.02] after:transition-all after:duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 