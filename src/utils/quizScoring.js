/**
 * Quiz scoring utility functions
 * Implements exact formulas from specification
 */

/**
 * Computes quiz score based on performance metrics
 * @param {Object} metrics - Quiz performance data
 * @param {number} metrics.totalQuestions - Total questions in quiz
 * @param {number} metrics.correct - Number of correct answers
 * @param {number} metrics.wrong - Number of wrong answers
 * @param {number} metrics.timeSpentMs - Time spent in milliseconds
 * @returns {Object} QuizScore with points, breakdown, and percentage
 */
export function computeQuizScore(metrics) {
  // Input validation
  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Quiz metrics are required');
  }

  const { totalQuestions, correct, wrong, timeSpentMs } = metrics;

  if (totalQuestions <= 0) {
    throw new Error('Total questions must be positive');
  }

  if (correct + wrong > totalQuestions) {
    throw new Error('Answered questions exceed total questions');
  }

  if (timeSpentMs < 0) {
    throw new Error('Time spent cannot be negative');
  }

  // Calculate accuracy score: (correct × 100) - (wrong × 50)
  const accuracyScore = (correct * 100) - (wrong * 50);

  // Calculate speed bonus
  const maxPossibleTime = totalQuestions * 10; // 10 seconds per question
  const actualTimeSeconds = timeSpentMs / 1000;
  const speedFactor = Math.max(0, (maxPossibleTime - actualTimeSeconds) / maxPossibleTime);
  const speedBonus = Math.round(speedFactor * 500);

  // Calculate final points and percentage
  const points = accuracyScore + speedBonus;
  const percentage = Math.round((correct / totalQuestions) * 100);

  return {
    points,
    breakdown: {
      accuracyScore,
      speedBonus,
      maxPossibleTime,
      speedFactor: Math.round(speedFactor * 100) / 100 // Round to 2 decimal places
    },
    percentage
  };
}