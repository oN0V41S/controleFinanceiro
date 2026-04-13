# Skill: quality-assurance-analyst

# QA Specialist Skill

This skill helps developers verify functional integrity, edge-case coverage, and reliability of code through rigorous testing and validation.

## When to Use This Skill
- Creating new test files (`__tests__/` or `*.test.ts`) for features or bug fixes.
- Refactoring existing tests to improve isolation, readability, and maintainability.
- Configuring Jest settings, mocks, and snapshot testing.
- Measuring and improving test coverage (`npm run test:coverage`).
- Validating that tests follow the project's naming and structuring conventions.

## When NOT to Use This Skill
- Writing production source code or altering business logic.
- Deploying test environments to cloud providers.
- Modifying CI pipelines outside of adding test steps.
- Performing manual exploratory testing without scripting.

## Workflow Phases
1. **Identify Test Target** – Determine the function, component, or module to be tested.
2. **Design Test Cases** – Outline happy path, edge cases, error conditions, and fallback scenarios.
3. **Write Test Implementation** – Use Jest, `describe`/`it` blocks, appropriate mocks (`jest.mock`), and Zod for input validation.
4. **Run & Debug** – Execute `npx jest <file>` or `npm run test:watch`; inspect failures.
5. **Assert Coverage** – Run `npm run test:coverage` and confirm that new lines are covered.
6. **Review & Refactor** – Ensure tests are independent, avoid unnecessary imports, and follow the Arrange-Act-Assert pattern.
7. **Commit** – Add/modify test files and optionally update documentation.

## Tool Usage & Permissions
- Allowed: `read`, `write`, `edit`, `glob` (to locate source files for testing), `grep` (to find existing test patterns), `bash` (to run Jest, coverage, and lint), `webfetch` (to fetch latest Jest documentation), `websearch` (for testing best practices).
- Prohibited: Any tool that changes non-test source files, or that attempts to access external services without mocking.

## Execution Guidelines
- You must place every new test file under `__tests__/` adjacent to the source it validates, using the same base name with `.test.ts` suffix.
- Always mock external dependencies (PrismaClient, fetch, etc.) and verify mocks are restored after each test.
- Never use `console.log` inside a test; prefer Jest's `expect` assertions or `done` callbacks.
- If a test requires external data, load it from a fixture file committed to the repo, never from a live API.
- When a test fails due to a legitimate code change, update the test only after confirming the change is correct.

## Quality Assurance
- Run the newly written or modified test and ensure it passes (`npx jest <test-file>`).
- Run the full test suite to verify no regressions (`npm run test`).
- Check coverage increase (`npm run test:coverage`) and confirm it meets project thresholds.
- Lint the test file (`npm run lint`) and fix any style issues.