"use client";

import { useEffect, useState } from "react";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";
import Results from "@/components/Results";
import EggJugglingGame from "@/components/EggJugglingGame";

const Quiz = ({ params }) => {
  const { subject } = params;
  const { points, setPoints, updateQuizMetrics, updateEggGameMetrics, setEggGameActive } = usePoints();
  
  // Set egg game active state when mini-game has score
  useEffect(() => {
    if (miniGameScore !== 0) {
      setEggGameActive(true);
    }
  }, [miniGameScore, setEggGameActive]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState(0);
  const [miniGameScore, setMiniGameScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/data/questions.json");
      if (response.ok) {
        const data = await response.json();
        const subjectData = data.subjects.find(
          (s) => s.name.toLowerCase() === subject
        );
        setQuestions(subjectData ? subjectData.questions : []);
      } else {
        console.error("Failed to fetch questions");
      }
    };
    fetchQuestions();
  }, [subject]);

  const handleAnswer = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    // Track the time spent on this question
    setTotalTimeSpent(totalTimeSpent + timePerQuestion);

    if (option === questions[currentQuestionIndex].answer) {
      setPoints(points + 4); // 4 points for a correct answer
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimePerQuestion(0); // Reset the time for the next question
    } else {
      // Calculate final quiz metrics and update context
      const quizMetrics = {
        totalQuestions: questions.length,
        correct: correctAnswers,
        wrong: wrongAnswers,
        timeSpentMs: totalTimeSpent * 1000
      };
      updateQuizMetrics(quizMetrics);
      
      // Set egg game active state
      if (miniGameScore !== 0) {
        setEggGameActive(true);
      }
      
      setShowResults(true);
    }
  };

  // When time is up
  const handleTimeUp = () => {
    setIsAnswered(true); // Consider the question unattempted if time runs out
    setUnattemptedQuestions(unattemptedQuestions + 1); // Increment the unattempted questions count
    setTotalTimeSpent(totalTimeSpent + 10);
    handleNext(); // Automatically go to the next question
  };

  // Calculate the percentage score
  const percentage = Math.round((correctAnswers / questions.length) * 100);
  const averageTimePerQuestion = (totalTimeSpent / questions.length).toFixed(2);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!showResults ? (
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          {/* Mini-Game Panel */}
          <div className="w-full lg:w-1/3 order-2 lg:order-1 flex flex-col">
            <div className="flex-1 min-h-[calc(100vh-200px)]">
              <EggJugglingGame 
                isQuizActive={!showResults}
                onScoreUpdate={setMiniGameScore}
                width={240}
                height={700}
                className="w-full h-full"
              />
            </div>
          </div>
          
          {/* Quiz Panel */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-2 bg-blue-500 transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          
          {/* Question Number */}
          <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>

          {/* Question Text */}
          <h3 className="text-xl font-bold text-center mb-6 p-4 bg-blue-500 text-white rounded-lg">
            {questions[currentQuestionIndex]?.question}
          </h3>


          {/* Timer */}
          <QuestionTimer
            onTimeUp={handleTimeUp}
            setTimePerQuestion={setTimePerQuestion}
            isAnswered={isAnswered}
            resetTimer={currentQuestionIndex}
          />

          

          {/* Options */}
          <div className="mt-6 space-y-4">
            {questions[currentQuestionIndex]?.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition duration-300 focus:outline-none ${
                  isAnswered && option === questions[currentQuestionIndex].answer
                    ? "bg-green-500 text-white"
                    : isAnswered && option === selectedOption
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 focus:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-8 w-full py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next Question"}
            </button>
          )}
            </div>
          </div>
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
          miniGameScore={miniGameScore}
        />
      )}
    </div>
  );
};

export default Quiz;
