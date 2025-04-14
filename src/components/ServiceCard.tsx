'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  expandedContent: string[];
  icon: React.ReactNode;
}

const ServiceCard = ({
  id,
  title,
  description,
  expandedContent,
  icon
}: ServiceCardProps) => {
  return (
    <motion.div
      id={`service-card-${id}`}
      className="w-full rounded-2xl overflow-hidden"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 } 
      }}
    >
      <div className="relative bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl h-full overflow-hidden group">
        {/* Simple hover background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Tech grid background */}
        <div className="absolute inset-0 rounded-xl opacity-15">
          <div className="absolute inset-0 bg-[radial-gradient(#4fd1c515_1px,transparent_1px)] [background-size:8px_8px] opacity-70"></div>
        </div>
        
        <div className="p-7 relative z-10">
          {/* Service icon */}
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6
            bg-gradient-to-br from-teal-500/20 to-purple-500/20 text-teal-400 
            shadow-lg shadow-teal-500/20 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>
          
          {/* Service title with glow on hover */}
          <h3 className="text-xl font-bold mb-3 
            bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400
            transition-all duration-300 group-hover:scale-[1.01]">
            {title}
          </h3>
          
          {/* Service description */}
          <p className="text-gray-300 mb-6">
            {description}
          </p>
          
          {/* Service details */}
          <div className="mt-6">
            <h4 className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400 text-lg font-medium mb-4">
              Services include:
            </h4>
            <ul className="space-y-4">
              {expandedContent.map((item, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 mt-2.5"></span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Border glow on hover using CSS instead of Framer Motion */}
        <div className="absolute inset-0 rounded-2xl border-2 border-teal-400/0 transition-all duration-300 group-hover:border-teal-400/50 group-hover:shadow-[0_0_20px_3px_rgba(45,212,191,0.3),inset_0_0_10px_2px_rgba(45,212,191,0.2)]"></div>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 