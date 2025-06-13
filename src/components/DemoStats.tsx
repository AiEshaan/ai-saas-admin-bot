import React from 'react';
import { BarChart3, Target, TrendingUp, Shield } from 'lucide-react';
import { demoStats, supportedPlatforms } from '../data/mockData';

const DemoStats: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">📊 Demo Statistics</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{demoStats.pagesAnalyzed.toLocaleString()}</div>
            <div className="text-sm text-blue-600">Pages Analyzed</div>
          </div>
        </div>

        <div className="text-center">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{demoStats.averageConfidence}%</div>
            <div className="text-sm text-green-600">Avg Confidence</div>
          </div>
        </div>

        <div className="text-center">
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{demoStats.successRate}%</div>
            <div className="text-sm text-purple-600">Success Rate</div>
          </div>
        </div>

        <div className="text-center">
          <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
            <BarChart3 className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-700">{demoStats.supportedAuthMethods}</div>
            <div className="text-sm text-orange-600">Auth Methods</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 mb-4">🏢 Supported SaaS Platforms</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {supportedPlatforms.map((platform, index) => (
            <div key={index} className={`
              p-3 rounded-xl border text-center transition-all duration-200 hover:scale-105
              ${platform.status === 'supported' 
                ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }
            `}>
              <div className="text-2xl mb-1">{platform.logo}</div>
              <div className="text-sm font-medium text-gray-800">{platform.name}</div>
              <div className={`text-xs mt-1 ${
                platform.status === 'supported' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {platform.status === 'supported' ? '✅ Supported' : '🔄 Coming Soon'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">🚀 Performance Metrics:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Analysis Speed:</span>
            <div className="font-medium text-gray-800">Avg 2.3 seconds</div>
          </div>
          <div>
            <span className="text-gray-600">Memory Usage:</span>
            <div className="font-medium text-gray-800">Efficient detection</div>
          </div>
          <div>
            <span className="text-gray-600">Accuracy:</span>
            <div className="font-medium text-gray-800">95% field detection</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoStats;