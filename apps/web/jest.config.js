/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/packages/"],
};

module.exports = createJestConfig(customJestConfig);
