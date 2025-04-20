'use client';

import React, { useState } from 'react';

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
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="relative service-card-container">
      {/* Main Card */}
      <div 
        className={`service-card ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="service-card-front">
          <div className="service-icon">
            {icon}
          </div>
          <h3 className="service-title">{title}</h3>
          <p className="service-description">{description}</p>
          <button className="learn-more-btn">
            {isExpanded ? 'Close' : 'Learn More'} 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Modal/Detailed View */}
      {isExpanded && (
        <div className="service-detail-modal">
          <div className="service-detail-content">
            <div className="service-detail-header">
              <div className="service-icon-large">
                {icon}
              </div>
              <div>
                <h3 className="service-title-large">{title}</h3>
                <p className="service-description-large">{description}</p>
              </div>
            </div>
            
            <div className="service-offerings">
              <h4 className="offerings-title">Services include:</h4>
              <ul className="offerings-list">
                {expandedContent.map((item, i) => (
                  <li key={i} className="offering-item">
                    <span className="offering-bullet"></span>
                    <span className="offering-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <button 
              className="close-modal-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div 
            className="modal-backdrop"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;