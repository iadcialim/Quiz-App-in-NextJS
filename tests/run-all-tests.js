// Complete test suite execution
const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== COMPLETE TEST SUITE EXECUTION ===\n');

const testResults = {
  contract: false,
  edgeCase: false,
  component: false,
  integration: false,
  performance: false
};

// Function to run a test script and capture results
function runTestScript(scriptName, description) {
  console.log(`Running ${description}...`);
  try {
    const result = execSync(`/usr/local/bin/node ${scriptName}`, { encoding: 'utf8', cwd: process.cwd() });
    console.log(result);
    
    // Check if test passed based on output
    const passed = result.includes('PASS ✅') && !result.includes('FAIL ❌');
    console.log(`${description}: ${passed ? 'PASSED ✅' : 'FAILED ❌'}\n`);
    return passed;
    
  } catch (error) {
    console.log(`${description}: ERROR ❌`);
    console.log(error.message);
    console.log('');
    return false;
  }
}

// Run all test scripts
console.log('1. CONTRACT TESTS');
testResults.contract = runTestScript('./test-execution-results.js', 'Contract Tests');

console.log('2. EDGE CASE TESTS');
testResults.edgeCase = runTestScript('./edge-case-validation.js', 'Edge Case Tests');

console.log('3. COMPONENT TESTS');
testResults.component = runTestScript('./component-validation.js', 'Component Tests');

console.log('4. INTEGRATION TESTS');
testResults.integration = runTestScript('./integration-validation.js', 'Integration Tests');

console.log('5. PERFORMANCE TESTS');
testResults.performance = runTestScript('./performance-validation.js', 'Performance Tests');

// Calculate overall results
const passedTests = Object.values(testResults).filter(Boolean).length;
const totalTests = Object.keys(testResults).length;
const passRate = Math.round((passedTests / totalTests) * 100);

console.log('=== COMPLETE TEST SUITE RESULTS ===');
console.log(`Contract Tests: ${testResults.contract ? 'PASS' : 'FAIL'}`);
console.log(`Edge Case Tests: ${testResults.edgeCase ? 'PASS' : 'FAIL'}`);
console.log(`Component Tests: ${testResults.component ? 'PASS' : 'FAIL'}`);
console.log(`Integration Tests: ${testResults.integration ? 'PASS' : 'FAIL'}`);
console.log(`Performance Tests: ${testResults.performance ? 'PASS' : 'FAIL'}`);
console.log('');
console.log(`Overall: ${passedTests}/${totalTests} test suites passed`);
console.log(`Pass Rate: ${passRate}%`);

if (passRate === 100) {
  console.log('🎉 ALL TESTS PASSED! Feature ready for production.');
} else {
  console.log('⚠️  Some tests failed. Review and fix issues before deployment.');
}

// Generate test report
const report = {
  timestamp: new Date().toISOString(),
  feature: 'feat-improve-scoring',
  results: testResults,
  summary: {
    passed: passedTests,
    total: totalTests,
    passRate: passRate,
    status: passRate === 100 ? 'READY' : 'NEEDS_FIXES'
  }
};

fs.writeFileSync('test-suite-report.json', JSON.stringify(report, null, 2));
console.log('\nTest report saved to: test-suite-report.json');