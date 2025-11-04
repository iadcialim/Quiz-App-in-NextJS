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
      if (!metrics) {
        throw new Error('Quiz metrics are required');
      }
      const score = computeQuizScore(metrics);
      setQuizScore(score);
      return score;
    } catch (error) {
      console.error('Quiz scoring error:', error.message);
      // Set fallback score
      const fallbackScore = {
        points: 0,
        breakdown: { accuracyScore: 0, speedBonus: 0, maxPossibleTime: 0, speedFactor: 0 },
        percentage: 0
      };
      setQuizScore(fallbackScore);
      return fallbackScore;
    }
  };

  const calculateEggGameScore = (metrics) => {
    try {
      if (!metrics) {
        throw new Error('Egg game metrics are required');
      }
      const score = computeEggGameScore(metrics);
      setEggGameScore(score);
      return score;
    } catch (error) {
      console.error('Egg game scoring error:', error.message);
      // Set fallback score
      const fallbackScore = {
        points: 0,
        breakdown: { bouncePoints: 0, dropPenalty: 0, efficiencyPenalty: 0, excessEggs: 0 }
      };
      setEggGameScore(fallbackScore);
      return fallbackScore;
    }
  };

  const updateQuizMetrics = (metrics) => {
    try {
      if (!metrics || typeof metrics !== 'object') {
        throw new Error('Invalid quiz metrics provided');
      }
      setQuizMetrics(metrics);
      calculateQuizScore(metrics);
    } catch (error) {
      console.error('Error updating quiz metrics:', error.message);
    }
  };

  const updateEggGameMetrics = (metrics) => {
    try {
      if (!metrics || typeof metrics !== 'object') {
        throw new Error('Invalid egg game metrics provided');
      }
      setEggGameMetrics(metrics);
      calculateEggGameScore(metrics);
    } catch (error) {
      console.error('Error updating egg game metrics:', error.message);
    }
  };

  const setEggGameActiveState = (active) => {
    setEggGameActive(active);
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
      updateEggGameMetrics,
      setEggGameActive: setEggGameActiveState
    }}>
      {children}
    </PointsContext.Provider>
  );
};



// Export context for direct use
export { PointsContext };
