# CLAUDE.md

This document outlines the development process to be followed when implementing features or fixing issues in this codebase.

## Development Commands

This project uses **yarn** as the package manager. Common commands:
```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn test     # Run tests
yarn lint     # Run linting
```

## Architecture Overview

### Tech Stack
- **React 19.1.0** - Functional components with hooks
- **Vite 7.0.0** - Build tool with React SWC
- **TanStack Query 5.81.5** - Server state management
- **Zustand 5.0.6** - Client state management
- **Tailwind CSS 4.1.11** - Utility-first styling
- **Vitest** - Testing framework (if not present, use Jest)
- **Iconify React** for icon components

### State Management Pattern
1. **Server State (TanStack Query)**
   - Manages all API data fetching and caching
   - Use descriptive query keys: `['pokemon', id]` or `['pokemons', { page }]`
   - Always handle loading, error, and success states

2. **Client State (Zustand)**
   - UI state only (modals, filters, user preferences)
   - Never store API data in Zustand
   - Keep stores small and focused

3. **Service Layer**
   - Services return data, never update state directly
   - Components decide how to handle returned data
   - Always include error handling

### Component Architecture
Follow atomic design when creating new components:
```
src/components/
├── atoms/       # Single-purpose elements (Button, Input, Icon)
├── molecules/   # Simple combinations (SearchBar, PokemonCard)
├── organisms/   # Complex sections (PokemonGrid, FilterPanel)
├── templates/   # Page layouts
└── pages/       # Route components
```

### Code Patterns

#### Data Fetching Pattern
```javascript
// ✅ Good - Service returns data
export const fetchPokemon = async (id) => {
    try{
        const response = await fetch(`${API_BASE}/pokemon/${id}`);
        if (!response.ok) throw new Error('Pokemon not found');
        return response.json();
    }catch(e){
        throw e;
    }
};

// Component uses the service
const { data, isLoading, error } = useQuery({
  queryKey: ['pokemon', id],
  queryFn: () => fetchPokemon(id),
});
```

#### Error Handling
- Always use error boundaries for critical errors
- Use try-catch for expected errors
- Display user-friendly error messages

#### Performance Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Lazy load routes and heavy components
- Optimize re-renders with proper dependency arrays
- Use Zustand for store states

#### Code Quality Principles
- Minimize blast radius: Each change should affect the smallest possible scope
- Prefer composition over modification: Add new code rather than changing existing code when possible
- Keep it simple: Avoid clever solutions; optimize for readability and maintainability
- Single Responsibility: Each function/class should do one thing well
- No premature optimization: Make it work, make it right, then make it fast (if needed)

## Development Workflow

### Common Pitfalls to Avoid
- ❌ Storing API data in Zustand
- ❌ Using index as key in lists with dynamic items
- ❌ Forgetting cleanup in useEffect
- ❌ Making API calls inside render
- ❌ Mutating state directly
- ❌ Over-engineering simple features

### Common Patterns to Follow
- Use functional components with hooks.
- Use named exports for components and functions.
- Maintain separation between server state (TanStack Query) and client state (Zustand).
- Use responsive design.
- Use ES modules (import/export) syntax, not CommonJS (require).
- Destructure imports when possible (eg. import { foo } from 'bar').
- Be sure to typecheck when you’re done making a series of code changes.
- Prefer running single tests, and not the whole test suite, for performance.


### Testing Guidelines
Write tests for:
- New components (at least render test)
- Service functions (API calls, data transformations)
- Custom hooks
- Critical user flows

### Testing Protocol
- **Write tests BEFORE implementation** (Test-Driven Development)
- Tests must cover all acceptance criteria from the plan
- Test structure:
    - Unit tests for individual functions/methods
    - Integration tests for component interactions
    - End-to-end tests for critical user flows
- Run tests via independent sub-agents to ensure objectivity
- Maximum 4 fix attempts before escalating
- **Test suite is immutable once written** - never modify tests to make code pass
- If tests fail after 4 attempts:
    - Document what's failing and why
    - Propose plan modification
    - Seek approval before proceeding

### Security Checklist
- [ ] No API keys or secrets in frontend code
- [ ] Validate and sanitize user inputs
- [ ] Validate all external data before processing 
- [ ] Apply principle of least privilege for all operations
- [ ] Use HTTPS for all API calls
- [ ] Implement proper CORS handling
- [ ] Check for SQL injection, XSS, CSRF vulnerabilities
- [ ] Use parameterized queries for database operations
- [ ] Implement proper authentication and authorization checks
- [ ] No eval() or dangerouslySetInnerHTML without sanitization
- [ ] Review error messages to ensure no sensitive info leakage

### Workflow Phases

