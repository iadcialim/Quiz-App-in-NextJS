/**
 * Contract Tests: Scoring Utilities
 * 
 * These tests validate the scoring utility function contracts
 * and ensure formula accuracy according to reference specifications.
 */

import { computeQuizScore, computeEggGameScore } from '../../src/utils/quizScoring';

describe('Quiz Scoring Contract', () => {
  test('computeQuizScore should match reference example calculation', () => {
    // Reference example from NEW-QUIZ-SCORING.md
    const metrics = {
      totalQuestions: 10,
      correct: 8,
      wrong: 2,
      timeSpentMs: 40000 // 40 seconds
    };

    const result = computeQuizScore(metrics);

    // Expected values from reference calculation
    expect(result.points).toBe(1000);
    expect(result.breakdown.accuracyScore).toBe(700); // 8×100 - 2×50
    expect(result.breakdown.speedBonus).toBe(300);    // 0.6 × 500
    expect(result.breakdown.maxPossibleTime).toBe(100); // 10×10 seconds
    expect(result.breakdown.speedFactor).toBe(0.6);   // (100-40)/100
    expect(result.percentage).toBe(80);               // 8/10 × 100
  });

  test('computeQuizScore should handle edge cases', () => {
    // Zero correct answers
    const zeroCorrect = {
      totalQuestions: 5,
      correct: 0,
      wrong: 5,
      timeSpentMs: 25000
    };

    const result1 = computeQuizScore(zeroCorrect);
    expect(result1.breakdown.accuracyScore).toBe(-250); // 0×100 - 5×50
    expect(result1.percentage).toBe(0);

    // Perfect score, fast completion
    const perfect = {
      totalQuestions: 5,
      correct: 5,
      wrong: 0,
      timeSpentMs: 10000 // 10 seconds
    };

    const result2 = computeQuizScore(perfect);
    expect(result2.breakdown.accuracyScore).toBe(500);  // 5×100 - 0×50
    expect(result2.breakdown.speedFactor).toBe(0.8);    // (50-10)/50
    expect(result2.percentage).toBe(100);
  });

  test('computeQuizScore should validate input parameters', () => {
    const invalidMetrics = {
      totalQuestions: -1,
      correct: 5,
      wrong: 2,
      timeSpentMs: -1000
    };

    expect(() => computeQuizScore(invalidMetrics)).toThrow();
  });
});

describe('Egg Game Scoring Contract', () => {
  test('computeEggGameScore should match reference example calculation', () => {
    // Reference example from NEW-EGG-JUGGLING-SCORING.md
    const metrics = {
      juggles: 200,
      eggsDropped: 1,
      eggsProduced: 201,
      totalEggsIntroduced: 6
    };

    const result = computeEggGameScore(metrics);

    // Expected values from reference calculation
    expect(result.points).toBe(1700);                    // 2000 - 200 - 100
    expect(result.breakdown.bouncePoints).toBe(2000);    // 200×10
    expect(result.breakdown.dropPenalty).toBe(200);      // 1×200
    expect(result.breakdown.efficiencyPenalty).toBe(100); // (6-5)×100
    expect(result.breakdown.excessEggs).toBe(1);         // 6-5
  });

  test('computeEggGameScore should handle optimal efficiency (≤5 eggs)', () => {
    const optimalMetrics = {
      juggles: 50,
      eggsDropped: 0,
      eggsProduced: 50,
      totalEggsIntroduced: 5
    };

    const result = computeEggGameScore(optimalMetrics);
    expect(result.breakdown.efficiencyPenalty).toBe(0);  // No penalty for ≤5 eggs
    expect(result.breakdown.excessEggs).toBe(0);
    expect(result.points).toBe(500); // 50×10 - 0×200 - 0×100
  });

  test('computeEggGameScore should handle edge cases', () => {
    // All eggs dropped, high excess
    const worstCase = {
      juggles: 0,
      eggsDropped: 20,
      eggsProduced: 20,
      totalEggsIntroduced: 20
    };

    const result = computeEggGameScore(worstCase);
    expect(result.breakdown.bouncePoints).toBe(0);       // 0×10
    expect(result.breakdown.dropPenalty).toBe(4000);     // 20×200
    expect(result.breakdown.efficiencyPenalty).toBe(1500); // (20-5)×100
    expect(result.points).toBe(-5500);                   // Negative score possible
  });

  test('computeEggGameScore should validate input parameters', () => {
    const invalidMetrics = {
      juggles: -1,
      eggsDropped: 5,
      eggsProduced: 3, // Less than dropped
      totalEggsIntroduced: -1
    };

    expect(() => computeEggGameScore(invalidMetrics)).toThrow();
  });
});

describe('Scoring Utility Integration', () => {
  test('both scoring functions should be available for import', () => {
    expect(typeof computeQuizScore).toBe('function');
    expect(typeof computeEggGameScore).toBe('function');
  });

  test('scoring functions should return consistent object structures', () => {
    const quizMetrics = {
      totalQuestions: 5,
      correct: 3,
      wrong: 2,
      timeSpentMs: 30000
    };

    const eggMetrics = {
      juggles: 10,
      eggsDropped: 1,
      eggsProduced: 11,
      totalEggsIntroduced: 6
    };

    const quizResult = computeQuizScore(quizMetrics);
    const eggResult = computeEggGameScore(eggMetrics);

    // Verify required properties exist
    expect(quizResult).toHaveProperty('points');
    expect(quizResult).toHaveProperty('breakdown');
    expect(quizResult).toHaveProperty('percentage');

    expect(eggResult).toHaveProperty('points');
    expect(eggResult).toHaveProperty('breakdown');

    // Verify breakdown structures
    expect(quizResult.breakdown).toHaveProperty('accuracyScore');
    expect(quizResult.breakdown).toHaveProperty('speedBonus');
    expect(quizResult.breakdown).toHaveProperty('maxPossibleTime');
    expect(quizResult.breakdown).toHaveProperty('speedFactor');

    expect(eggResult.breakdown).toHaveProperty('bouncePoints');
    expect(eggResult.breakdown).toHaveProperty('dropPenalty');
    expect(eggResult.breakdown).toHaveProperty('efficiencyPenalty');
    expect(eggResult.breakdown).toHaveProperty('excessEggs');
  });
});