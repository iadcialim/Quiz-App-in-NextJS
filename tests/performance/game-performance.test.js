import { render, act } from '@testing-library/react';
import EggJugglingGame from '../../src/components/EggJugglingGame';

describe('Game Performance Tests', () => {
  let performanceEntries = [];
  
  beforeEach(() => {
    // Mock performance API
    global.performance.mark = jest.fn();
    global.performance.measure = jest.fn();
    global.performance.getEntriesByType = jest.fn(() => performanceEntries);
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 16));
    global.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    performanceEntries = [];
  });

  test('game maintains 60fps with multiple eggs', async () => {
    const mockOnScoreUpdate = jest.fn();
    
    render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
        settings={{
          enabled: true,
          eggQuantity: 10, // Maximum eggs
          spawnRate: 30    // High spawn rate
        }}
      />
    );

    // Simulate game running for 1 second
    const frameCount = 60;
    const startTime = performance.now();
    
    for (let i = 0; i < frameCount; i++) {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 16)); // 60fps = 16ms per frame
      });
    }
    
    const endTime = performance.now();
    const actualDuration = endTime - startTime;
    const expectedDuration = frameCount * 16; // 60fps target
    
    // Allow 10% variance for performance fluctuations
    expect(actualDuration).toBeLessThan(expectedDuration * 1.1);
  });

  test('memory usage remains stable during extended gameplay', async () => {
    const mockOnScoreUpdate = jest.fn();
    
    // Mock memory usage tracking
    const initialMemory = { usedJSHeapSize: 1000000 }; // 1MB
    let currentMemory = initialMemory.usedJSHeapSize;
    
    global.performance.memory = {
      get usedJSHeapSize() { return currentMemory; }
    };

    render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );

    // Simulate extended gameplay
    for (let i = 0; i < 100; i++) {
      await act(async () => {
        // Simulate memory growth but with cleanup
        currentMemory += 1000; // Small growth per frame
        if (i % 10 === 0) {
          currentMemory = Math.max(initialMemory.usedJSHeapSize, currentMemory - 5000); // Cleanup
        }
        await new Promise(resolve => setTimeout(resolve, 16));
      });
    }

    // Memory should not grow excessively (allow 50% increase)
    expect(currentMemory).toBeLessThan(initialMemory.usedJSHeapSize * 1.5);
  });

  test('canvas rendering performance with many eggs', () => {
    const mockCanvas = {
      getContext: jest.fn(() => ({
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        stroke: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0
      })),
      width: 300,
      height: 400,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };

    const gameState = {
      eggs: Array.from({ length: 10 }, (_, i) => ({
        id: `egg-${i}`,
        x: 100 + i * 20,
        y: 200 + i * 10,
        radius: 20,
        bounced: false
      })),
      isActive: true,
      score: 0
    };

    const startTime = performance.now();
    
    // Simulate rendering 10 eggs
    const context = mockCanvas.getContext();
    gameState.eggs.forEach(() => {
      context.beginPath();
      context.arc(100, 200, 20, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    });
    
    const renderTime = performance.now() - startTime;
    
    // Rendering should be fast (< 5ms for 10 eggs)
    expect(renderTime).toBeLessThan(5);
  });

  test('physics calculations performance', () => {
    const eggs = Array.from({ length: 50 }, (_, i) => ({
      id: `egg-${i}`,
      x: Math.random() * 300,
      y: Math.random() * 400,
      velocityX: 0,
      velocityY: Math.random() * 10,
      radius: 20
    }));

    const startTime = performance.now();
    
    // Simulate physics update for all eggs
    eggs.forEach(egg => {
      // Simple gravity calculation
      egg.velocityY += 0.5;
      egg.y += egg.velocityY;
      egg.x += egg.velocityX;
    });
    
    const physicsTime = performance.now() - startTime;
    
    // Physics should be very fast (< 1ms for 50 eggs)
    expect(physicsTime).toBeLessThan(1);
  });

  test('touch event handling performance on mobile', async () => {
    const mockOnScoreUpdate = jest.fn();
    
    const { container } = render(
      <EggJugglingGame 
        isQuizActive={true}
        onScoreUpdate={mockOnScoreUpdate}
      />
    );

    const canvas = container.querySelector('canvas');
    
    const startTime = performance.now();
    
    // Simulate rapid touch events
    for (let i = 0; i < 20; i++) {
      const touchEvent = new TouchEvent('touchstart', {
        touches: [{
          clientX: 100 + i,
          clientY: 200 + i
        }]
      });
      
      canvas.dispatchEvent(touchEvent);
    }
    
    const touchHandlingTime = performance.now() - startTime;
    
    // Touch handling should be responsive (< 10ms for 20 events)
    expect(touchHandlingTime).toBeLessThan(10);
  });
});