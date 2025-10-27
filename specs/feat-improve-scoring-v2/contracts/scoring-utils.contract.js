/**
 * Scoring Utilities Contract
 * 
 * Defines the interface for quiz and game scoring calculations.
 * All functions are pure (no side effects) and deterministic.
 * 
 * @module scoring-utils.contract
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * @typedef {Object} QuizMetrics
 * @property {number} totalQuestions - Total number of questions in the quiz
 * @property {number} correct - Count of correct answers
 * @property {number} wrong - Count of incorrect answers
 * @property {number} timeTaken - Total time spent in seconds
 */

/**
 * @typedef {Object} QuizScore
 * @property {number} accuracyScore - Points from correct/wrong answers
 * @property {number} speedBonus - Bonus points for quick completion (0-500)
 * @property {number} finalScore - accuracyScore + speedBonus
 * @property {number} percentage - (correct / totalQuestions) × 100
 */

/**
 * @typedef {Object} GameMetrics
 * @property {number} juggles - Successful egg bounces (taps)
 * @property {number} drops - Eggs that hit the bottom
 * @property {number} eggsIntroduced - Total eggs spawned during game
 * @property {number} timePlayed - Game duration in seconds
 */

/**
 * @typedef {Object} GameScore
 * @property {number} bouncePoints - Points from successful juggles
 * @property {number} dropPenalty - Penalty for dropped eggs
 * @property {number} efficiencyPenalty - Penalty for excess eggs
 * @property {number} totalPenalty - dropPenalty + efficiencyPenalty
 * @property {number} finalScore - bouncePoints - totalPenalty
 */

// ============================================================================
// FUNCTION CONTRACTS
// ============================================================================

/**
 * Computes quiz score based on accuracy and speed
 * 
 * Formula:
 * - Accuracy Score = (correct × 100) - (wrong × 50)
 * - Max Possible Time = totalQuestions × 10 seconds
 * - Time Saved = maxPossibleTime - timeTaken
 * - Speed Factor = max(0, min(1, timeSaved / maxPossibleTime))
 * - Speed Bonus = speedFactor × 500
 * - Final Score = accuracyScore + speedBonus
 * - Percentage = (correct / totalQuestions) × 100
 * 
 * @param {QuizMetrics} metrics - Quiz performance metrics
 * @returns {QuizScore} Calculated quiz score with breakdown
 * 
 * @example
 * // Example from specification (8 correct, 2 wrong, 40s, 10 questions)
 * const score = computeQuizScore({
 *   totalQuestions: 10,
 *   correct: 8,
 *   wrong: 2,
 *   timeTaken: 40
 * });
 * // Expected: {accuracyScore: 700, speedBonus: 300, finalScore: 1000, percentage: 80}
 * 
 * @example
 * // Perfect speed run (all correct in 0 seconds)
 * const score = computeQuizScore({
 *   totalQuestions: 10,
 *   correct: 10,
 *   wrong: 0,
 *   timeTaken: 0
 * });
 * // Expected: {accuracyScore: 1000, speedBonus: 500, finalScore: 1500, percentage: 100}
 * 
 * @example
 * // Time exceeded (took longer than max time)
 * const score = computeQuizScore({
 *   totalQuestions: 10,
 *   correct: 5,
 *   wrong: 5,
 *   timeTaken: 150
 * });
 * // Expected: speedBonus = 0 (no bonus for slow completion)
 * 
 * @throws {Error} If metrics are invalid (negative values, wrong types)
 */
export function computeQuizScore(metrics) {
  // Implementation will be created in src/utils/scoring.js
  throw new Error('Not implemented - contract only');
}

/**
 * Computes game score based on juggles, drops, and efficiency
 * 
 * Formula:
 * - Bounce Points = juggles × 10
 * - Drop Penalty = drops × 200
 * - Excess Eggs = max(0, eggsIntroduced - 5)
 * - Efficiency Penalty = excessEggs × 100
 * - Total Penalty = dropPenalty + efficiencyPenalty
 * - Final Score = bouncePoints - totalPenalty
 * 
 * @param {GameMetrics} metrics - Game performance metrics
 * @returns {GameScore} Calculated game score with penalty breakdown
 * 
 * @example
 * // Example from specification (200 juggles, 1 drop, 6 eggs)
 * const score = computeGameScore({
 *   juggles: 200,
 *   drops: 1,
 *   eggsIntroduced: 6,
 *   timePlayed: 120
 * });
 * // Expected: {bouncePoints: 2000, dropPenalty: 200, efficiencyPenalty: 100, totalPenalty: 300, finalScore: 1700}
 * 
 * @example
 * // Perfect efficiency (5 eggs, no drops)
 * const score = computeGameScore({
 *   juggles: 50,
 *   drops: 0,
 *   eggsIntroduced: 5,
 *   timePlayed: 60
 * });
 * // Expected: {bouncePoints: 500, dropPenalty: 0, efficiencyPenalty: 0, totalPenalty: 0, finalScore: 500}
 * 
 * @example
 * // High penalty scenario (many drops, many eggs)
 * const score = computeGameScore({
 *   juggles: 10,
 *   drops: 5,
 *   eggsIntroduced: 15,
 *   timePlayed: 90
 * });
 * // Expected: negative finalScore due to high penalties
 * 
 * @throws {Error} If metrics are invalid (negative values, wrong types)
 */
