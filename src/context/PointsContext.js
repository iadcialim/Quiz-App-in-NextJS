"use client"; 
import { createContext, useContext, useState } from 'react';
import { computeQuizScore } from '../utils/quizScoring';
import { computeEggGameScore } from '../utils/eggGameScoring';

// Create context
const PointsContext = createContext();

// Provider component
export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [bonusMultiplier, setBonusMultiplier] = useState(1.0);
  
  // New scoring state
  const [quizMetrics, setQuizMetrics] = useState(null);
  const [quizScore, setQuizScore] = useState(null);
  const [eggGameMetrics, setEggGameMetrics] = useState(null);
  const [eggGameScore, setEggGameScore] = useState(null);
  const [eggGameActive, setEggGameActive] = useState(false);

  const updateTotalScore = (quizPoints, gamePoints) => {
    const multiplier = 1.0 + (Math.max(0, gamePoints) * 0.1);
    const finalMultiplier = Math.min(2.0, multiplier);
    const totalScore = Math.round((quizPoints * finalMultiplier) + gamePoints);
    
    setPoints(totalScore);
    setMiniGameScore(gamePoints);
    setBonusMultiplier(finalMultiplier);
  };

  const calculateQuizScore = (metrics) => {
    try {
      const score = computeQuizScore(metrics);
      setQuizScore(score);
      return score;
    } catch (error) {
      console.error('Quiz scoring error:', error);
      return null;
    }
  };

  const calculateEggGameScore = (metrics) => {
    try {
      const score = computeEggGameScore(metrics);
      setEggGameScore(score);
      return score;
    } catch (error) {
      console.error('Egg game scoring error:', error);
      return null;
    }
  };

  const updateQuizMetrics = (metrics) => {
    setQuizMetrics(metrics);
    calculateQuizScore(metrics);
  };

  const updateEggGameMetrics = (metrics) => {
    setEggGameMetrics(metrics);
    calculateEggGameScore(metrics);
  };

  return (
    <PointsContext.Provider value={{ 
      points, 
      setPoints, 
      miniGameScore, 
      bonusMultiplier,
      updateTotalScore,
      
      // New scoring fields
      quizMetrics,
      quizScore,
      eggGameMetrics,
      eggGameScore,
      eggGameActive,
      
      // Utility functions
      calculateQuizScore,
      calculateEggGameScore,
      updateQuizMetrics,
      updateEggGameMetrics
    }}>
      {children}
    </PointsContext.Provider>
  );
};



// Export context for direct use
export { PointsContext };
