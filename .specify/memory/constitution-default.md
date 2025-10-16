<!--
Sync Impact Report:
Version change: N/A → 1.0.0
Modified principles: Initial constitution creation
Added sections: All sections from template
Removed sections: None
Templates requiring updates: ✅ constitution-template.md copied / ⚠ git-workflow.md pending
Follow-up TODOs: None
-->

# Development Constitution

---

<!-- Section: architecture -->

## Architectural Patterns

### CRUD Pattern

**Routes**:

- POST: Create new resource
- GET: Retrieve resource(s)
- PATCH: Update existing resource
- DELETE: Remove resource

**Benefits**: Consistent API design, predictable behavior, clear separation of concerns, standard HTTP semantics, easy testing

### Security Requirements

**Defense in Depth**: Multiple security layers with input validation, authentication, authorization, and output sanitization
**Zero Trust**: Verify all requests, validate all inputs, authenticate all users, authorize all actions
**Monitoring**: Log all security events, detect anomalies, track access patterns, monitor for threats

---

<!-- Section: core -->

## Coding Standards

| Area           | Standard                             | Enforcement | Validation          |
| -------------- | ------------------------------------ | ----------- | ------------------- |
| Language       | JavaScript ES6+/TypeScript strict mode | Mandatory   | Automated linting   |
| Type Safety    | PropTypes for JS, strict TypeScript types | Mandatory   | Compile-time        |
| Async Patterns | async/await preferred, Promise chains for complex flows | Mandatory   | Code review         |
| Modularity     | Component-based architecture, single responsibility | Mandatory   | Architecture review |
| Error Handling | Try-catch blocks, error boundaries, graceful degradation | Mandatory   | Automated linting   |
| Logging        | console logging in dev, structured logging in prod | Mandatory   | Automated scanning  |
| Secrets        | Environment variables, no hardcoded secrets | Mandatory   | Secret scanning     |
| Validation     | Input sanitization, type checking, boundary validation | Mandatory   | Security review     |
| DTOs/Models    | PascalCase for components, camelCase for props/functions | Mandatory   | Code review         |

### Error Handling Example

```
try {
  const result = await operation();
  return result;
} catch (error) {
  logger.error('Operation failed', { correlationId, error });
  throw error;
}
```

### Core Requirements

- **Logging**: Structured format, correlation ID, no secrets, consistent field names
- **Secrets**: No plaintext in code/env/logs/errors
- **Validation**: Validate/sanitize all external inputs, type & boundary checking
- **DTOs**: Clear naming, type annotations, immutability preferred, validation methods

---

<!-- Section: testing -->

## Testing Standards

### Coverage

- **Requirements**: 80% minimum code coverage (Mandatory, validated via automated CI)
- **Threshold**: Fail build below 80%, warn below 90%
- **Exclusions**: Configuration files, build scripts, type definitions

### Test Organization

| Type          | Location                  | Directory                      | Suffix               | Constraints                                                                                                   |
| ------------- | ------------------------- | ------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| Unit Tests    | Colocated with source     | __tests__ or .test files       | .test.js/.test.jsx   | Must: Colocate with source, follow naming. Must Not: Place in integration directories                        |
| Component Tests | Component directories   | __tests__ subdirectories       | .test.jsx            | Test component behavior, props, user interactions, accessibility                                              |
| Integration   | Exclusive directory       | tests/integration              | .integration.test.js | Must: Dedicated dir, test real integrations, setup/teardown. Must Not: Mix with unit tests, excessive mocking |
| E2E Tests     | Dedicated directory       | tests/e2e                      | .e2e.test.js         | Full user workflows, browser automation, critical paths only                                                  |

**Examples**: Source: src/components/Quiz.jsx → Test: src/components/__tests__/Quiz.test.jsx | Source: src/utils/timer.js → Test: src/utils/__tests__/timer.test.js

**Security Testing**: Input validation, XSS prevention, CSRF protection | Location: tests/security, Suffix: .security.test.js

| Category         | Requirements                         | Examples                                   |
| ---------------- | ------------------------------------ | ------------------------------------------ |
| Authentication   | Test invalid sessions, token expiry  | Bypass, invalid tokens, session validation |
| Authorization    | Test role boundaries, access control | Privilege escalation, role boundaries      |
| Input Validation | Test malicious inputs, edge cases    | SQL injection, XSS, command injection      |
| Cryptographic    | Test encryption, secure storage      | Encryption, key management, secure random  |

**Integration**: Test API endpoints, database connections, external services | Logging: Capture test logs, verify log structure | Mocking: Mock external APIs, preserve internal logic | Must: Real service interactions, logging, error scenarios | Must Not: Mock critical integrations, skip cleanup

**Mocking**: Unit: Mock external dependencies only | Implementation: Jest mocks, MSW for API mocking | Practices: Consistent framework, mock external deps, verify interactions, realistic behavior

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

## Database Guidelines

| Aspect   | Rule                                              | Must                                                  | Must Not                                |
| -------- | ------------------------------------------------- | ----------------------------------------------------- | --------------------------------------- |
| Keys     | Use meaningful, consistent naming (schema validation) | Clear primary keys, consistent naming conventions     | Ambiguous patterns, generic IDs         |
| TTL      | Set expiration for temporary data (code review)   | Set for session data, document rationale, lifecycle  | Without justification, skip cleanup     |
| Indexes  | Create indexes for query patterns (architecture review) | Justify necessity, monitor performance, optimize queries | Unnecessary indexes, duplicate patterns |
| Capacity | Configure appropriate limits (operations review)   | Justify limits, monitor usage, optimize performance   | Over-provision, ignore performance      |

**Indexes When**: Required: Common query patterns, performance critical, positive impact | Prohibited: Rare queries, maintenance overhead exceeds benefit  
**Data Storage**: JSON files for development, database for production, validate schema, backup strategy

---

<!-- Section: architecture -->

## API Standards

| Category       | Standards                                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Security       | HTTPS only, secure headers, sanitized error responses, no sensitive data exposure                                     |
| Protection     | CORS configuration, CSRF tokens, request size limits, rate limiting per endpoint                                     |
| Authentication | JWT tokens, session validation, scope-based access, secure token storage                                             |
| Validation     | Input parameter validation, output sanitization, content type validation                                              |
| Versioning     | URL versioning (/api/v1), backward compatibility, security patch deployment                                          |
| Resilience     | Request throttling, DDoS protection, geographic restrictions, graceful degradation                                   |

---

<!-- Section: security -->

## Security Standards

| Category             | Standards                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Access Control       | Principle of least privilege, secure secret storage, multi-layer security safeguards               |
| Auth & Authorization | JWT-based authentication, session management, role-based access control                            |
| Data Protection      | Client-side encryption for sensitive data, PII handling policies, data classification              |
| Input Security       | Input validation and sanitization, SQL injection prevention, XSS prevention                        |
| Monitoring           | Security event logging, log retention policies, anomaly detection                                   |
| Secrets Management   | Environment variables only, secret rotation, environment separation                                 |
| Network Security     | HTTPS enforcement, secure headers, TLS 1.3 minimum                                                 |
| Vulnerability Mgmt   | Dependency scanning, security updates, regular security reviews                                     |
| Incident Response    | Security incident procedures, breach notification, forensic capabilities                           |
| Compliance           | Web security standards, security review process, third-party assessment                            |
| Exceptions           | Security deviation approval process, constitution update requirements                               |