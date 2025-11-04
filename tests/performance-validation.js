const { computeQuizScore } = require('../src/utils/quizScoring');
const { computeEggGameScore } = require('../src/utils/eggGameScoring');

console.log('=== PERFORMANCE VALIDATION ===\n');

function measurePerformance(fn, iterations = 1000) {
  const start = process.hrtime.bigint();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = process.hrtime.bigint();
  return Number(end - start) / 1000000; // Convert to milliseconds
}

// Test quiz scoring performance
const quizMetrics = {
  totalQuestions: 20,
  correct: 15,
  wrong: 3,
  timeSpentMs: 45000
};

const quizTime = measurePerformance(() => computeQuizScore(quizMetrics));
console.log(`Quiz scoring: ${quizTime.toFixed(2)}ms for 1000 iterations`);
console.log(`Average per call: ${(quizTime / 1000).toFixed(4)}ms`);
console.log(`Quiz performance: ${quizTime < 100 ? 'PASS ✅' : 'FAIL ❌'}`);

// Test egg game scoring performance
const eggMetrics = {
  eggsDropped: 3,
  eggsProduced: 15,
  juggles: 50,
  totalEggsIntroduced: 8
};

const eggTime = measurePerformance(() => computeEggGameScore(eggMetrics));
console.log(`\nEgg game scoring: ${eggTime.toFixed(2)}ms for 1000 iterations`);
console.log(`Average per call: ${(eggTime / 1000).toFixed(4)}ms`);
console.log(`Egg game performance: ${eggTime < 100 ? 'PASS ✅' : 'FAIL ❌'}`);

const overallPass = quizTime < 100 && eggTime < 100;
console.log(`\nPerformance validation: ${overallPass ? 'PASS ✅' : 'FAIL ❌'}`);