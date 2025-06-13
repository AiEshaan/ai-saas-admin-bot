import React from 'react';
import { Bot, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
            <Bot className="w-8 h-8 text-white" />
          </div>
        </div>
        <Zap className="w-6 h-6 text-yellow-500 ml-2 animate-pulse" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
        🤖 AI-Driven SaaS Login Detection
      </h1>
      
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full border border-blue-200">
          <span className="text-blue-700 font-semibold">CloudEagle Demo</span>
        </div>
      </div>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Intelligent Web Automation for SaaS User Management
      </p>
      
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Real-time Analysis</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>AI-Powered Detection</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span>Automation Ready</span>
        </div>
      </div>
    </div>
  );
};

export default Header;