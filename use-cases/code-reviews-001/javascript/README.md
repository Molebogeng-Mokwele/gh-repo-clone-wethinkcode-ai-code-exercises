# JavaScript User Authentication Exercise

This folder contains the JavaScript implementation and tests for the Code Reviews exercise.

## Files

- `src/user_auth.js` - authentication utility with session handling, login/logout, and password strength checks
- `test/user_auth.test.js` - Jest test suite verifying authentication behavior
- `package.json` - local package configuration for running Jest

## Prerequisites

- Node.js 14.x or higher

## Setup

Install dependencies in this folder:

```bash
cd use-cases/code-reviews-001/javascript
npm install
```

## Run tests

```bash
npm test
```

## Notes

- This exercise uses a simple in-memory session store and `localStorage` when available.
- The module is intentionally simplified for learning and code review practice; do not use it as production authentication code.
