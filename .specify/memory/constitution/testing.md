# Constitution Testing Standards

<!--
Section: testing
Priority: critical
Applies to: all projects
Dependencies: [core]
Version: 1.0.0
Last Updated: 2024-12-19
Project: Quiz App in NextJS
-->

## 1. Test Coverage Standards

| Coverage Type | Requirement              | Threshold             | Enforcement        |
| ------------- | ------------------------ | --------------------- | ------------------ |
| **Overall**   | Component and logic coverage | 70%               | Automated CI check |
| Statement     | Core quiz logic coverage | 80%                   | CI blocking        |
| Branch        | Conditional logic paths  | 70%                   | CI blocking        |
| Function      | All exported functions   | 90%                   | CI blocking        |
| Exclusions    | Static assets, config files | N/A               | Code review        |

---

## 2. Test Organization Standards

| Test Type             | Location                 | Suffix               | Colocated | Priority |
| --------------------- | ------------------------ | -------------------- | --------- | -------- |
| **Unit Tests**        | `__tests__/` or `.test.js` | `.test.js`         | Yes       | MUST     |
| **Contract Tests**    | `__tests__/contracts/`   | `.contract.test.js`  | Yes       | MUST     |
| **Integration Tests** | `tests/integration/`     | `.integration.test.js` | No      | MUST     |
| **Security Tests**    | `__tests__/security/`    | `.security.test.js`  | Yes       | MUST     |
| **Flow Tests**        | `tests/e2e/`             | `.e2e.test.js`       | No        | SHOULD   |
| **Performance Tests** | `tests/performance/`     | `.perf.test.js`      | No        | COULD    |

### File Organization Examples

| Source File             | Test File                                   | Location Rule           |
| ----------------------- | ------------------------------------------- | ----------------------- |
| `src/components/Quiz.jsx` | `src/components/__tests__/Quiz.test.js`   | Colocated unit test     |
| `src/context/PointsContext.js` | `src/context/__tests__/PointsContext.contract.test.js` | Colocated contract test |
| `src/app/quiz/[subject]/page.jsx` | `tests/integration/quiz-page.integration.test.js` | Separate integration |
| `src/components/Results.jsx` | `src/components/__tests__/Results.security.test.js` | Colocated security |

---

## 3. Test Type Requirements

### Unit Tests

| Requirement           | Description                   | Priority | Validation       |
| --------------------- | ----------------------------- | -------- | ---------------- |
| Colocation            | Must be next to source file   | MUST     | File structure   |
| Naming Convention     | Component.test.js pattern     | MUST     | Automated lint   |
| Mocking Allowed       | Mock external dependencies    | MUST     | Code review      |
| External Dependencies | Must mock fetch calls, timers | MUST     | Test review      |
| Fast Execution        | <100ms per test suite         | SHOULD   | Performance test |

### Integration Tests

| Requirement     | Description                         | Priority | Validation     |
| --------------- | ----------------------------------- | -------- | -------------- |
| Location        | Dedicated `tests/integration/` dir  | MUST     | File structure |
| Real Services   | Test actual component interactions  | MUST     | Code review    |
| Setup/Teardown  | Include proper cleanup              | MUST     | Test review    |
| Logging         | Console error monitoring            | MUST     | Code review    |
| Error Scenarios | Test quiz timeout, invalid data     | MUST     | Test coverage  |

### Contract Tests

| Requirement            | Description                       | Priority | Validation          |
| ---------------------- | --------------------------------- | -------- | ------------------- |
| API Contracts          | Test JSON data structure          | MUST     | API review          |
| Schema Validation      | Validate question/answer schemas  | MUST     | Automated           |
| Backward Compatibility | Test data format compatibility    | MUST     | CI check            |
| Consumer-Driven        | Component prop validation         | SHOULD   | Architecture review |

---

## 4. Security Testing Standards

| Test Category        | Requirement                      | Priority | Examples                              |
| -------------------- | -------------------------------- | -------- | ------------------------------------- |
| **Authentication**   | No authentication in current app | MUST     | Future user login scenarios           |
| Token Validation     | N/A for current implementation   | MUST     | Future JWT validation                 |
| Session Management   | Local storage security           | MUST     | XSS prevention                        |
| **Authorization**    | Public access validation         | MUST     | No unauthorized data access           |
| Permission Checks    | Quiz data access controls        | MUST     | Public data validation                |
| **Input Validation** | Quiz answer validation           | MUST     | XSS, injection prevention             |
| Sanitization         | User input sanitization          | MUST     | Display content safety                |
| **Cryptography**     | HTTPS enforcement                | MUST     | Secure data transmission              |
| Key Rotation         | Environment variable security    | SHOULD   | Secret management                     |

### Penetration Testing

| Test Type          | Requirement                       | Frequency     | Priority |
| ------------------ | --------------------------------- | ------------- | -------- |
| Automated Scans    | ESLint security rules             | Every deploy  | MUST     |
| Manual Testing     | Manual security review            | Per release   | SHOULD   |
| Vulnerability Scan | npm audit for dependencies        | Weekly        | MUST     |
| Security Baseline  | OWASP compliance check            | Every release | MUST     |

---

## 5. Mocking Standards

| Context               | Mocking Policy                  | Priority | Rationale               |
| --------------------- | ------------------------------- | -------- | ----------------------- |
| **Unit Tests**        | Mock all external dependencies  | MUST     | Isolate unit under test |
| External Services     | Always mock fetch calls         | MUST     | Fast, deterministic     |
| Database Calls        | Mock JSON file loading          | MUST     | No real file I/O        |
| **Integration Tests** | Test real component interactions| MUST     | Test real interactions  |
| Critical Services     | Do not mock React hooks        | MUST     | Validate integration    |
| Third-party APIs      | Mock external API calls         | SHOULD   | Use test environments   |

### Mocking Best Practices

| Practice             | Requirement                  | Priority |
| -------------------- | ---------------------------- | -------- |
| Consistent Framework | Jest with React Testing Library | MUST  |
| Realistic Behavior   | Mock responses match real data | MUST   |
| Verify Interactions  | Assert component interactions  | SHOULD |
| Clear Mock Setup     | Document mock expectations     | SHOULD |

---

## 6. Test Execution Requirements

| Requirement        | Description                         | Priority | Enforcement      |
| ------------------ | ----------------------------------- | -------- | ---------------- |
| Pre-commit Tests   | Run unit tests before commit        | MUST     | Git hooks        |
| CI Pipeline Tests  | Run all tests on PR                 | MUST     | CI configuration |
| Coverage Threshold | Block merge if below 70% coverage  | MUST     | CI gates         |
| Test Isolation     | Tests must not depend on each other | MUST     | Test framework   |
| Parallel Execution | Run tests in parallel for speed     | SHOULD   | Performance      |