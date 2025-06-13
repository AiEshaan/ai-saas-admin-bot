import React from 'react';
import { Lightbulb, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnalysisResult } from '../types';

interface RecommendationsProps {
  result: AnalysisResult;
}

const Recommendations: React.FC<RecommendationsProps> = ({ result }) => {
  const getRecommendationIcon = (rec: string) => {
    if (rec.toLowerCase().includes('high confidence') || rec.toLowerCase().includes('ready')) {
      return { icon: CheckCircle, color: 'text-green-500' };
    }
    if (rec.toLowerCase().includes('manual') || rec.toLowerCase().includes('verification')) {
      return { icon: AlertCircle, color: 'text-amber-500' };
    }
    return { icon: Info, color: 'text-blue-500' };
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">💡 AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {result.recommendations.map((recommendation, index) => {
          const { icon: Icon, color } = getRecommendationIcon(recommendation);

          return (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="mt-0.5">
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{recommendation}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-gray-800 mb-3">🎯 Next Steps:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Test the generated selectors in browser developer tools</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Implement the automation code in your testing framework</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Set up monitoring for login page changes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Consider implementing fallback authentication methods</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;