import { useState, useCallback, useRef, useEffect } from 'react';
import useGamePhysics from './useGamePhysics';

export default function useGameState(initialSettings) {
  const [gameState, setGameState] = useState({
    isActive: false,
    eggs: [],
    score: 0,
    droppedEggs: 0,
    settings: initialSettings || {
      enabled: true,
      eggQuantity: 5,
      spawnRate: 15,
      difficulty: 'medium',
      eggSpeed: 0.3,
      bounceStrength: 1.0
    },
    // Use canvas from initial settings if provided so physics and rendering agree
    canvas: (initialSettings && initialSettings.canvas) ? initialSettings.canvas : { width: 300, height: 400 },
    lastUpdate: Date.now(),
    spawnTimer: 0
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const gameLoopRef = useRef(null);
  
  const { updateEggPhysics, checkCollisions, spawnEgg, removeExpiredEggs } = useGamePhysics(gameState.canvas);

  const startGame = useCallback(() => {
    try {
      setGameState(prev => ({
        ...prev,
        isActive: true,
        lastUpdate: Date.now()
      }));
      setError(null);
    } catch (err) {
      setError('Failed to start game');
    }
  }, []);

  const stopGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isActive: false,
      eggs: []
    }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isActive: false
    }));
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isActive: true,
      lastUpdate: Date.now()
    }));
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setGameState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  const bounceEgg = useCallback((eggId) => {
    setGameState(prev => {
      const updatedEggs = prev.eggs.map(egg => {
        if (egg.id === eggId) {
          const strength = (prev.settings && prev.settings.bounceStrength) ? prev.settings.bounceStrength : 1.0;
          return {
            ...egg,
            velocityY: -18 * strength, // Bounce velocity scaled by setting (1.5x stronger)
            bounced: true
          };
        }
        return egg;
      });

      return {
        ...prev,
        eggs: updatedEggs,
        score: prev.score + 1
      };
    });
  }, []);

  const resetScore = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: 0
    }));
  }, []);

  // Game loop effect
  useEffect(() => {
    if (!gameState.isActive || !gameState.settings.enabled) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - gameState.lastUpdate;

      setGameState(prev => {
        let newEggs = [...prev.eggs];
        let newScore = prev.score;
        let newSpawnTimer = prev.spawnTimer + deltaTime;

        // Spawn new eggs
        const spawnInterval = (60 / prev.settings.spawnRate) * 1000;
        if (newSpawnTimer >= spawnInterval && newEggs.length < prev.settings.eggQuantity) {
          const newEgg = spawnEgg(prev.canvas);
          newEggs.push(newEgg);
          newSpawnTimer = 0;
        }

        // Update physics
        newEggs = newEggs.map(egg => updateEggPhysics(egg, deltaTime, prev.settings.eggSpeed || 1.0));

        // Check collisions and remove fallen eggs
        const collisions = checkCollisions(newEggs, prev.canvas);
        let newDroppedEggs = prev.droppedEggs;
        const droppedEggIds = [];
        
        collisions.forEach(collision => {
          if (collision.type === 'bottom') {
            newScore = Math.max(0, newScore - 1); // Lose point for dropped egg
            newDroppedEggs += 1; // Count dropped egg
            droppedEggIds.push(collision.eggId);
          }
        });
        
        // Remove eggs that hit the pan
        newEggs = newEggs.filter(egg => !droppedEggIds.includes(egg.id));

        // Don't remove expired eggs - only remove when they hit the pan

        return {
          ...prev,
          eggs: newEggs,
          score: newScore,
          droppedEggs: newDroppedEggs,
          spawnTimer: newSpawnTimer,
          lastUpdate: currentTime
        };
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.isActive, gameState.settings.enabled, gameState.lastUpdate, spawnEgg, updateEggPhysics, checkCollisions]);

  return {
    gameState,
    isLoading,
    error,
    startGame,
    stopGame,
    pauseGame,
    resumeGame,
    updateSettings,
    bounceEgg,
    resetScore
  };
}