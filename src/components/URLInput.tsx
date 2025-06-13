import React, { useState } from 'react';
import { Search, ChevronDown, ExternalLink, Sparkles } from 'lucide-react';
import { exampleUrls } from '../data/mockData';

interface URLInputProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const URLInput: React.FC<URLInputProps> = ({ onAnalyze, isAnalyzing }) => {
  const [url, setUrl] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  const handleExampleSelect = (exampleUrl: string) => {
    setUrl(exampleUrl);
    setShowExamples(false);
    onAnalyze(exampleUrl);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <Search className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">URL Analysis</h2>
        <Sparkles className="w-5 h-5 text-yellow-500" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter SaaS login URL (e.g., https://github.com/login)"
            className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
            disabled={isAnalyzing}
          />
          {url && isValidUrl(url) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <ExternalLink className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={!url.trim() || isAnalyzing || !isValidUrl(url)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                <span>Analyze URL</span>
              </div>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowExamples(!showExamples)}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
            >
              <span>Examples</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showExamples ? 'rotate-180' : ''}`} />
            </button>

            {showExamples && (
              <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-10 min-w-[280px]">
                <div className="p-2">
                  {exampleUrls.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleSelect(example.url)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 group"
                    >
                      <div className="font-medium text-gray-800 group-hover:text-blue-600">
                        {example.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {example.url}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default URLInput;