'use client';

import React from 'react';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  expandedContent: string[];
  icon: React.ReactNode;
  isActive: boolean;
}

const ServiceCard = ({
  id,
  title,
  description,
  expandedContent,
  icon,
  isActive
}: ServiceCardProps) => {
  return (
    <div className={`carousel-card ${isActive ? 'active' : ''}`}>
      <div className="carousel-card-content">
        {/* Left side - Summary content */}
        <div className={`card-summary ${isActive ? 'active-card-section' : ''}`}>
          <div className={`service-icon mb-4 text-cyan-300 w-14 h-14 rounded-xl p-2.5 bg-cyan-500/15 backdrop-blur-md border ${isActive ? 'border-cyan-400/50' : 'border-cyan-500/30'} flex items-center justify-center`}>
            {icon}
          </div>
          
          <h3 className="service-title text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-200 to-purple-300 text-transparent bg-clip-text tracking-tight leading-tight">{title}</h3>
          
          <p className="service-description text-white leading-relaxed text-base md:text-lg font-light tracking-wide" style={{textShadow: '0 1px 1px rgba(0,0,0,0.3)'}}>{description}</p>
        </div>
        
        {/* Right side - Expanded content */}
        <div className={`card-expanded ${isActive ? 'active-card-section' : ''}`}>
          <h4 className="offerings-title text-xl font-semibold mb-4 text-white bg-gradient-to-r from-white to-gray-200 text-transparent bg-clip-text tracking-wide">Services include:</h4>
          
          <ul className="offerings-list space-y-3 text-base">
            {expandedContent.map((item, i) => (
              <li key={i} className="offering-item flex items-start group">
                <span className="offering-bullet w-2 h-2 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></span>
                <span className="offering-text text-white leading-relaxed font-light tracking-wide" style={{textShadow: '0 1px 1px rgba(0,0,0,0.2)'}}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;