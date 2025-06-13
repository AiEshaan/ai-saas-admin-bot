import React from 'react';
import { Lock, User, MousePointer, Copy, Check } from 'lucide-react';
import { AnalysisResult } from '../types';

interface DetectedElementsProps {
  result: AnalysisResult;
}

const DetectedElements: React.FC<DetectedElementsProps> = ({ result }) => {
  const [copiedSelector, setCopiedSelector] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSelector(type);
      setTimeout(() => setCopiedSelector(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const elements = [
    {
      icon: User,
      type: 'username',
      label: 'Username Field',
      element: result.elements.username,
      color: 'blue'
    },
    {
      icon: Lock,
      type: 'password',
      label: 'Password Field',
      element: result.elements.password,
      color: 'purple'
    },
    {
      icon: MousePointer,
      type: 'submit',
      label: 'Submit Button',
      element: result.elements.submit,
      color: 'green'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', icon: 'text-purple-600' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-600' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">🔐 Authentication Elements Found</h3>
      </div>

      <div className="space-y-4">
        {elements.map(({ icon: Icon, type, label, element, color }) => {
          const colors = getColorClasses(color);
          const confidence = Math.round(element.confidence * 100);

          return (
            <div key={type} className={`p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                  <span className={`font-semibold ${colors.text}`}>✅ {label}</span>
                </div>
                <div className={`px-3 py-1 ${colors.bg} rounded-full border ${colors.border}`}>
                  <span className={`text-sm font-medium ${colors.text}`}>
                    Confidence: {confidence}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Selector:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-xs flex-1">
                      {element.selector}
                    </code>
                    <button
                      onClick={() => copyToClipboard(element.selector, type)}
                      className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {copiedSelector === type ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600">Type:</span>
                  <div className="mt-1">
                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-800 text-xs">
                      {element.type}
                    </span>
                  </div>
                </div>
              </div>

              {element.label && (
                <div className="mt-3 text-sm">
                  <span className="text-gray-600">Detected Label:</span>
                  <span className="ml-2 text-gray-800 font-medium">"{element.label}"</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h4 className="font-semibold text-gray-800 mb-2">🛡️ Detected Auth Methods:</h4>
        <div className="flex flex-wrap gap-2">
          {result.authMethods.map((method, index) => (
            <span key={index} className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
              • {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetectedElements;