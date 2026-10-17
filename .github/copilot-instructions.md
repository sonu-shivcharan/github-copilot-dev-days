# Copilot instructions

## Architecture

- This is a plain JavaScript browser quiz with no framework or build step. The root `index.html` redirects GitHub Pages visitors to `src/index.html`.
- `src/questions.js` owns quiz data, `src/quiz.js` contains DOM-free quiz logic, and `src/app.js` connects that logic to the page and manages UI state. Keep the script order in `src/index.html`: questions, logic, then app.
- The logic and question data files expose guarded CommonJS exports so the same code can be loaded by the browser and Node's built-in test runner.

## Build and test

- Run the test suite from the repository root with `npm test`.
- Run one test by name, for example: `node --test --test-name-pattern="isCorrect returns true" tests/quiz.test.js`.
- Run the app locally with `npm start`; it serves `src/` at `http://localhost:8080`.
- There are no build or lint scripts. The test runner is built into Node; the start script invokes `http-server` through `npx`.
- The current starter baseline intentionally has one failing test: `getGrade gives an A for exactly 90%`. The workshop documents this as the bug fixed in its debugging chapter; distinguish this known failure from regressions.

## Project conventions

- Questions use four `options`; `answer` is the zero-based index of the correct option. Keep question text unique and the answer index within the options array; `tests/questions.test.js` checks these constraints.
- Keep quiz rules testable without browser APIs in `src/quiz.js`; put DOM reads, rendering, event handlers, and UI state in `src/app.js`.
- The workshop guides in `workshops/` describe the intended feature workflow and starter behavior. Preserve the starter bug unless the task specifically addresses the grading logic or debugging exercise.
