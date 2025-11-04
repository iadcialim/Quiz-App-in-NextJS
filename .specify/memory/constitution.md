<!--
Sync Impact Report:
Version change: 1.2.0 → 1.3.0
Modified principles: Added AI agent test execution requirements
Added sections: AI Agent Test Execution Requirements, AI Agent Execution Protocol
Removed sections: None
Templates requiring updates: ✅ constitution updated with AI testing standards
Follow-up TODOs: None
-->

# Quiz App Development Constitution

**Version**: 1.3.0  
**Ratification Date**: 2024-12-19  
**Last Amended**: 2024-12-19

---

<!-- Section: architecture -->

## Architectural Patterns

### Next.js App Router Pattern

**Structure**:

- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable React components
- `src/context/` - React Context providers
- `public/data/` - Static JSON data files

**Benefits**: File-based routing, server components by default, built-in optimizations, clear separation of concerns

### Component Architecture

**Client Components**: Interactive components with 'use client' directive
**Server Components**: Default for static content and data fetching
**Context Pattern**: Global state management with React Context
**Composition**: Prefer composition over inheritance for component design

### Security Requirements

**Client-Side Security**: Input sanitization, XSS prevention, secure data handling
**Static Data**: Validate JSON structure, prevent injection attacks
**Performance**: Optimize bundle size, lazy loading, image optimization

---

<!-- Section: core -->

## Coding Standards

| Area           | Standard                                                  | Enforcement | Validation           |
| -------------- | --------------------------------------------------------- | ----------- | -------------------- |
| Language       | JavaScript ES6+ with Next.js 14 App Router                | Mandatory   | ESLint configuration |
| Type Safety    | PropTypes for components, JSDoc for functions             | Mandatory   | Runtime validation   |
| Async Patterns | async/await for data fetching, useEffect for side effects | Mandatory   | Code review          |
| Modularity     | Single responsibility components, custom hooks, dual exports | Mandatory   | Architecture review  |
| Error Handling | Error boundaries, try-catch, graceful fallbacks           | Mandatory   | Component testing    |
| Logging        | Console logging with structured format                    | Mandatory   | Development tools    |
| Secrets        | Environment variables via .env.local                      | Mandatory   | Git ignore rules     |
| Validation     | Input sanitization, form validation, data validation      | Mandatory   | Security review      |
| Styling        | Tailwind CSS utility classes, responsive design           | Mandatory   | Design review        |

### Error Handling Example

```javascript
// Component Error Boundary
function QuizErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div>Something went wrong. Please refresh and try again.</div>;
  }

  return children;
}

// Async Operation
try {
  const questions = await fetch("/data/questions.json");
  if (!questions.ok) throw new Error("Failed to load questions");
  return await questions.json();
} catch (error) {
  console.error("Quiz data loading failed:", error);
  setError("Unable to load quiz questions");
}
```

### Core Requirements

- **Components**: PascalCase naming, single responsibility, proper prop validation
- **Styling**: Tailwind utility classes, responsive breakpoints, consistent spacing
- **Data**: JSON validation, immutable state updates, proper error handling
- **Performance**: Image optimization, lazy loading, minimal re-renders
- **Module Exports**: CommonJS exports for Node.js/React compatibility
- **Test Execution**: AI agents must execute and verify all tests before task completion

### Module Export Pattern

**Utility Functions**: Use CommonJS exports for Node.js test compatibility

```javascript
// Utility function implementation
function myUtility() {
  // implementation
}

// CommonJS export for Node.js test scripts and Next.js components
module.exports = { myUtility };
```

**Benefits**: Enables both `require()` in Node.js tests and Next.js can import CommonJS modules

---

<!-- Section: testing -->

## Testing Standards

### Coverage

- **Requirements**: 80% minimum code coverage (Mandatory, validated via automated CI)
- **Threshold**: Fail build below 80%, warn below 90%
- **Exclusions**: Configuration files, build scripts, type definitions

### Test Organization

| Type            | Location              | Directory                | Suffix               | Constraints                                                                        |
| --------------- | --------------------- | ------------------------ | -------------------- | ---------------------------------------------------------------------------------- |
| Unit Tests      | Colocated with source | **tests** or .test files | .test.js/.test.jsx   | Test individual functions, hooks, utilities. Mock external dependencies            |
| Component Tests | Component directories | **tests** subdirectories | .test.jsx            | Test rendering, props, user interactions, accessibility with React Testing Library |
| Integration     | Exclusive directory   | tests/integration        | .integration.test.js | Test quiz flow, timer functionality, score calculation, data loading               |
| E2E Tests       | Dedicated directory   | tests/e2e                | .e2e.test.js         | Complete quiz workflows, subject selection, question navigation, results display   |
| Validation      | Consolidated location | tests/                   | -validation.js       | AI agent executable validation scripts for contract, edge case, performance tests  |

