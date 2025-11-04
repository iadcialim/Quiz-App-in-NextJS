/**
 * Unit tests for egg game scoring edge cases
 */

import { computeEggGameScore } from '../../src/utils/eggGameScoring';

describe('computeEggGameScore Edge Cases', () => {
  test('handles negative values', () => {
    expect(() => computeEggGameScore({
      eggsDropped: -1,
      eggsProduced: 10,
      juggles: 5,
      totalEggsIntroduced: 3
    })).toThrow('All metrics must be non-negative');
  });

  test('handles dropped eggs exceeding produced', () => {
    expect(() => computeEggGameScore({
      eggsDropped: 15,
      eggsProduced: 10,
      juggles: 5,
      totalEggsIntroduced: 8
    })).toThrow('Dropped eggs cannot exceed produced eggs');
  });

  test('handles zero activity', () => {
    const result = computeEggGameScore({
      eggsDropped: 0,
      eggsProduced: 0,
      juggles: 0,
      totalEggsIntroduced: 0
    });
    
    expect(result.points).toBe(0);
    expect(result.breakdown.bouncePoints).toBe(0);
    expect(result.breakdown.dropPenalty).toBe(0);
    expect(result.breakdown.efficiencyPenalty).toBe(0);
  });

  test('handles maximum efficiency (exactly 5 eggs)', () => {
    const result = computeEggGameScore({
      eggsDropped: 0,
      eggsProduced: 100,
      juggles: 100,
      totalEggsIntroduced: 5
    });
    
    expect(result.breakdown.efficiencyPenalty).toBe(0);
    expect(result.breakdown.excessEggs).toBe(0);
    expect(result.points).toBe(1000); // 100 * 10
  });

  test('handles extreme inefficiency', () => {
    const result = computeEggGameScore({
      eggsDropped: 50,
      eggsProduced: 50,
      juggles: 0,
      totalEggsIntroduced: 100
    });
    
    expect(result.breakdown.bouncePoints).toBe(0);
    expect(result.breakdown.dropPenalty).toBe(10000); // 50 * 200
    expect(result.breakdown.efficiencyPenalty).toBe(9500); // (100-5) * 100
    expect(result.points).toBe(-19500);
  });

  test('handles missing metrics object', () => {
    expect(() => computeEggGameScore(null)).toThrow('Egg game metrics are required');
    expect(() => computeEggGameScore(undefined)).toThrow('Egg game metrics are required');
    expect(() => computeEggGameScore('invalid')).toThrow('Egg game metrics are required');
  });

  test('handles large numbers', () => {
    const result = computeEggGameScore({
      eggsDropped: 1000,
      eggsProduced: 10000,
      juggles: 9000,
      totalEggsIntroduced: 50
    });
    
    expect(result.breakdown.bouncePoints).toBe(90000);
    expect(result.breakdown.dropPenalty).toBe(200000);
    expect(result.breakdown.efficiencyPenalty).toBe(4500);
    expect(result.points).toBe(-114500);
  });
});