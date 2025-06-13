import React, { useState } from 'react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import AnalysisProgress from './components/AnalysisProgress';
import ConfidenceScore from './components/ConfidenceScore';
import DetectedElements from './components/DetectedElements';
import SelectorGenerator from './components/SelectorGenerator';
import AutomationCode from './components/AutomationCode';
import Recommendations from './components/Recommendations';
import DemoStats from './components/DemoStats';
import ThemeToggle from './components/ThemeToggle';
import { analyzeURL } from './utils/analyzer';
import { AnalysisResult } from './types';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDark, setIsDark] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    try {
      const result = await analyzeURL(url);
      setAnalysisResult(result);
      
      // Scroll to results after analysis
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      <div className="container mx-auto px-4 py-12">
        <Header />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <URLInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          
          {isAnalyzing && <AnalysisProgress isAnalyzing={isAnalyzing} />}
          
          {analysisResult && (
            <div id="results-section" className="space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Analysis Results</h2>
                <p className="text-gray-600">AI-powered detection complete for {analysisResult.url}</p>
              </div>
              
              <ConfidenceScore confidence={analysisResult.confidence} />
              
              <DetectedElements result={analysisResult} />
              
              <SelectorGenerator result={analysisResult} />
              
              <AutomationCode result={analysisResult} />
              
              <Recommendations result={analysisResult} />
            </div>
          )}
          
          <DemoStats />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
    </div>
  );
}

export default App;