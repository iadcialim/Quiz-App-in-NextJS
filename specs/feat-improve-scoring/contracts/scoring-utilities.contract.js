/**
 * Contract tests for scoring utility functions
 * These tests MUST FAIL until implementation is complete
 */

import { computeQuizScore } from '../../../src/utils/quizScoring';
import { computeEggGameScore } from '../../../src/utils/eggGameScoring';
import { quizFixtures, eggGameFixtures, invalidInputs } from '../../../tests/fixtures/scoringFixtures';

describe('computeQuizScore Contract', () => {
  test('reference example: 8 correct, 2 wrong, 40 seconds, 10 questions → 1000 points', () => {
    const result = computeQuizScore(quizFixtures.referenceExample.input);
    expect(result).toEqual(quizFixtures.referenceExample.expected);
  });

  test('perfect score calculation', () => {
    const result = computeQuizScore(quizFixtures.perfectScore.input);
    expect(result).toEqual(quizFixtures.perfectScore.expected);
  });

  test('zero correct answers', () => {
    const result = computeQuizScore(quizFixtures.zeroCorrect.input);
    expect(result).toEqual(quizFixtures.zeroCorrect.expected);
  });

  test('time exceeded - no speed bonus', () => {
    const result = computeQuizScore(quizFixtures.timeExceeded.input);
    expect(result).toEqual(quizFixtures.timeExceeded.expected);
  });

  test('validates input parameters', () => {
    expect(() => computeQuizScore(invalidInputs.quiz.negativeTime)).toThrow();
    expect(() => computeQuizScore(invalidInputs.quiz.exceedsTotal)).toThrow();
    expect(() => computeQuizScore(invalidInputs.quiz.zeroQuestions)).toThrow();
  });
});

describe('computeEggGameScore Contract', () => {
  test('reference example: 200 juggles, 1 dropped, 6 total eggs → 1700 points', () => {
    const result = computeEggGameScore(eggGameFixtures.referenceExample.input);
    expect(result).toEqual(eggGameFixtures.referenceExample.expected);
  });

  test('optimal efficiency (≤5 eggs)', () => {
    const result = computeEggGameScore(eggGameFixtures.optimalEfficiency.input);
    expect(result).toEqual(eggGameFixtures.optimalEfficiency.expected);
  });

  test('worst case scenario', () => {
    const result = computeEggGameScore(eggGameFixtures.worstCase.input);
    expect(result).toEqual(eggGameFixtures.worstCase.expected);
  });

  test('no game activity', () => {
    const result = computeEggGameScore(eggGameFixtures.noActivity.input);
    expect(result).toEqual(eggGameFixtures.noActivity.expected);
  });

  test('validates input parameters', () => {
    expect(() => computeEggGameScore(invalidInputs.eggGame.negativeValues)).toThrow();
    expect(() => computeEggGameScore(invalidInputs.eggGame.droppedExceedsProduced)).toThrow();
  });
});