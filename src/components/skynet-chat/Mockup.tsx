'use client';

import { useState } from 'react';

// Types for props - Adjust based on what page.tsx actually passes
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

interface MockupProps {
  codeSample: string;
  chatMessages: ChatMessage[];
  activeChatMessage: number;
  showTypingIndicator: boolean;
  setActiveChatMessage: (index: number) => void;
}

export default function Mockup({ 
  codeSample,
  chatMessages,
  activeChatMessage,
  showTypingIndicator,
  setActiveChatMessage
}: MockupProps) {

  return (
    <div className="relative max-w-2xl mx-auto"> {/* Increased from max-w-xl */}
      {/* Main UI mockup */}
      <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-teal-500/30 shadow-xl shadow-teal-500/10 backdrop-blur-sm bg-gray-900/80">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-blue-600/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#4fd1c520_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        {/* Browser chrome */}
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
              <span>app.skynet-chat.com</span>
            </div>
          </div>
          
          {/* App interface */}
          <div className="flex-1 flex">
            {/* Sidebar */}
            <div className="w-14 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 flex flex-col items-center py-4 gap-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">S</div>
              <div className="w-8 h-8 flex items-center justify-center text-teal-400 rounded-md hover:bg-gray-800/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-md hover:bg-gray-800/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
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
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Header with tabs */}
              <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 flex items-center px-3">
                <div className="flex gap-1">
                  <div className="px-3 py-1 text-xs rounded-t-md bg-gray-900/90 text-white border-t border-l border-r border-teal-500/30">
                    document.md
                  </div>
                  <div className="px-3 py-1 text-xs rounded-t-md bg-gray-800/50 text-gray-400 border-t border-l border-r border-gray-700/50">
                    notes.md
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button className="w-6 h-6 rounded-md bg-gray-800/60 hover:bg-gray-700/60 flex items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Split view: Editor and Chat */}
              <div className="flex-1 flex">
                {/* Document editor */}
                <div 
                  tabIndex={0} // Make focusable
                  className="flex-1 p-3 text-xs font-mono text-gray-300 overflow-hidden outline-none focus-within:ring-1 focus-within:ring-teal-500/30 focus-within:ring-inset" // Use focus-within for ring
                >
                  <div className="mb-2 font-semibold text-teal-400"># Project Overview</div>
                  <div className="mb-2">The system integrates advanced AI capabilities with a secure, user-friendly interface to enable collaboration on documents and code.</div>
                  <div className="mb-2 font-semibold text-teal-400">## Key Features</div>
                  {/* Use focus-within for highlight */}
                  <div className="mb-2 focus-within:bg-teal-500/10 focus-within:px-1">- Real-time collaboration with AI assistance</div>
                  <div className="mb-2">- Secure, on-premise deployment options</div>
                  <div className="mb-2">- Customizable AI models to suit specific needs</div>
                  <div className="mb-2 font-semibold text-teal-400">## Technical Specifications</div>
                  <div className="mb-2">Built with modern technologies...</div>
                </div>
                
                {/* Chat interface */}
                <div className="w-72 border-l border-gray-800 flex flex-col bg-gray-800/20 backdrop-blur-md">
                  {/* Chat header */}
                  <div className="h-10 bg-gray-800/60 backdrop-blur-md border-b border-gray-800 px-3 flex items-center">
                    <div className="text-xs font-medium text-white">Skynet Assistant</div>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                      <span className="text-[10px] text-teal-400">Online</span>
                    </div>
                  </div>
                  
                  {/* Chat messages */}
                  <div className="flex-1 p-3 overflow-auto space-y-3">
                    {chatMessages.map((msg, idx) => (
                      <div 
                        key={idx} 
                        className={`text-xs rounded-lg p-2 max-w-[85%] ${ 
                          msg.role === 'user' 
                            ? 'bg-teal-500/20 ml-auto text-white' 
                            : 'bg-gray-800/60 text-gray-300'
                        } ${idx >= activeChatMessage ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} // Keep JS logic, rely on CSS transition
                      >
                        {msg.content}
                      </div>
                    ))} {/* NOTE: The sequential reveal still uses JS state `activeChatMessage`, but the fade uses CSS `transition-opacity` */}
                    
                    {/* Typing indicator */}
                    {showTypingIndicator && (
                      <div className="bg-gray-800/60 rounded-lg p-2 w-16 flex">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms] mx-1"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></div>
                      </div>
                    )}
                  </div> {/* NOTE: Typing indicator uses JS state `showTypingIndicator` and CSS `animate-bounce` */}
                  
                  {/* Chat input - Triggers JS state update */}
                  <div className="p-3 border-t border-gray-800">
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
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated scan line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent opacity-70 animate-scanner-vertical"></div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-teal-400/30 to-blue-500/30 rounded-xl float-1 opacity-70 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <div className="text-[8px] text-teal-100/70 font-mono overflow-hidden">
            {codeSample.split('\n').slice(0, 6).map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 -left-12 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-teal-400/30 rounded-lg float-2 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </div>
      <div className="absolute top-1/3 -left-6 w-12 h-12 bg-gradient-to-r from-blue-500/30 to-teal-400/30 rounded-full float-3 opacity-70 shadow-lg shadow-blue-500/20 backdrop-blur-sm border border-blue-400/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-ping-slow"></div>
        </div>
      </div>
      <div className="absolute -bottom-8 right-1/3 w-16 h-16 bg-gradient-to-r from-teal-500/30 to-blue-500/30 rounded-md float-2 opacity-70 transform rotate-12 shadow-lg shadow-teal-500/20 backdrop-blur-sm border border-teal-400/30"></div>
    </div>
  );
} 