### AI Agent Test Execution Requirements

| Requirement     | Standard                                    | Validation Method        | Enforcement |
| --------------- | ------------------------------------------- | ------------------------ | ----------- |
| Test Execution  | AI agents MUST run all tests before completion | Execute test suite via executeBash | Mandatory |
| Result Verification | AI agents MUST verify pass/fail status | Parse test output for ✅/❌ indicators | Mandatory |
| Failure Investigation | AI agents MUST resolve test failures | Re-run tests after fixes | Mandatory |
| Performance Validation | AI agents MUST verify <100ms requirements | Execute performance tests | Mandatory |
| Manual Verification | AI agents MUST perform manual testing for critical paths | Document verification steps | Mandatory |

**Examples**: Source: src/components/QuestionTimer.jsx → Test: src/components/**tests**/QuestionTimer.test.jsx | Source: src/context/PointsContext.js → Test: src/context/**tests**/PointsContext.test.js

**Security Testing**: Input validation, XSS prevention, CSRF protection | Location: tests/security, Suffix: .security.test.js

| Category         | Requirements                         | Examples                                   |
| ---------------- | ------------------------------------ | ------------------------------------------ |
| Authentication   | Test invalid sessions, token expiry  | Bypass, invalid tokens, session validation |
| Authorization    | Test role boundaries, access control | Privilege escalation, role boundaries      |
| Input Validation | Test malicious inputs, edge cases    | SQL injection, XSS, command injection      |
| Cryptographic    | Test encryption, secure storage      | Encryption, key management, secure random  |

**Integration**: Test API endpoints, database connections, external services | Logging: Capture test logs, verify log structure | Mocking: Mock external APIs, preserve internal logic | Must: Real service interactions, logging, error scenarios | Must Not: Mock critical integrations, skip cleanup

**Mocking**: Unit: Mock external dependencies only | Implementation: Jest mocks, MSW for API mocking | Practices: Consistent framework, mock external deps, verify interactions, realistic behavior

**AI Agent Execution Protocol**:
1. **Pre-Implementation**: Execute contract tests to verify they fail appropriately
2. **Post-Implementation**: Execute complete test suite and verify 100% pass rate
3. **Performance Validation**: Execute performance tests and verify <100ms thresholds
4. **Manual Verification**: Test critical user flows and document results
5. **Failure Resolution**: Investigate and fix any test failures before task completion

**Node.js Testing**: Utility functions must support Node.js `require()` for test execution | Use CommonJS exports only | Test scripts should validate implementation without build tools

**AI Agent Test Execution**: AI agents MUST execute all tests and verify results | Agents must run complete test suites before marking tasks complete | Test failures must be investigated and resolved | Manual verification required for critical functionality

---

<!-- Section: observability -->

## Logging Standards

**Entry**: Log function entry with parameters | Clear, actionable messages | Include user context, request ID | Structured JSON format (Mandatory)  
**Must**: Log at entry, include correlationId, structured format, concise | **Must Not**: Log sensitive data, string concatenation, exceed size

**Test Env**: Console output for development | Maintain production log structure | Prevent cloud service calls in tests  
**Must**: Maintain production format, console output, parseable | **Must Not**: Cloud services, skip critical fields

### Required Fields

| Field         | Type   | Description                              | Validation            | When                   |
| ------------- | ------ | ---------------------------------------- | --------------------- | ---------------------- |
| correlationId | string | Unique request trace ID                  | UUID or similar       | Always                 |
| timestamp     | string | ISO 8601 timestamp                       | Valid ISO8601         | Always                 |
| level         | enum   | Log level (INFO/DEBUG/WARN/ERROR)        | One of allowed values | Always                 |
| service       | string | Service/component name                   | Non-empty string      | Always                 |
| message       | string | Human-readable log message               | Non-empty descriptive | Always                 |
| operation     | string | Function/method being executed           | -                     | When available         |
| userId        | string | User identifier                          | -                     | User context exists    |
| sessionId     | string | Session identifier                       | -                     | Session context exists |
| requestId     | string | HTTP/API request ID                      | -                     | HTTP request context   |
| duration      | number | Operation time (ms)                      | -                     | Operation complete     |
| outcome       | enum   | Result (success/failure/timeout/partial) | -                     | Operation complete     |
| errorCode     | string | Application-specific error code          | -                     | level == ERROR         |
| errorMessage  | string | Error description                        | -                     | level == ERROR         |
| errorType     | string | Error category/classification            | -                     | level == ERROR         |
| stackTrace    | string | Technical stack trace (dev only)         | -                     | level == ERROR         |

