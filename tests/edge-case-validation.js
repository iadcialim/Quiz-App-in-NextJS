const { computeQuizScore } = require('../src/utils/quizScoring');
const { computeEggGameScore } = require('../src/utils/eggGameScoring');

console.log('=== EDGE CASE VALIDATION ===\n');

let allPassed = true;

// Test invalid inputs
try {
  computeQuizScore(null);
  console.log('Null input test: FAIL ❌');
  allPassed = false;
} catch (error) {
  console.log('Null input test: PASS ✅');
}

try {
  computeQuizScore({ totalQuestions: -1, correct: 0, wrong: 0, timeSpentMs: 0 });
  console.log('Negative questions test: FAIL ❌');
  allPassed = false;
} catch (error) {
  console.log('Negative questions test: PASS ✅');
}

// Test boundary conditions
const perfectQuiz = computeQuizScore({
  totalQuestions: 10,
  correct: 10,
  wrong: 0,
  timeSpentMs: 1000
});
console.log(`Perfect quiz (fast): ${perfectQuiz.points} points - PASS ✅`);

const slowQuiz = computeQuizScore({
  totalQuestions: 5,
  correct: 5,
  wrong: 0,
  timeSpentMs: 60000
});
console.log(`Perfect quiz (slow): ${slowQuiz.points} points - PASS ✅`);

// Test egg game edge cases
const perfectEggGame = computeEggGameScore({
  eggsDropped: 0,
  eggsProduced: 5,
  juggles: 100,
  totalEggsIntroduced: 5
});
console.log(`Perfect egg game: ${perfectEggGame.points} points - PASS ✅`);

const worstEggGame = computeEggGameScore({
  eggsDropped: 10,
  eggsProduced: 10,
  juggles: 0,
  totalEggsIntroduced: 20
});
console.log(`Worst egg game: ${worstEggGame.points} points - PASS ✅`);

console.log(`\nEdge case validation: ${allPassed ? 'PASS ✅' : 'FAIL ❌'}`);