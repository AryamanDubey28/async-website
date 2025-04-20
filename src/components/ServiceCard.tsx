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
        <div className="card-summary">
          <div className="service-icon mb-3 text-cyan-400 w-12 h-12 rounded-xl p-2 bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 flex items-center justify-center">
            {icon}
          </div>
          
          <h3 className="service-title text-xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-purple-400 text-transparent bg-clip-text">{title}</h3>
          
          <p className="service-description text-gray-300 leading-relaxed text-sm font-light">{description}</p>
        </div>
        
        {/* Right side - Expanded content */}
        <div className="card-expanded">
          <h4 className="offerings-title text-base font-semibold mb-3 text-white/90">Services include:</h4>
          
          <ul className="offerings-list space-y-2 text-sm">
            {expandedContent.map((item, i) => (
              <li key={i} className="offering-item flex items-start">
                <span className="offering-bullet w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 mt-1.5 mr-2 flex-shrink-0"></span>
                <span className="offering-text text-gray-300 leading-relaxed font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;