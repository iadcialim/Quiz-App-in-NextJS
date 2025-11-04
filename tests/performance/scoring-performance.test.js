/**
 * Performance validation for scoring calculations
 */

import { computeQuizScore } from '../../src/utils/quizScoring';
import { computeEggGameScore } from '../../src/utils/eggGameScoring';

describe('Scoring Performance', () => {
  const PERFORMANCE_THRESHOLD = 100; // 100ms requirement

  test('computeQuizScore executes within performance threshold', () => {
    const metrics = {
      totalQuestions: 50,
      correct: 35,
      wrong: 15,
      timeSpentMs: 300000
    };

    const startTime = performance.now();
    
    // Run multiple iterations to test consistency
    for (let i = 0; i < 1000; i++) {
      computeQuizScore(metrics);
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / 1000;
    
    expect(averageTime).toBeLessThan(PERFORMANCE_THRESHOLD);
  });

  test('computeEggGameScore executes within performance threshold', () => {
    const metrics = {
      eggsDropped: 50,
      eggsProduced: 500,
      juggles: 450,
      totalEggsIntroduced: 100
    };

    const startTime = performance.now();
    
    // Run multiple iterations to test consistency
    for (let i = 0; i < 1000; i++) {
      computeEggGameScore(metrics);
    }
    
    const endTime = performance.now();
    const averageTime = (endTime - startTime) / 1000;
    
    expect(averageTime).toBeLessThan(PERFORMANCE_THRESHOLD);
  });

  test('scoring functions handle large datasets efficiently', () => {
    const largeQuizMetrics = {
      totalQuestions: 10000,
      correct: 7500,
      wrong: 2500,
      timeSpentMs: 3600000 // 1 hour
    };

    const largeEggMetrics = {
      eggsDropped: 10000,
      eggsProduced: 100000,
      juggles: 90000,
      totalEggsIntroduced: 1000
    };

    const startTime = performance.now();
    
    computeQuizScore(largeQuizMetrics);
    computeEggGameScore(largeEggMetrics);
    
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    expect(executionTime).toBeLessThan(PERFORMANCE_THRESHOLD);
  });

  test('memory usage remains stable during repeated calculations', () => {
    const metrics = {
      totalQuestions: 10,
      correct: 8,
      wrong: 2,
      timeSpentMs: 60000
    };

    // Measure initial memory if available
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Perform many calculations
    for (let i = 0; i < 10000; i++) {
      computeQuizScore(metrics);
    }
    
    // Force garbage collection if available
    if (global.gc) {
      global.gc();
    }
    
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be minimal (less than 1MB)
    if (performance.memory) {
      expect(memoryIncrease).toBeLessThan(1024 * 1024);
    }
  });
});