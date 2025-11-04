"use client";

import { useEffect, useState, useContext } from "react";
import { FaTrophy, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaPercentage, FaClock, FaStopwatch, FaGamepad, FaSpinner } from "react-icons/fa";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import ScoreSubmissionForm from './ScoreSubmissionForm';
import Leaderboard from './Leaderboard';
import ErrorBoundary from './ErrorBoundary';
import ResultSection from './ResultSection';
import { PointsContext } from '../context/PointsContext';

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unattemptedQuestions,
  percentage,
  timeSpent,
  averageTimePerQuestion,
  miniGameScore = 0,
}) => {
  const { quizScore, eggGameScore, eggGameMetrics, eggGameActive } = useContext(PointsContext);
  // Set the state for confetti
  const [showConfetti, setShowConfetti] = useState(true);
  const [showSubmissionForm, setShowSubmissionForm] = useState(true);
  const [submittedUser, setSubmittedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { width, height } = useWindowSize();

  // Disable confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={700} />}

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Your Score
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Left Panel - Enhanced Results */}
        <div className="flex-1">
          <ResultSection
            title="Quiz Results"
            cards={[
              {
                title: "Correct Answers",
                value: correctAnswers,
                icon: <FaCheckCircle />,
                format: "number"
              },
              {
                title: "Wrong Answers",
                value: wrongAnswers,
                icon: <FaTimesCircle />,
                format: "number"
              },
              {
                title: "Percentage",
                value: quizScore?.percentage || percentage,
                icon: <FaPercentage />,
                format: "percentage"
              },
              {
                title: "Total Time Spent",
                value: Math.round(timeSpent),
                icon: <FaClock />,
                format: "time"
              },
              {
                title: "Total Points",
                value: quizScore?.points || score,
                icon: <FaTrophy />,
                format: "number"
              }
            ]}
          />
          
          <ResultSection
            title="Egg Juggling"
            visible={eggGameActive || miniGameScore !== 0}
            cards={[
              {
                title: "Eggs Dropped",
                value: eggGameMetrics?.eggsDropped || 0,
                icon: <FaTimesCircle />,
                format: "number"
              },
              {
                title: "Eggs Produced",
                value: eggGameMetrics?.eggsProduced || 0,
                icon: <FaGamepad />,
                format: "number"
              },
              {
                title: "Egg Juggles",
                value: eggGameMetrics?.juggles || 0,
                icon: <FaCheckCircle />,
                format: "number"
              },
              {
                title: "Total Time Spent",
                value: Math.round(timeSpent),
                icon: <FaClock />,
                format: "time"
              },
              {
                title: "Total Points",
                value: eggGameScore?.points || miniGameScore,
                icon: <FaTrophy />,
                format: "number"
              }
            ]}
          />
        </div>
        
        {/* Right Panel - Score Submission & Leaderboard */}
        <div className="w-full lg:w-96 space-y-6">
          <ErrorBoundary>
            {isLoading && (
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
                <FaSpinner className="animate-spin text-blue-500 mr-2" />
                <span>Processing...</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
                <button 
                  onClick={() => setError(null)}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Dismiss
                </button>
              </div>
            )}
            
            {showSubmissionForm && !isLoading && (
              <div className="animate-fade-in">
                <ScoreSubmissionForm 
                  score={(quizScore?.points || 0) + (eggGameScore?.points || 0)}
                  onSubmit={() => setIsLoading(true)}
                  onSuccess={(submittedName) => {
                    setIsLoading(false);
                    setSubmittedUser(submittedName);
                    setShowSubmissionForm(false);
                    setError(null);
                  }}
                  onError={(error) => {
                    setIsLoading(false);
                    setError(error);
                  }}
                />
              </div>
            )}
            
            <div className="animate-slide-up">
              <Leaderboard currentUserName={submittedUser} />
            </div>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Results;
