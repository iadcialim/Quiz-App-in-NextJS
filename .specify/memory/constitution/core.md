# Constitution Core Standards

<!--
Section: core
Priority: critical
Applies to: all projects
Version: 1.0.0
Last Updated: 2024-12-19
Project: Quiz App in NextJS
-->

## 1. Technology Stack Standards

| Component              | Requirement                         | Priority | Notes                     |
| ---------------------- | ----------------------------------- | -------- | ------------------------- |
| **Runtime**            | Next.js 14.2.13                    | MUST     | App Router required       |
| Runtime Security       | CSP headers, secure cookies         | MUST     | Mandatory compliance      |
| Runtime Optimization   | Static generation where possible    | SHOULD   | Performance best practice |
| Runtime Monitoring     | Vercel Speed Insights               | SHOULD   | Observability             |
| Runtime Enhancement    | Edge runtime for API routes        | COULD    | Optional feature          |
| **Language**           | JavaScript ES6+ / TypeScript       | MUST     | Primary language          |
| Language Strictness    | ESLint strict mode enabled          | MUST     | Type safety/strict mode   |
| Language Linting       | ESLint with Next.js config          | MUST     | Code quality              |
| Language Best Practice | React hooks, functional components  | SHOULD   | Recommended patterns      |
| Language Documentation | JSDoc for complex functions         | SHOULD   | Code documentation        |
| Language Optional      | TypeScript migration                | COULD    | Advanced features         |
| **Compute Platform**   | Vercel deployment                   | MUST     | All deployments           |
| Compute Security       | Environment variables for secrets   | MUST     | Security compliance       |
| Compute Config         | next.config.mjs configuration       | MUST     | Standard configuration    |
| Compute Optimization   | Image optimization, bundle analysis | SHOULD   | Performance tuning        |
| Compute Monitoring     | Vercel analytics and logs           | SHOULD   | Health checks             |
| **Database**           | Static JSON files in /public/data  | MUST     | Current data storage      |
| Database Backup        | Git version control                 | MUST     | Data protection           |
| Database Security      | Input validation on JSON parsing    | MUST     | Access control            |
| Database Optimization  | Lazy loading of quiz data           | SHOULD   | Query performance         |
| Database Monitoring    | Client-side error handling          | SHOULD   | Health metrics            |
| Database Optional      | Migration to PostgreSQL/MongoDB     | COULD    | Advanced features         |

### Technology Prohibitions (WON'T without RFC)

- Alternative runtimes without formal RFC approval
- Server-side rendering for quiz components
- Class components over functional components
- Inline styles over Tailwind CSS
- Alternative compute platforms
- Direct DOM manipulation
- Unvalidated external API calls
- Alternative databases without RFC approval

---

## 2. Coding Standards

| Area               | Standard                             | Enforcement | Validation          |
| ------------------ | ------------------------------------ | ----------- | ------------------- |
| **Language**       | ES6+ syntax, arrow functions         | MUST        | Automated linting   |
| **Type Safety**    | PropTypes or TypeScript interfaces   | MUST        | Compile-time        |
| **Async Patterns** | async/await over Promises            | MUST        | Code review         |
| **Modularity**     | Component-based architecture         | MUST        | Architecture review |
| **Error Handling** | Try-catch with user-friendly messages| MUST        | Automated linting   |
| **Logging**        | console.error for errors only        | MUST        | Automated scanning  |
| **Secrets**        | Environment variables, no hardcoding | MUST        | Secret scanning     |
| **Validation**     | Input sanitization and validation    | MUST        | Security review     |
| **DTOs/Models**    | Clear prop naming, destructuring     | MUST        | Code review         |

### Error Handling Example

```javascript
try {
  const response = await fetch('/data/questions.json');
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error('Quiz data fetch failed:', error);
  throw error;
}
```

### Core Requirements

- **Logging**: Structured console logging, no sensitive data, consistent error messages
- **Secrets**: No API keys in code, use environment variables for external services
- **Validation**: Validate quiz answers, sanitize user inputs, type checking
- **DTOs**: Clear component props, destructuring patterns, immutable state updates

---

## 3. API Versioning Standards

| Versioning Aspect | Requirement                                | Priority | Notes                    |
| ----------------- | ------------------------------------------ | -------- | ------------------------ |
| **Strategy**      | Static data versioning in JSON structure  | MUST     | Version field in JSON    |
| Version support   | Backward compatible JSON schema changes    | MUST     | Minimum 6 months         |
| Breaking changes  | Document schema changes in README          | MUST     | In CHANGELOG and docs    |
| Deprecation       | Deprecate question formats before removal  | MUST     | Minimum 3 months notice  |
| Migration guides  | Provide guides for data format changes     | SHOULD   | With code examples       |

---

## 4. Enforcement and Validation

| Standard Area      | Enforcement Level | Validation Method     | Automated | Frequency     |
| ------------------ | ----------------- | --------------------- | --------- | ------------- |
| Language Standards | Mandatory         | ESLint + Next.js lint | Yes       | Every commit  |
| Type Safety        | Mandatory         | PropTypes validation  | Yes       | Every commit  |
| Error Handling     | Mandatory         | Linting + Review      | Partial   | Every commit  |
| Logging            | Mandatory         | Console log scanning  | Yes       | Every commit  |
| Secrets            | Mandatory         | Environment scanning  | Yes       | Every commit  |
| Input Validation   | Mandatory         | Security review       | Partial   | Per PR        |
| Versioning         | Mandatory         | JSON schema checks    | Yes       | Every release |
| Architecture       | Mandatory         | Component review      | No        | Per feature   |