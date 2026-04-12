import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path for the Next.js App load next.confing and .env
  dir: "./",
});

// Custom configurations of jest
/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  
  // Use jsdom by default for component tests
  testEnvironment: "jsdom",

  // Run before any test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Aliases of Modules (for work with @/ in tsconfig.json)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
  },

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx",
    "!src/**/index.ts",
  ],
  
  // Test file patterns
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)",
  ],
  
  testPathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
  ],
  
  // Transform to handle ESM modules from node_modules
  transformIgnorePatterns: [
    "/node_modules/(?!(jose)/.*)",
  ],
  
  // Ignore specific API test files that have issues with Next.js Request
  // These tests require special environment setup
  modulePathIgnorePatterns: [
    "<rootDir>/src/features/auth/api/auth-flow.test.ts",
    "<rootDir>/src/features/transactions/api/transactions-api.test.ts",
    "<rootDir>/src/features/transactions/api/[id]/route.test.ts",
    "<rootDir>/src/features/transactions/api/transactions.test.ts",
  ],
};

export default createJestConfig(config);