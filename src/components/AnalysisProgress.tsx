import React, { useState, useEffect } from 'react';
import { Search, Brain, Target, CheckCircle } from 'lucide-react';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
}

const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ isAnalyzing }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Search, text: 'Analyzing page structure...', duration: 800 },
    { icon: Brain, text: 'AI processing DOM elements...', duration: 600 },
    { icon: Target, text: 'Identifying authentication fields...', duration: 700 },
    { icon: CheckCircle, text: 'Analysis complete!', duration: 300 }
  ];

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];
    let totalTime = 0;

    steps.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setCurrentStep(index);
      }, totalTime);
      timeouts.push(timeout);
      totalTime += step.duration;
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isAnalyzing]);

  if (!isAnalyzing) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep >= index;
          const isCompleted = currentStep > index;

          return (
            <div key={index} className="flex items-center gap-4">
              <div className={`
                relative p-3 rounded-full transition-all duration-500
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110' 
                  : 'bg-gray-100 text-gray-400'
                }
              `}>
                <Icon className="w-5 h-5" />
                {isActive && currentStep === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
                )}
                {isCompleted && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`
                  text-lg font-medium transition-all duration-300
                  ${isActive ? 'text-gray-800' : 'text-gray-400'}
                `}>
                  {step.text}
                </p>
                
                {isActive && currentStep === index && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-700 font-medium">AI Engine Processing</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;