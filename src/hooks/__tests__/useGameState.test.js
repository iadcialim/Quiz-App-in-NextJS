import { renderHook, act } from '@testing-library/react';
import useGameState from '../useGameState';

describe('useGameState Hook Contract', () => {
  const initialSettings = {
    enabled: true,
    eggQuantity: 5,
    spawnRate: 15,
    difficulty: 'medium'
  };

  test('returns initial game state', () => {
    const { result } = renderHook(() => useGameState(initialSettings));
    
    expect(result.current.gameState).toEqual({
      isActive: false,
      eggs: [],
      score: 0,
      settings: initialSettings,
      canvas: { width: 300, height: 400 },
      lastUpdate: expect.any(Number),
      spawnTimer: 0
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('provides game control functions', () => {
    const { result } = renderHook(() => useGameState(initialSettings));
    
    expect(typeof result.current.startGame).toBe('function');
    expect(typeof result.current.stopGame).toBe('function');
    expect(typeof result.current.pauseGame).toBe('function');
    expect(typeof result.current.resumeGame).toBe('function');
    expect(typeof result.current.updateSettings).toBe('function');
    expect(typeof result.current.bounceEgg).toBe('function');
    expect(typeof result.current.resetScore).toBe('function');
  });

  test('starts and stops game correctly', () => {
    const { result } = renderHook(() => useGameState(initialSettings));
    
    act(() => {
      result.current.startGame();
    });
    
    // This will fail until implementation exists
    expect(result.current.gameState.isActive).toBe(true);
    
    act(() => {
      result.current.stopGame();
    });
    
    expect(result.current.gameState.isActive).toBe(false);
  });

  test('updates score when bouncing eggs', () => {
    const { result } = renderHook(() => useGameState(initialSettings));
    
    act(() => {
      result.current.bounceEgg('egg-1');
    });
    
    // This will fail until implementation exists
    expect(result.current.gameState.score).toBe(1);
  });
});