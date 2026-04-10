import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path for the Next.js App load next.confing and .env
  dir: "./",
});

// Custom configurations of jest
/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  // Config for Run before any test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Aliases of Modules (for work with @/ in tsconfig.json)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx",
    "!src/**/index.ts",
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 50,
  //     functions: 50,
  //     lines: 50,
  //     statements: 50,
  //   },
  // },
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transformIgnorePatterns: ["/node_modules/(?!jose/.*)"],
};

export default createJestConfig(config);