import React, { useState } from 'react';
import { Code2, Copy, Check, Download, Eye, EyeOff } from 'lucide-react';
import { generateAutomationCode } from '../utils/analyzer';
import { AnalysisResult } from '../types';

interface AutomationCodeProps {
  result: AnalysisResult;
}

const AutomationCode: React.FC<AutomationCodeProps> = ({ result }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const automationCode = generateAutomationCode(result);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(automationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([automationCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `automation-${new URL(result.url).hostname}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">🚀 Generated Automation Code</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showCode ? 'Hide' : 'Show'} Code</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
          
          <button
            onClick={downloadCode}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        {showCode && (
          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto border border-gray-300">
              <code className="language-javascript">{automationCode}</code>
            </pre>
            
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300">JavaScript</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <h4 className="font-semibold text-green-700 mb-2">✅ Features Included:</h4>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• Smart element detection with fallbacks</li>
              <li>• Error handling and retry logic</li>
              <li>• Wait strategies for dynamic content</li>
              <li>• Success verification</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <h4 className="font-semibold text-blue-700 mb-2">🛠️ Tech Stack:</h4>
            <ul className="text-sm text-blue-600 space-y-1">
              <li>• Playwright automation framework</li>
              <li>• Modern JavaScript/TypeScript</li>
              <li>• Robust selector strategies</li>
              <li>• Production-ready code</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="font-semibold text-amber-700 mb-2">⚠️ Usage Notes:</h4>
          <ul className="text-sm text-amber-600 space-y-1">
            <li>• Test in a staging environment first</li>
            <li>• Handle rate limiting and CAPTCHA</li>
            <li>• Monitor for UI changes</li>
            <li>• Implement proper credential management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AutomationCode;