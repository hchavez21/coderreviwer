
import React from 'react';
import { ReviewSuggestion, Severity } from '../types';

interface ReviewCardProps {
  suggestion: ReviewSuggestion;
}

const severityConfig = {
  [Severity.Critical]: {
    color: 'border-red-500',
    icon: (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    ),
  },
  [Severity.Major]: {
    color: 'border-yellow-500',
    icon: (
      <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.982A2.25 2.25 0 0018.937 5H5.063a2.25 2.25 0 00-1.681.982L2 12h20l-1.382-6.018zM2 12v7a2 2 0 002 2h16a2 2 0 002-2v-7H2z" /></svg>
    ),
  },
  [Severity.Minor]: {
    color: 'border-blue-500',
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  [Severity.Suggestion]: {
    color: 'border-green-500',
    icon: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707" /></svg>
    ),
  },
};

const ReviewCard: React.FC<ReviewCardProps> = ({ suggestion }) => {
  const config = severityConfig[suggestion.severity] || severityConfig[Severity.Suggestion];

  return (
    <div className={`bg-gray-800 border-l-4 ${config.color} rounded-r-lg shadow-md p-5 mb-4 transition-transform transform hover:scale-[1.02]`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-gray-100">{suggestion.severity}</h3>
            <span className="px-3 py-1 text-xs font-semibold text-indigo-100 bg-indigo-600 rounded-full">{suggestion.category}</span>
          </div>
          <p className="text-gray-300 mb-4">{suggestion.description}</p>
          {suggestion.code_snippet && (
            <pre className="bg-gray-900 text-red-300 p-3 rounded-md overflow-x-auto text-sm">
              <code>{suggestion.code_snippet}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
