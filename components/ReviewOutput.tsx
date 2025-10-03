
import React from 'react';
import { ReviewSuggestion } from '../types';
import ReviewCard from './ReviewCard';

interface ReviewOutputProps {
  review: ReviewSuggestion[] | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-700 rounded-lg"></div>
        ))}
    </div>
);

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
    <h3 className="text-xl font-semibold text-gray-300">Awaiting Review</h3>
    <p>Paste your code on the left and click "Review Code" to get started.</p>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-4 bg-red-900/20 rounded-lg">
        <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
        <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
        <p className="text-red-400">{message}</p>
    </div>
);


const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-lg">
      <div className="p-4 bg-gray-900 rounded-t-xl border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Review Feedback</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {isLoading && <LoadingSkeleton />}
        {!isLoading && error && <ErrorState message={error} />}
        {!isLoading && !error && !review && <EmptyState />}
        {!isLoading && !error && review && (
          review.length === 0 
          ? <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <svg className="w-16 h-16 mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-xl font-semibold text-gray-200">No Issues Found!</h3>
              <p>The AI reviewer didn't find any specific issues to report. Great job!</p>
            </div>
          : review.map((suggestion, index) => (
              <ReviewCard key={index} suggestion={suggestion} />
            ))
        )}
      </div>
    </div>
  );
};

export default ReviewOutput;
