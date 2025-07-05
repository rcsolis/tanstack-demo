# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses **yarn** as the package manager. Common commands:

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Run linting
yarn lint

# Preview production build
yarn preview
```

## Architecture Overview

This is a modern React application built with Vite, demonstrating a Pokemon listing app with the following key architectural patterns:

### Core Technology Stack
- **React 19.1.0** with functional components and hooks
- **Vite 7.0.0** with React SWC plugin for fast development
- **TanStack Query 5.81.5** for server state management and API caching
- **Zustand 5.0.6** for lightweight client state management
- **Tailwind CSS 4.1.11** for utility-first styling
- **Iconify React** for icon components

### State Management Pattern
The application uses a **hybrid state management approach**:

1. **Server State**: TanStack Query manages API calls, caching, and background updates
2. **Client State**: Zustand store (`src/store/pokemonStore.jsx`) manages local application state
3. **Service Layer**: `src/service/pokemonService.jsx` acts as middleware between API and state

**Important**: If the service layer updates the Zustand store directly and breaks typical separation of concerns, please consider refactoring to return data from services and update state in components.

### Component Architecture
The project is structured with **atomic design principles** in mind:

```
src/components/
├── PokemonList.jsx          # Main container component
├── atoms/                   # (Prepared but empty)
├── molecules/               # (Prepared but empty)
├── organisms/               # (Prepared but empty)
├── templates/               # (Prepared but empty)
└── ui/                     # Current UI components
    ├── Error.jsx           # Error display component
    ├── Loading.jsx         # Loading state component
    └── PokemonItem.jsx     # Individual Pokemon display
```

### Data Flow
1. Components trigger queries via TanStack Query `useQuery` hook
2. Query executes service function (`fetchPokemons` or `fetchPokemonDetails`)
3. Service fetches data from PokeAPI and updates Zustand store
4. Components re-render based on Zustand state changes

### Key Patterns
- **Query Key Strategy**: Uses static keys like `['pokemons']` for TanStack Query
- **Error Handling**: Try-catch in services with dedicated Error UI component
- **Loading States**: Conditional rendering with dedicated Loading component
- **Pagination**: URL-based pagination with previous/next links from API
- **KISS Principle**: It should be adopted to avoid unnecessary complexity and instead write code that is simple and clear.
- **Clean Code**: Follow the principles of hexagonal architecture.

### Development Notes
- **ESLint Config**: Uses flat config with React hooks and refresh plugins
- **Custom Rule**: Allows unused variables matching pattern `^_.*$`
- **DevTools**: TanStack Query DevTools enabled in development
- **Styling**: Primarily Tailwind CSS with minimal custom CSS for animations

### API Integration
- **Base URL**: `https://pokeapi.co/api/v2/pokemon`
- **Pagination**: Handled via API's `next` and `previous` links
- **Data Transformation**: Service layer maps API responses to application data structures
- **Error Handling**: Service layer throws errors that are caught by TanStack Query

### Common Patterns to Follow
- Use functional components with hooks.
- Implement conditional rendering for loading/error/success states.
- Follow existing Tailwind CSS utility patterns.
- Use named exports for components and functions.
- Maintain separation between server state (TanStack Query) and client state (Zustand).
- Use separation of concerns for the Service layer.
- Prevent side effects or infinite calls of useEffect.
- Use responsive design.
- Use atomic design for create the UI.
- Optimize the render process by use Suspese or Lazy loading strategies.
- Prevent multiple renders.
- Use ES modules (import/export) syntax, not CommonJS (require).
- Destructure imports when possible (eg. import { foo } from 'bar').
- Be sure to typecheck when you’re done making a series of code changes.
- Prefer running single tests, and not the whole test suite, for performance.

### Standard Workflow
1. First, think deeply about the problem or requirement, read the codebase to find the relevant files, and write a plan to a file named with the following pattern `{phase_number}_phase.md` and save it into the `task` folder located at the root of the project.
2. The plan must be break into phases, and each phase should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check it with me and I will verify the plan.
4. Then, begin working on each phase of the plan one by one, checking off each of the todo items as you complete them. If you find tasks that aren't dependent, execute them with sub-agents.
5. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
6. Please in every step of the way just give me a high-level explanation of the changes you made at each step of the process.
7. Please check through all the code you just wrote and make sure it follows security best practices. Make sure there are no sensitive information in the front and and there are no vulnerabilities that can be exploited.
8. Finally, when you're done, create a file with the following pattern: `{phase_number}_summarize.md` with the explanation of the functionality and code you just built out in detail. Walk me through wehat you changed and how it works. Act like you’re a senior engineer teaching me code and add any other relevant information.

**IMPORTANT**: Write tests based on the to-do list, if the written code does not pass the tests, change the code and continue until all tests pass with a maximum of 4 iterations, NEVER modify the test suite. The tests should be run by independent sub-agents.

**IMPORTANT**: If you need more information when you are thinking or write code, use context7 to  look for documentation and references.
