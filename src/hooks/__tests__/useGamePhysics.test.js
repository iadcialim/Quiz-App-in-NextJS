import { renderHook } from '@testing-library/react';
import useGamePhysics from '../useGamePhysics';

describe('useGamePhysics Hook Contract', () => {
  const canvasSize = { width: 300, height: 400 };

  test('returns physics functions', () => {
    const { result } = renderHook(() => useGamePhysics(canvasSize));
    
    expect(typeof result.current.updateEggPhysics).toBe('function');
    expect(typeof result.current.checkCollisions).toBe('function');
    expect(typeof result.current.spawnEgg).toBe('function');
    expect(typeof result.current.removeExpiredEggs).toBe('function');
  });

  test('updateEggPhysics applies gravity and updates position', () => {
    const { result } = renderHook(() => useGamePhysics(canvasSize));
    
    const egg = {
      id: '1',
      x: 100,
      y: 200,
      velocityX: 0,
      velocityY: 0,
      radius: 20
    };
    
    const deltaTime = 16; // 16ms frame time
    
    // This will fail until implementation exists
    const updatedEgg = result.current.updateEggPhysics(egg, deltaTime);
    
    expect(updatedEgg.y).toBeGreaterThan(egg.y); // Should fall due to gravity
    expect(updatedEgg.velocityY).toBeGreaterThan(0); // Velocity should increase
  });

  test('spawnEgg creates new egg with valid position', () => {
    const { result } = renderHook(() => useGamePhysics(canvasSize));
    
    // This will fail until implementation exists
    const newEgg = result.current.spawnEgg(canvasSize);
    
    expect(newEgg).toHaveProperty('id');
    expect(newEgg).toHaveProperty('x');
    expect(newEgg).toHaveProperty('y');
    expect(newEgg.x).toBeGreaterThanOrEqual(0);
    expect(newEgg.x).toBeLessThanOrEqual(canvasSize.width);
    expect(newEgg.y).toBeLessThan(0); // Should spawn above canvas
  });

  test('checkCollisions detects boundary collisions', () => {
    const { result } = renderHook(() => useGamePhysics(canvasSize));
    
    const eggs = [
      { id: '1', x: 100, y: 450, radius: 20 }, // Below canvas
      { id: '2', x: 100, y: 200, radius: 20 }  // Normal position
    ];
    
    // This will fail until implementation exists
    const collisions = result.current.checkCollisions(eggs, canvasSize);
    
    expect(collisions).toHaveLength(1);
    expect(collisions[0].eggId).toBe('1');
    expect(collisions[0].type).toBe('bottom');
  });
});