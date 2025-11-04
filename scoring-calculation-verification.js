// Manual verification of scoring calculations
const { computeQuizScore } = require('./src/utils/quizScoring.js');
const { computeEggGameScore } = require('./src/utils/eggGameScoring.js');

console.log('=== SCORING CALCULATION VERIFICATION ===\n');

// Manual calculation verification function
function verifyCalculation(testName, actualResult, expectedBreakdown, expectedTotal) {
  console.log(`${testName}:`);
  console.log('Expected breakdown:', expectedBreakdown);
  console.log('Actual breakdown:', actualResult.breakdown);
  console.log(`Expected total: ${expectedTotal}`);
  console.log(`Actual total: ${actualResult.points}`);
  
  // Verify each component
  let allMatch = true;
  for (const [key, expectedValue] of Object.entries(expectedBreakdown)) {
    if (actualResult.breakdown[key] !== expectedValue) {
      console.log(`❌ ${key}: expected ${expectedValue}, got ${actualResult.breakdown[key]}`);
      allMatch = false;
    } else {
      console.log(`✅ ${key}: ${expectedValue}`);
    }
  }
  
  if (actualResult.points !== expectedTotal) {
    console.log(`❌ Total: expected ${expectedTotal}, got ${actualResult.points}`);
    allMatch = false;
  } else {
    console.log(`✅ Total: ${expectedTotal}`);
  }
  
  console.log(`Status: ${allMatch ? 'PASS ✅' : 'FAIL ❌'}\n`);
  return allMatch;
}

let verificationResults = [];

// Test 1: Quiz Scoring Reference Example
console.log('1. QUIZ SCORING REFERENCE EXAMPLE');
console.log('Input: 8 correct, 2 wrong, 40 seconds, 10 questions');
console.log('Manual calculation:');
console.log('- Accuracy Score: (8 × 100) - (2 × 50) = 800 - 100 = 700');
console.log('- Max Possible Time: 10 × 10 = 100 seconds');
console.log('- Speed Factor: (100 - 40) / 100 = 60/100 = 0.6');
console.log('- Speed Bonus: 0.6 × 500 = 300');
console.log('- Total Points: 700 + 300 = 1000');
console.log('- Percentage: (8/10) × 100 = 80%\n');

const quizResult1 = computeQuizScore({
  totalQuestions: 10,
  correct: 8,
  wrong: 2,
  timeSpentMs: 40000
});

verificationResults.push(verifyCalculation(
  'Quiz Reference Example',
  quizResult1,
  { accuracyScore: 700, speedBonus: 300, maxPossibleTime: 100, speedFactor: 0.6 },
  1000
));

// Test 2: Egg Game Scoring Reference Example
console.log('2. EGG GAME SCORING REFERENCE EXAMPLE');
console.log('Input: 200 juggles, 1 dropped, 201 produced, 6 total eggs');
console.log('Manual calculation:');
console.log('- Bounce Points: 200 × 10 = 2000');
console.log('- Drop Penalty: 1 × 200 = 200');
console.log('- Excess Eggs: max(0, 6 - 5) = 1');
console.log('- Efficiency Penalty: 1 × 100 = 100');
console.log('- Total Points: 2000 - 200 - 100 = 1700\n');

const eggResult1 = computeEggGameScore({
  eggsDropped: 1,
  eggsProduced: 201,
  juggles: 200,
  totalEggsIntroduced: 6
});

verificationResults.push(verifyCalculation(
  'Egg Game Reference Example',
  eggResult1,
  { bouncePoints: 2000, dropPenalty: 200, efficiencyPenalty: 100, excessEggs: 1 },
  1700
));

// Test 3: Perfect Quiz Score
console.log('3. PERFECT QUIZ SCORE');
console.log('Input: 5 correct, 0 wrong, 0 seconds, 5 questions');
console.log('Manual calculation:');
console.log('- Accuracy Score: (5 × 100) - (0 × 50) = 500');
console.log('- Speed Factor: (50 - 0) / 50 = 1.0');
console.log('- Speed Bonus: 1.0 × 500 = 500');
console.log('- Total Points: 500 + 500 = 1000\n');

const quizResult2 = computeQuizScore({
  totalQuestions: 5,
  correct: 5,
  wrong: 0,
  timeSpentMs: 0
});

verificationResults.push(verifyCalculation(
  'Perfect Quiz Score',
  quizResult2,
  { accuracyScore: 500, speedBonus: 500, maxPossibleTime: 50, speedFactor: 1.0 },
  1000
));

// Test 4: Optimal Egg Game Efficiency
console.log('4. OPTIMAL EGG GAME EFFICIENCY');
console.log('Input: 50 juggles, 0 dropped, 50 produced, 5 total eggs');
console.log('Manual calculation:');
console.log('- Bounce Points: 50 × 10 = 500');
console.log('- Drop Penalty: 0 × 200 = 0');
console.log('- Excess Eggs: max(0, 5 - 5) = 0');
console.log('- Efficiency Penalty: 0 × 100 = 0');
console.log('- Total Points: 500 - 0 - 0 = 500\n');

const eggResult2 = computeEggGameScore({
  eggsDropped: 0,
  eggsProduced: 50,
  juggles: 50,
  totalEggsIntroduced: 5
});

verificationResults.push(verifyCalculation(
  'Optimal Egg Game Efficiency',
  eggResult2,
  { bouncePoints: 500, dropPenalty: 0, efficiencyPenalty: 0, excessEggs: 0 },
  500
));

// Test 5: Time Exceeded (No Speed Bonus)
console.log('5. TIME EXCEEDED SCENARIO');
console.log('Input: 3 correct, 0 wrong, 120 seconds, 3 questions');
console.log('Manual calculation:');
console.log('- Accuracy Score: (3 × 100) - (0 × 50) = 300');
console.log('- Max Possible Time: 3 × 10 = 30 seconds');
console.log('- Speed Factor: max(0, (30 - 120) / 30) = max(0, -3) = 0');
console.log('- Speed Bonus: 0 × 500 = 0');
console.log('- Total Points: 300 + 0 = 300\n');

const quizResult3 = computeQuizScore({
  totalQuestions: 3,
  correct: 3,
  wrong: 0,
  timeSpentMs: 120000
});

verificationResults.push(verifyCalculation(
  'Time Exceeded Scenario',
  quizResult3,
  { accuracyScore: 300, speedBonus: 0, maxPossibleTime: 30, speedFactor: 0 },
  300
));

// Summary
const passedVerifications = verificationResults.filter(Boolean).length;
const totalVerifications = verificationResults.length;

console.log('=== SCORING VERIFICATION SUMMARY ===');
console.log(`Verifications passed: ${passedVerifications}/${totalVerifications}`);
console.log(`Success rate: ${Math.round((passedVerifications/totalVerifications) * 100)}%`);

if (passedVerifications === totalVerifications) {
  console.log('🎯 All scoring calculations VERIFIED!');
  console.log('✅ Formulas implemented correctly');
  console.log('✅ Manual calculations match implementation');
  console.log('✅ Edge cases handled properly');
} else {
  console.log('⚠️  Scoring calculation issues detected');
}