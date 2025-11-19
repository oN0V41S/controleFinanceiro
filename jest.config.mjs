import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path for the Next.js App load next.confing and .env
  dir: "./",
});

// Custom configurations of jest
/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "node",

  // Config for Run before any test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Aliases of Modules (for work with @/ in tsconfig.json)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
