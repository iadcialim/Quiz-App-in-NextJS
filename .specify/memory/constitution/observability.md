# Constitution Observability Standards

<!--
Section: observability
Priority: high
Applies to: backend, infrastructure
Dependencies: [core]
Version: 1.0.0
Last Updated: 2024-12-19
Project: Quiz App in NextJS
-->

## 1. Logging Standards

### Mandatory Log Fields

| Field         | Type   | Format          | Required | Description                    |
| ------------- | ------ | --------------- | -------- | ------------------------------ |
| correlationId | string | UUID            | MUST     | Trace requests across services |
| timestamp     | string | ISO 8601        | MUST     | Log entry timestamp            |
| level         | enum   | INFO/WARN/ERROR | MUST     | Log severity level             |
| service       | string | Service name    | MUST     | Service generating the log     |
| message       | string | Descriptive     | MUST     | Human-readable description     |

### Optional Context Fields

| Field     | Type   | When Required          | Description                     |
| --------- | ------ | ---------------------- | ------------------------------- |
| operation | string | Available              | Function/method being executed  |
| userId    | string | User context exists    | User identifier                 |
| sessionId | string | Session context exists | Session identifier              |
| requestId | string | HTTP/API context       | Request identifier              |
| duration  | number | Operation complete     | Execution time (milliseconds)   |
| outcome   | enum   | Operation complete     | success/failure/timeout/partial |

### Error-Specific Fields

| Field        | Type   | Required When  | Environment   | Description            |
| ------------ | ------ | -------------- | ------------- | ---------------------- |
| errorCode    | string | level == ERROR | All           | Application error code |
| errorMessage | string | level == ERROR | All           | Error description      |
| errorType    | string | level == ERROR | All           | Error category         |
| stackTrace   | string | level == ERROR | Dev/Test only | Technical stack trace  |

### Logging Patterns

| Pattern         | When                | Example                                                | Priority |
| --------------- | ------------------- | ------------------------------------------------------ | -------- |
| Entry Logging   | Operation starts    | `console.log("Quiz started", {subject, correlationId})` | MUST     |
| Success Logging | Operation completes | `console.log("Quiz completed", {score, duration})`     | SHOULD   |
| Error Logging   | Operation fails     | `console.error("Quiz failed", {errorCode, error})`     | MUST     |

### Logging Prohibitions (WON'T)

- Never log secrets (passwords, tokens, keys, API keys)
- Never log PII without justification
- Never use string concatenation for log messages
- Never skip correlation ID
- Never log sensitive cryptographic material

---

## 2. Log Implementation Standards

| Requirement            | Description                    | Priority | Validation            |
| ---------------------- | ------------------------------ | -------- | --------------------- |
| **Structured Format**  | Use console methods with objects | MUST   | Automated linting     |
| Correlation ID         | Include in every log entry     | MUST     | Automated scanning    |
| Consistent Fields      | Standard field naming          | MUST     | Schema validation     |
| **Environment Config** | Console logging for all envs   | MUST     | Deployment check      |
| Test Environment       | Console output, same format    | MUST     | Test validation       |
| Production Environment | Vercel logs collection         | MUST     | Infrastructure config |
| Log Levels             | INFO/DEBUG/WARN/ERROR          | MUST     | Code review           |
| **Log Sampling**       | No sampling for current app    | SHOULD   | Performance tuning    |

---

## 3. Metrics Standards

### Metric Categories

| Category                | Examples                           | Collection | Priority |
| ----------------------- | ---------------------------------- | ---------- | -------- |
| **Business Metrics**    | Quiz completions, scores, subjects | Real-time  | MUST     |
| User Activity           | Quiz starts, completions, retries  | Real-time  | MUST     |
| Revenue Metrics         | N/A for current app                | Real-time  | SHOULD   |
| **System Metrics**      | Page loads, errors, performance    | Real-time  | MUST     |
| Request Latency         | Page load times, API response      | Continuous | MUST     |
| Error Rates             | JavaScript errors, failed loads    | Continuous | MUST     |
| Throughput              | Quiz attempts per minute           | Continuous | MUST     |
| **Performance Metrics** | Component render times, memory     | Continuous | MUST     |
| Database Latency        | JSON fetch times                   | Continuous | MUST     |
| External API Latency    | N/A for current app                | Continuous | SHOULD   |
| Resource Usage          | Browser memory, CPU usage          | Continuous | MUST     |

### Metric Requirements

| Requirement           | Description                       | Priority | Notes                        |
| --------------------- | --------------------------------- | -------- | ---------------------------- |
| **Consistent Naming** | camelCase for JavaScript metrics  | MUST     | snake_case or dot.notation   |
| **Appropriate Tags**  | Environment, browser, device type | MUST     | Environment, service, region |
| **Thresholds**        | Define performance SLOs           | MUST     | Define SLOs/SLAs             |
| Cardinality Control   | Avoid high-cardinality dimensions | MUST     | Performance impact           |
| **Unit Consistency**  | Use standard units (ms, bytes, %) | MUST     | Data interpretation          |

---

## 4. Distributed Tracing Standards

| Requirement           | Description                             | Priority | Implementation        |
| --------------------- | --------------------------------------- | -------- | --------------------- |
| **Trace Propagation** | Browser session tracking               | MUST     | W3C Trace Context     |
| **Span Creation**     | Create spans for quiz operations        | MUST     | Function-level        |
| Span Attributes       | Quiz metadata, user actions            | MUST     | Semantic conventions  |
| **Sampling Strategy** | Sample all quiz sessions               | MUST     | Adaptive sampling     |
| Sampling Rate         | 100% for current app size              | MUST     | Environment-specific  |
| **Error Tracking**    | Capture errors in React components     | MUST     | Exception details     |
| Trace Completeness    | Monitor for dropped events             | SHOULD   | Observability metrics |

### Tracing Best Practices

| Practice             | Requirement                      | Priority |
| -------------------- | -------------------------------- | -------- |
| Semantic Conventions | Follow web performance standards | SHOULD   |
| Context Enrichment   | Add quiz context to traces       | SHOULD   |
| Performance Impact   | Minimize tracing overhead        | MUST     |
| Trace Analysis       | Regular review of user flows     | SHOULD   |

---

## 5. Alerting Standards

| Alert Type          | Condition                    | Severity | Response Time      |
| ------------------- | ---------------------------- | -------- | ------------------ |
| **Error Rate**      | >5% JavaScript errors        | Critical | Immediate          |
| **Latency**         | >3s page load time           | High     | 15 minutes         |
| **Availability**    | Site down or unreachable     | Critical | Immediate          |
| **Resource Usage**  | High memory usage in browser | Medium   | 30 minutes         |
| **Security Events** | XSS attempts, malicious input | Critical | Immediate          |
| **Custom Business** | Quiz completion rate <80%    | Variable | Defined per metric |

### Alert Requirements

| Requirement       | Description                   | Priority |
| ----------------- | ----------------------------- | -------- |
| Actionable Alerts | Include context for response  | MUST     |
| Alert Routing     | Route to appropriate teams    | MUST     |
| Escalation Policy | Define escalation paths       | MUST     |
| Alert Suppression | Prevent alert fatigue         | SHOULD   |
| Runbook Links     | Link to resolution procedures | SHOULD   |