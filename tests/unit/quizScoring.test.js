/**
 * Unit tests for quiz scoring edge cases
 */

import { computeQuizScore } from '../../src/utils/quizScoring';

describe('computeQuizScore Edge Cases', () => {
  test('handles zero questions', () => {
    expect(() => computeQuizScore({
      totalQuestions: 0,
      correct: 0,
      wrong: 0,
      timeSpentMs: 0
    })).toThrow('Total questions must be positive');
  });

  test('handles negative time', () => {
    expect(() => computeQuizScore({
      totalQuestions: 5,
      correct: 3,
      wrong: 1,
      timeSpentMs: -1000
    })).toThrow('Time spent cannot be negative');
  });

  test('handles answers exceeding total questions', () => {
    expect(() => computeQuizScore({
      totalQuestions: 5,
      correct: 4,
      wrong: 3,
      timeSpentMs: 30000
    })).toThrow('Answered questions exceed total questions');
  });

  test('handles extremely long time (no speed bonus)', () => {
    const result = computeQuizScore({
      totalQuestions: 2,
      correct: 2,
      wrong: 0,
      timeSpentMs: 120000 // 2 minutes for 2 questions
    });
    
    expect(result.breakdown.speedBonus).toBe(0);
    expect(result.points).toBe(200); // Only accuracy score
  });

  test('handles perfect speed (maximum bonus)', () => {
    const result = computeQuizScore({
      totalQuestions: 1,
      correct: 1,
      wrong: 0,
      timeSpentMs: 0 // Instant answer
    });
    
    expect(result.breakdown.speedBonus).toBe(500);
    expect(result.points).toBe(600); // 100 + 500
  });

  test('handles all wrong answers', () => {
    const result = computeQuizScore({
      totalQuestions: 3,
      correct: 0,
      wrong: 3,
      timeSpentMs: 15000
    });
    
    expect(result.breakdown.accuracyScore).toBe(-150);
    expect(result.percentage).toBe(0);
  });

  test('handles missing metrics object', () => {
    expect(() => computeQuizScore(null)).toThrow('Quiz metrics are required');
    expect(() => computeQuizScore(undefined)).toThrow('Quiz metrics are required');
    expect(() => computeQuizScore('invalid')).toThrow('Quiz metrics are required');
  });
});