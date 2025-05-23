'use client';

import { useState, useEffect } from 'react';
import React from 'react';

const tabsData = [
  {
    id: 'enterprise',
    title: 'Enterprise',
    heading: 'Enterprise Data Workflow',
    description: 'Transform how your organization handles critical data with a coordinated system of autonomous agents that collect, analyze, and report insights without human intervention.',
    points: [
      { title: 'Reduce data processing time by 85%', detail: 'Agents work 24/7 without breaks, continuously processing information' },
      { title: 'Eliminate reporting errors', detail: 'Consistent methodology with built-in verification ensures accuracy' },
      { title: 'Free up 20+ hours per week for analysts', detail: 'Allow your team to focus on strategy instead of data processing' },
    ],
    illustrationSteps: [
      { icon: '1️⃣', title: 'Data Collection Agent', desc: 'Automatically gathering data from CRM, analytics platforms, and internal databases.' },
      { icon: '2️⃣', title: 'Analysis Agent', desc: 'Processing collected data to identify trends, anomalies, and business opportunities.' },
      { icon: '3️⃣', title: 'Reporting Agent', desc: 'Generating comprehensive reports, sending summaries to stakeholders via multiple channels.' },
    ]
  },
  {
    id: 'marketing',
    title: 'Marketing',
    heading: 'Automated Campaign Management',
    description: 'Let agents handle campaign setup, performance tracking, A/B testing execution, and lead distribution across multiple advertising platforms and CRM systems.',
    points: [
      { title: 'Launch campaigns 4x faster', detail: 'Automate repetitive setup tasks across platforms like Google Ads, Facebook, and LinkedIn' },
      { title: 'Optimize ad spend in real-time', detail: 'Agents monitor performance and adjust bids/budgets based on predefined rules' },
      { title: 'Improve lead routing accuracy', detail: 'Ensure leads are instantly assigned to the correct sales reps based on territory or product interest' },
    ],
    illustrationSteps: [
      { icon: '🎯', title: 'Campaign Setup Agent', desc: 'Configuring ad groups, keywords, and creatives based on campaign goals.' },
      { icon: '📈', title: 'Performance Monitor Agent', desc: 'Tracking key metrics (CTR, CPA) and identifying optimization opportunities.' },
      { icon: '📊', title: 'Reporting & Alerting Agent', desc: 'Generating performance dashboards and notifying teams of significant changes.' },
    ]
  },
  {
    id: 'development',
    title: 'Development',
    heading: 'Streamlined DevOps Workflow',
    description: 'Integrate agents into your CI/CD pipeline to automate testing, deployment notifications, code reviews assignments, and performance monitoring alerts.',
    points: [
      { title: 'Reduce deployment failures by 30%', detail: 'Automated pre-deployment checks and environment validation' },
      { title: 'Accelerate code review cycles', detail: 'Agents automatically assign reviewers based on code ownership and availability' },
      { title: 'Proactive incident response', detail: 'Monitor system health and automatically trigger alerts or remediation actions' },
    ],
    illustrationSteps: [
      { icon: '🧪', title: 'Testing Agent', desc: 'Running automated unit, integration, and end-to-end tests on code commits.' },
      { icon: '🚀', title: 'Deployment Agent', desc: 'Managing staged rollouts, monitoring deployment health, and handling rollbacks.' },
      { icon: '🔔', title: 'Notification Agent', desc: 'Alerting teams via Slack/email about build statuses, deployment outcomes, and incidents.' },
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    heading: 'Intelligent Financial Operations',
    description: 'Automate expense report processing, invoice reconciliation, compliance checks, and financial forecasting with specialized agents connected to your accounting software.',
    points: [
      { title: 'Cut invoice processing costs by 50%', detail: 'Agents extract data, match POs, and route invoices for approval automatically' },
      { title: 'Enhance compliance adherence', detail: 'Automatically flag transactions or reports that violate internal policies or regulations' },
      { title: 'Improve forecast accuracy', detail: 'Agents gather data from multiple sources to generate more reliable financial projections' },
    ],
    illustrationSteps: [
      { icon: '🧾', title: 'Invoice Processing Agent', desc: 'Extracting data from PDFs/emails, matching with POs, and initiating approvals.' },
      { icon: '🔒', title: 'Compliance Check Agent', desc: 'Auditing transactions against predefined rules and regulatory requirements.' },
      { icon: '💹', title: 'Forecasting Agent', desc: 'Aggregating historical data and market trends to generate financial projections.' },
    ]
  },
  {
    id: 'customer-service',
    title: 'Customer Service',
    heading: 'AI-Powered Support Automation',
    description: 'Deploy agents to handle common customer inquiries, automate ticket categorization and routing, provide instant answers from knowledge bases, and summarize support interactions.',
    points: [
      { title: 'Decrease first response time by 70%', detail: 'Agents provide instant acknowledgments and answers to common questions 24/7' },
      { title: 'Improve agent productivity by 40%', detail: 'Automate ticket triage, data entry, and post-interaction summaries' },
      { title: 'Increase customer satisfaction', detail: 'Faster resolutions and consistent support quality lead to happier customers' },
    ],
    illustrationSteps: [
      { icon: '💬', title: 'Triage & Routing Agent', desc: 'Analyzing incoming tickets, categorizing issues, and assigning to the right team/agent.' },
      { icon: '💡', title: 'Knowledge Base Agent', desc: 'Answering common questions instantly by referencing internal documentation.' },
      { icon: '📋', title: 'Summarization Agent', desc: 'Creating concise summaries of customer interactions for faster review.' },
    ]
  },
  // Add data for Marketing, Development, Finance, Customer Service here later
];

const additionalUseCases = [
  {
    title: "Customer Support",
    desc: "Agents that handle tier-1 support tickets, escalate when needed, and learn from resolution patterns",
    icon: "👥"
  },
  {
    title: "Content Management",
    desc: "Automate content creation, publishing, optimization, and performance tracking across channels",
    icon: "📝"
  },
  {
    title: "DevOps Automation",
    desc: "Streamline CI/CD pipelines, monitor system health, and automate incident response",
    icon: "⚙️"
  }
];

export default function UseCaseTabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Detect browser support for CSS Properties API
  useEffect(() => {
    // Check if the browser supports @property
    try {
      if (!CSS.supports('syntax', '<angle>')) {
        // If not supported, enable the fallback
        document.documentElement.style.setProperty('--fallback-display', 'block');
      }
    } catch (e) {
      // If the browser doesn't support CSS.supports or throws an error, enable the fallback
      document.documentElement.style.setProperty('--fallback-display', 'block');
    }
  }, []);

  return (
    <section className="py-32 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 via-purple-500/8 to-blue-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-purple-600/10 via-blue-500/8 to-teal-500/10 rounded-full blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-teal-400 to-blue-500">
                Real-World Applications
              </span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Discover how organizations across industries are using Skynet Agents to transform their operations and productivity
            </p>
          </div>

          {/* Use cases tabs */}
          <div className="mb-12 flex justify-center">
            {/* Add wrapper div for horizontal scrolling */}
            <div className="w-full overflow-hidden"> 
              <div className="flex justify-center overflow-x-auto pb-2 -mb-2 [-ms-overflow-style:none] [scrollbar-width:none]"> {/* Add flex justify-center & scrollbar hiding classes */}
                <div className="inline-flex bg-gray-800/40 backdrop-blur-sm rounded-full p-1.5 border border-gray-700 whitespace-nowrap"> {/* Add whitespace-nowrap */}
                  {tabsData.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTabIndex(idx)}
                      className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeTabIndex === idx
                          ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg shadow-purple-500/20'
                          : 'text-gray-300 hover:bg-gray-700/50'
                        }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="relative min-h-[650px]">
            {tabsData.map((tabData, idx) => (
              <div
                key={tabData.id}
                className={`transition-opacity duration-500 ease-in-out ${activeTabIndex === idx ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                aria-hidden={activeTabIndex !== idx}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Left side - Illustration */}
                  <div className="relative">
                    <div className="aspect-square max-w-lg mx-auto relative rounded-2xl overflow-hidden border border-purple-500/30 shadow-xl shadow-purple-500/10 backdrop-blur-sm bg-gray-900/80">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-teal-500/10 to-blue-600/10"></div>
                      <div className="absolute inset-0 bg-[radial-gradient(#9F7AEA20_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

                      {/* Workflow visualization - Now dynamic */}
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="w-full max-w-md">
                          <div className="space-y-5">
                            {tabData.illustrationSteps.map((step, stepIdx) => (
                              <React.Fragment key={stepIdx}>
                                <div className={`bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700 p-3 transform transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 relative overflow-hidden ${stepIdx === 0 ? 'workflow-step-1' : stepIdx === 1 ? 'workflow-step-2' : 'workflow-step-3'}`}>
                                  {/* Animated border that traces around the entire rectangle - modern browsers */}
                                  <div 
                                    className={`absolute -inset-[2px] rounded-lg pointer-events-none ${stepIdx === 0 ? 'conic-border-1' : stepIdx === 1 ? 'conic-border-2' : 'conic-border-3'}`} 
                                    style={{
                                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                      maskComposite: 'xor',
                                      WebkitMaskComposite: 'xor',
                                      maskClip: 'padding-box, border-box',
                                      padding: '2px',
                                      borderRadius: '8px'
                                    }}
                                  ></div>
                                  
                                  {/* Fallback for browsers that don't support CSS Properties API */}
                                  <div 
                                    className={`absolute -inset-[2px] rounded-lg pointer-events-none ${stepIdx === 0 ? 'fallback-border-1' : stepIdx === 1 ? 'fallback-border-2' : 'fallback-border-3'}`} 
                                    style={{
                                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                      maskComposite: 'xor',
                                      WebkitMaskComposite: 'xor',
                                      maskClip: 'padding-box, border-box',
                                      padding: '2px',
                                      borderRadius: '8px',
                                      transform: 'translateZ(0)',
                                      display: 'var(--fallback-display, none)'
                                    }}
                                  ></div>

                                  <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center text-lg mr-2">{step.icon}</div>
                                    <div className="text-sm font-medium text-white">{step.title}</div>
                                    <div className="ml-auto">
                                      <div className={`w-2 h-2 rounded-full bg-green-400 ${stepIdx === 0 ? 'dot-indicator-1' : stepIdx === 1 ? 'dot-indicator-2' : 'dot-indicator-3'}`}></div>
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-400">{step.desc}</p>
                                </div>
                                {stepIdx < tabData.illustrationSteps.length - 1 && (
                                  <div className="flex justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                                      className={`text-purple-400 ${stepIdx === 0 ? 'workflow-path' : 'workflow-path-2'}`}>
                                      <path d="M12 16L12 8M12 16L8 12M12 16L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Animated scan line */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent opacity-70 animate-scanner-vertical"></div>
                    </div>

                    {/* Floating elements (Could be made dynamic too) */}
                    <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10px] text-white/70 text-center">
                          <div className="text-xl">📊</div>
                          <div>Automated</div>
                          <div>Reports</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 -right-12 w-20 h-20 bg-gradient-to-br from-teal-500/30 to-purple-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[10px] text-white/70 text-center">
                          <div className="text-xl">📧</div>
                          <div>Notification</div>
                          <div>System</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Details */}
                  <div className="lg:pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-white">{tabData.heading}</h3>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">{tabData.description}</p>
                    
                    <ul className="space-y-5 mb-10">
                      {tabData.points.map((point, pointIdx) => (
                        <li key={pointIdx} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/25 flex items-center justify-center mt-1 mr-3 shadow-md shadow-purple-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-100 font-medium">{point.title}</p>
                            <p className="text-gray-400 text-sm">{point.detail}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 pt-8 border-t border-gray-700/50">
                      <button 
                        disabled
                        className="w-full sm:w-auto group relative px-7 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.03]"
                      >
                        <span className="relative z-10">Case Study: Coming Soon</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl group-disabled:opacity-0"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 