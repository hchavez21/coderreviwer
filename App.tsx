
import React, { useState, useCallback } from 'react';
import CodeInput from './components/CodeInput';
import ReviewOutput from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { ReviewSuggestion } from './types';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES[0]);
  const [review, setReview] = useState<ReviewSuggestion[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError("Code cannot be empty.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const results = await reviewCode(code, language);
      setReview(results);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          AI Code Reviewer
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          Get instant feedback on your code with the power of Gemini.
        </p>
      </header>
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)] min-h-[600px]">
        <CodeInput
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <ReviewOutput
          review={review}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
