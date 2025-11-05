'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePoints } from '../context/PointsContext';
import GameCanvas from './GameCanvas';
import GameSettings from './GameSettings';
import useGameState from '../hooks/useGameState';

export default function EggJugglingGame({ 
  isQuizActive, 
  onScoreUpdate, 
  width = 300, 
  height = 400, 
  settings: initialSettings,
  className = '' 
}) {
  const [gameSettings, setGameSettings] = useState({
    enabled: true,
    eggQuantity: 5,
    spawnRate: 15,
    difficulty: 'medium',
    eggSpeed: 0.3,
    bounceStrength: 1.0,
    soundEnabled: false,
    ...initialSettings
  });

  const { 
    gameState, 
    isLoading, 
    error, 
    startGame, 
    stopGame, 
    updateSettings, 
    bounceEgg 
  } = useGameState({
    ...gameSettings,
    canvas: { width, height }
  });

  // Handle egg tap
  const handleEggTap = useCallback((eggId) => {
    bounceEgg(eggId);
  }, [bounceEgg]);

  // Handle settings change
  const handleSettingsChange = useCallback((newSettings) => {
    setGameSettings(newSettings);
    updateSettings(newSettings);
  }, [updateSettings]);

  const { updateEggGameMetrics } = usePoints();

  // Update parent with score changes and context with detailed metrics
  useEffect(() => {
    if (onScoreUpdate) {
      onScoreUpdate(gameState.score);
    }
    
    // Update context with detailed egg game metrics
    // The score represents successful bounces, droppedEggs represents failures
    const juggles = Math.max(0, gameState.score); // Score = successful bounces
    const eggsDropped = gameState.droppedEggs || 0;
    const eggsProduced = juggles + eggsDropped; // Total eggs that appeared
    
    const eggGameMetrics = {
      eggsDropped: eggsDropped,
      eggsProduced: eggsProduced,
      juggles: juggles,
      totalEggsIntroduced: gameSettings.eggQuantity
    };
    

    updateEggGameMetrics(eggGameMetrics);
  }, [gameState.score, gameState.droppedEggs, gameState.totalEggsSpawned, gameState.successfulBounces, gameSettings.eggQuantity, onScoreUpdate, updateEggGameMetrics]);

  // Start/stop game based on quiz state
  useEffect(() => {
    if (isQuizActive && gameSettings.enabled) {
      startGame();
    } else {
      stopGame();
    }
  }, [isQuizActive, gameSettings.enabled, startGame, stopGame]);

  const containerClass = `egg-juggling-game ${className} ${
    !isQuizActive ? 'game-stopped' : ''
  } ${!gameSettings.enabled ? 'game-disabled' : ''}`;

  if (error) {
    return (
      <div data-testid="egg-juggling-game" className={containerClass}>
        <div className="text-red-500 p-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="egg-juggling-game" className={`${containerClass} h-full flex flex-row`}>
      {/* Left Panel - Controls */}
      <div className="w-32 flex flex-col space-y-2 pr-2">
        <div className="text-center">
          <h3 className="text-sm font-semibold">Egg Game</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Score: <span className="font-bold">{gameState.score}</span></div>
            <div>Active: <span className="font-bold">{gameState.eggs.length}</span></div>
            <div>Dropped: <span className="font-bold">{gameState.droppedEggs}</span></div>
          </div>
        </div>

        <GameSettings
          settings={gameSettings}
          onSettingsChange={handleSettingsChange}
          disabled={isLoading}
          compact={true}
        />

        {!isQuizActive && (
          <div className="text-center text-xs text-gray-500">
            Paused
          </div>
        )}
      </div>

      {/* Right Panel - Game Canvas */}
      <div className="flex-1 flex justify-center items-center">
        <GameCanvas
          width={width}
          height={height}
          gameState={gameState}
          onEggTap={handleEggTap}
          debugMode={false}
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}