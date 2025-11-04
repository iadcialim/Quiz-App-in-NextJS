const { computeQuizScore } = require('../src/utils/quizScoring');
const { computeEggGameScore } = require('../src/utils/eggGameScoring');

console.log('=== INTEGRATION VALIDATION ===\n');

// Simulate complete quiz flow
function simulateQuizFlow() {
  console.log('Simulating complete quiz flow...');
  
  // Quiz completion
  const quizMetrics = {
    totalQuestions: 10,
    correct: 8,
    wrong: 2,
    timeSpentMs: 75000
  };
  
  const quizResult = computeQuizScore(quizMetrics);
  console.log(`Quiz completed: ${quizResult.points} points`);
  
  // Egg game completion
  const eggMetrics = {
    eggsDropped: 2,
    eggsProduced: 12,
    juggles: 45,
    totalEggsIntroduced: 7
  };
  
  const eggResult = computeEggGameScore(eggMetrics);
  console.log(`Egg game completed: ${eggResult.points} points`);
  
  // Combined scoring
  const totalScore = quizResult.points + eggResult.points;
  console.log(`Total combined score: ${totalScore} points`);
  
  const isValid = quizResult.points > 0 && 
                  eggResult.points !== undefined && 
                  totalScore > 0;
  
  console.log(`Quiz flow integration: ${isValid ? 'PASS ✅' : 'FAIL ❌'}`);
  return isValid;
}

// Simulate context state management
function simulateContextIntegration() {
  console.log('\nSimulating context state management...');
  
  // Mock context state
  const mockState = {
    quizMetrics: { totalQuestions: 5, correct: 4, wrong: 1, timeSpentMs: 30000 },
    eggMetrics: { eggsDropped: 1, eggsProduced: 8, juggles: 25, totalEggsIntroduced: 6 },
    scores: null
  };
  
  // Simulate score calculation
  mockState.scores = {
    quiz: computeQuizScore(mockState.quizMetrics),
    eggGame: computeEggGameScore(mockState.eggMetrics)
  };
  
  const isValid = mockState.scores.quiz && 
                  mockState.scores.eggGame && 
                  typeof mockState.scores.quiz.points === 'number';
  
  console.log(`Context integration: ${isValid ? 'PASS ✅' : 'FAIL ❌'}`);
  return isValid;
}

const results = [
  simulateQuizFlow(),
  simulateContextIntegration()
];

const allPassed = results.every(Boolean);
console.log(`\nIntegration validation: ${allPassed ? 'PASS ✅' : 'FAIL ❌'}`);