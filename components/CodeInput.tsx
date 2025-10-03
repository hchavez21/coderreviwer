
import React from 'react';
import { LANGUAGES } from '../constants';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-lg">
      <div className="flex items-center justify-between p-4 bg-gray-900 rounded-t-xl border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
            disabled={isLoading}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <button
            onClick={onReview}
            disabled={isLoading || !code.trim()}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Reviewing...' : 'Review Code'}
          </button>
        </div>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-full p-4 bg-gray-900 text-gray-300 font-mono resize-none border-0 focus:ring-0 outline-none rounded-b-xl"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeInput;