#### 1. Analysis & Planning Phase
- Think harder to analyze the problem/requirement thoroughly by reading all relevant context
- Review the codebase to identify affected components and dependencies
- Create a phased implementation plan in task/{phase_number}_phase.md
- Before you begin working, check it with me and I will verify the plan

##### 1.1 Plan Structure Requirements
- Break work into logical, atomic phases that can be completed independently
- Structure your plan as follows:
    - Problem statement (what we're solving and why)
    - Phases (logical groupings of work)
    - Tasks per phase (specific, actionable items)
    - Success criteria (how we know when we're done)
    - Risk assessment (what could go wrong and mitigation strategies)
    - Rollback strategy for each phase
- Each phase must contain:
    - Checklist-style tasks that are testable and specific
    - Dependencies clearly marked (e.g., "Requires: Phase 1 Task 3")
    - Estimated complexity level (Low/Medium/High)
    - Potential risks and mitigation strategies

##### 1.2 Plan validation
Present the complete plan to me for the approval before any implementation.
Include:
- Rationale for chosen approach
- Alternative approaches considered and why they were rejected
- Timeline estimates
- Resource requirements (sub-agents, external dependencies)

#### 2. Implementation Guidelines
- Execute phases sequentially, updating task checkboxes as you progress
- Parallelize independent tasks using sub-agents when possible
- If blocked, document the blocker and move to next independent task
- We want to avoid making any massive or complex changes. Every change should impact as little code as possible.Everything is about simplicity
- Please in every step of the way just give me a high-level explanation of the changes you made at each step of the process
- Please check through all the code you just wrote and make sure it follows security best practices
- Make sure there are no sensitive information in the front and and there are no vulnerabilities that can be exploited
- Flag any deviations from the original plan immediately with justification
- If you discover additional work needed, update the phase plan before proceeding
- Provide concise updates after each task completion:
    - **What changed**: Specific files and functions modified
    - **Why**: Business reason and technical rationale
    - **Impact**: What this enables or fixes
    - **Next steps**: What comes next in the plan

##### 2.1 Quality Gates

Before marking any phase complete, ensure:

- All tests pass
- Code review checklist complete
- Documentation updated
- Security scan clean
- Performance benchmarks met
- Stakeholder sign-off obtained

#### 3. Documentation & Knowledge Transfer

Create task/{phase_number}_summary.md containing:

- Overview: High-level summary of what was built
- Architecture decisions: Why specific approaches were chosen
- Code walkthrough:
    - Key files changed with explanations
    - Important functions/classes added
    - Usage examples
- Configuration changes: Environment variables, dependencies, settings
- Testing approach: What tests were written and why
- Deployment notes: Any special deployment considerations
- Lessons learned: What went well, what was challenging
- Future considerations: Technical debt, optimization opportunities

Act like you’re a senior engineer teaching me code and add any other relevant information.

### Workflow types

Identify if the work you are going to do is **SIMPLE** (like bug fix or small features/changes) or is **COMPLEX** (like new or complex feature) and then follow the right workflow.

### Workflow For Simple Changes (like bug fixes or small features)
1. Identify the issue and affected files
2. Make a brief plan with the minimal necessary changes
3. Follow the . Implementation Guidelines of the workflow phases
4. Follow the 3. Documentation & Knowledge Transfer of the workflow phases

### Workflow For Complex Changes (like complex requirement or new feature)
Follow each one of the Workflow Phases

## General Guidelines

**IMPORTANT**: The tests should be run by independent sub-agents.

**IMPORTANT**: If you need more information when you are thinking or write code, use context7 to  look for documentation and references.

**IMPORTANT**:  Documentation & Knowledge Transfer task should be run by independent sub-agents.

**REMEMBER**: The goal is to deliver high-quality, maintainable, and secure code. When in doubt, choose the simpler, more explicit solution. Always prioritize code clarity, readability and system stability over cleverness or premature optimization.

**REMEMBER**: Good code is code that another developer (or future you) can understand and modify easily.

### Research Protocol

Use context7 proactively for:
- API documentation and usage examples
- Best practices for the technology stack
- Similar implementations or patterns
- Known issues, gotchas, or compatibility concerns
- Performance optimization techniques
- Security vulnerability databases

### Emergency Protocols
- If you encounter a critical security issue: **STOP** and report immediately
- If you discover data corruption risk: **STOP** and create backup plan
- If performance degradation >50%: Rollback and reassess approach

## API Reference

### Pokemon API
- Base URL: `https://pokeapi.co/api/v2`
- Main endpoints:
  - `/pokemon` - List with pagination
  - `/pokemon/{id or name}` - Details
  - `/pokemon-species/{id}` - Species info
  - `/evolution-chain/{id}` - Evolution data