import React, { useState } from 'react';
import { Code, Copy, Check, Layers } from 'lucide-react';
import { AnalysisResult } from '../types';

interface SelectorGeneratorProps {
  result: AnalysisResult;
}

const SelectorGenerator: React.FC<SelectorGeneratorProps> = ({ result }) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const selectorGroups = [
    { type: 'username', label: 'Username Selectors', selectors: result.selectors.username, color: 'blue' },
    { type: 'password', label: 'Password Selectors', selectors: result.selectors.password, color: 'purple' },
    { type: 'submit', label: 'Submit Button Selectors', selectors: result.selectors.submit, color: 'green' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' },
      green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
          <Code className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">📋 Generated Selectors</h3>
      </div>

      <div className="space-y-6">
        {selectorGroups.map(({ type, label, selectors, color }) => {
          const colors = getColorClasses(color);

          return (
            <div key={type} className={`p-4 ${colors.bg} ${colors.border} border rounded-xl`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className={`w-4 h-4 ${colors.text}`} />
                  <h4 className={`font-semibold ${colors.text}`}>{label}</h4>
                </div>
                <span className={`text-xs ${colors.text} opacity-75`}>
                  {selectors.length} options
                </span>
              </div>

              <div className="space-y-2">
                {selectors.map((selector, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200 group-hover:border-gray-300 transition-colors">
                      <code className="text-sm font-mono text-gray-800">
                        {selector}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(selector, `${type}-${index}`)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-white"
                    >
                      {copiedItem === `${type}-${index}` ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Combined selector string:</span>
                  <button
                    onClick={() => copyToClipboard(selectors.join(', '), `${type}-combined`)}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {copiedItem === `${type}-combined` ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        Copied
                      </span>
                    ) : (
                      'Copy All'
                    )}
                  </button>
                </div>
                <code className="text-xs text-gray-700 font-mono bg-white p-2 rounded mt-2 block">
                  {selectors.join(', ')}
                </code>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-2">💡 Usage Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use multiple selectors for robust automation</li>
          <li>• Primary selectors are most reliable</li>
          <li>• Fallback selectors handle edge cases</li>
          <li>• Test selectors in browser dev tools</li>
        </ul>
      </div>
    </div>
  );
};

export default SelectorGenerator;