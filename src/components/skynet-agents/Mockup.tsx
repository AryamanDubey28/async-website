import React from 'react';

interface MockupProps {
  activeAgent: number;
  setActiveAgent: (index: number) => void;
}

// Define data for each agent
const agentData = [
  // Data Analyst (Index 0)
  {
    name: "Data Analyst Agent",
    icon: "📊",
    description: "Processing financial reports",
    tasks: [
      { task: "Analyzing Q2 financial data", progress: 70, eta: "2 min" },
      { task: "Generating expense report", progress: 30, eta: "5 min" },
      { task: "Forecasting Q3 projections", progress: 10, eta: "10 min" },
    ],
    services: [
      { name: "Sheets", icon: "📊" }, { name: "Slack", icon: "💬" },
      { name: "Email", icon: "📧" }, { name: "CRM", icon: "👥" },
    ],
    logs: [
      "[10:22:15] Connected to Google Sheets API",
      "[10:22:30] Fetching Q2 financial data...",
      "[10:23:45] Processing data rows: 1-500",
      "[10:24:10] Warning: Missing values in column H",
    ]
  },
  // Calendar Manager (Index 1)
  {
    name: "Calendar Manager",
    icon: "📅",
    description: "Scheduling team meetings",
    tasks: [
      { task: "Finding slot for Project Alpha sync", progress: 90, eta: "1 min" },
      { task: "Checking availability for Marketing review", progress: 50, eta: "3 min" },
      { task: "Sending invites for Q3 planning", progress: 15, eta: "8 min" },
    ],
    services: [
      { name: "Calendar", icon: "📅" }, { name: "Teams", icon: "💬" },
      { name: "Email", icon: "📧" }, { name: "HRIS", icon: "👥" },
    ],
    logs: [
      "[09:15:00] Connected to Google Calendar API",
      "[09:15:10] Checking Bob's availability...",
      "[09:16:25] Cross-referencing Alice's calendar",
      "[09:17:05] Proposed slot: Thursday 2 PM PST",
    ]
  },
  // Email Assistant (Index 2)
  {
    name: "Email Assistant",
    icon: "📧",
    description: "Sorting and drafting emails",
    tasks: [
      { task: "Categorizing incoming support tickets", progress: 60, eta: "4 min" },
      { task: "Drafting follow-up for client X", progress: 85, eta: "1 min" },
      { task: "Summarizing unread newsletter backlog", progress: 20, eta: "12 min" },
    ],
    services: [
      { name: "Gmail", icon: "📧" }, { name: "Helpdesk", icon: "🎫" },
      { name: "Drive", icon: "📄" }, { name: "Slack", icon: "💬" },
    ],
    logs: [
      "[11:05:00] Connected to Gmail API",
      "[11:05:20] Identifying urgent emails...",
      "[11:06:10] Found 3 high-priority messages",
      "[11:06:45] Drafting reply template for Ticket #123",
    ]
  }
];

// Agents list for the sidebar (keeping it simple)
const agentsList = [
  { name: "Data Analyst", status: "Running", icon: "📊" },
  { name: "Calendar Manager", status: "Idle", icon: "📅" },
  { name: "Email Assistant", status: "Running", icon: "📧" },
];

