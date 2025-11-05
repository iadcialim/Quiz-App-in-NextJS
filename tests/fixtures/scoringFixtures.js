/**
 * Test fixtures for scoring calculations
 * Used by contract tests and unit tests
 */

// Quiz scoring test data
export const quizFixtures = {
  // Reference example from spec: 8 correct, 2 wrong, 40 seconds, 10 questions → 1000 points
  referenceExample: {
    input: {
      totalQuestions: 10,
      correct: 8,
      wrong: 2,
      timeSpentMs: 40000 // 40 seconds
    },
    expected: {
      points: 1000,
      breakdown: {
        accuracyScore: 700, // (8×100) - (2×50)
        speedBonus: 300,    // ((100-40)/100) × 500
        maxPossibleTime: 100, // 10 × 10 seconds
        speedFactor: 0.6    // (100-40)/100
      },
      percentage: 80 // 8/10 × 100
    }
  },

  // Edge cases
  perfectScore: {
    input: {
      totalQuestions: 5,
      correct: 5,
      wrong: 0,
      timeSpentMs: 25000 // 25 seconds (half time)
    },
    expected: {
      points: 750, // 500 + 250
      breakdown: {
        accuracyScore: 500,
        speedBonus: 250,
        maxPossibleTime: 50,
        speedFactor: 0.5
      },
      percentage: 100
    }
  },

  zeroCorrect: {
    input: {
      totalQuestions: 3,
      correct: 0,
      wrong: 3,
      timeSpentMs: 15000
    },
    expected: {
      points: 125, // -150 + 275
      breakdown: {
        accuracyScore: -150,
        speedBonus: 275,
        maxPossibleTime: 30,
        speedFactor: 0.5
      },
      percentage: 0
    }
  },

  timeExceeded: {
    input: {
      totalQuestions: 2,
      correct: 2,
      wrong: 0,
      timeSpentMs: 25000 // 25 seconds (exceeds 20s limit)
    },
    expected: {
      points: 200, // 200 + 0 (no speed bonus)
      breakdown: {
        accuracyScore: 200,
        speedBonus: 0,
        maxPossibleTime: 20,
        speedFactor: 0
      },
      percentage: 100
    }
  }
};

// Egg game scoring test data
export const eggGameFixtures = {
  // Reference example: 200 juggles, 1 dropped, 6 total eggs → 19,980 points
  referenceExample: {
    input: {
      eggsDropped: 1,
      eggsProduced: 201, // 200 successful + 1 dropped
      juggles: 200,
      totalEggsIntroduced: 6
    },
    expected: {
      points: 19980,
      breakdown: {
        bouncePoints: 20000,   // 200 × 100
        dropPenalty: 10,       // 1 × 10
        efficiencyPenalty: 10, // (6-5) × 10
        excessEggs: 1          // 6 - 5
      }
    }
  },

  // Optimal efficiency (≤5 eggs)
  optimalEfficiency: {
    input: {
      eggsDropped: 0,
      eggsProduced: 50,
      juggles: 50,
      totalEggsIntroduced: 5
    },
    expected: {
      points: 5000,
      breakdown: {
        bouncePoints: 5000,
        dropPenalty: 0,
        efficiencyPenalty: 0,
        excessEggs: 0
      }
    }
  },

  // Worst case scenario
  worstCase: {
    input: {
      eggsDropped: 10,
      eggsProduced: 10,
      juggles: 0,
      totalEggsIntroduced: 15
    },
    expected: {
      points: -200, // 0 - 100 - 100
      breakdown: {
        bouncePoints: 0,
        dropPenalty: 100,      // 10 × 10
        efficiencyPenalty: 100, // (15-5) × 10
        excessEggs: 10         // 15 - 5
      }
    }
  },

  // No game activity
  noActivity: {
    input: {
      eggsDropped: 0,
      eggsProduced: 0,
      juggles: 0,
      totalEggsIntroduced: 0
    },
    expected: {
      points: 0,
      breakdown: {
        bouncePoints: 0,
        dropPenalty: 0,
        efficiencyPenalty: 0,
        excessEggs: 0
      }
    }
  }
};

// Invalid input test cases
export const invalidInputs = {
  quiz: {
    negativeTime: {
      totalQuestions: 5,
      correct: 3,
      wrong: 1,
      timeSpentMs: -1000
    },
    exceedsTotal: {
      totalQuestions: 5,
      correct: 4,
      wrong: 3, // 4 + 3 > 5
      timeSpentMs: 30000
    },
    zeroQuestions: {
      totalQuestions: 0,
      correct: 0,
      wrong: 0,
      timeSpentMs: 0
    }
  },
  
  eggGame: {
    negativeValues: {
      eggsDropped: -1,
      eggsProduced: 10,
      juggles: 5,
      totalEggsIntroduced: 3
    },
    droppedExceedsProduced: {
      eggsDropped: 15,
      eggsProduced: 10,
      juggles: 5,
      totalEggsIntroduced: 8
    }
  }
};