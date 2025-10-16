# Quiz App Development Constitution

**Version**: 1.0.0  
**Ratification Date**: 2024-12-19  
**Last Amended**: 2024-12-19

---

## Core Principles

### Spec-Driven Development

All features MUST have written specifications before implementation. Code MUST satisfy specs, not exceed them.

### Next.js 14 App Router Architecture

- Use App Router exclusively (`src/app` structure)
- Server Components by default, Client Components only when necessary
- File-based routing with dynamic segments

### Component Design Standards

- Single Responsibility Principle
- PascalCase for components, camelCase for functions
- Props validation with PropTypes or JSDoc
- Composition over inheritance

---

## Technical Standards

### Language & Framework

- **JavaScript ES6+** with Next.js 14 App Router
- **React 18** with hooks and functional components
- **Tailwind CSS** utility-first styling
- **ESLint** for code quality enforcement

### File Structure

```
src/
├── app/           # App Router pages and layouts
├── components/    # Reusable UI components
├── context/       # React Context providers
└── lib/          # Utilities and helpers
```

### State Management

- React Context for global state (points, user data)
- useState for local component state
- useEffect for side effects and data fetching
- Immutable state updates only

### Data Patterns

- Static JSON files in `public/data/` for quiz content
- Fetch API for data loading with error handling
- Client-side validation and sanitization
- Error boundaries for graceful failure handling

---

## Quality Standards

### Testing Requirements

- **80% minimum code coverage**
- Unit tests colocated with source files (`.test.js`)
- Component tests with React Testing Library
- Integration tests for quiz workflows

### Performance Standards

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Next.js Image optimization for all images
- Code splitting and lazy loading

### Accessibility (WCAG 2.1 AA)

- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader compatibility

---

## Security Requirements

### Input Security

- Sanitize all user inputs
- Validate data structure and types
- Prevent XSS attacks
- No sensitive data in client code

### Data Protection

- Environment variables for configuration
- No hardcoded secrets or API keys
- Secure cookie handling
- HTTPS enforcement in production

---

## Development Workflow

### Git Standards

- Branch naming: `type/description` (feat/add-timer)
- Commit format: `type: description` (feat: add question timer)
- Pull request reviews required
- No direct commits to main branch

### Code Review Checklist

- Spec compliance verification
- Performance impact assessment
- Accessibility standards check
- Security vulnerability scan
- Test coverage validation

---

## Governance

### Amendment Process

- **Patch** (x.x.1): Bug fixes, clarifications
- **Minor** (x.1.x): New principles, expanded guidance
- **Major** (1.x.x): Breaking changes, removed principles

### Compliance Enforcement

- Automated linting and formatting
- CI/CD pipeline checks
- Monthly architecture reviews
- Quarterly security assessments

### Exception Handling

Security deviations require explicit approval and documentation of risks and mitigation strategies.