const Mockup: React.FC<MockupProps> = ({ activeAgent, setActiveAgent }) => {
  const currentAgent = agentData[activeAgent]; // Get the data for the currently selected agent

  return (
    <div className="w-full lg:w-3/5 relative">
      <div className="relative max-w-2xl mx-auto">
        {/* Main UI mockup */}
        <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-purple-500/40 shadow-xl shadow-purple-500/15 backdrop-blur-sm bg-gray-900/80 group">
          {/* Animated border shine on hover */}
          <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md animate-pulse-slow"></div>
          <div className="relative z-10 h-full w-full rounded-xl bg-gray-900/80">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-600/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#9F7AEA20_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

            {/* UI chrome */}
            <div className="absolute inset-0 flex flex-col">
              <div className="h-8 bg-gray-800/60 backdrop-blur-md flex items-center px-3 border-b border-gray-700">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto px-4 py-0.5 rounded-md bg-gray-700/50 text-xs text-gray-400 flex items-center gap-1.5 w-64">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>app.skynet-agents.com</span>
                </div>
              </div>

              {/* App interface */}
              <div className="flex-1 flex">
                {/* Sidebar */}
                <div className="w-14 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 flex flex-col items-center py-4 gap-5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                  <div className="w-8 h-8 flex items-center justify-center text-purple-400 rounded-md bg-gray-800/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="mt-auto w-8 h-8 rounded-full overflow-hidden bg-gradient-to-b from-gray-700 to-gray-800 flex items-center justify-center text-white text-xs">
                    <span>U</span>
                  </div>
                </div>

                {/* Agents dashboard */}
                <div className="flex-1 flex flex-col">
                  {/* Header with tabs */}
                  <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 flex items-center px-3">
                    <div className="text-sm font-medium text-white">Agents Dashboard</div>
                    <div className="ml-auto flex gap-2">
                      <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                      <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Agents List and Details */}
                  <div className="flex-1 flex bg-gray-900/50 backdrop-blur-sm p-3">
                    <div className="grid grid-cols-12 gap-3 w-full">
                      {/* Active Agents */}
                      <div className="col-span-5 bg-gray-800/40 rounded-lg border border-gray-700 p-3 flex flex-col">
                        <div className="text-xs font-medium text-purple-300 mb-2">Active Agents</div>
                        <div className="space-y-2 flex-1 overflow-hidden">
                          {agentsList.map((agent, idx) => (
                            <div
                              key={idx}
                              className={`text-xs p-2 rounded-md flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                                activeAgent === idx
                                  ? 'bg-purple-500/20 border border-purple-500/30'
                                  : 'bg-gray-800/60 border border-gray-700 hover:border-purple-500/20'
                              }`}
                              onClick={() => setActiveAgent(idx)}
                            >
                              <div className="w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center">{agent.icon}</div>
                              <div className="flex-1">
                                <div className="font-medium text-white">{agent.name}</div>
                                <div className="text-[10px] text-gray-400">v1.2.0</div>
                              </div>
                              <div className="flex items-center">
                                <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Running' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'} mr-1`}></div>
                                <span className="text-[10px] text-gray-400">{agent.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="w-full mt-2 text-xs py-1 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300 hover:bg-gray-800 hover:border-purple-500/20 transition-colors duration-200">
                          + New Agent
                        </button>
                      </div>

                      {/* Agent Details - Now Dynamic */}
                      <div className="col-span-7 bg-gray-800/40 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                        <div className="flex items-center border-b border-gray-700 p-3">
                          <div className="w-8 h-8 rounded-md bg-purple-500/20 flex items-center justify-center text-lg mr-2">{currentAgent.icon}</div>
                          <div>
                            <div className="text-xs font-medium text-white">{currentAgent.name}</div>
                            <div className="text-[10px] text-gray-400">{currentAgent.description}</div>
                          </div>
                          <div className="ml-auto flex space-x-2">
                            <button className="text-[10px] px-2 py-0.5 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300">
                              Configure
                            </button>
                            <button className="text-[10px] px-2 py-0.5 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300">
                              {agentsList[activeAgent].status === 'Running' ? 'Pause' : 'Start'}
                            </button>
                          </div>
                        </div>

                        <div className="flex-1 p-3 space-y-2 overflow-auto animate-fade-up-short" key={activeAgent}>
                          <div className="text-[10px] font-medium text-gray-400">CURRENT TASKS</div>
                          <div className="space-y-1.5">
                            {currentAgent.tasks.map((task, idx) => (
                              <div key={idx} className="text-xs rounded-md bg-gray-800/60 border border-gray-700 p-2">
                                <div className="flex justify-between items-center mb-1">
                                  <div className="text-white">{task.task}</div>
                                  <div className="text-[10px] text-gray-400">ETA: {task.eta}</div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
                                  <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-teal-500 rounded-full absolute inset-0"
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                  <div
                                    className="h-full rounded-full absolute inset-0 animate-progress-pulse"
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="text-[10px] font-medium text-gray-400 mt-3">CONNECTED SERVICES</div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {currentAgent.services.map((service, idx) => (
                              <div key={idx} className="bg-gray-800/60 rounded-md border border-gray-700 p-1.5 flex flex-col items-center text-[10px] text-gray-300">
                                <div>{service.icon}</div>
                                <div>{service.name}</div>
                              </div>
                            ))}
                          </div>

                          <div className="text-[10px] font-medium text-gray-400 mt-3">AGENT LOG</div>
                          <div className="text-[10px] font-mono bg-gray-900/60 rounded-md p-2 h-14 overflow-auto">
                            {currentAgent.logs.map((log, idx) => {
                               const colorClass = log.startsWith("Warning:") ? "text-yellow-400" :
                                                 log.startsWith("Connected") ? "text-green-400" :
                                                 log.startsWith("Error:") ? "text-red-400" :
                                                 "text-white";
                               return <div key={idx} className={colorClass}>{log}</div>
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated scan line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/5 to-transparent opacity-70 animate-scanner-vertical pointer-events-none"></div>
          </div>

          {/* Floating decorative elements adapted from skynet-chat */}
          {/* Removed original 3 elements */}
        </div>
      </div>
      {/* Added 4 new elements here, outside the inner container */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center p-2">
          {/* Content can be adapted if needed */}
          <div className="text-[10px] text-purple-100/70 font-mono overflow-hidden">
            <div>Agent v1.2</div>
            <div>Task: Analyse</div>
            <div>Status: Active</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-indigo-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /> {/* Bolt icon */}
          </svg>
        </div>
      </div>
      <div className="absolute top-1/3 -left-10 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-indigo-400/30 rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-ping-slow"></div>
        </div>
      </div>
      <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-purple-500/20 backdrop-blur-sm border border-purple-400/30 pointer-events-none"></div>
    </div>
  );
};

export default Mockup; 