export function computeGameScore(metrics) {
  // Implementation will be created in src/utils/scoring.js
  throw new Error('Not implemented - contract only');
}

// ============================================================================
// CONSTANTS CONTRACT
// ============================================================================

/**
 * Scoring constants used in calculations
 * 
 * @constant
 * @type {Object}
 * @property {Object} QUIZ - Quiz scoring weights
 * @property {number} QUIZ.CORRECT_WEIGHT - Points per correct answer (100)
 * @property {number} QUIZ.WRONG_PENALTY - Points deducted per wrong answer (50)
 * @property {number} QUIZ.MAX_TIME_PER_QUESTION - Seconds allowed per question (10)
 * @property {number} QUIZ.MAX_SPEED_BONUS - Maximum bonus for speed (500)
 * @property {Object} GAME - Game scoring weights
 * @property {number} GAME.BOUNCE_WEIGHT - Points per successful juggle (10)
 * @property {number} GAME.DROP_PENALTY - Points deducted per dropped egg (200)
 * @property {number} GAME.EFFICIENCY_PENALTY - Points deducted per excess egg (100)
 * @property {number} GAME.IDEAL_MIN_EGGS - Threshold for efficiency penalty (5)
 */
export const SCORING_CONSTANTS = {
  QUIZ: {
    CORRECT_WEIGHT: 100,
    WRONG_PENALTY: 50,
    MAX_TIME_PER_QUESTION: 10,
    MAX_SPEED_BONUS: 500
  },
  GAME: {
    BOUNCE_WEIGHT: 10,
    DROP_PENALTY: 200,
    EFFICIENCY_PENALTY: 100,
    IDEAL_MIN_EGGS: 5
  }
};

// ============================================================================
// CONTRACT TEST REQUIREMENTS
// ============================================================================

/**
 * Required Tests for computeQuizScore:
 * 
 * 1. Specification Example Test:
 *    - Input: {totalQuestions: 10, correct: 8, wrong: 2, timeTaken: 40}
 *    - Expected: {accuracyScore: 700, speedBonus: 300, finalScore: 1000, percentage: 80}
 * 
 * 2. Perfect Speed Run:
 *    - Input: {totalQuestions: 10, correct: 10, wrong: 0, timeTaken: 0}
 *    - Expected: {accuracyScore: 1000, speedBonus: 500, finalScore: 1500, percentage: 100}
 * 
 * 3. Zero Correct:
 *    - Input: {totalQuestions: 10, correct: 0, wrong: 10, timeTaken: 50}
 *    - Expected: accuracyScore = -500 (negative allowed)
 * 
 * 4. Time Exceeded:
 *    - Input: {totalQuestions: 10, correct: 5, wrong: 5, timeTaken: 150}
 *    - Expected: speedBonus = 0 (time saved is negative)
 * 
 * 5. Division by Zero Protection:
 *    - Input: {totalQuestions: 0, correct: 0, wrong: 0, timeTaken: 0}
 *    - Expected: Handle gracefully without throwing
 * 
 * Required Tests for computeGameScore:
 * 
 * 1. Specification Example Test:
 *    - Input: {juggles: 200, drops: 1, eggsIntroduced: 6, timePlayed: 120}
 *    - Expected: {bouncePoints: 2000, dropPenalty: 200, efficiencyPenalty: 100, totalPenalty: 300, finalScore: 1700}
 * 
 * 2. Perfect Efficiency (5 eggs):
 *    - Input: {juggles: 50, drops: 0, eggsIntroduced: 5, timePlayed: 60}
 *    - Expected: {bouncePoints: 500, dropPenalty: 0, efficiencyPenalty: 0, totalPenalty: 0, finalScore: 500}
 * 
 * 3. Exactly 5 Eggs (boundary):
 *    - Input: {juggles: 10, drops: 2, eggsIntroduced: 5, timePlayed: 30}
 *    - Expected: efficiencyPenalty = 0 (no penalty at threshold)
 * 
 * 4. High Penalty Scenario:
 *    - Input: {juggles: 10, drops: 5, eggsIntroduced: 15, timePlayed: 90}
 *    - Expected: negative finalScore
 * 
 * 5. Zero Activity:
 *    - Input: {juggles: 0, drops: 0, eggsIntroduced: 0, timePlayed: 0}
 *    - Expected: all scores = 0
 */