### Implementation Examples

```
// Entry: LOG.INFO("Quiz operation started", {correlationId, userId, requestId})
// Success: LOG.INFO("Quiz completed", {correlationId, outcome: "success", duration})
// Error: LOG.ERROR("Quiz submission failed", {correlationId, errorCode, errorType})

FUNCTION submitQuiz(request) {
  correlationId = request.correlationId OR generateId()
  LOG.INFO("Quiz submission started", {correlationId, operation: "submitQuiz", userId, requestId})
  TRY {
    result = processQuizSubmission(request)
    LOG.INFO("Quiz submission completed", {correlationId, outcome: "success", duration})
    RETURN result
  } CATCH (error) {
    LOG.ERROR("Quiz submission failed", {correlationId, errorCode: error.code, errorType: error.type})
    THROW error
  }
}
```

**Requirements**: Always include correlationId | Never log secrets (automated scanning) | Structured logging (linting) | Consistent naming (schema validation)

---

<!-- Section: architecture -->

## Data Management Guidelines

| Aspect    | Rule                                              | Must                                                  | Must Not                                 |
| --------- | ------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------- |
| Structure | Consistent JSON schema for questions and subjects | Validate data structure, type safety, required fields | Inconsistent formats, missing validation |
| Storage   | Static JSON files in public/data directory        | Version control data, validate on load, backup files  | Dynamic data without persistence         |
| Access    | Fetch API for data loading with error handling    | Handle network errors, loading states, fallbacks      | Synchronous data access, missing errors  |
| State     | Immutable updates with React state management     | Use proper state setters, avoid mutations             | Direct state mutations, memory leaks     |

**Data Patterns**: Static JSON for quiz content, React Context for global state, localStorage for user preferences  
**Validation**: JSON schema validation, runtime type checking, error boundaries for data failures

---

<!-- Section: architecture -->

## Frontend Standards

| Category      | Standards                                                                            |
| ------------- | ------------------------------------------------------------------------------------ |
| Routing       | Next.js App Router, file-based routing, dynamic routes for quiz subjects             |
| Styling       | Tailwind CSS utility classes, responsive design, consistent color scheme             |
| Performance   | Next.js Image optimization, lazy loading, code splitting, bundle analysis            |
| Accessibility | Semantic HTML, ARIA labels, keyboard navigation, screen reader support               |
| SEO           | Meta tags, structured data, proper heading hierarchy, descriptive alt text           |
| State         | React Context for global state, useState for local state, useEffect for side effects |

---

<!-- Section: security -->

## Security Standards

| Category             | Standards                                                                             |
| -------------------- | ------------------------------------------------------------------------------------- |
| Access Control       | Principle of least privilege, secure secret storage, multi-layer security safeguards  |
| Auth & Authorization | JWT-based authentication, session management, role-based access control               |
| Data Protection      | Client-side encryption for sensitive data, PII handling policies, data classification |
| Input Security       | Input validation and sanitization, SQL injection prevention, XSS prevention           |
| Monitoring           | Security event logging, log retention policies, anomaly detection                     |
| Secrets Management   | Environment variables only, secret rotation, environment separation                   |
| Network Security     | HTTPS enforcement, secure headers, TLS 1.3 minimum                                    |
| Vulnerability Mgmt   | Dependency scanning, security updates, regular security reviews                       |
| Incident Response    | Security incident procedures, breach notification, forensic capabilities              |
| Compliance           | Web security standards, security review process, third-party assessment               |
| Exceptions           | Security deviation approval process, constitution update requirements                 |

---

## Governance

### Amendment Process

**Minor Changes** (patches): Documentation updates, clarifications, non-breaking refinements  
**Major Changes** (minor version): New principles, expanded guidance, additional requirements  
**Breaking Changes** (major version): Removed principles, incompatible changes, architectural shifts

**Approval**: All changes require code review and team consensus before merge

### Compliance Review

**Frequency**: Monthly architecture reviews, quarterly security assessments  
**Scope**: Code quality, security practices, performance metrics, accessibility compliance  
**Enforcement**: Automated linting, CI/CD checks, peer review process

### Version Policy

**Current Version**: 1.1.0  
**Update Schedule**: As needed for project evolution  
**Backward Compatibility**: Maintain compatibility within major versions
