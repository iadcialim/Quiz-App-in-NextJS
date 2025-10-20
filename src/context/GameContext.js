'use client';

import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameScore, setGameScore] = useState(0);
  const [gameSettings, setGameSettings] = useState({
    enabled: true,
    eggQuantity: 5,
    spawnRate: 15,
    difficulty: 'medium',
    soundEnabled: false
  });
  const [gameStats, setGameStats] = useState({
    eggsJuggled: 0,
    eggsDropped: 0,
    totalInteractions: 0,
    bonusMultiplier: 1.0
  });

  const updateGameScore = (score) => {
    setGameScore(score);
    
    // Calculate bonus multiplier based on performance
    const multiplier = 1.0 + (Math.max(0, score) * 0.1);
    setGameStats(prev => ({
      ...prev,
      bonusMultiplier: Math.min(2.0, multiplier) // Cap at 2x multiplier
    }));
  };

  const updateGameStats = (stats) => {
    setGameStats(prev => ({ ...prev, ...stats }));
  };

  const resetGame = () => {
    setGameScore(0);
    setGameStats({
      eggsJuggled: 0,
      eggsDropped: 0,
      totalInteractions: 0,
      bonusMultiplier: 1.0
    });
  };

  const value = {
    gameScore,
    gameSettings,
    gameStats,
    setGameScore: updateGameScore,
    setGameSettings,
    updateGameStats,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};