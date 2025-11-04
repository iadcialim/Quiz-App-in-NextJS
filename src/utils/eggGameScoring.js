/**
 * Egg game scoring utility functions
 * Implements exact formulas from specification
 */

/**
 * Computes egg game score based on performance metrics
 * @param {Object} metrics - Egg game performance data
 * @param {number} metrics.eggsDropped - Number of eggs that hit bottom
 * @param {number} metrics.eggsProduced - Total eggs spawned
 * @param {number} metrics.juggles - Number of successful bounces
 * @param {number} metrics.totalEggsIntroduced - Total eggs introduced to game
 * @returns {Object} EggGameScore with points and breakdown
 */
function computeEggGameScore(metrics) {
  // Input validation
  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Egg game metrics are required');
  }

  const { eggsDropped, eggsProduced, juggles, totalEggsIntroduced } = metrics;

  if (eggsDropped < 0 || eggsProduced < 0 || juggles < 0 || totalEggsIntroduced < 0) {
    throw new Error('All metrics must be non-negative');
  }

  if (eggsDropped > eggsProduced) {
    throw new Error('Dropped eggs cannot exceed produced eggs');
  }

  // Calculate bounce points: juggles × 10
  const bouncePoints = juggles * 10;

  // Calculate drop penalty: eggsDropped × 200
  const dropPenalty = eggsDropped * 200;

  // Calculate efficiency penalty: max(0, totalEggsIntroduced - 5) × 100
  const excessEggs = Math.max(0, totalEggsIntroduced - 5);
  const efficiencyPenalty = excessEggs * 100;

  // Calculate final points
  const points = bouncePoints - dropPenalty - efficiencyPenalty;

  return {
    points,
    breakdown: {
      bouncePoints,
      dropPenalty,
      efficiencyPenalty,
      excessEggs
    }
  };
}

// CommonJS export for Node.js
module.exports = { computeEggGameScore };