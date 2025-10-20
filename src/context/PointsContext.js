"use client"; 
import { createContext, useContext, useState } from 'react';

// Create context
const PointsContext = createContext();

// Provider component
export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [miniGameScore, setMiniGameScore] = useState(0);
  const [bonusMultiplier, setBonusMultiplier] = useState(1.0);

  const updateTotalScore = (quizPoints, gamePoints) => {
    const multiplier = 1.0 + (Math.max(0, gamePoints) * 0.1);
    const finalMultiplier = Math.min(2.0, multiplier);
    const totalScore = Math.round((quizPoints * finalMultiplier) + gamePoints);
    
    setPoints(totalScore);
    setMiniGameScore(gamePoints);
    setBonusMultiplier(finalMultiplier);
  };

  return (
    <PointsContext.Provider value={{ 
      points, 
      setPoints, 
      miniGameScore, 
      bonusMultiplier,
      updateTotalScore 
    }}>
      {children}
    </PointsContext.Provider>
  );
};

// Hook to use the context
export const usePoints = () => {
  const context = useContext(PointsContext);
  return context;
};
