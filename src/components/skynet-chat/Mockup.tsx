'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// Types for props - Adjust based on what page.tsx actually passes
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

interface MockupProps {
  artefactContent: string;
  chatMessages: ChatMessage[];
  activeChatMessage: number;
  showTypingIndicator: boolean;
  setActiveChatMessage: (index: number) => void;
  className?: string;
}

export default function Mockup({
  artefactContent,
  chatMessages,
  activeChatMessage,
  showTypingIndicator,
  setActiveChatMessage,
  className
}: MockupProps) {
  const [activeChatHistory, setActiveChatHistory] = useState(0);
  const [activePersonality, setActivePersonality] = useState(0);

  return (
    <div className={`relative ${className || ''}`}>
      <div className="relative rounded-xl overflow-hidden border border-teal-500/30 shadow-xl shadow-teal-500/10 backdrop-blur-sm bg-gray-900/80 aspect-[16/10] flex flex-col w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        <div className="h-8 bg-gray-800/60 backdrop-blur-md flex items-center px-3 border-b border-gray-700 flex-shrink-0">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="mx-auto px-4 py-0.5 rounded-md bg-gray-700/50 text-xs text-gray-400 flex items-center gap-1.5 w-64">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>app.skynet-chat.com</span>
          </div>
        </div>

        <div className="relative z-10 flex-1 flex overflow-hidden">
          <div className="w-48 bg-gray-900/70 backdrop-blur-md border-r border-gray-800 flex flex-col p-3 gap-4 overflow-y-auto">
            <div className="flex-grow">
              <div className="text-xs font-medium text-teal-300 mb-2">Chat History</div>
              <div className="space-y-1.5">
                {[
                  "Email Team Action Items",
                  "Summarize Article",
                  "Translate Document",
                  "Plan Project Milestones"
                ].map((history, idx) => (
                  <div
                    key={idx}
                    className={`text-xs p-1.5 rounded-md cursor-pointer truncate ${
                      activeChatHistory === idx
                        ? 'bg-teal-500/20 text-white'
                        : 'text-gray-400 hover:bg-gray-800/60'
                    }`}
                    onClick={() => setActiveChatHistory(idx)}
                  >
                    {history}
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 text-xs py-1 rounded-md border border-gray-700 bg-gray-800/40 text-gray-300 hover:bg-gray-800 hover:border-teal-500/20 transition-colors duration-200">
                + New Chat
              </button>
            </div>

            <div className="flex-shrink-0">
              <div className="text-xs font-medium text-teal-300 mb-2">Personalities</div>
              <div className="space-y-1.5">
                {[
                  { name: "Helpful Assistant", icon: <div className="w-4 h-4 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center text-white text-[8px] font-bold">H</div> },
                  { name: "Business Expert", icon: <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white text-[8px] font-bold">B</div> },
                  { name: "Onboarding Specialist", icon: <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-sky-500 flex items-center justify-center text-white text-[8px] font-bold">O</div> },
                ].map((p, idx) => (
                   <div
                    key={idx}
                    className={`text-xs p-1.5 rounded-md flex items-center gap-2 cursor-pointer ${
                      activePersonality === idx
                        ? 'bg-teal-500/20 text-white'
                        : 'text-gray-400 hover:bg-gray-800/60'
                    }`}
                    onClick={() => setActivePersonality(idx)}
                  >
                    <span className="text-sm">{p.icon}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex min-w-0">
            <div className="w-1/2 border-r border-gray-800 flex flex-col bg-gray-900/50 backdrop-blur-sm">
              <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 px-3 flex items-center">
                <div className="text-xs font-medium text-white flex-1 truncate">Chat: Email Team Action Items</div>
                <div className="ml-auto flex items-center gap-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                  <span className="text-[10px] text-teal-400">Online</span>
                </div>
              </div>
              
              <div className="flex-1 p-3 overflow-auto space-y-3 flex flex-col">
                <div className="space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`text-xs rounded-lg p-2 max-w-[85%] ${ 
                        msg.role === 'user' 
                          ? 'bg-teal-500/20 ml-auto text-white' 
                          : 'bg-gray-800/60 text-gray-300'
                      } ${idx >= activeChatMessage ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 will-change-opacity transform-gpu`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
                
                <div className="h-8 mt-auto pt-1 flex-shrink-0">
                  {showTypingIndicator && (
                    <div className="bg-gray-800/60 rounded-lg p-2 w-16 flex">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms] mx-1"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-800 flex-shrink-0">
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full bg-gray-800/60 rounded-md border border-gray-700 text-white text-xs px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-teal-500/50"
                    placeholder="Message Skynet..."
                    onFocus={() => setActiveChatMessage(1)}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="w-1/2 flex flex-col bg-gray-800/30 backdrop-blur-sm">
              <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 px-3 flex items-center justify-between flex-shrink-0">
                <div className="text-xs font-medium text-white">Artefact</div>
                <div className="flex gap-1.5">
                  <button className="w-5 h-5 rounded-md bg-gray-700/60 hover:bg-gray-600/60 flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8h.5" /></svg>
                  </button>
                  <button className="w-5 h-5 rounded-md bg-gray-700/60 hover:bg-gray-600/60 flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 p-3 overflow-auto text-xs text-gray-300 prose prose-sm prose-invert max-w-none prose-h1:text-lg prose-h1:font-semibold prose-headings:text-teal-400 prose-code:text-cyan-400 prose-a:text-teal-400">
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    mark: ({ node, ...props }) => (
                      <mark className="bg-cyan-700 text-cyan-50 px-1 rounded" {...props} />
                    ),
                    strong: ({ node, className, children, ...props }) => {
                      if (className === 'updated-line') {
                        return <strong className="bg-blue-800/70 text-blue-100 px-1 rounded font-medium" {...props}>{children}</strong>;
                      }
                      return <strong {...props}>{children}</strong>;
                    },
                  }}
                >
                  {artefactContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent opacity-70 animate-scanner-vertical pointer-events-none"></div>
      </div>
      
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <div className="text-[8px] text-teal-100/70 font-mono overflow-hidden">
            {artefactContent.split('\n').slice(0, 6).map((line, i) => (
              <div key={i}>{line.substring(0, 20)}{line.length > 20 ? '...' : ''}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 -left-16 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-teal-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
      <div className="absolute top-1/3 -left-10 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-teal-400/30 rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-ping-slow"></div>
        </div>
      </div>
      <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30"></div>
    </div>
  );
} 