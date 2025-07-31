# Testing Setup

This project uses **React Testing Library** with **Vitest** for testing React components.

## Setup

### Dependencies Installed
- `@testing-library/react` - Core React Testing Library
- `@testing-library/dom` - DOM testing utilities
- `@testing-library/jest-dom` - Custom matchers for Jest/Vitest
- `@testing-library/user-event` - User interaction simulation
- `vitest` - Fast test runner
- `jsdom` - DOM environment for Node.js

### Configuration Files
- `vitest.config.ts` - Vitest configuration
- `src/test/setup.ts` - Test setup with mocks and global configurations

## Test Structure

### HomePage Tests (`src/pages/HomePage.test.tsx`)
Currently testing the main HomePage component with 8 passing tests:

1. **Renders the main title** - Verifies "BookVis" is displayed
2. **Renders the subtitle** - Verifies subtitle text is present
3. **Shows sign in button** - Verifies Google sign-in button appears
4. **Renders the hero image** - Verifies hero image with correct src
5. **Renders the info button** - Verifies INFO button is present
6. **Opens info drawer** - Tests user interaction with info button
7. **Shows loading state when auth is loading** - Tests loading state
8. **Renders loading state initially** - Verifies initial loading state

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui
```

## Mock Strategy

The tests use comprehensive mocking to isolate components:

- **Firebase Service** - Mocked to avoid actual Firebase calls
- **React Router** - Mocked to provide navigation context
- **Authentication Hook** - Mocked to test different auth states
- **Window APIs** - Mocked for Material-UI compatibility

## Testing Best Practices

Following [React Testing Library's guiding principles](https://testing-library.com/docs/react-testing-library/intro/):

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use accessible queries** - Prefer `getByRole`, `getByLabelText`, etc.
3. **Test user interactions** - Use `userEvent` for realistic interactions
4. **Avoid testing implementation details** - Don't test internal state or props

## Future Test Expansion

Potential areas for additional testing:

- **Component Integration Tests** - Test how components work together
- **Error State Tests** - Test error handling and fallbacks
- **Accessibility Tests** - Ensure components meet accessibility standards
- **Performance Tests** - Test component rendering performance
- **E2E Tests** - End-to-end user journey tests

## Notes

- Tests show React `act()` warnings due to async state updates - these are expected and don't affect test functionality
- Some complex interactions (like Firebase data loading) are mocked to keep tests fast and reliable
- The testing setup is ready for expansion to other components 