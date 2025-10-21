/**
 * Contract: Scoring Utilities
 * Describes expected function signatures and return shapes for scoring utils.
 */

export const ScoreUtilsContract = {
  computeQuizScore: {
    signature: '(metrics: { totalQuestions, correct, wrong, timeSpentMs }) => { points, breakdown, percentage }',
    description: 'Compute quiz points and provide breakdown; must be pure and deterministic.'
  },

  computeEggGameScore: {
    signature: '(metrics: { eggsDropped, eggsProduced, juggles, timeSpentMs }) => { points, breakdown }',
    description: 'Compute egg-juggling points and return breakdown; pure and deterministic.'
  }
};
