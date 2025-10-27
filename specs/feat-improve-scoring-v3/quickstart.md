# Quickstart Guide: Improve Quiz Results Scoring v3

**Feature**: Enhanced quiz results scoring with new formulas  
**Date**: 2024-12-19  
**Estimated Time**: 30 minutes

## Prerequisites

- Node.js 18+ installed
- Quiz App repository cloned and dependencies installed
- Basic familiarity with React and Next.js

## Quick Validation Steps

### 1. Install and Setup (2 minutes)

```bash
# Navigate to project root
cd Quiz-App-in-NextJS

# Install dependencies (if not already done)
npm install

# Verify current branch
git branch
# Should show: * feat-improve-scoring-v3
```

### 2. Run Contract Tests (5 minutes)

```bash
# Run scoring utility contract tests
npm test -- --testPathPattern=scoring-utilities.contract

# Run Results component contract tests  
npm test -- --testPathPattern=results-component.contract

# Expected: All tests should FAIL (no implementation yet)
# This confirms contracts are properly defined
```

### 3. Verify Current Results Component (3 minutes)

```bash
# Start development server
npm run dev

# Navigate to http://localhost:3000
# Complete a quiz to reach Results page
# Observe current behavior:
# - Title shows "Quiz Result" (will change to "Your Score")
# - Shows legacy text "You scored X out of Y possible points" (will be removed)
# - Basic scoring without detailed breakdown (will be enhanced)
```

### 4. Test Scoring Formula Calculations (10 minutes)

Create a temporary test file to validate formulas:

```javascript
// test-formulas.js (temporary file)

// Quiz scoring test (from reference example)
const quizMetrics = {
  totalQuestions: 10,
  correct: 8,
  wrong: 2,
  timeSpentMs: 40000 // 40 seconds
};

// Expected results:
// Accuracy Score: (8 × 100) - (2 × 50) = 700
// Max Possible Time: 10 × 10 = 100 seconds
// Speed Factor: (100 - 40) / 100 = 0.6
// Speed Bonus: 0.6 × 500 = 300
// Final Score: 700 + 300 = 1000

console.log('Quiz Formula Test:');
console.log('Expected Final Score: 1000');
console.log('Expected Accuracy Score: 700');
console.log('Expected Speed Bonus: 300');

// Egg game scoring test (from reference example)
const eggMetrics = {
  juggles: 200,
  eggsDropped: 1,
  eggsProduced: 201,
  totalEggsIntroduced: 6
};

// Expected results:
// Bounce Points: 200 × 10 = 2000
// Drop Penalty: 1 × 200 = 200
// Efficiency Penalty: (6 - 5) × 100 = 100
// Final Score: 2000 - 200 - 100 = 1700

console.log('\nEgg Game Formula Test:');
console.log('Expected Final Score: 1700');
console.log('Expected Bounce Points: 2000');
console.log('Expected Drop Penalty: 200');
console.log('Expected Efficiency Penalty: 100');
```

Run the test:
```bash
node test-formulas.js
rm test-formulas.js  # Clean up
```

### 5. Verify UI Requirements (5 minutes)

Check current Results component structure:

```bash
# View current Results component
cat src/components/Results.jsx

# Look for:
# - Current title text (should be "Quiz Result")
# - Legacy scoring text (should contain "You scored")
# - Current card structure (should be basic)
# - Section organization (should be single section)
```

### 6. Test Integration Points (5 minutes)

```bash
# Check PointsContext structure
cat src/context/PointsContext.js

# Look for:
# - Current scoring calculation logic
# - Available quiz metrics
# - Egg game integration points
# - State management patterns

# Check existing utility patterns
ls src/utils/
# Note: New scoring utilities will be added here
```

## Expected Outcomes

After running this quickstart, you should have:

✅ **Contract Tests Failing**: Confirms proper test setup  
✅ **Current Behavior Documented**: Baseline for comparison  
✅ **Formula Validation**: Manual calculation verification  
✅ **Integration Points Identified**: Clear implementation path  
✅ **Development Environment Ready**: All dependencies working

## Next Steps

1. **Implement Scoring Utilities**: Create `src/utils/quizScoring.js` and `src/utils/eggGameScoring.js`
2. **Enhance Results Component**: Add new sections and card layout
3. **Update PointsContext**: Integrate new scoring calculations
4. **Run Tests**: Verify contract compliance
5. **Manual Testing**: Complete quiz flow validation

## Troubleshooting

### Tests Not Running
```bash
# Check Jest configuration
cat jest.config.js

# Verify test setup
cat jest.setup.js

# Install missing dependencies
npm install --save-dev @testing-library/jest-dom
```

### Development Server Issues
```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

### Formula Calculation Errors
- Double-check reference examples in `.specify/reference/improve-scoring-v3/`
- Verify time conversion (milliseconds to seconds)
- Ensure integer arithmetic for point calculations

## Success Criteria

This quickstart is complete when:

1. All contract tests are defined and failing appropriately
2. Current Results page behavior is documented
3. Formula calculations are manually verified
4. Development environment is ready for implementation
5. Integration points are clearly identified

**Time Check**: Should complete in ~30 minutes. If taking longer, focus on contract test setup and current behavior verification first.