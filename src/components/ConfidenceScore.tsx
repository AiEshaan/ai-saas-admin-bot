import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfidenceScoreProps {
  confidence: number;
}

const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ confidence }) => {
  const percentage = Math.round(confidence * 100);
  
  const getConfidenceColor = () => {
    if (percentage >= 80) return { color: 'text-green-600', bg: 'bg-green-500', ring: 'ring-green-200' };
    if (percentage >= 50) return { color: 'text-yellow-600', bg: 'bg-yellow-500', ring: 'ring-yellow-200' };
    return { color: 'text-red-600', bg: 'bg-red-500', ring: 'ring-red-200' };
  };

  const getConfidenceIcon = () => {
    if (percentage >= 80) return CheckCircle;
    if (percentage >= 50) return TrendingUp;
    return AlertTriangle;
  };

  const colors = getConfidenceColor();
  const Icon = getConfidenceIcon();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Icon className={`w-6 h-6 ${colors.color}`} />
          <h3 className="text-2xl font-bold text-gray-800">AI Confidence Score</h3>
        </div>

        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Background circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - confidence)}`}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={percentage >= 80 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'} />
                <stop offset="100%" stopColor={percentage >= 80 ? '#059669' : percentage >= 50 ? '#d97706' : '#dc2626'} />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${colors.color}`}>{percentage}%</div>
              <div className="text-xs text-gray-500 mt-1">CONFIDENCE</div>
            </div>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.ring} ring-4`}>
          <div className={`w-2 h-2 ${colors.bg} rounded-full animate-pulse`}></div>
          <span className={`font-semibold ${colors.color}`}>
            {percentage >= 80 ? 'High Confidence' : percentage >= 50 ? 'Moderate Confidence' : 'Low Confidence'}
          </span>
        </div>

        <p className="text-gray-600 mt-4 text-sm">
          {percentage >= 80 
            ? 'Excellent detection accuracy - ready for production automation'
            : percentage >= 50 
            ? 'Good detection - minor validation recommended'
            : 'Manual verification required before automation'
          }
        </p>
      </div>
    </div>
  );
};

export default ConfidenceScore;