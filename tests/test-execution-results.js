// Test execution script for scoring utilities
const { computeQuizScore } = require('../src/utils/quizScoring.js');
const { computeEggGameScore } = require('../src/utils/eggGameScoring.js');

console.log('=== CONTRACT TEST EXECUTION ===\n');

// Test 1: Quiz scoring reference example
console.log('TEST 1: Quiz Scoring Reference Example');
try {
  const quizResult = computeQuizScore({
    totalQuestions: 10,
    correct: 8,
    wrong: 2,
    timeSpentMs: 40000
  });
  
  console.log('Expected: 1000 points');
  console.log('Actual:', quizResult.points);
  console.log('Accuracy Score:', quizResult.breakdown.accuracyScore, '(expected: 700)');
  console.log('Speed Bonus:', quizResult.breakdown.speedBonus, '(expected: 300)');
  console.log('Status:', quizResult.points === 1000 ? 'PASS ✅' : 'FAIL ❌');
} catch (error) {
  console.log('ERROR:', error.message);
  console.log('Status: FAIL ❌');
}

console.log('\n---\n');

// Test 2: Egg game scoring reference example
console.log('TEST 2: Egg Game Scoring Reference Example');
try {
  const eggResult = computeEggGameScore({
    eggsDropped: 1,
    eggsProduced: 201,
    juggles: 200,
    totalEggsIntroduced: 6
  });
  
  console.log('Expected: 1700 points');
  console.log('Actual:', eggResult.points);
  console.log('Bounce Points:', eggResult.breakdown.bouncePoints, '(expected: 2000)');
  console.log('Drop Penalty:', eggResult.breakdown.dropPenalty, '(expected: 200)');
  console.log('Efficiency Penalty:', eggResult.breakdown.efficiencyPenalty, '(expected: 100)');
  console.log('Status:', eggResult.points === 1700 ? 'PASS ✅' : 'FAIL ❌');
} catch (error) {
  console.log('ERROR:', error.message);
  console.log('Status: FAIL ❌');
}

// Test 3: Edge cases
console.log('\n---\n');
console.log('TEST 3: Edge Cases');

// Perfect score test
try {
  const perfectResult = computeQuizScore({
    totalQuestions: 5,
    correct: 5,
    wrong: 0,
    timeSpentMs: 0
  });
  console.log('Perfect Score Test: PASS ✅');
} catch (error) {
  console.log('Perfect Score Test: FAIL ❌', error.message);
}

// Zero activity egg game
try {
  const zeroResult = computeEggGameScore({
    eggsDropped: 0,
    eggsProduced: 0,
    juggles: 0,
    totalEggsIntroduced: 0
  });
  console.log('Zero Activity Test: PASS ✅');
} catch (error) {
  console.log('Zero Activity Test: FAIL ❌', error.message);
}

console.log('\n=== TEST EXECUTION COMPLETE ===');